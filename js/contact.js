const params = new URLSearchParams(window.location.search);
const coverageSelect = document.querySelector('select[name="coverage"]');
const zipInput = document.querySelector('.page-contact input[name="zip"]');

if (coverageSelect && params.has("coverage")) {
  coverageSelect.value = params.get("coverage");
}

if (zipInput && params.has("zip")) {
  zipInput.value = params.get("zip");
}
