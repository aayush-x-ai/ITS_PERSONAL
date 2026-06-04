/* =============================================
   PROPOSAL WEBSITE — script.js
   For: Mansi 💛
   All animations, birds, fireflies, parallax
   ============================================= */

// ===== WAIT FOR DOM =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. LOADING SCREEN =====
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    startHeroAnimations();
  }, 2800);

  // ===== 2. INIT AOS =====
  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: false,
    offset: 80,
  });

  // ===== 3. TYPEWRITER EFFECT =====
  const typewriterEl = document.getElementById('typewriterText');
  const typewriterText = '"I never believed that a single moment could change everything..."';
  let charIndex = 0;

  function typeChar() {
    if (!typewriterEl) return;
    if (charIndex < typewriterText.length) {
      typewriterEl.textContent += typewriterText[charIndex];
      charIndex++;
      setTimeout(typeChar, 55);
    }
  }

  // Start typewriter after loader
  setTimeout(typeChar, 3000);

  // ===== 4. CREATE BIRDS =====
  function createBirds() {
    const container = document.getElementById('birdsContainer');
    if (!container) return;
    const birdEmojis = ['🐦', '🦅', '🦜', '🕊️'];
    const count = window.innerWidth < 600 ? 6 : 12;

    for (let i = 0; i < count; i++) {
      const bird = document.createElement('div');
      bird.classList.add('bird');

      const startTop = Math.random() * 55 + 5; // 5% to 60% from top
      const startLeft = Math.random() * 20 - 25; // start off-screen left
      const dx = `${Math.random() * 900 + 700}px`;
      const dy = `${(Math.random() - 0.5) * 120}px`;
      const duration = Math.random() * 12 + 10; // 10-22s
      const delay = Math.random() * 15; // 0-15s delay

      bird.style.cssText = `
        top: ${startTop}%;
        left: ${startLeft}px;
        --dx: ${dx};
        --dy: ${dy};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        font-size: ${Math.random() * 0.6 + 0.7}rem;
      `;
      bird.textContent = birdEmojis[Math.floor(Math.random() * birdEmojis.length)];
      container.appendChild(bird);
    }
  }
  createBirds();

  // ===== 5. MOUNTAIN PARALLAX ON MOUSE MOVE =====
  const mountainScene = document.getElementById('mountainScene');
  const layerFar  = document.querySelector('.layer-far');
  const layerMid  = document.querySelector('.layer-mid');
  const layerNear = document.querySelector('.layer-near');

  document.addEventListener('mousemove', (e) => {
    if (!mountainScene) return;
    const xPercent = (e.clientX / window.innerWidth - 0.5);
    const yPercent = (e.clientY / window.innerHeight - 0.5);

    if (layerFar)  layerFar.style.transform  = `translateX(${xPercent * -18}px) translateY(${yPercent * -8}px)`;
    if (layerMid)  layerMid.style.transform  = `translateX(${xPercent * -10}px) translateY(${yPercent * -5}px)`;
    if (layerNear) layerNear.style.transform = `translateX(${xPercent * -4}px)  translateY(${yPercent * -2}px)`;
  });

  // Touch parallax for mobile
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const xPercent = (touch.clientX / window.innerWidth - 0.5);
    if (layerFar)  layerFar.style.transform  = `translateX(${xPercent * -15}px)`;
    if (layerMid)  layerMid.style.transform  = `translateX(${xPercent * -8}px)`;
    if (layerNear) layerNear.style.transform = `translateX(${xPercent * -3}px)`;
  });

  // ===== 6. HERO CANVAS — Depth Particles =====
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Floating dust motes / bokeh
    const motes = [];
    const moteCount = window.innerWidth < 600 ? 40 : 80;

    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        alpha: Math.random() * 0.4 + 0.05,
        color: Math.random() > 0.5 ? 'rgba(255,220,100,' : 'rgba(200,255,200,'
      });
    }

    function drawMotes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      motes.forEach(m => {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = m.color + m.alpha + ')';
        ctx.fill();

        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -10) { m.y = canvas.height + 10; m.x = Math.random() * canvas.width; }
        if (m.x < -10) m.x = canvas.width + 10;
        if (m.x > canvas.width + 10) m.x = -10;
      });
      requestAnimationFrame(drawMotes);
    }
    drawMotes();
  }
  initHeroCanvas();

  // ===== 7. FLOATING PARTICLES (Story Page) =====
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 600 ? 20 : 45;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const top  = Math.random() * 100;
      const px   = `${(Math.random() - 0.5) * 200}px`;
      const py   = `${-(Math.random() * 300 + 100)}px`;
      const dur  = Math.random() * 12 + 8;
      const del  = Math.random() * 10;

      const colors = ['#FFD700', '#90EE90', '#98FB98', '#FFF8DC', '#ADFF2F'];
      const color  = colors[Math.floor(Math.random() * colors.length)];

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: ${top}%;
        background: ${color};
        --px: ${px};
        --py: ${py};
        animation-duration: ${dur}s;
        animation-delay: ${del}s;
        opacity: 0;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  // ===== 8. FIREFLIES (Confession Page) =====
  function createFireflies() {
    const container = document.getElementById('fireflies');
    if (!container) return;
    const count = window.innerWidth < 600 ? 18 : 35;

    for (let i = 0; i < count; i++) {
      const ff = document.createElement('div');
      ff.classList.add('firefly');

      const left = Math.random() * 100;
      const top  = Math.random() * 100;
      const ffx  = `${(Math.random() - 0.5) * 150}px`;
      const ffy  = `${(Math.random() - 0.5) * 150}px`;
      const dur  = Math.random() * 6 + 4;
      const del  = Math.random() * 8;

      const colors = ['#FFD700', '#FFA500', '#FFFF99', '#90EE90'];
      const color  = colors[Math.floor(Math.random() * colors.length)];

      ff.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        --ffx: ${ffx};
        --ffy: ${ffy};
        background: ${color};
        box-shadow: 0 0 8px 4px ${color}88;
        animation-duration: ${dur}s;
        animation-delay: ${del}s;
        width: ${Math.random() * 4 + 3}px;
        height: ${Math.random() * 4 + 3}px;
      `;
      container.appendChild(ff);
    }
  }
  createFireflies();

  // ===== 9. PAGE NAVIGATION =====
  window.goToPage = function(pageNum) {
    const target = document.getElementById(`page${pageNum}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ===== 10. BUS ANIMATION LOOP =====
  // Bus CSS animation is infinite via keyframes — nothing extra needed.

  // ===== 11. WALKER ANIMATION =====
  // Walker CSS animation is infinite via keyframes — nothing extra needed.

  // ===== 12. THANK YOU BUTTON — FLOWER BLOOM =====
  const thankYouBtn = document.getElementById('thankYouBtn');
  const flowerBloom = document.getElementById('flowerBloom');

  if (thankYouBtn && flowerBloom) {
    thankYouBtn.addEventListener('click', () => {
      flowerBloom.classList.add('active');
      launchFlowers();

      // Close on click
      flowerBloom.addEventListener('click', () => {
        flowerBloom.classList.remove('active');
        // Clear flowers
        document.querySelectorAll('.bloom-flower').forEach(f => f.remove());
      }, { once: true });
    });
  }

  function launchFlowers() {
    const bloomEl = document.getElementById('flowerBloom');
    if (!bloomEl) return;
    const flowers = ['🌸','🌺','🌼','🌻','💐','🌹','🌷','🍀','🌿','✿','❀'];
    const count = window.innerWidth < 600 ? 20 : 40;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const f = document.createElement('div');
        f.classList.add('bloom-flower');

        const left = Math.random() * 100;
        const fx   = `${(Math.random() - 0.5) * 300}px`;
        const fr   = `${(Math.random() - 0.5) * 720}deg`;
        const dur  = Math.random() * 4 + 3;
        const size = Math.random() * 1.5 + 1;

        f.style.cssText = `
          left: ${left}%;
          bottom: -10px;
          font-size: ${size}rem;
          --fx: ${fx};
          --fr: ${fr};
          animation-duration: ${dur}s;
          animation-delay: 0s;
        `;
        f.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        bloomEl.appendChild(f);

        // Remove after animation
        setTimeout(() => f.remove(), dur * 1000 + 500);
      }, i * 120);
    }
  }

  // ===== 13. START HERO ANIMATIONS =====
  function startHeroAnimations() {
    // Animate hero content in
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';
      heroContent.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  // ===== 14. SCROLL-BASED PARALLAX =====
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Hero parallax: mountains move up as user scrolls
    if (layerFar)  layerFar.style.transform  = `translateY(${scrollY * 0.15}px)`;
    if (layerMid)  layerMid.style.transform  = `translateY(${scrollY * 0.08}px)`;
    if (layerNear) layerNear.style.transform = `translateY(${scrollY * 0.04}px)`;

    // Fade hero content as user scrolls
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      heroContent.style.opacity = opacity;
    }
  });

  // ===== 15. SMOOTH SCROLL TO STORY on Begin Button =====
  const beginBtn = document.getElementById('beginBtn');
  if (beginBtn) {
    beginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const page2 = document.getElementById('page2');
      if (page2) page2.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== 16. INTERSECTION OBSERVER — trigger confession animations =====
  const confessionLines = document.querySelectorAll('.conf-line');
  const confObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.3 });

  confessionLines.forEach(line => {
    line.style.animationPlayState = 'paused';
    confObserver.observe(line);
  });

  // ===== 17. NATURE CARDS — 3D TILT EFFECT =====
  const cards = document.querySelectorAll('.nature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width  - 0.5) * 20;
      const yPercent = (y / rect.height - 0.5) * 20;
      card.style.transform = `perspective(600px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  // ===== 18. GLASS STORY CARDS — subtle 3D tilt =====
  const storyCards = document.querySelectorAll('.glass-story');
  storyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xP = (x / rect.width  - 0.5) * 8;
      const yP = (y / rect.height - 0.5) * 8;
      card.style.transform = `perspective(1000px) rotateY(${xP}deg) rotateX(${-yP}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // ===== 19. WINDOW RESIZE — recreate birds =====
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const birdsContainer = document.getElementById('birdsContainer');
      if (birdsContainer) {
        birdsContainer.innerHTML = '';
        createBirds();
      }
    }, 400);
  });

  // ===== 20. MOBILE: Disable heavy parallax on small screens =====
  if (window.innerWidth < 600) {
    document.removeEventListener('mousemove', () => {});
  }

  // ===== 21. SCROLL PROGRESS INDICATOR =====
  const scrollIndicator = document.createElement('div');
  scrollIndicator.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4a8b4a, #FFD700, #FF8C00);
    z-index: 9998;
    width: 0%;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(scrollIndicator);

  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress    = (window.scrollY / totalHeight) * 100;
    scrollIndicator.style.width = `${progress}%`;
  });

  // ===== 22. CUSTOM CURSOR (Desktop only) =====
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 18px; height: 18px;
      border: 2px solid rgba(255,215,0,0.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transition: transform 0.15s ease, opacity 0.3s ease;
      top: 0; left: 0;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
      position: fixed;
      width: 5px; height: 5px;
      background: #FFD700;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      top: 0; left: 0;
      transition: transform 0.08s ease;
    `;
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform    = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`;
      cursorDot.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
    });

    document.querySelectorAll('button, a, .nature-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(1.6)'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = cursor.style.transform.replace(' scale(1.6)', ''); });
    });
  }

  // ===== 23. BUS SCENE — recreate on scroll into view =====
  const busObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const bus = entry.target.querySelector('.bus');
      if (bus) {
        if (entry.isIntersecting) {
          bus.style.animationPlayState = 'running';
        } else {
          bus.style.animationPlayState = 'paused';
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.bus-scene').forEach(el => busObserver.observe(el));

  // ===== 24. FOOTSTEP ANIMATION RESTART on scroll =====
  const footstepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll('.footstep');
        steps.forEach(s => {
          s.style.animation = 'none';
          void s.offsetHeight; // reflow
          s.style.animation = '';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.forest-trail-scene').forEach(el => footstepObserver.observe(el));

  // ===== 25. SUNSET page — extra parallax birds =====
  function createSunsetBirds() {
    const confPage = document.getElementById('page3');
    if (!confPage) return;

    const birdDiv = document.createElement('div');
    birdDiv.style.cssText = 'position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;';
    confPage.appendChild(birdDiv);

    const count = window.innerWidth < 600 ? 4 : 8;
    for (let i = 0; i < count; i++) {
      const bird = document.createElement('div');
      bird.classList.add('bird');
      const startTop = Math.random() * 35 + 5;
      const dx = `${Math.random() * 700 + 500}px`;
      const dy = `${(Math.random() - 0.5) * 80}px`;
      const dur = Math.random() * 14 + 12;
      const del = Math.random() * 10;
      bird.style.cssText = `
        top: ${startTop}%;
        left: -80px;
        --dx: ${dx};
        --dy: ${dy};
        animation-duration: ${dur}s;
        animation-delay: ${del}s;
        font-size: ${Math.random() * 0.5 + 0.6}rem;
        opacity: 0.6;
      `;
      bird.textContent = ['🐦','🦅','🕊️'][Math.floor(Math.random() * 3)];
      birdDiv.appendChild(bird);
    }
  }
  createSunsetBirds();

  console.log('💛 All animations loaded. Story ready for Mansi.');
});