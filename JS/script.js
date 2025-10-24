// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.textContent = '☰';
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Initialize Formspree
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(contactForm);
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});

function validateForm() {
    let isValid = true;
    const fields = contactForm.querySelectorAll('[required]');
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });
    
    fields.forEach(field => {
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (!field.value.trim()) {
            errorElement.style.display = 'block';
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            errorElement.style.display = 'block';
            isValid = false;
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time validation
contactForm.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => {
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorElement.style.display = 'block';
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            errorElement.style.display = 'block';
        } else {
            errorElement.style.display = 'none';
        }
    });
});

// Sticky Header
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'var(--bg-color)';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.background = 'var(--bg-color)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = window.scrollY;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Contact Button
const stickyContact = document.getElementById('stickyContact');
stickyContact.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Portfolio Modal (if needed for future enhancements)
const modal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Area Animation
const serviceAreaBanner = document.querySelector('.service-area-banner');
if (serviceAreaBanner) {
    setTimeout(() => {
        serviceAreaBanner.style.transform = 'translateY(0)';
        serviceAreaBanner.style.opacity = '1';
    }, 1000);
}

// Add loading animation to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .process-step, .feature-item, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile-specific optimizations
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimize scroll performance on mobile
if (isMobile()) {
    document.addEventListener('touchmove', function(e) {
        // Add passive: true for better performance
    }, { passive: true });
}

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    // Close mobile menu on orientation change
    navMenu.classList.remove('active');
    mobileToggle.textContent = '☰';
    
    // Force a resize event to handle layout changes
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Prevent zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for any initial animations
    document.body.classList.add('loaded');
    
    // Set initial state for mobile
    if (isMobile()) {
        document.body.classList.add('mobile');
    }
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (isMobile()) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
            // Ensure mobile menu is closed on desktop
            navMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
        }
    });
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}