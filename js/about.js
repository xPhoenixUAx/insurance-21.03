const aboutCtaButtons = document.querySelectorAll(".cta-band .button");

aboutCtaButtons.forEach((button) => {
  button.addEventListener("focus", () => {
    button.closest(".cta-band")?.classList.add("is-active");
  });

  button.addEventListener("blur", () => {
    button.closest(".cta-band")?.classList.remove("is-active");
  });
});
