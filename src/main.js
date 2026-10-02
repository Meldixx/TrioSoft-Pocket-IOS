const state = {
  tab: 'home',
  notifications: 2,
  user: {
    name: 'Meldix',
    plan: 'Premium',
    initials: 'M'
  }
};

const icons = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.7 12 3l9 7.7v9.1a1.2 1.2 0 0 1-1.2 1.2h-5.1v-6.3H9.3V21H4.2A1.2 1.2 0 0 1 3 19.8z"/></svg>',
  apps: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>'
};

const apps = [
  { name: 'Aevon', desc: 'Быстрый приватный браузер', badge: 'Desktop', mark: 'A' },
  { name: 'App Hub', desc: 'Все продукты TrioSoft в одном месте', badge: 'Web', mark: 'H' },
  { name: 'Axion Terminal', desc: 'Терминал для разработки и проектов', badge: 'Desktop', mark: 'X' },
  { name: 'Neravia', desc: 'Инструменты для Discord-сообщества', badge: 'Web', mark: 'N' }
];

function appCard(item) {
  return `
    <button class="app-card pressable" data-toast="${item.name}: страница приложения будет подключена к API TrioSoft">
      <div class="app-icon">${item.mark}</div>
      <div class="app-copy">
        <strong>${item.name}</strong>
        <span>${item.desc}</span>
      </div>
      <span class="badge">${item.badge}</span>
      <span class="chevron">${icons.arrow}</span>
    </button>`;
}

function nav() {
  const tabs = [
    ['home', 'Главная', icons.home],
    ['apps', 'Приложения', icons.apps],
    ['notifications', 'События', icons.bell],
    ['profile', 'Профиль', icons.user]
  ];
  return `<nav class="tabbar">${tabs.map(([id,label,icon]) => `
    <button class="tab ${state.tab === id ? 'active' : ''}" data-tab="${id}" aria-label="${label}">
      <span class="tab-icon">${icon}${id === 'notifications' && state.notifications ? `<i>${state.notifications}</i>` : ''}</span>
      <span>${label}</span>
    </button>`).join('')}</nav>`;
}

function home() {
  return `
    <section class="screen active-screen">
      <header class="topbar">
        <div><p class="eyebrow">TRIOSOFT POCKET</p><h1>Добрый день.</h1></div>
        <button class="avatar pressable" data-tab="profile">${state.user.initials}</button>
      </header>

      <article class="hero-card">
        <div class="hero-glow"></div>
        <div class="hero-content">
          <span class="hero-pill">${icons.spark} Pocket Preview</span>
          <h2>Вся экосистема<br/>TrioSoft в кармане.</h2>
          <p>Приложения, аккаунт, события и сервисы — в одном мобильном клиенте.</p>
          <button class="primary pressable" data-tab="apps">Открыть приложения ${icons.arrow}</button>
        </div>
      </article>

      <div class="section-head"><h3>Быстрый доступ</h3><button data-tab="apps">Все</button></div>
      <div class="app-list">${apps.slice(0,3).map(appCard).join('')}</div>

      <div class="section-head"><h3>Сейчас</h3></div>
      <div class="status-grid">
        <article class="mini-card"><span class="status-dot"></span><small>Сервисы</small><strong>Всё работает</strong></article>
        <article class="mini-card"><span class="premium-dot"></span><small>TrioSoft ID</small><strong>${state.user.plan}</strong></article>
      </div>
    </section>`;
}

function appsView() {
  return `
    <section class="screen active-screen">
      <header class="page-head"><p class="eyebrow">КАТАЛОГ</p><h1>Приложения</h1><p>Все продукты и сервисы TrioSoft.</p></header>
      <label class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="appSearch" placeholder="Поиск" autocomplete="off" /></label>
      <div class="app-list" id="appList">${apps.map(appCard).join('')}</div>
    </section>`;
}

function notifications() {
  return `
    <section class="screen active-screen">
      <header class="page-head"><p class="eyebrow">ЦЕНТР СОБЫТИЙ</p><h1>События</h1><p>Обновления продуктов и аккаунта.</p></header>
      <div class="notice-card unread"><span class="notice-icon">↗</span><div><strong>Новая версия App Hub</strong><p>Доступно новое обновление интерфейса и профилей.</p><small>Сегодня</small></div></div>
      <div class="notice-card unread"><span class="notice-icon">★</span><div><strong>Premium активен</strong><p>Все преимущества TrioSoft ID доступны для аккаунта.</p><small>Сегодня</small></div></div>
      <div class="notice-card"><span class="notice-icon">✓</span><div><strong>Устройства синхронизированы</strong><p>Pocket готов к подключению облачной синхронизации.</p><small>Вчера</small></div></div>
    </section>`;
}

function profile() {
  return `
    <section class="screen active-screen">
      <header class="page-head"><p class="eyebrow">TRIOSOFT ID</p><h1>Профиль</h1></header>
      <article class="profile-card">
        <div class="profile-avatar">${state.user.initials}</div>
        <div><h2>${state.user.name}</h2><p>@meldix</p><span class="premium-badge">✦ ${state.user.plan}</span></div>
      </article>
      <div class="settings">
        ${[
          ['Аккаунт и безопасность','Пароль, устройства и сессии'],
          ['Внешний вид','Тема и акцентный цвет'],
          ['Уведомления','Настройка push-событий'],
          ['Конфиденциальность','Данные и разрешения']
        ].map(([a,b]) => `<button class="setting-row pressable" data-toast="${a}: раздел будет подключён в следующем этапе"><span><strong>${a}</strong><small>${b}</small></span>${icons.arrow}</button>`).join('')}
      </div>
      <p class="version" id="runtimeInfo">TrioSoft Pocket · 0.1.0</p>
    </section>`;
}

function render() {
  const views = { home, apps: appsView, notifications, profile };
  document.querySelector('#app').innerHTML = `<main class="phone-shell">${views[state.tab]()}${nav()}<div class="toast" id="toast"></div></main>`;
  bind();
  if (state.tab === 'profile') loadRuntimeInfo();
}

function bind() {
  document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => {
    state.tab = el.dataset.tab;
    if (state.tab === 'notifications') state.notifications = 0;
    render();
  }));

  document.querySelectorAll('[data-toast]').forEach(el => el.addEventListener('click', () => showToast(el.dataset.toast)));

  const search = document.querySelector('#appSearch');
  if (search) search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    const filtered = apps.filter(x => `${x.name} ${x.desc}`.toLowerCase().includes(q));
    document.querySelector('#appList').innerHTML = filtered.length ? filtered.map(appCard).join('') : '<div class="empty">Ничего не найдено</div>';
    document.querySelectorAll('[data-toast]').forEach(el => el.addEventListener('click', () => showToast(el.dataset.toast)));
  });
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

async function loadRuntimeInfo() {
  if (!window.__TAURI_INTERNALS__) return;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const info = await invoke('runtime_info');
    const el = document.querySelector('#runtimeInfo');
    if (el) el.textContent = `TrioSoft Pocket · ${info.version} · ${info.platform}`;
  } catch (_) {}
}

render();
