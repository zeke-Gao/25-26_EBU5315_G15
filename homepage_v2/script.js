const body = document.body;
const slides = Array.from(document.querySelectorAll(".slide"));
const prevSlide = document.getElementById("prev-slide");
const nextSlide = document.getElementById("next-slide");

const themeToggle = document.getElementById("theme-toggle");
const fontToggle = document.getElementById("font-toggle");
const cbToggle = document.getElementById("cb-toggle");

const geobotFab = document.getElementById("geobot-fab");
const geobotDot = document.getElementById("geobot-dot");
const geobotPanel = document.getElementById("geobot-panel");
const geobotBody = document.getElementById("geobot-body");
const geobotQuick = document.getElementById("geobot-quick");
const geobotForm = document.getElementById("geobot-form");
const geobotClose = document.getElementById("geobot-close");
const geobotBack = document.getElementById("geobot-back");
const geobotClear = document.getElementById("geobot-clear");
const geobotWarning = document.getElementById("geobot-warning");

const privacyBanner = document.getElementById("privacy-banner");
const acceptPrivacy = document.getElementById("accept-privacy");
const dismissPrivacy = document.getElementById("dismiss-privacy");

const themeModes = ["light", "dark", "eye"];
const fontModes = ["md", "lg", "xl"];
let currentThemeIndex = 0;
let currentFontIndex = 0;
let contrastEnabled = false;
let activeIndex = 0;

const uiText = {
  en: {
    theme: "Theme",
    font: "Font",
    color: "Color",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_eye: "Eye",
    font_md: "Normal",
    font_lg: "Large",
    font_xl: "XL",
    color_normal: "Standard",
    color_cb: "CB Safe",
    incomplete: "Please complete name, email, and message before submitting.",
    thanks: "Thanks! Your prototype feedback has been recorded.",
    learn: "Start with diameter, central-angle, and tangent diagrams. This version is mainly about visual clarity.",
    design: "Use the carousel and rule cards as the main evidence of the Stage 2 homepage direction.",
    hello: "Hi, I am GeoBot. Want a quick summary of what this prototype already includes?",
    hello_sub: "This build already includes display settings, a privacy banner, and a prototype feedback form.",
  },
  zh: {
    theme: "主题",
    font: "字体",
    color: "颜色",
    theme_light: "明亮",
    theme_dark: "深色",
    theme_eye: "护眼",
    font_md: "标准",
    font_lg: "大号",
    font_xl: "特大",
    color_normal: "标准",
    color_cb: "色盲友好",
    incomplete: "请先完整填写姓名、邮箱和留言。",
    thanks: "谢谢，你对原型的反馈已经记录。",
    learn: "先看直径、圆心角和切线三张图，这个版本主要强调视觉表达是否清晰。",
    design: "这个阶段最重要的证据是轮播图示、知识卡片和首页整体视觉方向。",
    hello: "你好，我是 GeoBot。想快速了解这个原型已经包含了哪些首页能力吗？",
    hello_sub: "这个版本已经带有显示设置、隐私横幅和一个原型反馈表单。",
  },
};

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore storage failures
  }
}

function lang() {
  return body.getAttribute("data-lang") === "zh" ? "zh" : "en";
}

function t(key) {
  return uiText[lang()][key];
}

function updateTheme() {
  const mode = themeModes[currentThemeIndex];
  body.setAttribute("data-theme", mode);
  themeToggle.textContent = `${t("theme")}: ${t(`theme_${mode}`)}`;
  safeSet("v2_theme", mode);
}

function updateFont() {
  const mode = fontModes[currentFontIndex];
  const rootSize = mode === "md" ? 16 : mode === "lg" ? 17 : 19;
  document.documentElement.style.fontSize = `${rootSize}px`;
  body.setAttribute("data-font", mode);
  fontToggle.textContent = `${t("font")}: ${t(`font_${mode}`)}`;
  safeSet("v2_font", mode);
}

function updateContrast() {
  body.setAttribute("data-contrast", contrastEnabled ? "cb" : "normal");
  cbToggle.textContent = `${t("color")}: ${contrastEnabled ? t("color_cb") : t("color_normal")}`;
  safeSet("v2_contrast", contrastEnabled ? "cb" : "normal");
}

function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  activeIndex = index;
}

function addMessage(text, isSub = false) {
  if (!geobotBody) return;
  const node = document.createElement("div");
  node.className = isSub ? "geobot-msg sub" : "geobot-msg";
  node.textContent = text;
  geobotBody.appendChild(node);
  geobotBody.scrollTop = geobotBody.scrollHeight;
}

function showWarning(text) {
  geobotWarning.textContent = text;
  geobotWarning.style.display = "block";
}

function clearWarning() {
  geobotWarning.textContent = "";
  geobotWarning.style.display = "none";
}

function openChat() {
  geobotPanel.classList.add("is-open");
  if (geobotDot) {
    geobotDot.style.display = "none";
  }
}

function closeChat() {
  geobotPanel.classList.remove("is-open");
}

function showChatView() {
  geobotBody.style.display = "grid";
  geobotQuick.style.display = "flex";
  geobotForm.style.display = "none";
  clearWarning();
}

function showFormView() {
  geobotBody.style.display = "none";
  geobotQuick.style.display = "none";
  geobotForm.style.display = "grid";
  clearWarning();
}

function formIsComplete() {
  const name = geobotForm.querySelector('input[name="name"]').value.trim();
  const email = geobotForm.querySelector('input[name="email"]').value.trim();
  const message = geobotForm.querySelector("textarea").value.trim();
  return name.length > 0 && email.length > 0 && message.length > 0;
}

function initGeobot() {
  addMessage(t("hello"));
  addMessage(t("hello_sub"), true);
}

function init() {
  const storedTheme = safeGet("v2_theme");
  const storedFont = safeGet("v2_font");
  const storedContrast = safeGet("v2_contrast");

  if (storedTheme && themeModes.includes(storedTheme)) {
    currentThemeIndex = themeModes.indexOf(storedTheme);
  }
  if (storedFont && fontModes.includes(storedFont)) {
    currentFontIndex = fontModes.indexOf(storedFont);
  }
  contrastEnabled = storedContrast === "cb";

  updateTheme();
  updateFont();
  updateContrast();
  showSlide(0);
  initGeobot();

  if (privacyBanner && safeGet("v2_privacy") === "accepted") {
    privacyBanner.style.display = "none";
  }
}

prevSlide?.addEventListener("click", () => {
  showSlide((activeIndex - 1 + slides.length) % slides.length);
});

nextSlide?.addEventListener("click", () => {
  showSlide((activeIndex + 1) % slides.length);
});

themeToggle?.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themeModes.length;
  updateTheme();
});

fontToggle?.addEventListener("click", () => {
  currentFontIndex = (currentFontIndex + 1) % fontModes.length;
  updateFont();
});

cbToggle?.addEventListener("click", () => {
  contrastEnabled = !contrastEnabled;
  updateContrast();
});

geobotFab?.addEventListener("click", openChat);
geobotClose?.addEventListener("click", closeChat);
geobotBack?.addEventListener("click", showChatView);

geobotClear?.addEventListener("click", () => {
  geobotForm.reset();
  clearWarning();
});

geobotQuick?.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const action = trigger.getAttribute("data-action");
  if (action === "learn") addMessage(t("learn"));
  if (action === "design") addMessage(t("design"));
  if (action === "contact") showFormView();
});

geobotForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formIsComplete()) {
    showWarning(t("incomplete"));
    return;
  }
  addMessage(t("thanks"));
  geobotForm.reset();
  showChatView();
});

acceptPrivacy?.addEventListener("click", () => {
  safeSet("v2_privacy", "accepted");
  privacyBanner.style.display = "none";
});

dismissPrivacy?.addEventListener("click", () => {
  safeSet("v2_privacy", "later");
  privacyBanner.style.display = "none";
});

window.addEventListener("load", init);
