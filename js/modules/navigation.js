// Navigation Module - Modern navigation with smooth scrolling and mobile support
export class Navigation {
    constructor() {
        this.mobileMenuOpen = false;
        this.activeSection = 'home';
        
        this.init();
    }

    init() {
        // Ensure DOM is ready before binding events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.setupActiveNavigation();
            });
        } else {
            this.bindEvents();
            this.setupActiveNavigation();
        }
    }

    bindEvents() {
        // Mobile menu toggle with debugging
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button clicked');
                this.toggleMobileMenu();
            });
        } else {
            console.warn('Navigation: Mobile menu elements not found, retrying in 500ms');
            // Retry after a short delay
            setTimeout(() => {
                const retryBtn = document.getElementById('mobile-menu-btn');
                const retryNav = document.getElementById('mobile-nav');
                if (retryBtn && retryNav) {
                    retryBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleMobileMenu();
                    });
                } else {
                    console.error('Navigation: Mobile menu elements still not found after retry');
                }
            }, 500);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && !e.target.closest('#mobile-nav') && !e.target.closest('#mobile-menu-btn')) {
                this.closeMobileMenu();
            }
        });

        // Navigation link clicks - using event delegation for dynamically added content
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = e.target.closest('a[href^="#"]');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });

        // Scroll spy for active navigation
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileNav) {
            mobileNav.classList.remove('hidden');
            mobileNav.style.display = 'block'; // Fallback in case CSS classes don't work
            mobileNav.setAttribute('aria-expanded', 'true');
        } else {
            console.error('Mobile nav element not found!');
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = `
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            console.error('Mobile menu button not found!');
        }
        
        this.mobileMenuOpen = true;
        
        // Add body scroll lock
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileNav) {
            mobileNav.classList.add('hidden');
            mobileNav.style.display = 'none'; // Fallback
            mobileNav.setAttribute('aria-expanded', 'false');
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = `
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        
        this.mobileMenuOpen = false;
        
        // Remove body scroll lock
        document.body.style.overflow = '';
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    setupActiveNavigation() {
        // Initialize intersection observer for sections
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveNavItem(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                currentSection = section.id;
            }
        });

        if (currentSection && currentSection !== this.activeSection) {
            this.setActiveNavItem(currentSection);
        }
    }

    setActiveNavItem(sectionId) {
        this.activeSection = sectionId;
        
        // Remove active class from all nav items
        const navItems = document.querySelectorAll('[data-nav-item]');
        navItems.forEach(item => {
            item.classList.remove('text-soft-brown', 'font-semibold');
            item.classList.add('text-charcoal');
        });

        // Add active class to current nav item
        const activeItem = document.querySelector(`[data-nav-item="${sectionId}"]`);
        if (activeItem) {
            activeItem.classList.add('text-soft-brown', 'font-semibold');
            activeItem.classList.remove('text-charcoal');
        }
    }

    // Method to generate navigation HTML
    generateNavHTML(navItems, isMobile = false) {
        const baseClasses = isMobile 
            ? "block px-3 py-2 text-base font-medium transition-colors hover:text-soft-brown"
            : "text-sm font-medium transition-colors hover:text-soft-brown";

        return navItems.map(item => `
            <a href="${item.href}" 
               data-nav-item="${item.href.slice(1)}"
               class="${baseClasses} text-charcoal">
                ${item.text}
            </a>
        `).join('');
    }

    // Method to update navigation on scroll for navbar styling
    updateNavbarAppearance() {
        const navbar = document.getElementById('navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('bg-cream/95', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.remove('bg-cream/80');
        } else {
            navbar.classList.remove('bg-cream/95', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.add('bg-cream/80');
        }
    }
}