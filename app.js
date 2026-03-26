/* Hamburger Menu */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.getElementById('nav-links').querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

/* Nav Scroll Highlight */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('aktif', a.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-50% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

/* Lightbox */
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* Hero Slider */
(function () {
  const hero   = document.getElementById('hero');
  if (!hero) return;
  const slides  = hero.querySelectorAll('.slide');
  const dotsEl  = document.getElementById('slider-dots');
  const total   = slides.length;
  if (total < 2) return;
  let current = 0;
  let timer;

  /* Build dots */
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slayt ${i + 1}`);
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === n)
    );
    current = (n + total) % total;
    slides[current].classList.add('active');
  }

  document.getElementById('slider-prev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  document.getElementById('slider-next')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  function startTimer() { timer = setInterval(() => goTo(current + 1), 5000); }
  function resetTimer()  { clearInterval(timer); startTimer(); }

  startTimer();
  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearInterval(timer) : startTimer();
  });
})();

/* Photo Carousel */
(function () {
  const track   = document.getElementById('photo-track');
  const dotsEl  = document.getElementById('photo-dots');
  if (!track) return;

  const slides  = track.querySelectorAll('.photo-slide');
  const total   = slides.length;
  let current   = 0;
  let timer;

  /* Build dots */
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'photo-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Fotoğraf ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.photo-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function next() { goTo(current + 1); }

  /* Click on slide → open lightbox */
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const img = slide.querySelector('img');
      if (img) {
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  /* Arrow buttons */
  document.getElementById('photo-prev')?.addEventListener('click', (e) => {
    e.stopPropagation(); goTo(current - 1); resetTimer();
  });
  document.getElementById('photo-next')?.addEventListener('click', (e) => {
    e.stopPropagation(); goTo(current + 1); resetTimer();
  });

  function startTimer() { timer = setInterval(next, 4000); }
  function resetTimer()  { clearInterval(timer); startTimer(); }

  startTimer();
  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearInterval(timer) : startTimer();
  });
})();
