///////////////////28-10 2222222222222222222
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const mainNav = document.getElementById("mainNav");

  // Force manual control over collapse
  let bsCollapse = new bootstrap.Collapse(mainNav, { toggle: false });

  // Handle toggler open/close manually
  navbarToggler.addEventListener("click", function (e) {
    e.preventDefault();
    if (mainNav.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  });

  // Prevent dropdown clicks from retriggering collapse toggle
  mainNav.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("dropdown-toggle") ||
      e.target.closest(".dropdown-menu")
    ) {
      e.stopPropagation();
    }
  });

  // Dropdown hover for desktop
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

  // Dropdown click for mobile
  document.querySelectorAll(".dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation(); // stop bubbling to nav collapse
        const menu = this.nextElementSibling;
        const isOpen = menu.classList.contains("show");

        // close others
        document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
        if (!isOpen) menu.classList.add("show");
      }
    });
  });

  // Close dropdowns when navbar hides
  mainNav.addEventListener("hidden.bs.collapse", function () {
    document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
  });
});

///////////////////28-10 2222222222222222222 endsssssssssss


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
