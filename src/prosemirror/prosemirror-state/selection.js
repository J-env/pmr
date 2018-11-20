import { Slice, Fragment } from '../prosemirror-model'
import { ReplaceStep, ReplaceAroundStep } from '../prosemirror-transform'

const classesById = Object.create(null);

export class Selection {
  constructor($anchor, $head, ranges) {
    this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
    this.$anchor = $anchor;
    this.$head = $head;
  }

  get anchor() { return this.$anchor.pos; }

  get head() { return this.$head.pos; }

  get from() { return this.$from.pos; }

  get to() { return this.$to.pos; }

  get $from() { return this.ranges[0].$from; }

  get $to() { return this.ranges[0].$to; }

  get empty() {
    let ranges = this.ranges;
    for (let i = 0, len = ranges.length; i < len; i++) {
      if (ranges[i].$from.pos != ranges[i].$to.pos) {
        return false;
      }
    }
    return true;
  }

  content() {
    return this.$from.node(0).slice(this.from, this.to, true);
  }

  replace(tr, content = Slice.empty) {
    let lastNode = content.content.lastChild, lastParent = null;
    for (let i = 0; i < content.openEnd; i++) {
      lastParent = lastNode;
      lastNode = lastNode.lastChild;
    }

    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0, len = ranges.length; i < len; i++) {
      let {$from, $to} = ranges[i], mapping = tr.mapping.slice(mapFrom);
      tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i ? Slice.empty : content);

      if (i === 0) {
        selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1)
      }
    }
  }

  replaceWith(tr, node) {
    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      let {$from, $to} = ranges[i], mapping = tr.mapping.slice(mapFrom);
      let from = mapping.map($from.pos), to = mapping.map($to.pos);
      if (i) {
        tr.deleteRange(from, to);
      } else {
        tr.replaceRangeWith(from, to, node);
        selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
      }
    }
  }

  static findFrom($pos, dir, textOnly) {
    let inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
    if (inner) return inner;

    for (let depth = $pos.depth - 1; depth >= 0; depth--) {
      let found = dir < 0
          ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly)
          : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly)
      if (found) return found;
    }
  }

  static near($pos, bias = 1) {
    return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
  }

  static atStart(doc) {
    return findSelectionIn(doc, doc, 0, 0, 1) || new AllSelection(doc);
  }

  static atEnd(doc) {
    return findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new AllSelection(doc);
  }

  static fromJSON(doc, json) {
    if (!json || !json.type) throw new RangeError('Invalid input for Selection.fromJSON');
    let cls = classesById[json.type];
    if (!cls) throw new RangeError(`No selection type ${json.type} defined`);
    return cls.fromJSON(doc, json);
  }

  static jsonID(id, selectionClass) {
    if (id in classesById) throw new RangeError('Duplicate use of selection JSON ID ' + id);
    classesById[id] = selectionClass;
    selectionClass.prototype.jsonID = id;
    return selectionClass;
  }

  getBookmark() {
    return TextSelection.between(this.$anchor, this.$head).getBookmark();
  }
}

Selection.prototype.visible = true

export class SelectionRange {
  constructor($from, $to) {
    this.$from = $from;
    this.$to = $to;
  }
}

export class TextSelection extends Selection {
  constructor($anchor, $head = $anchor) {
    super($anchor, $head);
  }

  get $cursor() { return this.$anchor.pos == this.$head.pos ? this.$head : null }

  map(doc, mapping) {
    let $head = doc.resolve(mapping.map(this.head))
    if (!$head.parent.inlineContent) return Selection.near($head)
    let $anchor = doc.resolve(mapping.map(this.anchor))
    return new TextSelection($anchor.parent.inlineContent ? $anchor : $head, $head)
  }

  replace(tr, content = Slice.empty) {
    super.replace(tr, content);
    if (content == Slice.empty) {
      let marks = this.$from.marksAcross(this.$to);
      if (marks) tr.ensureMarks(marks);
    }
  }

  eq(other) {
    return other instanceof TextSelection && other.anchor == this.anchor && other.head == this.head;
  }

  getBookmark() {
    return new TextBookmark(this.anchor, this.head);
  }

  toJSON() {
    return {type: 'text', anchor: this.anchor, head: this.head};
  }

  static fromJSON(doc, json) {
    if (typeof json.anchor !== 'number' || typeof json.head !== 'number') {
      throw new RangeError('Invalid input for TextSelection.fromJSON');
    }
    return new TextSelection(doc.resolve(json.anchor), doc.resolve(json.head));
  }

  static create(doc, anchor, head = anchor) {
    let $anchor = doc.resolve(anchor);
    return new this($anchor, head == anchor ? $anchor : doc.resolve(head));
  }

  static between($anchor, $head, bias) {
    let dPos = $anchor.pos - $head.pos;
    if (!bias || dPos) bias = dPos >= 0 ? 1 : -1;
    if (!$head.parent.inlineContent) {
      let found = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
      if (found) $head = found.$head
      else return Selection.near($head, bias)
    }
    if (!$anchor.parent.inlineContent) {
      if (dPos == 0) {
        $anchor = $head
      } else {
        $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor
        if (($anchor.pos < $head.pos) != (dPos < 0)) $anchor = $head
      }
    }
    return new TextSelection($anchor, $head);
  }
}

Selection.jsonID('text', TextSelection);

class TextBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }

  map(mapping) {
    return new TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }

  resolve(doc) {
    return TextSelection.between(doc.resolve(this.anchor), doc.resolve(this.head));
  }
}

export class NodeSelection extends Selection {
  constructor($pos) {
    let node = $pos.nodeAfter;
    let $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
    super($pos, $end);
    // :: Node The selected node.
    this.node = node;
  }

  map(doc, mapping) {
    let {deleted, pos} = mapping.mapResult(this.anchor);
    let $pos = doc.resolve(pos);
    if (deleted) return Selection.near($pos);
    return new NodeSelection($pos);
  }

  content() {
    return new Slice(Fragment.from(this.node), 0, 0);
  }

  eq(other) {
    return other instanceof NodeSelection && other.anchor == this.anchor;
  }

  toJSON() {
    return {type: 'node', anchor: this.anchor}
  }

  getBookmark() { return new NodeBookmark(this.anchor) }

  static fromJSON(doc, json) {
    if (typeof json.anchor !== 'number') {
      throw new RangeError('Invalid input for NodeSelection.fromJSON');
    }
    return new NodeSelection(doc.resolve(json.anchor));
  }

  static create(doc, from) {
    return new this(doc.resolve(from));
  }

  static isSelectable(node) {
    return !node.isText && node.type.spec.selectable !== false;
  }
}

NodeSelection.prototype.visible = false;

Selection.jsonID('node', NodeSelection);

class NodeBookmark {
  constructor(anchor) {
    this.anchor = anchor;
  }

  map(mapping) {
    let {deleted, pos} = mapping.mapResult(this.anchor)
    return deleted ? new TextBookmark(pos, pos) : new NodeBookmark(pos)
  }

  resolve(doc) {
    let $pos = doc.resolve(this.anchor), node = $pos.nodeAfter
    if (node && NodeSelection.isSelectable(node)) return new NodeSelection($pos)
    return Selection.near($pos)
  }
}

export class AllSelection extends Selection {
  constructor(doc) {
    super(doc.resolve(0), doc.resolve(doc.content.size))
  }

  toJSON() { return {type: 'all'} }

  static fromJSON(doc) { return new AllSelection(doc) }

  map(doc) { return new AllSelection(doc) }

  eq(other) { return other instanceof AllSelection }

  getBookmark() { return AllBookmark }
}

Selection.jsonID('all', AllSelection);

const AllBookmark = {
  map() { return this },
  resolve(doc) { return new AllSelection(doc) }
};

function findSelectionIn(doc, node, pos, index, dir, text) {
  if (node.inlineContent) return TextSelection.create(doc, pos)
  for (let i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
    let child = node.child(i)
    if (!child.isAtom) {
      let inner = findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text)
      if (inner) return inner
    } else if (!text && NodeSelection.isSelectable(child)) {
      return NodeSelection.create(doc, pos - (dir < 0 ? child.nodeSize : 0))
    }
    pos += child.nodeSize * dir
  }
}

function selectionToInsertionEnd(tr, startLen, bias) {
  let last = tr.steps.length - 1
  if (last < startLen) return
  let step = tr.steps[last]
  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) return
  let map = tr.mapping.maps[last], end
  map.forEach((_from, _to, _newFrom, newTo) => { if (end == null) end = newTo })
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias))
}
