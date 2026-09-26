const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.dataset.open === 'true';
    nav.dataset.open = String(!open);
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
