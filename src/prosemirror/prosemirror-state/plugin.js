function bindProps(obj, self, target) {
  for (var prop in obj) {
    var val = obj[prop];
    if (val instanceof Function) { val = val.bind(self); }
    else if (prop === 'handleDOMEvents') { val = bindProps(val, self, {}); }
    target[prop] = val;
  }
  return target;
}

export class Plugin {
  constructor(spec) {
    this.props = {};
    if (spec.props) { bindProps(spec.props, this, this.props); }
    this.spec = spec;
    this.key = spec.key ? spec.key.key : createKey('plugin');
  }

  getState(state) { return state[this.key] }
}

const keys = Object.create(null);
function createKey(name) {
  if (name in keys) { return name + '$' + ++keys[name]; }
  keys[name] = 0;
  return name + '$';
}

export class PluginKey {
  constructor(name = 'key') {
    this.key = createKey(name);
  }

  get(state) { return state.config.pluginsByKey[this.key]; }

  getState(state) { return state[this.key]; }
}
