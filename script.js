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

  animateStats(document);
});
