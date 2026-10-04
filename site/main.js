const cards = [...document.querySelectorAll('.gallery-card')];
const viewer = document.querySelector('.lightbox');
const viewerImage = document.querySelector('#lightbox-image');
const viewerCount = document.querySelector('#lightbox-count');
const viewerCaption = document.querySelector('#lightbox-caption');
let active = 0;
let opener = null;

function showPhoto(index) {
  active = (index + cards.length) % cards.length;
  const image = cards[active].querySelector('img');
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerCount.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  viewerCaption.textContent = image.alt;
}

cards.forEach((card, index) => card.addEventListener('click', () => {
  opener = card;
  showPhoto(index);
  viewer.showModal();
}));

viewer.querySelector('.lightbox__close').addEventListener('click', () => viewer.close());
viewer.querySelectorAll('[data-direction]').forEach((button) => {
  button.addEventListener('click', () => showPhoto(active + Number(button.dataset.direction)));
});
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showPhoto(active + 1);
  if (event.key === 'ArrowLeft') showPhoto(active - 1);
});
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
  opener?.focus();
});
