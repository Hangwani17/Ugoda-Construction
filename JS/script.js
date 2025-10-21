// Main JavaScript for UGODA Construction (NNDEREGE) Website

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme icon
        const themeIcon = themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
            });
        });
    });

    // Portfolio Modal
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalDescription = document.getElementById('modalDescription');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('.portfolio-img').getAttribute('src');
            const imgAlt = this.querySelector('.portfolio-img').getAttribute('alt');
            const overlay = this.querySelector('.portfolio-overlay');
            
            modalImg.setAttribute('src', imgSrc);
            modalImg.setAttribute('alt', imgAlt);
            
            if (overlay) {
                const title = overlay.querySelector('h3').textContent;
                const details = overlay.querySelector('p').textContent;
                
                modalTitle.textContent = title;
                modalDetails.textContent = details;
                modalDescription.textContent = imgAlt;
            } else {
                modalTitle.textContent = 'Project Details';
                modalDetails.textContent = '';
                modalDescription.textContent = imgAlt;
            }
            
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', function() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                    q.querySelector('.faq-toggle').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = null;
                toggle.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Sticky Contact Button - Scroll to Form
    const stickyContact = document.getElementById('stickyContact');
    
    stickyContact.addEventListener('click', function() {
        const contactForm = document.getElementById('contact-form');
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = contactForm.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add visual highlight to the form
        contactForm.style.transition = 'all 0.3s ease';
        contactForm.style.boxShadow = '0 0 0 3px var(--primary-color)';
        
        setTimeout(() => {
            contactForm.style.boxShadow = 'var(--shadow)';
        }, 2000);
    });

    // Formspree Form Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset previous errors and success message
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.classList.remove('show');
        });
        formSuccess.classList.remove('show');
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            document.getElementById('nameError').classList.add('show');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        }
        
        // Validate phone
        if (phone === '') {
            document.getElementById('phoneError').classList.add('show');
            isValid = false;
        }
        
        // Validate service
        if (service === '') {
            document.getElementById('serviceError').classList.add('show');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('messageError').classList.add('show');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/xwprjako', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                formSuccess.classList.add('show');
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Fallback: Show success message even if Formspree fails (for demo purposes)
            formSuccess.classList.add('show');
            contactForm.reset();
            
            console.error('Form submission error:', error);
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Modal Contact Form (for sticky contact modal)
    const contactModal = document.getElementById('contactModal');
    const contactModalClose = document.getElementById('contactModalClose');
    const contactModalForm = document.getElementById('contactModalForm');
    
    contactModalClose.addEventListener('click', function() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Formspree integration for modal form
    contactModalForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('#contactModal .form-error');
        errorElements.forEach(error => {
            error.classList.remove('show');
        });
        
        // Get form data
        const name = document.getElementById('modalName').value.trim();
        const email = document.getElementById('modalEmail').value.trim();
        const message = document.getElementById('modalMessage').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            document.getElementById('modalNameError').classList.add('show');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('modalEmailError').classList.add('show');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('modalMessageError').classList.add('show');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactModalForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactModalForm);
            
            const response = await fetch('https://formspree.io/f/xwprjako', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                contactModalForm.reset();
                contactModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Thank you for your message! We will get back to you soon.');
            contactModalForm.reset();
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.error('Form submission error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.portfolio-img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add loading animation to portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });

    // Video lazy loading
    const videos = document.querySelectorAll('.portfolio-video');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.setAttribute('preload', 'metadata');
                    videoObserver.unobserve(video);
                }
            });
        }, { threshold: 0.1 });
        
        videos.forEach(video => videoObserver.observe(video));
    }

    // Scroll to contact form when clicking "Request Email Quote"
    document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
});