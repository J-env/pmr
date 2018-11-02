import crel from 'crel'

import { getIndex, PANEL, PANEL_CONTAIN, HOVER, PANEL_ACTIVE } from './utils'

export class PanelTabs {
  constructor(options) {
    this.options = options;
    this.docListenerFn = null;
    this.$button = this.options.dom.querySelector(`.${PANEL_CONTAIN}${this.options.button}`);

    this.init();
    this.$button.$panel = this;
    PanelTabs.list$.push(this);
  }

  init() {
    const $fragment = document.createDocumentFragment();
    const contentClass = this.options.contentClass;
    const panelClass = this.options.panelClass;
    const $tabs = crel('div', {'class': `${PANEL}__tabs pmr-clearfix`});
    const array = this.options.tabs || [];
    let tpl = '';

    array.forEach((item, i) => {
      const $tab = crel('p', {'class': `${PANEL}__btn${i === 0 ? ` ${PANEL}--active` : ''}`});
      $tab.innerHTML = item.title;
      $tabs.appendChild($tab);
      tpl += item.tpl;
    });

    this.$content = crel('div', { 'class': `${PANEL}__content${contentClass ? ` ${contentClass}` : ''}` });
    this.$content.innerHTML = tpl;

    this.$panel = crel('div', { 'class': `${PANEL}${panelClass ? ` ${panelClass}` : ''}` }, $tabs, this.$content);
    const $wrap = crel('div', { 'class': 'pmr-dropdown__inner' }, this.$panel);
    
    this.bindEvent();
    $fragment.appendChild($wrap);
    this.$button.querySelector('.pmr-dropdown__content').appendChild($fragment);
  }

  hidePanel() {
    this.docListenerFn && document.removeEventListener('click', this.docListenerFn);
    this.$button.classList.remove(HOVER);
  }

  openPanel(callback) {
    var that = this;

    PanelTabs.list$.forEach((panel) => {
      panel.hidePanel && panel.hidePanel();
    });

    this.$button.classList.add(HOVER);
    typeof callback === 'function' && callback.call(this, this.$panel);
    this.firstInputFocus(this.$content);

    setTimeout(function () {
      that.docListenerFn = (e) => that.hidePanel();
      document.addEventListener('click', that.docListenerFn);
    });
  }

  bindEvent() {
    this.$panel.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      let target = e.target;
      const classList = target.classList;

      // tab 切换
      if (classList.contains(`${PANEL}__btn`) && !classList.contains(PANEL_ACTIVE)) {
        this.toggleTabs(target);

      }else if (typeof this.options.onclick === 'function') {
        const close = this.options.onclick.call(this, e, this.$panel);
        close && this.hidePanel();
      }

      _closePanel(target, this);
    });

    function _closePanel(target, that) {
      if (target.tagName === 'I') {
        target = target.parentNode;
      }

      if (target.classList.contains('pmr-anth__item')) {
        if (target.hasAttribute('data-color') || target.hasAttribute('data-panel')) {
          that.hidePanel();
        }
      }
    }
  }

  firstInputFocus(target) {
    const $input = target.querySelector('input[type=text]');
    $input && $input.focus();
  }

  toggleTabs(target) {
    const parentNode = target.parentNode;
    const children = parentNode.children;
    const index = getIndex(target, children);
    const contents = parentNode.nextElementSibling.children;
    const $index = contents[index];

    for (let i = 0, len = contents.length; i < len; i++) {
      contents[i].style.cssText += ';display:none;';
      children[i].classList.remove(PANEL_ACTIVE);
    }

    children[index].classList.add(PANEL_ACTIVE);
    $index.style.cssText += ';display:block;';
    this.firstInputFocus($index);
  }
}

PanelTabs.list$ = [];
