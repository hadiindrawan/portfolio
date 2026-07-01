// Modern Portfolio — Main Application
import { Navigation } from './modules/navigation.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { DataRenderer } from './modules/data-renderer.js';
import { ImageOptimizer } from './modules/image-optimizer.js';
import { ProjectModal } from './modules/project-modal.js';

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
            await this.initializeModules();
            this.renderContent();
            this.setupEventListeners();
            this.setupContactForm();
            this.setupAnnouncement();
            this.initReveal();
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    async initializeModules() {
        await new Promise(resolve => setTimeout(resolve, 50));
        this.modules.navigation = new Navigation();
        this.modules.scrollReveal = new ScrollReveal();
        this.modules.dataRenderer = new DataRenderer();
        this.modules.imageOptimizer = new ImageOptimizer();
        this.modules.projectModal = new ProjectModal();
    }

    renderContent() {
        const r = this.modules.dataRenderer;
        const d = this.data;

        r.renderNavigation(d.navigation, '#desktop-nav', '#mobile-nav');
        r.renderStats(d.stats, '#hero-stats');
        r.renderCompanies(d.companies, '#companies-strip');
        r.renderAbout(d.about, '#about-lead', '#about-body', '#about-highlights');
        r.renderExperience(d.experience, '#experience-list');
        r.renderSkills(d.skills, '#skills-grid');
        r.renderProjects(d.projects, '#projects-grid');
        r.renderTools(d.tools, '#tools-grid');
        r.renderStackChips(d.stackList, '#stack-chips');
        r.renderWriting(d.writing, '#writing-list');
        r.renderSpeaking(d.speaking, '#speaking-list');
        r.renderLibraries(d.libraries, '#libraries-list');
        r.renderSocialLinks(d.social, '#footer-social');

        // Wire the résumé link(s)
        const resume = document.getElementById('hero-resume');
        if (resume) resume.href = d.personal.resumeUrl;

        // Project modal data
        this.modules.projectModal.setProjects(d.projects);
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Keyboard access for project cards
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('[data-project-index]');
                if (card) {
                    e.preventDefault();
                    card.click();
                }
            }
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    handleSmoothScroll(e) {
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    setupAnnouncement() {
        const bar = document.getElementById('announcement-bar');
        const close = document.getElementById('announcement-close');
        if (close && bar) {
            close.addEventListener('click', () => { bar.style.display = 'none'; });
        }
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = encodeURIComponent(form.name.value || '');
            const email = form.email.value || '';
            const message = form.message.value || '';
            const subject = `Portfolio enquiry from ${decodeURIComponent(name)}`;
            const body = `${message}\n\n— ${decodeURIComponent(name)} (${email})`;
            window.location.href =
                `mailto:${this.data.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // Reveal .reveal elements as they enter the viewport.
    // Primary: IntersectionObserver. Fallback: a scroll/resize + initial
    // geometry pass, so above-the-fold content shows immediately on load and
    // nothing ever gets permanently stuck hidden if IO doesn't fire.
    initReveal() {
        const pending = new Set(document.querySelectorAll('.reveal'));
        const margin = 40;
        let observer = null;

        const activate = (el) => {
            el.classList.add('active');
            pending.delete(el);
            if (observer) observer.unobserve(el);
        };

        const teardown = () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };

        // Fallback pass: reveal anything currently within the viewport.
        const check = () => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            pending.forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.top < vh - margin && r.bottom > 0) activate(el);
            });
            if (pending.size === 0) teardown();
        };

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { ticking = false; check(); });
        };

        // Primary path: IntersectionObserver for smooth scroll-in reveals.
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) activate(entry.target); });
                if (pending.size === 0) teardown();
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            pending.forEach(el => observer.observe(el));
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        // Run the fallback pass now and again after layout settles — the Tailwind
        // CDN applies styles asynchronously, so element geometry isn't final on
        // the first tick.
        check();
        window.addEventListener('load', check);
        setTimeout(check, 200);
        setTimeout(check, 800);

        document.body.classList.add('loaded');
    }
}

document.addEventListener('DOMContentLoaded', () => new PortfolioApp());

export { PortfolioApp };
