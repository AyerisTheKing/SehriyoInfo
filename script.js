// Version: 8.8
// Sehriyo School Website - Main JavaScript
// Created: 2026-02-14
// Updated: 2026-02-21 - Teacher profiles, unified teachers data

// ============================================
// SUPABASE CONFIGURATION
// ============================================
const SUPABASE_URL = "https://pqfzqzxkfbyrunwjlyfc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_yAe0igd_Zt1QoXq8OTlY2w_oSDEjFXZ";

let supabaseClient = null;
let currentUser = null;
let currentProfile = null;

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

  // ==================== СТАРШАЯ ШКОЛА (10-11 классы) ====================
  {
    name: "Галимов А.М.",
    class: "10",
    classroom: "IT кабинет",
    subject: "Информатика",
  },
  {
    name: "Арапова А.А.",
    class: "11",
    classroom: "115",
    subject: "Английский язык",
  },

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

// Получить всех уникальных учителей (без дубликатов по фамилии)
function getAllUniqueTeachers() {
  const seen = new Set();
  return TEACHERS_DATA.filter((teacher) => {
    // Нормализуем имя для сравнения (убираем точки, пробелы, приводим к нижнему регистру)
    const normalizedName = teacher.name.toLowerCase().replace(/[.\s]/g, "");
    // Берём только фамилию (первое слово до пробела)
    const surname = normalizedName.split(" ")[0];

    if (seen.has(surname)) {
      return false;
    }
    seen.add(surname);
    return true;
  });
}

// Получить учителей по предмету
function getTeachersBySubject(subject) {
  return TEACHERS_DATA.filter((t) => t.subject === subject);
}

// Получить учителя по имени
function getTeacherByName(name) {
  return TEACHERS_DATA.find((t) => t.name === name);
}

// Helper function to get teacher info by class name
function getTeacherByClass(className) {
  return TEACHERS_DATA.find((t) => t.class === className);
}

// Получить учителей по фамилии (все записи)
function getTeachersBySurname(surname) {
  const normalizedSurname = surname.toLowerCase().replace(/[.\s]/g, "");
  return TEACHERS_DATA.filter((t) => {
    const tSurname = t.name.toLowerCase().split(" ")[0].replace(/[.\s]/g, "");
    return tSurname === normalizedSurname;
  });
}

function initSupabase() {
  if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    );
    console.log("✅ Supabase initialized");
    return true;
  }
  console.warn("⚠️ Supabase SDK not loaded");
  return false;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎓 Sehriyo School Website v8.8 loaded");

  initSupabase();
  initializeMainNav();
  initializeModals();
  initializeAuth();
  initializeLightbox();
});


// ============================================
// AUTHENTICATION
// ============================================

/**
 * Initialize Auth — check session, setup listeners
 */
async function initializeAuth() {
  if (!supabaseClient) return;

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    console.log("🔐 Auth event:", event);
    if (session?.user) {
      currentUser = session.user;
      // Не загружаем профиль здесь, чтобы избежать дублирования
      updateUIForLoggedInUser();
    } else {
      currentUser = null;
      currentProfile = null;
      updateUIForLoggedOutUser();
    }
  });

  // Check existing session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (session?.user) {
    currentUser = session.user;
    await loadCurrentProfile();
    updateUIForLoggedInUser();
  }
}

/**
 * Load current user's profile from profiles table
 */
async function loadCurrentProfile() {
  if (!supabaseClient || !currentUser) return null;

  // Кэширование: если профиль уже загружен, не делаем запрос
  if (currentProfile && currentProfile.id === currentUser.id) {
    return currentProfile;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", currentUser.id)
    .single();

  if (error) {
    console.error("❌ Error loading profile:", error.message);
    return null;
  }
  currentProfile = data;
  console.log(
    "👤 Profile loaded:",
    currentProfile.full_name,
    "| Role:",
    currentProfile.role,
  );
  return currentProfile;
}

/**
 * Sign Up — register new user
 */
async function handleSignUp(e) {
  e.preventDefault();
  if (!supabaseClient) return showAuthError("Supabase не инициализирован");

  const fullName = document.getElementById("reg-name").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-password-confirm").value;
  const role = document.getElementById("reg-role").value;

  // Validation
  if (!fullName || !username || !password || !role) {
    return showAuthError("Заполните все обязательные поля");
  }
  // Username validation: only latin letters, digits, underscores, dots
  if (!/^[a-zA-Z0-9._]+$/.test(username)) {
    return showAuthError(
      "Логин может содержать только латинские буквы, цифры, точки и подчёркивания",
    );
  }
  if (username.length < 3) {
    return showAuthError("Логин должен быть не менее 3 символов");
  }
  if (password !== confirmPassword) {
    return showAuthError("Пароли не совпадают");
  }
  if (password.length < 6) {
    return showAuthError("Пароль должен быть не менее 6 символов");
  }

  // Construct fake email from username for Supabase Auth
  const fakeEmail = username.toLowerCase() + "@sehriyo.local";

  // For students: require class invite code
  let classId = null;
  if (role === "student") {
    const inviteCode = document.getElementById("reg-class-code").value.trim();
    if (!inviteCode) {
      return showAuthError("Ученику необходимо ввести код класса");
    }
    // Verify class code
    const { data: classData, error: classError } = await supabaseClient
      .from("classes")
      .select("id, grade, letter")
      .eq("student_invite_code", inviteCode)
      .single();

    if (classError || !classData) {
      return showAuthError(
        "Неверный код класса. Попросите код у своего классного руководителя.",
      );

    }
    classId = classData.id;
    console.log(`✅ Class found: ${classData.grade}-${classData.letter}`);
  }

  // Disable submit button
  const submitBtn = document.getElementById("reg-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Регистрация...";

  try {
    // 1. Create auth user
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email: fakeEmail,
        password: password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            username: username,
          },
        },
      });

    if (authError) throw authError;

    const userId = authData.user.id;

    // 2. Create profile
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert({
        id: userId,
        role: role,
        full_name: fullName,
        username: username,
      });

    if (profileError) throw profileError;

    // 3. If student — create student_details with class
    if (role === "student" && classId) {
      // Generate a parent invite code
      const parentCode = generateInviteCode(12);
      const { error: detailError } = await supabaseClient
        .from("student_details")
        .insert({
          profile_id: userId,
          class_id: classId,
          parent_invite_code: parentCode,
        });

      if (detailError) throw detailError;
      console.log(`📚 Student linked to class. Parent code: ${parentCode}`);
    }

    showAuthSuccess("Регистрация успешна! Проверьте почту для подтверждения.");
    switchAuthForm("login");
  } catch (err) {
    console.error("❌ Registration error:", err);
    showAuthError(err.message || "Ошибка при регистрации");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Зарегистрироваться";
  }
}

/**
 * Sign In with username and password
 */
async function handleSignIn(e) {
  e.preventDefault();
  if (!supabaseClient) return showAuthError("Supabase не инициализирован");

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    return showAuthError("Введите логин и пароль");
  }

  // Construct fake email from username
  const fakeEmail = username.toLowerCase() + "@sehriyo.local";

  const submitBtn = document.getElementById("login-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Вход...";

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: fakeEmail,
      password: password,
    });

    if (error) throw error;

    // Сразу загружаем профиль без ожидания onAuthStateChange
    currentUser = data.user;
    await loadCurrentProfile();
    updateUIForLoggedInUser();

    showAuthSuccess("Вход выполнен!");
    setTimeout(() => closeModal("auth-modal"), 800);
  } catch (err) {
    console.error("❌ Login error:", err);
    showAuthError(err.message || "Ошибка входа");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Войти";
  }
}

/**
 * Sign Out
 */
async function handleSignOut() {
  if (!supabaseClient) return;

  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("❌ Sign out error:", error);
  } else {
    console.log("🚪 Signed out");
    // Перезагружаем страницу после выхода
    window.location.reload();
  }
}

/**
 * Generate random invite code
 */
function generateInviteCode(length) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ============================================
// AUTH UI
// ============================================

function updateUIForLoggedInUser() {
  const loginBtn = document.getElementById("header-login-btn");
  const profileBtn = document.getElementById("header-profile-btn");

  if (loginBtn) loginBtn.style.display = "none";
  if (profileBtn) {
    profileBtn.style.display = "flex";
    const nameEl = profileBtn.querySelector(".profile-btn-name");
    if (nameEl && currentProfile) {
      nameEl.textContent = currentProfile.full_name.split(" ")[0];
    }
  }
}

function updateUIForLoggedOutUser() {
  const loginBtn = document.getElementById("header-login-btn");
  const profileBtn = document.getElementById("header-profile-btn");

  if (loginBtn) loginBtn.style.display = "flex";
  if (profileBtn) profileBtn.style.display = "none";
}

function switchAuthForm(form) {
  const loginForm = document.getElementById("login-form-container");
  const regForm = document.getElementById("register-form-container");
  const tabLogin = document.getElementById("auth-tab-login");
  const tabRegister = document.getElementById("auth-tab-register");

  if (form === "login") {
    loginForm.classList.remove("hidden");
    regForm.classList.add("hidden");
    if (tabLogin) tabLogin.classList.add("active");
    if (tabRegister) tabRegister.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    regForm.classList.remove("hidden");
    if (tabLogin) tabLogin.classList.remove("active");
    if (tabRegister) tabRegister.classList.add("active");
  }
  clearAuthMessages();
}

function showAuthError(msg) {
  const el = document.getElementById("auth-message");
  if (el) {
    el.textContent = msg;
    el.className = "auth-message auth-error";
    el.style.display = "block";
  }
}

function showAuthSuccess(msg) {
  const el = document.getElementById("auth-message");
  if (el) {
    el.textContent = msg;
    el.className = "auth-message auth-success";
    el.style.display = "block";
  }
}

function clearAuthMessages() {
  const el = document.getElementById("auth-message");
  if (el) {
    el.textContent = "";
    el.style.display = "none";
  }
}

/**
 * Toggle class-code field visibility based on role selection
 */
function onRoleChange() {
  const role = document.getElementById("reg-role").value;
  const classCodeGroup = document.getElementById("class-code-group");
  if (classCodeGroup) {
    classCodeGroup.style.display = role === "student" ? "flex" : "none";
  }
}

/**
 * Toggle password visibility (eye icon)
 */
function togglePassword(btn) {
  const wrapper = btn.closest(".password-wrapper");
  const input = wrapper.querySelector("input");
  const eyeOpen = btn.querySelector(".eye-open");
  const eyeClosed = btn.querySelector(".eye-closed");

  if (input.type === "password") {
    input.type = "text";
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  } else {
    input.type = "password";
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  }
}

// ============================================
// PARENT: Link Child by invite code
// ============================================

async function handleLinkChild(e) {
  e.preventDefault();
  if (!supabaseClient || !currentUser || !currentProfile) return;

  if (currentProfile.role !== "parent") {
    return showDashboardMessage(
      "Эта функция доступна только для родителей",
      "error",
    );
  }

  const code = document.getElementById("child-invite-code").value.trim();
  if (!code) {
    return showDashboardMessage("Введите код ребёнка", "error");
  }

  try {
    // Find student by parent_invite_code
    const { data: student, error: findError } = await supabaseClient
      .from("student_details")
      .select("profile_id, profiles(full_name)")
      .eq("parent_invite_code", code)
      .single();

    if (findError || !student) {
      return showDashboardMessage("Неверный код ребёнка", "error");
    }

    // Check if already linked
    const { data: existing } = await supabaseClient
      .from("parent_students")
      .select("student_id")
      .eq("parent_id", currentUser.id)
      .eq("student_id", student.profile_id)
      .maybeSingle();

    if (existing) {
      return showDashboardMessage(
        "Этот ребёнок уже привязан к вашему аккаунту",
        "error",
      );
    }

    // Link parent-student
    const { error: linkError } = await supabaseClient
      .from("parent_students")
      .insert({
        parent_id: currentUser.id,
        student_id: student.profile_id,
      });

    if (linkError) throw linkError;

    showDashboardMessage(
      `Ребёнок "${student.profiles.full_name}" успешно привязан!`,
      "success",
    );
    document.getElementById("child-invite-code").value = "";
    await loadDashboardData();
  } catch (err) {
    console.error("❌ Link child error:", err);
    showDashboardMessage("Ошибка при привязке ребёнка", "error");
  }
}

function showDashboardMessage(msg, type) {
  const el = document.getElementById("dashboard-message");
  if (el) {
    el.textContent = msg;
    el.className = `auth-message auth-${type}`;
    el.style.display = "block";
    setTimeout(() => {
      el.style.display = "none";
    }, 4000);
  }
}

// ============================================
// PERSONAL DASHBOARD
// ============================================

async function openDashboard() {
  if (!currentUser || !currentProfile) {
    showComingSoonMessage("Войдите в аккаунт");
    return;
  }
  await loadDashboardData();
  openModal("dashboard-modal");
}

async function loadDashboardData() {
  if (!supabaseClient || !currentProfile) return;

  const dashboardContent = document.getElementById("dashboard-content");
  if (!dashboardContent) return;

  const role = currentProfile.role;

  // Profile header
  let html = `
        <div class="dashboard-profile-card">
            <div class="dashboard-avatar">${getAvatarEmoji(role)}</div>
            <div class="dashboard-user-info">
                <h3 class="dashboard-user-name">${currentProfile.full_name}</h3>
                <span class="dashboard-role-badge role-${role}">${getRoleName(role)}</span>
            </div>
            <button class="dashboard-logout-btn" onclick="handleSignOut()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Выйти
            </button>
        </div>
        <div id="dashboard-message" class="auth-message" style="display:none;"></div>
    `;

  // Role-specific content
  if (role === "parent") {
    html += await buildParentDashboard();
  } else if (role === "teacher") {
    html += await buildTeacherDashboard();
  } else if (role === "student") {
    html += await buildStudentDashboard();
  }

  dashboardContent.innerHTML = html;

  // Re-attach event handlers after rendering
  const linkForm = document.getElementById("link-child-form");
  if (linkForm) {
    linkForm.addEventListener("submit", handleLinkChild);
  }
}

/**
 * Build Parent Dashboard: list children, link form
 */
async function buildParentDashboard() {
  let html = `
        <div class="detail-section">
            <h3 class="detail-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Привязать ребёнка
            </h3>
            <form id="link-child-form" class="link-child-form">
                <div class="form-group-inline">
                    <input type="text" id="child-invite-code" placeholder="Введите код ребёнка (из ЛК ученика)" required>
                    <button type="submit" class="auth-submit-btn btn-compact">Привязать</button>
                </div>
            </form>
        </div>
    `;

  // Load children
  const { data: children, error } = await supabaseClient
    .from("parent_students")
    .select(
      `
            student_id,
            profiles:student_id (
                id, full_name, email, phone, photo_url
            )
        `,
    )
    .eq("parent_id", currentUser.id);

  if (children && children.length > 0) {
    html += `
            <div class="detail-section">
                <h3 class="detail-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Мои дети (${children.length})
                </h3>
                <div class="children-list">
        `;

    for (const child of children) {
      const profile = child.profiles;
      // Load student class info
      const { data: details } = await supabaseClient
        .from("student_details")
        .select("class_id, classes(grade, letter, classroom_number)")
        .eq("profile_id", profile.id)
        .single();

      const classLabel = details?.classes
        ? `${details.classes.grade}-${details.classes.letter}`
        : "—";

      html += `
                <div class="child-card" onclick="viewChildDetails('${profile.id}')">
                    <div class="child-avatar">🎒</div>
                    <div class="child-info">
                        <h4>${profile.full_name}</h4>
                        <p>Класс: ${classLabel}</p>
                    </div>
                    <svg class="child-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            `;
    }
    html += "</div></div>";
  } else {
    html += `
            <div class="detail-section">
                <p class="empty-list-message">У вас пока нет привязанных детей. Введите код ребёнка выше.</p>
            </div>
        `;
  }

  return html;
}

/**
 * Build Teacher Dashboard: my class info
 */
async function buildTeacherDashboard() {
  let html = "";

  // Find classes where this teacher is supervisor
  const { data: myClasses, error } = await supabaseClient
    .from("classes")
    .select("id, grade, letter, classroom_number, student_invite_code")
    .eq("supervisor_id", currentUser.id);

  if (myClasses && myClasses.length > 0) {
    for (const cls of myClasses) {
      // Load students of this class
      const { data: students } = await supabaseClient
        .from("student_details")
        .select("profile_id, profiles(full_name, email, phone)")
        .eq("class_id", cls.id)
        .order("profiles(full_name)", { ascending: true });

      html += `
                <div class="detail-section">
                    <h3 class="detail-section-title">
                        📚 Мой класс: ${cls.grade}-${cls.letter}
                    </h3>
                    <div class="class-stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${students?.length || 0}</div>
                            <div class="stat-label">Учеников</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${cls.classroom_number || "—"}</div>
                            <div class="stat-label">Кабинет</div>
                        </div>
                    </div>
                    <div class="invite-code-box">
                        <span class="invite-label">Код для учеников:</span>
                        <code class="invite-code">${cls.student_invite_code || "—"}</code>
                    </div>
                </div>
            `;

      if (students && students.length > 0) {
        html += `
                    <div class="detail-section">
                        <h3 class="detail-section-title">Список учеников</h3>
                        <div class="students-list">
                `;
        students.forEach((s, i) => {
          html += `
                        <div class="student-item">
                            <span class="student-number">${i + 1}.</span>
                            <span class="student-name">${s.profiles.full_name}</span>
                        </div>
                    `;
        });
        html += "</div></div>";
      }
    }
  } else {
    html += `
            <div class="detail-section">
                <p class="empty-list-message">У вас нет закреплённых классов.</p>
            </div>
        `;
  }

  return html;
}

/**
 * Build Student Dashboard: my class, parent invite code
 */
async function buildStudentDashboard() {
  let html = "";

  const { data: details, error } = await supabaseClient
    .from("student_details")
    .select(
      "class_id, parent_invite_code, birth_date, classes(grade, letter, classroom_number)",
    )
    .eq("profile_id", currentUser.id)
    .single();

  if (details) {
    const cls = details.classes;
    html += `
            <div class="detail-section">
                <h3 class="detail-section-title">📚 Мой класс</h3>
                <div class="class-stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${cls ? cls.grade + "-" + cls.letter : "—"}</div>
                        <div class="stat-label">Класс</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${cls?.classroom_number || "—"}</div>
                        <div class="stat-label">Кабинет</div>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3 class="detail-section-title">👨‍👩‍👧 Код для родителя</h3>
                <p class="dashboard-hint">Дайте этот код вашему родителю, чтобы он мог привязать вас к своему аккаунту:</p>
                <div class="invite-code-box">
                    <code class="invite-code invite-code-large">${details.parent_invite_code || "—"}</code>
                </div>
            </div>
        `;
  } else {
    html += `
            <div class="detail-section">
                <p class="empty-list-message">Информация о классе не найдена.</p>
            </div>
        `;
  }

  return html;
}

/**
 * View child details (for parent switching)
 */
async function viewChildDetails(studentId) {
  if (!supabaseClient) return;

  const { data: profile } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", studentId)
    .single();

  const { data: details } = await supabaseClient
    .from("student_details")
    .select("class_id, classes(grade, letter, classroom_number)")
    .eq("profile_id", studentId)
    .single();

  if (!profile) return;

  const cls = details?.classes;
  const classLabel = cls ? `${cls.grade}-${cls.letter}` : "—";

  // Show child info in a toast or mini-view
  showComingSoonMessage(`${profile.full_name} — ${classLabel} класс`);
}

function getAvatarEmoji(role) {
  const avatars = {
    admin: "🛡️",
    head_teacher: "🎓",
    teacher: "👨‍🏫",
    student: "🎒",
    parent: "👨‍👩‍👧",
    guest: "👤",
  };
  return avatars[role] || "👤";
}

function getRoleName(role) {
  const roles = {
    admin: "Администратор",
    head_teacher: "Завуч",
    teacher: "Учитель",
    student: "Ученик",
    parent: "Родитель",
    guest: "Гость",
  };
  return roles[role] || "Гость";
}

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

  // Header auth buttons
  const loginBtn = document.getElementById("header-login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("auth-modal"));
  }

  const profileBtn = document.getElementById("header-profile-btn");
  if (profileBtn) {
    profileBtn.addEventListener("click", () => openDashboard());
  }

  console.log("🧭 Main navigation initialized");
}

// ============================================
// MODAL WINDOWS
// ============================================

function initializeModals() {
  // Students Modal
  const studentsModalClose = document.getElementById("students-modal-close");
  const studentsModalOverlay = document.getElementById(
    "students-modal-overlay",
  );
  const schoolLevelButtons = document.querySelectorAll(".school-level-btn");

  if (studentsModalClose) {
    studentsModalClose.addEventListener("click", () =>
      closeModal("students-modal"),
    );
  }
  if (studentsModalOverlay) {
    studentsModalOverlay.addEventListener("click", () =>
      closeModal("students-modal"),
    );
  }

  schoolLevelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const level = this.getAttribute("data-level");
      handleSchoolLevelSelection(level);
    });
  });

  // Class Selection Modal
  const classSelectionClose = document.getElementById("class-selection-close");
  const classSelectionOverlay = document.getElementById(
    "class-selection-overlay",
  );

  if (classSelectionClose) {
    classSelectionClose.addEventListener("click", () =>
      closeModal("class-selection-modal"),
    );
  }
  if (classSelectionOverlay) {
    classSelectionOverlay.addEventListener("click", () =>
      closeModal("class-selection-modal"),
    );
  }

  // Class Details Modal
  const classDetailsClose = document.getElementById("class-details-close");
  const classDetailsOverlay = document.getElementById("class-details-overlay");

  if (classDetailsClose) {
    classDetailsClose.addEventListener("click", () =>
      closeModal("class-details-modal"),
    );
  }
  if (classDetailsOverlay) {
    classDetailsOverlay.addEventListener("click", () =>
      closeModal("class-details-modal"),
    );
  }

  // Teachers List Modal
  const teachersListClose = document.getElementById("teachers-list-close");
  const teachersListOverlay = document.getElementById("teachers-list-overlay");

  if (teachersListClose) {
    teachersListClose.addEventListener("click", () =>
      closeModal("teachers-list-modal"),
    );
  }
  if (teachersListOverlay) {
    teachersListOverlay.addEventListener("click", () =>
      closeModal("teachers-list-modal"),
    );
  }

  // Teacher Profile Modal
  const teacherProfileClose = document.getElementById("teacher-profile-close");
  const teacherProfileOverlay = document.getElementById(
    "teacher-profile-overlay",
  );

  if (teacherProfileClose) {
    teacherProfileClose.addEventListener("click", () =>
      closeModal("teacher-profile-modal"),
    );
  }
  if (teacherProfileOverlay) {
    teacherProfileOverlay.addEventListener("click", () =>
      closeModal("teacher-profile-modal"),
    );
  }

  // Auth Modal
  const authModalClose = document.getElementById("auth-modal-close");
  const authModalOverlay = document.getElementById("auth-modal-overlay");

  if (authModalClose) {
    authModalClose.addEventListener("click", () => closeModal("auth-modal"));
  }
  if (authModalOverlay) {
    authModalOverlay.addEventListener("click", () => closeModal("auth-modal"));
  }

  // Dashboard Modal
  const dashboardClose = document.getElementById("dashboard-modal-close");
  const dashboardOverlay = document.getElementById("dashboard-modal-overlay");

  if (dashboardClose) {
    dashboardClose.addEventListener("click", () =>
      closeModal("dashboard-modal"),
    );
  }
  if (dashboardOverlay) {
    dashboardOverlay.addEventListener("click", () =>
      closeModal("dashboard-modal"),
    );
  }

  // Auth form submissions
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleSignIn);
  }

  // Регистрация отключена
  // const registerForm = document.getElementById('register-form');
  // if (registerForm) {
  //     registerForm.addEventListener('submit', handleSignUp);
  // }

  // Role selector change (отключено, т.к. форма регистрации скрыта)
  // const roleSelect = document.getElementById('reg-role');
  // if (roleSelect) {
  //     roleSelect.addEventListener('change', onRoleChange);
  // }

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    console.log(`📋 Modal opened: ${modalId}`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    console.log(`📋 Modal closed: ${modalId}`);
  }
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

  closeModal("students-modal");

  setTimeout(() => {
    const info = levelInfo[level];
    document.getElementById("class-selection-title").textContent = info.name;
    generateGradesAccordion(info.grades);
    openModal("class-selection-modal");
  }, 300);
}

function generateGradesAccordion(grades) {
  const accordion = document.getElementById("grades-accordion");
  accordion.innerHTML = "";

  // Для 1-9 классов: массив букв (Буква добавляется к номеру класса, id = "5а", "9б" ...
  // Для 10-11 классов: конкретные id классов (совпадают с именем файла без .jpg)
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

  closeModal("class-selection-modal");

  setTimeout(() => {
    document.getElementById("class-details-title").textContent = displayName;
    loadClassData(classId);
    openModal("class-details-modal");
  }, 300);
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

  // Для 1-9 классов ("5 а") — ищем учителя по классу ("такой-то класс" в TEACHERS_DATA)
  // Для старшей школы ("10а-инж") — имя класса нефандартное
  // Преобразуем classId в формат TEACHERS_DATA ("5 а" → "5-А")
  const teacherKey = classId.includes(" ")
    ? classId.replace(/\s+/g, "-").replace(/-([a-zа-я])/g, (_, c) => "-" + c.toUpperCase())
    : classId;

  const teacher = getTeacherByClass(teacherKey);

  if (teacher) {
    document.getElementById("teacher-name").textContent = teacher.name;
    document.getElementById("classroom-number").textContent = teacher.classroom || "—";
  } else {
    document.getElementById("teacher-name").textContent = "—";
    document.getElementById("classroom-number").textContent = "—";
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
  const imagePath = `assets/img/${fileName}.jpg`;

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

  // Load teachers from DB for each subject
  if (supabaseClient) {
    loadTeachersFromDB();
  }
}

/**
 * Load teachers from Supabase grouped by subject
 */
async function loadTeachersFromDB() {
  // Вспомогательная функция для получения фамилии
  function getSurname(name) {
    return name.split(" ")[0].toLowerCase().replace(/[.]/g, "");
  }

  // Используем данные из TEACHERS_DATA
  const teachersBySubject = {};

  // Группируем учителей по предметам
  TEACHERS_DATA.forEach((teacher) => {
    if (!teachersBySubject[teacher.subject]) {
      teachersBySubject[teacher.subject] = [];
    }
    // Добавляем только если учителя ещё нет в списке (проверка дубликатов по фамилии)
    const surname = getSurname(teacher.name);
    const exists = teachersBySubject[teacher.subject].some(
      (t) => getSurname(t.name) === surname,
    );
    if (!exists) {
      teachersBySubject[teacher.subject].push(teacher);
    }
  });

  // Если нет подключения к Supabase или данные не загрузились, используем локальные данные
  if (!supabaseClient) {
    renderTeachersGrids(teachersBySubject);
    return;
  }

  try {
    // Пытаемся загрузить из Supabase
    const { data: teachers, error } = await supabaseClient
      .from("profiles")
      .select("id, full_name, photo_url")
      .eq("role", "teacher");

    if (error || !teachers || teachers.length === 0) {
      console.warn("⚠️ Нет данных в БД, используем локальные данные");
      renderTeachersGrids(teachersBySubject);
      return;
    }

    // Load teacher_subjects associations
    const { data: assignments } = await supabaseClient
      .from("teacher_subjects")
      .select("teacher_id, subject_id, subjects(name)");

    // Group teachers by subject name
    const dbTeachersBySubject = {};
    if (assignments) {
      assignments.forEach((a) => {
        const subjectName = a.subjects?.name;
        if (subjectName) {
          if (!dbTeachersBySubject[subjectName]) {
            dbTeachersBySubject[subjectName] = [];
          }
          const teacher = teachers.find((t) => t.id === a.teacher_id);
          if (teacher) {
            dbTeachersBySubject[subjectName].push(teacher);
          }
        }
      });
    }

    // Объединяем данные из БД с локальными
    const mergedTeachersBySubject = {};
    const allSubjects = new Set([
      ...Object.keys(teachersBySubject),
      ...Object.keys(dbTeachersBySubject),
    ]);

    allSubjects.forEach((subject) => {
      mergedTeachersBySubject[subject] = [];

      // Добавляем из БД
      if (dbTeachersBySubject[subject]) {
        mergedTeachersBySubject[subject] = dbTeachersBySubject[subject].map(
          (t) => ({
            name: t.full_name,
            class: "",
            classroom: "",
            subject: subject,
            profile_id: t.id,
          }),
        );
      }

      // Добавляем локальные, если нет в БД
      if (teachersBySubject[subject]) {
        teachersBySubject[subject].forEach((localTeacher) => {
          const surname = getSurname(localTeacher.name);
          const existsInDb = mergedTeachersBySubject[subject].some(
            (t) => getSurname(t.name) === surname,
          );
          if (!existsInDb) {
            mergedTeachersBySubject[subject].push(localTeacher);
          }
        });
      }
    });

    renderTeachersGrids(mergedTeachersBySubject);
  } catch (err) {
    console.error("❌ Error in loadTeachersFromDB:", err);
    renderTeachersGrids(teachersBySubject);
  }
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
    (t) => t.class !== "",
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
// UTILITY FUNCTIONS
// ============================================

function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

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

function trackEvent(category, action, label) {
  console.log(`📊 Event: ${category} - ${action} - ${label}`);
}

window.addEventListener(
  "resize",
  debounce(function () {
    console.log("📐 Window resized");
  }, 250),
);

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeMainNav,
    initializeModals,
    initializeNavigation,
    initializeAnimations,
    openModal,
    closeModal,
  };
}
