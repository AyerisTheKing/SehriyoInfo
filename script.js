// Version: 7.2
// Sehriyo School Website - Main JavaScript
// Created: 2026-02-14

// ============================================
// SUPABASE CONFIGURATION
// ============================================
const SUPABASE_URL = 'https://pqfzqzxkfbyrunwjlyfc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yAe0igd_Zt1QoXq8OTlY2w_oSDEjFXZ';

let supabaseClient = null;
let currentUser = null;
let currentProfile = null;

function initSupabase() {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized');
        return true;
    }
    console.warn('⚠️ Supabase SDK not loaded');
    return false;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Sehriyo School Website v7.0 loaded');
    
    initSupabase();
    initializeMainNav();
    initializeModals();
    initializeNavigation();
    initializeAnimations();
    initializeAuth();
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
        console.log('🔐 Auth event:', event);
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
    const { data: { session } } = await supabaseClient.auth.getSession();
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
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

    if (error) {
        console.error('❌ Error loading profile:', error.message);
        return null;
    }
    currentProfile = data;
    console.log('👤 Profile loaded:', currentProfile.full_name, '| Role:', currentProfile.role);
    return currentProfile;
}

/**
 * Sign Up — register new user
 */
async function handleSignUp(e) {
    e.preventDefault();
    if (!supabaseClient) return showAuthError('Supabase не инициализирован');

    const fullName = document.getElementById('reg-name').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-password-confirm').value;
    const role = document.getElementById('reg-role').value;

    // Validation
    if (!fullName || !username || !password || !role) {
        return showAuthError('Заполните все обязательные поля');
    }
    // Username validation: only latin letters, digits, underscores, dots
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        return showAuthError('Логин может содержать только латинские буквы, цифры, точки и подчёркивания');
    }
    if (username.length < 3) {
        return showAuthError('Логин должен быть не менее 3 символов');
    }
    if (password !== confirmPassword) {
        return showAuthError('Пароли не совпадают');
    }
    if (password.length < 6) {
        return showAuthError('Пароль должен быть не менее 6 символов');
    }

    // Construct fake email from username for Supabase Auth
    const fakeEmail = username.toLowerCase() + '@sehriyo.local';

    // For students: require class invite code
    let classId = null;
    if (role === 'student') {
        const inviteCode = document.getElementById('reg-class-code').value.trim();
        if (!inviteCode) {
            return showAuthError('Ученику необходимо ввести код класса');
        }
        // Verify class code
        const { data: classData, error: classError } = await supabaseClient
            .from('classes')
            .select('id, grade, letter')
            .eq('student_invite_code', inviteCode)
            .single();

        if (classError || !classData) {
            return showAuthError('Неверный код класса. Попросите код у своего классного руководителя.');
            return;
        }
        classId = classData.id;
        console.log(`✅ Class found: ${classData.grade}-${classData.letter}`);
    }

    // Disable submit button
    const submitBtn = document.getElementById('reg-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Регистрация...';

    try {
        // 1. Create auth user
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: fakeEmail,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                    username: username
                }
            }
        });

        if (authError) throw authError;

        const userId = authData.user.id;

        // 2. Create profile
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({
                id: userId,
                role: role,
                full_name: fullName,
                username: username
            });

        if (profileError) throw profileError;

        // 3. If student — create student_details with class
        if (role === 'student' && classId) {
            // Generate a parent invite code
            const parentCode = generateInviteCode(12);
            const { error: detailError } = await supabaseClient
                .from('student_details')
                .insert({
                    profile_id: userId,
                    class_id: classId,
                    parent_invite_code: parentCode
                });

            if (detailError) throw detailError;
            console.log(`📚 Student linked to class. Parent code: ${parentCode}`);
        }

        showAuthSuccess('Регистрация успешна! Проверьте почту для подтверждения.');
        switchAuthForm('login');

    } catch (err) {
        console.error('❌ Registration error:', err);
        showAuthError(err.message || 'Ошибка при регистрации');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Зарегистрироваться';
    }
}

/**
 * Sign In with username and password
 */
async function handleSignIn(e) {
    e.preventDefault();
    if (!supabaseClient) return showAuthError('Supabase не инициализирован');

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        return showAuthError('Введите логин и пароль');
    }

    // Construct fake email from username
    const fakeEmail = username.toLowerCase() + '@sehriyo.local';

    const submitBtn = document.getElementById('login-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Вход...';

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: fakeEmail,
            password: password
        });

        if (error) throw error;

        // Сразу загружаем профиль без ожидания onAuthStateChange
        currentUser = data.user;
        await loadCurrentProfile();
        updateUIForLoggedInUser();

        showAuthSuccess('Вход выполнен!');
        setTimeout(() => closeModal('auth-modal'), 800);

    } catch (err) {
        console.error('❌ Login error:', err);
        showAuthError(err.message || 'Ошибка входа');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Войти';
    }
}

/**
 * Sign Out
 */
async function handleSignOut() {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error('❌ Sign out error:', error);
    } else {
        console.log('🚪 Signed out');
        // Перезагружаем страницу после выхода
        window.location.reload();
    }
}

/**
 * Generate random invite code
 */
function generateInviteCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// ============================================
// AUTH UI
// ============================================

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('header-login-btn');
    const profileBtn = document.getElementById('header-profile-btn');

    if (loginBtn) loginBtn.style.display = 'none';
    if (profileBtn) {
        profileBtn.style.display = 'flex';
        const nameEl = profileBtn.querySelector('.profile-btn-name');
        if (nameEl && currentProfile) {
            nameEl.textContent = currentProfile.full_name.split(' ')[0];
        }
    }
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('header-login-btn');
    const profileBtn = document.getElementById('header-profile-btn');

    if (loginBtn) loginBtn.style.display = 'flex';
    if (profileBtn) profileBtn.style.display = 'none';
}

function switchAuthForm(form) {
    const loginForm = document.getElementById('login-form-container');
    const regForm = document.getElementById('register-form-container');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegister = document.getElementById('auth-tab-register');

    if (form === 'login') {
        loginForm.classList.remove('hidden');
        regForm.classList.add('hidden');
        if (tabLogin) tabLogin.classList.add('active');
        if (tabRegister) tabRegister.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        regForm.classList.remove('hidden');
        if (tabLogin) tabLogin.classList.remove('active');
        if (tabRegister) tabRegister.classList.add('active');
    }
    clearAuthMessages();
}

function showAuthError(msg) {
    const el = document.getElementById('auth-message');
    if (el) {
        el.textContent = msg;
        el.className = 'auth-message auth-error';
        el.style.display = 'block';
    }
}

function showAuthSuccess(msg) {
    const el = document.getElementById('auth-message');
    if (el) {
        el.textContent = msg;
        el.className = 'auth-message auth-success';
        el.style.display = 'block';
    }
}

function clearAuthMessages() {
    const el = document.getElementById('auth-message');
    if (el) {
        el.textContent = '';
        el.style.display = 'none';
    }
}

/**
 * Toggle class-code field visibility based on role selection
 */
function onRoleChange() {
    const role = document.getElementById('reg-role').value;
    const classCodeGroup = document.getElementById('class-code-group');
    if (classCodeGroup) {
        classCodeGroup.style.display = role === 'student' ? 'flex' : 'none';
    }
}

/**
 * Toggle password visibility (eye icon)
 */
function togglePassword(btn) {
    const wrapper = btn.closest('.password-wrapper');
    const input = wrapper.querySelector('input');
    const eyeOpen = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');

    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}

// ============================================
// PARENT: Link Child by invite code
// ============================================

async function handleLinkChild(e) {
    e.preventDefault();
    if (!supabaseClient || !currentUser || !currentProfile) return;

    if (currentProfile.role !== 'parent') {
        return showDashboardMessage('Эта функция доступна только для родителей', 'error');
    }

    const code = document.getElementById('child-invite-code').value.trim();
    if (!code) {
        return showDashboardMessage('Введите код ребёнка', 'error');
    }

    try {
        // Find student by parent_invite_code
        const { data: student, error: findError } = await supabaseClient
            .from('student_details')
            .select('profile_id, profiles(full_name)')
            .eq('parent_invite_code', code)
            .single();

        if (findError || !student) {
            return showDashboardMessage('Неверный код ребёнка', 'error');
        }

        // Check if already linked
        const { data: existing } = await supabaseClient
            .from('parent_students')
            .select('student_id')
            .eq('parent_id', currentUser.id)
            .eq('student_id', student.profile_id)
            .maybeSingle();

        if (existing) {
            return showDashboardMessage('Этот ребёнок уже привязан к вашему аккаунту', 'error');
        }

        // Link parent-student
        const { error: linkError } = await supabaseClient
            .from('parent_students')
            .insert({
                parent_id: currentUser.id,
                student_id: student.profile_id
            });

        if (linkError) throw linkError;

        showDashboardMessage(`Ребёнок "${student.profiles.full_name}" успешно привязан!`, 'success');
        document.getElementById('child-invite-code').value = '';
        await loadDashboardData();

    } catch (err) {
        console.error('❌ Link child error:', err);
        showDashboardMessage('Ошибка при привязке ребёнка', 'error');
    }
}

function showDashboardMessage(msg, type) {
    const el = document.getElementById('dashboard-message');
    if (el) {
        el.textContent = msg;
        el.className = `auth-message auth-${type}`;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 4000);
    }
}

// ============================================
// PERSONAL DASHBOARD
// ============================================

async function openDashboard() {
    if (!currentUser || !currentProfile) {
        showComingSoonMessage('Войдите в аккаунт');
        return;
    }
    await loadDashboardData();
    openModal('dashboard-modal');
}

async function loadDashboardData() {
    if (!supabaseClient || !currentProfile) return;

    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    const role = currentProfile.role;

    // Profile header
    let html = `
        <div class="dashboard-profile-card">
            <div class="dashboard-avatar">${getAvatarEmoji(role)}</div>
            <div class="dashboard-user-info">
                <h3 class="dashboard-user-name">${currentProfile.full_name}</h3>
                <span class="dashboard-role-badge role-${role}">${getRoleName(role)}</span>
                <p class="dashboard-email">${currentProfile.email || ''}</p>
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
    if (role === 'parent') {
        html += await buildParentDashboard();
    } else if (role === 'teacher') {
        html += await buildTeacherDashboard();
    } else if (role === 'student') {
        html += await buildStudentDashboard();
    }

    dashboardContent.innerHTML = html;

    // Re-attach event handlers after rendering
    const linkForm = document.getElementById('link-child-form');
    if (linkForm) {
        linkForm.addEventListener('submit', handleLinkChild);
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
        .from('parent_students')
        .select(`
            student_id,
            profiles:student_id (
                id, full_name, email, phone, photo_url
            )
        `)
        .eq('parent_id', currentUser.id);

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
                .from('student_details')
                .select('class_id, classes(grade, letter, classroom_number)')
                .eq('profile_id', profile.id)
                .single();

            const classLabel = details?.classes ? `${details.classes.grade}-${details.classes.letter}` : '—';

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
        html += '</div></div>';
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
    let html = '';

    // Find classes where this teacher is supervisor
    const { data: myClasses, error } = await supabaseClient
        .from('classes')
        .select('id, grade, letter, classroom_number, student_invite_code')
        .eq('supervisor_id', currentUser.id);

    if (myClasses && myClasses.length > 0) {
        for (const cls of myClasses) {
            // Load students of this class
            const { data: students } = await supabaseClient
                .from('student_details')
                .select('profile_id, profiles(full_name, email, phone)')
                .eq('class_id', cls.id)
                .order('profiles(full_name)', { ascending: true });

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
                            <div class="stat-value">${cls.classroom_number || '—'}</div>
                            <div class="stat-label">Кабинет</div>
                        </div>
                    </div>
                    <div class="invite-code-box">
                        <span class="invite-label">Код для учеников:</span>
                        <code class="invite-code">${cls.student_invite_code || '—'}</code>
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
                html += '</div></div>';
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
    let html = '';

    const { data: details, error } = await supabaseClient
        .from('student_details')
        .select('class_id, parent_invite_code, birth_date, classes(grade, letter, classroom_number)')
        .eq('profile_id', currentUser.id)
        .single();

    if (details) {
        const cls = details.classes;
        html += `
            <div class="detail-section">
                <h3 class="detail-section-title">📚 Мой класс</h3>
                <div class="class-stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${cls ? cls.grade + '-' + cls.letter : '—'}</div>
                        <div class="stat-label">Класс</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${cls?.classroom_number || '—'}</div>
                        <div class="stat-label">Кабинет</div>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3 class="detail-section-title">👨‍👩‍👧 Код для родителя</h3>
                <p class="dashboard-hint">Дайте этот код вашему родителю, чтобы он мог привязать вас к своему аккаунту:</p>
                <div class="invite-code-box">
                    <code class="invite-code invite-code-large">${details.parent_invite_code || '—'}</code>
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
        .from('profiles')
        .select('*')
        .eq('id', studentId)
        .single();

    const { data: details } = await supabaseClient
        .from('student_details')
        .select('class_id, classes(grade, letter, classroom_number)')
        .eq('profile_id', studentId)
        .single();

    if (!profile) return;

    const cls = details?.classes;
    const classLabel = cls ? `${cls.grade}-${cls.letter}` : '—';

    // Show child info in a toast or mini-view
    showComingSoonMessage(`${profile.full_name} — ${classLabel} класс`);
}

function getAvatarEmoji(role) {
    const avatars = {
        'admin': '🛡️',
        'head_teacher': '🎓',
        'teacher': '👨‍🏫',
        'student': '🎒',
        'parent': '👨‍👩‍👧',
        'guest': '👤'
    };
    return avatars[role] || '👤';
}

function getRoleName(role) {
    const roles = {
        'admin': 'Администратор',
        'head_teacher': 'Завуч',
        'teacher': 'Учитель',
        'student': 'Ученик',
        'parent': 'Родитель',
        'guest': 'Гость'
    };
    return roles[role] || 'Гость';
}

// ============================================
// NAVIGATION & SECTIONS
// ============================================

/**
 * News Article Interactions
 */
function initializeNavigation() {
    const newsArticles = document.querySelectorAll('.news-article');
    const readMoreLinks = document.querySelectorAll('.news-read-more');
    
    newsArticles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        article.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = this.getAttribute('href').substring(1);
            handleNewsArticle(newsId);
        });
    });
}

function handleNewsArticle(newsId) {
    console.log(`📰 Opening news article: ${newsId}`);
    showComingSoonMessage('Полная статья');
}

function handleStudentsSection() {
    console.log('📚 Opening Students level selection');
    openModal('students-modal');
}

function handleTeachersSection() {
    console.log('👨‍🏫 Opening Teachers section');
    generateSubjectsAccordion();
    openModal('teachers-list-modal');
}

function handleAdministrationSection() {
    console.log('🏛️ Navigating to Administration section');
    showComingSoonMessage('Администрация');
}

/**
 * Show Coming Soon Message (temporary)
 */
function showComingSoonMessage(section) {
    const message = document.createElement('div');
    message.className = 'coming-soon-toast';
    message.textContent = typeof section === 'string' && section.includes(' ') ? section : `Раздел "${section}" скоро будет доступен`;
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
        message.style.opacity = '1';
        message.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (message.parentNode) document.body.removeChild(message);
        }, 300);
    }, 3000);
}

/**
 * Initialize Scroll Animations
 */
function initializeAnimations() {
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
    
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => observer.observe(card));
}

/**
 * Main Navigation Buttons
 */
function initializeMainNav() {
    const navStudents = document.getElementById('nav-students');
    const navTeachers = document.getElementById('nav-teachers');
    const navAdministration = document.getElementById('nav-administration');
    
    if (navStudents) {
        navStudents.addEventListener('click', function() {
            handleStudentsSection();
        });
    }
    
    if (navTeachers) {
        navTeachers.addEventListener('click', function() {
            handleTeachersSection();
        });
    }
    
    if (navAdministration) {
        navAdministration.addEventListener('click', function() {
            handleAdministrationSection();
        });
    }
    
    // Header auth buttons
    const loginBtn = document.getElementById('header-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal('auth-modal'));
    }

    const profileBtn = document.getElementById('header-profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => openDashboard());
    }
    
    console.log('🧭 Main navigation initialized');
}

// ============================================
// MODAL WINDOWS
// ============================================

function initializeModals() {
    // Students Modal
    const studentsModalClose = document.getElementById('students-modal-close');
    const studentsModalOverlay = document.getElementById('students-modal-overlay');
    const schoolLevelButtons = document.querySelectorAll('.school-level-btn');
    
    if (studentsModalClose) {
        studentsModalClose.addEventListener('click', () => closeModal('students-modal'));
    }
    if (studentsModalOverlay) {
        studentsModalOverlay.addEventListener('click', () => closeModal('students-modal'));
    }
    
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
        classSelectionClose.addEventListener('click', () => closeModal('class-selection-modal'));
    }
    if (classSelectionOverlay) {
        classSelectionOverlay.addEventListener('click', () => closeModal('class-selection-modal'));
    }
    
    // Class Details Modal
    const classDetailsClose = document.getElementById('class-details-close');
    const classDetailsOverlay = document.getElementById('class-details-overlay');
    
    if (classDetailsClose) {
        classDetailsClose.addEventListener('click', () => closeModal('class-details-modal'));
    }
    if (classDetailsOverlay) {
        classDetailsOverlay.addEventListener('click', () => closeModal('class-details-modal'));
    }
    
    // Teachers List Modal
    const teachersListClose = document.getElementById('teachers-list-close');
    const teachersListOverlay = document.getElementById('teachers-list-overlay');
    
    if (teachersListClose) {
        teachersListClose.addEventListener('click', () => closeModal('teachers-list-modal'));
    }
    if (teachersListOverlay) {
        teachersListOverlay.addEventListener('click', () => closeModal('teachers-list-modal'));
    }

    // Auth Modal
    const authModalClose = document.getElementById('auth-modal-close');
    const authModalOverlay = document.getElementById('auth-modal-overlay');

    if (authModalClose) {
        authModalClose.addEventListener('click', () => closeModal('auth-modal'));
    }
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', () => closeModal('auth-modal'));
    }

    // Dashboard Modal
    const dashboardClose = document.getElementById('dashboard-modal-close');
    const dashboardOverlay = document.getElementById('dashboard-modal-overlay');

    if (dashboardClose) {
        dashboardClose.addEventListener('click', () => closeModal('dashboard-modal'));
    }
    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', () => closeModal('dashboard-modal'));
    }

    // Auth form submissions
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleSignIn);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleSignUp);
    }

    // Role selector change
    const roleSelect = document.getElementById('reg-role');
    if (roleSelect) {
        roleSelect.addEventListener('change', onRoleChange);
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

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log(`📋 Modal opened: ${modalId}`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log(`📋 Modal closed: ${modalId}`);
    }
}

// ============================================
// SCHOOL LEVELS & CLASS SELECTION
// ============================================

function handleSchoolLevelSelection(level) {
    console.log(`🎒 Selected school level: ${level}`);
    
    const levelInfo = {
        'elementary': { name: 'Начальная школа', grades: [1, 2, 3, 4] },
        'middle': { name: 'Средняя школа', grades: [5, 6, 7, 8, 9] },
        'high': { name: 'Старшая школа', grades: [10, 11] }
    };
    
    closeModal('students-modal');
    
    setTimeout(() => {
        const info = levelInfo[level];
        document.getElementById('class-selection-title').textContent = info.name;
        generateGradesAccordion(info.grades);
        openModal('class-selection-modal');
    }, 300);
}

function generateGradesAccordion(grades) {
    const accordion = document.getElementById('grades-accordion');
    accordion.innerHTML = '';
    
    const gradeLetters = {
        1: ['А', 'Б', 'В', 'Г'],
        2: ['А', 'Б', 'В', 'Г', 'Д'],
        3: ['А', 'В', 'Г', 'Д'],
        4: ['А', 'Б', 'В', 'Г', 'Д', 'И'],
        5: ['А', 'Б', 'В', 'Г', 'Д'],
        6: ['А', 'Б', 'В', 'Г', 'Д'],
        7: ['А', 'Б', 'В', 'Г', 'Д'],
        8: ['А', 'Б', 'В', 'Г', 'Д'],
        9: ['Б', 'В', 'Д', 'И'],
        10: [],
        11: []
    };
    
    grades.forEach(grade => {
        const letters = gradeLetters[grade] || [];
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        if (letters.length === 0) {
            item.innerHTML = `
                <button class="class-btn class-btn-single" data-class="${grade}">
                    ${grade} класс
                </button>
            `;
        } else {
            item.innerHTML = `
                <div class="accordion-header" data-grade="${grade}">
                    <h3 class="accordion-title">${grade}-е классы</h3>
                    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="accordion-content">
                    <div class="accordion-body">
                        ${letters.map(letter => `
                            <button class="class-btn" data-class="${grade}-${letter}">
                                ${grade}-${letter}
                            </button>
                        `).join('')}
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
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            if (!isActive) {
                this.classList.add('active');
                this.nextElementSibling.classList.add('active');
            }
        });
    });
}

function initializeClassButtons() {
    const classButtons = document.querySelectorAll('.class-btn');
    
    classButtons.forEach(button => {
        button.addEventListener('click', function() {
            const className = this.getAttribute('data-class');
            openClassDetails(className);
        });
    });
}

function openClassDetails(className) {
    console.log(`📚 Opening details for class: ${className}`);
    
    closeModal('class-selection-modal');
    
    setTimeout(() => {
        document.getElementById('class-details-title').textContent = `Класс ${className}`;
        loadClassData(className);
        openModal('class-details-modal');
    }, 300);
}

// ============================================
// LOAD CLASS DATA FROM SUPABASE
// ============================================

/**
 * Load class data from Supabase (replaces old mock data)
 * @param {string} className - e.g. "5-А" or "10"
 */
async function loadClassData(className) {
    // Set loading state
    document.getElementById('teacher-name').textContent = 'Загрузка...';
    document.getElementById('teacher-contact').textContent = '';
    document.getElementById('students-count').textContent = '...';
    document.getElementById('classroom-number').textContent = '...';
    document.getElementById('class-monitor').textContent = '—';
    document.getElementById('students-list').innerHTML = '<p class="empty-list-message">Загрузка...</p>';

    if (!supabaseClient) {
        // Fallback if Supabase not available
        document.getElementById('teacher-name').textContent = '—';
        document.getElementById('teacher-contact').textContent = 'Подключение к базе данных не установлено';
        document.getElementById('students-count').textContent = '—';
        document.getElementById('classroom-number').textContent = '—';
        document.getElementById('students-list').innerHTML = '<p class="empty-list-message">Нет подключения к базе данных</p>';
        return;
    }

    try {
        // Parse className into grade and letter
        let grade, letter;
        if (className.includes('-')) {
            const parts = className.split('-');
            grade = parseInt(parts[0]);
            letter = parts[1];
        } else {
            grade = parseInt(className);
            letter = null;
        }

        // Build query for class
        let classQuery = supabaseClient
            .from('classes')
            .select(`
                id,
                grade,
                letter,
                classroom_number,
                student_invite_code,
                supervisor_id
            `)
            .eq('grade', grade);

        if (letter) {
            classQuery = classQuery.eq('letter', letter);
        }

        const { data: classData, error: classError } = await classQuery.single();

        if (classError || !classData) {
            document.getElementById('teacher-name').textContent = '—';
            document.getElementById('teacher-contact').textContent = 'Класс не найден в базе данных';
            document.getElementById('students-count').textContent = '0';
            document.getElementById('classroom-number').textContent = '—';
            document.getElementById('students-list').innerHTML = '<p class="empty-list-message">Класс не найден</p>';
            return;
        }

        // --- Teacher info ---
        // Load supervisor separately to avoid JOIN issues
        let supervisor = null;
        if (classData.supervisor_id) {
            const { data: supData } = await supabaseClient
                .from('profiles')
                .select('id, full_name, email, phone, is_contacts_hidden')
                .eq('id', classData.supervisor_id)
                .single();
            supervisor = supData;
        }

        if (supervisor) {
            const teacher = supervisor;
            document.getElementById('teacher-name').textContent = teacher.full_name;

            // Respect is_contacts_hidden
            const isGuest = !currentUser;
            if (teacher.is_contacts_hidden && isGuest) {
                const maskedEmail = teacher.email ? maskContact(teacher.email) : '';
                const maskedPhone = teacher.phone ? maskContact(teacher.phone) : '';
                document.getElementById('teacher-contact').textContent =
                    `📧 ${maskedEmail}${maskedPhone ? ' | 📞 ' + maskedPhone : ''}`;
            } else {
                const emailStr = teacher.email ? `📧 ${teacher.email}` : '';
                const phoneStr = teacher.phone ? `📞 ${teacher.phone}` : '';
                document.getElementById('teacher-contact').textContent =
                    [emailStr, phoneStr].filter(Boolean).join(' | ') || 'Контакты не указаны';
            }
        } else {
            document.getElementById('teacher-name').textContent = 'Не назначен';
            document.getElementById('teacher-contact').textContent = '';
        }

        // --- Classroom ---
        document.getElementById('classroom-number').textContent = classData.classroom_number || '—';

        // --- Students list ---
        const { data: students, error: studentsError } = await supabaseClient
            .from('student_details')
            .select('profile_id, profiles:profile_id(full_name)')
            .eq('class_id', classData.id);

        const studentsList = document.getElementById('students-list');

        if (students && students.length > 0) {
            // Sort by name
            students.sort((a, b) => a.profiles.full_name.localeCompare(b.profiles.full_name, 'ru'));

            document.getElementById('students-count').textContent = students.length;

            studentsList.innerHTML = students.map((s, i) => `
                <div class="student-item">
                    <span class="student-number">${i + 1}.</span>
                    <span class="student-name">${s.profiles.full_name}</span>
                </div>
            `).join('');
        } else {
            document.getElementById('students-count').textContent = '0';
            studentsList.innerHTML = '<p class="empty-list-message">В этом классе пока нет учеников</p>';
        }

    } catch (err) {
        console.error('❌ Error loading class data:', err);
        document.getElementById('teacher-name').textContent = '—';
        document.getElementById('teacher-contact').textContent = 'Ошибка загрузки данных';
        document.getElementById('students-count').textContent = '—';
        document.getElementById('classroom-number').textContent = '—';
        document.getElementById('students-list').innerHTML = '<p class="empty-list-message">Ошибка загрузки</p>';
    }
}

/**
 * Mask contact info with asterisks (for hidden contacts)
 */
function maskContact(value) {
    if (!value) return '***';
    if (value.includes('@')) {
        // Email: show first 2 chars + masked + @domain
        const [local, domain] = value.split('@');
        return local.substring(0, 2) + '***@' + domain;
    }
    // Phone: show first 4 and last 2
    if (value.length > 6) {
        return value.substring(0, 4) + '****' + value.substring(value.length - 2);
    }
    return '***';
}

// ============================================
// TEACHERS FUNCTIONS
// ============================================

/**
 * Generate Subjects Accordion for Teachers
 */
function generateSubjectsAccordion() {
    const accordion = document.getElementById('subjects-accordion');
    accordion.innerHTML = '';
    
    const subjectsData = [
        { name: 'Математика', icon: '📐' },
        { name: 'Русский язык и литература', icon: '📖' },
        { name: 'География', icon: '🌍' },
        { name: 'История', icon: '📜' },
        { name: 'Физика', icon: '🔬' },
        { name: 'Химия', icon: '🧪' },
        { name: 'Биология', icon: '🌿' },
        { name: 'Английский язык', icon: '🌐' },
        { name: 'Информатика', icon: '💻' },
        { name: 'ИЗО', icon: '🎨' },
        { name: 'Музыка', icon: '🎵' },
        { name: 'Физкультура', icon: '💪' }
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
    if (!supabaseClient) return;

    try {
        // For now, load all teachers (those with role=teacher)
        const { data: teachers, error } = await supabaseClient
            .from('profiles')
            .select('id, full_name, email, phone, photo_url, is_contacts_hidden')
            .eq('role', 'teacher');

        if (error || !teachers) {
            console.error('❌ Error loading teachers:', error);
            // Set fallback message for all grids
            document.querySelectorAll('.teachers-grid').forEach(grid => {
                grid.innerHTML = '<p class="empty-list-message">Информация об учителях будет добавлена позже</p>';
            });
            return;
        }

        // Load teacher_subjects associations
        const { data: assignments } = await supabaseClient
            .from('teacher_subjects')
            .select('teacher_id, subject_id, subjects(name)');

        // Group teachers by subject name
        const teachersBySubject = {};
        if (assignments) {
            assignments.forEach(a => {
                const subjectName = a.subjects?.name;
                if (subjectName) {
                    if (!teachersBySubject[subjectName]) {
                        teachersBySubject[subjectName] = [];
                    }
                    const teacher = teachers.find(t => t.id === a.teacher_id);
                    if (teacher) {
                        teachersBySubject[subjectName].push(teacher);
                    }
                }
            });
        }

        // Populate each subject grid
        document.querySelectorAll('.teachers-grid').forEach(grid => {
            const subjectName = grid.id.replace('teachers-grid-', '');
            const subjectTeachers = teachersBySubject[subjectName];

            if (subjectTeachers && subjectTeachers.length > 0) {
                grid.innerHTML = subjectTeachers.map(t => `
                    <div class="teacher-card-item">
                        <div class="teacher-card-photo">👨‍🏫</div>
                        <h4 class="teacher-card-name">${t.full_name}</h4>
                    </div>
                `).join('');
            } else {
                grid.innerHTML = '<p class="empty-list-message">Информация об учителях будет добавлена позже</p>';
            }
        });

    } catch (err) {
        console.error('❌ Error in loadTeachersFromDB:', err);
    }
}

function initializeSubjectsAccordion() {
    const headers = document.querySelectorAll('#subjects-accordion .accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('#subjects-accordion .accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            if (!isActive) {
                this.classList.add('active');
                this.nextElementSibling.classList.add('active');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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

window.addEventListener('resize', debounce(function() {
    console.log('📐 Window resized');
}, 250));

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMainNav,
        initializeModals,
        initializeNavigation,
        initializeAnimations,
        openModal,
        closeModal
    };
}
