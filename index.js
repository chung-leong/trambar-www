(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.TrambarWWW = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

  var AsyncRenderingInterrupted =
  /*#__PURE__*/
  function (_Error) {
    _inherits$1(AsyncRenderingInterrupted, _Error);

    function AsyncRenderingInterrupted() {
      var _this;

      _classCallCheck$1(this, AsyncRenderingInterrupted);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(AsyncRenderingInterrupted).call(this));
      _this.message = 'Async rendering interrupted';
      return _this;
    }

    return AsyncRenderingInterrupted;
  }(_wrapNativeSuper$1(Error));

  var delayWhenEmpty = 50;
  var delayWhenRendered = Infinity;
  var currentState = null;
  var currentSeeds = [];

  var errorHandler = function errorHandler(err) {
    console.error(err);
  };

  var AsyncRenderingCycle =
  /*#__PURE__*/
  function () {
    function AsyncRenderingCycle(target, prev, options) {
      _classCallCheck$1(this, AsyncRenderingCycle);

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
      this.delayEmpty = delayWhenEmpty;
      this.delayRendered = delayWhenRendered;
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

    _createClass$1(AsyncRenderingCycle, [{
      key: "hasEnded",
      value: function hasEnded() {
        return this.completed || this.canceled;
      }
    }, {
      key: "isUpdating",
      value: function isUpdating() {
        if (this.hasEnded()) {
          return false;
        }

        return this.promisedAvailable || this.progressAvailable || this.deferredError;
      }
    }, {
      key: "run",
      value: function run(f) {
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
      }
    }, {
      key: "resolve",
      value: function resolve(element) {
        var _this = this;

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
      }
    }, {
      key: "reject",
      value: function reject(err) {
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
      }
    }, {
      key: "mount",
      value: function mount() {
        this.mounted = true;

        if (this.initial) {
          if (this.isUpdating()) {
            this.rerender();
          }
        }
      }
    }, {
      key: "fulfill",
      value: function fulfill() {
        if (this.progressPromise && !this.progressPromise.fulfilled) {
          if (!this.progressElement) {
            this.progressPromise.resolve(true);
          }
        }
      }
    }, {
      key: "getElement",
      value: function getElement() {
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
      }
    }, {
      key: "getError",
      value: function getError() {
        if (this.deferredError) {
          var error = this.deferredError;
          this.deferredError = undefined;
          this.mounted = false;
          this.cancel();
          return error;
        }
      }
    }, {
      key: "getPrevProps",
      value: function getPrevProps(asyncCycle) {
        return asyncCycle ? this.prevPropsAsync : this.prevProps;
      }
    }, {
      key: "substitute",
      value: function substitute(element) {
        var _this2 = this;

        this.promisedElement = element;
        this.promisedAvailable = true; // schedule immediate rerendering so refs, callbacks are correct

        setTimeout(function () {
          _this2.setContext({
            cycle: _this2
          });
        }, 0);
      }
    }, {
      key: "on",
      value: function on(name, f) {
        this.handlers[name] = f;
      }
    }, {
      key: "show",
      value: function show(element, disposition) {
        var _this3 = this; // make sure the rendering cycle is still current


        this.check(); // save the element so it can be rendered eventually

        this.progressElement = element;

        if (this.progressPromise && !this.progressPromise.fulfilled) {
          this.progressPromise.resolve(false);
        }

        var resolve;
        var promise = new Promise(function (r) {
          resolve = r;
        });
        promise.fulfilled = false;

        promise.resolve = function (value) {
          promise.fulfilled = true;
          resolve(value);
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
              this.updateTimeout = setTimeout(function () {
                // if the timeout is 0, then clearTimeout() was called on it
                // this function might still run on occasion afterward, due to
                // the way timeouts are scheduled
                if (_this3.updateTimeout !== 0) {
                  _this3.update();
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
      }
      /**
       * Rendering the progress element now
       *
       * @param  {Boolean|undefined} forced
       */

    }, {
      key: "update",
      value: function update(forced) {
        this.progressAvailable = true;
        this.progressForced = forced; // force rerendering only if the component is mounted or during the
        // initial rendering cycle (React seems to be able to handle that)

        if (this.initial || this.mounted) {
          this.rerender();
        }
      }
      /**
       * Finalize the rendering cycle, called when the final contents have been
       * rendered
       *
       * @param  {ReactElement|VNode} element
       */

    }, {
      key: "finalize",
      value: function finalize(element) {
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
      }
      /**
       * Check if the rendering cycle has been superceded by a new one. If so
       * throw an exception to end it. Ensure component is mounted as well.
       */

    }, {
      key: "check",
      value: function check() {
        if (!this.options.showProgress) {
          return;
        }

        if (this.synchronous) {
          this.checked = true;

          if (this.isUpdating()) {
            throw new AsyncRenderingInterrupted();
          }
        }

        if (this.canceled) {
          throw new AsyncRenderingInterrupted();
        }
      }
      /**
       * Set progressive rendering delay, for when the component is empty and when
       * it has been fully rendered previously
       *
       * @param  {Number} empty
       * @param  {Number} rendered
       */

    }, {
      key: "delay",
      value: function delay(empty, rendered) {
        if (typeof empty === 'number') {
          this.delayEmpty = empty;
        }

        if (typeof rendered === 'number') {
          this.delayRendered = rendered;
        }
      }
      /**
       * Wait for pending show() or transition() to complete
       *
       * @return {Promise}
       */

    }, {
      key: "hasRendered",
      value: function hasRendered() {
        var promise = this.lastPromise;

        if (!promise) {
          throw new Error('No pending operation');
        }

        return promise;
      }
      /**
       * Alter the progress element immediately after it's been rendered
       *
       * @param  {Object} props
       */

    }, {
      key: "transition",
      value: function transition(props) {
        var _this4 = this;

        var promise = this.hasRendered().then(function (shown) {
          if (shown) {
            var clone = _this4.options.clone;
            var element = clone(_this4.elementRendered, props);

            _this4.show(element);

            return _this4.progressPromise.then(function (shown) {
              promise.fulfilled = true;
              return shown;
            });
          } else {
            return false;
          }
        });
        promise.fulfilled = false;
        this.transitionPromise = this.lastPromise = promise;
      }
      /**
       * Cancel the rendering of progress and trigger cancel handler
       */

    }, {
      key: "cancel",
      value: function cancel() {
        this.clear();

        if (!this.canceled) {
          this.canceled = true;
          this.notify('cancel');
        }
      }
      /**
       * Mark the cycle as completed and trigger complete handler
       */

    }, {
      key: "complete",
      value: function complete() {
        this.clear();

        if (!this.completed) {
          this.completed = true;
          this.notify('complete');
        }
      }
      /**
       * Indicate that progress is being shown and trigger progress handler
       */

    }, {
      key: "progress",
      value: function progress() {
        if (!this.showingProgress) {
          if (!this.progressForced) {
            this.showingProgress = true;
          }
        }

        this.notify('progress');
      }
      /**
       * Cancel the any scheduled rendering of progress
       */

    }, {
      key: "clear",
      value: function clear() {
        if (this.updateTimeout) {
          clearTimeout(this.updateTimeout);
          this.updateTimeout = 0;
        }
      }
      /**
       * Force rendering by recreating the context object
       */

    }, {
      key: "rerender",
      value: function rerender() {
        if (this.synchronous) {
          // no need to force renderering since we're still inside
          // the synchronous function call and we can simply return
          // the progress element
          return;
        }

        if (!this.hasEnded()) {
          if (this.context.cycle === this && this.mounted) {
            this.setContext({
              cycle: this
            });
          }
        }
      }
      /**
       * Trigger diagnostic callback
       *
       * @param  {String} name
       */

    }, {
      key: "notify",
      value: function notify(name) {
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
      }
    }], [{
      key: "acquire",

      /**
       * Get the current rendering cycle, creating a new one if necessary.
       * Made the provided state the current state.
       *
       * @param  {Array} state
       * @param  {Object} target
       * @param  {Objext|undefined} options
       *
       * @return {AsyncRenderingCycle}
       */
      value: function acquire(state, target, options) {
        var cycle = this.get(false, state);

        if (cycle) {
          if (cycle.hasEnded()) {
            cycle = undefined;
          } else if (!cycle.isUpdating()) {
            // cancel the current cycle
            cycle.cancel();
            cycle = undefined;
          }
        }

        if (!cycle) {
          // start a new cycle
          var context = state[0];
          var prev = context.cycle;
          cycle = new AsyncRenderingCycle(target, prev, options);
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
      /**
       * Get the current cycle, stored in the current state or the one provided
       *
       * @param  {Boolean} required
       * @param  {Array|undefined} state
       *
       * @return {AsyncRenderingCycle}
       */

    }, {
      key: "get",
      value: function get(required, state) {
        if (!state) {
          state = currentState;
        }

        if (state) {
          var context = state[0];
          var cycle = context.cycle;

          if (cycle) {
            cycle.context = context;
            cycle.setContext = state[1];
            return cycle;
          }
        }

        if (required) {
          throw new Error('Unable to obtain state variable');
        }

        return null;
      }
      /**
       * Called when we're done working with the current component
       */

    }, {
      key: "end",
      value: function end() {
        currentState = null;
      }
      /**
       * Indicate whether a component is being updated
       * (i.e. rendered content is being delivered to React)
       *
       * @return {Boolean}
       */

    }, {
      key: "isUpdating",
      value: function isUpdating() {
        var cycle = this.get(false);
        return cycle ? cycle.isUpdating() : false;
      }
      /**
       * Set delay before progressive contents appears when the component is
       * completely empty
       *
       * @param {Number} ms
       */

    }, {
      key: "setInitialDelay",
      value: function setInitialDelay(ms) {
        delayWhenEmpty = ms;
      }
      /**
       * Get delay before progressive contents appears when the component is
       * completely empty
       *
       * @return {Number}
       */

    }, {
      key: "getInitialDelay",
      value: function getInitialDelay() {
        return delayWhenEmpty;
      }
      /**
       * Set delay before progressive contents appears after some contents have
       * rendered
       *
       * @param {Number} ms
       */

    }, {
      key: "setSubsequentDelay",
      value: function setSubsequentDelay(ms) {
        delayWhenRendered = ms;
      }
      /**
       * Get delay before progressive contents appears after some contents have
       * rendered
       *
       * @return {Number}
       */

    }, {
      key: "getSubsequentDelay",
      value: function getSubsequentDelay() {
        return delayWhenRendered;
      }
    }, {
      key: "getErrorHandler",
      value: function getErrorHandler() {
        return errorHandler;
      }
    }, {
      key: "setErrorHandler",
      value: function setErrorHandler(f) {
        errorHandler = f;
      }
    }, {
      key: "callErrorHandler",
      value: function callErrorHandler(err) {
        if (errorHandler instanceof Function) {
          errorHandler(err);
        }
      }
    }, {
      key: "plantSeeds",
      value: function plantSeeds(list) {
        if (!(list instanceof Array)) {
          throw new Error('Seeds must be an array of object. Are you calling harvest() with the options { seeds: true }?');
        }

        currentSeeds = list;
      }
    }]);

    return AsyncRenderingCycle;
  }();

  function findSeed(target) {
    var type = target.func || target.constructor;
    var props = target.props;
    var index = -1;
    var best = -1;

    for (var i = 0; i < currentSeeds.length; i++) {
      var seed = currentSeeds[i];

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
      var match = currentSeeds[index];
      currentSeeds.splice(index, 1);
      return match.result;
    }
  }

  var useState = React.useState,
      useEffect = React.useEffect;

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
      AsyncRenderingCycle.end(); // throw error that had occurred in async code

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
      AsyncRenderingCycle.end();

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

  function get(name) {
    switch (name) {
      case 'errorHandler':
        return AsyncRenderingCycle.getErrorHandler();

      case 'delayWhenEmpty':
        return AsyncRenderingCycle.getInitialDelay();

      case 'delayWhenRendered':
        return AsyncRenderingCycle.getSubsequentDelay();
    }
  }

  function set(name, value) {
    switch (name) {
      case 'errorHandler':
        return AsyncRenderingCycle.setErrorHandler(value);

      case 'delayWhenEmpty':
        return AsyncRenderingCycle.setInitialDelay(value);

      case 'delayWhenRendered':
        return AsyncRenderingCycle.setSubsequentDelay(value);
    }
  }

  function plant(list) {
    if (!(list instanceof Array)) {
      throw new Error('Seeds must be an array of object. Are you calling harvest() with the options { seeds: true }?');
    }

    AsyncRenderingCycle.plantSeeds(list);
  }

  var functions =
  /*#__PURE__*/
  Object.freeze({
    __proto__: null,
    use: use,
    memo: memo,
    forwardRef: forwardRef,
    get: get,
    set: set,
    plant: plant
  });
  var PureComponent = React.PureComponent;

  var AsyncComponent =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits$1(AsyncComponent, _PureComponent);

    function AsyncComponent(props) {
      var _this;

      _classCallCheck$1(this, AsyncComponent);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(AsyncComponent).call(this, props));
      var state = [{}, function (context) {
        state[0] = context;

        _this.forceUpdate();
      }];
      _this.relaks = state;
      return _this;
    }
    /**
     * Render component, calling renderAsync() if necessary
     *
     * @return {ReactElement|null}
     */


    _createClass$1(AsyncComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var options = {
          showProgress: true,
          clone: clone$1
        };
        var cycle = AsyncRenderingCycle.acquire(this.relaks, this, options);

        if (!cycle.isUpdating()) {
          // call async function
          cycle.run(function () {
            return _this2.renderAsync(cycle);
          });
        }

        AsyncRenderingCycle.end();
        cycle.mounted = true; // throw error that had occurred in async code

        var error = cycle.getError();

        if (error) {
          if (parseInt(React.version) >= 16) {
            throw error;
          } else {
            AsyncRenderingCycle.callErrorHandler(error);
          }
        } // return either the promised element or progress


        var element = cycle.getElement();
        return element;
      }
    }, {
      key: "renderAsyncEx",
      value: function renderAsyncEx() {
        var options = {
          clone: clone$1
        };
        var cycle = AsyncRenderingCycle.acquire(this.relaks, this, options);
        var promise = this.renderAsync(cycle);
        AsyncRenderingCycle.end();

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
      }
      /**
       * Cancel any outstanding asynchronous rendering cycle on unmount.
       */

    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var cycle = AsyncRenderingCycle.get(false, this.relaks);

        if (!cycle.hasEnded()) {
          cycle.cancel();
        }
      }
    }]);

    return AsyncComponent;
  }(PureComponent);

  function clone$1(element, props) {
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
    var cycle = AsyncRenderingCycle.get(true);
    cycle.delay(delayEmpty, delayRendered, true); // return functions (bound in constructor)

    return [cycle.show, cycle.check, cycle.delay];
  }

  function useProgressTransition() {
    var cycle = AsyncRenderingCycle.get(true);
    return [cycle.transition, cycle.hasRendered];
  }

  function useRenderEvent(name, f) {
    if (!AsyncRenderingCycle.isUpdating()) {
      var cycle = AsyncRenderingCycle.get(true);
      cycle.on(name, f);
    }
  }

  var AsyncSaveBuffer =
  /*#__PURE__*/
  function () {
    function AsyncSaveBuffer() {
      _classCallCheck$1(this, AsyncSaveBuffer);

      this.ready = false;
      this.original = undefined;
      this.current = undefined;
      this.changed = false;
      this.params = undefined;
      this.setContext = undefined;
    }

    _createClass$1(AsyncSaveBuffer, [{
      key: "base",
      value: function base(theirs) {
        if (theirs == null) {
          return;
        }

        if (!this.ready) {
          var preserved = this.restore(theirs);
          var ours = preserved !== undefined ? preserved : this.prefill(theirs);

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
          var _ours = this.current;

          if (!this.compare(base, theirs)) {
            if (this.changed) {
              var merged = this.merge(base, _ours, theirs);

              if (!this.compare(merged, theirs)) {
                this.current = merged;
                this.preserve(theirs, _ours);
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
      }
    }, {
      key: "update",
      value: function update(ours) {
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
      }
    }, {
      key: "set",
      value: function set(ours) {
        return this.update(ours);
      }
    }, {
      key: "assign",
      value: function assign() {
        var newObject = Object.assign({}, this.current);

        for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }

        for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
          var source = _sources[_i];
          Object.assign(newObject, source);
        }

        this.update(newObject);
      }
    }, {
      key: "reset",
      value: function reset() {
        var base = this.check();

        if (this.changed) {
          this.current = base;
          this.changed = false;
          this.preserve(base, null);
          this.rerender();
        }
      }
    }, {
      key: "compare",
      value: function compare(ours, theirs) {
        var compareFunc = this.params.compare || compareDef;
        return compareFunc(ours, theirs);
      }
    }, {
      key: "merge",
      value: function merge(base, ours, theirs) {
        var mergeFunc = this.params.merge || mergeDef;
        return mergeFunc(base, ours, theirs);
      }
    }, {
      key: "preserve",
      value: function preserve(base, ours) {
        var preserveFunc = this.params.preserve || preserveDef;
        preserveFunc(base, ours);
      }
    }, {
      key: "restore",
      value: function restore(theirs) {
        var restoreFunc = this.params.restore || restoreDef;
        return restoreFunc(theirs);
      }
    }, {
      key: "prefill",
      value: function prefill(theirs) {
        var prefillFunc = this.params.prefill || prefillDef;
        return prefillFunc(theirs);
      }
    }, {
      key: "transform",
      value: function transform(ours) {
        var transformFunc = this.params.transform || transformDef;
        return transformFunc(ours);
      }
    }, {
      key: "rerender",
      value: function rerender() {
        if (this.setContext) {
          this.setContext({
            buffer: this
          });
        }
      }
    }, {
      key: "check",
      value: function check() {
        if (!this.ready) {
          throw new Error('Original value has not been set');
        }

        return this.original;
      }
    }, {
      key: "use",
      value: function use(params) {
        this.params = params;
        this.base(params.original);

        if (params.reset && this.ready && this.changed) {
          var base = this.original;
          this.current = base;
          this.changed = false;
          this.preserve(base, null);
        }
      }
    }], [{
      key: "acquire",
      value: function acquire(state, params, bufferClass) {
        if (!bufferClass) {
          bufferClass = this;
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
    }]);

    return AsyncSaveBuffer;
  }();

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

  var useState$1 = React.useState,
      useRef = React.useRef,
      useCallback = React.useCallback,
      useEffect$1 = React.useEffect,
      useDebugValue = React.useDebugValue;

  function useSaveBuffer(params, customClass) {
    if (AsyncRenderingCycle.isUpdating()) {
      // don't initialize when called during rerendering
      params = null;
    } else if (!params) {
      params = {};
    }

    var state = useState$1({});
    var buffer = AsyncSaveBuffer.acquire(state, params, customClass);
    useEffect$1(function () {
      // let the buffer know that the component associated with it
      // has been unmounted
      return function () {
        buffer.setContext = null;
      };
    }, []);
    useDebugValue(buffer.current);
    return buffer;
  }

  function useAutoSave(saveBuffer, wait, f) {
    // store the callback in a ref so the useEffect hook function will
    // always call the latest version
    var ref = useRef({});

    if (!AsyncRenderingCycle.isUpdating()) {
      ref.current.f = f;
    }

    var save = useCallback(function (conditional) {
      if (conditional) {
        if (!saveBuffer.changed || ref.current.saved === saveBuffer.current) {
          return;
        }
      }

      ref.current.saved = saveBuffer.current;
      ref.current.f();
    }, []);
    useEffect$1(function () {
      if (saveBuffer.changed && typeof wait === 'number') {
        var timeout = setTimeout(function () {
          // make sure save() don't get called after timeout is cancelled
          if (timeout) {
            save(true);
          }
        }, wait);
        return function () {
          // clear the timer on new changes or unmount
          clearTimeout(timeout);
          timeout = 0;
        };
      }
    }, [saveBuffer.current]);
    useEffect$1(function () {
      // save unsaved changes on unmount
      return function () {
        save(true);
      };
    }, []);
    useDebugValue(wait);
    return save;
  }

  var AsyncEventProxy = function AsyncEventProxy() {
    _classCallCheck$1(this, AsyncEventProxy);

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
  };

  var traps = {
    get: get$1,
    set: set$1
  };
  var methods = {
    one: one,
    all: all,
    some: some,
    match: match,
    race: race,
    filter: filter,
    list: list,
    isFulfilled: isFulfilled,
    isPending: isPending
  };

  function get$1(target, key) {
    var f = target.methods[key] || target.handlers[key];

    if (!f) {
      var resolve;
      var promise = new Promise(function (r) {
        resolve = r;
      });
      promise.resolve = resolve;
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

    return some.call(this, keys);
  }

  function some(keys) {
    var list = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        list.push(this.promises[key]);
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

    return some.call(this, keys);
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

  var useMemo = React.useMemo,
      useDebugValue$1 = React.useDebugValue;

  function useEventProxy(deps) {
    var proxy = useMemo(function () {
      return new AsyncEventProxy();
    }, deps);
    useDebugValue$1(proxy, formatDebugValue);
    return proxy;
  }

  function formatDebugValue(proxy) {
    var keys = proxy.list();
    var fired = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (proxy.isFulfilled(key)) {
          fired.push(key);
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

    return fired.join(' ');
  }

  var useState$2 = React.useState,
      useRef$1 = React.useRef,
      useMemo$1 = React.useMemo,
      useEffect$2 = React.useEffect,
      useCallback$1 = React.useCallback,
      useDebugValue$2 = React.useDebugValue;

  function useEventTime() {
    var state = useState$2();
    var date = state[0];
    var setDate = state[1];
    var callback = useCallback$1(function (evt) {
      setDate(new Date());
    }, []);
    useDebugValue$2(date);
    return [date, callback];
  }

  function useListener(f) {
    var ref = useRef$1({});

    if (!AsyncRenderingCycle.isUpdating()) {
      ref.current.f = f;
    }

    useDebugValue$2(f); // can't use arrow function here since we want to use arguments

    return useCallback$1(function () {
      return ref.current.f.apply(null, arguments);
    }, []);
  }

  function useAsyncEffect(f, deps) {
    useEffect$2(function () {
      var cleanUp;
      var cleanUpDeferred = false; // invoke the callback and wait for promise to get fulfilled

      var promise = f();
      Promise.resolve(promise).then(function (ret) {
        // save the clean-up function returned by the callback
        cleanUp = ret; // if clean-up was requested while we were waiting for the promise to
        // resolve, perform it now

        if (cleanUpDeferred) {
          cleanUp();
        }
      });
      return function () {
        if (cleanUp) {
          cleanUp();
        } else {
          // maybe we're still waiting for the promsie to resolve
          cleanUpDeferred = true;
        }
      };
    }, deps);
    useDebugValue$2(f);
  }

  function useErrorCatcher(rethrow) {
    var _useState = useState$2(),
        _useState2 = _slicedToArray$1(_useState, 2),
        error = _useState2[0],
        setError = _useState2[1];

    if (rethrow && error) {
      throw error;
    }

    var run = useCallback$1(function (f) {
      // catch sync exception with try-block
      try {
        // invoke the given function
        var promise = f();

        if (promise && promise["catch"] instanceof Function) {
          // catch async exception
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
    var clear = useCallback$1(function (f) {
      setError(undefined);
    }, []);
    useDebugValue$2(error);
    return [error, run, clear];
  }

  function useComputed(f, deps) {
    var pair = useState$2({});
    var state = pair[0];
    var setState = pair[1]; // add state object as dependency of useMemo hook

    if (deps instanceof Array) {
      deps = deps.concat(state);
    } else {
      deps = [state];
    }

    var value = useMemo$1(function () {
      return state.current = f(state.current);
    }, deps);
    var recalc = useCallback$1(function () {
      // force recalculation by changing state
      setState({
        value: state.value
      });
    }, []);
    useDebugValue$2(value);
    return [value, recalc];
  }

  function useLastAcceptable(value, acceptable) {
    var ref = useRef$1();

    if (typeof acceptable === 'function') {
      acceptable = acceptable(value);
    }

    if (acceptable) {
      // set the value only if it's acceptable
      ref.current = value;
    }

    useDebugValue$2(ref.current);
    return ref.current;
  }

  function useStickySelection(inputRefs) {
    if (!(inputRefs instanceof Array)) {
      inputRefs = [inputRefs];
    }

    var inputs = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = inputRefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var inputRef = _step.value;
        var node = inputRef.current;

        if (node) {
          inputs.push({
            node: node,
            value: node.value,
            start: node.selectionStart,
            end: node.selectionEnd
          });
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

    useEffect$2(function () {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var input = _step2.value;
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
    }, [inputs]);
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

  var useMemo$2 = React.useMemo,
      useContext = React.useContext,
      useEffect$3 = React.useEffect,
      useDebugValue$3 = React.useDebugValue;
  var Env = React.createContext();
  var defEnv = {};

  function useEnv() {
    var env = useContext(Env) || defEnv;
    useDebugValue$3(env);
    return env;
  }

  function useEnvMonitor(vars) {
    var browserParams = useMemo$2(function () {
      if (harvesting()) {
        return {};
      }

      var ua = navigator.userAgent;
      var uaFragmentsBrowser = {
        firefox: 'Firefox',
        opera: 'Opera',
        ie: 'Trident',
        edge: 'Edge',
        chrome: 'Chrome',
        safari: 'Safari'
      };
      var uaFragmentsOS = {
        wp: 'Windows Phone',
        windows: 'Windows',
        ios: 'iPhone OS',
        osx: 'OS X',
        android: 'Android',
        linux: 'Linux'
      };
      var os = 'unknown',
          browser = 'unknown';

      for (var _i = 0, _Object$entries = Object.entries(uaFragmentsOS); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            fragment = _Object$entries$_i[1];

        if (ua.indexOf(fragment) > -1) {
          os = name;
          break;
        }
      }

      for (var _i2 = 0, _Object$entries2 = Object.entries(uaFragmentsBrowser); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _name = _Object$entries2$_i[0],
            _fragment = _Object$entries2$_i[1];

        if (ua.indexOf(_fragment) > -1) {
          browser = _name;
          break;
        }
      }

      return {
        os: os,
        browser: browser
      };
    }, []);

    var _useEventTime = useEventTime(),
        _useEventTime2 = _slicedToArray(_useEventTime, 2),
        displayChanged = _useEventTime2[0],
        setDisplayChanged = _useEventTime2[1];

    var displayParams = useMemo$2(function () {
      if (harvesting()) {
        return {};
      }

      var viewport = document.documentElement;
      return {
        devicePixelRatio: window.devicePixelRatio,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: viewport.clientWidth,
        viewportHeight: viewport.clientHeight,
        orientationType: screen.orientation ? screen.orientation.type : 'unknown'
      };
    }, [displayChanged]);

    var _useEventTime3 = useEventTime(),
        _useEventTime4 = _slicedToArray(_useEventTime3, 2),
        connectionChanged = _useEventTime4[0],
        setConnectionChanged = _useEventTime4[1];

    var connectionParams = useMemo$2(function () {
      if (harvesting()) {
        return {};
      }

      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return {
        onLine: navigator.onLine,
        connectionType: connection ? connection.type || connection.effectiveType : 'unknown'
      };
    }, [connectionChanged]);
    useEffect$3(function () {
      window.addEventListener('resize', setDisplayChanged);
      window.addEventListener('orientationchange', setDisplayChanged);
      window.addEventListener('visibilitychange', setDisplayChanged);
      return function () {
        window.removeEventListener('resize', setDisplayChanged);
        window.removeEventListener('orientationchange', setDisplayChanged);
        window.removeEventListener('visibilitychange', setDisplayChanged);
      };
    }, []);
    useEffect$3(function () {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      window.addEventListener('online', setConnectionChanged);
      window.addEventListener('offline', setConnectionChanged);

      if (connection) {
        connection.addEventListener('typechange', setConnectionChanged);
      }

      return function () {
        window.removeEventListener('online', setConnectionChanged);
        window.removeEventListener('offline', setConnectionChanged);

        if (connection) {
          connection.removeEventListener('typechange', setConnectionChanged);
        }
      };
    }, []);
    var deps = [browserParams, displayParams, connectionParams].concat(_toConsumableArray(Object.values(vars)));
    useDebugValue$3(vars);
    return useMemo$2(function () {
      return _objectSpread2({}, browserParams, {}, displayParams, {}, vars);
    }, deps);
  }

  function usePlainText(hookOpts) {
    var env = useEnv();

    var options = _objectSpread2({}, env, {}, hookOpts);

    useDebugValue$3(hookOpts);
    return useListener(function (object) {
      if (object && object.getPlainText instanceof Function) {
        return object.getPlainText(options);
      } else if (object == null) {
        return '';
      } else {
        return object + '';
      }
    });
  }

  function useRichText(hookOpts) {
    var env = useEnv();

    var options = _objectSpread2({}, env, {}, hookOpts);

    useDebugValue$3(hookOpts);
    return useListener(function (object) {
      if (object && object.getRichText instanceof Function) {
        return object.getRichText(options);
      } else if (object == null) {
        return '';
      } else {
        return object + '';
      }
    });
  }

  function useLanguage() {
    var env = useEnv();
    var locale = env.locale;
    var language;

    if (locale && locale.language) {
      language = locale.language;
    }

    if (!language) {
      language = 'en';
    }

    useDebugValue$3(language);
    return language;
  }

  function useLanguageSpecific() {
    var language = useLanguage();
    useDebugValue$3(language);
    return useListener(function (object) {
      if (object && object.getLanguageSpecific instanceof Function) {
        return object.getLanguageSpecific(language);
      } else {
        return object;
      }
    });
  }

  function useLocalized() {
    var env = useEnv();
    useDebugValue$3(!!(env.locale && env.locale.localize instanceof Function));
    return useListener(function (phrase, params) {
      var locale = env.locale;

      if (locale && locale.localize instanceof Function) {
        return locale.localize(phrase, params);
      } else {
        return phrase;
      }
    });
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

  var RelaksEventEmitter =
  /*#__PURE__*/
  function () {
    function RelaksEventEmitter() {
      _classCallCheck$2(this, RelaksEventEmitter);

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


    _createClass$2(RelaksEventEmitter, [{
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
      _classCallCheck$2(this, RelaksGenericEvent);

      this.type = type;
      this.target = target;
      this.defaultPrevented = false;
      this.defaultPostponed = null;
      this.propagationStopped = false;
      this.decisionPromise = null;
      Object.assign(this, props);
    }

    _createClass$2(RelaksGenericEvent, [{
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

  var LocaleManagerEvent =
  /*#__PURE__*/
  function (_GenericEvent) {
    _inherits(LocaleManagerEvent, _GenericEvent);

    function LocaleManagerEvent() {
      _classCallCheck(this, LocaleManagerEvent);

      return _possibleConstructorReturn(this, _getPrototypeOf(LocaleManagerEvent).apply(this, arguments));
    }

    return LocaleManagerEvent;
  }(RelaksGenericEvent);

  var defaultOptions = {
    loadFunc: function loadFunc() {
      return Promise.resolve({});
    }
  };

  var LocaleManager =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(LocaleManager, _EventEmitter);

    function LocaleManager(options) {
      var _this;

      _classCallCheck(this, LocaleManager);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LocaleManager).call(this));
      _this.language = '';
      _this.options = {};

      for (var name in defaultOptions) {
        if (options && options[name] !== undefined) {
          _this.options[name] = options[name];
        } else {
          _this.options[name] = defaultOptions[name];
        }
      }

      _this.table = {};
      _this.localize = _this.localize.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(LocaleManager, [{
      key: "activate",
      value: function activate() {}
    }, {
      key: "deactivate",
      value: function deactivate() {}
    }, {
      key: "start",
      value: function start(language) {
        return this.set(language);
      }
    }, {
      key: "set",
      value: function set(language) {
        var _this2 = this;

        language = language.toLowerCase();

        if (this.language === language) {
          return Promise.resolve();
        }

        var load = this.options.loadFunc;
        return load(language).then(function (table) {
          _this2.table = table;
          _this2.language = language;

          _this2.triggerEvent(new LocaleManagerEvent('change'));
        });
      }
    }, {
      key: "localize",
      value: function localize(phrase, params) {
        if (phrase instanceof Date) {
          return phrase.toLocaleString(this.language, params);
        }

        var translated = this.table[phrase];

        if (translated === undefined) {
          return phrase;
        } else if (translated instanceof Function) {
          try {
            return translated(params);
          } catch (err) {
            return "[".concat(err.message, "]");
          }
        } else {
          return translated;
        }
      }
    }]);

    return LocaleManager;
  }(RelaksEventEmitter);

  var LocaleManagerProxy =
  /*#__PURE__*/
  function () {
    function LocaleManagerProxy(localeManager) {
      _classCallCheck(this, LocaleManagerProxy);

      this.localeManager = localeManager;
      this.language = localeManager.language;
    }

    _createClass(LocaleManagerProxy, [{
      key: "set",
      value: function set(language) {
        return this.localeManager.set(language);
      }
    }, {
      key: "localize",
      value: function localize(phrase, params) {
        return this.localeManager.localize(phrase, params);
      }
    }]);

    return LocaleManagerProxy;
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

  var Resource =
  /*#__PURE__*/
  function () {
    function Resource(data) {
      _classCallCheck(this, Resource);

      if (data) {
        this.type = data.type;
        this.src = data.src;
        this.url = data.url;
        this.width = data.width;
        this.height = data.height;
        this.naturalWidth = this.width;
        this.naturalHeight = this.height;
        this.derived = false;
      }
    }

    _createClass(Resource, [{
      key: "matchURL",
      value: function matchURL(url) {
        if (typeof url === 'string') {
          if (this.src === url) {
            return true;
          }

          if (this.url === url) {
            return true;
          }

          if (url && url.startsWith(this.url)) {
            if (this.url.endsWith('/') || url.charAt(this.url.length) === '/') {
              return true;
            }
          }
        }

        return false;
      }
    }, {
      key: "transform",
      value: function transform(styles) {
        if (this.derived) {
          throw new Error('Cannot transform a derived image');
        }

        var filters = [];
        var remaining = {};
        var cropping = true;
        var enlarging = false;
        var pixelRatio = 1;
        var newWidth, newHeight;
        var rotation, format;

        for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              name = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (value !== undefined) {
            switch (name) {
              case 'crop':
                cropping = value;
                break;

              case 'enlarge':
                enlarging = value;
                break;

              case 'width':
                newWidth = value;
                break;

              case 'height':
                newHeight = value;
                break;

              case 'rotate':
                rotation = value;
                break;

              case 'ratio':
                pixelRatio = value;
                break;

              case 'format':
                format = value;
                break;

              default:
                remaining[name] = value;
            }
          }
        }

        var originalWidth = this.width;
        var originalHeight = this.height;

        if (rotation) {
          while (rotation < 0) {
            rotation += 360;
          }

          if (rotation % 90 !== 0) {
            throw new Error("Cannot rotation image by ".concat(rotation, " degrees"));
          }

          if (rotation !== 0) {
            if (rotation === 90 || rotation === 270) {
              originalWidth = this.height;
              originalHeight = this.width;
            }

            filters.push(filterEncoders.rotate(rotation));
          }
        }

        var originalAspectRatio = originalWidth / originalHeight;

        if (!newWidth) {
          if (newHeight) {
            newWidth = Math.ceil(newHeight * originalAspectRatio);
          } else {
            newWidth = originalWidth;
            newHeight = originalHeight;
          }
        } else {
          if (!newHeight) {
            newHeight = Math.ceil(newWidth / originalAspectRatio);
          }
        }

        var newAspectRatio = newWidth / newHeight;
        var finalWidth = newWidth * pixelRatio;
        var finalHeight = newHeight * pixelRatio;

        if (!enlarging) {
          if (finalWidth > originalWidth) {
            finalWidth = originalWidth;
            finalHeight = Math.ceil(finalWidth / newAspectRatio);
          }

          if (finalHeight > originalHeight) {
            finalHeight = originalHeight;
            finalWidth = Math.ceil(finalWidth * newAspectRatio);
          }
        }

        if (finalWidth !== originalWidth || finalHeight !== originalHeight) {
          var cropWidth = originalWidth;
          var cropHeight = originalHeight;

          if (cropping) {
            if (Math.abs(originalAspectRatio - newAspectRatio) > 0.01) {
              var left, top, width, height;

              if (originalAspectRatio > newAspectRatio) {
                width = Math.round(originalHeight * newAspectRatio);
                height = originalHeight;
                top = 0;
                left = Math.floor((originalWidth - width) / 2);
              } else {
                width = originalWidth;
                height = Math.round(originalWidth / newAspectRatio);
                top = Math.floor((originalHeight - height) / 2);
                left = 0;
              }

              filters.push(filterEncoders.crop({
                left: left,
                top: top,
                width: width,
                height: height
              }));
              cropWidth = width;
              cropHeight = height;
            }
          }

          if (finalWidth !== cropWidth || finalHeight !== cropHeight) {
            filters.push(filterEncoders.resize({
              width: finalWidth,
              height: finalHeight
            }));
          }
        } // add remaining filters


        for (var _i2 = 0, _Object$entries2 = Object.entries(remaining); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              _name = _Object$entries2$_i[0],
              _value = _Object$entries2$_i[1];

          if (_value !== undefined) {
            var filterEncoder = filterEncoders[_name];

            if (filterEncoder) {
              var filter = filterEncoder(_value);

              if (filter) {
                filters.push(filter);
              }
            } else {
              throw new Error("Unrecognized operation: '".concat(_name, "'"));
            }
          }
        }

        if (filters.length === 0 && !format) {
          if (originalWidth === newWidth && originalHeight === newHeight) {
            // no change
            return this;
          }
        }

        var filename = filters.join('-');

        if (format) {
          if (/^jpeg$/.test(format)) {
            filename += ".jpg";
          } else {
            filename += ".".concat(format.toLowerCase());
          }
        }

        var url = this.url;

        if (!url.endsWith('/')) {
          url += '/';
        }

        url += filename;
        var resource = new this.constructor();
        resource.type = this.type;
        resource.src = this.src;
        resource.url = url;
        resource.width = newWidth;
        resource.height = newHeight;
        resource.naturalWidth = finalWidth;
        resource.naturalHeight = finalHeight;
        resource.derived = true;
        return resource;
      }
    }]);

    return Resource;
  }();

  var filterEncoders = {
    background: function background(value) {
      if (value instanceof Array) {
        value = {
          r: value[0],
          g: value[1],
          b: value[2],
          a: value[3]
        };
      } else if (typeof value === 'string') {
        var hex = value.replace(/^\s*#\s*/, '');
        var digits = value.length >= 6 ? 2 : 1;
        value = {
          r: parseInt(value.substr(0 * digits, digits), 16),
          g: parseInt(value.substr(1 * digits, digits), 16),
          b: parseInt(value.substr(2 * digits, digits), 16)
        };
      }

      var r = Math.round((value.r || 0) / 255 * 100);
      var g = Math.round((value.g || 0) / 255 * 100);
      var b = Math.round((value.b || 0) / 255 * 100);
      var a = typeof value.a === 'number' ? Math.round(value.a * 100) : 100;
      return "ba".concat(r, "_").concat(g, "_").concat(b, "_").concat(a);
    },
    blur: function blur(value) {
      if (!(value <= 0)) {
        if (value === true) {
          value = 0.3;
        }

        var sigma = Math.round(value * 10);
        return "bl".concat(sigma);
      }
    },
    crop: function crop(value) {
      var left = value.left,
          top = value.top,
          width = value.width,
          height = value.height;
      return "cr".concat(left, "_").concat(top, "_").concat(width, "_").concat(height);
    },
    extract: function extract(value) {
      var channel = value;
      return "ex".concat(channel);
    },
    flip: function flip() {
      return "fli";
    },
    flop: function flop() {
      return "flo";
    },
    gamma: function gamma(value) {
      if (!(value <= 0)) {
        var gamma = typeof value === 'number' ? Math.round(value * 10) : 22;
        return "ga".concat(gamma);
      }
    },
    grayscale: function grayscale() {
      return "gr";
    },
    negate: function negate() {
      return "ne";
    },
    normalize: function normalize() {
      return "no";
    },
    lossless: function lossless(value) {
      if (value) {
        return "lo";
      }
    },
    quality: function quality(value) {
      if (!(value <= 0)) {
        return "q".concat(value);
      }
    },
    resize: function resize(value) {
      var width = value.width,
          height = value.height;
      return "re".concat(width, "_").concat(height);
    },
    rotate: function rotate(value) {
      if (!(value <= 0)) {
        var degrees = value;
        return "ro".concat(degrees);
      }
    },
    sharpen: function sharpen(value) {
      if (value) {
        return "sh";
      }
    }
  };

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

  var Text =
  /*#__PURE__*/
  function () {
    function Text(data) {
      _classCallCheck(this, Text);

      if (data) {
        this.json = data.json;

        if (data.resources instanceof Array) {
          this.resources = data.resources.map(function (resource) {
            return new Resource(resource);
          });
        }
      }
    }

    _createClass(Text, [{
      key: "getPlainText",
      value: function getPlainText(options) {
        var node = {
          children: this.json
        };
        var text = this.getPlainTextFromNode(node, options || {});
        return text.trim();
      }
    }, {
      key: "getRichText",
      value: function getRichText(options) {
        var node = {
          children: this.json
        };
        return this.getRichTextFromNode(node, options || {});
      }
    }, {
      key: "getAvailableLanguages",
      value: function getAvailableLanguages() {
        var codes = [];
        var choices = this.separateNodesByLanguages(this.json);
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
        var choices = this.separateNodesByLanguages(this.json);
        var chosen = chooseLanguageVersion(choices, lang);
        var json = [];
        var resources = this.resources;
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

        return new Text({
          json: json,
          resources: resources
        });
      }
    }, {
      key: "getDictionary",
      value: function getDictionary(options) {
        var richText = options && options.richText;
        var blockQuote = options && options.blockQuote;
        var sections = {};
        var phrase;
        var section;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.json[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var node = _step5.value;

            if (isHeading(node)) {
              phrase = this.getPlainTextFromNode(node);
              sections[phrase] = section = [];
              continue;
            }

            if (!blockQuote) {
              if (node.type === 'blockquote') {
                continue;
              }
            }

            if (section) {
              section.push(node);
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

        var dict = {};

        for (var _i = 0, _Object$entries = Object.entries(sections); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              _phrase = _Object$entries$_i[0],
              _section = _Object$entries$_i[1];

          var children = trimNodes(_section);
          var _node = {
            children: children
          };
          var text = void 0;

          if (richText) {
            text = this.getRichTextFromNode(_node, options || {});

            if (_typeof(text) === 'object' && text.type === 'p') {
              // pull the text out of the <p> element
              text = React.createElement(React.Fragment, text.props);
            }
          } else {
            text = this.getPlainTextFromNode(_node, options || {});
            text = text.trim();
          }

          dict[_phrase] = text;
        }

        return dict;
      }
    }, {
      key: "getJSON",
      value: function getJSON(title) {
        var titleFound = false;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.json[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var node = _step6.value;

            if (node instanceof Object) {
              if (/^h[1-6]$/.test(node.type)) {
                var text = this.getPlainTextFromNode(node, {}).trim();
                titleFound = text === title;
              } else if (node.type === 'pre') {
                var children = node.children;

                if (children !== undefined) {
                  if (!(children instanceof Array)) {
                    children = [children];
                  }
                }

                if (titleFound && children) {
                  var _iteratorNormalCompletion7 = true;
                  var _didIteratorError7 = false;
                  var _iteratorError7 = undefined;

                  try {
                    for (var _iterator7 = node.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                      var child = _step7.value;

                      if (child.type === 'code') {
                        var _text = this.getPlainTextFromNode(child, {});

                        try {
                          return JSON.parse(_text);
                        } catch (err) {
                          console.error(err);
                        }
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
      }
    }, {
      key: "getImage",
      value: function getImage(url) {
        if (this.resources) {
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = this.resources[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var resource = _step8.value;

              if (resource.type === 'image') {
                if (resource.matchURL(url)) {
                  return resource;
                }
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
        }
      }
    }, {
      key: "getPlainTextFromNode",
      value: function getPlainTextFromNode(node, options) {
        if (_typeof(node) === 'object') {
          var type = node.type,
              props = node.props;

          if (type === 'br') {
            return '\n';
          } else if (type === 'hr') {
            return '――――――――――\n';
          } else if (type === 'img') {
            return props && props.alt ? "[".concat(props.alt, "]") : "";
          }

          var children = node.children;

          if (children !== undefined) {
            if (!(children instanceof Array)) {
              children = [children];
            }
          }

          var text = '';

          if (children instanceof Array) {
            // initialize marker of for ordered list
            var marker = 1;

            if (type === 'ol') {
              if (props && props.start !== undefined) {
                var start = parseInt(props.start);

                if (!isNaN(start)) {
                  marker = start;
                }
              }
            } // get text from each child


            var blockLevels = children.map(isBlockLevel);
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
              for (var _iterator9 = children.entries()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var _step9$value = _slicedToArray(_step9.value, 2),
                    index = _step9$value[0],
                    child = _step9$value[1];

                if (typeof child === 'string') {
                  if (blockLevels[index - 1] !== false && blockLevels[index + 1] !== false) {
                    if (!child.trim()) {
                      // ignore whitespaces between block level elements
                      continue;
                    }
                  }
                }

                var ctext = this.getPlainTextFromNode(child, options);

                if (_typeof(child) === 'object') {
                  if (blockLevels[index]) {
                    // trim leading and trailing spaces (but not newline added by <BR>)
                    ctext = ctext.replace(/^ +/, '').replace(/ +$/, '');

                    if (!ctext.endsWith('\n')) {
                      ctext += '\n';
                    }
                  }

                  if (/^(h[1-6]|p|pre|ol|ul)$/.test(child.type)) {
                    // add extra newline to the end of these tags
                    if (!ctext.endsWith('\n\n')) {
                      ctext += '\n';
                    }
                  } else if (child.type === 'li') {
                    // add bullet/marker
                    if (type === 'ol') {
                      ctext = "".concat(marker, ". ").concat(ctext);
                      marker++;
                    } else {
                      ctext = "* ".concat(ctext);
                    }
                  }
                }

                text += ctext;
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

          return text;
        } else if (typeof node === 'string') {
          var _text2 = normalizeWhitespaces(node);

          return _text2;
        }
      }
    }, {
      key: "getRichTextFromNode",
      value: function getRichTextFromNode(node, options, key) {
        var _this = this;

        var renderFunc = options.renderFunc;

        if (renderFunc) {
          var result = renderFunc.call(this, node, key);

          if (result !== undefined) {
            return result;
          }
        }

        if (_typeof(node) === 'object') {
          var type = node.type,
              props = node.props,
              children = node.children;

          if (children !== undefined) {
            if (!(children instanceof Array)) {
              children = [children];
            }
          }

          if (type === undefined) {
            if (children && children.length === 1) {
              // there's only one child so we just return that
              return this.getRichTextFromNode(children[0], options, key);
            } else {
              // need to place them in a fragment
              type = React.Fragment;
            }
          } else if (type === 'img') {
            var image = this.getImage(props.src);

            if (image) {
              var imageWidth = options.imageWidth,
                  imageHeight = options.imageHeight,
                  imageFormat = options.imageFormat,
                  devicePixelRatio = options.devicePixelRatio;
              var resized = image.transform({
                width: imageWidth,
                height: imageHeight,
                format: imageFormat,
                ratio: devicePixelRatio
              });
              props = _objectSpread2({}, props, {
                src: resized.url,
                width: resized.width,
                height: resized.height
              });
            }
          }

          if (children instanceof Array) {
            children = children.map(function (child, index) {
              return _this.getRichTextFromNode(child, options, index);
            });
          }

          props = _objectSpread2({
            key: key
          }, props);
          return React.createElement(type, props, children);
        } else if (typeof node === 'string') {
          var text = normalizeWhitespaces(node);
          return text;
        }
      }
    }, {
      key: "separateNodesByLanguages",
      value: function separateNodesByLanguages() {
        var choices = [];
        var topic = 0;
        var languages;
        var choice;
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this.json[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var node = _step10.value;
            var newLanguages = this.getLanguageCodesFromNode(node);

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

        return choices;
      }
    }, {
      key: "getLanguageCodesFromNode",
      value: function getLanguageCodesFromNode(node) {
        if (isHeading(node)) {
          var text = this.getPlainTextFromNode(node, {}).trim();
          var m = /^\((.*)\)$/.exec(text);

          if (m) {
            var codes = [];
            var flags = m[1].trim().split(/\s*,\s*/);
            var reset = false;
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
              for (var _iterator11 = flags[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var flag = _step11.value;

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

            if (codes.length > 0 || reset) {
              return codes;
            }
          }
        }
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.getPlainText();
      }
    }]);

    return Text;
  }();

  function isBlockLevel(node) {
    if (_typeof(node) === 'object') {
      var tag = getTagProperties(node.type);
      return !!tag.block;
    } else if (typeof node === 'string') {
      return false;
    }
  }

  function normalizeWhitespaces(text) {
    return text.replace(/\s+/g, ' ');
  }

  function isLanguageCode(text) {
    return /^[a-z]{2}(\-[a-z]{2})?$/i.test(text);
  }

  function chooseLanguageVersion(choices, lang) {
    var list = [];
    var existing = {};
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = choices[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        var object = _step12.value;
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

    return list;
  }

  function getLanguageMatch(languageCodes, lang) {
    if (languageCodes instanceof Array) {
      var highest;

      var _lang$split = lang.split('-'),
          _lang$split2 = _slicedToArray(_lang$split, 2),
          reqLC = _lang$split2[0],
          reqCC = _lang$split2[1];

      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = languageCodes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var languageCode = _step13.value;

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

      return highest;
    } else {
      return 1;
    }
  }

  function findLanguageCodes(flags, defaultLanguages) {
    var codes = [];

    if (flags instanceof Array) {
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = flags[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var flag = _step14.value;

          if (isLanguageCode(flag)) {
            codes.push(flag.toLowerCase());
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
    }

    return codes.length > 0 ? codes : defaultLanguages || [];
  }

  function isHeading(node) {
    return node instanceof Object && /^h[1-6]$/.test(node.type);
  }

  function trimNodes(nodes) {
    var start = 0;
    var last = nodes.length - 1;

    while (typeof nodes[start] === 'string' && !nodes[start].trim()) {
      start++;
    }

    while (typeof nodes[last] === 'string' && !nodes[last].trim()) {
      last--;
    }

    return nodes.slice(start, last + 1);
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

          if (value instanceof Text) {
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

          if (value instanceof Text) {
            value = value.getLanguageSpecific(lang);
          }

          object[name] = value;
        }

        return object;
      }
    }, {
      key: "getImage",
      value: function getImage(url) {
        for (var _i3 = 0, _Object$entries2 = Object.entries(this); _i3 < _Object$entries2.length; _i3++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
              name = _Object$entries2$_i[0],
              value = _Object$entries2$_i[1];

          if (value instanceof Text) {
            var image = value.getImage(url);

            if (image) {
              return image;
            }
          }
        }
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

      if (json) {
        _this.name = json.name || '';
        _this.title = new Text(json.title);
        _this.description = new Text(json.description);
        _this.archived = json.archived || false;
      }

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

  var defaultOptions$1 = {
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

      for (var name in defaultOptions$1) {
        if (options && options[name] !== undefined) {
          _this.options[name] = options[name];
        } else {
          _this.options[name] = defaultOptions$1[name];
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
        this.fetchVisitorGeolocation()["catch"](function (err) {});
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
      value: function getDataURL(objectClass, identifiers, criteria) {
        var url = this.options.baseURL || '';

        if (!url.endsWith('/')) {
          url += '/';
        }

        url += 'data/';
        url += encodeURI(objectClass.getObjectURL(identifiers));

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
      value: function fetchObject(objectClass, identifiers) {
        var url = this.getDataURL(objectClass, identifiers);
        var query = this.findQuery({
          url: url,
          objectClass: objectClass
        });

        if (query) {
          if (query.dirty) {
            this.checkObject(query);
          }
        } else {
          query = this.addQuery({
            url: url,
            objectClass: objectClass,
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
      value: function findObjects(objectClass, identifiers, criteria) {
        var _this3 = this;

        var url = this.getDataURL(objectClass, identifiers, criteria);
        var query = this.findQuery({
          url: url,
          objectClass: null
        });

        if (query) {
          if (query.dirty) {
            this.checkListing(query);
          }
        } else {
          query = this.addQuery({
            url: url,
            objectClass: null,
            pageVariable: objectClass.getPageVariable(),
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
            return _this3.fetchObject(objectClass, combined);
          });
          return Promise.all(promises).then(function (objects) {
            if (!compareArrays(objects, query.objects)) {
              if (query.pageVariable) {
                objects.more = _this3.requestMore.bind(_this3, query);
              }

              query.objects = objects;
            }

            if (query.result.total !== undefined) {
              objects.total = query.result.total;
            }

            if (query.result.pages !== undefined) {
              objects.pages = query.result.pages;
            }

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
              var objectClass = query.objectClass,
                  identifiers = query.identifiers;
              var result = objectClass ? new objectClass(identifiers, json) : json;
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
          var changed = some$1(pageChanged);

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
                    if (pageQuery.result.total !== undefined) {
                      items.total = pageQuery.result.total;
                    }

                    if (pageQuery.result.pages !== undefined) {
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
                    objectClass: query.objectClass
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

  function some$1(array) {
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

  var DataSourceProxy =
  /*#__PURE__*/
  function () {
    function DataSourceProxy(dataSource) {
      _classCallCheck(this, DataSourceProxy);

      this.dataSource = dataSource;
    }

    _createClass(DataSourceProxy, [{
      key: "fetchProjectMeta",
      value: function fetchProjectMeta() {
        return this.dataSource.fetchProjectMeta();
      }
    }, {
      key: "fetchExcelFile",
      value: function fetchExcelFile(fileId) {
        return this.dataSource.fetchExcelFile(fileId);
      }
    }, {
      key: "findExcelFiles",
      value: function findExcelFiles(criteria) {
        return this.dataSource.findExcelFiles(criteria);
      }
    }, {
      key: "fetchWikiPage",
      value: function fetchWikiPage(repoId, slug) {
        return this.dataSource.fetchWikiPage(repoId, slug);
      }
    }, {
      key: "findWikiPages",
      value: function findWikiPages(repoId, criteria) {
        return this.dataSource.findWikiPages(repoId, criteria);
      }
    }, {
      key: "fetchWPCategory",
      value: function fetchWPCategory(siteId, categoryId) {
        return this.dataSource.fetchWPCategory(siteId, categoryId);
      }
    }, {
      key: "fetchWPCategories",
      value: function fetchWPCategories(siteId, categoryIds) {
        return this.dataSource.fetchWPCategories(siteId, categoryIds);
      }
    }, {
      key: "fetchWPMedia",
      value: function fetchWPMedia(siteId, mediaId) {
        return this.dataSource.fetchWPMedia(siteId, mediaId);
      }
    }, {
      key: "fetchWPMedias",
      value: function fetchWPMedias(siteId, mediaIds) {
        return this.dataSource.fetchWPMedias(siteId, mediaIds);
      }
    }, {
      key: "fetchWPPage",
      value: function fetchWPPage(siteId, pageId) {
        return this.dataSource.fetchWPPage(siteId, pageId);
      }
    }, {
      key: "fetchWPPages",
      value: function fetchWPPages(siteId, pageIds) {
        return this.dataSource.fetchWPPages(siteId, pageIds);
      }
    }, {
      key: "fetchWPPost",
      value: function fetchWPPost(siteId, postId) {
        return this.dataSource.fetchWPPost(siteId, postId);
      }
    }, {
      key: "fetchWPPosts",
      value: function fetchWPPosts(siteId, postIds) {
        return this.dataSource.fetchWPPosts(siteId, postIds);
      }
    }, {
      key: "findWPPosts",
      value: function findWPPosts(siteId, criteria) {
        return this.dataSource.findWPPosts(siteId, criteria);
      }
    }, {
      key: "fetchWPTag",
      value: function fetchWPTag(siteId, tagId) {
        return this.dataSource.fetchWPTag(siteId, tagId);
      }
    }, {
      key: "fetchWPTags",
      value: function fetchWPTags(siteId, tagIds) {
        return this.dataSource.fetchWPTags(siteId, tagIds);
      }
    }, {
      key: "fetchWPUser",
      value: function fetchWPUser(siteId, userId) {
        return this.dataSource.fetchWPUser(siteId, userId);
      }
    }, {
      key: "fetchWPUsers",
      value: function fetchWPUsers(siteId, userIds) {
        return this.dataSource.fetchWPUsers(siteId, userIds);
      }
    }, {
      key: "findWPUsers",
      value: function findWPUsers(siteId, criteria) {
        return this.dataSource.findWPUsers(siteId, criteria);
      }
    }, {
      key: "fetchWPSite",
      value: function fetchWPSite(siteId) {
        return this.dataSource.fetchWPSite(siteId);
      }
    }, {
      key: "findWPSites",
      value: function findWPSites() {
        return this.dataSource.findWPSites();
      }
    }]);

    return DataSourceProxy;
  }();

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
    }, {
      key: "getImage",
      value: function getImage(url) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cell = _step.value;
            var image = cell.getImage(url);

            if (image) {
              return image;
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
    }]);

    return ExcelColumn;
  }(ExcelObject);

  var ExcelRow =
  /*#__PURE__*/
  function (_ExcelObject) {
    _inherits(ExcelRow, _ExcelObject);

    function ExcelRow(identifiers, data, names, sheetLanguageCodes) {
      var _this;

      _classCallCheck(this, ExcelRow);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ExcelRow).call(this, identifiers, data));
      _this.cells = [];
      _this.languages = sheetLanguageCodes;
      _this.names = names;
      return _this;
    }

    _createClass(ExcelRow, [{
      key: "getColumn",
      value: function getColumn(name) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.names.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                index = _step$value[0],
                columnName = _step$value[1];

            if (columnName === name) {
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
    }, {
      key: "getImage",
      value: function getImage(url) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.cells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var cell = _step3.value;
            var image = cell.getImage(url);

            if (image) {
              return image;
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
    }]);

    return ExcelRow;
  }(ExcelObject);

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
      _this.content = new Text({
        json: json,
        resources: resources
      });
      _this.languages = columnLanguages;
      return _this;
    }

    return ExcelCell;
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
        var columnNames = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (data.columns || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var columnData = _step.value;
            var column = new ExcelColumn(identifiers, columnData, defaultLanguages);

            _this.columns.push(column);

            columnNames.push(column.name);
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
            var row = new ExcelRow(identifiers, rowData, columnNames, _this.languages);

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
        var chosen = chooseLanguageVersion(this.columns, sheet.language);
        var columnNames = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = chosen[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var columnChosen = _step6.value;
            var column = new ExcelColumn(this.identifiers);
            column.name = columnChosen.name;
            column.flags = columnChosen.flags;
            column.language = sheet.language;
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = columnChosen.cells[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var cellChosen = _step8.value;
                var cell = new ExcelCell(this.identifiers);
                cell.type = cellChosen.type;
                cell.content = cellChosen.content;
                cell.language = sheet.language;
                column.cells.push(cell);
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

            sheet.columns.push(column);
            columnNames.push(column.name);
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

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.rows.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                index = _step7$value[0],
                rowExisting = _step7$value[1];

            var row = new ExcelRow(this.identifiers);
            row.names = columnNames;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
              for (var _iterator9 = sheet.columns[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var _column2 = _step9.value;
                row.cells.push(_column2.cells[index]);
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

            sheet.rows.push(row);
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

        return sheet;
      }
    }, {
      key: "getImage",
      value: function getImage(url) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this.columns[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var column = _step10.value;
            var image = column.getImage(url);

            if (image) {
              return image;
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
      }
    }, {
      key: "getDictionary",
      value: function getDictionary(options) {
        var dict = {};

        if (this.columns.length >= 2) {
          var richText = options && options.richText;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = this.rows[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var row = _step11.value;

              var _row$cells = _slicedToArray(row.cells, 2),
                  cell1 = _row$cells[0],
                  cell2 = _row$cells[1];

              var phrase = cell1.content.getPlainText();
              var text = void 0;

              if (richText) {
                text = cell2.content.getRichText(options);
              } else {
                text = cell2.content.getPlainText(options);
              }

              dict[phrase] = text;
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

        return dict;
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
    }, {
      key: "getImage",
      value: function getImage(url) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.sheets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var sheet = _step5.value;
            var image = sheet.getImage(url);

            if (image) {
              return image;
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
      key: "getDictionary",
      value: function getDictionary(options) {
        var dict = {};
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.sheets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var sheet = _step6.value;
            var sdict = sheet.getDictionary(options);

            for (var _i = 0, _Object$entries = Object.entries(sdict); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                  phrase = _Object$entries$_i[0],
                  text = _Object$entries$_i[1];

              dict[phrase] = text;
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

        return dict;
      }
    }], [{
      key: "getObjectURL",
      value: function getObjectURL(identifiers) {
        var _identifiers = _slicedToArray(identifiers, 1),
            fileId = _identifiers[0];

        var url = "excel/";

        if (fileId) {
          url += "".concat(fileId, "/");
        }

        return url;
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
        return this.fetchObject(ExcelFile, [fileId]);
      }
    }, {
      key: "findExcelFiles",
      value: function findExcelFiles(criteria) {
        return this.findObjects(ExcelFile, [], criteria);
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
        _this.content = new Text(json);
      }

      return _this;
    }

    _createClass(GitlabWiki, null, [{
      key: "getObjectURL",
      value: function getObjectURL(identifiers) {
        var _identifiers = _slicedToArray(identifiers, 2),
            repoId = _identifiers[0],
            slug = _identifiers[1];

        var url = "wiki/";

        if (repoId) {
          url += "".concat(repoId, "/");

          if (slug) {
            url += "".concat(slug, "/");
          }
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
        return this.fetchObject(GitlabWiki, [repoId, slug]);
      }
    }, {
      key: "findWikiPages",
      value: function findWikiPages(repoId, criteria) {
        return this.findObjects(GitlabWiki, [repoId], criteria);
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
        _this.name = new Text(json.name);
        _this.description = new Text(json.description);
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
        _this.title = new Text(json.title);
        _this.description = new Text(json.description);
        _this.caption = new Text(json.caption);
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
        _this.title = new Text(json.title);
        _this.content = new Text(json.content);
        _this.excerpt = new Text(json.excerpt);
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
        _this.title = new Text(json.title);
        _this.content = new Text(json.content);
        _this.excerpt = new Text(json.excerpt);
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
        _this.name = new Text(json.name);
        _this.description = new Text(json.description);
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
        _this.name = new Text(json.name);
        _this.description = new Text(json.description);
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
        _this.name = new Text(json.name);
        _this.description = new Text(json.description);
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

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  function _inherits$2(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$2(subClass, superClass);
  }

  function _getPrototypeOf$2(o) {
    _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$2(o);
  }

  function _setPrototypeOf$2(o, p) {
    _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$2(o, p);
  }

  function isNativeReflectConstruct$2() {
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

  function _construct$2(Parent, args, Class) {
    if (isNativeReflectConstruct$2()) {
      _construct$2 = Reflect.construct;
    } else {
      _construct$2 = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf$2(instance, Class.prototype);
        return instance;
      };
    }

    return _construct$2.apply(null, arguments);
  }

  function _isNativeFunction$2(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper$2(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper$2 = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction$2(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct$2(Class, arguments, _getPrototypeOf$2(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf$2(Wrapper, Class);
    };

    return _wrapNativeSuper$2(Class);
  }

  function _assertThisInitialized$2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$2(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$2(self);
  }

  function _slicedToArray$2(arr, i) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _nonIterableRest$2();
  }

  function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$2(arr, i) {
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

  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var RelaksRouteManagerEvent =
  /*#__PURE__*/
  function (_GenericEvent) {
    _inherits$2(RelaksRouteManagerEvent, _GenericEvent);

    function RelaksRouteManagerEvent() {
      _classCallCheck$3(this, RelaksRouteManagerEvent);

      return _possibleConstructorReturn$2(this, _getPrototypeOf$2(RelaksRouteManagerEvent).apply(this, arguments));
    }

    return RelaksRouteManagerEvent;
  }(RelaksGenericEvent);

  var RelaksRouteManagerError =
  /*#__PURE__*/
  function (_Error) {
    _inherits$2(RelaksRouteManagerError, _Error);

    function RelaksRouteManagerError(status, message) {
      var _this;

      _classCallCheck$3(this, RelaksRouteManagerError);

      _this = _possibleConstructorReturn$2(this, _getPrototypeOf$2(RelaksRouteManagerError).call(this, message));
      _this.status = status;
      return _this;
    }

    return RelaksRouteManagerError;
  }(_wrapNativeSuper$2(Error));

  var SSR = (typeof window === "undefined" ? "undefined" : _typeof$2(window)) !== 'object';
  var defaultOptions$2 = {
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
    _inherits$2(RelaksRouteManager, _EventEmitter);

    function RelaksRouteManager(options) {
      var _this;

      _classCallCheck$3(this, RelaksRouteManager);

      _this = _possibleConstructorReturn$2(this, _getPrototypeOf$2(RelaksRouteManager).call(this));
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

      for (var name in defaultOptions$2) {
        if (options && options[name] !== undefined) {
          _this.options[name] = options[name];
        } else {
          _this.options[name] = defaultOptions$2[name];
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

      _this.handleLinkClick = _this.handleLinkClick.bind(_assertThisInitialized$2(_this));
      _this.handlePopState = _this.handlePopState.bind(_assertThisInitialized$2(_this));
      return _this;
    }
    /**
     * Activate the component
     */


    _createClass$3(RelaksRouteManager, [{
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
          var _Object$entries$_i = _slicedToArray$2(_Object$entries[_i], 2),
              name = _Object$entries$_i[0],
              route = _Object$entries$_i[1];

          var types = route.params; // if the path matches, then it's a match
          // query and hash variables are treated as options

          if (matchTemplate(path, route.path, types, params, true)) {
            if (route.query) {
              for (var _i2 = 0, _Object$entries2 = Object.entries(route.query); _i2 < _Object$entries2.length; _i2++) {
                var _Object$entries2$_i = _slicedToArray$2(_Object$entries2[_i2], 2),
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
            var _Object$entries3$_i = _slicedToArray$2(_Object$entries3[_i3], 2),
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
          var _Object$entries4$_i = _slicedToArray$2(_Object$entries4[_i5], 2),
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
          var _step4$value = _slicedToArray$2(_step4.value, 2),
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
        var _Object$entries5$_i = _slicedToArray$2(_Object$entries5[_i6], 2),
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

  var RelaksRouteManagerProxy =
  /*#__PURE__*/
  function () {
    function RelaksRouteManagerProxy(routeManager) {
      _classCallCheck$3(this, RelaksRouteManagerProxy);

      this.routeManager = routeManager;
      this.name = routeManager.name;
      this.params = routeManager.params;
      this.context = routeManager.context;
      this.history = routeManager.history;
      this.url = routeManager.url;
      this.path = routeManager.path;
      this.query = routeManager.query;
      this.search = routeManager.search;
      this.hash = routeManager.hash;
    }

    _createClass$3(RelaksRouteManagerProxy, [{
      key: "push",
      value: function push(name, params) {
        return this.routeManager.push(name, params);
      }
    }, {
      key: "replace",
      value: function replace(name, params) {
        return this.routeManager.replace(name, params);
      }
    }, {
      key: "substitute",
      value: function substitute(name, params) {
        return this.routeManager.substitute(name, params);
      }
    }, {
      key: "restore",
      value: function restore() {
        return this.routeManager.restore();
      }
    }, {
      key: "change",
      value: function change(url, options) {
        return this.routeManager.change(url, options);
      }
    }, {
      key: "find",
      value: function find(name, params) {
        return this.routeManager.find(name, params);
      }
    }]);

    return RelaksRouteManagerProxy;
  }();

  exports.AsyncComponent = AsyncComponent;
  exports.AsyncEventProxy = AsyncEventProxy;
  exports.AsyncRenderingCycle = AsyncRenderingCycle;
  exports.AsyncRenderingInterrupted = AsyncRenderingInterrupted;
  exports.AsyncSaveBuffer = AsyncSaveBuffer;
  exports.DataSource = DataSource;
  exports.DataSourceError = DataSourceError;
  exports.DataSourceEvent = DataSourceEvent;
  exports.DataSourceObject = DataSourceObject;
  exports.DataSourceProxy = DataSourceProxy;
  exports.Env = Env;
  exports.Excel = Excel;
  exports.ExcelCell = ExcelCell;
  exports.ExcelColumn = ExcelColumn;
  exports.ExcelFile = ExcelFile;
  exports.ExcelObject = ExcelObject;
  exports.ExcelRow = ExcelRow;
  exports.ExcelSheet = ExcelSheet;
  exports.Gitlab = Gitlab;
  exports.GitlabObject = GitlabObject;
  exports.GitlabWiki = GitlabWiki;
  exports.LocaleManager = LocaleManager;
  exports.LocaleManagerEvent = LocaleManagerEvent;
  exports.LocaleManagerProxy = LocaleManagerProxy;
  exports.ProjectMetadata = ProjectMetadata;
  exports.RelaksRouteManager = RelaksRouteManager;
  exports.RelaksRouteManagerError = RelaksRouteManagerError;
  exports.RelaksRouteManagerEvent = RelaksRouteManagerEvent;
  exports.RelaksRouteManagerProxy = RelaksRouteManagerProxy;
  exports.Resource = Resource;
  exports.RouteManager = RelaksRouteManager;
  exports.RouteManagerError = RelaksRouteManagerError;
  exports.RouteManagerEvent = RelaksRouteManagerEvent;
  exports.RouteManagerProxy = RelaksRouteManagerProxy;
  exports.Text = Text;
  exports.VisitorGeolocation = VisitorGeolocation;
  exports.Wordpress = Wordpress;
  exports.WordpressCategory = WordpressCategory;
  exports.WordpressMedia = WordpressMedia;
  exports.WordpressObject = WordpressObject;
  exports.WordpressPage = WordpressPage;
  exports.WordpressPost = WordpressPost;
  exports.WordpressSite = WordpressSite;
  exports.WordpressTag = WordpressTag;
  exports.WordpressUser = WordpressUser;
  exports.chooseLanguageVersion = chooseLanguageVersion;
  exports.default = functions;
  exports.findLanguageCodes = findLanguageCodes;
  exports.forwardRef = forwardRef;
  exports.get = get;
  exports.getLanguageMatch = getLanguageMatch;
  exports.harvest = harvest;
  exports.harvesting = harvesting;
  exports.isLanguageCode = isLanguageCode;
  exports.memo = memo;
  exports.plant = plant;
  exports.set = set;
  exports.use = use;
  exports.useAsyncEffect = useAsyncEffect;
  exports.useAutoSave = useAutoSave;
  exports.useComputed = useComputed;
  exports.useEnv = useEnv;
  exports.useEnvMonitor = useEnvMonitor;
  exports.useErrorCatcher = useErrorCatcher;
  exports.useEventProxy = useEventProxy;
  exports.useEventTime = useEventTime;
  exports.useLanguage = useLanguage;
  exports.useLanguageSpecific = useLanguageSpecific;
  exports.useLastAcceptable = useLastAcceptable;
  exports.useListener = useListener;
  exports.useLocalized = useLocalized;
  exports.usePlainText = usePlainText;
  exports.useProgress = useProgress;
  exports.useProgressTransition = useProgressTransition;
  exports.useRenderEvent = useRenderEvent;
  exports.useRichText = useRichText;
  exports.useSaveBuffer = useSaveBuffer;
  exports.useStickySelection = useStickySelection;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
