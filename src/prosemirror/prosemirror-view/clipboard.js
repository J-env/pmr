import { Slice, Fragment, DOMParser, DOMSerializer } from '../prosemirror-model'

export function serializeForClipboard(view, slice) {
  let context = [], {content, openStart, openEnd} = slice;
  while (openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1) {
    openStart--;
    openEnd--;
    let node = content.firstChild;
    context.push(node.type.name, node.type.hasRequiredAttrs() ? node.attrs : null);
    content = node.content;
  }

  let serializer = view.someProp('clipboardSerializer') || DOMSerializer.fromSchema(view.state.schema);
  let wrap = document.createElement('div');
  wrap.appendChild(serializer.serializeFragment(content));

  let firstChild = wrap.firstChild, needsWrap;
  while (firstChild && firstChild.nodeType === 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
    for (let i = needsWrap.length - 1; i >= 0; i--) {
      let wrapper = document.createElement(needsWrap[i]);
      while (wrap.firstChild) {
        wrapper.appendChild(wrap.firstChild);
      }
      wrap.appendChild(wrapper);
    }
    firstChild = wrap.firstChild;
  }

  if (firstChild && firstChild.nodeType === 1) {
    firstChild.setAttribute('data-pm-slice', `${openStart} ${openEnd} ${JSON.stringify(context)}`);
  }

  let text = view.someProp('clipboardTextSerializer', f => f(slice)) || slice.content.textBetween(0, slice.content.size, '\n\n');
  return {dom: wrap, text};
}

export function parseFromClipboard(view, text, html, plainText, $context) {
  let dom, inCode = $context.parent.type.spec.code, slice;
  if (!html && !text) return null;
  let asText = text && (plainText || inCode || !html);


  if (asText) {
    view.someProp('transformPastedText', f => { text = f(text) });
    if (inCode) return new Slice(Fragment.from(view.state.schema.text(text)), 0, 0);
    let parsed = view.someProp('clipboardTextParser', f => f(text, $context));
    if (parsed) {
      slice = parsed;
    } else {
      dom = document.createElement('div');
      text.trim().split(/(?:\r\n?|\n)+/).forEach(block => {
        dom.appendChild(document.createElement('p')).textContent = block;
      });
    }
  } else {
    view.someProp('transformPastedHTML', f => html = f(html));
    dom = readHTML(html);
  }

  let contextNode = dom && dom.querySelector('[data-pm-slice]');
  let sliceData = contextNode && /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute('data-pm-slice'));
  if (!slice) {
    let parser = view.someProp('clipboardParser') || view.someProp('domParser') || DOMParser.fromSchema(view.state.schema);
    slice = parser.parseSlice(dom, {preserveWhitespace: !!(asText || sliceData), context: $context});
  }
  if (sliceData) {
    slice = addContext(new Slice(slice.content, Math.min(slice.openStart, +sliceData[1]), Math.min(slice.openEnd, +sliceData[2])), sliceData[3]);
  }else {
    // HTML wasn't created by ProseMirror. Make sure top-level siblings are coherent
    slice = Slice.maxOpen(normalizeSiblings(slice.content, $context), false);
  }
  view.someProp('transformPasted', f => { slice = f(slice) });
  return slice;
}

function normalizeSiblings(fragment, $context) {
  if (fragment.childCount < 2) return fragment;
  for (let d = $context.depth; d >= 0; d--) {
    let parent = $context.node(d);
    let match = parent.contentMatchAt($context.index(d));
    let lastWrap, result = [];
    fragment.forEach(node => {
      if (!result) return;
      let wrap = match.findWrapping(node.type), inLast;
      if (!wrap) return result = null;
      if (inLast = result.length && lastWrap.length && addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) {
        result[result.length - 1] = inLast;
      } else {
        if (result.length) result[result.length - 1] = closeRight(result[result.length - 1], lastWrap.length);
        let wrapped = withWrappers(node, wrap);
        result.push(wrapped);
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });

    if (result) return Fragment.from(result);
  }
  return fragment;
}

function withWrappers(node, wrap, from = 0) {
  for (let i = wrap.length - 1; i >= from; i--) {
    node = wrap[i].create(null, Fragment.from(node));
  }
  return node;
}

function addToSibling(wrap, lastWrap, node, sibling, depth) {
  if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
    let inner = addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
    if (inner) return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
    let match = sibling.contentMatchAt(sibling.childCount);
    if (match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1])) {
      return sibling.copy(sibling.content.append(Fragment.from(withWrappers(node, wrap, depth + 1))))
    }
  }
}

function closeRight(node, depth) {
  if (depth == 0) return node
  let fragment = node.content.replaceChild(node.childCount - 1, closeRight(node.lastChild, depth - 1))
  let fill = node.contentMatchAt(node.childCount).fillBefore(Fragment.empty, true)
  return node.copy(fragment.append(fill))
}

const wrapMap = {
  thead: ['table'],
  colgroup: ['table'],
  col: ['table', 'colgroup'],
  tr: ['table', 'tbody'],
  td: ['table', 'tbody', 'tr'],
  th: ['table', 'tbody', 'tr']
};

let detachedDoc = null;
function readHTML(html) {
  let metas = /(\s*<meta [^>]*>)*/.exec(html);
  if (metas) {
    html = html.slice(metas[0].length);
  }
  let doc = detachedDoc || (detachedDoc = document.implementation.createHTMLDocument('title'))
  let elt = doc.createElement('div');
  let firstTag = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(html), wrap, depth = 0;
  if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
    html = wrap.map(n => '<' + n + '>').join('') + html + wrap.map(n => '</' + n + '>').reverse().join('');
    depth = wrap.length;
  }
  elt.innerHTML = html;
  for (let i = 0; i < depth; i++) {
    elt = elt.firstChild;
  }
  return elt;
}

function addContext(slice, context) {
  if (!slice.size) return slice;

  let schema = slice.content.firstChild.type.schema, array;
  try {
    array = JSON.parse(context);
  }catch(e) {
    return slice;
  }

  let {content, openStart, openEnd} = slice;
  for (let i = array.length - 2; i >= 0; i -= 2) {
    let type = schema.nodes[array[i]];
    if (!type || type.hasRequiredAttrs()) break;
    content = Fragment.from(type.create(array[i + 1], content));
    openStart++;
    openEnd++;
  }
  return new Slice(content, openStart, openEnd);
}
