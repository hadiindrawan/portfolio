// Project Modal Module - Image preview for project carousel
export class ProjectModal {
    constructor() {
        this.modal = null;
        this.projects = [];
        this.init();
    }

    init() {
        this.modal = document.getElementById('projectImageModal');
        if (!this.modal) {
            console.warn('Project modal element not found');
            return;
        }

        this.bindEvents();
    }

    bindEvents() {
        // Close button
        const closeBtn = document.getElementById('closeProjectModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeModal();
            }
        });

        // Listen for project image clicks
        document.addEventListener('click', (e) => {
            const projectContainer = e.target.closest('[data-project-index]');
            if (projectContainer) {
                const projectIndex = parseInt(projectContainer.getAttribute('data-project-index'));
                this.showProject(projectIndex);
            }
        });
    }

    setProjects(projects) {
        this.projects = projects;
    }

    showProject(index) {
        if (!this.projects[index] || !this.modal) return;

        const project = this.projects[index];
        
        // Populate modal content
        this.updateModalContent(project);
        
        // Show modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add smooth entrance animation
        requestAnimationFrame(() => {
            this.modal.style.opacity = '1';
            const modalContent = this.modal.querySelector('.relative.bg-white');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
            }
        });
    }

    updateModalContent(project) {
        // Update image
        const image = document.getElementById('modalProjectImage');
        if (image) {
            image.src = project.image;
            image.alt = project.title;
        }

        // Update category
        const category = document.getElementById('modalProjectCategory');
        if (category) {
            category.textContent = project.category;
        }

        // Update title
        const title = document.getElementById('modalProjectTitle');
        if (title) {
            title.textContent = project.title;
        }

        // Update description
        const description = document.getElementById('modalProjectDescription');
        if (description) {
            description.textContent = project.description;
        }

        // Update technologies
        const techContainer = document.getElementById('modalProjectTechnologies');
        if (techContainer && project.technologies) {
            techContainer.innerHTML = project.technologies.map(tech => 
                `<span class="px-3 py-1 bg-cream text-charcoal text-sm rounded-full">${tech}</span>`
            ).join('');
        }

        // Update year
        const year = document.getElementById('modalProjectYear');
        if (year) {
            year.textContent = project.year;
        }

        // Update status
        const status = document.getElementById('modalProjectStatus');
        if (status) {
            status.textContent = project.status;
        }
    }

    closeModal() {
        if (!this.modal || !this.isOpen()) return;

        // Add exit animation
        this.modal.style.opacity = '0';
        const modalContent = this.modal.querySelector('.relative.bg-white');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.95)';
        }

        setTimeout(() => {
            this.modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset styles
            this.modal.style.opacity = '';
            if (modalContent) {
                modalContent.style.transform = '';
            }
        }, 200);
    }

    isOpen() {
        return this.modal && !this.modal.classList.contains('hidden');
    }
}