/* ═══════════════════════════════════════════
   NEU — main.js
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER ──────────────────────────────
  const btn    = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');

  if (btn && drawer) {
    let isOpen = false;

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      isOpen = !isOpen;

      if (isOpen) {
        drawer.style.transform = 'translateX(0)';
        drawer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        btn.querySelector('.hamburger-icon span:nth-child(1)') && btn.classList.add('is-open');
      } else {
        drawer.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        btn.classList.remove('is-open');
      }
    });

    // fechar clicando fora
    document.addEventListener('click', function(e) {
      if (isOpen && !drawer.contains(e.target) && !btn.contains(e.target)) {
        isOpen = false;
        drawer.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        btn.classList.remove('is-open');
      }
    });

    // fechar com Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        drawer.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        btn.classList.remove('is-open');
      }
    });

    // fechar ao clicar em link do drawer
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        isOpen = false;
        drawer.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        btn.classList.remove('is-open');
      });
    });
  }

  // ── FILTER BUTTONS (publicações) ───────────
  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    filters.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const tipo = btn.dataset.filter;
        document.querySelectorAll('.pub-card').forEach(function(card) {
          card.style.display = (tipo === 'todos' || card.dataset.tipo === tipo) ? '' : 'none';
        });
      });
    });
  }

});
