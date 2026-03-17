/* ═══════════════════════════════════════════
   NEU — main.js
   Hamburger menu + active nav link
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER ──────────────────────────────
  const btn    = document.getElementById('hamburgerBtn');
  const navEl  = document.getElementById('mainNav');
  const drawer = document.getElementById('mobileDrawer');

  if (btn && navEl && drawer) {
    function openMenu() {
      navEl.classList.add('nav-open');
      btn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      navEl.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    btn.addEventListener('click', () => {
      navEl.classList.contains('nav-open') ? closeMenu() : openMenu();
    });
    drawer.addEventListener('click', (e) => { if (e.target === drawer) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    // close on drawer link click
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // ── ACTIVE NAV LINK ────────────────────────
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });

  // ── FILTER BUTTONS (publicações) ───────────
  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tipo = btn.dataset.filter;
        document.querySelectorAll('.pub-card').forEach(card => {
          card.style.display = (tipo === 'todos' || card.dataset.tipo === tipo) ? '' : 'none';
        });
      });
    });
  }

});
