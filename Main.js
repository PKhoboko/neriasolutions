/* =============================================
   NERIA SOLUTIONS — main.js
   ============================================= */

const THEME_KEY = 'neria-theme';

// Apply theme to <html> element
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

// Set theme on page load before anything renders
(function () {
  var saved = localStorage.getItem('neria-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // ── THEME TOGGLE ─────────────────────────────
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  // ── NAV SCROLL ───────────────────────────────
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── MOBILE MENU ──────────────────────────────
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
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
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // ── SCROLL FADE-IN ───────────────────────────
  var targets = document.querySelectorAll(
    '.service-card, .project-item, .team-card, .project-full-card, ' +
    '.service-full-card, .value-item, .stat, .contact-item'
  );
  targets.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.55s ease ' + (i * 0.05) + 's, transform 0.55s ease ' + (i * 0.05) + 's';
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(function (el) { observer.observe(el); });

});
