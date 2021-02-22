export default class Slide {
    constructor(el) {
        this.slide = el
        this.active = false
        this.moving = false
        this.dragging = false
        this.transition = []

        this.moveEndFn = this.moveEnd.bind(this)
    }

    isActive() {
        return this.active
    }

    isMoving() {
        return this.moving
    }

    isDragging() {
        return this.dragging
    }

    activate() {
        this.active = true
        this.slide.classList.add('active')
    }

    deactivate() {
        this.active = false
        this.slide.classList.remove('active')
    }

    dragStart() {
        this.dragging = true
        this.slide.classList.add('dragging')
    }

    dragStop() {
        this.dragging = false
        this.slide.classList.remove('dragging')
    }

    dragMove(x, transition) {
        this.slide.style.transform = `translateX(${x}px)`

        if (transition === true) {
            this.addTransition('transitioning')
            this.addTransition(`carousel__transition--drag`)
            this.slide.addEventListener('transitionend', this.moveEndFn, true)
        }
    }

    dragReset() {
        this.slide.style.transform = null
    }

    addTransition(cls) {
        this.transition.push(cls)
        this.slide.classList.add(cls)
    }

    removeTransition(cls) {
        this.transition.filter(item => item !== cls)
        this.slide.classList.remove(cls)
    }

    move(type, transition, direction) {
        if (this.slide.classList.contains('transitioning')) {
            return false
        }

        this.moving = true

        const transitionBase = `carousel__transition--${transition}`
        const transitionMove = `carousel__transition--${transition}-${direction}`

        if (type == 'in') {
            this.addTransition(transitionMove)
        }

        requestAnimationFrame(() => {
            this.addTransition('transitioning')
            this.addTransition(transitionBase)
            if (type == 'in') {
                this.removeTransition(transitionMove)
            } else {
                this.addTransition(transitionMove)
            }
            this.slide.offsetWidth
            this.slide.addEventListener('transitionend', this.moveEndFn, true)
        })
    }

    drag(type, transition, direction, velocity) {
        if (this.slide.classList.contains('transitioning')) {
            return false
        }

        this.moving = true

        let velocityDuration = 0
        if (velocity > 0) {
            velocityDuration = (1 - (Math.min(99, velocity) / 100)) * 0.75
        }
        velocityDuration = velocity + 's'

        const transitionBase = `carousel__transition--${transition}`
        const transitionMove = `carousel__transition--${transition}-${direction}`

        this.slide.style.transform = null
        this.slide.style.transitionDuration = velocityDuration

        this.addTransition('transitioning')
        this.addTransition(transitionBase)

        if (type == 'in') {
            this.removeTransition(transitionMove)
        } else {
            this.addTransition(transitionMove)
        }

        this.slide.addEventListener('transitionend', this.moveEndFn, true)
    }

    moveEnd() {
        this.moving = false

        this.slide.removeEventListener('transitionend', this.moveEndFn, true)
        this.slide.style.transitionDuration = null
        this.transition.forEach(cls => this.removeTransition(cls))

        this.dragReset()
    }
}