import { Transform } from '../prosemirror-transform'
import { Mark } from '../prosemirror-model'

const UPDATED_SEL = 1, UPDATED_MARKS = 2, UPDATED_SCROLL = 4;

export class Transaction extends Transform {
  constructor(state) {
    super(state.doc);
    this.time = Date.now();
    this.curSelection = state.selection;
    this.curSelectionFor = 0;
    this.storedMarks = state.storedMarks;
    this.updated = 0;
    this.meta = Object.create(null);
  }

  get selection() {
    if (this.curSelectionFor < this.steps.length) {
      this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
      this.curSelectionFor = this.steps.length;
    }
    return this.curSelection;
  }

  setSelection(selection) {
    this.curSelection = selection;
    this.curSelectionFor = this.steps.length;
    this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
    this.storedMarks = null;
    return this;
  }

  get selectionSet() {
    return (this.updated & UPDATED_SEL) > 0;
  }

  setStoredMarks(marks) {
    this.storedMarks = marks;
    this.updated |= UPDATED_MARKS;
    return this;
  }

  ensureMarks(marks) {
    if (!Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks)) {
      this.setStoredMarks(marks);
    }
    return this;
  }

  addStoredMark(mark) {
    return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()));
  }

  removeStoredMark(mark) {
    return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }

  get storedMarksSet() {
    return (this.updated & UPDATED_MARKS) > 0;
  }

  addStep(step, doc) {
    super.addStep(step, doc);
    this.updated = this.updated & ~UPDATED_MARKS;
    this.storedMarks = null;
  }

  setTime(time) {
    this.time = time;
    return this;
  }

  replaceSelection(slice) {
    this.selection.replace(this, slice);
    return this;
  }

  replaceSelectionWith(node, inheritMarks) {
    let selection = this.selection;
    if (inheritMarks !== false) {
      node = node.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : (selection.$from.marksAcross(selection.$to) || Mark.none)));
    }
    selection.replaceWith(this, node);
    return this;
  }

  deleteSelection() {
    this.selection.replace(this);
    return this;
  }

  insertText(text, from, to = from) {
    let schema = this.doc.type.schema;

    if (from == null) {
      if (!text) return this.deleteSelection();
      return this.replaceSelectionWith(schema.text(text), true);

    } else {
      if (!text) return this.deleteRange(from, to);
      let marks = this.storedMarks;
      if (!marks) {
        let $from = this.doc.resolve(from);
        marks = to == from ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
      }
      return this.replaceRangeWith(from, to, schema.text(text, marks));
    }
  }

  setMeta(key, value) {
    this.meta[typeof key === 'string' ? key : key.key] = value;
    return this;
  }

  getMeta(key) {
    return this.meta[typeof key === 'string' ? key : key.key];
  }

  get isGeneric() {
    for (let _ in this.meta) {
      return false;
    }
    return true;
  }

  scrollIntoView() {
    this.updated |= UPDATED_SCROLL;
    return this
  }

  get scrolledIntoView() {
    return (this.updated & UPDATED_SCROLL) > 0;
  }
}
