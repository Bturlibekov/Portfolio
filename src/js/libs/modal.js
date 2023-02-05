export class Modal {
    constructor(options) {
        let defaultOptions = {
            isOpen: () => { },
            isClose: () => { },
        }
        this.options = Object.assign(defaultOptions, options)
        this.modal = document.querySelector('.modal')
        this.speed = 300
        this.animation = false
        this.isOpen = false
        this.modalContainer = false
        this.previousActiveElement = false
        this.fixBlocks = document.querySelectorAll('.fix-block')
        this.focusElements = ['a[href]', 'input', 'button', 'select', 'textarea', '[tabindex]']
        this.events()
    }

    events() {
        if (this.modal) {
            document.addEventListener('click', function (event) {
                const clickdedElement = event.target.closest('[data-path]')
                if (clickdedElement) {
                    let target = clickdedElement.dataset.path
                    let animation = clickdedElement.dataset.animation
                    let speed = clickdedElement.dataset.speed
                    this.animation = animation ? animation : 'fade'
                    this.speed = speed ? parseInt(speed) : 300
                    this.modalContainer = document.querySelector(`[data-target="${target}"]`)
                    this.open()
                    return
                }

                if (event.target.closest('.modal-close')) {
                    this.close()
                    return
                }
            }.bind(this))

            window.addEventListener('keydown', function (event) {
                if (event.keyCode == 27) {
                    if (this.isOpen) {
                        this.close()
                    }
                }

                if (event.keyCode == 9 && this.isOpen()) {
                    this.focusCatch(event)
                    return
                }

            }.bind(this))

            this.modal.addEventListener('click', function (event) {
                if (!event.target.classList.contains('modal__container') && !event.target.closest('.modal__container') && this.open) {
                    this.close()
                }
            }.bind(this))
        }
    }

    open() {
        this.previousActiveElement = document.activeElement

        this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`)
        this.modal.classList.add('is-open')
        this.disableScroll()

        this.modalContainer.classList.add('modal-open', this.animation)

        setTimeout(() => {
            this.options.isOpen(this)
            this.modalContainer.classList.add('animate-open')
            this.isOpen = true
            this.focusTrap()
        }, this.speed)
    }

    close() {
        if (this.modalContainer) {
            this.modalContainer.classList.remove('animate-open')
            this.modalContainer.classList.remove(this.animation)
            this.modal.classList.remove('is-open')
            this.modalContainer.classList.remove('modal-open')

            this.enableScroll()
            this.options.isClose(this)
            this.isOpen = false
            this.focusTrap()
        }
    }

    focusCatch(event) {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements)
        const focusArray = Array.prototype.slice.call(focusable)
        const focusedIndex = focusArray.indexOf(document.activeElement)

        if (event.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus()
            event.preventDefault()
        }

        if (!event.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus()
            event.preventDefault()
        }
    }

    focusTrap() {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements)
        if (this.isOpen) {
            focusable[0].focus()
        } else {
            this.previousActiveElement.focus()
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY
        this.lockPadding()
        document.body.classList.add('disable-scroll')
        document.body.dataset.position = pagePosition
        document.body.style.top = -pagePosition + 'px'
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10)
        this.unlockPadding()
        document.body.style.top = 'auto'
        document.body.classList.remove('disable-scroll')
        window.scroll({ top: pagePosition, left: 0 })
        document.body.removeAttribute('data-position')
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset
        })
        document.body.style.paddingRight = paddingOffset
    }

    unlockPadding() {
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px'
        })
        document.body.style.paddingRight = '0px'
    }
}