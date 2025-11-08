// Scroll Reveal Module - Modern intersection observer based animations
export class ScrollReveal {
    constructor(options = {}) {
        this.defaultOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
            once: true,
            reset: false,
            delay: 0,
            interval: 0,
            scale: 1,
            distance: '30px',
            duration: 800,
            easing: 'ease-out',
            origin: 'bottom',
            opacity: 0,
            ...options
        };

        this.observers = new Map();
        this.animatedElements = new Set();
        
        this.init();
    }

    init() {
        this.setupDefaultStyles();
    }

    setupDefaultStyles() {
        // Add default reveal styles if not already present
        if (!document.getElementById('scroll-reveal-styles')) {
            const style = document.createElement('style');
            style.id = 'scroll-reveal-styles';
            style.textContent = `
                .sr-element {
                    visibility: hidden;
                }
                
                .sr-element.sr-visible {
                    visibility: visible;
                }

                .sr-fade {
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-fade.sr-visible {
                    opacity: 1;
                }

                .sr-slide-up {
                    transform: translateY(var(--sr-distance, 30px));
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-slide-up.sr-visible {
                    transform: translateY(0);
                    opacity: 1;
                }

                .sr-slide-down {
                    transform: translateY(calc(-1 * var(--sr-distance, 30px)));
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-slide-down.sr-visible {
                    transform: translateY(0);
                    opacity: 1;
                }

                .sr-slide-left {
                    transform: translateX(var(--sr-distance, 30px));
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-slide-left.sr-visible {
                    transform: translateX(0);
                    opacity: 1;
                }

                .sr-slide-right {
                    transform: translateX(calc(-1 * var(--sr-distance, 30px)));
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-slide-right.sr-visible {
                    transform: translateX(0);
                    opacity: 1;
                }

                .sr-scale {
                    transform: scale(var(--sr-scale, 0.9));
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-scale.sr-visible {
                    transform: scale(1);
                    opacity: 1;
                }

                .sr-zoom {
                    transform: scale(0.8);
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-zoom.sr-visible {
                    transform: scale(1);
                    opacity: 1;
                }

                .sr-flip-horizontal {
                    transform: rotateY(90deg);
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-flip-horizontal.sr-visible {
                    transform: rotateY(0);
                    opacity: 1;
                }

                .sr-flip-vertical {
                    transform: rotateX(90deg);
                    opacity: 0;
                    transition: all var(--sr-duration, 800ms) var(--sr-easing, ease-out) var(--sr-delay, 0ms);
                }

                .sr-flip-vertical.sr-visible {
                    transform: rotateX(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }
    }

    reveal(selector, options = {}) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector) 
            : [selector];

        if (elements.length === 0) return;

        const config = { ...this.defaultOptions, ...options };
        
        elements.forEach((element, index) => {
            if (!element) return;

            this.prepareElement(element, config, index);
            this.observeElement(element, config);
        });
    }

    prepareElement(element, config, index) {
        // Add base class
        element.classList.add('sr-element');
        
        // Add animation class based on origin
        const animationClass = this.getAnimationClass(config.origin);
        element.classList.add(animationClass);

        // Set CSS custom properties
        const delay = config.delay + (config.interval * index);
        element.style.setProperty('--sr-duration', `${config.duration}ms`);
        element.style.setProperty('--sr-easing', config.easing);
        element.style.setProperty('--sr-delay', `${delay}ms`);
        element.style.setProperty('--sr-distance', config.distance);
        element.style.setProperty('--sr-scale', config.scale);
    }

    getAnimationClass(origin) {
        switch (origin) {
            case 'top': return 'sr-slide-down';
            case 'bottom': return 'sr-slide-up';
            case 'left': return 'sr-slide-right';
            case 'right': return 'sr-slide-left';
            case 'scale': return 'sr-scale';
            case 'zoom': return 'sr-zoom';
            case 'flip-horizontal': return 'sr-flip-horizontal';
            case 'flip-vertical': return 'sr-flip-vertical';
            default: return 'sr-fade';
        }
    }

    observeElement(element, config) {
        const observerOptions = {
            threshold: config.threshold,
            rootMargin: config.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, config);
                    
                    if (config.once) {
                        observer.unobserve(entry.target);
                    }
                } else if (config.reset && this.animatedElements.has(entry.target)) {
                    this.resetElement(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(element);
        
        // Store observer for cleanup
        this.observers.set(element, observer);
    }

    animateElement(element, config) {
        // Add visible class to trigger animation
        element.classList.add('sr-visible');
        this.animatedElements.add(element);

        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('sr:reveal', {
            detail: { element, config }
        }));
    }

    resetElement(element) {
        element.classList.remove('sr-visible');
        this.animatedElements.delete(element);

        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('sr:reset', {
            detail: { element }
        }));
    }

    // Clean up observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();

        // Remove all sr classes from elements
        document.querySelectorAll('.sr-element').forEach(element => {
            element.className = element.className.replace(/sr-[\w-]+/g, '').trim();
            element.style.removeProperty('--sr-duration');
            element.style.removeProperty('--sr-easing');
            element.style.removeProperty('--sr-delay');
            element.style.removeProperty('--sr-distance');
            element.style.removeProperty('--sr-scale');
        });
    }

    // Manually trigger reveal for specific elements
    triggerReveal(selector) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector) 
            : [selector];

        elements.forEach(element => {
            if (element && !this.animatedElements.has(element)) {
                this.animateElement(element, this.defaultOptions);
            }
        });
    }

    // Check if element is revealed
    isRevealed(element) {
        return this.animatedElements.has(element);
    }

    // Batch reveal multiple selectors
    revealBatch(configs) {
        configs.forEach(config => {
            this.reveal(config.selector, config.options);
        });
    }

    // Static method for quick setup
    static init(selector, options = {}) {
        const sr = new ScrollReveal();
        sr.reveal(selector, options);
        return sr;
    }

    // Method to sync with other animations
    sync(callback) {
        document.addEventListener('sr:reveal', callback);
    }

    // Method to get animation statistics
    getStats() {
        return {
            totalObservers: this.observers.size,
            animatedElements: this.animatedElements.size,
            pendingElements: this.observers.size - this.animatedElements.size
        };
    }
}