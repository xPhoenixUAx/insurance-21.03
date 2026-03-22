if (window.lucide) {
  window.lucide.createIcons();
}

const quoteModalTriggers = document.querySelectorAll("[data-open-quote-modal]");

if (quoteModalTriggers.length && !document.querySelector("[data-global-quote-modal]")) {
  const quoteModal = document.createElement("dialog");
  quoteModal.className = "site-modal";
  quoteModal.setAttribute("data-global-quote-modal", "");
  quoteModal.setAttribute("aria-labelledby", "quick-quote-modal-title");
  quoteModal.innerHTML = `
    <div class="site-modal__content">
      <button class="site-modal__close" type="button" data-modal-close aria-label="Close quote request dialog">
        <i data-lucide="x" aria-hidden="true"></i>
      </button>
      <p class="section-tag">Quick quote request</p>
      <h2 id="quick-quote-modal-title">Start your comparison in a few steps.</h2>
      <p>Enter your ZIP Code and coverage interest to continue to the full request form.</p>
      <form class="site-modal__form" data-quote-form data-target-page="contact.html" novalidate>
        <div class="form-field">
          <label for="quick-quote-zip">ZIP Code</label>
          <input id="quick-quote-zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5" required>
        </div>
        <div class="form-field">
          <label for="quick-quote-coverage">Coverage Interest</label>
          <select id="quick-quote-coverage" name="coverage">
            <option value="">Select a coverage type</option>
            <option value="general-auto">General Auto Insurance Comparison</option>
            <option value="liability-insurance">Liability Insurance</option>
            <option value="full-coverage">Full Coverage</option>
            <option value="collision-insurance">Collision Insurance</option>
            <option value="comprehensive-insurance">Comprehensive Insurance</option>
            <option value="uninsured-motorist">Uninsured Motorist</option>
            <option value="sr22-insurance">SR-22 Insurance</option>
          </select>
        </div>
        <button class="button button-dark" type="submit">Continue</button>
        <p class="form-status" data-form-status aria-live="polite"></p>
      </form>
    </div>
  `;
  document.body.appendChild(quoteModal);
}

const confirmModal = document.querySelector("[data-confirm-modal]");
const globalQuoteModal = document.querySelector("[data-global-quote-modal]");

function registerDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  dialog.querySelectorAll("[data-modal-close]").forEach((control) => {
    control.addEventListener("click", () => {
      dialog.close();
    });
  });

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInside) {
      dialog.close();
    }
  });
}

registerDialog(confirmModal);
registerDialog(globalQuoteModal);

quoteModalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (globalQuoteModal instanceof HTMLDialogElement) {
      globalQuoteModal.showModal();
      window.lucide?.createIcons();
      globalQuoteModal.querySelector('input[name="zip"]')?.focus();
    }
  });
});

if (window.lucide) {
  window.lucide.createIcons();
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navDropdowns = document.querySelectorAll(".nav-dropdown");

navDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown__toggle");

  toggle?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = dropdown.classList.contains("is-open");

    navDropdowns.forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      dropdown.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  navDropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
    }
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");

    if (expanded) {
      navDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
      });
    }
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
    } else if (confirmModal instanceof HTMLDialogElement) {
      confirmModal.showModal();
      window.lucide?.createIcons();
      form.reset();
    }
  });
});
