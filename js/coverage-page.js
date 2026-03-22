const heroTitle = document.querySelector(".coverage-hero h1");

if (heroTitle) {
  document.title = `${heroTitle.textContent} Comparison | NEXUS`;
}

const faqItems = document.querySelectorAll(".coverage-faq-list .faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      const faqButton = faqItem.querySelector(".faq-question");

      if (faqButton) {
        faqButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
