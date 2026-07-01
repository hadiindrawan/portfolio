// Data Renderer Module — renders portfolio content in the Cohere design system.
export class DataRenderer {
    constructor() {
        this.cache = new Map();
    }

    // -- Navigation ---------------------------------------------------------
    renderNavigation(navItems, desktopSelector, mobileSelector) {
        const desktopNav = document.querySelector(desktopSelector);
        const mobileNav = document.querySelector(mobileSelector + ' > div');

        if (desktopNav) {
            desktopNav.innerHTML = navItems.map(item => `
                <a href="${item.href}"
                   data-nav-item="${item.href.slice(1)}"
                   class="text-sm font-medium text-ink hover:text-deep-green transition-colors cursor-pointer"
                   role="menuitem" tabindex="0">${item.text}</a>
            `).join('');
        }

        if (mobileNav) {
            const links = navItems.map(item => `
                <a href="${item.href}"
                   data-nav-item="${item.href.slice(1)}"
                   class="block px-3 py-2.5 text-base font-medium text-ink hover:text-deep-green hover:bg-pale-green rounded-sm transition-colors cursor-pointer"
                   role="menuitem" tabindex="0">${item.text}</a>
            `).join('');
            // Preserve the trailing CTA button already present in markup
            const cta = mobileNav.querySelector('a[href="#contact"].bg-primary');
            mobileNav.innerHTML = links;
            if (cta) mobileNav.appendChild(cta);
        }
    }

    // -- Hero stats ---------------------------------------------------------
    renderStats(stats, selector) {
        const el = document.querySelector(selector);
        if (!el || !stats) return;
        el.innerHTML = stats.map(s => `
            <div>
                <div class="font-display text-3xl md:text-4xl text-ink tracking-tightest">${s.value}</div>
                <div class="mt-1 text-[13px] text-body-muted leading-snug">${s.label}</div>
            </div>
        `).join('');
    }

    // -- Companies / trust strip -------------------------------------------
    renderCompanies(companies, selector) {
        const el = document.querySelector(selector);
        if (!el || !companies) return;
        el.innerHTML = companies.map(name => `<span class="company-mark">${name}</span>`).join('');
    }

    // -- About --------------------------------------------------------------
    renderAbout(about, leadSelector, bodySelector, highlightsSelector) {
        const lead = document.querySelector(leadSelector);
        if (lead) lead.textContent = about.lead;

        const body = document.querySelector(bodySelector);
        if (body) {
            body.innerHTML = about.description
                .map(p => `<p>${this.emphasize(p)}</p>`).join('');
        }

        const hi = document.querySelector(highlightsSelector);
        if (hi) {
            hi.innerHTML = about.highlights.map(h => `
                <li class="flex items-start gap-2.5 text-[15px] text-ink">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-deep-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>${h}</span>
                </li>
            `).join('');
        }
    }

    // -- Experience timeline ------------------------------------------------
    renderExperience(experience, selector) {
        const el = document.querySelector(selector);
        if (!el || !experience) return;
        el.innerHTML = experience.map(job => `
            <details class="exp-row reveal group">
                <summary class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                    <div class="flex items-baseline gap-3">
                        <h3 class="font-display text-xl md:text-2xl tracking-tightest text-ink">${job.company}</h3>
                        <span class="text-sm text-body-muted">${job.role}</span>
                    </div>
                    <div class="flex items-center gap-4 flex-shrink-0">
                        <span class="font-mono text-[12px] text-slate">${job.period}</span>
                        <svg class="exp-chevron w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </summary>
                <div class="exp-detail mt-4 max-w-3xl">
                    <p class="text-body-muted leading-relaxed">${job.summary}</p>
                    <ul class="mt-4 space-y-2">
                        ${job.highlights.map(h => `
                            <li class="flex items-start gap-2.5 text-[15px] text-ink">
                                <span class="mt-2 w-1 h-1 rounded-full bg-deep-green flex-shrink-0"></span>
                                <span>${h}</span>
                            </li>`).join('')}
                    </ul>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${job.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                    </div>
                </div>
            </details>
        `).join('');
    }

    // -- Capabilities / skills ---------------------------------------------
    renderSkills(skills, selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.innerHTML = skills.map((skill, i) => `
            <div class="skill-card reveal" style="transition-delay:${i * 60}ms">
                <div class="cap-icon mb-5">${this.getCapabilityIcon(skill.icon)}</div>
                <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-display text-lg tracking-tightest text-ink">${skill.title}</h3>
                </div>
                <p class="text-[14px] leading-relaxed text-body-muted mb-4">${skill.description}</p>
                <span class="font-mono text-[11px] uppercase tracking-wide text-slate">${skill.level}</span>
            </div>
        `).join('');
    }

    // -- Projects grid ------------------------------------------------------
    renderProjects(projects, selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.innerHTML = projects.map((project, index) => `
            <article class="project-card reveal group" data-project-index="${index}"
                     style="transition-delay:${index * 60}ms" tabindex="0" role="button"
                     aria-label="View details for ${project.title}">
                <div class="relative h-48 overflow-hidden">
                    <img src="${project.image}" alt="${project.title}"
                         class="w-full h-full object-cover" loading="lazy">
                    <span class="absolute top-3 left-3 chip-coral bg-canvas/90">${project.category}</span>
                </div>
                <div class="p-6">
                    <div class="flex items-baseline justify-between gap-3 mb-2">
                        <h3 class="font-display text-xl tracking-tightest text-ink">${project.title}</h3>
                        <span class="font-mono text-[12px] text-slate flex-shrink-0">${project.year}</span>
                    </div>
                    ${project.role ? `<p class="font-mono text-[11px] uppercase tracking-wide text-muted mb-3">${project.role}</p>` : ''}
                    <p class="text-[14px] leading-relaxed text-body-muted mb-4 line-clamp-3">${project.description}</p>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${project.technologies.slice(0, 4).map(t => `<span class="tech-pill">${t}</span>`).join('')}
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-hairline">
                        <span class="status-pill">${project.status}</span>
                        <span class="inline-flex items-center gap-1 text-[13px] text-ink group-hover:text-deep-green transition-colors">
                            Details
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // -- Tools grid ---------------------------------------------------------
    renderTools(tools, selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.innerHTML = tools.map((tool, i) => `
            <div class="tool-icon reveal group" style="transition-delay:${i * 30}ms">
                <div class="h-16 flex items-center justify-center mb-2">
                    <img src="${tool.image}" alt="${tool.name}" class="max-w-full max-h-full object-contain" loading="lazy">
                </div>
                <h4 class="text-[13px] font-medium text-ink">${tool.name}</h4>
                <p class="font-mono text-[10px] uppercase tracking-wide text-muted mt-0.5">${tool.category}</p>
            </div>
        `).join('');
    }

    // -- Stack mono chips ---------------------------------------------------
    renderStackChips(stackList, selector) {
        const el = document.querySelector(selector);
        if (!el || !stackList) return;
        el.innerHTML = stackList.map(s => `<span class="stack-chip">${s}</span>`).join('');
    }

    // -- Writing (articles) -------------------------------------------------
    renderWriting(writing, selector) {
        const el = document.querySelector(selector);
        if (!el || !writing) return;
        el.innerHTML = writing.map(a => `
            <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="list-row group">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h4 class="list-title font-display text-[17px] leading-snug tracking-tightest text-ink transition-colors">${a.title}</h4>
                        <div class="mt-2 flex flex-wrap items-center gap-2">
                            ${a.topics.map(t => `<span class="chip-coral">${t}</span>`).join('')}
                            <span class="font-mono text-[12px] text-muted">${a.outlet}</span>
                        </div>
                    </div>
                    <span class="font-mono text-[12px] text-slate flex-shrink-0 whitespace-nowrap">${a.date}</span>
                </div>
            </a>
        `).join('');
    }

    // -- Speaking -----------------------------------------------------------
    renderSpeaking(speaking, selector) {
        const el = document.querySelector(selector);
        if (!el || !speaking) return;
        el.innerHTML = speaking.map(s => `
            <div class="list-row">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h4 class="font-display text-[16px] leading-snug tracking-tightest text-ink">${s.title}</h4>
                        <span class="font-mono text-[12px] text-muted">${s.event}</span>
                    </div>
                    <span class="font-mono text-[12px] text-slate flex-shrink-0 whitespace-nowrap">${s.date}</span>
                </div>
            </div>
        `).join('');
    }

    // -- Libraries ----------------------------------------------------------
    renderLibraries(libraries, selector) {
        const el = document.querySelector(selector);
        if (!el || !libraries) return;
        el.innerHTML = libraries.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="list-row group">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h4 class="list-title font-display text-[16px] tracking-tightest text-ink transition-colors">${l.name}</h4>
                        <span class="text-[13px] text-body-muted">${l.description} · </span>
                        <span class="font-mono text-[12px] text-muted">${l.outlet}</span>
                    </div>
                    <span class="font-mono text-[12px] text-slate flex-shrink-0 whitespace-nowrap">${l.date}</span>
                </div>
            </a>
        `).join('');
    }

    // -- Education ----------------------------------------------------------
    renderEducation(education, selector) {
        const el = document.querySelector(selector);
        if (!el || !education) return;
        el.innerHTML = education.map(e => `
            <div class="list-row">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h4 class="font-display text-[16px] tracking-tightest text-ink">${e.institution}</h4>
                        <p class="text-[13px] text-body-muted mt-0.5">${e.degree}</p>
                        <p class="text-[13px] text-muted mt-1">${e.detail}</p>
                    </div>
                    <span class="font-mono text-[12px] text-slate flex-shrink-0 whitespace-nowrap">${e.period}</span>
                </div>
            </div>
        `).join('');
    }

    // -- Social links -------------------------------------------------------
    renderSocialLinks(socialItems, ...selectors) {
        const html = socialItems.map(item => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer"
               class="social-link" title="${item.name}" aria-label="${item.name}">
                ${this.getSocialIcon(item.icon)}
            </a>
        `).join('');
        selectors.forEach(sel => {
            const c = document.querySelector(sel);
            if (c) c.innerHTML = html;
        });
    }

    // -- Helpers ------------------------------------------------------------

    // Convert **bold** markers into <strong>
    emphasize(text) {
        return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>');
    }

    getCapabilityIcon(key) {
        const s = 'width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';
        const icons = {
            automation: `<svg ${s}><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="4"/><path d="M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>`,
            test: `<svg ${s}><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-9V3"/><path d="M7 14h10"/></svg>`,
            api: `<svg ${s}><path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16"/></svg>`,
            ai: `<svg ${s}><rect x="5" y="7" width="14" height="12" rx="2"/><path d="M9 3v4M15 3v4M9 12h.01M15 12h.01M9 15h6"/><path d="M2 12h3M19 12h3"/></svg>`,
            code: `<svg ${s}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>`,
            mobile: `<svg ${s}><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
            performance: `<svg ${s}><path d="M3 12a9 9 0 1 1 18 0"/><path d="M12 12l4-3"/><path d="M3 12h2M19 12h2M12 3v0"/></svg>`,
            leadership: `<svg ${s}><circle cx="12" cy="7" r="3"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/><path d="M12 2l1 2-1 1-1-1 1-2"/></svg>`
        };
        return icons[key] || icons.test;
    }

    getSocialIcon(iconName) {
        const icons = {
            linkedin: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/></svg>`,
            github: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>`,
            instagram: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            whatsapp: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.087"/></svg>`,
            mail: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`
        };
        return icons[iconName] || icons.mail;
    }

    // Generic helpers retained for compatibility
    renderList(data, selector, templateFn) {
        const container = document.querySelector(selector);
        if (!container || !Array.isArray(data)) return;
        container.innerHTML = data.map((item, i) => templateFn(item, i)).join('');
    }

    updateContent(selector, content) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = content;
    }
}
