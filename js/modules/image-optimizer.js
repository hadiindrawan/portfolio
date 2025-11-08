// Image Optimizer Module - Lazy loading and responsive images
export class ImageOptimizer {
    constructor(options = {}) {
        this.options = {
            rootMargin: options.rootMargin || '50px',
            threshold: options.threshold || 0.1,
            enableWebP: options.enableWebP !== undefined ? options.enableWebP : true,
            placeholderColor: options.placeholderColor || '#f3f4f6',
            fadeInDuration: options.fadeInDuration || 300,
            ...options
        };

        this.observer = null;
        this.webPSupported = false;
        this.images = new Set();

        this.init();
    }

    async init() {
        // Check WebP support
        this.webPSupported = await this.checkWebPSupport();
        
        // Setup intersection observer
        this.setupObserver();
        
        // Find and process existing images
        this.processExistingImages();
        
        // Setup mutation observer for dynamic content
        this.setupMutationObserver();
    }

    checkWebPSupport() {
        return new Promise(resolve => {
            if (!this.options.enableWebP) {
                resolve(false);
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            
            canvas.toBlob(blob => {
                resolve(blob && blob.type === 'image/webp');
            }, 'image/webp');
        });
    }

    setupObserver() {
        const observerOptions = {
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    setupMutationObserver() {
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the node itself is an image
                        if (node.tagName === 'IMG') {
                            this.processImage(node);
                        }
                        
                        // Check for images in added content
                        const images = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
                        images.forEach(img => this.processImage(img));
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    processExistingImages() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]:not([data-processed])');
        images.forEach(img => this.processImage(img));
    }

    processImage(img) {
        if (this.images.has(img) || img.hasAttribute('data-processed')) {
            return;
        }

        // Mark as processed
        img.setAttribute('data-processed', 'true');
        this.images.add(img);

        // Setup lazy loading
        this.setupLazyLoading(img);
        
        // Setup responsive image handling
        this.setupResponsiveImage(img);
        
        // Setup error handling
        this.setupErrorHandling(img);
        
        // Add to observer
        this.observer.observe(img);
    }

    setupLazyLoading(img) {
        // Create placeholder if image doesn't have src
        if (!img.src || img.hasAttribute('data-src')) {
            this.createPlaceholder(img);
        }

        // Store original data
        const dataSrc = img.getAttribute('data-src');
        const dataSrcSet = img.getAttribute('data-srcset');
        
        if (dataSrc) {
            img.setAttribute('data-original-src', dataSrc);
        }
        
        if (dataSrcSet) {
            img.setAttribute('data-original-srcset', dataSrcSet);
        }
    }

    createPlaceholder(img) {
        // Get dimensions
        const width = img.getAttribute('width') || img.offsetWidth || 300;
        const height = img.getAttribute('height') || img.offsetHeight || 200;
        
        // Create SVG placeholder
        const placeholder = this.generatePlaceholderSVG(width, height);
        
        // Set placeholder as src if no src exists
        if (!img.src) {
            img.src = placeholder;
        }
        
        // Add loading styles
        img.style.backgroundColor = this.options.placeholderColor;
        img.style.transition = `opacity ${this.options.fadeInDuration}ms ease-in-out`;
    }

    generatePlaceholderSVG(width, height) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="${this.options.placeholderColor}"/>
                <g fill="#d1d5db" transform="translate(${width/2-24},${height/2-24})">
                    <path d="M48 38.667V9.333c0-1.467-1.2-2.667-2.667-2.667H2.667C1.2 6.667 0 7.867 0 9.333v29.333C0 40.133 1.2 41.333 2.667 41.333h42.667c1.467 0 2.667-1.2 2.667-2.667zM16 24L9.333 32h29.333L32 22.667 25.333 32 16 24z"/>
                </g>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    setupResponsiveImage(img) {
        // Handle srcset for responsive images
        const originalSrcSet = img.getAttribute('data-srcset');
        if (originalSrcSet) {
            img.setAttribute('data-responsive', 'true');
        }
    }

    setupErrorHandling(img) {
        img.addEventListener('error', () => {
            this.handleImageError(img);
        }, { once: true });
    }

    async loadImage(img) {
        const originalSrc = img.getAttribute('data-original-src') || img.getAttribute('data-src');
        const originalSrcSet = img.getAttribute('data-original-srcset') || img.getAttribute('data-srcset');
        
        if (!originalSrc && !originalSrcSet) return;

        // Show loading state
        this.setLoadingState(img, true);

        try {
            // Optimize image URL if WebP is supported
            const optimizedSrc = this.optimizeImageUrl(originalSrc);
            const optimizedSrcSet = this.optimizeSrcSet(originalSrcSet);

            // Preload the image
            await this.preloadImage(optimizedSrc);

            // Set the actual image source
            if (optimizedSrcSet) {
                img.srcset = optimizedSrcSet;
            }
            
            if (optimizedSrc) {
                img.src = optimizedSrc;
            }

            // Handle successful load
            img.addEventListener('load', () => {
                this.handleImageLoad(img);
            }, { once: true });

        } catch (error) {
            console.warn('Image optimization failed, using original:', error);
            
            // Fallback to original sources
            if (originalSrcSet) img.srcset = originalSrcSet;
            if (originalSrc) img.src = originalSrc;
        }
    }

    optimizeImageUrl(src) {
        if (!src || !this.webPSupported) return src;

        // Simple WebP conversion for supported formats
        if (src.match(/\.(jpg|jpeg|png)$/i)) {
            return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }

        return src;
    }

    optimizeSrcSet(srcset) {
        if (!srcset || !this.webPSupported) return srcset;

        return srcset.replace(/\.(jpg|jpeg|png)(\s+\d+[wx]?)/gi, '.webp$2');
    }

    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }

    setLoadingState(img, loading) {
        if (loading) {
            img.classList.add('loading');
            img.style.opacity = '0.7';
        } else {
            img.classList.remove('loading');
            img.style.opacity = '1';
        }
    }

    handleImageLoad(img) {
        // Remove loading state
        this.setLoadingState(img, false);
        
        // Add loaded class
        img.classList.add('loaded');
        
        // Trigger fade-in effect
        img.style.opacity = '1';
        
        // Clean up data attributes
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        
        // Dispatch custom event
        img.dispatchEvent(new CustomEvent('image:loaded', {
            detail: { element: img }
        }));
    }

    handleImageError(img) {
        console.warn('Image failed to load:', img.src);
        
        // Try fallback sources
        const fallbackSrc = img.getAttribute('data-fallback') || this.generateErrorPlaceholder(img);
        
        if (fallbackSrc && img.src !== fallbackSrc) {
            img.src = fallbackSrc;
        }
        
        // Add error class
        img.classList.add('image-error');
        
        // Dispatch custom event
        img.dispatchEvent(new CustomEvent('image:error', {
            detail: { element: img }
        }));
    }

    generateErrorPlaceholder(img) {
        const width = img.offsetWidth || 300;
        const height = img.offsetHeight || 200;
        
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <g fill="#9ca3af" transform="translate(${width/2-12},${height/2-12})">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </g>
                <text x="50%" y="60%" text-anchor="middle" fill="#6b7280" font-size="14" font-family="sans-serif">Image not available</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    // Public methods
    processNewImages(selector = 'img[data-src]') {
        const images = document.querySelectorAll(selector);
        images.forEach(img => this.processImage(img));
    }

    loadAllImages() {
        this.images.forEach(img => {
            if (img.getAttribute('data-original-src') || img.getAttribute('data-src')) {
                this.loadImage(img);
            }
        });
    }

    getStats() {
        const total = this.images.size;
        const loaded = document.querySelectorAll('img.loaded').length;
        const errors = document.querySelectorAll('img.image-error').length;
        
        return {
            total,
            loaded,
            errors,
            pending: total - loaded - errors
        };
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        this.images.clear();
    }

    // Static method for quick setup
    static init(options = {}) {
        return new ImageOptimizer(options);
    }
}