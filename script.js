// Portfolio Website Interactive Script

// Certificate data
const certificates = {
    oracle: {
        title: 'Generative AI Professional',
        url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D6EC534BA64F7123BA99EC8B0FDF25670E471B46A50198F6324BA1FE75ACB7C0',
        downloadUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D6EC534BA64F7123BA99EC8B0FDF25670E471B46A50198F6324BA1FE75ACB7C0'
    },
    microsoft: {
        title: 'Microsoft Azure Fundamentals',
        url: 'https://drive.google.com/file/d/1CcyAMSSL403F34JTsfqqVH1vsmL9VSaP/view?usp=drive_link',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1CcyAMSSL403F34JTsfqqVH1vsmL9VSaP'
    },
    cipherschool: {
        title: 'Cloud Computing (AWS)',
        url: 'https://www.cipherschools.com/certificate/preview?id=687f196f7efd6d509070457b',
        downloadUrl: 'https://www.cipherschools.com/certificate/preview?id=687f196f7efd6d509070457b'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoading();
    initScrollProgress();
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initStatsCounter();
    initContactForm();
    initTypingAnimation();
    initCertifications();
    // initParticleBackground(); // Disabled for performance
});

// Loading Animation
function initLoading() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 3000);
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('light-theme', !isDark);

        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }

        // Animate toggle
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Statistics Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--success-color)';

            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 2000);
    });
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    const text = typingElement.textContent;
    typingElement.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 1000);
}

// Particle Background - Disabled for better performance on GitHub Pages
// function initParticleBackground() {
//     // ... code ...
// }

// Mouse follower effect
const cursorFollower = document.createElement('div');
cursorFollower.style.position = 'fixed';
cursorFollower.style.width = '20px';
cursorFollower.style.height = '20px';
cursorFollower.style.border = '2px solid var(--primary-color)';
cursorFollower.style.borderRadius = '50%';
cursorFollower.style.pointerEvents = 'none';
cursorFollower.style.zIndex = '9999';
cursorFollower.style.transition = 'all 0.1s ease';
cursorFollower.style.opacity = '0';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX - 10 + 'px';
    cursorFollower.style.top = e.clientY - 10 + 'px';
    cursorFollower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0';
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) rotateX(0deg)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add random color changes to floating elements
setInterval(() => {
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach(circle => {
        const colors = [
            'rgba(56, 189, 248, 0.2)',
            'rgba(16, 185, 129, 0.2)',
            'rgba(245, 158, 11, 0.2)',
            'rgba(239, 68, 68, 0.2)',
            'rgba(168, 85, 247, 0.2)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        circle.style.background = `linear-gradient(135deg, ${randomColor}, rgba(14, 165, 233, 0.1))`;
    });
}, 3000);

// Certifications functionality
function initCertifications() {
    // Initialize slider position
    let currentSlide = 0;
    const container = document.querySelector('.certifications-container');
    const cards = document.querySelectorAll('.certification-card');

    if (container && cards.length > 0) {
        // Auto-scroll functionality (optional)
        setInterval(() => {
            slideCertifications(1);
        }, 5000);
    }
}

function slideCertifications(direction) {
    const container = document.querySelector('.certifications-container');
    const cards = document.querySelectorAll('.certification-card');
    const cardWidth = cards[0].offsetWidth + 30; // 30px gap
    const maxSlides = cards.length - Math.floor(container.offsetWidth / cardWidth);

    let currentTransform = container.style.transform || 'translateX(0px)';
    let currentX = parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) || 0;

    currentX += direction * cardWidth;

    // Boundary checks
    if (currentX > 0) currentX = 0;
    if (currentX < -(maxSlides * cardWidth)) currentX = -(maxSlides * cardWidth);

    container.style.transform = `translateX(${currentX}px)`;
}

function openCertModal(certType) {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    const certFrame = document.getElementById('certFrame');
    const downloadBtn = document.getElementById('modalDownloadBtn');

    if (certificates[certType]) {
        modalTitle.textContent = certificates[certType].title;
        certFrame.src = certificates[certType].url;
        downloadBtn.onclick = () => downloadCert(certType);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    const certFrame = document.getElementById('certFrame');

    modal.style.display = 'none';
    certFrame.src = '';
    document.body.style.overflow = 'auto';
}

function downloadCert(certType) {
    if (certificates[certType]) {
        const link = document.createElement('a');
        link.href = certificates[certType].downloadUrl;
        link.download = `${certificates[certType].title.replace(/\s+/g, '_')}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadCertFromModal() {
    // This will be set when modal opens
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target === modal) {
        closeCertModal();
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const currentSection = document.querySelector('.section.animate:last-of-type');
        const nextSection = currentSection.nextElementSibling;

        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = document.querySelector('.section.animate:first-of-type');
        const prevSection = currentSection.previousElementSibling;

        if (prevSection && prevSection.classList.contains('section')) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add mobile menu toggle (for smaller screens)
function initMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const navContainer = document.querySelector('.nav-container');

    if (window.innerWidth <= 768) {
        navContainer.style.display = 'none';

        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--card-bg);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: var(--primary-color);
            font-size: 20px;
            cursor: pointer;
            z-index: 1002;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            const isOpen = navContainer.style.display === 'flex';
            navContainer.style.display = isOpen ? 'none' : 'flex';
            navContainer.style.flexDirection = 'column';
            navContainer.style.position = 'fixed';
            navContainer.style.top = '80px';
            navContainer.style.left = '20px';
            navContainer.style.background = 'var(--card-bg)';
            navContainer.style.padding = '20px';
            navContainer.style.borderRadius = '10px';
            navContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    }
}

initMobileMenu();

// Add performance monitoring
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
    console.log('Performance:', performance.getEntriesByType('navigation')[0]);
});
