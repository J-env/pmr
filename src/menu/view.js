import { Plugin  } from '../prosemirror/prosemirror-state'

import { renderGrouped, createFontMenuItem, wrapItem } from './menu'
import { PanelTabs } from '../panel'
import { contentIsSpace, selectionContent } from '../utils'

function input(placeholder, type) {
  return `<input type="${type || 'text'}" placeholder="${placeholder || '图片链接'}" autocomplete="off">`;
}

function buttons(arr = []) {
  let html = '<div class="pmr-buttons">';
  arr.forEach((item) => {
    html += `<a class="pmr-btn${item.cl ? ' ' + item.cl : ''}" href="javascript:;">${item.text || '插入'}</a>`;
  });

  html += '</div>'
  return html;
}

function inLinkMarks(state, type) {
  let { from, to } = state.selection;
  let ret = [];

  state.doc.nodesBetween(from, to, function (node) {
    if ( type.isInSet(node.marks) ) {
      ret.push(node);
    }
  });

  return ret;
}

class MenuView {
  constructor(dom, editorView, options) {
    this.dom = dom;
    this.editorView = editorView;
    this.options = options;
    this.content = this.options.content;
    this.outlet = options.outlet;
    
    this.createPanelTabs(this.options.menus);

    let {update} = renderGrouped(this.editorView, this.content);
    this.contentUpdate = update;

    this.panelTabs();
    this.update();
  }

  update() {
    this.contentUpdate(this.editorView.state);
  }

  createPanelTabs(menus) {
    const marks = this.options.schema.marks;
    const dom = this.dom;

    // 字体
    this._createFontPanel(menus, marks, dom);
    // 颜色
    this._createColorPanel(menus, marks, dom);
    // emotions
    this._createEmojiPanel(menus, marks, dom);
    // images
    this._createImagePanel(menus, marks, dom);
    // link
    this._createLinkPanel(menus, marks, dom);
  }

  panelTabs() {
    const typeLink = this.options.schema.marks.link;

    function getLinkParams(state) {
      let { from, to } = state.selection;
      // const links = inLinkMarks(state, typeLink);
      const textContent = state.doc.cut(from, to).textContent;

      // if (links.length === 1) {
      //   return {
      //     text: links[0].text,
      //     href: links[0].marks[0].attrs.href,
      //   };
      // }

      return {
        text: textContent,
        href: '',
      };
    }

    this.dom.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;

      if (this.dom.contains(target) && target.parentNode !== this.dom) {
        return false;
      }

      const classList = target.classList;
      if (classList.contains('pmr-disabled')) {
        return;
      }

      if (classList.contains('pmrico-link')) {
        const input = target.querySelectorAll('input[type=text]');
        const state = this.editorView.state;
        var params = getLinkParams(state);

        if(!!input && params.text) {
          input[0].value = params.text;
          input[1].value = params.href;
        }
      }

      classList.contains('pmrico-happy') && showEotions(target.querySelectorAll('img[data-src]'));
      target.$panel && target.$panel.openPanel();
    });

    function showEotions(eotions) {
      eotions.forEach((el) => {
        const src = el.getAttribute('data-src');
        let img = document.createElement('img');
        const fn = function () {
          el.src = this.src;
          el.removeAttribute('data-src');
          img = null;
        };
        
        img.onload = fn;
        img.onerror = fn;
        img.onabort = fn;
        img.src = src;
      });
    }
  }

  _createFontPanel(menus, marks, dom) {
    let fontHtml = '<dt class="pmr-anth__title">字体</dt>';

    menus.fontNames.forEach(font => {
      fontHtml += `<dd data-font="${font}" style="font-family: ${font};" class="pmr-anth__item">${font}</dd>`;

      this.content[0].push(createFontMenuItem(marks[font], {
        selector: `.pmr-anth__item[data-font="${font}"]`
      }));
    });

    createAnth({
      className: 'pmr-fontcolor',
      selector: '.pmrico-font',
      html: fontHtml,
      dom,
    });

    const header = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'p'];
    let headerHtml = '<dt class="pmr-anth__title">标题</dt>';
    header.forEach(h => {
      const tag = h.toLowerCase();
      headerHtml += `<dd class="pmr-anth__item"><${tag}><span>${h === 'p' ? '正文' : h}</span></${tag}></dd>`;
    });

    createAnth({
      className: 'pmr-headers',
      selector: '.pmrico-header',
      html: headerHtml,
      dom,
    });

    createAnth({
      className: 'pmr-list',
      selector: '.pmrico-list2',
      html: `<dt class="pmr-anth__title">设置列表</dt><dd class="pmr-anth__item pmrico-disc">有序列表</dd><dd class="pmr-anth__item pmrico-decimal">无序列表</dd>`,
      dom,
    });
  }

  _createColorPanel(menus, marks, dom) {
    const type = this.options.schema.nodes.blockAlert;
    let colorsHtml = '';

    menus.colors.forEach((color) => {
      colorsHtml += `<span data-color="${color}" class="pmr-anth__item" title="${color}"><i style="color: ${color};" class="pmrico-paint-brush"></i></span>`;

      this.content[1].push(createFontMenuItem(marks[color], {
        selector: `.pmr-anth__item[data-color="${color}"]`
      }));
    });

    let panelsHtml = ''
    menus.panels.forEach(panel => {
      panelsHtml += `<span data-panel="${panel}" class="pmr-anth__item" title="${panel}"><i class="pmrico-${panel}"></i></span>`;

      this.content[2].push(wrapItem(type, {
        attrs: { 'class': `pmrico-${panel}`},
        selector: `.pmr-anth__item[data-panel="${panel}"]`
      }));
    });

    new PanelTabs({
      tabs: [
        { title: '面板', tpl: `<div class="pmr-clearfix">${panelsHtml}</div>`},
        { title: '文字颜色', tpl: `<div style="display: none;" class="pmr-clearfix">${colorsHtml}</div>` }
      ],
      dom: dom,
      contentClass: 'pmr-colors-container',
      button: '.pmrico-infos',
    });
  }

  _createEmojiPanel(menus, marks, dom) {
    let tabs = [];
    const cdn = menus.emojiCdn;
    const view = this.editorView;
    const type = this.options.schema.nodes.emoji;
    const outlet = this.outlet;
    const emojiMax = outlet.emojiMax;

    menus.emotions.forEach((data, index) => {
      const type = data.type;
      const content = data.content || [];
      let faceHtml = '';
      
      // emoji 表情
      if (type === 'emoji') {
        content.forEach((item) => {
          if (item) {
            faceHtml += '<span class="pmr-emoj">' + item + '</span>';
          }
        });
      }

      // 图片表情
      if (type === 'image') {
        content.forEach((item, i) => {
          const src = item.src;
          const alt = item.alt;
          const data_ = i <= 20 ? '' : 'data-';

          if (src) {
            faceHtml += `<span class="pmr-emoj" title="${alt}"><img ${data_}src="${cdn}${src}" alt="${alt}"></span>`;
          }
        });
      }

      tabs.push({
        title: data.title,
        tpl: `<div ${index !== 0 ? 'style="display: none;"' : ''} class="pmr-emoticon">${faceHtml}</div>`
      })
    });

    new PanelTabs({
      tabs,
      contentClass: 'pmr-emoj-container',
      dom: dom,
      button: '.pmrico-happy',
      onclick: (e, $panel) => {
        let target = e.target;
        const tagName = target.tagName === 'IMG';
        const isEmoj = target.classList.contains('pmr-emoj');

        if (!tagName && !isEmoj) {
          return false;
        }
  
        if (tagName) {
          target = target;
        }
  
        if (isEmoj) {
          target = target.querySelector('img');
        }

        const src = target.src;
        const emojiCount = outlet.emojiCount;
        const isAlert = insertEmoji(type, src, target.alt)(view.state, view.dispatch, emojiCount, emojiMax);

        view.focus();
        isAlert === null && outlet.alert(emojiMax, 'emoji');
        // true 关闭 panel
        return true;
      }
    });

    function insertEmoji(type, src, alt) {
      return function(state, dispatch, count, max) {
        let { $from } = state.selection;
        let index = $from.index();
        
        if (!$from.parent.canReplaceWith(index, index, type)) {
          return false;
        }
        
        if (dispatch) {
          const len = selectionContent(state, 'emoji');

          if (count >= max && !len) {
            return null;
          }

          dispatch(state.tr.replaceSelectionWith(type.create({src, alt}), false));
        }
        return true;
      };
    }
  }

  _createLinkPanel(menus, marks, dom) {
    const view = this.editorView;
    const type = this.options.schema.marks.link;
    const outlet = this.outlet;
    const linkMax = outlet.linkMax;

    new PanelTabs({
      tabs: [
        {
          title: '链接',
          tpl: `<div class="pmr-linkimg">${input('链接文字')}${input('链接')}${buttons([{ cl: 'pmr-set-link' }])}</div>`
        }
      ],
      dom: dom,
      button: '.pmrico-link',
      onclick: (e, $panel) => {
        let target = e.target;

        if (target.classList.contains('pmr-set-link') && target.tagName === 'A') {

          if (outlet.linkCount >= linkMax) {
            outlet.alert(linkMax, 'link');
            return true;
          }

          let inputs = target.parentNode.parentNode.querySelectorAll('input[type=text]');
          let target0 = inputs[0];
          let target1 = inputs[1];
          let href = target1.value;
          let text = target0.value;

          if (href && text && !contentIsSpace(href) && !contentIsSpace(text)) {
            let schema = view.state.schema;
            let node = schema.text(text, [type.create({ href })]);
            view.dispatch(view.state.tr.replaceSelectionWith(node, false));
            target0.value = '';
            target1.value = '';
            // true 关闭 panel
            return true;
          }else {
            text ? target1.focus() : target0.focus();
          }
        }
      }
    });
  }

  _createImagePanel(menus, marks, dom) {
    const view = this.editorView;
    const type = this.options.schema.nodes.image;
    const outlet = this.outlet;
    const imageMax = outlet.imageMax;
    
    new PanelTabs({
      tabs: [
        {
          title: '上传图片',
          tpl: `<div class="pmr-upload-img"><div class="pmr-upload__trigger"><i class="pmrico-upload2"></i></div><p class="pmr-upload__tips">建议尺寸1056 x 400PX，大小2M</p></div>`
        },
        {
          title: '网络图片',
          tpl: `<div style="display: none;" class="pmr-linkimg">${input()}${buttons([{ cl: 'pmr-set-image' }])}</div>`
        }
      ],
      dom: dom,
      button: '.pmrico-image',
      onclick: (e, $panel) => {
        let target = e.target;

        if (target.classList.contains('pmr-set-image') && target.tagName === 'A') {
          let target = e.target.parentNode.parentNode.querySelector('input[type=text]');

          let fields = { src: target.value };
          const imageCount = outlet.imageCount;

          if (fields.src && !contentIsSpace(fields.src)) {
            const isAlert = insertImage(view, fields, imageCount, imageMax);
            target.value = '';
            isAlert === null && outlet.alert(imageMax, 'image');
            // true 关闭 panel
            return true;
    
          }else {
            target.focus();
          }
        }
      }
    });

    function insertImage(view, fields, count, max) {
      const state = view.state;
      const len = selectionContent(state, 'image');

      if (count >= max && !len) {
        return null;
      }

      view.dispatch( state.tr.replaceSelectionWith(type.createAndFill(fields), false) );
    }
  }
}

export function createAnth(params = {}) {
  let fragment = document.createDocumentFragment();
  let inner = document.createElement('div');
  inner.className = 'pmr-dropdown__inner';

  let dl = document.createElement('dl');
  dl.className = `pmr-anth${params.className ? ` ${params.className}` : ''}`;
  dl.innerHTML = params.html;

  inner.appendChild(dl);
  fragment.appendChild(inner);
  return params.dom.querySelector(`${params.selector}.pmr-dropdown .pmr-dropdown__content`).appendChild(fragment);
}

export function menuPlugin(options) {
  return new Plugin({
    view(editorView) {
      const parentNode = editorView.dom.parentNode;
      const $toolbar = parentNode.querySelector('.pmr-toolbar');
      parentNode.style.cssText += `; padding-top: ${$toolbar.offsetHeight}px;`;
      
      return new MenuView($toolbar, editorView, options);
    },
    // 编辑区添加class
    props: {
      attributes: { 'class': 'pmr-textarea' }
    }
  });
}
