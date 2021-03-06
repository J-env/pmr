import { DOMSerializer, Fragment, Mark } from '../prosemirror-model'

import { domIndex, isEquivalentPosition } from './dom'
import browser from './browser'

const NOT_DIRTY = 0, CHILD_DIRTY = 1, CONTENT_DIRTY = 2, NODE_DIRTY = 3;

class ViewDesc {
  constructor(parent, children, dom, contentDOM) {
    this.parent = parent;
    this.children = children;
    this.dom = dom;
    dom.pmViewDesc = this;
    this.contentDOM = contentDOM;
    this.dirty = NOT_DIRTY;
  }

  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget() { return false }
  matchesMark() { return false }
  matchesNode() { return false }
  matchesHack() { return false }

  get beforePosition() { return false }

  parseRule() { return null }

  stopEvent() { return false }

  // The size of the content represented by this desc.
  get size() {
    let size = 0;
    for (let i = 0, len = this.children.length; i < len; i++) {
      size += this.children[i].size;
    }
    return size;
  }

  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() { return 0 }

  destroy() {
    this.parent = null;
    if (this.dom.pmViewDesc === this) {
      this.dom.pmViewDesc = null;
    }

    for (let i = 0, len = this.children.length; i < len; i++) {
      this.children[i].destroy()
    }
  }

  posBeforeChild(child) {
    for (let i = 0, pos = this.posAtStart; i < this.children.length; i++) {
      let cur = this.children[i]
      if (cur == child) return pos
      pos += cur.size
    }
  }

  get posBefore() {
    return this.parent.posBeforeChild(this)
  }

  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
  }

  get posAfter() {
    return this.posBefore + this.size
  }

  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border
  }

  // : (dom.Node, number, ?number) → number
  localPosFromDOM(dom, offset, bias) {
    // If the DOM position is in the content, use the child desc after
    // it to figure out a position.
    if (this.contentDOM && this.contentDOM.contains(dom.nodeType === 1 ? dom : dom.parentNode)) {
      if (bias < 0) {
        let domBefore, desc
        if (dom == this.contentDOM) {
          domBefore = dom.childNodes[offset - 1]
        } else {
          while (dom.parentNode != this.contentDOM) dom = dom.parentNode
          domBefore = dom.previousSibling
        }
        while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent === this)) domBefore = domBefore.previousSibling
        return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart
      } else {
        let domAfter, desc
        if (dom == this.contentDOM) {
          domAfter = dom.childNodes[offset]
        } else {
          while (dom.parentNode != this.contentDOM) dom = dom.parentNode
          domAfter = dom.nextSibling
        }
        while (domAfter && !((desc = domAfter.pmViewDesc) && desc.parent == this)) domAfter = domAfter.nextSibling
        return domAfter ? this.posBeforeChild(desc) : this.posAtEnd
      }
    }
    // Otherwise, use various heuristics, falling back on the bias
    // parameter, to determine whether to return the position at the
    // start or at the end of this view desc.
    let atEnd
    if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
      atEnd = dom.compareDocumentPosition(this.contentDOM) & 2
    } else if (this.dom.firstChild) {
      if (offset == 0) for (let search = dom;; search = search.parentNode) {
        if (search == this.dom) { atEnd = false; break }
        if (search.parentNode.firstChild != search) break
      }
      if (atEnd == null && offset == dom.childNodes.length) for (let search = dom;; search = search.parentNode) {
        if (search == this.dom) { atEnd = true; break }
        if (search.parentNode.lastChild != search) break
      }
    }
    return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart
  }

  // Scan up the dom finding the first desc that is a descendant of
  // this one.
  nearestDesc(dom, onlyNodes) {
    for (let first = true, cur = dom; cur; cur = cur.parentNode) {
      let desc = this.getDesc(cur)
      if (desc && (!onlyNodes || desc.node)) {
        // If dom is outside of this desc's nodeDOM, don't count it.
        if (first && desc.nodeDOM && !(desc.nodeDOM.nodeType === 1 ? desc.nodeDOM.contains(dom) : desc.nodeDOM == dom)) first = false
        else return desc
      }
    }
  }

  getDesc(dom) {
    let desc = dom.pmViewDesc
    for (let cur = desc; cur; cur = cur.parent) if (cur === this) return desc
  }

  posFromDOM(dom, offset, bias) {
    for (let scan = dom;; scan = scan.parentNode) {
      let desc = this.getDesc(scan)
      if (desc) return desc.localPosFromDOM(dom, offset, bias)
    }
  }

  descAt(pos) {
    for (let i = 0, offset = 0; i < this.children.length; i++) {
      let child = this.children[i], end = offset + child.size
      if (offset == pos && end != offset) {
        while (!child.border && child.children.length) child = child.children[0]
        return child
      }
      if (pos < end) return child.descAt(pos - offset - child.border)
      offset = end
    }
  }

  domFromPos(pos) {
    if (!this.contentDOM) {
      return {
        node: this.dom,
        offset: 0
      };
    }

    for (let offset = 0, i = 0;; i++) {
      if (offset == pos) {
        while (i < this.children.length && this.children[i].beforePosition) {
          i++;
        }

        return {
          node: this.contentDOM,
          offset: i
        };
      }

      if (i === this.children.length) {
        throw new Error('Invalid position ' + pos);
      }

      let child = this.children[i], end = offset + child.size;
      if (pos < end) {
        return child.domFromPos(pos - offset - child.border);
      }

      offset = end;
    }
  }

  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(from, to, base = 0) {
    if (this.children.length === 0) {
      return {
        node: this.contentDOM,
        from,
        to,
        fromOffset: 0,
        toOffset: this.contentDOM.childNodes.length
      };
    }

    let fromOffset = -1, toOffset = -1
    for (let offset = 0, i = 0;; i++) {
      let child = this.children[i], end = offset + child.size
      if (fromOffset == -1 && from <= end) {
        let childBase = offset + child.border
        // FIXME maybe descend mark views to parse a narrower range?
        if (from >= childBase && to <= end - child.border && child.node && child.contentDOM && this.contentDOM.contains(child.contentDOM)) {
          return child.parseRange(from - childBase, to - childBase, base + childBase);
        }

        from = base + offset
        for (let j = i; j > 0; j--) {
          let prev = this.children[j - 1]
          if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
            fromOffset = domIndex(prev.dom) + 1
            break
          }
          from -= prev.size
        }
        if (fromOffset == -1) fromOffset = 0
      }
      if (fromOffset > -1 && to <= end) {
        to = base + end
        for (let j = i + 1; j < this.children.length; j++) {
          let next = this.children[j]
          if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
            toOffset = domIndex(next.dom)
            break
          }
          to += next.size
        }
        if (toOffset == -1) toOffset = this.contentDOM.childNodes.length
        break
      }
      offset = end
    }
    return {node: this.contentDOM, from, to, fromOffset, toOffset}
  }

  emptyChildAt(side) {
    if (this.border || !this.contentDOM || !this.children.length) return false
    let child = this.children[side < 0 ? 0 : this.children.length - 1]
    return child.size == 0 || child.emptyChildAt(side)
  }

  // : (number) → dom.Node
  domAfterPos(pos) {
    let {node, offset} = this.domFromPos(pos)
    if (node.nodeType !== 1 || offset == node.childNodes.length)
      throw new RangeError('No node after pos ' + pos)
    return node.childNodes[offset]
  }

  setSelection(anchor, head, root) {
    // If the selection falls entirely in a child, give it to that child
    let from = Math.min(anchor, head);
    let to = Math.max(anchor, head);
    for (let i = 0, offset = 0; i < this.children.length; i++) {
      let child = this.children[i];
      let end = offset + child.size;
      console.log(child);
      console.log(end);

      if (from > offset && to < end) {
        return child.setSelection(anchor - offset - child.border, head - offset - child.border, root);
      }
      offset = end;
    }

    let anchorDOM = this.domFromPos(anchor), headDOM = this.domFromPos(head);
    let domSel = root.getSelection(), range = document.createRange();

    if (
      isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) && 
      isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset)
    ) {
      return;
    }

    if (domSel.extend) {
      range.setEnd(anchorDOM.node, anchorDOM.offset);
      range.collapse(false);

    } else {
      if (anchor > head) {
        let tmp = anchorDOM;
        anchorDOM = headDOM;
        headDOM = tmp;
      }

      range.setEnd(headDOM.node, headDOM.offset);
      range.setStart(anchorDOM.node, anchorDOM.offset);
    }

    domSel.removeAllRanges();
    domSel.addRange(range);

    if (domSel.extend) {
      domSel.extend(headDOM.node, headDOM.offset);
    }
  }

  // : (dom.MutationRecord) → bool
  ignoreMutation(_mutation) {
    return !this.contentDOM
  }

  get contentLost() {
    return this.contentDOM && this.contentDOM !== this.dom && !this.dom.contains(this.contentDOM)
  }

  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(from, to) {
    for (let offset = 0, i = 0; i < this.children.length; i++) {
      let child = this.children[i], end = offset + child.size
      if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
        let startInside = offset + child.border, endInside = end - child.border
        if (from >= startInside && to <= endInside) {
          this.dirty = from == offset || to == end ? CONTENT_DIRTY : CHILD_DIRTY
          if (from == startInside && to == endInside && child.contentLost) child.dirty = NODE_DIRTY
          else child.markDirty(from - startInside, to - startInside)
          return
        } else {
          child.dirty = NODE_DIRTY
        }
      }
      offset = end
    }
    this.dirty = CONTENT_DIRTY
  }
}

const nothing = [];

class WidgetViewDesc extends ViewDesc {
  constructor(parent, widget, view, pos) {
    let self, dom = widget.type.toDOM
    if (typeof dom === 'function') dom = dom(view, () => {
      if (!self) return pos
      if (self.parent) return self.parent.posBeforeChild(self)
    })
    if (!widget.type.spec.raw) {
      if (dom.nodeType !== 1) {
        let wrap = document.createElement('span')
        wrap.appendChild(dom)
        dom = wrap
      }
      dom.contentEditable = false
      dom.classList.add('ProseMirror-widget')
    }
    super(parent, nothing, dom, null)
    this.widget = widget
    self = this
  }

  get beforePosition() {
    return this.widget.type.side < 0
  }

  matchesWidget(widget) {
    return this.dirty == NOT_DIRTY && widget.type.eq(this.widget.type)
  }

  parseRule() { return {ignore: true} }

  stopEvent(event) {
    let stop = this.widget.spec.stopEvent
    return stop ? stop(event) : false
  }
}

class CursorWrapperDesc extends WidgetViewDesc {
  parseRule() {
    let content
    for (let child = this.dom.firstChild; child; child = child.nextSibling) {
      let add
      if (child.nodeType === 3) {
        let text = child.nodeValue.replace(/\ufeff/g, '')
        if (!text) continue
        add = document.createTextNode(text)
      } else if (child.textContent === '\ufeff') {
        continue
      } else {
        add = child.cloneNode(true)
      }
      if (!content) content = document.createDocumentFragment()
      content.appendChild(add)
    }
    if (content) return {skip: content}
    else return super.parseRule()
  }

  ignoreMutation() { return false }
}

class MarkViewDesc extends ViewDesc {
  constructor(parent, mark, dom, contentDOM) {
    super(parent, [], dom, contentDOM)
    this.mark = mark
  }

  static create(parent, mark, inline, view) {
    let custom = customNodeViews(view)[mark.type.name]
    let spec = custom && custom(mark, view, inline)
    if (!spec || !spec.dom)
      spec = DOMSerializer.renderSpec(document, mark.type.spec.toDOM(mark, inline))
    return new MarkViewDesc(parent, mark, spec.dom, spec.contentDOM || spec.dom)
  }

  parseRule() { return {mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM} }

  matchesMark(mark) { return this.dirty != NODE_DIRTY && this.mark.eq(mark) }

  markDirty(from, to) {
    super.markDirty(from, to)
    // Move dirty info to nearest node view
    if (this.dirty != NOT_DIRTY) {
      let parent = this.parent
      while (!parent.node) parent = parent.parent
      if (parent.dirty < this.dirty) parent.dirty = this.dirty
      this.dirty = NOT_DIRTY
    }
  }
}

class NodeViewDesc extends ViewDesc {
  // : (?ViewDesc, Node, [Decoration], DecorationSet, dom.Node, ?dom.Node, EditorView)
  constructor(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos) {
    super(parent, node.isLeaf ? nothing : [], dom, contentDOM)
    this.nodeDOM = nodeDOM
    this.node = node
    this.outerDeco = outerDeco
    this.innerDeco = innerDeco
    if (contentDOM) this.updateChildren(view, pos)
  }

  static create(parent, node, outerDeco, innerDeco, view, pos) {
    let custom = customNodeViews(view)[node.type.name], descObj
    let spec = custom && custom(node, view, () => {
      // (This is a function that allows the custom view to find its
      // own position)
      if (!descObj) return pos
      if (descObj.parent) return descObj.parent.posBeforeChild(descObj)
    }, outerDeco)

    let dom = spec && spec.dom, contentDOM = spec && spec.contentDOM
    if (node.isText) {
      if (!dom) dom = document.createTextNode(node.text)
      else if (dom.nodeType !== 3) throw new RangeError('Text must be rendered as a DOM text node')
    } else if (!dom) {
      ;({dom, contentDOM} = DOMSerializer.renderSpec(document, node.type.spec.toDOM(node)))
    }
    if (!contentDOM && !node.isText && dom.nodeName !== 'BR' && dom.nodeName !== 'IMG') { // Chrome gets confused by <br contenteditable=false>
      dom.contentEditable = false
      if (node.type.spec.draggable) dom.draggable = true
    }

    let nodeDOM = dom
    dom = applyOuterDeco(dom, outerDeco, node)

    if (spec)
      return descObj = new CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view)
    else if (node.isText)
      return new TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view)
    else
      return new NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos + 1)
  }

  parseRule() {
    // Experimental kludge to allow opt-in re-parsing of nodes
    if (this.node.type.spec.reparseInView) return null
    // FIXME the assumption that this can always return the current
    // attrs means that if the user somehow manages to change the
    // attrs in the dom, that won't be picked up. Not entirely sure
    // whether this is a problem
    let rule = {node: this.node.type.name, attrs: this.node.attrs}
    if (this.node.type.spec.code) rule.preserveWhitespace = 'full'
    if (this.contentDOM && !this.contentLost) rule.contentElement = this.contentDOM
    else rule.getContent = () => this.contentDOM ? Fragment.empty : this.node.content
    return rule
  }

  matchesNode(node, outerDeco, innerDeco) {
    return this.dirty == NOT_DIRTY && node.eq(this.node) &&
      sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco)
  }

  get size() { return this.node.nodeSize }

  get border() { return this.node.isLeaf ? 0 : 1 }

  updateChildren(view, pos) {
    let updater = new ViewTreeUpdater(this), inline = this.node.inlineContent
    iterDeco(this.node, this.innerDeco, (widget, i) => {
      if (widget.spec.marks)
        updater.syncToMarks(widget.spec.marks, inline, view)
      else if (widget.type.side >= 0)
        updater.syncToMarks(i == this.node.childCount ? Mark.none : this.node.child(i).marks, inline, view)
      // If the next node is a desc matching this widget, reuse it,
      // otherwise insert the widget as a new view desc.
      updater.placeWidget(widget, view, pos)
    }, (child, outerDeco, innerDeco, i) => {
      // Make sure the wrapping mark descs match the node's marks.
      updater.syncToMarks(child.marks, inline, view)
      // Either find an existing desc that exactly matches this node,
      // and drop the descs before it.
      updater.findNodeMatch(child, outerDeco, innerDeco, i) ||
        // Or try updating the next desc to reflect this node.
        updater.updateNextNode(child, outerDeco, innerDeco, view, i) ||
        // Or just add it as a new desc.
        updater.addNode(child, outerDeco, innerDeco, view, pos)
      pos += child.nodeSize
    })
    // Drop all remaining descs after the current position.
    updater.syncToMarks(nothing, inline, view)
    if (this.node.isTextblock) updater.addTextblockHacks()
    updater.destroyRest()

    if (updater.changed || this.dirty == CONTENT_DIRTY) this.renderChildren()
  }

  renderChildren() {
    renderDescs(this.contentDOM, this.children, NodeViewDesc.is)
    if (browser.ios) iosHacks(this.dom)
  }

  update(node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY ||
        !node.sameMarkup(this.node)) return false
    this.updateInner(node, outerDeco, innerDeco, view)
    return true
  }

  updateInner(node, outerDeco, innerDeco, view) {
    this.updateOuterDeco(outerDeco)
    this.node = node
    this.innerDeco = innerDeco
    if (this.contentDOM) this.updateChildren(view, this.posAtStart)
    this.dirty = NOT_DIRTY
  }

  updateOuterDeco(outerDeco) {
    if (sameOuterDeco(outerDeco, this.outerDeco)) return
    let needsWrap = this.nodeDOM.nodeType !== 1
    let oldDOM = this.dom
    this.dom = patchOuterDeco(this.dom, this.nodeDOM,
                              computeOuterDeco(this.outerDeco, this.node, needsWrap),
                              computeOuterDeco(outerDeco, this.node, needsWrap))
    if (this.dom != oldDOM) {
      oldDOM.pmViewDesc = null
      this.dom.pmViewDesc = this
    }
    this.outerDeco = outerDeco
  }

  selectNode() {
    this.nodeDOM.classList.add('ProseMirror-selectednode')
  }

  deselectNode() {
    this.nodeDOM.classList.remove('ProseMirror-selectednode')
  }
}

export function docViewDesc(doc, outerDeco, innerDeco, dom, view) {
  applyOuterDeco(dom, outerDeco, doc, true)
  return new NodeViewDesc(null, doc, outerDeco, innerDeco, dom, dom, dom, view, 0)
}

class TextViewDesc extends NodeViewDesc {
  constructor(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) {
    super(parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view)
  }

  parseRule() {
    let parent = this.nodeDOM.parentNode
    return parent ? {skip: parent} : {ignore: true}
  }

  update(node, outerDeco) {
    if (this.dirty == NODE_DIRTY || (this.dirty != NOT_DIRTY && !this.inParent()) ||
        !node.sameMarkup(this.node)) return false
    this.updateOuterDeco(outerDeco)
    if ((this.dirty != NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue)
      this.nodeDOM.nodeValue = node.text
    this.node = node
    this.dirty = NOT_DIRTY
    return true
  }

  inParent() {
    let parentDOM = this.parent.contentDOM
    for (let n = this.nodeDOM; n; n = n.parentNode) if (n == parentDOM) return true
    return false
  }

  domFromPos(pos) {
    return {node: this.nodeDOM, offset: pos}
  }

  localPosFromDOM(dom, offset, bias) {
    if (dom == this.nodeDOM) return this.posAtStart + Math.min(offset, this.node.text.length)
    return super.localPosFromDOM(dom, offset, bias)
  }

  ignoreMutation(mutation) {
    return mutation.type != "characterData"
  }
}

class BRHackViewDesc extends ViewDesc {
  parseRule() { return {ignore: true} }
  matchesHack() { return this.dirty == NOT_DIRTY }
}

class CustomNodeViewDesc extends NodeViewDesc {
  constructor(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view) {
    super(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view)
    this.spec = spec
  }

  update(node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY) return false
    if (this.spec.update) {
      let result = this.spec.update(node, outerDeco)
      if (result) this.updateInner(node, outerDeco, innerDeco, view)
      return result
    } else if (!this.contentDOM && !node.isLeaf) {
      return false
    } else {
      return super.update(node, outerDeco, innerDeco, view)
    }
  }

  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode()
  }

  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode()
  }

  setSelection(anchor, head, root) {
    this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : super.setSelection(anchor, head, root)
  }

  destroy() {
    if (this.spec.destroy) this.spec.destroy()
    super.destroy()
  }

  stopEvent(event) {
    return this.spec.stopEvent ? this.spec.stopEvent(event) : false
  }

  ignoreMutation(mutation) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : super.ignoreMutation(mutation)
  }
}

function renderDescs(parentDOM, descs) {
  let dom = parentDOM.firstChild
  for (let i = 0; i < descs.length; i++) {
    let desc = descs[i], childDOM = desc.dom
    if (childDOM.parentNode == parentDOM) {
      while (childDOM != dom) dom = rm(dom)
      dom = dom.nextSibling
    } else {
      parentDOM.insertBefore(childDOM, dom)
    }
    if (desc instanceof MarkViewDesc) {
      let pos = dom ? dom.previousSibling : parentDOM.lastChild
      renderDescs(desc.contentDOM, desc.children)
      dom = pos ? pos.nextSibling : parentDOM.firstChild
    }
  }
  while (dom) dom = rm(dom)
}

function OuterDecoLevel(nodeName) {
  if (nodeName) this.nodeName = nodeName
}
OuterDecoLevel.prototype = Object.create(null)

const noDeco = [new OuterDecoLevel]

function computeOuterDeco(outerDeco, node, needsWrap) {
  if (outerDeco.length == 0) return noDeco

  let top = needsWrap ? noDeco[0] : new OuterDecoLevel, result = [top]

  for (let i = 0; i < outerDeco.length; i++) {
    let attrs = outerDeco[i].type.attrs, cur = top
    if (!attrs) continue
    if (attrs.nodeName)
      result.push(cur = new OuterDecoLevel(attrs.nodeName))

    for (let name in attrs) {
      let val = attrs[name]
      if (val == null) continue
      if (needsWrap && result.length == 1)
        result.push(cur = top = new OuterDecoLevel(node.isInline ? 'span' : 'div'))
      if (name === 'class') cur.class = (cur.class ? cur.class + ' ' : '') + val
      else if (name === 'style') cur.style = (cur.style ? cur.style + ';' : '') + val
      else if (name !== 'nodeName') cur[name] = val
    }
  }

  return result
}

function patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
  // Shortcut for trivial case
  if (prevComputed == noDeco && curComputed == noDeco) return nodeDOM

  let curDOM = nodeDOM
  for (let i = 0; i < curComputed.length; i++) {
    let deco = curComputed[i], prev = prevComputed[i]
    if (i) {
      let parent
      if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM &&
          (parent = nodeDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
        curDOM = parent
      } else {
        parent = document.createElement(deco.nodeName)
        parent.appendChild(curDOM)
        curDOM = parent
      }
    }
    patchAttributes(curDOM, prev || noDeco[0], deco)
  }
  return curDOM
}

function patchAttributes(dom, prev, cur) {
  for (let name in prev)
    if (name !== 'class' && name !== 'style' && name !== 'nodeName' && !(name in cur))
      dom.removeAttribute(name)
  for (let name in cur)
    if (name !== 'class' && name !== 'style' && name !== 'nodeName' && cur[name] != prev[name])
      dom.setAttribute(name, cur[name])
  if (prev.class != cur.class) {
    let prevList = prev.class ? prev.class.split(' ') : nothing
    let curList = cur.class ? cur.class.split(' ') : nothing
    for (let i = 0; i < prevList.length; i++) if (curList.indexOf(prevList[i]) == -1)
      dom.classList.remove(prevList[i])
    for (let i = 0; i < curList.length; i++) if (prevList.indexOf(curList[i]) == -1)
      dom.classList.add(curList[i])
  }
  if (prev.style != cur.style) {
    if (prev.style) {
      let prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m
      while (m = prop.exec(prev.style))
        dom.style[m[1].toLowerCase()] = ''
    }
    if (cur.style)
      dom.style.cssText += cur.style
  }
}

function applyOuterDeco(dom, deco, node) {
  return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node, dom.nodeType !== 1))
}

function sameOuterDeco(a, b) {
  if (a.length != b.length) return false
  for (let i = 0; i < a.length; i++) if (!a[i].type.eq(b[i].type)) return false
  return true
}

function rm(dom) {
  let next = dom.nextSibling
  dom.parentNode.removeChild(dom)
  return next
}

class ViewTreeUpdater {
  constructor(top) {
    this.top = top
    this.index = 0
    this.stack = []
    this.changed = false

    this.preMatched = preMatch(top.node.content, top.children)
  }

  destroyBetween(start, end) {
    if (start == end) return
    for (let i = start; i < end; i++) this.top.children[i].destroy()
    this.top.children.splice(start, end - start)
    this.changed = true
  }

  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length)
  }

  syncToMarks(marks, inline, view) {
    let keep = 0, depth = this.stack.length >> 1
    let maxKeep = Math.min(depth, marks.length), next
    while (keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[(keep + 1) << 1]).matchesMark(marks[keep]))
      keep++

    while (keep < depth) {
      this.destroyRest()
      this.top.dirty = NOT_DIRTY
      this.index = this.stack.pop()
      this.top = this.stack.pop()
      depth--
    }
    while (depth < marks.length) {
      this.stack.push(this.top, this.index + 1)
      if (this.index < this.top.children.length &&
          (next = this.top.children[this.index]).matchesMark(marks[depth])) {
        this.top = next
      } else {
        let markDesc = MarkViewDesc.create(this.top, marks[depth], inline, view)
        this.top.children.splice(this.index, 0, markDesc)
        this.top = markDesc
        this.changed = true
      }
      this.index = 0
      depth++
    }
  }

  findNodeMatch(node, outerDeco, innerDeco, index) {
    for (let i = this.index, children = this.top.children, e = Math.min(children.length, i + 5); i < e; i++) {
      let child = children[i], preMatched
      if (child.matchesNode(node, outerDeco, innerDeco) &&
          ((preMatched = this.preMatched.indexOf(child)) == -1 || preMatched == index)) {
        this.destroyBetween(this.index, i)
        this.index++
        return true
      }
    }
    return false
  }

  updateNextNode(node, outerDeco, innerDeco, view, index) {
    if (this.index === this.top.children.length) return false;

    let next = this.top.children[this.index]
    if (next instanceof NodeViewDesc) {
      let preMatch = this.preMatched.indexOf(next)
      if (preMatch > -1 && preMatch != index) return false
      let nextDOM = next.dom
      if (next.update(node, outerDeco, innerDeco, view)) {
        if (next.dom != nextDOM) this.changed = true
        this.index++
        return true
      }
    }
    return false
  }

  addNode(node, outerDeco, innerDeco, view, pos) {
    this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos))
    this.changed = true
  }

  placeWidget(widget, view, pos) {
    if (this.index < this.top.children.length && this.top.children[this.index].matchesWidget(widget)) {
      this.index++
    } else {
      let desc = new (widget.spec.isCursorWrapper ? CursorWrapperDesc : WidgetViewDesc)(this.top, widget, view, pos)
      this.top.children.splice(this.index++, 0, desc)
      this.changed = true
    }
  }

  addTextblockHacks() {
    let lastChild = this.top.children[this.index - 1];
    while (lastChild instanceof MarkViewDesc) lastChild = lastChild.children[lastChild.children.length - 1]

    if (!lastChild || // Empty textblock
        !(lastChild instanceof TextViewDesc) ||
        /\n$/.test(lastChild.node.text)) {
      if (this.index < this.top.children.length && this.top.children[this.index].matchesHack()) {
        this.index++
      } else {
        let dom = document.createElement("br")
        this.top.children.splice(this.index++, 0, new BRHackViewDesc(this.top, nothing, dom, null))
        this.changed = true
      }
    }
  }
}

function preMatch(frag, descs) {
  let result = [], end = frag.childCount;
  for (let i = descs.length - 1; end > 0 && i >= 0; i--) {
    let desc = descs[i], node = desc.node;
    if (!node) continue;
    if (node != frag.child(end - 1)) break;
    result[--end] = desc;
  }
  return result;
}

function compareSide(a, b) { return a.type.side - b.type.side }

function iterDeco(parent, deco, onWidget, onNode) {
  let locals = deco.locals(parent), offset = 0;
  // Simple, cheap variant for when there are no local decorations
  if (locals.length === 0) {
    for (let i = 0; i < parent.childCount; i++) {
      let child = parent.child(i);
      onNode(child, locals, deco.forChild(offset, child), i);
      offset += child.nodeSize;
    }
    return;
  }

  let decoIndex = 0, active = [], restNode = null;
  for (let parentIndex = 0;;) {
    if (decoIndex < locals.length && locals[decoIndex].to == offset) {
      let widget = locals[decoIndex++], widgets;
      while (decoIndex < locals.length && locals[decoIndex].to == offset) {
        (widgets || (widgets = [widget])).push(locals[decoIndex++]);
      }

      if (widgets) {
        widgets.sort(compareSide);
        for (let i = 0; i < widgets.length; i++) {
          onWidget(widgets[i], parentIndex);
        }

      } else {
        onWidget(widget, parentIndex);
      }
    }

    let child;
    if (restNode) {
      child = restNode;
      restNode = null;

    } else if (parentIndex < parent.childCount) {
      child = parent.child(parentIndex++);
    } else {
      break;
    }

    for (let i = 0; i < active.length; i++) {
      if (active[i].to <= offset) {
        active.splice(i--, 1);
      }
    }
    while (decoIndex < locals.length && locals[decoIndex].from == offset) {
      active.push(locals[decoIndex++]);
    }

    let end = offset + child.nodeSize;
    if (child.isText) {
      let cutAt = end;
      if (decoIndex < locals.length && locals[decoIndex].from < cutAt) {
        cutAt = locals[decoIndex].from;
      }
      for (let i = 0; i < active.length; i++) {
        if (active[i].to < cutAt) cutAt = active[i].to;
      }
      if (cutAt < end) {
        restNode = child.cut(cutAt - offset);
        child = child.cut(0, cutAt - offset);
        end = cutAt;
      }
    }

    onNode(child, active.length ? active.slice() : nothing, deco.forChild(offset, child), parentIndex - 1);
    offset = end;
  }
}

let cachedCustomViews, cachedCustomFor;
function customNodeViews(view) {
  if (cachedCustomFor == view._props) return cachedCustomViews;
  cachedCustomFor = view._props;
  return cachedCustomViews = buildCustomViews(view);
}
function buildCustomViews(view) {
  let result = {};
  view.someProp('nodeViews', obj => {
    for (let prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(result, prop)) {
        result[prop] = obj[prop];
      }
    }
  });
  return result;
}

function iosHacks(dom) {
  if (dom.nodeName === 'UL' || dom.nodeName === 'OL') {
    let oldCSS = dom.style.cssText
    dom.style.cssText = oldCSS + '; list-style: square !important';
    window.getComputedStyle(dom).listStyle;
    dom.style.cssText = oldCSS;
  }
}
