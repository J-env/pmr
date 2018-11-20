/*!
 * pmr-editor 0.1.0 (https://github.com/J-env/pmr-editor)
 * API https://github.com/J-env/pmr-editor
 * Copyright 2017-2018 J-env. All Rights Reserved
 * Licensed under MIT (https://github.com/J-env/pmr-editor/blob/master/LICENSE)
 */

(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.OUVI = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

unwrapExports(defineProperty);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	};
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add";

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function () {
    Array.prototype.forEach.apply(this, arguments);
  };
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _toObject = function (it) {
  return Object(_defined(it));
};

var _library = true;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var IE_PROTO = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$1 = _core.Object.getPrototypeOf;

var getPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$1, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf);

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _redefine = _hide;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$2 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$2) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

unwrapExports(iterator);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});

var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$4 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$4($Symbol, name, { value: _wksExt.f(name) });
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

var gOPN$1 = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN$1(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$4
};

var gOPD$1 = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD$1(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

var META = _meta.KEY;



















var gOPD = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol$2 = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": symbol$2, __esModule: true };
});

unwrapExports(symbol);

var _typeof_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator);



var _symbol2 = _interopRequireDefault(symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

var $Object$1 = _core.Object;
var getOwnPropertyDescriptor$2 = function getOwnPropertyDescriptor(it, key) {
  return $Object$1.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor$2, __esModule: true };
});

unwrapExports(getOwnPropertyDescriptor);

var get = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf);



var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
});

var _get = unwrapExports(get);

var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf$2 = _core.Object.setPrototypeOf;

var setPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf$2, __esModule: true };
});

unwrapExports(setPrototypeOf);

_export(_export.S, 'Object', { create: _objectCreate });

var $Object$2 = _core.Object;
var create$1 = function create(P, D) {
  return $Object$2.create(P, D);
};

var create = createCommonjsModule(function (module) {
module.exports = { "default": create$1, __esModule: true };
});

var _Object$create = unwrapExports(create);

var inherits = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf);



var _create2 = _interopRequireDefault(create);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify$1 = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON$1.stringify.apply($JSON$1, arguments);
};

var stringify = createCommonjsModule(function (module) {
module.exports = { "default": stringify$1, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify);

function findDiffStart(a, b, pos) {
  for (var i = 0;; i++) {
    if (i == a.childCount || i == b.childCount) return a.childCount == b.childCount ? null : pos;

    var childA = a.child(i),
        childB = b.child(i);
    if (childA == childB) {
      pos += childA.nodeSize;continue;
    }

    if (!childA.sameMarkup(childB)) return pos;

    if (childA.isText && childA.text != childB.text) {
      for (var j = 0; childA.text[j] == childB.text[j]; j++) {
        pos++;
      }return pos;
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner != null) return inner;
    }
    pos += childA.nodeSize;
  }
}

function findDiffEnd(a, b, posA, posB) {
  for (var iA = a.childCount, iB = b.childCount;;) {
    if (iA == 0 || iB == 0) return iA == iB ? null : { a: posA, b: posB };

    var childA = a.child(--iA),
        childB = b.child(--iB),
        size = childA.nodeSize;
    if (childA == childB) {
      posA -= size;posB -= size;
      continue;
    }

    if (!childA.sameMarkup(childB)) return { a: posA, b: posB };

    if (childA.isText && childA.text != childB.text) {
      var same = 0,
          minSize = Math.min(childA.text.length, childB.text.length);
      while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
        same++;posA--;posB--;
      }
      return { a: posA, b: posB };
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner) return inner;
    }
    posA -= size;posB -= size;
  }
}

var Fragment = function () {
  function Fragment(content, size) {
    _classCallCheck(this, Fragment);

    this.content = content;
    // :: number
    // The size of the fragment, which is the total of the size of its
    // content nodes.
    this.size = size || 0;
    if (size == null) for (var i = 0; i < content.length; i++) {
      this.size += content[i].nodeSize;
    }
  }

  // :: (number, number, (node: Node, start: number, parent: Node, index: number) → ?bool, ?number)
  // Invoke a callback for all descendant nodes between the given two
  // positions (relative to start of this fragment). Doesn't descend
  // into a node when the callback returns `false`.


  _createClass(Fragment, [{
    key: "nodesBetween",
    value: function nodesBetween(from, to, f) {
      var nodeStart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var parent = arguments[4];

      for (var i = 0, pos = 0; pos < to; i++) {
        var child = this.content[i],
            end = pos + child.nodeSize;
        if (end > from && f(child, nodeStart + pos, parent, i) !== false && child.content.size) {
          var start = pos + 1;
          child.nodesBetween(Math.max(0, from - start), Math.min(child.content.size, to - start), f, nodeStart + start);
        }
        pos = end;
      }
    }

    // :: ((node: Node, pos: number, parent: Node) → ?bool)
    // Call the given callback for every descendant node. The callback
    // may return `false` to prevent traversal of a given node's children.

  }, {
    key: "descendants",
    value: function descendants(f) {
      this.nodesBetween(0, this.size, f);
    }

    // : (number, number, ?string, ?string) → string

  }, {
    key: "textBetween",
    value: function textBetween(from, to, blockSeparator, leafText) {
      var text = "",
          separated = true;
      this.nodesBetween(from, to, function (node, pos) {
        if (node.isText) {
          text += node.text.slice(Math.max(from, pos) - pos, to - pos);
          separated = !blockSeparator;
        } else if (node.isLeaf && leafText) {
          text += leafText;
          separated = !blockSeparator;
        } else if (!separated && node.isBlock) {
          text += blockSeparator;
          separated = true;
        }
      }, 0);
      return text;
    }

    // :: (Fragment) → Fragment
    // Create a new fragment containing the combined content of this
    // fragment and the other.

  }, {
    key: "append",
    value: function append(other) {
      if (!other.size) return this;
      if (!this.size) return other;
      var last = this.lastChild,
          first = other.firstChild,
          content = this.content.slice(),
          i = 0;
      if (last.isText && last.sameMarkup(first)) {
        content[content.length - 1] = last.withText(last.text + first.text);
        i = 1;
      }
      for (; i < other.content.length; i++) {
        content.push(other.content[i]);
      }return new Fragment(content, this.size + other.size);
    }

    // :: (number, ?number) → Fragment
    // Cut out the sub-fragment between the two given positions.

  }, {
    key: "cut",
    value: function cut(from, to) {
      if (to == null) to = this.size;
      if (from == 0 && to == this.size) return this;
      var result = [],
          size = 0;
      if (to > from) for (var i = 0, pos = 0; pos < to; i++) {
        var child = this.content[i],
            end = pos + child.nodeSize;
        if (end > from) {
          if (pos < from || end > to) {
            if (child.isText) child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos));else child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1));
          }
          result.push(child);
          size += child.nodeSize;
        }
        pos = end;
      }
      return new Fragment(result, size);
    }
  }, {
    key: "cutByIndex",
    value: function cutByIndex(from, to) {
      if (from == to) return Fragment.empty;
      if (from == 0 && to == this.content.length) return this;
      return new Fragment(this.content.slice(from, to));
    }

    // :: (number, Node) → Fragment
    // Create a new fragment in which the node at the given index is
    // replaced by the given node.

  }, {
    key: "replaceChild",
    value: function replaceChild(index, node) {
      var current = this.content[index];
      if (current == node) return this;
      var copy = this.content.slice();
      var size = this.size + node.nodeSize - current.nodeSize;
      copy[index] = node;
      return new Fragment(copy, size);
    }

    // : (Node) → Fragment
    // Create a new fragment by prepending the given node to this
    // fragment.

  }, {
    key: "addToStart",
    value: function addToStart(node) {
      return new Fragment([node].concat(this.content), this.size + node.nodeSize);
    }

    // : (Node) → Fragment
    // Create a new fragment by appending the given node to this
    // fragment.

  }, {
    key: "addToEnd",
    value: function addToEnd(node) {
      return new Fragment(this.content.concat(node), this.size + node.nodeSize);
    }

    // :: (Fragment) → bool
    // Compare this fragment to another one.

  }, {
    key: "eq",
    value: function eq(other) {
      if (this.content.length != other.content.length) return false;
      for (var i = 0; i < this.content.length; i++) {
        if (!this.content[i].eq(other.content[i])) return false;
      }return true;
    }

    // :: ?Node
    // The first child of the fragment, or `null` if it is empty.

  }, {
    key: "child",


    // :: (number) → Node
    // Get the child node at the given index. Raise an error when the
    // index is out of range.
    value: function child(index) {
      var found = this.content[index];
      if (!found) throw new RangeError("Index " + index + " out of range for " + this);
      return found;
    }

    // :: (number) → ?Node
    // Get the child node at the given index, if it exists.

  }, {
    key: "maybeChild",
    value: function maybeChild(index) {
      return this.content[index];
    }

    // :: ((node: Node, offset: number, index: number))
    // Call `f` for every child node, passing the node, its offset
    // into this parent node, and its index.

  }, {
    key: "forEach",
    value: function forEach(f) {
      for (var i = 0, p = 0; i < this.content.length; i++) {
        var child = this.content[i];
        f(child, p, i);
        p += child.nodeSize;
      }
    }

    // :: (Fragment) → ?number
    // Find the first position at which this fragment and another
    // fragment differ, or `null` if they are the same.

  }, {
    key: "findDiffStart",
    value: function findDiffStart$$1(other) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return findDiffStart(this, other, pos);
    }

    // :: (Fragment) → ?{a: number, b: number}
    // Find the first position, searching from the end, at which this
    // fragment and the given fragment differ, or `null` if they are the
    // same. Since this position will not be the same in both nodes, an
    // object with two separate positions is returned.

  }, {
    key: "findDiffEnd",
    value: function findDiffEnd$$1(other) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.size;
      var otherPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : other.size;

      return findDiffEnd(this, other, pos, otherPos);
    }

    // : (number, ?number) → {index: number, offset: number}
    // Find the index and inner offset corresponding to a given relative
    // position in this fragment. The result object will be reused
    // (overwritten) the next time the function is called. (Not public.)

  }, {
    key: "findIndex",
    value: function findIndex(pos) {
      var round = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (pos == 0) return retIndex(0, pos);
      if (pos == this.size) return retIndex(this.content.length, pos);
      if (pos > this.size || pos < 0) throw new RangeError("Position " + pos + " outside of fragment (" + this + ")");
      for (var i = 0, curPos = 0;; i++) {
        var cur = this.child(i),
            end = curPos + cur.nodeSize;
        if (end >= pos) {
          if (end == pos || round > 0) return retIndex(i + 1, end);
          return retIndex(i, curPos);
        }
        curPos = end;
      }
    }

    // :: () → string
    // Return a debugging string that describes this fragment.

  }, {
    key: "toString",
    value: function toString() {
      return "<" + this.toStringInner() + ">";
    }
  }, {
    key: "toStringInner",
    value: function toStringInner() {
      return this.content.join(", ");
    }

    // :: () → ?Object
    // Create a JSON-serializeable representation of this fragment.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.content.length ? this.content.map(function (n) {
        return n.toJSON();
      }) : null;
    }

    // :: (Schema, ?Object) → Fragment
    // Deserialize a fragment from its JSON representation.

  }, {
    key: "firstChild",
    get: function get() {
      return this.content.length ? this.content[0] : null;
    }

    // :: ?Node
    // The last child of the fragment, or `null` if it is empty.

  }, {
    key: "lastChild",
    get: function get() {
      return this.content.length ? this.content[this.content.length - 1] : null;
    }

    // :: number
    // The number of child nodes in this fragment.

  }, {
    key: "childCount",
    get: function get() {
      return this.content.length;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, value) {
      if (!value) return Fragment.empty;
      if (!Array.isArray(value)) throw new RangeError("Invalid input for Fragment.fromJSON");
      return new Fragment(value.map(schema.nodeFromJSON));
    }

    // :: ([Node]) → Fragment
    // Build a fragment from an array of nodes. Ensures that adjacent
    // text nodes with the same marks are joined together.

  }, {
    key: "fromArray",
    value: function fromArray(array) {
      if (!array.length) return Fragment.empty;
      var joined = void 0,
          size = 0;
      for (var i = 0; i < array.length; i++) {
        var node = array[i];
        size += node.nodeSize;
        if (i && node.isText && array[i - 1].sameMarkup(node)) {
          if (!joined) joined = array.slice(0, i);
          joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
        } else if (joined) {
          joined.push(node);
        }
      }
      return new Fragment(joined || array, size);
    }

    // :: (?union<Fragment, Node, [Node]>) → Fragment
    // Create a fragment from something that can be interpreted as a set
    // of nodes. For `null`, it returns the empty fragment. For a
    // fragment, the fragment itself. For a node or array of nodes, a
    // fragment containing those nodes.

  }, {
    key: "from",
    value: function from(nodes) {
      if (!nodes) return Fragment.empty;
      if (nodes instanceof Fragment) return nodes;
      if (Array.isArray(nodes)) return this.fromArray(nodes);
      return new Fragment([nodes], nodes.nodeSize);
    }
  }]);

  return Fragment;
}();

var found = { index: 0, offset: 0 };
function retIndex(index, offset) {
  found.index = index;
  found.offset = offset;
  return found;
}

// :: Fragment
// An empty fragment. Intended to be reused whenever a node doesn't
// contain anything (rather than allocating a new empty fragment for
// each leaf node).
Fragment.empty = new Fragment([], 0);

function compareDeep(a, b) {
  if (a === b) return true;
  if (!(a && (typeof a === "undefined" ? "undefined" : _typeof(a)) == "object") || !(b && (typeof b === "undefined" ? "undefined" : _typeof(b)) == "object")) return false;
  var array = Array.isArray(a);
  if (Array.isArray(b) != array) return false;
  if (array) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (!compareDeep(a[i], b[i])) return false;
    }
  } else {
    for (var p in a) {
      if (!(p in b) || !compareDeep(a[p], b[p])) return false;
    }for (var _p in b) {
      if (!(_p in a)) return false;
    }
  }
  return true;
}

var Mark = function () {
  function Mark(type, attrs) {
    _classCallCheck(this, Mark);

    // :: MarkType
    // The type of this mark.
    this.type = type;
    // :: Object
    // The attributes associated with this mark.
    this.attrs = attrs;
  }

  // :: ([Mark]) → [Mark]
  // Given a set of marks, create a new set which contains this one as
  // well, in the right position. If this mark is already in the set,
  // the set itself is returned. If any marks that are set to be
  // [exclusive](#model.MarkSpec.excludes) with this mark are present,
  // those are replaced by this one.


  _createClass(Mark, [{
    key: "addToSet",
    value: function addToSet(set) {
      var copy = void 0,
          placed = false;
      for (var i = 0; i < set.length; i++) {
        var other = set[i];
        if (this.eq(other)) return set;
        if (this.type.excludes(other.type)) {
          if (!copy) copy = set.slice(0, i);
        } else if (other.type.excludes(this.type)) {
          return set;
        } else {
          if (!placed && other.type.rank > this.type.rank) {
            if (!copy) copy = set.slice(0, i);
            copy.push(this);
            placed = true;
          }
          if (copy) copy.push(other);
        }
      }
      if (!copy) copy = set.slice();
      if (!placed) copy.push(this);
      return copy;
    }

    // :: ([Mark]) → [Mark]
    // Remove this mark from the given set, returning a new set. If this
    // mark is not in the set, the set itself is returned.

  }, {
    key: "removeFromSet",
    value: function removeFromSet(set) {
      for (var i = 0; i < set.length; i++) {
        if (this.eq(set[i])) return set.slice(0, i).concat(set.slice(i + 1));
      }return set;
    }

    // :: ([Mark]) → bool
    // Test whether this mark is in the given set of marks.

  }, {
    key: "isInSet",
    value: function isInSet(set) {
      for (var i = 0; i < set.length; i++) {
        if (this.eq(set[i])) return true;
      }return false;
    }

    // :: (Mark) → bool
    // Test whether this mark has the same type and attributes as
    // another mark.

  }, {
    key: "eq",
    value: function eq(other) {
      return this == other || this.type == other.type && compareDeep(this.attrs, other.attrs);
    }

    // :: () → Object
    // Convert this mark to a JSON-serializeable representation.

  }, {
    key: "toJSON",
    value: function toJSON() {
      var obj = { type: this.type.name };
      for (var _ in this.attrs) {
        obj.attrs = this.attrs;
        break;
      }
      return obj;
    }

    // :: (Schema, Object) → Mark

  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (!json) throw new RangeError("Invalid input for Mark.fromJSON");
      var type = schema.marks[json.type];
      if (!type) throw new RangeError("There is no mark type " + json.type + " in this schema");
      return type.create(json.attrs);
    }

    // :: ([Mark], [Mark]) → bool
    // Test whether two sets of marks are identical.

  }, {
    key: "sameSet",
    value: function sameSet(a, b) {
      if (a == b) return true;
      if (a.length != b.length) return false;
      for (var i = 0; i < a.length; i++) {
        if (!a[i].eq(b[i])) return false;
      }return true;
    }

    // :: (?union<Mark, [Mark]>) → [Mark]
    // Create a properly sorted mark set from null, a single mark, or an
    // unsorted array of marks.

  }, {
    key: "setFrom",
    value: function setFrom(marks) {
      if (!marks || marks.length == 0) return Mark.none;
      if (marks instanceof Mark) return [marks];
      var copy = marks.slice();
      copy.sort(function (a, b) {
        return a.type.rank - b.type.rank;
      });
      return copy;
    }
  }]);

  return Mark;
}();

// :: [Mark] The empty set of marks.
Mark.none = [];

function ReplaceError(message) {
  var err = Error.call(this, message);
  err.__proto__ = ReplaceError.prototype;
  return err;
}

ReplaceError.prototype = _Object$create(Error.prototype);
ReplaceError.prototype.constructor = ReplaceError;
ReplaceError.prototype.name = "ReplaceError";

// ::- A slice represents a piece cut out of a larger document. It
// stores not only a fragment, but also the depth up to which nodes on
// both side are ‘open’ (cut through).
var Slice = function () {
  // :: (Fragment, number, number)
  // Create a slice. When specifying a non-zero open depth, you must
  // make sure that there are nodes of at least that depth at the
  // appropriate side of the fragment—i.e. if the fragment is an empty
  // paragraph node, `openStart` and `openEnd` can't be greater than 1.
  //
  // It is not necessary for the content of open nodes to conform to
  // the schema's content constraints, though it should be a valid
  // start/end/middle for such a node, depending on which sides are
  // open.
  function Slice(content, openStart, openEnd) {
    _classCallCheck(this, Slice);

    // :: Fragment The slice's content.
    this.content = content;
    // :: number The open depth at the start.
    this.openStart = openStart;
    // :: number The open depth at the end.
    this.openEnd = openEnd;
  }

  // :: number
  // The size this slice would add when inserted into a document.


  _createClass(Slice, [{
    key: "insertAt",
    value: function insertAt(pos, fragment) {
      var content = insertInto(this.content, pos + this.openStart, fragment, null);
      return content && new Slice(content, this.openStart, this.openEnd);
    }
  }, {
    key: "removeBetween",
    value: function removeBetween(from, to) {
      return new Slice(removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd);
    }

    // :: (Slice) → bool
    // Tests whether this slice is equal to another slice.

  }, {
    key: "eq",
    value: function eq(other) {
      return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.content + "(" + this.openStart + "," + this.openEnd + ")";
    }

    // :: () → ?Object
    // Convert a slice to a JSON-serializable representation.

  }, {
    key: "toJSON",
    value: function toJSON() {
      if (!this.content.size) return null;
      var json = { content: this.content.toJSON() };
      if (this.openStart > 0) json.openStart = this.openStart;
      if (this.openEnd > 0) json.openEnd = this.openEnd;
      return json;
    }

    // :: (Schema, ?Object) → Slice
    // Deserialize a slice from its JSON representation.

  }, {
    key: "size",
    get: function get() {
      return this.content.size - this.openStart - this.openEnd;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (!json) return Slice.empty;
      var openStart = json.openStart || 0,
          openEnd = json.openEnd || 0;
      if (typeof openStart != "number" || typeof openEnd != "number") throw new RangeError("Invalid input for Slice.fromJSON");
      return new Slice(Fragment.fromJSON(schema, json.content), json.openStart || 0, json.openEnd || 0);
    }

    // :: (Fragment, ?bool) → Slice
    // Create a slice from a fragment by taking the maximum possible
    // open value on both side of the fragment.

  }, {
    key: "maxOpen",
    value: function maxOpen(fragment) {
      var openIsolating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var openStart = 0,
          openEnd = 0;
      for (var n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild) {
        openStart++;
      }for (var _n = fragment.lastChild; _n && !_n.isLeaf && (openIsolating || !_n.type.spec.isolating); _n = _n.lastChild) {
        openEnd++;
      }return new Slice(fragment, openStart, openEnd);
    }
  }]);

  return Slice;
}();

function removeRange(content, from, to) {
  var _content$findIndex = content.findIndex(from),
      index = _content$findIndex.index,
      offset = _content$findIndex.offset,
      child = content.maybeChild(index);

  var _content$findIndex2 = content.findIndex(to),
      indexTo = _content$findIndex2.index,
      offsetTo = _content$findIndex2.offset;

  if (offset == from || child.isText) {
    if (offsetTo != to && !content.child(indexTo).isText) throw new RangeError("Removing non-flat range");
    return content.cut(0, from).append(content.cut(to));
  }
  if (index != indexTo) throw new RangeError("Removing non-flat range");
  return content.replaceChild(index, child.copy(removeRange(child.content, from - offset - 1, to - offset - 1)));
}

function insertInto(content, dist, insert, parent) {
  var _content$findIndex3 = content.findIndex(dist),
      index = _content$findIndex3.index,
      offset = _content$findIndex3.offset,
      child = content.maybeChild(index);

  if (offset == dist || child.isText) {
    if (parent && !parent.canReplace(index, index, insert)) return null;
    return content.cut(0, dist).append(insert).append(content.cut(dist));
  }
  var inner = insertInto(child.content, dist - offset - 1, insert);
  return inner && content.replaceChild(index, child.copy(inner));
}

// :: Slice
// The empty slice.
Slice.empty = new Slice(Fragment.empty, 0, 0);

function replace($from, $to, slice) {
  if (slice.openStart > $from.depth) throw new ReplaceError("Inserted content deeper than insertion position");
  if ($from.depth - slice.openStart != $to.depth - slice.openEnd) throw new ReplaceError("Inconsistent open depths");
  return replaceOuter($from, $to, slice, 0);
}

function replaceOuter($from, $to, slice, depth) {
  var index = $from.index(depth),
      node = $from.node(depth);
  if (index == $to.index(depth) && depth < $from.depth - slice.openStart) {
    var inner = replaceOuter($from, $to, slice, depth + 1);
    return node.copy(node.content.replaceChild(index, inner));
  } else if (!slice.content.size) {
    return close(node, replaceTwoWay($from, $to, depth));
  } else if (!slice.openStart && !slice.openEnd && $from.depth == depth && $to.depth == depth) {
    // Simple, flat case
    var parent = $from.parent,
        content = parent.content;
    return close(parent, content.cut(0, $from.parentOffset).append(slice.content).append(content.cut($to.parentOffset)));
  } else {
    var _prepareSliceForRepla = prepareSliceForReplace(slice, $from),
        start = _prepareSliceForRepla.start,
        end = _prepareSliceForRepla.end;

    return close(node, replaceThreeWay($from, start, end, $to, depth));
  }
}

function checkJoin(main, sub) {
  if (!sub.type.compatibleContent(main.type)) throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main.type.name);
}

function joinable($before, $after, depth) {
  var node = $before.node(depth);
  checkJoin(node, $after.node(depth));
  return node;
}

function addNode(child, target) {
  var last = target.length - 1;
  if (last >= 0 && child.isText && child.sameMarkup(target[last])) target[last] = child.withText(target[last].text + child.text);else target.push(child);
}

function addRange($start, $end, depth, target) {
  var node = ($end || $start).node(depth);
  var startIndex = 0,
      endIndex = $end ? $end.index(depth) : node.childCount;
  if ($start) {
    startIndex = $start.index(depth);
    if ($start.depth > depth) {
      startIndex++;
    } else if ($start.textOffset) {
      addNode($start.nodeAfter, target);
      startIndex++;
    }
  }
  for (var i = startIndex; i < endIndex; i++) {
    addNode(node.child(i), target);
  }if ($end && $end.depth == depth && $end.textOffset) addNode($end.nodeBefore, target);
}

function close(node, content) {
  if (!node.type.validContent(content)) throw new ReplaceError("Invalid content for node " + node.type.name);
  return node.copy(content);
}

function replaceThreeWay($from, $start, $end, $to, depth) {
  var openStart = $from.depth > depth && joinable($from, $start, depth + 1);
  var openEnd = $to.depth > depth && joinable($end, $to, depth + 1);

  var content = [];
  addRange(null, $from, depth, content);
  if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
    checkJoin(openStart, openEnd);
    addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content);
  } else {
    if (openStart) addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content);
    addRange($start, $end, depth, content);
    if (openEnd) addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content);
  }
  addRange($to, null, depth, content);
  return new Fragment(content);
}

function replaceTwoWay($from, $to, depth) {
  var content = [];
  addRange(null, $from, depth, content);
  if ($from.depth > depth) {
    var type = joinable($from, $to, depth + 1);
    addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content);
  }
  addRange($to, null, depth, content);
  return new Fragment(content);
}

function prepareSliceForReplace(slice, $along) {
  var extra = $along.depth - slice.openStart,
      parent = $along.node(extra);
  var node = parent.copy(slice.content);
  for (var i = extra - 1; i >= 0; i--) {
    node = $along.node(i).copy(Fragment.from(node));
  }return { start: node.resolveNoCache(slice.openStart + extra),
    end: node.resolveNoCache(node.content.size - slice.openEnd - extra) };
}

var ResolvedPos = function () {
  function ResolvedPos(pos, path, parentOffset) {
    _classCallCheck(this, ResolvedPos);

    // :: number The position that was resolved.
    this.pos = pos;
    this.path = path;
    // :: number
    // The number of levels the parent node is from the root. If this
    // position points directly into the root node, it is 0. If it
    // points into a top-level paragraph, 1, and so on.
    this.depth = path.length / 3 - 1;
    // :: number The offset this position has into its parent node.
    this.parentOffset = parentOffset;
  }

  _createClass(ResolvedPos, [{
    key: "resolveDepth",
    value: function resolveDepth(val) {
      if (val == null) return this.depth;
      if (val < 0) return this.depth + val;
      return val;
    }

    // :: Node
    // The parent node that the position points into. Note that even if
    // a position points into a text node, that node is not considered
    // the parent—text nodes are ‘flat’ in this model, and have no content.

  }, {
    key: "node",


    // :: (?number) → Node
    // The ancestor node at the given level. `p.node(p.depth)` is the
    // same as `p.parent`.
    value: function node(depth) {
      return this.path[this.resolveDepth(depth) * 3];
    }

    // :: (?number) → number
    // The index into the ancestor at the given level. If this points at
    // the 3rd node in the 2nd paragraph on the top level, for example,
    // `p.index(0)` is 2 and `p.index(1)` is 3.

  }, {
    key: "index",
    value: function index(depth) {
      return this.path[this.resolveDepth(depth) * 3 + 1];
    }

    // :: (?number) → number
    // The index pointing after this position into the ancestor at the
    // given level.

  }, {
    key: "indexAfter",
    value: function indexAfter(depth) {
      depth = this.resolveDepth(depth);
      return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
    }

    // :: (?number) → number
    // The (absolute) position at the start of the node at the given
    // level.

  }, {
    key: "start",
    value: function start(depth) {
      depth = this.resolveDepth(depth);
      return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
    }

    // :: (?number) → number
    // The (absolute) position at the end of the node at the given
    // level.

  }, {
    key: "end",
    value: function end(depth) {
      depth = this.resolveDepth(depth);
      return this.start(depth) + this.node(depth).content.size;
    }

    // :: (?number) → number
    // The (absolute) position directly before the wrapping node at the
    // given level, or, when `level` is `this.depth + 1`, the original
    // position.

  }, {
    key: "before",
    value: function before(depth) {
      depth = this.resolveDepth(depth);
      if (!depth) throw new RangeError("There is no position before the top-level node");
      return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
    }

    // :: (?number) → number
    // The (absolute) position directly after the wrapping node at the
    // given level, or the original position when `level` is `this.depth + 1`.

  }, {
    key: "after",
    value: function after(depth) {
      depth = this.resolveDepth(depth);
      if (!depth) throw new RangeError("There is no position after the top-level node");
      return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
    }

    // :: number
    // When this position points into a text node, this returns the
    // distance between the position and the start of the text node.
    // Will be zero for positions that point between nodes.

  }, {
    key: "marks",


    // :: () → [Mark]
    // Get the marks at this position, factoring in the surrounding
    // marks' [`inclusive`](#model.MarkSpec.inclusive) property. If the
    // position is at the start of a non-empty node, the marks of the
    // node after it (if any) are returned.
    value: function marks() {
      var parent = this.parent,
          index = this.index();

      // In an empty parent, return the empty array
      if (parent.content.size == 0) return Mark.none;

      // When inside a text node, just return the text node's marks
      if (this.textOffset) return parent.child(index).marks;

      var main = parent.maybeChild(index - 1),
          other = parent.maybeChild(index);
      // If the `after` flag is true of there is no node before, make
      // the node after this position the main reference.
      if (!main) {
        var tmp = main;main = other;other = tmp;
      }

      // Use all marks in the main node, except those that have
      // `inclusive` set to false and are not present in the other node.
      var marks = main.marks;
      for (var i = 0; i < marks.length; i++) {
        if (marks[i].type.spec.inclusive === false && (!other || !marks[i].isInSet(other.marks))) marks = marks[i--].removeFromSet(marks);
      }return marks;
    }

    // :: (ResolvedPos) → ?[Mark]
    // Get the marks after the current position, if any, except those
    // that are non-inclusive and not present at position `$end`. This
    // is mostly useful for getting the set of marks to preserve after a
    // deletion. Will return `null` if this position is at the end of
    // its parent node or its parent node isn't a textblock (in which
    // case no marks should be preserved).

  }, {
    key: "marksAcross",
    value: function marksAcross($end) {
      var after = this.parent.maybeChild(this.index());
      if (!after || !after.isInline) return null;

      var marks = after.marks,
          next = $end.parent.maybeChild($end.index());
      for (var i = 0; i < marks.length; i++) {
        if (marks[i].type.spec.inclusive === false && (!next || !marks[i].isInSet(next.marks))) marks = marks[i--].removeFromSet(marks);
      }return marks;
    }

    // :: (number) → number
    // The depth up to which this position and the given (non-resolved)
    // position share the same parent nodes.

  }, {
    key: "sharedDepth",
    value: function sharedDepth(pos) {
      for (var depth = this.depth; depth > 0; depth--) {
        if (this.start(depth) <= pos && this.end(depth) >= pos) return depth;
      }return 0;
    }

    // :: (?ResolvedPos, ?(Node) → bool) → ?NodeRange
    // Returns a range based on the place where this position and the
    // given position diverge around block content. If both point into
    // the same textblock, for example, a range around that textblock
    // will be returned. If they point into different blocks, the range
    // around those blocks in their shared ancestor is returned. You can
    // pass in an optional predicate that will be called with a parent
    // node to see if a range into that parent is acceptable.

  }, {
    key: "blockRange",
    value: function blockRange() {
      var other = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      var pred = arguments[1];

      if (other.pos < this.pos) return other.blockRange(this);
      for (var d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--) {
        if (other.pos <= this.end(d) && (!pred || pred(this.node(d)))) return new NodeRange(this, other, d);
      }
    }

    // :: (ResolvedPos) → bool
    // Query whether the given position shares the same parent node.

  }, {
    key: "sameParent",
    value: function sameParent(other) {
      return this.pos - this.parentOffset == other.pos - other.parentOffset;
    }

    // :: (ResolvedPos) → ResolvedPos
    // Return the greater of this and the given position.

  }, {
    key: "max",
    value: function max(other) {
      return other.pos > this.pos ? other : this;
    }

    // :: (ResolvedPos) → ResolvedPos
    // Return the smaller of this and the given position.

  }, {
    key: "min",
    value: function min(other) {
      return other.pos < this.pos ? other : this;
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = "";
      for (var i = 1; i <= this.depth; i++) {
        str += (str ? "/" : "") + this.node(i).type.name + "_" + this.index(i - 1);
      }return str + ":" + this.parentOffset;
    }
  }, {
    key: "parent",
    get: function get() {
      return this.node(this.depth);
    }

    // :: Node
    // The root node in which the position was resolved.

  }, {
    key: "doc",
    get: function get() {
      return this.node(0);
    }
  }, {
    key: "textOffset",
    get: function get() {
      return this.pos - this.path[this.path.length - 1];
    }

    // :: ?Node
    // Get the node directly after the position, if any. If the position
    // points into a text node, only the part of that node after the
    // position is returned.

  }, {
    key: "nodeAfter",
    get: function get() {
      var parent = this.parent,
          index = this.index(this.depth);
      if (index == parent.childCount) return null;
      var dOff = this.pos - this.path[this.path.length - 1],
          child = parent.child(index);
      return dOff ? parent.child(index).cut(dOff) : child;
    }

    // :: ?Node
    // Get the node directly before the position, if any. If the
    // position points into a text node, only the part of that node
    // before the position is returned.

  }, {
    key: "nodeBefore",
    get: function get() {
      var index = this.index(this.depth);
      var dOff = this.pos - this.path[this.path.length - 1];
      if (dOff) return this.parent.child(index).cut(0, dOff);
      return index == 0 ? null : this.parent.child(index - 1);
    }
  }], [{
    key: "resolve",
    value: function resolve(doc, pos) {
      if (!(pos >= 0 && pos <= doc.content.size)) throw new RangeError("Position " + pos + " out of range");
      var path = [];
      var start = 0,
          parentOffset = pos;
      for (var node = doc;;) {
        var _node$content$findInd = node.content.findIndex(parentOffset),
            index = _node$content$findInd.index,
            offset = _node$content$findInd.offset;

        var rem = parentOffset - offset;
        path.push(node, index, start + offset);
        if (!rem) break;
        node = node.child(index);
        if (node.isText) break;
        parentOffset = rem - 1;
        start += offset + 1;
      }
      return new ResolvedPos(pos, path, parentOffset);
    }
  }, {
    key: "resolveCached",
    value: function resolveCached(doc, pos) {
      for (var i = 0; i < resolveCache.length; i++) {
        var cached = resolveCache[i];
        if (cached.pos == pos && cached.doc == doc) return cached;
      }
      var result = resolveCache[resolveCachePos] = ResolvedPos.resolve(doc, pos);
      resolveCachePos = (resolveCachePos + 1) % resolveCacheSize;
      return result;
    }
  }]);

  return ResolvedPos;
}();

var resolveCache = [];
var resolveCachePos = 0;
var resolveCacheSize = 12;

// ::- Represents a flat range of content, i.e. one that starts and
// ends in the same node.
var NodeRange = function () {
  // :: (ResolvedPos, ResolvedPos, number)
  // Construct a node range. `$from` and `$to` should point into the
  // same node until at least the given `depth`, since a node range
  // denotes an adjacent set of nodes in a single parent node.
  function NodeRange($from, $to, depth) {
    _classCallCheck(this, NodeRange);

    // :: ResolvedPos A resolved position along the start of the
    // content. May have a `depth` greater than this object's `depth`
    // property, since these are the positions that were used to
    // compute the range, not re-resolved positions directly at its
    // boundaries.
    this.$from = $from;
    // :: ResolvedPos A position along the end of the content. See
    // caveat for [`$from`](#model.NodeRange.$from).
    this.$to = $to;
    // :: number The depth of the node that this range points into.
    this.depth = depth;
  }

  // :: number The position at the start of the range.


  _createClass(NodeRange, [{
    key: "start",
    get: function get() {
      return this.$from.before(this.depth + 1);
    }
    // :: number The position at the end of the range.

  }, {
    key: "end",
    get: function get() {
      return this.$to.after(this.depth + 1);
    }

    // :: Node The parent node that the range points into.

  }, {
    key: "parent",
    get: function get() {
      return this.$from.node(this.depth);
    }
    // :: number The start index of the range in the parent node.

  }, {
    key: "startIndex",
    get: function get() {
      return this.$from.index(this.depth);
    }
    // :: number The end index of the range in the parent node.

  }, {
    key: "endIndex",
    get: function get() {
      return this.$to.indexAfter(this.depth);
    }
  }]);

  return NodeRange;
}();

var emptyAttrs = _Object$create(null);

// ::- This class represents a node in the tree that makes up a
// ProseMirror document. So a document is an instance of `Node`, with
// children that are also instances of `Node`.
//
// Nodes are persistent data structures. Instead of changing them, you
// create new ones with the content you want. Old ones keep pointing
// at the old document shape. This is made cheaper by sharing
// structure between the old and new data as much as possible, which a
// tree shape like this (without back pointers) makes easy.
//
// **Do not** directly mutate the properties of a `Node` object. See
// [the guide](/docs/guide/#doc) for more information.
var Node$1 = function () {
  function Node(type, attrs, content, marks) {
    _classCallCheck(this, Node);

    // :: NodeType
    // The type of node that this is.
    this.type = type;

    // :: Object
    // An object mapping attribute names to values. The kind of
    // attributes allowed and required are
    // [determined](#model.NodeSpec.attrs) by the node type.
    this.attrs = attrs;

    // :: Fragment
    // A container holding the node's children.
    this.content = content || Fragment.empty;

    // :: [Mark]
    // The marks (things like whether it is emphasized or part of a
    // link) applied to this node.
    this.marks = marks || Mark.none;
  }

  // text:: ?string
  // For text nodes, this contains the node's text content.

  // :: number
  // The size of this node, as defined by the integer-based [indexing
  // scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  // amount of characters. For other leaf nodes, it is one. For
  // non-leaf nodes, it is the size of the content plus two (the start
  // and end token).


  _createClass(Node, [{
    key: "child",


    // :: (number) → Node
    // Get the child node at the given index. Raises an error when the
    // index is out of range.
    value: function child(index) {
      return this.content.child(index);
    }

    // :: (number) → ?Node
    // Get the child node at the given index, if it exists.

  }, {
    key: "maybeChild",
    value: function maybeChild(index) {
      return this.content.maybeChild(index);
    }

    // :: ((node: Node, offset: number, index: number))
    // Call `f` for every child node, passing the node, its offset
    // into this parent node, and its index.

  }, {
    key: "forEach",
    value: function forEach(f) {
      this.content.forEach(f);
    }

    // :: (number, number, (node: Node, pos: number, parent: Node, index: number) → ?bool, ?number)
    // Invoke a callback for all descendant nodes recursively between
    // the given two positions that are relative to start of this node's
    // content. The callback is invoked with the node, its
    // parent-relative position, its parent node, and its child index.
    // When the callback returns false for a given node, that node's
    // children will not be recursed over. The last parameter can be
    // used to specify a starting position to count from.

  }, {
    key: "nodesBetween",
    value: function nodesBetween(from, to, f) {
      var startPos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      this.content.nodesBetween(from, to, f, startPos, this);
    }

    // :: ((node: Node, pos: number, parent: Node) → ?bool)
    // Call the given callback for every descendant node. Doesn't
    // descend into a node when the callback returns `false`.

  }, {
    key: "descendants",
    value: function descendants(f) {
      this.nodesBetween(0, this.content.size, f);
    }

    // :: string
    // Concatenates all the text nodes found in this fragment and its
    // children.

  }, {
    key: "textBetween",


    // :: (number, number, ?string, ?string) → string
    // Get all text between positions `from` and `to`. When
    // `blockSeparator` is given, it will be inserted whenever a new
    // block node is started. When `leafText` is given, it'll be
    // inserted for every non-text leaf node encountered.
    value: function textBetween(from, to, blockSeparator, leafText) {
      return this.content.textBetween(from, to, blockSeparator, leafText);
    }

    // :: ?Node
    // Returns this node's first child, or `null` if there are no
    // children.

  }, {
    key: "eq",


    // :: (Node) → bool
    // Test whether two nodes represent the same piece of document.
    value: function eq(other) {
      return this == other || this.sameMarkup(other) && this.content.eq(other.content);
    }

    // :: (Node) → bool
    // Compare the markup (type, attributes, and marks) of this node to
    // those of another. Returns `true` if both have the same markup.

  }, {
    key: "sameMarkup",
    value: function sameMarkup(other) {
      return this.hasMarkup(other.type, other.attrs, other.marks);
    }

    // :: (NodeType, ?Object, ?[Mark]) → bool
    // Check whether this node's markup correspond to the given type,
    // attributes, and marks.

  }, {
    key: "hasMarkup",
    value: function hasMarkup(type, attrs, marks) {
      return this.type == type && compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) && Mark.sameSet(this.marks, marks || Mark.none);
    }

    // :: (?Fragment) → Node
    // Create a new node with the same markup as this node, containing
    // the given content (or empty, if no content is given).

  }, {
    key: "copy",
    value: function copy() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (content == this.content) return this;
      return new this.constructor(this.type, this.attrs, content, this.marks);
    }

    // :: ([Mark]) → Node
    // Create a copy of this node, with the given set of marks instead
    // of the node's own marks.

  }, {
    key: "mark",
    value: function mark(marks) {
      return marks == this.marks ? this : new this.constructor(this.type, this.attrs, this.content, marks);
    }

    // :: (number, ?number) → Node
    // Create a copy of this node with only the content between the
    // given positions. If `to` is not given, it defaults to the end of
    // the node.

  }, {
    key: "cut",
    value: function cut(from, to) {
      if (from == 0 && to == this.content.size) return this;
      return this.copy(this.content.cut(from, to));
    }

    // :: (number, ?number) → Slice
    // Cut out the part of the document between the given positions, and
    // return it as a `Slice` object.

  }, {
    key: "slice",
    value: function slice(from) {
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.content.size;
      var includeParents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (from == to) return Slice.empty;

      var $from = this.resolve(from),
          $to = this.resolve(to);
      var depth = includeParents ? 0 : $from.sharedDepth(to);
      var start = $from.start(depth),
          node = $from.node(depth);
      var content = node.content.cut($from.pos - start, $to.pos - start);
      return new Slice(content, $from.depth - depth, $to.depth - depth);
    }

    // :: (number, number, Slice) → Node
    // Replace the part of the document between the given positions with
    // the given slice. The slice must 'fit', meaning its open sides
    // must be able to connect to the surrounding content, and its
    // content nodes must be valid children for the node they are placed
    // into. If any of this is violated, an error of type
    // [`ReplaceError`](#model.ReplaceError) is thrown.

  }, {
    key: "replace",
    value: function replace$$1(from, to, slice) {
      return replace(this.resolve(from), this.resolve(to), slice);
    }

    // :: (number) → ?Node
    // Find the node directly after the given position.

  }, {
    key: "nodeAt",
    value: function nodeAt(pos) {
      for (var node = this;;) {
        var _node$content$findInd = node.content.findIndex(pos),
            index = _node$content$findInd.index,
            offset = _node$content$findInd.offset;

        node = node.maybeChild(index);
        if (!node) return null;
        if (offset == pos || node.isText) return node;
        pos -= offset + 1;
      }
    }

    // :: (number) → {node: ?Node, index: number, offset: number}
    // Find the (direct) child node after the given offset, if any,
    // and return it along with its index and offset relative to this
    // node.

  }, {
    key: "childAfter",
    value: function childAfter(pos) {
      var _content$findIndex = this.content.findIndex(pos),
          index = _content$findIndex.index,
          offset = _content$findIndex.offset;

      return { node: this.content.maybeChild(index), index: index, offset: offset };
    }

    // :: (number) → {node: ?Node, index: number, offset: number}
    // Find the (direct) child node before the given offset, if any,
    // and return it along with its index and offset relative to this
    // node.

  }, {
    key: "childBefore",
    value: function childBefore(pos) {
      if (pos == 0) return { node: null, index: 0, offset: 0 };

      var _content$findIndex2 = this.content.findIndex(pos),
          index = _content$findIndex2.index,
          offset = _content$findIndex2.offset;

      if (offset < pos) return { node: this.content.child(index), index: index, offset: offset };
      var node = this.content.child(index - 1);
      return { node: node, index: index - 1, offset: offset - node.nodeSize };
    }

    // :: (number) → ResolvedPos
    // Resolve the given position in the document, returning an
    // [object](#model.ResolvedPos) with information about its context.

  }, {
    key: "resolve",
    value: function resolve(pos) {
      return ResolvedPos.resolveCached(this, pos);
    }
  }, {
    key: "resolveNoCache",
    value: function resolveNoCache(pos) {
      return ResolvedPos.resolve(this, pos);
    }

    // :: (number, number, MarkType) → bool
    // Test whether a mark of the given type occurs in this document
    // between the two given positions.

  }, {
    key: "rangeHasMark",
    value: function rangeHasMark(from, to, type) {
      var found = false;
      if (to > from) this.nodesBetween(from, to, function (node) {
        if (type.isInSet(node.marks)) found = true;
        return !found;
      });
      return found;
    }

    // :: bool
    // True when this is a block (non-inline node)

  }, {
    key: "toString",


    // :: () → string
    // Return a string representation of this node for debugging
    // purposes.
    value: function toString() {
      if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
      var name = this.type.name;
      if (this.content.size) name += "(" + this.content.toStringInner() + ")";
      return wrapMarks(this.marks, name);
    }

    // :: (number) → ContentMatch
    // Get the content match in this node at the given index.

  }, {
    key: "contentMatchAt",
    value: function contentMatchAt(index) {
      var match = this.type.contentMatch.matchFragment(this.content, 0, index);
      if (!match) throw new Error("Called contentMatchAt on a node with invalid content");
      return match;
    }

    // :: (number, number, ?Fragment, ?number, ?number) → bool
    // Test whether replacing the range between `from` and `to` (by
    // child index) with the given replacement fragment (which defaults
    // to the empty fragment) would leave the node's content valid. You
    // can optionally pass `start` and `end` indices into the
    // replacement fragment.

  }, {
    key: "canReplace",
    value: function canReplace(from, to) {
      var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Fragment.empty;
      var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : replacement.childCount;

      var one = this.contentMatchAt(from).matchFragment(replacement, start, end);
      var two = one && one.matchFragment(this.content, to);
      if (!two || !two.validEnd) return false;
      for (var i = start; i < end; i++) {
        if (!this.type.allowsMarks(replacement.child(i).marks)) return false;
      }return true;
    }

    // :: (number, number, NodeType, ?[Mark]) → bool
    // Test whether replacing the range `from` to `to` (by index) with a
    // node of the given type would leave the node's content valid.

  }, {
    key: "canReplaceWith",
    value: function canReplaceWith(from, to, type, marks) {
      if (marks && !this.type.allowsMarks(marks)) return false;
      var start = this.contentMatchAt(from).matchType(type);
      var end = start && start.matchFragment(this.content, to);
      return end ? end.validEnd : false;
    }

    // :: (Node) → bool
    // Test whether the given node's content could be appended to this
    // node. If that node is empty, this will only return true if there
    // is at least one node type that can appear in both nodes (to avoid
    // merging completely incompatible nodes).

  }, {
    key: "canAppend",
    value: function canAppend(other) {
      if (other.content.size) return this.canReplace(this.childCount, this.childCount, other.content);else return this.type.compatibleContent(other.type);
    }

    // Unused. Left for backwards compatibility.

  }, {
    key: "defaultContentType",
    value: function defaultContentType(at) {
      return this.contentMatchAt(at).defaultType;
    }

    // :: ()
    // Check whether this node and its descendants conform to the
    // schema, and raise error when they do not.

  }, {
    key: "check",
    value: function check() {
      if (!this.type.validContent(this.content)) throw new RangeError("Invalid content for node " + this.type.name + ": " + this.content.toString().slice(0, 50));
      this.content.forEach(function (node) {
        return node.check();
      });
    }

    // :: () → Object
    // Return a JSON-serializeable representation of this node.

  }, {
    key: "toJSON",
    value: function toJSON() {
      var obj = { type: this.type.name };
      for (var _ in this.attrs) {
        obj.attrs = this.attrs;
        break;
      }
      if (this.content.size) obj.content = this.content.toJSON();
      if (this.marks.length) obj.marks = this.marks.map(function (n) {
        return n.toJSON();
      });
      return obj;
    }

    // :: (Schema, Object) → Node
    // Deserialize a node from its JSON representation.

  }, {
    key: "nodeSize",
    get: function get$$1() {
      return this.isLeaf ? 1 : 2 + this.content.size;
    }

    // :: number
    // The number of children that the node has.

  }, {
    key: "childCount",
    get: function get$$1() {
      return this.content.childCount;
    }
  }, {
    key: "textContent",
    get: function get$$1() {
      return this.textBetween(0, this.content.size, "");
    }
  }, {
    key: "firstChild",
    get: function get$$1() {
      return this.content.firstChild;
    }

    // :: ?Node
    // Returns this node's last child, or `null` if there are no
    // children.

  }, {
    key: "lastChild",
    get: function get$$1() {
      return this.content.lastChild;
    }
  }, {
    key: "isBlock",
    get: function get$$1() {
      return this.type.isBlock;
    }

    // :: bool
    // True when this is a textblock node, a block node with inline
    // content.

  }, {
    key: "isTextblock",
    get: function get$$1() {
      return this.type.isTextblock;
    }

    // :: bool
    // True when this node has inline content.

  }, {
    key: "inlineContent",
    get: function get$$1() {
      return this.type.inlineContent;
    }

    // :: bool
    // True when this is an inline node (a text node or a node that can
    // appear among text).

  }, {
    key: "isInline",
    get: function get$$1() {
      return this.type.isInline;
    }

    // :: bool
    // True when this is a text node.

  }, {
    key: "isText",
    get: function get$$1() {
      return this.type.isText;
    }

    // :: bool
    // True when this is a leaf node.

  }, {
    key: "isLeaf",
    get: function get$$1() {
      return this.type.isLeaf;
    }

    // :: bool
    // True when this is an atom, i.e. when it does not have directly
    // editable content. This is usually the same as `isLeaf`, but can
    // be configured with the [`atom` property](#model.NodeSpec.atom) on
    // a node's spec (typically used when the node is displayed as an
    // uneditable [node view](#view.NodeView)).

  }, {
    key: "isAtom",
    get: function get$$1() {
      return this.type.isAtom;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (!json) throw new RangeError("Invalid input for Node.fromJSON");
      var marks = null;
      if (json.marks) {
        if (!Array.isArray(json.marks)) throw new RangeError("Invalid mark data for Node.fromJSON");
        marks = json.marks.map(schema.markFromJSON);
      }
      if (json.type == "text") {
        if (typeof json.text != "string") throw new RangeError("Invalid text node in JSON");
        return schema.text(json.text, marks);
      }
      var content = Fragment.fromJSON(schema, json.content);
      return schema.nodeType(json.type).create(json.attrs, content, marks);
    }
  }]);

  return Node;
}();

var TextNode = function (_Node) {
  _inherits(TextNode, _Node);

  function TextNode(type, attrs, content, marks) {
    _classCallCheck(this, TextNode);

    var _this = _possibleConstructorReturn(this, (TextNode.__proto__ || _Object$getPrototypeOf(TextNode)).call(this, type, attrs, null, marks));

    if (!content) throw new RangeError("Empty text nodes are not allowed");

    _this.text = content;
    return _this;
  }

  _createClass(TextNode, [{
    key: "toString",
    value: function toString() {
      if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
      return wrapMarks(this.marks, _JSON$stringify(this.text));
    }
  }, {
    key: "textBetween",
    value: function textBetween(from, to) {
      return this.text.slice(from, to);
    }
  }, {
    key: "mark",
    value: function mark(marks) {
      return marks == this.marks ? this : new TextNode(this.type, this.attrs, this.text, marks);
    }
  }, {
    key: "withText",
    value: function withText(text) {
      if (text == this.text) return this;
      return new TextNode(this.type, this.attrs, text, this.marks);
    }
  }, {
    key: "cut",
    value: function cut() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.text.length;

      if (from == 0 && to == this.text.length) return this;
      return this.withText(this.text.slice(from, to));
    }
  }, {
    key: "eq",
    value: function eq(other) {
      return this.sameMarkup(other) && this.text == other.text;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var base = _get(TextNode.prototype.__proto__ || _Object$getPrototypeOf(TextNode.prototype), "toJSON", this).call(this);
      base.text = this.text;
      return base;
    }
  }, {
    key: "textContent",
    get: function get$$1() {
      return this.text;
    }
  }, {
    key: "nodeSize",
    get: function get$$1() {
      return this.text.length;
    }
  }]);

  return TextNode;
}(Node$1);

function wrapMarks(marks, str) {
  for (var i = marks.length - 1; i >= 0; i--) {
    str = marks[i].type.name + "(" + str + ")";
  }return str;
}

// ::- Persistent data structure representing an ordered mapping from
// strings to values, with some convenient update methods.
function OrderedMap(content) {
  this.content = content;
}

OrderedMap.prototype = {
  constructor: OrderedMap,

  find: function(key) {
    for (var i = 0; i < this.content.length; i += 2)
      if (this.content[i] === key) return i
    return -1
  },

  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(key) {
    var found = this.find(key);
    return found == -1 ? undefined : this.content[found + 1]
  },

  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(key, value, newKey) {
    var self = newKey && newKey != key ? this.remove(newKey) : this;
    var found = self.find(key), content = self.content.slice();
    if (found == -1) {
      content.push(newKey || key, value);
    } else {
      content[found + 1] = value;
      if (newKey) content[found] = newKey;
    }
    return new OrderedMap(content)
  },

  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(key) {
    var found = this.find(key);
    if (found == -1) return this
    var content = this.content.slice();
    content.splice(found, 2);
    return new OrderedMap(content)
  },

  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(key, value) {
    return new OrderedMap([key, value].concat(this.remove(key).content))
  },

  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(key, value) {
    var content = this.remove(key).content.slice();
    content.push(key, value);
    return new OrderedMap(content)
  },

  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(place, key, value) {
    var without = this.remove(key), content = without.content.slice();
    var found = without.find(place);
    content.splice(found == -1 ? content.length : found, 0, key, value);
    return new OrderedMap(content)
  },

  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(f) {
    for (var i = 0; i < this.content.length; i += 2)
      f(this.content[i], this.content[i + 1]);
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(map) {
    map = OrderedMap.from(map);
    if (!map.size) return this
    return new OrderedMap(map.content.concat(this.subtract(map).content))
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(map) {
    map = OrderedMap.from(map);
    if (!map.size) return this
    return new OrderedMap(this.subtract(map).content.concat(map.content))
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(map) {
    var result = this;
    map = OrderedMap.from(map);
    for (var i = 0; i < map.content.length; i += 2)
      result = result.remove(map.content[i]);
    return result
  },

  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1
  }
};

// :: (?union<Object, OrderedMap>) → OrderedMap
// Return a map with the given content. If null, create an empty
// map. If given an ordered map, return that map itself. If given an
// object, create a map from the object's properties.
OrderedMap.from = function(value) {
  if (value instanceof OrderedMap) return value
  var content = [];
  if (value) for (var prop in value) content.push(prop, value[prop]);
  return new OrderedMap(content)
};

var orderedmap = OrderedMap;

var ContentMatch = function () {
  function ContentMatch(validEnd) {
    _classCallCheck(this, ContentMatch);

    // :: bool
    // True when this match state represents a valid end of the node.
    this.validEnd = validEnd;
    this.next = [];
    this.wrapCache = [];
  }

  _createClass(ContentMatch, [{
    key: "matchType",


    // :: (NodeType) → ?ContentMatch
    // Match a node type, returning a match after that node if
    // successful.
    value: function matchType(type) {
      for (var i = 0; i < this.next.length; i += 2) {
        if (this.next[i] == type) return this.next[i + 1];
      }return null;
    }

    // :: (Fragment, ?number, ?number) → ?ContentMatch
    // Try to match a fragment. Returns the resulting match when
    // successful.

  }, {
    key: "matchFragment",
    value: function matchFragment(frag) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : frag.childCount;

      var cur = this;
      for (var i = start; cur && i < end; i++) {
        cur = cur.matchType(frag.child(i).type);
      }return cur;
    }
  }, {
    key: "compatible",
    value: function compatible(other) {
      for (var i = 0; i < this.next.length; i += 2) {
        for (var j = 0; j < other.next.length; j += 2) {
          if (this.next[i] == other.next[j]) return true;
        }
      }return false;
    }

    // :: (Fragment, bool, ?number) → ?Fragment
    // Try to match the given fragment, and if that fails, see if it can
    // be made to match by inserting nodes in front of it. When
    // successful, return a fragment of inserted nodes (which may be
    // empty if nothing had to be inserted). When `toEnd` is true, only
    // return a fragment if the resulting match goes to the end of the
    // content expression.

  }, {
    key: "fillBefore",
    value: function fillBefore(after) {
      var toEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var seen = [this];
      function search(match, types) {
        var finished = match.matchFragment(after, startIndex);
        if (finished && (!toEnd || finished.validEnd)) return Fragment.from(types.map(function (tp) {
          return tp.createAndFill();
        }));

        for (var i = 0; i < match.next.length; i += 2) {
          var type = match.next[i],
              next = match.next[i + 1];
          if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
            seen.push(next);
            var found = search(next, types.concat(type));
            if (found) return found;
          }
        }
      }

      return search(this, []);
    }

    // :: (NodeType) → ?[NodeType]
    // Find a set of wrapping node types that would allow a node of the
    // given type to appear at this position. The result may be empty
    // (when it fits directly) and will be null when no such wrapping
    // exists.

  }, {
    key: "findWrapping",
    value: function findWrapping(target) {
      for (var i = 0; i < this.wrapCache.length; i += 2) {
        if (this.wrapCache[i] == target) return this.wrapCache[i + 1];
      }var computed = this.computeWrapping(target);
      this.wrapCache.push(target, computed);
      return computed;
    }
  }, {
    key: "computeWrapping",
    value: function computeWrapping(target) {
      var seen = _Object$create(null),
          active = [{ match: this, type: null, via: null }];
      while (active.length) {
        var current = active.shift(),
            match = current.match;
        if (match.matchType(target)) {
          var result = [];
          for (var obj = current; obj.type; obj = obj.via) {
            result.push(obj.type);
          }return result.reverse();
        }
        for (var i = 0; i < match.next.length; i += 2) {
          var type = match.next[i];
          if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || match.next[i + 1].validEnd)) {
            active.push({ match: type.contentMatch, type: type, via: current });
            seen[type.name] = true;
          }
        }
      }
    }

    // :: number
    // The number of outgoing edges this node has in the finite
    // automaton that describes the content expression.

  }, {
    key: "edge",


    // :: (number) → {type: NodeType, next: ContentMatch}
    // Get the _n_th outgoing edge from this node in the finite
    // automaton that describes the content expression.
    value: function edge(n) {
      var i = n << 1;
      if (i > this.next.length) throw new RangeError("There's no " + n + "th edge in this content match");
      return { type: this.next[i], next: this.next[i + 1] };
    }
  }, {
    key: "toString",
    value: function toString() {
      var seen = [];
      function scan(m) {
        seen.push(m);
        for (var i = 1; i < m.next.length; i += 2) {
          if (seen.indexOf(m.next[i]) == -1) scan(m.next[i]);
        }
      }
      scan(this);
      return seen.map(function (m, i) {
        var out = i + (m.validEnd ? "*" : " ") + " ";
        for (var _i = 0; _i < m.next.length; _i += 2) {
          out += (_i ? ", " : "") + m.next[_i].name + "->" + seen.indexOf(m.next[_i + 1]);
        }return out;
      }).join("\n");
    }
  }, {
    key: "inlineContent",
    get: function get() {
      var first = this.next[0];
      return first ? first.isInline : false;
    }

    // :: ?NodeType
    // Get the first matching node type at this match position that can
    // be generated.

  }, {
    key: "defaultType",
    get: function get() {
      for (var i = 0; i < this.next.length; i += 2) {
        var type = this.next[i];
        if (!(type.isText || type.hasRequiredAttrs())) return type;
      }
    }
  }, {
    key: "edgeCount",
    get: function get() {
      return this.next.length >> 1;
    }
  }], [{
    key: "parse",
    value: function parse(string, nodeTypes) {
      var stream = new TokenStream(string, nodeTypes);
      if (stream.next == null) return ContentMatch.empty;
      var expr = parseExpr(stream);
      if (stream.next) stream.err("Unexpected trailing text");
      var match = dfa(nfa(expr));
      checkForDeadEnds(match, stream);
      return match;
    }
  }]);

  return ContentMatch;
}();

ContentMatch.empty = new ContentMatch(true);

var TokenStream = function () {
  function TokenStream(string, nodeTypes) {
    _classCallCheck(this, TokenStream);

    this.string = string;
    this.nodeTypes = nodeTypes;
    this.inline = null;
    this.pos = 0;
    this.tokens = string.split(/\s*(?=\b|\W|$)/);
    if (this.tokens[this.tokens.length - 1] == "") this.tokens.pop();
    if (this.tokens[0] == "") this.tokens.unshift();
  }

  _createClass(TokenStream, [{
    key: "eat",
    value: function eat(tok) {
      return this.next == tok && (this.pos++ || true);
    }
  }, {
    key: "err",
    value: function err(str) {
      throw new SyntaxError(str + " (in content expression '" + this.string + "')");
    }
  }, {
    key: "next",
    get: function get() {
      return this.tokens[this.pos];
    }
  }]);

  return TokenStream;
}();

function parseExpr(stream) {
  var exprs = [];
  do {
    exprs.push(parseExprSeq(stream));
  } while (stream.eat("|"));
  return exprs.length == 1 ? exprs[0] : { type: "choice", exprs: exprs };
}

function parseExprSeq(stream) {
  var exprs = [];
  do {
    exprs.push(parseExprSubscript(stream));
  } while (stream.next && stream.next != ")" && stream.next != "|");
  return exprs.length == 1 ? exprs[0] : { type: "seq", exprs: exprs };
}

function parseExprSubscript(stream) {
  var expr = parseExprAtom(stream);
  for (;;) {
    if (stream.eat("+")) expr = { type: "plus", expr: expr };else if (stream.eat("*")) expr = { type: "star", expr: expr };else if (stream.eat("?")) expr = { type: "opt", expr: expr };else if (stream.eat("{")) expr = parseExprRange(stream, expr);else break;
  }
  return expr;
}

function parseNum(stream) {
  if (/\D/.test(stream.next)) stream.err("Expected number, got '" + stream.next + "'");
  var result = Number(stream.next);
  stream.pos++;
  return result;
}

function parseExprRange(stream, expr) {
  var min = parseNum(stream),
      max = min;
  if (stream.eat(",")) {
    if (stream.next != "}") max = parseNum(stream);else max = -1;
  }
  if (!stream.eat("}")) stream.err("Unclosed braced range");
  return { type: "range", min: min, max: max, expr: expr };
}

function resolveName(stream, name) {
  var types = stream.nodeTypes,
      type = types[name];
  if (type) return [type];
  var result = [];
  for (var typeName in types) {
    var _type = types[typeName];
    if (_type.groups.indexOf(name) > -1) result.push(_type);
  }
  if (result.length == 0) stream.err("No node type or group '" + name + "' found");
  return result;
}

function parseExprAtom(stream) {
  if (stream.eat("(")) {
    var expr = parseExpr(stream);
    if (!stream.eat(")")) stream.err("Missing closing paren");
    return expr;
  } else if (!/\W/.test(stream.next)) {
    var exprs = resolveName(stream, stream.next).map(function (type) {
      if (stream.inline == null) stream.inline = type.isInline;else if (stream.inline != type.isInline) stream.err("Mixing inline and block content");
      return { type: "name", value: type };
    });
    stream.pos++;
    return exprs.length == 1 ? exprs[0] : { type: "choice", exprs: exprs };
  } else {
    stream.err("Unexpected token '" + stream.next + "'");
  }
}

// The code below helps compile a regular-expression-like language
// into a deterministic finite automaton. For a good introduction to
// these concepts, see https://swtch.com/~rsc/regexp/regexp1.html

// : (Object) → [[{term: ?any, to: number}]]
// Construct an NFA from an expression as returned by the parser. The
// NFA is represented as an array of states, which are themselves
// arrays of edges, which are `{term, to}` objects. The first state is
// the entry state and the last node is the success state.
//
// Note that unlike typical NFAs, the edge ordering in this one is
// significant, in that it is used to contruct filler content when
// necessary.
function nfa(expr) {
  var nfa = [[]];
  connect(compile(expr, 0), node());
  return nfa;

  function node() {
    return nfa.push([]) - 1;
  }
  function edge(from, to, term) {
    var edge = { term: term, to: to };
    nfa[from].push(edge);
    return edge;
  }
  function connect(edges, to) {
    edges.forEach(function (edge) {
      return edge.to = to;
    });
  }

  function compile(expr, from) {
    if (expr.type == "choice") {
      return expr.exprs.reduce(function (out, expr) {
        return out.concat(compile(expr, from));
      }, []);
    } else if (expr.type == "seq") {
      for (var i = 0;; i++) {
        var next = compile(expr.exprs[i], from);
        if (i == expr.exprs.length - 1) return next;
        connect(next, from = node());
      }
    } else if (expr.type == "star") {
      var loop = node();
      edge(from, loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)];
    } else if (expr.type == "plus") {
      var _loop = node();
      connect(compile(expr.expr, from), _loop);
      connect(compile(expr.expr, _loop), _loop);
      return [edge(_loop)];
    } else if (expr.type == "opt") {
      return [edge(from)].concat(compile(expr.expr, from));
    } else if (expr.type == "range") {
      var cur = from;
      for (var _i2 = 0; _i2 < expr.min; _i2++) {
        var _next = node();
        connect(compile(expr.expr, cur), _next);
        cur = _next;
      }
      if (expr.max == -1) {
        connect(compile(expr.expr, cur), cur);
      } else {
        for (var _i3 = expr.min; _i3 < expr.max; _i3++) {
          var _next2 = node();
          edge(cur, _next2);
          connect(compile(expr.expr, cur), _next2);
          cur = _next2;
        }
      }
      return [edge(cur)];
    } else if (expr.type == "name") {
      return [edge(from, null, expr.value)];
    }
  }
}

function cmp(a, b) {
  return a - b;
}

// Get the set of nodes reachable by null edges from `node`. Omit
// nodes with only a single null-out-edge, since they may lead to
// needless duplicated nodes.
function nullFrom(nfa, node) {
  var result = [];
  scan(node);
  return result.sort(cmp);

  function scan(node) {
    var edges = nfa[node];
    if (edges.length == 1 && !edges[0].term) return scan(edges[0].to);
    result.push(node);
    for (var i = 0; i < edges.length; i++) {
      var _edges$i = edges[i],
          term = _edges$i.term,
          to = _edges$i.to;

      if (!term && result.indexOf(to) == -1) scan(to);
    }
  }
}

// : ([[{term: ?any, to: number}]]) → ContentMatch
// Compiles an NFA as produced by `nfa` into a DFA, modeled as a set
// of state objects (`ContentMatch` instances) with transitions
// between them.
function dfa(nfa) {
  var labeled = _Object$create(null);
  return explore(nullFrom(nfa, 0));

  function explore(states) {
    var out = [];
    states.forEach(function (node) {
      nfa[node].forEach(function (_ref) {
        var term = _ref.term,
            to = _ref.to;

        if (!term) return;
        var known = out.indexOf(term),
            set = known > -1 && out[known + 1];
        nullFrom(nfa, to).forEach(function (node) {
          if (!set) out.push(term, set = []);
          if (set.indexOf(node) == -1) set.push(node);
        });
      });
    });
    var state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa.length - 1) > -1);
    for (var i = 0; i < out.length; i += 2) {
      var _states = out[i + 1].sort(cmp);
      state.next.push(out[i], labeled[_states.join(",")] || explore(_states));
    }
    return state;
  }
}

function checkForDeadEnds(match, stream) {
  for (var i = 0, work = [match]; i < work.length; i++) {
    var state = work[i],
        dead = !state.validEnd,
        nodes = [];
    for (var j = 0; j < state.next.length; j += 2) {
      var node = state.next[j],
          next = state.next[j + 1];
      nodes.push(node.name);
      if (dead && !(node.isText || node.hasRequiredAttrs())) dead = false;
      if (work.indexOf(next) == -1) work.push(next);
    }
    if (dead) stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position");
  }
}

function defaultAttrs(attrs) {
  var defaults = _Object$create(null);
  for (var attrName in attrs) {
    var attr = attrs[attrName];
    if (!attr.hasDefault) return null;
    defaults[attrName] = attr.default;
  }
  return defaults;
}

function _computeAttrs(attrs, value) {
  var built = _Object$create(null);
  for (var name in attrs) {
    var given = value && value[name];
    if (given === undefined) {
      var attr = attrs[name];
      if (attr.hasDefault) given = attr.default;else throw new RangeError("No value supplied for attribute " + name);
    }
    built[name] = given;
  }
  return built;
}

function initAttrs(attrs) {
  var result = _Object$create(null);
  if (attrs) for (var name in attrs) {
    result[name] = new Attribute(attrs[name]);
  }return result;
}

// ::- Node types are objects allocated once per `Schema` and used to
// [tag](#model.Node.type) `Node` instances. They contain information
// about the node type, such as its name and what kind of node it
// represents.
var NodeType = function () {
  function NodeType(name, schema, spec) {
    _classCallCheck(this, NodeType);

    // :: string
    // The name the node type has in this schema.
    this.name = name;

    // :: Schema
    // A link back to the `Schema` the node type belongs to.
    this.schema = schema;

    // :: NodeSpec
    // The spec that this type is based on
    this.spec = spec;

    this.groups = spec.group ? spec.group.split(" ") : [];
    this.attrs = initAttrs(spec.attrs);

    this.defaultAttrs = defaultAttrs(this.attrs);

    // :: ContentMatch
    // The starting match of the node type's content expression.
    this.contentMatch = null;

    // : ?[MarkType]
    // The set of marks allowed in this node. `null` means all marks
    // are allowed.
    this.markSet = null;

    // :: bool
    // True if this node type has inline content.
    this.inlineContent = null;

    // :: bool
    // True if this is a block type
    this.isBlock = !(spec.inline || name == "text");

    // :: bool
    // True if this is the text node type.
    this.isText = name == "text";
  }

  // :: bool
  // True if this is an inline type.


  _createClass(NodeType, [{
    key: "hasRequiredAttrs",
    value: function hasRequiredAttrs(ignore) {
      for (var n in this.attrs) {
        if (this.attrs[n].isRequired && (!ignore || !(n in ignore))) return true;
      }return false;
    }
  }, {
    key: "compatibleContent",
    value: function compatibleContent(other) {
      return this == other || this.contentMatch.compatible(other.contentMatch);
    }
  }, {
    key: "computeAttrs",
    value: function computeAttrs(attrs) {
      if (!attrs && this.defaultAttrs) return this.defaultAttrs;else return _computeAttrs(this.attrs, attrs);
    }

    // :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
    // Create a `Node` of this type. The given attributes are
    // checked and defaulted (you can pass `null` to use the type's
    // defaults entirely, if no required attributes exist). `content`
    // may be a `Fragment`, a node, an array of nodes, or
    // `null`. Similarly `marks` may be `null` to default to the empty
    // set of marks.

  }, {
    key: "create",
    value: function create$$1(attrs, content, marks) {
      if (this.isText) throw new Error("NodeType.create can't construct text nodes");
      return new Node$1(this, this.computeAttrs(attrs), Fragment.from(content), Mark.setFrom(marks));
    }

    // :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
    // Like [`create`](#model.NodeType.create), but check the given content
    // against the node type's content restrictions, and throw an error
    // if it doesn't match.

  }, {
    key: "createChecked",
    value: function createChecked(attrs, content, marks) {
      content = Fragment.from(content);
      if (!this.validContent(content)) throw new RangeError("Invalid content for node " + this.name);
      return new Node$1(this, this.computeAttrs(attrs), content, Mark.setFrom(marks));
    }

    // :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → ?Node
    // Like [`create`](#model.NodeType.create), but see if it is necessary to
    // add nodes to the start or end of the given fragment to make it
    // fit the node. If no fitting wrapping can be found, return null.
    // Note that, due to the fact that required nodes can always be
    // created, this will always succeed if you pass null or
    // `Fragment.empty` as content.

  }, {
    key: "createAndFill",
    value: function createAndFill(attrs, content, marks) {
      attrs = this.computeAttrs(attrs);
      content = Fragment.from(content);
      if (content.size) {
        var before = this.contentMatch.fillBefore(content);
        if (!before) return null;
        content = before.append(content);
      }
      var after = this.contentMatch.matchFragment(content).fillBefore(Fragment.empty, true);
      if (!after) return null;
      return new Node$1(this, attrs, content.append(after), Mark.setFrom(marks));
    }

    // :: (Fragment) → bool
    // Returns true if the given fragment is valid content for this node
    // type with the given attributes.

  }, {
    key: "validContent",
    value: function validContent(content) {
      var result = this.contentMatch.matchFragment(content);
      if (!result || !result.validEnd) return false;
      for (var i = 0; i < content.childCount; i++) {
        if (!this.allowsMarks(content.child(i).marks)) return false;
      }return true;
    }

    // :: (MarkType) → bool
    // Check whether the given mark type is allowed in this node.

  }, {
    key: "allowsMarkType",
    value: function allowsMarkType(markType) {
      return this.markSet == null || this.markSet.indexOf(markType) > -1;
    }

    // :: ([Mark]) → bool
    // Test whether the given set of marks are allowed in this node.

  }, {
    key: "allowsMarks",
    value: function allowsMarks(marks) {
      if (this.markSet == null) return true;
      for (var i = 0; i < marks.length; i++) {
        if (!this.allowsMarkType(marks[i].type)) return false;
      }return true;
    }

    // :: ([Mark]) → [Mark]
    // Removes the marks that are not allowed in this node from the given set.

  }, {
    key: "allowedMarks",
    value: function allowedMarks(marks) {
      if (this.markSet == null) return marks;
      var copy = void 0;
      for (var i = 0; i < marks.length; i++) {
        if (!this.allowsMarkType(marks[i].type)) {
          if (!copy) copy = marks.slice(0, i);
        } else if (copy) {
          copy.push(marks[i]);
        }
      }
      return !copy ? marks : copy.length ? copy : Mark.empty;
    }
  }, {
    key: "isInline",
    get: function get() {
      return !this.isBlock;
    }

    // :: bool
    // True if this is a textblock type, a block that contains inline
    // content.

  }, {
    key: "isTextblock",
    get: function get() {
      return this.isBlock && this.inlineContent;
    }

    // :: bool
    // True for node types that allow no content.

  }, {
    key: "isLeaf",
    get: function get() {
      return this.contentMatch == ContentMatch.empty;
    }

    // :: bool
    // True when this node is an atom, i.e. when it does not have
    // directly editable content.

  }, {
    key: "isAtom",
    get: function get() {
      return this.isLeaf || this.spec.atom;
    }
  }], [{
    key: "compile",
    value: function compile(nodes, schema) {
      var result = _Object$create(null);
      nodes.forEach(function (name, spec) {
        return result[name] = new NodeType(name, schema, spec);
      });

      var topType = schema.spec.topNode || "doc";
      if (!result[topType]) throw new RangeError("Schema is missing its top node type ('" + topType + "')");
      if (!result.text) throw new RangeError("Every schema needs a 'text' type");
      for (var _ in result.text.attrs) {
        throw new RangeError("The text node type should not have attributes");
      }return result;
    }
  }]);

  return NodeType;
}();

// Attribute descriptors

var Attribute = function () {
  function Attribute(options) {
    _classCallCheck(this, Attribute);

    this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
    this.default = options.default;
  }

  _createClass(Attribute, [{
    key: "isRequired",
    get: function get() {
      return !this.hasDefault;
    }
  }]);

  return Attribute;
}();

// Marks

// ::- Like nodes, marks (which are associated with nodes to signify
// things like emphasis or being part of a link) are
// [tagged](#model.Mark.type) with type objects, which are
// instantiated once per `Schema`.


var MarkType = function () {
  function MarkType(name, rank, schema, spec) {
    _classCallCheck(this, MarkType);

    // :: string
    // The name of the mark type.
    this.name = name;

    // :: Schema
    // The schema that this mark type instance is part of.
    this.schema = schema;

    // :: MarkSpec
    // The spec on which the type is based.
    this.spec = spec;

    this.attrs = initAttrs(spec.attrs);

    this.rank = rank;
    this.excluded = null;
    var defaults = defaultAttrs(this.attrs);
    this.instance = defaults && new Mark(this, defaults);
  }

  // :: (?Object) → Mark
  // Create a mark of this type. `attrs` may be `null` or an object
  // containing only some of the mark's attributes. The others, if
  // they have defaults, will be added.


  _createClass(MarkType, [{
    key: "create",
    value: function create$$1(attrs) {
      if (!attrs && this.instance) return this.instance;
      return new Mark(this, _computeAttrs(this.attrs, attrs));
    }
  }, {
    key: "removeFromSet",


    // :: ([Mark]) → [Mark]
    // When there is a mark of this type in the given set, a new set
    // without it is returned. Otherwise, the input set is returned.
    value: function removeFromSet(set) {
      for (var i = 0; i < set.length; i++) {
        if (set[i].type == this) return set.slice(0, i).concat(set.slice(i + 1));
      }return set;
    }

    // :: ([Mark]) → ?Mark
    // Tests whether there is a mark of this type in the given set.

  }, {
    key: "isInSet",
    value: function isInSet(set) {
      for (var i = 0; i < set.length; i++) {
        if (set[i].type == this) return set[i];
      }
    }

    // :: (MarkType) → bool
    // Queries whether a given mark type is
    // [excluded](#model.MarkSpec.excludes) by this one.

  }, {
    key: "excludes",
    value: function excludes(other) {
      return this.excluded.indexOf(other) > -1;
    }
  }], [{
    key: "compile",
    value: function compile(marks, schema) {
      var result = _Object$create(null),
          rank = 0;
      marks.forEach(function (name, spec) {
        return result[name] = new MarkType(name, rank++, schema, spec);
      });
      return result;
    }
  }]);

  return MarkType;
}();

// SchemaSpec:: interface
// An object describing a schema, as passed to the [`Schema`](#model.Schema)
// constructor.
//
//   nodes:: union<Object<NodeSpec>, OrderedMap<NodeSpec>>
//   The node types in this schema. Maps names to
//   [`NodeSpec`](#model.NodeSpec) objects that describe the node type
//   associated with that name. Their order is significant—it
//   determines which [parse rules](#model.NodeSpec.parseDOM) take
//   precedence by default, and which nodes come first in a given
//   [group](#model.NodeSpec.group).
//
//   marks:: ?union<Object<MarkSpec>, OrderedMap<MarkSpec>>
//   The mark types that exist in this schema. The order in which they
//   are provided determines the order in which [mark
//   sets](#model.Mark.addToSet) are sorted and in which [parse
//   rules](#model.MarkSpec.parseDOM) are tried.
//
//   topNode:: ?string
//   The name of the default top-level node for the schema. Defaults
//   to `"doc"`.

// NodeSpec:: interface
//
//   content:: ?string
//   The content expression for this node, as described in the [schema
//   guide](/docs/guide/#schema.content_expressions). When not given,
//   the node does not allow any content.
//
//   marks:: ?string
//   The marks that are allowed inside of this node. May be a
//   space-separated string referring to mark names or groups, `"_"`
//   to explicitly allow all marks, or `""` to disallow marks. When
//   not given, nodes with inline content default to allowing all
//   marks, other nodes default to not allowing marks.
//
//   group:: ?string
//   The group or space-separated groups to which this node belongs,
//   which can be referred to in the content expressions for the
//   schema.
//
//   inline:: ?bool
//   Should be set to true for inline nodes. (Implied for text nodes.)
//
//   atom:: ?bool
//   Can be set to true to indicate that, though this isn't a [leaf
//   node](#model.NodeType.isLeaf), it doesn't have directly editable
//   content and should be treated as a single unit in the view.
//
//   attrs:: ?Object<AttributeSpec>
//   The attributes that nodes of this type get.
//
//   selectable:: ?bool
//   Controls whether nodes of this type can be selected as a [node
//   selection](#state.NodeSelection). Defaults to true for non-text
//   nodes.
//
//   draggable:: ?bool
//   Determines whether nodes of this type can be dragged without
//   being selected. Defaults to false.
//
//   code:: ?bool
//   Can be used to indicate that this node contains code, which
//   causes some commands to behave differently.
//
//   defining:: ?bool
//   Determines whether this node is considered an important parent
//   node during replace operations (such as paste). Non-defining (the
//   default) nodes get dropped when their entire content is replaced,
//   whereas defining nodes persist and wrap the inserted content.
//   Likewise, in _inserted_ content the defining parents of the
//   content are preserved when possible. Typically,
//   non-default-paragraph textblock types, and possibly list items,
//   are marked as defining.
//
//   isolating:: ?bool
//   When enabled (default is false), the sides of nodes of this type
//   count as boundaries that regular editing operations, like
//   backspacing or lifting, won't cross. An example of a node that
//   should probably have this enabled is a table cell.
//
//   toDOM:: ?(node: Node) → DOMOutputSpec
//   Defines the default way a node of this type should be serialized
//   to DOM/HTML (as used by
//   [`DOMSerializer.fromSchema`](#model.DOMSerializer^fromSchema)).
//   Should return a DOM node or an [array
//   structure](#model.DOMOutputSpec) that describes one, with an
//   optional number zero (“hole”) in it to indicate where the node's
//   content should be inserted.
//
//   For text nodes, the default is to create a text DOM node. Though
//   it is possible to create a serializer where text is rendered
//   differently, this is not supported inside the editor, so you
//   shouldn't override that in your text node spec.
//
//   parseDOM:: ?[ParseRule]
//   Associates DOM parser information with this node, which can be
//   used by [`DOMParser.fromSchema`](#model.DOMParser^fromSchema) to
//   automatically derive a parser. The `node` field in the rules is
//   implied (the name of this node will be filled in automatically).
//   If you supply your own parser, you do not need to also specify
//   parsing rules in your schema.
//
//   toDebugString:: ?(node: Node) -> string
//   Defines the default way a node of this type should be serialized
//   to a string representation for debugging (e.g. in error messages).

// MarkSpec:: interface
//
//   attrs:: ?Object<AttributeSpec>
//   The attributes that marks of this type get.
//
//   inclusive:: ?bool
//   Whether this mark should be active when the cursor is positioned
//   at its end (or at its start when that is also the start of the
//   parent node). Defaults to true.
//
//   excludes:: ?string
//   Determines which other marks this mark can coexist with. Should
//   be a space-separated strings naming other marks or groups of marks.
//   When a mark is [added](#model.Mark.addToSet) to a set, all marks
//   that it excludes are removed in the process. If the set contains
//   any mark that excludes the new mark but is not, itself, excluded
//   by the new mark, the mark can not be added an the set. You can
//   use the value `"_"` to indicate that the mark excludes all
//   marks in the schema.
//
//   Defaults to only being exclusive with marks of the same type. You
//   can set it to an empty string (or any string not containing the
//   mark's own name) to allow multiple marks of a given type to
//   coexist (as long as they have different attributes).
//
//   group:: ?string
//   The group or space-separated groups to which this mark belongs.
//
//   toDOM:: ?(mark: Mark, inline: bool) → DOMOutputSpec
//   Defines the default way marks of this type should be serialized
//   to DOM/HTML. When the resulting spec contains a hole, that is
//   where the marked content is placed. Otherwise, it is appended to
//   the top node.
//
//   parseDOM:: ?[ParseRule]
//   Associates DOM parser information with this mark (see the
//   corresponding [node spec field](#model.NodeSpec.parseDOM)). The
//   `mark` field in the rules is implied.

// AttributeSpec:: interface
//
// Used to [define](#model.NodeSpec.attrs) attributes on nodes or
// marks.
//
//   default:: ?any
//   The default value for this attribute, to use when no explicit
//   value is provided. Attributes that have no default must be
//   provided whenever a node or mark of a type that has them is
//   created.

// ::- A document schema. Holds [node](#model.NodeType) and [mark
// type](#model.MarkType) objects for the nodes and marks that may
// occur in conforming documents, and provides functionality for
// creating and deserializing such documents.

var Schema = function () {
  // :: (SchemaSpec)
  // Construct a schema from a schema [specification](#model.SchemaSpec).
  function Schema(spec) {
    _classCallCheck(this, Schema);

    // :: SchemaSpec
    // The [spec](#model.SchemaSpec) on which the schema is based,
    // with the added guarantee that its `nodes` and `marks`
    // properties are
    // [`OrderedMap`](https://github.com/marijnh/orderedmap) instances
    // (not raw objects).
    this.spec = {};
    for (var prop in spec) {
      this.spec[prop] = spec[prop];
    }this.spec.nodes = orderedmap.from(spec.nodes);
    this.spec.marks = orderedmap.from(spec.marks);

    // :: Object<NodeType>
    // An object mapping the schema's node names to node type objects.
    this.nodes = NodeType.compile(this.spec.nodes, this);

    // :: Object<MarkType>
    // A map from mark names to mark type objects.
    this.marks = MarkType.compile(this.spec.marks, this);

    var contentExprCache = _Object$create(null);
    for (var _prop in this.nodes) {
      if (_prop in this.marks) throw new RangeError(_prop + " can not be both a node and a mark");
      var type = this.nodes[_prop],
          contentExpr = type.spec.content || "",
          markExpr = type.spec.marks;
      type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = ContentMatch.parse(contentExpr, this.nodes));
      type.inlineContent = type.contentMatch.inlineContent;
      type.markSet = markExpr == "_" ? null : markExpr ? gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
    }
    for (var _prop2 in this.marks) {
      var _type = this.marks[_prop2],
          excl = _type.spec.excludes;
      _type.excluded = excl == null ? [_type] : excl == "" ? [] : gatherMarks(this, excl.split(" "));
    }

    this.nodeFromJSON = this.nodeFromJSON.bind(this);
    this.markFromJSON = this.markFromJSON.bind(this);

    // :: NodeType
    // The type of the [default top node](#model.SchemaSpec.topNode)
    // for this schema.
    this.topNodeType = this.nodes[this.spec.topNode || "doc"];

    // :: Object
    // An object for storing whatever values modules may want to
    // compute and cache per schema. (If you want to store something
    // in it, try to use property names unlikely to clash.)
    this.cached = _Object$create(null);
    this.cached.wrappings = _Object$create(null);
  }

  // :: (union<string, NodeType>, ?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
  // Create a node in this schema. The `type` may be a string or a
  // `NodeType` instance. Attributes will be extended
  // with defaults, `content` may be a `Fragment`,
  // `null`, a `Node`, or an array of nodes.


  _createClass(Schema, [{
    key: "node",
    value: function node(type, attrs, content, marks) {
      if (typeof type == "string") type = this.nodeType(type);else if (!(type instanceof NodeType)) throw new RangeError("Invalid node type: " + type);else if (type.schema != this) throw new RangeError("Node type from different schema used (" + type.name + ")");

      return type.createChecked(attrs, content, marks);
    }

    // :: (string, ?[Mark]) → Node
    // Create a text node in the schema. Empty text nodes are not
    // allowed.

  }, {
    key: "text",
    value: function text(_text, marks) {
      var type = this.nodes.text;
      return new TextNode(type, type.defaultAttrs, _text, Mark.setFrom(marks));
    }

    // :: (union<string, MarkType>, ?Object) → Mark
    // Create a mark with the given type and attributes.

  }, {
    key: "mark",
    value: function mark(type, attrs) {
      if (typeof type == "string") type = this.marks[type];
      return type.create(attrs);
    }

    // :: (Object) → Node
    // Deserialize a node from its JSON representation. This method is
    // bound.

  }, {
    key: "nodeFromJSON",
    value: function nodeFromJSON(json) {
      return Node$1.fromJSON(this, json);
    }

    // :: (Object) → Mark
    // Deserialize a mark from its JSON representation. This method is
    // bound.

  }, {
    key: "markFromJSON",
    value: function markFromJSON(json) {
      return Mark.fromJSON(this, json);
    }
  }, {
    key: "nodeType",
    value: function nodeType(name) {
      var found = this.nodes[name];
      if (!found) throw new RangeError("Unknown node type: " + name);
      return found;
    }
  }]);

  return Schema;
}();

function gatherMarks(schema, marks) {
  var found = [];
  for (var i = 0; i < marks.length; i++) {
    var name = marks[i],
        mark = schema.marks[name],
        ok = mark;
    if (mark) {
      found.push(mark);
    } else {
      for (var prop in schema.marks) {
        var _mark = schema.marks[prop];
        if (name == "_" || _mark.spec.group && _mark.spec.group.split(" ").indexOf(name) > -1) found.push(ok = _mark);
      }
    }
    if (!ok) throw new SyntaxError("Unknown mark type: '" + marks[i] + "'");
  }
  return found;
}

var DOMParser = function () {
  // :: (Schema, [ParseRule])
  // Create a parser that targets the given schema, using the given
  // parsing rules.
  function DOMParser(schema, rules) {
    var _this = this;

    _classCallCheck(this, DOMParser);

    // :: Schema
    // The schema into which the parser parses.
    this.schema = schema;
    // :: [ParseRule]
    // The set of [parse rules](#model.ParseRule) that the parser
    // uses, in order of precedence.
    this.rules = rules;
    this.tags = [];
    this.styles = [];

    rules.forEach(function (rule) {
      if (rule.tag) _this.tags.push(rule);else if (rule.style) _this.styles.push(rule);
    });
  }

  // :: (dom.Node, ?ParseOptions) → Node
  // Parse a document from the content of a DOM node.


  _createClass(DOMParser, [{
    key: "parse",
    value: function parse(dom) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var context = new ParseContext(this, options, false);
      context.addAll(dom, null, options.from, options.to);
      return context.finish();
    }

    // :: (dom.Node, ?ParseOptions) → Slice
    // Parses the content of the given DOM node, like
    // [`parse`](#model.DOMParser.parse), and takes the same set of
    // options. But unlike that method, which produces a whole node,
    // this one returns a slice that is open at the sides, meaning that
    // the schema constraints aren't applied to the start of nodes to
    // the left of the input and the end of nodes at the end.

  }, {
    key: "parseSlice",
    value: function parseSlice(dom) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var context = new ParseContext(this, options, true);
      context.addAll(dom, null, options.from, options.to);
      return Slice.maxOpen(context.finish());
    }
  }, {
    key: "matchTag",
    value: function matchTag(dom, context) {
      for (var i = 0; i < this.tags.length; i++) {
        var rule = this.tags[i];
        if (matches(dom, rule.tag) && (rule.namespace === undefined || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
          if (rule.getAttrs) {
            var result = rule.getAttrs(dom);
            if (result === false) continue;
            rule.attrs = result;
          }
          return rule;
        }
      }
    }
  }, {
    key: "matchStyle",
    value: function matchStyle(prop, value, context) {
      for (var i = 0; i < this.styles.length; i++) {
        var rule = this.styles[i];
        if (rule.style.indexOf(prop) != 0 || rule.context && !context.matchesContext(rule.context) ||
        // Test that the style string either precisely matches the prop,
        // or has an '=' sign after the prop, followed by the given
        // value.
        rule.style.length > prop.length && (rule.style.charCodeAt(prop.length) != 61 || rule.style.slice(prop.length + 1) != value)) continue;
        if (rule.getAttrs) {
          var result = rule.getAttrs(value);
          if (result === false) continue;
          rule.attrs = result;
        }
        return rule;
      }
    }

    // : (Schema) → [ParseRule]

  }], [{
    key: "schemaRules",
    value: function schemaRules(schema) {
      var result = [];
      function insert(rule) {
        var priority = rule.priority == null ? 50 : rule.priority,
            i = 0;
        for (; i < result.length; i++) {
          var next = result[i],
              nextPriority = next.priority == null ? 50 : next.priority;
          if (nextPriority < priority) break;
        }
        result.splice(i, 0, rule);
      }

      var _loop = function _loop(name) {
        var rules = schema.marks[name].spec.parseDOM;
        if (rules) rules.forEach(function (rule) {
          insert(rule = copy(rule));
          rule.mark = name;
        });
      };

      for (var name in schema.marks) {
        _loop(name);
      }

      var _loop2 = function _loop2(name) {
        var rules = schema.nodes[name].spec.parseDOM;
        if (rules) rules.forEach(function (rule) {
          insert(rule = copy(rule));
          rule.node = name;
        });
      };

      for (var name in schema.nodes) {
        _loop2(name);
      }
      return result;
    }

    // :: (Schema) → DOMParser
    // Construct a DOM parser using the parsing rules listed in a
    // schema's [node specs](#model.NodeSpec.parseDOM), reordered by
    // [priority](#model.ParseRule.priority).

  }, {
    key: "fromSchema",
    value: function fromSchema(schema) {
      return schema.cached.domParser || (schema.cached.domParser = new DOMParser(schema, DOMParser.schemaRules(schema)));
    }
  }]);

  return DOMParser;
}();

// : Object<bool> The block-level tags in HTML5
var blockTags = {
  address: true, article: true, aside: true, blockquote: true, canvas: true,
  dd: true, div: true, dl: true, fieldset: true, figcaption: true, figure: true,
  footer: true, form: true, h1: true, h2: true, h3: true, h4: true, h5: true,
  h6: true, header: true, hgroup: true, hr: true, li: true, noscript: true, ol: true,
  output: true, p: true, pre: true, section: true, table: true, tfoot: true, ul: true

  // : Object<bool> The tags that we normally ignore.
};var ignoreTags = {
  head: true, noscript: true, object: true, script: true, style: true, title: true

  // : Object<bool> List tags.
};var listTags = { ol: true, ul: true

  // Using a bitfield for node context options
};var OPT_PRESERVE_WS = 1; var OPT_PRESERVE_WS_FULL = 2; var OPT_OPEN_LEFT = 4;

function wsOptionsFor(preserveWhitespace) {
  return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0);
}

var NodeContext = function () {
  function NodeContext(type, attrs, marks, solid, match, options) {
    _classCallCheck(this, NodeContext);

    this.type = type;
    this.attrs = attrs;
    this.solid = solid;
    this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
    this.options = options;
    this.content = [];
    this.marks = marks;
    this.activeMarks = Mark.none;
  }

  _createClass(NodeContext, [{
    key: "findWrapping",
    value: function findWrapping(node) {
      if (!this.match) {
        if (!this.type) return [];
        var fill = this.type.contentMatch.fillBefore(Fragment.from(node));
        if (fill) {
          this.match = this.type.contentMatch.matchFragment(fill);
        } else {
          var start = this.type.contentMatch,
              wrap = void 0;
          if (wrap = start.findWrapping(node.type)) {
            this.match = start;
            return wrap;
          } else {
            return null;
          }
        }
      }
      return this.match.findWrapping(node.type);
    }
  }, {
    key: "finish",
    value: function finish(openEnd) {
      if (!(this.options & OPT_PRESERVE_WS)) {
        // Strip trailing whitespace
        var last = this.content[this.content.length - 1],
            m = void 0;
        if (last && last.isText && (m = /\s+$/.exec(last.text))) {
          if (last.text.length == m[0].length) this.content.pop();else this.content[this.content.length - 1] = last.withText(last.text.slice(0, last.text.length - m[0].length));
        }
      }
      var content = Fragment.from(this.content);
      if (!openEnd && this.match) content = content.append(this.match.fillBefore(Fragment.empty, true));
      return this.type ? this.type.create(this.attrs, content, this.marks) : content;
    }
  }]);

  return NodeContext;
}();

var ParseContext = function () {
  // : (DOMParser, Object)
  function ParseContext(parser, options, open) {
    _classCallCheck(this, ParseContext);

    // : DOMParser The parser we are using.
    this.parser = parser;
    // : Object The options passed to this parse.
    this.options = options;
    this.isOpen = open;
    this.pendingMarks = [];
    var topNode = options.topNode,
        topContext = void 0;
    var topOptions = wsOptionsFor(options.preserveWhitespace) | (open ? OPT_OPEN_LEFT : 0);
    if (topNode) topContext = new NodeContext(topNode.type, topNode.attrs, Mark.none, true, options.topMatch || topNode.type.contentMatch, topOptions);else if (open) topContext = new NodeContext(null, null, Mark.none, true, null, topOptions);else topContext = new NodeContext(parser.schema.topNodeType, null, Mark.none, true, null, topOptions);
    this.nodes = [topContext];
    // : [Mark] The current set of marks
    this.open = 0;
    this.find = options.findPositions;
    this.needsBlock = false;
  }

  _createClass(ParseContext, [{
    key: "addDOM",


    // : (dom.Node)
    // Add a DOM node to the content. Text is inserted as text node,
    // otherwise, the node is passed to `addElement` or, if it has a
    // `style` attribute, `addElementWithStyles`.
    value: function addDOM(dom) {
      if (dom.nodeType == 3) {
        this.addTextNode(dom);
      } else if (dom.nodeType == 1) {
        var style = dom.getAttribute("style");
        var marks = style ? this.readStyles(parseStyles(style)) : null;
        if (marks != null) for (var i = 0; i < marks.length; i++) {
          this.addPendingMark(marks[i]);
        }this.addElement(dom);
        if (marks != null) for (var _i = 0; _i < marks.length; _i++) {
          this.removePendingMark(marks[_i]);
        }
      }
    }
  }, {
    key: "addTextNode",
    value: function addTextNode(dom) {
      var value = dom.nodeValue;
      var top = this.top;
      if ((top.type ? top.type.inlineContent : top.content.length && top.content[0].isInline) || /\S/.test(value)) {
        if (!(top.options & OPT_PRESERVE_WS)) {
          value = value.replace(/\s+/g, " ");
          // If this starts with whitespace, and there is no node before it, or
          // a hard break, or a text node that ends with whitespace, strip the
          // leading space.
          if (/^\s/.test(value) && this.open == this.nodes.length - 1) {
            var nodeBefore = top.content[top.content.length - 1];
            var domNodeBefore = dom.previousSibling;
            if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == 'BR' || nodeBefore.isText && /\s$/.test(nodeBefore.text)) value = value.slice(1);
          }
        } else if (!(top.options & OPT_PRESERVE_WS_FULL)) {
          value = value.replace(/\r?\n|\r/g, " ");
        }
        if (value) this.insertNode(this.parser.schema.text(value));
        this.findInText(dom);
      } else {
        this.findInside(dom);
      }
    }

    // : (dom.Element)
    // Try to find a handler for the given tag and use that to parse. If
    // none is found, the element's content nodes are added directly.

  }, {
    key: "addElement",
    value: function addElement(dom) {
      var name = dom.nodeName.toLowerCase();
      if (listTags.hasOwnProperty(name)) normalizeList(dom);
      var rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || this.parser.matchTag(dom, this);
      if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
        this.findInside(dom);
      } else if (!rule || rule.skip) {
        if (rule && rule.skip.nodeType) dom = rule.skip;
        var sync = void 0,
            top = this.top,
            oldNeedsBlock = this.needsBlock;
        if (blockTags.hasOwnProperty(name)) {
          sync = true;
          if (!top.type) this.needsBlock = true;
        }
        this.addAll(dom);
        if (sync) this.sync(top);
        this.needsBlock = oldNeedsBlock;
      } else {
        this.addElementByRule(dom, rule);
      }
    }

    // Run any style parser associated with the node's styles. Either
    // return an array of marks, or null to indicate some of the styles
    // had a rule with `ignore` set.

  }, {
    key: "readStyles",
    value: function readStyles(styles) {
      var marks = Mark.none;
      for (var i = 0; i < styles.length; i += 2) {
        var rule = this.parser.matchStyle(styles[i], styles[i + 1], this);
        if (!rule) continue;
        if (rule.ignore) return null;
        marks = this.parser.schema.marks[rule.mark].create(rule.attrs).addToSet(marks);
      }
      return marks;
    }

    // : (dom.Element, ParseRule) → bool
    // Look up a handler for the given node. If none are found, return
    // false. Otherwise, apply it, use its return value to drive the way
    // the node's content is wrapped, and return true.

  }, {
    key: "addElementByRule",
    value: function addElementByRule(dom, rule) {
      var _this2 = this;

      var sync = void 0,
          nodeType = void 0,
          markType = void 0,
          mark = void 0;
      if (rule.node) {
        nodeType = this.parser.schema.nodes[rule.node];
        if (nodeType.isLeaf) this.insertNode(nodeType.create(rule.attrs));else sync = this.enter(nodeType, rule.attrs, rule.preserveWhitespace);
      } else {
        markType = this.parser.schema.marks[rule.mark];
        mark = markType.create(rule.attrs);
        this.addPendingMark(mark);
      }
      var startIn = this.top;

      if (nodeType && nodeType.isLeaf) {
        this.findInside(dom);
      } else if (rule.getContent) {
        this.findInside(dom);
        rule.getContent(dom, this.parser.schema).forEach(function (node) {
          return _this2.insertNode(node);
        });
      } else {
        var contentDOM = rule.contentElement;
        if (typeof contentDOM == "string") contentDOM = dom.querySelector(contentDOM);else if (typeof contentDOM == "function") contentDOM = contentDOM(dom);
        if (!contentDOM) contentDOM = dom;
        this.findAround(dom, contentDOM, true);
        this.addAll(contentDOM, sync);
      }
      if (sync) {
        this.sync(startIn);this.open--;
      }
      if (mark) this.removePendingMark(mark);
      return true;
    }

    // : (dom.Node, ?NodeBuilder, ?number, ?number)
    // Add all child nodes between `startIndex` and `endIndex` (or the
    // whole node, if not given). If `sync` is passed, use it to
    // synchronize after every block element.

  }, {
    key: "addAll",
    value: function addAll(parent, sync, startIndex, endIndex) {
      var index = startIndex || 0;
      for (var dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end = endIndex == null ? null : parent.childNodes[endIndex]; dom != end; dom = dom.nextSibling, ++index) {
        this.findAtPoint(parent, index);
        this.addDOM(dom);
        if (sync && blockTags.hasOwnProperty(dom.nodeName.toLowerCase())) this.sync(sync);
      }
      this.findAtPoint(parent, index);
    }

    // Try to find a way to fit the given node type into the current
    // context. May add intermediate wrappers and/or leave non-solid
    // nodes that we're in.

  }, {
    key: "findPlace",
    value: function findPlace(node) {
      var route = void 0,
          sync = void 0;
      for (var depth = this.open; depth >= 0; depth--) {
        var cx = this.nodes[depth];
        var found = cx.findWrapping(node);
        if (found && (!route || route.length > found.length)) {
          route = found;
          sync = cx;
          if (!found.length) break;
        }
        if (cx.solid) break;
      }
      if (!route) return false;
      this.sync(sync);
      for (var i = 0; i < route.length; i++) {
        this.enterInner(route[i], null, false);
      }return true;
    }

    // : (Node) → ?Node
    // Try to insert the given node, adjusting the context when needed.

  }, {
    key: "insertNode",
    value: function insertNode(node) {
      if (node.isInline && this.needsBlock && !this.top.type) {
        var block = this.textblockFromContext();
        if (block) this.enterInner(block);
      }
      if (this.findPlace(node)) {
        this.closeExtra();
        var top = this.top;
        this.applyPendingMarks(top);
        if (top.match) top.match = top.match.matchType(node.type);
        var marks = top.activeMarks;
        for (var i = 0; i < node.marks.length; i++) {
          if (!top.type || top.type.allowsMarkType(node.marks[i].type)) marks = node.marks[i].addToSet(marks);
        }top.content.push(node.mark(marks));
      }
    }
  }, {
    key: "applyPendingMarks",
    value: function applyPendingMarks(top) {
      for (var i = 0; i < this.pendingMarks.length; i++) {
        var mark = this.pendingMarks[i];
        if ((!top.type || top.type.allowsMarkType(mark.type)) && !mark.type.isInSet(top.activeMarks)) {
          top.activeMarks = mark.addToSet(top.activeMarks);
          this.pendingMarks.splice(i--, 1);
        }
      }
    }

    // : (NodeType, ?Object) → bool
    // Try to start a node of the given type, adjusting the context when
    // necessary.

  }, {
    key: "enter",
    value: function enter(type, attrs, preserveWS) {
      var ok = this.findPlace(type.create(attrs));
      if (ok) {
        this.applyPendingMarks(this.top);
        this.enterInner(type, attrs, true, preserveWS);
      }
      return ok;
    }

    // Open a node of the given type

  }, {
    key: "enterInner",
    value: function enterInner(type, attrs, solid, preserveWS) {
      this.closeExtra();
      var top = this.top;
      top.match = top.match && top.match.matchType(type, attrs);
      var options = preserveWS == null ? top.options & ~OPT_OPEN_LEFT : wsOptionsFor(preserveWS);
      if (top.options & OPT_OPEN_LEFT && top.content.length == 0) options |= OPT_OPEN_LEFT;
      this.nodes.push(new NodeContext(type, attrs, top.activeMarks, solid, null, options));
      this.open++;
    }

    // Make sure all nodes above this.open are finished and added to
    // their parents

  }, {
    key: "closeExtra",
    value: function closeExtra(openEnd) {
      var i = this.nodes.length - 1;
      if (i > this.open) {
        for (; i > this.open; i--) {
          this.nodes[i - 1].content.push(this.nodes[i].finish(openEnd));
        }this.nodes.length = this.open + 1;
      }
    }
  }, {
    key: "finish",
    value: function finish() {
      this.open = 0;
      this.closeExtra(this.isOpen);
      return this.nodes[0].finish(this.isOpen || this.options.topOpen);
    }
  }, {
    key: "sync",
    value: function sync(to) {
      for (var i = this.open; i >= 0; i--) {
        if (this.nodes[i] == to) {
          this.open = i;
          return;
        }
      }
    }
  }, {
    key: "addPendingMark",
    value: function addPendingMark(mark) {
      this.pendingMarks.push(mark);
    }
  }, {
    key: "removePendingMark",
    value: function removePendingMark(mark) {
      var found = this.pendingMarks.lastIndexOf(mark);
      if (found > -1) {
        this.pendingMarks.splice(found, 1);
      } else {
        var top = this.top;
        top.activeMarks = mark.removeFromSet(top.activeMarks);
      }
    }
  }, {
    key: "findAtPoint",
    value: function findAtPoint(parent, offset) {
      if (this.find) for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].node == parent && this.find[i].offset == offset) this.find[i].pos = this.currentPos;
      }
    }
  }, {
    key: "findInside",
    value: function findInside(parent) {
      if (this.find) for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) this.find[i].pos = this.currentPos;
      }
    }
  }, {
    key: "findAround",
    value: function findAround(parent, content, before) {
      if (parent != content && this.find) for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
          var pos = content.compareDocumentPosition(this.find[i].node);
          if (pos & (before ? 2 : 4)) this.find[i].pos = this.currentPos;
        }
      }
    }
  }, {
    key: "findInText",
    value: function findInText(textNode) {
      if (this.find) for (var i = 0; i < this.find.length; i++) {
        if (this.find[i].node == textNode) this.find[i].pos = this.currentPos - (textNode.nodeValue.length - this.find[i].offset);
      }
    }

    // : (string) → bool
    // Determines whether the given [context
    // string](#ParseRule.context) matches this context.

  }, {
    key: "matchesContext",
    value: function matchesContext(context) {
      var _this3 = this;

      if (context.indexOf("|") > -1) return context.split(/\s*\|\s*/).some(this.matchesContext, this);

      var parts = context.split("/");
      var option = this.options.context;
      var useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
      var minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
      var match = function match(i, depth) {
        for (; i >= 0; i--) {
          var part = parts[i];
          if (part == "") {
            if (i == parts.length - 1 || i == 0) continue;
            for (; depth >= minDepth; depth--) {
              if (match(i - 1, depth)) return true;
            }return false;
          } else {
            var next = depth > 0 || depth == 0 && useRoot ? _this3.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
            if (!next || next.name != part && next.groups.indexOf(part) == -1) return false;
            depth--;
          }
        }
        return true;
      };
      return match(parts.length - 1, this.open);
    }
  }, {
    key: "textblockFromContext",
    value: function textblockFromContext() {
      var $context = this.options.context;
      if ($context) for (var d = $context.depth; d >= 0; d--) {
        var deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
        if (deflt && deflt.isTextblock && deflt.defaultAttrs) return deflt;
      }
      for (var name in this.parser.schema.nodes) {
        var type = this.parser.schema.nodes[name];
        if (type.isTextblock && type.defaultAttrs) return type;
      }
    }
  }, {
    key: "top",
    get: function get() {
      return this.nodes[this.open];
    }
  }, {
    key: "currentPos",
    get: function get() {
      this.closeExtra();
      var pos = 0;
      for (var i = this.open; i >= 0; i--) {
        var content = this.nodes[i].content;
        for (var j = content.length - 1; j >= 0; j--) {
          pos += content[j].nodeSize;
        }if (i) pos++;
      }
      return pos;
    }
  }]);

  return ParseContext;
}();

// Kludge to work around directly nested list nodes produced by some
// tools and allowed by browsers to mean that the nested list is
// actually part of the list item above it.


function normalizeList(dom) {
  for (var child = dom.firstChild, prevItem = null; child; child = child.nextSibling) {
    var name = child.nodeType == 1 ? child.nodeName.toLowerCase() : null;
    if (name && listTags.hasOwnProperty(name) && prevItem) {
      prevItem.appendChild(child);
      child = prevItem;
    } else if (name == "li") {
      prevItem = child;
    } else if (name) {
      prevItem = null;
    }
  }
}

// Apply a CSS selector.
function matches(dom, selector) {
  return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
}

// : (string) → [string]
// Tokenize a style attribute into property/value pairs.
function parseStyles(style) {
  var re = /\s*([\w-]+)\s*:\s*([^;]+)/g,
      m = void 0,
      result = [];
  while (m = re.exec(style)) {
    result.push(m[1], m[2].trim());
  }return result;
}

function copy(obj) {
  var copy = {};
  for (var prop in obj) {
    copy[prop] = obj[prop];
  }return copy;
}

var DOMSerializer = function () {
  // :: (Object<(node: Node) → DOMOutputSpec>, Object<?(mark: Mark, inline: bool) → DOMOutputSpec>)
  // Create a serializer. `nodes` should map node names to functions
  // that take a node and return a description of the corresponding
  // DOM. `marks` does the same for mark names, but also gets an
  // argument that tells it whether the mark's content is block or
  // inline content (for typical use, it'll always be inline). A mark
  // serializer may be `null` to indicate that marks of that type
  // should not be serialized.
  function DOMSerializer(nodes, marks) {
    _classCallCheck(this, DOMSerializer);

    // :: Object<(node: Node) → DOMOutputSpec>
    // The node serialization functions.
    this.nodes = nodes || {};
    // :: Object<?(mark: Mark, inline: bool) → DOMOutputSpec>
    // The mark serialization functions.
    this.marks = marks || {};
  }

  // :: (Fragment, ?Object) → dom.DocumentFragment
  // Serialize the content of this fragment to a DOM fragment. When
  // not in the browser, the `document` option, containing a DOM
  // document, should be passed so that the serializer can create
  // nodes.


  _createClass(DOMSerializer, [{
    key: "serializeFragment",
    value: function serializeFragment(fragment) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var target = arguments[2];

      if (!target) target = doc(options).createDocumentFragment();

      var top = target,
          active = null;
      fragment.forEach(function (node) {
        if (active || node.marks.length) {
          if (!active) active = [];
          var keep = 0,
              rendered = 0;
          while (keep < active.length && rendered < node.marks.length) {
            var next = node.marks[rendered];
            if (!_this.marks[next.type.name]) {
              rendered++;continue;
            }
            if (!next.eq(active[keep])) break;
            keep += 2;rendered++;
          }
          while (keep < active.length) {
            top = active.pop();
            active.pop();
          }
          while (rendered < node.marks.length) {
            var add = node.marks[rendered++];
            var markDOM = _this.serializeMark(add, node.isInline, options);
            if (markDOM) {
              active.push(add, top);
              top.appendChild(markDOM.dom);
              top = markDOM.contentDOM || markDOM.dom;
            }
          }
        }
        top.appendChild(_this.serializeNode(node, options));
      });

      return target;
    }

    // :: (Node, ?Object) → dom.Node
    // Serialize this node to a DOM node. This can be useful when you
    // need to serialize a part of a document, as opposed to the whole
    // document. To serialize a whole document, use
    // [`serializeFragment`](#model.DOMSerializer.serializeFragment) on
    // its [content](#model.Node.content).

  }, {
    key: "serializeNode",
    value: function serializeNode(node) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _DOMSerializer$render = DOMSerializer.renderSpec(doc(options), this.nodes[node.type.name](node)),
          dom = _DOMSerializer$render.dom,
          contentDOM = _DOMSerializer$render.contentDOM;

      if (contentDOM) {
        if (node.isLeaf) throw new RangeError("Content hole not allowed in a leaf node spec");
        if (options.onContent) options.onContent(node, contentDOM, options);else this.serializeFragment(node.content, options, contentDOM);
      }
      return dom;
    }
  }, {
    key: "serializeNodeAndMarks",
    value: function serializeNodeAndMarks(node) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var dom = this.serializeNode(node, options);
      for (var i = node.marks.length - 1; i >= 0; i--) {
        var wrap = this.serializeMark(node.marks[i], node.isInline, options);
        if (wrap) {
          (wrap.contentDOM || wrap.dom).appendChild(dom);
          dom = wrap.dom;
        }
      }
      return dom;
    }
  }, {
    key: "serializeMark",
    value: function serializeMark(mark, inline) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var toDOM = this.marks[mark.type.name];
      return toDOM && DOMSerializer.renderSpec(doc(options), toDOM(mark, inline));
    }

    // :: (dom.Document, DOMOutputSpec) → {dom: dom.Node, contentDOM: ?dom.Node}
    // Render an [output spec](#model.DOMOutputSpec) to a DOM node. If
    // the spec has a hole (zero) in it, `contentDOM` will point at the
    // node with the hole.

  }], [{
    key: "renderSpec",
    value: function renderSpec(doc, structure) {
      if (typeof structure == "string") return { dom: doc.createTextNode(structure) };
      if (structure.nodeType != null) return { dom: structure };
      var dom = doc.createElement(structure[0]),
          contentDOM = null;
      var attrs = structure[1],
          start = 1;
      if (attrs && (typeof attrs === "undefined" ? "undefined" : _typeof(attrs)) == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
        start = 2;
        for (var name in attrs) {
          if (name == "style") dom.style.cssText = attrs[name];else if (attrs[name] != null) dom.setAttribute(name, attrs[name]);
        }
      }
      for (var i = start; i < structure.length; i++) {
        var child = structure[i];
        if (child === 0) {
          if (i < structure.length - 1 || i > start) throw new RangeError("Content hole must be the only child of its parent node");
          return { dom: dom, contentDOM: dom };
        } else {
          var _DOMSerializer$render2 = DOMSerializer.renderSpec(doc, child),
              inner = _DOMSerializer$render2.dom,
              innerContent = _DOMSerializer$render2.contentDOM;

          dom.appendChild(inner);
          if (innerContent) {
            if (contentDOM) throw new RangeError("Multiple content holes");
            contentDOM = innerContent;
          }
        }
      }
      return { dom: dom, contentDOM: contentDOM };
    }

    // :: (Schema) → DOMSerializer
    // Build a serializer using the [`toDOM`](#model.NodeSpec.toDOM)
    // properties in a schema's node and mark specs.

  }, {
    key: "fromSchema",
    value: function fromSchema(schema) {
      return schema.cached.domSerializer || (schema.cached.domSerializer = new DOMSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
    }

    // : (Schema) → Object<(node: Node) → DOMOutputSpec>
    // Gather the serializers in a schema's node specs into an object.
    // This can be useful as a base to build a custom serializer from.

  }, {
    key: "nodesFromSchema",
    value: function nodesFromSchema(schema) {
      var result = gatherToDOM(schema.nodes);
      if (!result.text) result.text = function (node) {
        return node.text;
      };
      return result;
    }

    // : (Schema) → Object<(mark: Mark) → DOMOutputSpec>
    // Gather the serializers in a schema's mark specs into an object.

  }, {
    key: "marksFromSchema",
    value: function marksFromSchema(schema) {
      return gatherToDOM(schema.marks);
    }
  }]);

  return DOMSerializer;
}();

function gatherToDOM(obj) {
  var result = {};
  for (var name in obj) {
    var toDOM = obj[name].spec.toDOM;
    if (toDOM) result[name] = toDOM;
  }
  return result;
}

function doc(options) {
  // declare global: window
  return options.document || window.document;
}

var lower16 = 0xffff;
var factor16 = Math.pow(2, 16);

function makeRecover(index, offset) {
  return index + offset * factor16;
}
function recoverIndex(value) {
  return value & lower16;
}
function recoverOffset(value) {
  return (value - (value & lower16)) / factor16;
}

// ::- An object representing a mapped position with extra
// information.
var MapResult = function MapResult(pos) {
  var deleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var recover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, MapResult);

  // :: number The mapped version of the position.
  this.pos = pos;
  // :: bool Tells you whether the position was deleted, that is,
  // whether the step removed its surroundings from the document.
  this.deleted = deleted;
  this.recover = recover;
};

// :: class extends Mappable
// A map describing the deletions and insertions made by a step, which
// can be used to find the correspondence between positions in the
// pre-step version of a document and the same position in the
// post-step version.
var StepMap = function () {
  // :: ([number])
  // Create a position map. The modifications to the document are
  // represented as an array of numbers, in which each group of three
  // represents a modified chunk as `[start, oldSize, newSize]`.
  function StepMap(ranges) {
    var inverted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, StepMap);

    this.ranges = ranges;
    this.inverted = inverted;
  }

  _createClass(StepMap, [{
    key: "recover",
    value: function recover(value) {
      var diff = 0,
          index = recoverIndex(value);
      if (!this.inverted) for (var i = 0; i < index; i++) {
        diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
      }return this.ranges[index * 3] + diff + recoverOffset(value);
    }

    // : (number, ?number) → MapResult

  }, {
    key: "mapResult",
    value: function mapResult(pos) {
      var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return this._map(pos, assoc, false);
    }

    // : (number, ?number) → number

  }, {
    key: "map",
    value: function map(pos) {
      var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return this._map(pos, assoc, true);
    }
  }, {
    key: "_map",
    value: function _map(pos, assoc, simple) {
      var diff = 0,
          oldIndex = this.inverted ? 2 : 1,
          newIndex = this.inverted ? 1 : 2;
      for (var i = 0; i < this.ranges.length; i += 3) {
        var start = this.ranges[i] - (this.inverted ? diff : 0);
        if (start > pos) break;
        var oldSize = this.ranges[i + oldIndex],
            newSize = this.ranges[i + newIndex],
            end = start + oldSize;
        if (pos <= end) {
          var side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
          var result = start + diff + (side < 0 ? 0 : newSize);
          if (simple) return result;
          var recover = makeRecover(i / 3, pos - start);
          return new MapResult(result, assoc < 0 ? pos != start : pos != end, recover);
        }
        diff += newSize - oldSize;
      }
      return simple ? pos + diff : new MapResult(pos + diff);
    }
  }, {
    key: "touches",
    value: function touches(pos, recover) {
      var diff = 0,
          index = recoverIndex(recover);
      var oldIndex = this.inverted ? 2 : 1,
          newIndex = this.inverted ? 1 : 2;
      for (var i = 0; i < this.ranges.length; i += 3) {
        var start = this.ranges[i] - (this.inverted ? diff : 0);
        if (start > pos) break;
        var oldSize = this.ranges[i + oldIndex],
            end = start + oldSize;
        if (pos <= end && i == index * 3) return true;
        diff += this.ranges[i + newIndex] - oldSize;
      }
      return false;
    }

    // :: ((oldStart: number, oldEnd: number, newStart: number, newEnd: number))
    // Calls the given function on each of the changed ranges included in
    // this map.

  }, {
    key: "forEach",
    value: function forEach(f) {
      var oldIndex = this.inverted ? 2 : 1,
          newIndex = this.inverted ? 1 : 2;
      for (var i = 0, diff = 0; i < this.ranges.length; i += 3) {
        var start = this.ranges[i],
            oldStart = start - (this.inverted ? diff : 0),
            newStart = start + (this.inverted ? 0 : diff);
        var oldSize = this.ranges[i + oldIndex],
            newSize = this.ranges[i + newIndex];
        f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
        diff += newSize - oldSize;
      }
    }

    // :: () → StepMap
    // Create an inverted version of this map. The result can be used to
    // map positions in the post-step document to the pre-step document.

  }, {
    key: "invert",
    value: function invert() {
      return new StepMap(this.ranges, !this.inverted);
    }
  }, {
    key: "toString",
    value: function toString() {
      return (this.inverted ? "-" : "") + _JSON$stringify(this.ranges);
    }

    // :: (n: number) → StepMap
    // Create a map that moves all positions by offset `n` (which may be
    // negative). This can be useful when applying steps meant for a
    // sub-document to a larger document, or vice-versa.

  }], [{
    key: "offset",
    value: function offset(n) {
      return n == 0 ? StepMap.empty : new StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
    }
  }]);

  return StepMap;
}();

StepMap.empty = new StepMap([]);

// :: class extends Mappable
// A mapping represents a pipeline of zero or more [step
// maps](#transform.StepMap). It has special provisions for losslessly
// handling mapping positions through a series of steps in which some
// steps are inverted versions of earlier steps. (This comes up when
// ‘[rebasing](/docs/guide/#transform.rebasing)’ steps for
// collaboration or history management.)
var Mapping = function () {
  // :: (?[StepMap])
  // Create a new mapping with the given position maps.
  function Mapping(maps, mirror, from, to) {
    _classCallCheck(this, Mapping);

    // :: [StepMap]
    // The step maps in this mapping.
    this.maps = maps || [];
    // :: number
    // The starting position in the `maps` array, used when `map` or
    // `mapResult` is called.
    this.from = from || 0;
    // :: number
    // The end position in the `maps` array.
    this.to = to == null ? this.maps.length : to;
    this.mirror = mirror;
  }

  // :: (?number, ?number) → Mapping
  // Create a mapping that maps only through a part of this one.


  _createClass(Mapping, [{
    key: "slice",
    value: function slice() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.maps.length;

      return new Mapping(this.maps, this.mirror, from, to);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
    }

    // :: (StepMap, ?number)
    // Add a step map to the end of this mapping. If `mirrors` is
    // given, it should be the index of the step map that is the mirror
    // image of this one.

  }, {
    key: "appendMap",
    value: function appendMap(map, mirrors) {
      this.to = this.maps.push(map);
      if (mirrors != null) this.setMirror(this.maps.length - 1, mirrors);
    }

    // :: (Mapping)
    // Add all the step maps in a given mapping to this one (preserving
    // mirroring information).

  }, {
    key: "appendMapping",
    value: function appendMapping(mapping) {
      for (var i = 0, startSize = this.maps.length; i < mapping.maps.length; i++) {
        var mirr = mapping.getMirror(i);
        this.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : null);
      }
    }

    // :: (number) → ?number
    // Finds the offset of the step map that mirrors the map at the
    // given offset, in this mapping (as per the second argument to
    // `appendMap`).

  }, {
    key: "getMirror",
    value: function getMirror(n) {
      if (this.mirror) for (var i = 0; i < this.mirror.length; i++) {
        if (this.mirror[i] == n) return this.mirror[i + (i % 2 ? -1 : 1)];
      }
    }
  }, {
    key: "setMirror",
    value: function setMirror(n, m) {
      if (!this.mirror) this.mirror = [];
      this.mirror.push(n, m);
    }

    // :: (Mapping)
    // Append the inverse of the given mapping to this one.

  }, {
    key: "appendMappingInverted",
    value: function appendMappingInverted(mapping) {
      for (var i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--) {
        var mirr = mapping.getMirror(i);
        this.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : null);
      }
    }

    // () → Mapping
    // Create an inverted version of this mapping.

  }, {
    key: "invert",
    value: function invert() {
      var inverse = new Mapping();
      inverse.appendMappingInverted(this);
      return inverse;
    }

    // : (number, ?number) → number
    // Map a position through this mapping.

  }, {
    key: "map",
    value: function map(pos) {
      var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (this.mirror) return this._map(pos, assoc, true);
      for (var i = this.from; i < this.to; i++) {
        pos = this.maps[i].map(pos, assoc);
      }return pos;
    }

    // : (number, ?number) → MapResult
    // Map a position through this mapping, returning a mapping
    // result.

  }, {
    key: "mapResult",
    value: function mapResult(pos) {
      var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return this._map(pos, assoc, false);
    }
  }, {
    key: "_map",
    value: function _map(pos, assoc, simple) {
      var deleted = false,
          recoverables = null;

      for (var i = this.from; i < this.to; i++) {
        var map = this.maps[i],
            rec = recoverables && recoverables[i];
        if (rec != null && map.touches(pos, rec)) {
          pos = map.recover(rec);
          continue;
        }

        var result = map.mapResult(pos, assoc);
        if (result.recover != null) {
          var corr = this.getMirror(i);
          if (corr != null && corr > i && corr < this.to) {
            if (result.deleted) {
              i = corr;
              pos = this.maps[corr].recover(result.recover);
              continue;
            } else {
              (recoverables || (recoverables = _Object$create(null)))[corr] = result.recover;
            }
          }
        }

        if (result.deleted) deleted = true;
        pos = result.pos;
      }

      return simple ? pos : new MapResult(pos, deleted);
    }
  }]);

  return Mapping;
}();

function TransformError(message) {
  var err = Error.call(this, message);
  err.__proto__ = TransformError.prototype;
  return err;
}

TransformError.prototype = _Object$create(Error.prototype);
TransformError.prototype.constructor = TransformError;
TransformError.prototype.name = "TransformError";

// ::- Abstraction to build up and track an array of
// [steps](#transform.Step) representing a document transformation.
//
// Most transforming methods return the `Transform` object itself, so
// that they can be chained.
var Transform = function () {
  // :: (Node)
  // Create a transform that starts with the given document.
  function Transform(doc) {
    _classCallCheck(this, Transform);

    // :: Node
    // The current document (the result of applying the steps in the
    // transform).
    this.doc = doc;
    // :: [Step]
    // The steps in this transform.
    this.steps = [];
    // :: [Node]
    // The documents before each of the steps.
    this.docs = [];
    // :: Mapping
    // A mapping with the maps for each of the steps in this transform.
    this.mapping = new Mapping();
  }

  // :: Node The starting document.


  _createClass(Transform, [{
    key: "step",


    // :: (step: Step) → this
    // Apply a new step in this transform, saving the result. Throws an
    // error when the step fails.
    value: function step(object) {
      var result = this.maybeStep(object);
      if (result.failed) throw new TransformError(result.failed);
      return this;
    }

    // :: (Step) → StepResult
    // Try to apply a step in this transformation, ignoring it if it
    // fails. Returns the step result.

  }, {
    key: "maybeStep",
    value: function maybeStep(step) {
      var result = step.apply(this.doc);
      if (!result.failed) this.addStep(step, result.doc);
      return result;
    }

    // :: bool
    // True when the document has been changed (when there are any
    // steps).

  }, {
    key: "addStep",
    value: function addStep(step, doc) {
      this.docs.push(this.doc);
      this.steps.push(step);
      this.mapping.appendMap(step.getMap());
      this.doc = doc;
    }
  }, {
    key: "before",
    get: function get() {
      return this.docs.length ? this.docs[0] : this.doc;
    }
  }, {
    key: "docChanged",
    get: function get() {
      return this.steps.length > 0;
    }
  }]);

  return Transform;
}();

function mustOverride() {
  throw new Error("Override me");
}

var stepsByID = _Object$create(null);

// ::- A step object represents an atomic change. It generally applies
// only to the document it was created for, since the positions
// stored in it will only make sense for that document.
//
// New steps are defined by creating classes that extend `Step`,
// overriding the `apply`, `invert`, `map`, `getMap` and `fromJSON`
// methods, and registering your class with a unique
// JSON-serialization identifier using
// [`Step.jsonID`](#transform.Step^jsonID).
var Step = function () {
  function Step() {
    _classCallCheck(this, Step);
  }

  _createClass(Step, [{
    key: "apply",

    // :: (doc: Node) → StepResult
    // Applies this step to the given document, returning a result
    // object that either indicates failure, if the step can not be
    // applied to this document, or indicates success by containing a
    // transformed document.
    value: function apply(_doc) {
      return mustOverride();
    }

    // :: () → StepMap
    // Get the step map that represents the changes made by this step,
    // and which can be used to transform between positions in the old
    // and the new document.

  }, {
    key: "getMap",
    value: function getMap() {
      return StepMap.empty;
    }

    // :: (doc: Node) → Step
    // Create an inverted version of this step. Needs the document as it
    // was before the step as argument.

  }, {
    key: "invert",
    value: function invert(_doc) {
      return mustOverride();
    }

    // :: (mapping: Mappable) → ?Step
    // Map this step through a mappable thing, returning either a
    // version of that step with its positions adjusted, or `null` if
    // the step was entirely deleted by the mapping.

  }, {
    key: "map",
    value: function map(_mapping) {
      return mustOverride();
    }

    // :: (other: Step) → ?Step
    // Try to merge this step with another one, to be applied directly
    // after it. Returns the merged step when possible, null if the
    // steps can't be merged.

  }, {
    key: "merge",
    value: function merge(_other) {
      return null;
    }

    // :: () → Object
    // Create a JSON-serializeable representation of this step. When
    // defining this for a custom subclass, make sure the result object
    // includes the step type's [JSON id](#transform.Step^jsonID) under
    // the `stepType` property.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return mustOverride();
    }

    // :: (Schema, Object) → Step
    // Deserialize a step from its JSON representation. Will call
    // through to the step class' own implementation of this method.

  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (!json || !json.stepType) throw new RangeError("Invalid input for Step.fromJSON");
      var type = stepsByID[json.stepType];
      if (!type) throw new RangeError("No step type " + json.stepType + " defined");
      return type.fromJSON(schema, json);
    }

    // :: (string, constructor<Step>)
    // To be able to serialize steps to JSON, each step needs a string
    // ID to attach to its JSON representation. Use this method to
    // register an ID for your step classes. Try to pick something
    // that's unlikely to clash with steps from other modules.

  }, {
    key: "jsonID",
    value: function jsonID(id, stepClass) {
      if (id in stepsByID) throw new RangeError("Duplicate use of step JSON ID " + id);
      stepsByID[id] = stepClass;
      stepClass.prototype.jsonID = id;
      return stepClass;
    }
  }]);

  return Step;
}();

// ::- The result of [applying](#transform.Step.apply) a step. Contains either a
// new document or a failure value.
var StepResult = function () {
  // : (?Node, ?string)
  function StepResult(doc, failed) {
    _classCallCheck(this, StepResult);

    // :: ?Node The transformed document.
    this.doc = doc;
    // :: ?string Text providing information about a failed step.
    this.failed = failed;
  }

  // :: (Node) → StepResult
  // Create a successful step result.


  _createClass(StepResult, null, [{
    key: "ok",
    value: function ok(doc) {
      return new StepResult(doc, null);
    }

    // :: (string) → StepResult
    // Create a failed step result.

  }, {
    key: "fail",
    value: function fail(message) {
      return new StepResult(null, message);
    }

    // :: (Node, number, number, Slice) → StepResult
    // Call [`Node.replace`](#model.Node.replace) with the given
    // arguments. Create a successful result if it succeeds, and a
    // failed one if it throws a `ReplaceError`.

  }, {
    key: "fromReplace",
    value: function fromReplace(doc, from, to, slice) {
      try {
        return StepResult.ok(doc.replace(from, to, slice));
      } catch (e) {
        if (e instanceof ReplaceError) return StepResult.fail(e.message);
        throw e;
      }
    }
  }]);

  return StepResult;
}();

var ReplaceStep = function (_Step) {
  _inherits(ReplaceStep, _Step);

  // :: (number, number, Slice, ?bool)
  // The given `slice` should fit the 'gap' between `from` and
  // `to`—the depths must line up, and the surrounding nodes must be
  // able to be joined with the open sides of the slice. When
  // `structure` is true, the step will fail if the content between
  // from and to is not just a sequence of closing and then opening
  // tokens (this is to guard against rebased replace steps
  // overwriting something they weren't supposed to).
  function ReplaceStep(from, to, slice, structure) {
    _classCallCheck(this, ReplaceStep);

    var _this = _possibleConstructorReturn(this, (ReplaceStep.__proto__ || _Object$getPrototypeOf(ReplaceStep)).call(this));

    _this.from = from;
    _this.to = to;
    _this.slice = slice;
    _this.structure = !!structure;
    return _this;
  }

  _createClass(ReplaceStep, [{
    key: "apply",
    value: function apply(doc) {
      if (this.structure && contentBetween(doc, this.from, this.to)) return StepResult.fail("Structure replace would overwrite content");
      return StepResult.fromReplace(doc, this.from, this.to, this.slice);
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return new StepMap([this.from, this.to - this.from, this.slice.size]);
    }
  }, {
    key: "invert",
    value: function invert(doc) {
      return new ReplaceStep(this.from, this.from + this.slice.size, doc.slice(this.from, this.to));
    }
  }, {
    key: "map",
    value: function map(mapping) {
      var from = mapping.mapResult(this.from, 1),
          to = mapping.mapResult(this.to, -1);
      if (from.deleted && to.deleted) return null;
      return new ReplaceStep(from.pos, Math.max(from.pos, to.pos), this.slice);
    }
  }, {
    key: "merge",
    value: function merge(other) {
      if (!(other instanceof ReplaceStep) || other.structure != this.structure) return null;

      if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
        var slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
        return new ReplaceStep(this.from, this.to + (other.to - other.from), slice, this.structure);
      } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
        var _slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
        return new ReplaceStep(other.from, this.to, _slice, this.structure);
      } else {
        return null;
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = { stepType: "replace", from: this.from, to: this.to };
      if (this.slice.size) json.slice = this.slice.toJSON();
      if (this.structure) json.structure = true;
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for ReplaceStep.fromJSON");
      return new ReplaceStep(json.from, json.to, Slice.fromJSON(schema, json.slice), !!json.structure);
    }
  }]);

  return ReplaceStep;
}(Step);

Step.jsonID("replace", ReplaceStep);

// ::- Replace a part of the document with a slice of content, but
// preserve a range of the replaced content by moving it into the
// slice.
var ReplaceAroundStep = function (_Step2) {
  _inherits(ReplaceAroundStep, _Step2);

  // :: (number, number, number, number, Slice, number, ?bool)
  // Create a replace-around step with the given range and gap.
  // `insert` should be the point in the slice into which the content
  // of the gap should be moved. `structure` has the same meaning as
  // it has in the [`ReplaceStep`](#transform.ReplaceStep) class.
  function ReplaceAroundStep(from, to, gapFrom, gapTo, slice, insert, structure) {
    _classCallCheck(this, ReplaceAroundStep);

    var _this2 = _possibleConstructorReturn(this, (ReplaceAroundStep.__proto__ || _Object$getPrototypeOf(ReplaceAroundStep)).call(this));

    _this2.from = from;
    _this2.to = to;
    _this2.gapFrom = gapFrom;
    _this2.gapTo = gapTo;
    _this2.slice = slice;
    _this2.insert = insert;
    _this2.structure = !!structure;
    return _this2;
  }

  _createClass(ReplaceAroundStep, [{
    key: "apply",
    value: function apply(doc) {
      if (this.structure && (contentBetween(doc, this.from, this.gapFrom) || contentBetween(doc, this.gapTo, this.to))) return StepResult.fail("Structure gap-replace would overwrite content");

      var gap = doc.slice(this.gapFrom, this.gapTo);
      if (gap.openStart || gap.openEnd) return StepResult.fail("Gap is not a flat range");
      var inserted = this.slice.insertAt(this.insert, gap.content);
      if (!inserted) return StepResult.fail("Content does not fit in gap");
      return StepResult.fromReplace(doc, this.from, this.to, inserted);
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return new StepMap([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert]);
    }
  }, {
    key: "invert",
    value: function invert(doc) {
      var gap = this.gapTo - this.gapFrom;
      return new ReplaceAroundStep(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
    }
  }, {
    key: "map",
    value: function map(mapping) {
      var from = mapping.mapResult(this.from, 1),
          to = mapping.mapResult(this.to, -1);
      var gapFrom = mapping.map(this.gapFrom, -1),
          gapTo = mapping.map(this.gapTo, 1);
      if (from.deleted && to.deleted || gapFrom < from.pos || gapTo > to.pos) return null;
      return new ReplaceAroundStep(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = { stepType: "replaceAround", from: this.from, to: this.to,
        gapFrom: this.gapFrom, gapTo: this.gapTo, insert: this.insert };
      if (this.slice.size) json.slice = this.slice.toJSON();
      if (this.structure) json.structure = true;
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
      return new ReplaceAroundStep(json.from, json.to, json.gapFrom, json.gapTo, Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
    }
  }]);

  return ReplaceAroundStep;
}(Step);

Step.jsonID("replaceAround", ReplaceAroundStep);

function contentBetween(doc, from, to) {
  var $from = doc.resolve(from),
      dist = to - from,
      depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    var next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf) return true;
      next = next.firstChild;
      dist--;
    }
  }
  return false;
}

function canCut(node, start, end) {
  return (start == 0 || node.canReplace(start, node.childCount)) && (end == node.childCount || node.canReplace(0, end));
}

// :: (NodeRange) → ?number
// Try to find a target depth to which the content in the given range
// can be lifted. Will not go across
// [isolating](#model.NodeSpec.isolating) parent nodes.
function liftTarget(range) {
  var parent = range.parent;
  var content = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (var depth = range.depth;; --depth) {
    var node = range.$from.node(depth);
    var index = range.$from.index(depth),
        endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node.canReplace(index, endIndex, content)) return depth;
    if (depth == 0 || node.type.spec.isolating || !canCut(node, index, endIndex)) break;
  }
}

// :: (NodeRange, number) → this
// Split the content in the given range off from its parent, if there
// is sibling content before or after it, and move it up the tree to
// the depth specified by `target`. You'll probably want to use
// [`liftTarget`](#transform.liftTarget) to compute `target`, to make
// sure the lift is valid.
Transform.prototype.lift = function (range, target) {
  var $from = range.$from,
      $to = range.$to,
      depth = range.depth;


  var gapStart = $from.before(depth + 1),
      gapEnd = $to.after(depth + 1);
  var start = gapStart,
      end = gapEnd;

  var before = Fragment.empty,
      openStart = 0;
  for (var d = depth, splitting = false; d > target; d--) {
    if (splitting || $from.index(d) > 0) {
      splitting = true;
      before = Fragment.from($from.node(d).copy(before));
      openStart++;
    } else {
      start--;
    }
  }var after = Fragment.empty,
      openEnd = 0;
  for (var _d = depth, _splitting = false; _d > target; _d--) {
    if (_splitting || $to.after(_d + 1) < $to.end(_d)) {
      _splitting = true;
      after = Fragment.from($to.node(_d).copy(after));
      openEnd++;
    } else {
      end++;
    }
  }return this.step(new ReplaceAroundStep(start, end, gapStart, gapEnd, new Slice(before.append(after), openStart, openEnd), before.size - openStart, true));
};

// :: (NodeRange, NodeType, ?Object, ?NodeRange) → ?[{type: NodeType, attrs: ?Object}]
// Try to find a valid way to wrap the content in the given range in a
// node of the given type. May introduce extra nodes around and inside
// the wrapper node, if necessary. Returns null if no valid wrapping
// could be found. When `innerRange` is given, that range's content is
// used as the content to fit into the wrapping, instead of the
// content of `range`.
function findWrapping(range, nodeType, attrs) {
  var innerRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : range;

  var around = findWrappingOutside(range, nodeType);
  var inner = around && findWrappingInside(innerRange, nodeType);
  if (!inner) return null;
  return around.map(withAttrs).concat({ type: nodeType, attrs: attrs }).concat(inner.map(withAttrs));
}

function withAttrs(type) {
  return { type: type, attrs: null };
}

function findWrappingOutside(range, type) {
  var parent = range.parent,
      startIndex = range.startIndex,
      endIndex = range.endIndex;

  var around = parent.contentMatchAt(startIndex).findWrapping(type);
  if (!around) return null;
  var outer = around.length ? around[0] : type;
  return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
}

function findWrappingInside(range, type) {
  var parent = range.parent,
      startIndex = range.startIndex,
      endIndex = range.endIndex;

  var inner = parent.child(startIndex);
  var inside = type.contentMatch.findWrapping(inner.type);
  if (!inside) return null;
  var lastType = inside.length ? inside[inside.length - 1] : type;
  var innerMatch = lastType.contentMatch;
  for (var i = startIndex; innerMatch && i < endIndex; i++) {
    innerMatch = innerMatch.matchType(parent.child(i).type);
  }if (!innerMatch || !innerMatch.validEnd) return null;
  return inside;
}

// :: (NodeRange, [{type: NodeType, attrs: ?Object}]) → this
// Wrap the given [range](#model.NodeRange) in the given set of wrappers.
// The wrappers are assumed to be valid in this position, and should
// probably be computed with [`findWrapping`](#transform.findWrapping).
Transform.prototype.wrap = function (range, wrappers) {
  var content = Fragment.empty;
  for (var i = wrappers.length - 1; i >= 0; i--) {
    content = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }var start = range.start,
      end = range.end;
  return this.step(new ReplaceAroundStep(start, end, start, end, new Slice(content, 0, 0), wrappers.length, true));
};

// :: (number, ?number, NodeType, ?Object) → this
// Set the type of all textblocks (partly) between `from` and `to` to
// the given node type with the given attributes.
Transform.prototype.setBlockType = function (from) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;

  var _this = this;

  var type = arguments[2];
  var attrs = arguments[3];

  if (!type.isTextblock) throw new RangeError("Type given to setBlockType should be a textblock");
  var mapFrom = this.steps.length;
  this.doc.nodesBetween(from, to, function (node, pos) {
    if (node.isTextblock && !node.hasMarkup(type, attrs) && canChangeType(_this.doc, _this.mapping.slice(mapFrom).map(pos), type)) {
      // Ensure all markup that isn't allowed in the new node type is cleared
      _this.clearIncompatible(_this.mapping.slice(mapFrom).map(pos, 1), type);
      var mapping = _this.mapping.slice(mapFrom);
      var startM = mapping.map(pos, 1),
          endM = mapping.map(pos + node.nodeSize, 1);
      _this.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new Slice(Fragment.from(type.create(attrs, null, node.marks)), 0, 0), 1, true));
      return false;
    }
  });
  return this;
};

function canChangeType(doc, pos, type) {
  var $pos = doc.resolve(pos),
      index = $pos.index();
  return $pos.parent.canReplaceWith(index, index + 1, type);
}

// :: (number, ?NodeType, ?Object, ?[Mark]) → this
// Change the type, attributes, and/or marks of the node at `pos`.
// When `type` isn't given, the existing node type is preserved,
Transform.prototype.setNodeMarkup = function (pos, type, attrs, marks) {
  var node = this.doc.nodeAt(pos);
  if (!node) throw new RangeError("No node at given position");
  if (!type) type = node.type;
  var newNode = type.create(attrs, null, marks || node.marks);
  if (node.isLeaf) return this.replaceWith(pos, pos + node.nodeSize, newNode);

  if (!type.validContent(node.content)) throw new RangeError("Invalid content for node type " + type.name);

  return this.step(new ReplaceAroundStep(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1, new Slice(Fragment.from(newNode), 0, 0), 1, true));
};

// :: (Node, number, number, ?[?{type: NodeType, attrs: ?Object}]) → bool
// Check whether splitting at the given position is allowed.
function canSplit(doc, pos) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var typesAfter = arguments[3];

  var $pos = doc.resolve(pos),
      base = $pos.depth - depth;
  var innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
  if (base < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) return false;
  for (var d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
    var node = $pos.node(d),
        _index = $pos.index(d);
    if (node.type.spec.isolating) return false;
    var rest = node.content.cutByIndex(_index, node.childCount);
    var after = typesAfter && typesAfter[i] || node;
    if (after != node) rest = rest.replaceChild(0, after.type.create(after.attrs));
    if (!node.canReplace(_index + 1, node.childCount) || !after.type.validContent(rest)) return false;
  }
  var index = $pos.indexAfter(base);
  var baseType = typesAfter && typesAfter[0];
  return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type);
}

// :: (number, ?number, ?[?{type: NodeType, attrs: ?Object}]) → this
// Split the node at the given position, and optionally, if `depth` is
// greater than one, any number of nodes above that. By default, the
// parts split off will inherit the node type of the original node.
// This can be changed by passing an array of types and attributes to
// use after the split.
Transform.prototype.split = function (pos) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var typesAfter = arguments[2];

  var $pos = this.doc.resolve(pos),
      before = Fragment.empty,
      after = Fragment.empty;
  for (var d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
    before = Fragment.from($pos.node(d).copy(before));
    var typeAfter = typesAfter && typesAfter[i];
    after = Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
  }
  return this.step(new ReplaceStep(pos, pos, new Slice(before.append(after), depth, depth, true)));
};

// :: (Node, number) → bool
// Test whether the blocks before and after a given position can be
// joined.
function canJoin(doc, pos) {
  var $pos = doc.resolve(pos),
      index = $pos.index();
  return joinable$1($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
}

function joinable$1(a, b) {
  return a && b && !a.isLeaf && a.canAppend(b);
}

// :: (Node, number, ?number) → ?number
// Find an ancestor of the given position that can be joined to the
// block before (or after if `dir` is positive). Returns the joinable
// point, if any.


// :: (number, ?number) → this
// Join the blocks around the given position. If depth is 2, their
// last and first siblings are also joined, and so on.
Transform.prototype.join = function (pos) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var step = new ReplaceStep(pos - depth, pos + depth, Slice.empty, true);
  return this.step(step);
};

// :: (Node, number, NodeType) → ?number
// Try to find a point where a node of the given type can be inserted
// near `pos`, by searching up the node hierarchy when `pos` itself
// isn't a valid place but is at the start or end of a node. Return
// null if no position was found.
function insertPoint(doc, pos, nodeType) {
  var $pos = doc.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) return pos;

  if ($pos.parentOffset == 0) for (var d = $pos.depth - 1; d >= 0; d--) {
    var index = $pos.index(d);
    if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.before(d + 1);
    if (index > 0) return null;
  }
  if ($pos.parentOffset == $pos.parent.content.size) for (var _d2 = $pos.depth - 1; _d2 >= 0; _d2--) {
    var _index2 = $pos.indexAfter(_d2);
    if ($pos.node(_d2).canReplaceWith(_index2, _index2, nodeType)) return $pos.after(_d2 + 1);
    if (_index2 < $pos.node(_d2).childCount) return null;
  }
}

// :: (Node, number, Slice) → ?number
// Finds a position at or around the given position where the given
// slice can be inserted. Will look at parent nodes' nearest boundary
// and try there, even if the original position wasn't directly at the
// start or end of that node. Returns null when no position was found.
function dropPoint(doc, pos, slice) {
  var $pos = doc.resolve(pos);
  if (!slice.content.size) return pos;
  var content = slice.content;
  for (var i = 0; i < slice.openStart; i++) {
    content = content.firstChild.content;
  }for (var pass = 1; pass <= (slice.openStart == 0 && slice.size ? 2 : 1); pass++) {
    for (var d = $pos.depth; d >= 0; d--) {
      var bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
      var insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
      if (pass == 1 ? $pos.node(d).canReplace(insertPos, insertPos, content) : $pos.node(d).contentMatchAt(insertPos).findWrapping(content.firstChild.type)) return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
    }
  }
  return null;
}

function mapFragment(fragment, f, parent) {
  var mapped = [];
  for (var i = 0; i < fragment.childCount; i++) {
    var child = fragment.child(i);
    if (child.content.size) child = child.copy(mapFragment(child.content, f, child));
    if (child.isInline) child = f(child, parent, i);
    mapped.push(child);
  }
  return Fragment.fromArray(mapped);
}

// ::- Add a mark to all inline content between two positions.
var AddMarkStep = function (_Step) {
  _inherits(AddMarkStep, _Step);

  // :: (number, number, Mark)
  function AddMarkStep(from, to, mark) {
    _classCallCheck(this, AddMarkStep);

    var _this = _possibleConstructorReturn(this, (AddMarkStep.__proto__ || _Object$getPrototypeOf(AddMarkStep)).call(this));

    _this.from = from;
    _this.to = to;
    _this.mark = mark;
    return _this;
  }

  _createClass(AddMarkStep, [{
    key: "apply",
    value: function apply(doc) {
      var _this2 = this;

      var oldSlice = doc.slice(this.from, this.to),
          $from = doc.resolve(this.from);
      var parent = $from.node($from.sharedDepth(this.to));
      var slice = new Slice(mapFragment(oldSlice.content, function (node, parent) {
        if (!parent.type.allowsMarkType(_this2.mark.type)) return node;
        return node.mark(_this2.mark.addToSet(node.marks));
      }, parent), oldSlice.openStart, oldSlice.openEnd);
      return StepResult.fromReplace(doc, this.from, this.to, slice);
    }
  }, {
    key: "invert",
    value: function invert() {
      return new RemoveMarkStep(this.from, this.to, this.mark);
    }
  }, {
    key: "map",
    value: function map(mapping) {
      var from = mapping.mapResult(this.from, 1),
          to = mapping.mapResult(this.to, -1);
      if (from.deleted && to.deleted || from.pos >= to.pos) return null;
      return new AddMarkStep(from.pos, to.pos, this.mark);
    }
  }, {
    key: "merge",
    value: function merge(other) {
      if (other instanceof AddMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new AddMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return { stepType: "addMark", mark: this.mark.toJSON(),
        from: this.from, to: this.to };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for AddMarkStep.fromJSON");
      return new AddMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
    }
  }]);

  return AddMarkStep;
}(Step);

Step.jsonID("addMark", AddMarkStep);

// ::- Remove a mark from all inline content between two positions.
var RemoveMarkStep = function (_Step2) {
  _inherits(RemoveMarkStep, _Step2);

  // :: (number, number, Mark)
  function RemoveMarkStep(from, to, mark) {
    _classCallCheck(this, RemoveMarkStep);

    var _this3 = _possibleConstructorReturn(this, (RemoveMarkStep.__proto__ || _Object$getPrototypeOf(RemoveMarkStep)).call(this));

    _this3.from = from;
    _this3.to = to;
    _this3.mark = mark;
    return _this3;
  }

  _createClass(RemoveMarkStep, [{
    key: "apply",
    value: function apply(doc) {
      var _this4 = this;

      var oldSlice = doc.slice(this.from, this.to);
      var slice = new Slice(mapFragment(oldSlice.content, function (node) {
        return node.mark(_this4.mark.removeFromSet(node.marks));
      }), oldSlice.openStart, oldSlice.openEnd);
      return StepResult.fromReplace(doc, this.from, this.to, slice);
    }
  }, {
    key: "invert",
    value: function invert() {
      return new AddMarkStep(this.from, this.to, this.mark);
    }
  }, {
    key: "map",
    value: function map(mapping) {
      var from = mapping.mapResult(this.from, 1),
          to = mapping.mapResult(this.to, -1);
      if (from.deleted && to.deleted || from.pos >= to.pos) return null;
      return new RemoveMarkStep(from.pos, to.pos, this.mark);
    }
  }, {
    key: "merge",
    value: function merge(other) {
      if (other instanceof RemoveMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new RemoveMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return { stepType: "removeMark", mark: this.mark.toJSON(),
        from: this.from, to: this.to };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(schema, json) {
      if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
      return new RemoveMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
    }
  }]);

  return RemoveMarkStep;
}(Step);

Step.jsonID("removeMark", RemoveMarkStep);

Transform.prototype.addMark = function (from, to, mark) {
  var _this = this;

  var removed = [],
      added = [],
      removing = null,
      adding = null;
  this.doc.nodesBetween(from, to, function (node, pos, parent) {
    if (!node.isInline) return;
    var marks = node.marks;
    if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
      var start = Math.max(pos, from),
          end = Math.min(pos + node.nodeSize, to);
      var newSet = mark.addToSet(marks);

      for (var i = 0; i < marks.length; i++) {
        if (!marks[i].isInSet(newSet)) {
          if (removing && removing.to == start && removing.mark.eq(marks[i])) removing.to = end;else removed.push(removing = new RemoveMarkStep(start, end, marks[i]));
        }
      }

      if (adding && adding.to == start) adding.to = end;else added.push(adding = new AddMarkStep(start, end, mark));
    }
  });

  removed.forEach(function (s) {
    return _this.step(s);
  });
  added.forEach(function (s) {
    return _this.step(s);
  });
  return this;
};

// :: (number, number, ?union<Mark, MarkType>) → this
// Remove marks from inline nodes between `from` and `to`. When `mark`
// is a single mark, remove precisely that mark. When it is a mark type,
// remove all marks of that type. When it is null, remove all marks of
// any type.
Transform.prototype.removeMark = function (from, to) {
  var _this2 = this;

  var mark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var matched = [],
      step = 0;
  this.doc.nodesBetween(from, to, function (node, pos) {
    if (!node.isInline) return;
    step++;
    var toRemove = null;
    if (mark instanceof MarkType) {
      var found = mark.isInSet(node.marks);
      if (found) toRemove = [found];
    } else if (mark) {
      if (mark.isInSet(node.marks)) toRemove = [mark];
    } else {
      toRemove = node.marks;
    }
    if (toRemove && toRemove.length) {
      var end = Math.min(pos + node.nodeSize, to);
      for (var i = 0; i < toRemove.length; i++) {
        var style = toRemove[i],
            _found = void 0;
        for (var j = 0; j < matched.length; j++) {
          var m = matched[j];
          if (m.step == step - 1 && style.eq(matched[j].style)) _found = m;
        }
        if (_found) {
          _found.to = end;
          _found.step = step;
        } else {
          matched.push({ style: style, from: Math.max(pos, from), to: end, step: step });
        }
      }
    }
  });
  matched.forEach(function (m) {
    return _this2.step(new RemoveMarkStep(m.from, m.to, m.style));
  });
  return this;
};

// :: (number, NodeType, ?ContentMatch) → this
// Removes all marks and nodes from the content of the node at `pos`
// that don't match the given new parent node type. Accepts an
// optional starting [content match](#model.ContentMatch) as third
// argument.
Transform.prototype.clearIncompatible = function (pos, parentType) {
  var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : parentType.contentMatch;

  var node = this.doc.nodeAt(pos);
  var delSteps = [],
      cur = pos + 1;
  for (var i = 0; i < node.childCount; i++) {
    var child = node.child(i),
        end = cur + child.nodeSize;
    var allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end, Slice.empty));
    } else {
      match = allowed;
      for (var j = 0; j < child.marks.length; j++) {
        if (!parentType.allowsMarkType(child.marks[j].type)) this.step(new RemoveMarkStep(cur, end, child.marks[j]));
      }
    }
    cur = end;
  }
  if (!match.validEnd) {
    var fill = match.fillBefore(Fragment.empty, true);
    this.replace(cur, cur, new Slice(fill, 0, 0));
  }
  for (var _i = delSteps.length - 1; _i >= 0; _i--) {
    this.step(delSteps[_i]);
  }return this;
};

function replaceStep(doc, from) {
  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : from;
  var slice = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Slice.empty;

  if (from == to && !slice.size) return null;

  var $from = doc.resolve(from),
      $to = doc.resolve(to);
  // Optimization -- avoid work if it's obvious that it's not needed.
  if (fitsTrivially($from, $to, slice)) return new ReplaceStep(from, to, slice);
  var placed = placeSlice($from, slice);

  var fittedLeft = fitLeft($from, placed);
  var fitted = fitRight($from, $to, fittedLeft);
  if (!fitted) return null;
  if (fittedLeft.size != fitted.size && canMoveText($from, $to, fittedLeft)) {
    var d = $to.depth,
        after = $to.after(d);
    while (d > 1 && after == $to.end(--d)) {
      ++after;
    }var fittedAfter = fitRight($from, doc.resolve(after), fittedLeft);
    if (fittedAfter) return new ReplaceAroundStep(from, after, to, $to.end(), fittedAfter, fittedLeft.size);
  }
  return fitted.size || from != to ? new ReplaceStep(from, to, fitted) : null;
}

// :: (number, ?number, ?Slice) → this
// Replace the part of the document between `from` and `to` with the
// given `slice`.
Transform.prototype.replace = function (from) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
  var slice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Slice.empty;

  var step = replaceStep(this.doc, from, to, slice);
  if (step) this.step(step);
  return this;
};

// :: (number, number, union<Fragment, Node, [Node]>) → this
// Replace the given range with the given content, which may be a
// fragment, node, or array of nodes.
Transform.prototype.replaceWith = function (from, to, content) {
  return this.replace(from, to, new Slice(Fragment.from(content), 0, 0));
};

// :: (number, number) → this
// Delete the content between the given positions.
Transform.prototype.delete = function (from, to) {
  return this.replace(from, to, Slice.empty);
};

// :: (number, union<Fragment, Node, [Node]>) → this
// Insert the given content at the given position.
Transform.prototype.insert = function (pos, content) {
  return this.replaceWith(pos, pos, content);
};

function fitLeftInner($from, depth, placed, placedBelow) {
  var content = Fragment.empty,
      openEnd = 0,
      placedHere = placed[depth];
  if ($from.depth > depth) {
    var inner = fitLeftInner($from, depth + 1, placed, placedBelow || placedHere);
    openEnd = inner.openEnd + 1;
    content = Fragment.from($from.node(depth + 1).copy(inner.content));
  }

  if (placedHere) {
    content = content.append(placedHere.content);
    openEnd = placedHere.openEnd;
  }
  if (placedBelow) {
    content = content.append($from.node(depth).contentMatchAt($from.indexAfter(depth)).fillBefore(Fragment.empty, true));
    openEnd = 0;
  }

  return { content: content, openEnd: openEnd };
}

function fitLeft($from, placed) {
  var _fitLeftInner = fitLeftInner($from, 0, placed, false),
      content = _fitLeftInner.content,
      openEnd = _fitLeftInner.openEnd;

  return new Slice(content, $from.depth, openEnd || 0);
}

function fitRightJoin(content, parent, $from, $to, depth, openStart, openEnd) {
  var match = void 0,
      count = content.childCount,
      matchCount = count - (openEnd > 0 ? 1 : 0);
  var parentNode = openStart < 0 ? parent : $from.node(depth);
  if (openStart < 0) match = parentNode.contentMatchAt(matchCount);else if (count == 1 && openEnd > 0) match = parentNode.contentMatchAt(openStart ? $from.index(depth) : $from.indexAfter(depth));else match = parentNode.contentMatchAt($from.indexAfter(depth)).matchFragment(content, count > 0 && openStart ? 1 : 0, matchCount);

  var toNode = $to.node(depth);
  if (openEnd > 0 && depth < $to.depth) {
    var after = toNode.content.cutByIndex($to.indexAfter(depth)).addToStart(content.lastChild);
    var _joinable = match.fillBefore(after, true);
    // Can't insert content if there's a single node stretched across this gap
    if (_joinable && _joinable.size && openStart > 0 && count == 1) _joinable = null;

    if (_joinable) {
      var inner = fitRightJoin(content.lastChild.content, content.lastChild, $from, $to, depth + 1, count == 1 ? openStart - 1 : -1, openEnd - 1);
      if (inner) {
        var last = content.lastChild.copy(inner);
        if (_joinable.size) return content.cutByIndex(0, count - 1).append(_joinable).addToEnd(last);else return content.replaceChild(count - 1, last);
      }
    }
  }
  if (openEnd > 0) match = match.matchType((count == 1 && openStart > 0 ? $from.node(depth + 1) : content.lastChild).type);

  // If we're here, the next level can't be joined, so we see what
  // happens if we leave it open.
  var toIndex = $to.index(depth);
  if (toIndex == toNode.childCount && !toNode.type.compatibleContent(parent.type)) return null;
  var joinable = match.fillBefore(toNode.content, true, toIndex);
  for (var i = toIndex; joinable && i < toNode.content.childCount; i++) {
    if (!parentNode.type.allowsMarks(toNode.content.child(i).marks)) joinable = null;
  }if (!joinable) return null;

  if (openEnd > 0) {
    var closed = fitRightClosed(content.lastChild, openEnd - 1, $from, depth + 1, count == 1 ? openStart - 1 : -1);
    content = content.replaceChild(count - 1, closed);
  }
  content = content.append(joinable);
  if ($to.depth > depth) content = content.addToEnd(fitRightSeparate($to, depth + 1));
  return content;
}

function fitRightClosed(node, openEnd, $from, depth, openStart) {
  var match = void 0,
      content = node.content,
      count = content.childCount;
  if (openStart >= 0) match = $from.node(depth).contentMatchAt($from.indexAfter(depth)).matchFragment(content, openStart > 0 ? 1 : 0, count);else match = node.contentMatchAt(count);

  if (openEnd > 0) {
    var closed = fitRightClosed(content.lastChild, openEnd - 1, $from, depth + 1, count == 1 ? openStart - 1 : -1);
    content = content.replaceChild(count - 1, closed);
  }

  return node.copy(content.append(match.fillBefore(Fragment.empty, true)));
}

function fitRightSeparate($to, depth) {
  var node = $to.node(depth);
  var fill = node.contentMatchAt(0).fillBefore(node.content, true, $to.index(depth));
  if ($to.depth > depth) fill = fill.addToEnd(fitRightSeparate($to, depth + 1));
  return node.copy(fill);
}

function normalizeSlice(content, openStart, openEnd) {
  while (openStart > 0 && openEnd > 0 && content.childCount == 1) {
    content = content.firstChild.content;
    openStart--;
    openEnd--;
  }
  return new Slice(content, openStart, openEnd);
}

// : (ResolvedPos, ResolvedPos, number, Slice) → Slice
function fitRight($from, $to, slice) {
  var fitted = fitRightJoin(slice.content, $from.node(0), $from, $to, 0, slice.openStart, slice.openEnd);
  if (!fitted) return null;
  return normalizeSlice(fitted, slice.openStart, $to.depth);
}

function fitsTrivially($from, $to, slice) {
  return !slice.openStart && !slice.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice.content);
}

function canMoveText($from, $to, slice) {
  if (!$to.parent.isTextblock) return false;

  var parent = slice.openEnd ? nodeRight(slice.content, slice.openEnd) : $from.node($from.depth - (slice.openStart - slice.openEnd));
  if (!parent.isTextblock) return false;
  for (var i = $to.index(); i < $to.parent.childCount; i++) {
    if (!parent.type.allowsMarks($to.parent.child(i).marks)) return false;
  }var match = void 0;
  if (slice.openEnd) {
    match = parent.contentMatchAt(parent.childCount);
  } else {
    match = parent.contentMatchAt(parent.childCount);
    if (slice.size) match = match.matchFragment(slice.content, slice.openStart ? 1 : 0);
  }
  match = match.matchFragment($to.parent.content, $to.index());
  return match && match.validEnd;
}

function nodeRight(content, depth) {
  for (var i = 1; i < depth; i++) {
    content = content.lastChild.content;
  }return content.lastChild;
}

// Algorithm for 'placing' the elements of a slice into a gap:
//
// We consider the content of each node that is open to the left to be
// independently placeable. I.e. in <p("foo"), p("bar")>, when the
// paragraph on the left is open, "foo" can be placed (somewhere on
// the left side of the replacement gap) independently from p("bar").
//
// So placeSlice splits up a slice into a number of sub-slices,
// along with information on where they can be placed on the given
// left-side edge. It works by walking the open side of the slice,
// from the inside out, and trying to find a landing spot for each
// element, by simultaneously scanning over the gap side. When no
// place is found for an open node's content, it is left in that node.

// : (ResolvedPos, Slice) → [{content: Fragment, openEnd: number, depth: number}]
function placeSlice($from, slice) {
  var frontier = new Frontier($from);
  for (var pass = 1; slice.size && pass <= 3; pass++) {
    slice = frontier.placeSlice(slice.content, slice.openStart, slice.openEnd, pass);
  }while (frontier.open.length) {
    frontier.closeNode();
  }return frontier.placed;
}

// Helper class that models the open side of the insert position,
// keeping track of the content match and already inserted content
// at each depth.

var Frontier = function () {
  function Frontier($pos) {
    _classCallCheck(this, Frontier);

    // : [{parent: Node, match: ContentMatch, content: Fragment, wrapper: bool, openEnd: number, depth: number}]
    this.open = [];
    for (var d = 0; d <= $pos.depth; d++) {
      var parent = $pos.node(d),
          match = parent.contentMatchAt($pos.indexAfter(d));
      this.open.push({ parent: parent, match: match, content: Fragment.empty, wrapper: false, openEnd: 0, depth: d });
    }
    this.placed = [];
  }

  // : (Fragment, number, number, number, ?Node) → Slice
  // Tries to place the content of the given slice, and returns a
  // slice containing unplaced content.
  //
  // pass 1: try to fit directly
  // pass 2: allow wrapper nodes to be introduced
  // pass 3: allow unwrapping of nodes that aren't open


  _createClass(Frontier, [{
    key: "placeSlice",
    value: function placeSlice(fragment, openStart, openEnd, pass, parent) {
      if (openStart > 0) {
        var first = fragment.firstChild;
        var inner = this.placeSlice(first.content, Math.max(0, openStart - 1), openEnd && fragment.childCount == 1 ? openEnd - 1 : 0, pass, first);
        if (inner.content != first.content) {
          if (inner.content.size) {
            fragment = fragment.replaceChild(0, first.copy(inner.content));
            openStart = inner.openStart + 1;
          } else {
            if (fragment.childCount == 1) openEnd = 0;
            fragment = fragment.cutByIndex(1);
            openStart = 0;
          }
        }
      }
      var result = this.placeContent(fragment, openStart, openEnd, pass, parent);
      if (pass > 2 && result.size && openStart == 0) {
        for (var i = 0; i < result.content.childCount; i++) {
          var child = result.content.child(i);
          this.placeContent(child.content, 0, openEnd && i == result.content.childCount.length - 1 ? openEnd - 1 : 0, pass, child);
        }
        result = Fragment.empty;
      }
      return result;
    }
  }, {
    key: "placeContent",
    value: function placeContent(fragment, openStart, openEnd, pass, parent) {
      var i = 0;
      // Go over the fragment's children
      for (; i < fragment.childCount; i++) {
        var child = fragment.child(i),
            placed = false,
            last = i == fragment.childCount - 1;
        // Try each open node in turn, starting from the innermost
        for (var d = this.open.length - 1; d >= 0; d--) {
          var open = this.open[d],
              wrap = void 0;

          // If pass > 1, it is allowed to wrap the node to help find a
          // fit, so if findWrappeing returns something, we add open
          // nodes to the frontier for that wrapping.
          if (pass > 1 && (wrap = open.match.findWrapping(child.type)) && !(parent && wrap.length && wrap[wrap.length - 1] == parent.type)) {
            while (this.open.length - 1 > d) {
              this.closeNode();
            }for (var w = 0; w < wrap.length; w++) {
              open.match = open.match.matchType(wrap[w]);
              d++;
              open = { parent: wrap[w].create(),
                match: wrap[w].contentMatch,
                content: Fragment.empty, wrapper: true, openEnd: 0, depth: d + w };
              this.open.push(open);
            }
          }

          // See if the child fits here
          var match = open.match.matchType(child.type);
          if (!match) {
            var fill = open.match.fillBefore(Fragment.from(child));
            if (fill) {
              for (var j = 0; j < fill.childCount; j++) {
                var ch = fill.child(j);
                this.addNode(open, ch, 0);
                match = open.match.matchFragment(ch);
              }
            } else if (parent && open.match.matchType(parent.type)) {
              // Don't continue looking further up if the parent node
              // would fit here.
              break;
            } else {
              continue;
            }
          }

          // Close open nodes above this one, since we're starting to
          // add to this.
          while (this.open.length - 1 > d) {
            this.closeNode();
          } // Strip marks from the child or close its start when necessary
          child = child.mark(open.parent.type.allowedMarks(child.marks));
          if (openStart) {
            child = closeNodeStart(child, openStart, last ? openEnd : 0);
            openStart = 0;
          }
          // Add the child to this open node and adjust its metadata
          this.addNode(open, child, last ? openEnd : 0);
          open.match = match;
          if (last) openEnd = 0;
          placed = true;
          break;
        }
        // As soon as we've failed to place a node we stop looking at
        // later nodes
        if (!placed) break;
      }
      // Close the current open node if it's not the the root and we
      // either placed up to the end of the node or the the current
      // slice depth's node type matches the open node's type
      if (this.open.length > 1 && (i > 0 && i == fragment.childCount || parent && this.open[this.open.length - 1].parent.type == parent.type)) this.closeNode();

      return new Slice(fragment.cutByIndex(i), openStart, openEnd);
    }
  }, {
    key: "addNode",
    value: function addNode(open, node, openEnd) {
      open.content = closeFragmentEnd(open.content, open.openEnd).addToEnd(node);
      open.openEnd = openEnd;
    }
  }, {
    key: "closeNode",
    value: function closeNode() {
      var open = this.open.pop();
      if (open.content.size == 0) {
        // Nothing here
      } else if (open.wrapper) {
        this.addNode(this.open[this.open.length - 1], open.parent.copy(open.content), open.openEnd + 1);
      } else {
        this.placed[open.depth] = { depth: open.depth, content: open.content, openEnd: open.openEnd };
      }
    }
  }]);

  return Frontier;
}();

function closeNodeStart(node, openStart, openEnd) {
  var content = node.content;
  if (openStart > 1) {
    var first = closeNodeStart(node.firstChild, openStart - 1, node.childCount == 1 ? openEnd - 1 : 0);
    content = node.content.replaceChild(0, first);
  }
  var fill = node.type.contentMatch.fillBefore(content, openEnd == 0);
  return node.copy(fill.append(content));
}

function closeNodeEnd(node, depth) {
  var content = node.content;
  if (depth > 1) {
    var last = closeNodeEnd(node.lastChild, depth - 1);
    content = node.content.replaceChild(node.childCount - 1, last);
  }
  var fill = node.contentMatchAt(node.childCount).fillBefore(Fragment.empty, true);
  return node.copy(content.append(fill));
}

function closeFragmentEnd(fragment, depth) {
  return depth ? fragment.replaceChild(fragment.childCount - 1, closeNodeEnd(fragment.lastChild, depth)) : fragment;
}

// :: (number, number, Slice) → this
// Replace a range of the document with a given slice, using `from`,
// `to`, and the slice's [`openStart`](#model.Slice.openStart) property
// as hints, rather than fixed start and end points. This method may
// grow the replaced area or close open nodes in the slice in order to
// get a fit that is more in line with WYSIWYG expectations, by
// dropping fully covered parent nodes of the replaced region when
// they are marked [non-defining](#model.NodeSpec.defining), or
// including an open parent node from the slice that _is_ marked as
// [defining](#model.NodeSpec.defining).
//
// This is the method, for example, to handle paste. The similar
// [`replace`](#transform.Transform.replace) method is a more
// primitive tool which will _not_ move the start and end of its given
// range, and is useful in situations where you need more precise
// control over what happens.
Transform.prototype.replaceRange = function (from, to, slice) {
  if (!slice.size) return this.deleteRange(from, to);

  var $from = this.doc.resolve(from),
      $to = this.doc.resolve(to);
  if (fitsTrivially($from, $to, slice)) return this.step(new ReplaceStep(from, to, slice));

  var targetDepths = coveredDepths($from, this.doc.resolve(to));
  // Can't replace the whole document, so remove 0 if it's present
  if (targetDepths[targetDepths.length - 1] == 0) targetDepths.pop();
  // Negative numbers represent not expansion over the whole node at
  // that depth, but replacing from $from.before(-D) to $to.pos.
  var preferredTarget = -($from.depth + 1);
  targetDepths.unshift(preferredTarget);
  // This loop picks a preferred target depth, if one of the covering
  // depths is not outside of a defining node, and adds negative
  // depths for any depth that has $from at its start and does not
  // cross a defining node.
  for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
    var spec = $from.node(d).type.spec;
    if (spec.defining || spec.isolating) break;
    if (targetDepths.indexOf(d) > -1) preferredTarget = d;else if ($from.before(d) == pos) targetDepths.splice(1, 0, -d);
  }
  // Try to fit each possible depth of the slice into each possible
  // target depth, starting with the preferred depths.
  var preferredTargetIndex = targetDepths.indexOf(preferredTarget);

  var leftNodes = [],
      preferredDepth = slice.openStart;
  for (var content = slice.content, i = 0;; i++) {
    var node = content.firstChild;
    leftNodes.push(node);
    if (i == slice.openStart) break;
    content = node.content;
  }
  // Back up if the node directly above openStart, or the node above
  // that separated only by a non-defining textblock node, is defining.
  if (preferredDepth > 0 && leftNodes[preferredDepth - 1].type.spec.defining && $from.node(preferredTargetIndex).type != leftNodes[preferredDepth - 1].type) preferredDepth -= 1;else if (preferredDepth >= 2 && leftNodes[preferredDepth - 1].isTextblock && leftNodes[preferredDepth - 2].type.spec.defining && $from.node(preferredTargetIndex).type != leftNodes[preferredDepth - 2].type) preferredDepth -= 2;

  for (var j = slice.openStart; j >= 0; j--) {
    var openDepth = (j + preferredDepth + 1) % (slice.openStart + 1);
    var insert = leftNodes[openDepth];
    if (!insert) continue;
    for (var _i = 0; _i < targetDepths.length; _i++) {
      // Loop over possible expansion levels, starting with the
      // preferred one
      var targetDepth = targetDepths[(_i + preferredTargetIndex) % targetDepths.length],
          expand = true;
      if (targetDepth < 0) {
        expand = false;targetDepth = -targetDepth;
      }
      var parent = $from.node(targetDepth - 1),
          index = $from.index(targetDepth - 1);
      if (parent.canReplaceWith(index, index, insert.type, insert.marks)) return this.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new Slice(closeFragment(slice.content, 0, slice.openStart, openDepth), openDepth, slice.openEnd));
    }
  }

  return this.replace(from, to, slice);
};

function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
  if (depth < oldOpen) {
    var first = fragment.firstChild;
    fragment = fragment.replaceChild(0, first.copy(closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
  }
  if (depth > newOpen) fragment = parent.contentMatchAt(0).fillBefore(fragment, true).append(fragment);
  return fragment;
}

// :: (number, number, Node) → this
// Replace the given range with a node, but use `from` and `to` as
// hints, rather than precise positions. When from and to are the same
// and are at the start or end of a parent node in which the given
// node doesn't fit, this method may _move_ them out towards a parent
// that does allow the given node to be placed. When the given range
// completely covers a parent node, this method may completely replace
// that parent node.
Transform.prototype.replaceRangeWith = function (from, to, node) {
  if (!node.isInline && from == to && this.doc.resolve(from).parent.content.size) {
    var point = insertPoint(this.doc, from, node.type);
    if (point != null) from = to = point;
  }
  return this.replaceRange(from, to, new Slice(Fragment.from(node), 0, 0));
};

// :: (number, number) → this
// Delete the given range, expanding it to cover fully covered
// parent nodes until a valid replace is found.
Transform.prototype.deleteRange = function (from, to) {
  var $from = this.doc.resolve(from),
      $to = this.doc.resolve(to);
  var covered = coveredDepths($from, $to);
  for (var i = 0; i < covered.length; i++) {
    var depth = covered[i],
        last = i == covered.length - 1;
    if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) return this.delete($from.start(depth), $to.end(depth));
    if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) return this.delete($from.before(depth), $to.after(depth));
  }
  for (var d = 1; d <= $from.depth; d++) {
    if (from - $from.start(d) == $from.depth - d && to > $from.end(d)) return this.delete($from.before(d), to);
  }
  return this.delete(from, to);
};

// : (ResolvedPos, ResolvedPos) → [number]
// Returns an array of all depths for which $from - $to spans the
// whole content of the nodes at that depth.
function coveredDepths($from, $to) {
  var result = [],
      minDepth = Math.min($from.depth, $to.depth);
  for (var d = minDepth; d >= 0; d--) {
    var start = $from.start(d);
    if (start < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) break;
    if (start == $to.start(d)) result.push(d);
  }
  return result;
}

var classesById = _Object$create(null);

var Selection = function () {
  function Selection($anchor, $head, ranges) {
    _classCallCheck(this, Selection);

    this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
    this.$anchor = $anchor;
    this.$head = $head;
  }

  _createClass(Selection, [{
    key: 'content',
    value: function content() {
      return this.$from.node(0).slice(this.from, this.to, true);
    }
  }, {
    key: 'replace',
    value: function replace(tr) {
      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Slice.empty;

      var lastNode = content.content.lastChild,
          lastParent = null;
      for (var i = 0; i < content.openEnd; i++) {
        lastParent = lastNode;
        lastNode = lastNode.lastChild;
      }

      var mapFrom = tr.steps.length,
          ranges = this.ranges;
      for (var _i = 0, len = ranges.length; _i < len; _i++) {
        var _ranges$_i = ranges[_i],
            $from = _ranges$_i.$from,
            $to = _ranges$_i.$to,
            mapping = tr.mapping.slice(mapFrom);

        tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), _i ? Slice.empty : content);

        if (_i === 0) {
          selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
        }
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(tr, node) {
      var mapFrom = tr.steps.length,
          ranges = this.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var _ranges$i = ranges[i],
            $from = _ranges$i.$from,
            $to = _ranges$i.$to,
            mapping = tr.mapping.slice(mapFrom);

        var from = mapping.map($from.pos),
            to = mapping.map($to.pos);
        if (i) {
          tr.deleteRange(from, to);
        } else {
          tr.replaceRangeWith(from, to, node);
          selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
        }
      }
    }
  }, {
    key: 'getBookmark',
    value: function getBookmark() {
      return TextSelection.between(this.$anchor, this.$head).getBookmark();
    }
  }, {
    key: 'anchor',
    get: function get$$1() {
      return this.$anchor.pos;
    }
  }, {
    key: 'head',
    get: function get$$1() {
      return this.$head.pos;
    }
  }, {
    key: 'from',
    get: function get$$1() {
      return this.$from.pos;
    }
  }, {
    key: 'to',
    get: function get$$1() {
      return this.$to.pos;
    }
  }, {
    key: '$from',
    get: function get$$1() {
      return this.ranges[0].$from;
    }
  }, {
    key: '$to',
    get: function get$$1() {
      return this.ranges[0].$to;
    }
  }, {
    key: 'empty',
    get: function get$$1() {
      var ranges = this.ranges;
      for (var i = 0, len = ranges.length; i < len; i++) {
        if (ranges[i].$from.pos != ranges[i].$to.pos) {
          return false;
        }
      }
      return true;
    }
  }], [{
    key: 'findFrom',
    value: function findFrom($pos, dir, textOnly) {
      var inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
      if (inner) return inner;

      for (var depth = $pos.depth - 1; depth >= 0; depth--) {
        var found = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
        if (found) return found;
      }
    }
  }, {
    key: 'near',
    value: function near($pos) {
      var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
    }
  }, {
    key: 'atStart',
    value: function atStart(doc) {
      return findSelectionIn(doc, doc, 0, 0, 1) || new AllSelection(doc);
    }
  }, {
    key: 'atEnd',
    value: function atEnd(doc) {
      return findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new AllSelection(doc);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(doc, json) {
      if (!json || !json.type) throw new RangeError('Invalid input for Selection.fromJSON');
      var cls = classesById[json.type];
      if (!cls) throw new RangeError('No selection type ' + json.type + ' defined');
      return cls.fromJSON(doc, json);
    }
  }, {
    key: 'jsonID',
    value: function jsonID(id, selectionClass) {
      if (id in classesById) throw new RangeError('Duplicate use of selection JSON ID ' + id);
      classesById[id] = selectionClass;
      selectionClass.prototype.jsonID = id;
      return selectionClass;
    }
  }]);

  return Selection;
}();

Selection.prototype.visible = true;

var SelectionRange = function SelectionRange($from, $to) {
  _classCallCheck(this, SelectionRange);

  this.$from = $from;
  this.$to = $to;
};

var TextSelection = function (_Selection) {
  _inherits(TextSelection, _Selection);

  function TextSelection($anchor) {
    var $head = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $anchor;

    _classCallCheck(this, TextSelection);

    return _possibleConstructorReturn(this, (TextSelection.__proto__ || _Object$getPrototypeOf(TextSelection)).call(this, $anchor, $head));
  }

  _createClass(TextSelection, [{
    key: 'map',
    value: function map(doc, mapping) {
      var $head = doc.resolve(mapping.map(this.head));
      if (!$head.parent.inlineContent) return Selection.near($head);
      var $anchor = doc.resolve(mapping.map(this.anchor));
      return new TextSelection($anchor.parent.inlineContent ? $anchor : $head, $head);
    }
  }, {
    key: 'replace',
    value: function replace(tr) {
      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Slice.empty;

      _get(TextSelection.prototype.__proto__ || _Object$getPrototypeOf(TextSelection.prototype), 'replace', this).call(this, tr, content);
      if (content == Slice.empty) {
        var marks = this.$from.marksAcross(this.$to);
        if (marks) tr.ensureMarks(marks);
      }
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return other instanceof TextSelection && other.anchor == this.anchor && other.head == this.head;
    }
  }, {
    key: 'getBookmark',
    value: function getBookmark() {
      return new TextBookmark(this.anchor, this.head);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { type: 'text', anchor: this.anchor, head: this.head };
    }
  }, {
    key: '$cursor',
    get: function get$$1() {
      return this.$anchor.pos == this.$head.pos ? this.$head : null;
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(doc, json) {
      if (typeof json.anchor !== 'number' || typeof json.head !== 'number') {
        throw new RangeError('Invalid input for TextSelection.fromJSON');
      }
      return new TextSelection(doc.resolve(json.anchor), doc.resolve(json.head));
    }
  }, {
    key: 'create',
    value: function create$$1(doc, anchor) {
      var head = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : anchor;

      var $anchor = doc.resolve(anchor);
      return new this($anchor, head == anchor ? $anchor : doc.resolve(head));
    }
  }, {
    key: 'between',
    value: function between($anchor, $head, bias) {
      var dPos = $anchor.pos - $head.pos;
      if (!bias || dPos) bias = dPos >= 0 ? 1 : -1;
      if (!$head.parent.inlineContent) {
        var found = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
        if (found) $head = found.$head;else return Selection.near($head, bias);
      }
      if (!$anchor.parent.inlineContent) {
        if (dPos == 0) {
          $anchor = $head;
        } else {
          $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor;
          if ($anchor.pos < $head.pos != dPos < 0) $anchor = $head;
        }
      }
      return new TextSelection($anchor, $head);
    }
  }]);

  return TextSelection;
}(Selection);

Selection.jsonID('text', TextSelection);

var TextBookmark = function () {
  function TextBookmark(anchor, head) {
    _classCallCheck(this, TextBookmark);

    this.anchor = anchor;
    this.head = head;
  }

  _createClass(TextBookmark, [{
    key: 'map',
    value: function map(mapping) {
      return new TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
    }
  }, {
    key: 'resolve',
    value: function resolve(doc) {
      return TextSelection.between(doc.resolve(this.anchor), doc.resolve(this.head));
    }
  }]);

  return TextBookmark;
}();

var NodeSelection = function (_Selection2) {
  _inherits(NodeSelection, _Selection2);

  function NodeSelection($pos) {
    _classCallCheck(this, NodeSelection);

    var node = $pos.nodeAfter;
    var $end = $pos.node(0).resolve($pos.pos + node.nodeSize);

    // :: Node The selected node.
    var _this2 = _possibleConstructorReturn(this, (NodeSelection.__proto__ || _Object$getPrototypeOf(NodeSelection)).call(this, $pos, $end));

    _this2.node = node;
    return _this2;
  }

  _createClass(NodeSelection, [{
    key: 'map',
    value: function map(doc, mapping) {
      var _mapping$mapResult = mapping.mapResult(this.anchor),
          deleted = _mapping$mapResult.deleted,
          pos = _mapping$mapResult.pos;

      var $pos = doc.resolve(pos);
      if (deleted) return Selection.near($pos);
      return new NodeSelection($pos);
    }
  }, {
    key: 'content',
    value: function content() {
      return new Slice(Fragment.from(this.node), 0, 0);
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return other instanceof NodeSelection && other.anchor == this.anchor;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { type: 'node', anchor: this.anchor };
    }
  }, {
    key: 'getBookmark',
    value: function getBookmark() {
      return new NodeBookmark(this.anchor);
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(doc, json) {
      if (typeof json.anchor !== 'number') {
        throw new RangeError('Invalid input for NodeSelection.fromJSON');
      }
      return new NodeSelection(doc.resolve(json.anchor));
    }
  }, {
    key: 'create',
    value: function create$$1(doc, from) {
      return new this(doc.resolve(from));
    }
  }, {
    key: 'isSelectable',
    value: function isSelectable(node) {
      return !node.isText && node.type.spec.selectable !== false;
    }
  }]);

  return NodeSelection;
}(Selection);

NodeSelection.prototype.visible = false;

Selection.jsonID('node', NodeSelection);

var NodeBookmark = function () {
  function NodeBookmark(anchor) {
    _classCallCheck(this, NodeBookmark);

    this.anchor = anchor;
  }

  _createClass(NodeBookmark, [{
    key: 'map',
    value: function map(mapping) {
      var _mapping$mapResult2 = mapping.mapResult(this.anchor),
          deleted = _mapping$mapResult2.deleted,
          pos = _mapping$mapResult2.pos;

      return deleted ? new TextBookmark(pos, pos) : new NodeBookmark(pos);
    }
  }, {
    key: 'resolve',
    value: function resolve(doc) {
      var $pos = doc.resolve(this.anchor),
          node = $pos.nodeAfter;
      if (node && NodeSelection.isSelectable(node)) return new NodeSelection($pos);
      return Selection.near($pos);
    }
  }]);

  return NodeBookmark;
}();

var AllSelection = function (_Selection3) {
  _inherits(AllSelection, _Selection3);

  function AllSelection(doc) {
    _classCallCheck(this, AllSelection);

    return _possibleConstructorReturn(this, (AllSelection.__proto__ || _Object$getPrototypeOf(AllSelection)).call(this, doc.resolve(0), doc.resolve(doc.content.size)));
  }

  _createClass(AllSelection, [{
    key: 'toJSON',
    value: function toJSON() {
      return { type: 'all' };
    }
  }, {
    key: 'map',
    value: function map(doc) {
      return new AllSelection(doc);
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return other instanceof AllSelection;
    }
  }, {
    key: 'getBookmark',
    value: function getBookmark() {
      return AllBookmark;
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(doc) {
      return new AllSelection(doc);
    }
  }]);

  return AllSelection;
}(Selection);

Selection.jsonID('all', AllSelection);

var AllBookmark = {
  map: function map() {
    return this;
  },
  resolve: function resolve(doc) {
    return new AllSelection(doc);
  }
};

function findSelectionIn(doc, node, pos, index, dir, text) {
  if (node.inlineContent) return TextSelection.create(doc, pos);
  for (var i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
    var child = node.child(i);
    if (!child.isAtom) {
      var inner = findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
      if (inner) return inner;
    } else if (!text && NodeSelection.isSelectable(child)) {
      return NodeSelection.create(doc, pos - (dir < 0 ? child.nodeSize : 0));
    }
    pos += child.nodeSize * dir;
  }
}

function selectionToInsertionEnd(tr, startLen, bias) {
  var last = tr.steps.length - 1;
  if (last < startLen) return;
  var step = tr.steps[last];
  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) return;
  var map = tr.mapping.maps[last],
      end = void 0;
  map.forEach(function (_from, _to, _newFrom, newTo) {
    if (end == null) end = newTo;
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
}

var UPDATED_SEL = 1;
var UPDATED_MARKS = 2;
var UPDATED_SCROLL = 4;

var Transaction = function (_Transform) {
  _inherits(Transaction, _Transform);

  function Transaction(state) {
    _classCallCheck(this, Transaction);

    var _this = _possibleConstructorReturn(this, (Transaction.__proto__ || _Object$getPrototypeOf(Transaction)).call(this, state.doc));

    _this.time = Date.now();
    _this.curSelection = state.selection;
    _this.curSelectionFor = 0;
    _this.storedMarks = state.storedMarks;
    _this.updated = 0;
    _this.meta = _Object$create(null);
    return _this;
  }

  _createClass(Transaction, [{
    key: 'setSelection',
    value: function setSelection(selection) {
      this.curSelection = selection;
      this.curSelectionFor = this.steps.length;
      this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
      this.storedMarks = null;
      return this;
    }
  }, {
    key: 'setStoredMarks',
    value: function setStoredMarks(marks) {
      this.storedMarks = marks;
      this.updated |= UPDATED_MARKS;
      return this;
    }
  }, {
    key: 'ensureMarks',
    value: function ensureMarks(marks) {
      if (!Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks)) {
        this.setStoredMarks(marks);
      }
      return this;
    }
  }, {
    key: 'addStoredMark',
    value: function addStoredMark(mark) {
      return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()));
    }
  }, {
    key: 'removeStoredMark',
    value: function removeStoredMark(mark) {
      return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()));
    }
  }, {
    key: 'addStep',
    value: function addStep(step, doc) {
      _get(Transaction.prototype.__proto__ || _Object$getPrototypeOf(Transaction.prototype), 'addStep', this).call(this, step, doc);
      this.updated = this.updated & ~UPDATED_MARKS;
      this.storedMarks = null;
    }
  }, {
    key: 'setTime',
    value: function setTime(time) {
      this.time = time;
      return this;
    }
  }, {
    key: 'replaceSelection',
    value: function replaceSelection(slice) {
      this.selection.replace(this, slice);
      return this;
    }
  }, {
    key: 'replaceSelectionWith',
    value: function replaceSelectionWith(node, inheritMarks) {
      var selection = this.selection;
      if (inheritMarks !== false) {
        node = node.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || Mark.none));
      }
      selection.replaceWith(this, node);
      return this;
    }
  }, {
    key: 'deleteSelection',
    value: function deleteSelection() {
      this.selection.replace(this);
      return this;
    }
  }, {
    key: 'insertText',
    value: function insertText(text, from) {
      var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : from;

      var schema = this.doc.type.schema;

      if (from == null) {
        if (!text) return this.deleteSelection();
        return this.replaceSelectionWith(schema.text(text), true);
      } else {
        if (!text) return this.deleteRange(from, to);
        var marks = this.storedMarks;
        if (!marks) {
          var $from = this.doc.resolve(from);
          marks = to == from ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
        }
        return this.replaceRangeWith(from, to, schema.text(text, marks));
      }
    }
  }, {
    key: 'setMeta',
    value: function setMeta(key, value) {
      this.meta[typeof key === 'string' ? key : key.key] = value;
      return this;
    }
  }, {
    key: 'getMeta',
    value: function getMeta(key) {
      return this.meta[typeof key === 'string' ? key : key.key];
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView() {
      this.updated |= UPDATED_SCROLL;
      return this;
    }
  }, {
    key: 'selection',
    get: function get$$1() {
      if (this.curSelectionFor < this.steps.length) {
        this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
        this.curSelectionFor = this.steps.length;
      }
      return this.curSelection;
    }
  }, {
    key: 'selectionSet',
    get: function get$$1() {
      return (this.updated & UPDATED_SEL) > 0;
    }
  }, {
    key: 'storedMarksSet',
    get: function get$$1() {
      return (this.updated & UPDATED_MARKS) > 0;
    }
  }, {
    key: 'isGeneric',
    get: function get$$1() {
      for (var _ in this.meta) {
        return false;
      }
      return true;
    }
  }, {
    key: 'scrolledIntoView',
    get: function get$$1() {
      return (this.updated & UPDATED_SCROLL) > 0;
    }
  }]);

  return Transaction;
}(Transform);

function bind(f, self) {
  return !self || !f ? f : f.bind(self);
}

var FieldDesc = function FieldDesc(name, desc, self) {
  _classCallCheck(this, FieldDesc);

  this.name = name;
  this.init = bind(desc.init, self);
  this.apply = bind(desc.apply, self);
};

var baseFields = [new FieldDesc('doc', {
  init: function init(config) {
    return config.doc || config.schema.topNodeType.createAndFill();
  },
  apply: function apply(tr) {
    return tr.doc;
  }
}), new FieldDesc('selection', {
  init: function init(config, instance) {
    return config.selection || Selection.atStart(instance.doc);
  },
  apply: function apply(tr) {
    return tr.selection;
  }
}), new FieldDesc('storedMarks', {
  init: function init(config) {
    return config.storedMarks || null;
  },
  apply: function apply(tr, _marks, _old, state) {
    return state.selection.$cursor ? tr.storedMarks : null;
  }
}), new FieldDesc('scrollToSelection', {
  init: function init() {
    return 0;
  },
  apply: function apply(tr, prev) {
    return tr.scrolledIntoView ? prev + 1 : prev;
  }
})];

var Configuration = function Configuration(schema, plugins) {
  var _this = this;

  _classCallCheck(this, Configuration);

  this.schema = schema;
  this.fields = baseFields.concat();
  this.plugins = [];
  this.pluginsByKey = _Object$create(null);

  if (plugins) {
    plugins.forEach(function (plugin) {
      if (_this.pluginsByKey[plugin.key]) {
        throw new RangeError('Adding different instances of a keyed plugin (' + plugin.key + ')');
      }
      _this.plugins.push(plugin);
      _this.pluginsByKey[plugin.key] = plugin;
      if (plugin.spec.state) {
        _this.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
      }
    });
  }
};

var EditorState = function () {
  function EditorState(config) {
    _classCallCheck(this, EditorState);

    this.config = config;
  }

  _createClass(EditorState, [{
    key: 'apply',
    value: function apply(tr) {
      return this.applyTransaction(tr).state;
    }
  }, {
    key: 'filterTransaction',
    value: function filterTransaction(tr) {
      var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      var len = this.config.plugins.length;
      for (var i = 0; i < len; i++) {
        if (i !== ignore) {
          var plugin = this.config.plugins[i];
          if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'applyTransaction',
    value: function applyTransaction(rootTr) {
      if (!this.filterTransaction(rootTr)) {
        return { state: this, transactions: [] };
      }

      var trs = [rootTr],
          newState = this.applyInner(rootTr),
          seen = null;
      outer: for (;;) {
        var haveNew = false;
        for (var i = 0; i < this.config.plugins.length; i++) {
          var plugin = this.config.plugins[i];
          if (plugin.spec.appendTransaction) {
            var n = seen ? seen[i].n : 0,
                oldState = seen ? seen[i].state : this;
            var tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
            if (tr && newState.filterTransaction(tr, i)) {
              tr.setMeta('appendedTransaction', rootTr);
              if (!seen) {
                seen = [];
                for (var j = 0; j < this.config.plugins.length; j++) {
                  seen.push(j < i ? { state: newState, n: trs.length } : { state: this, n: 0 });
                }
              }
              trs.push(tr);
              newState = newState.applyInner(tr);
              haveNew = true;
            }
            if (seen) {
              seen[i] = { state: newState, n: trs.length };
            }
          }
        }
        if (!haveNew) {
          return { state: newState, transactions: trs };
        }
      }
    }
  }, {
    key: 'applyInner',
    value: function applyInner(tr) {
      if (!tr.before.eq(this.doc)) {
        throw new RangeError('Applying a mismatched transaction');
      }

      var newInstance = new EditorState(this.config),
          fields = this.config.fields;
      for (var i = 0, len = fields.length; i < len; i++) {
        var field = fields[i];
        newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
      }
      for (var _i = 0, len1 = applyListeners.length; _i < len1; _i++) {
        applyListeners[_i](this, tr, newInstance);
      }
      return newInstance;
    }
  }, {
    key: 'reconfigure',
    value: function reconfigure(config) {
      var $config = new Configuration(config.schema || this.schema, config.plugins);
      var fields = $config.fields,
          instance = new EditorState($config);
      for (var i = 0, len = fields.length; i < len; i++) {
        var name = fields[i].name;
        instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
      }
      return instance;
    }
  }, {
    key: 'toJSON',
    value: function toJSON(pluginFields) {
      var result = {
        doc: this.doc.toJSON(),
        selection: this.selection.toJSON()
      };
      if (this.storedMarks) result.storedMarks = this.storedMarks.map(function (m) {
        return m.toJSON();
      });
      if (pluginFields && (typeof pluginFields === 'undefined' ? 'undefined' : _typeof(pluginFields)) === 'object') {
        for (var prop in pluginFields) {
          if (prop === 'doc' || prop === 'selection') {
            throw new RangeError('The JSON fields `doc` and `selection` are reserved');
          }
          var plugin = pluginFields[prop],
              state = plugin.spec.state;
          if (state && state.toJSON) result[prop] = state.toJSON.call(plugin, this[plugin.key]);
        }
      }
      return result;
    }
  }, {
    key: 'schema',
    get: function get() {
      return this.config.schema;
    }
  }, {
    key: 'plugins',
    get: function get() {
      return this.config.plugins;
    }
  }, {
    key: 'tr',
    get: function get() {
      return new Transaction(this);
    }
  }], [{
    key: 'create',
    value: function create$$1(config) {
      var $config = new Configuration(config.schema || config.doc.type.schema, config.plugins);
      var instance = new EditorState($config);
      for (var i = 0, len = $config.fields.length; i < len; i++) {
        instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
      }
      return instance;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(config, json, pluginFields) {
      if (!json) throw new RangeError('Invalid input for EditorState.fromJSON');
      if (!config.schema) throw new RangeError('Required config field "schema" missing');
      var $config = new Configuration(config.schema, config.plugins);
      var instance = new EditorState($config);
      $config.fields.forEach(function (field) {
        if (field.name === 'doc') {
          instance.doc = Node$1.fromJSON(config.schema, json.doc);
        } else if (field.name === 'selection') {
          instance.selection = Selection.fromJSON(instance.doc, json.selection);
        } else if (field.name === 'storedMarks') {
          if (json.storedMarks) instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
        } else {
          if (pluginFields) {
            for (var prop in pluginFields) {
              var plugin = pluginFields[prop],
                  state = plugin.spec.state;
              if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
                // This field belongs to a plugin mapped to a JSON field, read it from there.
                instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
                return;
              }
            }
          }
          instance[field.name] = field.init(config, instance);
        }
      });
      return instance;
    }
  }, {
    key: 'addApplyListener',
    value: function addApplyListener(f) {
      applyListeners.push(f);
    }
  }, {
    key: 'removeApplyListener',
    value: function removeApplyListener(f) {
      var found = applyListeners.indexOf(f);
      if (found > -1) applyListeners.splice(found, 1);
    }
  }]);

  return EditorState;
}();

var applyListeners = [];

function bindProps(obj, self, target) {
  for (var prop in obj) {
    var val = obj[prop];
    if (val instanceof Function) {
      val = val.bind(self);
    } else if (prop === 'handleDOMEvents') {
      val = bindProps(val, self, {});
    }
    target[prop] = val;
  }
  return target;
}

var Plugin = function () {
  function Plugin(spec) {
    _classCallCheck(this, Plugin);

    this.props = {};
    if (spec.props) {
      bindProps(spec.props, this, this.props);
    }
    this.spec = spec;
    this.key = spec.key ? spec.key.key : createKey('plugin');
  }

  _createClass(Plugin, [{
    key: 'getState',
    value: function getState(state) {
      return state[this.key];
    }
  }]);

  return Plugin;
}();

var keys = _Object$create(null);
function createKey(name) {
  if (name in keys) {
    return name + '$' + ++keys[name];
  }
  keys[name] = 0;
  return name + '$';
}

var PluginKey = function () {
  function PluginKey() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'key';

    _classCallCheck(this, PluginKey);

    this.key = createKey(name);
  }

  _createClass(PluginKey, [{
    key: 'get',
    value: function get(state) {
      return state.config.pluginsByKey[this.key];
    }
  }, {
    key: 'getState',
    value: function getState(state) {
      return state[this.key];
    }
  }]);

  return PluginKey;
}();

var result = {};

if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
  var ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
  // ie <= 10
  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  // ie >= 11
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);

  result.mac = /Mac/.test(navigator.platform);
  var ie = result.ie = !!(ie_upto10 || ie_11up || ie_edge);
  result.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
  // Moz
  result.gecko = !ie && /gecko\/(\d+)/i.test(navigator.userAgent);
  result.gecko_version = result.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];

  var chrome = !ie && /Chrome\/(\d+)/.exec(navigator.userAgent);
  result.chrome = !!chrome;
  result.chrome_version = chrome && +chrome[1];
  result.ios = !ie && /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  result.android = /Android \d/.test(navigator.userAgent);
  result.webkit = !ie && 'WebkitAppearance' in document.documentElement.style;
  result.safari = /Apple Computer/.test(navigator.vendor);
  result.webkit_version = result.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
}

var domIndex = function domIndex(node) {
  for (var index = 0;; index++) {
    node = node.previousSibling;
    if (!node) return index;
  }
};

var parentNode = function parentNode(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType === 11 ? parent.host : parent;
};

var textRange = function textRange(node, from, to) {
  var range = document.createRange();
  range.setEnd(node, to == null ? node.nodeValue.length : to);
  range.setStart(node, from || 0);
  return range;
};

var isEquivalentPosition = function isEquivalentPosition(node, off, targetNode, targetOff) {
  return targetNode && (scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1));
};

var atomElements = /^(img|br|input|textarea|hr)$/i;

function scanFor(node, off, targetNode, targetOff, dir) {
  for (;;) {
    if (node === targetNode && off == targetOff) return true;

    if (off == (dir < 0 ? 0 : nodeSize(node)) || node.nodeType === 3 && node.nodeValue === '\uFEFF') {
      var parent = node.parentNode;
      if (parent.nodeType !== 1 || hasBlockDesc(node) || atomElements.test(node.nodeName) || node.contentEditable === 'false') {
        return false;
      }

      off = domIndex(node) + (dir < 0 ? 0 : 1);
      node = parent;
    } else if (node.nodeType === 1) {
      node = node.childNodes[off + (dir < 0 ? -1 : 0)];
      off = dir < 0 ? nodeSize(node) : 0;
    } else {
      return false;
    }
  }
}

function nodeSize(node) {
  return node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length;
}

function hasBlockDesc(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock;
}

// Work around Chrome issue https://bugs.chromium.org/p/chromium/issues/detail?id=447523
// (isCollapsed inappropriately returns true in shadow dom)
var selectionCollapsed = function selectionCollapsed(domSel) {
  var collapsed = domSel.isCollapsed;
  if (collapsed && result.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed) collapsed = false;
  return collapsed;
};

function windowRect(win) {
  return {
    left: 0,
    right: win.innerWidth,
    top: 0,
    bottom: win.innerHeight
  };
}

function getSide(value, side) {
  return typeof value === 'number' ? value : value[side];
}

function scrollRectIntoView(view, rect, startDOM) {
  var scrollThreshold = view.someProp('scrollThreshold') || 0,
      scrollMargin = view.someProp('scrollMargin') || 5;
  var doc = view.dom.ownerDocument,
      win = doc.defaultView;
  for (var parent = startDOM || view.dom;; parent = parentNode(parent)) {
    if (!parent) break;
    if (parent.nodeType !== 1) continue;
    var atTop = parent == doc.body || parent.nodeType !== 1;
    var bounding = atTop ? windowRect(win) : parent.getBoundingClientRect();
    var moveX = 0,
        moveY = 0;
    if (rect.top < bounding.top + getSide(scrollThreshold, 'top')) moveY = -(bounding.top - rect.top + getSide(scrollMargin, 'top'));else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, 'bottom')) moveY = rect.bottom - bounding.bottom + getSide(scrollMargin, 'bottom');
    if (rect.left < bounding.left + getSide(scrollThreshold, 'left')) moveX = -(bounding.left - rect.left + getSide(scrollMargin, 'left'));else if (rect.right > bounding.right - getSide(scrollThreshold, 'right')) moveX = rect.right - bounding.right + getSide(scrollMargin, 'right');
    if (moveX || moveY) {
      if (atTop) {
        win.scrollBy(moveX, moveY);
      } else {
        if (moveY) parent.scrollTop += moveY;
        if (moveX) parent.scrollLeft += moveX;
      }
    }
    if (atTop) break;
  }
}

function storeScrollPos(view) {
  var rect = view.dom.getBoundingClientRect(),
      startY = Math.max(0, rect.top);
  var doc = view.dom.ownerDocument;
  var refDOM = void 0,
      refTop = void 0;
  for (var x = (rect.left + rect.right) / 2, y = startY + 1; y < Math.min(innerHeight, rect.bottom); y += 5) {
    var dom = view.root.elementFromPoint(x, y);
    if (dom == view.dom || !view.dom.contains(dom)) continue;
    var localRect = dom.getBoundingClientRect();
    if (localRect.top >= startY - 20) {
      refDOM = dom;
      refTop = localRect.top;
      break;
    }
  }
  var stack = [];
  for (var _dom = view.dom; _dom; _dom = parentNode(_dom)) {
    stack.push({ dom: _dom, top: _dom.scrollTop, left: _dom.scrollLeft });
    if (_dom == doc.body) break;
  }
  return { refDOM: refDOM, refTop: refTop, stack: stack };
}

function resetScrollPos(_ref) {
  var refDOM = _ref.refDOM,
      refTop = _ref.refTop,
      stack = _ref.stack;

  var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
  var dTop = newRefTop == 0 ? 0 : newRefTop - refTop;
  for (var i = 0; i < stack.length; i++) {
    var _stack$i = stack[i],
        dom = _stack$i.dom,
        top = _stack$i.top,
        left = _stack$i.left;

    if (dom.scrollTop != top + dTop) dom.scrollTop = top + dTop;
    if (dom.scrollLeft != left) dom.scrollLeft = left;
  }
}

function findOffsetInNode(node, coords) {
  var closest = void 0,
      dxClosest = 2e8,
      coordsClosest = void 0,
      offset = 0;
  var rowBot = coords.top,
      rowTop = coords.top;
  for (var child = node.firstChild, childIndex = 0; child; child = child.nextSibling, childIndex++) {
    var rects = void 0;
    if (child.nodeType === 1) rects = child.getClientRects();else if (child.nodeType === 3) rects = textRange(child).getClientRects();else continue;

    for (var i = 0; i < rects.length; i++) {
      var rect = rects[i];
      if (rect.top <= rowBot && rect.bottom >= rowTop) {
        rowBot = Math.max(rect.bottom, rowBot);
        rowTop = Math.min(rect.top, rowTop);
        var dx = rect.left > coords.left ? rect.left - coords.left : rect.right < coords.left ? coords.left - rect.right : 0;
        if (dx < dxClosest) {
          closest = child;
          dxClosest = dx;
          coordsClosest = dx && closest.nodeType === 3 ? { left: rect.right < coords.left ? rect.right : rect.left, top: coords.top } : coords;
          if (child.nodeType === 1 && dx) offset = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0);
          continue;
        }
      }
      if (!closest && (coords.left >= rect.right && coords.top >= rect.top || coords.left >= rect.left && coords.top >= rect.bottom)) offset = childIndex + 1;
    }
  }
  if (closest && closest.nodeType === 3) return findOffsetInText(closest, coordsClosest);
  if (!closest || dxClosest && closest.nodeType === 1) return { node: node, offset: offset };
  return findOffsetInNode(closest, coordsClosest);
}

function findOffsetInText(node, coords) {
  var len = node.nodeValue.length;
  var range = document.createRange();
  for (var i = 0; i < len; i++) {
    range.setEnd(node, i + 1);
    range.setStart(node, i);
    var rect = singleRect(range, 1);
    if (rect.top == rect.bottom) continue;
    if (rect.left - 1 <= coords.left && rect.right + 1 >= coords.left && rect.top - 1 <= coords.top && rect.bottom + 1 >= coords.top) return { node: node, offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0) };
  }
  return { node: node, offset: 0 };
}

function targetKludge(dom, coords) {
  var parent = dom.parentNode;
  if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left) return parent;
  return dom;
}

function posFromElement(view, elt, coords) {
  if (!view.dom.contains(elt.nodeType !== 1 ? elt.parentNode : elt)) return null;

  var _findOffsetInNode = findOffsetInNode(elt, coords),
      node = _findOffsetInNode.node,
      offset = _findOffsetInNode.offset,
      bias = -1;

  if (node.nodeType === 1 && !node.firstChild) {
    var rect = node.getBoundingClientRect();
    bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
  }
  return view.docView.posFromDOM(node, offset, bias);
}

function posFromCaret(view, node, offset, coords) {
  var outside = -1;
  for (var cur = node;;) {
    if (cur == view.dom) break;
    var desc = view.docView.nearestDesc(cur, true);
    if (!desc) return null;
    if (desc.node.isBlock && desc.parent) {
      var rect = desc.dom.getBoundingClientRect();
      if (rect.left > coords.left || rect.top > coords.top) outside = desc.posBefore;else if (rect.right < coords.left || rect.bottom < coords.top) outside = desc.posAfter;else break;
    }
    cur = desc.dom.parentNode;
  }
  return outside > -1 ? outside : view.docView.posFromDOM(node, offset);
}

function posAtCoords(view, coords) {
  var root = view.root,
      node = void 0,
      offset = void 0;
  if (root.caretPositionFromPoint) {
    var _pos = root.caretPositionFromPoint(coords.left, coords.top);
    if (_pos) {
      
      node = _pos.offsetNode;
      offset = _pos.offset;
    }
  }
  if (!node && root.caretRangeFromPoint) {
    var range = root.caretRangeFromPoint(coords.left, coords.top);
    if (range) {
      
      node = range.startContainer;
      offset = range.startOffset;
    }
  }

  var elt = root.elementFromPoint(coords.left, coords.top + 1),
      pos = void 0;
  if (!elt) return null;
  elt = targetKludge(elt, coords);
  if (node) {
    if (node == view.dom && offset == node.childNodes.length - 1 && node.lastChild.nodeType === 1 && coords.top > node.lastChild.getBoundingClientRect().bottom) pos = view.state.doc.content.size;else if (offset == 0 || node.nodeType !== 1 || node.childNodes[offset - 1].nodeName !== 'BR') pos = posFromCaret(view, node, offset, coords);
  }
  if (pos == null) {
    pos = posFromElement(view, elt, coords);
    if (pos == null) return null;
  }

  var desc = view.docView.nearestDesc(elt, true);
  return { pos: pos, inside: desc ? desc.posAtStart - desc.border : -1 };
}

function singleRect(object, bias) {
  var rects = object.getClientRects();
  return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1];
}

function coordsAtPos(view, pos) {
  var _view$docView$domFrom = view.docView.domFromPos(pos),
      node = _view$docView$domFrom.node,
      offset = _view$docView$domFrom.offset;

  var side = void 0,
      rect = void 0;
  if (node.nodeType === 3) {
    if (offset < node.nodeValue.length) {
      rect = singleRect(textRange(node, offset, offset + 1), -1);
      side = 'left';
    }
    if ((!rect || rect.left == rect.right) && offset) {
      rect = singleRect(textRange(node, offset - 1, offset), 1);
      side = 'right';
    }
  } else if (node.firstChild) {
    if (offset < node.childNodes.length) {
      var child = node.childNodes[offset];
      rect = singleRect(child.nodeType === 3 ? textRange(child) : child, -1);
      side = 'left';
    }
    if ((!rect || rect.top == rect.bottom) && offset) {
      var _child = node.childNodes[offset - 1];
      rect = singleRect(_child.nodeType === 3 ? textRange(_child) : _child, 1);
      side = 'right';
    }
  } else {
    rect = node.getBoundingClientRect();
    side = 'left';
  }
  var x = rect[side];
  return { top: rect.top, bottom: rect.bottom, left: x, right: x };
}

function withFlushedState(view, state, f) {
  var viewState = view.state,
      active = view.root.activeElement;
  if (viewState != state || !view.inDOMChange) view.updateState(state);
  if (active != view.dom) view.focus();
  try {
    return f();
  } finally {
    if (viewState != state) view.updateState(viewState);
    if (active != view.dom) active.focus();
  }
}

function endOfTextblockVertical(view, state, dir) {
  var sel = state.selection;
  var $pos = dir === 'up' ? sel.$anchor.min(sel.$head) : sel.$anchor.max(sel.$head);
  if (!$pos.depth) return false;
  return withFlushedState(view, state, function () {
    var _view$docView$domFrom2 = view.docView.domFromPos($pos.pos),
        dom = _view$docView$domFrom2.node;

    for (;;) {
      var nearest = view.docView.nearestDesc(dom, true);
      if (!nearest || nearest.node.isBlock) break;
      dom = nearest.dom.parentNode;
    }
    var coords = coordsAtPos(view, $pos.pos);
    for (var child = dom.firstChild; child; child = child.nextSibling) {
      var boxes = void 0;
      if (child.nodeType === 1) boxes = child.getClientRects();else if (child.nodeType === 3) boxes = textRange(child, 0, child.nodeValue.length).getClientRects();else continue;
      for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.bottom > box.top && (dir === 'up' ? box.bottom < coords.top + 1 : box.top > coords.bottom - 1)) return false;
      }
    }
    return true;
  });
}

var maybeRTL = /[\u0590-\u08ac]/;

function endOfTextblockHorizontal(view, state, dir) {
  var $head = state.selection.$head;

  if (!$head.parent.isTextblock || !$head.depth) return false;
  var offset = $head.parentOffset,
      atStart = !offset,
      atEnd = offset == $head.parent.content.size;
  var sel = getSelection();
  // If the textblock is all LTR, or the browser doesn't support
  // Selection.modify (Edge), fall back to a primitive approach
  if (!maybeRTL.test($head.parent.textContent) || !sel.modify) return dir === 'left' || dir === 'backward' ? atStart : atEnd;

  return withFlushedState(view, state, function () {
    var oldRange = sel.getRangeAt(0),
        oldNode = sel.focusNode,
        oldOff = sel.focusOffset;
    sel.modify('move', dir, 'character');
    var parentDOM = view.docView.domAfterPos($head.before());
    var result = !parentDOM.contains(sel.focusNode.nodeType === 1 ? sel.focusNode : sel.focusNode.parentNode) || oldNode == sel.focusNode && oldOff == sel.focusOffset;
    // Restore the previous selection
    sel.removeAllRanges();
    sel.addRange(oldRange);
    return result;
  });
}

var cachedState = null;
var cachedDir = null;
var cachedResult = false;
function endOfTextblock(view, state, dir) {
  if (cachedState == state && cachedDir == dir) return cachedResult;
  cachedState = state;cachedDir = dir;
  return cachedResult = dir === 'up' || dir === 'down' ? endOfTextblockVertical(view, state, dir) : endOfTextblockHorizontal(view, state, dir);
}

var NOT_DIRTY = 0;
var CHILD_DIRTY = 1;
var CONTENT_DIRTY = 2;
var NODE_DIRTY = 3;

var ViewDesc = function () {
  function ViewDesc(parent, children, dom, contentDOM) {
    _classCallCheck(this, ViewDesc);

    this.parent = parent;
    this.children = children;
    this.dom = dom;
    dom.pmViewDesc = this;
    this.contentDOM = contentDOM;
    this.dirty = NOT_DIRTY;
  }

  // Used to check whether a given description corresponds to a
  // widget/mark/node.


  _createClass(ViewDesc, [{
    key: 'matchesWidget',
    value: function matchesWidget() {
      return false;
    }
  }, {
    key: 'matchesMark',
    value: function matchesMark() {
      return false;
    }
  }, {
    key: 'matchesNode',
    value: function matchesNode() {
      return false;
    }
  }, {
    key: 'matchesHack',
    value: function matchesHack() {
      return false;
    }
  }, {
    key: 'parseRule',
    value: function parseRule() {
      return null;
    }
  }, {
    key: 'stopEvent',
    value: function stopEvent() {
      return false;
    }

    // The size of the content represented by this desc.

  }, {
    key: 'destroy',
    value: function destroy() {
      this.parent = null;
      if (this.dom.pmViewDesc === this) {
        this.dom.pmViewDesc = null;
      }

      for (var i = 0, len = this.children.length; i < len; i++) {
        this.children[i].destroy();
      }
    }
  }, {
    key: 'posBeforeChild',
    value: function posBeforeChild(child) {
      for (var i = 0, pos = this.posAtStart; i < this.children.length; i++) {
        var cur = this.children[i];
        if (cur == child) return pos;
        pos += cur.size;
      }
    }
  }, {
    key: 'localPosFromDOM',


    // : (dom.Node, number, ?number) → number
    value: function localPosFromDOM(dom, offset, bias) {
      // If the DOM position is in the content, use the child desc after
      // it to figure out a position.
      if (this.contentDOM && this.contentDOM.contains(dom.nodeType === 1 ? dom : dom.parentNode)) {
        if (bias < 0) {
          var domBefore = void 0,
              desc = void 0;
          if (dom == this.contentDOM) {
            domBefore = dom.childNodes[offset - 1];
          } else {
            while (dom.parentNode != this.contentDOM) {
              dom = dom.parentNode;
            }domBefore = dom.previousSibling;
          }
          while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent === this)) {
            domBefore = domBefore.previousSibling;
          }return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart;
        } else {
          var domAfter = void 0,
              _desc = void 0;
          if (dom == this.contentDOM) {
            domAfter = dom.childNodes[offset];
          } else {
            while (dom.parentNode != this.contentDOM) {
              dom = dom.parentNode;
            }domAfter = dom.nextSibling;
          }
          while (domAfter && !((_desc = domAfter.pmViewDesc) && _desc.parent == this)) {
            domAfter = domAfter.nextSibling;
          }return domAfter ? this.posBeforeChild(_desc) : this.posAtEnd;
        }
      }
      // Otherwise, use various heuristics, falling back on the bias
      // parameter, to determine whether to return the position at the
      // start or at the end of this view desc.
      var atEnd = void 0;
      if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
        atEnd = dom.compareDocumentPosition(this.contentDOM) & 2;
      } else if (this.dom.firstChild) {
        if (offset == 0) for (var search = dom;; search = search.parentNode) {
          if (search == this.dom) {
            atEnd = false;break;
          }
          if (search.parentNode.firstChild != search) break;
        }
        if (atEnd == null && offset == dom.childNodes.length) for (var _search = dom;; _search = _search.parentNode) {
          if (_search == this.dom) {
            atEnd = true;break;
          }
          if (_search.parentNode.lastChild != _search) break;
        }
      }
      return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart;
    }

    // Scan up the dom finding the first desc that is a descendant of
    // this one.

  }, {
    key: 'nearestDesc',
    value: function nearestDesc(dom, onlyNodes) {
      for (var first = true, cur = dom; cur; cur = cur.parentNode) {
        var desc = this.getDesc(cur);
        if (desc && (!onlyNodes || desc.node)) {
          // If dom is outside of this desc's nodeDOM, don't count it.
          if (first && desc.nodeDOM && !(desc.nodeDOM.nodeType === 1 ? desc.nodeDOM.contains(dom) : desc.nodeDOM == dom)) first = false;else return desc;
        }
      }
    }
  }, {
    key: 'getDesc',
    value: function getDesc(dom) {
      var desc = dom.pmViewDesc;
      for (var cur = desc; cur; cur = cur.parent) {
        if (cur === this) return desc;
      }
    }
  }, {
    key: 'posFromDOM',
    value: function posFromDOM(dom, offset, bias) {
      for (var scan = dom;; scan = scan.parentNode) {
        var desc = this.getDesc(scan);
        if (desc) return desc.localPosFromDOM(dom, offset, bias);
      }
    }
  }, {
    key: 'descAt',
    value: function descAt(pos) {
      for (var i = 0, offset = 0; i < this.children.length; i++) {
        var child = this.children[i],
            end = offset + child.size;
        if (offset == pos && end != offset) {
          while (!child.border && child.children.length) {
            child = child.children[0];
          }return child;
        }
        if (pos < end) return child.descAt(pos - offset - child.border);
        offset = end;
      }
    }
  }, {
    key: 'domFromPos',
    value: function domFromPos(pos) {
      if (!this.contentDOM) {
        return {
          node: this.dom,
          offset: 0
        };
      }

      for (var offset = 0, i = 0;; i++) {
        if (offset == pos) {
          while (i < this.children.length && this.children[i].beforePosition) {
            i++;
          }

          return {
            node: this.contentDOM,
            offset: i
          };
        }

        if (i === this.children.length) {
          throw new Error('Invalid position ' + pos);
        }

        var child = this.children[i],
            end = offset + child.size;
        if (pos < end) {
          return child.domFromPos(pos - offset - child.border);
        }

        offset = end;
      }
    }

    // Used to find a DOM range in a single parent for a given changed
    // range.

  }, {
    key: 'parseRange',
    value: function parseRange(from, to) {
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (this.children.length === 0) {
        return {
          node: this.contentDOM,
          from: from,
          to: to,
          fromOffset: 0,
          toOffset: this.contentDOM.childNodes.length
        };
      }

      var fromOffset = -1,
          toOffset = -1;
      for (var offset = 0, i = 0;; i++) {
        var child = this.children[i],
            end = offset + child.size;
        if (fromOffset == -1 && from <= end) {
          var childBase = offset + child.border;
          // FIXME maybe descend mark views to parse a narrower range?
          if (from >= childBase && to <= end - child.border && child.node && child.contentDOM && this.contentDOM.contains(child.contentDOM)) {
            return child.parseRange(from - childBase, to - childBase, base + childBase);
          }

          from = base + offset;
          for (var j = i; j > 0; j--) {
            var prev = this.children[j - 1];
            if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
              fromOffset = domIndex(prev.dom) + 1;
              break;
            }
            from -= prev.size;
          }
          if (fromOffset == -1) fromOffset = 0;
        }
        if (fromOffset > -1 && to <= end) {
          to = base + end;
          for (var _j = i + 1; _j < this.children.length; _j++) {
            var next = this.children[_j];
            if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
              toOffset = domIndex(next.dom);
              break;
            }
            to += next.size;
          }
          if (toOffset == -1) toOffset = this.contentDOM.childNodes.length;
          break;
        }
        offset = end;
      }
      return { node: this.contentDOM, from: from, to: to, fromOffset: fromOffset, toOffset: toOffset };
    }
  }, {
    key: 'emptyChildAt',
    value: function emptyChildAt(side) {
      if (this.border || !this.contentDOM || !this.children.length) return false;
      var child = this.children[side < 0 ? 0 : this.children.length - 1];
      return child.size == 0 || child.emptyChildAt(side);
    }

    // : (number) → dom.Node

  }, {
    key: 'domAfterPos',
    value: function domAfterPos(pos) {
      var _domFromPos = this.domFromPos(pos),
          node = _domFromPos.node,
          offset = _domFromPos.offset;

      if (node.nodeType !== 1 || offset == node.childNodes.length) throw new RangeError('No node after pos ' + pos);
      return node.childNodes[offset];
    }
  }, {
    key: 'setSelection',
    value: function setSelection(anchor, head, root) {
      // If the selection falls entirely in a child, give it to that child
      var from = Math.min(anchor, head);
      var to = Math.max(anchor, head);
      for (var i = 0, offset = 0; i < this.children.length; i++) {
        var child = this.children[i];
        var end = offset + child.size;
        console.log(child);
        console.log(end);

        if (from > offset && to < end) {
          return child.setSelection(anchor - offset - child.border, head - offset - child.border, root);
        }
        offset = end;
      }

      var anchorDOM = this.domFromPos(anchor),
          headDOM = this.domFromPos(head);
      var domSel = root.getSelection(),
          range = document.createRange();

      if (isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) && isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset)) {
        return;
      }

      if (domSel.extend) {
        range.setEnd(anchorDOM.node, anchorDOM.offset);
        range.collapse(false);
      } else {
        if (anchor > head) {
          var tmp = anchorDOM;
          anchorDOM = headDOM;
          headDOM = tmp;
        }

        range.setEnd(headDOM.node, headDOM.offset);
        range.setStart(anchorDOM.node, anchorDOM.offset);
      }

      domSel.removeAllRanges();
      domSel.addRange(range);

      if (domSel.extend) {
        domSel.extend(headDOM.node, headDOM.offset);
      }
    }

    // : (dom.MutationRecord) → bool

  }, {
    key: 'ignoreMutation',
    value: function ignoreMutation(_mutation) {
      return !this.contentDOM;
    }
  }, {
    key: 'markDirty',


    // Remove a subtree of the element tree that has been touched
    // by a DOM change, so that the next update will redraw it.
    value: function markDirty(from, to) {
      for (var offset = 0, i = 0; i < this.children.length; i++) {
        var child = this.children[i],
            end = offset + child.size;
        if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
          var startInside = offset + child.border,
              endInside = end - child.border;
          if (from >= startInside && to <= endInside) {
            this.dirty = from == offset || to == end ? CONTENT_DIRTY : CHILD_DIRTY;
            if (from == startInside && to == endInside && child.contentLost) child.dirty = NODE_DIRTY;else child.markDirty(from - startInside, to - startInside);
            return;
          } else {
            child.dirty = NODE_DIRTY;
          }
        }
        offset = end;
      }
      this.dirty = CONTENT_DIRTY;
    }
  }, {
    key: 'beforePosition',
    get: function get$$1() {
      return false;
    }
  }, {
    key: 'size',
    get: function get$$1() {
      var size = 0;
      for (var i = 0, len = this.children.length; i < len; i++) {
        size += this.children[i].size;
      }
      return size;
    }

    // For block nodes, this represents the space taken up by their
    // start/end tokens.

  }, {
    key: 'border',
    get: function get$$1() {
      return 0;
    }
  }, {
    key: 'posBefore',
    get: function get$$1() {
      return this.parent.posBeforeChild(this);
    }
  }, {
    key: 'posAtStart',
    get: function get$$1() {
      return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
    }
  }, {
    key: 'posAfter',
    get: function get$$1() {
      return this.posBefore + this.size;
    }
  }, {
    key: 'posAtEnd',
    get: function get$$1() {
      return this.posAtStart + this.size - 2 * this.border;
    }
  }, {
    key: 'contentLost',
    get: function get$$1() {
      return this.contentDOM && this.contentDOM !== this.dom && !this.dom.contains(this.contentDOM);
    }
  }]);

  return ViewDesc;
}();

var nothing = [];

var WidgetViewDesc = function (_ViewDesc) {
  _inherits(WidgetViewDesc, _ViewDesc);

  function WidgetViewDesc(parent, widget, view, pos) {
    _classCallCheck(this, WidgetViewDesc);

    var self = void 0,
        dom = widget.type.toDOM;
    if (typeof dom === 'function') dom = dom(view, function () {
      if (!self) return pos;
      if (self.parent) return self.parent.posBeforeChild(self);
    });
    if (!widget.type.spec.raw) {
      if (dom.nodeType !== 1) {
        var wrap = document.createElement('span');
        wrap.appendChild(dom);
        dom = wrap;
      }
      dom.contentEditable = false;
      dom.classList.add('ProseMirror-widget');
    }

    var _this = _possibleConstructorReturn(this, (WidgetViewDesc.__proto__ || _Object$getPrototypeOf(WidgetViewDesc)).call(this, parent, nothing, dom, null));

    _this.widget = widget;
    self = _this;
    return _this;
  }

  _createClass(WidgetViewDesc, [{
    key: 'matchesWidget',
    value: function matchesWidget(widget) {
      return this.dirty == NOT_DIRTY && widget.type.eq(this.widget.type);
    }
  }, {
    key: 'parseRule',
    value: function parseRule() {
      return { ignore: true };
    }
  }, {
    key: 'stopEvent',
    value: function stopEvent(event) {
      var stop = this.widget.spec.stopEvent;
      return stop ? stop(event) : false;
    }
  }, {
    key: 'beforePosition',
    get: function get$$1() {
      return this.widget.type.side < 0;
    }
  }]);

  return WidgetViewDesc;
}(ViewDesc);

var CursorWrapperDesc = function (_WidgetViewDesc) {
  _inherits(CursorWrapperDesc, _WidgetViewDesc);

  function CursorWrapperDesc() {
    _classCallCheck(this, CursorWrapperDesc);

    return _possibleConstructorReturn(this, (CursorWrapperDesc.__proto__ || _Object$getPrototypeOf(CursorWrapperDesc)).apply(this, arguments));
  }

  _createClass(CursorWrapperDesc, [{
    key: 'parseRule',
    value: function parseRule() {
      var content = void 0;
      for (var child = this.dom.firstChild; child; child = child.nextSibling) {
        var add = void 0;
        if (child.nodeType === 3) {
          var text = child.nodeValue.replace(/\ufeff/g, '');
          if (!text) continue;
          add = document.createTextNode(text);
        } else if (child.textContent === '\uFEFF') {
          continue;
        } else {
          add = child.cloneNode(true);
        }
        if (!content) content = document.createDocumentFragment();
        content.appendChild(add);
      }
      if (content) return { skip: content };else return _get(CursorWrapperDesc.prototype.__proto__ || _Object$getPrototypeOf(CursorWrapperDesc.prototype), 'parseRule', this).call(this);
    }
  }, {
    key: 'ignoreMutation',
    value: function ignoreMutation() {
      return false;
    }
  }]);

  return CursorWrapperDesc;
}(WidgetViewDesc);

var MarkViewDesc = function (_ViewDesc2) {
  _inherits(MarkViewDesc, _ViewDesc2);

  function MarkViewDesc(parent, mark, dom, contentDOM) {
    _classCallCheck(this, MarkViewDesc);

    var _this3 = _possibleConstructorReturn(this, (MarkViewDesc.__proto__ || _Object$getPrototypeOf(MarkViewDesc)).call(this, parent, [], dom, contentDOM));

    _this3.mark = mark;
    return _this3;
  }

  _createClass(MarkViewDesc, [{
    key: 'parseRule',
    value: function parseRule() {
      return { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
    }
  }, {
    key: 'matchesMark',
    value: function matchesMark(mark) {
      return this.dirty != NODE_DIRTY && this.mark.eq(mark);
    }
  }, {
    key: 'markDirty',
    value: function markDirty(from, to) {
      _get(MarkViewDesc.prototype.__proto__ || _Object$getPrototypeOf(MarkViewDesc.prototype), 'markDirty', this).call(this, from, to);
      // Move dirty info to nearest node view
      if (this.dirty != NOT_DIRTY) {
        var parent = this.parent;
        while (!parent.node) {
          parent = parent.parent;
        }if (parent.dirty < this.dirty) parent.dirty = this.dirty;
        this.dirty = NOT_DIRTY;
      }
    }
  }], [{
    key: 'create',
    value: function create$$1(parent, mark, inline, view) {
      var custom = customNodeViews(view)[mark.type.name];
      var spec = custom && custom(mark, view, inline);
      if (!spec || !spec.dom) spec = DOMSerializer.renderSpec(document, mark.type.spec.toDOM(mark, inline));
      return new MarkViewDesc(parent, mark, spec.dom, spec.contentDOM || spec.dom);
    }
  }]);

  return MarkViewDesc;
}(ViewDesc);

var NodeViewDesc = function (_ViewDesc3) {
  _inherits(NodeViewDesc, _ViewDesc3);

  // : (?ViewDesc, Node, [Decoration], DecorationSet, dom.Node, ?dom.Node, EditorView)
  function NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos) {
    _classCallCheck(this, NodeViewDesc);

    var _this4 = _possibleConstructorReturn(this, (NodeViewDesc.__proto__ || _Object$getPrototypeOf(NodeViewDesc)).call(this, parent, node.isLeaf ? nothing : [], dom, contentDOM));

    _this4.nodeDOM = nodeDOM;
    _this4.node = node;
    _this4.outerDeco = outerDeco;
    _this4.innerDeco = innerDeco;
    if (contentDOM) _this4.updateChildren(view, pos);
    return _this4;
  }

  _createClass(NodeViewDesc, [{
    key: 'parseRule',
    value: function parseRule() {
      var _this5 = this;

      // Experimental kludge to allow opt-in re-parsing of nodes
      if (this.node.type.spec.reparseInView) return null;
      // FIXME the assumption that this can always return the current
      // attrs means that if the user somehow manages to change the
      // attrs in the dom, that won't be picked up. Not entirely sure
      // whether this is a problem
      var rule = { node: this.node.type.name, attrs: this.node.attrs };
      if (this.node.type.spec.code) rule.preserveWhitespace = 'full';
      if (this.contentDOM && !this.contentLost) rule.contentElement = this.contentDOM;else rule.getContent = function () {
        return _this5.contentDOM ? Fragment.empty : _this5.node.content;
      };
      return rule;
    }
  }, {
    key: 'matchesNode',
    value: function matchesNode(node, outerDeco, innerDeco) {
      return this.dirty == NOT_DIRTY && node.eq(this.node) && sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco);
    }
  }, {
    key: 'updateChildren',
    value: function updateChildren(view, pos) {
      var _this6 = this;

      var updater = new ViewTreeUpdater(this),
          inline = this.node.inlineContent;
      iterDeco(this.node, this.innerDeco, function (widget, i) {
        if (widget.spec.marks) updater.syncToMarks(widget.spec.marks, inline, view);else if (widget.type.side >= 0) updater.syncToMarks(i == _this6.node.childCount ? Mark.none : _this6.node.child(i).marks, inline, view);
        // If the next node is a desc matching this widget, reuse it,
        // otherwise insert the widget as a new view desc.
        updater.placeWidget(widget, view, pos);
      }, function (child, outerDeco, innerDeco, i) {
        // Make sure the wrapping mark descs match the node's marks.
        updater.syncToMarks(child.marks, inline, view);
        // Either find an existing desc that exactly matches this node,
        // and drop the descs before it.
        updater.findNodeMatch(child, outerDeco, innerDeco, i) ||
        // Or try updating the next desc to reflect this node.
        updater.updateNextNode(child, outerDeco, innerDeco, view, i) ||
        // Or just add it as a new desc.
        updater.addNode(child, outerDeco, innerDeco, view, pos);
        pos += child.nodeSize;
      });
      // Drop all remaining descs after the current position.
      updater.syncToMarks(nothing, inline, view);
      if (this.node.isTextblock) updater.addTextblockHacks();
      updater.destroyRest();

      if (updater.changed || this.dirty == CONTENT_DIRTY) this.renderChildren();
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      renderDescs(this.contentDOM, this.children, NodeViewDesc.is);
      if (result.ios) iosHacks(this.dom);
    }
  }, {
    key: 'update',
    value: function update(node, outerDeco, innerDeco, view) {
      if (this.dirty == NODE_DIRTY || !node.sameMarkup(this.node)) return false;
      this.updateInner(node, outerDeco, innerDeco, view);
      return true;
    }
  }, {
    key: 'updateInner',
    value: function updateInner(node, outerDeco, innerDeco, view) {
      this.updateOuterDeco(outerDeco);
      this.node = node;
      this.innerDeco = innerDeco;
      if (this.contentDOM) this.updateChildren(view, this.posAtStart);
      this.dirty = NOT_DIRTY;
    }
  }, {
    key: 'updateOuterDeco',
    value: function updateOuterDeco(outerDeco) {
      if (sameOuterDeco(outerDeco, this.outerDeco)) return;
      var needsWrap = this.nodeDOM.nodeType !== 1;
      var oldDOM = this.dom;
      this.dom = patchOuterDeco(this.dom, this.nodeDOM, computeOuterDeco(this.outerDeco, this.node, needsWrap), computeOuterDeco(outerDeco, this.node, needsWrap));
      if (this.dom != oldDOM) {
        oldDOM.pmViewDesc = null;
        this.dom.pmViewDesc = this;
      }
      this.outerDeco = outerDeco;
    }
  }, {
    key: 'selectNode',
    value: function selectNode() {
      this.nodeDOM.classList.add('ProseMirror-selectednode');
    }
  }, {
    key: 'deselectNode',
    value: function deselectNode() {
      this.nodeDOM.classList.remove('ProseMirror-selectednode');
    }
  }, {
    key: 'size',
    get: function get$$1() {
      return this.node.nodeSize;
    }
  }, {
    key: 'border',
    get: function get$$1() {
      return this.node.isLeaf ? 0 : 1;
    }
  }], [{
    key: 'create',
    value: function create$$1(parent, node, outerDeco, innerDeco, view, pos) {
      var custom = customNodeViews(view)[node.type.name],
          descObj = void 0;
      var spec = custom && custom(node, view, function () {
        // (This is a function that allows the custom view to find its
        // own position)
        if (!descObj) return pos;
        if (descObj.parent) return descObj.parent.posBeforeChild(descObj);
      }, outerDeco);

      var dom = spec && spec.dom,
          contentDOM = spec && spec.contentDOM;
      if (node.isText) {
        if (!dom) dom = document.createTextNode(node.text);else if (dom.nodeType !== 3) throw new RangeError('Text must be rendered as a DOM text node');
      } else if (!dom) {
        
        var _DOMSerializer$render = DOMSerializer.renderSpec(document, node.type.spec.toDOM(node));

        dom = _DOMSerializer$render.dom;
        contentDOM = _DOMSerializer$render.contentDOM;
      }
      if (!contentDOM && !node.isText && dom.nodeName !== 'BR' && dom.nodeName !== 'IMG') {
        // Chrome gets confused by <br contenteditable=false>
        dom.contentEditable = false;
        if (node.type.spec.draggable) dom.draggable = true;
      }

      var nodeDOM = dom;
      dom = applyOuterDeco(dom, outerDeco, node);

      if (spec) return descObj = new CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view);else if (node.isText) return new TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view);else return new NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos + 1);
    }
  }]);

  return NodeViewDesc;
}(ViewDesc);

function docViewDesc(doc, outerDeco, innerDeco, dom, view) {
  applyOuterDeco(dom, outerDeco, doc, true);
  return new NodeViewDesc(null, doc, outerDeco, innerDeco, dom, dom, dom, view, 0);
}

var TextViewDesc = function (_NodeViewDesc) {
  _inherits(TextViewDesc, _NodeViewDesc);

  function TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) {
    _classCallCheck(this, TextViewDesc);

    return _possibleConstructorReturn(this, (TextViewDesc.__proto__ || _Object$getPrototypeOf(TextViewDesc)).call(this, parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view));
  }

  _createClass(TextViewDesc, [{
    key: 'parseRule',
    value: function parseRule() {
      var parent = this.nodeDOM.parentNode;
      return parent ? { skip: parent } : { ignore: true };
    }
  }, {
    key: 'update',
    value: function update(node, outerDeco) {
      if (this.dirty == NODE_DIRTY || this.dirty != NOT_DIRTY && !this.inParent() || !node.sameMarkup(this.node)) return false;
      this.updateOuterDeco(outerDeco);
      if ((this.dirty != NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue) this.nodeDOM.nodeValue = node.text;
      this.node = node;
      this.dirty = NOT_DIRTY;
      return true;
    }
  }, {
    key: 'inParent',
    value: function inParent() {
      var parentDOM = this.parent.contentDOM;
      for (var n = this.nodeDOM; n; n = n.parentNode) {
        if (n == parentDOM) return true;
      }return false;
    }
  }, {
    key: 'domFromPos',
    value: function domFromPos(pos) {
      return { node: this.nodeDOM, offset: pos };
    }
  }, {
    key: 'localPosFromDOM',
    value: function localPosFromDOM(dom, offset, bias) {
      if (dom == this.nodeDOM) return this.posAtStart + Math.min(offset, this.node.text.length);
      return _get(TextViewDesc.prototype.__proto__ || _Object$getPrototypeOf(TextViewDesc.prototype), 'localPosFromDOM', this).call(this, dom, offset, bias);
    }
  }, {
    key: 'ignoreMutation',
    value: function ignoreMutation(mutation) {
      return mutation.type != "characterData";
    }
  }]);

  return TextViewDesc;
}(NodeViewDesc);

var BRHackViewDesc = function (_ViewDesc4) {
  _inherits(BRHackViewDesc, _ViewDesc4);

  function BRHackViewDesc() {
    _classCallCheck(this, BRHackViewDesc);

    return _possibleConstructorReturn(this, (BRHackViewDesc.__proto__ || _Object$getPrototypeOf(BRHackViewDesc)).apply(this, arguments));
  }

  _createClass(BRHackViewDesc, [{
    key: 'parseRule',
    value: function parseRule() {
      return { ignore: true };
    }
  }, {
    key: 'matchesHack',
    value: function matchesHack() {
      return this.dirty == NOT_DIRTY;
    }
  }]);

  return BRHackViewDesc;
}(ViewDesc);

var CustomNodeViewDesc = function (_NodeViewDesc2) {
  _inherits(CustomNodeViewDesc, _NodeViewDesc2);

  function CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view) {
    _classCallCheck(this, CustomNodeViewDesc);

    var _this9 = _possibleConstructorReturn(this, (CustomNodeViewDesc.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc)).call(this, parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view));

    _this9.spec = spec;
    return _this9;
  }

  _createClass(CustomNodeViewDesc, [{
    key: 'update',
    value: function update(node, outerDeco, innerDeco, view) {
      if (this.dirty == NODE_DIRTY) return false;
      if (this.spec.update) {
        var result$$1 = this.spec.update(node, outerDeco);
        if (result$$1) this.updateInner(node, outerDeco, innerDeco, view);
        return result$$1;
      } else if (!this.contentDOM && !node.isLeaf) {
        return false;
      } else {
        return _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'update', this).call(this, node, outerDeco, innerDeco, view);
      }
    }
  }, {
    key: 'selectNode',
    value: function selectNode() {
      this.spec.selectNode ? this.spec.selectNode() : _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'selectNode', this).call(this);
    }
  }, {
    key: 'deselectNode',
    value: function deselectNode() {
      this.spec.deselectNode ? this.spec.deselectNode() : _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'deselectNode', this).call(this);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(anchor, head, root) {
      this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'setSelection', this).call(this, anchor, head, root);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.spec.destroy) this.spec.destroy();
      _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'stopEvent',
    value: function stopEvent(event) {
      return this.spec.stopEvent ? this.spec.stopEvent(event) : false;
    }
  }, {
    key: 'ignoreMutation',
    value: function ignoreMutation(mutation) {
      return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : _get(CustomNodeViewDesc.prototype.__proto__ || _Object$getPrototypeOf(CustomNodeViewDesc.prototype), 'ignoreMutation', this).call(this, mutation);
    }
  }]);

  return CustomNodeViewDesc;
}(NodeViewDesc);

function renderDescs(parentDOM, descs) {
  var dom = parentDOM.firstChild;
  for (var i = 0; i < descs.length; i++) {
    var desc = descs[i],
        childDOM = desc.dom;
    if (childDOM.parentNode == parentDOM) {
      while (childDOM != dom) {
        dom = rm(dom);
      }dom = dom.nextSibling;
    } else {
      parentDOM.insertBefore(childDOM, dom);
    }
    if (desc instanceof MarkViewDesc) {
      var pos = dom ? dom.previousSibling : parentDOM.lastChild;
      renderDescs(desc.contentDOM, desc.children);
      dom = pos ? pos.nextSibling : parentDOM.firstChild;
    }
  }
  while (dom) {
    dom = rm(dom);
  }
}

function OuterDecoLevel(nodeName) {
  if (nodeName) this.nodeName = nodeName;
}
OuterDecoLevel.prototype = _Object$create(null);

var noDeco = [new OuterDecoLevel()];

function computeOuterDeco(outerDeco, node, needsWrap) {
  if (outerDeco.length == 0) return noDeco;

  var top = needsWrap ? noDeco[0] : new OuterDecoLevel(),
      result$$1 = [top];

  for (var i = 0; i < outerDeco.length; i++) {
    var attrs = outerDeco[i].type.attrs,
        cur = top;
    if (!attrs) continue;
    if (attrs.nodeName) result$$1.push(cur = new OuterDecoLevel(attrs.nodeName));

    for (var name in attrs) {
      var val = attrs[name];
      if (val == null) continue;
      if (needsWrap && result$$1.length == 1) result$$1.push(cur = top = new OuterDecoLevel(node.isInline ? 'span' : 'div'));
      if (name === 'class') cur.class = (cur.class ? cur.class + ' ' : '') + val;else if (name === 'style') cur.style = (cur.style ? cur.style + ';' : '') + val;else if (name !== 'nodeName') cur[name] = val;
    }
  }

  return result$$1;
}

function patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
  // Shortcut for trivial case
  if (prevComputed == noDeco && curComputed == noDeco) return nodeDOM;

  var curDOM = nodeDOM;
  for (var i = 0; i < curComputed.length; i++) {
    var deco = curComputed[i],
        prev = prevComputed[i];
    if (i) {
      var parent = void 0;
      if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM && (parent = nodeDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
        curDOM = parent;
      } else {
        parent = document.createElement(deco.nodeName);
        parent.appendChild(curDOM);
        curDOM = parent;
      }
    }
    patchAttributes(curDOM, prev || noDeco[0], deco);
  }
  return curDOM;
}

function patchAttributes(dom, prev, cur) {
  for (var name in prev) {
    if (name !== 'class' && name !== 'style' && name !== 'nodeName' && !(name in cur)) dom.removeAttribute(name);
  }for (var _name in cur) {
    if (_name !== 'class' && _name !== 'style' && _name !== 'nodeName' && cur[_name] != prev[_name]) dom.setAttribute(_name, cur[_name]);
  }if (prev.class != cur.class) {
    var prevList = prev.class ? prev.class.split(' ') : nothing;
    var curList = cur.class ? cur.class.split(' ') : nothing;
    for (var i = 0; i < prevList.length; i++) {
      if (curList.indexOf(prevList[i]) == -1) dom.classList.remove(prevList[i]);
    }for (var _i = 0; _i < curList.length; _i++) {
      if (prevList.indexOf(curList[_i]) == -1) dom.classList.add(curList[_i]);
    }
  }
  if (prev.style != cur.style) {
    if (prev.style) {
      var prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g,
          m = void 0;
      while (m = prop.exec(prev.style)) {
        dom.style[m[1].toLowerCase()] = '';
      }
    }
    if (cur.style) dom.style.cssText += cur.style;
  }
}

function applyOuterDeco(dom, deco, node) {
  return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node, dom.nodeType !== 1));
}

function sameOuterDeco(a, b) {
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (!a[i].type.eq(b[i].type)) return false;
  }return true;
}

function rm(dom) {
  var next = dom.nextSibling;
  dom.parentNode.removeChild(dom);
  return next;
}

var ViewTreeUpdater = function () {
  function ViewTreeUpdater(top) {
    _classCallCheck(this, ViewTreeUpdater);

    this.top = top;
    this.index = 0;
    this.stack = [];
    this.changed = false;

    this.preMatched = preMatch(top.node.content, top.children);
  }

  _createClass(ViewTreeUpdater, [{
    key: 'destroyBetween',
    value: function destroyBetween(start, end) {
      if (start == end) return;
      for (var i = start; i < end; i++) {
        this.top.children[i].destroy();
      }this.top.children.splice(start, end - start);
      this.changed = true;
    }
  }, {
    key: 'destroyRest',
    value: function destroyRest() {
      this.destroyBetween(this.index, this.top.children.length);
    }
  }, {
    key: 'syncToMarks',
    value: function syncToMarks(marks, inline, view) {
      var keep = 0,
          depth = this.stack.length >> 1;
      var maxKeep = Math.min(depth, marks.length),
          next = void 0;
      while (keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[keep + 1 << 1]).matchesMark(marks[keep])) {
        keep++;
      }while (keep < depth) {
        this.destroyRest();
        this.top.dirty = NOT_DIRTY;
        this.index = this.stack.pop();
        this.top = this.stack.pop();
        depth--;
      }
      while (depth < marks.length) {
        this.stack.push(this.top, this.index + 1);
        if (this.index < this.top.children.length && (next = this.top.children[this.index]).matchesMark(marks[depth])) {
          this.top = next;
        } else {
          var markDesc = MarkViewDesc.create(this.top, marks[depth], inline, view);
          this.top.children.splice(this.index, 0, markDesc);
          this.top = markDesc;
          this.changed = true;
        }
        this.index = 0;
        depth++;
      }
    }
  }, {
    key: 'findNodeMatch',
    value: function findNodeMatch(node, outerDeco, innerDeco, index) {
      for (var i = this.index, children = this.top.children, e = Math.min(children.length, i + 5); i < e; i++) {
        var child = children[i],
            preMatched = void 0;
        if (child.matchesNode(node, outerDeco, innerDeco) && ((preMatched = this.preMatched.indexOf(child)) == -1 || preMatched == index)) {
          this.destroyBetween(this.index, i);
          this.index++;
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'updateNextNode',
    value: function updateNextNode(node, outerDeco, innerDeco, view, index) {
      if (this.index === this.top.children.length) return false;

      var next = this.top.children[this.index];
      if (next instanceof NodeViewDesc) {
        var _preMatch = this.preMatched.indexOf(next);
        if (_preMatch > -1 && _preMatch != index) return false;
        var nextDOM = next.dom;
        if (next.update(node, outerDeco, innerDeco, view)) {
          if (next.dom != nextDOM) this.changed = true;
          this.index++;
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'addNode',
    value: function addNode(node, outerDeco, innerDeco, view, pos) {
      this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos));
      this.changed = true;
    }
  }, {
    key: 'placeWidget',
    value: function placeWidget(widget, view, pos) {
      if (this.index < this.top.children.length && this.top.children[this.index].matchesWidget(widget)) {
        this.index++;
      } else {
        var desc = new (widget.spec.isCursorWrapper ? CursorWrapperDesc : WidgetViewDesc)(this.top, widget, view, pos);
        this.top.children.splice(this.index++, 0, desc);
        this.changed = true;
      }
    }
  }, {
    key: 'addTextblockHacks',
    value: function addTextblockHacks() {
      var lastChild = this.top.children[this.index - 1];
      while (lastChild instanceof MarkViewDesc) {
        lastChild = lastChild.children[lastChild.children.length - 1];
      }if (!lastChild || // Empty textblock
      !(lastChild instanceof TextViewDesc) || /\n$/.test(lastChild.node.text)) {
        if (this.index < this.top.children.length && this.top.children[this.index].matchesHack()) {
          this.index++;
        } else {
          var dom = document.createElement("br");
          this.top.children.splice(this.index++, 0, new BRHackViewDesc(this.top, nothing, dom, null));
          this.changed = true;
        }
      }
    }
  }]);

  return ViewTreeUpdater;
}();

function preMatch(frag, descs) {
  var result$$1 = [],
      end = frag.childCount;
  for (var i = descs.length - 1; end > 0 && i >= 0; i--) {
    var desc = descs[i],
        node = desc.node;
    if (!node) continue;
    if (node != frag.child(end - 1)) break;
    result$$1[--end] = desc;
  }
  return result$$1;
}

function compareSide(a, b) {
  return a.type.side - b.type.side;
}

function iterDeco(parent, deco, onWidget, onNode) {
  var locals = deco.locals(parent),
      offset = 0;
  // Simple, cheap variant for when there are no local decorations
  if (locals.length === 0) {
    for (var i = 0; i < parent.childCount; i++) {
      var child = parent.child(i);
      onNode(child, locals, deco.forChild(offset, child), i);
      offset += child.nodeSize;
    }
    return;
  }

  var decoIndex = 0,
      active = [],
      restNode = null;
  for (var parentIndex = 0;;) {
    if (decoIndex < locals.length && locals[decoIndex].to == offset) {
      var widget = locals[decoIndex++],
          widgets = void 0;
      while (decoIndex < locals.length && locals[decoIndex].to == offset) {
        (widgets || (widgets = [widget])).push(locals[decoIndex++]);
      }

      if (widgets) {
        widgets.sort(compareSide);
        for (var _i2 = 0; _i2 < widgets.length; _i2++) {
          onWidget(widgets[_i2], parentIndex);
        }
      } else {
        onWidget(widget, parentIndex);
      }
    }

    var _child = void 0;
    if (restNode) {
      _child = restNode;
      restNode = null;
    } else if (parentIndex < parent.childCount) {
      _child = parent.child(parentIndex++);
    } else {
      break;
    }

    for (var _i3 = 0; _i3 < active.length; _i3++) {
      if (active[_i3].to <= offset) {
        active.splice(_i3--, 1);
      }
    }
    while (decoIndex < locals.length && locals[decoIndex].from == offset) {
      active.push(locals[decoIndex++]);
    }

    var end = offset + _child.nodeSize;
    if (_child.isText) {
      var cutAt = end;
      if (decoIndex < locals.length && locals[decoIndex].from < cutAt) {
        cutAt = locals[decoIndex].from;
      }
      for (var _i4 = 0; _i4 < active.length; _i4++) {
        if (active[_i4].to < cutAt) cutAt = active[_i4].to;
      }
      if (cutAt < end) {
        restNode = _child.cut(cutAt - offset);
        _child = _child.cut(0, cutAt - offset);
        end = cutAt;
      }
    }

    onNode(_child, active.length ? active.slice() : nothing, deco.forChild(offset, _child), parentIndex - 1);
    offset = end;
  }
}

var cachedCustomViews = void 0;
var cachedCustomFor = void 0;
function customNodeViews(view) {
  if (cachedCustomFor == view._props) return cachedCustomViews;
  cachedCustomFor = view._props;
  return cachedCustomViews = buildCustomViews(view);
}
function buildCustomViews(view) {
  var result$$1 = {};
  view.someProp('nodeViews', function (obj) {
    for (var prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(result$$1, prop)) {
        result$$1[prop] = obj[prop];
      }
    }
  });
  return result$$1;
}

function iosHacks(dom) {
  if (dom.nodeName === 'UL' || dom.nodeName === 'OL') {
    var oldCSS = dom.style.cssText;
    dom.style.cssText = oldCSS + '; list-style: square !important';
    window.getComputedStyle(dom).listStyle;
    dom.style.cssText = oldCSS;
  }
}

function moveSelectionBlock(state, dir) {
  var _state$selection = state.selection,
      $anchor = _state$selection.$anchor,
      $head = _state$selection.$head;

  var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
  var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
  return $start && Selection.findFrom($start, dir);
}

function apply(view, sel) {
  view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
  return true;
}

function selectHorizontally(view, dir) {
  var sel = view.state.selection;
  if (sel instanceof TextSelection) {
    if (!sel.empty) {
      return false;
    } else if (view.endOfTextblock(dir > 0 ? 'right' : 'left')) {
      var next = moveSelectionBlock(view.state, dir);
      if (next && next instanceof NodeSelection) return apply(view, next);
      return false;
    } else {
      var $head = sel.$head,
          node = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter,
          desc = void 0;
      if (node && NodeSelection.isSelectable(node)) {
        var nodePos = dir < 0 ? $head.pos - node.nodeSize : $head.pos;
        if (node.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM) {
          return apply(view, new NodeSelection(dir < 0 ? view.state.doc.resolve($head.pos - node.nodeSize) : $head));
        }
      }
      return false;
    }
  } else if (sel instanceof NodeSelection && sel.node.isInline) {
    return apply(view, new TextSelection(dir > 0 ? sel.$to : sel.$from));
  } else {
    var _next = moveSelectionBlock(view.state, dir);
    if (_next) return apply(view, _next);
    return false;
  }
}

function nodeLen(node) {
  return node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length;
}

function isIgnorable(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.size === 0 && (dom.nextSibling || dom.nodeName !== 'BR');
}

function skipIgnoredNodesLeft(view) {
  var sel = view.root.getSelection();
  var node = sel.focusNode,
      offset = sel.focusOffset;
  if (!node) return;
  var moveNode = void 0,
      moveOffset = void 0,
      force = false;
  if (result.gecko && node.nodeType === 1 && offset < nodeLen(node) && isIgnorable(node.childNodes[offset])) force = true;
  for (;;) {
    if (offset > 0) {
      if (node.nodeType !== 1) {
        if (node.nodeType === 3 && node.nodeValue.charAt(offset - 1) === '\uFEFF') {
          if (result.ie && result.ie_version <= 11) force = true;
          moveNode = node;
          moveOffset = --offset;
        } else {
          break;
        }
      } else {
        var before = node.childNodes[offset - 1];
        if (isIgnorable(before)) {
          moveNode = node;
          moveOffset = --offset;
        } else if (before.nodeType === 3) {
          node = before;
          offset = node.nodeValue.length;
        } else {
          break;
        }
      }
    } else if (isBlockNode(node)) {
      break;
    } else {
      var prev = node.previousSibling;
      while (prev && isIgnorable(prev)) {
        moveNode = node.parentNode;
        moveOffset = domIndex(prev);
        prev = prev.previousSibling;
      }

      if (!prev) {
        node = node.parentNode;
        if (node === view.dom) {
          break;
        }
        offset = 0;
      } else {
        node = prev;
        offset = nodeLen(node);
      }
    }
  }
  if (force) setSelFocus(view, sel, node, offset);else if (moveNode) setSelFocus(view, sel, moveNode, moveOffset);
}

function skipIgnoredNodesRight(view) {
  var sel = view.root.getSelection();
  var node = sel.focusNode,
      offset = sel.focusOffset;
  if (!node) return;
  var len = nodeLen(node);
  var moveNode = void 0,
      moveOffset = void 0;
  for (;;) {
    if (offset < len) {
      if (node.nodeType !== 1) break;
      var after = node.childNodes[offset];
      if (isIgnorable(after)) {
        moveNode = node;
        moveOffset = ++offset;
      } else {
        break;
      }
    } else if (isBlockNode(node)) {
      break;
    } else {
      var next = node.nextSibling;
      while (next && isIgnorable(next)) {
        moveNode = next.parentNode;
        moveOffset = domIndex(next) + 1;
        next = next.nextSibling;
      }

      if (!next) {
        node = node.parentNode;
        if (node == view.dom) break;
        offset = len = 0;
      } else {
        node = next;
        offset = 0;
        len = nodeLen(node);
      }
    }
  }

  if (moveNode) {
    setSelFocus(view, sel, moveNode, moveOffset);
  }
}

function isBlockNode(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock;
}

function setSelFocus(view, sel, node, offset) {
  if (selectionCollapsed(sel)) {
    var range = document.createRange();
    range.setEnd(node, offset);
    range.setStart(node, offset);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (sel.extend) {
    sel.extend(node, offset);
  }
  view.selectionReader.storeDOMState(view.selection);
}

function selectVertically(view, dir) {
  var sel = view.state.selection;
  if (sel instanceof TextSelection && !sel.empty) return false;
  var $from = sel.$from,
      $to = sel.$to;


  if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? 'up' : 'down')) {
    var next = moveSelectionBlock(view.state, dir);
    if (next && next instanceof NodeSelection) {
      return apply(view, next);
    }
  }

  if (!$from.parent.inlineContent) {
    var beyond = Selection.findFrom(dir < 0 ? $from : $to, dir);
    return beyond ? apply(view, beyond) : true;
  }
  return false;
}

function stopNativeHorizontalDelete(view, dir) {
  if (!(view.state.selection instanceof TextSelection)) return true;
  var _view$state$selection = view.state.selection,
      $head = _view$state$selection.$head,
      $anchor = _view$state$selection.$anchor,
      empty = _view$state$selection.empty;

  if (!$head.sameParent($anchor)) return true;

  if (!empty) return false;
  if (view.endOfTextblock(dir > 0 ? 'forward' : 'backward')) return true;
  var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);

  if (nextNode && !nextNode.isText) {
    var tr = view.state.tr;
    if (dir < 0) {
      tr.delete($head.pos - nextNode.nodeSize, $head.pos);
    } else {
      tr.delete($head.pos, $head.pos + nextNode.nodeSize);
    }
    view.dispatch(tr);
    return true;
  }
  return false;
}

function getMods(event) {
  var result$$1 = '';
  if (event.ctrlKey) result$$1 += 'c';
  if (event.metaKey) result$$1 += 'm';
  if (event.altKey) result$$1 += 'a';
  if (event.shiftKey) result$$1 += 's';
  return result$$1;
}

function captureKeyDown(view, event) {
  var code = event.keyCode,
      mods = getMods(event);
  if (code === 8 || result.mac && code === 72 && mods === 'c') {
    // Backspace, Ctrl-h on Mac
    return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodesLeft(view);
  } else if (code === 46 || result.mac && code === 68 && mods === 'c') {
    // Delete, Ctrl-d on Mac
    return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodesRight(view);
  } else if (code === 13 || code === 27) {
    // Enter, Esc
    return true;
  } else if (code === 37) {
    // Left arrow
    return selectHorizontally(view, -1) || skipIgnoredNodesLeft(view);
  } else if (code === 39) {
    // Right arrow
    return selectHorizontally(view, 1) || skipIgnoredNodesRight(view);
  } else if (code === 38) {
    // Up arrow
    return selectVertically(view, -1) || skipIgnoredNodesLeft(view);
  } else if (code === 40) {
    // Down arrow
    return selectVertically(view, 1) || skipIgnoredNodesRight(view);
  } else if (mods === (result.mac ? 'm' : 'c') && (code === 66 || code === 73 || code === 89 || code === 90)) {
    // Mod-[biyz]
    return true;
  }
  return false;
}

var TrackedRecord = function TrackedRecord(prev, mapping, state) {
  _classCallCheck(this, TrackedRecord);

  this.prev = prev;
  this.mapping = mapping;
  this.state = state;
};

var TrackMappings = function () {
  function TrackMappings(state) {
    _classCallCheck(this, TrackMappings);

    this.seen = [new TrackedRecord(null, null, state)];
    // Kludge to listen to state changes globally in order to be able
    // to find mappings from a given state to another.
    EditorState.addApplyListener(this.track = this.track.bind(this));
  }

  _createClass(TrackMappings, [{
    key: "destroy",
    value: function destroy() {
      EditorState.removeApplyListener(this.track);
    }
  }, {
    key: "find",
    value: function find(state) {
      for (var i = this.seen.length - 1; i >= 0; i--) {
        var record = this.seen[i];
        if (record.state == state) return record;
      }
    }
  }, {
    key: "track",
    value: function track(old, tr, state) {
      var found = this.seen.length < 200 ? this.find(old) : null;
      if (found) this.seen.push(new TrackedRecord(found, tr.docChanged ? tr.mapping : null, state));
    }
  }, {
    key: "getMapping",
    value: function getMapping(state, appendTo) {
      var found = this.find(state);
      if (!found) return null;
      var mappings = [];
      for (var rec = found; rec; rec = rec.prev) {
        if (rec.mapping) mappings.push(rec.mapping);
      }var result = appendTo || new Mapping();
      for (var i = mappings.length - 1; i >= 0; i--) {
        result.appendMapping(mappings[i]);
      }return result;
    }
  }]);

  return TrackMappings;
}();

var SelectionReader = function () {
  function SelectionReader(view) {
    var _this = this;

    _classCallCheck(this, SelectionReader);

    this.view = view;

    this.lastAnchorNode = this.lastHeadNode = this.lastAnchorOffset = this.lastHeadOffset = null;
    this.lastSelection = view.state.selection;
    this.ignoreUpdates = false;
    this.suppressUpdates = false;
    this.poller = poller(this);

    this.focusFunc = function () {
      return _this.poller.start(hasFocusAndSelection(_this.view));
    }.bind(this);
    this.blurFunc = this.poller.stop;

    view.dom.addEventListener('focus', this.focusFunc);
    view.dom.addEventListener('blur', this.blurFunc);

    if (!view.editable) this.poller.start(false);
  }

  _createClass(SelectionReader, [{
    key: 'destroy',
    value: function destroy() {
      this.view.dom.removeEventListener('focus', this.focusFunc);
      this.view.dom.removeEventListener('blur', this.blurFunc);
      this.poller.stop();
    }
  }, {
    key: 'poll',
    value: function poll(origin) {
      this.poller.poll(origin);
    }
  }, {
    key: 'editableChanged',
    value: function editableChanged() {
      if (!this.view.editable) this.poller.start();else if (!hasFocusAndSelection(this.view)) this.poller.stop();
    }
  }, {
    key: 'domChanged',
    value: function domChanged() {
      var sel = this.view.root.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastHeadNode || sel.focusOffset != this.lastHeadOffset;
    }

    // Store the current state of the DOM selection.

  }, {
    key: 'storeDOMState',
    value: function storeDOMState(selection) {
      var sel = this.view.root.getSelection();
      this.lastAnchorNode = sel.anchorNode;
      this.lastAnchorOffset = sel.anchorOffset;
      this.lastHeadNode = sel.focusNode;
      this.lastHeadOffset = sel.focusOffset;
      this.lastSelection = selection;
    }
  }, {
    key: 'clearDOMState',
    value: function clearDOMState() {
      this.lastAnchorNode = this.lastSelection = null;
    }
  }, {
    key: 'readFromDOM',
    value: function readFromDOM(origin) {
      if (this.ignoreUpdates || !this.domChanged() || !hasFocusAndSelection(this.view)) return;
      if (this.suppressUpdates) return selectionToDOM(this.view);
      if (!this.view.inDOMChange) this.view.domObserver.flush();
      if (this.view.inDOMChange) return;

      var domSel = this.view.root.getSelection(),
          doc = this.view.state.doc;
      var nearestDesc = this.view.docView.nearestDesc(domSel.focusNode),
          inWidget = nearestDesc && nearestDesc.size == 0;
      var head = this.view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
      var $head = doc.resolve(head),
          $anchor = void 0,
          selection = void 0;
      if (selectionCollapsed(domSel)) {
        $anchor = $head;
        while (nearestDesc && !nearestDesc.node) {
          nearestDesc = nearestDesc.parent;
        }if (nearestDesc && nearestDesc.node.isAtom && NodeSelection.isSelectable(nearestDesc.node) && nearestDesc.parent) {
          var pos = nearestDesc.posBefore;
          selection = new NodeSelection(head == pos ? $head : doc.resolve(pos));
        }
      } else {
        $anchor = doc.resolve(this.view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset));
      }

      if (!selection) {
        var bias = origin === 'pointer' || this.view.state.selection.head < $head.pos && !inWidget ? 1 : -1;
        selection = selectionBetween(this.view, $anchor, $head, bias);
      }
      if (!this.view.state.selection.eq(selection)) {
        var tr = this.view.state.tr.setSelection(selection);
        if (origin === 'pointer') tr.setMeta('pointer', true);else if (origin === 'key') tr.scrollIntoView();
        this.view.dispatch(tr);
      } else {
        selectionToDOM(this.view);
      }
    }
  }]);

  return SelectionReader;
}();

var SelectionChangePoller = function () {
  function SelectionChangePoller(reader) {
    var _this2 = this;

    _classCallCheck(this, SelectionChangePoller);

    this.listening = false;
    this.curOrigin = null;
    this.originTime = 0;
    this.reader = reader;

    this.readFunc = function () {
      return reader.readFromDOM(_this2.originTime > Date.now() - 50 ? _this2.curOrigin : null);
    };
  }

  _createClass(SelectionChangePoller, [{
    key: 'poll',
    value: function poll(origin) {
      this.curOrigin = origin;
      this.originTime = Date.now();
    }
  }, {
    key: 'start',
    value: function start(andRead) {
      if (!this.listening) {
        var doc = this.reader.view.dom.ownerDocument;
        doc.addEventListener('selectionchange', this.readFunc);
        this.listening = true;
        if (andRead) this.readFunc();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.listening) {
        var doc = this.reader.view.dom.ownerDocument;
        doc.removeEventListener('selectionchange', this.readFunc);
        this.listening = false;
      }
    }
  }]);

  return SelectionChangePoller;
}();

var TimeoutPoller = function () {
  function TimeoutPoller(reader) {
    _classCallCheck(this, TimeoutPoller);

    // The timeout ID for the poller when active.
    this.polling = null;
    this.reader = reader;
    this.pollFunc = this.doPoll.bind(this, null);
  }

  _createClass(TimeoutPoller, [{
    key: 'doPoll',
    value: function doPoll(origin) {
      var view = this.reader.view;
      if (view.focused || !view.editable) {
        this.reader.readFromDOM(origin);
        this.polling = setTimeout(this.pollFunc, 100);
      } else {
        this.polling = null;
      }
    }
  }, {
    key: 'poll',
    value: function poll(origin) {
      clearTimeout(this.polling);
      this.polling = setTimeout(origin ? this.doPoll.bind(this, origin) : this.pollFunc, 0);
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.polling == null) this.poll();
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearTimeout(this.polling);
      this.polling = null;
    }
  }]);

  return TimeoutPoller;
}();

function poller(reader) {
  return new ('onselectionchange' in document ? SelectionChangePoller : TimeoutPoller)(reader);
}

function selectionToDOM(view, takeFocus) {
  var sel = view.state.selection;
  syncNodeSelection(view, sel);

  if (view.editable && !view.hasFocus()) {
    if (!takeFocus) return;
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444
    if (result.gecko && result.gecko_version <= 55) {
      view.selectionReader.ignoreUpdates = true;
      view.dom.focus();
      view.selectionReader.ignoreUpdates = false;
    }
  } else if (!view.editable && !hasSelection(view) && !takeFocus) {
    return;
  }

  var reader = view.selectionReader;
  if (reader.lastSelection && reader.lastSelection.eq(sel) && !reader.domChanged()) return;

  reader.ignoreUpdates = true;

  if (view.cursorWrapper) {
    selectCursorWrapper(view);
  } else {
    var anchor = sel.anchor,
        head = sel.head,
        resetEditableFrom = void 0,
        resetEditableTo = void 0;

    if (brokenSelectBetweenUneditable && !(sel instanceof TextSelection)) {
      if (!sel.$from.parent.inlineContent) resetEditableFrom = temporarilyEditableNear(view, sel.from);
      if (!sel.empty && !sel.$from.parent.inlineContent) resetEditableTo = temporarilyEditableNear(view, sel.to);
    }
    view.docView.setSelection(anchor, head, view.root);
    if (brokenSelectBetweenUneditable) {
      if (resetEditableFrom) resetEditableFrom.contentEditable = 'false';
      if (resetEditableTo) resetEditableTo.contentEditable = 'false';
    }
    if (sel.visible) {
      view.dom.classList.remove('ProseMirror-hideselection');
    } else if (anchor != head) {
      view.dom.classList.add('ProseMirror-hideselection');
      if ('onselectionchange' in document) removeClassOnSelectionChange(view);
    }
  }

  reader.storeDOMState(sel);
  reader.ignoreUpdates = false;
}

var brokenSelectBetweenUneditable = result.safari || result.chrome && result.chrome_version < 63;

function temporarilyEditableNear(view, pos) {
  var _view$docView$domFrom = view.docView.domFromPos(pos),
      node = _view$docView$domFrom.node,
      offset = _view$docView$domFrom.offset;

  var after = offset < node.childNodes.length ? node.childNodes[offset] : null;
  var before = offset ? node.childNodes[offset - 1] : null;
  if ((!after || after.contentEditable === 'false') && (!before || before.contentEditable === 'false')) {
    if (after) {
      after.contentEditable = 'true';
      return after;
    } else if (before) {
      before.contentEditable = 'true';
      return before;
    }
  }
}

function removeClassOnSelectionChange(view) {
  var doc = view.dom.ownerDocument;
  doc.removeEventListener('selectionchange', view.hideSelectionGuard);
  var domSel = view.root.getSelection();
  var node = domSel.anchorNode,
      offset = domSel.anchorOffset;
  doc.addEventListener('selectionchange', view.hideSelectionGuard = function () {
    if (domSel.anchorNode != node || domSel.anchorOffset != offset) {
      doc.removeEventListener('selectionchange', view.hideSelectionGuard);
      view.dom.classList.remove('ProseMirror-hideselection');
    }
  });
}

function selectCursorWrapper(view) {
  var domSel = view.root.getSelection(),
      range = document.createRange();
  var node = view.cursorWrapper.dom;
  range.setEnd(node, node.childNodes.length);
  range.collapse(false);
  domSel.removeAllRanges();
  domSel.addRange(range);
  // Kludge to kill 'control selection' in IE11 when selecting an
  // invisible cursor wrapper, since that would result in those weird
  // resize handles and a selection that considers the absolutely
  // positioned wrapper, rather than the root editable node, the
  // focused element.
  if (!view.state.selection.visible && result.ie && result.ie_version <= 11) {
    node.disabled = true;
    node.disabled = false;
  }
}

function syncNodeSelection(view, sel) {
  if (sel instanceof NodeSelection) {
    var desc = view.docView.descAt(sel.from);
    if (desc != view.lastSelectedViewDesc) {
      clearNodeSelection(view);
      if (desc) desc.selectNode();
      view.lastSelectedViewDesc = desc;
    }
  } else {
    clearNodeSelection(view);
  }
}

// Clear all DOM statefulness of the last node selection.
function clearNodeSelection(view) {
  if (view.lastSelectedViewDesc) {
    view.lastSelectedViewDesc.deselectNode();
    view.lastSelectedViewDesc = null;
  }
}

function selectionBetween(view, $anchor, $head, bias) {
  return view.someProp('createSelectionBetween', function (f) {
    return f(view, $anchor, $head);
  }) || TextSelection.between($anchor, $head, bias);
}

function hasFocusAndSelection(view) {
  if (view.editable && view.root.activeElement !== view.dom) return false;
  return hasSelection(view);
}

function hasSelection(view) {
  var sel = view.root.getSelection();
  if (!sel.anchorNode) return false;

  try {
    // Firefox will raise 'permission denied' errors when accessing
    // properties of `sel.anchorNode` when it's in a generated CSS
    // element.
    return view.dom.contains(sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentNode : sel.anchorNode) && (view.editable || view.dom.contains(sel.focusNode.nodeType === 3 ? sel.focusNode.parentNode : sel.focusNode));
  } catch (_) {
    return false;
  }
}

function nonInclusiveMark(mark) {
  return mark.type.spec.inclusive === false;
}

function needsCursorWrapper(state) {
  var _state$selection = state.selection,
      $head = _state$selection.$head,
      $anchor = _state$selection.$anchor,
      visible = _state$selection.visible;

  var $pos = $head.pos == $anchor.pos && (!visible || $head.parent.inlineContent) ? $head : null;
  if ($pos && (!visible || state.storedMarks || $pos.parent.content.length === 0 || $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.some(nonInclusiveMark))) {
    return $pos;
  } else {
    return null;
  }
}

var DOMChange = function () {
  function DOMChange(view, composing) {
    var _this = this;

    _classCallCheck(this, DOMChange);

    this.view = view;
    this.state = view.state;
    this.composing = composing;
    this.from = this.to = null;
    this.typeOver = false;
    this.timeout = composing ? null : setTimeout(function () {
      return _this.finish();
    }, DOMChange.commitTimeout);
    this.trackMappings = new TrackMappings(view.state);

    this.mapping = new Mapping();
    this.mappingTo = view.state;
  }

  _createClass(DOMChange, [{
    key: 'addRange',
    value: function addRange(from, to) {
      if (this.from == null) {
        this.from = from;
        this.to = to;
      } else {
        this.from = Math.min(from, this.from);
        this.to = Math.max(to, this.to);
      }
    }
  }, {
    key: 'changedRange',
    value: function changedRange() {
      if (this.from == null) return rangeAroundSelection(this.state.selection);
      var $from = this.state.doc.resolve(Math.min(this.from, this.state.selection.from)),
          $to = this.state.doc.resolve(this.to);
      var shared = $from.sharedDepth(this.to);
      return { from: $from.before(shared + 1), to: $to.after(shared + 1) };
    }
  }, {
    key: 'markDirty',
    value: function markDirty(range) {
      if (this.from == null) this.view.docView.markDirty((range = range || this.changedRange()).from, range.to);else this.view.docView.markDirty(this.from, this.to);
    }
  }, {
    key: 'stateUpdated',
    value: function stateUpdated(state) {
      if (this.trackMappings.getMapping(state, this.mapping)) {
        this.trackMappings.destroy();
        this.trackMappings = new TrackMappings(state);
        this.mappingTo = state;
        return true;
      } else {
        this.markDirty();
        this.destroy();
        return false;
      }
    }
  }, {
    key: 'finish',
    value: function finish(force) {
      clearTimeout(this.timeout);
      if (this.composing && !force) return;
      this.view.domObserver.flush();
      var range = this.changedRange();
      this.markDirty(range);

      this.destroy();
      var sel = this.state.selection,
          allowTypeOver = this.typeOver && sel instanceof TextSelection && !sel.empty && sel.$head.sameParent(sel.$anchor);
      readDOMChange(this.view, this.mapping, this.state, range, allowTypeOver);

      if (this.view.docView.dirty) this.view.updateState(this.view.state);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearTimeout(this.timeout);
      this.trackMappings.destroy();
      this.view.inDOMChange = null;
    }
  }, {
    key: 'compositionEnd',
    value: function compositionEnd() {
      var _this2 = this;

      if (this.composing) {
        this.composing = false;
        this.timeout = setTimeout(function () {
          return _this2.finish();
        }, 50);
      }
    }
  }], [{
    key: 'start',
    value: function start(view, composing) {
      if (view.inDOMChange) {
        if (composing) {
          clearTimeout(view.inDOMChange.timeout);
          view.inDOMChange.composing = true;
        }
      } else {
        view.inDOMChange = new DOMChange(view, composing);
      }
      return view.inDOMChange;
    }
  }]);

  return DOMChange;
}();
DOMChange.commitTimeout = 20;

function parseBetween(view, oldState, range) {
  var _view$docView$parseRa = view.docView.parseRange(range.from, range.to),
      parent = _view$docView$parseRa.node,
      fromOffset = _view$docView$parseRa.fromOffset,
      toOffset = _view$docView$parseRa.toOffset,
      from = _view$docView$parseRa.from,
      to = _view$docView$parseRa.to;

  var domSel = view.root.getSelection(),
      find = null,
      anchor = domSel.anchorNode;
  if (anchor && view.dom.contains(anchor.nodeType === 1 ? anchor : anchor.parentNode)) {
    find = [{ node: anchor, offset: domSel.anchorOffset }];
    if (!selectionCollapsed(domSel)) find.push({ node: domSel.focusNode, offset: domSel.focusOffset });
  }
  // Work around issue in Chrome where backspacing sometimes replaces
  // the deleted content with a random BR node (issues #799, #831)
  if (result.chrome && view.lastKeyCode === 8) {
    for (var off = toOffset; off > fromOffset; off--) {
      var node = parent.childNodes[off - 1],
          desc = node.pmViewDesc;
      if (node.nodeName === 'BR' && !desc) {
        toOffset = off;break;
      }
      if (!desc || desc.size) break;
    }
  }
  var startDoc = oldState.doc;
  var parser = view.someProp('domParser') || DOMParser.fromSchema(view.state.schema);
  var $from = startDoc.resolve(from);
  var sel = null,
      doc = parser.parse(parent, {
    topNode: $from.parent,
    topMatch: $from.parent.contentMatchAt($from.index()),
    topOpen: true,
    from: fromOffset,
    to: toOffset,
    preserveWhitespace: $from.parent.type.spec.code ? 'full' : true,
    editableContent: true,
    findPositions: find,
    ruleFromNode: ruleFromNode(parser, $from),
    context: $from
  });
  if (find && find[0].pos != null) {
    var _anchor = find[0].pos,
        head = find[1] && find[1].pos;
    if (head == null) head = _anchor;
    sel = { anchor: _anchor + from, head: head + from };
  }
  return { doc: doc, sel: sel, from: from, to: to };
}

function ruleFromNode(parser, context) {
  return function (dom) {
    var desc = dom.pmViewDesc;
    if (desc) {
      return desc.parseRule();
    } else if (dom.nodeName == "BR" && dom.parentNode) {
      // Safari replaces the list item or table cell with a BR
      // directly in the list node (?!) if you delete the last
      // character in a list item or table cell (#708, #862)
      if (result.safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) return parser.matchTag(document.createElement("li"), context);else if (dom.parentNode.lastChild == dom || result.safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) return { ignore: true };
    }
  };
}

function isAtEnd($pos, depth) {
  for (var i = depth || 0; i < $pos.depth; i++) {
    if ($pos.index(i) + 1 < $pos.node(i).childCount) return false;
  }return $pos.parentOffset == $pos.parent.content.size;
}
function isAtStart($pos, depth) {
  for (var i = depth || 0; i < $pos.depth; i++) {
    if ($pos.index(0) > 0) return false;
  }return $pos.parentOffset == 0;
}

function rangeAroundSelection(selection) {
  // Intentionally uses $head/$anchor because those will correspond to the DOM selection
  var $from = selection.$anchor.min(selection.$head),
      $to = selection.$anchor.max(selection.$head);

  if ($from.sameParent($to) && $from.parent.inlineContent && $from.parentOffset && $to.parentOffset < $to.parent.content.size) {
    var startOff = Math.max(0, $from.parentOffset);
    var size = $from.parent.content.size;
    var endOff = Math.min(size, $to.parentOffset);

    if (startOff > 0) startOff = $from.parent.childBefore(startOff).offset;
    if (endOff < size) {
      var after = $from.parent.childAfter(endOff);
      endOff = after.offset + after.node.nodeSize;
    }
    var nodeStart = $from.start();
    return { from: nodeStart + startOff, to: nodeStart + endOff };
  } else {
    for (var depth = 0;; depth++) {
      var fromStart = isAtStart($from, depth + 1),
          toEnd = isAtEnd($to, depth + 1);
      if (fromStart || toEnd || $from.index(depth) != $to.index(depth) || $to.node(depth).isTextblock) {
        var from = $from.before(depth + 1),
            to = $to.after(depth + 1);
        if (fromStart && $from.index(depth) > 0) from -= $from.node(depth).child($from.index(depth) - 1).nodeSize;
        if (toEnd && $to.index(depth) + 1 < $to.node(depth).childCount) to += $to.node(depth).child($to.index(depth) + 1).nodeSize;
        return { from: from, to: to };
      }
    }
  }
}

function keyEvent(keyCode, key) {
  var event = document.createEvent("Event");
  event.initEvent("keydown", true, true);
  event.keyCode = keyCode;
  event.key = event.code = key;
  return event;
}

function readDOMChange(view, mapping, oldState, range, allowTypeOver) {
  var parse = parseBetween(view, oldState, range);

  var doc = oldState.doc,
      compare = doc.slice(parse.from, parse.to);
  var preferredPos = void 0,
      preferredSide = void 0;
  // Prefer anchoring to end when Backspace is pressed
  if (view.lastKeyCode === 8 && Date.now() - 100 < view.lastKeyCodeTime) {
    preferredPos = oldState.selection.to;
    preferredSide = "end";
  } else {
    preferredPos = oldState.selection.from;
    preferredSide = "start";
  }
  view.lastKeyCode = null;

  var change = findDiff(compare.content, parse.doc.content, parse.from, preferredPos, preferredSide);
  if (!change) {
    if (allowTypeOver) {
      var state = view.state,
          sel = state.selection;
      view.dispatch(state.tr.replaceSelectionWith(state.schema.text(state.doc.textBetween(sel.from, sel.to)), true).scrollIntoView());
    } else if (parse.sel) {
      var _sel = resolveSelection(view, view.state.doc, mapping, parse.sel);
      if (_sel && !_sel.eq(view.state.selection)) view.dispatch(view.state.tr.setSelection(_sel));
    }
    return;
  }

  var $from = parse.doc.resolveNoCache(change.start - parse.from);
  var $to = parse.doc.resolveNoCache(change.endB - parse.from);
  var nextSel = void 0;
  // If this looks like the effect of pressing Enter, just dispatch an
  // Enter key instead.
  if (!$from.sameParent($to) && $from.pos < parse.doc.content.size && (nextSel = Selection.findFrom(parse.doc.resolve($from.pos + 1), 1, true)) && nextSel.head == $to.pos && view.someProp("handleKeyDown", function (f) {
    return f(view, keyEvent(13, "Enter"));
  })) return;
  // Same for backspace
  if (oldState.selection.anchor > change.start && looksLikeJoin(doc, change.start, change.endA, $from, $to) && view.someProp("handleKeyDown", function (f) {
    return f(view, keyEvent(8, "Backspace"));
  })) {
    if (result.android && result.chrome) {
      // #820
      view.selectionReader.suppressUpdates = true;
      setTimeout(function () {
        return view.selectionReader.suppressUpdates = false;
      }, 50);
    }
    return;
  }

  var from = mapping.map(change.start),
      to = mapping.map(change.endA, -1);

  var tr = void 0,
      storedMarks = void 0,
      markChange = void 0,
      $from1 = void 0;
  if ($from.sameParent($to) && $from.parent.inlineContent) {
    if ($from.pos == $to.pos) {
      // Deletion
      tr = view.state.tr.delete(from, to);
      storedMarks = doc.resolve(change.start).marksAcross(doc.resolve(change.endA));
    } else if ( // Adding or removing a mark
    change.endA == change.endB && ($from1 = doc.resolve(change.start)) && (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset), $from1.parent.content.cut($from1.parentOffset, change.endA - $from1.start())))) {
      tr = view.state.tr;
      if (markChange.type == "add") tr.addMark(from, to, markChange.mark);else tr.removeMark(from, to, markChange.mark);
    } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
      // Both positions in the same text node -- simply insert text
      var text = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
      if (view.someProp("handleTextInput", function (f) {
        return f(view, from, to, text);
      })) return;
      tr = view.state.tr.insertText(text, from, to);
    }
  }

  if (!tr) tr = view.state.tr.replace(from, to, parse.doc.slice(change.start - parse.from, change.endB - parse.from));
  if (parse.sel) {
    var _sel2 = resolveSelection(view, tr.doc, mapping, parse.sel);
    if (_sel2) tr.setSelection(_sel2);
  }
  if (storedMarks) tr.ensureMarks(storedMarks);
  view.dispatch(tr.scrollIntoView());
}

function resolveSelection(view, doc, mapping, parsedSel) {
  if (Math.max(parsedSel.anchor, parsedSel.head) > doc.content.size) return null;
  return selectionBetween(view, doc.resolve(mapping.map(parsedSel.anchor)), doc.resolve(mapping.map(parsedSel.head)));
}

function isMarkChange(cur, prev) {
  var curMarks = cur.firstChild.marks,
      prevMarks = prev.firstChild.marks;
  var added = curMarks,
      removed = prevMarks,
      type = void 0,
      mark = void 0,
      update = void 0;
  for (var i = 0; i < prevMarks.length; i++) {
    added = prevMarks[i].removeFromSet(added);
  }for (var _i = 0; _i < curMarks.length; _i++) {
    removed = curMarks[_i].removeFromSet(removed);
  }if (added.length == 1 && removed.length == 0) {
    mark = added[0];
    type = "add";
    update = function update(node) {
      return node.mark(mark.addToSet(node.marks));
    };
  } else if (added.length == 0 && removed.length == 1) {
    mark = removed[0];
    type = "remove";
    update = function update(node) {
      return node.mark(mark.removeFromSet(node.marks));
    };
  } else {
    return null;
  }
  var updated = [];
  for (var _i2 = 0; _i2 < prev.childCount; _i2++) {
    updated.push(update(prev.child(_i2)));
  }if (Fragment.from(updated).eq(cur)) return { mark: mark, type: type };
}

function looksLikeJoin(old, start, end, $newStart, $newEnd) {
  if (!$newStart.parent.isTextblock ||
  // The content must have shrunk
  end - start <= $newEnd.pos - $newStart.pos ||
  // newEnd must point directly at or after the end of the block that newStart points into
  skipClosingAndOpening($newStart, true, false) < $newEnd.pos) return false;

  var $start = old.resolve(start);
  // Start must be at the end of a block
  if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock) return false;
  var $next = old.resolve(skipClosingAndOpening($start, true, true));
  // The next textblock must start before end and end near it
  if (!$next.parent.isTextblock || $next.pos > end || skipClosingAndOpening($next, true, false) < end) return false;

  // The fragments after the join point must match
  return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content);
}

function skipClosingAndOpening($pos, fromEnd, mayOpen) {
  var depth = $pos.depth,
      end = fromEnd ? $pos.end() : $pos.pos;
  while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
    depth--;
    end++;
    fromEnd = false;
  }
  if (mayOpen) {
    var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
    while (next && !next.isLeaf) {
      next = next.firstChild;
      end++;
    }
  }
  return end;
}

function findDiff(a, b, pos, preferredPos, preferredSide) {
  var start = a.findDiffStart(b, pos);
  if (start == null) return null;

  var _a$findDiffEnd = a.findDiffEnd(b, pos + a.size, pos + b.size),
      endA = _a$findDiffEnd.a,
      endB = _a$findDiffEnd.b;

  if (preferredSide == "end") {
    var adjust = Math.max(0, start - Math.min(endA, endB));
    preferredPos -= endA + adjust - start;
  }
  if (endA < start && a.size < b.size) {
    var move = preferredPos <= start && preferredPos >= endA ? start - preferredPos : 0;
    start -= move;
    endB = start + (endB - endA);
    endA = start;
  } else if (endB < start) {
    var _move = preferredPos <= start && preferredPos >= endB ? start - preferredPos : 0;
    start -= _move;
    endA = start + (endA - endB);
    endB = start;
  }
  return { start: start, endA: endA, endB: endB };
}

function serializeForClipboard(view, slice) {
  var context = [],
      content = slice.content,
      openStart = slice.openStart,
      openEnd = slice.openEnd;
  while (openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1) {
    openStart--;
    openEnd--;
    var node = content.firstChild;
    context.push(node.type.name, node.type.hasRequiredAttrs() ? node.attrs : null);
    content = node.content;
  }

  var serializer = view.someProp('clipboardSerializer') || DOMSerializer.fromSchema(view.state.schema);
  var wrap = document.createElement('div');
  wrap.appendChild(serializer.serializeFragment(content));

  var firstChild = wrap.firstChild,
      needsWrap = void 0;
  while (firstChild && firstChild.nodeType === 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
    for (var i = needsWrap.length - 1; i >= 0; i--) {
      var wrapper = document.createElement(needsWrap[i]);
      while (wrap.firstChild) {
        wrapper.appendChild(wrap.firstChild);
      }
      wrap.appendChild(wrapper);
    }
    firstChild = wrap.firstChild;
  }

  if (firstChild && firstChild.nodeType === 1) {
    firstChild.setAttribute('data-pm-slice', openStart + ' ' + openEnd + ' ' + _JSON$stringify(context));
  }

  var text = view.someProp('clipboardTextSerializer', function (f) {
    return f(slice);
  }) || slice.content.textBetween(0, slice.content.size, '\n\n');
  return { dom: wrap, text: text };
}

function parseFromClipboard(view, text, html, plainText, $context) {
  var dom = void 0,
      inCode = $context.parent.type.spec.code,
      slice = void 0;
  if (!html && !text) return null;
  var asText = text && (plainText || inCode || !html);

  if (asText) {
    view.someProp('transformPastedText', function (f) {
      text = f(text);
    });
    if (inCode) return new Slice(Fragment.from(view.state.schema.text(text)), 0, 0);
    var parsed = view.someProp('clipboardTextParser', function (f) {
      return f(text, $context);
    });
    if (parsed) {
      slice = parsed;
    } else {
      dom = document.createElement('div');
      text.trim().split(/(?:\r\n?|\n)+/).forEach(function (block) {
        dom.appendChild(document.createElement('p')).textContent = block;
      });
    }
  } else {
    view.someProp('transformPastedHTML', function (f) {
      return html = f(html);
    });
    dom = readHTML(html);
  }

  var contextNode = dom && dom.querySelector('[data-pm-slice]');
  var sliceData = contextNode && /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute('data-pm-slice'));
  if (!slice) {
    var parser = view.someProp('clipboardParser') || view.someProp('domParser') || DOMParser.fromSchema(view.state.schema);
    slice = parser.parseSlice(dom, { preserveWhitespace: !!(asText || sliceData), context: $context });
  }
  if (sliceData) {
    slice = addContext(new Slice(slice.content, Math.min(slice.openStart, +sliceData[1]), Math.min(slice.openEnd, +sliceData[2])), sliceData[3]);
  } else {
    // HTML wasn't created by ProseMirror. Make sure top-level siblings are coherent
    slice = Slice.maxOpen(normalizeSiblings(slice.content, $context), false);
  }
  view.someProp('transformPasted', function (f) {
    slice = f(slice);
  });
  return slice;
}

function normalizeSiblings(fragment, $context) {
  if (fragment.childCount < 2) return fragment;

  var _loop = function _loop(d) {
    var parent = $context.node(d);
    var match = parent.contentMatchAt($context.index(d));
    var lastWrap = void 0,
        result = [];
    fragment.forEach(function (node) {
      if (!result) return;
      var wrap = match.findWrapping(node.type),
          inLast = void 0;
      if (!wrap) return result = null;
      if (inLast = result.length && lastWrap.length && addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) {
        result[result.length - 1] = inLast;
      } else {
        if (result.length) result[result.length - 1] = closeRight(result[result.length - 1], lastWrap.length);
        var wrapped = withWrappers(node, wrap);
        result.push(wrapped);
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });

    if (result) return {
        v: Fragment.from(result)
      };
  };

  for (var d = $context.depth; d >= 0; d--) {
    var _ret = _loop(d);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return fragment;
}

function withWrappers(node, wrap) {
  var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  for (var i = wrap.length - 1; i >= from; i--) {
    node = wrap[i].create(null, Fragment.from(node));
  }
  return node;
}

function addToSibling(wrap, lastWrap, node, sibling, depth) {
  if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
    var inner = addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
    if (inner) return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
    var _match = sibling.contentMatchAt(sibling.childCount);
    if (_match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1])) {
      return sibling.copy(sibling.content.append(Fragment.from(withWrappers(node, wrap, depth + 1))));
    }
  }
}

function closeRight(node, depth) {
  if (depth == 0) return node;
  var fragment = node.content.replaceChild(node.childCount - 1, closeRight(node.lastChild, depth - 1));
  var fill = node.contentMatchAt(node.childCount).fillBefore(Fragment.empty, true);
  return node.copy(fragment.append(fill));
}

var wrapMap = {
  thead: ['table'],
  colgroup: ['table'],
  col: ['table', 'colgroup'],
  tr: ['table', 'tbody'],
  td: ['table', 'tbody', 'tr'],
  th: ['table', 'tbody', 'tr']
};

var detachedDoc = null;
function readHTML(html) {
  var metas = /(\s*<meta [^>]*>)*/.exec(html);
  if (metas) {
    html = html.slice(metas[0].length);
  }
  var doc = detachedDoc || (detachedDoc = document.implementation.createHTMLDocument('title'));
  var elt = doc.createElement('div');
  var firstTag = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(html),
      wrap = void 0,
      depth = 0;
  if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
    html = wrap.map(function (n) {
      return '<' + n + '>';
    }).join('') + html + wrap.map(function (n) {
      return '</' + n + '>';
    }).reverse().join('');
    depth = wrap.length;
  }
  elt.innerHTML = html;
  for (var i = 0; i < depth; i++) {
    elt = elt.firstChild;
  }
  return elt;
}

function addContext(slice, context) {
  if (!slice.size) return slice;

  var schema = slice.content.firstChild.type.schema,
      array = void 0;
  try {
    array = JSON.parse(context);
  } catch (e) {
    return slice;
  }

  var content = slice.content,
      openStart = slice.openStart,
      openEnd = slice.openEnd;

  for (var i = array.length - 2; i >= 0; i -= 2) {
    var type = schema.nodes[array[i]];
    if (!type || type.hasRequiredAttrs()) break;
    content = Fragment.from(type.create(array[i + 1], content));
    openStart++;
    openEnd++;
  }
  return new Slice(content, openStart, openEnd);
}

var observeOptions = {
  childList: true,
  characterData: true,
  attributes: true,
  subtree: true,
  characterDataOldValue: true
};

// IE11 has very broken mutation observers, so we also listen to DOMCharacterDataModified
var useCharData = result.ie && result.ie_version <= 11;

var DOMObserver = function () {
  function DOMObserver(view) {
    var _this = this;

    _classCallCheck(this, DOMObserver);

    this.view = view;
    this.observer = window.MutationObserver && new window.MutationObserver(function (mutations) {
      return _this.registerMutations(mutations);
    });

    if (useCharData) {
      this.onCharData = function (e) {
        return _this.registerMutation({
          target: e.target,
          type: 'characterData',
          oldValue: e.prevValue
        });
      };
    }
  }

  _createClass(DOMObserver, [{
    key: 'start',
    value: function start() {
      if (this.observer) {
        this.observer.observe(this.view.dom, observeOptions);
      }

      if (useCharData) {
        this.view.dom.addEventListener('DOMCharacterDataModified', this.onCharData);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.observer) {
        this.flush();
        this.observer.disconnect();
      }

      if (useCharData) {
        this.view.dom.removeEventListener('DOMCharacterDataModified', this.onCharData);
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (this.observer) {
        this.registerMutations(this.observer.takeRecords());
      }
    }
  }, {
    key: 'registerMutations',
    value: function registerMutations(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        this.registerMutation(mutations[i]);
      }
    }
  }, {
    key: 'registerMutation',
    value: function registerMutation(mut) {
      if (!this.view.editable) return;

      var desc = this.view.docView.nearestDesc(mut.target);
      if (mut.type === 'attributes' && (desc == this.view.docView || mut.attributeName === 'contenteditable')) return;
      if (!desc || desc.ignoreMutation(mut)) return;

      var from = void 0,
          to = void 0;
      if (mut.type === 'childList') {
        var fromOffset = mut.previousSibling && mut.previousSibling.parentNode === mut.target ? domIndex(mut.previousSibling) + 1 : 0;
        if (fromOffset == -1) return;
        from = desc.localPosFromDOM(mut.target, fromOffset, -1);

        var toOffset = mut.nextSibling && mut.nextSibling.parentNode === mut.target ? domIndex(mut.nextSibling) : mut.target.childNodes.length;
        if (toOffset == -1) return;
        to = desc.localPosFromDOM(mut.target, toOffset, 1);
      } else if (mut.type === 'attributes') {
        from = desc.posAtStart - desc.border;
        to = desc.posAtEnd + desc.border;
      } else {
        // "characterData"
        from = desc.posAtStart;
        to = desc.posAtEnd;

        if (mut.target.nodeValue == mut.oldValue) {
          DOMChange.start(this.view).typeOver = true;
        }
      }

      DOMChange.start(this.view).addRange(from, to);
    }
  }]);

  return DOMObserver;
}();

var handlers = {};
var editHandlers = {};

function initInput(view) {
  view.shiftKey = false;
  view.mouseDown = null;
  view.inDOMChange = null;
  view.lastKeyCode = null;
  view.lastKeyCodeTime = 0;
  view.domObserver = new DOMObserver(view);
  view.domObserver.start();

  view.eventHandlers = _Object$create(null);

  var _loop = function _loop(event) {
    var handler = handlers[event];
    view.dom.addEventListener(event, view.eventHandlers[event] = function (event) {
      if (eventBelongsToView(view, event) && !runCustomHandler(view, event) && (view.editable || !(event.type in editHandlers))) {
        handler(view, event);
      }
    });
  };

  for (var event in handlers) {
    _loop(event);
  }
  ensureListeners(view);
}

function destroyInput(view) {
  view.domObserver.stop();
  if (view.inDOMChange) view.inDOMChange.destroy();
  for (var type in view.eventHandlers) {
    view.dom.removeEventListener(type, view.eventHandlers[type]);
  }
}

function ensureListeners(view) {
  view.someProp('handleDOMEvents', function (currentHandlers) {
    for (var type in currentHandlers) {
      if (!view.eventHandlers[type]) {
        view.dom.addEventListener(type, view.eventHandlers[type] = function (event) {
          return runCustomHandler(view, event);
        });
      }
    }
  });
}

function runCustomHandler(view, event) {
  return view.someProp('handleDOMEvents', function (handlers) {
    var handler = handlers[event.type];
    return handler ? handler(view, event) || event.defaultPrevented : false;
  });
}

function eventBelongsToView(view, event) {
  if (!event.bubbles) return true;
  if (event.defaultPrevented) return false;
  for (var node = event.target; node != view.dom; node = node.parentNode) {
    if (!node || node.nodeType === 11 || node.pmViewDesc && node.pmViewDesc.stopEvent(event)) {
      return false;
    }
  }
  return true;
}

function dispatchEvent(view, event) {
  if (!runCustomHandler(view, event) && handlers[event.type] && (view.editable || !(event.type in editHandlers))) {
    handlers[event.type](view, event);
  }
}

editHandlers.keydown = function (view, event) {
  view.shiftKey = event.keyCode === 16 || event.shiftKey;
  if (view.inDOMChange) {
    if (view.inDOMChange.composing) return;
    view.inDOMChange.finish();
  }
  view.lastKeyCode = event.keyCode;
  view.lastKeyCodeTime = Date.now();
  if (view.someProp('handleKeyDown', function (f) {
    return f(view, event);
  }) || captureKeyDown(view, event)) {
    event.preventDefault();
  } else {
    view.selectionReader.poll('key');
  }
};

editHandlers.keyup = function (view, e) {
  if (e.keyCode === 16) view.shiftKey = false;
};

editHandlers.keypress = function (view, event) {
  if (view.inDOMChange || !event.charCode || event.ctrlKey && !event.altKey || result.mac && event.metaKey) return;

  if (view.someProp('handleKeyPress', function (f) {
    return f(view, event);
  })) {
    event.preventDefault();
    return;
  }

  var sel = view.state.selection;
  if (!(sel instanceof TextSelection) || !sel.$from.sameParent(sel.$to)) {
    var text = String.fromCharCode(event.charCode);
    if (!view.someProp('handleTextInput', function (f) {
      return f(view, sel.$from.pos, sel.$to.pos, text);
    })) {
      view.dispatch(view.state.tr.insertText(text).scrollIntoView());
    }
    event.preventDefault();
  }
};

function eventCoords(event) {
  return {
    left: event.clientX,
    top: event.clientY
  };
}

var lastClick = {
  time: 0,
  x: 0,
  y: 0,
  type: ''
};

function isNear(event, click) {
  var dx = click.x - event.clientX,
      dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100;
}

function runHandlerOnContext(view, propName, pos, inside, event) {
  if (inside == -1) return false;
  var $pos = view.state.doc.resolve(inside);

  var _loop2 = function _loop2(i) {
    if (view.someProp(propName, function (f) {
      return i > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i), event, true) : f(view, pos, $pos.node(i), $pos.before(i), event, false);
    })) {
      return {
        v: true
      };
    }
  };

  for (var i = $pos.depth + 1; i > 0; i--) {
    var _ret2 = _loop2(i);

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  }
  return false;
}

function updateSelection(view, selection, origin) {
  if (!view.focused) view.focus();
  var tr = view.state.tr.setSelection(selection);
  if (origin === 'pointer') tr.setMeta('pointer', true);
  view.dispatch(tr);
}

function selectClickedLeaf(view, inside) {
  if (inside == -1) return false;
  var $pos = view.state.doc.resolve(inside),
      node = $pos.nodeAfter;
  if (node && node.isAtom && NodeSelection.isSelectable(node)) {
    updateSelection(view, new NodeSelection($pos), 'pointer');
    return true;
  }
  return false;
}

function selectClickedNode(view, inside) {
  if (inside == -1) return false;
  var sel = view.state.selection,
      selectedNode = void 0,
      selectAt = void 0;
  if (sel instanceof NodeSelection) selectedNode = sel.node;

  var $pos = view.state.doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    if (NodeSelection.isSelectable(node)) {
      if (selectedNode && sel.$from.depth > 0 && i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos) {
        selectAt = $pos.before(sel.$from.depth);
      } else {
        selectAt = $pos.before(i);
      }
      break;
    }
  }

  if (selectAt != null) {
    updateSelection(view, NodeSelection.create(view.state.doc, selectAt), 'pointer');
    return true;
  } else {
    return false;
  }
}

function handleSingleClick(view, pos, inside, event, selectNode) {
  return runHandlerOnContext(view, 'handleClickOn', pos, inside, event) || view.someProp('handleClick', function (f) {
    return f(view, pos, event);
  }) || (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside));
}

function handleDoubleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, 'handleDoubleClickOn', pos, inside, event) || view.someProp('handleDoubleClick', function (f) {
    return f(view, pos, event);
  });
}

function handleTripleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, 'handleTripleClickOn', pos, inside, event) || view.someProp('handleTripleClick', function (f) {
    return f(view, pos, event);
  }) || defaultTripleClick(view, inside);
}

function defaultTripleClick(view, inside) {
  var doc = view.state.doc;
  if (inside == -1) {
    if (doc.inlineContent) {
      updateSelection(view, TextSelection.create(doc, 0, doc.content.size), 'pointer');
      return true;
    }
    return false;
  }

  var $pos = doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    var nodePos = $pos.before(i);
    if (node.inlineContent) updateSelection(view, TextSelection.create(doc, nodePos + 1, nodePos + 1 + node.content.size), 'pointer');else if (NodeSelection.isSelectable(node)) updateSelection(view, NodeSelection.create(doc, nodePos), 'pointer');else continue;
    return true;
  }
}

function forceDOMFlush(view) {
  if (!view.inDOMChange) return false;
  view.inDOMChange.finish(true);
  return true;
}

var selectNodeModifier = result.mac ? 'metaKey' : 'ctrlKey';

handlers.mousedown = function (view, event) {
  view.shiftKey = event.shiftKey;
  var flushed = forceDOMFlush(view);
  var now = Date.now(),
      type = 'singleClick';
  if (now - lastClick.time < 500 && isNear(event, lastClick) && !event[selectNodeModifier]) {
    if (lastClick.type === 'singleClick') type = 'doubleClick';else if (lastClick.type === 'doubleClick') type = 'tripleClick';
  }
  lastClick = { time: now, x: event.clientX, y: event.clientY, type: type };

  var pos = view.posAtCoords(eventCoords(event));
  if (!pos) return;

  if (type === 'singleClick') view.mouseDown = new MouseDown(view, pos, event, flushed);else if ((type === 'doubleClick' ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event)) event.preventDefault();else view.selectionReader.poll('pointer');
};

var MouseDown = function () {
  function MouseDown(view, pos, event, flushed) {
    var _this = this;

    _classCallCheck(this, MouseDown);

    this.view = view;
    this.pos = pos;
    this.event = event;
    this.flushed = flushed;
    this.selectNode = event[selectNodeModifier];
    this.allowDefault = event.shiftKey;

    var targetNode = void 0,
        targetPos = void 0;
    if (pos.inside > -1) {
      targetNode = view.state.doc.nodeAt(pos.inside);
      targetPos = pos.inside;
    } else {
      var $pos = view.state.doc.resolve(pos.pos);
      targetNode = $pos.parent;
      targetPos = $pos.depth ? $pos.before() : 0;
    }

    this.mightDrag = null;
    this.target = flushed ? null : event.target;
    if (targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false || view.state.selection instanceof NodeSelection && targetPos == view.state.selection.from) this.mightDrag = { node: targetNode,
      pos: targetPos,
      addAttr: this.target && !this.target.draggable,
      setUneditable: this.target && result.gecko && !this.target.hasAttribute("contentEditable") };

    if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
      this.view.domObserver.stop();
      if (this.mightDrag.addAttr) this.target.draggable = true;
      if (this.mightDrag.setUneditable) setTimeout(function () {
        return _this.target.setAttribute('contentEditable', 'false');
      }, 20);
      this.view.domObserver.start();
    }

    view.root.addEventListener('mouseup', this.up = this.up.bind(this));
    view.root.addEventListener('mousemove', this.move = this.move.bind(this));
    view.selectionReader.poll('pointer');
  }

  _createClass(MouseDown, [{
    key: 'done',
    value: function done() {
      this.view.root.removeEventListener('mouseup', this.up);
      this.view.root.removeEventListener('mousemove', this.move);
      if (this.mightDrag && this.target) {
        this.view.domObserver.stop();
        if (this.mightDrag.addAttr) this.target.draggable = false;
        if (this.mightDrag.setUneditable) this.target.removeAttribute('contentEditable');
        this.view.domObserver.start();
      }
      this.view.mouseDown = null;
    }
  }, {
    key: 'up',
    value: function up(event) {
      this.done();

      if (!this.view.dom.contains(event.target.nodeType === 3 ? event.target.parentNode : event.target)) return;

      if (this.allowDefault) {
        // Force a cursor wrapper redraw if this was suppressed (to avoid an issue with IE drag-selection)
        if (result.ie && needsCursorWrapper(this.view.state)) this.view.updateState(this.view.state);
        this.view.selectionReader.poll('pointer');
      } else if (handleSingleClick(this.view, this.pos.pos, this.pos.inside, event, this.selectNode)) {
        event.preventDefault();
      } else if (this.flushed) {
        updateSelection(this.view, Selection.near(this.view.state.doc.resolve(this.pos.pos)), 'pointer');
        event.preventDefault();
      } else {
        this.view.selectionReader.poll('pointer');
      }
    }
  }, {
    key: 'move',
    value: function move(event) {
      if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 || Math.abs(this.event.y - event.clientY) > 4)) this.allowDefault = true;
      this.view.selectionReader.poll('pointer');
    }
  }]);

  return MouseDown;
}();

handlers.touchdown = function (view) {
  forceDOMFlush(view);
  view.selectionReader.poll('pointer');
};

handlers.contextmenu = function (view) {
  return forceDOMFlush(view);
};

editHandlers.compositionstart = editHandlers.compositionupdate = function (view) {
  DOMChange.start(view, true);
};

editHandlers.compositionend = function (view, e) {
  if (!view.inDOMChange) {
    if (e.data) DOMChange.start(view, true);else return;
  }

  view.inDOMChange.compositionEnd();
};

editHandlers.input = function (view) {
  var change = DOMChange.start(view);
  if (!change.composing) change.finish();
};

function captureCopy(view, dom) {
  var doc = dom.ownerDocument;
  var wrap = doc.body.appendChild(doc.createElement('div'));
  wrap.appendChild(dom);
  wrap.style.cssText = 'position: fixed; left: -10000px; top: 10px';
  var sel = getSelection(),
      range = doc.createRange();
  range.selectNodeContents(dom);
  view.dom.blur();
  sel.removeAllRanges();
  sel.addRange(range);
  setTimeout(function () {
    doc.body.removeChild(wrap);
    view.focus();
  }, 50);
}

var brokenClipboardAPI = result.ie && result.ie_version < 15 || result.ios && result.webkit_version < 604;

handlers.copy = editHandlers.cut = function (view, e) {
  var sel = view.state.selection,
      cut = e.type === 'cut';
  if (sel.empty) return;

  // IE and Edge's clipboard interface is completely broken
  var data = brokenClipboardAPI ? null : e.clipboardData;
  var slice = sel.content(),
      _serializeForClipboar = serializeForClipboard(view, slice),
      dom = _serializeForClipboar.dom,
      text = _serializeForClipboar.text;
  if (data) {
    e.preventDefault();
    data.clearData();
    data.setData('text/html', dom.innerHTML);
    data.setData('text/plain', text);
  } else {
    captureCopy(view, dom);
  }
  if (cut) view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta('uiEvent', 'cut'));
};

function sliceSingleNode(slice) {
  return slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 ? slice.content.firstChild : null;
}

function capturePaste(view, e) {
  // 返回某元素的根元素
  var doc = view.dom.ownerDocument;
  var plainText = view.shiftKey || view.state.selection.$from.parent.type.spec.code;
  var target = doc.body.appendChild(doc.createElement(plainText ? 'textarea' : 'div'));

  // 获取纯文本使用 textarea，获取 HTML数据使用 <div contentEditable=true></div>
  if (!plainText) {
    target.contentEditable = 'true';
  }

  target.style.cssText = 'position: fixed; left: -10000px; top: 10px';
  target.focus();

  setTimeout(function () {
    view.focus();
    doc.body.removeChild(target);

    if (plainText) {
      doPaste(view, target.value, null, e);
    } else {
      var html = (target.innerHTML || '').replace(/^([\s\S]*<div>)|(<\/div>[\s\S]*)$/gi, '');
      doPaste(view, target.textContent, html, e);
    }
  }, 50);
}

function doPaste(view, text, html, e) {
  var slice = parseFromClipboard(view, text, html, view.shiftKey, view.state.selection.$from);
  if (!slice) return false;

  if (view.someProp('handlePaste', function (f) {
    return f(view, e, slice);
  })) return true;

  var singleNode = sliceSingleNode(slice);
  var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, view.shiftKey) : view.state.tr.replaceSelection(slice);
  view.dispatch(tr.scrollIntoView().setMeta('paste', true).setMeta('uiEvent', 'paste'));
  return true;
}

// <= ie10 running
if (result.ie_version != null && result.ie_version <= 10) {
  editHandlers.beforepaste = function (view, e) {
    e.preventDefault();
    capturePaste(view, e);
  };
}

editHandlers.paste = function (view, e) {
  var data = brokenClipboardAPI ? null : e.clipboardData;
  if (data && (doPaste(view, data.getData('text/plain'), data.getData('text/html'), e) || data.files.length > 0)) {
    e.preventDefault();

    // ie11 running 或者 非ie且不满足以上if
  } else if (result.ie_version >= 11 || result.ie_version == null) {
    capturePaste(view, e);
  }
};

var Dragging = function Dragging(slice, move) {
  _classCallCheck(this, Dragging);

  this.slice = slice;
  this.move = move;
};

var dragCopyModifier = result.mac ? 'altKey' : 'ctrlKey';

handlers.dragstart = function (view, e) {
  console.log(e.target);
  if (e.target && e.target.nodeName === 'IMG') {
    e.preventDefault();
    return false;
  }

  var mouseDown = view.mouseDown;
  if (mouseDown) mouseDown.done();
  if (!e.dataTransfer) return;

  var sel = view.state.selection;
  var pos = sel.empty ? null : view.posAtCoords(eventCoords(e));
  if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof NodeSelection ? sel.to - 1 : sel.to)) {
    // In selection
  } else if (mouseDown && mouseDown.mightDrag) {
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, mouseDown.mightDrag.pos)));
  } else if (e.target && e.target.nodeType === 1) {
    var desc = view.docView.nearestDesc(e.target, true);
    if (!desc || !desc.node.type.spec.draggable || desc == view.docView) return;
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, desc.posBefore)));
  }

  var slice = view.state.selection.content(),
      _serializeForClipboar2 = serializeForClipboard(view, slice),
      dom = _serializeForClipboar2.dom,
      text = _serializeForClipboar2.text;
  e.dataTransfer.clearData();
  e.dataTransfer.setData(brokenClipboardAPI ? 'Text' : 'text/html', dom.innerHTML);
  if (!brokenClipboardAPI) e.dataTransfer.setData('text/plain', text);
  view.dragging = new Dragging(slice, !e[dragCopyModifier]);
};

handlers.dragend = function (view) {
  window.setTimeout(function () {
    return view.dragging = null;
  }, 50);
};

editHandlers.dragover = editHandlers.dragleave = editHandlers.dragenter = function (_, e) {
  return e.preventDefault();
};

editHandlers.drop = function (view, e) {
  var dragging = view.dragging;
  view.dragging = null;
  if (!e.dataTransfer) return;

  var eventPos = view.posAtCoords(eventCoords(e));
  if (!eventPos) return;

  var $mouse = view.state.doc.resolve(eventPos.pos);
  if (!$mouse) return;

  var slice = dragging && dragging.slice || parseFromClipboard(view, e.dataTransfer.getData(brokenClipboardAPI ? 'Text' : 'text/plain'), brokenClipboardAPI ? null : e.dataTransfer.getData('text/html'), false, $mouse);
  if (!slice) return;

  e.preventDefault();
  if (view.someProp('handleDrop', function (f) {
    return f(view, e, slice, dragging && dragging.move);
  })) return;
  var insertPos = slice ? dropPoint(view.state.doc, $mouse.pos, slice) : $mouse.pos;
  if (insertPos == null) insertPos = $mouse.pos;

  var tr = view.state.tr;
  if (dragging && dragging.move) tr.deleteSelection();

  var pos = tr.mapping.map(insertPos);
  var isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
  var beforeInsert = tr.doc;
  if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild);else tr.replaceRange(pos, pos, slice);
  if (tr.doc.eq(beforeInsert)) return;

  var $pos = tr.doc.resolve(pos);
  if (isNode && NodeSelection.isSelectable(slice.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) tr.setSelection(new NodeSelection($pos));else tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(tr.mapping.map(insertPos))));
  view.focus();
  view.dispatch(tr.setMeta('uiEvent', 'drop'));
};

handlers.focus = function (view) {
  if (!view.focused) {
    view.dom.classList.add('ProseMirror-focused');
    view.focused = true;
  }
};

handlers.blur = function (view) {
  if (view.focused) {
    view.dom.classList.remove('ProseMirror-focused');
    view.focused = false;
  }
};

// Make sure all handlers get registered
for (var prop in editHandlers) {
  handlers[prop] = editHandlers[prop];
}

function compareObjs(a, b) {
  if (a == b) return true;
  for (var p in a) {
    if (a[p] !== b[p]) return false;
  }for (var _p in b) {
    if (!(_p in a)) return false;
  }return true;
}

var WidgetType = function () {
  function WidgetType(toDOM, spec) {
    _classCallCheck(this, WidgetType);

    this.spec = spec || noSpec;
    this.side = this.spec.side || 0;
    this.toDOM = toDOM;
  }

  _createClass(WidgetType, [{
    key: 'map',
    value: function map(mapping, span, offset, oldOffset) {
      var _mapping$mapResult = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1),
          pos = _mapping$mapResult.pos,
          deleted = _mapping$mapResult.deleted;

      return deleted ? null : new Decoration(pos - offset, pos - offset, this);
    }
  }, {
    key: 'valid',
    value: function valid() {
      return true;
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return this == other || other instanceof WidgetType && (this.spec.key && this.spec.key == other.spec.key || this.toDOM == other.toDOM && compareObjs(this.spec, other.spec));
    }
  }]);

  return WidgetType;
}();

var InlineType = function () {
  function InlineType(attrs, spec) {
    _classCallCheck(this, InlineType);

    this.spec = spec || noSpec;
    this.attrs = attrs;
  }

  _createClass(InlineType, [{
    key: 'map',
    value: function map(mapping, span, offset, oldOffset) {
      var from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset;
      var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset;
      return from >= to ? null : new Decoration(from, to, this);
    }
  }, {
    key: 'valid',
    value: function valid(_, span) {
      return span.from < span.to;
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return this == other || other instanceof InlineType && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
    }
  }], [{
    key: 'is',
    value: function is(span) {
      return span.type instanceof InlineType;
    }
  }]);

  return InlineType;
}();

var NodeType$1 = function () {
  function NodeType(attrs, spec) {
    _classCallCheck(this, NodeType);

    this.spec = spec || noSpec;
    this.attrs = attrs;
  }

  _createClass(NodeType, [{
    key: 'map',
    value: function map(mapping, span, offset, oldOffset) {
      var from = mapping.mapResult(span.from + oldOffset, 1);
      if (from.deleted) return null;
      var to = mapping.mapResult(span.to + oldOffset, -1);
      if (to.deleted || to.pos <= from.pos) return null;
      return new Decoration(from.pos - offset, to.pos - offset, this);
    }
  }, {
    key: 'valid',
    value: function valid(node, span) {
      var _node$content$findInd = node.content.findIndex(span.from),
          index = _node$content$findInd.index,
          offset = _node$content$findInd.offset;

      return offset == span.from && offset + node.child(index).nodeSize == span.to;
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return this == other || other instanceof NodeType && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
    }
  }]);

  return NodeType;
}();

var Decoration = function () {
  function Decoration(from, to, type) {
    _classCallCheck(this, Decoration);

    this.from = from;
    this.to = to;
    this.type = type;
  }

  _createClass(Decoration, [{
    key: 'copy',
    value: function copy(from, to) {
      return new Decoration(from, to, this.type);
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return this.type.eq(other.type) && this.from == other.from && this.to == other.to;
    }
  }, {
    key: 'map',
    value: function map(mapping, offset, oldOffset) {
      return this.type.map(mapping, this, offset, oldOffset);
    }
  }, {
    key: 'spec',
    get: function get() {
      return this.type.spec;
    }
  }], [{
    key: 'widget',
    value: function widget(pos, toDOM, spec) {
      return new Decoration(pos, pos, new WidgetType(toDOM, spec));
    }
  }, {
    key: 'inline',
    value: function inline(from, to, attrs, spec) {
      return new Decoration(from, to, new InlineType(attrs, spec));
    }
  }, {
    key: 'node',
    value: function node(from, to, attrs, spec) {
      return new Decoration(from, to, new NodeType$1(attrs, spec));
    }
  }]);

  return Decoration;
}();

var none = [];
var noSpec = {};

var DecorationSet = function () {
  function DecorationSet(local, children) {
    _classCallCheck(this, DecorationSet);

    this.local = local && local.length ? local : none;
    this.children = children && children.length ? children : none;
  }

  _createClass(DecorationSet, [{
    key: 'find',
    value: function find(start, end, predicate) {
      var result = [];
      this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate);
      return result;
    }
  }, {
    key: 'findInner',
    value: function findInner(start, end, result, offset, predicate) {
      for (var i = 0; i < this.local.length; i++) {
        var span = this.local[i];
        if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec))) result.push(span.copy(span.from + offset, span.to + offset));
      }
      for (var _i = 0; _i < this.children.length; _i += 3) {
        if (this.children[_i] < end && this.children[_i + 1] > start) {
          var childOff = this.children[_i] + 1;
          this.children[_i + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate);
        }
      }
    }
  }, {
    key: 'map',
    value: function map(mapping, doc, options) {
      if (this == empty || mapping.maps.length == 0) return this;
      return this.mapInner(mapping, doc, 0, 0, options || noSpec);
    }
  }, {
    key: 'mapInner',
    value: function mapInner(mapping, node, offset, oldOffset, options) {
      var newLocal = void 0;
      for (var i = 0; i < this.local.length; i++) {
        var mapped = this.local[i].map(mapping, offset, oldOffset);
        if (mapped && mapped.type.valid(node, mapped)) (newLocal || (newLocal = [])).push(mapped);else if (options.onRemove) options.onRemove(this.local[i].spec);
      }

      if (this.children.length) return mapChildren(this.children, newLocal, mapping, node, offset, oldOffset, options);else return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty;
    }
  }, {
    key: 'add',
    value: function add(doc, decorations) {
      if (!decorations.length) return this;
      if (this == empty) return DecorationSet.create(doc, decorations);
      return this.addInner(doc, decorations, 0);
    }
  }, {
    key: 'addInner',
    value: function addInner(doc, decorations, offset) {
      var _this = this;

      var children = void 0,
          childIndex = 0;
      doc.forEach(function (childNode, childOffset) {
        var baseOffset = childOffset + offset,
            found = void 0;
        if (!(found = takeSpansForNode(decorations, childNode, baseOffset))) return;

        if (!children) children = _this.children.slice();
        while (childIndex < children.length && children[childIndex] < childOffset) {
          childIndex += 3;
        }if (children[childIndex] == childOffset) children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1);else children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found, childNode, baseOffset + 1, noSpec));
        childIndex += 3;
      });

      var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset);
      return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local, children || this.children);
    }
  }, {
    key: 'remove',
    value: function remove(decorations) {
      if (decorations.length == 0 || this == empty) return this;
      return this.removeInner(decorations, 0);
    }
  }, {
    key: 'removeInner',
    value: function removeInner(decorations, offset) {
      var children = this.children,
          local = this.local;
      for (var i = 0; i < children.length; i += 3) {
        var found = void 0,
            from = children[i] + offset,
            to = children[i + 1] + offset;
        for (var j = 0, span; j < decorations.length; j++) {
          if (span = decorations[j]) {
            if (span.from > from && span.to < to) {
              decorations[j] = null;(found || (found = [])).push(span);
            }
          }
        }if (!found) continue;
        if (children == this.children) children = this.children.slice();
        var removed = children[i + 2].removeInner(found, from + 1);
        if (removed != empty) {
          children[i + 2] = removed;
        } else {
          children.splice(i, 3);
          i -= 3;
        }
      }
      if (local.length) for (var _i2 = 0, _span; _i2 < decorations.length; _i2++) {
        if (_span = decorations[_i2]) {
          for (var _j = 0; _j < local.length; _j++) {
            if (local[_j].type.eq(_span.type)) {
              if (local == this.local) local = this.local.slice();
              local.splice(_j--, 1);
            }
          }
        }
      }if (children == this.children && local == this.local) return this;
      return local.length || children.length ? new DecorationSet(local, children) : empty;
    }
  }, {
    key: 'forChild',
    value: function forChild(offset, node) {
      if (this == empty) return this;
      if (node.isLeaf) return DecorationSet.empty;

      var child = void 0,
          local = void 0;
      for (var i = 0; i < this.children.length; i += 3) {
        if (this.children[i] >= offset) {
          if (this.children[i] == offset) child = this.children[i + 2];
          break;
        }
      }var start = offset + 1,
          end = start + node.content.size;
      for (var _i3 = 0; _i3 < this.local.length; _i3++) {
        var dec = this.local[_i3];
        if (dec.from < end && dec.to > start && dec.type instanceof InlineType) {
          var from = Math.max(start, dec.from) - start,
              to = Math.min(end, dec.to) - start;
          if (from < to) (local || (local = [])).push(dec.copy(from, to));
        }
      }
      if (local) {
        var localSet = new DecorationSet(local.sort(byPos));
        return child ? new DecorationGroup([localSet, child]) : localSet;
      }
      return child || empty;
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      if (this == other) return true;
      if (!(other instanceof DecorationSet) || this.local.length != other.local.length || this.children.length != other.children.length) return false;
      for (var i = 0; i < this.local.length; i++) {
        if (!this.local[i].eq(other.local[i])) return false;
      }for (var _i4 = 0; _i4 < this.children.length; _i4 += 3) {
        if (this.children[_i4] != other.children[_i4] || this.children[_i4 + 1] != other.children[_i4 + 1] || !this.children[_i4 + 2].eq(other.children[_i4 + 2])) return false;
      }return false;
    }
  }, {
    key: 'locals',
    value: function locals(node) {
      return removeOverlap(this.localsInner(node));
    }
  }, {
    key: 'localsInner',
    value: function localsInner(node) {
      if (this == empty) return none;
      if (node.inlineContent || !this.local.some(InlineType.is)) return this.local;
      var result = [];
      for (var i = 0; i < this.local.length; i++) {
        if (!(this.local[i].type instanceof InlineType)) result.push(this.local[i]);
      }
      return result;
    }
  }], [{
    key: 'create',
    value: function create(doc, decorations) {
      return decorations.length ? buildTree(decorations, doc, 0, noSpec) : empty;
    }
  }]);

  return DecorationSet;
}();

var empty = new DecorationSet();

DecorationSet.empty = empty;

DecorationSet.removeOverlap = removeOverlap;

var DecorationGroup = function () {
  function DecorationGroup(members) {
    _classCallCheck(this, DecorationGroup);

    this.members = members;
  }

  _createClass(DecorationGroup, [{
    key: 'forChild',
    value: function forChild(offset, child) {
      if (child.isLeaf) return DecorationSet.empty;
      var found = [];
      for (var i = 0; i < this.members.length; i++) {
        var result = this.members[i].forChild(offset, child);
        if (result == empty) continue;
        if (result instanceof DecorationGroup) found = found.concat(result.members);else found.push(result);
      }
      return DecorationGroup.from(found);
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      if (!(other instanceof DecorationGroup) || other.members.length != this.members.length) return false;
      for (var i = 0; i < this.members.length; i++) {
        if (!this.members[i].eq(other.members[i])) return false;
      }return true;
    }
  }, {
    key: 'locals',
    value: function locals(node) {
      var result = void 0,
          sorted = true;
      for (var i = 0; i < this.members.length; i++) {
        var locals = this.members[i].localsInner(node);
        if (!locals.length) continue;
        if (!result) {
          result = locals;
        } else {
          if (sorted) {
            result = result.slice();
            sorted = false;
          }
          for (var j = 0; j < locals.length; j++) {
            result.push(locals[j]);
          }
        }
      }
      return result ? removeOverlap(sorted ? result : result.sort(byPos)) : none;
    }
  }], [{
    key: 'from',
    value: function from(members) {
      switch (members.length) {
        case 0:
          return empty;
        case 1:
          return members[0];
        default:
          return new DecorationGroup(members);
      }
    }
  }]);

  return DecorationGroup;
}();

function mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
  var children = oldChildren.slice();

  var shift = function shift(oldStart, oldEnd, newStart, newEnd) {
    for (var i = 0; i < children.length; i += 3) {
      var end = children[i + 1],
          dSize = void 0;
      if (end == -1 || oldStart > end + oldOffset) continue;
      if (oldEnd >= children[i] + oldOffset) {
        children[i + 1] = -1;
      } else if (dSize = newEnd - newStart - (oldEnd - oldStart) + (oldOffset - offset)) {
        children[i] += dSize;
        children[i + 1] += dSize;
      }
    }
  };
  for (var i = 0; i < mapping.maps.length; i++) {
    mapping.maps[i].forEach(shift);
  }var mustRebuild = false;
  for (var _i5 = 0; _i5 < children.length; _i5 += 3) {
    if (children[_i5 + 1] == -1) {
      // Touched nodes
      var from = mapping.map(children[_i5] + oldOffset),
          fromLocal = from - offset;
      if (fromLocal < 0 || fromLocal >= node.content.size) {
        mustRebuild = true;
        continue;
      }
      // Must read oldChildren because children was tagged with -1
      var to = mapping.map(oldChildren[_i5 + 1] + oldOffset, -1),
          toLocal = to - offset;

      var _node$content$findInd2 = node.content.findIndex(fromLocal),
          index = _node$content$findInd2.index,
          childOffset = _node$content$findInd2.offset;

      var childNode = node.maybeChild(index);
      if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
        var mapped = children[_i5 + 2].mapInner(mapping, childNode, from + 1, children[_i5] + oldOffset + 1, options);
        if (mapped != empty) {
          children[_i5] = fromLocal;
          children[_i5 + 1] = toLocal;
          children[_i5 + 2] = mapped;
        } else {
          children[_i5 + 1] = -2;
          mustRebuild = true;
        }
      } else {
        mustRebuild = true;
      }
    }
  } // Remaining children must be collected and rebuilt into the appropriate structure
  if (mustRebuild) {
    var decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal ? moveSpans(newLocal, offset) : [], mapping, offset, oldOffset, options);
    var built = buildTree(decorations, node, 0, options);
    newLocal = built.local;
    for (var _i6 = 0; _i6 < children.length; _i6 += 3) {
      if (children[_i6 + 1] < 0) {
        children.splice(_i6, 3);
        _i6 -= 3;
      }
    }for (var _i7 = 0, j = 0; _i7 < built.children.length; _i7 += 3) {
      var _from = built.children[_i7];
      while (j < children.length && children[j] < _from) {
        j += 3;
      }children.splice(j, 0, built.children[_i7], built.children[_i7 + 1], built.children[_i7 + 2]);
    }
  }

  return new DecorationSet(newLocal && newLocal.sort(byPos), children);
}

function moveSpans(spans, offset) {
  if (!offset || !spans.length) return spans;
  var result = [];
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    result.push(new Decoration(span.from + offset, span.to + offset, span.type));
  }
  return result;
}

function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset, oldOffset, options) {
  // Gather all decorations from the remaining marked children
  function gather(set, oldOffset) {
    for (var i = 0; i < set.local.length; i++) {
      var mapped = set.local[i].map(mapping, offset, oldOffset);
      if (mapped) decorations.push(mapped);else if (options.onRemove) options.onRemove(set.local[i].spec);
    }
    for (var _i8 = 0; _i8 < set.children.length; _i8 += 3) {
      gather(set.children[_i8 + 2], set.children[_i8] + oldOffset + 1);
    }
  }
  for (var i = 0; i < children.length; i += 3) {
    if (children[i + 1] == -1) gather(children[i + 2], oldChildren[i] + oldOffset + 1);
  }return decorations;
}

function takeSpansForNode(spans, node, offset) {
  if (node.isLeaf) return null;
  var end = offset + node.nodeSize,
      found = null;
  for (var i = 0, span; i < spans.length; i++) {
    if ((span = spans[i]) && span.from > offset && span.to < end) {
      (found || (found = [])).push(span);
      spans[i] = null;
    }
  }
  return found;
}

function withoutNulls(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] != null) result.push(array[i]);
  }return result;
}

function buildTree(spans, node, offset, options) {
  var children = [],
      hasNulls = false;
  node.forEach(function (childNode, localStart) {
    var found = takeSpansForNode(spans, childNode, localStart + offset);
    if (found) {
      hasNulls = true;
      var subtree = buildTree(found, childNode, offset + localStart + 1, options);
      if (subtree != empty) children.push(localStart, localStart + childNode.nodeSize, subtree);
    }
  });
  var locals = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset).sort(byPos);
  for (var i = 0; i < locals.length; i++) {
    if (!locals[i].type.valid(node, locals[i])) {
      if (options.onRemove) options.onRemove(locals[i].spec);
      locals.splice(i--, 1);
    }
  }return locals.length || children.length ? new DecorationSet(locals, children) : empty;
}

function byPos(a, b) {
  return a.from - b.from || a.to - b.to;
}

function removeOverlap(spans) {
  var working = spans;
  for (var i = 0; i < working.length - 1; i++) {
    var span = working[i];
    if (span.from != span.to) for (var j = i + 1; j < working.length; j++) {
      var next = working[j];
      if (next.from == span.from) {
        if (next.to != span.to) {
          if (working == spans) working = spans.slice();
          // Followed by a partially overlapping larger span. Split that
          // span.
          working[j] = next.copy(next.from, span.to);
          insertAhead(working, j + 1, next.copy(span.to, next.to));
        }
        continue;
      } else {
        if (next.from < span.to) {
          if (working == spans) working = spans.slice();
          // The end of this one overlaps with a subsequent span. Split
          // this one.
          working[i] = span.copy(span.from, next.from);
          insertAhead(working, j, span.copy(next.from, span.to));
        }
        break;
      }
    }
  }
  return working;
}

function insertAhead(array, i, deco) {
  while (i < array.length && byPos(deco, array[i]) > 0) {
    i++;
  }array.splice(i, 0, deco);
}

function viewDecorations(view) {
  var found = [];
  view.someProp('decorations', function (f) {
    var result = f(view.state);
    if (result && result != empty) found.push(result);
  });
  if (view.cursorWrapper) found.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco]));
  return DecorationGroup.from(found);
}

var EditorView = function () {
  function EditorView(place, props) {
    _classCallCheck(this, EditorView);

    this._props = props;
    this.state = props.state;
    this.dispatch = this.dispatch.bind(this);
    this._root = null;
    this.focused = false;

    this.dom = place && place.mount || document.createElement('div');
    if (place) {
      if (place.appendChild) {
        place.appendChild(this.dom);
      } else if (place.apply) {
        place(this.dom);
      } else if (place.mount) {
        this.mounted = true;
      }
    }

    this.editable = getEditable(this);
    this.cursorWrapper = null;
    updateCursorWrapper(this);
    this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);

    this.lastSelectedViewDesc = null;
    this.dragging = null;
    initInput(this);

    this.selectionReader = new SelectionReader(this);
    this.pluginViews = [];
    this.updatePluginViews();
  }

  _createClass(EditorView, [{
    key: 'update',
    value: function update(props) {
      if (props.handleDOMEvents !== this._props.handleDOMEvents) {
        ensureListeners(this);
      }
      this._props = props;
      this.updateState(props.state);
    }
  }, {
    key: 'setProps',
    value: function setProps(props) {
      var updated = {};
      for (var name in this._props) {
        updated[name] = this._props[name];
      }updated.state = this.state;
      for (var _name in props) {
        updated[_name] = props[_name];
      }this.update(updated);
    }
  }, {
    key: 'updateState',
    value: function updateState(state) {
      var _this = this;

      var prev = this.state;
      this.state = state;
      if (prev.plugins != state.plugins) ensureListeners(this);

      this.domObserver.flush();
      if (this.inDOMChange && this.inDOMChange.stateUpdated(state)) return;

      var prevEditable = this.editable;
      this.editable = getEditable(this);
      updateCursorWrapper(this);
      var innerDeco = viewDecorations(this),
          outerDeco = computeDocDeco(this);

      var scroll = prev.config != state.config ? 'reset' : state.scrollToSelection > prev.scrollToSelection ? 'to selection' : 'preserve';
      var updateDoc = !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
      var updateSel = updateDoc || !state.selection.eq(prev.selection) || this.selectionReader.domChanged();
      var oldScrollPos = scroll === 'preserve' && updateSel && storeScrollPos(this);

      if (updateSel) {
        this.domObserver.stop();
        if (updateDoc) {
          if (!this.docView.update(state.doc, outerDeco, innerDeco, this)) {
            this.docView.destroy();
            this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
          }
          this.selectionReader.clearDOMState();
        }
        selectionToDOM(this);
        this.domObserver.start();
      }

      if (prevEditable != this.editable) this.selectionReader.editableChanged();
      this.updatePluginViews(prev);

      if (scroll === 'reset') {
        this.dom.scrollTop = 0;
      } else if (scroll === 'to selection') {
        var startDOM = this.root.getSelection().focusNode;
        if (this.someProp('handleScrollToSelection', function (f) {
          return f(_this);
        })) {} // Handled
        else if (state.selection instanceof NodeSelection) scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect(), startDOM);else scrollRectIntoView(this, this.coordsAtPos(state.selection.head), startDOM);
      } else if (oldScrollPos) {
        resetScrollPos(oldScrollPos);
      }
    }
  }, {
    key: 'destroyPluginViews',
    value: function destroyPluginViews() {
      var view = void 0;
      while (view = this.pluginViews.pop()) {
        if (view.destroy) view.destroy();
      }
    }
  }, {
    key: 'updatePluginViews',
    value: function updatePluginViews(prevState) {
      var plugins = this.state.plugins;
      if (!prevState || prevState.plugins !== plugins) {
        this.destroyPluginViews();
        for (var i = 0, len = plugins.length; i < len; i++) {
          var plugin = plugins[i];
          if (plugin.spec.view) this.pluginViews.push(plugin.spec.view(this));
        }
      } else {
        for (var _i = 0; _i < this.pluginViews.length; _i++) {
          var pluginView = this.pluginViews[_i];
          if (pluginView.update) pluginView.update(this, prevState);
        }
      }
    }
  }, {
    key: 'someProp',
    value: function someProp(propName, f) {
      var prop = this._props && this._props[propName];
      var value = void 0;

      if (prop != null && (value = f ? f(prop) : prop)) {
        return value;
      }

      var plugins = this.state.plugins;
      if (plugins) {
        for (var i = 0, len = plugins.length; i < len; i++) {
          var _prop = plugins[i].props[propName];
          if (_prop != null && (value = f ? f(_prop) : _prop)) {
            return value;
          }
        }
      }
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.root.activeElement === this.dom;
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.domObserver.stop();
      selectionToDOM(this, true);
      this.domObserver.start();
      if (this.editable) this.dom.focus();
    }
  }, {
    key: 'posAtCoords',
    value: function posAtCoords$$1(coords) {
      var pos = posAtCoords(this, coords);
      if (this.inDOMChange && pos) {
        pos.pos = this.inDOMChange.mapping.map(pos.pos);
        if (pos.inside != -1) {
          pos.inside = this.inDOMChange.mapping.map(pos.inside);
        }
      }
      return pos;
    }
  }, {
    key: 'coordsAtPos',
    value: function coordsAtPos$$1(pos) {
      if (this.inDOMChange) {
        pos = this.inDOMChange.mapping.invert().map(pos);
      }
      return coordsAtPos(this, pos);
    }
  }, {
    key: 'domAtPos',
    value: function domAtPos(pos) {
      if (this.inDOMChange) {
        pos = this.inDOMChange.mapping.invert().map(pos);
      }
      return this.docView.domFromPos(pos);
    }
  }, {
    key: 'nodeDOM',
    value: function nodeDOM(pos) {
      if (this.inDOMChange) {
        pos = this.inDOMChange.mapping.invert().map(pos);
      }
      var desc = this.docView.descAt(pos);
      return desc ? desc.nodeDOM : null;
    }
  }, {
    key: 'posAtDOM',
    value: function posAtDOM(node, offset) {
      var bias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      var pos = this.docView.posFromDOM(node, offset, bias);
      if (pos == null) {
        throw new RangeError('DOM position not inside the editor');
      }
      if (this.inDOMChange) {
        pos = this.inDOMChange.mapping.map(pos);
      }
      return pos;
    }
  }, {
    key: 'endOfTextblock',
    value: function endOfTextblock$$1(dir, state) {
      return endOfTextblock(this, state || this.state, dir);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (!this.docView) return;

      destroyInput(this);
      this.destroyPluginViews();
      this.selectionReader.destroy();

      if (this.mounted) {
        this.docView.update(this.state.doc, [], viewDecorations(this), this);
        this.dom.textContent = '';
      } else if (this.dom.parentNode) {
        this.dom.parentNode.removeChild(this.dom);
      }
      this.docView.destroy();
      this.docView = null;
    }

    // Used for testing.

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent$$1(event) {
      return dispatchEvent(this, event);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(tr) {
      var dispatchTransaction = this._props.dispatchTransaction;
      if (dispatchTransaction) {
        dispatchTransaction.call(this, tr);
      } else {
        this.updateState(this.state.apply(tr));
      }
    }
  }, {
    key: 'props',
    get: function get() {
      if (this._props.state !== this.state) {
        var prev = this._props;
        this._props = {};
        for (var name in prev) {
          this._props[name] = prev[name];
        }
        this._props.state = this.state;
      }
      return this._props;
    }
  }, {
    key: 'root',
    get: function get() {
      var cached = this._root;
      if (cached == null) {
        for (var search = this.dom.parentNode; search; search = search.parentNode) {
          if (search.nodeType === 9 || search.nodeType === 11 && search.host) {
            return this._root = search;
          }
        }
      }
      return cached || document;
    }
  }]);

  return EditorView;
}();

function computeDocDeco(view) {
  var attrs = _Object$create(null);
  attrs.class = 'ProseMirror' + (view.focused ? ' ProseMirror-focused' : '');
  attrs.contenteditable = String(view.editable);

  view.someProp('attributes', function (value) {
    if (typeof value === 'function') {
      value = value(view.state);
    }

    if (value) {
      for (var attr in value) {
        if (attr === 'class') {
          attrs.class += ' ' + value[attr];
        } else if (!attrs[attr] && attr !== 'contenteditable' && attr !== 'nodeName') {
          attrs[attr] = String(value[attr]);
        }
      }
    }
  });

  return [Decoration.node(0, view.state.doc.content.size, attrs)];
}

function cursorWrapperDOM(visible) {
  var span = document.createElement('span');
  // zero-width non-breaking space
  span.textContent = '\uFEFF';
  if (!visible) {
    span.style.position = 'absolute';
    span.style.left = '-100000px';
  }
  return span;
}

function updateCursorWrapper(view) {
  var $pos = needsCursorWrapper(view.state);
  // On IE/Edge, moving the DOM selection will abort a mouse drag, so
  // there we delay the creation of the wrapper when the mouse is down.
  if ($pos && !(result.ie && view.mouseDown)) {
    var visible = view.state.selection.visible;
    // Needs a cursor wrapper
    var marks = view.state.storedMarks || $pos.marks(),
        dom = void 0;
    if (!view.cursorWrapper || !Mark.sameSet(view.cursorWrapper.deco.spec.marks, marks) || view.cursorWrapper.dom.textContent !== '\uFEFF' || view.cursorWrapper.deco.spec.visible != visible) {
      dom = cursorWrapperDOM(visible);
    } else if (view.cursorWrapper.deco.pos != $pos.pos) {
      dom = view.cursorWrapper.dom;
    }

    if (dom) {
      view.cursorWrapper = {
        dom: dom,
        deco: Decoration.widget($pos.pos, dom, {
          isCursorWrapper: true,
          marks: marks,
          raw: true,
          visible: visible
        })
      };
    }
  } else {
    view.cursorWrapper = null;
  }
}

function getEditable(view) {
  return !view.someProp('editable', function (value) {
    return value(view.state) === false;
  });
}

var GOOD_LEAF_SIZE = 200;

// :: class<T> A rope sequence is a persistent sequence data structure
// that supports appending, prepending, and slicing without doing a
// full copy. It is represented as a mostly-balanced tree.
var RopeSequence = function RopeSequence () {};

RopeSequence.prototype.append = function append (other) {
  if (!other.length) { return this }
  other = RopeSequence.from(other);

  return (!this.length && other) ||
    (other.length < GOOD_LEAF_SIZE && this.leafAppend(other)) ||
    (this.length < GOOD_LEAF_SIZE && other.leafPrepend(this)) ||
    this.appendInner(other)
};

// :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
// Prepend an array or other rope to this one, returning a new rope.
RopeSequence.prototype.prepend = function prepend (other) {
  if (!other.length) { return this }
  return RopeSequence.from(other).append(this)
};

RopeSequence.prototype.appendInner = function appendInner (other) {
  return new Append(this, other)
};

// :: (?number, ?number) → RopeSequence<T>
// Create a rope repesenting a sub-sequence of this rope.
RopeSequence.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from >= to) { return RopeSequence.empty }
  return this.sliceInner(Math.max(0, from), Math.min(this.length, to))
};

// :: (number) → T
// Retrieve the element at the given position from this rope.
RopeSequence.prototype.get = function get (i) {
  if (i < 0 || i >= this.length) { return undefined }
  return this.getInner(i)
};

// :: ((element: T, index: number) → ?bool, ?number, ?number)
// Call the given function for each element between the given
// indices. This tends to be more efficient than looping over the
// indices and calling `get`, because it doesn't have to descend the
// tree for every element.
RopeSequence.prototype.forEach = function forEach (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from <= to)
    { this.forEachInner(f, from, to, 0); }
  else
    { this.forEachInvertedInner(f, from, to, 0); }
};

// :: ((element: T, index: number) → U, ?number, ?number) → [U]
// Map the given functions over the elements of the rope, producing
// a flat array.
RopeSequence.prototype.map = function map (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  var result = [];
  this.forEach(function (elt, i) { return result.push(f(elt, i)); }, from, to);
  return result
};

// :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
// Create a rope representing the given array, or return the rope
// itself if a rope was given.
RopeSequence.from = function from (values) {
  if (values instanceof RopeSequence) { return values }
  return values && values.length ? new Leaf(values) : RopeSequence.empty
};

var Leaf = (function (RopeSequence) {
  function Leaf(values) {
    RopeSequence.call(this);
    this.values = values;
  }

  if ( RopeSequence ) Leaf.__proto__ = RopeSequence;
  Leaf.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Leaf.prototype.constructor = Leaf;

  var prototypeAccessors = { length: {},depth: {} };

  Leaf.prototype.flatten = function flatten () {
    return this.values
  };

  Leaf.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    return new Leaf(this.values.slice(from, to))
  };

  Leaf.prototype.getInner = function getInner (i) {
    return this.values[i]
  };

  Leaf.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var this$1 = this;

    for (var i = from; i < to; i++)
      { if (f(this$1.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var this$1 = this;

    for (var i = from - 1; i >= to; i--)
      { if (f(this$1.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.leafAppend = function leafAppend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(this.values.concat(other.flatten())) }
  };

  Leaf.prototype.leafPrepend = function leafPrepend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(other.flatten().concat(this.values)) }
  };

  prototypeAccessors.length.get = function () { return this.values.length };

  prototypeAccessors.depth.get = function () { return 0 };

  Object.defineProperties( Leaf.prototype, prototypeAccessors );

  return Leaf;
}(RopeSequence));

// :: RopeSequence
// The empty rope sequence.
RopeSequence.empty = new Leaf([]);

var Append = (function (RopeSequence) {
  function Append(left, right) {
    RopeSequence.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }

  if ( RopeSequence ) Append.__proto__ = RopeSequence;
  Append.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Append.prototype.constructor = Append;

  Append.prototype.flatten = function flatten () {
    return this.left.flatten().concat(this.right.flatten())
  };

  Append.prototype.getInner = function getInner (i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length)
  };

  Append.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from < leftLen &&
        this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false)
      { return false }
    if (to > leftLen &&
        this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false)
      { return false }
  };

  Append.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from > leftLen &&
        this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false)
      { return false }
    if (to < leftLen &&
        this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false)
      { return false }
  };

  Append.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    var leftLen = this.left.length;
    if (to <= leftLen) { return this.left.slice(from, to) }
    if (from >= leftLen) { return this.right.slice(from - leftLen, to - leftLen) }
    return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen))
  };

  Append.prototype.leafAppend = function leafAppend (other) {
    var inner = this.right.leafAppend(other);
    if (inner) { return new Append(this.left, inner) }
  };

  Append.prototype.leafPrepend = function leafPrepend (other) {
    var inner = this.left.leafPrepend(other);
    if (inner) { return new Append(inner, this.right) }
  };

  Append.prototype.appendInner = function appendInner (other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1)
      { return new Append(this.left, new Append(this.right, other)) }
    return new Append(this, other)
  };

  return Append;
}(RopeSequence));

var dist = RopeSequence;

var max_empty_items = 500;

var Branch = function () {
  function Branch(items, eventCount) {
    _classCallCheck(this, Branch);

    this.items = items;
    this.eventCount = eventCount;
  }

  _createClass(Branch, [{
    key: 'popEvent',
    value: function popEvent(state, preserveItems) {
      var _this = this;

      if (this.eventCount === 0) return null;

      var end = this.items.length;
      for (;; end--) {
        var next = this.items.get(end - 1);
        if (next.selection) {
          --end;
          break;
        }
      }

      var remap = void 0;
      var mapFrom = void 0;
      if (preserveItems) {
        remap = this.remapping(end, this.items.length);
        mapFrom = remap.maps.length;
      }

      var transform = state.tr;
      var selection = void 0,
          remaining = void 0;
      var addAfter = [];
      var addBefore = [];

      this.items.forEach(function (item, i) {
        if (!item.step) {
          if (!remap) {
            remap = _this.remapping(end, i + 1);
            mapFrom = remap.maps.length;
          }
          mapFrom--;
          addBefore.push(item);
          return;
        }

        if (remap) {
          addBefore.push(new Item(item.map));
          var step = item.step.map(remap.slice(mapFrom));
          var map = void 0;

          if (step && transform.maybeStep(step).doc) {
            map = transform.mapping.maps[transform.mapping.maps.length - 1];
            addAfter.push(new Item(map, null, null, addAfter.length + addBefore.length));
          }
          mapFrom--;
          if (map) remap.appendMap(map, mapFrom);
        } else {
          transform.maybeStep(item.step);
        }

        if (item.selection) {
          selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
          remaining = new Branch(_this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), _this.eventCount - 1);
          return false;
        }
      }, this.items.length, 0);

      return { remaining: remaining, transform: transform, selection: selection };
    }
  }, {
    key: 'addTransform',
    value: function addTransform(transform, selection, histOptions, preserveItems) {
      var newItems = [];
      var eventCount = this.eventCount;
      var oldItems = this.items;
      var lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;

      for (var i = 0, len = transform.steps.length; i < len; i++) {
        var step = transform.steps[i].invert(transform.docs[i]);
        var item = new Item(transform.mapping.maps[i], step, selection);
        var merged = void 0;

        if (merged = lastItem && lastItem.merge(item)) {
          item = merged;
          if (i) {
            newItems.pop();
          } else {
            oldItems = oldItems.slice(0, oldItems.length - 1);
          }
        }

        newItems.push(item);
        if (selection) {
          eventCount++;
          selection = null;
        }

        if (!preserveItems) {
          lastItem = item;
        }
      }

      var overflow = eventCount - histOptions.depth;
      if (overflow > DEPTH_OVERFLOW) {
        oldItems = cutOffEvents(oldItems, overflow);
        eventCount -= overflow;
      }
      return new Branch(oldItems.append(newItems), eventCount);
    }
  }, {
    key: 'remapping',
    value: function remapping(from, to) {
      var maps = new Mapping();
      this.items.forEach(function (item, i) {
        var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from ? mirrorPos = maps.maps.length - item.mirrorOffset : null;

        maps.appendMap(item.map, mirrorPos);
      }, from, to);
      return maps;
    }
  }, {
    key: 'addMaps',
    value: function addMaps(array) {
      if (this.eventCount === 0) return this;
      return new Branch(this.items.append(array.map(function (map) {
        return new Item(map);
      })), this.eventCount);
    }
  }, {
    key: 'rebased',
    value: function rebased(rebasedTransform, rebasedCount) {
      if (!this.eventCount) return this;

      var rebasedItems = [];
      var start = Math.max(0, this.items.length - rebasedCount);

      var mapping = rebasedTransform.mapping;
      var newUntil = rebasedTransform.steps.length;
      var eventCount = this.eventCount;
      this.items.forEach(function (item) {
        if (item.selection) eventCount--;
      }, start);

      var iRebased = rebasedCount;
      this.items.forEach(function (item) {
        var pos = mapping.getMirror(--iRebased);
        if (pos == null) return;

        newUntil = Math.min(newUntil, pos);
        var map = mapping.maps[pos];
        if (item.step) {
          var step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
          var selection = item.selection && item.selection.map(mapping.slice(iRebased, pos));
          if (selection) eventCount++;
          rebasedItems.push(new Item(map, step, selection));
        } else {
          rebasedItems.push(new Item(map));
        }
      }, start);

      var newMaps = [];
      for (var i = rebasedCount; i < newUntil; i++) {
        newMaps.push(new Item(mapping.maps[i]));
      }
      var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
      var branch = new Branch(items, eventCount);

      if (branch.emptyItemCount() > max_empty_items) {
        branch = branch.compress(this.items.length - rebasedItems.length);
      }
      return branch;
    }
  }, {
    key: 'emptyItemCount',
    value: function emptyItemCount() {
      var count = 0;
      this.items.forEach(function (item) {
        if (!item.step) count++;
      });
      return count;
    }
  }, {
    key: 'compress',
    value: function compress() {
      var upto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items.length;

      var remap = this.remapping(0, upto);
      var mapFrom = remap.maps.length;
      var items = [];
      var events = 0;

      this.items.forEach(function (item, i) {
        if (i >= upto) {
          items.push(item);
          if (item.selection) events++;
        } else if (item.step) {
          var step = item.step.map(remap.slice(mapFrom));
          var map = step && step.getMap();
          mapFrom--;
          if (map) remap.appendMap(map, mapFrom);

          if (step) {
            var selection = item.selection && item.selection.map(remap.slice(mapFrom));
            if (selection) events++;
            var newItem = new Item(map.invert(), step, selection);
            var merged = void 0;
            var last = items.length - 1;

            if (merged = items.length && items[last].merge(newItem)) {
              items[last] = merged;
            } else {
              items.push(newItem);
            }
          }
        } else if (item.map) {
          mapFrom--;
        }
      }, this.items.length, 0);
      return new Branch(dist.from(items.reverse()), events);
    }
  }]);

  return Branch;
}();

Branch.empty = new Branch(dist.empty, 0);

function cutOffEvents(items, n) {
  var cutPoint = void 0;
  items.forEach(function (item, i) {
    if (item.selection && n-- === 0) {
      cutPoint = i;
      return false;
    }
  });
  return items.slice(cutPoint);
}

var Item = function () {
  function Item(map, step, selection, mirrorOffset) {
    _classCallCheck(this, Item);

    this.map = map;
    this.step = step;
    this.selection = selection;
    this.mirrorOffset = mirrorOffset;
  }

  _createClass(Item, [{
    key: 'merge',
    value: function merge(other) {
      if (this.step && other.step && !other.selection) {
        var step = other.step.merge(this.step);
        if (step) return new Item(step.getMap().invert(), step, this.selection);
      }
    }
  }]);

  return Item;
}();

var HistoryState = function HistoryState(done, undone, prevRanges, prevTime) {
  _classCallCheck(this, HistoryState);

  this.done = done;
  this.undone = undone;
  this.prevRanges = prevRanges;
  this.prevTime = prevTime;
};

var DEPTH_OVERFLOW = 20;

function applyTransaction(history, state, tr, options) {
  var historyTr = tr.getMeta(historyKey);
  var rebased = void 0;
  if (historyTr) return historyTr.historyState;

  if (tr.getMeta(closeHistoryKey)) {
    history = new HistoryState(history.done, history.undone, null, 0);
  }

  var appended = tr.getMeta('appendedTransaction');

  if (tr.steps.length === 0) {
    return history;
  } else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo) {
      return new HistoryState(history.done.addTransform(tr, null, options, mustPreserveItems(state)), history.undone, rangesFor(tr.mapping.maps[tr.steps.length - 1]), history.prevTime);
    } else {
      return new HistoryState(history.done, history.undone.addTransform(tr, null, options, mustPreserveItems(state)), null, history.prevTime);
    }
  } else if (tr.getMeta('addToHistory') !== false && !(appended && appended.getMeta('addToHistory') === false)) {
    // Group transforms that occur in quick succession into one event.
    var newGroup = history.prevTime < (tr.time || 0) - options.newGroupDelay || !appended && !isAdjacentTo(tr, history.prevRanges);
    var prevRanges = appended ? mapRanges(history.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);

    return new HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time);
  } else if (rebased = tr.getMeta('rebased')) {
    // Used by the collab module to tell the history that some of its
    // content has been rebased.
    return new HistoryState(history.done.rebased(tr, rebased), history.undone.rebased(tr, rebased), mapRanges(history.prevRanges, tr.mapping), history.prevTime);
  } else {
    return new HistoryState(history.done.addMaps(tr.mapping.maps), history.undone.addMaps(tr.mapping.maps), mapRanges(history.prevRanges, tr.mapping), history.prevTime);
  }
}

function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges) return false;
  if (!transform.docChanged) return true;
  var adjacent = false;
  transform.mapping.maps[0].forEach(function (start, end) {
    for (var i = 0, len = prevRanges.length; i < len; i += 2) {
      if (start <= prevRanges[i + 1] && end >= prevRanges[i]) {
        adjacent = true;
      }
    }
  });
  return adjacent;
}

function rangesFor(map) {
  var result = [];
  map.forEach(function (_from, _to, from, to) {
    return result.push(from, to);
  });
  return result;
}

function mapRanges(ranges, mapping) {
  if (!ranges) return null;
  var result = [];

  for (var i = 0, len = ranges.length; i < len; i += 2) {
    var from = mapping.map(ranges[i], 1);
    var to = mapping.map(ranges[i + 1], -1);
    if (from <= to) result.push(from, to);
  }
  return result;
}

function histTransaction(history, state, dispatch, redo) {
  var preserveItems = mustPreserveItems(state);
  var histOptions = historyKey.get(state).spec.config;
  var pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) return;

  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
  var newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, { redo: redo, historyState: newHist }).scrollIntoView());
}

var cachedPreserveItems = false;
var cachedPreserveItemsPlugins = null;

function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i = 0, len = plugins.length; i < len; i++) {
      if (plugins[i].spec.historyPreserveItems) {
        cachedPreserveItems = true;
        break;
      }
    }
  }
  return cachedPreserveItems;
}



var historyKey = new PluginKey('history');
var closeHistoryKey = new PluginKey('closeHistory');

function history(config) {
  config = {
    depth: config && config.depth || 100,
    newGroupDelay: config && config.newGroupDelay || 500
  };
  return new Plugin({
    key: historyKey,
    state: {
      init: function init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0);
      },
      apply: function apply(tr, hist, state) {
        return applyTransaction(hist, state, tr, config);
      }
    },
    config: config
  });
}

function undo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount === 0) return false;
  if (dispatch) histTransaction(hist, state, dispatch, false);
  return true;
}

function redo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount === 0) return false;
  if (dispatch) histTransaction(hist, state, dispatch, true);
  return true;
}

function deleteSelection(state, dispatch) {
  if (state.selection.empty) return false;
  if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
  return true;
}

function joinBackward(state, dispatch, view) {
  var $cursor = state.selection.$cursor;

  if (!$cursor || (view ? !view.endOfTextblock('backward', state) : $cursor.parentOffset > 0)) {
    return false;
  }

  var $cut = findCutBefore($cursor);

  // If there is no node before this, try to lift
  if (!$cut) {
    var range = $cursor.blockRange();
    var target = range && liftTarget(range);

    if (target == null) return false;
    if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
    return true;
  }

  var before = $cut.nodeBefore;
  // Apply the joining algorithm
  if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch)) {
    return true;
  }

  // If the node below has no content and the node above is
  // selectable, delete the node below and select the one above.
  if ($cursor.parent.content.size === 0 && (textblockAt(before, 'end') || NodeSelection.isSelectable(before))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(before, 'end') ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : NodeSelection.create(tr.doc, $cut.pos - before.nodeSize));
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  // If the node before is an atom, delete it
  if (before.isAtom && $cut.depth === $cursor.depth - 1) {
    if (dispatch) dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView());
    return true;
  }

  return false;
}

function textblockAt(node, side) {
  for (; node; node = side === 'start' ? node.firstChild : node.lastChild) {
    if (node.isTextblock) return true;
  }
  return false;
}

function selectNodeBackward(state, dispatch, view) {
  var $cursor = state.selection.$cursor;

  if (!$cursor || (view ? !view.endOfTextblock('backward', state) : $cursor.parentOffset > 0)) {
    return false;
  }

  var $cut = findCutBefore($cursor);
  var node = $cut && $cut.nodeBefore;

  if (!node || !NodeSelection.isSelectable(node)) return false;
  if (dispatch) {
    dispatch(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView());
  }
  return true;
}

function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (var i = $pos.depth - 1; i >= 0; i--) {
      if ($pos.index(i) > 0) return $pos.doc.resolve($pos.before(i + 1));
      if ($pos.node(i).type.spec.isolating) break;
    }
  }
  return null;
}

function joinForward(state, dispatch, view) {
  var $cursor = state.selection.$cursor;

  if (!$cursor || (view ? !view.endOfTextblock('forward', state) : $cursor.parentOffset < $cursor.parent.content.size)) {
    return false;
  }

  var $cut = findCutAfter($cursor);

  // If there is no node after this, there's nothing to do
  if (!$cut) return false;

  var after = $cut.nodeAfter;
  // Try the joining algorithm
  if (deleteBarrier(state, $cut, dispatch)) return true;

  // If the node above has no content and the node below is
  // selectable, delete the node above and select the one below.
  if ($cursor.parent.content.size === 0 && (textblockAt(after, 'start') || NodeSelection.isSelectable(after))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(after, 'start') ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  // If the next node is an atom, delete it
  if (after.isAtom && $cut.depth === $cursor.depth - 1) {
    if (dispatch) dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView());
    return true;
  }

  return false;
}

function selectNodeForward(state, dispatch, view) {
  var $cursor = state.selection.$cursor;

  if (!$cursor || (view ? !view.endOfTextblock('forward', state) : $cursor.parentOffset < $cursor.parent.content.size)) return false;

  var $cut = findCutAfter($cursor),
      node = $cut && $cut.nodeAfter;
  if (!node || !NodeSelection.isSelectable(node)) return false;
  if (dispatch) dispatch(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos)).scrollIntoView());
  return true;
}

function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) for (var i = $pos.depth - 1; i >= 0; i--) {
    var parent = $pos.node(i);
    if ($pos.index(i) + 1 < parent.childCount) return $pos.doc.resolve($pos.after(i + 1));
    if (parent.type.spec.isolating) break;
  }
  return null;
}





function lift(state, dispatch) {
  var _state$selection = state.selection,
      $from = _state$selection.$from,
      $to = _state$selection.$to;

  var range = $from.blockRange($to),
      target = range && liftTarget(range);
  if (target == null) return false;
  if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
  return true;
}

function newlineInCode(state, dispatch) {
  var _state$selection2 = state.selection,
      $head = _state$selection2.$head,
      $anchor = _state$selection2.$anchor;

  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
  if (dispatch) dispatch(state.tr.insertText('\n').scrollIntoView());
  return true;
}

function exitCode(state, dispatch) {
  var _state$selection3 = state.selection,
      $head = _state$selection3.$head,
      $anchor = _state$selection3.$anchor;

  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
  var above = $head.node(-1),
      after = $head.indexAfter(-1),
      type = above.contentMatchAt(after).defaultType;
  if (!above.canReplaceWith(after, after, type)) return false;
  if (dispatch) {
    var pos = $head.after(),
        tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}

function createParagraphNear(state, dispatch) {
  var _state$selection4 = state.selection,
      $from = _state$selection4.$from,
      $to = _state$selection4.$to;

  if ($from.parent.inlineContent || $to.parent.inlineContent) return false;
  var type = $from.parent.contentMatchAt($to.indexAfter()).defaultType;
  if (!type || !type.isTextblock) return false;
  if (dispatch) {
    var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
    var tr = state.tr.insert(side, type.createAndFill());
    tr.setSelection(TextSelection.create(tr.doc, side + 1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}

function liftEmptyBlock(state, dispatch) {
  var $cursor = state.selection.$cursor;

  if (!$cursor || $cursor.parent.content.size) return false;
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    var before = $cursor.before();
    if (canSplit(state.doc, before)) {
      if (dispatch) dispatch(state.tr.split(before).scrollIntoView());
      return true;
    }
  }
  var range = $cursor.blockRange(),
      target = range && liftTarget(range);
  if (target == null) return false;
  if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
  return true;
}

function splitBlock(state, dispatch) {
  var _state$selection5 = state.selection,
      $from = _state$selection5.$from,
      $to = _state$selection5.$to;

  if (state.selection instanceof NodeSelection && state.selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) return false;
    if (dispatch) dispatch(state.tr.split($from.pos).scrollIntoView());
    return true;
  }

  if (!$from.parent.isBlock) return false;

  if (dispatch) {
    var atEnd = $to.parentOffset == $to.parent.content.size;
    var tr = state.tr;
    if (state.selection instanceof TextSelection) tr.deleteSelection();
    var deflt = $from.depth == 0 ? null : $from.node(-1).contentMatchAt($from.indexAfter(-1)).defaultType;
    var types = atEnd && deflt ? [{ type: deflt }] : null;
    var can = canSplit(tr.doc, $from.pos, 1, types);
    if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{ type: deflt }])) {
      types = [{ type: deflt }];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd && !$from.parentOffset && $from.parent.type != deflt && $from.node(-1).canReplace($from.index(-1), $from.indexAfter(-1), Fragment.from(deflt.create(), $from.parent))) {
        tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
      }
    }
    dispatch(tr.scrollIntoView());
  }
  return true;
}





function selectAll(state, dispatch) {
  if (dispatch) dispatch(state.tr.setSelection(new AllSelection(state.doc)));
  return true;
}

function joinMaybeClear(state, $pos, dispatch) {
  var before = $pos.nodeBefore;
  var after = $pos.nodeAfter;
  var index = $pos.index();
  if (!before || !after || !before.type.compatibleContent(after.type)) return false;
  if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
    if (dispatch) dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView());
    return true;
  }
  if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || canJoin(state.doc, $pos.pos))) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount)).join($pos.pos).scrollIntoView());
  }
  return true;
}

function deleteBarrier(state, $cut, dispatch) {
  var before = $cut.nodeBefore;
  var after = $cut.nodeAfter;
  var conn = void 0;
  var match = void 0;

  if (before.type.spec.isolating || after.type.spec.isolating) return false;
  if (joinMaybeClear(state, $cut, dispatch)) return true;

  if ($cut.parent.canReplace($cut.index(), $cut.index() + 1) && (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) && match.matchType(conn[0] || after.type).validEnd) {
    if (dispatch) {
      var end = $cut.pos + after.nodeSize;
      var wrap = Fragment.empty;
      for (var i = conn.length - 1; i >= 0; i--) {
        wrap = Fragment.from(conn[i].create(null, wrap));
      }
      wrap = Fragment.from(before.copy(wrap));
      var tr = state.tr.step(new ReplaceAroundStep($cut.pos - 1, end, $cut.pos, end, new Slice(wrap, 1, 0), conn.length, true));
      var joinAt = end + 2 * conn.length;
      if (canJoin(tr.doc, joinAt)) tr.join(joinAt);
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  var selAfter = Selection.findFrom($cut, 1);
  var range = selAfter && selAfter.$from.blockRange(selAfter.$to),
      target = range && liftTarget(range);
  if (target != null && target >= $cut.depth) {
    if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
    return true;
  }

  return false;
}

// Parameterized commands

function wrapIn(nodeType, attrs) {
  return function (state, dispatch) {
    var _state$selection7 = state.selection,
        $from = _state$selection7.$from,
        $to = _state$selection7.$to;

    var range = $from.blockRange($to),
        wrapping = range && findWrapping(range, nodeType, attrs);
    if (!wrapping) return false;
    if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
    return true;
  };
}

function setBlockType(nodeType, attrs) {
  return function (state, dispatch) {
    var _state$selection8 = state.selection,
        from = _state$selection8.from,
        to = _state$selection8.to;

    var applicable = false;
    state.doc.nodesBetween(from, to, function (node, pos) {
      if (applicable) return false;
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
      if (node.type == nodeType) {
        applicable = true;
      } else {
        var $pos = state.doc.resolve(pos),
            index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
    });
    if (!applicable) return false;
    if (dispatch) dispatch(state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView());
    return true;
  };
}

function markApplies(doc, ranges, type) {
  var _loop = function _loop(i, len) {
    var _ranges$i = ranges[i],
        $from = _ranges$i.$from,
        $to = _ranges$i.$to;

    var can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, function (node) {
      if (can) return false;
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) return {
        v: true
      };
  };

  for (var i = 0, len = ranges.length; i < len; i++) {
    var _ret = _loop(i, len);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return false;
}

function toggleMark(markType, attrs) {
  return function (state, dispatch) {
    var _state$selection9 = state.selection,
        empty = _state$selection9.empty,
        $cursor = _state$selection9.$cursor,
        ranges = _state$selection9.ranges;

    if (empty && !$cursor || !markApplies(state.doc, ranges, markType)) return false;
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks())) {
          dispatch(state.tr.removeStoredMark(markType));
        } else {
          dispatch(state.tr.addStoredMark(markType.create(attrs)));
        }
      } else {
        var has = false;
        var tr = state.tr;
        for (var i = 0; !has && i < ranges.length; i++) {
          var _ranges$i2 = ranges[i],
              $from = _ranges$i2.$from,
              $to = _ranges$i2.$to;

          has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
        }

        for (var _i = 0; _i < ranges.length; _i++) {
          var _ranges$_i = ranges[_i],
              _$from = _ranges$_i.$from,
              _$to = _ranges$_i.$to;

          if (has) {
            tr.removeMark(_$from.pos, _$to.pos, markType);
          } else {
            tr.addMark(_$from.pos, _$to.pos, markType.create(attrs));
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
}



function chainCommands() {
  for (var _len = arguments.length, commands = Array(_len), _key = 0; _key < _len; _key++) {
    commands[_key] = arguments[_key];
  }

  return function (state, dispatch, view) {
    for (var i = 0, len = commands.length; i < len; i++) {
      if (commands[i](state, dispatch, view)) return true;
    }
    return false;
  };
}

var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
var del = chainCommands(deleteSelection, joinForward, selectNodeForward);

var pcBaseKeymap = {
  'Enter': chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
  'Mod-Enter': exitCode,
  'Backspace': backspace,
  'Mod-Backspace': backspace,
  'Delete': del,
  'Mod-Delete': del,
  'Mod-a': selectAll
};

var macBaseKeymap = {
  'Ctrl-h': pcBaseKeymap['Backspace'],
  'Alt-Backspace': pcBaseKeymap['Mod-Backspace'],
  'Ctrl-d': pcBaseKeymap['Delete'],
  'Ctrl-Alt-Backspace': pcBaseKeymap['Mod-Delete'],
  'Alt-Delete': pcBaseKeymap['Mod-Delete'],
  'Alt-d': pcBaseKeymap['Mod-Delete']
};

for (var key in pcBaseKeymap) {
  macBaseKeymap[key] = pcBaseKeymap[key];
}

// declare global: os, navigator
var mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : typeof os !== 'undefined' ? os.platform() === 'darwin' : false;
var baseKeymap = mac ? macBaseKeymap : pcBaseKeymap;

var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  229: "q"
};
var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ";",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: "\"",
  229: "Q"
};

var chrome$1 = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
var safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
var gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
var mac$2 = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
var brokenModifierNames = chrome$1 && (mac$2 || +chrome$1[1] < 57) || gecko && mac$2;

// Fill in the digit keys
for (var i$1 = 0; i$1 < 10; i$1++) base[48 + i$1] = base[96 + i$1] = String(i$1);

// The function keys
for (var i$1 = 1; i$1 <= 24; i$1++) base[i$1 + 111] = "F" + i$1;

// And the alphabetic keys
for (var i$1 = 65; i$1 <= 90; i$1++) {
  base[i$1] = String.fromCharCode(i$1 + 32);
  shift[i$1] = String.fromCharCode(i$1);
}

// For each code that doesn't have a shift-equivalent, copy the base name
for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code];

function keyName(event) {
  // Don't trust event.key in Chrome when there are modifiers until
  // they fix https://bugs.chromium.org/p/chromium/issues/detail?id=633838
  var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) ||
    safari && event.shiftKey && event.key && event.key.length == 1;
  var name = (!ignoreKey && event.key) ||
    (event.shiftKey ? shift : base)[event.keyCode] ||
    event.key || "Unidentified";
  // Edge sometimes produces wrong names (Issue #3)
  if (name == "Esc") name = "Escape";
  if (name == "Del") name = "Delete";
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
  if (name == "Left") name = "ArrowLeft";
  if (name == "Up") name = "ArrowUp";
  if (name == "Right") name = "ArrowRight";
  if (name == "Down") name = "ArrowDown";
  return name
}

var w3cKeyname = keyName;
keyName.base = base;
keyName.shift = shift;

var mac$1 = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

function normalizeKeyName(name) {
  var parts = name.split(/-(?!$)/);
  var result = parts[parts.length - 1];
  if (result === 'Space') result = ' ';

  var alt, ctrl, shift, meta;
  for (var i = 0; i < parts.length - 1; i++) {
    var mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;
    } else if (/^a(lt)?$/i.test(mod)) {
      alt = true;
    } else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;
    } else if (/^s(hift)?$/i.test(mod)) {
      shift = true;
    } else if (/^mod$/i.test(mod)) {
      if (mac$1) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else {
      throw new Error('Unrecognized modifier name: ' + mod);
    }
  }

  if (alt) {
    result = 'Alt-' + result;
  }
  if (ctrl) {
    result = 'Ctrl-' + result;
  }
  if (meta) {
    result = 'Meta-' + result;
  }
  if (shift) {
    result = 'Shift-' + result;
  }
  return result;
}

function normalize(map) {
  var copy = _Object$create(null);
  for (var prop in map) {
    copy[normalizeKeyName(prop)] = map[prop];
  }
  return copy;
}

function modifiers(name, event, shift) {
  if (event.altKey) name = 'Alt-' + name;
  if (event.ctrlKey) name = 'Ctrl-' + name;
  if (event.metaKey) name = 'Meta-' + name;
  if (shift !== false && event.shiftKey) name = 'Shift-' + name;
  return name;
}

function keymap(bindings) {
  return new Plugin({
    props: {
      handleKeyDown: keydownHandler(bindings)
    }
  });
}

function keydownHandler(bindings) {
  var map = normalize(bindings);
  return function (view, event) {
    var name = w3cKeyname(event);
    var isChar = name.length === 1 && name !== ' ';
    var baseName = void 0;
    var direct = map[modifiers(name, event, !isChar)];

    if (direct && direct(view.state, view.dispatch, view)) return true;
    if (isChar && (event.shiftKey || event.altKey || event.metaKey) && (baseName = w3cKeyname.base[event.keyCode]) && baseName != name) {
      var fromCode = map[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) return true;
    }
    return false;
  };
}

var olDOM = ['ol', 0];
var ulDOM = ['ul', 0];
var liDOM = ['li', 0];

// :: NodeSpec
// An ordered list [node spec](#model.NodeSpec). Has a single
// attribute, `order`, which determines the number at which the list
// starts counting, and defaults to 1. Represented as an `<ol>`
// element.
var orderedList = {
  attrs: { order: { default: 1 } },
  parseDOM: [{ tag: "ol", getAttrs: function getAttrs(dom) {
      return { order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1 };
    }
  }],
  toDOM: function toDOM(node) {
    return node.attrs.order == 1 ? olDOM : ["ol", { start: node.attrs.order }, 0];
  }
};

// :: NodeSpec
// A bullet list node spec, represented in the DOM as `<ul>`.
var bulletList = {
  parseDOM: [{ tag: "ul" }],
  toDOM: function toDOM() {
    return ulDOM;
  }
};

// :: NodeSpec
// A list item (`<li>`) spec.
var listItem = {
  parseDOM: [{ tag: "li" }],
  toDOM: function toDOM() {
    return liDOM;
  },

  defining: true
};

function add(obj, props) {
  var copy = {};
  for (var prop in obj) {
    copy[prop] = obj[prop];
  }for (var _prop in props) {
    copy[_prop] = props[_prop];
  }return copy;
}

// :: (OrderedMap<NodeSpec>, string, ?string) → OrderedMap<NodeSpec>
// Convenience function for adding list-related node types to a map
// specifying the nodes for a schema. Adds
// [`orderedList`](#schema-list.orderedList) as `"ordered_list"`,
// [`bulletList`](#schema-list.bulletList) as `"bullet_list"`, and
// [`listItem`](#schema-list.listItem) as `"list_item"`.
//
// `itemContent` determines the content expression for the list items.
// If you want the commands defined in this module to apply to your
// list structure, it should have a shape like `"paragraph block*"` or
// `"paragraph (ordered_list | bullet_list)*"`. `listGroup` can be
// given to assign a group name to the list node types, for example
// `"block"`.
function addListNodes(nodes, itemContent, listGroup) {
  return nodes.append({
    ordered_list: add(orderedList, { content: "list_item+", group: listGroup }),
    bullet_list: add(bulletList, { content: "list_item+", group: listGroup }),
    list_item: add(listItem, { content: itemContent })
  });
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command function that wraps the selection in a list with
// the given type an attributes. If `dispatch` is null, only return a
// value to indicate whether this is possible, but don't actually
// perform the change.
function wrapInList(listType, attrs) {
  return function (state, dispatch) {
    var _state$selection = state.selection,
        $from = _state$selection.$from,
        $to = _state$selection.$to;

    var range = $from.blockRange($to),
        doJoin = false,
        outerRange = range;
    if (!range) return false;
    // This is at the top of an existing list item
    if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
      // Don't do anything if this is the top of the list
      if ($from.index(range.depth - 1) == 0) return false;
      var $insert = state.doc.resolve(range.start - 2);
      outerRange = new NodeRange($insert, $insert, range.depth);
      if (range.endIndex < range.parent.childCount) range = new NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
      doJoin = true;
    }
    var wrap = findWrapping(outerRange, listType, attrs, range);
    if (!wrap) return false;
    if (dispatch) dispatch(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
    return true;
  };
}

function doWrapInList(tr, range, wrappers, joinBefore, listType) {
  var content = Fragment.empty;
  for (var i = wrappers.length - 1; i >= 0; i--) {
    content = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }tr.step(new ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new Slice(content, 0, 0), wrappers.length, true));

  var found = 0;
  for (var _i = 0; _i < wrappers.length; _i++) {
    if (wrappers[_i].type == listType) found = _i + 1;
  }var splitDepth = wrappers.length - found;

  var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0),
      parent = range.parent;
  for (var _i2 = range.startIndex, e = range.endIndex, first = true; _i2 < e; _i2++, first = false) {
    if (!first && canSplit(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
      splitPos += 2 * splitDepth;
    }
    splitPos += parent.child(_i2).nodeSize;
  }
  return tr;
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Build a command that splits a non-empty textblock at the top level
// of a list item by also splitting that list item.
function splitListItem(itemType) {
  return function (state, dispatch) {
    var _state$selection2 = state.selection,
        $from = _state$selection2.$from,
        $to = _state$selection2.$to,
        node = _state$selection2.node;

    if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) return false;
    var grandParent = $from.node(-1);
    if (grandParent.type != itemType) return false;
    if ($from.parent.content.size == 0) {
      // In an empty block. If this is a nested list, the wrapping
      // list item should be split. Otherwise, bail out and let next
      // command handle lifting.
      if ($from.depth == 2 || $from.node(-3).type != itemType || $from.index(-2) != $from.node(-2).childCount - 1) return false;
      if (dispatch) {
        var wrap = Fragment.empty,
            keepItem = $from.index(-1) > 0;
        // Build a fragment containing empty versions of the structure
        // from the outer list item to the parent node of the cursor
        for (var d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
          wrap = Fragment.from($from.node(d).copy(wrap));
        } // Add a second list item with an empty default start node
        wrap = wrap.append(Fragment.from(itemType.createAndFill()));
        var _tr = state.tr.replace($from.before(keepItem ? null : -1), $from.after(-3), new Slice(wrap, keepItem ? 3 : 2, 2));
        _tr.setSelection(state.selection.constructor.near(_tr.doc.resolve($from.pos + (keepItem ? 3 : 2))));
        dispatch(_tr.scrollIntoView());
      }
      return true;
    }
    var nextType = $to.pos == $from.end() ? grandParent.defaultContentType(0) : null;
    var tr = state.tr.delete($from.pos, $to.pos);
    var types = nextType && [null, { type: nextType }];
    if (!canSplit(tr.doc, $from.pos, 2, types)) return false;
    if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView());
    return true;
  };
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command to lift the list item around the selection up into
// a wrapping list.
function liftListItem(itemType) {
  return function (state, dispatch) {
    var _state$selection3 = state.selection,
        $from = _state$selection3.$from,
        $to = _state$selection3.$to;

    var range = $from.blockRange($to, function (node) {
      return node.childCount && node.firstChild.type == itemType;
    });
    if (!range) return false;
    if (!dispatch) return true;
    if ($from.node(range.depth - 1).type == itemType) // Inside a parent list
      return liftToOuterList(state, dispatch, itemType, range);else // Outer list node
      return liftOutOfList(state, dispatch, range);
  };
}

function liftToOuterList(state, dispatch, itemType, range) {
  var tr = state.tr,
      end = range.end,
      endOfList = range.$to.end(range.depth);
  if (end < endOfList) {
    // There are siblings after the lifted items, which must become
    // children of the last item
    tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
    range = new NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
  }
  dispatch(tr.lift(range, liftTarget(range)).scrollIntoView());
  return true;
}

function liftOutOfList(state, dispatch, range) {
  var tr = state.tr,
      list = range.parent;
  // Merge the list items into a single big item
  for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
    pos -= list.child(i).nodeSize;
    tr.delete(pos - 1, pos + 1);
  }
  var $start = tr.doc.resolve(range.start),
      item = $start.nodeAfter;
  var atStart = range.startIndex == 0,
      atEnd = range.endIndex == list.childCount;
  var parent = $start.node(-1),
      indexBefore = $start.index(-1);
  if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? Fragment.empty : Fragment.from(list)))) return false;
  var start = $start.pos,
      end = start + item.nodeSize;
  // Strip off the surrounding list. At the sides where we're not at
  // the end of the list, the existing list is closed. At sides where
  // this is the end, it is overwritten to its end.
  tr.step(new ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new Slice((atStart ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))).append(atEnd ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
  dispatch(tr.scrollIntoView());
  return true;
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command to sink the list item around the selection down
// into an inner list.
function sinkListItem(itemType) {
  return function (state, dispatch) {
    var _state$selection4 = state.selection,
        $from = _state$selection4.$from,
        $to = _state$selection4.$to;

    var range = $from.blockRange($to, function (node) {
      return node.childCount && node.firstChild.type == itemType;
    });
    if (!range) return false;
    var startIndex = range.startIndex;
    if (startIndex == 0) return false;
    var parent = range.parent,
        nodeBefore = parent.child(startIndex - 1);
    if (nodeBefore.type != itemType) return false;

    if (dispatch) {
      var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
      var inner = Fragment.from(nestedBefore ? itemType.create() : null);
      var slice = new Slice(Fragment.from(itemType.create(null, Fragment.from(parent.copy(inner)))), nestedBefore ? 3 : 1, 0);
      var before = range.start,
          after = range.end;
      dispatch(state.tr.step(new ReplaceAroundStep(before - (nestedBefore ? 3 : 1), after, before, after, slice, 1, true)).scrollIntoView());
    }
    return true;
  };
}

var MenuItem = function () {
  function MenuItem(spec) {
    _classCallCheck(this, MenuItem);

    this.spec = spec;
  }

  _createClass(MenuItem, [{
    key: 'render',
    value: function render(view) {
      var spec = this.spec;
      var parentNode = view.dom.parentNode;
      var dom = parentNode.querySelector('' + (spec.pmrico ? '.pmrico-' + spec.pmrico : spec.selector));

      dom.addEventListener('click', function (e) {
        e.preventDefault();

        if (!dom.classList.contains('pmr-disabled')) {
          var isFocus = spec.run(view.state, view.dispatch, view, e);
          isFocus !== null && view.focus();
        }
      });

      function update(state) {
        if (spec.select) {
          var selected = spec.select(state);

          setClass(dom, 'pmr-disabled', !selected);
          if (!selected) {
            return false;
          }
        }

        var enabled = true;
        if (spec.enable) {
          enabled = spec.enable(state) || false;
          setClass(dom, 'pmr-disabled', !enabled);
        }
        if (spec.active) {
          var active = enabled && spec.active(state) || false;
          setClass(dom, 'pmr-is-active', active);
        }
        return true;
      }

      return { dom: dom, update: update };
    }
  }]);

  return MenuItem;
}();

function cmdItem(cmd, options) {
  var passedOptions = {
    run: cmd
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }
  if ((!options.enable || options.enable === true) && !options.select) {
    passedOptions[options.enable ? 'enable' : 'select'] = function (state) {
      return cmd(state);
    };
  }

  return new MenuItem(passedOptions);
}

function markActive(state, type) {
  var _state$selection = state.selection,
      from = _state$selection.from,
      $from = _state$selection.$from,
      to = _state$selection.to,
      empty = _state$selection.empty;

  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks());
  } else {
    return state.doc.rangeHasMark(from, to, type);
  }
}

function markItem(markType, options) {
  var passedOptions = {
    active: function active(state) {
      return markActive(state, markType);
    },

    enable: true
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }
  return cmdItem(toggleMark(markType), passedOptions);
}



function wrapListItem(nodeType, options) {
  return cmdItem(wrapInList(nodeType, options.attrs), options);
}

function combineUpdates(updates, nodes) {
  return function (state) {
    var something = false;

    for (var i = 0; i < updates.length; i++) {
      var up = updates[i](state);

      !up && nodes[i].classList.add('pmr-disabled');
      if (up) {
        something = true;
      }
    }
    return something;
  };
}

function renderGrouped(view, content) {
  var updates = [];

  for (var i = 0; i < content.length; i++) {
    var items = content[i],
        localUpdates = [],
        localNodes = [];

    for (var j = 0; j < items.length; j++) {
      var _items$j$render = items[j].render(view),
          dom = _items$j$render.dom,
          _update = _items$j$render.update;

      localNodes.push(dom);
      localUpdates.push(_update);
    }

    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
    }
  }

  function update(state) {
    var something = false;

    for (var _i = 0; _i < updates.length; _i++) {
      var hasContent = updates[_i](state);
      if (hasContent) {
        something = true;
      }
    }
    return something;
  }

  return { update: update };
}

var undoItem = new MenuItem({
  run: undo,
  enable: function enable(state) {
    return undo(state);
  },
  pmrico: 'undo'
});

var redoItem = new MenuItem({
  run: redo,
  enable: function enable(state) {
    return redo(state);
  },
  pmrico: 'redo'
});

function wrapItem(nodeType, options) {
  var liftCommand = chainCommands(liftListItem(nodeType), lift);

  var passedOptions = {
    run: function run(state, dispatch) {
      return wrapIn(nodeType, options.attrs)(state, dispatch);
    },

    select: function select(state) {
      return !liftCommand(state);
    }
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }
  return new MenuItem(passedOptions);
}

function blockTypeItem(nodeType, options) {
  var command = setBlockType(nodeType, options.attrs);

  var passedOptions = {
    run: command,
    enable: function enable(state) {
      return command(state);
    },
    active: function active(state) {
      var _state$selection2 = state.selection,
          $from = _state$selection2.$from,
          to = _state$selection2.to,
          node = _state$selection2.node;

      if (node) {
        return node.hasMarkup(nodeType, options.attrs);
      }
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
    }
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }
  return new MenuItem(passedOptions);
}

function buildMenuItems(schema) {
  var r = {},
      type = void 0;

  if (type = schema.marks.strong) {
    r.toggleStrong = markItem(type, {
      pmrico: 'bold'
    });
  }
  if (type = schema.marks.em) {
    r.toggleEm = markItem(type, {
      pmrico: 'italic'
    });
  }
  if (type = schema.marks.u) {
    r.toggleU = markItem(type, {
      pmrico: 'underline'
    });
  }
  if (type = schema.marks.strike) {
    r.toggleStrike = markItem(type, {
      pmrico: 'strikethrough'
    });
  }

  if (type = schema.nodes.bullet_list) {
    r.wrapBulletList = wrapListItem(type, {
      pmrico: 'decimal'
    });
  }
  if (type = schema.nodes.ordered_list) {
    r.wrapOrderedList = wrapListItem(type, {
      pmrico: 'disc'
    });
  }
  if (type = schema.nodes.blockquote) {
    r.wrapBlockQuote = wrapItem(type, {
      pmrico: 'quotes-left'
    });
  }
  if (type = schema.nodes.paragraph) {
    r.makeParagraph = blockTypeItem(type, {
      selector: '.pmr-anth__item p'
    });
  }
  if (type = schema.nodes.heading) {
    for (var i = 1; i <= 6; i++) {
      r['makeHead' + i] = blockTypeItem(type, {
        attrs: { level: i },
        selector: '.pmr-anth__item h' + i
      });
    }
  }

  var cut = function cut(arr) {
    return arr.filter(function (x) {
      return x;
    });
  };
  r.inlineMenu = [cut([r.toggleStrong, r.toggleEm, r.toggleU, r.toggleStrike])];
  r.typeMenu = [cut([r.makeParagraph, r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6])];
  r.blockMenu = [cut([r.wrapBulletList, r.wrapOrderedList, r.wrapBlockQuote])];
  r.fullMenu = r.inlineMenu.concat([[undoItem, redoItem]], r.blockMenu, r.typeMenu);
  return r;
}

function createFontMenuItem(type) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return markItem(type, options);
}

function setClass(dom, cls) {
  var on = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  dom.classList[on ? 'add' : 'remove'](cls);
  return dom;
}

var crel = createCommonjsModule(function (module, exports) {
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    {
        module.exports = factory();
    }
}(commonjsGlobal, function () {
    var fn = 'function',
        obj = 'object',
        nodeType = 'nodeType',
        textContent = 'textContent',
        setAttribute = 'setAttribute',
        attrMapString = 'attrMap',
        isNodeString = 'isNode',
        isElementString = 'isElement',
        d = typeof document === obj ? document : {},
        isType = function(a, type){
            return typeof a === type;
        },
        isNode = typeof Node === fn ? function (object) {
            return object instanceof Node;
        } :
        // in IE <= 8 Node is an object, obviously..
        function(object){
            return object &&
                isType(object, obj) &&
                (nodeType in object) &&
                isType(object.ownerDocument,obj);
        },
        isElement = function (object) {
            return crel[isNodeString](object) && object[nodeType] === 1;
        },
        isArray = function(a){
            return a instanceof Array;
        },
        appendChild = function(element, child) {
            if (isArray(child)) {
                child.map(function(subChild){
                    appendChild(element, subChild);
                });
                return;
            }
            if(!crel[isNodeString](child)){
                child = d.createTextNode(child);
            }
            element.appendChild(child);
        };


    function crel(){
        var args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel[attrMapString];

        element = crel[isElementString](element) ? element : d.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(!isType(settings,obj) || crel[isNodeString](settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined){
            element[textContent] = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                if(isType(settings[key],fn)){
                    element[key] = settings[key];
                }else{
                    element[setAttribute](key, settings[key]);
                }
            }else{
                var attr = attributeMap[key];
                if(typeof attr === fn){
                    attr(element, settings[key]);
                }else{
                    element[setAttribute](attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    crel[attrMapString] = {};

    crel[isElementString] = isElement;

    crel[isNodeString] = isNode;

    if(typeof Proxy !== 'undefined'){
        crel.proxy = new Proxy(crel, {
            get: function(target, key){
                !(key in crel) && (crel[key] = crel.bind(null, key));
                return crel[key];
            }
        });
    }

    return crel;
}));
});

var PANEL = 'pmr-panel';
var PANEL_CONTAIN = 'pmr-panel-contain';
var HOVER = 'pmr-hover';
var PANEL_ACTIVE = 'pmr-panel--active';

function selectionContent(state) {
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'emoji';

  var selection = state.selection;
  if (selection.empty) {
    return 0;
  }

  var ret = [];
  var json = selection.content().toJSON();
  var content = json.content;

  (function fn(data) {
    data.forEach(function (item) {
      var type = item.type;
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
  })(content);

  return ret.length;
}

/**
 * @desc 判断是否全是空格
 * @param {String} content 
 */
function contentIsSpace(content) {
  return !!content.length && content.trim() === '';
}

/**
 * @desc 判断 {}
 */


/**
 * @desc rgb(0,0,0) => #000000
 * @param {String} color 
 */


/**
 * @desc 获取 target在其父级的 index
 * @param {Node} target 
 */
function getIndex(target, children) {
  children = children || target.parentNode.children;
  for (var i = 0, len = children.length; i < len; i++) {
    if (children[i] === target) {
      return i;
    }
  }
}

var PanelTabs = function () {
  function PanelTabs(options) {
    _classCallCheck(this, PanelTabs);

    this.options = options;
    this.docListenerFn = null;
    this.$button = this.options.dom.querySelector('.' + PANEL_CONTAIN + this.options.button);

    this.init();
    this.$button.$panel = this;
    PanelTabs.list$.push(this);
  }

  _createClass(PanelTabs, [{
    key: 'init',
    value: function init() {
      var $fragment = document.createDocumentFragment();
      var contentClass = this.options.contentClass;
      var panelClass = this.options.panelClass;
      var $tabs = crel('div', { 'class': PANEL + '__tabs pmr-clearfix' });
      var array = this.options.tabs || [];
      var tpl = '';

      array.forEach(function (item, i) {
        var $tab = crel('p', { 'class': PANEL + '__btn' + (i === 0 ? ' ' + PANEL + '--active' : '') });
        $tab.innerHTML = item.title;
        $tabs.appendChild($tab);
        tpl += item.tpl;
      });

      this.$content = crel('div', { 'class': PANEL + '__content' + (contentClass ? ' ' + contentClass : '') });
      this.$content.innerHTML = tpl;

      this.$panel = crel('div', { 'class': '' + PANEL + (panelClass ? ' ' + panelClass : '') }, $tabs, this.$content);
      var $wrap = crel('div', { 'class': 'pmr-dropdown__inner' }, this.$panel);

      this.bindEvent();
      $fragment.appendChild($wrap);
      this.$button.querySelector('.pmr-dropdown__content').appendChild($fragment);
    }
  }, {
    key: 'hidePanel',
    value: function hidePanel() {
      this.docListenerFn && document.removeEventListener('click', this.docListenerFn);
      this.$button.classList.remove(HOVER);
    }
  }, {
    key: 'openPanel',
    value: function openPanel(callback) {
      var that = this;

      PanelTabs.list$.forEach(function (panel) {
        panel.hidePanel && panel.hidePanel();
      });

      this.$button.classList.add(HOVER);
      typeof callback === 'function' && callback.call(this, this.$panel);
      this.firstInputFocus(this.$content);

      setTimeout(function () {
        that.docListenerFn = function (e) {
          return that.hidePanel();
        };
        document.addEventListener('click', that.docListenerFn);
      });
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this = this;

      this.$panel.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = e.target;
        var classList = target.classList;

        // tab 切换
        if (classList.contains(PANEL + '__btn') && !classList.contains(PANEL_ACTIVE)) {
          _this.toggleTabs(target);
        } else if (typeof _this.options.onclick === 'function') {
          var close = _this.options.onclick.call(_this, e, _this.$panel);
          close && _this.hidePanel();
        }

        _closePanel(target, _this);
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
  }, {
    key: 'firstInputFocus',
    value: function firstInputFocus(target) {
      var $input = target.querySelector('input[type=text]');
      $input && $input.focus();
    }
  }, {
    key: 'toggleTabs',
    value: function toggleTabs(target) {
      var parentNode = target.parentNode;
      var children = parentNode.children;
      var index = getIndex(target, children);
      var contents = parentNode.nextElementSibling.children;
      var $index = contents[index];

      for (var i = 0, len = contents.length; i < len; i++) {
        contents[i].style.cssText += ';display:none;';
        children[i].classList.remove(PANEL_ACTIVE);
      }

      children[index].classList.add(PANEL_ACTIVE);
      $index.style.cssText += ';display:block;';
      this.firstInputFocus($index);
    }
  }]);

  return PanelTabs;
}();

PanelTabs.list$ = [];

function input(placeholder, type) {
  return '<input type="' + (type || 'text') + '" placeholder="' + (placeholder || '图片链接') + '" autocomplete="off">';
}

function buttons() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var html = '<div class="pmr-buttons">';
  arr.forEach(function (item) {
    html += '<a class="pmr-btn' + (item.cl ? ' ' + item.cl : '') + '" href="javascript:;">' + (item.text || '插入') + '</a>';
  });

  html += '</div>';
  return html;
}

var MenuView = function () {
  function MenuView(dom, editorView, options) {
    _classCallCheck(this, MenuView);

    this.dom = dom;
    this.editorView = editorView;
    this.options = options;
    this.content = this.options.content;
    this.outlet = options.outlet;

    this.createPanelTabs(this.options.menus);

    var _renderGrouped = renderGrouped(this.editorView, this.content),
        update = _renderGrouped.update;

    this.contentUpdate = update;

    this.panelTabs();
    this.update();
  }

  _createClass(MenuView, [{
    key: 'update',
    value: function update() {
      this.contentUpdate(this.editorView.state);
    }
  }, {
    key: 'createPanelTabs',
    value: function createPanelTabs(menus) {
      var marks = this.options.schema.marks;
      var dom = this.dom;

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
  }, {
    key: 'panelTabs',
    value: function panelTabs() {
      var _this = this;

      var typeLink = this.options.schema.marks.link;

      function getLinkParams(state) {
        var _state$selection2 = state.selection,
            from = _state$selection2.from,
            to = _state$selection2.to;
        // const links = inLinkMarks(state, typeLink);

        var textContent = state.doc.cut(from, to).textContent;

        // if (links.length === 1) {
        //   return {
        //     text: links[0].text,
        //     href: links[0].marks[0].attrs.href,
        //   };
        // }

        return {
          text: textContent,
          href: ''
        };
      }

      this.dom.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;

        if (_this.dom.contains(target) && target.parentNode !== _this.dom) {
          return false;
        }

        var classList = target.classList;
        if (classList.contains('pmr-disabled')) {
          return;
        }

        if (classList.contains('pmrico-link')) {
          var _input = target.querySelectorAll('input[type=text]');
          var state = _this.editorView.state;
          var params = getLinkParams(state);

          if (!!_input && params.text) {
            _input[0].value = params.text;
            _input[1].value = params.href;
          }
        }

        classList.contains('pmrico-happy') && showEotions(target.querySelectorAll('img[data-src]'));
        target.$panel && target.$panel.openPanel();
      });

      function showEotions(eotions) {
        eotions.forEach(function (el) {
          var src = el.getAttribute('data-src');
          var img = document.createElement('img');
          var fn = function fn() {
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
  }, {
    key: '_createFontPanel',
    value: function _createFontPanel(menus, marks, dom) {
      var _this2 = this;

      var fontHtml = '<dt class="pmr-anth__title">字体</dt>';

      menus.fontNames.forEach(function (font) {
        fontHtml += '<dd data-font="' + font + '" style="font-family: ' + font + ';" class="pmr-anth__item">' + font + '</dd>';

        _this2.content[0].push(createFontMenuItem(marks[font], {
          selector: '.pmr-anth__item[data-font="' + font + '"]'
        }));
      });

      createAnth({
        className: 'pmr-fontcolor',
        selector: '.pmrico-font',
        html: fontHtml,
        dom: dom
      });

      var header = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'p'];
      var headerHtml = '<dt class="pmr-anth__title">标题</dt>';
      header.forEach(function (h) {
        var tag = h.toLowerCase();
        headerHtml += '<dd class="pmr-anth__item"><' + tag + '><span>' + (h === 'p' ? '正文' : h) + '</span></' + tag + '></dd>';
      });

      createAnth({
        className: 'pmr-headers',
        selector: '.pmrico-header',
        html: headerHtml,
        dom: dom
      });

      createAnth({
        className: 'pmr-list',
        selector: '.pmrico-list2',
        html: '<dt class="pmr-anth__title">\u8BBE\u7F6E\u5217\u8868</dt><dd class="pmr-anth__item pmrico-disc">\u6709\u5E8F\u5217\u8868</dd><dd class="pmr-anth__item pmrico-decimal">\u65E0\u5E8F\u5217\u8868</dd>',
        dom: dom
      });
    }
  }, {
    key: '_createColorPanel',
    value: function _createColorPanel(menus, marks, dom) {
      var _this3 = this;

      var type = this.options.schema.nodes.blockAlert;
      var colorsHtml = '';

      menus.colors.forEach(function (color) {
        colorsHtml += '<span data-color="' + color + '" class="pmr-anth__item" title="' + color + '"><i style="color: ' + color + ';" class="pmrico-paint-brush"></i></span>';

        _this3.content[1].push(createFontMenuItem(marks[color], {
          selector: '.pmr-anth__item[data-color="' + color + '"]'
        }));
      });

      var panelsHtml = '';
      menus.panels.forEach(function (panel) {
        panelsHtml += '<span data-panel="' + panel + '" class="pmr-anth__item" title="' + panel + '"><i class="pmrico-' + panel + '"></i></span>';

        _this3.content[2].push(wrapItem(type, {
          attrs: { 'class': 'pmrico-' + panel },
          selector: '.pmr-anth__item[data-panel="' + panel + '"]'
        }));
      });

      new PanelTabs({
        tabs: [{ title: '面板', tpl: '<div class="pmr-clearfix">' + panelsHtml + '</div>' }, { title: '文字颜色', tpl: '<div style="display: none;" class="pmr-clearfix">' + colorsHtml + '</div>' }],
        dom: dom,
        contentClass: 'pmr-colors-container',
        button: '.pmrico-infos'
      });
    }
  }, {
    key: '_createEmojiPanel',
    value: function _createEmojiPanel(menus, marks, dom) {
      var tabs = [];
      var cdn = menus.emojiCdn;
      var view = this.editorView;
      var type = this.options.schema.nodes.emoji;
      var outlet = this.outlet;
      var emojiMax = outlet.emojiMax;

      menus.emotions.forEach(function (data, index) {
        var type = data.type;
        var content = data.content || [];
        var faceHtml = '';

        // emoji 表情
        if (type === 'emoji') {
          content.forEach(function (item) {
            if (item) {
              faceHtml += '<span class="pmr-emoj">' + item + '</span>';
            }
          });
        }

        // 图片表情
        if (type === 'image') {
          content.forEach(function (item, i) {
            var src = item.src;
            var alt = item.alt;
            var data_ = i <= 20 ? '' : 'data-';

            if (src) {
              faceHtml += '<span class="pmr-emoj" title="' + alt + '"><img ' + data_ + 'src="' + cdn + src + '" alt="' + alt + '"></span>';
            }
          });
        }

        tabs.push({
          title: data.title,
          tpl: '<div ' + (index !== 0 ? 'style="display: none;"' : '') + ' class="pmr-emoticon">' + faceHtml + '</div>'
        });
      });

      new PanelTabs({
        tabs: tabs,
        contentClass: 'pmr-emoj-container',
        dom: dom,
        button: '.pmrico-happy',
        onclick: function onclick(e, $panel) {
          var target = e.target;
          var tagName = target.tagName === 'IMG';
          var isEmoj = target.classList.contains('pmr-emoj');

          if (!tagName && !isEmoj) {
            return false;
          }

          if (tagName) {
            target = target;
          }

          if (isEmoj) {
            target = target.querySelector('img');
          }

          var src = target.src;
          var emojiCount = outlet.emojiCount;
          var isAlert = insertEmoji(type, src, target.alt)(view.state, view.dispatch, emojiCount, emojiMax);

          view.focus();
          isAlert === null && outlet.alert(emojiMax, 'emoji');
          // true 关闭 panel
          return true;
        }
      });

      function insertEmoji(type, src, alt) {
        return function (state, dispatch, count, max) {
          var $from = state.selection.$from;

          var index = $from.index();

          if (!$from.parent.canReplaceWith(index, index, type)) {
            return false;
          }

          if (dispatch) {
            var len = selectionContent(state, 'emoji');

            if (count >= max && !len) {
              return null;
            }

            dispatch(state.tr.replaceSelectionWith(type.create({ src: src, alt: alt }), false));
          }
          return true;
        };
      }
    }
  }, {
    key: '_createLinkPanel',
    value: function _createLinkPanel(menus, marks, dom) {
      var view = this.editorView;
      var type = this.options.schema.marks.link;
      var outlet = this.outlet;
      var linkMax = outlet.linkMax;

      new PanelTabs({
        tabs: [{
          title: '链接',
          tpl: '<div class="pmr-linkimg">' + input('链接文字') + input('链接') + buttons([{ cl: 'pmr-set-link' }]) + '</div>'
        }],
        dom: dom,
        button: '.pmrico-link',
        onclick: function onclick(e, $panel) {
          var target = e.target;

          if (target.classList.contains('pmr-set-link') && target.tagName === 'A') {

            if (outlet.linkCount >= linkMax) {
              outlet.alert(linkMax, 'link');
              return true;
            }

            var inputs = target.parentNode.parentNode.querySelectorAll('input[type=text]');
            var target0 = inputs[0];
            var target1 = inputs[1];
            var href = target1.value;
            var text = target0.value;

            if (href && text && !contentIsSpace(href) && !contentIsSpace(text)) {
              var schema = view.state.schema;
              var node = schema.text(text, [type.create({ href: href })]);
              view.dispatch(view.state.tr.replaceSelectionWith(node, false));
              target0.value = '';
              target1.value = '';
              // true 关闭 panel
              return true;
            } else {
              text ? target1.focus() : target0.focus();
            }
          }
        }
      });
    }
  }, {
    key: '_createImagePanel',
    value: function _createImagePanel(menus, marks, dom) {
      var view = this.editorView;
      var type = this.options.schema.nodes.image;
      var outlet = this.outlet;
      var imageMax = outlet.imageMax;

      new PanelTabs({
        tabs: [{
          title: '上传图片',
          tpl: '<div class="pmr-upload-img"><div class="pmr-upload__trigger"><i class="pmrico-upload2"></i></div><p class="pmr-upload__tips">\u5EFA\u8BAE\u5C3A\u5BF81056 x 400PX\uFF0C\u5927\u5C0F2M</p></div>'
        }, {
          title: '网络图片',
          tpl: '<div style="display: none;" class="pmr-linkimg">' + input() + buttons([{ cl: 'pmr-set-image' }]) + '</div>'
        }],
        dom: dom,
        button: '.pmrico-image',
        onclick: function onclick(e, $panel) {
          var target = e.target;

          if (target.classList.contains('pmr-set-image') && target.tagName === 'A') {
            var _target = e.target.parentNode.parentNode.querySelector('input[type=text]');

            var fields = { src: _target.value };
            var imageCount = outlet.imageCount;

            if (fields.src && !contentIsSpace(fields.src)) {
              var isAlert = insertImage(view, fields, imageCount, imageMax);
              _target.value = '';
              isAlert === null && outlet.alert(imageMax, 'image');
              // true 关闭 panel
              return true;
            } else {
              _target.focus();
            }
          }
        }
      });

      function insertImage(view, fields, count, max) {
        var state = view.state;
        var len = selectionContent(state, 'image');

        if (count >= max && !len) {
          return null;
        }

        view.dispatch(state.tr.replaceSelectionWith(type.createAndFill(fields), false));
      }
    }
  }]);

  return MenuView;
}();

function createAnth() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var fragment = document.createDocumentFragment();
  var inner = document.createElement('div');
  inner.className = 'pmr-dropdown__inner';

  var dl = document.createElement('dl');
  dl.className = 'pmr-anth' + (params.className ? ' ' + params.className : '');
  dl.innerHTML = params.html;

  inner.appendChild(dl);
  fragment.appendChild(inner);
  return params.dom.querySelector(params.selector + '.pmr-dropdown .pmr-dropdown__content').appendChild(fragment);
}

function menuPlugin(options) {
  return new Plugin({
    view: function view(editorView) {
      var parentNode = editorView.dom.parentNode;
      var $toolbar = parentNode.querySelector('.pmr-toolbar');
      parentNode.style.cssText += '; padding-top: ' + $toolbar.offsetHeight + 'px;';

      return new MenuView($toolbar, editorView, options);
    },

    // 编辑区添加class
    props: {
      attributes: { 'class': 'pmr-textarea' }
    }
  });
}

var InputRule = function InputRule(match, handler) {
  _classCallCheck(this, InputRule);

  this.match = match;
  this.handler = typeof handler === 'string' ? stringHandler(handler) : handler;
};

function stringHandler(string) {
  return function (state, match, start, end) {
    var insert = string;
    if (match[1]) {
      var offset = match[0].lastIndexOf(match[1]);
      insert += match[0].slice(offset + match[1].length);
      start += offset;
      var cutOff = start - end;

      if (cutOff > 0) {
        insert = match[0].slice(offset - cutOff, offset) + insert;
        start = end;
      }
    }

    var marks = state.doc.resolve(start).marks();
    return state.tr.replaceWith(start, end, state.schema.text(insert, marks));
  };
}



function undoInputRule(state, dispatch) {
  var plugins = state.plugins;

  for (var i = 0, len = plugins.length; i < len; i++) {
    var plugin = plugins[i];
    var undoable = void 0;

    if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
      if (dispatch) {
        var tr = state.tr;
        var toUndo = undoable.transform;
        for (var j = toUndo.steps.length - 1; j >= 0; j--) {
          tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
        }
        var marks = tr.doc.resolve(undoable.from).marks();
        dispatch(tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks)));
      }
      return true;
    }
  }
  return false;
}

var emDash = new InputRule(/--$/, '—');
// :: InputRule Converts three dots to an ellipsis character.
var ellipsis = new InputRule(/\.\.\.$/, '…');
// :: InputRule “Smart” opening double quotes.
var openDoubleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, '“');
// :: InputRule “Smart” closing double quotes.
var closeDoubleQuote = new InputRule(/"$/, '”');
// :: InputRule “Smart” opening single quotes.
var openSingleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, '‘');
// :: InputRule “Smart” closing single quotes.
var closeSingleQuote = new InputRule(/'$/, '’');
// :: [InputRule] Smart-quote related input rules.

var mac$3 = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

function buildKeymap(schema, mapKeys) {
  var keys = {},
      type = void 0;

  function binding(key, cmd) {
    if (mapKeys) {
      var mapped = mapKeys[key];
      if (mapped === false) {
        return;
      }
      if (mapped) {
        key = mapped;
      }
    }
    keys[key] = cmd;
  }

  binding('Mod-z', undo);
  binding('Shift-Mod-z', redo);
  binding('Backspace', undoInputRule);
  !mac$3 && binding('Mod-y', redo);

  if (type = schema.nodes.hard_break) {
    var br = type,
        cmd = chainCommands(exitCode, function (state, dispatch) {
      dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
      return true;
    });

    binding('Mod-Enter', cmd);
    binding('Shift-Enter', cmd);
    mac$3 && binding('Ctrl-Enter', cmd);
  }

  if (type = schema.nodes.list_item) {
    binding('Enter', splitListItem(type));
    binding('Mod-[', liftListItem(type));
    binding('Mod-]', sinkListItem(type));
  }

  return keys;
}

function pluginsGroup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var schema = options.schema;
  var outlet = options.outlet;

  var plugins = [
  // 键盘
  keymap(buildKeymap(schema, options.mapKeys)), keymap(baseKeymap),
  // 历史
  history(),
  // Menubar
  menuPlugin({
    content: options.menuContent || buildMenuItems(schema).fullMenu,
    menus: options.menus,
    schema: schema,
    outlet: outlet
  })];

  return plugins;
}

var nodes = {
  // :: NodeSpec The top level document node.
  doc: {
    content: "block+"
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM: function toDOM() {
      return ["p", 0];
    }
  },

  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    content: "block+",
    group: "block",
    defining: true,
    parseDOM: [{
      tag: "blockquote"
    }],
    toDOM: function toDOM() {
      return ["blockquote", 0];
    }
  },

  blockAlert: {
    attrs: {
      'class': { default: null }
    },
    content: "block+",
    group: "block",
    defining: false,
    parseDOM: [{
      tag: "block-alert"
    }, {
      tag: 'block-alert[class*="pmrico-"]',
      getAttrs: function getAttrs(dom) {
        return {
          'class': dom.getAttribute('class') || 'pmrico-info'
        };
      }
    }],
    toDOM: function toDOM(node) {
      return ["block-alert", node.attrs, 0];
    }
  },

  // :: NodeSpec A horizontal rule (`<hr>`).
  horizontal_rule: {
    group: "block",
    parseDOM: [{ tag: "hr" }],
    toDOM: function toDOM() {
      return ["hr"];
    }
  },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  heading: {
    attrs: { level: { default: 1 } },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [{ tag: "h1", attrs: { level: 1 } }, { tag: "h2", attrs: { level: 2 } }, { tag: "h3", attrs: { level: 3 } }, { tag: "h4", attrs: { level: 4 } }, { tag: "h5", attrs: { level: 5 } }, { tag: "h6", attrs: { level: 6 } }],
    toDOM: function toDOM(node) {
      return ["h" + node.attrs.level, 0];
    }
  },

  // :: NodeSpec A code listing. Disallows marks or non-text inline
  // nodes by default. Represented as a `<pre>` element with a
  // `<code>` element inside of it.
  code_block: {
    content: "text*",
    marks: "",
    group: "block",
    code: true,
    defining: true,
    parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
    toDOM: function toDOM() {
      return ["pre", ["code", 0]];
    }
  },

  // :: NodeSpec The text node.
  text: {
    group: "inline"
  },

  // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
  // `alt`, and `href` attributes. The latter two default to the empty
  // string.
  image: {
    inline: true,
    attrs: {
      src: {},
      alt: { default: null },
      title: { default: null },
      unselectable: { default: 'on' }
    },
    group: "inline",
    draggable: false,
    parseDOM: [{ tag: "img[src]", getAttrs: function getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt")
        };
      }
    }],
    toDOM: function toDOM(node) {
      return ["img", node.attrs];
    }
  },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM: function toDOM() {
      return ["br"];
    }
  }

  // :: Object [Specs](#model.MarkSpec) for the marks in the schema.
};var marks = {
  // :: MarkSpec A link. Has `href` and `title` attributes. `title`
  // defaults to the empty string. Rendered and parsed as an `<a>`
  // element.
  link: {
    attrs: {
      href: {},
      title: { default: null }
    },
    inclusive: false,
    parseDOM: [{ tag: "a[href]", getAttrs: function getAttrs(dom) {
        return { href: dom.getAttribute("href"), title: dom.getAttribute("title") };
      }
    }],
    toDOM: function toDOM(node) {
      return ["a", node.attrs];
    }
  },

  // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
  // Has parse rules that also match `<i>` and `font-style: italic`.
  em: {
    parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
    toDOM: function toDOM() {
      return ["em"];
    }
  },

  // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
  // also match `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [{ tag: "strong" },
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    { tag: "b", getAttrs: function getAttrs(node) {
        return node.style.fontWeight != "normal" && null;
      } }, { style: "font-weight", getAttrs: function getAttrs(value) {
        return (/^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
        );
      } }],
    toDOM: function toDOM() {
      return ["strong"];
    }
  },

  // :: MarkSpec Code font mark. Represented as a `<code>` element.
  code: {
    parseDOM: [{ tag: "code" }],
    toDOM: function toDOM() {
      return ["code"];
    }
  }

  // :: Schema
  // This schema rougly corresponds to the document schema used by
  // [CommonMark](http://commonmark.org/), minus the list elements,
  // which are defined in the [`prosemirror-schema-list`](#schema-list)
  // module.
  //
  // To reuse elements from this schema, extend or read from its
  // `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
};var schema = new Schema({ nodes: nodes, marks: marks });

var menus = {
  emojiCdn: 'https://web.rrzuzu.com/WebStatic/mjsuo/emotions/',
  fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],
  colors: ['black', 'lightgrey', 'green', 'navy', 'purple', 'pink', 'teal', 'red', 'orange', 'white'],
  panels: ['info', 'success', 'note', 'warning', 'error'],
  emotions: [{
    // tab 的标题
    title: '默认',
    // type -> 'emoji' / 'image'
    type: 'image',
    // content -> 数组
    content: [{ 'alt': '[微笑]', 'src': 'huanglianwx_thumb.gif' }, { 'alt': '[嘻嘻]', 'src': 'tootha_thumb.gif' }, { 'alt': '[哈哈]', 'src': 'laugh.gif' }, { 'alt': '[可爱]', 'src': 'tza_thumb.gif' }, { 'alt': '[可怜]', 'src': 'kl_thumb.gif' }, { 'alt': '[挖鼻]', 'src': 'wabi_thumb.gif' }, { 'alt': '[吃惊]', 'src': 'cj_thumb.gif' }, { 'alt': '[害羞]', 'src': 'shamea_thumb.gif' }, { 'alt': '[挤眼]', 'src': 'zy_thumb.gif' }, { 'alt': '[闭嘴]', 'src': 'bz_thumb.gif' }, { 'alt': '[鄙视]', 'src': 'bs2_thumb.gif' }, { 'alt': '[爱你]', 'src': 'lovea_thumb.gif' }, { 'alt': '[泪]', 'src': 'sada_thumb.gif' }, { 'alt': '[偷笑]', 'src': 'heia_thumb.gif' }, { 'alt': '[亲亲]', 'src': 'qq_thumb.gif' }, { 'alt': '[生病]', 'src': 'sb_thumb.gif' }, { 'alt': '[太开心]', 'src': 'mb_thumb.gif' }, { 'alt': '[白眼]', 'src': 'landeln_thumb.gif' }, { 'alt': '[右哼哼]', 'src': 'yhh_thumb.gif' }, { 'alt': '[左哼哼]', 'src': 'zhh_thumb.gif' }, { 'alt': '[嘘]', 'src': 'x_thumb.gif' }, { 'alt': '[衰]', 'src': 'cry.gif' }, { 'alt': '[委屈]', 'src': 'wq_thumb.gif' }, { 'alt': '[吐]', 'src': 't_thumb.gif' }, { 'alt': '[哈欠]', 'src': 'haqianv2_thumb.gif' }, { 'alt': '[抱抱]', 'src': 'bba_thumb.gif' }, { 'alt': '[怒]', 'src': 'angrya_thumb.gif' }, { 'alt': '[疑问]', 'src': 'yw_thumb.gif' }, { 'alt': '[馋嘴]', 'src': 'cza_thumb.gif' }, { 'alt': '[拜拜]', 'src': '88_thumb.gif' }, { 'alt': '[思考]', 'src': 'sk_thumb.gif' }, { 'alt': '[汗]', 'src': 'sweata_thumb.gif' }, { 'alt': '[困]', 'src': 'kunv2_thumb.gif' }, { 'alt': '[睡]', 'src': 'huangliansj_thumb.gif' }, { 'alt': '[钱]', 'src': 'money_thumb.gif' }, { 'alt': '[失望]', 'src': 'sw_thumb.gif' }, { 'alt': '[酷]', 'src': 'cool_thumb.gif' }, { 'alt': '[色]', 'src': 'huanglianse_thumb.gif' }, { 'alt': '[哼]', 'src': 'hatea_thumb.gif' }, { 'alt': '[鼓掌]', 'src': 'gza_thumb.gif' }, { 'alt': '[晕]', 'src': 'dizzya_thumb.gif' }, { 'alt': '[悲伤]', 'src': 'bs_thumb.gif' }, { 'alt': '[抓狂]', 'src': 'crazya_thumb.gif' }, { 'alt': '[黑线]', 'src': 'h_thumb.gif' }, { 'alt': '[阴险]', 'src': 'yx_thumb.gif' }, { 'alt': '[怒骂]', 'src': 'numav2_thumb.gif' }, { 'alt': '[互粉]', 'src': 'hufen_thumb.gif' }, { 'alt': '[心]', 'src': 'hearta_thumb.gif' }, { 'alt': '[伤心]', 'src': 'unheart.gif' }, { 'alt': '[猪头]', 'src': 'pig.gif' }, { 'alt': '[熊猫]', 'src': 'panda_thumb.gif' }, { 'alt': '[兔子]', 'src': 'rabbit_thumb.gif' }, { 'alt': '[ok]', 'src': 'ok_thumb.gif' }, { 'alt': '[耶]', 'src': 'ye_thumb.gif' }, { 'alt': '[good]', 'src': 'good_thumb.gif' }, { 'alt': '[NO]', 'src': 'buyao_org.gif' }, { 'alt': '[赞]', 'src': 'z2_thumb.gif' }, { 'alt': '[来]', 'src': 'come_thumb.gif' }, { 'alt': '[弱]', 'src': 'sad_thumb.gif' }, { 'alt': '[草泥马]', 'src': 'shenshou_thumb.gif' }, { 'alt': '[神马]', 'src': 'horse2_thumb.gif' }, { 'alt': '[囧]', 'src': 'j_thumb.gif' }, { 'alt': '[浮云]', 'src': 'fuyun_thumb.gif' }, { 'alt': '[给力]', 'src': 'geiliv2_thumb.gif' }, { 'alt': '[围观]', 'src': 'wg_thumb.gif' }, { 'alt': '[威武]', 'src': 'vw_thumb.gif' }, { 'alt': '[奥特曼]', 'src': 'otm_thumb.gif' }, { 'alt': '[礼物]', 'src': 'liwu_thumb.gif' }, { 'alt': '[钟]', 'src': 'clock_thumb.gif' }, { 'alt': '[话筒]', 'src': 'huatongv2_thumb.gif' }, { 'alt': '[蜡烛]', 'src': 'lazhuv2_thumb.gif' }, { 'alt': '[蛋糕]', 'src': 'cakev2_thumb.gif' }, { 'alt': '[发红包啦]', 'src': 'hb_fahongbao2016_thumb.gif' }, { 'alt': '[抢到啦]', 'src': 'hb_qiangdao2016_thumb.gif' }, { 'alt': '[最右]', 'src': 'lxhzuiyou_thumb.gif' }, { 'alt': '[泪流满面]', 'src': 'lxhtongku_thumb.gif' }, { 'alt': '[江南style]', 'src': 'gangnamstyle_thumb.gif' }, { 'alt': '[偷乐]', 'src': 'lxhtouxiao_thumb.gif' }, { 'alt': '[加油啊]', 'src': 'lxhjiayou_thumb.gif' }, { 'alt': '[doge]', 'src': 'doge_thumb.gif' }, { 'alt': '[喵喵]', 'src': 'mm_thumb.gif' }, { 'alt': '[笑cry]', 'src': 'xiaoku_thumb.gif' }, { 'alt': '[xkl转圈]', 'src': 'xklzhuanquan_thumb.gif' }, { 'alt': '[芒果得意]', 'src': 'mango_03_thumb.gif' }, { 'alt': '[芒果流口水]', 'src': 'mango_07_thumb.gif' }, { 'alt': '[芒果点赞]', 'src': 'mango_12_thumb.gif' }, { 'alt': '[芒果大笑]', 'src': 'mango_02_thumb.gif' }, { 'alt': '[芒果萌萌哒]', 'src': 'mango_11_thumb.gif' }, { 'alt': '[羊年大吉]', 'src': 'yangniandj_thumb.gif' }, { 'alt': '[西瓜]', 'src': 'watermelon.gif' }, { 'alt': '[足球]', 'src': 'football.gif' }, { 'alt': '[老妈我爱你]', 'src': 'mothersday_thumb.gif' }, { 'alt': '[母亲节]', 'src': 'carnation_thumb.gif' }, { 'alt': '[肥皂]', 'src': 'soap_thumb.gif' }, { 'alt': '[有钱]', 'src': 'youqian_thumb.gif' }, { 'alt': '[地球一小时]', 'src': 'earth1r_thumb.gif' }, { 'alt': '[国旗]', 'src': 'flag_thumb.gif' }, { 'alt': '[许愿]', 'src': 'lxhxuyuan_thumb.gif' }, { 'alt': '[风扇]', 'src': 'fan.gif' }, { 'alt': '[炸鸡和啤酒]', 'src': 'zhaji_thumb.gif' }, { 'alt': '[雪]', 'src': 'snow_thumb.gif' }, { 'alt': '[马上有对象]', 'src': 'mashangyouduixiang_thumb.gif' }, { 'alt': '[马到成功旧]', 'src': 'madaochenggong_thumb.gif' }, { 'alt': '[青啤鸿运当头]', 'src': 'hongyun_thumb.gif' }, { 'alt': '[让红包飞]', 'src': 'hongbaofei2014_thumb.gif' }, { 'alt': '[ali做鬼脸]', 'src': 'alizuoguiliannew_thumb.gif' }, { 'alt': '[ali哇]', 'src': 'aliwanew_thumb.gif' }]
  }]
};

var COLORS = menus.colors;
var FONTS = menus.fontNames;

// 表情 Schema
var emojiNodeSpec = {
  attrs: {
    src: { default: null },
    alt: { default: null }
  },
  inline: true,
  group: 'inline',
  draggable: false,
  toDOM: function toDOM(node) {
    return ['img', {
      'src': node.attrs.src,
      'class': 'face-image',
      'alt': node.attrs.alt,
      'unselectable': 'on'
    }];
  },
  parseDOM: [{
    tag: 'img[src*=\'' + menus.emojiCdn + '\']',
    getAttrs: function getAttrs(dom) {
      var cdn = menus.emojiCdn;
      var src = dom.src.replace(/^(https?):/i, '');
      var data = menus.emotions[0].content.filter(function (item) {
        return ('' + cdn + item.src).indexOf(src) >= 0;
      });
      data = data[0];

      return !!data ? { src: '' + cdn + data.src, alt: data.alt } : false;
    }
  }]
};

var fontMarks = {};

function createFontMark(value, array) {
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'color';

  return {
    attrs: {
      style: { default: style + ': ' + value + ';' }
    },
    excludes: array.join(' '),
    parseDOM: [{
      style: style + '=' + value,
      attrs: { style: style + ': ' + value }
    }],
    toDOM: function toDOM(node) {
      return ['span', { style: node.attrs.style }];
    }
  };
}

// 字体颜色，背景颜色
COLORS.forEach(function (color) {
  fontMarks[color] = createFontMark(color, COLORS);
});

// 字体
FONTS.forEach(function (font) {
  return fontMarks[font] = createFontMark(font, FONTS, 'font-family');
});

var baseMarks = schema.spec.marks;
baseMarks = baseMarks.addToStart('strike', textDecorationMarks('strike', /^(line-through)/));
baseMarks = baseMarks.addToStart('u', textDecorationMarks('u', /^(underline)/));

(function () {
  for (var key in fontMarks) {
    if (fontMarks.hasOwnProperty(key)) {
      baseMarks = baseMarks.addToStart(key, fontMarks[key]);
    }
  }
})();

var pmrSchema = new Schema({
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
  var parseDOM = [{ tag: tag }, { style: 'text-decoration', getAttrs: function getAttrs(value) {
      return reg.test(value) && null;
    } }];

  if (tag === 'u') {
    parseDOM.push({ tag: 'ins' });
  } else {
    parseDOM.push({ tag: 's' });
    parseDOM.push({ tag: 'del' });
  }

  return {
    parseDOM: parseDOM,
    toDOM: function toDOM() {
      return [tag];
    }
  };
}

var cdn = menus.emojiCdn.replace(/https?:/i, '');
var emojiReg = new RegExp('<img[^<>]+src="(https?:)?' + cdn + '.+?"[^<>]*>', 'gi');
var imagesReg = new RegExp('<img[^<>]+src="(?!(https?:)?' + cdn + ').+?"[^<>]*>', 'gi');
var linkReg = /<a[^<>]+href=".+?"[^<>]*>[^><]*<\/a>/gi;

var OutletView = function () {
  function OutletView() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OutletView);

    var self = this;

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
        menus: menus,
        schema: pmrSchema,
        outlet: this
      })
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
      dispatchTransaction: dispatchTransaction, // dispatch-2
      transformPastedHTML: function transformPastedHTML(html) {
        console.log(html);
        return self.transformPastedHTML(html);
      }
    });

    this.$text = this.view.dom;
    dispatchTransaction(this.state.tr); // dispatch-1
    console.log(this);
  }

  _createClass(OutletView, [{
    key: 'transformPastedHTML',
    value: function transformPastedHTML() {
      var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      html = replaceHtml(html);

      if (!this.params.disableLimit) {
        var emojMatch = html.match(emojiReg);
        var imagesMatch = html.match(imagesReg);
        var linksMatch = html.match(linkReg);

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
  }, {
    key: 'calcPasteData',
    value: function calcPasteData(html, reg, prop) {
      var _this = this;

      var state = this.state;
      var MAX = this.params[prop + 'Max'];
      var COUNT = this[prop + 'Count'];
      var acc = prop + '$';
      this[acc] = 0;

      // 计算选中的区域含有多少个 prop类型的
      var len = selectionContent(state, prop);

      html = html.replace(reg, function (data) {
        if (MAX - COUNT + len <= _this[acc]) {
          return prop === 'link' ? data.replace(/<(\/)?a[^<>]*>/gi, '') : '';
        }

        _this[acc]++;
        return data;
      });

      if (COUNT >= MAX && !len) {
        this.alert(MAX, prop);
      }
      return html;
    }
  }, {
    key: 'alert',
    value: function alert(max, type) {
      var msg = '';
      var alert = this.params.alert;

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
  }, {
    key: 'dispatchProvider',
    value: function dispatchProvider() {
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

  }, {
    key: 'getSomeCount',
    value: function getSomeCount() {
      var doc = this.state.doc;
      var content = doc.content.toJSON();

      this.contentLength = doc.textContent.length;

      var emojiCount = 0;
      var linkCount = 0;
      var imageCount = 0;

      // console.log(content);
      (function accumulator(data) {
        for (var i = 0, len = data.length; i < len; i++) {
          var item = data[i];
          var type = item.type;

          if (type === 'emoji') {
            emojiCount++;
          } else if (type === 'image') {
            imageCount++;
          } else if (type === 'text') {
            var marks = item.marks;
            !!marks && marks.length && marks[0].type === 'link' && linkCount++;
          }

          var contentArr = item.content;
          if (!!contentArr && contentArr.length) {
            accumulator(contentArr);
          }
        }
      })(content);

      this.emojiCount = emojiCount;
      this.linkCount = linkCount;
      this.imageCount = imageCount;
    }
  }, {
    key: 'countWords',
    value: function countWords() {
      this.$size.classList.toggle('pmr-above-max', this.aboveMax);
      this.$size.innerHTML = '\u5B57\u6570\u9650\u5236\u5728' + this.currentCount + '/' + this.params.max + '\u5B57\u4EE5\u5185\uFF0C' + this.emojiCount + '\u8868\u60C5\uFF0C' + this.linkCount + '\u94FE\u63A5\uFF0C' + this.imageCount + '\u56FE\u7247' + (this.aboveMax ? '，服务器可能拒绝保存！' : '');
    }
  }, {
    key: 'values',
    get: function get() {
      return this.$text.innerHTML || '';
    }
  }, {
    key: 'aboveMax',
    get: function get() {
      return this.currentCount > this.params.max;
    }
  }, {
    key: 'currentCount',
    get: function get() {
      return (this.contentLength || 0) + (this.emojiCount || 0);
    }
  }]);

  return OutletView;
}();

function replaceHtml() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // 去除表格，word 文档格式
  html = html.replace(/<\/?(table|thead|tbody|tfoot|tr|td|th)[^>]*>|<o:p>[^<>]*<\/o:p>/gi, '');
  // 去除空标签 1
  var rsReg = /<([a-z]+)[^>]*>(&nbsp;)?<\/\1>/ig;
  html = html.replace(rsReg, '').replace(rsReg, '');

  // 去除两边无用的html，我把这个放以上的前面 ie不知道为何会卡一会
  return html.replace(/^([\s\S]*<!--StartFragment-->)|(<!--EndFragment-->[\s\S]*)$/gi, '');
}

exports.OutletView = OutletView;

Object.defineProperty(exports, '__esModule', { value: true });

})));
