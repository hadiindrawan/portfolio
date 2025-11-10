// Data Renderer Module - Handles dynamic content rendering with modern practices
export class DataRenderer {
    constructor() {
        this.cache = new Map();
    }

    // Render navigation items
    renderNavigation(navItems, desktopSelector, mobileSelector) {
        const desktopNav = document.querySelector(desktopSelector);
        const mobileNav = document.querySelector(mobileSelector + ' div');

        if (desktopNav) {
            desktopNav.innerHTML = this.generateNavigationHTML(navItems, false);
        }

        if (mobileNav) {
            mobileNav.innerHTML = this.generateNavigationHTML(navItems, true);
        }
    }

    generateNavigationHTML(navItems, isMobile = false) {
        const baseClasses = isMobile 
            ? "block px-3 py-2 text-base font-medium transition-colors hover:text-soft-brown hover:bg-soft-brown/10 rounded-md cursor-pointer"
            : "text-sm font-medium transition-colors hover:text-soft-brown cursor-pointer";

        return navItems.map(item => `
            <a href="${item.href}" 
               data-nav-item="${item.href.slice(1)}"
               class="${baseClasses} text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-brown"
               role="menuitem"
               tabindex="0">
                ${item.text}
            </a>
        `).join('');
    }

    // Render social links
    renderSocialLinks(socialItems, ...selectors) {
        const html = this.generateSocialLinksHTML(socialItems);
        
        selectors.forEach(selector => {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = html;
            }
        });
    }

    generateSocialLinksHTML(socialItems) {
        return socialItems.map(item => {
            const icon = this.getSocialIcon(item.icon);
            return `
                <a href="${item.url}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="social-link w-12 h-12 rounded-full bg-warm-gray/10 hover:bg-soft-brown text-warm-gray hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-110"
                   title="${item.name}">
                    ${icon}
                </a>
            `;
        }).join('');
    }

    getSocialIcon(iconName) {
        const icons = {
            linkedin: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
            </svg>`,
            instagram: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>`,
            whatsapp: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.087"/>
            </svg>`,
            mail: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>`
        };

        return icons[iconName] || icons.mail;
    }

    // Render skills section
    renderSkills(skills, selector) {
        const container = document.querySelector(selector);
        if (!container) return;

        const html = skills.map((skill, index) => `
            <div class="skill-card reveal group" style="animation-delay: ${index * 100}ms">
                <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg" style="background-color: ${skill.color}20;">
                    <img src="${skill.icon}" alt="${skill.title}" class="w-10 h-10 object-contain">
                </div>
                <h3 class="text-xl font-display font-semibold mb-3 text-center">${skill.title}</h3>
                <p class="text-warm-gray text-center mb-4 leading-relaxed">${skill.description}</p>
                <div class="mt-4 text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style="background-color: ${skill.color}15; color: ${skill.color};">
                        ${skill.expertise} Level
                    </span>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // Render projects carousel
    renderProjects(projects, carouselSelector, indicatorsSelector) {
        const carousel = document.querySelector(carouselSelector);
        const indicators = document.querySelector(indicatorsSelector);

        if (carousel) {
            const html = projects.map((project, index) => `
                <div class="carousel-slide flex-shrink-0 w-full relative bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div class="relative h-80 overflow-hidden cursor-pointer group" data-project-index="${index}">
                        <img src="${project.image}" 
                             alt="${project.title}" 
                             class="carousel-image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                             loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        <!-- Preview Overlay -->
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div class="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                                <svg class="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <span class="text-sm font-medium text-charcoal">View Details</span>
                            </div>
                        </div>
                        
                        <div class="absolute bottom-4 left-4 right-4 text-white">
                            <span class="inline-block px-3 py-1 bg-soft-brown text-xs font-semibold rounded-full mb-2">
                                ${project.category}
                            </span>
                        </div>
                    </div>
                    <div class="carousel-content p-6">
                        <h3 class="text-2xl font-display font-bold mb-3">${project.title}</h3>
                        <p class="text-warm-gray mb-4 leading-relaxed">${project.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.technologies.map(tech => 
                                `<span class="px-3 py-1 bg-cream text-charcoal text-sm rounded-full">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="flex justify-between items-center text-sm text-warm-gray">
                            <span>${project.year}</span>
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full">${project.status}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            carousel.innerHTML = html;
        }

        if (indicators) {
            const indicatorHTML = projects.map((_, index) => `
                <button class="w-3 h-3 rounded-full transition-colors ${index === 0 ? 'bg-soft-brown' : 'bg-gray-300'}" 
                        data-carousel-indicator="${index}"></button>
            `).join('');

            indicators.innerHTML = indicatorHTML;
        }
    }

    // Render tools grid
    renderTools(tools, selector) {
        const container = document.querySelector(selector);
        if (!container) return;

        const html = tools.map((tool, index) => `
            <div class="tool-icon reveal group text-center" style="animation-delay: ${index * 50}ms">
                <div class="w-full h-20 flex items-center justify-center mb-3">
                    <img src="${tool.image}" 
                         alt="${tool.name}" 
                         class="max-w-full max-h-full object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                         loading="lazy">
                </div>
                <h4 class="text-sm font-medium text-charcoal group-hover:text-soft-brown transition-colors break-words hyphens-auto">
                    ${tool.name}
                </h4>
                <p class="text-xs text-warm-gray mt-1">${tool.category}</p>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // Utility method to render any list with custom template
    renderList(data, selector, templateFn) {
        const container = document.querySelector(selector);
        if (!container || !Array.isArray(data)) return;

        const html = data.map((item, index) => templateFn(item, index)).join('');
        container.innerHTML = html;
    }

    // Method to update content dynamically
    updateContent(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = content;
        }
    }

    // Method to append content
    appendContent(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.insertAdjacentHTML('beforeend', content);
        }
    }

    // Method to clear cache
    clearCache() {
        this.cache.clear();
    }

    // Method to cache rendered content
    cacheContent(key, content) {
        this.cache.set(key, content);
    }

    // Method to get cached content
    getCachedContent(key) {
        return this.cache.get(key);
    }

    // Method to render testimonials
    renderTestimonials(testimonials, selector) {
        if (!testimonials || testimonials.length === 0) return;

        const container = document.querySelector(selector);
        if (!container) return;

        const html = testimonials.map(testimonial => `
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    ${Array.from({length: 5}, (_, i) => 
                        `<svg class="w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>`
                    ).join('')}
                </div>
                <p class="text-warm-gray italic mb-4">"${testimonial.text}"</p>
                <div class="font-semibold text-charcoal">${testimonial.name}</div>
                <div class="text-sm text-warm-gray">${testimonial.company}</div>
            </div>
        `).join('');

        container.innerHTML = html;
    }
}