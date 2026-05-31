document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV ACTIVE STATE ────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── MOBILE BURGER ───────────────────────────────── */
  const burger    = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn  = document.getElementById('mobile-nav-close');
  if (burger)   burger.addEventListener('click',   () => mobileNav.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));

  /* ── CONTACT FORM ────────────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const s = encodeURIComponent(d.subject || 'Contact bachelintech.com');
      const b = encodeURIComponent(`Nom: ${d.name}\nEmail: ${d.email}\n\n${d.message}`);
      window.location.href = `mailto:contact@bachelintech.com?subject=${s}&body=${b}`;
      form.style.display = 'none';
      const ok = document.getElementById('form-success');
      if (ok) ok.style.display = 'block';
    });
  }
});
