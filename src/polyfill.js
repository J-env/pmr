if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function () {
    Array.prototype.forEach.apply(this, arguments);
  };
}

import 'classlist-polyfill'
