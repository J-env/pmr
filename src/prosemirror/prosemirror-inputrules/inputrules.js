import { Plugin } from '../prosemirror-state'

export class InputRule {
  constructor(match, handler) {
    this.match = match;
    this.handler = typeof handler === 'string' ? stringHandler(handler) : handler;
  }
}

function stringHandler(string) {
  return function(state, match, start, end) {
    let insert = string;
    if (match[1]) {
      let offset = match[0].lastIndexOf(match[1]);
      insert += match[0].slice(offset + match[1].length);
      start += offset;
      let cutOff = start - end;

      if (cutOff > 0) {
        insert = match[0].slice(offset - cutOff, offset) + insert;
        start = end;
      }
    }

    let marks = state.doc.resolve(start).marks();
    return state.tr.replaceWith(start, end, state.schema.text(insert, marks));
  }
}

const MAX_MATCH = 500;

export function inputRules({rules}) {
  return new Plugin({
    state: {
      init() {
        return null;
      },
      apply(tr, prev) {
        let stored = tr.getMeta(this);
        if (stored) return stored;
        return tr.selectionSet || tr.docChanged ? null : prev;
      }
    },

    props: {
      handleTextInput(view, from, to, text) {
        let state = view.state;
        let $from = state.doc.resolve(from);
        if ($from.parent.type.spec.code) return false;
        let textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - MAX_MATCH), $from.parentOffset, null, '\ufffc') + text;

        for (let i = 0, len = rules.length; i < len; i++) {
          let match = rules[i].match.exec(textBefore);
          let tr = match && rules[i].handler(state, match, from - (match[0].length - text.length), to);
          if (!tr) continue;
          view.dispatch(tr.setMeta(this, {transform: tr, from, to, text}));
          return true;
        }
        return false;
      }
    },

    isInputRules: true
  });
}

export function undoInputRule(state, dispatch) {
  let plugins = state.plugins;

  for (let i = 0, len = plugins.length; i < len; i++) {
    let plugin = plugins[i];
    let undoable;

    if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
      if (dispatch) {
        let tr = state.tr;
        let toUndo = undoable.transform;
        for (let j = toUndo.steps.length - 1; j >= 0; j--) {
          tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
        }
        let marks = tr.doc.resolve(undoable.from).marks();
        dispatch(tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks)));
      }
      return true;
    }
  }
  return false;
}
