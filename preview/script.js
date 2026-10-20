(() => {
  'use strict';
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const markers = [...document.querySelectorAll('.scene-nav .dot')];
  const counter = document.getElementById('counter');
  const nextBtn = document.getElementById('next-scene');
  const dialog = document.getElementById('product-dialog');
  let active = 0;

  function updateScene(n) {
    active = Math.max(0, Math.min(scenes.length - 1, n));
    scenes.forEach((node, i) => node.classList.toggle('in-view', i === active));
    markers.forEach((mark, i) => {
      mark.classList.toggle('is-active', i === active);
      if (i === active) mark.setAttribute('aria-current', 'step');
      else mark.removeAttribute('aria-current');
    });
    counter.textContent = String(active + 1).padStart(2, '0');
    nextBtn.textContent = active === scenes.length - 1 ? '↑' : '↓';
    nextBtn.setAttribute('aria-label', active === scenes.length - 1 ? 'Kembali ke awal' : 'Adegan selanjutnya');
  }
  function navigate(n) {
    const next = (n + scenes.length) % scenes.length;
    scenes[next].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    updateScene(next);
  }
  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => navigate(Number(btn.dataset.jump))));
  nextBtn.addEventListener('click', () => navigate((active + 1) % scenes.length));
  const observer = new IntersectionObserver((entries) => {
    const most = [...entries].filter(item => item.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (most && most.intersectionRatio > .45) updateScene(Number(most.target.dataset.scene));
  }, { threshold: [.1,.45,.55,.7] });
  scenes.forEach(node => observer.observe(node));
  document.addEventListener('keydown', (e) => {
    if (dialog.open || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === 'PageDown') { e.preventDefault(); navigate(active+1); }
    if (e.key === 'PageUp') { e.preventDefault(); navigate(active-1); }
  });
  document.getElementById('details-open').addEventListener('click', () => dialog.showModal());
  document.getElementById('details-close').addEventListener('click', () => dialog.close());
  document.getElementById('dialog-back').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
  updateScene(0);
})();
