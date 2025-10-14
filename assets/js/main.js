// Keep Bootstrap click toggle for mobile, hover for desktop
document.querySelectorAll(".dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseenter", function () {
    if (window.innerWidth > 992) {
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(
        dropdown.querySelector('[data-bs-toggle="dropdown"]')
      );
      bsDropdown.show();
    }
  });
  dropdown.addEventListener("mouseleave", function () {
    if (window.innerWidth > 992) {
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(
        dropdown.querySelector('[data-bs-toggle="dropdown"]')
      );
      bsDropdown.hide();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. Scroll Fade-in Animation Logic
  // ===================================
  const faders = document.querySelectorAll(".scroll-fade-in");
  const appearOptions = { threshold: 0, rootMargin: "0px 0px -100px 0px" };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => appearOnScroll.observe(fader));

  // ===================================
  // 2. Services Tabbing/Accordion Logic
  // ===================================
  const serviceTabs = document.querySelectorAll("#services-tabs .tab-item");
  const tabPanes = document.querySelectorAll("#tab-content-display .tab-pane");

  const resetTabs = () => {
    serviceTabs.forEach((tab) => {
      tab.classList.remove("active", "border-accent");
      const content = tab.querySelector(".tab-content");
      if (content) content.classList.add("hidden");

      const collapseEl = tab.querySelector(".accordion-collapse");
      if (collapseEl)
        new bootstrap.Collapse(collapseEl, { toggle: false }).hide();

      const span = tab.querySelector("span");
      if (span) span.textContent = "+";
    });
    tabPanes.forEach((pane) => {
      pane.classList.add("d-none", "hidden");
      pane.classList.remove("active");
    });
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-tab");
      const tabContent = this.querySelector(".tab-content");
      const collapseEl = this.querySelector(".accordion-collapse");

      // Accordion toggle behavior
      if (!tabContent.classList.contains("hidden")) {
        resetTabs();
        document
          .getElementById("content-darshan")
          ?.classList.remove("hidden", "d-none");
        return;
      }

      resetTabs();
      this.classList.add("active", "border-accent");
      if (tabContent) tabContent.classList.remove("hidden");
      if (collapseEl)
        new bootstrap.Collapse(collapseEl, { toggle: false }).show();
      const span = this.querySelector("span");
      if (span) span.textContent = "–";

      const targetPane = document.getElementById(`content-${targetId}`);
      if (targetPane)
        targetPane.classList.remove("d-none", "hidden"),
          targetPane.classList.add("active");
    });
  });

  // Initial tab
  const firstTab = document.querySelector(
    '#services-tabs .tab-item[data-tab="darshan"]'
  );
  firstTab?.click();

  // ===================================
  // 3. FAQ Accordion Logic
  // ===================================
  const faqToggles = document.querySelectorAll("#faq-accordion .faq-toggle");
  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      const icon = this.querySelector("span");

      if (targetContent) targetContent.classList.toggle("hidden");

      if (icon)
        icon.textContent = targetContent?.classList.contains("hidden")
          ? "+"
          : "–";
    });
  });

  // ===================================
  // 4. Initialize AOS
  // ===================================
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});

// //////////////////figma slider logic//////////////////////
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// const slides = document.querySelectorAll('.slide');
// const visibleSlides = 3;
// let index = 0;

// const carousel = document.querySelector('#heroCarousel');
// const btnPrev = document.querySelector('#prev');
// const btnNext = document.querySelector('#next');

// function showSlide(i) {
//   const total = slides.length;
//   const maxIndex = total - visibleSlides; // last valid slide index

//   // prevent going out of range
//   if (i < 0) index = 0;
//   else if (i > maxIndex) index = maxIndex;
//   else index = i;

//   carousel.style.transform = `translateX(-${index * (100 / visibleSlides)}%)`;

//   // disable buttons when limit reached
//   btnPrev.disabled = index === 0;
//   btnNext.disabled = index === maxIndex;
// }

// // event listeners
// btnPrev.addEventListener('click', () => showSlide(index - 1));
// btnNext.addEventListener('click', () => showSlide(index + 1));

// // initialize state
// showSlide(0);


const slides = document.querySelectorAll('.slide');
const visibleSlides = 3;
let index = 0;

const carousel = document.querySelector('#heroCarousel');
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');

function updateActiveSlides() {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active-slide', i >= index && i < index + visibleSlides);
  });
}

function showSlide(i) {
  const total = slides.length;
  const maxIndex = total - visibleSlides;

  if (i < 0) index = 0;
  else if (i > maxIndex) index = maxIndex;
  else index = i;

  // elegant smooth slide
  carousel.style.transform = `translateX(-${index * (100 / visibleSlides)}%)`;

  // active scaling & fade
  updateActiveSlides();

  // disable buttons at edges
  btnPrev.disabled = index === 0;
  btnNext.disabled = index === maxIndex;
}

// click events
btnPrev.addEventListener('click', () => showSlide(index - 1));
btnNext.addEventListener('click', () => showSlide(index + 1));

// initialize
showSlide(0);
