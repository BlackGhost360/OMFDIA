// Navigation fluide vers les sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Amélioration de l'accessibilité - indicateur de focus
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function(e) {
    document.body.classList.remove('user-is-tabbing');
});
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    toggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
});
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});


/*cookies*/

// État des cookies
let cookiePreferences = {
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false
};

// Charger les préférences existantes
function loadPreferences() {
    const saved = getCookie('cookie_preferences');
    if (saved) {
        try {
            cookiePreferences = JSON.parse(saved);
            updateUI();
        } catch (e) {
            console.error('Erreur lors du chargement des préférences cookies:', e);
        }
    }
}

// Mettre à jour l'interface
function updateUI() {
    document.getElementById('analytics').checked = cookiePreferences.analytics;
    document.getElementById('preferences').checked = cookiePreferences.preferences;
    document.getElementById('marketing').checked = cookiePreferences.marketing;
}

// Utilitaire pour gérer les cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Sauvegarder les préférences
function savePreferences() {
    // Récupérer l'état actuel des toggles
    cookiePreferences.analytics = document.getElementById('analytics').checked;
    cookiePreferences.preferences = document.getElementById('preferences').checked;
    cookiePreferences.marketing = document.getElementById('marketing').checked;

    // Sauvegarder dans un cookie
    setCookie('cookie_preferences', JSON.stringify(cookiePreferences), 365);

    // Appliquer les préférences
    applyCookiePreferences();

    // Afficher la notification
    showNotification('Vos préférences ont été enregistrées avec succès !');
}

// Tout accepter
function acceptAll() {
    document.getElementById('analytics').checked = true;
    document.getElementById('preferences').checked = true;
    document.getElementById('marketing').checked = true;
    savePreferences();
}

// Tout refuser
function rejectAll() {
    document.getElementById('analytics').checked = false;
    document.getElementById('preferences').checked = false;
    document.getElementById('marketing').checked = false;
    savePreferences();
}

// Appliquer les préférences cookies
function applyCookiePreferences() {
    // Simuler l'activation/désactivation des traceurs
    if (cookiePreferences.analytics) {
        console.log('Activation des cookies Analytics');
        // Ici on activerait Google Analytics
    } else {
        console.log('Désactivation des cookies Analytics');
        // Ici on désactiverait Google Analytics
    }

    if (cookiePreferences.marketing) {
        console.log('Activation des cookies Marketing');
        // Ici on activerait les pixels de tracking
    } else {
        console.log('Désactivation des cookies Marketing');
        // Ici on désactiverait les pixels de tracking
    }

    if (cookiePreferences.preferences) {
        console.log('Activation des cookies de Préférences');
    } else {
        console.log('Désactivation des cookies de Préférences');
    }
}

// Afficher une notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Retour en haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Écouter les changements sur les toggles
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();

    // Ajouter des écouteurs d'événements pour l'accessibilité
    const toggles = document.querySelectorAll('input[type="checkbox"]:not([disabled])');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const category = this.dataset.category;
            const isEnabled = this.checked;
            console.log(`Catégorie ${category} ${isEnabled ? 'activée' : 'désactivée'}`);
        });
    });
});

// Gestion clavier pour accessibilité
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Permettre de fermer les notifications avec Échap
        document.getElementById('notification').classList.remove('show');
    }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Highlight current section in navigation
const sections = document.querySelectorAll('.section');
const tocLinks = document.querySelectorAll('.toc-list a');

function highlightCurrentSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.background = 'var(--accent-orange)';
            link.style.color = 'var(--white)';
        }
    });
}

window.addEventListener('scroll', highlightCurrentSection);

// Consent notification (example implementation)
function showConsentNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
                <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: var(--white); border: 2px solid var(--accent-orange); border-radius: 12px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); z-index: 1000; max-width: 500px;">
                    <h4 style="margin: 0 0 10px 0; color: var(--primary-blue);">🍪 Acceptation des CGU</h4>
                    <p style="margin: 0 0 15px 0; font-size: 14px; color: var(--primary-blue);">En continuant à naviguer sur ce site, vous acceptez nos Conditions Générales d'Utilisation et notre Politique de confidentialité.</p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="acceptCGU()" style="background: var(--accent-orange); color: var(--white); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">J'accepte</button>
                        <button onclick="this.parentElement.parentElement.remove()" style="background: transparent; color: var(--primary-blue); border: 1px solid var(--border-gray); padding: 8px 16px; border-radius: 6px; cursor: pointer;">Plus tard</button>
                        <a href="#" style="color: var(--accent-orange); text-decoration: none; font-size: 12px; align-self: center;">Lire les CGU complètes</a>
                    </div>
                </div>
            `;
    document.body.appendChild(notification);
}

function acceptCGU() {
    // In a real implementation, this would save the user's consent
    console.log('CGU acceptées le:', new Date().toISOString());
    document.querySelector('[style*="position: fixed"]').remove();

    // Show confirmation
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 1001;">
                    ✅ CGU acceptées avec succès
                </div>
            `;
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.remove();
    }, 3000);
}

// Show consent notification after 2 seconds (example)
setTimeout(showConsentNotification, 2000);

// Accessibility: Keyboard navigation for back to top
backToTopButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        backToTopButton.click();
    }
});

// Print functionality
function setupPrintStyles() {
    const printStyles = `
                @media print {
                    .header, .footer, .back-to-top, .toc { display: none !important; }
                    .cgu-container { box-shadow: none !important; }
                    .section { break-inside: avoid; }
                    .section h2 { break-after: avoid; }
                }
            `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

setupPrintStyles();