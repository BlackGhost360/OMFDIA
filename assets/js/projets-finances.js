const btn = document.getElementById('btnAfficher');
const divs = document.getElementsByClassName('project-hidden');

btn.addEventListener('click', () => {
    let isHidden = divs[0].style.display === 'none' || divs[0].style.display === '';

    for (let div of divs) {
        div.style.display = isHidden ? 'block' : 'none';
    }

    btn.textContent = isHidden ? 'Charger moins' : 'Charger plus';
});

// Animation des statistiques au scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-pf-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Animation fade-in au scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in, .project-card-pf').forEach(el => {
        observer.observe(el);
    });
}

// Système de filtrage des projets
function setupFiltering() {
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const sectorFilter = document.getElementById('sectorFilter');
    const statusFilter = document.getElementById('statusFilter');
    const projectCards = document.querySelectorAll('.project-card-pf');

    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedSector = sectorFilter.value;
        const selectedStatus = statusFilter.value;

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const region = card.dataset.region;
            const sector = card.dataset.sector;
            const status = card.dataset.status;

            const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
            const matchesRegion = !selectedRegion || region === selectedRegion;
            const matchesSector = !selectedSector || sector === selectedSector;
            const matchesStatus = !selectedStatus || status === selectedStatus;

            if (matchesSearch && matchesRegion && matchesSector && matchesStatus) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProjects);
    regionFilter.addEventListener('change', filterProjects);
    sectorFilter.addEventListener('change', filterProjects);
    statusFilter.addEventListener('change', filterProjects);
}

// Gestion des erreurs d'images
function setupImageErrorHandling() {
    const images = document.querySelectorAll('.project-image-pf');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'flex';
            this.style.flexDirection = 'column';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.backgroundColor = '#f8f9fa';
            this.style.color = '#6c757d';
            this.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="margin: 0; font-size: 0.9rem;">Image non disponible</p>
                </div>
            `;
        });
    });
}

// Navigation mobile
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);

        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'white';
            navMenu.style.boxShadow = '0 4px 20px rgba(24, 50, 76, 0.1)';
            navMenu.style.padding = '1rem 2rem';
            navMenu.style.zIndex = '1000';
        }
    });

    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.style.display = '';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// Amélioration de l'accessibilité
function setupAccessibility() {
    // Navigation au clavier pour les cartes projets
    const projectCards = document.querySelectorAll('.project-card-pf');
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const ctaButton = card.querySelector('.project-cta');
                if (ctaButton) ctaButton.click();
            }
        });
    });

    // Annonce des changements de filtres pour les lecteurs d'écran
    const filtersContainer = document.querySelector('.filters-container');
    const statusDiv = document.createElement('div');
    statusDiv.setAttribute('aria-live', 'polite');
    statusDiv.setAttribute('aria-atomic', 'true');
    statusDiv.className = 'sr-only';
    filtersContainer.appendChild(statusDiv);

    // Mise à jour du statut lors du filtrage
    const originalFilterProjects = setupFiltering;
    setupFiltering = function() {
        originalFilterProjects();

        setTimeout(() => {
            const visibleCards = document.querySelectorAll('.project-card-pf[style*="display: block"], .project-card-pf:not([style*="display: none"])').length;
            statusDiv.textContent = `${visibleCards} projet(s) trouvé(s)`;
        }, 100);
    };
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    setupScrollAnimations();
    setupFiltering();
    setupImageErrorHandling();
    setupMobileMenu();
    setupAccessibility();

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Classe pour les éléments invisibles aux lecteurs d'écran visuels mais accessibles aux technologies d'assistance
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);