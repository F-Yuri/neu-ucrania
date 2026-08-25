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

  // ── NAV DROPDOWN (desktop — Produções ▾) ────
  const navDds = document.querySelectorAll('.nav-dd');
  if (navDds.length) {
    navDds.forEach(function(dd) {
      const trigger = dd.querySelector('.nav-dd-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        const willOpen = !dd.classList.contains('open');
        navDds.forEach(function(other) {
          other.classList.remove('open');
          const t = other.querySelector('.nav-dd-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          dd.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', function() {
      navDds.forEach(function(dd) {
        dd.classList.remove('open');
        const t = dd.querySelector('.nav-dd-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        navDds.forEach(function(dd) {
          dd.classList.remove('open');
          const t = dd.querySelector('.nav-dd-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // ── NAV DROPDOWN (mobile drawer — Produções) ─
  document.querySelectorAll('.mobile-drawer-group-trigger').forEach(function(trigger) {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = panel.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // ── FILTER BUTTONS (publicações) ───────────
  // agrupamento de exibição: "mídia" reúne tipo=midia e tipo=entrevista.
  // não cria valor novo de `tipo` no CMS — é só filtro/exibição.
  const FILTER_GROUPS = { midia: ['midia', 'entrevista'] };
  function tipoMatchesFilter(tipo, filtro) {
    if (filtro === 'todos') return true;
    if (FILTER_GROUPS[filtro]) return FILTER_GROUPS[filtro].indexOf(tipo) !== -1;
    return tipo === filtro;
  }

  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    function applyFilter(filtro) {
      filters.forEach(function(b) {
        const active = b.dataset.filter === filtro;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      document.querySelectorAll('.pub-card').forEach(function(card) {
        card.style.display = tipoMatchesFilter(card.dataset.tipo, filtro) ? '' : 'none';
      });
    }

    filters.forEach(function(btn) {
      btn.addEventListener('click', function() {
        applyFilter(btn.dataset.filter);
      });
    });

    // filtro via query string (?tipo=midia), usado pelo link "Na Mídia" do menu
    const params = new URLSearchParams(window.location.search);
    const tipoParam = params.get('tipo');
    if (tipoParam && document.querySelector('.filter-btn[data-filter="' + tipoParam + '"]')) {
      applyFilter(tipoParam);
    }
  }

});
