function compareObjs(a, b) {
  if (a == b) return true
  for (let p in a) if (a[p] !== b[p]) return false
  for (let p in b) if (!(p in a)) return false
  return true
}

class WidgetType {
  constructor(toDOM, spec) {
    this.spec = spec || noSpec;
    this.side = this.spec.side || 0;
    this.toDOM = toDOM;
  }

  map(mapping, span, offset, oldOffset) {
    let {pos, deleted} = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1)
    return deleted ? null : new Decoration(pos - offset, pos - offset, this)
  }

  valid() { return true }

  eq(other) {
    return this == other ||
      (other instanceof WidgetType &&
       (this.spec.key && this.spec.key == other.spec.key ||
        this.toDOM == other.toDOM && compareObjs(this.spec, other.spec)))
  }
}

class InlineType {
  constructor(attrs, spec) {
    this.spec = spec || noSpec;
    this.attrs = attrs;
  }

  map(mapping, span, offset, oldOffset) {
    let from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset
    let to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset
    return from >= to ? null : new Decoration(from, to, this)
  }

  valid(_, span) { return span.from < span.to }

  eq(other) {
    return this == other ||
      (other instanceof InlineType && compareObjs(this.attrs, other.attrs) &&
       compareObjs(this.spec, other.spec))
  }

  static is(span) { return span.type instanceof InlineType }
}

class NodeType {
  constructor(attrs, spec) {
    this.spec = spec || noSpec
    this.attrs = attrs
  }

  map(mapping, span, offset, oldOffset) {
    let from = mapping.mapResult(span.from + oldOffset, 1)
    if (from.deleted) return null
    let to = mapping.mapResult(span.to + oldOffset, -1)
    if (to.deleted || to.pos <= from.pos) return null
    return new Decoration(from.pos - offset, to.pos - offset, this)
  }

  valid(node, span) {
    let {index, offset} = node.content.findIndex(span.from)
    return offset == span.from && offset + node.child(index).nodeSize == span.to
  }

  eq(other) {
    return this == other ||
      (other instanceof NodeType && compareObjs(this.attrs, other.attrs) &&
       compareObjs(this.spec, other.spec))
  }
}

export class Decoration {
  constructor(from, to, type) {
    this.from = from;
    this.to = to;
    this.type = type;
  }

  copy(from, to) {
    return new Decoration(from, to, this.type)
  }

  eq(other) {
    return this.type.eq(other.type) && this.from == other.from && this.to == other.to
  }

  map(mapping, offset, oldOffset) {
    return this.type.map(mapping, this, offset, oldOffset)
  }

  static widget(pos, toDOM, spec) {
    return new Decoration(pos, pos, new WidgetType(toDOM, spec))
  }

  static inline(from, to, attrs, spec) {
    return new Decoration(from, to, new InlineType(attrs, spec))
  }

  static node(from, to, attrs, spec) {
    return new Decoration(from, to, new NodeType(attrs, spec))
  }

  get spec() { return this.type.spec }
}

const none = [], noSpec = {};

export class DecorationSet {
  constructor(local, children) {
    this.local = local && local.length ? local : none
    this.children = children && children.length ? children : none
  }

  static create(doc, decorations) {
    return decorations.length ? buildTree(decorations, doc, 0, noSpec) : empty
  }

  find(start, end, predicate) {
    let result = []
    this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate)
    return result
  }

  findInner(start, end, result, offset, predicate) {
    for (let i = 0; i < this.local.length; i++) {
      let span = this.local[i]
      if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec)))
        result.push(span.copy(span.from + offset, span.to + offset))
    }
    for (let i = 0; i < this.children.length; i += 3) {
      if (this.children[i] < end && this.children[i + 1] > start) {
        let childOff = this.children[i] + 1
        this.children[i + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate)
      }
    }
  }

  map(mapping, doc, options) {
    if (this == empty || mapping.maps.length == 0) return this
    return this.mapInner(mapping, doc, 0, 0, options || noSpec)
  }

  mapInner(mapping, node, offset, oldOffset, options) {
    let newLocal
    for (let i = 0; i < this.local.length; i++) {
      let mapped = this.local[i].map(mapping, offset, oldOffset)
      if (mapped && mapped.type.valid(node, mapped)) (newLocal || (newLocal = [])).push(mapped)
      else if (options.onRemove) options.onRemove(this.local[i].spec)
    }

    if (this.children.length)
      return mapChildren(this.children, newLocal, mapping, node, offset, oldOffset, options)
    else
      return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty
  }

  add(doc, decorations) {
    if (!decorations.length) return this
    if (this == empty) return DecorationSet.create(doc, decorations)
    return this.addInner(doc, decorations, 0)
  }

  addInner(doc, decorations, offset) {
    let children, childIndex = 0
    doc.forEach((childNode, childOffset) => {
      let baseOffset = childOffset + offset, found
      if (!(found = takeSpansForNode(decorations, childNode, baseOffset))) return

      if (!children) children = this.children.slice()
      while (childIndex < children.length && children[childIndex] < childOffset) childIndex += 3
      if (children[childIndex] == childOffset)
        children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1)
      else
        children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found, childNode, baseOffset + 1, noSpec))
      childIndex += 3
    })

    let local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset)
    return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local,
                             children || this.children)
  }

  remove(decorations) {
    if (decorations.length == 0 || this == empty) return this
    return this.removeInner(decorations, 0)
  }

  removeInner(decorations, offset) {
    let children = this.children, local = this.local
    for (let i = 0; i < children.length; i += 3) {
      let found, from = children[i] + offset, to = children[i + 1] + offset
      for (let j = 0, span; j < decorations.length; j++) if (span = decorations[j]) {
        if (span.from > from && span.to < to) {
          decorations[j] = null
          ;(found || (found = [])).push(span)
        }
      }
      if (!found) continue
      if (children == this.children) children = this.children.slice()
      let removed = children[i + 2].removeInner(found, from + 1)
      if (removed != empty) {
        children[i + 2] = removed
      } else {
        children.splice(i, 3)
        i -= 3
      }
    }
    if (local.length) for (let i = 0, span; i < decorations.length; i++) if (span = decorations[i]) {
      for (let j = 0; j < local.length; j++) if (local[j].type.eq(span.type)) {
        if (local == this.local) local = this.local.slice()
        local.splice(j--, 1)
      }
    }
    if (children == this.children && local == this.local) return this
    return local.length || children.length ? new DecorationSet(local, children) : empty
  }

  forChild(offset, node) {
    if (this == empty) return this
    if (node.isLeaf) return DecorationSet.empty

    let child, local
    for (let i = 0; i < this.children.length; i += 3) if (this.children[i] >= offset) {
      if (this.children[i] == offset) child = this.children[i + 2]
      break
    }
    let start = offset + 1, end = start + node.content.size
    for (let i = 0; i < this.local.length; i++) {
      let dec = this.local[i]
      if (dec.from < end && dec.to > start && (dec.type instanceof InlineType)) {
        let from = Math.max(start, dec.from) - start, to = Math.min(end, dec.to) - start
        if (from < to) (local || (local = [])).push(dec.copy(from, to))
      }
    }
    if (local) {
      let localSet = new DecorationSet(local.sort(byPos))
      return child ? new DecorationGroup([localSet, child]) : localSet
    }
    return child || empty
  }

  eq(other) {
    if (this == other) return true
    if (!(other instanceof DecorationSet) ||
        this.local.length != other.local.length ||
        this.children.length != other.children.length) return false
    for (let i = 0; i < this.local.length; i++)
      if (!this.local[i].eq(other.local[i])) return false
    for (let i = 0; i < this.children.length; i += 3)
      if (this.children[i] != other.children[i] ||
          this.children[i + 1] != other.children[i + 1] ||
          !this.children[i + 2].eq(other.children[i + 2])) return false
    return false
  }

  locals(node) {
    return removeOverlap(this.localsInner(node))
  }

  localsInner(node) {
    if (this == empty) return none
    if (node.inlineContent || !this.local.some(InlineType.is)) return this.local
    let result = []
    for (let i = 0; i < this.local.length; i++) {
      if (!(this.local[i].type instanceof InlineType))
        result.push(this.local[i])
    }
    return result
  }
}

const empty = new DecorationSet();

DecorationSet.empty = empty;

DecorationSet.removeOverlap = removeOverlap;

class DecorationGroup {
  constructor(members) {
    this.members = members
  }

  forChild(offset, child) {
    if (child.isLeaf) return DecorationSet.empty
    let found = []
    for (let i = 0; i < this.members.length; i++) {
      let result = this.members[i].forChild(offset, child)
      if (result == empty) continue
      if (result instanceof DecorationGroup) found = found.concat(result.members)
      else found.push(result)
    }
    return DecorationGroup.from(found)
  }

  eq(other) {
    if (!(other instanceof DecorationGroup) ||
        other.members.length != this.members.length) return false
    for (let i = 0; i < this.members.length; i++)
      if (!this.members[i].eq(other.members[i])) return false
    return true
  }

  locals(node) {
    let result, sorted = true
    for (let i = 0; i < this.members.length; i++) {
      let locals = this.members[i].localsInner(node)
      if (!locals.length) continue
      if (!result) {
        result = locals
      } else {
        if (sorted) {
          result = result.slice()
          sorted = false
        }
        for (let j = 0; j < locals.length; j++) result.push(locals[j])
      }
    }
    return result ? removeOverlap(sorted ? result : result.sort(byPos)) : none
  }

  static from(members) {
    switch (members.length) {
      case 0: return empty
      case 1: return members[0]
      default: return new DecorationGroup(members)
    }
  }
}

function mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
  let children = oldChildren.slice()

  let shift = (oldStart, oldEnd, newStart, newEnd) => {
    for (let i = 0; i < children.length; i += 3) {
      let end = children[i + 1], dSize
      if (end == -1 || oldStart > end + oldOffset) continue
      if (oldEnd >= children[i] + oldOffset) {
        children[i + 1] = -1
      } else if (dSize = (newEnd - newStart) - (oldEnd - oldStart) + (oldOffset - offset)) {
        children[i] += dSize
        children[i + 1] += dSize
      }
    }
  }
  for (let i = 0; i < mapping.maps.length; i++) mapping.maps[i].forEach(shift)

  let mustRebuild = false
  for (let i = 0; i < children.length; i += 3) if (children[i + 1] == -1) { // Touched nodes
    let from = mapping.map(children[i] + oldOffset), fromLocal = from - offset
    if (fromLocal < 0 || fromLocal >= node.content.size) {
      mustRebuild = true
      continue
    }
    // Must read oldChildren because children was tagged with -1
    let to = mapping.map(oldChildren[i + 1] + oldOffset, -1), toLocal = to - offset
    let {index, offset: childOffset} = node.content.findIndex(fromLocal)
    let childNode = node.maybeChild(index)
    if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
      let mapped = children[i + 2].mapInner(mapping, childNode, from + 1, children[i] + oldOffset + 1, options)
      if (mapped != empty) {
        children[i] = fromLocal
        children[i + 1] = toLocal
        children[i + 2] = mapped
      } else {
        children[i + 1] = -2
        mustRebuild = true
      }
    } else {
      mustRebuild = true
    }
  }

  // Remaining children must be collected and rebuilt into the appropriate structure
  if (mustRebuild) {
    let decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal ? moveSpans(newLocal, offset) : [], mapping,
                                                       offset, oldOffset, options)
    let built = buildTree(decorations, node, 0, options)
    newLocal = built.local
    for (let i = 0; i < children.length; i += 3) if (children[i + 1] < 0) {
      children.splice(i, 3)
      i -= 3
    }
    for (let i = 0, j = 0; i < built.children.length; i += 3) {
      let from = built.children[i]
      while (j < children.length && children[j] < from) j += 3
      children.splice(j, 0, built.children[i], built.children[i + 1], built.children[i + 2])
    }
  }

  return new DecorationSet(newLocal && newLocal.sort(byPos), children)
}

function moveSpans(spans, offset) {
  if (!offset || !spans.length) return spans
  let result = []
  for (let i = 0; i < spans.length; i++) {
    let span = spans[i]
    result.push(new Decoration(span.from + offset, span.to + offset, span.type))
  }
  return result
}

function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset, oldOffset, options) {
  // Gather all decorations from the remaining marked children
  function gather(set, oldOffset) {
    for (let i = 0; i < set.local.length; i++) {
      let mapped = set.local[i].map(mapping, offset, oldOffset)
      if (mapped) decorations.push(mapped)
      else if (options.onRemove) options.onRemove(set.local[i].spec)
    }
    for (let i = 0; i < set.children.length; i += 3)
      gather(set.children[i + 2], set.children[i] + oldOffset + 1)
  }
  for (let i = 0; i < children.length; i += 3) if (children[i + 1] == -1)
    gather(children[i + 2], oldChildren[i] + oldOffset + 1)

  return decorations
}

function takeSpansForNode(spans, node, offset) {
  if (node.isLeaf) return null
  let end = offset + node.nodeSize, found = null
  for (let i = 0, span; i < spans.length; i++) {
    if ((span = spans[i]) && span.from > offset && span.to < end) {
      ;(found || (found = [])).push(span)
      spans[i] = null
    }
  }
  return found
}

function withoutNulls(array) {
  let result = []
  for (let i = 0; i < array.length; i++)
    if (array[i] != null) result.push(array[i])
  return result
}

function buildTree(spans, node, offset, options) {
  let children = [], hasNulls = false
  node.forEach((childNode, localStart) => {
    let found = takeSpansForNode(spans, childNode, localStart + offset)
    if (found) {
      hasNulls = true
      let subtree = buildTree(found, childNode, offset + localStart + 1, options)
      if (subtree != empty)
        children.push(localStart, localStart + childNode.nodeSize, subtree)
    }
  })
  let locals = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset).sort(byPos)
  for (let i = 0; i < locals.length; i++) if (!locals[i].type.valid(node, locals[i])) {
    if (options.onRemove) options.onRemove(locals[i].spec)
    locals.splice(i--, 1)
  }
  return locals.length || children.length ? new DecorationSet(locals, children) : empty
}

function byPos(a, b) {
  return a.from - b.from || a.to - b.to
}

function removeOverlap(spans) {
  let working = spans
  for (let i = 0; i < working.length - 1; i++) {
    let span = working[i]
    if (span.from != span.to) for (let j = i + 1; j < working.length; j++) {
      let next = working[j]
      if (next.from == span.from) {
        if (next.to != span.to) {
          if (working == spans) working = spans.slice()
          // Followed by a partially overlapping larger span. Split that
          // span.
          working[j] = next.copy(next.from, span.to)
          insertAhead(working, j + 1, next.copy(span.to, next.to))
        }
        continue
      } else {
        if (next.from < span.to) {
          if (working == spans) working = spans.slice()
          // The end of this one overlaps with a subsequent span. Split
          // this one.
          working[i] = span.copy(span.from, next.from)
          insertAhead(working, j, span.copy(next.from, span.to))
        }
        break
      }
    }
  }
  return working
}

function insertAhead(array, i, deco) {
  while (i < array.length && byPos(deco, array[i]) > 0) i++
  array.splice(i, 0, deco)
}

export function viewDecorations(view) {
  let found = []
  view.someProp('decorations', f => {
    let result = f(view.state)
    if (result && result != empty) found.push(result)
  })
  if (view.cursorWrapper)
    found.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco]))
  return DecorationGroup.from(found)
}
