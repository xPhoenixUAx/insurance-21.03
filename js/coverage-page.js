const heroTitle = document.querySelector(".coverage-hero h1");

if (heroTitle) {
  document.title = `${heroTitle.textContent} Comparison | DriveQuote Compare`;
}
