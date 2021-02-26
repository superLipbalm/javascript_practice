const toggle = document.getElementById('toggle');
const modalOpen = document.getElementById('open');
const modalClose = document.getElementById('close');
const modal = document.getElementById('modal');

// Toggle nav
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));

// Show modal
modalOpen.addEventListener('click', () => modal.classList.add('show-modal'));
//close modal
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

window.addEventListener('click', (e) =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);
