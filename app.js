/* Theme Toggle (Dark/Light) */
(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
})();

/* Accordion */
(function () {
  function initAccordion(toggleSel, bodySel) {
    document.querySelectorAll(toggleSel).forEach(btn => {
      btn.addEventListener('click', () => {
        const body = document.getElementById(btn.getAttribute('aria-controls'));
        if (!body) return;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        const chevron = btn.querySelector('.accord-chevron');
        if (!isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          if (chevron) chevron.style.transform = 'rotate(-135deg)';
        } else {
          body.style.maxHeight = '0';
          if (chevron) chevron.style.transform = 'rotate(45deg)';
        }
      });
    });
  }
  initAccordion('.kurul-toggle', '.kurul-body');
  initAccordion('.accord-toggle', '.accord-body');
})();

/* Mobile Sidebar */
(function () {
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');
  const closeBtn  = document.getElementById('sidebar-close');
  if (!hamburger || !sidebar) return;

  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSidebar));
})();

/* Smart Hide Navbar on Scroll (Mobile) */
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 0) {
      nav.classList.remove('nav-hidden');
    } else if (currentScroll > lastScroll && currentScroll > 80) {
      nav.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll) {
      nav.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  window.addEventListener('resize', updateNav);
})();

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
  const track  = document.getElementById('hero-track');
  const dotsEl = document.getElementById('slider-dots');
  if (!track || !dotsEl) return;
  const slides = track.querySelectorAll('.slide');
  const total  = slides.length;
  if (total < 2) return;
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slayt ${i + 1}`);
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    current = ((n % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
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


/* ── Hero Particle Canvas (mouse-interactive) ─────────────
   Grafen / yoğun madde fiziği esintili parçacık alanı.
   Canvas #hero-canvas üzerine çalışır; fotoğraf slider'ının
   üstünde hafif bir atmosferik katman oluşturur.
   ──────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const GOLD_RGB  = '244,121,32';
  const WHITE_RGB = '255,255,255';

  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth  = hero.clientWidth;
    H = canvas.clientHeight = hero.clientHeight;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initParticles();
  }

  const particles = [];
  function initParticles() {
    particles.length = 0;
    const n = Math.floor((W * H) / 7000); // yoğun
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.7 + Math.random() * 1.6,
      });
    }
  }

  const mouse = { x: -9999, y: -9999, active: false };
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.active = true;
  });
  hero.addEventListener('mouseleave', () => {
    mouse.active = false; mouse.x = -9999; mouse.y = -9999;
  });
  hero.addEventListener('touchmove', (e) => {
    const r = hero.getBoundingClientRect();
    const tc = e.touches[0];
    if (!tc) return;
    mouse.x = tc.clientX - r.left;
    mouse.y = tc.clientY - r.top;
    mouse.active = true;
  }, { passive: true });
  hero.addEventListener('touchend', () => {
    mouse.active = false; mouse.x = -9999; mouse.y = -9999;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const INF_R  = 150;
    const INF_R2 = INF_R * INF_R;

    for (const p of particles) {
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < INF_R2 && d2 > 0.1) {
          const d = Math.sqrt(d2);
          const force = (1 - d / INF_R) * 0.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
      }
      p.vx *= 0.96; p.vy *= 0.96;
      p.vx += (Math.random() - 0.5) * 0.04;
      p.vy += (Math.random() - 0.5) * 0.04;
      const sp = Math.hypot(p.vx, p.vy);
      const maxSp = 3.2;
      if (sp > maxSp) { p.vx = p.vx / sp * maxSp; p.vy = p.vy / sp * maxSp; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
    }

    // Bağlantı çizgileri
    const maxD = 110, maxD2 = maxD * maxD;
    ctx.lineWidth = 0.9;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxD2) {
          const alpha = (1 - Math.sqrt(d2) / maxD) * 0.38;
          ctx.strokeStyle = `rgba(${GOLD_RGB},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Mouse halo
    if (mouse.active) {
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, INF_R);
      grd.addColorStop(0, `rgba(${GOLD_RGB},0.18)`);
      grd.addColorStop(1, `rgba(${GOLD_RGB},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, INF_R, 0, Math.PI * 2);
      ctx.fill();
    }

    // Parçacık noktaları
    for (const p of particles) {
      let boost = 0;
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < INF_R2) boost = (1 - Math.sqrt(d2) / INF_R) * 0.4;
      }
      ctx.fillStyle = `rgba(${WHITE_RGB},${0.7 + boost})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + boost * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  setTimeout(resize, 50);
  requestAnimationFrame(draw);

  // Performans: sekme gizliyken durdur (basit)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestAnimationFrame(draw);
  });
})();
