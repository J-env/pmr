import { joinPoint, canJoin, findWrapping, liftTarget, canSplit, ReplaceAroundStep } from '../prosemirror-transform'
import { Slice, Fragment } from '../prosemirror-model'
import { Selection, TextSelection, NodeSelection, AllSelection } from '../prosemirror-state'

export function deleteSelection(state, dispatch) {
  if (state.selection.empty) return false;
  if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
  return true;
}

export function joinBackward(state, dispatch, view) {
  let {$cursor} = state.selection;
  if (!$cursor || (view ? !view.endOfTextblock('backward', state) : $cursor.parentOffset > 0)) {
    return false;
  }

  let $cut = findCutBefore($cursor);

  // If there is no node before this, try to lift
  if (!$cut) {
    let range = $cursor.blockRange();
    let target = range && liftTarget(range);

    if (target == null) return false;
    if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
    return true;
  }

  let before = $cut.nodeBefore;
  // Apply the joining algorithm
  if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch)) {
    return true;
  }

  // If the node below has no content and the node above is
  // selectable, delete the node below and select the one above.
  if ($cursor.parent.content.size === 0 && (textblockAt(before, 'end') || NodeSelection.isSelectable(before))) {
    if (dispatch) {
      let tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(
        textblockAt(before, 'end')
          ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) 
          : NodeSelection.create(tr.doc, $cut.pos - before.nodeSize)
      );
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  // If the node before is an atom, delete it
  if (before.isAtom && $cut.depth === $cursor.depth - 1) {
    if (dispatch) dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView());
    return true;
  }

  return false;
}

function textblockAt(node, side) {
  for (; node; node = (side === 'start' ? node.firstChild : node.lastChild)) {
    if (node.isTextblock) return true;
  }
  return false;
}

export function selectNodeBackward(state, dispatch, view) {
  let {$cursor} = state.selection;
  if (!$cursor || (view ? !view.endOfTextblock('backward', state) : $cursor.parentOffset > 0)) {
    return false;
  }

  let $cut = findCutBefore($cursor);
  let node = $cut && $cut.nodeBefore;

  if (!node || !NodeSelection.isSelectable(node)) return false;
  if (dispatch) {
    dispatch(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView());
  }
  return true;
}

function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (let i = $pos.depth - 1; i >= 0; i--) {
      if ($pos.index(i) > 0) return $pos.doc.resolve($pos.before(i + 1));
      if ($pos.node(i).type.spec.isolating) break;
    }
  }
  return null;
}

export function joinForward(state, dispatch, view) {
  let {$cursor} = state.selection;
  if (!$cursor || (view ? !view.endOfTextblock('forward', state) : $cursor.parentOffset < $cursor.parent.content.size)) {
    return false;
  }

  let $cut = findCutAfter($cursor);

  // If there is no node after this, there's nothing to do
  if (!$cut) return false;

  let after = $cut.nodeAfter;
  // Try the joining algorithm
  if (deleteBarrier(state, $cut, dispatch)) return true;

  // If the node above has no content and the node below is
  // selectable, delete the node above and select the one below.
  if ($cursor.parent.content.size === 0 && (textblockAt(after, 'start') || NodeSelection.isSelectable(after))) {
    if (dispatch) {
      let tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(after, 'start') ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1)
                      : NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  // If the next node is an atom, delete it
  if (after.isAtom && $cut.depth === $cursor.depth - 1) {
    if (dispatch) dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView());
    return true;
  }

  return false;
}

export function selectNodeForward(state, dispatch, view) {
  let {$cursor} = state.selection
  if (!$cursor || (view ? !view.endOfTextblock('forward', state)
                        : $cursor.parentOffset < $cursor.parent.content.size))
    return false

  let $cut = findCutAfter($cursor), node = $cut && $cut.nodeAfter
  if (!node || !NodeSelection.isSelectable(node)) return false
  if (dispatch)
    dispatch(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos)).scrollIntoView())
  return true
}

function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) for (let i = $pos.depth - 1; i >= 0; i--) {
    let parent = $pos.node(i)
    if ($pos.index(i) + 1 < parent.childCount) return $pos.doc.resolve($pos.after(i + 1))
    if (parent.type.spec.isolating) break
  }
  return null
}

export function joinUp(state, dispatch) {
  let sel = state.selection, nodeSel = sel instanceof NodeSelection, point
  if (nodeSel) {
    if (sel.node.isTextblock || !canJoin(state.doc, sel.from)) return false
    point = sel.from
  } else {
    point = joinPoint(state.doc, sel.from, -1)
    if (point == null) return false
  }
  if (dispatch) {
    let tr = state.tr.join(point)
    if (nodeSel) tr.setSelection(NodeSelection.create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize))
    dispatch(tr.scrollIntoView())
  }
  return true
}

export function joinDown(state, dispatch) {
  let sel = state.selection, point
  if (sel instanceof NodeSelection) {
    if (sel.node.isTextblock || !canJoin(state.doc, sel.to)) return false
    point = sel.to
  } else {
    point = joinPoint(state.doc, sel.to, 1)
    if (point == null) return false
  }
  if (dispatch)
    dispatch(state.tr.join(point).scrollIntoView())
  return true
}

export function lift(state, dispatch) {
  let {$from, $to} = state.selection
  let range = $from.blockRange($to), target = range && liftTarget(range)
  if (target == null) return false
  if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView())
  return true
}

export function newlineInCode(state, dispatch) {
  let {$head, $anchor} = state.selection
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false
  if (dispatch) dispatch(state.tr.insertText('\n').scrollIntoView())
  return true
}

export function exitCode(state, dispatch) {
  let {$head, $anchor} = state.selection
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false
  let above = $head.node(-1), after = $head.indexAfter(-1), type = above.contentMatchAt(after).defaultType
  if (!above.canReplaceWith(after, after, type)) return false
  if (dispatch) {
    let pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill())
    tr.setSelection(Selection.near(tr.doc.resolve(pos), 1))
    dispatch(tr.scrollIntoView())
  }
  return true
}

export function createParagraphNear(state, dispatch) {
  let {$from, $to} = state.selection
  if ($from.parent.inlineContent || $to.parent.inlineContent) return false
  let type = $from.parent.contentMatchAt($to.indexAfter()).defaultType
  if (!type || !type.isTextblock) return false
  if (dispatch) {
    let side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos
    let tr = state.tr.insert(side, type.createAndFill())
    tr.setSelection(TextSelection.create(tr.doc, side + 1))
    dispatch(tr.scrollIntoView())
  }
  return true
}

export function liftEmptyBlock(state, dispatch) {
  let {$cursor} = state.selection;
  if (!$cursor || $cursor.parent.content.size) return false;
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    let before = $cursor.before();
    if (canSplit(state.doc, before)) {
      if (dispatch) dispatch(state.tr.split(before).scrollIntoView());
      return true;
    }
  }
  let range = $cursor.blockRange(), target = range && liftTarget(range);
  if (target == null) return false;
  if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
  return true;
}

export function splitBlock(state, dispatch) {
  let {$from, $to} = state.selection;
  if (state.selection instanceof NodeSelection && state.selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) return false;
    if (dispatch) dispatch(state.tr.split($from.pos).scrollIntoView());
    return true;
  }

  if (!$from.parent.isBlock) return false;

  if (dispatch) {
    let atEnd = $to.parentOffset == $to.parent.content.size;
    let tr = state.tr;
    if (state.selection instanceof TextSelection) tr.deleteSelection();
    let deflt = $from.depth == 0 ? null : $from.node(-1).contentMatchAt($from.indexAfter(-1)).defaultType;
    let types = atEnd && deflt ? [{type: deflt}] : null;
    let can = canSplit(tr.doc, $from.pos, 1, types);
    if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{type: deflt}])) {
      types = [{type: deflt}];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd && !$from.parentOffset && $from.parent.type != deflt 
        && $from.node(-1).canReplace($from.index(-1), $from.indexAfter(-1), Fragment.from(deflt.create(), $from.parent))) {
        tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
      }
    }
    dispatch(tr.scrollIntoView());
  }
  return true
}

export function splitBlockKeepMarks(state, dispatch) {
  return splitBlock(state, dispatch && (tr => {
    let marks = state.storedMarks || (state.selection.$to.parentOffset && state.selection.$from.marks());
    if (marks) tr.ensureMarks(marks);
    dispatch(tr);
  }))
}

export function selectParentNode(state, dispatch) {
  let {$from, to} = state.selection;
  let pos;
  let same = $from.sharedDepth(to);
  if (same == 0) return false;
  pos = $from.before(same);
  if (dispatch) dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
  return true;
}

export function selectAll(state, dispatch) {
  if (dispatch) dispatch(state.tr.setSelection(new AllSelection(state.doc)));
  return true;
}

function joinMaybeClear(state, $pos, dispatch) {
  let before = $pos.nodeBefore;
  let after = $pos.nodeAfter;
  let index = $pos.index();
  if (!before || !after || !before.type.compatibleContent(after.type)) return false;
  if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
    if (dispatch) dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView());
    return true;
  }
  if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || canJoin(state.doc, $pos.pos))) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount)).join($pos.pos).scrollIntoView());
  }
  return true;
}

function deleteBarrier(state, $cut, dispatch) {
  let before = $cut.nodeBefore;
  let after = $cut.nodeAfter;
  let conn;
  let match;

  if (before.type.spec.isolating || after.type.spec.isolating) return false;
  if (joinMaybeClear(state, $cut, dispatch)) return true;

  if ($cut.parent.canReplace($cut.index(), $cut.index() + 1) &&
      (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) &&
      match.matchType(conn[0] || after.type).validEnd) {
    if (dispatch) {
      let end = $cut.pos + after.nodeSize;
      let wrap = Fragment.empty;
      for (let i = conn.length - 1; i >= 0; i--) {
        wrap = Fragment.from(conn[i].create(null, wrap))
      }
      wrap = Fragment.from(before.copy(wrap));
      let tr = state.tr.step(new ReplaceAroundStep($cut.pos - 1, end, $cut.pos, end, new Slice(wrap, 1, 0), conn.length, true));
      let joinAt = end + 2 * conn.length;
      if (canJoin(tr.doc, joinAt)) tr.join(joinAt);
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  let selAfter = Selection.findFrom($cut, 1)
  let range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && liftTarget(range)
  if (target != null && target >= $cut.depth) {
    if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView())
    return true
  }

  return false
}

// Parameterized commands

export function wrapIn(nodeType, attrs) {
  return function(state, dispatch) {
    let {$from, $to} = state.selection;
    let range = $from.blockRange($to), wrapping = range && findWrapping(range, nodeType, attrs);
    if (!wrapping) return false;
    if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
    return true;
  }
}

export function setBlockType(nodeType, attrs) {
  return function(state, dispatch) {
    let {from, to} = state.selection;
    let applicable = false;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (applicable) return false;
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
      if (node.type == nodeType) {
        applicable = true;
      } else {
        let $pos = state.doc.resolve(pos), index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
    })
    if (!applicable) return false;
    if (dispatch) dispatch(state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView());
    return true;
  }
}

function markApplies(doc, ranges, type) {
  for (let i = 0, len = ranges.length; i < len; i++) {
    let {$from, $to} = ranges[i];
    let can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, node => {
      if (can) return false;
      can = node.inlineContent && node.type.allowsMarkType(type);
    })
    if (can) return true;
  }
  return false;
}

export function toggleMark(markType, attrs) {
  return function(state, dispatch) {
    let {empty, $cursor, ranges} = state.selection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) return false;
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks())) {
          dispatch(state.tr.removeStoredMark(markType))
        }else {
          dispatch(state.tr.addStoredMark(markType.create(attrs)))
        }
      } else {
        let has = false;
        let tr = state.tr;
        for (let i = 0; !has && i < ranges.length; i++) {
          let {$from, $to} = ranges[i]
          has = state.doc.rangeHasMark($from.pos, $to.pos, markType)
        }

        for (let i = 0; i < ranges.length; i++) {
          let {$from, $to} = ranges[i];
          if (has) {
            tr.removeMark($from.pos, $to.pos, markType);
          }else {
            tr.addMark($from.pos, $to.pos, markType.create(attrs));
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  }
}

function wrapDispatchForJoin(dispatch, isJoinable) {
  return tr => {
    if (!tr.isGeneric) return dispatch(tr);

    let ranges = [];
    for (let i = 0, len = tr.mapping.maps.length; i < len; i++) {
      let map = tr.mapping.maps[i];
      for (let j = 0, lenj = ranges.length; j < lenj; j++) {
        ranges[j] = map.map(ranges[j])
      }
      map.forEach((_s, _e, from, to) => ranges.push(from, to));
    }

    let joinable = [];
    for (let i = 0, rl = ranges.length; i < rl; i += 2) {
      let from = ranges[i];
      let to = ranges[i + 1];
      let $from = tr.doc.resolve(from);
      let depth = $from.sharedDepth(to);
      let parent = $from.node(depth);

      for (let index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index) {
        let after = parent.maybeChild(index);
        if (!after) break;
        if (index && joinable.indexOf(pos) === -1) {
          let before = parent.child(index - 1);
          if (before.type == after.type && isJoinable(before, after)) {
            joinable.push(pos)
          }
        }
        pos += after.nodeSize;
      }
    }
    // Join the joinable points
    joinable.sort((a, b) => a - b);
    for (let i = joinable.length - 1; i >= 0; i--) {
      if (canJoin(tr.doc, joinable[i])) tr.join(joinable[i]);
    }
    dispatch(tr);
  }
}

export function autoJoin(command, isJoinable) {
  if (Array.isArray(isJoinable)) {
    let types = isJoinable;
    isJoinable = node => types.indexOf(node.type.name) > -1;
  }
  return (state, dispatch) => command(state, dispatch && wrapDispatchForJoin(dispatch, isJoinable));
}

export function chainCommands(...commands) {
  return function(state, dispatch, view) {
    for (let i = 0, len = commands.length; i < len; i++) {
      if (commands[i](state, dispatch, view)) return true;
    }
    return false;
  }
}

let backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
let del = chainCommands(deleteSelection, joinForward, selectNodeForward);

export let pcBaseKeymap = {
  'Enter': chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
  'Mod-Enter': exitCode,
  'Backspace': backspace,
  'Mod-Backspace': backspace,
  'Delete': del,
  'Mod-Delete': del,
  'Mod-a': selectAll
};

export let macBaseKeymap = {
  'Ctrl-h': pcBaseKeymap['Backspace'],
  'Alt-Backspace': pcBaseKeymap['Mod-Backspace'],
  'Ctrl-d': pcBaseKeymap['Delete'],
  'Ctrl-Alt-Backspace': pcBaseKeymap['Mod-Delete'],
  'Alt-Delete': pcBaseKeymap['Mod-Delete'],
  'Alt-d': pcBaseKeymap['Mod-Delete']
};

for (let key in pcBaseKeymap) {
  macBaseKeymap[key] = pcBaseKeymap[key];
}

// declare global: os, navigator
const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : typeof os !== 'undefined' ? os.platform() === 'darwin' : false;
export let baseKeymap = mac ? macBaseKeymap : pcBaseKeymap;
