document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  if (link.classList.contains('nav-dropdown-toggle')) return;
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();
      toggle.closest('.nav-dropdown').classList.toggle('open');
    } else {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.querySelectorAll('.nav-dropdown-menu a').forEach((link) => {
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
wireFormspreeForm('ceramic-quote-form', 'ceramic-quote-form-note');

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.gallery-photo img, .before-after-pair img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
