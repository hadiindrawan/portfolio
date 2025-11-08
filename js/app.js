// Modern Portfolio - Main Application
import { Navigation } from './modules/navigation.js';
import { TypingEffect } from './modules/typing-effect.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { ProjectCarousel } from './modules/carousel.js';
import { DataRenderer } from './modules/data-renderer.js';
import { ImageOptimizer } from './modules/image-optimizer.js';

// Application Data
import { portfolioData } from './data/portfolio-data.js';

class PortfolioApp {
    constructor() {
        this.data = portfolioData;
        this.modules = {};
        
        this.init();
    }

    async init() {
        try {
            // Initialize modules
            await this.initializeModules();
            
            // Render dynamic content
            await this.renderContent();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize animations
            this.initializeAnimations();
            
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    async initializeModules() {
        // Initialize navigation
        this.modules.navigation = new Navigation();
        
        // Initialize typing effect
        this.modules.typingEffect = new TypingEffect('#typed-name', {
            strings: [this.data.personal.name],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 2000,
            loop: true
        });
        
        // Initialize scroll reveal
        this.modules.scrollReveal = new ScrollReveal();
        
        // Carousel will be initialized after projects are rendered
        
        // Initialize data renderer
        this.modules.dataRenderer = new DataRenderer();
        
        // Initialize image optimizer
        this.modules.imageOptimizer = new ImageOptimizer();
    }

    async renderContent() {
        // Render navigation
        this.modules.dataRenderer.renderNavigation(this.data.navigation, '#desktop-nav', '#mobile-nav');
        
        // Render social links
        this.modules.dataRenderer.renderSocialLinks(this.data.social, '#social-links', '#footer-social');
        
        // Render skills
        this.modules.dataRenderer.renderSkills(this.data.skills, '#skills-grid');
        
        // Render projects
        this.modules.dataRenderer.renderProjects(this.data.projects, '#project-carousel', '#carousel-indicators');
        
        // Initialize carousel after projects are rendered
        setTimeout(() => {
            this.modules.carousel = new ProjectCarousel('#project-carousel', {
                autoplay: true,
                autoplayDelay: 5000,
                loop: true
            });
        }, 100);
        
        // Render tools
        this.modules.dataRenderer.renderTools(this.data.tools, '#tools-grid');
    }

    setupEventListeners() {
        // Window scroll event for navbar
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    initializeAnimations() {
        // Start typing effect
        this.modules.typingEffect.start();
        
        // Initialize scroll reveal animations
        this.modules.scrollReveal.reveal('.skill-card', { delay: 100, interval: 200 });
        this.modules.scrollReveal.reveal('.tool-icon', { delay: 50, interval: 100 });
        
        // Add loading complete class
        document.body.classList.add('loaded');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for potential external use
export { PortfolioApp }; 