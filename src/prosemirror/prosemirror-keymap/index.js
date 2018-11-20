import keyName from 'w3c-keyname'
import { Plugin } from '../prosemirror-state'

// declare global: navigator
const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

function normalizeKeyName(name) {
  let parts = name.split(/-(?!$)/);
  let result = parts[parts.length - 1];
  if (result === 'Space') result = ' ';

  var alt, ctrl, shift, meta;
  for (let i = 0; i < parts.length - 1; i++) {
    let mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;

    }else if (/^a(lt)?$/i.test(mod)) {
      alt = true;

    }else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;

    }else if (/^s(hift)?$/i.test(mod)) {
      shift = true;

    }else if (/^mod$/i.test(mod)) {
      if (mac) {
        meta = true;
      }else {
        ctrl = true;
      }

    }else {
      throw new Error('Unrecognized modifier name: ' + mod);
    }
  }

  if (alt) {
    result = 'Alt-' + result;
  }
  if (ctrl) {
    result = 'Ctrl-' + result;
  }
  if (meta) {
    result = 'Meta-' + result;
  }
  if (shift) {
    result = 'Shift-' + result;
  }
  return result;
}

function normalize(map) {
  let copy = Object.create(null);
  for (let prop in map) {
    copy[normalizeKeyName(prop)] = map[prop];
  }
  return copy;
}

function modifiers(name, event, shift) {
  if (event.altKey) name = 'Alt-' + name;
  if (event.ctrlKey) name = 'Ctrl-' + name;
  if (event.metaKey) name = 'Meta-' + name;
  if (shift !== false && event.shiftKey) name = 'Shift-' + name;
  return name;
}

export function keymap(bindings) {
  return new Plugin({
    props: {
      handleKeyDown: keydownHandler(bindings)
    }
  });
}

export function keydownHandler(bindings) {
  let map = normalize(bindings);
  return function(view, event) {
    let name = keyName(event);
    let isChar = name.length === 1 && name !== ' ';
    let baseName;
    let direct = map[modifiers(name, event, !isChar)];

    if (direct && direct(view.state, view.dispatch, view)) return true;
    if (isChar && (event.shiftKey || event.altKey || event.metaKey) && (baseName = keyName.base[event.keyCode]) && baseName != name) {
      let fromCode = map[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) return true;
    }
    return false;
  };
}
