import { history } from './prosemirror/prosemirror-history'
import { baseKeymap } from './prosemirror/prosemirror-commands'
import { keymap } from './prosemirror/prosemirror-keymap'

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
  ];
  
  return plugins;
}
