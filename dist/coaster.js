/*!
 * Coaster.js v1.0.0
 * (c) 2020-2020 Simon Mundy <simon.mundy@peptolab.com> (https://www.peptolab.com)
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Coaster = factory());
}(this, (function () { 'use strict';

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

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Core = /*#__PURE__*/function () {
    function Core(el, options) {
      _classCallCheck(this, Core);

      this.DOM = {
        'carousel': el,
        'track': null,
        'slides': null,
        'navPrev': null,
        'navNext': null,
        'navPaginator': null
      };
      this.carousel = {
        'index': -1,
        'current': null,
        'after': null,
        'before': null,
        'autoplay': null,
        'delay': null,
        'fn': {
          'navigate': null,
          'dragStart': null,
          'dragEnd': null,
          'dragMove': null,
          'transitionEnd': null,
          'autoplay': null
        }
      };
      this.options = {
        'threshold': 100,
        'drag': {
          'touch': true,
          'mouse': false
        },
        'autoplay': {
          'active': false,
          'interval': 0
        },
        'transition': {
          'type': {
            'click': 'slide'
          }
        },
        'selector': {
          'track': '[data-carousel-track]',
          'slide': '[data-carousel-slide]',
          'caption': '[data-carousel-slide]',
          'navPrev': '[data-carousel-nav="prev"]',
          'navNext': '[data-carousel-nav="next"]',
          'paginator': '[data-carousel-pagination] [data-carousel-nav]'
        },
        'onStart': null,
        'onStop': null,
        'onPause': null,
        'onChange': null
      };
      this.setOptions(options);
      this.setSlides();
      this.setCarousel();
      this.setNav();
      this.addListeners();

      if (this.options.autoplay.active) {
        this.play();
      }

      this.options.onStart && this.options.onStart(this.carousel.current);
    }

    _createClass(Core, [{
      key: "setOptions",
      value: function setOptions(options) {
        this.options = Object.assign(this.options, options);
      }
    }, {
      key: "setCarousel",
      value: function setCarousel() {
        this.carousel.fn.navigate = this.clickNavigate.bind(this);
        this.carousel.fn.dragStart = this.dragStart.bind(this);
        this.carousel.fn.dragEnd = this.dragEnd.bind(this);
        this.carousel.fn.dragMove = this.dragMove.bind(this);
        this.carousel.fn.transitionEnd = this.transitionEnd.bind(this);
        this.carousel.index = 0;
        this.carousel.current = this.DOM.slides[this.carousel.index];
        this.carousel.current.classList.add('active');
        this.options.onChange && this.options.onChange(this.carousel, this.DOM);
      }
    }, {
      key: "setSlides",
      value: function setSlides() {
        this.DOM.track = this.DOM.carousel.querySelector(this.options.selector.track);
        this.DOM.slides = _toConsumableArray(this.DOM.carousel.querySelectorAll(this.options.selector.slide));

        if (!this.DOM.slides.length) {
          return false;
        }
      }
    }, {
      key: "setNav",
      value: function setNav() {
        this.DOM.navPrev = this.DOM.carousel.querySelector(this.options.selector.navPrev);
        this.DOM.navNext = this.DOM.carousel.querySelector(this.options.selector.navNext);
        this.DOM.navPaginator = _toConsumableArray(this.DOM.carousel.querySelectorAll(this.options.selector.paginator));
      }
    }, {
      key: "setCaption",
      value: function setCaption() {
        this.DOM.caption = this.DOM.carousel.querySelector("[data-carousel-caption]");
      }
    }, {
      key: "addListeners",
      value: function addListeners() {
        var _this = this;

        if (this.options.drag.touch) {
          this.DOM.track.addEventListener('touchstart', this.carousel.fn.dragStart);
          this.DOM.track.addEventListener('touchend', this.carousel.fn.dragEnd);
          this.DOM.track.addEventListener('touchmove', this.carousel.fn.dragMove);
        }

        if (this.options.drag.mouse) {
          this.DOM.track.addEventListener('mousedown', this.carousel.fn.dragStart);
        }

        this.DOM.navPrev.addEventListener('click', this.carousel.fn.navigate);
        this.DOM.navNext.addEventListener('click', this.carousel.fn.navigate);
        this.DOM.navPaginator.forEach(function (el) {
          return el.addEventListener('click', _this.carousel.fn.navigate);
        });
      }
    }, {
      key: "play",
      value: function play() {
        this.options.autoplay.active = true;
        this.carousel.fn.autoplay = this.autoplay.bind(this);
        this.carousel.autoplay = setTimeout(this.carousel.fn.autoplay, this.options.autoplay.interval);
      }
    }, {
      key: "pause",
      value: function pause() {
        this.options.autoplay.active = false;
        clearTimeout(this.carousel.autoplay);
      }
    }, {
      key: "autoplay",
      value: function autoplay() {
        this.navigate('next', this.options.transition.type.click);

        if (this.options.autoplay.active) {
          this.play();
        }
      }
    }, {
      key: "navigate",
      value: function navigate(targetIndex, moveType) {
        var _this2 = this;

        switch (targetIndex) {
          case 'prev':
            targetIndex = this.carousel.index - 1;

            if (targetIndex < 0) {
              targetIndex = this.DOM.slides.length - 1;
            }

            this.carousel.direction = 'prev';
            this.carousel.opposite = 'next';
            break;

          case 'next':
            targetIndex = this.carousel.index + 1;

            if (targetIndex >= this.DOM.slides.length) {
              targetIndex = 0;
            }

            this.carousel.direction = 'next';
            this.carousel.opposite = 'prev';
            break;

          default:
            targetIndex -= 1;
            this.carousel.direction = targetIndex < this.carousel.index ? 'prev' : 'next';
            this.carousel.opposite = targetIndex < this.carousel.index ? 'next' : 'prev';
            break;
        }

        if (targetIndex == this.carousel.index) {
          return false;
        }

        this.carousel.before = this.DOM.slides[this.carousel.index];
        this.transitionClear(this.carousel.before);
        this.carousel.current = this.DOM.slides[targetIndex];
        this.transitionClear(this.carousel.current);
        this.carousel.index = targetIndex;

        switch (moveType) {
          case 'fade':
          case 'slide':
            this.carousel.before.baseTransitionClass = "carousel__transition--".concat(moveType);
            this.carousel.before.moveTransitionClass = "carousel__transition--".concat(moveType, "-").concat(this.carousel.direction);
            window.requestAnimationFrame(function (e) {
              _this2.carousel.before.addEventListener('transitionend', _this2.carousel.fn.transitionEnd);

              _this2.carousel.before.classList.add(_this2.carousel.before.baseTransitionClass);

              _this2.carousel.before.classList.add(_this2.carousel.before.moveTransitionClass);

              _this2.carousel.before.classList.add('transitioning');
            });
            this.carousel.current.baseTransitionClass = "carousel__transition--".concat(moveType);
            this.carousel.current.moveTransitionClass = "carousel__transition--".concat(moveType, "-").concat(this.carousel.opposite);
            this.carousel.current.classList.add(this.carousel.current.moveTransitionClass);
            window.requestAnimationFrame(function (e) {
              _this2.carousel.current.addEventListener('transitionend', _this2.carousel.fn.transitionEnd);

              _this2.carousel.current.classList.remove(_this2.carousel.current.moveTransitionClass);

              _this2.carousel.current.classList.add(_this2.carousel.current.baseTransitionClass);

              _this2.carousel.current.classList.add('transitioning');
            });
            break;

          case 'drag':
            this.carousel.before.baseTransitionClass = "carousel__transition--".concat(moveType);
            this.carousel.before.moveTransitionClass = "carousel__transition--".concat(moveType, "-").concat(this.carousel.direction);
            this.carousel.before.addEventListener('transitionend', this.carousel.fn.transitionEnd);
            this.carousel.before.classList.add(this.carousel.before.baseTransitionClass);
            this.carousel.before.classList.add(this.carousel.before.moveTransitionClass);
            this.carousel.before.classList.add('transitioning');
            this.carousel.current.baseTransitionClass = "carousel__transition--".concat(moveType);
            this.carousel.current.classList.add(this.carousel.current.baseTransitionClass);
            this.carousel.current.addEventListener('transitionend', this.carousel.fn.transitionEnd);
            this.carousel.current.style.transform = "translateX(0)";
            this.carousel.current.classList.add('transitioning');
            break;
        }

        this.carousel.before.classList.remove('active');
        this.carousel.current.classList.add('active');
        this.options.onChange && this.options.onChange(this.carousel, this.DOM);
      }
    }, {
      key: "clickNavigate",
      value: function clickNavigate(e) {
        this.navigate(e.currentTarget.dataset.carouselNav, this.options.transition.type.click);
        this.pause();
      }
    }, {
      key: "dragStart",
      value: function dragStart(e) {
        var _this3 = this;

        e = e || window.event;
        this.pause();
        this.carousel.currentInitialX = this.carousel.current.offsetLeft;

        if (e.type == 'touchstart') {
          this.carousel.dragInitialX = this.carousel.newX = e.touches[0].clientX;
        } else {
          this.carousel.dragInitialX = this.carousel.newX = e.clientX;
          document.addEventListener('mouseup', this.carousel.fn.dragEnd);
          document.addEventListener('mousemove', this.carousel.fn.dragMove);
        }

        this.carousel.before = this.carousel.index > 0 ? this.DOM.slides[this.carousel.index - 1] : this.DOM.slides[this.DOM.slides.length - 1];
        this.carousel.after = this.carousel.index < this.DOM.slides.length - 1 ? this.DOM.slides[this.carousel.index + 1] : this.DOM.slides[0];
        [this.carousel.current, this.carousel.before, this.carousel.after].forEach(function (el) {
          _this3.dragPrepare(el);

          el.classList.add('dragging');
        });
        this.dragPosition();
      }
    }, {
      key: "dragPrepare",
      value: function dragPrepare(el) {
        this.transitionClear(el);
      }
    }, {
      key: "dragMove",
      value: function dragMove(e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();

        if (e.type == 'touchmove') {
          this.carousel.newX = e.touches[0].clientX;
        } else {
          this.carousel.newX = e.clientX;
        }

        this.dragPosition();
      }
    }, {
      key: "dragPosition",
      value: function dragPosition() {
        this.carousel.calculatedX = this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX);
        var dist = this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX);
        this.carousel.current.style.transform = "translateX(".concat(this.carousel.calculatedX, "px)");

        if (dist > 0) {
          this.carousel.before.style.transform = "translateX(".concat(this.carousel.calculatedX - this.carousel.current.offsetWidth, "px)");

          if (this.carousel.before != this.carousel.after) {
            this.carousel.after.style.transform = "translateX(".concat(this.carousel.calculatedX + this.carousel.current.offsetWidth, "px)");
          }
        } else {
          this.carousel.after.style.transform = "translateX(".concat(this.carousel.calculatedX + this.carousel.current.offsetWidth, "px)");

          if (this.carousel.before != this.carousel.after) {
            this.carousel.before.style.transform = "translateX(".concat(this.carousel.calculatedX - this.carousel.current.offsetWidth, "px)");
          }
        }
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(e) {
        var _this4 = this;
        [this.carousel.current, this.carousel.before, this.carousel.after].forEach(function (el) {
          el.classList.remove('dragging');
        });
        var dist = this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX);

        if (dist < -this.options.threshold) {
          this.dragReset(this.carousel.before);
          this.navigate('next', 'drag');
          e.preventDefault();
        } else if (dist > this.options.threshold) {
          this.dragReset(this.carousel.after);
          this.navigate('prev', 'drag');
          e.preventDefault();
        } else {
          [this.carousel.current, this.carousel.before, this.carousel.after].forEach(function (el) {
            return _this4.dragReset(el);
          });
        }

        document.removeEventListener('mouseup', this.carousel.fn.dragEnd);
        document.removeEventListener('mousemove', this.carousel.fn.dragMove);
      }
    }, {
      key: "dragReset",
      value: function dragReset(el) {
        el.addEventListener('transitionend', this.carousel.fn.transitionEnd);
        el.style.transform = null;
      }
    }, {
      key: "transitionEnd",
      value: function transitionEnd(e) {
        var el = e.target;
        this.transitionClear(el);
      }
    }, {
      key: "transitionClear",
      value: function transitionClear(el) {
        if (!el) {
          return false;
        }

        if (el.baseTransitionClass !== undefined) {
          el.classList.remove(el.baseTransitionClass);
          delete el.baseTransitionClass;
        }

        if (el.moveTransitionClass !== undefined) {
          el.classList.remove(el.moveTransitionClass);
          delete el.moveTransitionClass;
        }

        el.style.transform = null;
        el.classList.remove('transitioning');
        el.removeEventListener('transitionend', this.carousel.fn.transitionEnd);
      }
    }]);

    return Core;
  }();

  var Carousel = /*#__PURE__*/function (_Core) {
    _inherits(Carousel, _Core);

    var _super = _createSuper(Carousel);

    function Carousel() {
      _classCallCheck(this, Carousel);

      return _super.apply(this, arguments);
    }

    return Carousel;
  }(Core);

  return Carousel;

})));
