// ============================================================
// M.MUDASIR PORTFOLIO — SCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Live wallpaper video: play + fallback ---------- */
  const bgVideo = document.getElementById('bg-video');
  const bgFallback = document.querySelector('.bg-fallback');

  const showFallback = () => {
    bgFallback.classList.add('is-active');
    bgVideo.style.display = 'none';
  };

  const tryPlay = () => {
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(showFallback);
    }
  };

  // If the video source is missing, empty, or fails to load, fall back to
  // the animated gradient background instead of showing a broken video.
  bgVideo.addEventListener('error', showFallback);
  bgVideo.addEventListener('loadeddata', tryPlay);

  // Resume playback when the tab becomes visible again.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlay();
  });

  tryPlay();

  // If nothing has started playing shortly after load, assume the source
  // is unavailable (e.g. assets/live-wallpaper.mp4 not yet added) and
  // switch to the fallback background.
  window.setTimeout(() => {
    if (bgVideo.readyState === 0 || bgVideo.error) showFallback();
  }, 1500);

  /* ---------- Contact form (front-end only placeholder) ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Thanks — this form is a front-end placeholder. Connect it to an email service or backend to receive messages, or use the WhatsApp button for now.';
    form.reset();
  });

});
