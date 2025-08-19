function animateStats(root) {
  const elements = root.querySelectorAll('.stat-number');
  const animateElement = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);

    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  elements.forEach((el) => observer.observe(el));
}

function observeServiceCards(root) {
  const cards = root.querySelectorAll('.service-card, .srv-card');
  if (!cards.length) return;

  if (window.motion && typeof motion.scroll === 'function') {
    const { animate, scroll } = motion;
    cards.forEach((card) => {
      scroll(
        animate(
          card,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.6, easing: 'ease-out' }
        ),
        { target: card, offset: ['start 85%', 'start 55%'] }
      );
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.motion) {
              motion.animate(
                entry.target,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.6, easing: 'ease-out' }
              );
            } else {
              entry.target.classList.add('show');
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  }
}

function initGalleryScroll(root) {
  const gallery = root.querySelector('.gallery');
  const leftBtn = root.querySelector('.gallery-scroll-left');
  const rightBtn = root.querySelector('.gallery-scroll-right');
  if (!gallery || !leftBtn || !rightBtn) return;
  const scrollAmount = gallery.clientWidth * 0.8;
  leftBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

function initServiceRail(root) {
  const rail = root.querySelector('.srv-track');
  if (!rail) return;

  const up = root.querySelector('.srv-arrow.up');
  const down = root.querySelector('.srv-arrow.down');

  function updateArrows() {
    const max = rail.scrollHeight - rail.clientHeight - 1;
    if (up) up.disabled = rail.scrollTop <= 0;
    if (down) down.disabled = rail.scrollTop >= max;
  }
  function scrollByCard(dir = 1) {
    const amount = Math.min(rail.clientHeight * 0.9, 700);
    rail.scrollBy({ top: dir * amount, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  }

  up?.addEventListener('click', () => scrollByCard(-1));
  down?.addEventListener('click', () => scrollByCard(1));
  rail.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // drag-to-scroll
  let isDown = false, startY = 0, startTop = 0;
  rail.addEventListener('pointerdown', (e) => {
    isDown = true; rail.setPointerCapture(e.pointerId);
    startY = e.clientY; startTop = rail.scrollTop;
  });
  rail.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dy = e.clientY - startY;
    rail.scrollTop = startTop - dy;
  });
  rail.addEventListener('pointerup', () => (isDown = false));
  rail.addEventListener('pointercancel', () => (isDown = false));

  // keyboard support (when rail is focused)
  rail.tabIndex = 0;
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); scrollByCard(1); }
    if (e.key === 'ArrowUp')  { e.preventDefault(); scrollByCard(-1); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  if (window.motion) {
    const { animate, stagger } = motion;
    animate('.fade-in', { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, {
      delay: stagger(0.2),
      duration: 0.6
    });
  }

  const sections = {
    about: 'about.html',
    mission: 'mission.html',
    approach: 'approach.html',
    numbers: 'numbers.html',
    services: 'services.html',
    contact: 'contact.html'
  };

  Object.entries(sections).forEach(([id, url]) => {
    const container = document.getElementById(id);
    if (container) {
      fetch(url)
        .then((r) => r.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const main = doc.querySelector('main');
          if (main) {
            container.innerHTML = main.innerHTML;
            animateStats(container);
            observeServiceCards(container);
            initGalleryScroll(container);
            initServiceRail(container);
          }
          })
        .catch((err) => {
          console.error(`Failed to load ${url}:`, err);
          container.innerHTML =
            '<p class="fallback">Section unavailable. Please try again later.</p>';
        });
    }
  });

  const footerContainer = document.querySelector('footer.footer');
  fetch('footer.html')
    .then((r) => r.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const footer = doc.querySelector('footer');
      if (footer && footerContainer) {
        footerContainer.innerHTML = footer.innerHTML;
      }
    })
    .catch((err) => {
      console.error('Failed to load footer:', err);
      if (footerContainer) {
        footerContainer.innerHTML =
          '<p class="fallback">Section unavailable. Please try again later.</p>';
      }
    });

  animateStats(document);
  observeServiceCards(document);
  initGalleryScroll(document);
  initServiceRail(document);

  // Hamburger / overlay navigation
  const body = document.body;
  const closeLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox && lightbox.classList.contains('open')) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      const img = lightbox.querySelector('img');
      if (img) img.src = '';
      body.style.overflow = '';
    }
  };
  const hamburger = document.querySelector('.hamburger');
  const overlayNav = document.querySelector('.overlay-nav');

  if (hamburger && overlayNav) {
    // hide overlay links by default
    overlayNav.classList.remove('open');
    overlayNav.setAttribute('aria-hidden', 'true');

    let lastFocusedElement = null;

    const closeMenu = () => {
      overlayNav.classList.remove('open');
      body.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      overlayNav.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    const openMenu = () => {
      overlayNav.classList.add('open');
      body.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlayNav.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
      lastFocusedElement = document.activeElement;
      const focusable = overlayNav.querySelectorAll('a');
      if (focusable.length) focusable[0].focus();
    };

    hamburger.addEventListener('click', () => {
      if (overlayNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlayNav.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        closeMenu();
      }
    });

    overlayNav.addEventListener('keydown', (e) => {
      if (!overlayNav.classList.contains('open') || e.key !== 'Tab') return;
      const focusable = overlayNav.querySelectorAll('a');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        closeLightbox();
      }
    });
  }

  if (window.Typed && document.querySelector('.tagline')) {
    new Typed('.tagline', {
      strings: [
        "Professional Photography",
        "Videography Services",
        "Media Production & Editing"
      ],
      startDelay: 300,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      smartBackspace: true,
      fadeOut: true,
      loop: true,
      showCursor: true
    });
  }

  // Lightbox gallery
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  if (lightbox && lightboxImg) {
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.gallery img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
      }
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('close-btn')) {
        closeLightbox();
      }
    });
  }

  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
