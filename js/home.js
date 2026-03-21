const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faq) => {
      faq.classList.remove("is-open");
      faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const coverageShowcase = document.querySelector("[data-coverage-showcase]");

if (coverageShowcase) {
  const items = coverageShowcase.querySelectorAll(".coverage-service-item");
  const previewCard = coverageShowcase.querySelector("[data-coverage-preview]");
  const previewIconWrap = previewCard?.querySelector("[data-preview-icon-wrap]");
  const previewTitleSmall = previewCard?.querySelector("[data-preview-title-small]");
  const previewHeading = previewCard?.querySelector("[data-preview-heading]");
  const previewCopy = previewCard?.querySelector("[data-preview-copy]");
  const previewLink = previewCard?.querySelector("[data-preview-link]");
  const previewMedia = previewCard?.querySelector("[data-preview-media]");

  const activateService = (item) => {
    items.forEach((button) => {
      const isActive = button === item;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    coverageShowcase.dataset.service = item.dataset.service || "liability";

    if (previewTitleSmall) {
      previewTitleSmall.textContent = item.dataset.title || "";
    }

    if (previewHeading) {
      previewHeading.textContent = item.dataset.previewTitle || "";
    }

    if (previewCopy) {
      previewCopy.textContent = item.dataset.previewCopy || "";
    }

    if (previewLink) {
      previewLink.href = item.dataset.previewLink || "#";
      previewLink.textContent = item.dataset.previewLabel || "View coverage";
    }

    if (previewMedia) {
      const image = item.dataset.previewImage || "";
      const position = item.dataset.previewPosition || "center center";
      previewMedia.style.backgroundImage = `linear-gradient(180deg, rgba(70, 103, 160, 0.18), rgba(9, 16, 28, 0.22)), url('${image}')`;
      previewMedia.style.backgroundPosition = position;
    }

    if (previewIconWrap) {
      const icon = item.dataset.previewIcon || "shield";
      previewIconWrap.innerHTML = `<i data-lucide="${icon}"></i>`;
      window.lucide?.createIcons();
    }
  };

  items.forEach((item) => {
    item.addEventListener("click", () => activateService(item));
  });
}
