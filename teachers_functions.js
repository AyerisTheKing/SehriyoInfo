/**
 * Generate Subjects Accordion for Teachers
 */
function generateSubjectsAccordion() {
    const accordion = document.getElementById('subjects-accordion');
    accordion.innerHTML = '';
    
    // Subjects with teachers (mock data)
    const subjectsData = [
        {
            name: 'Математика',
            icon: '📐',
            teachers: [
                { name: 'Иванова Мария Петровна', class: '5-А', contact: '📧 m.ivanova@sehriyo.uz | 📞 +998 91 123 45 67' },
                { name: 'Петров Андрей Сергеевич', class: '6-Б', contact: '📧 a.petrov@sehriyo.uz | 📞 +998 91 234 56 78' }
            ]
        },
        {
            name: 'Русский язык и литература',
            icon: '📖',
            teachers: [
                { name: 'Сидорова Елена Викторовна', class: '7-В', contact: '📧 e.sidorova@sehriyo.uz | 📞 +998 91 345 67 89' },
                { name: 'Николаева Ольга Ивановна', class: '8-А', contact: '📧 o.nikolaeva@sehriyo.uz | 📞 +998 91 456 78 90' }
            ]
        },
        {
            name: 'География',
            icon: '🌍',
            teachers: [
                { name: 'Алимов Тимур Рашидович', class: '9-Д', contact: '📧 t.alimov@sehriyo.uz | 📞 +998 91 567 89 01' }
            ]
        },
        {
            name: 'История',
            icon: '📜',
            teachers: [
                { name: 'Каримов Шухрат Абдуллаевич', class: '10-А', contact: '📧 sh.karimov@sehriyo.uz | 📞 +998 91 678 90 12' }
            ]
        },
        {
            name: 'Физика',
            icon: '🔬',
            teachers: [
                { name: 'Смирнов Дмитрий Александрович', class: '11-Б', contact: '📧 d.smirnov@sehriyo.uz | 📞 +998 91 789 01 23' }
            ]
        },
        {
            name: 'Химия',
            icon: '🧪',
            teachers: [
                { name: 'Юсупова Нилуфар Азимовна', class: '9-А', contact: '📧 n.yusupova@sehriyo.uz | 📞 +998 91 890 12 34' }
            ]
        },
        {
            name: 'Биология',
            icon: '🌿',
            teachers: [
                { name: 'Рахимова Дилноза Фарходовна', class: '8-Г', contact: '📧 d.rahimova@sehriyo.uz | 📞 +998 91 901 23 45' }
            ]
        },
        {
            name: 'Английский язык',
            icon: '🌐',
            teachers: [
                { name: 'Браун Джессика Мария', class: '7-Б', contact: '📧 j.brown@sehriyo.uz | 📞 +998 91 012 34 56' },
                { name: 'Турсунов Жамшид Исмаилович', class: '6-В', contact: '📧 j.tursunov@sehriyo.uz | 📞 +998 91 123 45 67' }
            ]
        },
        {
            name: 'Информатика',
            icon: '💻',
            teachers: [
                { name: 'Абдуллаев Равшан Бахтиярович', class: '10-Б', contact: '📧 r.abdullaev@sehriyo.uz | 📞 +998 91 234 56 78' }
            ]
        },
        {
            name: 'ИЗО',
            icon: '🎨',
            teachers: [
                { name: 'Махмудова Севара Рустамовна', class: '5-Г', contact: '📧 s.mahmudova@sehriyo.uz | 📞 +998 91 345 67 89' }
            ]
        },
        {
            name: 'Музыка',
            icon: '🎵',
            teachers: [
                { name: 'Валиева Малика Азизовна', class: '4-А', contact: '📧 m.valieva@sehriyo.uz | 📞 +998 91 456 78 90' }
            ]
        },
        {
            name: 'Физкультура',
            icon: '💪',
            teachers: [
                { name: 'Набиев Искандар Олимович', class: '11-А', contact: '📧 i.nabiev@sehriyo.uz | 📞 +998 91 567 89 01' },
                { name: 'Холматов Бахтиёр Рахимович', class: '9-Б', contact: '📧 b.holmatov@sehriyo.uz | 📞 +998 91 678 90 12' }
            ]
        }
    ];
    
    subjectsData.forEach(subject => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        item.innerHTML = `
            <div class="accordion-header" data-subject="${subject.name}">
                <h3 class="accordion-title">${subject.icon} ${subject.name}</h3>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <div class="accordion-content">
                <div class="teachers-grid">
                    ${subject.teachers.map(teacher => `
                        <div class="teacher-card-item" 
                             data-teacher-name="${teacher.name}"
                             data-teacher-class="${teacher.class}"
                             data-teacher-contact="${teacher.contact}"
                             data-teacher-subject="${subject.name}">
                            <div class="teacher-card-photo">👨‍🏫</div>
                            <h4 class="teacher-card-name">${teacher.name}</h4>
                            <p class="teacher-card-role">Классный руководитель ${teacher.class}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        accordion.appendChild(item);
    });
    
    // Add event listeners to accordion headers
    initializeSubjectsAccordion();
    initializeTeacherCards();
}

/**
 * Initialize Subjects Accordion
 */
function initializeSubjectsAccordion() {
    const headers = document.querySelectorAll('#subjects-accordion .accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('#subjects-accordion .accordion-header').forEach(h => {
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
 * Initialize Teacher Cards
 */
function initializeTeacherCards() {
    const teacherCards = document.querySelectorAll('.teacher-card-item');
    
    teacherCards.forEach(card => {
        card.addEventListener('click', function() {
            const teacherName = this.getAttribute('data-teacher-name');
            const teacherClass = this.getAttribute('data-teacher-class');
            const teacherContact = this.getAttribute('data-teacher-contact');
            const teacherSubject = this.getAttribute('data-teacher-subject');
            
            openTeacherProfileFromList(teacherName, teacherClass, teacherContact, teacherSubject);
        });
    });
}

/**
 * Open Teacher Profile from List
 */
function openTeacherProfileFromList(teacherName, teacherClass, contact, subject) {
    console.log(`👨‍🏫 Opening teacher profile: ${teacherName}`);
    
    // Parse contact info
    const emailMatch = contact.match(/📧\s*([^\s|]+)/);
    const phoneMatch = contact.match(/📞\s*(.+)$/);
    
    const email = emailMatch ? emailMatch[1] : 'email@example.com';
    const phone = phoneMatch ? phoneMatch[1].trim() : '+998 XX XXX XX XX';
    
    closeModal('teachers-list-modal');
    
    setTimeout(() => {
        document.getElementById('teacher-fullname').textContent = teacherName;
        document.getElementById('teacher-class').textContent = teacherClass;
        document.getElementById('teacher-subject').textContent = subject;
        document.getElementById('teacher-subject-value').textContent = subject;
        document.getElementById('teacher-email').textContent = email;
        document.getElementById('teacher-phone').textContent = phone;
        
        // Update back button to return to teachers list
        const teacherProfileBack = document.getElementById('teacher-profile-back');
        if (teacherProfileBack) {
            // Remove old listeners by cloning
            const newBack = teacherProfileBack.cloneNode(true);
            teacherProfileBack.parentNode.replaceChild(newBack, teacherProfileBack);
            
            newBack.addEventListener('click', function() {
                closeModal('teacher-profile-modal');
                setTimeout(() => openModal('teachers-list-modal'), 300);
            });
        }
        
        openModal('teacher-profile-modal');
    }, 300);
}
