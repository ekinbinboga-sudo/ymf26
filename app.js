/* ==========================================================
   YMF 2026 — app.js
   Yoğun Madde Fiziği İzmir Toplantısı
   Vanilla JS · No dependencies
   ========================================================== */

/* ──────────────────────────────────────────────────────────
   1. HAMBURGER MENU
   ────────────────────────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ──────────────────────────────────────────────────────────
   2. NAV SCROLL HIGHLIGHT
   Marks the active nav link based on visible section
   ────────────────────────────────────────────────────────── */
(function () {
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navAnchors.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('aktif', a.getAttribute('href') === '#' + id);
        });
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach(sec => observer.observe(sec));
})();


/* ──────────────────────────────────────────────────────────
   3. HERO PARTICLE LATTICE CANVAS
   Navy dots + gold connecting lines on a white background
   ────────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId = null;
  let paused = false;

  const DESKTOP_COUNT = 80;
  const MOBILE_COUNT  = 28;
  const MAX_DIST      = 140;

  function nodeCount() {
    return window.innerWidth < 768 ? MOBILE_COUNT : DESKTOP_COUNT;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initNodes() {
    nodes = [];
    const n = nodeCount();
    for (let i = 0; i < n; i++) {
      nodes.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r:  Math.random() * 1.6 + 0.8,
      });
    }
  }

  function draw() {
    if (paused) return;
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach(a => {
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
    });

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(a => {
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(13,27,46,0.45)';
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  // Pause when tab is hidden (saves CPU)
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused && !animId) draw();
  });

  // ResizeObserver keeps canvas in sync with hero section
  const ro = new ResizeObserver(() => {
    resize();
    initNodes();
  });
  ro.observe(canvas.parentElement);

  resize();
  initNodes();
  draw();
})();


/* ──────────────────────────────────────────────────────────
   4. PHOTO LIGHTBOX
   Click gallery items to view enlarged
   ────────────────────────────────────────────────────────── */
(function () {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');

  if (!lightbox || !lbImg) return;

  function openLightbox(src, alt) {
    // Only open if a real image src exists
    if (!src || src.trim() === '') return;

    lbImg.src = src;
    lbImg.alt = alt || 'Galeri fotoğrafı';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // Attach click handlers to gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      } else {
        // Placeholder — no image yet, do nothing
      }
    });
  });

  // Close button
  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
