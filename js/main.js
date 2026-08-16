document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('booking-form');

if (form) {
  const formNote = document.getElementById('form-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const subject = encodeURIComponent(`Booking request: ${data.get('service') || 'Detail'}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\n` +
      `Phone: ${data.get('phone')}\n` +
      `Email: ${data.get('email')}\n` +
      `Vehicle: ${data.get('vehicle')}\n` +
      `Service: ${data.get('service')}\n\n` +
      `Message:\n${data.get('message')}`
    );

    window.location.href = `mailto:goldenpeanutsdetail@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email app to send this request…';
  });
}

const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  const quoteFormNote = document.getElementById('quote-form-note');

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(quoteForm);
    const subject = encodeURIComponent('Free quote request');
    const body = encodeURIComponent(
      `Name: ${data.get('first_name')} ${data.get('last_name')}\n` +
      `Email: ${data.get('email')}\n` +
      `Phone: ${data.get('phone')}\n` +
      `How they found us: ${data.get('source')}`
    );

    window.location.href = `mailto:goldenpeanutsdetail@gmail.com?subject=${subject}&body=${body}`;
    quoteFormNote.textContent = 'Opening your email app to send this request…';
  });
}
