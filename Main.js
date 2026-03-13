/* =============================================
   NERIA SOLUTIONS — main.js
   Theme toggle, nav, mobile menu, animations
   ============================================= */

// ── THEME ──────────────────────────────────────
const THEME_KEY = 'neria-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Run immediately to avoid flash
initTheme();

document.addEventListener('DOMContentLoaded', () => {

  // ── THEME TOGGLE BUTTON ──────────────────────
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // ── NAV SCROLL ──────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── MOBILE MENU ──────────────────────────────
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  toggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

  // ── FILTER BUTTONS (projects page) ───────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── SCROLL-TRIGGERED FADE-IN ─────────────────
  const targets = document.querySelectorAll(
    '.service-card, .project-item, .team-card, .project-full-card, .service-full-card, .value-item, .stat, .contact-item'
  );
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => observer.observe(el));

});
