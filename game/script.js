const body = document.body;

const themeToggle = document.getElementById("theme-toggle");
const fontToggle = document.getElementById("font-toggle");
const langToggle = document.getElementById("lang-toggle");
const cbToggle = document.getElementById("cb-toggle");

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
    // ignore storage errors (e.g., file:// restrictions)
  }
}

function readLangFromWindowName() {
  const match = window.name.match(/(?:^|;)lang=(en|zh)(?:;|$)/);
  return match ? match[1] : null;
}

const slides = Array.from(document.querySelectorAll(".slide"));
const prevSlide = document.getElementById("prev-slide");
const nextSlide = document.getElementById("next-slide");

const geobotFab = document.getElementById("geobot-fab");
const geobotDot = document.getElementById("geobot-dot");
const geobotPanel = document.getElementById("geobot-panel");
const geobotBody = document.getElementById("geobot-body");
const geobotQuick = document.getElementById("geobot-quick");
const geobotForm = document.getElementById("geobot-form");
const geobotClear = document.getElementById("geobot-clear");
const geobotBack = document.getElementById("geobot-back");
const geobotWarning = document.getElementById("geobot-warning");
const geobotClose = document.getElementById("geobot-close");

const privacyBanner = document.getElementById("privacy-banner");
const acceptPrivacy = document.getElementById("accept-privacy");
const dismissPrivacy = document.getElementById("dismiss-privacy");

const i18n = {
  en: {
    brand: "CircleSense",
    breadcrumb_home: "Home",
    breadcrumb_geometry: "Geometry",
    breadcrumb_circles: "Circles",
    hero_kicker: "Circle Geometry • Visual • Interactive",
    hero_title: "Master Circle Geometry with interactive games and AI hints.",
    hero_sub:
      "Learn theorems fast with cinematic visuals, bite-sized rules, and instant feedback designed for high school success.",
    hero_cta_primary: "Start Learning",
    hero_cta_secondary: "Watch the Concepts",
    hero_badge_1: "Angles & arcs",
    hero_badge_2: "Tangent tricks",
    hero_badge_3: "Cyclic proofs",
    carousel_title: "Visualize the Rules",
    carousel_sub: "Swipe through quick visuals that lock theorems in memory.",
    slide_1: "Diameter is always twice the radius.",
    slide_2: "Angles at the center are twice the angle at the circumference.",
    slide_3: "Tangent lines meet the radius at 90 degrees.",
    video_slot_label: "Video slot:",
    video_slot_text: "Place a short explainer video here with subtitles for accessibility.",
    rules_title: "Core Circle Rules",
    rules_sub: "Minimal cards, maximum clarity.",
    rule_1_title: "Angle in a Semicircle",
    rule_1_text: "An angle subtended by a diameter is always 90 degrees.",
    rule_2_title: "Cyclic Quadrilateral",
    rule_2_text: "Opposite angles in a cyclic quadrilateral sum to 180 degrees.",
    rule_3_title: "Tangent Properties",
    rule_3_text: "A tangent is perpendicular to the radius at the point of contact.",
    rule_4_title: "Equal Chords",
    rule_4_text: "Equal chords are equidistant from the center of the circle.",
    ads_label: "Sponsored",
    ads_text: "Upgrade to CircleSense+ for adaptive practice packs and printable proofs.",
    ads_cta: "Learn More",
    geobot_title: "GeoBot",
    geobot_subtitle: "Circle Geometry Helper",
    geobot_q_learn: "Learn Rules",
    geobot_q_play: "Play Game",
    geobot_q_contact: "Contact Us",
    form_name_label: "Name",
    form_name_ph: "Your name",
    form_email_label: "Email",
    form_email_ph: "you@email.com",
    form_message_label: "Message",
    form_message_ph: "Ask a question or request help...",
    form_send: "Submit",
    form_clear: "Clear",
    form_back: "Back",
    privacy_text:
      "We use minimal cookies to remember your theme and accessibility settings. No personal data is sold.",
    privacy_accept: "Accept",
    privacy_later: "Later",
    footer_text: "CircleSense © 2026 • Learn geometry with clarity.",
    footer_link_top: "Back to top",
    footer_link_rules: "Core rules",
    footer_link_slides: "Slides",
    footer_link_privacy: "Privacy Policy",
    privacy_back_home: "Back to home",
    privacy_title: "Privacy Policy",
    privacy_intro:
      "We believe privacy is a basic right. This policy explains what data we use, why we use it, and the choices you have. We use inclusive, gender-neutral language to welcome learners from all backgrounds.",
    privacy_summary_title: "Summary of Key Points",
    privacy_summary_1: "We only collect the data needed to run the learning experience.",
    privacy_summary_2: "We do not sell personal data.",
    privacy_summary_3: "You can request access, correction, or deletion of your data.",
    privacy_summary_4: "We keep data secure with reasonable safeguards.",
    privacy_collect_title: "Data We Collect",
    privacy_collect_1: "Contact form inputs: name, email, and message content.",
    privacy_collect_2: "Basic usage signals stored locally (theme, font size, accessibility settings).",
    privacy_collect_3: "Device/browser data for diagnostics (e.g., errors, performance).",
    privacy_use_title: "How We Use Data",
    privacy_use_1: "Respond to inquiries submitted via the contact form.",
    privacy_use_2: "Remember accessibility preferences for a consistent experience.",
    privacy_use_3: "Improve content quality and fix issues.",
    privacy_not_title: "What We Do Not Do",
    privacy_not_1: "We do not sell or rent personal data.",
    privacy_not_2: "We do not use data to make decisions about your eligibility for services.",
    privacy_not_3: "We do not run targeted advertising based on personal profiles.",
    privacy_storage_title: "Cookies and Local Storage",
    privacy_storage_text:
      "We use minimal storage in your browser to remember settings like theme, font size, and color contrast. You can clear these in your browser at any time.",
    privacy_retention_title: "Data Retention",
    privacy_retention_text:
      "We keep contact form messages only as long as needed to respond, then delete or archive them based on our internal policies.",
    privacy_third_title: "Third-Party Services",
    privacy_third_text:
      "This educational site does not use external analytics or ad networks by default. If we add any third-party tools later, we will update this policy clearly.",
    privacy_students_title: "Children and Students",
    privacy_students_text:
      "This site is designed for high-school learning. If you are a student, please ask a parent/guardian or educator before sharing personal information.",
    privacy_rights_title: "Your Rights and Choices",
    privacy_rights_1: "Access: request a copy of your data.",
    privacy_rights_2: "Correction: ask us to fix inaccurate information.",
    privacy_rights_3: "Deletion: request removal of your data.",
    privacy_rights_4: "Objection: opt out of non-essential processing.",
    privacy_security_title: "Security",
    privacy_security_text:
      "We use reasonable technical and organizational safeguards to protect data. No system is perfect, but we work to reduce risk.",
    privacy_inclusive_title: "Inclusive Language",
    privacy_inclusive_text:
      "We avoid stereotypes and use gender-neutral terms such as \"they/them,\" \"students,\" or \"learners.\" If you see content that feels exclusionary, please contact us.",
    privacy_contact_title: "Contact",
    privacy_contact_text:
      "Questions about privacy? Use the contact form in the chat widget or email us at privacy@circlesense.edu.",
    tool_theme: "Theme",
    tool_font: "Font",
    tool_color: "Color",
    tool_lang: "EN / 中文",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_eye: "Eye",
    font_md: "Normal",
    font_lg: "Large",
    font_xl: "XL",
    color_standard: "Standard",
    color_cb: "CB Safe",
    confirm_send: "Send this message to CircleSense support?",
    confirm_clear: "Are you sure you want to clear your message? This action cannot be undone.",
    warn_incomplete:
      "Please complete all required fields (name, email, and message) before submitting.",
  },
  zh: {
    brand: "圆感知 CircleSense",
    breadcrumb_home: "主页",
    breadcrumb_geometry: "几何",
    breadcrumb_circles: "圆",
    hero_kicker: "圆的几何 • 可视化 • 互动",
    hero_title: "用互动游戏与 AI 提示学透圆的几何。",
    hero_sub: "用更直观的视觉与分段规则，快速掌握定理并获得即时反馈。",
    hero_cta_primary: "开始学习",
    hero_cta_secondary: "观看概念",
    hero_badge_1: "角与弧",
    hero_badge_2: "切线技巧",
    hero_badge_3: "内接证明",
    carousel_title: "规则可视化",
    carousel_sub: "快速滑动图示，牢牢记住定理。",
    slide_1: "直径永远等于半径的两倍。",
    slide_2: "圆心角是圆周角的两倍。",
    slide_3: "切线与半径垂直相交。",
    video_slot_label: "视频位：",
    video_slot_text: "在此放置带字幕的短讲解视频。",
    rules_title: "圆的核心定理",
    rules_sub: "简洁卡片，重点更清晰。",
    rule_1_title: "半圆所对角",
    rule_1_text: "直径所对的圆周角恒为 90°。",
    rule_2_title: "圆内接四边形",
    rule_2_text: "对角之和为 180°。",
    rule_3_title: "切线性质",
    rule_3_text: "切线在切点处与半径垂直。",
    rule_4_title: "等弦等距",
    rule_4_text: "等弦到圆心的距离相等。",
    ads_label: "赞助",
    ads_text: "升级 CircleSense+，获得自适应练习包与可打印证明题。",
    ads_cta: "了解更多",
    geobot_title: "GeoBot",
    geobot_subtitle: "圆的几何助手",
    geobot_q_learn: "学习定理",
    geobot_q_play: "开始游戏",
    geobot_q_contact: "联系我们",
    form_name_label: "姓名",
    form_name_ph: "请输入姓名",
    form_email_label: "邮箱",
    form_email_ph: "you@email.com",
    form_message_label: "留言",
    form_message_ph: "输入问题或求助内容…",
    form_send: "提交",
    form_clear: "清空",
    form_back: "返回",
    privacy_text: "我们仅使用少量 Cookie 记住主题与无障碍设置，不会出售个人数据。",
    privacy_accept: "同意",
    privacy_later: "稍后",
    footer_text: "CircleSense © 2026 • 清晰学习几何。",
    footer_link_top: "返回顶部",
    footer_link_rules: "核心定理",
    footer_link_slides: "图示",
    footer_link_privacy: "隐私政策",
    privacy_back_home: "返回主页",
    privacy_title: "隐私政策",
    privacy_intro:
      "我们认为隐私是基本权利。本政策说明我们使用哪些数据、为何使用、以及你的选择。我们使用性别中立与包容性的表述，欢迎来自不同背景的学习者。",
    privacy_summary_title: "关键要点摘要",
    privacy_summary_1: "我们只收集运行学习体验所需的数据。",
    privacy_summary_2: "我们不会出售个人数据。",
    privacy_summary_3: "你可以请求访问、更正或删除你的数据。",
    privacy_summary_4: "我们通过合理的安全措施保护数据。",
    privacy_collect_title: "我们收集的数据",
    privacy_collect_1: "联系表单输入：姓名、邮箱、留言内容。",
    privacy_collect_2: "本地保存的基础使用设置（主题、字体大小、无障碍设置）。",
    privacy_collect_3: "用于诊断的设备/浏览器信息（如错误、性能）。",
    privacy_use_title: "数据如何被使用",
    privacy_use_1: "回应通过联系表单提交的咨询。",
    privacy_use_2: "记住无障碍偏好以保持一致体验。",
    privacy_use_3: "改进内容质量并修复问题。",
    privacy_not_title: "我们不会做的事",
    privacy_not_1: "不出售或出租个人数据。",
    privacy_not_2: "不基于数据做服务资格判断。",
    privacy_not_3: "不基于个人画像投放定向广告。",
    privacy_storage_title: "Cookies 与本地存储",
    privacy_storage_text:
      "我们仅在浏览器内保存最少的设置数据，例如主题、字体大小与对比度。你可以随时在浏览器中清除。",
    privacy_retention_title: "数据保留期限",
    privacy_retention_text:
      "联系表单消息仅保留至回应所需时间，随后按内部政策删除或归档。",
    privacy_third_title: "第三方服务",
    privacy_third_text:
      "本教育网站默认不使用外部统计或广告网络。如未来增加任何第三方工具，我们会清晰更新本政策。",
    privacy_students_title: "学生与未成年人",
    privacy_students_text:
      "本网站面向高中学习场景。如你为学生，请在分享个人信息前征求监护人或教师建议。",
    privacy_rights_title: "你的权利与选择",
    privacy_rights_1: "访问：请求获取你的数据副本。",
    privacy_rights_2: "更正：要求修正不准确的信息。",
    privacy_rights_3: "删除：请求移除你的数据。",
    privacy_rights_4: "反对：选择退出非必要的数据处理。",
    privacy_security_title: "安全",
    privacy_security_text:
      "我们采用合理的技术与组织措施保护数据。任何系统都不完美，但我们持续降低风险。",
    privacy_inclusive_title: "包容性语言",
    privacy_inclusive_text:
      "我们避免刻板印象，使用性别中立用语（如“他们/她们/TA”、“学生”、“学习者”）。如发现排他表述，请联系我们。",
    privacy_contact_title: "联系我们",
    privacy_contact_text:
      "如有隐私相关问题，可通过聊天组件联系表单或发送邮件至 privacy@circlesense.edu。",
    tool_theme: "主题",
    tool_font: "字体",
    tool_color: "颜色",
    tool_lang: "中文 / EN",
    theme_light: "明亮",
    theme_dark: "深色",
    theme_eye: "护眼",
    font_md: "标准",
    font_lg: "大号",
    font_xl: "特大",
    color_standard: "标准",
    color_cb: "色盲友好",
    confirm_send: "确定发送这条消息吗？",
    confirm_clear: "确定要清空你的留言吗？此操作无法撤销。",
    warn_incomplete: "请先完整填写必填项（姓名、邮箱、留言）再提交。",
  },
};

const themeModes = ["light", "dark", "eye"];
const fontModes = ["md", "lg", "xl"];
let currentThemeIndex = 0;
let currentFontIndex = 0;
let currentLang = "en";
let cbEnabled = false;

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n.en[key] || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
}

function updateTheme() {
  const mode = themeModes[currentThemeIndex];
  body.setAttribute("data-theme", mode);
  themeToggle.textContent = `${t("tool_theme")}: ${t(`theme_${mode}`)}`;
  themeToggle.setAttribute("aria-pressed", mode !== "light");
  safeSet("theme", mode);
}

function updateFont() {
  const mode = fontModes[currentFontIndex];
  const rootSize = mode === "md" ? 16 : mode === "lg" ? 17 : 19;
  document.documentElement.style.fontSize = `${rootSize}px`;
  body.setAttribute("data-font", mode);
  fontToggle.textContent = `${t("tool_font")}: ${t(`font_${mode}`)}`;
  fontToggle.setAttribute("aria-pressed", mode !== "md");
  safeSet("font", mode);
}

function updateLang() {
  body.setAttribute("data-lang", currentLang);
  document.documentElement.setAttribute("lang", currentLang);
  if (langToggle) {
    langToggle.textContent = t("tool_lang");
    langToggle.setAttribute("aria-pressed", currentLang !== "en");
  }
  applyI18n();
  if (document.querySelector("[data-i18n='privacy_title']")) {
    document.title = `CircleSense | ${t("privacy_title")}`;
  }
  window.name = `lang=${currentLang}`;
  updateTheme();
  updateFont();
  updateColorBlind();
}

function updateColorBlind() {
  body.setAttribute("data-contrast", cbEnabled ? "cb" : "normal");
  cbToggle.textContent = `${t("tool_color")}: ${t(cbEnabled ? "color_cb" : "color_standard")}`;
  cbToggle.setAttribute("aria-pressed", cbEnabled);
  safeSet("contrast", cbEnabled ? "cb" : "normal");
}

let activeIndex = 0;
let autoTimer = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });
  activeIndex = index;
}

function next() {
  showSlide((activeIndex + 1) % slides.length);
}

function prev() {
  showSlide((activeIndex - 1 + slides.length) % slides.length);
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(next, 5000);
}

function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
  }
}

function toggleChat(open) {
  if (!geobotPanel || !geobotFab) return;
  if (!open && geobotForm && geobotForm.style.display === "grid") {
    const message = geobotForm.querySelector("textarea").value.trim();
    if (message.length > 0) {
      const ok = window.confirm(t("confirm_clear"));
      if (!ok) return;
    }
  }
  geobotPanel.classList.toggle("is-open", open);
  geobotFab.setAttribute("aria-expanded", open);
  if (open && geobotDot) {
    geobotDot.style.display = "none";
  }
}

function addMessage(text, isSub = false) {
  if (!geobotBody) return;
  const msg = document.createElement("div");
  msg.className = isSub ? "geobot-msg sub" : "geobot-msg";
  msg.textContent = text;
  geobotBody.appendChild(msg);
  geobotBody.scrollTop = geobotBody.scrollHeight;
}

function showWarning(text) {
  if (!geobotWarning) return;
  geobotWarning.textContent = text;
  geobotWarning.style.display = "block";
}

function clearWarning() {
  if (!geobotWarning) return;
  geobotWarning.textContent = "";
  geobotWarning.style.display = "none";
}

function formHasContent() {
  if (!geobotForm) return false;
  const name = geobotForm.querySelector('input[name="name"]').value.trim();
  const email = geobotForm.querySelector('input[name="email"]').value.trim();
  const message = geobotForm.querySelector("textarea").value.trim();
  return name.length > 0 || email.length > 0 || message.length > 0;
}

function formIsComplete() {
  if (!geobotForm) return false;
  const name = geobotForm.querySelector('input[name="name"]').value.trim();
  const email = geobotForm.querySelector('input[name="email"]').value.trim();
  const message = geobotForm.querySelector("textarea").value.trim();
  return name.length > 0 && email.length > 0 && message.length > 0;
}

function showChatView() {
  geobotForm.style.display = "none";
  geobotBody.style.display = "grid";
  geobotQuick.style.display = "flex";
  clearWarning();
}

function addGreeting() {
  addMessage(
    "Hi there! I'm GeoBot 🤖. Ready to master circle theorems? How can I help you today?",
  );
  addMessage("你好！我是 GeoBot 🤖。准备掌握圆的定理了吗？我能如何帮助你？", true);
}

function setPrivacyAccepted() {
  safeSet("privacy", "accepted");
  if (privacyBanner) {
    privacyBanner.style.display = "none";
  }
}

function setPrivacyLater() {
  safeSet("privacy", "later");
  if (privacyBanner) {
    privacyBanner.style.display = "none";
  }
}

function init() {
  const nameLang = readLangFromWindowName();
  if (nameLang && i18n[nameLang]) {
    currentLang = nameLang;
  }
  const bodyLang = body.getAttribute("data-lang");
  if (bodyLang && i18n[bodyLang]) {
    currentLang = bodyLang;
  }
  const storedTheme = safeGet("theme");
  if (storedTheme && themeModes.includes(storedTheme)) {
    currentThemeIndex = themeModes.indexOf(storedTheme);
  }

  const storedFont = safeGet("font");
  if (storedFont && fontModes.includes(storedFont)) {
    currentFontIndex = fontModes.indexOf(storedFont);
  }

  const storedContrast = safeGet("contrast");
  cbEnabled = storedContrast === "cb";

  const storedLang = safeGet("lang");
  if (!bodyLang && storedLang && i18n[storedLang]) {
    currentLang = storedLang;
  }

  updateLang();
  if (slides.length > 0) {
    showSlide(0);
    startAuto();
  }
  if (geobotBody) {
    addGreeting();
  }

  if (privacyBanner && safeGet("privacy") === "accepted") {
    privacyBanner.style.display = "none";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentThemeIndex = (currentThemeIndex + 1) % themeModes.length;
    updateTheme();
  });
}

if (fontToggle) {
  fontToggle.addEventListener("click", () => {
    currentFontIndex = (currentFontIndex + 1) % fontModes.length;
    updateFont();
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "zh" : "en";
    safeSet("lang", currentLang);
    updateLang();
  });
}

if (cbToggle) {
  cbToggle.addEventListener("click", () => {
    cbEnabled = !cbEnabled;
    updateColorBlind();
  });
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    next();
    startAuto();
  });
}

if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    prev();
    startAuto();
  });
}

if (geobotFab) {
  geobotFab.addEventListener("click", () => toggleChat(true));
}

if (geobotClose) {
  geobotClose.addEventListener("click", () => toggleChat(false));
}

if (geobotQuick) {
  geobotQuick.addEventListener("click", (event) => {
    const action = event.target.getAttribute("data-action");
    if (!action) return;

    if (action === "contact") {
      geobotBody.style.display = "none";
      geobotQuick.style.display = "none";
      geobotForm.style.display = "grid";
      clearWarning();
      return;
    }

    if (action === "learn") {
      addMessage(
        "The angle at the center is always twice the angle at the circumference! Check out our Geometry section for more.",
      );
    }

    if (action === "play") {
      addMessage("Challenge yourself with our interactive Circle Quiz! [Link to Quiz]");
    }
  });
}

if (geobotClear) {
  geobotClear.addEventListener("click", () => {
    if (formHasContent()) {
      const ok = window.confirm(t("confirm_clear"));
      if (!ok) return;
    }
    geobotForm.reset();
    clearWarning();
  });
}

if (geobotForm) {
  geobotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formIsComplete()) {
      showWarning(t("warn_incomplete"));
      return;
    }
    addMessage("Thanks! We've received your message.");
    geobotForm.reset();
    showChatView();
  });
}

if (geobotBack) {
  geobotBack.addEventListener("click", () => {
    if (formHasContent()) {
      const ok = window.confirm(t("confirm_clear"));
      if (!ok) return;
    }
    showChatView();
  });
}

if (acceptPrivacy) {
  acceptPrivacy.addEventListener("click", setPrivacyAccepted);
}

if (dismissPrivacy) {
  dismissPrivacy.addEventListener("click", setPrivacyLater);
}

window.addEventListener("load", init);
