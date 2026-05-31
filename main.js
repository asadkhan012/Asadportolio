/* Asad Khan — Portfolio interactions */
'use strict';

(function initNav() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navbar = document.getElementById('navbar');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.textContent = open ? '\u2715' : '\u2630';
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileLinks.forEach((l) =>
      l.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.textContent = '\u2630';
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
      })
    );
  }

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  function updateActive() {
    let cur = '';
    sections.forEach((s) => {
      if (window.scrollY + 120 >= s.offsetTop) cur = s.id;
    });
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  function onScroll() {
    if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    updateActive();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });
})();

(function initSectionReveal() {
  const els = document.querySelectorAll('.section-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  els.forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.06 + 's';
    observer.observe(el);
  });
})();

(function initVideo() {
  const modal = document.getElementById('videoModal');
  const vid = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('closeVideo');
  const backdrop = document.getElementById('modalBackdrop');
  if (!modal || !vid) return;

  const triggers = [document.getElementById('openDemoVideo'), document.getElementById('demoThumb')];

  function open() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    vid.currentTime = 0;
    const p = vid.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    vid.pause();
  }

  triggers.forEach((el) => {
    if (!el) return;
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();

console.log(
  '%c Asad Khan — Portfolio ',
  'background:#1e40af;color:#fff;font-family:monospace;font-weight:bold;padding:6px 10px;border-radius:4px;'
);
