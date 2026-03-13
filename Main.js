/* =============================================
   NERIA SOLUTIONS — main.js v3
   ============================================= */

// ── THEME (runs immediately, before DOM) ─────
(function () {
  var saved = localStorage.getItem('neria-theme');
  var theme = saved ? saved : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {

  // ── THEME TOGGLE ─────────────────────────────
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = (current === 'dark') ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('neria-theme', next);
    });
  });

  // ── NAV SCROLL ───────────────────────────────
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── MOBILE MENU ──────────────────────────────
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── FILTER BUTTONS ───────────────────────────
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // ── SCROLL FADE-IN ───────────────────────────
  var targets = document.querySelectorAll(
    '.service-card,.project-item,.team-card,.project-full-card,.service-full-card,.value-item,.stat,.contact-item'
  );
  targets.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.55s ease ' + (i * 0.05) + 's, transform 0.55s ease ' + (i * 0.05) + 's';
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { obs.observe(el); });
  } else {
    targets.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

});
