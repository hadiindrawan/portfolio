// Typing Effect Module - Modern typewriter effect without external dependencies
export class TypingEffect {
    constructor(selector, options = {}) {
        this.element = document.querySelector(selector);
        this.options = {
            strings: options.strings || ['Hello World'],
            typeSpeed: options.typeSpeed || 50,
            backSpeed: options.backSpeed || 30,
            backDelay: options.backDelay || 1500,
            startDelay: options.startDelay || 0,
            loop: options.loop !== undefined ? options.loop : true,
            showCursor: options.showCursor !== undefined ? options.showCursor : true,
            cursorChar: options.cursorChar || '|',
            ...options
        };

        this.currentString = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.timeout = null;

        this.init();
    }

    init() {
        if (!this.element) {
            console.error('TypingEffect: Element not found');
            return;
        }

        this.setupCursor();
        this.setupInitialState();
    }

    setupCursor() {
        if (this.options.showCursor) {
            this.element.style.position = 'relative';
            
            // Create cursor element
            this.cursor = document.createElement('span');
            this.cursor.textContent = this.options.cursorChar;
            this.cursor.style.cssText = `
                animation: blink 1s infinite;
                color: inherit;
            `;

            // Add cursor animation styles if not already present
            if (!document.getElementById('typing-cursor-styles')) {
                const style = document.createElement('style');
                style.id = 'typing-cursor-styles';
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            this.element.appendChild(this.cursor);
        }
    }

    setupInitialState() {
        this.element.style.minHeight = '1.2em'; // Prevent layout shift
        this.updateText('');
    }

    start() {
        if (this.options.startDelay > 0) {
            setTimeout(() => this.type(), this.options.startDelay);
        } else {
            this.type();
        }
    }

    type() {
        if (this.isPaused) return;

        const currentString = this.options.strings[this.currentString];
        
        if (!this.isDeleting) {
            // Typing forward
            this.currentChar++;
            this.updateText(currentString.substring(0, this.currentChar));

            if (this.currentChar === currentString.length) {
                // String complete, prepare to delete
                if (this.options.loop || this.currentString < this.options.strings.length - 1) {
                    this.timeout = setTimeout(() => {
                        this.isDeleting = true;
                        this.type();
                    }, this.options.backDelay);
                }
                return;
            }

            // Continue typing
            this.timeout = setTimeout(() => this.type(), this.getTypeSpeed());
        } else {
            // Deleting backward
            this.currentChar--;
            this.updateText(currentString.substring(0, this.currentChar));

            if (this.currentChar === 0) {
                // Deletion complete, move to next string
                this.isDeleting = false;
                this.currentString = (this.currentString + 1) % this.options.strings.length;
                
                // If not looping and reached the end, stop
                if (!this.options.loop && this.currentString === 0) {
                    return;
                }

                this.timeout = setTimeout(() => this.type(), 100);
                return;
            }

            // Continue deleting
            this.timeout = setTimeout(() => this.type(), this.options.backSpeed);
        }
    }

    updateText(text) {
        const textNode = this.element.childNodes[0];
        if (textNode) {
            textNode.textContent = text;
        } else {
            this.element.insertBefore(document.createTextNode(text), this.cursor || null);
        }
    }

    getTypeSpeed() {
        // Add some randomness to typing speed for more natural feel
        const variation = this.options.typeSpeed * 0.3;
        return this.options.typeSpeed + (Math.random() - 0.5) * variation;
    }

    pause() {
        this.isPaused = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    resume() {
        this.isPaused = false;
        this.type();
    }

    stop() {
        this.isPaused = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    reset() {
        this.stop();
        this.currentString = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.updateText('');
    }

    destroy() {
        this.stop();
        if (this.cursor) {
            this.cursor.remove();
        }
        this.element.textContent = '';
    }

    // Static method to create multiple typing effects
    static createMultiple(configs) {
        return configs.map(config => new TypingEffect(config.selector, config.options));
    }

    // Method to change strings dynamically
    updateStrings(newStrings) {
        this.options.strings = newStrings;
        this.reset();
        this.start();
    }

    // Method to get current progress
    getProgress() {
        return {
            currentString: this.currentString,
            currentChar: this.currentChar,
            isDeleting: this.isDeleting,
            totalStrings: this.options.strings.length
        };
    }
}