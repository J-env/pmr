export const PANEL = 'pmr-panel';
export const PANEL_CONTAIN = 'pmr-panel-contain';
export const HOVER = 'pmr-hover';
export const PANEL_ACTIVE = 'pmr-panel--active';

export function selectionContent(state, prop = 'emoji') {
  const selection = state.selection;
  if (selection.empty) {
    return 0;
  }
  
  let ret = [];
  const json = selection.content().toJSON();
  const content = json.content;

  (function fn(data) {
    data.forEach(item => {
      const type = item.type;
      if (type === prop) {
        ret.push(item);
      }

      if (type === 'text' && !!item.marks) {
        fn(item.marks);
      }

      if (type === 'paragraph') {
        fn(item.content);
      }
    });
  }(content));

  return ret.length;
}

/**
 * @desc 判断是否全是空格
 * @param {String} content 
 */
export function contentIsSpace(content) {
  return !!content.length && content.trim() === '';
}

/**
 * @desc 判断 {}
 */
export function isEmptyObject(obj) {
  return JSON.stringify(obj) === '{}';
}

/**
 * @desc rgb(0,0,0) => #000000
 * @param {String} color 
 */
export function rgb2Hex(color) {
  color = color.replace(';', '');

  if (/^(rgb)/.test(color)) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
  
    var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  }

  return color;
}

/**
 * @desc 获取 target在其父级的 index
 * @param {Node} target 
 */
export function getIndex(target, children) {
  children = children || target.parentNode.children;
  for (let i = 0, len = children.length; i < len; i++) {
    if (children[i] === target) {
      return i;
    }
  }
}
