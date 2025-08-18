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

function initContactForm(root) {
  const form = root.querySelector('#contact-form');
  const status = root.querySelector('#form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    status.className = 'form-status sending';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        status.textContent = 'Thanks for your inquiry!';
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = 'Sorry, there was a problem sending your inquiry.';
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = 'Sorry, there was a problem sending your inquiry.';
      status.className = 'form-status error';
    }
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
            initContactForm(container);
          }
        })
        .catch((err) => console.error(`Failed to load ${url}:`, err));
    }
  });

  animateStats(document);
  initContactForm(document);
});
