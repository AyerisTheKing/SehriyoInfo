// Version: 3.8
// Sehriyo School Website - Main JavaScript
// Created: 2026-02-14
// Description: Interactive features with sidebar, modals, class selection, and detailed class information

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Sehriyo School Website v3.8 loaded');
    
    initializeSidebar();
    initializeModals();
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
    console.log('📚 Opening Students level selection');
    openModal('students-modal');
}

/**
 * Handle Teachers Section
 */
function handleTeachersSection() {
    console.log('👨‍🏫 Opening Teachers section');
    closeSidebar();
    
    setTimeout(() => {
        generateSubjectsAccordion();
        openModal('teachers-list-modal');
    }, 300);
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
    
    // Student Profile Modal
    const studentProfileClose = document.getElementById('student-profile-close');
    const studentProfileOverlay = document.getElementById('student-profile-overlay');
    const studentProfileBack = document.getElementById('student-profile-back');
    
    if (studentProfileClose) {
        studentProfileClose.addEventListener('click', function() {
            closeModal('student-profile-modal');
        });
    }
    
    if (studentProfileOverlay) {
        studentProfileOverlay.addEventListener('click', function() {
            closeModal('student-profile-modal');
        });
    }
    
    if (studentProfileBack) {
        studentProfileBack.addEventListener('click', function() {
            closeModal('student-profile-modal');
            setTimeout(() => openModal('class-details-modal'), 300);
        });
    }
    
    // Teacher Profile Modal
    const teacherProfileClose = document.getElementById('teacher-profile-close');
    const teacherProfileOverlay = document.getElementById('teacher-profile-overlay');
    const teacherProfileBack = document.getElementById('teacher-profile-back');
    
    if (teacherProfileClose) {
        teacherProfileClose.addEventListener('click', function() {
            closeModal('teacher-profile-modal');
        });
    }
    
    if (teacherProfileOverlay) {
        teacherProfileOverlay.addEventListener('click', function() {
            closeModal('teacher-profile-modal');
        });
    }
    
    if (teacherProfileBack) {
        teacherProfileBack.addEventListener('click', function() {
            closeModal('teacher-profile-modal');
            setTimeout(() => openModal('class-details-modal'), 300);
        });
    }
    
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
 * Initialize Modal Windows
 */
function initializeModals() {
    // Students Modal
    const studentsModal = document.getElementById('students-modal');
    const studentsModalClose = document.getElementById('students-modal-close');
    const studentsModalOverlay = document.getElementById('students-modal-overlay');
    const schoolLevelButtons = document.querySelectorAll('.school-level-btn');
    
    // Close modal button
    if (studentsModalClose) {
        studentsModalClose.addEventListener('click', function() {
            closeModal('students-modal');
        });
    }
    
    // Close on overlay click
    if (studentsModalOverlay) {
        studentsModalOverlay.addEventListener('click', function() {
            closeModal('students-modal');
        });
    }
    
    // Handle school level selection
    schoolLevelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            handleSchoolLevelSelection(level);
        });
    });
    
    // Class Selection Modal
    const classSelectionClose = document.getElementById('class-selection-close');
    const classSelectionOverlay = document.getElementById('class-selection-overlay');
    
    if (classSelectionClose) {
        classSelectionClose.addEventListener('click', function() {
            closeModal('class-selection-modal');
        });
    }
    
    if (classSelectionOverlay) {
        classSelectionOverlay.addEventListener('click', function() {
            closeModal('class-selection-modal');
        });
    }
    
    // Class Details Modal
    const classDetailsClose = document.getElementById('class-details-close');
    const classDetailsOverlay = document.getElementById('class-details-overlay');
    
    if (classDetailsClose) {
        classDetailsClose.addEventListener('click', function() {
            closeModal('class-details-modal');
        });
    }
    
    if (classDetailsOverlay) {
        classDetailsOverlay.addEventListener('click', function() {
            closeModal('class-details-modal');
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

/**
 * Open Modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log(`📋 Modal opened: ${modalId}`);
    }
}

/**
 * Close Modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log(`📋 Modal closed: ${modalId}`);
    }
}

/**
 * Handle School Level Selection
 */
function handleSchoolLevelSelection(level) {
    console.log(`🎒 Selected school level: ${level}`);
    
    const levelInfo = {
        'elementary': { name: 'Начальная школа', grades: [1, 2, 3, 4] },
        'middle': { name: 'Средняя школа', grades: [5, 6, 7, 8, 9] },
        'high': { name: 'Старшая школа', grades: [10, 11] }
    };
    
    closeModal('students-modal');
    
    // Open class selection modal
    setTimeout(() => {
        const info = levelInfo[level];
        document.getElementById('class-selection-title').textContent = info.name;
        generateGradesAccordion(info.grades);
        openModal('class-selection-modal');
    }, 300);
}

/**
 * Generate Grades Accordion
 */
function generateGradesAccordion(grades) {
    const accordion = document.getElementById('grades-accordion');
    accordion.innerHTML = '';
    
    const classLetters = ['А', 'Б', 'В', 'Г', 'Д', 'И'];
    
    grades.forEach(grade => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        item.innerHTML = `
            <div class="accordion-header" data-grade="${grade}">
                <h3 class="accordion-title">${grade}-е классы</h3>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <div class="accordion-content">
                <div class="accordion-body">
                    ${classLetters.map(letter => `
                        <button class="class-btn" data-class="${grade}-${letter}">
                            ${grade}-${letter}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        accordion.appendChild(item);
    });
    
    // Add event listeners
    initializeAccordion();
    initializeClassButtons();
}

/**
 * Initialize Accordion
 */
function initializeAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                this.nextElementSibling.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Class Buttons
 */
function initializeClassButtons() {
    const classButtons = document.querySelectorAll('.class-btn');
    
    classButtons.forEach(button => {
        button.addEventListener('click', function() {
            const className = this.getAttribute('data-class');
            openClassDetails(className);
        });
    });
}

/**
 * Open Class Details
 */
function openClassDetails(className) {
    console.log(`📚 Opening details for class: ${className}`);
    
    closeModal('class-selection-modal');
    
    setTimeout(() => {
        document.getElementById('class-details-title').textContent = `Класс ${className}`;
        loadClassData(className);
        openModal('class-details-modal');
    }, 300);
}

/**
 * Load Class Data (Mock Data)
 */
function loadClassData(className) {
    // Mock data - replace with real data later
    const mockData = {
        teacher: {
            name: 'Иванова Мария Петровна',
            contact: '📧 m.ivanova@sehriyo.uz | 📞 +998 91 123 45 67'
        },
        stats: {
            count: 28,
            classroom: '204',
            monitor: 'Алиев Темур'
        },
        students: [
            'Абдуллаев Азиз', 'Акрамова Нигора', 'Алиев Темур', 'Ахмедов Рустам',
            'Базарова Дилноза', 'Валиева Малика', 'Гафурова Севара', 'Давлатов Жасур',
            'Ергашева Нилуфар', 'Жумаев Отабек', 'Зокирова Шахноза', 'Иброхимов Санжар',
            'Каримова Мадина', 'Латипов Бахтиёр', 'Махмудова Фарида', 'Набиев Элёр',
            'Олимова Зулфия', 'Рахимов Искандар', 'Содикова Нодира', 'Турсунов Акмал',
            'Умаров Жамшид', 'Файзуллаева Гулноза', 'Холматова Ширин', 'Шарипов Мухаммад',
            'Юсупова Озода', 'Яхшибаев Шохрух', 'Нурматова Дильбар', 'Хамидов Равшан'
        ]
    };
    
    // Fill teacher info
    document.getElementById('teacher-name').textContent = mockData.teacher.name;
    document.getElementById('teacher-contact').textContent = mockData.teacher.contact;
    
    // Fill stats
    document.getElementById('students-count').textContent = mockData.stats.count;
    document.getElementById('classroom-number').textContent = mockData.stats.classroom;
    document.getElementById('class-monitor').textContent = mockData.stats.monitor;
    
    // Fill students list
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = mockData.students.map((student, index) => `
        <div class="student-item" data-student-name="${student}" data-class="${className}">
            <span class="student-number">${index + 1}.</span>
            <span class="student-name">${student}</span>
        </div>
    `).join('');
    
    // Add click handlers to students
    document.querySelectorAll('.student-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const studentName = this.getAttribute('data-student-name');
            const studentClass = this.getAttribute('data-class');
            openStudentProfile(studentName, studentClass);
        });
    });
    
    // Make teacher card clickable
    const teacherCard = document.querySelector('.teacher-card');
    if (teacherCard) {
        teacherCard.style.cursor = 'pointer';
        teacherCard.addEventListener('click', function() {
            openTeacherProfile(mockData.teacher.name, className, mockData.teacher.contact);
        });
    }
}

/**
 * Open Student Profile
 */
function openStudentProfile(studentName, studentClass) {
    console.log(`👤 Opening student profile: ${studentName}`);
    
    closeModal('class-details-modal');
    
    setTimeout(() => {
        document.getElementById('student-fullname').textContent = studentName;
        document.getElementById('student-class').textContent = studentClass;
        openModal('student-profile-modal');
    }, 300);
}

/**
 * Open Teacher Profile
 */
function openTeacherProfile(teacherName, teacherClass, contact) {
    console.log(`👨‍🏫 Opening teacher profile: ${teacherName}`);
    
    // Parse contact info
    const emailMatch = contact.match(/📧\s*([^\s|]+)/);
    const phoneMatch = contact.match(/📞\s*(.+)$/);
    
    const email = emailMatch ? emailMatch[1] : 'email@example.com';
    const phone = phoneMatch ? phoneMatch[1].trim() : '+998 XX XXX XX XX';
    
    closeModal('class-details-modal');
    
    setTimeout(() => {
        document.getElementById('teacher-fullname').textContent = teacherName;
        document.getElementById('teacher-class').textContent = teacherClass;
        document.getElementById('teacher-subject').textContent = 'Математика'; // Mock
        document.getElementById('teacher-subject-value').textContent = 'Математика'; // Mock
        document.getElementById('teacher-email').textContent = email;
        document.getElementById('teacher-phone').textContent = phone;
        openModal('teacher-profile-modal');
    }, 300);
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
        initializeModals,
        initializeNavigation,
        initializeAnimations,
        openSidebar,
        closeSidebar,
        openModal,
        closeModal
    };
}
