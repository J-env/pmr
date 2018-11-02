import { Schema } from 'prosemirror-model'
import { addListNodes } from 'prosemirror-schema-list'
import { schema } from './prosemirror-schema-basic/schema-basic'

// 菜单配置
export const menus = {
  emojiCdn: 'https://web.rrzuzu.com/WebStatic/mjsuo/emotions/',
  fontNames: [
    '宋体',
    '微软雅黑',
    'Arial',
    'Tahoma',
    'Verdana'
  ],
  colors: [
    'black',
    'lightgrey',
    'green',
    'navy',
    'purple',
    'pink',
    'teal',
    'red',
    'orange',
    'white'
  ],
  panels: [
    'info',
    'success',
    'note',
    'warning',
    'error',
  ],
  emotions: [
    {
    // tab 的标题
    title: '默认',
    // type -> 'emoji' / 'image'
    type: 'image',
    // content -> 数组
    content: [
      { 'alt': '[微笑]', 'src': 'huanglianwx_thumb.gif' },
      { 'alt': '[嘻嘻]', 'src': 'tootha_thumb.gif' },
      { 'alt': '[哈哈]', 'src': 'laugh.gif' },
      { 'alt': '[可爱]', 'src': 'tza_thumb.gif' },
      { 'alt': '[可怜]', 'src': 'kl_thumb.gif' },
      { 'alt': '[挖鼻]', 'src': 'wabi_thumb.gif' },
      { 'alt': '[吃惊]', 'src': 'cj_thumb.gif' },
      { 'alt': '[害羞]', 'src': 'shamea_thumb.gif' },
      { 'alt': '[挤眼]', 'src': 'zy_thumb.gif' },
      { 'alt': '[闭嘴]', 'src': 'bz_thumb.gif' },
      { 'alt': '[鄙视]', 'src': 'bs2_thumb.gif' },
      { 'alt': '[爱你]', 'src': 'lovea_thumb.gif' },
      { 'alt': '[泪]', 'src': 'sada_thumb.gif' },
      { 'alt': '[偷笑]', 'src': 'heia_thumb.gif' },
      { 'alt': '[亲亲]', 'src': 'qq_thumb.gif' },
      { 'alt': '[生病]', 'src': 'sb_thumb.gif' },
      { 'alt': '[太开心]', 'src': 'mb_thumb.gif' },
      { 'alt': '[白眼]', 'src': 'landeln_thumb.gif' },
      { 'alt': '[右哼哼]', 'src': 'yhh_thumb.gif' },
      { 'alt': '[左哼哼]', 'src': 'zhh_thumb.gif' },
      { 'alt': '[嘘]', 'src': 'x_thumb.gif' },
      { 'alt': '[衰]', 'src': 'cry.gif' },
      { 'alt': '[委屈]', 'src': 'wq_thumb.gif' },
      { 'alt': '[吐]', 'src': 't_thumb.gif' },
      { 'alt': '[哈欠]', 'src': 'haqianv2_thumb.gif' },
      { 'alt': '[抱抱]', 'src': 'bba_thumb.gif' },
      { 'alt': '[怒]', 'src': 'angrya_thumb.gif' },
      { 'alt': '[疑问]', 'src': 'yw_thumb.gif' },
      { 'alt': '[馋嘴]', 'src': 'cza_thumb.gif' },
      { 'alt': '[拜拜]', 'src': '88_thumb.gif' },
      { 'alt': '[思考]', 'src': 'sk_thumb.gif' },
      { 'alt': '[汗]', 'src': 'sweata_thumb.gif' },
      { 'alt': '[困]', 'src': 'kunv2_thumb.gif' },
      { 'alt': '[睡]', 'src': 'huangliansj_thumb.gif' },
      { 'alt': '[钱]', 'src': 'money_thumb.gif' },
      { 'alt': '[失望]', 'src': 'sw_thumb.gif' },
      { 'alt': '[酷]', 'src': 'cool_thumb.gif' },
      { 'alt': '[色]', 'src': 'huanglianse_thumb.gif' },
      { 'alt': '[哼]', 'src': 'hatea_thumb.gif' },
      { 'alt': '[鼓掌]', 'src': 'gza_thumb.gif' },
      { 'alt': '[晕]', 'src': 'dizzya_thumb.gif' },
      { 'alt': '[悲伤]', 'src': 'bs_thumb.gif' },
      { 'alt': '[抓狂]', 'src': 'crazya_thumb.gif' },
      { 'alt': '[黑线]', 'src': 'h_thumb.gif' },
      { 'alt': '[阴险]', 'src': 'yx_thumb.gif' },
      { 'alt': '[怒骂]', 'src': 'numav2_thumb.gif' },
      { 'alt': '[互粉]', 'src': 'hufen_thumb.gif' },
      { 'alt': '[心]', 'src': 'hearta_thumb.gif' },
      { 'alt': '[伤心]', 'src': 'unheart.gif' },
      { 'alt': '[猪头]', 'src': 'pig.gif' },
      { 'alt': '[熊猫]', 'src': 'panda_thumb.gif' },
      { 'alt': '[兔子]', 'src': 'rabbit_thumb.gif' },
      { 'alt': '[ok]', 'src': 'ok_thumb.gif' },
      { 'alt': '[耶]', 'src': 'ye_thumb.gif' },
      { 'alt': '[good]', 'src': 'good_thumb.gif' },
      { 'alt': '[NO]', 'src': 'buyao_org.gif' },
      { 'alt': '[赞]', 'src': 'z2_thumb.gif' },
      { 'alt': '[来]', 'src': 'come_thumb.gif' },
      { 'alt': '[弱]', 'src': 'sad_thumb.gif' },
      { 'alt': '[草泥马]', 'src': 'shenshou_thumb.gif' },
      { 'alt': '[神马]', 'src': 'horse2_thumb.gif' },
      { 'alt': '[囧]', 'src': 'j_thumb.gif' },
      { 'alt': '[浮云]', 'src': 'fuyun_thumb.gif' },
      { 'alt': '[给力]', 'src': 'geiliv2_thumb.gif' },
      { 'alt': '[围观]', 'src': 'wg_thumb.gif' },
      { 'alt': '[威武]', 'src': 'vw_thumb.gif' },
      { 'alt': '[奥特曼]', 'src': 'otm_thumb.gif' },
      { 'alt': '[礼物]', 'src': 'liwu_thumb.gif' },
      { 'alt': '[钟]', 'src': 'clock_thumb.gif' },
      { 'alt': '[话筒]', 'src': 'huatongv2_thumb.gif' },
      { 'alt': '[蜡烛]', 'src': 'lazhuv2_thumb.gif' },
      { 'alt': '[蛋糕]', 'src': 'cakev2_thumb.gif' },
      { 'alt': '[发红包啦]', 'src': 'hb_fahongbao2016_thumb.gif' },
      { 'alt': '[抢到啦]', 'src': 'hb_qiangdao2016_thumb.gif' },
      { 'alt': '[最右]', 'src': 'lxhzuiyou_thumb.gif' },
      { 'alt': '[泪流满面]', 'src': 'lxhtongku_thumb.gif' },
      { 'alt': '[江南style]', 'src': 'gangnamstyle_thumb.gif' },
      { 'alt': '[偷乐]', 'src': 'lxhtouxiao_thumb.gif' },
      { 'alt': '[加油啊]', 'src': 'lxhjiayou_thumb.gif' },
      { 'alt': '[doge]', 'src': 'doge_thumb.gif' },
      { 'alt': '[喵喵]', 'src': 'mm_thumb.gif' },
      { 'alt': '[笑cry]', 'src': 'xiaoku_thumb.gif' },
      { 'alt': '[xkl转圈]', 'src': 'xklzhuanquan_thumb.gif' },
      { 'alt': '[芒果得意]', 'src': 'mango_03_thumb.gif' },
      { 'alt': '[芒果流口水]', 'src': 'mango_07_thumb.gif' },
      { 'alt': '[芒果点赞]', 'src': 'mango_12_thumb.gif' },
      { 'alt': '[芒果大笑]', 'src': 'mango_02_thumb.gif' },
      { 'alt': '[芒果萌萌哒]', 'src': 'mango_11_thumb.gif' },
      { 'alt': '[羊年大吉]', 'src': 'yangniandj_thumb.gif' },
      { 'alt': '[西瓜]', 'src': 'watermelon.gif' },
      { 'alt': '[足球]', 'src': 'football.gif' },
      { 'alt': '[老妈我爱你]', 'src': 'mothersday_thumb.gif' },
      { 'alt': '[母亲节]', 'src': 'carnation_thumb.gif' },
      { 'alt': '[肥皂]', 'src': 'soap_thumb.gif' },
      { 'alt': '[有钱]', 'src': 'youqian_thumb.gif' },
      { 'alt': '[地球一小时]', 'src': 'earth1r_thumb.gif' },
      { 'alt': '[国旗]', 'src': 'flag_thumb.gif' },
      { 'alt': '[许愿]', 'src': 'lxhxuyuan_thumb.gif' },
      { 'alt': '[风扇]', 'src': 'fan.gif' },
      { 'alt': '[炸鸡和啤酒]', 'src': 'zhaji_thumb.gif' },
      { 'alt': '[雪]', 'src': 'snow_thumb.gif' },
      { 'alt': '[马上有对象]', 'src': 'mashangyouduixiang_thumb.gif' },
      { 'alt': '[马到成功旧]', 'src': 'madaochenggong_thumb.gif' },
      { 'alt': '[青啤鸿运当头]', 'src': 'hongyun_thumb.gif' },
      { 'alt': '[让红包飞]', 'src': 'hongbaofei2014_thumb.gif' },
      { 'alt': '[ali做鬼脸]', 'src': 'alizuoguiliannew_thumb.gif' },
      { 'alt': '[ali哇]', 'src': 'aliwanew_thumb.gif' }
    ]
    }
  ],
}

const COLORS = menus.colors;
const FONTS = menus.fontNames;

// 表情 Schema
const emojiNodeSpec = {
  attrs: {
    src: {default: null},
    alt: {default: null}
  },
  inline: true,
  group: 'inline',
  draggable: false,
  toDOM: node => ['img', {
    'src': node.attrs.src,
    'class': 'face-image',
    'alt': node.attrs.alt,
    'unselectable': 'on'
  }],
  parseDOM: [
    {
      tag: `img[src*='${menus.emojiCdn}']`,
      getAttrs: dom => {
        const cdn = menus.emojiCdn;
        const src = dom.src.replace(/^(https?):/i, '');
        let data = menus.emotions[0].content.filter(item => `${cdn}${item.src}`.indexOf(src) >= 0);
        data = data[0];

        return !!data ? {src: `${cdn}${data.src}`, alt: data.alt } : false;
      }
    }
  ]
};

const fontMarks = {};

function createFontMark(value, array, style = 'color') {
  return {
    attrs: {
      style: { default: `${style}: ${value};` }
    },
    excludes: array.join(' '),
    parseDOM: [
      {
        style: `${style}=${value}`,
        attrs: { style: `${style}: ${value}` }
      },
    ],
    toDOM(node) {
      return ['span', {style: node.attrs.style}]
    }
  };
}

// 字体颜色，背景颜色
COLORS.forEach(color => {
  fontMarks[color] = createFontMark(color, COLORS);
});

// 字体
FONTS.forEach(font => fontMarks[font] = createFontMark(font, FONTS, 'font-family'));

let baseMarks = schema.spec.marks;
baseMarks = baseMarks.addToStart('strike', textDecorationMarks('strike', /^(line-through)/));
baseMarks = baseMarks.addToStart('u', textDecorationMarks('u', /^(underline)/));

(function () {
  for (const key in fontMarks) {
    if (fontMarks.hasOwnProperty(key)) {
      baseMarks = baseMarks.addToStart(key, fontMarks[key]);
    }
  }
}());

export const pmrSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes.addBefore('image', 'emoji', emojiNodeSpec), 'paragraph block*', 'block'),
  marks: baseMarks
});

// 文本修饰 => 删除线、下划线
/**
 * 
 * @param {String} tag ==> strike、u
 * @param {RegExp} reg ==> /^(line-through)/、/^(underline)/
 */
function textDecorationMarks(tag, reg) {
  const parseDOM = [
    { tag },
    { style: 'text-decoration', getAttrs: value => reg.test(value) && null }
  ];

  if (tag === 'u') {
    parseDOM.push({tag: 'ins'});
  }else {
    parseDOM.push({tag: 's'});
    parseDOM.push({tag: 'del'});
  }

  return {
    parseDOM,
    toDOM: () => [tag]
  };
}
