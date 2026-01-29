/**
 * Portfolio Website - Main JavaScript
 * Features: Loading screen, typing animation, smooth scroll, 
 * mobile menu, scroll animations, and interactive effects
 */

'use strict';

// ===== Loading Screen =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.querySelector('.typing-text');
const sections = document.querySelectorAll('section[id]');
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const skillsSection = document.querySelector('.skills');
const projectCards = document.querySelectorAll('.project-card');
const copyEmailBtn = document.getElementById('copy-email-btn');

// ===== Typing Animation =====
const titles = [
    'Aspiring Software Developer',
    'Full Stack Engineer',
    'Problem Solver',
    'CS: Information Technology Student',
    'Tech Enthusiast'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    
    const currentTitle = titles[titleIndex];
    let typingSpeed = 100;
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

// ===== Active Link on Scroll =====
function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// ===== Parallax Effect on Hero =====
function updateParallax() {
    if (window.innerWidth > 768 && heroBg) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
}

// ===== Skill Items Animation =====
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated || !skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
        skillsAnimated = true;
    }
}

// ===== Optimized Scroll Handler =====
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
            highlightNavLink();
            revealOnScroll();
            updateParallax();
            animateSkills();
            ticking = false;
        });
        ticking = true;
    }
}

// ===== Mobile Menu Toggle =====
function setupMobileMenu() {
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Smooth Scroll =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Project Card Tilt Effect =====
function setupProjectCards() {
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Copy Email =====
function setupCopyEmail() {
    if (!copyEmailBtn) return;

    const email = copyEmailBtn.getAttribute('data-email') || '';
    if (!email) return;

    const originalHtml = copyEmailBtn.innerHTML;

    async function copyText(text) {
        // Prefer modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        // Fallback for non-secure contexts (localhost usually works, but this is safer)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    copyEmailBtn.addEventListener('click', async () => {
        try {
            await copyText(email);
            copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyEmailBtn.disabled = true;
            setTimeout(() => {
                copyEmailBtn.disabled = false;
                copyEmailBtn.innerHTML = originalHtml;
            }, 1400);
        } catch (e) {
            copyEmailBtn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Copy failed';
            setTimeout(() => {
                copyEmailBtn.innerHTML = originalHtml;
            }, 1600);
        }
    });
}

// ===== Initialize Animations =====
function initializeAnimations() {
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .skills-category, .about-content, .contact-content, .cert-card'
    );
    animatedElements.forEach(el => el.classList.add('fade-in'));
    
    // Initialize skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease-out';
    });
    
    // Initial check for elements already in view
    revealOnScroll();
    animateSkills();
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Setup interactions
    setupMobileMenu();
    setupSmoothScroll();
    setupProjectCards();
    setupCopyEmail();
    initializeAnimations();
    
    // Initial scroll position check
    onScroll();
});

// ===== Event Listeners =====
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Resize Handler =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset parallax on mobile
        if (window.innerWidth <= 768 && heroBg) {
            heroBg.style.transform = 'translateY(0)';
        }
    }, 250);
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #94a3b8;');
