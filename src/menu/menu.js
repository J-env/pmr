import { wrapIn, setBlockType, toggleMark, lift, chainCommands } from 'prosemirror-commands'
import { undo, redo } from 'prosemirror-history'
import { wrapInList, liftListItem } from 'prosemirror-schema-list'

export class MenuItem {
  constructor(spec) {
    this.spec = spec;
  }

  render(view) {
    let spec = this.spec
    const parentNode = view.dom.parentNode;
    let dom = parentNode.querySelector(`${spec.pmrico ? '.pmrico-' + spec.pmrico : spec.selector}`);

    dom.addEventListener('click', e => {
      e.preventDefault();
      
      if (!dom.classList.contains('pmr-disabled')) {
        const isFocus = spec.run(view.state, view.dispatch, view, e);
        isFocus !== null && view.focus();
      }
    });
    
    function update(state) {
      if (spec.select) {
        let selected = spec.select(state);

        setClass(dom, 'pmr-disabled', !selected);
        if (!selected) {
          return false;
        }
      }

      let enabled = true;
      if (spec.enable) {
        enabled = spec.enable(state) || false;
        setClass(dom, 'pmr-disabled', !enabled);
      }
      if (spec.active) {
        let active = enabled && spec.active(state) || false;
        setClass(dom, 'pmr-is-active', active);
      }
      return true;
    }

    return {dom, update};
  }
}

function cmdItem(cmd, options) {
  let passedOptions = {
    run: cmd
  };
  
  for (let prop in options) {
    passedOptions[prop] = options[prop];
  }
  if ((!options.enable || options.enable === true) && !options.select) {
    passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
  }

  return new MenuItem(passedOptions);
}

export function markActive(state, type) {
  let {from, $from, to, empty} = state.selection;
  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks());
  }else {
    return state.doc.rangeHasMark(from, to, type);
  }
}

function markItem(markType, options) {
  let passedOptions = {
    active(state) {
      return markActive(state, markType);
    },
    enable: true
  };

  for (let prop in options) {
    passedOptions[prop] = options[prop];
  }
  return cmdItem(toggleMark(markType), passedOptions);
}

export function canInsert(state, nodeType) {
  var $from = state.selection.$from;
  for (var d = $from.depth; d >= 0; d--) {
    var index = $from.index(d);
    if ($from.node(d).canReplaceWith(index, index, nodeType)) {
      return true;
    }
  }
  return false;
}

function wrapListItem(nodeType, options) {
  return cmdItem(wrapInList(nodeType, options.attrs), options);
}

function combineUpdates(updates, nodes) {
  return state => {
    let something = false;

    for (let i = 0; i < updates.length; i++) {
      let up = updates[i](state);

      !up && nodes[i].classList.add('pmr-disabled');
      if (up) { something = true; }
    }
    return something;
  };
}

export function renderGrouped(view, content) {
  let updates = [];

  for (let i = 0; i < content.length; i++) {
    let items = content[i], localUpdates = [], localNodes = [];

    for (let j = 0; j < items.length; j++) {
      let { dom, update } = items[j].render(view);
      localNodes.push(dom);
      localUpdates.push(update);
    }

    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
    }
  }

  function update(state) {
    let something = false;

    for (let i = 0; i < updates.length; i++) {
      let hasContent = updates[i](state);
      if (hasContent) {
        something = true;
      }
    }
    return something;
  }

  return { update };
}

export const undoItem = new MenuItem({
  run: undo,
  enable: state => undo(state),
  pmrico: 'undo'
});

export const redoItem = new MenuItem({
  run: redo,
  enable: state => redo(state),
  pmrico: 'redo'
});

export function wrapItem(nodeType, options) {
  let liftCommand = chainCommands(liftListItem(nodeType), lift);

  let passedOptions = {
    run(state, dispatch) {
      return wrapIn(nodeType, options.attrs)(state, dispatch);
    },
    select: (state) => !liftCommand(state)
  };

  for (let prop in options) {
    passedOptions[prop] = options[prop];
  }
  return new MenuItem(passedOptions);
}

export function blockTypeItem(nodeType, options) {
  let command = setBlockType(nodeType, options.attrs);

  let passedOptions = {
    run: command,
    enable(state) {
      return command(state);
    },
    active(state) {
      let {$from, to, node} = state.selection;
      if (node) {
        return node.hasMarkup(nodeType, options.attrs);
      }
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
    }
  };

  for (let prop in options) {
    passedOptions[prop] = options[prop];
  }
  return new MenuItem(passedOptions);
}

export function buildMenuItems(schema) {
  let r = {}, type;

  if (type = schema.marks.strong) {
    r.toggleStrong = markItem(type, {
      pmrico: 'bold'
    });
  }
  if (type = schema.marks.em) {
    r.toggleEm = markItem(type, {
      pmrico: 'italic'
    });
  }
  if (type = schema.marks.u) {
    r.toggleU = markItem(type, {
      pmrico: 'underline'
    });
  }
  if (type = schema.marks.strike) {
    r.toggleStrike = markItem(type, {
      pmrico: 'strikethrough'
    });
  }

  if (type = schema.nodes.bullet_list) {
    r.wrapBulletList = wrapListItem(type, {
      pmrico: 'decimal'
    });
  }
  if (type = schema.nodes.ordered_list) {
    r.wrapOrderedList = wrapListItem(type, {
      pmrico: 'disc'
    });
  }
  if (type = schema.nodes.blockquote) {
    r.wrapBlockQuote = wrapItem(type, {
      pmrico: 'quotes-left'
    });
  }
  if (type = schema.nodes.paragraph) {
    r.makeParagraph = blockTypeItem(type, {
      selector: '.pmr-anth__item p'
    });
  }
  if (type = schema.nodes.heading) {
    for (var i = 1; i <= 6; i++) {
      r['makeHead' + i] = blockTypeItem(type, {
        attrs: { level: i },
        selector: `.pmr-anth__item h${i}`
      });
    }
  }

  let cut = arr => arr.filter(x => x);
  r.inlineMenu = [cut([r.toggleStrong, r.toggleEm, r.toggleU, r.toggleStrike])];
  r.typeMenu = [cut([r.makeParagraph, r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6])];
  r.blockMenu = [cut([r.wrapBulletList, r.wrapOrderedList, r.wrapBlockQuote])];
  r.fullMenu = r.inlineMenu.concat([[undoItem, redoItem]], r.blockMenu, r.typeMenu);
  return r;
}

export function createFontMenuItem(type, options = {}) {
  return markItem(type, options);
}

export function setClass(dom, cls, on = true) {
  dom.classList[on ? 'add' : 'remove'](cls);
  return dom;
}
