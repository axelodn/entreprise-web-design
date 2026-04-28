/* ========================================
   AGENCE WEB - ANIMATIONS GSAP
   ======================================== */

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  /* Animation parallax générique sur sections */
  gsap.utils.toArray('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    gsap.to(el, {
      y: () => -ScrollTrigger.maxScroll(window) * speed * 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  /* Stagger sur grilles cartes */
  gsap.utils.toArray('[data-stagger]').forEach(group => {
    const items = group.children;
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* Scale-in pour CTA finale */
  gsap.utils.toArray('.cta-final').forEach(el => {
    gsap.from(el.querySelectorAll('h2, p, .btn'), {
      scale: 0.92,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
      }
    });
  });

  /* Timeline animée */
  gsap.utils.toArray('.timeline').forEach(tl => {
    gsap.from(tl.querySelectorAll('.timeline-step'), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: { trigger: tl, start: 'top 78%' }
    });
  });

  /* Section heading split */
  gsap.utils.toArray('.section-head h2').forEach(h => {
    gsap.from(h, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 85%' }
    });
  });
}

/* AOS init si présent */
if (window.AOS) {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
  });
}
