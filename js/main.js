/* ========================================
   AGENCE WEB - LOGIQUE PRINCIPALE
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1200);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2200);
  }

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- BURGER MOBILE ---------- */
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.mobile-overlay');
  if (burger && overlay) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- LIEN ACTIF NAV ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-overlay a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ---------- REVELATION SCROLL (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- COMPTEURS ANIMÉS ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start = performance.now();
    el.classList.add('counting');
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- HERO LETTRES PAR LETTRES ---------- */
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    text.split(' ').forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      word.split('').forEach((char, ci) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;
        const total = wi * 5 + ci;
        charSpan.style.animationDelay = (total * 0.025) + 's';
        wordSpan.appendChild(charSpan);
      });
      el.appendChild(wordSpan);
      el.appendChild(document.createTextNode(' '));
    });
  });

  /* ---------- CARROUSEL TÉMOIGNAGES ---------- */
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots button');
  if (testimonials.length) {
    let idx = 0;
    let timer;
    function show(i) {
      testimonials.forEach((t, k) => t.classList.toggle('active', k === i));
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      idx = i;
    }
    function next() { show((idx + 1) % testimonials.length); }
    dots.forEach((d, k) => d.addEventListener('click', () => {
      show(k);
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }));
    show(0);
    timer = setInterval(next, 6000);
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- TILT 3D SUR CARTES (vanilla-tilt) ---------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8,
      speed: 600,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02
    });
  }

  /* ---------- TOGGLE TARIFS ---------- */
  const toggleSwitch = document.querySelector('.toggle-switch');
  if (toggleSwitch) {
    const buttons = toggleSwitch.querySelectorAll('button');
    const bg = toggleSwitch.querySelector('.toggle-bg');
    function setActive(btn) {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bg.style.width = btn.offsetWidth + 'px';
      bg.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
      const target = btn.dataset.target;
      document.querySelectorAll('[data-toggle-pane]').forEach(p => {
        p.style.display = p.dataset.togglePane === target ? '' : 'none';
      });
    }
    buttons.forEach(b => b.addEventListener('click', () => setActive(b)));
    setActive(buttons[0]);
    window.addEventListener('resize', () => setActive(toggleSwitch.querySelector('button.active')));
  }

  /* ---------- FILTRES PORTFOLIO ---------- */
  const filterBtns = document.querySelectorAll('.filter-bar button');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.cat;
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- MODAL PORTFOLIO ---------- */
  const modal = document.getElementById('project-modal');
  if (modal) {
    const modalContent = modal.querySelector('.modal-body');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const data = JSON.parse(card.dataset.modal || '{}');
        modalContent.innerHTML = `
          <h3>${data.title || ''}</h3>
          <div class="project-meta" style="margin-bottom:1.4rem">
            <span>${data.client || ''}</span>
            <span>${data.formula || ''}</span>
          </div>
          <h4>Problématique</h4>
          <p>${data.problem || ''}</p>
          <h4>Solution apportée</h4>
          <p>${data.solution || ''}</p>
          <h4>Résultats</h4>
          <p>${data.results || ''}</p>
          <h4>Technologies</h4>
          <p>${data.tech || ''}</p>
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ---------- CALCULATEUR ---------- */
  const calc = document.getElementById('calculator');
  if (calc) {
    const pages = calc.querySelector('#calc-pages');
    const pagesVal = calc.querySelector('#calc-pages-val');
    const seo = calc.querySelector('#calc-seo');
    const maint = calc.querySelector('#calc-maint');
    const result = calc.querySelector('#calc-result');
    function update() {
      const p = parseInt(pages.value);
      pagesVal.textContent = p;
      let price = 0;
      if (p <= 1) price = 490;
      else if (p <= 5) price = 990;
      else price = 1790;
      let monthly = 0;
      if (seo.checked) monthly += 149;
      if (maint.checked) monthly += 49;
      let txt = `${price}€`;
      if (monthly > 0) txt += ` <span style="font-size:1rem;opacity:0.85">+ ${monthly}€/mois</span>`;
      result.innerHTML = txt;
    }
    [pages, seo, maint].forEach(i => i.addEventListener('input', update));
    update();
  }

  /* ---------- VALIDATION FORMULAIRE CONTACT ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const fields = [
        { id: 'firstname', err: 'Prénom requis', test: v => v.trim().length >= 2 },
        { id: 'lastname', err: 'Nom requis', test: v => v.trim().length >= 2 },
        { id: 'email', err: 'Email invalide', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { id: 'phone', err: 'Téléphone invalide', test: v => v.trim() === '' || /^[+\d\s().-]{8,}$/.test(v), optional: true },
        { id: 'project', err: 'Sélectionnez un type', test: v => v !== '' },
        { id: 'budget', err: 'Sélectionnez un budget', test: v => v !== '' },
        { id: 'message', err: 'Message trop court (20 caractères min)', test: v => v.trim().length >= 20 },
      ];
      fields.forEach(f => {
        const input = form.querySelector('#' + f.id);
        const errEl = form.querySelector(`[data-err="${f.id}"]`);
        if (!input) return;
        const ok = f.test(input.value);
        errEl.textContent = ok ? '' : f.err;
        if (!ok) {
          input.classList.add('shake');
          setTimeout(() => input.classList.remove('shake'), 400);
          valid = false;
        }
      });
      const rgpd = form.querySelector('#rgpd');
      const rgpdErr = form.querySelector('[data-err="rgpd"]');
      if (!rgpd.checked) {
        rgpdErr.textContent = 'Vous devez accepter la politique de confidentialité';
        valid = false;
      } else rgpdErr.textContent = '';
      if (valid) {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.style.display = 'block';
      }
    });
  }

  /* ---------- TRANSITIONS ENTRE PAGES ---------- */
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || a.target === '_blank') return;
      e.preventDefault();
      transition.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

});
