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

// LIVE GOOGLE REVIEWS
const GOOGLE_PLACES_API_KEY = 'AIzaSyCN0Oxrr3v944sizT4FAKnVd6WlJKFWnQg';
const GOOGLE_PLACE_ID = 'ChIJixjHr3f1DUsR0FETqQSz3Js';
const GOOGLE_REVIEWS_CACHE_KEY = 'gp_google_reviews_cache_v1';
const GOOGLE_REVIEWS_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

function updateGoogleReviewsUI(rating, reviewCount) {
  const scoreText = rating.toFixed(1);
  const roundedStars = Math.round(rating);
  const starsText = '★'.repeat(roundedStars) + '☆'.repeat(5 - roundedStars);

  document.querySelectorAll('.google-rating-score').forEach((el) => {
    el.textContent = scoreText;
  });
  document.querySelectorAll('.google-rating-stars').forEach((el) => {
    el.textContent = starsText;
  });
  document.querySelectorAll('.google-rating-count').forEach((el) => {
    if (el.childNodes[0]) el.childNodes[0].textContent = `${reviewCount} `;
  });
  document.querySelectorAll('.reviews-summary-stars').forEach((el) => {
    el.textContent = starsText;
  });
  document.querySelectorAll('.reviews-summary-score').forEach((el) => {
    el.textContent = scoreText;
  });
  document.querySelectorAll('.reviews-summary-based').forEach((el) => {
    el.textContent = `Based on ${reviewCount} reviews`;
  });
}

function loadGoogleReviews() {
  const hasReviewsUI = document.querySelector(
    '.google-rating-badge, .reviews-summary-stars, .reviews-summary-score, .reviews-summary-based'
  );
  if (!hasReviewsUI) return;

  try {
    const cacheRaw = sessionStorage.getItem(GOOGLE_REVIEWS_CACHE_KEY);
    if (cacheRaw) {
      const cached = JSON.parse(cacheRaw);
      if (Date.now() - cached.ts < GOOGLE_REVIEWS_CACHE_TTL) {
        updateGoogleReviewsUI(cached.rating, cached.count);
        return;
      }
    }
  } catch (e) {
    // ignore corrupt cache
  }

  window.initGoogleReviews = function () {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      { placeId: GOOGLE_PLACE_ID, fields: ['rating', 'user_ratings_total'] },
      (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !place) return;
        const rating = place.rating;
        const count = place.user_ratings_total;
        updateGoogleReviewsUI(rating, count);
        try {
          sessionStorage.setItem(
            GOOGLE_REVIEWS_CACHE_KEY,
            JSON.stringify({ rating, count, ts: Date.now() })
          );
        } catch (e) {
          // ignore storage errors
        }
      }
    );
  };

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places&callback=initGoogleReviews`;
  script.async = true;
  document.head.appendChild(script);
}

loadGoogleReviews();
