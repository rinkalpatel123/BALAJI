// Keep Bootstrap click toggle for mobile, hover for desktop
document.querySelectorAll(".dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseenter", function () {
    if (window.innerWidth > 992) {
      const menu = dropdown.querySelector(".dropdown-menu");
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(
        dropdown.querySelector('[data-bs-toggle="dropdown"]')
      );
      bsDropdown.show();
    }
  });
  dropdown.addEventListener("mouseleave", function () {
    if (window.innerWidth > 992) {
      const menu = dropdown.querySelector(".dropdown-menu");
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(
        dropdown.querySelector('[data-bs-toggle="dropdown"]')
      );
      bsDropdown.hide();
    }
  });
});

////////////////

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 30);
});

///////////////<!-- ✅ Google Translate Script -->
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,gu,fr,de,es,zh-CN,ja",
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    },
    "google_translate_element"
  );
}

/////////// image open isotope

document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".masonry-item img");
  const modalImage = document.getElementById("modalImage");

  galleryItems.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      modalImage.src = this.src;
      const modal = new bootstrap.Modal(document.getElementById("imageModal"));
      modal.show();
    });
  });
});
