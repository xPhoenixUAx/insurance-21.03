if (window.lucide) {
  window.lucide.createIcons();
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-quote-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const url = new URL(link.href, window.location.href);
    const coverage = link.dataset.coverage;

    if (coverage) {
      url.searchParams.set("coverage", coverage);
    }

    event.preventDefault();
    window.location.href = url.toString();
  });
});

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector("[data-form-status]");
    const zipInput = form.querySelector('input[name="zip"]');
    const zip = zipInput ? zipInput.value.trim() : "";

    if (!/^\d{5}$/.test(zip)) {
      if (status) {
        status.textContent = "Enter a valid 5-digit ZIP Code to continue.";
        status.classList.remove("is-success");
      }
      zipInput?.focus();
      return;
    }

    const targetPage = form.dataset.targetPage || "";
    const url = new URL(targetPage, window.location.href);
    const data = new FormData(form);

    data.forEach((value, key) => {
      if (typeof value === "string" && value.trim()) {
        url.searchParams.set(key, value.trim());
      }
    });

    if (status) {
      status.textContent = targetPage ? "Thanks. Redirecting you to the next step." : "Thanks. Your request is ready to be shared with matching providers.";
      status.classList.add("is-success");
    }

    if (targetPage) {
      window.setTimeout(() => {
        window.location.href = url.toString();
      }, 400);
    }
  });
});
