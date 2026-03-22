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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (coverageShowcase) {
  const items = coverageShowcase.querySelectorAll(".coverage-service-item");
  const previewCard = coverageShowcase.querySelector("[data-coverage-preview]");
  const previewIconWrap = previewCard?.querySelector("[data-preview-icon-wrap]");
  const previewTitleSmall = previewCard?.querySelector("[data-preview-title-small]");
  const previewHeading = previewCard?.querySelector("[data-preview-heading]");
  const previewCopy = previewCard?.querySelector("[data-preview-copy]");
  const previewLink = previewCard?.querySelector("[data-preview-link]");
  const previewMedia = previewCard?.querySelector("[data-preview-media]");

  const animatePreviewSwap = () => {
    if (!window.gsap || prefersReducedMotion) {
      return;
    }

    const contentParts = [previewTitleSmall, previewHeading, previewCopy, previewLink].filter(Boolean);

    window.gsap.fromTo(
      previewMedia,
      { autoAlpha: 0.72, scale: 1.035 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.42,
        ease: "power2.out",
        overwrite: "auto"
      }
    );

    window.gsap.fromTo(
      contentParts,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: "auto",
        clearProps: "transform,opacity,visibility"
      }
    );
  };

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

    animatePreviewSwap();
  };

  items.forEach((item) => {
    item.addEventListener("click", () => activateService(item));
  });
}
