const BASE_TEMPLATE = `
  <div class="layout-shell">
    <aside class="layout-sidebar">
      <div class="brand">MIDNIGHT</div>
      <nav class="nav" aria-label="Navegación principal"></nav>
    </aside>
    <section class="layout-surface">
      <header class="layout-header">
        <div class="toolbar-title">
          <p class="section-desc" id="page-subtitle">Resumen</p>
          <h1 class="section-title" id="page-title">Panel</h1>
        </div>
        <div class="toolbar-actions">
          <div class="user-chip" aria-live="polite">
            <span class="avatar" id="user-initials">MC</span>
            <span class="meta">
              <span class="name" id="user-name">Usuario</span>
              <span class="role" id="user-role">Rol</span>
            </span>
          </div>
          <button class="btn-logout" type="button" id="logout-btn">Cerrar sesión</button>
        </div>
      </header>
      <main class="layout-main">
        <div class="toolbar">
          <div class="section-header" style="margin:0; padding:0; border:none;">
            <div>
              <p class="section-desc" id="section-subtitle">Estado general</p>
              <h2 class="section-title" id="section-title">Contenido</h2>
            </div>
          </div>
          <div class="toolbar-actions">
            <button class="btn-refresh" type="button" id="refresh-btn">Refrescar</button>
            <button class="btn-primary" type="button" data-open-modal="#app-modal">Nuevo</button>
          </div>
        </div>
        <section class="dashboard-grid" id="content-slot"></section>
      </main>
    </section>
  </div>`;

const MODAL_TEMPLATE = `
  <div class="app-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="app-modal-dialog">
      <div class="app-modal-header">
        <h3 class="section-title" id="modal-title">Acción</h3>
        <button class="btn-icon" type="button" data-close-modal>&times;</button>
      </div>
      <div class="app-modal-body">Contenido genérico de modal.</div>
      <div class="app-modal-footer">
        <button class="btn-refresh" type="button" data-close-modal>Cancelar</button>
        <button class="btn-primary" type="button">Confirmar</button>
      </div>
    </div>
  </div>`;

function getUser() {
  const stored = localStorage.getItem('mc_user');
  if (stored) {
    try { return JSON.parse(stored); } catch (_) { /* noop */ }
  }
  const dev = { id:'dev', username:'dev_admin', full_name:'Modo Desarrollador', role:'superadmin' };
  localStorage.setItem('mc_user', JSON.stringify(dev));
  return dev;
}

function createShell() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = BASE_TEMPLATE.trim();
  return wrapper.firstElementChild;
}

function attachModal() {
  if (document.querySelector('.app-modal')) return;
  const modalHost = document.createElement('div');
  modalHost.innerHTML = MODAL_TEMPLATE.trim();
  const modal = modalHost.firstElementChild;
  document.body.appendChild(modal);
  modal?.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => modal.classList.remove('is-open'));
  });
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => modal.classList.add('is-open'));
  });
  modal?.addEventListener('click', (evt) => {
    if (evt.target === modal) modal.classList.remove('is-open');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') modal?.classList.remove('is-open');
  });
}

export function applyLayout({
  title = 'Panel',
  subtitle = 'Resumen general',
  sectionTitle = 'Contenido',
  sectionSubtitle = 'Estado actual',
  navigation = [],
  onRefresh,
} = {}) {
  document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    document.querySelectorAll('.admin-header').forEach(node => node.remove());

    const shell = createShell();
    shell.querySelector('#page-title').textContent = title;
    shell.querySelector('#page-subtitle').textContent = subtitle;
    shell.querySelector('#section-title').textContent = sectionTitle;
    shell.querySelector('#section-subtitle').textContent = sectionSubtitle;
    shell.querySelector('#user-name').textContent = user.full_name || user.username || 'Usuario';
    shell.querySelector('#user-role').textContent = (user.role || 'Operador').toUpperCase();
    shell.querySelector('#user-initials').textContent = (user.full_name || user.username || 'MC').slice(0, 2).toUpperCase();

    const nav = shell.querySelector('nav.nav');
    navigation.forEach(item => {
      const link = document.createElement('a');
      link.className = 'nav-item' + (item.active ? ' is-active' : '');
      link.href = item.href || '#';
      link.textContent = item.label;
      nav.appendChild(link);
    });

    const slot = shell.querySelector('#content-slot');
    const main = document.querySelector('.admin-container');
    if (main) slot.appendChild(main);

    const modalOverlays = Array.from(document.querySelectorAll('.modal-overlay'));

    document.body.innerHTML = '';
    document.body.appendChild(shell);
    modalOverlays.forEach(node => document.body.appendChild(node));

    const refreshBtn = document.getElementById('refresh-btn');
    if (onRefresh) refreshBtn?.addEventListener('click', onRefresh);
    else refreshBtn?.remove();

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => { localStorage.clear(); window.location.href = 'index.html'; });

    attachModal();
  }, { once: true });
}
