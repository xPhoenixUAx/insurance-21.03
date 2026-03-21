document.querySelectorAll(".coverage-card").forEach((card, index) => {
  card.dataset.order = String(index + 1);
});
