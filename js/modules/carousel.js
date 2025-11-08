// Project Carousel Module - Modern touch-enabled carousel
export class ProjectCarousel {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        this.options = {
            autoplay: options.autoplay || false,
            autoplayDelay: options.autoplayDelay || 5000,
            loop: options.loop !== undefined ? options.loop : true,
            touchEnabled: options.touchEnabled !== undefined ? options.touchEnabled : true,
            keyboardEnabled: options.keyboardEnabled !== undefined ? options.keyboardEnabled : true,
            ...options
        };

        this.currentIndex = 0;
        this.slides = [];
        this.isTransitioning = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (!this.container) {
            console.error('ProjectCarousel: Container not found');
            return;
        }

        this.setupCarousel();
        this.bindEvents();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    setupCarousel() {
        this.slides = Array.from(this.container.children);
        
        if (this.slides.length === 0) {
            console.warn('ProjectCarousel: No slides found');
            return;
        }

        // Ensure container has proper styling
        this.container.style.display = 'flex';
        this.container.style.transition = 'transform 0.5s ease-in-out';

        // Set initial positions - slides should be side by side
        this.slides.forEach((slide, index) => {
            slide.style.flex = '0 0 100%';
            slide.style.minWidth = '100%';
            slide.classList.add('carousel-slide');
            
            if (index === 0) {
                slide.classList.add('active');
            }
        });

        this.updateCarousel();
    }

    bindEvents() {
        // Control buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // Touch events
        if (this.options.touchEnabled) {
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }

        // Keyboard navigation
        if (this.options.keyboardEnabled) {
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
        }

        // Pause autoplay on hover
        if (this.options.autoplay) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }

        // Indicator clicks
        this.bindIndicatorEvents();

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    bindIndicatorEvents() {
        const indicators = document.querySelectorAll('[data-carousel-indicator]');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }

    next() {
        if (this.isTransitioning) return;

        const nextIndex = this.currentIndex + 1;
        
        if (nextIndex >= this.slides.length) {
            if (this.options.loop) {
                this.goToSlide(0);
            }
        } else {
            this.goToSlide(nextIndex);
        }
    }

    prev() {
        if (this.isTransitioning) return;

        const prevIndex = this.currentIndex - 1;
        
        if (prevIndex < 0) {
            if (this.options.loop) {
                this.goToSlide(this.slides.length - 1);
            }
        } else {
            this.goToSlide(prevIndex);
        }
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.isTransitioning = true;
        this.currentIndex = index;

        this.updateCarousel();

        // Reset transition lock after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    updateCarousel() {
        // Move the entire container instead of individual slides
        const offset = -this.currentIndex * 100;
        this.container.style.transform = `translateX(${offset}%)`;

        // Update active states
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });

        this.updateIndicators();
        this.updateControlButtons();

        // Dispatch custom event
        this.container.dispatchEvent(new CustomEvent('carousel:change', {
            detail: {
                currentIndex: this.currentIndex,
                currentSlide: this.slides[this.currentIndex]
            }
        }));
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('[data-carousel-indicator]');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-soft-brown', index === this.currentIndex);
            indicator.classList.toggle('bg-gray-300', index !== this.currentIndex);
        });
    }

    updateControlButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (!this.options.loop) {
            if (prevBtn) {
                prevBtn.disabled = this.currentIndex === 0;
                prevBtn.classList.toggle('opacity-50', this.currentIndex === 0);
            }

            if (nextBtn) {
                nextBtn.disabled = this.currentIndex === this.slides.length - 1;
                nextBtn.classList.toggle('opacity-50', this.currentIndex === this.slides.length - 1);
            }
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartX - this.touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped left - go to next
                this.next();
            } else {
                // Swiped right - go to previous
                this.prev();
            }
        }
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.next();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
        }
    }

    handleResize() {
        // Recalculate positions on resize
        this.updateCarousel();
    }

    startAutoplay() {
        if (!this.options.autoplay) return;

        this.pauseAutoplay(); // Clear any existing timer
        
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.options.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    // Public API methods
    getCurrentIndex() {
        return this.currentIndex;
    }

    getTotalSlides() {
        return this.slides.length;
    }

    addSlide(slideHTML, index = -1) {
        const slideElement = document.createElement('div');
        slideElement.innerHTML = slideHTML;
        slideElement.classList.add('carousel-slide');

        if (index === -1 || index >= this.slides.length) {
            this.container.appendChild(slideElement);
            this.slides.push(slideElement);
        } else {
            this.container.insertBefore(slideElement, this.slides[index]);
            this.slides.splice(index, 0, slideElement);
        }

        this.setupCarousel();
    }

    removeSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        const slideToRemove = this.slides[index];
        slideToRemove.remove();
        this.slides.splice(index, 1);

        // Adjust current index if necessary
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = this.slides.length - 1;
        }

        this.setupCarousel();
    }

    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeydown);

        // Reset slides
        this.slides.forEach(slide => {
            slide.style.transform = '';
            slide.classList.remove('carousel-slide', 'active');
        });

        this.slides = [];
    }

    // Static method to create carousel with indicators
    static createWithIndicators(containerSelector, indicatorContainer) {
        const carousel = new ProjectCarousel(containerSelector);
        
        // Generate indicators
        const slides = carousel.getTotalSlides();
        const indicatorsHTML = Array.from({ length: slides }, (_, index) => 
            `<button class="w-3 h-3 rounded-full transition-colors ${index === 0 ? 'bg-soft-brown' : 'bg-gray-300'}" 
                     data-carousel-indicator="${index}"></button>`
        ).join('');

        document.querySelector(indicatorContainer).innerHTML = indicatorsHTML;
        carousel.bindIndicatorEvents();

        return carousel;
    }
}