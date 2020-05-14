/**
* Muuri-react v3.1.3
* https://paol-imi.github.io/muuri-react
* Copyright (c) 2020-present, Paol-imi
* Released under the MIT license
* https://github.com/Paol-imi/muuri-react/blob/master/LICENSE
* @license MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('muuri'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'muuri', 'react'], factory) :
  (global = global || self, factory(global.MuuriReact = {}, global.Muuri, global.React));
}(this, (function (exports, Muuri, React) { 'use strict';

  Muuri = Muuri && Object.prototype.hasOwnProperty.call(Muuri, 'default') ? Muuri['default'] : Muuri;
  var React__default = 'default' in React ? React['default'] : React;

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

  var key = '_component';

  /**
   * Return if the instance is decorated.
   *
   * @param instance - The instance.
   * @returns - If the instance is decorated.
   */
  function isDecorated(instance) {
    return !!instance[key];
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  /**
   * Add a decoration to the instance.
   *
   * @param instance - The instance to decorate.
   * @param decoration - The decoration.
   */
  function addDecoration(instance, decoration) {
    if (isDecorated(instance)) {
      Object.assign(instance[key], decoration);
    } else {
      instance[key] = _objectSpread({}, decoration);
    }
  }

  /**
   * Add a decoration to the instance.
   *
   * @param instance - The instance to decorate.
   * @param decoration - The decoration.
   */
  function getDecoration(instance) {
    return instance[key];
  }

  /**
   * Remove the decoration from the instance.
   *
   * @param decorated - The instance.
   */
  function removeDecorations(decorated) {
    decorated._component = null;
  }

  /**
   * Muuri id getter.
   *
   * @returns - The id of the instance.
   */

  Muuri.prototype.getId = function getId() {
    return getDecoration(this).id;
  };
  /**
   * Muuri group ids getter.
   *
   * @returns - The group ids of the instance.
   */


  Muuri.prototype.getGroupIds = function getGroupIds() {
    return getDecoration(this).groupIds;
  };
  /**
   * Muuri size element getter.
   *
   * @returns - The group ids of the instance.
   */


  Muuri.prototype.getSizerElement = function getSizerElement() {
    return getDecoration(this).sizerElement;
  };
  /**
   * Item key getter.
   *
   * @returns - The item component key.
   */


  Muuri.Item.prototype.getKey = function getKey() {
    return getDecoration(this).key;
  };
  /**
   * Item props getter.
   *
   * @returns - The item component props.
   */


  Muuri.Item.prototype.getProps = function getProps() {
    return getDecoration(this).props;
  };
  /**
   * Item data getter.
   *
   * @returns - The item component data.
   */


  Muuri.Item.prototype.getData = function getData() {
    return getDecoration(this).data;
  };
  /**
   * Item data setter.
   *
   * @param data - The data.
   */


  Muuri.Item.prototype.setData = function setData(data) {
    getDecoration(this).data = data;
  };

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  });
  var reactIs_development_1 = reactIs_development.AsyncMode;
  var reactIs_development_2 = reactIs_development.ConcurrentMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Lazy;
  var reactIs_development_9 = reactIs_development.Memo;
  var reactIs_development_10 = reactIs_development.Portal;
  var reactIs_development_11 = reactIs_development.Profiler;
  var reactIs_development_12 = reactIs_development.StrictMode;
  var reactIs_development_13 = reactIs_development.Suspense;
  var reactIs_development_14 = reactIs_development.isAsyncMode;
  var reactIs_development_15 = reactIs_development.isConcurrentMode;
  var reactIs_development_16 = reactIs_development.isContextConsumer;
  var reactIs_development_17 = reactIs_development.isContextProvider;
  var reactIs_development_18 = reactIs_development.isElement;
  var reactIs_development_19 = reactIs_development.isForwardRef;
  var reactIs_development_20 = reactIs_development.isFragment;
  var reactIs_development_21 = reactIs_development.isLazy;
  var reactIs_development_22 = reactIs_development.isMemo;
  var reactIs_development_23 = reactIs_development.isPortal;
  var reactIs_development_24 = reactIs_development.isProfiler;
  var reactIs_development_25 = reactIs_development.isStrictMode;
  var reactIs_development_26 = reactIs_development.isSuspense;
  var reactIs_development_27 = reactIs_development.isValidElementType;
  var reactIs_development_28 = reactIs_development.typeOf;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;

  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if ( typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!reactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning$1(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning$1('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has$1(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
         printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') ;
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
  });

  // Grid context.
  var GridContext = React.createContext({}); // Grid provider.

  var GridProvider = GridContext.Provider; // Grid context hook.

  var useGridContext = function useGridContext() {
    return React.useContext(GridContext);
  }; // Grid provider display name.

  GridContext.displayName = 'GridProvider';

  // Item context.
  var ItemContext = React.createContext({}); // Item provider.

  var ItemProvider = ItemContext.Provider; // Item context hook.

  var useItemContext = function useItemContext() {
    return React.useContext(ItemContext);
  }; // Item provider display name.

  ItemContext.displayName = 'ItemProvider';

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

  /**
   * CONTROLLER: ITEM
   *
   * The purpose of this controller is to manage the
   * events trigger to the specific item the controller is assigned to.
   * This controllers is used by the hooks to re-render the components.
   */
  var EventController = /*#__PURE__*/function () {
    function EventController() {
      _classCallCheck(this, EventController);

      _defineProperty(this, "_eventsMap", new Map());

      _defineProperty(this, "_payloadsMap", new Map());
    }

    _createClass(EventController, [{
      key: "enableEvent",

      /**
       * Enable an event, it can be emitted.
       *
       * @param event - The event name.
       * @param emitter - The callback.
       */
      value: function enableEvent(event, emitter) {
        this._eventsMap.set(event, emitter);
      }
      /**
       * Set an event payload and emit it the event.
       *
       * @param event - The event name.
       * @param payload - The payload.
       */

    }, {
      key: "emitEvent",
      value: function emitEvent(event, payload) {
        if (this.isEnabled(event)) {
          this._payloadsMap.set(event, payload); // @ts-ignore


          this._eventsMap.get(event)();
        }
      }
      /**
       * Get the payload of the event.
       *
       * @param event - The event.
       * @returns - The payload.
       */

    }, {
      key: "getPayload",
      value: function getPayload(event) {
        return this._payloadsMap.get(event);
      }
      /**
       * Returns if at least an event is enabled.
       *
       * @param event - The event.
       * @returns - If at least an event is enabled.
       */

    }, {
      key: "isEnabled",
      value: function isEnabled(event) {
        return this._eventsMap.has(event);
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._eventsMap.clear();

        this._payloadsMap.clear();
      }
    }]);

    return EventController;
  }();

  /**
   * CONTROLLER: GRID -> ITEM
   *
   * The purpose of this controller is to pass to the
   * ItemComponents the items instances.
   * This can be done without knowing the added items and
   * relying only on the useEffect call order of the added items.
   */
  var ItemAddController = /*#__PURE__*/function () {
    function ItemAddController() {
      _classCallCheck(this, ItemAddController);

      _defineProperty(this, "_requests", []);
    }

    _createClass(ItemAddController, [{
      key: "useInit",

      /**
       * Clear the requests.
       */
      value: function useInit() {
        this._requests = [];
      }
      /**
       * Emit the new items to the
       * components that made a request.
       *
       * @param items - The items.
       */

    }, {
      key: "emit",
      value: function emit(items) {
        for (var i = 0; i < this._requests.length; i++) {
          this._requests[i](items[i]);
        }
      }
      /**
       * Request an item.
       *
       * @param cb - The callback.
       */

    }, {
      key: "requestItem",
      value: function requestItem(cb) {
        this._requests.push(cb);
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._requests = [];
      }
    }]);

    return ItemAddController;
  }();

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct() {
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
    if (_isNativeReflectConstruct()) {
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

  function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var prefix = 'Invariant failed'; // Invarianto instance

  var Invariant = /*#__PURE__*/function (_Error) {
    _inherits(Invariant, _Error);

    var _super = _createSuper(Invariant);

    function Invariant(message) {
      var _this;

      _classCallCheck(this, Invariant);

      _this = _super.call(this, message);
      _this.name = 'Invariant';
      return _this;
    }

    return Invariant;
  }( /*#__PURE__*/_wrapNativeSuper(Error)); // Throw an error if the condition fails

  function invariant(condition, message) {
    if (condition) {
      return;
    }

    {
      // When not in production we allow the message to pass through
      // *This block will be removed in production builds*
      throw new Invariant("".concat(prefix, ": ").concat(message || ''));
    }
  }

  /*
   * CONTROLLER: ITEM
   *
   * The purpose of this controller is to make possible
   * to set data in the item also if
   * it has not been created yet.
   */
  var ItemRefController = /*#__PURE__*/function () {
    function ItemRefController() {
      _classCallCheck(this, ItemRefController);

      _defineProperty(this, "_item", null);

      _defineProperty(this, "_instance", {});
    }

    _createClass(ItemRefController, [{
      key: "set",

      /**
       * Set a decoration in the item.
       *
       * @param key - The decoration key.
       * @param value - The decoration.
       */
      value: function set(key, value) {
        if (this._item) {
          addDecoration(this._item, _defineProperty({}, key, value));
        } else {
          this._instance[key] = value;
        }
      }
      /**
       * Get a decoration value from the item.
       *
       * @param key - The decoration key.
       * @returns - The decoration value.
       */

    }, {
      key: "get",
      value: function get(key) {
        if (this._item) {
          return getDecoration(this._item)[key];
        } else {
          return this._instance[key];
        }
      }
      /**
       * Remove all the decorations from the item.
       */

    }, {
      key: "delete",
      value: function _delete() {
        if (this._item) removeDecorations(this._item);
      }
      /**
       * Set the item in the controller.
       *
       * @param item - The item.
       */

    }, {
      key: "setItem",
      value: function setItem(item) {
        this._item = item;
        addDecoration(this._item, this._instance);
        this._instance = {};
      }
      /**
       * Item getter.
       *
       * @returns - The item.
       */

    }, {
      key: "getItem",
      value: function getItem() {
        invariant(this._item !== null, 'The item has not been setted yet');
        return this._item;
      }
      /**
       * Returns if the item has been setted.
       *
       * @returns - If the item has been setted.
       */

    }, {
      key: "hasItem",
      value: function hasItem() {
        return this._item !== null;
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._item = null;
        this._instance = {};
      }
    }]);

    return ItemRefController;
  }();

  /**
   * CONTROLLER: GRID -> ITEM
   *
   * The purpose of this controller is to find the items to remove
   * based only on the unmount of the ItemComponents.
   */
  var ItemRemoveController = /*#__PURE__*/function () {
    function ItemRemoveController() {
      _classCallCheck(this, ItemRemoveController);

      _defineProperty(this, "_itemsToRemove", []);
    }

    _createClass(ItemRemoveController, [{
      key: "useInit",

      /**
       * Initialize.
       */
      value: function useInit() {
        this._itemsToRemove = [];
      }
      /**
       * Request an item to be removed.
       *
       * @param item - The item to be removed.
       */

    }, {
      key: "removeItem",
      value: function removeItem(item) {
        this._itemsToRemove.push(item);
      }
      /**
       * Return all the items to remove.
       */

    }, {
      key: "getItemsToRemove",
      value: function getItemsToRemove() {
        return this._itemsToRemove;
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._itemsToRemove = [];
      }
    }]);

    return ItemRemoveController;
  }();

  /**
   * CONTROLLER: GRID -> ITEMCONTEXT
   *
   * The purpose of this controller is to synchronize the calculation
   * of the layout following changes that have occurred within an item.
   * If the GridComponent is re-rendering allow to calculate a
   * single layout and greatly optimize the performance.
   */
  var LayoutController = /*#__PURE__*/function () {
    /** The items to refresh. */

    /** The items to show. */

    /** The items to hide. */

    /** If the MuuriComponent parent is rendering. */

    /** Constructor. */
    function LayoutController() {
      _classCallCheck(this, LayoutController);

      _defineProperty(this, "_itemsToRefresh", void 0);

      _defineProperty(this, "_itemsToShow", void 0);

      _defineProperty(this, "_itemsToHide", void 0);

      _defineProperty(this, "_isRendering", void 0);

      this._itemsToRefresh = [];
      this._itemsToShow = [];
      this._itemsToHide = [];
      this._isRendering = false;
    }
    /**
     * Init.
     */


    _createClass(LayoutController, [{
      key: "useInit",
      value: function useInit() {
        var _this = this;

        // Items.
        this._itemsToRefresh = [];
        this._itemsToShow = [];
        this._itemsToHide = []; // State.

        this._isRendering = true; // Change state.
        // eslint-disable-next-line

        React.useEffect(function () {
          _this._isRendering = false;
        });
      }
      /**
       * Refresh an item.
       *
       * @param item - The item to refresh.
       */

    }, {
      key: "refreshItem",
      value: function refreshItem(item) {
        // If the component is rendering within the MuuriComponent.
        if (this._isRendering) {
          // The layout is managed by the MuuriComponent
          // (Performance purpose).
          this._itemsToRefresh.push(item);
        } else {
          // If the item is changing parent this
          // will get the right parent.
          var grid = item.getGrid(); // The layout is managed here.

          grid.refreshItems([item]);
          grid.layout();
        }
      }
      /**
       * Set an item visibility.
       *
       * @param item - The item.
       * @param visible - The visibility.
       * @param instant - If the visibility change should happen without animations.
       */

    }, {
      key: "setItemVisibility",
      value: function setItemVisibility(item, visible, instant) {
        // If the component is rendering within the MuuriComponent.
        if (this._isRendering) {
          // The layout is managed by the MuuriComponent
          // (Performance purpose).
          if (visible) this._itemsToShow.push(item);else this._itemsToHide.push(item);
        } else {
          // If the item is changing parent this
          // will get the right parent.
          var grid = item.getGrid(); // The layout is managed here.

          if (visible) grid.show([item], {
            instant: instant
          });else grid.hide([item], {
            instant: instant
          });
        }
      }
      /**
       * Get the items that have to be refreshed.
       *
       * @returns - The items.
       */

    }, {
      key: "getItemsToRefresh",
      value: function getItemsToRefresh() {
        return this._itemsToRefresh;
      }
      /**
       * Get the items that have to be shown.
       *
       * @returns - The items.
       */

    }, {
      key: "getItemsToShow",
      value: function getItemsToShow() {
        return this._itemsToShow;
      }
      /**
       * Get the items that have to be hidden.
       *
       * @returns - The items.
       */

    }, {
      key: "getItemsToHide",
      value: function getItemsToHide() {
        return this._itemsToHide;
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._itemsToRefresh = [];
        this._itemsToShow = [];
        this._itemsToHide = [];
      }
    }]);

    return LayoutController;
  }();

  /**
   * CONTROLLER: GRID
   *
   * The purpose of this controller is to manage the fiber node of the GridElements.
   * The Fiber nodes allow to manage reparenting and easily access new added items elements.
   */
  var FiberController = /*#__PURE__*/function () {
    function FiberController() {
      _classCallCheck(this, FiberController);

      _defineProperty(this, "_fiber", void 0);

      _defineProperty(this, "_flag", '0');
    }

    _createClass(FiberController, [{
      key: "useInit",

      /**
       * Init the controller given the grid Element ref.
       *
       * @param gridElementRef - the ref of the grid element.
       */
      value: function useInit(gridElementRef) {
        var _this = this;

        this.updateFlag(); // eslint-disable-next-line

        React.useEffect(function () {
          invariant(gridElementRef.current !== null);
          _this._fiber = getFiber(gridElementRef.current);
        }, []); // eslint-disable-line
      }
      /**
       * Return the DOM elements in the chosen positions.
       *
       * @param orderedIndices - The positions.
       * @returns - The elements.
       */

    }, {
      key: "getStateNodes",
      value: function getStateNodes(orderedIndices) {
        var stateNodes = []; // If there aren't indices retun an empty array.

        if (orderedIndices.length === 0) return stateNodes; // The first child.

        var child = getCurrentFiber(this._fiber, this._flag).child; // Fill the state nodes array.
        // We trust that the user input.

        orderedIndices.forEach(function (index) {
          // @ts-ignore
          while (child.index !== index) {
            // @ts-ignore
            child = child.sibling;
          } // @ts-ignore


          stateNodes.push(getStateNode(child));
        });
        return stateNodes;
      }
      /**
       * Append an itemComponent fiber
       * (the same is done for the alternate if exists).
       *
       * @param child - The item.
       */

    }, {
      key: "append",
      value: function append(itemComponentFiber) {
        // Get the current fiber.
        var fiber = getCurrentFiber(this._fiber, this._flag); // Append the fiber.

        appendFiber(fiber, itemComponentFiber);

        if (fiber.alternate) {
          if (itemComponentFiber.alternate) {
            // Append the alternate.
            appendFiber(fiber.alternate, itemComponentFiber.alternate);
          }
        }
      }
      /**
       * Remove an itemComponent fiber given the key of its Item
       * (The same is done for the alternate if exists).
       *
       * @param key - The key of the item.
       * @returns - The removed item.
       */

    }, {
      key: "remove",
      value: function remove(key) {
        // Get the current fiber.
        var fiber = getCurrentFiber(this._fiber, this._flag); // Remove the fiber.

        var removedChild = removeChild(fiber, key);

        if (fiber.alternate) {
          if (removedChild.alternate) {
            // Remove the alternate.
            removeChild(fiber.alternate, key);
          }
        }

        return removedChild;
      }
      /**
       * Return the props containing the flag value to add in the grid element.
       *
       * @returns - The props.
       */

    }, {
      key: "getFlagProp",
      value: function getFlagProp() {
        return _defineProperty({}, FlagProp, this._flag);
      }
      /**
       * Update the flag value.
       */

    }, {
      key: "updateFlag",
      value: function updateFlag() {
        if (this._flag === '0') this._flag = '1';else this._flag = '0';
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        // @ts-ignore
        this._fiber = null;
      }
    }]);

    return FiberController;
  }();
  /**
   * The flag prop name.
   */

  var FlagProp = 'muuri-react-flag';
  /**
   * Get the fiber of the given grid element.
   *
   * @param grid - The element.
   * @return - The fiber node.
   */

  function getFiber(grid) {
    var key = Object.keys(grid).find(function (key) {
      return key.startsWith('__reactInternalInstance$');
    });
    invariant(typeof key === 'string', 'Cannot find the __reactInternalInstance$'); // @ts-ignore

    return grid[key];
  }
  /**
   * Return the current fiber.
   * Try to use the prop flag for the search first,
   * if this is not possible try the RootFiber.
   * The research on the flag is carried out because it is more
   * performing than the second and because if the React team
   * decides to change the functioning of the RootFiber,
   * not all features will stop working.
   * (It is rare for this to happen in the current version 16.x.x,
   * but if it does, it would not be a breacking change.)
   *
   * @param fiber - The fiber.
   * @param flag - the flag.
   * @returns - The current fiber.
   */


  function getCurrentFiber(fiber, currentFlag) {
    if (!fiber.alternate) return fiber; // Flags.

    var fiberFlag = fiber.memoizedProps[FlagProp];
    var alternateFlag = fiber.alternate.memoizedProps[FlagProp]; // If the two flags are the same it should mean that
    // in at least one of the items there has been a re-render
    // from the last render of the GridComponent.
    // We can no longer trust the flag prop and we have
    // to look for the RootFiber and check which
    // fiber is in the current tree.

    if (fiberFlag === alternateFlag) {
      var topFiber = fiber; // Get the top fiber
      // (Not the RootFiber).

      while (topFiber["return"]) {
        topFiber = topFiber["return"];
      } // Fibers.


      var rootFiber = topFiber.stateNode;
      var topCurrentFiber = rootFiber.current; // The current fiber.

      return topCurrentFiber === topFiber ? fiber : fiber.alternate;
    } // If we got here we can trust the flag prop to find the current Fiber.


    return fiberFlag === currentFlag ? fiber : fiber.alternate;
  }
  /**
   * Returns the first stateNode among the descendants
   * of the given itemComponent Fiber.
   *
   * @param itemComponentFiber - The fiber.
   * @returns - The element.
   */


  function getStateNode(itemComponentFiber) {
    // ItemComponent -> ItemProvider -> Item.
    var itemFiber = itemComponentFiber.child.child; // @ts-ignore

    while (!(itemFiber.stateNode instanceof HTMLElement)) {
      // @ts-ignore
      itemFiber = itemFiber.child;
    }

    return itemFiber.stateNode;
  }
  /**
   * Append the child fiber in the last position among the children of the parent fiber.
   *
   * @param parent - The parent fiber.
   * @param child - The child fiber.
   */


  function appendFiber(parent, child) {
    var _parent$return;

    if (!parent.child) {
      // If it has no child.
      parent.child = child;
      child.index = 0;
    } else {
      var c = parent.child;

      while (c.sibling) {
        c = c.sibling;
      }

      child.index = c.index + 1; // Inserted as last child.

      c.sibling = child;
    } // Update the references.


    child["return"] = parent; // If we are in development.

    if (child._debugOwner) child._debugOwner = (_parent$return = parent["return"]) === null || _parent$return === void 0 ? void 0 : _parent$return["return"];
  }
  /**
   * Remove a child with the given key from the fiber.
   *
   * @param parent - The fiber.
   * @param key - The key of the item.
   * @return - The removed fiber.
   */


  function removeChild(parent, key) {
    var child = parent.child;
    var removedChild; // @ts-ignore

    if (hasNot(child, key)) {
      // @ts-ignore
      while (hasNot(child.sibling, key)) {
        // @ts-ignore
        child = child.sibling;
      } // @ts-ignore


      removedChild = removeSibling(child); // @ts-ignore

      adjustIndices(child);
    } else {
      removedChild = removeFirstChild(parent); // @ts-ignore

      child = child.sibling;
      if (child) adjustIndices(child);
    }

    removedChild.sibling = null;
    return removedChild;
  }
  /**
   * Remove the first itemComponent fiber of a gridELement fiber and return it.
   *
   * @param GridElementFiber - The gridELement fiber.
   * @return - The removed itemComponent fiber.
   */


  function removeFirstChild(gridElementFiber) {
    var removed = gridElementFiber.child; // @ts-ignore

    gridElementFiber.child = gridElementFiber.child.sibling; // @ts-ignore

    return removed;
  }
  /**
   * Remove the first sibling from a itemComponent fiber and return it.
   *
   * @param fiber - The fiber.
   * @return - The removed sibling.
   */


  function removeSibling(fiber) {
    var removed = fiber.sibling; // @ts-ignore

    fiber.sibling = fiber.sibling.sibling; // @ts-ignore

    return removed;
  }
  /**
   * Adjust the indices of the siblings of an itemComponent fiber.
   *
   * @param itemComponentFiber - The itemComponent fiber.
   */


  function adjustIndices(itemComponentFiber) {
    while (itemComponentFiber.sibling) {
      itemComponentFiber.sibling.index = itemComponentFiber.index + 1;
      itemComponentFiber = itemComponentFiber.sibling;
    }
  }
  /**
   * Returns if the itemComponent fiber is not the parent of the item with the given key.
   *
   * @param itemComponentFiber - The itemComponent fiber.
   * @param key - The key of the item.
   * @return - If the itemComponent fiber is not the parent of the item with the given key.
   */


  function hasNot(itemComponentFiber, key) {
    // ItemComponent -> ItemProvider -> Item.
    return itemComponentFiber.child.child.key !== key;
  }

  /**
   * CONTROLLER: GRID
   *
   * The purpose of this controller is to manage children
   * during each render of the component, and provide
   * the indexes of the new children added.
   */
  var ChildrenController = /*#__PURE__*/function () {
    function ChildrenController() {
      _classCallCheck(this, ChildrenController);

      _defineProperty(this, "_oldChildrenArray", []);

      _defineProperty(this, "_children", []);

      _defineProperty(this, "_indicesToAdd", []);

      _defineProperty(this, "_dragCounter", 0);
    }

    _createClass(ChildrenController, [{
      key: "useInit",

      /**
       * Init all the settings given the new children.
       *
       * @param newChildren - the new children.
       */
      value: function useInit(newChildren) {
        // @ts-ignore
        // We need to ensure that the children are in an array.
        var newChildrenArray = React.Children.toArray(newChildren); // The indices to add.

        this._indicesToAdd = getIndicesToAdd(newChildrenArray, this._oldChildrenArray); // The _children will be used to map all
        // the child in the render method.
        // We can't use the ChildrenArray because we need the users
        // key provided in the components and not the escaped one (e.g. .$1).

        this._children = newChildren || [];
        this._oldChildrenArray = newChildrenArray;
      }
      /**
       * Remove a child in the given position and return it.
       *
       * @param index - The index of the child to remove.
       * @returns - The removed child.
       */

    }, {
      key: "remove",
      value: function remove(index) {
        return this._oldChildrenArray.splice(index, 1)[0];
      }
      /**
       * Append a child in the children array.
       *
       * @param child - The child to append.
       */

    }, {
      key: "append",
      value: function append(child) {
        this._oldChildrenArray.push(child);
      }
      /**
       * Returns the ordered array of indices of the added children.
       */

    }, {
      key: "getIndicesToAdd",
      value: function getIndicesToAdd() {
        return this._indicesToAdd;
      }
      /**
       * Map all the children.
       *
       * @param cb - The callback.
       * @returns - The mapped children.
       */

    }, {
      key: "render",
      value: function render(cb) {
        var children = React.Children.map(this._children, function (child) {
          // @ts-ignore
          // there are rare cases where the keys are not indispensable,
          // the user may not choose to use at his own risk.
          return cb(child, child.key);
        }); // Flush the children.

        this.flush();
        return children;
        /**
        // If an item is being dragged we need to ensure
        // that no child is inserted before it.
        return this._dragCounter === 0
          ? children
          : getChildrenInSafePositions(children, this._indicesToAdd);
           */
      }
      /**
       * Increment the drag counter.
       */

    }, {
      key: "incrementDragCounter",
      value: function incrementDragCounter() {
        this._dragCounter += 1;
      }
      /**
       * Decrement the drag counter.
       */

    }, {
      key: "decrementDragCounter",
      value: function decrementDragCounter() {
        this._dragCounter -= 1;
      }
      /**
       * Remove the current children so they can be garbage collected.
       */

    }, {
      key: "flush",
      value: function flush() {
        this._children = [];
      }
      /**
       * Destroy the instance.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this.flush();
      }
    }]);

    return ChildrenController;
  }();
  /**
   * Return an array of positions of the added children.
   * The algorithm is optimized for cases where the order of
   * the items does not change during re-renders (about 100% of cases).
   * The positions are in ascending order.
   *
   * @param newChildren - The new children.
   * @param oldChildren - The old children.
   * @return - The indices.
   */

  function getIndicesToAdd(newChildren, oldChildren) {
    var indicesToAdd = [];
    var oIndex = 0;

    for (var nIndex = 0; nIndex < newChildren.length; nIndex++) {
      // Finde the index.
      var index = findIndex(oldChildren, newChildren[nIndex], oIndex);

      if (index === -1) {
        // If it is not present is a new Child.
        indicesToAdd.push(nIndex);
      } else {
        // If it is present restart the research
        // from the given index.
        oIndex = index;
      }
    }

    return indicesToAdd;
  }
  /**
   * Returns the index of the child in the children array,
   * if it is not present returns -1.
   * The research start from the given 'fromIndex'.
   *
   * @param child - The child to search.
   * @param children - The children.
   * @param fromIndex - The initial index.
   * @returns - The index of the child.
   */

  function findIndex(children, child, fromIndex) {
    fromIndex = fromIndex > children.length ? children.length : fromIndex; // If the heuristics are respected the child will be here.

    for (var index = fromIndex; index < children.length; index++) {
      if (is(child, children[index])) return index;
    } // If the child is here the heuristics are not respected.


    for (var _index = 0; _index < fromIndex; _index++) {
      if (is(child, children[_index])) return _index;
    } // The child is not present.


    return -1;
  }
  /**
   * There would be the risk that a component will be inserted before
   * an item that is being dragged (and that is placed in a drag
   * container that is not the grid element). React would use
   * insertBefore to add the elements and this would cause an error.
   * To avoid this problem, if any item is being dragged,
   * all new components are added at the end so that
   * React uses appendChild to add the elements in the DOM.
   *
   * @param children - The new children to set.
   * @param indicesToAdd - The indices of the added children.
   * @returns - The children in safe postions.
   *
  function getChildrenInSafePositions(
    newChildren: ReactElement[],
    indicesToAdd: number[]
  ): ReactElement[] {
    // Check if there are dragged items.
    if (indicesToAdd.length === 0) return newChildren;

    const addedChildren: ReactElement[] = [];

    // Set the added children.
    indicesToAdd.reverse().forEach((index) => {
      const [newChild] = newChildren.splice(index, 1);
      addedChildren.push(newChild);
    });

    return newChildren.concat(addedChildren);
  }

  /**
   * Return if the components have the same key.
   *
   * @param componentA - The first component.
   * @param componentB - The second component.
   * @returns - If they have the same key.
   */


  function is(componentA, componentB) {
    return componentA.key === componentB.key;
  }

  /**
   * Fill a grid instance:
   *  - Add the sizer element.
   *
   * @param grid - The Muuri instance.
   */
  function fillGrid(grid) {
    var sizerElement = document.createElement('div'); // Keep the element hidden.

    sizerElement.style.visibility = 'hidden';
    sizerElement.style.position = 'absolute'; // Add the class.

    sizerElement.classList.add('grid-sizer'); // Set the element.

    addDecoration(grid, {
      sizerElement: sizerElement
    });
    var gridElement = grid.getElement(); // Insert as first child.

    if (gridElement.children.length === 0) {
      gridElement.appendChild(sizerElement);
    } else {
      gridElement.insertBefore(sizerElement, gridElement.children[0]);
    }
  }

  // Allowed position values.
  var positions = ['relative', 'absolute', 'fixed'];
  /**
   * Fill a grid element:
   * - If it is not position the style.position is setted to "relative".
   * - The CSS "containerClass" is added.
   *
   * It also wrap the className setter to
   * avoid React to remove the standard class
   * of Muuri from the grid.
   *
   * @param gridElement - The element to fill.
   * @param gridClass - The Css class of the grid element.
   */

  function fillGridElement(gridElement, gridClass) {
    var position = getComputedStyle(gridElement).position; // Set the default position.

    if (!positions.includes(position)) {
      gridElement.style.position = positions[0];
    } // Set the grid class.


    gridElement.classList.add(gridClass); // Ensure that the grid class can't be removed.

    var defaultSetAttribute = gridElement.setAttribute.bind(gridElement);

    gridElement.setAttribute = function setAttribute(attribute, value) {
      if (attribute === 'class') {
        var classNames = (gridElement.getAttribute('class') || '').split(' '); // Add the grid class.

        if (!classNames.includes(gridClass)) value = "".concat(value, " ").concat(gridClass);
      }

      defaultSetAttribute(attribute, value);
    };
  }

  /**
   * Fill an item:
   * - Add the _component decoration.
   * - Re-define the _sortData property.
   *
   * @param item - The item to fill.
   */

  function fillItem(item) {
    addDecoration(item, {
      props: {},
      data: {}
    }); // Change the sort data.

    Object.defineProperty(item, '_sortData', {
      get: function get() {
        return this.getData();
      },
      set: function set() {// nothing to do here.
      }
    });
  }

  /**
   * Fill an Item (outer) element:
   * - style.position setted to "absolute".
   *
   * It also wrap the className setter to
   * avoid React to remove the standard classes
   * of Muuri from the item.
   *
   * @param itemElement - The item element to fill.
   * @param itemClasses - The Css classes of the items.
   */
  function fillItemElement(itemElement, itemClasses) {
    itemElement.style.position = 'absolute'; // Ensure that the Css item classes are not removed.

    var defaultSetAttribute = itemElement.setAttribute.bind(itemElement);

    itemElement.setAttribute = function setAttribute(attribute, value) {
      if (attribute === 'class') {
        var classNames = (itemElement.getAttribute('class') || '').split(' ');
        var classNamesToAdd = classNames.filter(function (className) {
          return itemClasses.includes(className);
        }); // Add the Css items classes.

        value = "".concat(value, " ").concat(classNamesToAdd.join(' '));
      }

      defaultSetAttribute(attribute, value);
    };
  }

  /**
   * Replacement for useCallback use case with empty array,
   * it memoize only the first function passed.
   * https://github.com/facebook/react/issues/15278.
   *
   * @param callback - The function to memoize.
   * @returns - The memoized function.
   */

  function useFunction(callback) {
    return React.useRef(callback).current;
  }

  /**
   * Accept a dependencyList and return if it has changed from
   * the previous render.
   *
   * @param dependencyList - The dependencyList.
   * @returns - If the dependencyList is changed from the previous render.
   */

  function useReference(dependencyList) {
    var ref = React.useRef(dependencyList); // If it is the first call return true.

    if (ref.current === dependencyList) return true; // Compare the dependencyLists.

    var didUpdate = compare(ref.current, dependencyList); // Keep the reference of the new one.

    ref.current = dependencyList;
    return didUpdate;
  }
  /**
   * Compare two dependencyLists and return if they are different.
   *
   * @param a - The first dependencyList to compare.
   * @param b - The second dependencyList to compare.
   * @returns - If the 2 dependencyLists are different.
   */

  function compare(a, b) {
    if (a.length !== b.length) return true;

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return true;
    }

    return false;
  }

  /**
   * Like useEffect but run instantly.
   *
   * @param didUpdate - The method to run.
   * @param deps - The dependecies.
   */

  function useInstantEffect(didUpdate, deps) {
    // Deps check.
    var needUpdate = useReference(deps);
    var cleanUpRef = React.useRef(); // Run.

    if (needUpdate) {
      if (cleanUpRef.current) cleanUpRef.current();
      cleanUpRef.current = didUpdate();
    } // Catch unmount.


    React.useEffect(function () {
      return function () {
        if (cleanUpRef.current) cleanUpRef.current();
      };
    }, []);
  }

  /**
   * Replacement for useMemo use case with empty array,
   * it memoize only the first computed value.
   * https://github.com/facebook/react/issues/15278.
   *
   * @param factory - The factory method.
   * @returns - The memoized value.
   */

  function useMemoized(factory) {
    var valueRef = React.useRef();

    if (!valueRef.current) {
      valueRef.current = factory();
    }

    return valueRef.current;
  }

  /**
   * Returns a (memoized) function to re-render
   * the component in which the hook has been called.
   *
   * @returns - The re-render method.
   */

  function useRerender() {
    var setState = React.useState()[1];
    return useFunction(function () {
      setState(Object.create(null));
    });
  }

  /** Interfaces */

  // Item component.
  function ItemComponent(_ref) {
    var child = _ref.children,
        itemClasses = _ref.itemClasses,
        itemAddController = _ref.itemAddController,
        itemRemoveController = _ref.itemRemoveController,
        propsToData = _ref.propsToData,
        itemKey = _ref.itemKey,
        grid = _ref.grid;
    // The store provided doesn't change the reference.
    var store = useMemoized(function () {
      // Create the controllers.
      var eventController = new EventController();
      var itemRefController = new ItemRefController(); // Add the data that won't change.

      itemRefController.set('key', itemKey);
      itemRefController.set('eventController', eventController); // Return the controllers.

      return {
        eventController: eventController,
        itemRefController: itemRefController,
        itemRemoveController: itemRemoveController
      };
    }); // Set the props.

    store.itemRefController.set('props', child.props);
    store.itemRemoveController = itemRemoveController; // Set the data.

    if (propsToData) {
      // Get the data.
      var data = propsToData(child.props); // Must be an object.

      invariant(_typeof(data) === 'object', "The data returned by 'propsToData' must be an object, founded ".concat(_typeof(data))); // Set the data.

      store.itemRefController.set('data', data);
    } // On mount.


    React.useEffect(function () {
      // Request the item.
      itemAddController.requestItem(function (item) {
        fillItem(item); // @ts-ignore

        fillItemElement(item.getElement(), itemClasses);
        store.itemRefController.setItem(item);
      });
      return function () {
        // The item.
        var item = store.itemRefController.getItem();
        invariant(item !== null); // The element.

        var element = item.getElement();
        invariant(element !== undefined); // If the item is going to be unmounted
        // and it is being dragged it have to end the event
        // (Because it could be child of a different DOM element).

        if (item.isDragging()) {
          element.style.display = 'none';
          element.style.visibility = 'hidden'; // @ts-ignore

          if (item._drag) item._drag.destroy();
          grid.getElement().appendChild(element);
        } // Remove the item.


        store.itemRefController["delete"]();
        store.itemRemoveController.removeItem(item); // Destroy the controllers instances.

        store.itemRefController.destroy();
        store.eventController.destroy();
      };
    }, []); // eslint-disable-line
    // Render.

    return /*#__PURE__*/React__default.createElement(ItemProvider, {
      value: store
    }, child);
  } // PropTypes.

  ItemComponent.propTypes = {
    itemAddController: propTypes.object.isRequired,
    itemClasses: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
    propsToData: propTypes.func,
    children: propTypes.element.isRequired,
    grid: propTypes.instanceOf(Muuri).isRequired
  }; // Display name.

  ItemComponent.displayName = 'ItemComponent';

  /**
   * Add the given items in the given positions.
   *
   * @param grid - The grid instance.
   * @param addedDOMItems - The added DOM items.
   * @param indicesToAdd - the positions in which to add the items.
   * @param addOptions - The add options.
   * @param filter - The filter.
   */
  function addItems(grid, addedDOMItems, indicesToAdd, addOptions, filter) {
    for (var i = 0; i < addedDOMItems.length; i++) {
      // Add the items.
      grid.add(addedDOMItems[i], {
        index: indicesToAdd[i],
        layout: false
      });
    } // Show the added items (usefull just if the items are
    // hidden by default and the filter is not setted).


    if (!filter && (addOptions === null || addOptions === void 0 ? void 0 : addOptions.show)) {
      grid.show(grid.getItems(indicesToAdd), {
        layout: false
      });
    }
  }

  /**
   * Filter the items with the given predicate.
   *
   * @param grid - The grid instance.
   * @param predicate - The filter predicate.
   */
  function filterItems(grid, predicate) {
    grid.filter(function (item) {
      return predicate(item.getData(), item);
    }, {
      layout: false
    });
  }

  /** Class name. */
  var gridClassName = 'containerClass';
  /**
   * Returns the Css class of the grid element.
   *
   * @param grid - The Muuri instance.
   * @returns - The class.
   */

  function getGridClass(grid) {
    // @ts-ignore
    return grid._settings[gridClassName];
  }

  /** Class names. */
  var itemClassNames = ['itemClass', 'itemVisibleClass', 'itemHiddenClass', 'itemPositioningClass', 'itemDraggingClass', 'itemReleasingClass', 'itemPlaceholderClass'];
  /**
   * Returns the items classes.
   *
   * @param grid - The Muuri instance.
   * @returns - The classes.
   */

  function getItemClasses(grid) {
    // @ts-ignore
    return itemClassNames.map(function (className) {
      return grid._settings[className];
    });
  }

  /**
   * Hide the given items.
   *
   * @param grid - The grid instance.
   * @param items - The items to hide.
   */
  function hideItems(grid, items) {
    grid.hide(items, {
      layout: false
    });
  }

  /**
   * Remove the given items.
   *
   * @param grid - The grid instance.
   * @param itemsToRemove - The items to remove.
   */
  function removeItems(grid, itemsToRemove) {
    grid.remove(itemsToRemove, {
      layout: false,
      removeElements: false
    });
  }

  /**
   * Show the given items.
   *
   * @param grid - The grid instance.
   * @param items - The items to show.
   */
  function showItems(grid, items) {
    grid.show(items, {
      layout: false
    });
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  /**
   * Sort the items.
   *
   * @param grid - The grid instance.
   * @param predicate - The sort predicate.
   * @param sortOptions - The sort options.
   */
  function sortItems(grid, predicate, sortOptions) {
    // Disable the layout.
    // @ts-ignore
    sortOptions = _objectSpread$1({}, sortOptions || {}, {
      layout: false
    }); // Handle a function.

    if (typeof predicate === 'function') {
      handleFunction(grid, predicate, sortOptions);
    } // Handle a string.


    if (typeof predicate === 'string') {
      handleString(grid, predicate, sortOptions);
    } // Hanndle an array of keys.


    if (Array.isArray(predicate)) {
      handleArray(grid, predicate, sortOptions);
    }
  }
  /**
   * Sort the items given a predicate function.
   *
   * @param grid - The grid instance.
   * @param predicate - The predicate function.
   * @param sortOptions - The sort options.
   */

  function handleFunction(grid, predicate, sortOptions) {
    grid.sort(function (itemA, itemB) {
      return predicate(itemA.getData(), itemB.getData(), itemA, itemB);
    }, sortOptions);
  }
  /**
   * Sort the items given a predicate string.
   *
   * @param grid - The grid instance.
   * @param predicate - The predicate string.
   * @param sortOptions - The sort options.
   */


  function handleString(grid, predicate, sortOptions) {
    grid.sort(predicate, sortOptions);
  }
  /**
   * Sort the items given an array of keys.
   * If the key has a match, the item is inserted in that position, otherwise at the bottom.
   *
   * @param grid - The grid instance.
   * @param predicate - The array of keys.
   * @param sortOptions - The sort options.
   */


  function handleArray(grid, predicate, sortOptions) {
    var items = grid.getItems(); // Items that can be sorted.

    var sortedItems = []; // Items that can't be sorted.

    var otherItems = []; // Fills the arrays.

    items.forEach(function (item) {
      var itemKey = item._component.key;
      var index = predicate.findIndex(function (key) {
        return key === itemKey;
      });

      if (index > -1) {
        sortedItems[index] = item;
      } else {
        otherItems.push(item);
      }
    }); // Sort.

    grid.sort(Array.prototype.concat( // Some position can be empty.
    sortedItems.filter(function (item) {
      return !!item;
    }), otherItems), sortOptions);
  }

  /* Interfaces */

  // Grid component.
  function GridComponent(_ref) {
    var children = _ref.children,
        gridProps = _ref.gridProps,
        grid = _ref.grid,
        filter = _ref.filter,
        sort = _ref.sort,
        sortOptions = _ref.sortOptions,
        addOptions = _ref.addOptions,
        propsToData = _ref.propsToData,
        onSend = _ref.onSend,
        onDragStart = _ref.onDragStart,
        onDragEnd = _ref.onDragEnd,
        onFilter = _ref.onFilter,
        onSort = _ref.onSort,
        onMount = _ref.onMount,
        onUnmount = _ref.onUnmount,
        forceSync = _ref.forceSync,
        dragFixed = _ref.dragFixed,
        dragEnabled = _ref.dragEnabled,
        instantLayout = _ref.instantLayout;

    /* ------------------ */

    /* ----- STORES ----- */

    /* ------------------ */
    // Store references of objects
    // generated in previous renders.
    var store = useMemoized(function () {
      return {
        // Grid and items data.
        gridRef:
        /*      */
        React.createRef(),
        gridClass:
        /*    */
        getGridClass(grid),
        itemClasses:
        /*  */
        getItemClasses(grid),
        // Controllers.
        childrenController:
        /*    */
        new ChildrenController(),
        fiberController:
        /*       */
        new FiberController(),
        itemAddController:
        /*     */
        new ItemAddController(),
        itemRemoveController:
        /*  */
        new ItemRemoveController(),
        layoutController:
        /*      */
        new LayoutController(),
        // Events.
        onUnmount: onUnmount,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        onFilter: onFilter,
        onSort: onSort,
        onSend: onSend
      };
    }); // Store references of objects
    // that are used inside useEffect.
    // The references are flushed on each new render.

    var vars = {
      // Items data.
      indicesToAdd:
      /*   */
      [],
      addedDOMItems:
      /*  */
      [],
      itemsToRemove:
      /*  */
      [],
      itemsToRefresh:
      /* */
      [],
      itemsToShow:
      /*    */
      [],
      itemsToHide:
      /*    */
      [],
      // Items flags.
      hasAdded:
      /*      */
      false,
      hasRemoved:
      /*    */
      false,
      hasFiltered:
      /*   */
      false,
      hasSorted:
      /*     */
      false,
      hasRefreshed:
      /*  */
      false,
      hasShown:
      /*      */
      false,
      hasHidden:
      /*     */
      false
    };
    /* ----------------- */

    /* ----- MOUNT ----- */

    /* ----------------- */
    // Initialize the grid on mount.

    React.useEffect(function () {
      /* ------------------ */

      /* ----- EVENTS ----- */

      /* ------------------ */
      // Add all the event handlers.
      grid // "Send" and "receive" events.
      .on('beforeSend', function (_ref2) {
        var item = _ref2.item,
            fromGrid = _ref2.fromGrid,
            fromIndex = _ref2.fromIndex;

        if (!getDecoration(item).sentPayload) {
          // Generate the sentPayload.
          var sentPayload = {
            fromChildrenController: store.childrenController,
            fromFiberController: store.fiberController,
            fromGrid: fromGrid,
            fromIndex: fromIndex
          }; // Add the decoration.

          addDecoration(item, {
            sentPayload: sentPayload
          });
        }
      }).on('receive', function (_ref3) {
        var item = _ref3.item,
            toGrid = _ref3.toGrid,
            toIndex = _ref3.toIndex;
        // Controllers.
        var toChildrenController = store.childrenController;
        var toFiberController = store.fiberController; // If the method is activated by user interaction (the item is being dragged)
        // the synchronization will be performed during the "dragEnd" event.
        // If the method is called via Muuri's instance (the item is not being dragged)
        // the synchronization takes place here, but the onSend callback is not fired.

        if (item.isDragging()) {
          // Generate the receivedPayload.
          var receivedPayload = {
            toChildrenController: toChildrenController,
            toFiberController: toFiberController,
            toGrid: toGrid,
            toIndex: toIndex
          }; // Add the decoration.

          addDecoration(item, {
            receivedPayload: receivedPayload
          });
        } else {
          // Payloads data.
          var sentPayload = getDecoration(item).sentPayload; // The payload must have been created in the send method.

          invariant(sentPayload !== null && _typeof(sentPayload) === 'object'); // Controllers.

          var fromChildrenController = sentPayload.fromChildrenController,
              fromFiberController = sentPayload.fromFiberController; // Remove the payload.

          addDecoration(item, {
            sentPayload: null
          }); // Remove the item instances from the old GridComponent.

          var itemFiber = fromFiberController.remove(item.getKey());
          var itemComponent = fromChildrenController.remove(itemFiber.index); // Add the item instances to the new GridComponent.

          toFiberController.append(itemFiber);
          toChildrenController.append(itemComponent);
        } // Emit the "send" event.


        getDecoration(item).eventController.emitEvent('send', grid);
      }) // Drag events.
      .on('dragInit', function (item, event) {
        // The childrenController must change the positions of
        // the newly added components if any items are being
        // dragged to add the safely.
        store.childrenController.incrementDragCounter(); // Emit the "drag" event.
        // This event is used instead of "dragStart" to allow the
        // reRender of the component when the item is not inside
        // the dragContainer, this makes it possible to change
        // the style of the element safely (e.g. using relative dimensions).

        getDecoration(item).eventController.emitEvent('drag', true); // "onDragStart" Callback.

        if (store.onDragStart) store.onDragStart(item, event);
      }).on('dragEnd', function (item) {
        // Payloads.
        var sentPayload = getDecoration(item).sentPayload;
        var receivedPayload = getDecoration(item).receivedPayload; // If an item was sent during the drag the
        // GridComponents are synchronized.

        if (sentPayload && receivedPayload) {
          // SentPayload data.
          var fromChildrenController = sentPayload.fromChildrenController,
              fromFiberController = sentPayload.fromFiberController,
              fromGrid = sentPayload.fromGrid,
              fromIndex = sentPayload.fromIndex; // ReceivedPayload data.

          var toChildrenController = receivedPayload.toChildrenController,
              toFiberController = receivedPayload.toFiberController,
              toGrid = receivedPayload.toGrid,
              toIndex = receivedPayload.toIndex; // Reset the payloads.

          addDecoration(item, {
            sentPayload: null,
            receivedPayload: null
          }); // Check if the item has been sended.

          if (fromGrid !== toGrid) {
            // "onSend" will be called with the receive event.
            invariant(typeof store.onSend === 'function', 'An item cannot be sent to another MuuriComponent if the ' + "'onSend' property has not been passed to the MuuriComponent."); // Remove the item instances from the old GridComponent.

            var itemFiber = fromFiberController.remove(item.getKey());
            var itemComponent = fromChildrenController.remove(itemFiber.index); // Add the item instances to the new GridComponent.

            toFiberController.append(itemFiber);
            toChildrenController.append(itemComponent); // "onSend" callback.
            // DragEnd is called in the grid where
            // the drag start, so onSend.

            store.onSend({
              // The key the user has set.
              key: getDecoration(item).key,
              // From.
              fromGrid: fromGrid,
              fromIndex: fromIndex,
              fromId: getDecoration(fromGrid).id,
              fromGroupIds: getDecoration(fromGrid).groupIds,
              // To.
              toGrid: toGrid,
              toIndex: toIndex,
              toId: getDecoration(toGrid).id,
              toGroupIds: getDecoration(toGrid).groupIds
            });
          }
        }
      }).on('dragReleaseEnd', function (item) {
        // The childrenController must change the positions of
        // the newly added components if any items are being
        // dragged to add the safely.
        store.childrenController.decrementDragCounter(); // Emit the event.
        // This event is used instead of "dragEnd" to allow the
        // reRender of the component when the item is not inside
        // the dragContainer, this makes it possible to change
        // the style of the element safely (e.g. using relative dimensions).

        getDecoration(item).eventController.emitEvent('drag', false); // Call the event.

        if (store.onDragEnd) store.onDragEnd(item);
      }) // Show and hide events.
      .on('showStart', function (items) {
        // The items could be shown before they are decorated.
        if (!isDecorated(items[0])) return; // Emit the event.

        items.forEach(function (item) {
          var eventController = getDecoration(item).eventController; // The event is triggered also for items that have not
          // changed their "visibility" state.
          // This check is done to avoid useless re-rendering.

          if (eventController.getPayload('show') !== true) {
            eventController.emitEvent('show', true);
          }
        });
      }).on('hideEnd', function (items) {
        // Emit the event.
        items.forEach(function (item) {
          var eventController = getDecoration(item).eventController; // The event is triggered also for items that have not
          // changed their "visibility" state.
          // This check is done to avoid useless re-rendering.

          if (eventController.getPayload('show') !== false) {
            eventController.emitEvent('show', false);
          }
        });
      }) // Filter and sort events.
      .on('filter', function (shownItems, hiddenItems) {
        if (store.onFilter) store.onFilter(shownItems, hiddenItems);
      }).on('sort', function (currentOrder, previousOrder) {
        if (store.onSort) store.onSort(currentOrder, previousOrder);
      }); // Fix the dimensions of the items when they are dragged.

      if (dragFixed) {
        grid.on('dragInit', function (item) {
          // Let's set fixed widht/height to the dragged item
          // so that it does not stretch unwillingly when
          // it's appended to the document body for the
          // duration of the drag.
          var element = item.getElement(); // The element must exist.

          invariant(element !== undefined); // Get the computed dimensions.

          var _getComputedStyle = getComputedStyle(element),
              width = _getComputedStyle.width,
              height = _getComputedStyle.height,
              paddingTop = _getComputedStyle.paddingTop; // Save the previous style in case it was setted.


          addDecoration(item, {
            dragWidth: element.style.width,
            dragHeight: element.style.height,
            dragPaddingTop: element.style.paddingTop
          }); // Set the new style.

          element.style.width = width;
          element.style.height = height;
          element.style.paddingTop = paddingTop;
        }).on('dragReleaseEnd', function (item) {
          // Let's remove the fixed width/height from the
          // dragged item now that it is back in a grid
          // column and can freely adjust to it's
          // surroundings.
          var element = item.getElement(); // The element must exist.

          invariant(element !== undefined); // Get the old style.

          var _getDecoration = getDecoration(item),
              dragWidth = _getDecoration.dragWidth,
              dragHeight = _getDecoration.dragHeight,
              dragPaddingTop = _getDecoration.dragPaddingTop; // Restore the previous style in case it was setted.


          element.style.width = dragWidth;
          element.style.height = dragHeight;
          element.style.paddingTop = dragPaddingTop;
        });
      }
      /* ---------------- */

      /* ----- GRID ----- */

      /* -----------------*/
      // Check .


      invariant(store.gridRef.current !== null); // Work with the grid.
      // @ts-ignore

      grid._element = store.gridRef.current;
      fillGridElement(store.gridRef.current, store.gridClass);
      fillGrid(grid); // "onMount" Callback.

      if (onMount) onMount(grid); // Delete the instance from the global map.

      return function () {
        // Destroy the controllers.
        store.childrenController.destroy();
        store.fiberController.destroy();
        store.itemRemoveController.destroy();
        store.itemAddController.destroy();
        store.layoutController.destroy();
      };
    }, []); // eslint-disable-line

    /* ---------------- */

    /* ----- INIT ----- */

    /* -----------------*/
    // Init the controllers.

    store.childrenController.useInit(children);
    store.fiberController.useInit(store.gridRef);
    store.itemRemoveController.useInit();
    store.itemAddController.useInit();
    store.layoutController.useInit(); // IsChanged flags.

    var isFilterChanged = useReference([filter]);
    var isSortChanged = useReference([sort, sortOptions]); // Get items to add/remove.

    React.useEffect(function () {
      // Set drag enabled option.
      addDecoration(grid, {
        dragEnabled: dragEnabled
      }); // Set the items data.

      vars.indicesToAdd = store.childrenController.getIndicesToAdd();
      vars.addedDOMItems = store.fiberController.getStateNodes(vars.indicesToAdd);
      vars.itemsToRemove = store.itemRemoveController.getItemsToRemove();
      vars.itemsToRefresh = store.layoutController.getItemsToRefresh();
      vars.itemsToShow = store.layoutController.getItemsToShow();
      vars.itemsToHide = store.layoutController.getItemsToHide(); // This will remove lot of the implementation
      // problems for the user.

      store.onUnmount = onUnmount;
      store.onDragStart = onDragStart;
      store.onDragEnd = onDragEnd;
      store.onFilter = onFilter;
      store.onSort = onSort;
      store.onSend = onSend;
    });
    /* ------------------- */

    /* ----- ACTIONS ----- */

    /* ------------------- */

    React.useEffect(function () {
      /* ---------------------- */

      /* ---- ADD & REMOVE ---- */

      /* ---------------------- */
      // Remove items.
      if (vars.itemsToRemove.length) {
        removeItems(grid, vars.itemsToRemove); // Set the flag.

        vars.hasRemoved = true;
      } // Add items after the old ones are removed
      // to add them in the right positions.


      if (vars.indicesToAdd.length) {
        addItems(grid, vars.addedDOMItems, vars.indicesToAdd, addOptions, filter); // New Items.

        var addedItems = grid.getItems(vars.indicesToAdd); // Emit the new items to the itemComponents.

        store.itemAddController.emit(addedItems); // Set the flag.

        vars.hasAdded = true;
      }
      /* ------------------------- */

      /* ----- SORT & FILTER ----- */

      /* ------------------------- */
      // Filter items.


      if (filter && (isFilterChanged || vars.hasAdded || forceSync)) {
        filterItems(grid, filter); // Set the flag.

        vars.hasFiltered = true;
      } // Sort items.


      if (sort && (isSortChanged || vars.hasAdded || forceSync)) {
        sortItems(grid, sort, sortOptions); // Set the flag.

        vars.hasSorted = true;
      }
      /* ----------------------- */

      /* ----- SHOW & HIDE ----- */

      /* ----------------------- */
      // Filter has priority on the items visibility.


      if (!filter && vars.itemsToShow.length) {
        showItems(grid, vars.itemsToShow); // Set the flag.

        vars.hasShown = true;
      } // Filter has priority on the items visibility.


      if (!filter && vars.itemsToHide.length) {
        hideItems(grid, vars.itemsToHide); // Set the flag.

        vars.hasHidden = true;
      }
      /* ------------------- */

      /* ----- REFRESH ----- */

      /* ------------------- */
      // Items with dimensions to refresh.


      if (vars.itemsToRefresh.length) {
        grid.refreshItems(vars.itemsToRefresh); // Set the flag.

        vars.hasRefreshed = true;
      }
      /* ------------------ */

      /* ----- LAYOUT ----- */

      /* ------------------ */
      // Layout is calculated only in the end.
      // Check the previous flags.


      if (vars.hasAdded || vars.hasRemoved || vars.hasSorted || vars.hasFiltered || vars.hasRefreshed || vars.hasShown || vars.hasHidden) {
        grid.layout(instantLayout);
      }
    });
    /* ------------------ */

    /* ----- RENDER ----- */

    /* ------------------ */
    // Provided value doesn't change the reference.

    var value = useMemoized(function () {
      return {
        layoutController: store.layoutController,
        grid: grid
      };
    }); // render.

    return /*#__PURE__*/React__default.createElement(GridProvider, {
      value: value
    }, /*#__PURE__*/React__default.createElement("div", _extends({}, gridProps, {
      ref: store.gridRef
    }, store.fiberController.getFlagProp()), store.childrenController.render(function (child, key) {
      return /*#__PURE__*/React__default.createElement(ItemComponent, {
        key: key,
        itemKey: key,
        grid: grid,
        propsToData: propsToData,
        itemClasses: store.itemClasses,
        itemAddController: store.itemAddController,
        itemRemoveController: store.itemRemoveController
      }, child);
    })));
  } // Proptypes.

  GridComponent.propTypes = {
    grid: propTypes.object.isRequired,
    gridProps: propTypes.object,
    filter: propTypes.oneOfType([propTypes.string, propTypes.func]),
    sort: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.arrayOf(propTypes.string)]),
    sortOptions: propTypes.exact({
      descending: propTypes.bool
    }),
    addOptions: propTypes.exact({
      show: propTypes.bool
    }),
    onSend: propTypes.func,
    onDragStart: propTypes.func,
    onDragEnd: propTypes.func,
    onFilter: propTypes.func,
    onSort: propTypes.func,
    onMount: propTypes.func,
    onUnmount: propTypes.func,
    forceSync: propTypes.bool,
    dragFixed: propTypes.bool,
    dragEnabled: propTypes.bool,
    instantLayout: propTypes.bool
  }; // Default props.

  GridComponent.defaultProps = {
    gridProps: {},
    addOptions: {
      show: true
    },
    sortOptions: {
      descending: false
    },
    forceSync: false,
    dragFixed: false,
    dragEnabled: false,
    instantLayout: false
  }; // Display name.

  GridComponent.displayName = 'GridComponent';

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  /**
   * Map that links the Muuri instances to
   * their id and group ids.
   */
  var MuuriMap = /*#__PURE__*/function () {
    function MuuriMap() {
      _classCallCheck(this, MuuriMap);

      _defineProperty(this, "_idMap", new Map());

      _defineProperty(this, "_groupMap", new Map());
    }

    _createClass(MuuriMap, [{
      key: "get",

      /**
       * Get the grid instance with the chosen id.
       *
       * @param id - The id.
       * @returns - The grid instance.
       */
      value: function get(id) {
        return this._idMap.get(id) || null;
      }
      /**
       * Get all the grid instances in the group of the given id.
       * The reference of the group array never changes.
       *
       * @param groupId - The group id.
       * @returns - The array of grid instances.
       */

    }, {
      key: "getGroup",
      value: function getGroup(groupId) {
        var group = this._groupMap.get(groupId);

        if (!group) {
          var newGroup = [];

          this._groupMap.set(groupId, newGroup);

          return newGroup;
        } else {
          return group;
        }
      }
      /**
       * Get all the grid instances in the map.
       *
       * @returns - The grid instances.
       */

    }, {
      key: "getAll",
      value: function getAll() {
        return Array.from(this._idMap.values());
      }
      /**
       * Set the grid instance with the given id.
       *
       * @param grid - The grid instance.
       * @param id - The id of the instance.
       * @returns - The muuriMap.
       */

    }, {
      key: "set",
      value: function set(grid, id) {
        this._idMap.set(id, grid);

        return this;
      }
      /**
       * Set the grid instance in the group of the given id.
       *
       * @param grid - The grid instance.
       * @param groupId - The id of the group.
       * @returns - The muuriMap.
       */

    }, {
      key: "setGroup",
      value: function setGroup(grid, groupId) {
        var group = this._groupMap.get(groupId);

        if (group) {
          group.push(grid);
        } else {
          this._groupMap.set(groupId, [grid]);
        }

        return this;
      }
      /**
       * Delete the grid instance with the given id.
       *
       * @param id - The id of the instance.
       * @returns - The muuriMap.
       */

    }, {
      key: "delete",
      value: function _delete(id) {
        this._idMap["delete"](id);

        return this;
      }
      /**
       * Delete the instance from the group with the given id.
       *
       * @param grid - The grid instance.
       * @param groupIds - The group ids of the instance.
       */

    }, {
      key: "deleteGroup",
      value: function deleteGroup(grid, groupId) {
        var group = this._groupMap.get(groupId);

        if (group) {
          var index = group.indexOf(grid);
          if (index > -1) group.splice(index, 1);
        }

        return this;
      }
      /**
       * Clear the maps.
       */

    }, {
      key: "clear",
      value: function clear() {
        this._idMap.clear();

        this._groupMap.clear();

        return this;
      }
    }]);

    return MuuriMap;
  }();
  var muuriMap = new MuuriMap();

  /**
   * Generate and returns a muuri instance with the given options.
   *
   * @param options - The options.
   * @returns - The muuri instance.
   */
  function getInstance(options) {
    var el = document.createElement('div'); // The element won't be visible.

    el.style.display = 'none'; // Muuri (0.8.0) need an element in the DOM to be instanciated.

    document.body.appendChild(el); // Generate the instance.

    var grid = new Muuri(el, options); // Remove the element.

    document.body.removeChild(el);
    return grid;
  }

  /**
   * Set the value in the ref.
   *
   * @param ref - The ref.
   * @param value - The value
   */
  function handleRef(ref, value) {
    if (!ref) return;
    if (typeof ref === 'function') ref(value); // @ts-ignore
    else if ('current' in ref) ref.current = value;
  }

  /**
   * Wrap the 'dragAutoScroll' option.
   * Allow the target element to be a ref.
   *
   * @param options - The grid options.
   */
  function setDragAutoScroll(options) {
    var dragAutoScroll = options.dragAutoScroll; // Wrap the options only if it is setted.

    if (!dragAutoScroll || !Array.isArray(dragAutoScroll.targets)) return;
    dragAutoScroll.targets.forEach(function (target) {
      // Check if it is an object to wrap.
      if (isTargetElement(target)) return;
      invariant('element' in target, 'You must provide an element in each scroll target'); // Scroll target element.

      var element = target.element; // The element ref.

      var ref = {
        current: null
      }; // Define the element property.

      Object.defineProperty(target, 'element', {
        get: function get() {
          return ref.current;
        },
        set: function set(element) {
          if (isTargetElement(element)) {
            ref.current = element;
          } else {
            ref = element;
          }
        }
      }); // Set the element.

      target.element = element;
    });
  }
  /**
   * Returns if the target is a valid element.
   *
   * @param element - The target.
   * @returns - If the target is a valid element.
   */

  function isTargetElement(target) {
    return (// A DOM element.
      target instanceof HTMLElement || // The window.
      target instanceof window.constructor
    );
  }

  /**
   * Wrap the 'dragContainer' option.
   * Allow it to be a ref.
   *
   * @param options - The grid options.
   */
  function setDragContainer(options) {
    var dragContainer = options.dragContainer; // The drag container ref.

    var ref = {
      current: null
    }; // Define the property.

    Object.defineProperty(options, 'dragContainer', {
      get: function get() {
        return ref.current;
      },
      set: function set(value) {
        if (!value || value instanceof Element) {
          ref.current = value;
        } else {
          ref = value;
        }
      }
    }); // Set the drag container.

    options.dragContainer = dragContainer;
  }

  /**
   * Wrap the 'dragSort' option.
   * Allow it to be an object containing the groupId of the chosen MuuriComponents.
   *
   * @param options - The grid options.
   * @param globalMap - The globalMap.
   */
  function setDragSort(options, globalMap) {
    var dragSort = options.dragSort; // Parse this options only if it is an object.

    if (!dragSort || _typeof(dragSort) !== 'object') return; // Check the options.

    invariant(typeof dragSort.groupId === 'string', 'You must provide a string as groupId'); // The group, its reference doesn't change.

    var group = globalMap.getGroup(dragSort.groupId); // dragSort method.

    options.dragSort = function () {
      return group;
    };
  }

  /**
   * Wrap the 'dragStartPredicate' option.
   * To allow the drag:
   * - The global drag must be enabled.
   * - The item must be draggable.
   *
   * @param options - The grid options.
   */
  function setDragStartPredicate(options) {
    var dragStartPredicate = options.dragStartPredicate; // Default predicate.

    var defaultStartPredicate = getDefaultStartPredicate(dragStartPredicate); // Wrap the method.

    options.dragStartPredicate = function (item, event) {
      if (!getDecoration(item.getGrid()).dragEnabled) return false;
      if (isDecorated(item) && getDecoration(item).draggable === false) return false;
      return defaultStartPredicate(item, event);
    };
  }
  /**
   * Given the dragStartPredicate option return the default method.
   *
   * @param dragStartPredicate - The dragStartPredicate option.
   * @returns - The defaultStartPredicate method.
   */

  function getDefaultStartPredicate(dragStartPredicate) {
    return typeof dragStartPredicate === 'function' ? dragStartPredicate : function (item, event) {
      return Muuri.ItemDrag.defaultStartPredicate(item, event, dragStartPredicate);
    };
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var MuuriComponent = React.forwardRef(function MuuriComponent(_ref, muuriRef) {
    var children = _ref.children,
        id = _ref.id,
        groupIds = _ref.groupIds,
        gridProps = _ref.gridProps,
        filter = _ref.filter,
        sort = _ref.sort,
        sortOptions = _ref.sortOptions,
        addOptions = _ref.addOptions,
        propsToData = _ref.propsToData,
        onSend = _ref.onSend,
        onDragStart = _ref.onDragStart,
        onDragEnd = _ref.onDragEnd,
        onFilter = _ref.onFilter,
        onSort = _ref.onSort,
        onMount = _ref.onMount,
        onUnmount = _ref.onUnmount,
        forceSync = _ref.forceSync,
        dragFixed = _ref.dragFixed,
        dragEnabled = _ref.dragEnabled,
        instantLayout = _ref.instantLayout,
        options = _objectWithoutProperties(_ref, ["children", "id", "groupIds", "gridProps", "filter", "sort", "sortOptions", "addOptions", "propsToData", "onSend", "onDragStart", "onDragEnd", "onFilter", "onSort", "onMount", "onUnmount", "forceSync", "dragFixed", "dragEnabled", "instantLayout"]);

    // Generate the Muuri instance.
    var grid = useMemoized(function () {
      // Remove the standard option '*'.
      // @ts-ignore
      options.items = []; // Muuri (0.9.0) generate the "ItemDrag" instances only if
      // drag is enabled. These instances do not handle scrolling well on touch devices,
      // so we only create these instances if drag-and-drop have to be used
      // (assuming that a boolean is passed to the prop instead of the default value "null").
      // The enabling / disabling of the drag is managed in dragStartPredicate.
      // @ts-ignore

      options.dragEnabled = dragEnabled !== null; // Allow the drag container to be a React.Ref<HTMLElement>.

      setDragContainer(options); // Allow the option to be an object ({ groupId }).

      setDragSort(options, muuriMap); // Allow the target elements to be React.Ref<HTMLElement>.

      setDragAutoScroll(options); // Allow enabling / disabling the drag-and-drop.

      setDragStartPredicate(options); // Generate the instance.

      var grid = getInstance(options); // Add the instance to the map.

      if (id) muuriMap.set(grid, id); // Add the decoration.

      addDecoration(grid, {
        id: id
      }); // Set the ref.

      handleRef(muuriRef, grid);
      return grid;
    }); // eslint-disable-line
    // On unmount effect.

    React.useEffect(function () {
      // Clean-up.
      return function () {
        // Unset the ref.
        handleRef(muuriRef, null); // Remove the decorations.

        removeDecorations(grid); // Remove the instance from the map.

        if (id) muuriMap["delete"](id); // Destroy the instace

        grid.destroy();
      };
    }, []); // eslint-disable-line
    // Allow the groupIds to be changed.

    useInstantEffect(function () {
      // decorate the instance
      addDecoration(grid, {
        groupIds: groupIds
      }); // Add the instance to the groups.

      if (groupIds) {
        groupIds.forEach(function (groupId) {
          muuriMap.setGroup(grid, groupId);
        });
      } // Clean-up.


      return function () {
        // Remove the instance from the groups.
        if (groupIds) {
          groupIds.forEach(function (groupId) {
            muuriMap.deleteGroup(grid, groupId);
          });
        }
      };
    }, groupIds || []); // Render.

    return /*#__PURE__*/React__default.createElement(GridComponent, {
      grid: grid,
      gridProps: gridProps,
      filter: filter,
      sort: sort,
      sortOptions: sortOptions,
      addOptions: addOptions,
      propsToData: propsToData,
      onSend: onSend,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      onFilter: onFilter,
      onSort: onSort,
      onMount: onMount,
      onUnmount: onUnmount,
      forceSync: forceSync,
      dragFixed: dragFixed,
      dragEnabled: dragEnabled,
      instantLayout: instantLayout
    }, children);
  }); // Proptypes.

  MuuriComponent.propTypes = {
    id: propTypes.string,
    groupIds: propTypes.arrayOf(propTypes.string.isRequired),
    showDuration: propTypes.number,
    showEasing: propTypes.string,
    hideDuration: propTypes.number,
    hideEasing: propTypes.string,
    visibleStyles: propTypes.shape({}),
    hiddenStyles: propTypes.shape({}),
    // @ts-ignore
    layout: propTypes.oneOfType([propTypes.func, propTypes.exact({
      fillGaps: propTypes.bool,
      horizontal: propTypes.bool,
      alignRight: propTypes.bool,
      alignBottom: propTypes.bool,
      rounding: propTypes.bool
    })]),
    layoutOnResize: propTypes.oneOfType([propTypes.bool, propTypes.number]),
    layoutDuration: propTypes.number,
    layoutEasing: propTypes.string,
    dragContainer: propTypes.oneOfType([propTypes.instanceOf(HTMLElement), propTypes.shape({
      current: propTypes.instanceOf(HTMLElement).isRequired
    })]),
    // @ts-ignore
    dragStartPredicate: propTypes.oneOfType([propTypes.func, propTypes.exact({
      distance: propTypes.number,
      delay: propTypes.number,
      handle: propTypes.oneOfType([propTypes.string, propTypes.bool])
    })]),
    dragAxis: propTypes.oneOf(['x', 'y', 'xy']),
    dragSort: propTypes.oneOfType([propTypes.bool, propTypes.func, propTypes.exact({
      groupId: propTypes.string.isRequired
    })]),
    // @ts-ignore
    dragSortHeuristics: propTypes.exact({
      sortInterval: propTypes.number,
      minDragDistance: propTypes.number,
      minBounceBackAngle: propTypes.number
    }),
    // @ts-ignore
    dragSortPredicate: propTypes.oneOfType([propTypes.func, propTypes.exact({
      action: propTypes.oneOf(['move', 'swap']),
      migrateAction: propTypes.oneOf(['move', 'swap']),
      threshold: propTypes.number
    })]),
    // @ts-ignore
    dragRelease: propTypes.exact({
      duration: propTypes.number,
      easing: propTypes.string,
      useDragContainer: propTypes.bool
    }),
    // @ts-ignore
    dragCssProps: propTypes.exact({
      touchAction: propTypes.string,
      userSelect: propTypes.string,
      userDrag: propTypes.string,
      tapHighlightColor: propTypes.string,
      touchCallout: propTypes.string,
      contentZooming: propTypes.string
    }),
    // @ts-ignore
    dragPlaceholder: propTypes.exact({
      enabled: propTypes.bool,
      createElement: propTypes.func,
      onCreate: propTypes.func,
      onRemove: propTypes.func,
      easing: propTypes.string,
      duration: propTypes.number
    }),
    containerClass: propTypes.string,
    itemClass: propTypes.string,
    itemVisibleClass: propTypes.string,
    itemHiddenClass: propTypes.string,
    itemPositioningClass: propTypes.string,
    itemDraggingClass: propTypes.string,
    itemReleasingClass: propTypes.string,
    itemPlaceholderClass: propTypes.string
  }; // Default props.

  MuuriComponent.defaultProps = _objectSpread$2({}, Muuri.defaultOptions, {
    dragEnabled: null
  }); // Display name.

  MuuriComponent.displayName = 'MuuriComponent';

  /**
   * The useData hook allow to set the data to the item in which the hook has been called.
   * It also returns the setter method.
   *
   * @param initialData - The data.
   * @param options - The options.
   * @returns - The setter method.
   */
  function useData(initialData, options) {
    var _useItemContext = useItemContext(),
        itemRefController = _useItemContext.itemRefController; // Check if the hook is called inside an item.


    invariant(itemRefController !== undefined, 'The useData hook can be used only inside an Item'); // Because of memoization, The identity of the function is guaranteed
    // to be stable so it will be safe to omit them as a dependency.

    var setData = useFunction(function (data, options) {
      // Check if the data is an object.
      invariant(_typeof(data) === 'object', "The data must be an object, founded: ".concat(_typeof(data))); // Default options.

      options = options || useData.defaultOptions; // Set the data.

      if (options.merge) {
        // Merge.
        var currentData = itemRefController.get('data') || {};
        itemRefController.set('data', Object.assign(currentData, data));
      } else {
        // Set.
        itemRefController.set('data', data);
      }
    }); // Set the inital data.

    if (_typeof(initialData) === 'object') {
      setData(initialData, options);
    }

    return setData;
  } // Default options.

  useData.defaultOptions = {
    merge: false
  };

  /**
   * The useDrag hook re-render item (in which the hook has been called)
   * Every time it is dragged/released.
   * The hook returns if the item is being dragged.
   *
   * @returns - If the item is being dragged.
   */

  function useDrag() {
    var _useItemContext = useItemContext(),
        eventController = _useItemContext.eventController;

    var reRender = useRerender(); // Check if the hook is called inside an item.

    invariant(eventController !== undefined, 'The useDrag hook can be used only inside an Item'); // Enable the event.

    React.useEffect(function () {
      eventController.enableEvent('drag', reRender);
    }, [eventController, reRender]);
    return eventController.getPayload('drag') || false;
  }

  /**
   * The useDraggable hook allow to decide if the item (in which the hook has been called)
   * can be dragged or not.
   * It returns the setter method.
   *
   * @returns - The setter method.
   */
  function useDraggable() {
    var _useItemContext = useItemContext(),
        itemRefController = _useItemContext.itemRefController; // Check if the hook is called inside an item.


    invariant(itemRefController !== undefined, 'The useData hook can be used only inside an Item');
    var setDraggable = useFunction(function (draggable) {
      // Set if the item can be dragged.
      itemRefController.set('draggable', !!draggable);
    });
    return setDraggable;
  }

  /**
   * The useGrid hook return the data of the MuuriComponent parent of the
   * item (in which the hook has been called).
   *
   * @returns - The data of the MuuriComponent.
   */
  function useGrid() {
    var _useItemContext = useItemContext(),
        eventController = _useItemContext.eventController;

    var gridContext = useGridContext();
    var reRender = useRerender(); // Check if the hook is called inside an item.

    invariant(eventController !== undefined && gridContext.grid !== undefined, 'The useData hook can be used only inside an Item'); // The context is not updated when the hook is trigger
    // so we need to get the updated instance from the eventController.

    var grid = eventController.getPayload('send') || gridContext.grid; // Enable the event.

    React.useEffect(function () {
      eventController.enableEvent('send', reRender);
    }, [eventController, reRender]);
    return {
      id: grid._component.id,
      groupIds: grid._component.groupIds,
      grid: grid
    };
  }

  /**
   * The useRefresh hook allow to notify the MuuriComponent that the
   * item dimensions are changed, so that it can update the layout.
   *
   * @param deps - The dependencies.
   * @returns - The refresh method.
   */
  function useRefresh() {
    var deps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _useGridContext = useGridContext(),
        layoutController = _useGridContext.layoutController;

    var _useItemContext = useItemContext(),
        itemRefController = _useItemContext.itemRefController; // Check if the hook is called inside an item.


    invariant(itemRefController !== undefined && layoutController !== undefined, 'The useRefresh hook can be used only inside an Item'); // Because of memoization, The identity of the function is guaranteed
    // to be stable so it will be safe to omit it as a dependency.

    var refresh = useFunction(function () {
      if (!itemRefController.hasItem()) return; // Get the item.

      var item = itemRefController.getItem(); // If the component is rendering within the MuuriComponent.

      layoutController.refreshItem(item);
    });
    React.useEffect(function () {
      refresh();
    }, deps); // eslint-disable-line

    return refresh;
  }

  /**
   * The useShow hook allow you to know if the item is showing.
   * The item will re-render each time its visibility change.
   *
   * @returns - If the item is showing.
   */

  function useShow() {
    var _useItemContext = useItemContext(),
        eventController = _useItemContext.eventController;

    var reRender = useRerender(); // Check if the hook is called inside an item.

    invariant(eventController !== undefined, 'The useShow hook can be used only inside an Item'); // Enable the event.

    React.useEffect(function () {
      eventController.enableEvent('show', reRender);
    }, [eventController, reRender]);
    return eventController.getPayload('show');
  }

  /**
   * The useVisibility hook allow you to show/hide the item in which the hook has been called.
   *
   * @returns - The setter method.
   */
  function useVisibility() {
    var _useGridContext = useGridContext(),
        layoutController = _useGridContext.layoutController;

    var _useItemContext = useItemContext(),
        eventController = _useItemContext.eventController,
        itemRefController = _useItemContext.itemRefController; // Check if the hook is called inside an item.


    invariant(itemRefController !== undefined && layoutController !== undefined && eventController !== undefined, 'The useData hook can be used only inside an Item'); // Set visibility.

    var setVisibility = useFunction(function (visible, options) {
      if (!itemRefController.hasItem()) return;
      if (!!visible === eventController.getPayload('show')) return; // Default options.

      options = options || useVisibility.defaultOptions; // Set the visibility.

      layoutController.setItemVisibility(itemRefController.getItem(), visible, options.instant === true);
    });
    return setVisibility;
  } // Default options.

  useVisibility.defaultOptions = {
    instant: false
  };

  var hooks = /*#__PURE__*/Object.freeze({
    __proto__: null,
    useData: useData,
    useDrag: useDrag,
    useDraggable: useDraggable,
    useGrid: useGrid,
    useRefresh: useRefresh,
    useShow: useShow,
    useVisibility: useVisibility
  });

  /** Responsive style options. */

  /**
   * Get the responsive style.
   *
   * @param options - The options.
   * @returns - The style.
   */
  function getResponsiveStyle(options) {
    // Check options.
    invariant(_typeof(options) === 'object', 'You must define options'); // Check columns.

    invariant(typeof options.columns === 'number' && options.columns > 0 && options.columns <= 1, 'options.columns must be a number between 0 (excluded) and 1 (included)'); // Check height and ratio.

    invariant(typeof options.ratio === 'number' || typeof options.height === 'number' || typeof options.height === 'string', 'You must provide at least one option between height and ratio'); // Check that the height and the ratio options are not setted togheter.

    invariant(typeof options.ratio !== 'number' || typeof options.height !== 'number' && typeof options.height !== 'string', 'You cannot provide both the height and the ratio options'); // The margin values.

    var _getResponsiveMargin = getResponsiveMargin(options.margin || '0px'),
        margin = _getResponsiveMargin.margin,
        mStatic = _getResponsiveMargin.mStatic,
        mDynamic = _getResponsiveMargin.mDynamic; // The item width.


    var _getResponsiveWidth = getResponsiveWidth(options.columns, mStatic, mDynamic),
        needCalc = _getResponsiveWidth.needCalc,
        width = _getResponsiveWidth.width; // If ratio is used set The paddingTop
    // instad of the heght, the child element must
    // have "display: absolute".


    return options.ratio ? {
      width: needCalc ? "calc(".concat(width, ")") : width,
      paddingTop: getResponsivePaddingTop(width, options.ratio, needCalc),
      height: "0px",
      borderWidth: '0px',
      margin: margin
    } : {
      width: needCalc ? "calc(".concat(width, ")") : width,
      paddingTop: "0px",
      // @ts-ignore
      height: getFixedHeight(options.height),
      borderWidth: '0px',
      margin: margin
    };
  }
  /**
   * Get the responsive width.
   *
   * @param columns - The percentage.
   * @param mStatic - The static margin.
   * @param mDynamic - The dynamic margin.
   * @returns - The width.
   */

  function getResponsiveWidth(columns, mStatic, mDynamic) {
    var needCalc = mStatic !== 0;
    var rawWidth = columns * 100 - mDynamic;
    var width = needCalc ? "".concat(rawWidth, "% - ").concat(mStatic, "px") : "".concat(rawWidth, "%");
    return {
      needCalc: needCalc,
      width: width
    };
  }
  /**
   * Get the responsive paddingTop.
   *
   * @param width - The width.
   * @param ratio - The width/height ratio.
   * @param needCalc - If the width need to be surrounded by calc().
   * @returns - The paddingTop.
   */


  function getResponsivePaddingTop(width, ratio, needCalc) {
    return needCalc ? "calc((".concat(width, ") / ").concat(ratio, ")") : "".concat(parseFloat(width) / ratio, "%");
  }
  /**
   * Get the fixed height.
   *
   * @param height - The mixed height.
   * @returns - The height string.
   */


  function getFixedHeight(height) {
    return typeof height === 'number' ? "".concat(height, "px") : height;
  }
  /**
   * The responsive margin.
   *
   * @param margin - The margin.
   * @returns - The responsive margin.
   */


  function getResponsiveMargin(margin) {
    if (typeof margin === 'number') margin = "".concat(margin, "px");
    var margins = margin.trim().split(' '); // Margin default values.

    var leftMargin = '0px';
    var rightMargin = '0px';
    var mDynamic = 0;
    var mStatic = 0; // Get the values from the input.

    if (margins.length === 1) {
      leftMargin = rightMargin = margins[0];
    } else if (margins.length === 2) {
      leftMargin = rightMargin = margins[1];
    } else if (margins.length === 3) {
      leftMargin = rightMargin = margins[1];
    } else if (margins.length === 4) {
      leftMargin = margins[3];
      rightMargin = margins[1];
    } // Set dynamic/static margins.


    if (leftMargin.indexOf('%') === -1) mStatic += parseFloat(leftMargin);else mDynamic += parseFloat(leftMargin);
    if (rightMargin.indexOf('%') === -1) mStatic += parseFloat(rightMargin);else mDynamic += parseFloat(rightMargin);
    return {
      margin: margin,
      mStatic: mStatic,
      mDynamic: mDynamic
    };
  }

  /**
   * Get the static style.
   *
   * @param options - The options.
   * @returns - The style.
   */
  function getStaticStyle(options) {
    var style = getResponsiveStyle(options); // Check the options.

    invariant('grid' in options, 'You mast pass the grid instance to get the static style.'); // The sizer element.

    var sizerElement = options.grid.getSizerElement(); // Set the style in the sizer.

    Object.assign(sizerElement.style, style); // Get the style from the sizer.

    var _window$getComputedSt = window.getComputedStyle(sizerElement),
        width = _window$getComputedSt.width,
        height = _window$getComputedSt.height,
        paddingTop = _window$getComputedSt.paddingTop,
        margin = _window$getComputedSt.margin;

    return {
      width: width,
      height: height,
      paddingTop: paddingTop,
      margin: margin
    };
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var hooksNames = ['useData', 'useDrag', 'useDraggable', 'useGrid', 'useRefresh', 'useShow', 'useVisibility']; // Handler type.

  // Hook handlers.
  var HooksHandlers = [['useData',
  /*       */
  getHandler('setData')], ['useDrag',
  /*       */
  getHandler('isDragging')], ['useDraggable',
  /*  */
  getHandler('setDraggable')], ['useGrid',
  /*       */
  getHandler('gridData')], ['useRefresh',
  /*    */
  getHandler('refresh')], ['useShow',
  /*       */
  getHandler('isShowing')], ['useVisibility',
  /* */
  getHandler('setVisibility')]];
  /**
   * Return the handler with the given key.
   *
   * @param key - The key.
   * @returns - The method.
   */

  function getHandler(key) {
    return function handler(payload) {
      return _defineProperty({}, key, payload);
    };
  }
  /**
   * Run all the handlers and merge all the payloads.
   *
   * @param hooksHandlers - The handlers.
   * @returns - The merged payload.
   */

  function getMerged(hooksHandlers) {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(hooksHandlers.map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          hookName = _ref3[0],
          handler = _ref3[1];

      var payload = hooks[hookName]();
      return handler(payload);
    }))));
  }
  /**
   * Item HOC for hooks.
   *
   * @param Component - The component to wrap.
   * @param enabledHooks - The hooks to enable.
   * @returns - The wrapped component.
   */


  function withHooks(Component, enabledHooks) {
    // There must be an array of hooks to enable.
    invariant(Array.isArray(enabledHooks), 'An array of hooks name must be provided to wrap an item.'); // All the hooks must be valid.

    enabledHooks.forEach(function (hookName) {
      invariant(hooksNames.includes(hookName), "Invalid item hook: ".concat(hookName));
    }); // There must be at least one hook to enable.

    invariant(enabledHooks.length !== 0, 'To wrap an item at least one hook must be provided.'); // Get the handlers array of the enabled hook.

    var hooksHandlers = HooksHandlers.filter(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
          hookName = _ref5[0];

      return enabledHooks.includes(hookName);
    }); // Return the HOC.

    return function WrappedItem(props) {
      // The hooks will run in the 'getMerged' method.
      return /*#__PURE__*/React__default.createElement(Component, _extends({}, props, getMerged(hooksHandlers)));
    };
  }

  var AutoScroller = Muuri.AutoScroller;
  var ItemDrag = Muuri.ItemDrag; // Muuri-react exports.

  exports.AutoScroller = AutoScroller;
  exports.ChildrenController = ChildrenController;
  exports.EventController = EventController;
  exports.FiberController = FiberController;
  exports.FlagProp = FlagProp;
  exports.GridComponent = GridComponent;
  exports.GridContext = GridContext;
  exports.GridProvider = GridProvider;
  exports.ItemAddController = ItemAddController;
  exports.ItemComponent = ItemComponent;
  exports.ItemContext = ItemContext;
  exports.ItemDrag = ItemDrag;
  exports.ItemProvider = ItemProvider;
  exports.ItemRefController = ItemRefController;
  exports.ItemRemoveController = ItemRemoveController;
  exports.LayoutController = LayoutController;
  exports.MuuriComponent = MuuriComponent;
  exports.MuuriMap = MuuriMap;
  exports.getHandler = getHandler;
  exports.getIndicesToAdd = getIndicesToAdd;
  exports.getResponsiveStyle = getResponsiveStyle;
  exports.getStaticStyle = getStaticStyle;
  exports.muuriMap = muuriMap;
  exports.useData = useData;
  exports.useDrag = useDrag;
  exports.useDraggable = useDraggable;
  exports.useGrid = useGrid;
  exports.useGridContext = useGridContext;
  exports.useItemContext = useItemContext;
  exports.useRefresh = useRefresh;
  exports.useShow = useShow;
  exports.useVisibility = useVisibility;
  exports.withHooks = withHooks;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
