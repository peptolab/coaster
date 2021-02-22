import Slide from './slide'
import { debounce } from './utils'

export default class Coaster {

    constructor(el, options) {
        this.DOM = {
            'carousel': el,
            'track': null,
            'navPrev': null,
            'navNext': null,
            'navPaginator': null
        }

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
        }

        this.options = {
            'threshold': .2, // Swipe needs to travel distance of screen
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
                },
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
        }

        this.setOptions(options)

        this.setSlides()
        this.setCarousel()
        this.setNav()

        this.addListeners()

        if (this.options.autoplay.active) {
            this.play()
        }

        this.options.onStart && this.options.onStart(this.carousel.current)
    }

    setOptions(options) {
        this.options = Object.assign(this.options, options);
    }

    setCarousel() {
        this.carousel.fn.navigate = this.clickNavigate.bind(this)
        this.carousel.fn.dragStart = this.dragStart.bind(this)
        this.carousel.fn.dragEnd = this.dragEnd.bind(this)
        this.carousel.fn.dragMove = this.dragMove.bind(this)

        this.carousel.index = 0

        this.carousel.current = this.carousel.slides[this.carousel.index]
        this.carousel.current.activate()

        this.options.onChange && this.options.onChange(this.carousel, this.DOM)
    }

    setSlides() {
        this.DOM.track = this.DOM.carousel.querySelector(this.options.selector.track)
            ;[...this.DOM.carousel.querySelectorAll(this.options.selector.slide)].forEach(slide => this.carousel.slides.push(new Slide(slide)))
        if (!this.carousel.slides.length) {
            return false
        }
    }

    setNav() {
        this.DOM.navPrev = this.DOM.carousel.querySelector(this.options.selector.navPrev)
        this.DOM.navNext = this.DOM.carousel.querySelector(this.options.selector.navNext)
        this.DOM.navPaginator = [...this.DOM.carousel.querySelectorAll(this.options.selector.paginator)]
    }

    setCaption() {
        this.DOM.caption = this.DOM.carousel.querySelector(`[data-carousel-caption]`)
    }

    addListeners() {
        if (this.options.drag.touch) {
            this.DOM.track.addEventListener('touchstart', this.carousel.fn.dragStart)
            this.DOM.track.addEventListener('touchend', this.carousel.fn.dragEnd)
            this.DOM.track.addEventListener('touchmove', this.carousel.fn.dragMove)
        }

        if (this.options.drag.mouse) {
            this.DOM.track.addEventListener('mousedown', this.carousel.fn.dragStart)
        }

        if (this.DOM.navPrev) {
            this.DOM.navPrev.addEventListener('click', this.carousel.fn.navigate)
        }

        if (this.DOM.navNext) {
            this.DOM.navNext.addEventListener('click', this.carousel.fn.navigate)
        }

        this.DOM.navPaginator.forEach(el => el.addEventListener('click', this.carousel.fn.navigate))
    }

    play() {
        this.options.autoplay.active = true

        this.carousel.fn.autoplay = this.autoplay.bind(this)
        this.carousel.autoplay = setTimeout(this.carousel.fn.autoplay, this.options.autoplay.interval)
    }

    pause() {
        this.options.autoplay.active = false
        clearTimeout(this.carousel.autoplay)
    }

    autoplay() {
        this.navigate('next', this.options.transition.type.click, 0)

        if (this.options.autoplay.active) {
            this.play()
        }
    }

    navigate(targetIndex, moveType, velocity) {
        let directionOut, directionIn;

        if (this.carousel.current.isMoving()) {
            return false
        }

        switch (targetIndex) {
            case 'prev':
                targetIndex = this.carousel.index - 1;
                if (targetIndex < 0) {
                    targetIndex = this.carousel.slides.length - 1;
                }
                directionOut = 'prev'
                directionIn = 'next'
                break

            case 'next':
                targetIndex = this.carousel.index + 1;
                if (targetIndex >= this.carousel.slides.length) {
                    targetIndex = 0;
                }
                directionOut = 'next'
                directionIn = 'prev'
                break

            default:
                targetIndex -= 1;
                directionOut = (targetIndex < this.carousel.index) ? 'prev' : 'next'
                directionIn = (targetIndex < this.carousel.index) ? 'next' : 'prev'
                break
        }

        if (targetIndex == this.carousel.index) {
            return false
        }

        this.carousel.before = this.carousel.slides[this.carousel.index]
        this.carousel.current = this.carousel.slides[targetIndex]

        this.carousel.index = targetIndex

        switch (moveType) {
            case 'fade':
            case 'slide':
                this.carousel.before.move('out', moveType, directionOut)
                this.carousel.current.move('in', moveType, directionIn)
                break;

            case 'drag':
                this.carousel.before.drag('out', moveType, directionOut, velocity)
                this.carousel.current.drag('in', moveType, directionIn, velocity)
                break
        }

        this.carousel.before.deactivate()
        this.carousel.current.activate()

        this.options.onChange && this.options.onChange(this.carousel, this.DOM)
    }

    clickNavigate(e) {
        this.navigate(e.currentTarget.dataset.carouselNav, this.options.transition.type.click)
        this.pause()
    }

    dragStart(e) {
        this.carousel.dragevent = e || window.event;
        this.carousel.dragevent.preventDefault()

        this.pause()

        if (this.carousel.current.isMoving()) {
            return false
        }

        this.carousel.drag.dragging = true
        this.carousel.drag.slideX = this.carousel.current.slide.offsetLeft;

        if (this.carousel.dragevent.type == 'touchstart') {
            this.carousel.drag.initialX = this.carousel.drag.currentX = this.carousel.drag.previousX = this.carousel.dragevent.touches[0].clientX;
        } else {
            this.carousel.drag.initialX = this.carousel.drag.currentX = this.carousel.dragevent.clientX;
            document.addEventListener('mouseup', this.carousel.fn.dragEnd)
            document.addEventListener('mousemove', this.carousel.fn.dragMove)
        }

        this.carousel.before = (this.carousel.index > 0) ? this.carousel.slides[this.carousel.index - 1] : this.carousel.slides[this.carousel.slides.length - 1]
        this.carousel.after = (this.carousel.index < this.carousel.slides.length - 1) ? this.carousel.slides[this.carousel.index + 1] : this.carousel.slides[0]

            ;[this.carousel.current, this.carousel.before, this.carousel.after].forEach(el => {
                el.dragStart()
            })

        this.dragPosition(0)
    }

    dragMove(e) {
        e = e || window.event
        e.preventDefault()
        e.stopPropagation()

        if (!this.carousel.drag.dragging) {
            return false
        }

        this.carousel.drag.previousX = this.carousel.drag.currentX;
        this.carousel.drag.currentX = (e.type == 'touchmove') ? e.touches[0].clientX : e.clientX;
        this.carousel.drag.velocityX = this.carousel.drag.currentX - this.carousel.drag.previousX;
        this.carousel.drag.calculatedSlideX = (this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX))

        this.dragPosition(this.carousel.drag.calculatedSlideX, false)
    }

    dragPosition(x, transition) {
        let dist = this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX)

        this.carousel.current.dragMove(x, transition)

        if (dist > 0) {
            this.carousel.before.dragMove(x - this.carousel.current.slide.offsetWidth, transition)
            if (this.carousel.before != this.carousel.after) {
                this.carousel.after.dragMove(x + this.carousel.current.slide.offsetWidth, transition)
            }
        } else {
            this.carousel.after.dragMove(x + this.carousel.current.slide.offsetWidth, transition)
            if (this.carousel.before != this.carousel.after) {
                this.carousel.before.dragMove(x - this.carousel.current.slide.offsetWidth, transition)
            }
        }
    }

    dragEnd(e) {
        if (!this.carousel.drag.dragging) {
            return false
        }

        ;[this.carousel.current, this.carousel.before, this.carousel.after].forEach(el => {
            el.dragStop()
        })

        this.carousel.drag.dragging = false

        let dist = this.carousel.drag.slideX - (this.carousel.drag.initialX - this.carousel.drag.currentX)
        let velocity = Math.max(Math.abs(this.carousel.drag.velocityX), 0.01)
        let minThreshold = Math.abs(this.DOM.carousel.offsetWidth * this.options.threshold)
        let maxThreshold = (1 - (Math.abs(dist) / this.DOM.carousel.offsetWidth)) * 1;

        let velocityFactor = 1 - (Math.min(velocity, 100) / 100)

        if (dist < -minThreshold) {
            this.carousel.before.dragReset()
            this.navigate('next', 'drag', maxThreshold * velocityFactor)
        } else if (dist > minThreshold) {
            this.carousel.after.dragReset()
            this.navigate('prev', 'drag', maxThreshold * velocityFactor)
        } else {
            this.dragPosition(0, true)
        }

        document.removeEventListener('mouseup', this.carousel.fn.dragEnd)
        document.removeEventListener('mousemove', this.carousel.fn.dragMove)
    }
}
