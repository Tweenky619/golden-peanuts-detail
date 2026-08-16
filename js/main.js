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

function wireFormspreeForm(formId, noteId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const note = document.getElementById(noteId);
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.textContent = 'Sending…';
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        note.textContent = "Thanks! We've got your request and will be in touch shortly.";
        form.reset();
      } else {
        note.textContent = 'Something went wrong. Please call or text us at (619) 438-5149 instead.';
      }
    } catch (err) {
      note.textContent = 'Something went wrong. Please call or text us at (619) 438-5149 instead.';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

wireFormspreeForm('booking-form', 'form-note');
wireFormspreeForm('quote-form', 'quote-form-note');
