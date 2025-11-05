///////////////////5-11 starts
document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------------------------------------- */
  /* 🧭 NAVBAR TOGGLER & DROPDOWN CONTROL                                       */
  /* -------------------------------------------------------------------------- */
  const navbarToggler = document.querySelector(".navbar-toggler");
  const mainNav = document.getElementById("mainNav");
  let bsCollapse = new bootstrap.Collapse(mainNav, { toggle: false });

  // Toggle navbar manually
  navbarToggler.addEventListener("click", function (e) {
    e.preventDefault();
    mainNav.classList.contains("show") ? bsCollapse.hide() : bsCollapse.show();
  });

  // Prevent dropdown click from collapsing nav
  mainNav.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("dropdown-toggle") ||
      e.target.closest(".dropdown-menu")
    ) {
      e.stopPropagation();
    }
  });

  // Hover dropdowns (desktop only)
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > 992) {
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        bootstrap.Dropdown.getOrCreateInstance(toggle).show();
      }
    });
    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth > 992) {
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
      }
    });
  });

  // Dropdown click toggle (mobile only)
  document.querySelectorAll(".dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const menu = this.nextElementSibling;
        const isOpen = menu.classList.contains("show");

        // Close all open dropdowns first
        document
          .querySelectorAll(".dropdown-menu.show")
          .forEach((m) => m.classList.remove("show"));

        if (!isOpen) menu.classList.add("show");
      }
    });
  });

  // Close dropdowns when navbar collapses
  mainNav.addEventListener("hidden.bs.collapse", function () {
    document
      .querySelectorAll(".dropdown-menu.show")
      .forEach((m) => m.classList.remove("show"));
  });

  /* -------------------------------------------------------------------------- */
  /* 🌍 LANGUAGE SELECTOR + GOOGLE TRANSLATE PERSISTENCE                        */
  /* -------------------------------------------------------------------------- */
  const langItems = document.querySelectorAll("#langList .dropdown-item");
  const langText = document.getElementById("languageText");

  const langKey = "selectedLanguageText"; // Language name (e.g., English)
  const langCodeKey = "selectedLanguageCode"; // Language code (e.g., en)

  // Restore saved language text
  const savedLangText = localStorage.getItem(langKey);
  const savedLangCode = localStorage.getItem(langCodeKey);

  if (savedLangText) langText.textContent = savedLangText;

  // Apply saved Google Translate language
  function applySavedLanguage() {
    if (!savedLangCode && !savedLangText) return;
    const iframe = document.querySelector("iframe.goog-te-menu-frame");
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const langElements = iframeDoc.querySelectorAll(".goog-te-menu2-item span.text");

    langElements.forEach(function (el) {
      if (
        el.getAttribute("lang") === savedLangCode ||
        el.innerText.trim() === savedLangText
      ) {
        el.click();
      }
    });
  }

  // Delay to ensure Google Translate iframe loads
  setTimeout(applySavedLanguage, 1000);

  // When user selects a language manually
  langItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const langName = this.textContent.trim();
      const langCode = this.getAttribute("data-lang");

      // Update text + store selection
      langText.textContent = langName;
      localStorage.setItem(langKey, langName);
      localStorage.setItem(langCodeKey, langCode);

      // Apply selection to Google Translate
      const iframe = document.querySelector("iframe.goog-te-menu-frame");
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const langElements = iframeDoc.querySelectorAll(".goog-te-menu2-item span.text");
        langElements.forEach(function (el) {
          if (
            el.getAttribute("lang") === langCode ||
            el.innerText.trim() === langName
          ) {
            el.click();
          }
        });
      }
    });
  });

  // Watch for Google Translate internal selection (if user clicks inside iframe)
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("goog-te-menu2-item") ||
      e.target.closest(".goog-te-menu2-item")
    ) {
      const selectedText = e.target.innerText || e.target.textContent;
      if (selectedText) {
        localStorage.setItem(langKey, selectedText.trim());
      }
    }
  });
});

///////////////////5-11 endsssssssssss

////////////////////
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 30);
});

///////////////<!-- ✅ Google Translate Script -->
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const langItems = document.querySelectorAll("#langList .dropdown-item");
  const langText = document.getElementById("languageText");

  langItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      const select = document.querySelector(".goog-te-combo");

      if (select) {
        // stop Google from re-translating the select itself
        select.classList.add("notranslate");
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      }

      langText.textContent = this.textContent;
      langText.classList.add("notranslate");
    });
  });
});

// ✅ Remove Google Translate top banner + iframes
function hideGoogleTopBar() {
  const style = document.createElement("style");
  style.innerHTML = `
    body { top: 0px !important; }
    .goog-te-banner-frame.skiptranslate,
    .VIpgJd-ZVi9od-ORHb-OEVmcd,
    iframe.goog-te-menu-frame,
    .goog-te-balloon-frame {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
      border: 0 !important;
      position: absolute !important;
    }
  `;
  document.head.appendChild(style);
}
hideGoogleTopBar();

// ✅ Re-hide stray iframes just in case
setInterval(() => {
  document
    .querySelectorAll(
      ".VIpgJd-ZVi9od-ORHb-OEVmcd, iframe.goog-te-menu-frame, .goog-te-banner-frame.skiptranslate"
    )
    .forEach((f) => {
      f.style.display = "none";
      f.style.visibility = "hidden";
      f.style.height = "0";
      f.style.width = "0";
    });
}, 2000);

//////////////////////////CHATBOT

const chatbot = document.querySelector(".chatbot");
const floatBtn = document.getElementById("chatbot-float");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chatbot-messages");
const toggleBtn = document.getElementById("chatbot-toggle");

floatBtn.addEventListener("click", () => {
  chatbot.style.display = "flex";
  floatBtn.style.display = "none";
});

toggleBtn.addEventListener("click", () => {
  chatbot.style.display = "none";
  floatBtn.style.display = "block";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  addMessage("Typing...", "bot");

  const botReply = await getBotResponse(text);
  document.querySelector(".message.bot:last-child").textContent = botReply;
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// 🧠 Get Response from API
async function getBotResponse(userText) {
  try {
    const response = await fetch("https://api.monkedev.com/fun/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: userText }),
    });

    const data = await response.json();
    return data.response || "I'm not sure, could you clarify?";
  } catch (error) {
    console.error(error);
    return "Sorry 😔 I’m having trouble connecting right now.";
  }
}
///////////////////////////
/////////////////
///////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".scroll-fade-in");

  // Apply base styles via JS
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Observer for scroll detection (continuous)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const delay = el.getAttribute("data-delay") || 0;

        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
        } else {
          // When out of view, reset to hidden
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
});

/////////////mappppppppppp



///////////////facebook post

document.addEventListener("DOMContentLoaded", function () {
  const postCards = document.querySelectorAll(".fb-post-card");
  const modal = new bootstrap.Modal(document.getElementById("fbModal"));
  const postContainer = document.getElementById("fb-post-container");

  postCards.forEach(card => {
    card.addEventListener("click", function () {
      const fbLink = this.getAttribute("data-fb-link");
      postContainer.innerHTML = `
        <div class="fb-post" data-href="${fbLink}" data-width="500"></div>
      `;
      if (window.FB) {
        FB.XFBML.parse(postContainer);
      }
      modal.show();
    });
  });
});

////////facebook post end


///////////////gallery open

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".image-modal .close");
  const nextBtn = document.querySelector(".image-modal .next");
  const prevBtn = document.querySelector(".image-modal .prev");

  // Collect images from gallery, instagram, and facebook
  const images = Array.from(
    document.querySelectorAll("#gallery .thumb img, #instagram .masonry-item img, #facebook .masonry-item img")
  );

  let currentIndex = 0;

  // Open modal when image clicked
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      caption.textContent = img.alt || "";
      currentIndex = index;
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Next image
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt || "";
  });

  // Previous image
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt || "";
  });

  // Close when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowRight") nextBtn.click();
      else if (e.key === "ArrowLeft") prevBtn.click();
      else if (e.key === "Escape") modal.style.display = "none";
    }
  });
});

///////////////gallery open ends