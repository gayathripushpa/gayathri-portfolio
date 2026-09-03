/* ============================================================
   GAYATHRI PORTFOLIO — main.js
   Vanilla JS only, no build step. Organized as small independent
   "modules" (plain functions) that each own one behavior and are
   all wired up from init() at the bottom. Every module checks for
   the elements it needs before doing anything, so this one file
   can safely run on all three pages even though each page only
   has some of the elements.
   ============================================================ */

/* ---------------------------------------------------------
   1. THEME TOGGLE (dark / light)
   Persists the choice in localStorage so it survives page loads.
   The actual color swap is pure CSS: we just flip a
   data-theme="dark" attribute on <html> and the tokens in
   style.css do the rest.
--------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  if (!toggleButtons.length) return;

  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });
}

/* ---------------------------------------------------------
   2. MOBILE NAVIGATION (hamburger)
   Toggles a class on <html> rather than the panel itself, so
   the CSS can react in more than one place (e.g. locking body
   scroll) if needed later.
--------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.querySelector('[data-hamburger]');
  const panel = document.querySelector('[data-mobile-panel]');
  if (!hamburger || !panel) return;

  hamburger.addEventListener('click', () => {
    document.documentElement.classList.toggle('nav-open');
  });

  // Close the panel automatically once a link is tapped.
  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.documentElement.classList.remove('nav-open');
    });
  });
}

/* ---------------------------------------------------------
   3. ACTIVE NAV INDICATOR
   Compares each nav link's page name against the current
   document's filename so the right link gets the underline.
--------------------------------------------------------- */
function initActiveNav() {
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav__links a, .nav__mobile-panel a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const page = href.split('/').pop();
    const isHome = (current === '' || current === 'index.html') && (page === 'index.html' || page === 'about.html');
    if (page === current || isHome) link.classList.add('is-active');
  });
}

/* ---------------------------------------------------------
   4. PAGE TRANSITIONS
   A thin "veil" element (see the HTML) sweeps up from the
   bottom just before we navigate away, then the destination
   page fades/slides in on load via the .page-enter class.
   This is the ONE orchestrated motion moment for navigation —
   deliberately not adding fade-ins to every element.
--------------------------------------------------------- */
function initPageTransitions() {
  document.body.classList.add('page-enter');

  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      const isSamePage = url === location.pathname.split('/').pop();
      if (isSamePage || link.target === '_blank') return;
      e.preventDefault();
      document.documentElement.classList.add('is-leaving');
      setTimeout(() => { window.location.href = url; }, 420);
    });
  });
}

/* ---------------------------------------------------------
   5. SCROLL REVEAL
   Uses IntersectionObserver (no scroll-event polling) to add
   .is-visible the first time an element enters the viewport.
--------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   6. BACK TO TOP BUTTON
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('[data-back-to-top]');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   7. ANIMATED STAT COUNTERS
   Reads the target number from data-count-to and animates the
   textContent up to it once the stat scrolls into view. Uses
   an easing curve so the count decelerates near the end.
--------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-count-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   8. SKILL BARS (Experience page)
   Fills each bar's width from its data-level attribute (0-100)
   once visible — same IntersectionObserver pattern as above.
--------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('[data-level]');
  if (!bars.length) return;

  const fill = (el) => {
    const level = el.getAttribute('data-level');
    const fillEl = el.querySelector('.skill-row__fill');
    if (fillEl) fillEl.style.width = level + '%';
  };

  if (!('IntersectionObserver' in window)) { bars.forEach(fill); return; }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { fill(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });

  bars.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   9. EXPANDABLE PROJECT / CASE-STUDY CARDS
   Each card toggles an .is-open class; height is animated via
   max-height in CSS. Clicking one card does not close others,
   since a person may want to compare two side by side.
--------------------------------------------------------- */
function initExpandableCards(selector) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card) => {
    const trigger = card.querySelector('[data-card-trigger]');
    const body = card.querySelector('[data-card-body]');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.toggle('is-open');
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
    });
  });
}

/* ---------------------------------------------------------
   10. SKILL / PROJECT FILTERING
   Generic filter: buttons carry data-filter="value", cards carry
   data-tags="value1,value2". "all" always shows everything.
--------------------------------------------------------- */
function initFiltering() {
  const bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;
  const buttons = bar.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(',');
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

/* ---------------------------------------------------------
   11. AI LEARNING ROADMAP (clickable node path)
   Only one node's explanation is open at a time, similar to an
   accordion, so the roadmap reads as a single guided path.
--------------------------------------------------------- */
function initRoadmap() {
  const nodes = document.querySelectorAll('[data-roadmap-node]');
  if (!nodes.length) return;

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const alreadyOpen = node.classList.contains('is-active');
      nodes.forEach((n) => n.classList.remove('is-active'));
      if (!alreadyOpen) node.classList.add('is-active');
    });
  });

  // Open the first stage by default so the pattern is discoverable.
  nodes[0].classList.add('is-active');
}

/* ---------------------------------------------------------
   12. AI ENGINEERING KNOWLEDGE CARDS
   Simple independent toggles (unlike the roadmap, several can
   be open at once — these are reference cards, not a sequence).
--------------------------------------------------------- */
function initKnowledgeCards() {
  const cards = document.querySelectorAll('[data-knowledge-card]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-open');
    });
  });
}

/* ---------------------------------------------------------
   13. CONTACT FORM (front-end only — no backend in this build)
   Prevents the default GET submission and shows an inline
   confirmation instead, so the UI is real even without a server.
--------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('[data-form-note]');
    if (note) {
      note.textContent = 'Thanks — this static build has no backend yet, so please use the email link above for now.';
    }
    form.reset();
  });
}

/* ---------------------------------------------------------
   14. DOWNLOAD CV BUTTON
   Points at a placeholder path — swap assets/Gayathri-CV.pdf
   for the real file when it's ready.
--------------------------------------------------------- */
function initDownloadCv() {
  document.querySelectorAll('[data-download-cv]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const path = 'assets/Gayathri-CV.pdf';
      // If the file doesn't exist yet, let the user know instead of
      // silently failing on a broken download.
      fetch(path, { method: 'HEAD' }).then((res) => {
        if (!res.ok) {
          e.preventDefault();
          alert('Add your CV file at assets/Gayathri-CV.pdf to enable this download.');
        }
      }).catch(() => {
        e.preventDefault();
        alert('Add your CV file at assets/Gayathri-CV.pdf to enable this download.');
      });
    });
  });
}

/* ---------------------------------------------------------
   INIT — run every module once the DOM is ready.
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initActiveNav();
  initPageTransitions();
  initScrollReveal();
  initBackToTop();
  initCounters();
  initSkillBars();
  initExpandableCards('[data-project-card]');
  initFiltering();
  initRoadmap();
  initKnowledgeCards();
  initContactForm();
  initDownloadCv();
});
