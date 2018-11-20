import RopeSequence from 'rope-sequence'
import { Mapping } from '../prosemirror-transform'
import { Plugin, PluginKey } from '../prosemirror-state'

const max_empty_items = 500;

class Branch {
  constructor(items, eventCount) {
    this.items = items;
    this.eventCount = eventCount;
  }

  popEvent(state, preserveItems) {
    if (this.eventCount === 0) return null;

    let end = this.items.length;
    for (;; end--) {
      let next = this.items.get(end - 1);
      if (next.selection) {
        --end;
        break;
      }
    }

    let remap;
    let mapFrom;
    if (preserveItems) {
      remap = this.remapping(end, this.items.length);
      mapFrom = remap.maps.length;
    }
    
    let transform = state.tr;
    let selection, remaining;
    let addAfter = [];
    let addBefore = [];

    this.items.forEach((item, i) => {
      if (!item.step) {
        if (!remap) {
          remap = this.remapping(end, i + 1);
          mapFrom = remap.maps.length;
        }
        mapFrom--;
        addBefore.push(item);
        return;
      }

      if (remap) {
        addBefore.push(new Item(item.map));
        let step = item.step.map(remap.slice(mapFrom));
        let map;

        if (step && transform.maybeStep(step).doc) {
          map = transform.mapping.maps[transform.mapping.maps.length - 1];
          addAfter.push(new Item(map, null, null, addAfter.length + addBefore.length));
        }
        mapFrom--;
        if (map) remap.appendMap(map, mapFrom);

      } else {
        transform.maybeStep(item.step);
      }

      if (item.selection) {
        selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
        remaining = new Branch(this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this.eventCount - 1);
        return false;
      }
    }, this.items.length, 0);

    return {remaining, transform, selection};
  }

  addTransform(transform, selection, histOptions, preserveItems) {
    let newItems = [];
    let eventCount = this.eventCount;
    let oldItems = this.items;
    let lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;

    for (let i = 0, len = transform.steps.length; i < len; i++) {
      let step = transform.steps[i].invert(transform.docs[i]);
      let item = new Item(transform.mapping.maps[i], step, selection);
      let merged;

      if (merged = lastItem && lastItem.merge(item)) {
        item = merged;
        if (i) {
          newItems.pop();
        }else {
          oldItems = oldItems.slice(0, oldItems.length - 1);
        }
      }

      newItems.push(item);
      if (selection) {
        eventCount++;
        selection = null;
      }

      if (!preserveItems) {
        lastItem = item;
      }
    }

    let overflow = eventCount - histOptions.depth;
    if (overflow > DEPTH_OVERFLOW) {
      oldItems = cutOffEvents(oldItems, overflow);
      eventCount -= overflow;
    }
    return new Branch(oldItems.append(newItems), eventCount);
  }

  remapping(from, to) {
    let maps = new Mapping();
    this.items.forEach((item, i) => {
      let mirrorPos = 
        item.mirrorOffset != null && i - item.mirrorOffset >= from
          ? mirrorPos = maps.maps.length - item.mirrorOffset
          : null;

      maps.appendMap(item.map, mirrorPos);
    }, from, to);
    return maps;
  }

  addMaps(array) {
    if (this.eventCount === 0) return this;
    return new Branch(this.items.append(array.map(map => new Item(map))), this.eventCount);
  }

  rebased(rebasedTransform, rebasedCount) {
    if (!this.eventCount) return this;

    let rebasedItems = [];
    let start = Math.max(0, this.items.length - rebasedCount);

    let mapping = rebasedTransform.mapping;
    let newUntil = rebasedTransform.steps.length;
    let eventCount = this.eventCount;
    this.items.forEach(item => {
      if (item.selection) eventCount--;
    }, start);

    let iRebased = rebasedCount;
    this.items.forEach(item => {
      let pos = mapping.getMirror(--iRebased);
      if (pos == null) return;

      newUntil = Math.min(newUntil, pos);
      let map = mapping.maps[pos];
      if (item.step) {
        let step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
        let selection = item.selection && item.selection.map(mapping.slice(iRebased, pos));
        if (selection) eventCount++;
        rebasedItems.push(new Item(map, step, selection));
      } else {
        rebasedItems.push(new Item(map));
      }
    }, start);

    let newMaps = [];
    for (let i = rebasedCount; i < newUntil; i++) {
      newMaps.push(new Item(mapping.maps[i]));
    }
    let items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
    let branch = new Branch(items, eventCount);

    if (branch.emptyItemCount() > max_empty_items) {
      branch = branch.compress(this.items.length - rebasedItems.length);
    }
    return branch;
  }

  emptyItemCount() {
    let count = 0;
    this.items.forEach(item => {
      if (!item.step) count++;
    });
    return count;
  }

  compress(upto = this.items.length) {
    let remap = this.remapping(0, upto);
    let mapFrom = remap.maps.length;
    let items = [];
    let events = 0;

    this.items.forEach((item, i) => {
      if (i >= upto) {
        items.push(item);
        if (item.selection) events++;

      } else if (item.step) {
        let step = item.step.map(remap.slice(mapFrom));
        let map = step && step.getMap();
        mapFrom--;
        if (map) remap.appendMap(map, mapFrom);

        if (step) {
          let selection = item.selection && item.selection.map(remap.slice(mapFrom));
          if (selection) events++;
          let newItem = new Item(map.invert(), step, selection);
          let merged;
          let last = items.length - 1;

          if (merged = items.length && items[last].merge(newItem)) {
            items[last] = merged;
          }else {
            items.push(newItem);
          }            
        }

      } else if (item.map) {
        mapFrom--;
      }

    }, this.items.length, 0);
    return new Branch(RopeSequence.from(items.reverse()), events);
  }
}

Branch.empty = new Branch(RopeSequence.empty, 0);

function cutOffEvents(items, n) {
  let cutPoint;
  items.forEach((item, i) => {
    if (item.selection && (n-- === 0)) {
      cutPoint = i;
      return false;
    }
  });
  return items.slice(cutPoint);
}

class Item {
  constructor(map, step, selection, mirrorOffset) {
    this.map = map;
    this.step = step;
    this.selection = selection;
    this.mirrorOffset = mirrorOffset;
  }

  merge(other) {
    if (this.step && other.step && !other.selection) {
      let step = other.step.merge(this.step);
      if (step) return new Item(step.getMap().invert(), step, this.selection);
    }
  }
}

export class HistoryState {
  constructor(done, undone, prevRanges, prevTime) {
    this.done = done;
    this.undone = undone;
    this.prevRanges = prevRanges;
    this.prevTime = prevTime;
  }
}

const DEPTH_OVERFLOW = 20;

function applyTransaction(history, state, tr, options) {
  let historyTr = tr.getMeta(historyKey);
  let rebased;
  if (historyTr) return historyTr.historyState;

  if (tr.getMeta(closeHistoryKey)) {
    history = new HistoryState(history.done, history.undone, null, 0);
  }

  let appended = tr.getMeta('appendedTransaction');

  if (tr.steps.length === 0) {
    return history;

  }else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo) {
      return new HistoryState(
        history.done.addTransform(tr, null, options, mustPreserveItems(state)),
        history.undone,
        rangesFor(tr.mapping.maps[tr.steps.length - 1]),
        history.prevTime
      );
    }else {
      return new HistoryState(
        history.done,
        history.undone.addTransform(tr, null, options, mustPreserveItems(state)),
        null,
        history.prevTime
      );
    }
      
  }else if (tr.getMeta('addToHistory') !== false && !(appended && appended.getMeta('addToHistory') === false)) {
    // Group transforms that occur in quick succession into one event.
    let newGroup = history.prevTime < (tr.time || 0) - options.newGroupDelay || !appended && !isAdjacentTo(tr, history.prevRanges);
    let prevRanges = appended ? mapRanges(history.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);

    return new HistoryState(
      history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null, options, mustPreserveItems(state)),
      Branch.empty,
      prevRanges,
      tr.time
    );

  }else if (rebased = tr.getMeta('rebased')) {
    // Used by the collab module to tell the history that some of its
    // content has been rebased.
    return new HistoryState(
      history.done.rebased(tr, rebased),
      history.undone.rebased(tr, rebased),
      mapRanges(history.prevRanges, tr.mapping),
      history.prevTime
    );
  }else {
    return new HistoryState(
      history.done.addMaps(tr.mapping.maps),
      history.undone.addMaps(tr.mapping.maps),
      mapRanges(history.prevRanges, tr.mapping),
      history.prevTime
    );
  }
}

function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges) return false;
  if (!transform.docChanged) return true;
  let adjacent = false;
  transform.mapping.maps[0].forEach((start, end) => {
    for (let i = 0, len = prevRanges.length; i < len; i += 2) {
      if (start <= prevRanges[i + 1] && end >= prevRanges[i]) {
        adjacent = true;
      }
    }
  });
  return adjacent;
}

function rangesFor(map) {
  let result = [];
  map.forEach((_from, _to, from, to) => result.push(from, to));
  return result;
}

function mapRanges(ranges, mapping) {
  if (!ranges) return null;
  let result = [];

  for (let i = 0, len = ranges.length; i < len; i += 2) {
    let from = mapping.map(ranges[i], 1);
    let to = mapping.map(ranges[i + 1], -1);
    if (from <= to) result.push(from, to);
  }
  return result;
}

function histTransaction(history, state, dispatch, redo) {
  let preserveItems = mustPreserveItems(state);
  let histOptions = historyKey.get(state).spec.config;
  let pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) return;

  let selection = pop.selection.resolve(pop.transform.doc);
  let added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
  let newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, {redo, historyState: newHist}).scrollIntoView());
}

let cachedPreserveItems = false;
let cachedPreserveItemsPlugins = null;

function mustPreserveItems(state) {
  let plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (let i = 0, len = plugins.length; i < len; i++) {
      if (plugins[i].spec.historyPreserveItems) {
        cachedPreserveItems = true;
        break;
      }
    }
  }
  return cachedPreserveItems;
}

export function closeHistory(tr) {
  return tr.setMeta(closeHistoryKey, true);
}

const historyKey = new PluginKey('history');
const closeHistoryKey = new PluginKey('closeHistory');

export function history(config) {
  config = {
    depth: config && config.depth || 100,
    newGroupDelay: config && config.newGroupDelay || 500
  };
  return new Plugin({
    key: historyKey,
    state: {
      init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0);
      },
      apply(tr, hist, state) {
        return applyTransaction(hist, state, tr, config);
      }
    },
    config
  });
}

export function undo(state, dispatch) {
  let hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount === 0) return false;
  if (dispatch) histTransaction(hist, state, dispatch, false);
  return true;
}

export function redo(state, dispatch) {
  let hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount === 0) return false;
  if (dispatch) histTransaction(hist, state, dispatch, true);
  return true;
}

export function undoDepth(state) {
  let hist = historyKey.getState(state);
  return hist ? hist.done.eventCount : 0;
}

export function redoDepth(state) {
  let hist = historyKey.getState(state);
  return hist ? hist.undone.eventCount : 0;
}
