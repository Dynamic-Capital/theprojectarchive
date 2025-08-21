// Promo code validation
const activePromos = {
  NEWMEMBER20: { type: 'percent', value: 20 },
  VIP50: { type: 'amount', value: 50 },
  VIPBOTLAUNCH50: { type: 'percent', value: 50 }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('promo-form');
  if (!form) return;

  const select = document.getElementById('promo-select');
  const message = document.getElementById('promo-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = select.value.trim().toUpperCase();
    const promo = activePromos[code];
    if (promo) {
      const detail = promo.type === 'percent' ? `${promo.value}% off` : `$${promo.value} off`;
      message.textContent = `Promo applied: ${detail}`;
      message.classList.remove('error');
    } else {
      message.textContent = 'Invalid or expired promo code.';
      message.classList.add('error');
    }
  });
});
