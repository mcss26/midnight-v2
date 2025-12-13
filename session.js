// Midnight ERP - sesión mínima (modo demo)
// - Guarda usuario en localStorage ("mc_user").
// - En index.html: si no hay sesión, crea una sesión DEV automática.
// - En otras páginas: si no hay sesión, redirige a index.html.
// Nota: esto NO es login real. Es para que el flujo funcione hoy.

(function () {
  'use strict';

  const STORAGE_KEY = 'mc_user';

  function safeJsonParse(value) {
    try { return JSON.parse(value); } catch (_) { return null; }
  }

  function getUser() {
    return safeJsonParse(localStorage.getItem(STORAGE_KEY));
  }

  function setUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function clearUser() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function isSamePageAs(redirectHome) {
    const path = (window.location.pathname || '').toLowerCase();
    const file = path.split('/').pop() || '';
    const target = (redirectHome || 'index.html').toLowerCase();

    // Casos comunes:
    // - /index.html
    // - / (cuando servís el folder y el server devuelve index.html)
    // - /midnight-v2/ (similar)
    if (file === '' && target === 'index.html') return true;
    if (file === target) return true;
    return false;
  }

  function updateSessionChip(user) {
    const chip = document.querySelector('[data-session-chip]');
    if (!chip) return;

    if (!user) {
      chip.textContent = 'Sesión no vinculada';
      return;
    }

    const name = user.full_name || user.username || 'Usuario';
    const role = user.role ? ` (${user.role})` : '';
    chip.textContent = `${name}${role}`;
  }

  function wireLogoutButton(redirectHome) {
    const btn = document.querySelector('[data-logout-button]');
    if (!btn) return;

    if (btn.dataset && btn.dataset.bound === '1') return;
    if (btn.dataset) btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      clearUser();
      window.location.href = redirectHome || 'index.html';
    });
  }

  function ensure(options) {
    const opts = options || {};
    const redirectHome = opts.redirectHome || 'index.html';

    let user = getUser();
    const onHome = isSamePageAs(redirectHome);

    if (!user) {
      if (onHome) {
        // Sesión demo automática para que el portal y los flujos funcionen.
        user = { id: 'dev', username: 'DEV', full_name: 'Modo Desarrollador', role: 'superadmin' };
        setUser(user);
      } else {
        window.location.href = redirectHome;
        return;
      }
    }

    // Si alguna página quiere restringir por rol, puede pasar requiredRoles: ['admin', ...]
    if (Array.isArray(opts.requiredRoles) && opts.requiredRoles.length) {
      const role = (user && user.role) ? String(user.role) : '';
      if (!opts.requiredRoles.includes(role)) {
        window.location.href = redirectHome;
        return;
      }
    }

    updateSessionChip(user);
    wireLogoutButton(redirectHome);
  }

  window.MC_SESSION = {
    ensure,
    getUser,
    setUser,
    clear: clearUser
  };
})();