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
// function googleTranslateElementInit() {
//   new google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       includedLanguages: "en,hi,gu,fr,de,es,zh-CN,ja",
//       layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
//     },
//     "google_translate_element"
//   );
// }
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,es,ar,fr,de,ta,te,bn,gu,mr,pa,ne",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// 🧩 Remove Google top frame (translation banner)
function hideGoogleTopBar() {
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      top: 0px !important;
    }
  `;
  document.head.appendChild(style);
}
hideGoogleTopBar();

// Hide the translation iframe every few seconds (for safety)
setInterval(() => {
  const frames = document.querySelectorAll(
    ".VIpgJd-ZVi9od-ORHb-OEVmcd, iframe.goog-te-menu-frame, .goog-te-banner-frame.skiptranslate"
  );
  frames.forEach((f) => {
    f.style.display = "none";
    f.style.visibility = "hidden";
    f.style.height = "0";
    f.style.width = "0";
  });
}, 1500);

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
