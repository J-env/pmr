import { chainCommands, exitCode } from 'prosemirror-commands'
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list'
import { undo, redo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

export function buildKeymap(schema, mapKeys) {
  let keys = {}, type;

  function binding(key, cmd) {
    if (mapKeys) {
      let mapped = mapKeys[key];
      if (mapped === false) { return; }
      if (mapped) { key = mapped; }
    }
    keys[key] = cmd;
  }

  binding('Mod-z', undo);
  binding('Shift-Mod-z', redo);
  binding('Backspace', undoInputRule);
  !mac && binding('Mod-y', redo);


  if (type = schema.nodes.hard_break) {
    let br = type,
      cmd = chainCommands(exitCode, (state, dispatch) => {
        dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
        return true;
      });

    binding('Mod-Enter', cmd);
    binding('Shift-Enter', cmd);
    mac && binding('Ctrl-Enter', cmd);
  }

  if (type = schema.nodes.list_item) {
    binding('Enter', splitListItem(type));
    binding('Mod-[', liftListItem(type));
    binding('Mod-]', sinkListItem(type));
  }

  return keys;
}
