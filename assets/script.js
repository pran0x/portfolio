  document.addEventListener('DOMContentLoaded', function () {

    // ─── Typewriter ───
    const phrases = [
      'Penetration Tester',
      'Web Security Researcher',
      'Bug Bounty Hunter',
      'Vulnerability Hunter',
      'Red Team Operator'
    ];
    let pIdx = 0, cIdx = 0, deleting = false;
    const twEl = document.getElementById('typewriter');

    function type() {
      const cur = phrases[pIdx];
      if (!deleting) {
        twEl.innerHTML = cur.slice(0, cIdx + 1) + '<span class="cursor"></span>';
        cIdx++;
        if (cIdx === cur.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        twEl.innerHTML = cur.slice(0, cIdx - 1) + '<span class="cursor"></span>';
        cIdx--;
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
      }
      setTimeout(type, deleting ? 45 : 85);
    }
    type();

    // ─── Fade-in on scroll ───
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // ─── Counter animation ───
    function animateCounter(el, target, suffix, duration) {
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const stats = [
      { id: 'c1', target: 12, suffix: '+', duration: 1600 },
      { id: 'c2', target: 3,  suffix: '',  duration: 1200 },
      { id: 'c3', target: 100, suffix: '%', duration: 1800 },
    ];

    const container = document.querySelector('.hof-stats');
    if (container) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            stats.forEach(s => animateCounter(document.getElementById(s.id), s.target, s.suffix, s.duration));
            counterObserver.disconnect();
          }
        });
      }, { threshold: 0.3 });
      counterObserver.observe(container);
    }

    // ─── Tool Image Tooltip (2s delay on hover) ───
    const toolCards = document.querySelectorAll('.tool-card.img-only');
    const tooltipTimers = new Map();

    toolCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const timer = setTimeout(() => {
          card.classList.add('show-tooltip');
        }, 2000);
        tooltipTimers.set(card, timer);
      });

      card.addEventListener('mouseleave', () => {
        const timer = tooltipTimers.get(card);
        if (timer) clearTimeout(timer);
        card.classList.remove('show-tooltip');
        tooltipTimers.delete(card);
      });
    });

  });