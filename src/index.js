export default class Core {

    constructor(el, options) {
        this.DOM = {
            'carousel': el,
            'track': null,
            'slides': null,
            'navPrev': null,
            'navNext': null,
            'navPaginator': null
        }

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
        }

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
        this.carousel.fn.transitionEnd = this.transitionEnd.bind(this)

        this.carousel.index = 0

        this.carousel.current = this.DOM.slides[this.carousel.index]
        this.carousel.current.classList.add('active')

        this.options.onChange && this.options.onChange(this.carousel, this.DOM)
    }

    setSlides() {
        this.DOM.track = this.DOM.carousel.querySelector(this.options.selector.track)
        this.DOM.slides = [...this.DOM.carousel.querySelectorAll(this.options.selector.slide)]
        if (! this.DOM.slides.length) {
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

        this.DOM.navPrev.addEventListener('click', this.carousel.fn.navigate)
        this.DOM.navNext.addEventListener('click', this.carousel.fn.navigate)

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
        this.navigate('next', this.options.transition.type.click)

        if (this.options.autoplay.active) {
            this.play()
        }
    }

    navigate(targetIndex, moveType) {
        switch (targetIndex) {
            case 'prev':
                targetIndex = this.carousel.index - 1;
                if (targetIndex < 0) {
                    targetIndex = this.DOM.slides.length - 1;
                }
                this.carousel.direction = 'prev'
                this.carousel.opposite = 'next'
                break

            case 'next':
                targetIndex = this.carousel.index + 1;
                if (targetIndex >= this.DOM.slides.length) {
                    targetIndex = 0;
                }
                this.carousel.direction = 'next'
                this.carousel.opposite = 'prev'
                break

            default:
                targetIndex -= 1;
                this.carousel.direction = (targetIndex < this.carousel.index) ? 'prev' : 'next'
                this.carousel.opposite = (targetIndex < this.carousel.index) ? 'next' : 'prev'
                break
        }

        if (targetIndex == this.carousel.index) {
            return false
        }

        this.carousel.before = this.DOM.slides[this.carousel.index]
        this.transitionClear(this.carousel.before)

        this.carousel.current = this.DOM.slides[targetIndex]
        this.transitionClear(this.carousel.current)

        this.carousel.index = targetIndex

        switch (moveType) {
            case 'fade':
            case 'slide':
                this.carousel.before.baseTransitionClass = `carousel__transition--${moveType}`
                this.carousel.before.moveTransitionClass = `carousel__transition--${moveType}-${this.carousel.direction}`
                window.requestAnimationFrame(e => {
                    this.carousel.before.classList.add(this.carousel.before.baseTransitionClass)
                    this.carousel.before.classList.add(this.carousel.before.moveTransitionClass)
                    this.transitionStart(this.carousel.before)
                })

                this.carousel.current.baseTransitionClass = `carousel__transition--${moveType}`
                this.carousel.current.moveTransitionClass = `carousel__transition--${moveType}-${this.carousel.opposite}`
                this.carousel.current.classList.add(this.carousel.current.moveTransitionClass)
                window.requestAnimationFrame(e => {
                    this.carousel.current.classList.remove(this.carousel.current.moveTransitionClass)
                    this.carousel.current.classList.add(this.carousel.current.baseTransitionClass)
                    this.transitionStart(this.carousel.current)
                })
                break;

            case 'drag':
                this.carousel.before.baseTransitionClass = `carousel__transition--${moveType}`
                this.carousel.before.moveTransitionClass = `carousel__transition--${moveType}-${this.carousel.direction}`
                this.carousel.before.classList.add(this.carousel.before.baseTransitionClass)
                this.carousel.before.classList.add(this.carousel.before.moveTransitionClass)
                this.transitionStart(this.carousel.before)

                this.carousel.current.baseTransitionClass = `carousel__transition--${moveType}`
                this.carousel.current.classList.add(this.carousel.current.baseTransitionClass)
                this.carousel.current.style.transform = `translateX(0)`
                this.transitionStart(this.carousel.current)
                break
        }

        this.carousel.before.classList.remove('active')
        this.carousel.current.classList.add('active')

        this.options.onChange && this.options.onChange(this.carousel, this.DOM)
    }

    clickNavigate(e) {
        this.navigate(e.currentTarget.dataset.carouselNav, this.options.transition.type.click)
        this.pause()
    }

    dragStart (e) {
        e = e || window.event;

        this.pause()

        this.carousel.currentInitialX = this.carousel.current.offsetLeft;

        if (e.type == 'touchstart') {
            this.carousel.dragInitialX = this.carousel.newX = e.touches[0].clientX;
        } else {
            this.carousel.dragInitialX = this.carousel.newX = e.clientX;
            document.addEventListener('mouseup', this.carousel.fn.dragEnd)
            document.addEventListener('mousemove', this.carousel.fn.dragMove)
        }

        this.carousel.before = (this.carousel.index > 0) ? this.DOM.slides[this.carousel.index - 1] : this.DOM.slides[this.DOM.slides.length - 1]
        this.carousel.after = (this.carousel.index < this.DOM.slides.length - 1) ? this.DOM.slides[this.carousel.index + 1] : this.DOM.slides[0]

        ;[this.carousel.current, this.carousel.before, this.carousel.after].forEach(el => {
            this.dragPrepare(el)
            el.classList.add('dragging')
        })

        this.dragPosition()
    }

    dragPrepare(el) {
        this.transitionClear(el);
    }

    dragMove (e) {
        e = e || window.event
        e.preventDefault()
        e.stopPropagation()

        if (e.type == 'touchmove') {
            this.carousel.newX = e.touches[0].clientX;
        } else {
            this.carousel.newX = e.clientX;
        }

        this.carousel.calculatedX = (this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX))
        let dist = this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX)

        this.dragPosition(this.carousel.calculatedX)
    }

    dragPosition(x) {

        this.carousel.current.style.transform = `translateX(${x}px)`

        if (dist > 0) {
            this.carousel.before.style.transform = `translateX(${x - this.carousel.current.offsetWidth}px)`
            if (this.carousel.before != this.carousel.after) {
                this.carousel.after.style.transform = `translateX(${x + this.carousel.current.offsetWidth}px)`
            }
        } else {
            this.carousel.after.style.transform = `translateX(${x + this.carousel.current.offsetWidth}px)`
            if (this.carousel.before != this.carousel.after) {
                this.carousel.before.style.transform = `translateX(${x - this.carousel.current.offsetWidth}px)`
            }
        }
    }

    dragEnd (e) {
        ;[this.carousel.current, this.carousel.before, this.carousel.after].forEach(el => {
            el.classList.remove('dragging')
        })

        let dist = this.carousel.currentInitialX - (this.carousel.dragInitialX - this.carousel.newX)

        if (dist < -this.options.threshold) {
            this.dragReset(this.carousel.before)
            this.navigate('next', 'drag')
            e.preventDefault();
        } else if (dist > this.options.threshold) {
            this.dragReset(this.carousel.after)
            this.navigate('prev', 'drag')
            e.preventDefault();
        } else {
            ;[this.carousel.current, this.carousel.before, this.carousel.after].forEach(el => {
                this.transitionStart(el)
                el.style.transform = null
            })
        }

        document.removeEventListener('mouseup', this.carousel.fn.dragEnd)
        document.removeEventListener('mousemove', this.carousel.fn.dragMove)
    }

    dragReset(el) {
        el.addEventListener('transitionend', this.carousel.fn.transitionEnd)
        el.style.transform = null;
    }

    transitionEnd (e) {
        const el = e.target
        this.transitionClear(el)
    }

    transitionStart(el) {
        el.addEventListener('transitionend', this.carousel.fn.transitionEnd)
        el.classList.add('transitioning')
        return el
    }

    transitionClear(el) {
        if (!el) {
            return false
        }

        if (el.baseTransitionClass !== undefined) {
            el.classList.remove(el.baseTransitionClass)
            delete el.baseTransitionClass
        }

        if (el.moveTransitionClass !== undefined) {
            el.classList.remove(el.moveTransitionClass)
            delete el.moveTransitionClass
        }

        el.style.transform = null
        el.classList.remove('transitioning')
        el.removeEventListener('transitionend', this.carousel.fn.transitionEnd)
    }
}
