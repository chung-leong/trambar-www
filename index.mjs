import React, { useState, useCallback, useDebugValue, useRef, useEffect, useMemo, PureComponent } from 'react';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var RelaksEventEmitter =
/*#__PURE__*/
function () {
  function RelaksEventEmitter() {
    _classCallCheck$1(this, RelaksEventEmitter);

    this.listeners = [];
    this.promises = [];
  }
  /**
   * Attach an event handler
   *
   * @param  {String} type
   * @param  {Function} handler
   * @param  {Boolean|undefined} beginning
   */


  _createClass$1(RelaksEventEmitter, [{
    key: "addEventListener",
    value: function addEventListener(type, handler, beginning) {
      if (typeof type !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Invalid event type passed to addEventListener()');
        }

        return;
      }

      if (!(handler instanceof Function) && handler != null) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Non-function passed to addEventListener()');
        }

        return;
      }

      if (beginning) {
        this.listeners.unshift({
          type: type,
          handler: handler
        });
      } else {
        this.listeners.push({
          type: type,
          handler: handler
        });
      }
    }
    /**
     * Remove an event handler
     *
     * @param  {String} type
     * @param  {Function} handler
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, handler) {
      this.listeners = this.listeners.filter(function (listener) {
        return !(listener.type === type && listener.handler === handler);
      });
    }
    /**
     * Return a promise that will be fulfilled when the specified event occurs
     *
     * @param  {String} type
     * @param  {Number|undefined} timeout
     *
     * @return {Promise<Event>}
     */

  }, {
    key: "waitForEvent",
    value: function waitForEvent(type, timeout) {
      var promise = this.promises[type];

      if (!promise) {
        var resolve, reject;
        promise = new Promise(function (f1, f2) {
          resolve = f1;
          reject = f2;
        });
        promise.resolve = resolve;
        promise.reject = reject;
        this.promises[type] = promise;

        if (timeout) {
          setTimeout(function () {
            if (promise.reject) {
              promise.reject(new Error("No '".concat(type, "' event within ").concat(timeout, "ms")));
            }
          }, timeout);
        }
      }

      return promise;
    }
    /**
     * Send event to event listeners, return true or false depending on whether
     * there were any listeners
     *
     * @param  {RelaksDjangoDataSourceEvent} evt
     *
     * @return {Boolean}
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(evt) {
      var promise = this.promises[evt.type];

      if (promise) {
        delete this.promises[evt.type];
      }

      var listeners = this.listeners.filter(function (listener) {
        return listener.type === evt.type;
      });

      if (listeners.length === 0) {
        if (promise) {
          promise.reject = null;
          promise.resolve(evt);
          return true;
        } else {
          return false;
        }
      }

      evt.decisionPromise = this.dispatchEvent(evt, listeners).then(function () {
        if (promise) {
          promise.reject = null;
          promise.resolve(evt);
        }
      });
      return true;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(evt, listeners) {
      var _this = this;

      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener.handler.call(evt.target, evt);

        if (evt.defaultPostponed) {
          var _ret = function () {
            var remainingListeners = listeners.slice(i + 1);
            return {
              v: evt.defaultPostponed.then(function (decision) {
                if (decision === false) {
                  evt.preventDefault();
                  evt.stopImmediatePropagation();
                }

                if (!evt.propagationStopped) {
                  return _this.dispatchEvent(evt, remainingListeners);
                }
              })
            };
          }();

          if (_typeof$1(_ret) === "object") return _ret.v;
        }

        if (evt.propagationStopped) {
          break;
        }
      }

      return Promise.resolve();
    }
  }]);

  return RelaksEventEmitter;
}();

var RelaksGenericEvent =
/*#__PURE__*/
function () {
  function RelaksGenericEvent(type, target, props) {
    _classCallCheck$1(this, RelaksGenericEvent);

    this.type = type;
    this.target = target;
    this.defaultPrevented = false;
    this.defaultPostponed = null;
    this.propagationStopped = false;
    this.decisionPromise = null;
    Object.assign(this, props);
  }

  _createClass$1(RelaksGenericEvent, [{
    key: "preventDefault",
    value: function preventDefault() {
      this.defaultPrevented = true;
    }
  }, {
    key: "postponeDefault",
    value: function postponeDefault(promise) {
      if (promise instanceof Function) {
        promise = promise();
      }

      if (!promise || !(promise.then instanceof Function)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Non-promise passed to postponeDefault()');
        }

        return;
      }

      this.defaultPostponed = promise;
    }
  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this.propagationStopped = true;
    }
  }, {
    key: "waitForDecision",
    value: function waitForDecision() {
      return Promise.resolve(this.decisionPromise);
    }
  }]);

  return RelaksGenericEvent;
}();

var DataSourceError =
/*#__PURE__*/
function (_Error) {
  _inherits(DataSourceError, _Error);

  function DataSourceError(status, message) {
    var _this;

    _classCallCheck(this, DataSourceError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataSourceError).call(this, message));
    _this.status = status;
    return _this;
  }

  return DataSourceError;
}(_wrapNativeSuper(Error));

var DataSourceEvent =
/*#__PURE__*/
function (_GenericEvent) {
  _inherits(DataSourceEvent, _GenericEvent);

  function DataSourceEvent() {
    _classCallCheck(this, DataSourceEvent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataSourceEvent).apply(this, arguments));
  }

  return DataSourceEvent;
}(RelaksGenericEvent);

function any(list) {
  return function (name) {
    return list.indexOf(name) !== -1;
  };
}

function not(list) {
  return function (name) {
    return list.indexOf(name) === -1;
  };
}

var block = {
  block: true
};
var childless = {
  "void": true
};
var style = {
  styles: true
};
var unknown = {
  unknown: true
};
var a = {
  endsOn: any(['a']),
  styles: true
};
var address = block;
var area = childless;
var article = block;
var aside = block;
var blockquote = block;
var canvas = block;
var b = style;
var base = childless;
var br = {
  vivificates: true,
  "void": true
};
var caption = {
  endsOn: any(['td', 'tr', 'tbody', 'thead', 'tfoot', 'colgroup', 'col'])
};
var code = style;
var col = childless;
var colgroup = {
  endsOn: not(['col']),
  evicts: true
};
var command = childless;
var dd = {
  block: true,
  endsOn: any(['dd', 'dt'])
};
var div = block;
var dl = block;
var dt = dd;
var em = style;
var embed = childless;
var fieldset = block;
var figcaption = block;
var figure = block;
var footer = block;
var form = block;
var header = block;
var h1 = {
  block: true,
  endsOn: any(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};
var h2 = h1;
var h3 = h1;
var h4 = h1;
var h5 = h1;
var h6 = h1;
var hr = {
  block: true,
  "void": true
};
var i = style;
var img = childless;
var input = childless;
var keygen = childless;
var li = {
  block: true,
  endsOn: any(['li'])
};
var link = childless;
var main = block;
var meta = childless;
var nav = block;
var noscript = block;
var ol = {
  block: true,
  expects: any(['li'])
};
var p = {
  block: true,
  endsOn: any(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul']),
  vivificates: true
};
var param = childless;
var pre = {
  block: true,
  trims: true
};
var section = block;
var source = childless;
var small = style;
var strong = style;
var table = {
  block: true,
  clears: true,
  evicts: true,
  expects: any(['td', 'tr', 'tbody', 'thead', 'tfoot', 'caption', 'colgroup', 'col']),
  implicit: {
    tr: 'tbody',
    td: 'tbody',
    th: 'tbody',
    col: 'colgroup'
  }
};
var tbody = {
  clears: true,
  endsOn: any(['tbody', 'thead', 'tfoot']),
  evicts: true,
  expects: any(['tr']),
  implicit: {
    td: 'tr',
    th: 'tr'
  }
};
var td = {
  clears: true,
  endsOn: any(['td', 'th'])
};
var tfoot = tbody;
var th = td;
var thead = tbody;
var tr = {
  clears: true,
  endsOn: any(['tr']),
  evicts: true,
  expects: any(['td', 'th'])
};
var track = childless;
var u = style;
var ul = ol;
var wbr = childless;
var tagProperties = {
  a: a,
  address: address,
  area: area,
  article: article,
  aside: aside,
  blockquote: blockquote,
  canvas: canvas,
  b: b,
  base: base,
  br: br,
  caption: caption,
  code: code,
  col: col,
  colgroup: colgroup,
  command: command,
  dd: dd,
  div: div,
  dl: dl,
  dt: dt,
  em: em,
  embed: embed,
  fieldset: fieldset,
  figcaption: figcaption,
  figure: figure,
  footer: footer,
  form: form,
  header: header,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  hr: hr,
  i: i,
  img: img,
  input: input,
  keygen: keygen,
  li: li,
  link: link,
  main: main,
  meta: meta,
  nav: nav,
  noscript: noscript,
  ol: ol,
  p: p,
  param: param,
  pre: pre,
  section: section,
  source: source,
  small: small,
  strong: strong,
  table: table,
  tbody: tbody,
  td: td,
  tfoot: tfoot,
  th: th,
  thead: thead,
  tr: tr,
  track: track,
  u: u,
  ul: ul,
  wbr: wbr
};

function getTagProperties(tagName) {
  return tagProperties[tagName] || unknown;
}

var HTMLText =
/*#__PURE__*/
function () {
  function HTMLText(data) {
    _classCallCheck(this, HTMLText);

    if (data) {
      this.json = data.json;
      this.resources = data.resources;
    }
  }

  _createClass(HTMLText, [{
    key: "getPlainText",
    value: function getPlainText(options) {
      return getPlainTextFromNodes(this.json, options);
    }
  }, {
    key: "getRichText",
    value: function getRichText(options) {
      return getRichTextFromNodes(this.json, options);
    }
  }, {
    key: "getAvailableLanguages",
    value: function getAvailableLanguages() {
      var codes = [];
      var choices = separateNodesByLanguages(this.json);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var choice = _step.value;

          if (choice.languages) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = choice.languages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var code = _step2.value;

                if (codes.indexOf(code) === -1) {
                  codes.push(code);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return codes;
    }
  }, {
    key: "getLanguageSpecific",
    value: function getLanguageSpecific(lang) {
      var choices = separateNodesByLanguages(this.json);
      var chosen = chooseLanguageVersion(choices, lang);
      var json = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = chosen[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var choice = _step3.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = choice.nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var node = _step4.value;
              json.push(node);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return new HTMLText(json, this.resources);
    }
  }, {
    key: "getJSON",
    value: function getJSON(title) {
      var titleFound = false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.json[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var node = _step5.value;

          if (node instanceof Object) {
            if (/^h[1-6]$/.test(node.type)) {
              var text = getPlainTextFromNode(node, {}).trim();
              titleFound = text === title;
            } else if (node.type === 'pre') {
              if (titleFound && node.children instanceof Array) {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                  for (var _iterator6 = node.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var child = _step6.value;

                    if (child.type === 'code') {
                      var _text = getPlainTextFromNode(child, {});

                      try {
                        return JSON.parse(_text);
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }
                } catch (err) {
                  _didIteratorError6 = true;
                  _iteratorError6 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                      _iterator6["return"]();
                    }
                  } finally {
                    if (_didIteratorError6) {
                      throw _iteratorError6;
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }]);

  return HTMLText;
}();

function getPlainTextFromNodes(nodes, options, key, parent) {
  var list = [];

  if (nodes instanceof Array) {
    var blockLevel = nodes.map(isBlockLevel);
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = nodes.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _step7$value = _slicedToArray(_step7.value, 2),
            index = _step7$value[0],
            child = _step7$value[1];

        var _text2 = getPlainTextFromNode(child, options, index, parent);

        if (blockLevel[index - 1] && blockLevel[index + 1]) {
          // ignore whitespaces between block level elements
          if (child.type === 'text' && !_text2.trim()) {
            continue;
          }
        }

        list.push(_text2);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }

  var text = list.join('');

  if (!parent) {
    return text.trim();
  } else {
    return text;
  }
}

function getPlainTextFromNode(node, options, key, parent) {
  if (_typeof(node) === 'object') {
    var type = node.type,
        props = node.props,
        children = node.children;

    if (type === 'br') {
      return '\n';
    } else if (type === 'img') {
      return props.alt ? "[".concat(props.alt, "]") : "";
    } else {
      var innerText = getPlainTextFromNodes(children, options, key, node);
      var outerText = wrapPlainText(innerText, node, parent);
      return outerText;
    }
  } else if (typeof node === 'string') {
    return normalizeWhitespaces(node);
  }
}

function getRichTextFromNodes(nodes, options, key) {
  var list = [];

  if (nodes instanceof Array) {
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = nodes.entries()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var _step8$value = _slicedToArray(_step8.value, 2),
            index = _step8$value[0],
            child = _step8$value[1];

        var element = getRichTextFromNode(child, options, index);
        list.push(element);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }

  if (key === undefined) {
    return createElement(React.Fragment, {}, list, options);
  } else {
    return list.length > 0 ? list : undefined;
  }
}

function getRichTextFromNode(node, options, key) {
  if (_typeof(node) === 'object') {
    var type = node.type,
        props = node.props,
        children = node.children;
    var contents;

    if (children instanceof Array) {
      contents = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = children.entries()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _step9$value = _slicedToArray(_step9.value, 2),
              index = _step9$value[0],
              child = _step9$value[1];

          contents.push(getRichTextFromNode(child, options, index));
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }

    return createElement(type, _objectSpread2({}, props, {
      key: key
    }), contents, options);
  } else if (typeof node === 'string') {
    var text = normalizeWhitespaces(node);
    return createElement(undefined, {
      key: key
    }, text, options);
  }
}

function createElement(type, props, children, options) {
  var _ref = options || {},
      adjustFunc = _ref.adjustFunc;

  if (adjustFunc instanceof Function) {
    var result = adjustFunc(type, props, children);

    if (result !== undefined) {
      if (result === null) {
        return null;
      }

      if (!(result instanceof Object)) {
        throw new Error('Function should return an object');
      }

      type = result.type;
      props = result.props;
      children = result.children;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children && typeof children !== 'string') {
      children = React.Children.toArray(children);
    }
  }

  if (type === undefined) {
    return children;
  } else {
    return React.createElement(type, props, children);
  }
}

function isBlockLevel(node) {
  if (_typeof(node) === 'object') {
    var tag = getTagProperties(node.type);
    return !!tag.block;
  } else {
    return false;
  }
}

function wrapPlainText(innerText, node, parent) {
  if (isBlockLevel(node)) {
    var text = innerText.trim();

    if (!/\n$/.test(text)) {
      text += '\n';
    }

    switch (node.type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'p':
        if (!/\n\n$/.test(text)) {
          text += '\n';
        }

        break;

      case 'li':
        if (parent && parent.name === 'ol') {
          var num = 1;
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = parent.children[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var child = _step10.value;

              if (child === node) {
                break;
              }

              if (child.name === 'li') {
                num++;
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                _iterator10["return"]();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }

          text = "".concat(num, ". ").concat(text);
        } else {
          text = "* ".concat(text);
        }

        break;

      case 'hr':
        text = '――――――――――\n';
        break;
    }

    return text;
  } else {
    return innerText;
  }
}

function normalizeWhitespaces(text) {
  return text.replace(/\s+/g, ' ');
}

function isLanguageCode(text) {
  return /^[a-z]{2}(\-[a-z]{2})?$/i.test(text);
}

function separateNodesByLanguages(nodes) {
  var choices = [];
  var topic = 0;
  var languages;
  var choice;
  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = nodes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var node = _step11.value;
      var newLanguages = getLanguageCodesFromNode(node);

      if (newLanguages) {
        if (newLanguages.length > 0) {
          if (!languages) {
            topic++;
          }

          languages = newLanguages;
        } else {
          if (languages) {
            topic++;
          }

          languages = undefined;
        }

        choice = undefined;
        continue;
      }

      if (!choice) {
        choice = {
          languages: languages,
          name: 'T' + topic,
          nodes: []
        };
        choices.push(choice);
      }

      choice.nodes.push(node);
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
        _iterator11["return"]();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  return choices;
}

function getLanguageCodesFromNode(node) {
  if (node instanceof Object && /^h[1-6]$/.test(node.type)) {
    var text = getPlainTextFromNode(node, {}).trim();
    var m = /^\((.*)\)$/.exec(text);

    if (m) {
      var codes = [];
      var flags = m[1].trim().split(/\s*,\s*/);
      var reset = false;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = flags[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var flag = _step12.value;

          if (isLanguageCode(flag)) {
            var code = flag.toLowerCase();

            if (code !== 'zz') {
              codes.push(code);
            } else {
              reset = true;
            }
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      if (codes.length > 0 || reset) {
        return codes;
      }
    }
  }
}

function chooseLanguageVersion(choices, lang) {
  var list = [];
  var existing = {};
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = choices[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var object = _step13.value;
      var score = getLanguageMatch(object.languages, lang);
      var previous = existing[object.name];

      if (!previous) {
        existing[object.name] = {
          index: list.length,
          score: score
        };
        list.push(object);
      } else if (previous.score < score) {
        list[previous.index] = object;
        previous.score = score;
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return list;
}

function getLanguageMatch(languageCodes, lang) {
  if (languageCodes instanceof Array) {
    var highest;

    var _lang$split = lang.split('-'),
        _lang$split2 = _slicedToArray(_lang$split, 2),
        reqLC = _lang$split2[0],
        reqCC = _lang$split2[1];

    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = languageCodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var languageCode = _step14.value;

        var _languageCode$split = languageCode.split('-'),
            _languageCode$split2 = _slicedToArray(_languageCode$split, 2),
            lc = _languageCode$split2[0],
            cc = _languageCode$split2[1];

        var score = 0;

        if (lc === reqLC) {
          if (cc === reqCC) {
            score = 100;
          } else {
            score = 50;
          }
        }

        if (!(highest > score)) {
          highest = score;
        }
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
          _iterator14["return"]();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }

    return highest;
  } else {
    return 1;
  }
}

function findLanguageCodes(flags, defaultLanguages) {
  var codes = [];

  if (flags instanceof Array) {
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = flags[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var flag = _step15.value;

        if (isLanguageCode(flag)) {
          codes.push(flag.toLowerCase());
        }
      }
    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
          _iterator15["return"]();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }
  }

  return codes.length > 0 ? codes : defaultLanguages || [];
}

var DataSourceObject =
/*#__PURE__*/
function () {
  function DataSourceObject(identifiers, json) {
    _classCallCheck(this, DataSourceObject);

    this.identifiers = identifiers;
    this.json = json;
  }

  _createClass(DataSourceObject, [{
    key: "getAvailableLanguages",
    value: function getAvailableLanguages() {
      var codes = [];

      for (var _i = 0, _Object$values = Object.values(this); _i < _Object$values.length; _i++) {
        var value = _Object$values[_i];

        if (value instanceof HTMLText) {
          var textCodes = value.getAvailableLanguages();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = textCodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var code = _step.value;

              if (codes.indexOf(code) === -1) {
                codes.push(code);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }

      return codes;
    }
  }, {
    key: "getLanguageSpecific",
    value: function getLanguageSpecific(lang) {
      var object = new this.constructor(this.identifiers);

      for (var _i2 = 0, _Object$entries = Object.entries(this); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
            name = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (value instanceof HTMLText) {
          value = value.getLanguageSpecific(lang);
        }

        object[name] = value;
      }

      return object;
    }
  }], [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      return '';
    }
  }, {
    key: "getPageVariable",
    value: function getPageVariable() {
      return '';
    }
  }]);

  return DataSourceObject;
}();

var ProjectMetadata =
/*#__PURE__*/
function (_DataSourceObject) {
  _inherits(ProjectMetadata, _DataSourceObject);

  function ProjectMetadata(identifiers, json) {
    var _this;

    _classCallCheck(this, ProjectMetadata);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProjectMetadata).call(this, identifiers, json));
    _this.name = json.name || '';
    _this.title = createHTMLText(json.title);
    _this.description = createHTMLText(json.description);
    _this.archived = json.archived || false;
    return _this;
  }

  _createClass(ProjectMetadata, null, [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      return "meta/";
    }
  }]);

  return ProjectMetadata;
}(DataSourceObject);

function createHTMLText(langText) {
  var tokens = [];

  if (langText instanceof Object) {
    for (var _i = 0, _Object$entries = Object.entries(langText); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          lang = _Object$entries$_i[0],
          text = _Object$entries$_i[1];

      tokens.push({
        type: 'h1',
        children: [text]
      });
      tokens.push(text);
    }
  }

  return new HTMLText(tokens);
}

var VisitorGeolocation =
/*#__PURE__*/
function (_DataSourceObject) {
  _inherits(VisitorGeolocation, _DataSourceObject);

  function VisitorGeolocation(identifiers, json) {
    var _this;

    _classCallCheck(this, VisitorGeolocation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisitorGeolocation).call(this, identifiers, json));
    _this.countryCode = json.country;
    return _this;
  }

  _createClass(VisitorGeolocation, null, [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      return "geoip/";
    }
  }]);

  return VisitorGeolocation;
}(DataSourceObject);

var defaultOptions = {
  baseURL: '',
  fetchFunc: null,
  refreshDelay: 1000,
  refreshInterval: Infinity
};

var DataSource =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(DataSource, _EventEmitter);

  function DataSource(extensions, options) {
    var _this;

    _classCallCheck(this, DataSource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataSource).call(this));
    _this.active = false;
    _this.activationPromise = null;
    _this.freshnessCheckInterval = 0;
    _this.queries = [];
    _this.options = {};

    for (var name in defaultOptions) {
      if (options && options[name] !== undefined) {
        _this.options[name] = options[name];
      } else {
        _this.options[name] = defaultOptions[name];
      }
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var extension = _step.value;
        var p = extension.prototype;

        while (p && p !== DataSource.prototype) {
          var names = Object.getOwnPropertyNames(p);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _name = _step2.value;

              if (_name !== 'constructor') {
                _this[_name] = p[_name];
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          p = p.prototype;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(DataSource, [{
    key: "activate",
    value: function activate() {
      var _this2 = this;

      this.active = true;

      if (this.activationPromise) {
        var resolve = this.activationPromise.resolve;
        this.activationPromise = null;
        resolve();
      }

      this.freshnessCheckInterval = setInterval(function () {
        _this2.checkFreshness();
      }, 250);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
      clearInterval(this.freshnessCheckInterval);
      this.freshnessCheckInterval = 0;
    }
  }, {
    key: "log",
    value: function log() {
      this.fetchGeoIP()["catch"](function (err) {});
    }
  }, {
    key: "fetchProjectMeta",
    value: function fetchProjectMeta() {
      return this.fetchObject(ProjectMetadata, []);
    }
  }, {
    key: "fetchVisitorGeolocation",
    value: function fetchVisitorGeolocation() {
      return this.fetchObject(VisitorGeolocation, []);
    }
  }, {
    key: "getDataURL",
    value: function getDataURL(constructor, identifiers, criteria) {
      var url = this.options.baseURL || '';

      if (!url.endsWith('/')) {
        url += '/';
      }

      url += 'data/';
      url += encodeURI(constructor.getObjectURL(identifiers));

      if (criteria instanceof Object) {
        var pairs = [];

        for (var _i = 0, _Object$entries = Object.entries(criteria); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (value !== undefined) {
            var keyEnc = encodeURIComponent(key);
            var valueEnc = encodeURIComponent(value);
            pairs.push("".concat(keyEnc, "=").concat(valueEnc));
          }
        }

        if (pairs.length > 0) {
          url += '?' + pairs.join('&');
        }
      }

      return url;
    }
  }, {
    key: "fetchObject",
    value: function fetchObject(constructor, identifiers) {
      var url = this.getDataURL(constructor, identifiers);
      var query = this.findQuery({
        url: url,
        constructor: constructor
      });

      if (query) {
        if (query.dirty) {
          this.checkObject(query);
        }
      } else {
        query = this.addQuery({
          url: url,
          constructor: constructor,
          identifiers: identifiers
        });
        query.promise = this.updateObject(query);
      }

      return query.promise.then(function () {
        return query.result;
      });
    }
  }, {
    key: "findObjects",
    value: function findObjects(constructor, identifiers, criteria) {
      var _this3 = this;

      var url = this.getDataURL(constructor, identifiers, criteria);
      var query = this.findQuery({
        url: url,
        constructor: null
      });

      if (query) {
        if (query.dirty) {
          this.checkListing(query);
        }
      } else {
        query = this.addQuery({
          url: url,
          constructor: null,
          pageVariable: constructor.getPageVariable(),
          pageQueries: [{}]
        });
        query.promise = this.updateListing(query);
      }

      return query.promise.then(function () {
        if (!(query.result instanceof Array)) {
          throw new Error('Server did not return a list');
        }

        var promises = query.result.map(function (path) {
          var additional = path.split('/').filter(Boolean);
          var combined = [].concat(_toConsumableArray(identifiers), _toConsumableArray(additional));
          return _this3.fetchObject(constructor, combined);
        });
        return Promise.all(promises).then(function (objects) {
          if (!compareArrays(objects, query.objects)) {
            if (query.pageVariable) {
              objects.more = _this3.requestMore.bind(_this3, query);
            }

            query.objects = objects;
          }

          objects.total = query.result.total;
          objects.pages = query.result.pages;
          return query.objects;
        });
      });
    }
  }, {
    key: "requestMore",
    value: function requestMore(query) {
      if (query.result) {
        if (query.pageQueries.length < query.result.pages) {
          query.pageQueries.push({});
          this.checkListing(query);
        }
      }
    }
  }, {
    key: "findQuery",
    value: function findQuery(props) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.queries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var query = _step3.value;
          var different = false;

          for (var _i2 = 0, _Object$entries2 = Object.entries(props); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                key = _Object$entries2$_i[0],
                value = _Object$entries2$_i[1];

            if (query[key] !== value) {
              different = true;
            }
          }

          if (!different) {
            return query;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "addQuery",
    value: function addQuery(props) {
      var query = _objectSpread2({}, props, {
        promise: null,
        result: null,
        dirty: false,
        stale: null
      });

      this.queries.push(query);
      return query;
    }
  }, {
    key: "updateObject",
    value: function updateObject(query) {
      return this.fetch(query.url, {
        method: 'GET'
      }).then(function (response) {
        var etag = response.headers.get('etag');
        var mtime = response.headers.get('last-modified');
        var status = response.headers.get('x-cache-status');
        var total = response.headers.get('x-total');
        var pages = response.headers.get('x-total-pages');
        var now = new Date();

        if (status === 'STALE' || status === 'UPDATING') {
          query.stale = now;
          query.fresh = null;
        } else {
          query.stale = null;
          query.fresh = now;
        }

        query.dirty = false;
        query.error = null;
        var changed = true;

        if (etag && query.etag === etag) {
          changed = false;
        } else if (mtime && query.mtime == mtime) {
          changed = false;
        }

        if (changed) {
          return response.json().then(function (json) {
            var constructor = query.constructor,
                identifiers = query.identifiers;
            var result = constructor ? new constructor(identifiers, json) : json;
            query.result = result;
            query.etag = etag;
            query.mtime = mtime;

            if (result instanceof Array) {
              if (total) {
                result.total = parseInt(total);
              }

              if (pages) {
                result.pages = parseInt(pages);
              }
            }

            return true;
          });
        } else {
          return false;
        }
      })["catch"](function (err) {
        query.error = err;
        throw err;
      });
    }
  }, {
    key: "updateListing",
    value: function updateListing(query) {
      var promises = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = query.pageQueries.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              pageIndex = _step4$value[0],
              pageQuery = _step4$value[1];

          var promise = void 0;

          if (!pageQuery.promise) {
            pageQuery.url = addPageNumber(query.url, query.pageVariable, pageIndex + 1);
            promise = this.updateObject(pageQuery);
          } else if (pageQuery.dirty || pageQuery.error) {
            promise = this.updateObject(pageQuery);
          }

          if (promise) {
            pageQuery.promise = promise;
            promises.push(promise);
          } else {
            promises.push(false);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return Promise.all(promises).then(function (pageChanged) {
        var minStaleTime = null;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = query.pageQueries[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _pageQuery = _step5.value;

            if (_pageQuery.stale) {
              if (!minStaleTime || minStaleTime > _pageQuery.stale) {
                minStaleTime = _pageQuery.stale;
              }
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        if (minStaleTime) {
          query.stale = minStaleTime;
          query.fresh = null;
        } else {
          query.stale = null;
          query.fresh = new Date();
        }

        query.dirty = false;
        query.error = null;
        var changed = some(pageChanged);

        if (changed) {
          var items = [];
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = query.pageQueries.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _step6$value = _slicedToArray(_step6.value, 2),
                  pageIndex = _step6$value[0],
                  pageQuery = _step6$value[1];

              if (pageQuery.result) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                  for (var _iterator7 = pageQuery.result[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var item = _step7.value;

                    // check for duplication in case page boundaries shifted
                    // in the middle of retrieval
                    if (items.indexOf(item) === -1) {
                      items.push(item);
                    }
                  }
                } catch (err) {
                  _didIteratorError7 = true;
                  _iteratorError7 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                      _iterator7["return"]();
                    }
                  } finally {
                    if (_didIteratorError7) {
                      throw _iteratorError7;
                    }
                  }
                }

                if (pageChanged[pageIndex]) {
                  if (pageQuery.result.total) {
                    items.total = pageQuery.result.total;
                  }

                  if (pageQuery.result.pages) {
                    items.pages = pageQuery.result.pages;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          query.result = items;
          return true;
        } else {
          return false;
        }
      })["catch"](function (err) {
        query.error = err;
        throw err;
      });
    }
  }, {
    key: "checkObject",
    value: function checkObject(query) {
      var _this4 = this;

      if (!query.checking) {
        query.checking = true;
        this.updateObject(query).then(function (changed) {
          query.checking = false;

          if (changed) {
            _this4.triggerEvent(new DataSourceEvent('change', _this4));
          }
        })["catch"](function (err) {
          query.checking = false;
          throw err;
        });
      }
    }
  }, {
    key: "checkListing",
    value: function checkListing(query) {
      var _this5 = this;

      if (!query.checking) {
        query.checking = true;
        this.updateListing(query).then(function (changed) {
          query.checking = false;

          if (changed) {
            var objectURLs = query.result;
            var updates = [];
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = objectURLs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var objectURL = _step8.value;
                var props = {
                  url: objectURL,
                  constructor: query.constructor
                };

                var objectQuery = _this5.findQuery(props);

                if (objectQuery && objectQuery.dirty) {
                  updates.push(_this5.updateObject(objectQuery));
                }
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }

            Promise.all(updates).then(function () {
              _this5.triggerEvent(new DataSourceEvent('change', _this5));
            });
          }
        })["catch"](function (err) {
          query.checking = false;
          throw err;
        });
      }
    }
  }, {
    key: "checkFreshness",
    value: function checkFreshness() {
      var now = new Date();
      var _this$options = this.options,
          refreshDelay = _this$options.refreshDelay,
          refreshInterval = _this$options.refreshInterval;
      var invalidating = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.queries[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _query = _step9.value;

          if (_query.stale) {
            // we received stale data from Nginx
            var elapsed = now - _query.stale;

            if (elapsed > refreshDelay) {
              // a short time has passed since we received
              // stale data from Nginx; the server should have
              // brought the data up-to-date by now
              invalidating.push(_query);
            }
          } else if (_query.fresh) {
            var _elapsed = now - _query.fresh;

            if (_elapsed > refreshInterval) {
              // some time has passed since we received
              // fresh data from Nginx; check with the server in
              // case the data has changed
              invalidating.push(_query);
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      if (invalidating.length > 0) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = invalidating[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var query = _step10.value;
            query.dirty = true;
            query.stale = null;
            query.fresh = null;

            if (query.pageQueries) {
              var _iteratorNormalCompletion11 = true;
              var _didIteratorError11 = false;
              var _iteratorError11 = undefined;

              try {
                for (var _iterator11 = query.pageQueries[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  var pageQuery = _step11.value;

                  if (pageQuery.promise) {
                    pageQuery.dirty = true;
                    pageQuery.stale = null;
                    pageQuery.fresh = null;
                  }
                }
              } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                    _iterator11["return"]();
                  }
                } finally {
                  if (_didIteratorError11) {
                    throw _iteratorError11;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        this.triggerEvent(new DataSourceEvent('change', this));
      }
    }
    /**
     * Wait for active to become true then run fetch(), using custom function
     * if one is supplied
     *
     * @type {Promise<Response>}
     */

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (url, options) {
      var _this6 = this;

      if (!options) {
        options = {};
      }

      return this.waitForActivation().then(function () {
        var f = _this6.options.fetchFunc || fetch;
        return f(url, options).then(function (response) {
          if (response.status >= 400) {
            throw new DataSourceError(response.status, response.statusText);
          }

          return response;
        })["catch"](function (err) {
          // try again if the data source was deactivated in the middle of
          // an operation--we'll wait once again for active to become true
          if (!_this6.active && !err.status) {
            return _this6.fetch(url, options);
          } else {
            throw err;
          }
        });
      });
    })
  }, {
    key: "waitForActivation",
    value: function waitForActivation() {
      if (this.active) {
        return Promise.resolve();
      }

      if (!this.activationPromise) {
        var resolve;
        this.activationPromise = new Promise(function (r) {
          resolve = r;
        });
        this.activationPromise.resolve = resolve;
      }

      return this.activationPromise;
    }
  }]);

  return DataSource;
}(RelaksEventEmitter);

function compareArrays(array1, array2) {
  if (!array1 || !array2) {
    return false;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

function addPageNumber(url, pageVariable, pageNumber) {
  if (pageNumber > 1) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += pageVariable + '=' + pageNumber;
  }

  return url;
}

function some(array) {
  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = array[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var el = _step12.value;

      if (el) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
        _iterator12["return"]();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }

  return false;
}

var ExcelObject =
/*#__PURE__*/
function (_DataSourceObject) {
  _inherits(ExcelObject, _DataSourceObject);

  function ExcelObject() {
    _classCallCheck(this, ExcelObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExcelObject).apply(this, arguments));
  }

  _createClass(ExcelObject, [{
    key: "getAvailableLanguages",
    value: function getAvailableLanguages() {
      return this.languages;
    }
  }]);

  return ExcelObject;
}(DataSourceObject);

var ExcelCell =
/*#__PURE__*/
function (_ExcelObject) {
  _inherits(ExcelCell, _ExcelObject);

  function ExcelCell(identifiers, data, columnLanguages) {
    var _this;

    _classCallCheck(this, ExcelCell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelCell).call(this, identifiers, data));
    var json, resources, type;

    if (data == null) {
      json = [''];
      type = 'null';
    } else if (_typeof(data) !== 'object') {
      json = [data + ''];
      type = 'plain';
    } else if (data.richText instanceof Array) {
      json = data.richText.map(function (token) {
        var font = token.font,
            text = token.text;

        if (font) {
          var style = {};

          if (font.bold) {
            style.fontWeight = 'bold';
          }

          if (font.italic) {
            style.fontStyle = 'italic';
          }

          if (font.underline) {
            style.textDecoration = 'underline';
          }

          return {
            type: 'span',
            props: {
              style: style
            },
            children: text
          };
        } else {
          return text;
        }
      });
      type = 'rich';
    } else if (data.type === 'image' && typeof data.url === 'string') {
      var img = {
        type: 'img',
        props: {
          src: data.url,
          width: data.width,
          height: data.height
        }
      };
      json = [img];
      resources = [data];
      type = 'image';
    } else {
      var span = {
        type: 'span',
        props: {
          className: 'error',
          title: data.error
        },
        children: [data.error ? '[error]' : '[invalid data]']
      };
      json = [span];
      type = 'error';
    }

    _this.type = type;
    _this.data = data;
    _this.content = new HTMLText({
      json: json,
      resources: resources
    });
    _this.languages = columnLanguages;
    return _this;
  }

  return ExcelCell;
}(ExcelObject);

var ExcelColumn =
/*#__PURE__*/
function (_ExcelObject) {
  _inherits(ExcelColumn, _ExcelObject);

  function ExcelColumn(identifiers, data, defaultLanguages) {
    var _this;

    _classCallCheck(this, ExcelColumn);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelColumn).call(this, identifiers, data));
    _this.cells = [];

    if (data) {
      _this.name = data.name || '';
      _this.flags = data.flags || [];
      _this.languages = findLanguageCodes(_this.flags, defaultLanguages);
    }

    return _this;
  }

  _createClass(ExcelColumn, [{
    key: "getRow",
    value: function getRow(index) {
      return this.cells[index];
    }
  }]);

  return ExcelColumn;
}(ExcelObject);

var ExcelRow =
/*#__PURE__*/
function (_ExcelObject) {
  _inherits(ExcelRow, _ExcelObject);

  function ExcelRow(identifiers, data, sheetLanguageCodes) {
    var _this;

    _classCallCheck(this, ExcelRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelRow).call(this, identifiers, data));
    _this.cells = [];
    _this.languages = sheetLanguageCodes;
    return _this;
  }

  _createClass(ExcelRow, [{
    key: "getColumn",
    value: function getColumn(name) {
      var columns = this.sheet.columns;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = columns.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              column = _step$value[1];

          if (column.name === name) {
            return this.cells[index];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "getLanguageSpecific",
    value: function getLanguageSpecific(lang) {
      var row = new ExcelRow(this.identifiers);
      row.language = lang.toLowerCase();
      var chosen = chooseLanguageVersion(this.cells, row.language);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = chosen[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cell = _step2.value;
          row.cells.push(cell);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return row;
    }
  }]);

  return ExcelRow;
}(ExcelObject);

var ExcelSheet =
/*#__PURE__*/
function (_ExcelObject) {
  _inherits(ExcelSheet, _ExcelObject);

  function ExcelSheet(identifiers, data) {
    var _this;

    _classCallCheck(this, ExcelSheet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelSheet).call(this, identifiers, data));
    _this.columns = [];
    _this.rows = [];

    if (data) {
      _this.name = data.name || '';
      _this.flags = data.flags || [];
      _this.languages = [];
      var defaultLanguages = findLanguageCodes(_this.flags);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (data.columns || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var columnData = _step.value;
          var column = new ExcelColumn(identifiers, columnData, defaultLanguages);

          _this.columns.push(column);

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = column.languages[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var code = _step3.value;

              if (_this.languages.indexOf(code) === -1) {
                _this.languages.push(code);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (data.rows || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var rowData = _step2.value;
          var row = new ExcelRow(identifiers, rowData, _this.languages);

          _this.rows.push(row);

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = rowData.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _step4$value = _slicedToArray(_step4.value, 2),
                  index = _step4$value[0],
                  cellData = _step4$value[1];

              var _column = _this.columns[index];
              var cell = new ExcelCell(identifiers, cellData, _column.languages);
              row.cells.push(cell);

              _column.cells.push(cell);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    return _this;
  }

  _createClass(ExcelSheet, [{
    key: "getColumn",
    value: function getColumn(name) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.columns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var column = _step5.value;

          if (column.name === name) {
            return column;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "getRow",
    value: function getRow(index) {
      return this.rows[index];
    }
  }, {
    key: "getLanguageSpecific",
    value: function getLanguageSpecific(lang) {
      var sheet = new ExcelSheet(this.identifiers);
      sheet.name = this.name;
      sheet.flags = this.flags;
      sheet.language = lang.toLowerCase();

      for (var i = 0; i < this.rows.length; i++) {
        var row = new ExcelRow(this.identifiers);
        sheet.rows.push(row);
      }

      var chosen = chooseLanguageVersion(this.columns, sheet.language);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = chosen[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var column = _step6.value;
          sheet.columns.push(column);
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = column.cells.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _step7$value = _slicedToArray(_step7.value, 2),
                  index = _step7$value[0],
                  cell = _step7$value[1];

              var _row = sheet.rows[index];

              _row.cells.push(cell);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                _iterator7["return"]();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return sheet;
    }
  }]);

  return ExcelSheet;
}(ExcelObject);

var ExcelFile =
/*#__PURE__*/
function (_ExcelObject) {
  _inherits(ExcelFile, _ExcelObject);

  function ExcelFile(identifiers, json) {
    var _this;

    _classCallCheck(this, ExcelFile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelFile).call(this, identifiers, json));
    _this.fileId = identifiers[0];

    if (json) {
      _this.title = json.title || '';
      _this.type = json.type || '';
      _this.filename = json.filename || '';
      _this.keywords = json.keywords || [];
      _this.subject = json.subject || '';
      _this.description = json.description || '';
      _this.languages = [];
      _this.sheets = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (json.sheets || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sheetData = _step.value;
          var sheet = new ExcelSheet(identifiers, sheetData);

          _this.sheets.push(sheet);

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = sheet.languages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var code = _step2.value;

              if (_this.languages.indexOf(code) === -1) {
                _this.languages.push(code);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return _this;
  }

  _createClass(ExcelFile, [{
    key: "getSheet",
    value: function getSheet(name) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.sheets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var sheet = _step3.value;

          if (sheet.name === name) {
            return sheet;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "getLanguageSpecific",
    value: function getLanguageSpecific(lang) {
      var file = new ExcelFile(this.identifiers);
      file.title = this.title;
      file.type = this.type;
      file.filename = this.filename;
      file.keywords = this.keywords;
      file.subject = this.subject;
      file.description = this.description;
      file.language = lang.toLowerCase();
      file.sheets = [];
      var chosen = chooseLanguageVersion(this.sheets, file.language);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = chosen[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var sheet = _step4.value;
          var newSheet = sheet.getLanguageSpecific(file.language);
          file.sheets.push(newSheet);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return file;
    }
  }], [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      var _identifiers = _slicedToArray(identifiers, 1),
          fileId = _identifiers[0];

      return "excel/".concat(fileId, "/");
    }
  }]);

  return ExcelFile;
}(ExcelObject);

var Excel =
/*#__PURE__*/
function (_DataSource) {
  _inherits(Excel, _DataSource);

  function Excel() {
    _classCallCheck(this, Excel);

    return _possibleConstructorReturn(this, _getPrototypeOf(Excel).apply(this, arguments));
  }

  _createClass(Excel, [{
    key: "fetchExcelFile",
    value: function fetchExcelFile(fileId) {
      return this.fetchObject(ExcelFile, fileId);
    }
  }, {
    key: "findExcelFiles",
    value: function findExcelFiles(criteria) {
      return this.findObjects(ExcelFile, criteria);
    }
  }]);

  return Excel;
}(DataSource);

var GitlabObject =
/*#__PURE__*/
function (_DataSourceObject) {
  _inherits(GitlabObject, _DataSourceObject);

  function GitlabObject() {
    _classCallCheck(this, GitlabObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(GitlabObject).apply(this, arguments));
  }

  return GitlabObject;
}(DataSourceObject);

var GitlabWiki =
/*#__PURE__*/
function (_GitlabObject) {
  _inherits(GitlabWiki, _GitlabObject);

  function GitlabWiki(identifiers, json) {
    var _this;

    _classCallCheck(this, GitlabWiki);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GitlabWiki).call(this, identifiers, json));
    _this.repoId = identifiers[0];

    if (json) {
      _this.slug = json.slug;
      _this.title = json.title;
      _this.content = new HTMLText(json);
    }

    return _this;
  }

  _createClass(GitlabWiki, null, [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      var _identifiers = _slicedToArray(identifiers, 2),
          repoId = _identifiers[0],
          slug = _identifiers[1];

      var url = "wiki/".concat(repoId, "/");

      if (slug) {
        url += "".concat(slug, "/");
      }

      return url;
    }
  }]);

  return GitlabWiki;
}(GitlabObject);

var Gitlab =
/*#__PURE__*/
function (_DataSource) {
  _inherits(Gitlab, _DataSource);

  function Gitlab() {
    _classCallCheck(this, Gitlab);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gitlab).apply(this, arguments));
  }

  _createClass(Gitlab, [{
    key: "fetchWikiPage",
    value: function fetchWikiPage(repoId, slug) {
      return this.fetchObject(GitlabWiki, repoId, slug);
    }
  }, {
    key: "findWikiPages",
    value: function findWikiPages(repoId, criteria) {
      return this.findObjects(GitlabWiki, repoId, criteria);
    }
  }]);

  return Gitlab;
}(DataSource);

var WordpressObject =
/*#__PURE__*/
function (_DataSourceObject) {
  _inherits(WordpressObject, _DataSourceObject);

  function WordpressObject(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressObject).call(this, identifiers, json));
    _this.siteId = identifiers[0];
    return _this;
  }

  _createClass(WordpressObject, null, [{
    key: "getObjectURL",
    value: function getObjectURL(identifiers) {
      var _identifiers = _slicedToArray(identifiers, 2),
          siteId = _identifiers[0],
          objectId = _identifiers[1];

      var folder = this.getObjectFolder();
      var url = "rest/".concat(siteId, "/");

      if (folder) {
        url += "".concat(folder, "/");
      }

      if (objectId) {
        url += "".concat(objectId, "/");
      }

      return url;
    }
  }, {
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return '';
    }
  }, {
    key: "getPageVariable",
    value: function getPageVariable() {
      return '';
    }
  }]);

  return WordpressObject;
}(DataSourceObject);

var WordpressCategory =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressCategory, _WordpressObject);

  function WordpressCategory(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressCategory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressCategory).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.count = json.count;
      _this.name = new HTMLText(json.name);
      _this.description = new HTMLText(json.description);
      _this.link = json.link;
      _this.slug = json.slug;
      _this.taxonomy = json.taxonomy;
      _this.parent = json.parent;
      _this.meta = json.meta;
    }

    return _this;
  }

  _createClass(WordpressCategory, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/categories';
    }
  }]);

  return WordpressCategory;
}(WordpressObject);

var WordpressMedia =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressMedia, _WordpressObject);

  function WordpressMedia(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressMedia);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressMedia).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.date = new Date(json.date_gmt + 'Z');
      _this.modified = new Date(json.modified_gmt + 'Z');
      _this.slug = json.slug;
      _this.status = json.status;
      _this.type = json.type;
      _this.link = json.link;
      _this.mediaType = json.media_type;
      _this.mimeType = json.mime_type;
      _this.title = new HTMLText(json.title);
      _this.description = new HTMLText(json.description);
      _this.caption = new HTMLText(json.caption);
      _this.author = json.author;
      _this.altText = json.alt_text;
      _this.mediaDetails = json.media_details;
      _this.post = json.post;
      _this.sourceURL = json.source_url;
      _this.meta = json.meta;
    }

    return _this;
  }

  _createClass(WordpressMedia, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/media';
    }
  }]);

  return WordpressMedia;
}(WordpressObject);

var WordpressPage =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressPage, _WordpressObject);

  function WordpressPage(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressPage).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.date = new Date(json.date_gmt + 'Z');
      _this.modified = new Date(json.modified_gmt + 'Z');
      _this.slug = json.slug;
      _this.status = json.status;
      _this.type = json.type;
      _this.link = json.link;
      _this.title = new HTMLText(json.title);
      _this.content = new HTMLText(json.content);
      _this.excerpt = new HTMLText(json.excerpt);
      _this.author = json.author;
      _this.featuredMedia = json.featured_media;
      _this.menuOrder = json.menu_order;
      _this.parent = json.parent;
      _this.format = json.format;
      _this.meta = json.meta;
    }

    return _this;
  }

  _createClass(WordpressPage, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/pages';
    }
  }]);

  return WordpressPage;
}(WordpressObject);

var WordpressPost =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressPost, _WordpressObject);

  function WordpressPost(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressPost);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressPost).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.date = new Date(json.date_gmt + 'Z');
      _this.modified = new Date(json.modified_gmt + 'Z');
      _this.slug = json.slug;
      _this.status = json.status;
      _this.type = json.type;
      _this.link = json.link;
      _this.title = new HTMLText(json.title);
      _this.content = new HTMLText(json.content);
      _this.excerpt = new HTMLText(json.excerpt);
      _this.author = json.author;
      _this.featuredMedia = json.featured_media;
      _this.sticky = json.sticky;
      _this.format = json.format;
      _this.meta = json.meta;
      _this.categories = json.categories;
      _this.tags = json.tags;
    }

    return _this;
  }

  _createClass(WordpressPost, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/posts';
    }
  }]);

  return WordpressPost;
}(WordpressObject);

var WordpressSite =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressSite, _WordpressObject);

  function WordpressSite(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressSite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressSite).call(this, identifiers, json));

    if (json) {
      _this.url = json.url;
      _this.home = json.home;
      _this.name = new HTMLText(json.name);
      _this.description = new HTMLText(json.description);
      _this.gmtOffset = json.gmt_offset;
      _this.timezone = json.timezone_string;
    }

    return _this;
  }

  return WordpressSite;
}(WordpressObject);

var WordpressTag =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressTag, _WordpressObject);

  function WordpressTag(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressTag);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressTag).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.count = json.count;
      _this.name = new HTMLText(json.name);
      _this.description = new HTMLText(json.description);
      _this.link = json.link;
      _this.slug = json.slug;
      _this.taxonomy = json.taxonomy;
      _this.meta = json.meta;
    }

    return _this;
  }

  _createClass(WordpressTag, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/tags';
    }
  }]);

  return WordpressTag;
}(WordpressObject);

var WordpressUser =
/*#__PURE__*/
function (_WordpressObject) {
  _inherits(WordpressUser, _WordpressObject);

  function WordpressUser(identifiers, json) {
    var _this;

    _classCallCheck(this, WordpressUser);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordpressUser).call(this, identifiers, json));

    if (json) {
      _this.id = json.id;
      _this.url = json.url;
      _this.name = new HTMLText(json.name);
      _this.description = new HTMLText(json.description);
      _this.link = json.link;
      _this.slug = json.slug;
      _this.avatarURLs = json.avatar_urls;
      _this.meta = json.meta;
    }

    return _this;
  }

  _createClass(WordpressUser, null, [{
    key: "getObjectFolder",
    value: function getObjectFolder() {
      return 'wp/v2/users';
    }
  }]);

  return WordpressUser;
}(WordpressObject);

var Wordpress =
/*#__PURE__*/
function (_DataSource) {
  _inherits(Wordpress, _DataSource);

  function Wordpress() {
    _classCallCheck(this, Wordpress);

    return _possibleConstructorReturn(this, _getPrototypeOf(Wordpress).apply(this, arguments));
  }

  _createClass(Wordpress, [{
    key: "fetchWPCategory",
    value: function fetchWPCategory(siteId, categoryId) {
      return this.fetchWPObject(WordpressCategory, siteId, categoryId);
    }
  }, {
    key: "fetchWPCategories",
    value: function fetchWPCategories(siteId, categoryIds) {
      return this.fetchWPObjects(WordpressCategory, siteId, categoryIds);
    }
  }, {
    key: "fetchWPMedia",
    value: function fetchWPMedia(siteId, mediaId) {
      return this.fetchWPObject(WordpressMedia, siteId, mediaId);
    }
  }, {
    key: "fetchWPMedias",
    value: function fetchWPMedias(siteId, mediaIds) {
      return this.fetchWPObjects(WordpressMedia, siteId, mediaIds);
    }
  }, {
    key: "fetchWPPage",
    value: function fetchWPPage(siteId, pageId) {
      return this.fetchWPObject(WordpressPage, siteId, pageId);
    }
  }, {
    key: "fetchWPPages",
    value: function fetchWPPages(siteId, pageIds) {
      return this.fetchWPObjects(WordpressPage, siteId, pageIds);
    }
  }, {
    key: "fetchWPPost",
    value: function fetchWPPost(siteId, postId) {
      return this.fetchWPObject(WordpressPost, siteId, postId);
    }
  }, {
    key: "fetchWPPosts",
    value: function fetchWPPosts(siteId, postIds) {
      return this.fetchWPObjects(WordpressPost, siteId, postIds);
    }
  }, {
    key: "findWPPosts",
    value: function findWPPosts(siteId, criteria) {
      return this.findObjects(WordpressPost, [siteId], criteria);
    }
  }, {
    key: "fetchWPTag",
    value: function fetchWPTag(siteId, tagId) {
      return this.fetchWPObject(WordpressTag, siteId, tagId);
    }
  }, {
    key: "fetchWPTags",
    value: function fetchWPTags(siteId, tagIds) {
      return this.fetchWPObjects(WordpressTag, siteId, tagIds);
    }
  }, {
    key: "fetchWPUser",
    value: function fetchWPUser(siteId, userId) {
      return this.fetchWPObject(WordpressUser, siteId, userId);
    }
  }, {
    key: "fetchWPUsers",
    value: function fetchWPUsers(siteId, userIds) {
      return this.fetchWPObjects(WordpressUser, siteId, userIds);
    }
  }, {
    key: "findWPUsers",
    value: function findWPUsers(siteId, criteria) {
      return this.findObjects(WordpressUser, [siteId], criteria);
    }
  }, {
    key: "fetchWPSite",
    value: function fetchWPSite(siteId) {
      return this.fetchObject(WordpressSite, [siteId]);
    }
  }, {
    key: "findWPSites",
    value: function findWPSites() {
      return this.findObjects(WordpressSite, [], {});
    }
  }, {
    key: "fetchWPObject",
    value: function fetchWPObject(constructor, siteId, objectId) {
      if (typeof objectId === 'string') {
        var number = parseInt(objectId);

        if (!isNaN(number)) {
          objectId = number;
        } else {
          return this.fetchWPObjectBySlug(constructor, siteId, objectId);
        }
      }

      return this.fetchObject(constructor, [siteId, objectId]);
    }
  }, {
    key: "fetchWPObjects",
    value: function fetchWPObjects(constructor, siteId, objectIds) {
      var _this = this;

      var promises = objectIds.map(function (objectId) {
        return _this.fetchWPObject(constructor, siteId, objectId);
      });
      return Promise.all(promises).then(function (objects) {
        return objects;
      });
    }
  }, {
    key: "fetchWPObjectBySlug",
    value: function fetchWPObjectBySlug(constructor, siteId, slug) {
      // look for it among cached queries
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.queries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var query = _step.value;

          if (query.constructor === constructor) {
            if (query.result && query.result.slug === slug) {
              // in case the query needs to be refreshed
              return this.fetchObject(constructor, [siteId, query.result.id]);
            }
          }
        } // retrieve id from server

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.findObjects(constructor, [siteId], {
        slug: slug
      }).then(function (objects) {
        return objects[0];
      });
    }
  }]);

  return Wordpress;
}(DataSource);

var delayWhenEmpty = 50;
var delayWhenRendered = Infinity;
var seeds = [];

var errorHandler = function errorHandler(err) {
  console.error(err);
};

function get(name) {
  switch (name) {
    case 'errorHandler':
      return errorHandler;

    case 'delayWhenEmpty':
      return delayWhenEmpty;

    case 'delayWhenRendered':
      return delayWhenRendered;

    case 'seeds':
      plant(value);
      break;
  }
}

function set(name, value) {
  switch (name) {
    case 'errorHandler':
      errorHandler = value;
      break;

    case 'delayWhenEmpty':
      delayWhenEmpty = value;
      break;

    case 'delayWhenRendered':
      delayWhenRendered = value;
      break;

    case 'seeds':
      plant(value);
      break;
  }
}

function plant(list) {
  if (!(list instanceof Array)) {
    throw new Error('Seeds must be an array of object. Are you calling harvest() with the options { seeds: true }?');
  }

  seeds = list;
}

function findSeed(target) {
  var type = target.func || target.constructor;
  var props = target.props;
  var index = -1;
  var best = -1;

  for (var i = 0; i < seeds.length; i++) {
    var seed = seeds[i];

    if (seed.type === type) {
      // the props aren't going to match up exactly due to object
      // recreations; just find the one that is closest
      var count = 0;

      if (props && seed.props) {
        for (var key in props) {
          if (seed.props[key] === props[key]) {
            count++;
          }
        }
      }

      if (count > best) {
        // choose this one
        index = i;
        best = count;
      }
    }
  }

  if (index != -1) {
    var match = seeds[index];
    seeds.splice(index, 1);
    return match.result;
  }
}

function AsyncRenderingCycle(target, prev, options) {
  this.options = options;
  this.progressElement = undefined;
  this.progressAvailable = false;
  this.progressForced = false;
  this.progressPromise = undefined;
  this.transitionPromise = undefined;
  this.lastPromise = undefined;
  this.promisedElement = undefined;
  this.promisedAvailable = false;
  this.elementRendered = prev ? prev.elementRendered : null;
  this.deferredError = undefined;
  this.showingProgress = false;
  this.delayEmpty = get('delayWhenEmpty');
  this.delayRendered = get('delayWhenRendered');
  this.canceled = false;
  this.completed = false;
  this.checked = false;
  this.mounted = false;
  this.initial = true;
  this.fulfilled = false;
  this.synchronous = false;
  this.prevProps = {};
  this.prevPropsAsync = {};
  this.updateTimeout = 0;
  this.startTime = new Date();
  this.handlers = {};
  this.target = target;
  this.context = undefined;
  this.setContext = undefined;
  this.show = this.show.bind(this);
  this.check = this.check.bind(this);
  this.delay = this.delay.bind(this);
  this.resolve = this.resolve.bind(this);
  this.reject = this.reject.bind(this);
  this.hasRendered = this.hasRendered.bind(this);
  this.transition = this.transition.bind(this);

  if (prev) {
    this.prevProps = prev.target.props;

    if (prev.canceled) {
      this.prevPropsAsync = prev.prevPropsAsync;
    } else {
      this.prevPropsAsync = prev.target.props;
    }

    this.elementRendered = prev.elementRendered;
    this.initial = false;
    this.fulfilled = prev.fulfilled;
    this.mounted = prev.mounted;
  }
}

var prototype = AsyncRenderingCycle.prototype;

prototype.hasEnded = function () {
  return this.completed || this.canceled;
};

prototype.isRerendering = function () {
  if (this.hasEnded()) {
    return false;
  }

  return this.promisedAvailable || this.progressAvailable || this.deferredError;
};

prototype.run = function (f) {
  if (this.deferredError) {
    // don't bother running the function when we're going to throw anyway
    return;
  }

  this.synchronous = true;

  try {
    var promise = f();

    if (promise && typeof promise.then === 'function') {
      promise.then(this.resolve, this.reject);
    } else {
      this.resolve(promise);
    }
  } catch (err) {
    this.reject(err);
  }

  this.synchronous = false;
};

prototype.resolve = function (element) {
  this.clear();
  this.fulfilled = true;

  if (!this.hasEnded()) {
    if (!this.checked) {
      if (this.options.performCheck) {
        this.reject(new Error('Missing call to show() prior to await'));
        return;
      }
    }

    if (element === undefined) {
      // wait for the action to complete
      if (this.lastPromise && !this.lastPromise.fulfilled) {
        if (this.progressElement) {
          // draw the last progress element
          this.progressAvailable = true;
          this.progressForced = false;
          this.rerender();
        }

        var _this = this;

        this.lastPromise.then(function () {
          _this.complete();
        });
      } else {
        this.complete();
      }
    } else {
      this.finalize(element);
    }
  }
};

prototype.reject = function (err) {
  this.clear();

  if (!(err instanceof AsyncRenderingInterrupted)) {
    if (!this.hasEnded()) {
      this.deferredError = err;

      if (this.mounted) {
        this.rerender();
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }
    }
  }
};

prototype.mount = function () {
  this.mounted = true;

  if (this.initial) {
    if (this.isRerendering()) {
      this.rerender();
    }
  }
};

prototype.fulfill = function () {
  if (this.progressPromise && !this.progressPromise.fulfilled) {
    if (!this.progressElement) {
      this.progressPromise.resolve(true);
    }
  }
};

prototype.getElement = function () {
  if (this.promisedAvailable) {
    this.elementRendered = this.promisedElement;
    this.promisedElement = undefined;
    this.promisedAvailable = false;
    this.complete();
  } else if (this.progressAvailable) {
    this.elementRendered = this.progressElement;
    this.progressElement = undefined;
    this.progressAvailable = false;
    this.progress();
  }

  return this.elementRendered;
};

prototype.getError = function () {
  if (this.deferredError) {
    var error = this.deferredError;
    this.deferredError = undefined;
    this.cancel();
    return error;
  }
};

prototype.getPrevProps = function (asyncCycle) {
  return asyncCycle ? this.prevPropsAsync : this.prevProps;
};

prototype.substitute = function (element) {
  this.promisedElement = element;
  this.promisedAvailable = true; // schedule immediate rerendering so refs, callbacks are correct

  var _this = this;

  setTimeout(function () {
    _this.setContext({
      cycle: _this
    });
  }, 0);
};

prototype.on = function (name, f) {
  this.handlers[name] = f;
};

prototype.show = function (element, disposition) {
  // make sure the rendering cycle is still current
  this.check(); // save the element so it can be rendered eventually

  this.progressElement = element;

  if (this.progressPromise && !this.progressPromise.fulfilled) {
    this.progressPromise.resolve(false);
  }

  var r,
      _this = this;

  var promise = new Promise(function (resolve) {
    r = resolve;
  });
  promise.fulfilled = false;

  promise.resolve = function (value) {
    promise.fulfilled = true;
    r(value);
  };

  this.progressPromise = this.lastPromise = promise;

  if (!this.options.showProgress) {
    return false;
  }

  var delay,
      forced = false;

  if (this.showingProgress) {
    delay = 0;
  } else if (!this.fulfilled) {
    delay = this.delayEmpty;
  } else {
    delay = this.delayRendered;
  }

  if (disposition === 'always' || disposition === 'initial' && !this.elementRendered) {
    delay = 0;
    forced = true;
  }

  if (delay > 0) {
    if (delay !== Infinity) {
      // show progress after a brief delay, to allow
      // it to be bypassed by fast-resolving promises
      if (!this.updateTimeout) {
        var _this = this;

        this.updateTimeout = setTimeout(function () {
          // if the timeout is 0, then clearTimeout() was called on it
          // this function might still run on occasion afterward, due to
          // the way timeouts are scheduled
          if (_this.updateTimeout !== 0) {
            _this.update();
          }
        }, delay);
      }
    }

    return false;
  } else {
    // caller wants it to be shown immediately
    this.update(forced);
    return true;
  }
};
/**
 * Rendering the progress element now
 *
 * @param  {Boolean|undefined} forced
 */


prototype.update = function (forced) {
  this.progressAvailable = true;
  this.progressForced = forced; // force rerendering only if the component is mounted or during the
  // initial rendering cycle (React seems to be able to handle that)

  if (this.initial || this.mounted) {
    this.rerender();
  }
};

prototype.finalize = function (element) {
  if (this.progressPromise) {
    this.progressPromise.resolve(false);
  }

  this.progressElement = undefined;
  this.progressAvailable = false;
  this.promisedElement = element;
  this.promisedAvailable = true;

  if (this.initial || this.mounted) {
    this.rerender();
  }
};
/**
 * Check if the rendering cycle has been superceded by a new one. If so
 * throw an exception to end it. Ensure component is mounted as well.
 */


prototype.check = function () {
  if (!this.options.showProgress) {
    return;
  }

  if (this.synchronous) {
    this.checked = true;

    if (this.isRerendering()) {
      throw new AsyncRenderingInterrupted();
    }
  }

  if (this.canceled) {
    throw new AsyncRenderingInterrupted();
  }
};
/**
 * Set progressive rendering delay, for when the component is empty and when
 * it has been fully rendered previously
 *
 * @param  {Number} empty
 * @param  {Number} rendered
 */


prototype.delay = function (empty, rendered) {
  if (typeof empty === 'number') {
    this.delayEmpty = empty;
  }

  if (typeof rendered === 'number') {
    this.delayRendered = rendered;
  }
};
/**
 * Wait for pending show() or transition() to complete
 *
 * @return {Promise}
 */


prototype.hasRendered = function () {
  var promise = this.lastPromise;

  if (!promise) {
    throw new Error('No pending operation');
  }

  return promise;
};
/**
 * Alter the progress element immediately after it's been rendered
 *
 * @param  {Object} props
 */


prototype.transition = function (props) {
  var _this = this;

  var promise = this.hasRendered().then(function (shown) {
    if (shown) {
      var clone = _this.options.clone;
      var element = clone(_this.elementRendered, props);

      _this.show(element);

      return _this.progressPromise.then(function (shown) {
        promise.fulfilled = true;
        return shown;
      });
    } else {
      return false;
    }
  });
  promise.fulfilled = false;
  this.transitionPromise = this.lastPromise = promise;
};
/**
 * Cancel the rendering of progress and trigger cancel handler
 */


prototype.cancel = function () {
  this.clear();

  if (!this.canceled) {
    this.canceled = true;
    this.notify('cancel');
  }
};
/**
 * Mark the cycle as completed and trigger complete handler
 */


prototype.complete = function () {
  this.clear();

  if (!this.completed) {
    this.completed = true;
    this.notify('complete');
  }
};
/**
 * Indicate that progress is being shown and trigger progress handler
 */


prototype.progress = function () {
  if (!this.showingProgress) {
    if (!this.progressForced) {
      this.showingProgress = true;
    }
  }

  this.notify('progress');
};
/**
 * Cancel the any scheduled rendering of progress
 */


prototype.clear = function () {
  if (this.updateTimeout) {
    clearTimeout(this.updateTimeout);
    this.updateTimeout = 0;
  }
};
/**
 * Force rendering by recreating the context object
 */


prototype.rerender = function () {
  if (this.synchronous) {
    // no need to force renderering since we're still inside
    // the synchronous function call and we can simply return
    // the progress element
    return;
  }

  if (!this.hasEnded()) {
    if (this.context.cycle === this) {
      this.setContext({
        cycle: this
      });
    }
  }
};

prototype.notify = function (name) {
  var f = this.handlers[name];

  if (f) {
    var elapsed = new Date() - this.startTime;
    var evt = {
      type: name,
      elapsed: elapsed,
      target: this.target
    };
    f(evt);
  }
};

var currentState;

function get$1(state) {
  if (!state) {
    state = currentState;
  }

  if (!state) {
    return null;
  }

  var context = state[0];
  var cycle = context.cycle;

  if (cycle) {
    cycle.context = context;
    cycle.setContext = state[1];
  }

  return cycle;
}

function need(state) {
  var cycle = get$1(state);

  if (!cycle) {
    throw new Error('Unable to obtain state variable');
  }

  return cycle;
}

function acquire(state, target, options) {
  var cycle = get$1(state);

  if (cycle) {
    if (cycle.hasEnded()) {
      cycle = undefined;
    } else if (!cycle.isRerendering()) {
      // cancel the current cycle
      cycle.cancel();
      cycle = undefined;
    }
  }

  if (!cycle) {
    // start a new cycle
    var context = state[0];
    var prev = context.cycle;
    var cycle = new AsyncRenderingCycle(target, prev, options);
    cycle.context = context;
    cycle.setContext = state[1];
    context.cycle = cycle; // see if the contents has been seeded

    if (cycle.initial) {
      var seed = findSeed(target);

      if (seed) {
        cycle.substitute(seed);
      }
    }
  }

  currentState = state;
  return cycle;
}

function skip() {
  var cycle = get$1();
  return cycle && cycle.isRerendering();
}

function release() {
  currentState = null;
}

prototype.constructor.get = get$1;
prototype.constructor.need = need;
prototype.constructor.acquire = acquire;
prototype.constructor.release = release;
prototype.constructor.skip = skip;

function AsyncRenderingInterrupted() {
  this.message = 'Async rendering interrupted';
}

var prototype = Object.create(Error.prototype);
prototype.constructor = AsyncRenderingInterrupted;
prototype.constructor.prototype = prototype;

function use(asyncFunc) {
  // create synchronous function wrapper
  var syncFunc = function syncFunc(props, ref) {
    var state = useState({});
    var target = {
      func: syncFunc,
      props: props
    };
    var options = {
      showProgress: true,
      performCheck: true,
      clone: clone
    };
    var cycle = AsyncRenderingCycle.acquire(state, target, options); // cancel current cycle on unmount

    useEffect(function () {
      cycle.mount();
      return function () {
        if (!cycle.hasEnded()) {
          cycle.cancel();
        }
      };
    }, [cycle]); // fulfill promise at the end of rendering cycle

    useEffect(function () {
      cycle.fulfill();
    }); // call async function

    cycle.run(function () {
      return asyncFunc(props, ref);
    });
    AsyncRenderingCycle.release(); // throw error that had occurred in async code

    var error = cycle.getError();

    if (error) {
      throw error;
    } // return either the promised element or progress


    var element = cycle.getElement();
    return element;
  }; // attach async function (that returns a promise to the final result)


  syncFunc.renderAsyncEx = function (props) {
    var state = [{}, function (v) {}];
    var target = {
      func: syncFunc,
      props: props
    };
    var options = {
      performCheck: true,
      clone: clone
    };
    var cycle = AsyncRenderingCycle.acquire(state, target, options);
    var promise = asyncFunc(props);
    AsyncRenderingCycle.release();

    if (promise && typeof promise.then === 'function') {
      return promise.then(function (element) {
        if (element === undefined) {
          element = cycle.progressElement;
        }

        return element;
      });
    } else {
      return promise;
    }
  }; // add prop types if available


  if (asyncFunc.propTypes) {
    syncFunc.propTypes = asyncFunc.propTypes;
  } // add default props if available


  if (asyncFunc.defaultProps) {
    syncFunc.defaultProps = asyncFunc.defaultProps;
  } // set display name


  syncFunc.displayName = asyncFunc.displayName || asyncFunc.name;
  return syncFunc;
}

function memo(asyncFunc, areEqual) {
  var syncFunc = use(asyncFunc);
  return React.memo(syncFunc, areEqual);
}

function forwardRef(asyncFunc, areEqual) {
  var syncFunc = use(asyncFunc);
  return React.memo(React.forwardRef(syncFunc), areEqual);
}

function clone(element, props) {
  if (React.isValidElement(props)) {
    return props;
  } else if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  } else {
    return null;
  }
}

function useProgress(delayEmpty, delayRendered) {
  // set delays
  var cycle = AsyncRenderingCycle.need();
  cycle.delay(delayEmpty, delayRendered, true); // return functions (bound in constructor)

  return [cycle.show, cycle.check, cycle.delay];
}

function useProgressTransition() {
  var cycle = AsyncRenderingCycle.need();
  return [cycle.transition, cycle.hasRendered];
}

function useRenderEvent(name, f) {
  if (!AsyncRenderingCycle.skip()) {
    var cycle = AsyncRenderingCycle.need();
    cycle.on(name, f);
  }
}

function useEventTime() {
  var state = useState();
  var date = state[0];
  var setDate = state[1];
  var callback = useCallback(function (evt) {
    setDate(new Date());
  });
  useDebugValue(date);
  return [date, callback];
}

function useListener(f) {
  var ref = useRef({});

  if (!AsyncRenderingCycle.skip()) {
    ref.current.f = f;
  }

  useDebugValue(f);
  return useCallback(function () {
    return ref.current.f.apply(null, arguments);
  }, []);
}

function useAsyncEffect(f, deps) {
  useEffect(function () {
    var cleanup;
    var unmounted = false;
    var promise = f();
    Promise.resolve(promise).then(function (ret) {
      cleanup = ret;

      if (unmounted) {
        cleanup();
      }
    });
    return function () {
      unmounted = true;

      if (cleanup) {
        cleanup();
      }
    };
  }, deps);
  useDebugValue(f);
}

function useErrorCatcher(rethrow) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  if (rethrow && error) {
    throw error;
  }

  var run = useCallback(function (f) {
    try {
      var promise = f();

      if (promise && promise["catch"] instanceof Function) {
        promise = promise.then(function (result) {
          setError(undefined);
          return result;
        })["catch"](function (err) {
          setError(err);
        });
      } else {
        setError(undefined);
      }

      return promise;
    } catch (err) {
      setError(err);
    }
  });
  var clear = useCallback(function (f) {
    setError(undefined);
  });
  useDebugValue(error);
  return [error, run, clear];
}

function useComputed(f, deps) {
  var pair = useState({});
  var state = pair[0];
  var setState = pair[1];

  if (deps instanceof Array) {
    deps = deps.concat(state);
  } else {
    deps = [state];
  }

  var value = useMemo(function () {
    return state.current = f(state.current);
  }, deps);
  var recalc = useCallback(function () {
    setState({
      value: state.value
    });
  }, []);
  useDebugValue(value);
  return [value, recalc];
}

function useLastAcceptable(value, acceptable) {
  var ref = useRef();

  if (typeof acceptable === 'function') {
    acceptable = acceptable(value);
  }

  if (acceptable) {
    ref.current = value;
  }

  useDebugValue(ref.current);
  return ref.current;
}

function AsyncComponent(props) {
  PureComponent.call(this, props);

  var _this = this;

  var state = [{}, function (context) {
    state[0] = context;

    _this.forceUpdate();
  }];
  this.relaks = state;
}

var prototype$1 = Object.create(PureComponent.prototype);
prototype$1.constructor = AsyncComponent;
prototype$1.constructor.prototype = prototype$1;
/**
 * Render component, calling renderAsync() if necessary
 *
 * @return {ReactElement|null}
 */

prototype$1.render = function () {
  var options = {
    showProgress: true,
    clone: clone$1
  };
  var cycle = AsyncRenderingCycle.acquire(this.relaks, this, options);

  if (!cycle.isRerendering()) {
    // call async function
    var _this = this;

    cycle.run(function () {
      return _this.renderAsync(cycle);
    });
  }

  AsyncRenderingCycle.release();
  cycle.mounted = true; // throw error that had occurred in async code

  var error = cycle.getError();

  if (error) {
    if (parseInt(React.version) >= 16) {
      throw error;
    } else {
      var errorHandler = get('errorHandler');

      if (errorHandler instanceof Function) {
        errorHandler(error);
      }
    }
  } // return either the promised element or progress


  var element = cycle.getElement();
  return element;
};

prototype$1.renderAsyncEx = function () {
  var options = {
    clone: clone$1
  };
  var cycle = AsyncRenderingCycle.acquire(this.relaks, this, options);
  var promise = this.renderAsync(cycle);
  AsyncRenderingCycle.release();

  if (promise && typeof promise.then === 'function') {
    return promise.then(function (element) {
      if (element === undefined) {
        element = cycle.progressElement;
      }

      return element;
    });
  } else {
    return promise;
  }
};
/**
 * Cancel any outstanding asynchronous rendering cycle on unmount.
 */


prototype$1.componentWillUnmount = function () {
  var cycle = AsyncRenderingCycle.get(this.relaks);

  if (!cycle.hasEnded()) {
    cycle.cancel();
  }
};

function clone$1(element, props) {
  if (React.isValidElement(props)) {
    return props;
  } else if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  } else {
    return null;
  }
}

function AsyncSaveBuffer() {
  this.ready = false;
  this.original = undefined;
  this.current = undefined;
  this.changed = false;
  this.params = undefined;
  this.setContext = undefined;
}

var prototype$2 = AsyncSaveBuffer.prototype;

prototype$2.base = function (theirs) {
  if (theirs == null) {
    return;
  }

  if (!this.ready) {
    var ours;
    var preserved = this.restore(theirs);

    if (preserved !== undefined) {
      ours = preserved;
    } else {
      ours = this.prefill(theirs);
    }

    if (ours !== undefined && !this.compare(ours, theirs)) {
      this.current = ours;
      this.changed = true;
    } else {
      if (process.env.NODE_ENV !== 'production') {
        // invoke compare() now so that syntax error would
        // throw immediately
        this.compare(theirs, theirs);
      }

      this.current = theirs;
    }

    this.ready = true;
  } else {
    var base = this.original;
    var ours = this.current;

    if (!this.compare(base, theirs)) {
      if (this.changed) {
        var merged = this.merge(base, ours, theirs);

        if (!this.compare(merged, theirs)) {
          this.current = merged;
          this.preserve(theirs, ours);
        } else {
          this.current = theirs;
          this.changed = false;
          this.preserve(base, null);
        }
      } else {
        this.current = theirs;
      }
    }
  }

  this.original = theirs;
};

prototype$2.update = function (ours) {
  var base = this.check();
  ours = this.transform(ours);

  if (this.changed && this.compare(this.current, ours)) {
    return;
  }

  if (this.compare(base, ours)) {
    this.current = ours = base;
    this.changed = false;
  } else {
    this.current = ours;
    this.changed = true;
  }

  this.preserve(base, ours);
  this.rerender();
};

prototype$2.set = prototype$2.update;

prototype$2.assign = function (values
/* ... */
) {
  var newObject = Object.assign({}, this.current);

  for (var i = 0; i < arguments.length; i++) {
    Object.assign(newObject, arguments[i]);
  }

  this.update(newObject);
};

prototype$2.reset = function () {
  var base = this.check();

  if (this.changed) {
    this.current = base;
    this.changed = false;
    this.preserve(base, null);
    this.rerender();
  }
};

prototype$2.compare = function (ours, theirs) {
  var compareFunc = this.params.compare || compareDef;
  return compareFunc(ours, theirs);
};

prototype$2.merge = function (base, ours, theirs) {
  var mergeFunc = this.params.merge || mergeDef;
  return mergeFunc(base, ours, theirs);
};

prototype$2.preserve = function (base, ours) {
  var preserveFunc = this.params.preserve || preserveDef;
  preserveFunc(base, ours);
};

prototype$2.restore = function (theirs) {
  var restoreFunc = this.params.restore || restoreDef;
  return restoreFunc(theirs);
};

prototype$2.prefill = function (theirs) {
  var prefillFunc = this.params.prefill || prefillDef;
  return prefillFunc(theirs);
};

prototype$2.transform = function (ours) {
  var transformFunc = this.params.transform || transformDef;
  return transformFunc(ours);
};

prototype$2.rerender = function () {
  if (this.setContext) {
    this.setContext({
      buffer: this
    });
  }
};

prototype$2.check = function () {
  if (!this.ready) {
    throw new Error('Original value has not been set');
  }

  return this.original;
};

prototype$2.use = function (params) {
  this.params = params;
  this.base(params.original);

  if (params.reset && this.ready && this.changed) {
    var base = this.original;
    this.current = base;
    this.changed = false;
    this.preserve(base, null);
  }
};

function acquire$1(state, params, bufferClass) {
  if (!bufferClass) {
    bufferClass = AsyncSaveBuffer;
  }

  var context = state[0];
  var buffer = context.buffer;

  if (!buffer) {
    buffer = context.buffer = new bufferClass();
    buffer.setContext = state[1];
  }

  if (params) {
    buffer.use(params);
  }

  return buffer;
}

function compareDef(ours, theirs) {
  return ours === theirs;
}

function mergeDef(base, ours, theirs) {
  return theirs;
}

function preserveDef(base, ours) {}

function restoreDef(base) {}

function prefillDef(base) {}

function transformDef(ours) {
  return ours;
}

prototype$2.constructor.acquire = acquire$1;

function useSaveBuffer(params, customClass) {
  if (AsyncRenderingCycle.skip()) {
    // don't initialize when called during rerendering
    params = null;
  } else if (!params) {
    params = {};
  }

  var state = useState({});
  var buffer = acquire$1(state, params, customClass);
  useEffect(function () {
    return function () {
      buffer.setContext = null;
    };
  }, []);
  useDebugValue(buffer.current);
  return buffer;
}

function useAutoSave(saveBuffer, wait, f) {
  var ref = useRef({});

  if (!AsyncRenderingCycle.skip()) {
    ref.current.f = f;
  }

  useEffect(function () {
    if (saveBuffer.changed && typeof wait === 'number') {
      var timeout = setTimeout(function () {
        if (timeout && saveBuffer.changed) {
          if (ref.current.saved !== saveBuffer.current) {
            ref.current.f();
          }
        }
      }, wait);
      return function () {
        clearTimeout(timeout);
        timeout = 0;
      };
    }
  }, [saveBuffer.current]);
  useEffect(function () {
    return function () {
      if (saveBuffer.changed) {
        ref.current.f();
      }
    };
  }, []);
  var save = useCallback(function () {
    ref.current.saved = saveBuffer.current;
    ref.current.f();
  });
  useDebugValue(wait);
  return save;
}

function get$2(target, key) {
  var f = target.methods[key] || target.handlers[key];

  if (!f) {
    var r,
        promise = new Promise(function (resolve) {
      r = resolve;
    });
    promise.resolve = r;
    target.promises[key] = promise;
    target.statuses[key] = false;
    target.handlers[key] = f = handle.bind(target, key);
  }

  return f;
}

function set$1(target, key, value) {
  throw new Error('Cannot modify properties of proxy object');
}

function handle(key, evt) {
  if (this.statuses[key] !== true) {
    var f = this.filters[key];

    if (!f || f(evt)) {
      var promise = this.promises[key];

      if (evt && typeof evt.persist === 'function') {
        evt.persist();
      }

      this.statuses[key] = true;
      promise.resolve(evt);
    }
  }
}

function one(key) {
  return this.promises[key];
}

function all() {
  var keys = [];

  for (var key in this.promises) {
    keys.push(key);
  }

  return some$1.call(this, keys);
}

function some$1(keys) {
  var list = [];

  for (var i = 0; i < keys.length; i++) {
    list.push(this.promises[keys[i]]);
  }

  return Promise.all(list).then(function (values) {
    var hash = {};

    for (var i = 0; i < keys.length; i++) {
      hash[keys[i]] = values[i];
    }

    return hash;
  });
}

function match(re) {
  var keys = [];

  for (var key in this.promises) {
    if (re.test(key)) {
      keys.push(key);
    }
  }

  return some$1.call(this, keys);
}

function race() {
  var list = [];

  for (var key in this.promises) {
    list.push(this.promises[key]);
  }

  return Promise.race(list);
}

function filter(key, f) {
  this.filters[key] = f;
}

function list() {
  var list = [];

  for (var key in this.promises) {
    list.push(key);
  }

  return list;
}

function isFulfilled(key) {
  return this.statuses[key] === true;
}

function isPending(key) {
  return this.statuses[key] === false;
}

var traps = {
  get: get$2,
  set: set$1
};
var methods = {
  one: one,
  all: all,
  some: some$1,
  match: match,
  race: race,
  filter: filter,
  list: list,
  isFulfilled: isFulfilled,
  isPending: isPending
};

function AsyncEventProxy() {
  var target = {
    methods: {},
    handlers: {},
    promises: {},
    statuses: {},
    filters: {}
  };

  for (var name in methods) {
    target.methods[name] = methods[name].bind(target);
  }

  this.__proto__ = new Proxy(target, traps);
}

function useEventProxy(deps) {
  var proxy = useMemo(function () {
    return new AsyncEventProxy();
  }, deps);
  useDebugValue(proxy, formatDebugValue);
  return proxy;
}

function formatDebugValue(proxy) {
  var keys = proxy.list();
  var fired = [];

  for (var i = 0; i < keys.length; i++) {
    if (proxy.isFulfilled(keys[i])) {
      fired.push(keys[i]);
    }
  }

  return fired.join(' ');
}

function useStickySelection(inputRefs) {
  if (!(inputRefs instanceof Array)) {
    inputRefs = [inputRefs];
  }

  var inputs = inputRefs.map(function (inputRef) {
    var node = inputRef.current;

    if (node) {
      return {
        node: node,
        value: node.value,
        start: node.selectionStart,
        end: node.selectionEnd
      };
    }
  });
  useEffect(function () {
    inputs.forEach(function (input) {
      if (input) {
        var node = input.node;
        var previous = input.value;
        var current = node.value;

        if (previous !== current) {
          var start = findNewPosition(input.start, previous, current);
          var end = findNewPosition(input.end, previous, current);

          if (typeof start === 'number' && typeof end === 'number') {
            node.selectionStart = start;
            node.selectionEnd = end;
          }
        }
      }
    });
  });
}

function findNewPosition(index, previous, current) {
  if (typeof index === 'number') {
    if (typeof previous === 'string' && typeof current === 'string') {
      var before = previous.substr(0, index);
      var index1 = current.indexOf(before);

      if (index1 !== -1) {
        return index1 + before.length;
      }

      var after = previous.substr(index);
      var index2 = current.lastIndexOf(after);

      if (index2 !== -1) {
        return index2;
      }
    }
  }
}

var index = {
  get: get,
  set: set,
  plant: plant,
  use: use,
  memo: memo,
  forwardRef: forwardRef
};

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var ReactMemo = Symbol["for"]('react.memo');
var ReactProvider = Symbol["for"]('react.provider');
var ReactContext = Symbol["for"]('react.context');
var harvestFlag = false;
/**
 * Harvest HTML and text nodes
 *
 * @param  {ReactElement} node
 * @param  {Object|undefined} options
 *
 * @return {Promise<ReactElement>}
 */

function harvest(node, options) {
  // see if we're collecting seeds
  var bucket = options && options.seeds ? [] : null;
  var harvested;

  try {
    harvestFlag = true;
    harvested = harvestNode(node, [], bucket);

    if (!isPromise(harvested)) {
      // always return a promise
      harvested = Promise.resolve(harvested);
    }
  } catch (err) {
    harvested = Promise.reject(err);
  }

  return harvested.then(function (result) {
    harvestFlag = false;
    return bucket ? bucket : result;
  })["catch"](function (err) {
    harvestFlag = false;
    throw err;
  });
}
/**
 * Return true when we're in the middle harvesting node
 *
 * @return {Boolean}
 */


function harvesting() {
  return harvestFlag;
}
/**
 * Harvest HTML and text nodes
 *
 * @param  {ReactElement} node
 * @param  {Array} contexts
 * @param  {undefined|Array}
 *
 * @return {ReactElement|Array|null|Promise<ReactElement|null>}
 */


function harvestNode(node, contexts, bucket) {
  if (!(node instanceof Object)) {
    return !bucket ? node : null;
  }

  var type = getNodeType(node);

  if (!type) {
    return null;
  }

  if (type instanceof Function) {
    // it's a component
    var props = getNodeProps(node, type);
    var rendered = renderComponent(type, props, contexts);

    if (isPromise(rendered)) {
      // wait for asynchronous rendering to finish
      return rendered.then(function (rendered) {
        if (bucket) {
          bucket.push({
            type: type,
            props: props,
            result: rendered
          });
        }

        return harvestNode(rendered, contexts, bucket);
      });
    } else {
      // harvest what was rendered
      return harvestNodes(rendered, contexts, bucket);
    }
  } else if (type === ReactProvider) {
    // context provider
    var _props = getNodeProps(node, type);

    var contextType = getNodeContextType(node);
    var children = getNodeChildren(node);
    contexts = contexts.slice();
    contexts.push({
      type: contextType,
      value: _props.value
    });
    return harvestNodes(children, contexts, bucket);
  } else if (type === ReactContext) {
    var func = getNodeChildren(node);

    if (func instanceof Function) {
      var _contextType = getNodeContextType(node);

      var context = getContext(contexts, _contextType);

      var _children = func(context);

      return harvestNodes(_children, contexts, bucket);
    } else {
      return null;
    }
  } else {
    // harvest HTML+text nodes from children
    var _children2 = getNodeChildren(node);

    var newChildren = harvestNodes(_children2, contexts, bucket);

    if (newChildren === _children2) {
      // no change
      return !bucket ? node : null;
    }

    if (isPromise(newChildren)) {
      // wait for asynchrounous rendering of children
      return newChildren.then(function (newChildren) {
        return !bucket ? replaceChildren(node, newChildren) : null;
      });
    } else {
      // return new node with new children immediately
      return !bucket ? replaceChildren(node, newChildren) : null;
    }
  }
}
/**
 * Harvest HTML and text nodes from an array
 *
 * @param  {Array<ReactElement>} node
 * @param  {Object} contexts
 * @param  {undefined|Array} bucket
 *
 * @return {Array|Promise<Array>}
 */


function harvestNodes(nodes, contexts, bucket) {
  if (!(nodes instanceof Array)) {
    return harvestNode(nodes, contexts, bucket);
  }

  var changed = false;
  var asyncRenderingRequired = false;
  var newNodes = nodes.map(function (element) {
    var harvested;

    if (element instanceof Array) {
      harvested = harvestNodes(element, contexts, bucket);
    } else {
      harvested = harvestNode(element, contexts, bucket);
    }

    if (isPromise(harvested)) {
      asyncRenderingRequired = true;
    }

    if (harvested !== element) {
      changed = true;
    }

    return harvested;
  });

  if (asyncRenderingRequired) {
    // wait for promises to resolve
    return Promise.all(newNodes);
  } else {
    // return original list if nothing has changed
    return changed ? newNodes : nodes;
  }
}
/**
 * Render a component
 *
 * @param  {Function} type
 * @param  {Object} props
 * @param  {Array<Object>} contexts
 *
 * @return {ReactElement|Promise<ReactElement>}
 */


function renderComponent(type, props, contexts) {
  if (type.prototype && type.prototype.render instanceof Function) {
    // class based component
    return renderClassComponent(type, props, contexts);
  } else {
    // hook-based component
    return renderHookComponent(type, props, contexts);
  }
}
/**
 * Create an instance of a class component and call its render method
 *
 * @param  {Function} componentClass
 * @param  {Object} props
 * @param  {Object} contexts
 *
 * @return {ReactElement|Promise<ReactElement>}
 */


function renderClassComponent(cls, props, contexts) {
  var component = new cls(props);
  component.props = props;
  component.context = getContext(contexts, cls.contextType);

  if (cls.getDerivedStateFromProps) {
    var originalState = component.state;
    var derivedState = cls.getDerivedStateFromProps(props, originalState);
    component.state = _objectSpread2$1({}, originalState, {}, derivedState);
  } else if (component.componentWillMount) {
    component.updater = ReactUpdater;
    component.componentWillMount();
  } else if (component.UNSAFE_componentWillMount) {
    component.updater = ReactUpdater;
    component.UNSAFE_componentWillMount();
  }

  var rendered;

  if (isAsyncComponent(component)) {
    rendered = component.renderAsyncEx();
  } else {
    rendered = component.render();
  }

  return rendered;
}
/**
 * Render a functional component
 *
 * @param  {Function} func
 * @param  {Object} props
 * @param  {Array<Object>} contexts
 *
 * @return {ReactElement|Promise<ReactElement>}
 */


function renderHookComponent(func, props, contexts) {
  var rendered;
  var ReactCurrentDispatcher = getDispatcherRef();

  if (ReactCurrentDispatcher) {
    var prevDispatcher = ReactCurrentDispatcher.current;

    try {
      ReactCurrentDispatcher.current = {
        useState: function useState(initial) {
          var set = function set(v) {};

          return [initial, set];
        },
        useEffect: function useEffect(f) {},
        useContext: function useContext(type) {
          return getContext(contexts, type);
        },
        useReducer: function useReducer(reducer, initial, f) {
          if (f) {
            return f(initial);
          } else {
            return initial;
          }
        },
        useCallback: function useCallback(f) {
          return f;
        },
        useMemo: function useMemo(f) {
          return f();
        },
        useRef: function useRef(initial) {
          var set = function set(v) {
            set.current = v;
          };

          set.current = initial;
          return set;
        },
        useImperativeHandle: function useImperativeHandle() {},
        useLayoutEffect: function useLayoutEffect(f) {},
        useDebugValue: function useDebugValue() {}
      };

      if (func.renderAsyncEx) {
        rendered = func.renderAsyncEx(props);
      } else {
        var context = getContext(contexts, func.contextType);
        rendered = func(props, context);
      }
    } finally {
      ReactCurrentDispatcher.current = prevDispatcher;
    }
  } else {
    var _context = getContext(contexts, func.contextType);

    rendered = func(props, _context);
  }

  return rendered;
}

var dispatcherRef;
/**
 * Look for React internal state 'ReactCurrentDispatcher'
 *
 * @return {Object}
 */

function getDispatcherRef() {
  if (dispatcherRef === undefined) {
    dispatcherRef = null;

    for (var name in React) {
      var value = React[name];

      if (value instanceof Object) {
        if (value.ReactCurrentDispatcher) {
          dispatcherRef = value.ReactCurrentDispatcher;
          break;
        }
      }
    }
  }

  return dispatcherRef;
}
/**
 * Return a new node if children are different
 *
 * @param  {ReactElement} node
 * @param  {Array} newChildren
 *
 * @return {ReactElement}
 */


function replaceChildren(node, newChildren) {
  if (process.env.NODE_ENV !== 'production') {
    // prevent warning about missing keys
    newChildren = React.Children.toArray(newChildren);
  }

  return React.cloneElement(node, undefined, newChildren);
}
/**
 * Return a node's type
 *
 * @param  {ReactElement} node
 *
 * @return {String|Function}
 */


function getNodeType(node) {
  var type = node.type;

  if (type instanceof Object) {
    if (type.$$typeof === ReactMemo) {
      type = type.type;
    } else if (type.$$typeof === ReactProvider) {
      type = ReactProvider;
    } else if (type.$$typeof === ReactContext) {
      type = ReactContext;
    }
  }

  return type;
}
/**
 * Return a node's context type
 *
 * @param  {ReactElement} node
 *
 * @return {Object}
 */


function getNodeContextType(node) {
  var type = node.type;

  if (type instanceof Object) {
    return type._context;
  }
}
/**
 * Look for a context
 *
 * @param  {Array<Object>} contexts
 * @param  {Object} contextType
 *
 * @return {*}
 */


function getContext(contexts, contextType) {
  if (contextType) {
    for (var i = contexts.length - 1; i >= 0; i--) {
      var context = contexts[i];

      if (context.type === contextType) {
        return context.value;
      }
    }

    return contextType._currentValue;
  }
}
/**
 * Return the props of a node
 *
 * @param  {ReactElement} node
 * @param  {Function} type
 *
 * @return {Object}
 */


function getNodeProps(node, type) {
  var props = _objectSpread2$1({}, node.props);

  Object.defineProperty(props, 'children', {
    value: node.props.children
  }); // apply default props

  for (var name in type.defaultProps) {
    if (props[name] === undefined) {
      props[name] = type.defaultProps[name];
    }
  }

  return props;
}
/**
 * Return the children of a node
 *
 * @param  {ReactElement} node
 *
 * @return {*}
 */


function getNodeChildren(node) {
  if (node.props) {
    return node.props.children;
  }
}
/**
 * Return true if the given component is an AsyncComponent
 *
 * @param  {Object}  component
 *
 * @return {Boolean}
 */


function isAsyncComponent(component) {
  return component.relaks && component.renderAsync instanceof Function;
}
/**
 * Return true if given value hold a promise
 *
 * @param  {*}  value
 *
 * @return {Boolean}
 */


function isPromise(value) {
  return value instanceof Object && value.then instanceof Function;
}

var ReactUpdater = {
  enqueueCallback: function enqueueCallback(inst, f) {
    f();
  },
  enqueueForceUpdate: function enqueueForceUpdate(inst) {},
  enqueueReplaceState: function enqueueReplaceState(inst, state) {
    inst.state = _objectSpread2$1({}, inst, {}, state);
  },
  enqueueSetState: function enqueueSetState(inst, partialState) {
    inst.state = _objectSpread2$1({}, inst.state, {}, partialState);
  },
  isMounted: function isMounted() {
    return true;
  }
};

function _typeof$2(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$2 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$2(obj);
}

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  return Constructor;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

function isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct$1(Parent, args, Class) {
  if (isNativeReflectConstruct$1()) {
    _construct$1 = Reflect.construct;
  } else {
    _construct$1 = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf$1(instance, Class.prototype);
      return instance;
    };
  }

  return _construct$1.apply(null, arguments);
}

function _isNativeFunction$1(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper$1(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper$1 = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction$1(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct$1(Class, arguments, _getPrototypeOf$1(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf$1(Wrapper, Class);
  };

  return _wrapNativeSuper$1(Class);
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var RelaksRouteManagerEvent =
/*#__PURE__*/
function (_GenericEvent) {
  _inherits$1(RelaksRouteManagerEvent, _GenericEvent);

  function RelaksRouteManagerEvent() {
    _classCallCheck$2(this, RelaksRouteManagerEvent);

    return _possibleConstructorReturn$1(this, _getPrototypeOf$1(RelaksRouteManagerEvent).apply(this, arguments));
  }

  return RelaksRouteManagerEvent;
}(RelaksGenericEvent);

var RelaksRouteManagerError =
/*#__PURE__*/
function (_Error) {
  _inherits$1(RelaksRouteManagerError, _Error);

  function RelaksRouteManagerError(status, message) {
    var _this;

    _classCallCheck$2(this, RelaksRouteManagerError);

    _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(RelaksRouteManagerError).call(this, message));
    _this.status = status;
    return _this;
  }

  return RelaksRouteManagerError;
}(_wrapNativeSuper$1(Error));

var SSR = (typeof window === "undefined" ? "undefined" : _typeof$2(window)) !== 'object';
var defaultOptions$1 = {
  useHashFallback: false,
  trackLinks: SSR ? false : true,
  trackLocation: SSR ? false : true,
  preloadingDelay: NaN,
  reloadFaultyScript: false,
  basePath: ''
};

var RelaksRouteManager =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits$1(RelaksRouteManager, _EventEmitter);

  function RelaksRouteManager(options) {
    var _this;

    _classCallCheck$2(this, RelaksRouteManager);

    _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(RelaksRouteManager).call(this));
    _this.active = false;
    _this.preloaded = false;
    _this.options = {};
    _this.routes = {};
    _this.rewrites = []; // properties of the current route

    _this.name = '';
    _this.params = '';
    _this.context = {};
    _this.route = null; // properties of the current URL

    _this.url = '';
    _this.path = '';
    _this.query = {};
    _this.search = '';
    _this.hash = '';
    _this.history = [];
    _this.startTime = getTimeStamp();
    _this.queue = [];

    for (var name in defaultOptions$1) {
      if (options && options[name] !== undefined) {
        _this.options[name] = options[name];
      } else {
        _this.options[name] = defaultOptions$1[name];
      }
    }

    if (options) {
      var base = options.basePath || '';

      if (base.charAt(base.length - 1) === '/') {
        base = base.substr(0, base.length - 1);
      }

      if (base) {
        var basePathRewrite = {
          from: function from(urlParts, context) {
            var path = urlParts.path;

            if (path.substr(0, base.length) === base) {
              if (path.charAt(base.length) === '/') {
                urlParts.path = path.substr(base.length);
              }
            }
          },
          to: function to(urlParts, context) {
            var path = urlParts.path;
            urlParts.path = base + path;
          }
        };

        _this.addRewrites([basePathRewrite]);
      }

      if (options.routes) {
        _this.addRoutes(options.routes);
      }

      if (options.rewrites) {
        _this.addRewrites(options.rewrites);
      }
    }

    _this.handleLinkClick = _this.handleLinkClick.bind(_assertThisInitialized$1(_this));
    _this.handlePopState = _this.handlePopState.bind(_assertThisInitialized$1(_this));
    return _this;
  }
  /**
   * Activate the component
   */


  _createClass$2(RelaksRouteManager, [{
    key: "activate",
    value: function activate() {
      var _this2 = this;

      if (!this.active) {
        if (this.options.trackLinks) {
          window.addEventListener('click', this.handleLinkClick);
        }

        if (this.options.trackLocation) {
          window.addEventListener('popstate', this.handlePopState);
        }

        this.active = true;

        if (!this.preloaded) {
          var delay = this.options.preloadingDelay;

          if (delay) {
            setTimeout(function () {
              if (_this2.active && !_this2.preloaded) {
                _this2.preload();

                _this2.preloaded = true;
              }
            }, delay);
          }
        }
      }
    }
    /**
     * Deactivate the component
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.active) {
        if (this.options.trackLinks) {
          window.removeEventListener('click', this.handleLinkClick);
        }

        if (this.options.trackLocation) {
          window.removeEventListener('popstate', this.handlePopState);
        }

        this.active = false;
      }
    }
    /**
     * Load the initial route
     *
     * @param  {String|undefined} url
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "start",
    value: function start(url) {
      if (!url) {
        if (this.options.trackLocation) {
          url = this.getLocationURL(window.location);
        }
      } // wait for a change event or the promise returned by change()
      // need to wait for the second promise because change() could
      // fail in which case no event would be triggered


      var _handler;

      var eventPromise = new Promise(function (resolve, reject) {
        _handler = function handler(evt) {
          this.removeEventListener('change', _handler);
          resolve(true);
        };
      });
      this.addEventListener('change', _handler);
      var methodPromise = this.change(url, {
        replace: true
      });
      return Promise.race([methodPromise, eventPromise]);
    }
    /**
     * Add routes
     *
     * @param  {Object<Object>} routes
     */

  }, {
    key: "addRoutes",
    value: function addRoutes(routes) {
      for (var name in routes) {
        if (routes[name] !== this.routes[name]) {
          if (process.env.NODE_ENV !== 'production') {
            if (this.routes[name]) {
              console.warn('Overwriting existing route: ', this.routes[name]);
            }
          }

          this.routes[name] = routes[name];
        }
      }
    }
    /**
     * Remove routes
     *
     * @param  {Object<Object>} routes
     */

  }, {
    key: "removeRoutes",
    value: function removeRoutes(routes) {
      for (var name in routes) {
        if (routes[name] === this.routes[name]) {
          delete this.routes[name];
        }
      }
    }
    /**
     * Add rewrite rules
     *
     * @param  {Array<Object>} rewrites
     */

  }, {
    key: "addRewrites",
    value: function addRewrites(rewrites) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = rewrites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rewrite = _step.value;
          this.rewrites.push(rewrite);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Add remove rules
     *
     * @param  {Array<Object>} rewrites
     */

  }, {
    key: "removeRewrites",
    value: function removeRewrites(rewrites) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = rewrites[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var rewrite = _step2.value;
          var index = this.rewrites.indexOf(rewrite);

          if (index !== -1) {
            this.rewrites.splice(index, 1);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    /**
     * Change the route to what the given URL points to
     *
     * @param  {String|HTMLAnchorElement|Location} url
     * @param  {Object|undefined} options
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "change",
    value: function change(url, options) {
      try {
        if (url instanceof Object) {
          url = this.getLocationURL(url);
        }

        var match = this.match(url);
        var replace = options ? options.replace || false : false;
        var time = getTimeStamp();
        return this.apply(match, time, true, replace);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    /**
     * Change the route to the one given, adding to history
     *
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object|undefined} newContext
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "push",
    value: function push(name, params, newContext) {
      try {
        var match = this.generate(name, params, newContext);
        var time = getTimeStamp();
        return this.apply(match, time, true, false);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    /**
     * Replace the current route with the one given
     *
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object|undefined} newContext
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "replace",
    value: function replace(name, params, newContext) {
      try {
        var match = this.generate(name, params, newContext);
        var time = getTimeStamp();
        return this.apply(match, time, true, true);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    /**
     * Switch to a route without adding an entry to the history
     *
     * @param  {String} name
     * @param  {Object} params
     * @param  {Boolean} keepURL
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "substitute",
    value: function substitute(name, params, keepURL) {
      var _this3 = this;

      if (process.env.NODE_ENV !== 'production') {
        if (this.insideBeforeChangeHandler) {
          console.warn('Calling substitute() inside a beforechange handler. Perhaps you mean to call evt.substitute()?');
        }
      }

      var match = this.generate(name, params);
      var entry = this.history[this.history.length - 1];
      var time = entry ? entry.time : getTimeStamp();

      if ((match.url === undefined || keepURL) && entry) {
        // use URL of route being substituted
        match.url = entry.url;
        match.path = entry.path;
        match.query = entry.query;
        match.search = entry.search;
        match.hash = entry.hash;
      }

      return this.load(match).then(function () {
        if (match.url !== _this3.url) {
          _this3.setLocationURL(match.url, {
            time: time
          }, true);
        }

        _this3.finalize(match);
      });
    }
    /**
     * It should restore a route that has been substituted
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "restore",
    value: function restore() {
      var _this4 = this;

      var entry = this.history[this.history.length - 1];

      if (!entry) {
        return Promise.resolve(false);
      }

      return this.load(entry).then(function () {
        var url = entry.url,
            time = entry.time;

        if (url !== _this4.url) {
          _this4.setLocationURL(url, {
            time: time
          }, true);
        }

        _this4.finalize(entry);

        return true;
      });
    }
    /**
     * Get a URL for a route for the parameters given
     *
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object|undefined} newContext
     *
     * @return {String|undefined}
     */

  }, {
    key: "find",
    value: function find(name, params, newContext) {
      var match = this.generate(name, params, newContext);
      return this.applyFallback(match.url);
    }
    /**
     * Go back to the previous route (if possible)
     *
     * @return {Promise}
     */

  }, {
    key: "back",
    value: function back() {
      var _this5 = this;

      if (this.history.length <= 1) {
        var err = new RelaksRouteManagerError(400, 'Going beyond starting page');
        return Promise.reject(err);
      }

      if (this.options.trackLocation) {
        return new Promise(function (resolve, reject) {
          _this5.backResolve = resolve;
          _this5.backReject = reject;
          window.history.back(); // just in case the operation fails for some reason

          setTimeout(function () {
            var reject = _this5.backReject;

            if (reject) {
              _this5.backResolve = undefined;
              _this5.backReject = undefined;
              reject(new RelaksRouteManagerError(400, 'Unable to go back'));
            }
          }, 50);
        });
      } else {
        var previous = this.history[this.history.length - 2];
        return this.apply(previous, previous.time, false, false);
      }
    }
    /**
     * Match a URL with a route
     *
     * @param  {String} url
     *
     * @return {Object|null}
     */

  }, {
    key: "match",
    value: function match(url) {
      if (typeof url !== 'string') {
        throw new RelaksRouteManagerError(400, 'Invalid URL');
      } // perform rewrites


      var urlParts = this.parse(url);
      var context = {};
      this.rewrite('from', urlParts, context); // look for matching route

      var path = urlParts.path,
          query = urlParts.query,
          search = urlParts.search,
          hash = urlParts.hash;
      var params = {};

      for (var _i = 0, _Object$entries = Object.entries(this.routes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray$1(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            route = _Object$entries$_i[1];

        var types = route.params; // if the path matches, then it's a match
        // query and hash variables are treated as options

        if (matchTemplate(path, route.path, types, params, true)) {
          if (route.query) {
            for (var _i2 = 0, _Object$entries2 = Object.entries(route.query); _i2 < _Object$entries2.length; _i2++) {
              var _Object$entries2$_i = _slicedToArray$1(_Object$entries2[_i2], 2),
                  varName = _Object$entries2$_i[0],
                  varTemplate = _Object$entries2$_i[1];

              var varValue = query[varName];
              matchTemplate(varValue, varTemplate, types, params);
            }
          }

          matchTemplate(hash, route.hash, types, params);
          return {
            name: name,
            params: params,
            context: context,
            route: route,
            url: url,
            path: path,
            query: query,
            search: search,
            hash: hash
          };
        }
      }

      return null;
    }
    /**
     * Parse a URL into different parts
     *
     * @param  {String} url
     *
     * @return {Object}
     */

  }, {
    key: "parse",
    value: function parse(url) {
      if (typeof url !== 'string') {
        throw new RelaksRouteManagerError(400, 'Invalid URL');
      }

      var path = url;
      var hash = '';
      var hashIndex = path.indexOf('#');

      if (hashIndex !== -1) {
        hash = path.substr(hashIndex + 1);
        path = path.substr(0, hashIndex);
      }

      var query = {};
      var search = '';
      var queryIndex = path.indexOf('?');

      if (queryIndex !== -1) {
        search = path.substr(queryIndex);
        query = parseQueryString(search.substr(1));
        path = path.substr(0, queryIndex);
      }

      return {
        path: path,
        query: query,
        search: search,
        hash: hash
      };
    }
    /**
     * Generate a match object given name a params and possibly a context
     *
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object|undefined} newContext
     *
     * @return {String|undefined}
     */

  }, {
    key: "generate",
    value: function generate(name, params, newContext) {
      if (!params) {
        params = {};
      }

      var urlParts = this.fill(name, params);
      var route = this.routes[name];
      var context = Object.assign({}, this.context, newContext);
      var match = {
        name: name,
        params: params,
        context: context,
        route: route
      };

      if (urlParts) {
        // copy the URL parts first, before changing them in rewrite()
        Object.assign(match, urlParts);
        this.rewrite('to', urlParts, context);
        match.url = this.compose(urlParts);
      }

      return match;
    }
    /**
     * Compose a URL from its constituent parts
     *
     * @param  {Object} urlParts
     *
     * @return {String}
     */

  }, {
    key: "compose",
    value: function compose(urlParts) {
      var path = urlParts.path,
          query = urlParts.query,
          hash = urlParts.hash;
      var queryString = composeQueryString(query);
      var url = path;

      if (queryString) {
        url += '?' + queryString;
      }

      if (hash) {
        url += '#' + hash;
      }

      return url;
    }
    /**
     * Load necessary module(s) for a route, append to history, set the state,
     * and trigger change event
     *
     * @param  {Object} match
     * @param  {String} time
     * @param  {Boolean} sync
     * @param  {Boolean} replace
     *
     * @return {Promise<Boolean>}
     */

  }, {
    key: "apply",
    value: function apply(match, time, sync, replace) {
      var _this6 = this;

      var confirmationEvent = new RelaksRouteManagerEvent('beforechange', this, match);
      var subEntry;

      confirmationEvent.substitute = function (name, params, keepURL) {
        var sub = _this6.generate(name, params, match.context);

        if (sub.url === undefined || keepURL) {
          // use URL of the intended route
          sub.url = match.url;
          sub.path = match.path;
          sub.query = match.query;
          sub.search = match.search;
          sub.hash = match.hash;
        }

        return _this6.load(sub).then(function () {
          subEntry = Object.assign({
            time: time
          }, sub);

          _this6.updateHistory(subEntry, replace);

          if (sync) {
            _this6.setLocationURL(subEntry.url, {
              time: time
            }, replace);
          }

          _this6.finalize(subEntry);
        });
      };

      if (process.env.NODE_ENV !== 'production') {
        this.insideBeforeChangeHandler = true;
      }

      this.triggerEvent(confirmationEvent);

      if (process.env.NODE_ENV !== 'production') {
        this.insideBeforeChangeHandler = false;
      }

      return confirmationEvent.waitForDecision().then(function () {
        if (confirmationEvent.defaultPrevented) {
          return false;
        } // add the change to the queue, so we'd notice when multiple changes are
        // all waiting for the same promise to fulfill


        _this6.queue.push(match);

        return _this6.load(match).then(function () {
          var entry = Object.assign({
            time: time
          }, match);

          if (subEntry) {
            // a substitution occurred--go to the route if the substitute
            // at the top of the history stack
            var subEntryIndex = _this6.history.indexOf(subEntry);

            if (subEntryIndex === _this6.history.length - 1) {
              if (entry.url !== subEntry.url) {
                _this6.setLocationURL(entry.url, {
                  time: time
                }, true);
              }

              _this6.finalize(entry);
            } // replace the substitute entry with entry of the actual route
            // so that clicking the back button sends the user to the
            // intended page and not the substitute page


            if (subEntryIndex !== -1) {
              _this6.history[subEntryIndex] = entry;
            }
          } else {
            // ignore change unless it's at the end of the queue
            if (_this6.queue[_this6.queue.length - 1] !== match) {
              return false;
            }

            entry = _this6.updateHistory(entry, replace, true);

            if (sync) {
              _this6.setLocationURL(entry.url, {
                time: time
              }, replace);
            }

            _this6.finalize(entry);

            _this6.queue.splice(0);
          }

          return true;
        });
      });
    }
    /**
     * Set properties of component and fire change event
     *
     * @param  {Object} entry
     */

  }, {
    key: "finalize",
    value: function finalize(entry) {
      Object.assign(this, entry);
      this.triggerEvent(new RelaksRouteManagerEvent('change', this));
    }
    /**
     * Fill a route templates with parameters
     *
     * @param  {String} name
     * @param  {Object} params
     *
     * @return {Object|null}
     */

  }, {
    key: "fill",
    value: function fill(name, params) {
      var route = this.routes[name];

      if (!route) {
        throw new RelaksRouteManagerError(500, 'No route by that name: ' + name);
      }

      if (route.path === '*') {
        return null;
      }

      var types = route.params;
      var path = fillTemplate(route.path, types, params, true);
      var hash = fillTemplate(route.hash, types, params);
      var query = {};

      if (typeof path !== 'string') {
        return null;
      }

      if (route.query) {
        for (var _i3 = 0, _Object$entries3 = Object.entries(route.query); _i3 < _Object$entries3.length; _i3++) {
          var _Object$entries3$_i = _slicedToArray$1(_Object$entries3[_i3], 2),
              varName = _Object$entries3$_i[0],
              varTemplate = _Object$entries3$_i[1];

          var varValue = fillTemplate(varTemplate, types, params);

          if (varValue !== undefined) {
            query[varName] = varValue;
          }
        }
      }

      var queryString = composeQueryString(query);
      var search = queryString ? '?' + queryString : '';
      return {
        path: path,
        query: query,
        search: search,
        hash: hash
      };
    }
    /**
     * Apply rewrites on URL parts
     *
     * @param  {String} direction
     * @param  {Object} urlParts
     * @param  {Object} context
     */

  }, {
    key: "rewrite",
    value: function rewrite(direction, urlParts, context) {
      if (direction === 'from') {
        for (var i = 0; i < this.rewrites.length; i++) {
          var rewrite = this.rewrites[i];

          if (rewrite.from) {
            if (rewrite.from(urlParts, context) === false) {
              break;
            }
          }
        }
      } else if (direction === 'to') {
        for (var _i4 = this.rewrites.length - 1; _i4 >= 0; _i4--) {
          var rewrite = this.rewrites[_i4];

          if (rewrite.to) {
            if (rewrite.to(urlParts, context) === false) {
              break;
            }
          }
        }
      }
    }
    /**
     * Call a route's load() function to load code needed (possibly asynchronously)
     *
     * @param  {Object} match
     *
     * @return {Promise}
     */

  }, {
    key: "load",
    value: function load(match) {
      var _this7 = this;

      try {
        var result;
        var route = match ? this.routes[match.name] : null;

        if (!route) {
          throw new RelaksRouteManagerError(404, 'No route');
        }

        if (route.load) {
          result = route.load(match);
        }

        return Promise.resolve(result)["catch"](function (err) {
          if (_this7.options.reloadFaultyScript) {
            if (/Loading chunk/i.test(err.message)) {
              if ((typeof performance === "undefined" ? "undefined" : _typeof$2(performance)) === 'object' && _typeof$2(performance.navigation) === 'object') {
                if (performance.navigation.type !== 1) {
                  if (navigator.onLine) {
                    // force reloading from server
                    console.log('Reloading page...');
                    location.reload(true);
                  }
                }
              }
            }
          }

          throw err;
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }
    /**
     * Call the load function of every route
     *
     * @return  {Promise}
     */

  }, {
    key: "preload",
    value: function preload() {
      var promises = [];

      for (var _i5 = 0, _Object$entries4 = Object.entries(this.routes); _i5 < _Object$entries4.length; _i5++) {
        var _Object$entries4$_i = _slicedToArray$1(_Object$entries4[_i5], 2),
            name = _Object$entries4$_i[0],
            route = _Object$entries4$_i[1];

        if (route && route.load) {
          var match = {
            params: {},
            context: {}
          };
          promises.push(route.load(match));
        }
      }

      return Promise.all(promises);
    }
    /**
     * Return a relative URL or empty string (if link is pointing to an external page)
     *
     * @param  {Location|HTMLAnchorElement} location
     *
     * @return {String}
     */

  }, {
    key: "getLocationURL",
    value: function getLocationURL(location) {
      var docLocation = window.location;

      if (location !== docLocation) {
        if (location.host !== docLocation.host) {
          throw new RelaksRouteManagerError(400, 'Host does not match');
        } else if (location.protocol !== docLocation.protocol) {
          throw new RelaksRouteManagerError(400, 'Protocol does not match');
        }

        if (this.options.useHashFallback) {
          if (location.pathname !== docLocation.pathname) {
            throw new RelaksRouteManagerError(400, 'Path does not match');
          }

          if (location.search !== docLocation.search) {
            throw new RelaksRouteManagerError(400, 'Query string does not match');
          }
        }
      }

      if (this.options.useHashFallback) {
        var path = location.hash.substr(1);
        return path || '/';
      } else {
        return location.pathname + location.search + location.hash;
      }
    }
    /**
     * Add or remove entries from history, depending on the entry's timestamp.
     * If the an entry with a matching time is found, return it when restore is
     * specified.
     *
     * @param  {Object} entry
     * @param  {Boolean} replace
     * @param  {Boolean} restore
     *
     * @return {Object}
     */

  }, {
    key: "updateHistory",
    value: function updateHistory(entry, replace, restore) {
      if (entry.time >= this.startTime) {
        if (!replace) {
          // see if we're going backward
          var oldEntryIndex = -1;
          var oldEntry = null;

          for (var i = 0; i < this.history.length; i++) {
            var otherEntry = this.history[i];

            if (otherEntry.time === entry.time) {
              oldEntryIndex = i;
              oldEntry = otherEntry;
            }
          }

          if (oldEntry) {
            // no, going backward
            // remove entry and those after it
            this.history.splice(oldEntryIndex);

            if (restore) {
              // use what was stored in history instead of the properties
              // extracted from the URL; the two objects should be
              // identical unless this.history was altered
              entry = oldEntry;
            }
          }
        }
      } else {
        // going into history prior to page load
        // remember the time forward movement from deep into the past
        // works correctly
        this.history = [];
        this.startTime = entry.time;
      }

      if (replace && this.history.length > 0) {
        this.history[this.history.length - 1] = entry;
      } else {
        this.history.push(entry);
      }

      return entry;
    }
    /**
     * Set the browser's address bar when trackLocation is true
     *
     * @param  {String} url
     * @param  {Object} state
     * @param  {Boolean} replace
     */

  }, {
    key: "setLocationURL",
    value: function setLocationURL(url, state, replace) {
      if (this.options.trackLocation) {
        var currentURL = this.getLocationURL(location);

        if (currentURL !== url) {
          url = this.applyFallback(url);

          if (replace) {
            window.history.replaceState(state, '', url);
          } else {
            window.history.pushState(state, '', url);
          }
        }
      }
    }
    /**
     * Prepend URL with # when hash fallback is used
     *
     * @param  {String} url
     *
     * @return {String}
     */

  }, {
    key: "applyFallback",
    value: function applyFallback(url) {
      if (this.options.useHashFallback) {
        if (url != undefined) {
          url = '#' + url;
        }
      }

      return url;
    }
    /**
     * Called when the user clicks on the page
     *
     * @param  {Event} evt
     */

  }, {
    key: "handleLinkClick",
    value: function handleLinkClick(evt) {
      if (evt.button === 0 && !evt.defaultPrevented) {
        var link = getLink(evt.target);

        if (link && !link.target && !link.download) {
          try {
            var url = this.getLocationURL(link);

            if (url) {
              var match = this.match(url);

              if (match) {
                var time = getTimeStamp();
                evt.preventDefault();
                evt.stopPropagation();
                this.apply(match, time, true, false);
              }
            }
          } catch (err) {}
        }
      }
    }
    /**
     * Called when the user press the back button
     *
     * @param  {Event} evt
     */

  }, {
    key: "handlePopState",
    value: function handlePopState(evt) {
      var time = evt.state ? evt.state.time : getTimeStamp();
      var url = this.getLocationURL(window.location);
      var match = this.match(url);
      var promise = this.apply(match, time, false, false); // resolve promise created in back()

      var resolve = this.backResolve;
      var reject = this.backReject;

      if (resolve) {
        this.backResolve = undefined;
        this.backReject = undefined;
        promise.then(resolve, reject);
      }
    }
  }]);

  return RelaksRouteManager;
}(RelaksEventEmitter);

var variableRegExp = /\$\{\w+\}/g;
var regExpCache = {};

function getURLTemplateRegExp(template, types, isPath) {
  if (!template) {
    return null;
  }

  var pattern = template.replace(variableRegExp, function (match) {
    var variable = match.substr(2, match.length - 3);
    var variableType = types ? types[variable] : String;
    var variablePattern;

    if (variableType === Number || variableType === Boolean) {
      variablePattern = '[\\d\\.]*';
    } else if (_typeof$2(variableType) === 'object') {
      variablePattern = variableType.pattern;
    }

    if (!variablePattern) {
      if (isPath) {
        variablePattern = '[^/]*';
      } else {
        variablePattern = '.*';
      }
    }

    return '(' + variablePattern + ')';
  });

  if (isPath) {
    var lc = pattern.charAt(pattern - 1);

    if (lc === '/') {
      pattern += '?';
    } else {
      pattern += '/?';
    }

    pattern = '^' + pattern + '$';
  }

  var re = regExpCache[pattern];

  if (!re) {
    re = regExpCache[pattern] = new RegExp(pattern);
  }

  return re;
}

function getURLTemplateVariables(template) {
  var matches = template.match(variableRegExp);
  var list = [];

  if (matches) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = matches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var match = _step3.value;
        list.push(match.substr(2, match.length - 3));
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return list;
}

function matchTemplate(urlPart, template, types, params, isPath) {
  if (urlPart === undefined || !template) {
    return false;
  }

  if (_typeof$2(template) === 'object') {
    if (template.from) {
      return template.from(urlPart, params);
    }
  } else if (typeof template === 'string') {
    if (template === '*') {
      return true;
    }

    var re = getURLTemplateRegExp(template, types, isPath);
    var matches = re.exec(urlPart);

    if (!matches) {
      return false;
    }

    var variables = getURLTemplateVariables(template);
    var values = {};
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = variables.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _step4$value = _slicedToArray$1(_step4.value, 2),
            index = _step4$value[0],
            variable = _step4$value[1];

        var type = types ? types[variable] : String;
        var value = castValue(matches[index + 1], type);

        if (value !== undefined) {
          values[variable] = value;
        } else {
          if (isPath) {
            return false;
          }
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    Object.assign(params, values);
    return true;
  }

  return false;
}

function fillTemplate(template, types, params, always) {
  if (_typeof$2(template) === 'object') {
    if (template.to) {
      return template.to(params);
    }
  } else if (typeof template === 'string') {
    var variables = getURLTemplateVariables(template);
    var urlPath = template;
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = variables[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var variable = _step5.value;
        var value = params[variable];
        var type = types ? types[variable] : String;

        if (value !== undefined || always) {
          var string = stringifyValue(value, type);
          urlPath = urlPath.replace('${' + variable + '}', string);
        } else {
          return;
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return urlPath;
  }
}

function castValue(string, type) {
  if (type === String) {
    return string;
  } else if (type === Number) {
    return parseFloat(string);
  } else if (type === Boolean) {
    var n = parseFloat(string);

    if (n === n) {
      return !!n;
    } else {
      return !!string;
    }
  } else if (type instanceof Object) {
    if (type.from) {
      return type.from(string);
    }
  }
}

function stringifyValue(value, type) {
  if (type === String) {
    return value;
  } else if (type === Number) {
    if (value === value) {
      return String(value);
    } else {
      return ''; // NAN
    }
  } else if (type === Boolean) {
    return value ? '1' : '0';
  } else if (type instanceof Object) {
    if (type.to) {
      return type.to(value);
    }
  }
}

function parseQueryString(queryString) {
  var values = {};

  if (queryString) {
    var pairs = queryString.split('&');
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = pairs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var pair = _step6.value;
        var parts = pair.split('=');
        var name = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1] || '').replace(/\+/g, ' ');
        values[name] = value;
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }

  return values;
}

function composeQueryString(query) {
  var pairs = [];

  if (query) {
    for (var _i6 = 0, _Object$entries5 = Object.entries(query); _i6 < _Object$entries5.length; _i6++) {
      var _Object$entries5$_i = _slicedToArray$1(_Object$entries5[_i6], 2),
          name = _Object$entries5$_i[0],
          value = _Object$entries5$_i[1];

      pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
  }

  return pairs.join('&');
}

function getLink(element) {
  while (element && (element.tagName !== 'A' || !element.href)) {
    element = element.parentNode;
  }

  return element;
}

var counter = 0;

function getTimeStamp() {
  var s = new Date().toISOString();
  var n = String(counter++);
  var c = '00000000'.substr(n.length) + n;
  return s.substr(0, 23) + c + 'Z';
}

export default index;
export { AsyncComponent, AsyncEventProxy, AsyncRenderingCycle, AsyncRenderingInterrupted, AsyncSaveBuffer, DataSource, DataSourceError, DataSourceEvent, DataSourceObject, Excel, ExcelCell, ExcelColumn, ExcelFile, ExcelObject, ExcelRow, ExcelSheet, Gitlab, GitlabObject, GitlabWiki, ProjectMetadata, RelaksRouteManager as RouteManager, RelaksRouteManagerError as RouteManagerError, RelaksRouteManagerEvent as RouteManagerEvent, VisitorGeolocation, Wordpress, WordpressCategory, WordpressMedia, WordpressObject, WordpressPage, WordpressPost, WordpressSite, WordpressTag, WordpressUser, findSeed, forwardRef, get, harvest, harvesting, memo, plant, set, use, useAsyncEffect, useAutoSave, useComputed, useErrorCatcher, useEventProxy, useEventTime, useLastAcceptable, useListener, useProgress, useProgressTransition, useRenderEvent, useSaveBuffer, useStickySelection };
