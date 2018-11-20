import { Mark } from '../prosemirror-model'
import { NodeSelection } from '../prosemirror-state'

import { scrollRectIntoView, posAtCoords, coordsAtPos, endOfTextblock, storeScrollPos, resetScrollPos } from './domcoords'
import { docViewDesc } from './viewdesc'
import { initInput, destroyInput, dispatchEvent, ensureListeners } from './input'
import { SelectionReader, selectionToDOM, needsCursorWrapper } from './selection'
import { Decoration, viewDecorations } from './decoration'
import browser from './browser'

export { Decoration, DecorationSet } from './decoration'
// Exported for testing
export { serializeForClipboard as __serializeForClipboard, parseFromClipboard as __parseFromClipboard } from './clipboard'

export class EditorView {
  constructor(place, props) {
    this._props = props;
    this.state = props.state;
    this.dispatch = this.dispatch.bind(this);
    this._root = null;
    this.focused = false;

    this.dom = (place && place.mount) || document.createElement('div');
    if (place) {
      if (place.appendChild) {
        place.appendChild(this.dom);

      }else if (place.apply) {
        place(this.dom);

      }else if (place.mount) {
        this.mounted = true;
      }
    }

    this.editable = getEditable(this);
    this.cursorWrapper = null;
    updateCursorWrapper(this);
    this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);

    this.lastSelectedViewDesc = null;
    this.dragging = null;
    initInput(this);

    this.selectionReader = new SelectionReader(this);
    this.pluginViews = [];
    this.updatePluginViews();
  }

  get props() {
    if (this._props.state !== this.state) {
      let prev = this._props;
      this._props = {};
      for (let name in prev) {
        this._props[name] = prev[name];
      }
      this._props.state = this.state;
    }
    return this._props;
  }

  update(props) {
    if (props.handleDOMEvents !== this._props.handleDOMEvents) {
      ensureListeners(this);
    }
    this._props = props;
    this.updateState(props.state);
  }

  setProps(props) {
    let updated = {};
    for (let name in this._props) updated[name] = this._props[name];
    updated.state = this.state;
    for (let name in props) updated[name] = props[name];
    this.update(updated);
  }

  updateState(state) {
    let prev = this.state;
    this.state = state;
    if (prev.plugins != state.plugins) ensureListeners(this);

    this.domObserver.flush();
    if (this.inDOMChange && this.inDOMChange.stateUpdated(state)) return;

    let prevEditable = this.editable
    this.editable = getEditable(this)
    updateCursorWrapper(this)
    let innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this)

    let scroll = prev.config != state.config ? 'reset' : state.scrollToSelection > prev.scrollToSelection ? 'to selection' : 'preserve';
    let updateDoc = !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
    let updateSel = updateDoc || !state.selection.eq(prev.selection) || this.selectionReader.domChanged();
    let oldScrollPos = scroll === 'preserve' && updateSel && storeScrollPos(this);

    if (updateSel) {
      this.domObserver.stop();
      if (updateDoc) {
        if (!this.docView.update(state.doc, outerDeco, innerDeco, this)) {
          this.docView.destroy();
          this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
        }
        this.selectionReader.clearDOMState();
      }
      selectionToDOM(this);
      this.domObserver.start();
    }

    if (prevEditable != this.editable) this.selectionReader.editableChanged();
    this.updatePluginViews(prev);

    if (scroll === 'reset') {
      this.dom.scrollTop = 0;
      
    } else if (scroll === 'to selection') {
      let startDOM = this.root.getSelection().focusNode
      if (this.someProp('handleScrollToSelection', f => f(this)))
        {} // Handled
      else if (state.selection instanceof NodeSelection)
        scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect(), startDOM)
      else
        scrollRectIntoView(this, this.coordsAtPos(state.selection.head), startDOM)
    } else if (oldScrollPos) {
      resetScrollPos(oldScrollPos)
    }
  }

  destroyPluginViews() {
    let view
    while (view = this.pluginViews.pop()) if (view.destroy) view.destroy()
  }

  updatePluginViews(prevState) {
    let plugins = this.state.plugins;
    if (!prevState || prevState.plugins !== plugins) {
      this.destroyPluginViews();
      for (let i = 0, len = plugins.length; i < len; i++) {
        let plugin = plugins[i];
        if (plugin.spec.view) this.pluginViews.push(plugin.spec.view(this));
      }

    }else {
      for (let i = 0; i < this.pluginViews.length; i++) {
        let pluginView = this.pluginViews[i];
        if (pluginView.update) pluginView.update(this, prevState);
      }
    }
  }

  someProp(propName, f) {
    let prop = this._props && this._props[propName];
    let value;

    if (prop != null && (value = f ? f(prop) : prop)) {
      return value;
    }
    
    let plugins = this.state.plugins;
    if (plugins) {
      for (let i = 0, len = plugins.length; i < len; i++) {
        let prop = plugins[i].props[propName];
        if (prop != null && (value = f ? f(prop) : prop)) {
          return value;
        }
      }
    }
  }

  hasFocus() {
    return this.root.activeElement === this.dom;
  }

  focus() {
    this.domObserver.stop();
    selectionToDOM(this, true);
    this.domObserver.start();
    if (this.editable) this.dom.focus();
  }

  get root() {
    let cached = this._root;
    if (cached == null) {
      for (let search = this.dom.parentNode; search; search = search.parentNode) {
        if (search.nodeType === 9 || (search.nodeType === 11 && search.host)) {
          return this._root = search;
        }
      }
    }
    return cached || document;
  }

  posAtCoords(coords) {
    let pos = posAtCoords(this, coords);
    if (this.inDOMChange && pos) {
      pos.pos = this.inDOMChange.mapping.map(pos.pos);
      if (pos.inside != -1) {
        pos.inside = this.inDOMChange.mapping.map(pos.inside);
      }
    }
    return pos;
  }

  coordsAtPos(pos) {
    if (this.inDOMChange) {
      pos = this.inDOMChange.mapping.invert().map(pos);
    }
    return coordsAtPos(this, pos);
  }

  domAtPos(pos) {
    if (this.inDOMChange) {
      pos = this.inDOMChange.mapping.invert().map(pos);
    }
    return this.docView.domFromPos(pos);
  }

  nodeDOM(pos) {
    if (this.inDOMChange) {
      pos = this.inDOMChange.mapping.invert().map(pos);
    }
    let desc = this.docView.descAt(pos);
    return desc ? desc.nodeDOM : null;
  }

  posAtDOM(node, offset, bias = -1) {
    let pos = this.docView.posFromDOM(node, offset, bias);
    if (pos == null) {
      throw new RangeError('DOM position not inside the editor');
    }
    if (this.inDOMChange) {
      pos = this.inDOMChange.mapping.map(pos);
    }
    return pos;
  }

  endOfTextblock(dir, state) {
    return endOfTextblock(this, state || this.state, dir);
  }

  destroy() {
    if (!this.docView) return;

    destroyInput(this);
    this.destroyPluginViews();
    this.selectionReader.destroy();

    if (this.mounted) {
      this.docView.update(this.state.doc, [], viewDecorations(this), this);
      this.dom.textContent = '';

    }else if (this.dom.parentNode) {
      this.dom.parentNode.removeChild(this.dom);
    }
    this.docView.destroy();
    this.docView = null;
  }

  // Used for testing.
  dispatchEvent(event) {
    return dispatchEvent(this, event);
  }

  dispatch(tr) {
    let dispatchTransaction = this._props.dispatchTransaction;
    if (dispatchTransaction) {
      dispatchTransaction.call(this, tr);
    }else {
      this.updateState(this.state.apply(tr));
    }
  }
}

function computeDocDeco(view) {
  let attrs = Object.create(null);
  attrs.class = 'ProseMirror' + (view.focused ? ' ProseMirror-focused' : '');
  attrs.contenteditable = String(view.editable);

  view.someProp('attributes', value => {
    if (typeof value === 'function') {
      value = value(view.state);
    }

    if (value) {
      for (let attr in value) {
        if (attr === 'class') {
          attrs.class += ` ${value[attr]}`;

        }else if (!attrs[attr] && attr !== 'contenteditable' && attr !== 'nodeName') {
          attrs[attr] = String(value[attr]);
        }
      }
    }
  });

  return [Decoration.node(0, view.state.doc.content.size, attrs)];
}

function cursorWrapperDOM(visible) {
  let span = document.createElement('span');
  // zero-width non-breaking space
  span.textContent = '\ufeff';
  if (!visible) {
    span.style.position = 'absolute';
    span.style.left = '-100000px';
  }
  return span;
}

function updateCursorWrapper(view) {
  let $pos = needsCursorWrapper(view.state);
  // On IE/Edge, moving the DOM selection will abort a mouse drag, so
  // there we delay the creation of the wrapper when the mouse is down.
  if ($pos && !(browser.ie && view.mouseDown)) {
    let visible = view.state.selection.visible;
    // Needs a cursor wrapper
    let marks = view.state.storedMarks || $pos.marks(), dom;
    if (!view.cursorWrapper || !Mark.sameSet(view.cursorWrapper.deco.spec.marks, marks) || view.cursorWrapper.dom.textContent !== '\ufeff' || view.cursorWrapper.deco.spec.visible != visible) {
      dom = cursorWrapperDOM(visible);
    }else if (view.cursorWrapper.deco.pos != $pos.pos) {
      dom = view.cursorWrapper.dom;
    }

    if (dom) {
      view.cursorWrapper = {
        dom,
        deco: Decoration.widget($pos.pos, dom, {
          isCursorWrapper: true,
          marks,
          raw: true,
          visible
        })
      };
    }

  } else {
    view.cursorWrapper = null;
  }
}

function getEditable(view) {
  return !view.someProp('editable', value => value(view.state) === false);
}
