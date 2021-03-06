/*!
 * Coaster.js v1.0.5
 * (c) 2020-2021 Simon Mundy <simon.mundy@peptolab.com> (https://www.peptolab.com)
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

  var Slide = /*#__PURE__*/function () {
    function Slide(el) {
      _classCallCheck(this, Slide);

      this.slide = el;
      this.active = false;
      this.moving = false;
      this.dragging = false;
      this.transition = [];
      this.moveEndFn = this.moveEnd.bind(this);
    }

    _createClass(Slide, [{
      key: "isActive",
      value: function isActive() {
        return this.active;
      }
    }, {
      key: "isMoving",
      value: function isMoving() {
        return this.moving;
      }
    }, {
      key: "isDragging",
      value: function isDragging() {
        return this.dragging;
      }
    }, {
      key: "activate",
      value: function activate() {
        this.active = true;
        this.slide.classList.add('active');
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.active = false;
        this.slide.classList.remove('active');
      }
    }, {
      key: "dragStart",
      value: function dragStart() {
        this.dragging = true;
        this.slide.classList.add('dragging');
      }
    }, {
      key: "dragStop",
      value: function dragStop() {
        this.dragging = false;
        this.slide.classList.remove('dragging');
      }
    }, {
      key: "dragMove",
      value: function dragMove(x, transition) {
        this.slide.style.transform = "translateX(".concat(x, "px)");

        if (transition === true) {
          this.addTransition('transitioning');
          this.addTransition("carousel__transition--drag");
          this.slide.addEventListener('transitionend', this.moveEndFn, true);
        }
      }
    }, {
      key: "dragReset",
      value: function dragReset() {
        this.slide.style.transform = null;
      }
    }, {
      key: "addTransition",
      value: function addTransition(cls) {
        this.transition.push(cls);
        this.slide.classList.add(cls);
      }
    }, {
      key: "removeTransition",
      value: function removeTransition(cls) {
        this.transition.filter(function (item) {
          return item !== cls;
        });
        this.slide.classList.remove(cls);
      }
    }, {
      key: "move",
      value: function move(type, transition, direction) {
        var _this = this;

        if (this.slide.classList.contains('transitioning')) {
          return false;
        }

        this.moving = true;
        var transitionBase = "carousel__transition--".concat(transition);
        var transitionMove = "carousel__transition--".concat(transition, "-").concat(direction);

        if (type == 'in') {
          this.addTransition(transitionMove);
        }

        requestAnimationFrame(function () {
          _this.addTransition('transitioning');

          _this.addTransition(transitionBase);

          if (type == 'in') {
            _this.removeTransition(transitionMove);
          } else {
            _this.addTransition(transitionMove);
          }

          _this.slide.offsetWidth;

          _this.slide.addEventListener('transitionend', _this.moveEndFn, true);
        });
      }
    }, {
      key: "drag",
      value: function drag(type, transition, direction, velocity) {
        if (this.slide.classList.contains('transitioning')) {
          return false;
        }

        this.moving = true;
        var velocityDuration = 0;

        if (velocity > 0) {
          velocityDuration = (1 - Math.min(99, velocity) / 100) * 0.75;
        }

        velocityDuration = velocity + 's';
        var transitionBase = "carousel__transition--".concat(transition);
        var transitionMove = "carousel__transition--".concat(transition, "-").concat(direction);
        this.slide.style.transform = null;
        this.slide.style.transitionDuration = velocityDuration;
        this.addTransition('transitioning');
        this.addTransition(transitionBase);

        if (type == 'in') {
          this.removeTransition(transitionMove);
        } else {
          this.addTransition(transitionMove);
        }

        this.slide.addEventListener('transitionend', this.moveEndFn, true);
      }
    }, {
      key: "moveEnd",
      value: function moveEnd() {
        var _this2 = this;

        this.moving = false;
        this.slide.removeEventListener('transitionend', this.moveEndFn, true);
        this.slide.style.transitionDuration = null;
        this.transition.forEach(function (cls) {
          return _this2.removeTransition(cls);
        });
        this.dragReset();
      }
    }]);

    return Slide;
  }();

  var Coaster = /*#__PURE__*/function () {
    function Coaster(el, options) {
      _classCallCheck(this, Coaster);

      this.DOM = {
        'carousel': el,
        'track': null,
        'navPrev': null,
        'navNext': null,
        'navPaginator': null
      };
      this.carousel = {
        'index': -1,
        'slides': [],
        'current': null,
        'after': null,
        'before': null,
        'autoplay': null,
        'delay': null,
        'queue': null,
        'dragevent': null,
        'drag': {
          'dragging': false,
          'initialX': 0
        },
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
        'threshold': .2,
        // Swipe needs to travel distance of screen
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

    _createClass(Coaster, [{
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
        this.carousel.index = 0;
        this.carousel.current = this.carousel.slides[this.carousel.index];
        this.carousel.current.activate();
        this.options.onChange && this.options.onChange(this.carousel, this.DOM);
      }
    }, {
      key: "setSlides",
      value: function setSlides() {
        var _this = this;

        this.DOM.track = this.DOM.carousel.querySelector(this.options.selector.track);

        _toConsumableArray(this.DOM.carousel.querySelectorAll(this.options.selector.slide)).forEach(function (slide) {
          return _this.carousel.slides.push(new Slide(slide));
        });

        if (!this.carousel.slides.length) {
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
        var _this2 = this;

        if (this.options.drag.touch) {
          this.DOM.track.addEventListener('touchstart', this.carousel.fn.dragStart);
          this.DOM.track.addEventListener('touchend', this.carousel.fn.dragEnd);
          this.DOM.track.addEventListener('touchmove', this.carousel.fn.dragMove);
        }

        if (this.options.drag.mouse) {
          this.DOM.track.addEventListener('mousedown', this.carousel.fn.dragStart);
        }

        if (this.DOM.navPrev) {
          this.DOM.navPrev.addEventListener('click', this.carousel.fn.navigate);
        }

        if (this.DOM.navNext) {
          this.DOM.navNext.addEventListener('click', this.carousel.fn.navigate);
        }

        this.DOM.navPaginator.forEach(function (el) {
          return el.addEventListener('click', _this2.carousel.fn.navigate);
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
        this.navigate('next', this.options.transition.type.click, 0);

        if (this.options.autoplay.active) {
          this.play();
        }
      }
    }, {
      key: "navigate",
      value: function navigate(targetIndex, moveType, velocity) {
        var directionOut, directionIn;

        if (this.carousel.current.isMoving()) {
          return false;
        }

        switch (targetIndex) {
          case 'prev':
            targetIndex = this.carousel.index - 1;

            if (targetIndex < 0) {
              targetIndex = this.carousel.slides.length - 1;
            }

            directionOut = 'prev';
            directionIn = 'next';
            break;

          case 'next':
            targetIndex = this.carousel.index + 1;

            if (targetIndex >= this.carousel.slides.length) {
              targetIndex = 0;
            }

            directionOut = 'next';
            directionIn = 'prev';
            break;

          default:
            targetIndex -= 1;
            directionOut = targetIndex < this.carousel.index ? 'prev' : 'next';
            directionIn = targetIndex < this.carousel.index ? 'next' : 'prev';
            break;
        }

        if (targetIndex == this.carousel.index) {
          return false;
        }

        this.carousel.before = this.carousel.slides[this.carousel.index];
        this.carousel.current = this.carousel.slides[targetIndex];
        this.carousel.index = targetIndex;

        switch (moveType) {
          case 'fade':
          case 'slide':
            this.carousel.before.move('out', moveType, directionOut);
            this.carousel.current.move('in', moveType, directionIn);
            break;

          case 'drag':
            this.carousel.before.drag('out', moveType, directionOut, velocity);
            this.carousel.current.drag('in', moveType, directionIn, velocity);
            break;
        }

        this.carousel.before.deactivate();
        this.carousel.current.activate();
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
        this.carousel.dragevent = e || window.event;
        this.carousel.dragevent.preventDefault();
        this.pause();

        if (this.carousel.current.isMoving()) {
          return false;
        }

        this.carousel.drag.dragging = true;
        this.carousel.drag.slideX = this.carousel.current.slide.offsetLeft;

        if (this.carousel.dragevent.type == 'touchstart') {
          this.carousel.drag.initialX = this.carousel.drag.currentX = this.carousel.drag.previousX = this.carousel.dragevent.touches[0].clientX;
        } else {
          this.carousel.drag.initialX = this.carousel.drag.currentX = this.carousel.dragevent.clientX;
          document.addEventListener('mouseup', this.carousel.fn.dragEnd);
          document.addEventListener('mousemove', this.carousel.fn.dragMove);
        }

        this.carousel.before = this.carousel.index > 0 ? this.carousel.slides[this.carousel.index - 1] : this.carousel.slides[this.carousel.slides.length - 1];
        this.carousel.after = this.carousel.index < this.carousel.slides.length - 1 ? this.carousel.slides[this.carousel.index + 1] : this.carousel.slides[0];
        [this.carousel.current, this.carousel.before, this.carousel.after].forEach(function (el) {
          el.dragStart();
        });
        this.dragPosition(0);
      }
    }, {
      key: "dragMove",
      value: function dragMove(e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();

        if (!this.carousel.drag.dragging) {
          return false;
        }

        this.carousel.drag.previousX = this.carousel.drag.currentX;
        this.carousel.drag.currentX = e.type == 'touchmove' ? e.touches[0].clientX : e.clientX;
        this.carousel.drag.velocityX = this.carousel.drag.currentX - this.carousel.drag.previousX;
        this.carousel.drag.calculatedSlideX = this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX);
        this.dragPosition(this.carousel.drag.calculatedSlideX, false);
      }
    }, {
      key: "dragPosition",
      value: function dragPosition(x, transition) {
        var dist = this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX);
        this.carousel.current.dragMove(x, transition);

        if (dist > 0) {
          this.carousel.before.dragMove(x - this.carousel.current.slide.offsetWidth, transition);

          if (this.carousel.before != this.carousel.after) {
            this.carousel.after.dragMove(x + this.carousel.current.slide.offsetWidth, transition);
          }
        } else {
          this.carousel.after.dragMove(x + this.carousel.current.slide.offsetWidth, transition);

          if (this.carousel.before != this.carousel.after) {
            this.carousel.before.dragMove(x - this.carousel.current.slide.offsetWidth, transition);
          }
        }
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(e) {
        if (!this.carousel.drag.dragging) {
          return false;
        }
        [this.carousel.current, this.carousel.before, this.carousel.after].forEach(function (el) {
          el.dragStop();
        });
        this.carousel.drag.dragging = false;
        var dist = this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX);
        var velocity = Math.max(Math.abs(this.carousel.drag.velocityX), 0.01);
        var minThreshold = Math.abs(this.DOM.carousel.offsetWidth * this.options.threshold);
        var maxThreshold = (1 - Math.abs(dist) / this.DOM.carousel.offsetWidth) * 1;
        var velocityFactor = 1 - Math.min(velocity, 100) / 100;

        if (dist < -minThreshold) {
          this.carousel.before.dragReset();
          this.navigate('next', 'drag', maxThreshold * velocityFactor);
        } else if (dist > minThreshold) {
          this.carousel.after.dragReset();
          this.navigate('prev', 'drag', maxThreshold * velocityFactor);
        } else {
          this.dragPosition(0, true);
        }

        document.removeEventListener('mouseup', this.carousel.fn.dragEnd);
        document.removeEventListener('mousemove', this.carousel.fn.dragMove);
      }
    }]);

    return Coaster;
  }();

  var Carousel = /*#__PURE__*/function (_Core) {
    _inherits(Carousel, _Core);

    var _super = _createSuper(Carousel);

    function Carousel() {
      _classCallCheck(this, Carousel);

      return _super.apply(this, arguments);
    }

    return Carousel;
  }(Coaster);

  return Carousel;

})));
