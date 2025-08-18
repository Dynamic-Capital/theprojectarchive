function animateStats(root) {
  const elements = root.querySelectorAll('.stat-number');
  elements.forEach((el) => {
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
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

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
          }
        })
        .catch((err) => console.error(`Failed to load ${url}:`, err));
    }
  });

  fetch('footer.html')
    .then((r) => r.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const footer = doc.querySelector('footer');
      const container = document.querySelector('footer.footer');
      if (footer && container) {
        container.innerHTML = footer.innerHTML;
      }
    })
    .catch((err) => console.error('Failed to load footer:', err));

  animateStats(document);

  // Hamburger / overlay navigation
  const body = document.body;
  const hamburger = document.querySelector('.hamburger');
  const overlayNav = document.querySelector('.overlay-nav');
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });

  // Typed tagline
  const tgt = document.getElementById('typed-tagline');
  if (tgt && window.Typed) {
    new Typed('#typed-tagline', {
      strings: ['Photographer', 'Storyteller', 'Creative Director'],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
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
});
