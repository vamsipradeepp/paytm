// Modern Responsive Website Interactions
// - Mobile nav toggle with accessibility attributes
// - Sticky header shadow on scroll
// - Reveal-on-scroll animations using IntersectionObserver
// - Smooth scrolling via CSS and scroll-margin
// - Contact form basic validation with status messaging

(function () {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-navigation');
  const body = document.body;

  // Update CSS var for accurate section scroll offset
  function updateHeaderHeightVar() {
    const height = header ? header.offsetHeight : 72;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }
  updateHeaderHeightVar();
  window.addEventListener('resize', updateHeaderHeightVar, { passive: true });

  // Sticky header visual state
  function updateScrollState() {
    if (window.scrollY > 8) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  }
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  // Mobile menu toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.getAttribute('data-open') === 'true';
      const next = (!isOpen).toString();
      navList.setAttribute('data-open', next);
      navToggle.setAttribute('aria-expanded', next);
      body.classList.toggle('no-scroll', next === 'true');
    });

    // Close menu on link click (mobile)
    navList.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A' && navList.getAttribute('data-open') === 'true') {
        navList.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
      }
    });

    // Close menu with Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.getAttribute('data-open') === 'true') {
        navList.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
        navToggle.focus();
      }
    });
  }

  // Reveal-on-scroll animations
  const revealNodes = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealNodes.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

    revealNodes.forEach((el) => observer.observe(el));
  } else {
    // Fallback: if no IntersectionObserver, show immediately
    revealNodes.forEach((el) => el.classList.add('is-visible'));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form validation
  const form = document.getElementById('contact-form');
  if (form) {
    const nameInput = /** @type {HTMLInputElement|null} */ (document.getElementById('name'));
    const emailInput = /** @type {HTMLInputElement|null} */ (document.getElementById('email'));
    const messageInput = /** @type {HTMLTextAreaElement|null} */ (document.getElementById('message'));

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const statusEl = document.querySelector('.form-status');

    function setFieldError(input, errorEl, message) {
      if (!input || !errorEl) return;
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      errorEl.textContent = message || '';
    }

    function validateEmail(value) {
      // Simple email pattern
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (nameInput) {
        const value = nameInput.value.trim();
        if (value.length < 2) {
          setFieldError(nameInput, nameError, 'Please enter your full name.');
          valid = false;
        } else {
          setFieldError(nameInput, nameError, '');
        }
      }

      if (emailInput) {
        const value = emailInput.value.trim();
        if (!validateEmail(value)) {
          setFieldError(emailInput, emailError, 'Please enter a valid email.');
          valid = false;
        } else {
          setFieldError(emailInput, emailError, '');
        }
      }

      if (messageInput) {
        const value = messageInput.value.trim();
        if (value.length < 10) {
          setFieldError(messageInput, messageError, 'Tell us a bit more (10+ chars).');
          valid = false;
        } else {
          setFieldError(messageInput, messageError, '');
        }
      }

      if (statusEl) {
        statusEl.textContent = valid ? 'Thanks! Your message was sent (demo).' : '';
      }

      if (valid) {
        form.reset();
      }
    });
  }
})();
