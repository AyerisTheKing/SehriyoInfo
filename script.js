// Version: 1.6
// Sehriyo School Website - Main JavaScript
// Created: 2026-02-14
// Description: Interactive features with sidebar navigation and news feed

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Sehriyo School Website v1.6 loaded');
    
    initializeSidebar();
    initializeNavigation();
    initializeAnimations();
});

/**
 * News Article Interactions
 */
function initializeNavigation() {
    const newsArticles = document.querySelectorAll('.news-article');
    const readMoreLinks = document.querySelectorAll('.news-read-more');
    
    // Add hover effects to news articles
    newsArticles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Handle "Read More" clicks
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = this.getAttribute('href').substring(1);
            handleNewsArticle(newsId);
        });
    });
}

/**
 * Handle News Article Click
 */
function handleNewsArticle(newsId) {
    console.log(`📰 Opening news article: ${newsId}`);
    // TODO: Implement full article view
    showComingSoonMessage('Полная статья');
}

/**
 * Handle Students Section
 */
function handleStudentsSection() {
    console.log('📚 Navigating to Students section');
    // TODO: Implement navigation to students page
    showComingSoonMessage('Ученики');
}

/**
 * Handle Teachers Section
 */
function handleTeachersSection() {
    console.log('👨‍🏫 Navigating to Teachers section');
    // TODO: Implement navigation to teachers page
    showComingSoonMessage('Учителя');
}

/**
 * Handle Administration Section
 */
function handleAdministrationSection() {
    console.log('🏛️ Navigating to Administration section');
    // TODO: Implement navigation to administration page
    showComingSoonMessage('Администрация');
}

/**
 * Show Coming Soon Message (temporary)
 */
function showComingSoonMessage(section) {
    const message = document.createElement('div');
    message.className = 'coming-soon-toast';
    message.textContent = `Раздел "${section}" скоро будет доступен`;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: linear-gradient(135deg, #0d2b6b, #1a4099);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

/**
 * Initialize Scroll Animations
 */
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe navigation cards
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => observer.observe(card));
}

/**
 * Sidebar Navigation
 */
function initializeSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    
    // Open sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            openSidebar();
        });
    }
    
    // Close sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    // Close on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking on navigation links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            closeSidebar();
            
            // Handle navigation
            setTimeout(() => {
                handleNavigation(target);
            }, 300);
        });
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    
    console.log('📂 Sidebar opened');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
    
    // Animate X back to hamburger
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
    
    console.log('📁 Sidebar closed');
}

function handleNavigation(section) {
    console.log(`🧭 Navigating to: ${section}`);
    
    switch(section) {
        case 'students':
            handleStudentsSection();
            break;
        case 'teachers':
            handleTeachersSection();
            break;
        case 'administration':
            handleAdministrationSection();
            break;
    }
}

/**
 * Utility Functions
 */

// Smooth scroll to element
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Future: Analytics tracking
 */
function trackEvent(category, action, label) {
    // TODO: Implement analytics tracking
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
}

/**
 * Window resize handler
 */
window.addEventListener('resize', debounce(function() {
    console.log('📐 Window resized');
    // Future: Handle responsive adjustments
}, 250));

/**
 * Export for module systems (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSidebar,
        initializeNavigation,
        initializeAnimations,
        openSidebar,
        closeSidebar
    };
}
