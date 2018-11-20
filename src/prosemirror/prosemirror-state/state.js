import { Node } from '../prosemirror-model'

import { Selection } from './selection'
import { Transaction } from './transaction'

function bind(f, self) {
  return !self || !f ? f : f.bind(self);
}

class FieldDesc {
  constructor(name, desc, self) {
    this.name = name;
    this.init = bind(desc.init, self);
    this.apply = bind(desc.apply, self);
  }
}

const baseFields = [
  new FieldDesc('doc', {
    init(config) { return config.doc || config.schema.topNodeType.createAndFill() },
    apply(tr) { return tr.doc }
  }),
  new FieldDesc('selection', {
    init(config, instance) { return config.selection || Selection.atStart(instance.doc) },
    apply(tr) { return tr.selection }
  }),
  new FieldDesc('storedMarks', {
    init(config) { return config.storedMarks || null },
    apply(tr, _marks, _old, state) { return state.selection.$cursor ? tr.storedMarks : null }
  }),
  new FieldDesc('scrollToSelection', {
    init() { return 0 },
    apply(tr, prev) { return tr.scrolledIntoView ? prev + 1 : prev }
  })
];

class Configuration {
  constructor(schema, plugins) {
    this.schema = schema;
    this.fields = baseFields.concat();
    this.plugins = [];
    this.pluginsByKey = Object.create(null);

    if (plugins) {
      plugins.forEach((plugin) => {
        if (this.pluginsByKey[plugin.key]) {
          throw new RangeError('Adding different instances of a keyed plugin (' + plugin.key + ')');
        }
        this.plugins.push(plugin);
        this.pluginsByKey[plugin.key] = plugin;
        if (plugin.spec.state) {
          this.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
        }
      });
    }
  }
}

export class EditorState {
  constructor(config) {
    this.config = config;
  }

  get schema() { return this.config.schema; }

  get plugins() { return this.config.plugins; }

  apply(tr) { return this.applyTransaction(tr).state; }

  filterTransaction(tr, ignore = -1) {
    let len = this.config.plugins.length;
    for (let i = 0; i < len; i++) {
      if (i !== ignore) {
        let plugin = this.config.plugins[i];
        if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) {
          return false;
        }
      }
    }
    return true;
  }

  applyTransaction(rootTr) {
    if (!this.filterTransaction(rootTr)) {
      return {state: this, transactions: []};
    }

    let trs = [rootTr], newState = this.applyInner(rootTr), seen = null;
    outer: for (;;) {
      let haveNew = false;
      for (let i = 0; i < this.config.plugins.length; i++) {
        let plugin = this.config.plugins[i];
        if (plugin.spec.appendTransaction) {
          let n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this;
          let tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
          if (tr && newState.filterTransaction(tr, i)) {
            tr.setMeta('appendedTransaction', rootTr);
            if (!seen) {
              seen = [];
              for (let j = 0; j < this.config.plugins.length; j++) {
                seen.push(j < i ? {state: newState, n: trs.length} : {state: this, n: 0});
              }
            }
            trs.push(tr);
            newState = newState.applyInner(tr);
            haveNew = true;
          }
          if (seen) { seen[i] = {state: newState, n: trs.length}; }
        }
      }
      if (!haveNew) { return {state: newState, transactions: trs} }
    }
  }

  applyInner(tr) {
    if (!tr.before.eq(this.doc)) {
      throw new RangeError('Applying a mismatched transaction');
    }

    let newInstance = new EditorState(this.config), fields = this.config.fields;
    for (let i = 0, len = fields.length; i < len; i++) {
      let field = fields[i];
      newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
    }
    for (let i = 0, len1 = applyListeners.length; i < len1; i++) {
      applyListeners[i](this, tr, newInstance);
    }
    return newInstance;
  }

  get tr() { return new Transaction(this); }

  static create(config) {
    let $config = new Configuration(config.schema || config.doc.type.schema, config.plugins);
    let instance = new EditorState($config);
    for (let i = 0, len = $config.fields.length; i < len; i++) {
      instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
    }
    return instance;
  }

  reconfigure(config) {
    let $config = new Configuration(config.schema || this.schema, config.plugins);
    let fields = $config.fields, instance = new EditorState($config);
    for (let i = 0, len = fields.length; i < len; i++) {
      let name = fields[i].name;
      instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
    }
    return instance;
  }

  toJSON(pluginFields) {
    let result = {
      doc: this.doc.toJSON(),
      selection: this.selection.toJSON()
    };
    if (this.storedMarks) result.storedMarks = this.storedMarks.map(m => m.toJSON());
    if (pluginFields && typeof pluginFields === 'object') {
      for (let prop in pluginFields) {
        if (prop === 'doc' || prop === 'selection') {
          throw new RangeError('The JSON fields `doc` and `selection` are reserved')
        }
        let plugin = pluginFields[prop], state = plugin.spec.state;
        if (state && state.toJSON) result[prop] = state.toJSON.call(plugin, this[plugin.key]);
      }
    }
    return result;
  }

  static fromJSON(config, json, pluginFields) {
    if (!json) throw new RangeError('Invalid input for EditorState.fromJSON');
    if (!config.schema) throw new RangeError('Required config field "schema" missing');
    let $config = new Configuration(config.schema, config.plugins);
    let instance = new EditorState($config);
    $config.fields.forEach(field => {
      if (field.name === 'doc') {
        instance.doc = Node.fromJSON(config.schema, json.doc);

      } else if (field.name === 'selection') {
        instance.selection = Selection.fromJSON(instance.doc, json.selection);

      } else if (field.name === 'storedMarks') {
        if (json.storedMarks) instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);

      } else {
        if (pluginFields) {
          for (let prop in pluginFields) {
            let plugin = pluginFields[prop], state = plugin.spec.state
            if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
              // This field belongs to a plugin mapped to a JSON field, read it from there.
              instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
              return;
            }
          }
        }
        instance[field.name] = field.init(config, instance);
      }
    })
    return instance
  }

  static addApplyListener(f) {
    applyListeners.push(f);
  }

  static removeApplyListener(f) {
    let found = applyListeners.indexOf(f);
    if (found > -1) applyListeners.splice(found, 1);
  }
}

const applyListeners = [];
