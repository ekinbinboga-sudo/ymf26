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

/* Photo Gallery Lightbox */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});
document.getElementById('lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
});
