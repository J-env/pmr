import './scss/index.scss';

// js
import './polyfill'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'

import { pluginsGroup } from './pluginsGroup'
import { menus, pmrSchema } from './pmr-schema'
import { selectionContent } from './utils'

const cdn = menus.emojiCdn.replace(/https?:/i, '');
const emojiReg = new RegExp(`<img[^<>]+src="(https?:)?${cdn}.+?"[^<>]*>`, 'gi');
const imagesReg = new RegExp(`<img[^<>]+src="(?!(https?:)?${cdn}).+?"[^<>]*>`, 'gi');
const linkReg = /<a[^<>]+href=".+?"[^<>]*>[^><]*<\/a>/gi;

export class OutletView {
  constructor(params = {}) {
    const self = this;
    // params
    this.params = params;
    this.max = params.max || 2000;
    this.linkMax = params.linkMax || 10;
    this.imageMax = params.imageMax || 20;
    this.emojiMax = params.emojiMax || 50;
    // 不限制图片，表情，链接，后台管理用了
    this.notLimit = params.notLimit;

    this.textarea = params.textarea;
    this.size = params.size;

    // new state
    this.state = EditorState.create({
      doc: DOMParser.fromSchema(pmrSchema).parse(params.content),
      plugins: pluginsGroup({
        menus,
        schema: pmrSchema,
        outlet: this
      }),
    });

    // 调度更新...
    function dispatchTransaction(tr) {
      // prosemirror文档要求
      self.state = self.state.apply(tr);
      self.view.updateState(self.state);
      // 执行自己一些操作
      self.dispatchProvider();
    }

    this.view = new EditorView(params.target, {
      state: this.state,
      dispatchTransaction, // dispatch-2
      transformPastedHTML(html) {
        console.log(html);
        return self.trPastedHTML(html);
      },
    });

    this.text = this.view.dom;
    dispatchTransaction(this.state.tr); // dispatch-1
  }

  trPastedHTML(html = '') {
    // 去除表格，word 文档格式
    html = html.replace(/<\/?(table|thead|tbody|tfoot|tr|td|th)[^>]*>|<o:p>[^<>]*<\/o:p>/gi, '');
    // 去除空标签 1
    html = html.replace(/<([a-z]+)[^>]*>(&nbsp;)?<\/\1>/ig, '');
    
    // 去除两边无用的html，我把这个放以上的前面 ie不知道为何会卡一会
    html = html.replace(/[\s\S]*<!--StartFragment-->|<!--EndFragment-->[\s\S]*/gi, '');
    
    if (!this.notLimit) {
      const emojMatch = html.match(emojiReg);
      const imagesMatch = html.match(imagesReg);
      const linksMatch = html.match(linkReg);
      
      if (!!emojMatch) {
        html = this.calcPasteData(html, emojiReg, 'emoji');
      }
      
      if (!!imagesMatch) {
        html = this.calcPasteData(html, imagesReg, 'image');
      }
      
      if (!!linksMatch) {
        html = this.calcPasteData(html, linkReg, 'link');
      }
    }
    
    // 去除空标签 2
    html = html.replace(/<([a-z]+)[^>]*>(&nbsp;)?<\/\1>/ig, '');
    return html;
  }

  calcPasteData(html, reg, prop) {
    const state = this.state;
    const MAX = this[`${prop}Max`];
    const COUNT = this[`${prop}Count`];
    const acc = prop + '$';
    this[acc] = 0;

    // 计算选中的区域含有多少个 prop类型的
    const len = selectionContent(state, prop);
    
    html = html.replace(reg, data => {
      if (MAX - COUNT + len <= this[acc]) {
        return prop === 'link' ? data.replace(/<(\/)?a[^<>]*>/gi, '') : '';
      }

      this[acc]++;
      return data;
    });

    if (COUNT >= MAX && !len) {
      this.alert(MAX, prop);
    }
    return html;
  }

  alert(max, type) {
    var msg = '';
    const alert = this.params.alert;

    switch (type) {
      case 'link':
        msg = '最多只能添加' + max + '个链接';
        break;

      case 'emoji':
        msg = '最多只能输入' + max + '个表情';
        break;

      case 'image':
        msg = '最多只能上传' + max + '张图片';
        break;

      case 'video':
        msg = '最多只能上传' + max + '个视频';
        break;

      default:
        ;
    }

    if (typeof alert === 'function') {
      return alert.call(this, msg);
    }else {
      return window.alert(msg);
    }
  }

  get values() { return this.text.innerHTML || ''; }

  get aboveMax() { return this.currentCount > this.max; }

  get currentCount() { return (this.contentLength || 0) + (this.emojiCount || 0); }

  dispatchProvider() {
    // 更新表单值
    this.textarea.value = this.values;
    // 字数计算
    this.getSomeCount();
    // 字数提示
    this.countWords();
  }

  countWords() {
    this.size.classList.toggle('pmr-above-max', this.aboveMax);
    this.size.innerHTML = `字数限制在${this.currentCount}/${this.max}字以内，${this.emojiCount}表情，${this.linkCount}链接，${this.imageCount}图片${this.aboveMax ? '，服务器可能拒绝保存！' : ''}`;
  }

  /**
   * @desc 获取一些东西的个数，比如 image、link、表情...
   */
  getSomeCount() {
    const self = this;
    const doc = this.state.doc;
    const content = doc.content.toJSON();

    this.contentLength = doc.textContent.length;

    let emojiCount = 0;
    let linkCount = 0;
    let imageCount = 0;

    // console.log(content);

    (function accumulator(data) {
      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i];
        const type = item.type;

        if (type === 'emoji') {
          emojiCount++;

        }else if (type === 'image') {
          imageCount++;

        }else if (type === 'text') {
          const marks = item.marks;
          !!marks && marks.length && marks[0].type === 'link' && linkCount++;
        }

        const contentArr = item.content;
        !!contentArr && contentArr.length && accumulator(contentArr);
      }
    }(content));

    this.emojiCount = emojiCount;
    this.linkCount = linkCount;
    this.imageCount = imageCount;
  }
}
