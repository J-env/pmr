import { history } from 'prosemirror-history'
import { baseKeymap } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'

import { menuPlugin } from './menu/view'
import { buildKeymap } from './keymap'
import { buildMenuItems } from './menu/menu'

export function pluginsGroup(options = {}) {
  const schema = options.schema;
  const outlet = options.outlet;

  let plugins = [
    // 键盘
    keymap(buildKeymap(schema, options.mapKeys)),
    keymap(baseKeymap),
    // 历史
    history(),
    // Menubar
    menuPlugin({
      content: options.menuContent || buildMenuItems(schema).fullMenu,
      menus: options.menus,
      schema,
      outlet
    }),
    // 编辑区添加class
    new Plugin({
      props: {
        attributes: { 'class': 'pmr-textarea' }
      }
    })
  ];
  
  return plugins;
}
