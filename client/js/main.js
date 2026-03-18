/* ============================================
   PS SAFETY WEBSITE - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initAccordions();
    initFormValidation();
    initScrollToTop();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('nav ul');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            toggleBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || toggleBtn.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.textContent = '☰';
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                toggleBtn.textContent = '☰';
            });
        });
    }
}

/* Accordion/Collapse Functionality */
function initAccordions() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;

            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                    item.previousElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            content.classList.toggle('active');
            this.classList.toggle('active');
        });
    });
}

/* Form Validation */
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Check required fields
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#E74C3C';
                    showError(field, 'This field is required');
                } else {
                    field.style.borderColor = '';
                }
            });

            // Email validation
            const emailFields = this.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.style.borderColor = '#E74C3C';
                    showError(field, 'Please enter a valid email');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }

            return isValid;
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    let errorDiv = field.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('small');
        errorDiv.classList.add('error-message');
        errorDiv.style.color = '#E74C3C';
        errorDiv.style.display = 'block';
        errorDiv.style.marginTop = '4px';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    errorDiv.textContent = message;
}

/* Scroll to Top Button */
function initScrollToTop() {
    const scrollButton = document.querySelector('#scrollToTop');

    if (scrollButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* Add smooth fade-in animation for elements on scroll */
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .course-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

observeElements();

/* Lead Magnet Form Submission */
function initLeadMagnetForm() {
    const leadForm = document.querySelector('.lead-magnet-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Open Line OA for contact
                window.location.href = 'https://lin.ee/FXM03Sg';
            }
        });
    }
}

initLeadMagnetForm();

/* Dynamic service dropdown in contact form */
function initServiceDropdown() {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            console.log('Selected service:', this.value);
        });
    }
}

initServiceDropdown();

/* Add active state to navigation links based on current page */
function setActiveNav() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('nav a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.style.color = 'var(--accent)';
            item.style.fontWeight = '700';
        }
    });
}

setActiveNav();

/* Format phone numbers */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
    }
    input.value = value;
}

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('keyup', function() {
        formatPhoneNumber(this);
    });
});

/* Lazy load images */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

lazyLoadImages();

/* Utility: Get URL parameters */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/* Print utility for certificates */
function printPage() {
    window.print();
}

/* Copy text to clipboard */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

/* Initialize all animations on page load */
function initAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
}

window.addEventListener('load', initAnimations);

/* Console welcome message */
console.log('%cPS Safety - Occupational Health & Safety Services', 'color: #1B4F72; font-size: 16px; font-weight: bold;');
console.log('%cWebsite version 2026 - Static HTML Edition', 'color: #E67E22; font-size: 12px;');
