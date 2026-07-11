(function () {
  const coupon = document.getElementById('coupon');
  const hint = document.getElementById('hint');

  let startX = 0, startY = 0, startT = 0;
  let dragging = false;
  const SWIPE_THRESHOLD = 40;   // px
  const TAP_THRESHOLD = 10;     // px
  const TAP_MAX_TIME = 300;     // ms

  function flip() {
    coupon.classList.toggle('flipped');
    if (hint) hint.style.display = 'none';
  }

  function onStart(x, y) {
    startX = x; startY = y; startT = Date.now();
    dragging = true;
  }

  function onEnd(x, y) {
    if (!dragging) return;
    dragging = false;
    const dx = x - startX;
    const dy = y - startY;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));
    const elapsed = Date.now() - startT;

    if (dist < TAP_THRESHOLD && elapsed < TAP_MAX_TIME) {
      flip();
      return;
    }
    if (dist > SWIPE_THRESHOLD) {
      flip();
    }
  }

  // touch
  coupon.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    onStart(t.clientX, t.clientY);
  }, { passive: true });

  coupon.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0];
    onEnd(t.clientX, t.clientY);
  }, { passive: true });

  // mouse (desktop testing)
  coupon.addEventListener('mousedown', (e) => {
    onStart(e.clientX, e.clientY);
  });
  window.addEventListener('mouseup', (e) => {
    if (dragging) onEnd(e.clientX, e.clientY);
  });

  // keyboard accessibility
  coupon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });
})();
