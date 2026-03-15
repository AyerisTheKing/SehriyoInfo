// Глобальная версия сайта — меняй только здесь, всё остальное обновится автоматически
const APP_VERSION = "11.2";




// ============================================
// TEACHERS AND CLASSES DATA
// ============================================
// Единая база учителей (классные руководители + предметники)
// Формат: { name: 'ФИО', class: 'класс', classroom: 'кабинет', subject: 'предмет' }
const TEACHERS_DATA = [
  // ==================== НАЧАЛЬНАЯ ШКОЛА (1-4 классы) ====================
  {
    name: "Газизова Э.Р.",
    class: "1-А",
    classroom: "416",
    subject: "Начальные классы",
  },
  {
    name: "Романова Л.Ю.",
    class: "1-Б",
    classroom: "221",
    subject: "Английский язык",
  },
  {
    name: "Сучкова С.А.",
    class: "1-В",
    classroom: "418",
    subject: "Начальные классы",
  },
  {
    name: "Щекалева Е.В.",
    class: "1-Г",
    classroom: "322",
    subject: "Начальные классы",
  },
  {
    name: "Омарова И.А.",
    class: "2-А",
    classroom: "320",
    subject: "Начальные классы",
  },
  {
    name: "Шеварева И.А.",
    class: "2-Б",
    classroom: "319",
    subject: "Начальные классы",
  },
  {
    name: "Шишкина К.С.",
    class: "2-В",
    classroom: "218",
    subject: "Начальные классы",
  },
  {
    name: "Мавлюдова М.Г.",
    class: "2-Г",
    classroom: "316",
    subject: "Начальные классы",
  },
  {
    name: "Эшмухамедова Л.М.",
    class: "2-Д",
    classroom: "220",
    subject: "Начальные классы",
  },
  {
    name: "Недведцкая А.А.",
    class: "3-А",
    classroom: "320",
    subject: "Начальные классы",
  },
  {
    name: "Нурмухамедова Э.М.",
    class: "3-В",
    classroom: "415",
    subject: "Начальные классы",
  },
  {
    name: "Шакирова М.А.",
    class: "3-Г",
    classroom: "216",
    subject: "Начальные классы",
  },
  {
    name: "Самигулина Ю.В.",
    class: "3-Д",
    classroom: "220",
    subject: "Начальные классы",
  },
  {
    name: "Краева М.Ю.",
    class: "4-А",
    classroom: "318",
    subject: "Начальные классы",
  },
  {
    name: "Садыкова А.Я.",
    class: "4-Б",
    classroom: "414",
    subject: "Начальные классы",
  },
  {
    name: "Даминова Л.Ю.",
    class: "4-В",
    classroom: "420",
    subject: "Начальные классы",
  },
  {
    name: "Мухтарова С.Р.",
    class: "4-Г",
    classroom: "421",
    subject: "Начальные классы",
  },
  {
    name: "Гниенко О.А.",
    class: "4-Д",
    classroom: "422",
    subject: "Начальные классы",
  },
  {
    name: "Ахунзянова Г.Г.",
    class: "4-И",
    classroom: "219",
    subject: "Начальные классы",
  },

  // ==================== СРЕДНЯЯ ШКОЛА (5-9 классы) ====================
  {
    name: "Холмухамедова Н.С.",
    class: "5-А",
    classroom: "402",
    subject: "Узбекский язык",
  },
  { name: "Асимова М.Ю.", class: "5-Б", classroom: "306", subject: "MBA" },
  {
    name: "Родина А.В.",
    class: "5-В",
    classroom: "305",
    subject: "Математика",
  },
  {
    name: "Бабуц Е.С.",
    class: "5-Г",
    classroom: "401",
    subject: "Начальные классы",
  },
  {
    name: "Атабаева М.А.",
    class: "5-Д",
    classroom: "408",
    subject: "Начальные классы",
  },
  { name: "Ибрагимова Д.Д.", class: "6-А", classroom: "210", subject: "MBA" },
  {
    name: "Комлева Т.А.",
    class: "6-Б",
    classroom: "304",
    subject: "Литература",
  },
  { name: "Гурецкая М.В.", class: "6-В", classroom: "308", subject: "MBA" },
  {
    name: "Хабибова Л.",
    class: "6-Г",
    classroom: "300",
    subject: "Начальные классы",
  },
  {
    name: "Муратова О.С.",
    class: "6-Д",
    classroom: "208",
    subject: "Начальные классы",
  },
  {
    name: "Мирсаидова С.К.",
    class: "7-А",
    classroom: "406",
    subject: "География",
  },
  { name: "Арсланова Г.В.", class: "7-Б", classroom: "303", subject: "MBA" },
  {
    name: "Кадырова К.Ф.",
    class: "7-В",
    classroom: "407",
    subject: "Начальные классы",
  },
  {
    name: "Щербокова Е.В.",
    class: "7-Г",
    classroom: "301",
    subject: "Литература",
  },
  {
    name: "Сайдуллаева Н.В.",
    class: "7-Д",
    classroom: "310",
    subject: "Английский язык",
  },
  {
    name: "Нурутдинова М.У.",
    class: "8-А",
    classroom: "205",
    subject: "Черчение",
  },
  { name: "Дулянова А.Р.", class: "8-Б", classroom: "302", subject: "История" },
  {
    name: "Кузнецова Ю.А.",
    class: "8-В",
    classroom: "311",
    subject: "История",
  },
  {
    name: "Кабилджанова О.А.",
    class: "8-Г",
    classroom: "400",
    subject: "Английский язык",
  },
  {
    name: "Халимова В.А.",
    class: "8-Д",
    classroom: "212",
    subject: "Математика",
  },
  {
    name: "Каримова Э.А.",
    class: "9-Б",
    classroom: "403",
    subject: "Информатика",
  },
  { name: "Ямалетдинов Р.Ф.", class: "9-В", classroom: "211", subject: "MBA" },
  {
    name: "Мамадалиева Э.А.",
    class: "9-Д",
    classroom: "404",
    subject: "Математика",
  },
  {
    name: "Гафурова К.С.",
    class: "9-И",
    classroom: "410",
    subject: "Английский язык",
  },

  // ==================== СТАРШАЯ ШКОЛА (10-11 классы) — ТЬЮТОРЫ ====================
  {
    name: "Галимов А.М.",
    class: "не определён", // TODO: уточнить: 10а-инж, 10в-гум или 10г-ест
    classroom: "IT хаб",
    subject: "Тьютор",
  },
  // 11 классы
  { name: "Арапова Аселя",        class: "11а-эк", classroom: "115", subject: "Тьютор" },
  { name: "Ильясова Анастасия",    class: "11б-эк", classroom: "312", subject: "Тьютор" },
  { name: "Холмухамедова Нигора",   class: "11в-гум", classroom: "402", subject: "Тьютор" },
  { name: "Холмухамедова Нигора",   class: "11г-ест", classroom: "402", subject: "Тьютор" },

  // ==================== ПРЕДМЕТНИКИ (без классов) ====================
  // История
  { name: 'Кузнецова Юлия', class: '', classroom: '311', subject: 'История' },
  { name: 'Дулянова Адиля', class: '', classroom: '302', subject: 'История' },
  { name: 'Расулова Мадина', class: '', classroom: '311', subject: 'История' },
  // Литература
  { name: 'Мазитова Лилия', class: '', classroom: '412', subject: 'Литература' },
  { name: 'Комлева Татьяна', class: '', classroom: '304', subject: 'Литература' },
  { name: 'Арутюнова Эвелина', class: '', classroom: '104', subject: 'Литература' },
  { name: 'Чиркова Марина', class: '', classroom: '403', subject: 'Литература' },
  { name: 'Щербакова Елена', class: '', classroom: '301', subject: 'Литература' },
  // Математика
  { name: 'Родина Светлана', class: '', classroom: '305', subject: 'Математика' },
  { name: 'Расулова Шахиста', class: '', classroom: '213', subject: 'Математика' },
  { name: 'Мамадалиева Эльвира', class: '', classroom: '404', subject: 'Математика' },
  { name: 'Новикова Александра', class: '', classroom: '308', subject: 'Математика' },
  { name: 'Халимова Венера', class: '', classroom: '212', subject: 'Математика' },
  { name: 'Родина Александра', class: '', classroom: '305', subject: 'Математика' },
  { name: 'Шакасымова Эльба', class: '', classroom: '206', subject: 'Математика' },
  // География
  { name: 'Мирсаидова Сайера', class: '', classroom: '406', subject: 'География' },
  // Физика
  { name: 'Назаров Файруз', class: '', classroom: '204', subject: 'Физика' },
  { name: 'Худайберганова Дильдора', class: '', classroom: '203', subject: 'Физика' },
  // Химия
  { name: 'Халходжаева Дильфуза', class: '', classroom: '201', subject: 'Химия' },
  { name: 'Комарова Марина', class: '', classroom: '201', subject: 'Химия' },
  // Биология
  { name: 'Мирзаукулова Мияссар', class: '', classroom: '312', subject: 'Биология' },
  { name: 'Ильясова Анастасия', class: '', classroom: '312', subject: 'Биология' },
  // Английский язык
  { name: 'Аракелян Ирина', class: '', classroom: '405', subject: 'Английский язык' },
  { name: 'Арапова Аселя', class: '', classroom: '115', subject: 'Английский язык' },
  { name: 'Кабилджанова Обида', class: '', classroom: '400', subject: 'Английский язык' },
  { name: 'Гафурова Камила', class: '', classroom: '410', subject: 'Английский язык' },
  { name: 'Сайдуллаева Наталья', class: '', classroom: '310', subject: 'Английский язык' },
  { name: 'Таджибаева Мадина', class: '', classroom: '108', subject: 'Английский язык' },
  { name: 'Ишмухамедова Асаль', class: '', classroom: '313', subject: 'Английский язык' },
  { name: 'Кайпназарова Айгуль', class: '', classroom: '215', subject: 'Английский язык' },
  // Информатика
  { name: 'Каримова Эмилия', class: '', classroom: '409', subject: 'Информатика' },
  { name: 'Белова Елена', class: '', classroom: 'Стекляшка', subject: 'Информатика' },
  // Музыка
  { name: 'Идоятов Тельман', class: '', classroom: '110', subject: 'Музыка' },
  // Основы государства и права
  { name: 'Мадраимов Аскарий', class: '', classroom: '208', subject: 'Основы государства и права' },
  // Технология
  { name: 'Мирзаахмедова Мухтабар', class: '', classroom: '116', subject: 'Технология' },
  // Узбекский язык
  { name: 'Холмухамедова Нигорахон', class: '', classroom: '402', subject: 'Узбекский язык' },
  { name: 'Холдарова Манзура', class: '', classroom: '413', subject: 'Узбекский язык' },
  // Физкультура
  { name: 'Рахимов Акмаль', class: '', classroom: 'Спортзал', subject: 'Физкультура' },
  { name: 'Саляхова Аделина', class: '', classroom: 'Спортзал', subject: 'Физкультура' },
  { name: 'Фатхуллаев Рахматулла', class: '', classroom: 'Спортзал', subject: 'Физкультура' },
  // Черчение
  { name: 'Нурутдинова Михиринса', class: '', classroom: '205', subject: 'Черчение' },
  // Футбол
  { name: 'Галеев Амир', class: '', classroom: 'Спортзал', subject: 'Футбол' },
  // Эмоциональный интеллект
  { name: 'Синюгина Светлана', class: '', classroom: '', subject: 'Эмоциональный интеллект' },
  // MBA
  { name: 'Арсланова Галина', class: '', classroom: '303', subject: 'MBA' },
  { name: 'Ибрагимова Динара', class: '', classroom: '210', subject: 'MBA' },
  { name: 'Асимова Мухайе', class: '', classroom: '306', subject: 'MBA' },
  { name: 'Ямалетдинов Рудиль', class: '', classroom: '211', subject: 'MBA' },
  { name: 'Файзиева Малика', class: '', classroom: '113', subject: 'MBA' },
  // Английский факультатив
  { name: 'Кайпназарова Айгуль', class: '', classroom: '215', subject: 'Английский факультатив' },
  // Британский этикет
  { name: 'Гурецкая Марина', class: '', classroom: '113', subject: 'Британский этикет' },
];

// ============================================
// TEACHERS LOOKUP MAPS (поиск за O(1))
// ============================================
// Создаются один раз при загрузке — мгновенный поиск вместо перебора массива
const TEACHERS_BY_CLASS = new Map(TEACHERS_DATA.filter(t => t.class).map(t => [t.class, t]));
const TEACHERS_BY_NAME  = new Map(TEACHERS_DATA.filter(t => t.name).map(t => [t.name, t]));

function getTeacherByName(name) {
  return TEACHERS_BY_NAME.get(name) ?? null;
}

// Получить учителя по классному руководству
function getTeacherByClass(className) {
  return TEACHERS_BY_CLASS.get(className) ?? null;
}

// Получить учителей по фамилии (все записи, перебор нужен)
function getTeachersBySurname(fullName) {
  // Extract just the surname from the input full name to compare it properly
  const surnameToMatch = fullName.toLowerCase().split(" ")[0].replace(/[.\s]/g, "");
  return TEACHERS_DATA.filter((t) => {
    const tSurname = t.name.toLowerCase().split(" ")[0].replace(/[.\s]/g, "");
    return tSurname === surnameToMatch;
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log(`🎓 Sehriyo School Website v${APP_VERSION} loaded`);

  initializeMainNav();
  initializeModals();
  initializeLightbox();

  // Синхронизируем версию в футере автоматически
  const footerVersion = document.getElementById("footer-version");
  if (footerVersion) footerVersion.textContent = `v${APP_VERSION}`;
});


// ============================================
// NAVIGATION & SECTIONS
// ============================================


function handleStudentsSection() {
  console.log("📚 Opening Students level selection");
  openModal("students-modal");
}

function handleTeachersSection() {
  console.log("👨‍🏫 Opening Teachers section");
  generateSubjectsAccordion();
  openModal("teachers-list-modal");
}

function handleAdministrationSection() {
  console.log("🏛️ Navigating to Administration section");
  showComingSoonMessage("Администрация");
}

/**
 * Show Coming Soon Message (temporary)
 */
function showComingSoonMessage(section) {
  const message = document.createElement("div");
  message.className = "coming-soon-toast";
  message.textContent =
    typeof section === "string" && section.includes(" ")
      ? section
      : `Раздел "${section}" скоро будет доступен`;
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

  setTimeout(() => {
    message.style.opacity = "1";
    message.style.transform = "translateX(-50%) translateY(0)";
  }, 10);

  setTimeout(() => {
    message.style.opacity = "0";
    message.style.transform = "translateX(-50%) translateY(-20px)";
    setTimeout(() => {
      if (message.parentNode) document.body.removeChild(message);
    }, 300);
  }, 3000);
}


/**
 * Main Navigation Buttons
 */
function initializeMainNav() {
  const navStudents = document.getElementById("nav-students");
  const navTeachers = document.getElementById("nav-teachers");
  const navAdministration = document.getElementById("nav-administration");

  if (navStudents) {
    navStudents.addEventListener("click", function () {
      handleStudentsSection();
    });
  }

  if (navTeachers) {
    navTeachers.addEventListener("click", function () {
      handleTeachersSection();
    });
  }

  if (navAdministration) {
    navAdministration.addEventListener("click", function () {
      handleAdministrationSection();
    });
  }

  console.log("🧭 Main navigation initialized");
}


// ============================================
// MODAL WINDOWS
// ============================================

function initializeModals() {
  // Students Modal
  const studentsModalClose = document.getElementById("students-modal-close");
  const studentsModalOverlay = document.getElementById("students-modal-overlay");
  const schoolLevelButtons = document.querySelectorAll(".school-level-btn");

  if (studentsModalClose) { studentsModalClose.addEventListener("click", goBackModal); }
  if (studentsModalOverlay) { studentsModalOverlay.addEventListener("click", goBackModal); }

  schoolLevelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      handleSchoolLevelSelection(this.getAttribute("data-level"));
    });
  });

  // Class Selection Modal
  const classSelectionClose = document.getElementById("class-selection-close");
  const classSelectionOverlay = document.getElementById("class-selection-overlay");
  if (classSelectionClose) { classSelectionClose.addEventListener("click", goBackModal); }
  if (classSelectionOverlay) { classSelectionOverlay.addEventListener("click", goBackModal); }

  // Class Details Modal
  const classDetailsClose = document.getElementById("class-details-close");
  const classDetailsOverlay = document.getElementById("class-details-overlay");
  if (classDetailsClose) { classDetailsClose.addEventListener("click", goBackModal); }
  if (classDetailsOverlay) { classDetailsOverlay.addEventListener("click", goBackModal); }

  // Teachers List Modal
  const teachersListClose = document.getElementById("teachers-list-close");
  const teachersListOverlay = document.getElementById("teachers-list-overlay");
  if (teachersListClose) { teachersListClose.addEventListener("click", goBackModal); }
  if (teachersListOverlay) { teachersListOverlay.addEventListener("click", goBackModal); }

  // Teacher Profile Modal
  const teacherProfileClose = document.getElementById("teacher-profile-close");
  const teacherProfileOverlay = document.getElementById("teacher-profile-overlay");
  if (teacherProfileClose) { teacherProfileClose.addEventListener("click", goBackModal); }
  if (teacherProfileOverlay) { teacherProfileOverlay.addEventListener("click", goBackModal); }

  // ESC key closes any active modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      goBackModal();
    }
  });
}

let modalHistory = [];

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  const currentActive = document.querySelector(".modal.active");
  if (currentActive && currentActive.id !== modalId) {
    modalHistory.push(currentActive.id);
    currentActive.classList.remove("active");
  } else if (!currentActive) {
    modalHistory = []; // Reset history if opening from clear state
  }
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function goBackModal() {
  const currentActive = document.querySelector(".modal.active");
  if (currentActive) {
    currentActive.classList.remove("active");
  }
  
  if (modalHistory.length > 0) {
    const prevModalId = modalHistory.pop();
    const prevModal = document.getElementById(prevModalId);
    if (prevModal) {
      prevModal.classList.add("active");
      return;
    }
  }
  
  document.body.style.overflow = "";
}

// ============================================
// SCHOOL LEVELS & CLASS SELECTION
// ============================================

function handleSchoolLevelSelection(level) {
  console.log(`🎒 Selected school level: ${level}`);

  const levelInfo = {
    elementary: { name: "Начальная школа", grades: [1, 2, 3, 4] },
    middle: { name: "Средняя школа", grades: [5, 6, 7, 8, 9] },
    high: { name: "Старшая школа", grades: [10, 11] },
  };

  const info = levelInfo[level];
  document.getElementById("class-selection-title").textContent = info.name;
  generateGradesAccordion(info.grades);
  openModal("class-selection-modal");
}

// Данные параллелей на уровне модуля — чтобы были видны из generateGradesAccordion и initializeAccordion
const gradeData = {
  1:  { letters: ["А", "Б", "В", "Г"] },
  2:  { letters: ["А", "Б", "В", "Г", "Д"] },
  3:  { letters: ["А", "В", "Г", "Д"] },
  4:  { letters: ["А", "Б", "В", "Г", "Д", "И"] },
  5:  { letters: ["А", "Б", "В", "Г", "Д"] },
  6:  { letters: ["А", "Б", "В", "Г", "Д"] },
  7:  { letters: ["А", "Б", "В", "Г", "Д"] },
  8:  { letters: ["А", "Б", "В", "Г", "Д"] },
  9:  { letters: ["Б", "В", "Д", "И"] },
  10: { classes: ["10а-инж", "10в-гум", "10г-ест"] },
  11: { classes: ["11а-эк", "11б-эк", "11в-гум", "11г-ест"] },
};

function generateGradesAccordion(grades) {
  const accordion = document.getElementById("grades-accordion");
  accordion.innerHTML = "";

  grades.forEach((grade) => {
    const data = gradeData[grade] || {};
    const item = document.createElement("div");
    item.className = "accordion-item";

    // Старшая школа: фиксированные названия классов
    if (data.classes) {
      item.innerHTML = `
        <div class="accordion-header" data-grade="${grade}">
          <h3 class="accordion-title">${grade}-е классы</h3>
          <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <div class="accordion-body">
            ${data.classes.map(cls => `
              <button class="class-btn class-btn-profile" data-class="${cls}">
                ${cls.toUpperCase()}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }
    // Начальная/средняя школа: буквы
    else if (data.letters && data.letters.length > 0) {
      item.innerHTML = `
        <div class="accordion-header" data-grade="${grade}">
          <h3 class="accordion-title">${grade}-е классы</h3>
          <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <div class="accordion-body">
            ${data.letters.map(letter => `
              <button class="class-btn" data-class="${grade} ${letter.toLowerCase()}">
                ${grade}-${letter}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    accordion.appendChild(item);
  });

  initializeAccordion();
  initializeClassButtons();
}


// Предзагрузка картинок расписания для параллели в фоновом режиме
// Триггер: пользователь раскрыл аккордеон параллели ("4-е классы" → грузятся 4а.jpg, 4б.jpg, ...)
function prefetchGradeSchedules(grade, data) {
  const classIds = data.classes
    ? data.classes
    : (data.letters || []).map(l => `${grade} ${l.toLowerCase()}`);

  const fileNames = classIds.map(id => id.replace(/\s+/g, '').toLowerCase());

  fileNames.forEach(fileName => {
    const img = new Image();
    img.src = `assets/img/classes/${fileName}.jpg`;
    // Ошибка загрузки игнорируется — если файла нет, ничего страшного
    img.onerror = null;
  });

  console.groupCollapsed(`🖼️ Prefetch: ${grade}-е классы (${fileNames.length} шт.)`);
  console.log('📦 Файлы:', fileNames.map(f => f + '.jpg').join(', '));
  console.groupEnd();
}

function initializeAccordion() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const isActive = this.classList.contains("active");

      document.querySelectorAll(".accordion-header").forEach((h) => {
        h.classList.remove("active");
        h.nextElementSibling.classList.remove("active");
      });

      if (!isActive) {
        this.classList.add("active");
        this.nextElementSibling.classList.add("active");

        // Предзагрузка расписаний для этой параллели
        const grade = parseInt(this.getAttribute("data-grade"));
        if (grade && gradeData[grade]) {
          prefetchGradeSchedules(grade, gradeData[grade]);
        }
      }
    });
  });
}


function initializeClassButtons() {
  const classButtons = document.querySelectorAll(".class-btn");

  classButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const className = this.getAttribute("data-class");
      openClassDetails(className);
    });
  });
}

function openClassDetails(classId) {
  console.log(`📚 Opening details for class: ${classId}`);

  // Форматируем красивый заголовок:
  // "5 а" → "Класс 5-А"
  // "10а-инж" → "Класс 10А-ИНЖ"
  const displayName = classId.includes(" ")
    ? `Класс ${classId.replace(" ", "-").toUpperCase()}`
    : `Класс ${classId.toUpperCase()}`;

  document.getElementById("class-details-title").textContent = displayName;
  loadClassData(classId);
  openModal("class-details-modal");
}

// ============================================
// LOAD CLASS DATA
// ============================================

/**
 * Load class data from local TEACHERS_DATA
 * @param {string} classId - e.g. "5 а", "10а-инж"
 */
async function loadClassData(classId) {
  // Set loading state
  document.getElementById("teacher-name").textContent = "Загрузка...";
  document.getElementById("classroom-number").textContent = "...";
  const phoneEl = document.getElementById("teacher-phone");
  if (phoneEl) { phoneEl.style.display = "none"; phoneEl.textContent = ""; phoneEl.href = "#"; }
  
  // Clear any dynamic class sections added previously
  document.querySelectorAll(".dynamic-class-section").forEach(el => el.remove());

  // Определяем роль для заголовка: тьютор для 10-11, классный руководитель для 1-9
  const isHighSchool = /^(10|11)/.test(classId);
  const roleTitleEl = document.getElementById("teacher-role-title");
  if (roleTitleEl) {
    roleTitleEl.textContent = isHighSchool ? "Тьютор" : "Классный руководитель";
  }

  // Для 1-9 классов ("5 а") — преобразуем "5 а" → "5-А"
  // Для старшей школы ("10а-инж") — ключ уже готов как есть
  const teacherKey = classId.includes(" ")
    ? classId.replace(/\s+/g, "-").replace(/-([a-zа-я])/g, (_, c) => "-" + c.toUpperCase())
    : classId;

  const teacher = getTeacherByClass(teacherKey);

  if (teacher && teacher.name) {
    document.getElementById("teacher-name").textContent = teacher.name;
    document.getElementById("classroom-number").textContent = teacher.classroom || "—";
    
    // Делаем карточку кликабельной
    const teacherCard = document.getElementById("class-teacher-card");
    if (teacherCard) {
      teacherCard.onclick = () => {
        // Закрываем окно класса (опционально, но лучше чтобы открывалось поверх)
        // Но так как оба это modal-fullscreen, возможно лучше просто открыть сверху.
        // teacher-profile-modal не является fullscreen, так что он откроется в виде всплывающего окна нормально:
        openTeacherProfile(teacher.name);
      };
    }
  } else {
    document.getElementById("teacher-name").textContent = "—";
    document.getElementById("classroom-number").textContent = "—";
    const teacherCard = document.getElementById("class-teacher-card");
    if (teacherCard) teacherCard.onclick = null;
  }

  // Inject specific logic for 7-A
  if (classId === "7 а") {
    if (phoneEl) {
      phoneEl.textContent = "📞 +998 99 870 12 41";
      phoneEl.href = "tel:+998998701241";
      phoneEl.style.display = "block";
    }
    
    // Add sections for menu, teachers, and students
    const detailsContainer = document.getElementById("class-details-content");
    const classData = CLASS_DATA[classId];
    if (detailsContainer && classData) {
      // 1. Menu Section
      if (classData.menu) {
        const menuSection = document.createElement("div");
        menuSection.className = "detail-section dynamic-class-section";
        menuSection.innerHTML = `
          <h3 class="detail-section-title">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
             Меню столовой
          </h3>
          <div style="text-align: center;">
            <img src="${classData.menu}" alt="Меню" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          </div>
        `;
        detailsContainer.appendChild(menuSection);
      }
      
      // 2. Teachers Section
      if (classData.teachers && classData.teachers.length > 0) {
        const teachersHtml = classData.teachers.map((t, idx) => `
          <div class="teachers-list-row ${idx === classData.teachers.length - 1 ? 'last-row' : ''}">
            <div class="teachers-list-subject">${t.subject}</div>
            <div class="teachers-list-names">${t.names}</div>
          </div>
        `).join("");
        
        const teachersSection = document.createElement("div");
        teachersSection.className = "detail-section dynamic-class-section";
        teachersSection.innerHTML = `
          <h3 class="detail-section-title">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
             Учителя-предметники
          </h3>
          <div style="background: var(--bg-color); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
            ${teachersHtml}
          </div>
        `;
        detailsContainer.appendChild(teachersSection);
      }
      
      // 3. Students Section
      if (classData.students && classData.students.length > 0) {
        const studentsHtml = classData.students.map((s, idx) => `
          <div class="students-list-row ${idx === classData.students.length - 1 ? 'last-row' : ''}">
            <span class="students-list-index">${idx + 1}.</span>
            <span class="students-list-name">${s}</span>
          </div>
        `).join("");
        
        const studentsSection = document.createElement("div");
        studentsSection.className = "detail-section dynamic-class-section";
        studentsSection.innerHTML = `
          <h3 class="detail-section-title">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
             Состав класса
          </h3>
          <div style="background: var(--bg-color); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
            ${studentsHtml}
          </div>
        `;
        detailsContainer.appendChild(studentsSection);
      }
      
      // 4. Government Section
      const govSection = document.createElement("div");
      govSection.className = "detail-section dynamic-class-section";
      govSection.style.background = "linear-gradient(135deg, #fffcf0 0%, #fff7d6 100%)";
      govSection.style.border = "1.5px solid #ffe58f";
      govSection.innerHTML = `
        <h3 class="detail-section-title" style="color: #d48806;">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"></path></svg>
           Правительство Юналиндия
        </h3>
        <div style="display: flex; align-items: center; gap: 15px; padding: 5px;">
           <div style="font-size: 2.2rem; filter: drop-shadow(0 4px 6px rgba(212, 136, 6, 0.3));">👑</div>
           <div>
             <div style="font-size: 1.15rem; font-weight: 700; color: #ad6800; line-height: 1.2;">Шухратова Шахризода</div>
             <div style="font-size: 0.85rem; color: #d48806; margin-top: 5px; font-weight: 600;">Классный представитель и важная персона в школе</div>
           </div>
        </div>
      `;
      detailsContainer.appendChild(govSection);

      // 5. Medical Sister Section
      const medSection = document.createElement("div");
      medSection.className = "detail-section dynamic-class-section";
      medSection.innerHTML = `
        <h3 class="detail-section-title">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
           Медицинский кабинет
        </h3>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--bg-color); border-radius: 12px; border: 1px solid var(--border-color);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 1.6rem; background: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">👩‍⚕️</div>
            <div>
              <div style="font-weight: 700; color: var(--primary-dark); font-size: 1rem; line-height: 1.2;">Мед. сестра</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px;">Для связи</div>
            </div>
          </div>
          <div style="position: relative;">
            <button onclick="const t = document.getElementById('nurse-tooltip'); t.style.display='block'; setTimeout(() => t.style.opacity='1', 10); setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.style.display='none',300); }, 3000);" 
                    style="width: 32px; height: 32px; border-radius: 50%; background: #ff4d4f; color: white; border: none; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; box-shadow: 0 3px 8px rgba(255, 77, 79, 0.4); transition: transform 0.2s;">
              !
            </button>
            <div id="nurse-tooltip" style="display: none; position: absolute; bottom: 120%; right: -5px; background: #262626; color: white; padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; width: max-content; max-width: 250px; text-align: center; box-shadow: 0 6px 16px rgba(0,0,0,0.15); opacity: 0; transition: opacity 0.3s ease; z-index: 10;">
              Это конфиденциальная информация
            </div>
          </div>
        </div>
      `;
      detailsContainer.appendChild(medSection);
    }
  }

  // Load schedule image
  loadClassSchedule(classId);

}

/**
 * Render schedule for a given class — shows image from assets/img
 * @param {string} classId - e.g. "5 а", "10а-инж"
 */
function loadClassSchedule(classId) {
  const scheduleEl = document.getElementById("schedule-container");
  if (!scheduleEl) return;

  // Преобразуем classId в имя файла
  // "5 а" → "5а.jpg", "10а-инж" → "10а-инж.jpg"
  const fileName = classId.replace(/\s+/g, "").toLowerCase();
  const imagePath = `assets/img/classes/${fileName}.jpg`;

  scheduleEl.innerHTML = `
    <div class="schedule-image-wrapper" onclick="openScheduleLightbox('${imagePath}', '${classId}')">
      <img
        class="schedule-image"
        src="${imagePath}"
        alt="Расписание класса ${classId}"
        onerror="this.closest('.schedule-image-wrapper').outerHTML='<p class=\\'empty-list-message\\'>📅 Расписание для этого класса пока не добавлено</p>'"
      >
    </div>
    <p class="schedule-tap-hint">👆 Нажмите на расписание для увеличения</p>
  `;
}

// ============================================
// SCHEDULE LIGHTBOX
// ============================================

let lbScale = 1;
let lbTranslateX = 0;
let lbTranslateY = 0;
const LB_MIN = 0.5;
const LB_MAX = 6;
const LB_STEP = 0.25;

function openScheduleLightbox(src, classId) {
  const lb = document.getElementById("schedule-lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lb || !img) return;

  img.src = src;
  img.alt = `Расписание класса ${classId}`;
  lbScale = 1;
  lbTranslateX = 0;
  lbTranslateY = 0;
  applyLbTransform();

  lb.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeScheduleLightbox() {
  const lb = document.getElementById("schedule-lightbox");
  if (lb) lb.classList.remove("active");
  document.body.style.overflow = "";
}

function clampLbTranslate() {
  const img = document.getElementById("lightbox-img");
  if (!img) return;
  // img.offsetWidth/Height = размер без трансформ (layout size)
  const maxX = img.offsetWidth * lbScale * 0.5;
  const maxY = img.offsetHeight * lbScale * 0.5;
  lbTranslateX = Math.max(-maxX, Math.min(maxX, lbTranslateX));
  lbTranslateY = Math.max(-maxY, Math.min(maxY, lbTranslateY));
}

function applyLbTransform() {
  const img = document.getElementById("lightbox-img");
  const label = document.getElementById("lightbox-zoom-label");
  clampLbTranslate();
  if (img) {
    img.style.transform = `translate(${lbTranslateX}px, ${lbTranslateY}px) scale(${lbScale})`;
  }
  if (label) {
    label.textContent = Math.round(lbScale * 100) + "%";
  }
}


function lbZoom(delta, cx, cy) {
  const viewport = document.getElementById("lightbox-viewport");
  const img = document.getElementById("lightbox-img");
  if (!viewport || !img) return;

  const prevScale = lbScale;
  lbScale = Math.min(LB_MAX, Math.max(LB_MIN, lbScale + delta));

  // Зумируем относительно точки курсора/пальца
  if (cx !== undefined && cy !== undefined) {
    const rect = viewport.getBoundingClientRect();
    const ox = cx - rect.left - rect.width / 2;
    const oy = cy - rect.top - rect.height / 2;
    const scaleDiff = lbScale / prevScale;
    lbTranslateX = ox - (ox - lbTranslateX) * scaleDiff;
    lbTranslateY = oy - (oy - lbTranslateY) * scaleDiff;
  }

  if (lbScale === 1) {
    lbTranslateX = 0;
    lbTranslateY = 0;
  }

  applyLbTransform();
}

function initializeLightbox() {
  const lb = document.getElementById("schedule-lightbox");
  const viewport = document.getElementById("lightbox-viewport");
  if (!lb || !viewport) return;

  // Кнопки
  document.getElementById("lightbox-close").addEventListener("click", closeScheduleLightbox);
  document.getElementById("lightbox-overlay").addEventListener("click", closeScheduleLightbox);
  document.getElementById("lightbox-zoom-in").addEventListener("click", () => lbZoom(LB_STEP));
  document.getElementById("lightbox-zoom-out").addEventListener("click", () => lbZoom(-LB_STEP));
  document.getElementById("lightbox-reset").addEventListener("click", () => {
    lbScale = 1; lbTranslateX = 0; lbTranslateY = 0; applyLbTransform();
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("active")) closeScheduleLightbox();
  });

  // ──── Колёсико мыши ────
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? LB_STEP : -LB_STEP;
    lbZoom(delta, e.clientX, e.clientY);
  }, { passive: false });

  // ──── Перетаскивание мышью ────
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;
  let dragTX = 0, dragTY = 0;

  viewport.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragTX = lbTranslateX;
    dragTY = lbTranslateY;
    viewport.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    lbTranslateX = dragTX + (e.clientX - dragStartX);
    lbTranslateY = dragTY + (e.clientY - dragStartY);
    applyLbTransform();
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    viewport.classList.remove("dragging");
  });

  // ──── Touch: pinch-to-zoom + pan ────
  let lastDist = 0;
  let lastTouchX = 0, lastTouchY = 0;
  let touchStartTX = 0, touchStartTY = 0;
  let touchStartX = 0, touchStartY = 0;

  viewport.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      lastDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      lastTouchY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    } else if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTX = lbTranslateX;
      touchStartTY = lbTranslateY;
    }
  }, { passive: false });

  viewport.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      if (lastDist > 0) {
        const scaleFactor = dist / lastDist;
        const newScale = Math.min(LB_MAX, Math.max(LB_MIN, lbScale * scaleFactor));
        const rect = viewport.getBoundingClientRect();
        const ox = cx - rect.left - rect.width / 2;
        const oy = cy - rect.top - rect.height / 2;
        const ratio = newScale / lbScale;
        lbTranslateX = ox - (ox - lbTranslateX) * ratio + (cx - lastTouchX);
        lbTranslateY = oy - (oy - lbTranslateY) * ratio + (cy - lastTouchY);
        lbScale = newScale;
        applyLbTransform();
      }

      lastDist = dist;
      lastTouchX = cx;
      lastTouchY = cy;
    } else if (e.touches.length === 1) {
      lbTranslateX = touchStartTX + (e.touches[0].clientX - touchStartX);
      lbTranslateY = touchStartTY + (e.touches[0].clientY - touchStartY);
      applyLbTransform();
    }
  }, { passive: false });

  viewport.addEventListener("touchend", (e) => {
    lastDist = 0;
    if (e.touches.length === 0 && lbScale < 1.05) {
      lbScale = 1; lbTranslateX = 0; lbTranslateY = 0; applyLbTransform();
    }
  });
}


// ============================================
// TEACHERS FUNCTIONS
// ============================================

/**
 * Generate Subjects Accordion for Teachers
 */
function generateSubjectsAccordion() {
  const accordion = document.getElementById("subjects-accordion");
  accordion.innerHTML = "";

  const subjectsData = [
    { name: "История", icon: "📜" },
    { name: "Литература", icon: "📖" },
    { name: "Математика", icon: "📐" },
    { name: "География", icon: "🌍" },
    { name: "Физика", icon: "🔬" },
    { name: "Химия", icon: "🧪" },
    { name: "Биология", icon: "🌿" },
    { name: "Английский язык", icon: "🌐" },
    { name: "Информатика", icon: "💻" },
    { name: "Музыка", icon: "🎵" },
    { name: "Основы государства и права", icon: "⚖️" },
    { name: "Технология", icon: "🔧" },
    { name: "Узбекский язык", icon: "📚" },
    { name: "Физкультура", icon: "💪" },
    { name: "Черчение", icon: "📐" },
    { name: "Футбол", icon: "⚽" },
    { name: "Эмоциональный интеллект", icon: "🧠" },
    { name: "MBA", icon: "💼" },
    { name: "Английский факультатив", icon: "🔤" },
    { name: "Британский этикет", icon: "🫖" },
    { name: "Тьютор", icon: "🎓" },
  ];

  subjectsData.forEach((subject) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    item.innerHTML = `
            <div class="accordion-header" data-subject="${subject.name}">
                <h3 class="accordion-title">${subject.icon} ${subject.name}</h3>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <div class="accordion-content">
                <div class="teachers-grid" id="teachers-grid-${subject.name}">
                    <p class="empty-list-message">Загрузка...</p>
                </div>
            </div>
        `;

    accordion.appendChild(item);
  });

  initializeSubjectsAccordion();
  loadTeachersLocally();
}


/**
 * Загрузка учителей из локальных данных TEACHERS_DATA и отображение по предметам
 */
function loadTeachersLocally() {
  function getSurname(name) {
    return name.split(" ")[0].toLowerCase().replace(/[.]/g, "");
  }

  const teachersBySubject = {};

  TEACHERS_DATA.forEach((teacher) => {
    if (!teachersBySubject[teacher.subject]) {
      teachersBySubject[teacher.subject] = [];
    }
    // Добавляем только если учителя ещё нет в списке (uпрощаем дубликаты по фамилии)
    const surname = getSurname(teacher.name);
    const exists = teachersBySubject[teacher.subject].some(
      (t) => getSurname(t.name) === surname,
    );
    if (!exists) {
      teachersBySubject[teacher.subject].push(teacher);
    }
  });

  renderTeachersGrids(teachersBySubject);
}


/**
 * Render teachers grids for all subjects
 */
function renderTeachersGrids(teachersBySubject) {
  document.querySelectorAll(".teachers-grid").forEach((grid) => {
    const subjectName = grid.id.replace("teachers-grid-", "");
    const subjectTeachers = teachersBySubject[subjectName];

    if (subjectTeachers && subjectTeachers.length > 0) {
      grid.innerHTML = subjectTeachers
        .map(
          (teacher) => `
                <div class="teacher-card-item" onclick="openTeacherProfile('${escapeTeacherName(teacher.name)}')" style="cursor: pointer;">
                    <div class="teacher-card-photo">👨‍🏫</div>
                    <div class="teacher-card-info">
                        <h4 class="teacher-card-name">${teacher.name}</h4>
                        ${teacher.classroom ? `<p class="teacher-card-class">🚪 ${teacher.classroom}</p>` : ''}
                        ${teacher.class ? `<p class="teacher-card-class">📋 ${teacher.class}</p>` : ''}
                    </div>
                </div>
            `,
        )
        .join("");
    } else {
      grid.innerHTML =
        '<p class="empty-list-message">Информация об учителях буд��т добавлена позже</p>';
    }
  });
}

/**
 * Escape teacher name for onclick handler
 */
function escapeTeacherName(name) {
  return name.replace(/'/g, "\\'");
}

/**
 * Open teacher profile modal
 */
function openTeacherProfile(teacherName) {
  const teacher = getTeacherByName(teacherName);
  if (!teacher) {
    console.error("Teacher not found:", teacherName);
    return;
  }

  // Find all classes for this teacher (by surname)
  const allTeacherClasses = getTeachersBySurname(teacherName).filter(
    (t) => t.class && t.class !== "не определён"
  );

  // Get unique subjects for this teacher
  const allTeacherSubjects = [
    ...new Set(getTeachersBySurname(teacherName).map((t) => t.subject)),
  ];

  openModal("teacher-profile-modal");

  // Fill modal data
  document.getElementById("teacher-profile-name").textContent = teacher.name;
  document.getElementById("teacher-profile-subject").textContent =
    allTeacherSubjects.join(", ");

  // Classes info
  const classesContainer = document.getElementById("teacher-profile-classes");
  if (allTeacherClasses.length > 0) {
    classesContainer.innerHTML = allTeacherClasses
      .map(
        (tc) => `
            <div class="teacher-class-item">
                <span class="class-badge">${tc.class}</span>
                <span class="classroom-badge">каб. ${tc.classroom}</span>
            </div>
        `,
      )
      .join("");
  } else {
    classesContainer.innerHTML =
      '<p class="empty-list-message">Нет закреплённых классов</p>';
  }

  // Subjects info
  const subjectsContainer = document.getElementById("teacher-profile-subjects");
  subjectsContainer.innerHTML = allTeacherSubjects
    .map(
      (subj) => `
        <span class="subject-badge">${subj}</span>
    `,
    )
    .join("");
}

function initializeSubjectsAccordion() {
  const headers = document.querySelectorAll(
    "#subjects-accordion .accordion-header",
  );

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const isActive = this.classList.contains("active");

      document
        .querySelectorAll("#subjects-accordion .accordion-header")
        .forEach((h) => {
          h.classList.remove("active");
          h.nextElementSibling.classList.remove("active");
        });

      if (!isActive) {
        this.classList.add("active");
        this.nextElementSibling.classList.add("active");
      }
    });
  });
}

// ============================================
// CLASS SPECIFIC DATA
// ============================================
const CLASS_DATA = {
  "7 а": {
    menu: "assets/img/menu7A.jpg",
    students: [
      "Абдул-Ахадова Садия", "Абдумаликов Абдуманнон", "Акбаров Фирдавс", "Ботиржонов Абдуллох", 
      "Гайратуллаева Робия", "Жураев Азизхон", "Касымова Ясмина", "Махмудхановов Хасан", 
      "Махмудов Мирмахмуд", "Миркомилова Мумтоза", "Муроджонов Имрон", "Набиев Гуломжон", 
      "Назиржанова Эъзоза", "Плеханов Максим", "Рахимов Диёр", "Саипов Мухаммадяхё", 
      "Тоирова Омина", "Тураханов Рустам", "Уббиев Айдос", "Халилов Ойбек", "Хамраев Самир"
    ],
    teachers: [
      { subject: "Математика", names: "Шакасымова Эльба, Мамадалиева Э.А., Новикова Александра, Халимова В.А., Расулова Шахиста" },
      { subject: "История", names: "Дулянова А.Р." },
      { subject: "Английский язык", names: "Сайдуллаева Н.В., Хабибова Лейла" },
      { subject: "ИЗО", names: "Нурутдинова Михириниса" },
      { subject: "Русский язык", names: "Мазитова Лилия" },
      { subject: "Литература", names: "Мазитова Лилия" },
      { subject: "География", names: "Мирсаидова Сайера" },
      { subject: "MBA", names: "Ибрагимова Динара" },
      { subject: "Английский факультатив", names: "Хабибова Лейла, Ли Ирина" },
      { subject: "Физика", names: "Худайберганова Дильдора" },
      { subject: "Зоология", names: "Ильясова Анастасия" },
      { subject: "Физкультура", names: "Рахимов Акмаль, Фатхуллаев Рахматулла" },
      { subject: "СТЕМ", names: "Исаев Ислом" },
      { subject: "Информатика / ИВТ", names: "Белова Елена" },
      { subject: "Британский этикет", names: "Гурецкая Марина" },
      { subject: "Эмоциональный интеллект", names: "Синюгина Светлана" },
      { subject: "Химия", names: "Халмоджаева Дильфуза" },
      { subject: "Футбол", names: "Галеев Амир" },
      { subject: "Узбекский язык", names: "Холдарова Манзура" },
      { subject: "Технология", names: "Мирзаахмедова Мухтабар" },
      { subject: "ЦК", names: "Галимов Альберт" }
    ]
  }
};


