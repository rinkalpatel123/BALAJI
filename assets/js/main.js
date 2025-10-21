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
