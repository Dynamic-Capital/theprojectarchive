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

function initChatBot() {
  if (document.getElementById('chat-widget')) return;

  const widget = document.createElement('div');
  widget.id = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-header">Chat</div>
    <div class="chat-box">
      <div class="chat-messages"></div>
      <input type="text" class="chat-input" placeholder="Type a message..." />
    </div>
  `;
  document.body.appendChild(widget);

  const header = widget.querySelector('.chat-header');
  const box = widget.querySelector('.chat-box');
  const input = widget.querySelector('.chat-input');
  const messages = widget.querySelector('.chat-messages');

  header.addEventListener('click', () => {
    box.classList.toggle('open');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const user = document.createElement('div');
      user.textContent = input.value;
      user.className = 'user-msg';
      messages.appendChild(user);

      const bot = document.createElement('div');
      bot.textContent = 'Thanks for reaching out!';
      bot.className = 'bot-msg';
      messages.appendChild(bot);

      input.value = '';
      messages.scrollTop = messages.scrollHeight;
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
          }
        })
        .catch((err) => console.error(`Failed to load ${url}:`, err));
    }
  });

  animateStats(document);
  initChatBot();
});
