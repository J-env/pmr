import './polyfill'

import { EditorState } from './prosemirror/prosemirror-state'
import { EditorView } from './prosemirror/prosemirror-view'
import { DOMParser } from './prosemirror/prosemirror-model'

import { pluginsGroup } from './pluginsGroup'
import { menus, pmrSchema } from './pmr-schema'
import { selectionContent } from './utils'

const cdn = menus.emojiCdn.replace(/https?:/i, '');
const emojiReg = new RegExp(`<img[^<>]+src="(https?:)?${cdn}.+?"[^<>]*>`, 'gi');
const imagesReg = new RegExp(`<img[^<>]+src="(?!(https?:)?${cdn}).+?"[^<>]*>`, 'gi');
const linkReg = /<a[^<>]+href=".+?"[^<>]*>[^><]*<\/a>/gi;

export class OutletView {
  constructor(config = {}) {
    const self = this;

    this.params = {
      // 不限制图片，表情，链接
      disableLimit: config.disableLimit,
      max: config.max || 2000,
      linkMax: config.linkMax || 10,
      imageMax: config.imageMax || 20,
      emojiMax: config.emojiMax || 50,
      alert: config.alert
    };

    this.$textarea = config.$textarea;
    this.$size = config.$size;

    // new state
    this.state = EditorState.create({
      doc: DOMParser.fromSchema(pmrSchema).parse(config.$content),
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

    // new view
    this.view = new EditorView(config.$target, {
      state: this.state,
      dispatchTransaction, // dispatch-2
      transformPastedHTML(html) {
        console.log(html);
        return self.transformPastedHTML(html);
      },
    });

    this.$text = this.view.dom;
    dispatchTransaction(this.state.tr); // dispatch-1
    console.log(this);
  }

  transformPastedHTML(html = '') {
    html = replaceHtml(html);

    if (!this.params.disableLimit) {
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
    
    return html;
  }

  calcPasteData(html, reg, prop) {
    const state = this.state;
    const MAX = this.params[`${prop}Max`];
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

    return typeof alert === 'function' ? alert.call(this, msg) : window.alert(msg);
  }

  get values() { return this.$text.innerHTML || '' }

  get aboveMax() { return this.currentCount > this.params.max }

  get currentCount() { return (this.contentLength || 0) + (this.emojiCount || 0) }

  dispatchProvider() {
    // 更新表单值
    this.$textarea.value = this.values;
    // 字数计算
    this.getSomeCount();
    // 字数提示
    this.countWords();
  }

  /**
   * @desc 获取一些东西的个数，比如 image、link、表情...
   */
  getSomeCount() {
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
        if (!!contentArr && contentArr.length) {
          accumulator(contentArr);
        }
      }
    }(content));

    this.emojiCount = emojiCount;
    this.linkCount = linkCount;
    this.imageCount = imageCount;
  }

  countWords() {
    this.$size.classList.toggle('pmr-above-max', this.aboveMax);
    this.$size.innerHTML = `字数限制在${this.currentCount}/${this.params.max}字以内，${this.emojiCount}表情，${this.linkCount}链接，${this.imageCount}图片${this.aboveMax ? '，服务器可能拒绝保存！' : ''}`;
  }
}

function replaceHtml(html = '') {
  // 去除表格，word 文档格式
  html = html.replace(/<\/?(table|thead|tbody|tfoot|tr|td|th)[^>]*>|<o:p>[^<>]*<\/o:p>/gi, '');
  // 去除空标签 1
  const rsReg = /<([a-z]+)[^>]*>(&nbsp;)?<\/\1>/ig;
  html = html.replace(rsReg, '').replace(rsReg, '');
  
  // 去除两边无用的html，我把这个放以上的前面 ie不知道为何会卡一会
  return html.replace(/^([\s\S]*<!--StartFragment-->)|(<!--EndFragment-->[\s\S]*)$/gi, '');
}
