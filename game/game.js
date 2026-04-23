(() => {
  "use strict";

  const root = document.querySelector(".game-root");
  if (!root) return;

  const canvas = document.getElementById("goose-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const els = {
    modeSandboxBtn: document.getElementById("mode-sandbox-btn"),
    modeChallengeBtn: document.getElementById("mode-challenge-btn"),
    modePizzaBtn: document.getElementById("mode-pizza-btn"),
    panelToggleBtn: document.getElementById("panel-toggle-btn"),
    panelReopenBtn: document.getElementById("panel-reopen-btn"),
    modeDescription: document.getElementById("mode-description"),
    statusText: document.getElementById("status-text"),
    challengeCard: document.getElementById("challenge-card"),
    pizzaCard: document.getElementById("pizza-card"),
    targetGrid: document.getElementById("target-grid"),
    newTargetBtn: document.getElementById("new-target-btn"),
    checkMatchBtn: document.getElementById("check-match-btn"),
    pizzaOrderText: document.getElementById("pizza-order-text"),
    pizzaRadiusText: document.getElementById("pizza-radius-text"),
    pizzaScoreValue: document.getElementById("pizza-score-value"),
    pizzaSubmodeSliceBtn: document.getElementById("pizza-submode-slice-btn"),
    pizzaSubmodeCalcBtn: document.getElementById("pizza-submode-calc-btn"),
    pizzaSliceSection: document.getElementById("pizza-slice-section"),
    pizzaCalcSection: document.getElementById("pizza-calc-section"),
    pizzaCalcOrderText: document.getElementById("pizza-calc-order-text"),
    pizzaCalcHintText: document.getElementById("pizza-calc-hint-text"),
    pizzaAreaAnswerInput: document.getElementById("pizza-area-answer-input"),
    pizzaAreaSubmitBtn: document.getElementById("pizza-area-submit-btn"),
    pizzaAngleSlider: document.getElementById("pizza-angle-slider"),
    pizzaAngleValue: document.getElementById("pizza-angle-value"),
    pizzaSubmitBtn: document.getElementById("pizza-submit-btn"),
    resetPlayerBtn: document.getElementById("reset-player-btn"),
    similarityValue: document.getElementById("similarity-value"),
    attemptsValue: document.getElementById("attempts-value"),
    eqE1: document.getElementById("eq-e1"),
    eqE2: document.getElementById("eq-e2"),
    eqNeck: document.getElementById("eq-neck"),
    eqWing: document.getElementById("eq-wing"),
    eqEye: document.getElementById("eq-eye"),
  };

  const STORAGE = {
    mode: "orbit_goose_mode",
    panel: "orbit_goose_panel",
    player: "orbit_goose_player",
    target: "orbit_goose_target",
    attempts: "orbit_goose_attempts",
    similarity: "orbit_goose_similarity",
    pizza: "orbit_goose_pizza",
  };

  const TEXT = {
    modeSandbox:
      root.dataset.textModeSandbox ||
      "Pure math sandbox: drag all sliders and inspect continuous geometric deformation in real time.",
    modeChallenge:
      root.dataset.textModeChallenge ||
      "Challenge mode: a random target goose is generated; tune your parameter vector to maximize overlap.",
    modePizza:
      root.dataset.textModePizza ||
      "Pizza Slicer: use the angle slider to cut a sector that matches each customer order.",
    statusReadySandbox: root.dataset.textStatusReadySandbox || "Sandbox ready.",
    statusReadyChallenge: root.dataset.textStatusReadyChallenge || "Challenge ready.",
    statusReadyPizza: root.dataset.textStatusReadyPizza || "Pizza challenge ready. Drag angle and submit your slice.",
    statusNewTarget: root.dataset.textStatusNewTarget || "New random target generated.",
    statusMatchGood: root.dataset.textStatusMatchGood || "Excellent overlap. Similarity = {score}%.",
    statusMatchKeep: root.dataset.textStatusMatchKeep || "Current similarity = {score}%. Keep tuning.",
    statusPizzaGood: root.dataset.textStatusPizzaGood || "Perfect slice. Pizza score = {score}.",
    statusPizzaKeep: root.dataset.textStatusPizzaKeep || "Not exact yet. Error = {error}. Keep adjusting.",
    statusPizzaCalcGood: root.dataset.textStatusPizzaCalcGood || "Correct area. Pizza score = {score}.",
    statusPizzaCalcKeep: root.dataset.textStatusPizzaCalcKeep || "Area is off. Coefficient error = {error}.",
    tableParam: root.dataset.textTableParam || "parameter",
    tableTarget: root.dataset.textTableTarget || "target",
    tableDelta: root.dataset.textTableDelta || "abs error",
    legendPlayer: root.dataset.textLegendPlayer || "player",
    legendTarget: root.dataset.textLegendTarget || "target",
    pizzaOrderArc:
      root.dataset.textPizzaOrderArc || "Radius R = {radius}. Slice a sector whose arc length equals {value}.",
    pizzaOrderArea:
      root.dataset.textPizzaOrderArea || "Radius R = {radius}. Slice a sector whose area equals {value} cm².",
    pizzaRadius: root.dataset.textPizzaRadius || "Current pizza radius: R = {radius}",
    pizzaScore: root.dataset.textPizzaScore || "Score",
    pizzaArcLabel: root.dataset.textPizzaArcLabel || "arc edge",
    pizzaRadiusLabel: root.dataset.textPizzaRadiusLabel || "radius edge",
    pizzaSubmodeSlice: root.dataset.textPizzaSubmodeSlice || "Slice Matching",
    pizzaSubmodeCalc: root.dataset.textPizzaSubmodeCalc || "Area Calculation",
    pizzaCalcOrder:
      root.dataset.textPizzaCalcOrder || "Given radius R = {radius} and theta = {theta}°, compute the sector area in cm².",
    pizzaCalcOrderRT:
      root.dataset.textPizzaCalcOrderRt ||
      "Given radius R = {radius} cm and central angle θ = {theta}°, compute sector area S (cm²).",
    pizzaCalcOrderLR:
      root.dataset.textPizzaCalcOrderLr ||
      "Given arc length L = {arc} cm and radius R = {radius} cm, compute sector area S (cm²).",
    pizzaCalcOrderLT:
      root.dataset.textPizzaCalcOrderLt ||
      "Given arc length L = {arc} cm and central angle θ = {theta}°, compute sector area S (cm²).",
    pizzaCalcHint: root.dataset.textPizzaCalcHint || "Enter area expression.",
    showPanel: root.dataset.textShowPanel || "Show Panel",
    hidePanel: root.dataset.textHidePanel || "Hide Panel",
  };

  const STATUS_TEMPLATES = {
    readySandbox: TEXT.statusReadySandbox,
    readyChallenge: TEXT.statusReadyChallenge,
    readyPizza: TEXT.statusReadyPizza,
    newTarget: TEXT.statusNewTarget,
    matchGood: TEXT.statusMatchGood,
    matchKeep: TEXT.statusMatchKeep,
    pizzaGood: TEXT.statusPizzaGood,
    pizzaKeep: TEXT.statusPizzaKeep,
    pizzaCalcGood: TEXT.statusPizzaCalcGood,
    pizzaCalcKeep: TEXT.statusPizzaCalcKeep,
  };

  const PARAMS = [
    { key: "x1", symbol: "X1_center", min: -2.0, max: 2.0, step: 0.1, digits: 2 },
    { key: "y1", symbol: "Y1_center", min: -1.5, max: 1.5, step: 0.1, digits: 2 },
    { key: "a1", symbol: "a1", min: 2.2, max: 4.8, step: 0.1, digits: 2 },
    { key: "e1", symbol: "e1", min: 0.0, max: 0.92, step: 0.01, digits: 2 },
    { key: "phi1", symbol: "phi1", min: 0.0, max: Math.PI * 2, step: 0.01, digits: 2 },

    { key: "x2", symbol: "X2_center", min: 1.8, max: 5.8, step: 0.1, digits: 2 },
    { key: "y2", symbol: "Y2_center", min: 1.2, max: 4.8, step: 0.1, digits: 2 },
    { key: "a2", symbol: "a2", min: 0.8, max: 2.2, step: 0.1, digits: 2 },
    { key: "e2", symbol: "e2", min: 0.0, max: 0.92, step: 0.01, digits: 2 },
    { key: "phi2", symbol: "phi2", min: 0.0, max: Math.PI * 2, step: 0.01, digits: 2 },

    { key: "l", symbol: "L", min: 2.0, max: 8.0, step: 0.1, digits: 2 },
    { key: "kappa", symbol: "kappa", min: -3.0, max: 3.0, step: 0.1, digits: 2 },
    { key: "phi3", symbol: "phi3", min: 0.0, max: Math.PI * 2, step: 0.01, digits: 2 },

    { key: "d", symbol: "D", min: 0.15, max: 1.6, step: 0.01, digits: 2 },
    { key: "a3", symbol: "a3", min: 0.06, max: 0.5, step: 0.01, digits: 2 },
    { key: "e3", symbol: "e3", min: 0.0, max: 0.95, step: 0.01, digits: 2 },
  ];

  const DEFAULT_PLAYER = {
    x1: 0.0,
    y1: -0.1,
    a1: 3.2,
    e1: 0.25,
    phi1: 0.35,

    x2: 3.6,
    y2: 2.8,
    a2: 1.4,
    e2: 0.18,
    phi2: 0.12,

    l: 4.2,
    kappa: 1.6,
    phi3: 1.1,

    d: 0.62,
    a3: 0.16,
    e3: 0.25,
  };

  const WORLD = {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
  };

  const PIZZA_IMAGE_SOURCES = [
    "assets/pizza-real.png",
    "assets/assets:pizza-real.png",
    "assets/pizza-real-2.png",
    "assets/assets:pizza-real-2.png",
    "assets/pizza-real-3.png",
    "assets/pizza-2.png",
    "assets/pizza-3.png",
    "assets/pizza-alt.png",
    "assets/pizza-new.png",
    "assets/pizza-bacon.png",
    "assets/pizza-real.jpg",
    "assets/pizza-real-2.jpg",
    "assets/pizza-real-3.jpg",
    "assets/pizza-2.jpg",
    "assets/pizza-3.jpg",
    "assets/pizza-alt.jpg",
    "assets/pizza-new.jpg",
    "assets/pizza-bacon.jpg",
    "assets/pizza-real.webp",
    "assets/pizza-real-2.webp",
    "assets/pizza-2.webp",
    "assets/pizza.webp",
    "assets/pizza-photo.png",
    "assets/pizza-photo.jpg",
    "assets/pizza.png",
    "assets/pizza.jpg",
    "pizza-real.png",
    "pizza-real.jpg",
    "pizza.png",
    "pizza.jpg",
  ];

  const PALETTE_NORMAL = {
    canvasBg: "#f7fbff",
    axis: "#4f6fa3",
    major: "#9cb2cf",
    minor: "#c4d2e6",
    tick: "#465f87",
    legendBg: "rgba(255,255,255,0.88)",
    legendText: "#0f172a",
    player: "#0ea5e9",
    playerFill: "rgba(14,165,233,0.1)",
    target: "#ec4899",
  };

  const PALETTE_DARK = {
    canvasBg: "#070d18",
    axis: "#67e8f9",
    major: "#2b4e69",
    minor: "#1b3348",
    tick: "#93c5fd",
    legendBg: "rgba(10,20,35,0.84)",
    legendText: "#e2e8f0",
    player: "#22d3ee",
    playerFill: "rgba(34,211,238,0.11)",
    target: "#f472b6",
  };

  const PALETTE_CB = {
    canvasBg: "#fffdf6",
    axis: "#604a00",
    major: "#a28c3f",
    minor: "#dacc9a",
    tick: "#604a00",
    legendBg: "rgba(255,250,235,0.94)",
    legendText: "#2b1f00",
    player: "#005eb8",
    playerFill: "rgba(0,94,184,0.11)",
    target: "#d94801",
  };

  const PALETTE_CB_DARK = {
    canvasBg: "#071522",
    axis: "#7dd3fc",
    major: "#2b5a79",
    minor: "#1c3f56",
    tick: "#bae6fd",
    legendBg: "rgba(7,21,34,0.86)",
    legendText: "#e0f2fe",
    player: "#38bdf8",
    playerFill: "rgba(56,189,248,0.14)",
    target: "#f59e0b",
  };

  const PALETTE_EYE = {
    canvasBg: "#f6f2e7",
    axis: "#8b5e34",
    major: "#c5a97a",
    minor: "#e4d5b8",
    tick: "#6e4c2e",
    legendBg: "rgba(252,250,244,0.9)",
    legendText: "#1f2937",
    player: "#0ea5a4",
    playerFill: "rgba(14,165,164,0.12)",
    target: "#b45309",
  };

  const state = {
    mode: "sandbox",
    panelCollapsed: false,
    player: { ...DEFAULT_PLAYER },
    target: null,
    attempts: 0,
    similarity: null,
    pizza: {
      subMode: "slice",
      radius: 10,
      thetaDeg: 90,
      targetType: "arc",
      targetValue: 0,
      targetCoeff: 0,
      targetThetaDeg: 90,
      orderText: "",
      calcRadius: 10,
      calcThetaDeg: 90,
      calcArcCoeff: 5,
      calcQuestionType: "rt",
      calcTargetCoeff: 0,
      calcOrderText: "",
      calcAnswerRaw: "",
      calcAnswerCoeff: null,
      score: 0,
      level: 1,
      toppings: [],
      flashUntil: 0,
      flashRaf: 0,
    },
    statusKey: "readySandbox",
    statusVars: {},
    width: 1,
    height: 1,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  };

  const pizzaTexture = {
    images: [],
    currentIndex: -1,
    lastIndex: -1,
    ready: false,
    attempted: false,
    loadedSources: new Set(),
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
      // ignore
    }
  }

  function safeParse(raw, fallback) {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function fixed(v, d = 2) {
    return Number(v).toFixed(d);
  }

  function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  function randomPick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function pickPizzaCalcQuestionType() {
    const r = Math.random();
    if (r < 0.15) return "rt";
    if (r < 0.575) return "lr";
    return "lt";
  }

  function formatPiTerm(value) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (Math.abs(abs - 1) < 1e-9) return sign + "π";
    const decimals = abs >= 20 ? 0 : abs >= 10 ? 1 : 2;
    return sign + fixed(abs, decimals).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1") + "π";
  }

  function normalizePiText(text) {
    if (typeof text !== "string") return "";
    return text.replace(/pi/gi, "π");
  }

  function parsePizzaAreaAnswerCoeff(raw) {
    if (typeof raw !== "string") return null;
    let text = raw.trim();
    if (!text) return null;

    text = text
      .replace(/\s+/g, "")
      .replace(/，/g, ",")
      .replace(/[Ｐｐ]/g, "p")
      .replace(/[Ｉｉ]/g, "i")
      .replace(/π/g, "pi")
      .replace(/^s=/i, "")
      .replace(/^a=/i, "")
      .replace(/cm²/gi, "")
      .replace(/cm\^2/gi, "")
      .replace(/cm2/gi, "");

    if (!text) return null;

    if (text.includes("pi")) {
      let coeff = text.split("pi")[0];
      coeff = coeff.replace(/\*$/g, "");
      if (coeff === "" || coeff === "+") return 1;
      if (coeff === "-") return -1;
      const v = Number(coeff);
      return Number.isFinite(v) ? v : null;
    }

    const v = Number(text);
    return Number.isFinite(v) ? v : null;
  }

  function interpolate(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : ""));
  }

  function loadPizzaTexture(forceRetry = false) {
    if (pizzaTexture.attempted && !forceRetry) return;
    pizzaTexture.attempted = true;

    if (forceRetry) {
      pizzaTexture.images = [];
      pizzaTexture.loadedSources = new Set();
      pizzaTexture.currentIndex = -1;
      pizzaTexture.lastIndex = -1;
      pizzaTexture.ready = false;
    }

    const sources = PIZZA_IMAGE_SOURCES.slice();
    sources.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (pizzaTexture.loadedSources.has(src)) return;
        pizzaTexture.loadedSources.add(src);
        pizzaTexture.images.push({ src, img });
        pizzaTexture.ready = pizzaTexture.images.length > 0;
        if (pizzaTexture.currentIndex < 0) {
          pizzaTexture.currentIndex = 0;
          pizzaTexture.lastIndex = 0;
        }
        render();
      };
      img.onerror = () => {
        // ignore missing files
      };
      img.src = src;
    });
  }

  function chooseNextPizzaImage() {
    const count = pizzaTexture.images.length;
    if (count <= 0) return;
    if (count === 1) {
      pizzaTexture.currentIndex = 0;
      pizzaTexture.lastIndex = 0;
      return;
    }
    let next = Math.floor(Math.random() * count);
    if (next === pizzaTexture.lastIndex) {
      next = (next + 1 + Math.floor(Math.random() * (count - 1))) % count;
    }
    pizzaTexture.currentIndex = next;
    pizzaTexture.lastIndex = next;
  }

  function currentPizzaImage() {
    if (!pizzaTexture.ready || pizzaTexture.images.length <= 0) return null;
    const idx = clamp(pizzaTexture.currentIndex, 0, pizzaTexture.images.length - 1);
    return pizzaTexture.images[idx].img;
  }

  function isColorBlindMode() {
    return document.body.getAttribute("data-contrast") === "cb";
  }

  function isDarkThemeMode() {
    return document.body.getAttribute("data-theme") === "dark";
  }

  function isEyeThemeMode() {
    return document.body.getAttribute("data-theme") === "eye";
  }

  function palette() {
    if (isDarkThemeMode() && isColorBlindMode()) return PALETTE_CB_DARK;
    if (isColorBlindMode()) return PALETTE_CB;
    if (isDarkThemeMode()) return PALETTE_DARK;
    if (isEyeThemeMode()) return PALETTE_EYE;
    return PALETTE_NORMAL;
  }

  function sanitizePlayer(raw) {
    const next = { ...DEFAULT_PLAYER };
    PARAMS.forEach((meta) => {
      const v = Number(raw[meta.key]);
      if (Number.isFinite(v)) {
        next[meta.key] = clamp(v, meta.min, meta.max);
      }
    });
    return next;
  }

  function randomTarget() {
    const out = {};
    PARAMS.forEach((meta) => {
      const count = Math.floor((meta.max - meta.min) / meta.step);
      const idx = Math.floor(Math.random() * (count + 1));
      out[meta.key] = Number((meta.min + idx * meta.step).toFixed(meta.digits));
    });
    return out;
  }

  function createPizzaToppings(radius) {
    const colors = ["#ef4444", "#f97316", "#7c3aed", "#16a34a", "#ca8a04"];
    const count = 8 + Math.floor(radius / 2);
    const out = [];
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const dist = radius * (0.2 + Math.random() * 0.62);
      out.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        r: 0.26 + Math.random() * 0.25,
        c: randomPick(colors),
      });
    }
    return out;
  }

  function activePizzaRadius() {
    return state.pizza.subMode === "calc" ? state.pizza.calcRadius : state.pizza.radius;
  }

  function activePizzaThetaDeg() {
    return state.pizza.subMode === "calc" ? state.pizza.calcThetaDeg : state.pizza.thetaDeg;
  }

  function generatePizzaOrder() {
    const level = Math.max(1, state.pizza.level);
    const radii = level < 4 ? [8, 10, 12] : [8, 9, 10, 11, 12];
    const angleStep = level < 3 ? 15 : level < 6 ? 10 : 5;
    const candidates = [];
    for (let angle = 30; angle <= 330; angle += angleStep) {
      candidates.push(angle);
    }

    state.pizza.radius = randomPick(radii);
    state.pizza.targetThetaDeg = randomPick(candidates);
    state.pizza.targetType = Math.random() < 0.5 ? "arc" : "area";

    if (state.pizza.targetType === "arc") {
      state.pizza.targetCoeff = (state.pizza.targetThetaDeg * state.pizza.radius) / 180;
      state.pizza.targetValue = state.pizza.targetCoeff * Math.PI;
      state.pizza.orderText = normalizePiText(interpolate(TEXT.pizzaOrderArc, {
        radius: state.pizza.radius,
        value: formatPiTerm(state.pizza.targetCoeff),
      }));
    } else {
      state.pizza.targetCoeff = (state.pizza.targetThetaDeg * state.pizza.radius * state.pizza.radius) / 360;
      state.pizza.targetValue = state.pizza.targetCoeff * Math.PI;
      state.pizza.orderText = normalizePiText(interpolate(TEXT.pizzaOrderArea, {
        radius: state.pizza.radius,
        value: formatPiTerm(state.pizza.targetCoeff),
      }));
    }

    state.pizza.thetaDeg = 90;
    state.pizza.toppings = createPizzaToppings(state.pizza.radius);
    chooseNextPizzaImage();
  }

  function generatePizzaCalcOrder() {
    const level = Math.max(1, state.pizza.level);
    const radii = level < 4 ? [8, 10, 12] : [8, 9, 10, 11, 12];
    const angleStep = level < 3 ? 20 : level < 6 ? 15 : 10;
    const candidates = [];
    for (let angle = 30; angle <= 330; angle += angleStep) {
      candidates.push(angle);
    }

    state.pizza.calcRadius = randomPick(radii);
    state.pizza.calcThetaDeg = randomPick(candidates);
    state.pizza.calcArcCoeff = (state.pizza.calcThetaDeg * state.pizza.calcRadius) / 180;
    state.pizza.calcQuestionType = pickPizzaCalcQuestionType();

    const arcText = formatPiTerm(state.pizza.calcArcCoeff);
    if (state.pizza.calcQuestionType === "lr") {
      state.pizza.calcTargetCoeff = (state.pizza.calcArcCoeff * state.pizza.calcRadius) / 2;
      state.pizza.calcOrderText = normalizePiText(interpolate(TEXT.pizzaCalcOrderLR, {
        arc: arcText,
        radius: state.pizza.calcRadius,
      }));
    } else if (state.pizza.calcQuestionType === "lt") {
      state.pizza.calcTargetCoeff = (90 * state.pizza.calcArcCoeff * state.pizza.calcArcCoeff) / state.pizza.calcThetaDeg;
      state.pizza.calcOrderText = normalizePiText(interpolate(TEXT.pizzaCalcOrderLT, {
        arc: arcText,
        theta: state.pizza.calcThetaDeg,
      }));
    } else {
      state.pizza.calcTargetCoeff = (state.pizza.calcThetaDeg * state.pizza.calcRadius * state.pizza.calcRadius) / 360;
      state.pizza.calcOrderText = normalizePiText(interpolate(TEXT.pizzaCalcOrderRT, {
        radius: state.pizza.calcRadius,
        theta: state.pizza.calcThetaDeg,
      }));
    }

    state.pizza.calcAnswerRaw = "";
    state.pizza.calcAnswerCoeff = null;
    state.pizza.toppings = createPizzaToppings(state.pizza.calcRadius);
    chooseNextPizzaImage();
  }

  function currentPizzaMeasurement() {
    const thetaRad = degreesToRadians(state.pizza.thetaDeg);
    if (state.pizza.targetType === "arc") {
      return thetaRad * state.pizza.radius;
    }
    return (thetaRad * state.pizza.radius * state.pizza.radius) / 2;
  }

  function getBFromAE(a, e) {
    return a * Math.sqrt(Math.max(0, 1 - e * e));
  }

  function vec(x, y) {
    return { x, y };
  }

  function add(p, q) {
    return { x: p.x + q.x, y: p.y + q.y };
  }

  function mul(p, s) {
    return { x: p.x * s, y: p.y * s };
  }

  function rot(p, phi) {
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
  }

  function ellipsePoint(cx, cy, a, b, phi, theta) {
    return add(vec(cx, cy), rot(vec(a * Math.cos(theta), b * Math.sin(theta)), phi));
  }

  function getGeometry(p) {
    const b1 = getBFromAE(p.a1, p.e1);
    const b2 = getBFromAE(p.a2, p.e2);
    const b3 = getBFromAE(p.a3, p.e3);

    const e1 = { cx: p.x1, cy: p.y1, a: p.a1, b: b1, phi: p.phi1 };
    const e2 = { cx: p.x2, cy: p.y2, a: p.a2, b: b2, phi: p.phi2 };

    const u = vec(Math.cos(p.phi3), Math.sin(p.phi3));
    const v = vec(-Math.sin(p.phi3), Math.cos(p.phi3));

    const neckP0 = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 0.2 * Math.PI);
    const neckP3 = ellipsePoint(e2.cx, e2.cy, e2.a, e2.b, e2.phi, 1.08 * Math.PI);
    const neckP1 = add(neckP0, add(mul(u, p.l * 0.34), mul(v, p.kappa * 0.5)));
    const neckP2 = add(neckP3, add(mul(u, -p.l * 0.3), mul(v, p.kappa * 0.44)));

    const wingP0 = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 0.98 * Math.PI);
    const wingP3 = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 1.8 * Math.PI);
    const wingP1 = add(wingP0, add(mul(u, p.l * 0.5), mul(v, -p.kappa * 0.88 - 0.2)));
    const wingP2 = add(wingP3, add(mul(u, p.l * 0.36), mul(v, -p.kappa * 0.78 - 0.1)));

    const wing2P0 = wingP3;
    const wing2P3 = wingP0;
    const wing2P1 = add(wing2P0, add(mul(u, p.l * 0.2), mul(v, p.kappa * 0.3)));
    const wing2P2 = add(wing2P3, add(mul(u, p.l * 0.12), mul(v, p.kappa * 0.16)));

    const eyeCenter = vec(p.x2, p.y2);
    const eyeAxisShift = p.a2 * 0.18;
    const eyeLeft = add(eyeCenter, rot(vec(-p.d / 2, eyeAxisShift), p.phi2));
    const eyeRight = add(eyeCenter, rot(vec(p.d / 2, eyeAxisShift), p.phi2));

    const beakBase = ellipsePoint(e2.cx, e2.cy, e2.a, e2.b, e2.phi, 0.03 * Math.PI);
    const beakTip = add(beakBase, rot(vec(p.a2 * 1.15, p.a2 * 0.05), p.phi2));
    const beakCtrlUp = add(beakBase, rot(vec(p.a2 * 0.56, p.a2 * 0.38), p.phi2));
    const beakCtrlLow = add(beakBase, rot(vec(p.a2 * 0.56, -p.a2 * 0.3), p.phi2));

    const tailRootTop = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 1.07 * Math.PI);
    const tailRootBottom = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 0.93 * Math.PI);
    const tailTip = add(tailRootTop, rot(vec(-p.a1 * 0.85, p.a1 * 0.08), e1.phi - 0.2));
    const tailCtrl1 = add(tailRootTop, rot(vec(-p.a1 * 0.45, p.a1 * 0.52), e1.phi));
    const tailCtrl2 = add(tailRootBottom, rot(vec(-p.a1 * 0.52, -p.a1 * 0.52), e1.phi));

    const leg1Top = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 1.36 * Math.PI);
    const leg2Top = ellipsePoint(e1.cx, e1.cy, e1.a, e1.b, e1.phi, 1.64 * Math.PI);
    const legDrop = Math.max(1.1, p.a1 * 0.85);
    const legDir = rot(vec(0.0, -1), p.phi1 * 0.22);
    const leg1Knee = add(leg1Top, add(mul(legDir, legDrop * 0.46), rot(vec(0.24, 0), p.phi1)));
    const leg1End = add(leg1Top, mul(legDir, legDrop));
    const leg2Knee = add(leg2Top, add(mul(legDir, legDrop * 0.48), rot(vec(0.22, 0), p.phi1)));
    const leg2End = add(leg2Top, mul(legDir, legDrop * 1.04));

    return {
      e1,
      e2,
      b3,
      neck: { p0: neckP0, p1: neckP1, p2: neckP2, p3: neckP3 },
      wing1: { p0: wingP0, p1: wingP1, p2: wingP2, p3: wingP3 },
      wing2: { p0: wing2P0, p1: wing2P1, p2: wing2P2, p3: wing2P3 },
      eyeLeft,
      eyeRight,
      eyeA: p.a3,
      eyeB: b3,
      eyePhi: p.phi2,
      beak: { base: beakBase, tip: beakTip, ctrlUp: beakCtrlUp, ctrlLow: beakCtrlLow },
      tail: { p0: tailRootTop, p1: tailCtrl1, p2: tailCtrl2, p3: tailRootBottom, tip: tailTip },
      leg1: { top: leg1Top, knee: leg1Knee, end: leg1End },
      leg2: { top: leg2Top, knee: leg2Knee, end: leg2End },
    };
  }

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    state.width = Math.max(320, Math.floor(rect.width));
    state.height = Math.max(280, Math.floor(rect.height));

    canvas.width = Math.floor(state.width * dpr);
    canvas.height = Math.floor(state.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sx = state.width / (WORLD.xMax - WORLD.xMin);
    const sy = state.height / (WORLD.yMax - WORLD.yMin);
    state.scale = Math.min(sx, sy);

    const usedW = state.scale * (WORLD.xMax - WORLD.xMin);
    const usedH = state.scale * (WORLD.yMax - WORLD.yMin);
    state.offsetX = (state.width - usedW) / 2;
    state.offsetY = (state.height - usedH) / 2;
  }

  function worldToScreen(p) {
    return {
      x: state.offsetX + (p.x - WORLD.xMin) * state.scale,
      y: state.height - (state.offsetY + (p.y - WORLD.yMin) * state.scale),
    };
  }

  function drawGrid(theme) {
    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = theme.canvasBg;
    ctx.fillRect(0, 0, state.width, state.height);

    for (let x = WORLD.xMin; x <= WORLD.xMax + 1e-9; x += 0.5) {
      const p1 = worldToScreen(vec(x, WORLD.yMin));
      const p2 = worldToScreen(vec(x, WORLD.yMax));
      const isAxis = Math.abs(x) < 1e-9;
      const isMajor = Math.abs(x - Math.round(x)) < 1e-9;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      if (isAxis) {
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.95;
      } else if (isMajor) {
        ctx.strokeStyle = theme.major;
        ctx.lineWidth = 0.95;
        ctx.globalAlpha = 0.55;
      } else {
        ctx.strokeStyle = theme.minor;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = 0.52;
      }
      ctx.stroke();
    }

    for (let y = WORLD.yMin; y <= WORLD.yMax + 1e-9; y += 0.5) {
      const p1 = worldToScreen(vec(WORLD.xMin, y));
      const p2 = worldToScreen(vec(WORLD.xMax, y));
      const isAxis = Math.abs(y) < 1e-9;
      const isMajor = Math.abs(y - Math.round(y)) < 1e-9;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      if (isAxis) {
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.95;
      } else if (isMajor) {
        ctx.strokeStyle = theme.major;
        ctx.lineWidth = 0.95;
        ctx.globalAlpha = 0.55;
      } else {
        ctx.strokeStyle = theme.minor;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = 0.52;
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    drawAxisTicks(theme);
  }

  function drawAxisTicks(theme) {
    const origin = worldToScreen(vec(0, 0));
    ctx.save();
    ctx.fillStyle = theme.tick;
    ctx.font = "12px 'Avenir Next', 'Trebuchet MS', sans-serif";

    for (let x = -9; x <= 9; x += 1) {
      if (x === 0) continue;
      const p = worldToScreen(vec(x, 0));
      if (p.x < 0 || p.x > state.width) continue;
      ctx.fillText(String(x), p.x - 3, origin.y + 14);
    }

    for (let y = -7; y <= 7; y += 1) {
      if (y === 0) continue;
      const p = worldToScreen(vec(0, y));
      if (p.y < 0 || p.y > state.height) continue;
      ctx.fillText(String(y), origin.x + 6, p.y + 4);
    }

    ctx.restore();
  }

  function drawEllipse(center, a, b, phi, style) {
    const c = worldToScreen(vec(center.cx, center.cy));
    const rx = Math.max(0.01, a * state.scale);
    const ry = Math.max(0.01, b * state.scale);

    ctx.save();
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.width;
    ctx.setLineDash(style.dash || []);
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, rx, ry, -phi, 0, Math.PI * 2);
    if (style.fill) {
      ctx.fillStyle = style.fill;
      ctx.globalAlpha = style.fillAlpha == null ? 0.12 : style.fillAlpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawCubic(curve, style) {
    const p0 = worldToScreen(curve.p0);
    const p1 = worldToScreen(curve.p1);
    const p2 = worldToScreen(curve.p2);
    const p3 = worldToScreen(curve.p3);

    ctx.save();
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.width;
    ctx.setLineDash(style.dash || []);
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();
    ctx.restore();
  }

  function drawQuadratic(p0, p1, p2, style) {
    const s0 = worldToScreen(p0);
    const s1 = worldToScreen(p1);
    const s2 = worldToScreen(p2);

    ctx.save();
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.width;
    ctx.setLineDash(style.dash || []);
    ctx.beginPath();
    ctx.moveTo(s0.x, s0.y);
    ctx.quadraticCurveTo(s1.x, s1.y, s2.x, s2.y);
    ctx.stroke();
    ctx.restore();
  }

  function drawGoose(geo, style) {
    drawEllipse(geo.e1, geo.e1.a, geo.e1.b, geo.e1.phi, style);
    drawEllipse(geo.e2, geo.e2.a, geo.e2.b, geo.e2.phi, style);

    drawCubic(geo.neck, style);
    drawCubic(geo.wing1, style);
    drawCubic(geo.wing2, style);

    drawEllipse({ cx: geo.eyeLeft.x, cy: geo.eyeLeft.y }, geo.eyeA, geo.eyeB, geo.eyePhi, {
      stroke: style.stroke,
      width: Math.max(1, style.width - 0.7),
      dash: style.dash,
      fill: null,
    });
    drawEllipse({ cx: geo.eyeRight.x, cy: geo.eyeRight.y }, geo.eyeA, geo.eyeB, geo.eyePhi, {
      stroke: style.stroke,
      width: Math.max(1, style.width - 0.7),
      dash: style.dash,
      fill: null,
    });

    drawQuadratic(geo.beak.base, geo.beak.ctrlUp, geo.beak.tip, style);
    drawQuadratic(geo.beak.base, geo.beak.ctrlLow, geo.beak.tip, style);

    drawCubic({ p0: geo.tail.p0, p1: geo.tail.p1, p2: geo.tail.p2, p3: geo.tail.p3 }, style);
    drawQuadratic(geo.tail.p0, geo.tail.tip, geo.tail.p3, style);

    drawQuadratic(geo.leg1.top, geo.leg1.knee, geo.leg1.end, style);
    drawQuadratic(geo.leg2.top, geo.leg2.knee, geo.leg2.end, style);
  }

  function drawPizzaScene(theme) {
    loadPizzaTexture();

    const center = {
      x: state.width * 0.52,
      y: state.height * 0.52,
    };
    const radiusPx = Math.max(120, Math.min(state.width, state.height) * 0.36);

    const crustColor = isColorBlindMode() ? "#8a6a00" : "#b45309";
    const cheeseColor = isDarkThemeMode() ? "#f59e0b" : isEyeThemeMode() ? "#f2c14e" : "#fbbf24";
    const sauceColor = isDarkThemeMode() ? "#f97316" : isEyeThemeMode() ? "#d97706" : "#fb923c";
    const sliceColor = isColorBlindMode() ? "#005eb8" : "#f43f5e";
    const currentImage = currentPizzaImage();
    const activeThetaDeg = activePizzaThetaDeg();
    const activeRadius = activePizzaRadius();

    ctx.save();

    ctx.save();
    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusPx, 0, Math.PI * 2);
    ctx.clip();

    if (pizzaTexture.ready && currentImage) {
      const img = currentImage;
      const srcMin = Math.min(img.width, img.height);
      const cropScale = 0.76;
      const cropSize = srcMin * cropScale;
      const sx = (img.width - cropSize) * 0.5;
      const sy = (img.height - cropSize) * 0.5;

      ctx.drawImage(
        img,
        sx,
        sy,
        cropSize,
        cropSize,
        center.x - radiusPx,
        center.y - radiusPx,
        radiusPx * 2,
        radiusPx * 2
      );
      const shine = ctx.createRadialGradient(
        center.x - radiusPx * 0.24,
        center.y - radiusPx * 0.3,
        radiusPx * 0.18,
        center.x,
        center.y,
        radiusPx
      );
      shine.addColorStop(0, "rgba(255,255,255,0.18)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.fillRect(center.x - radiusPx, center.y - radiusPx, radiusPx * 2, radiusPx * 2);
    } else {
      ctx.beginPath();
      ctx.arc(center.x, center.y, radiusPx, 0, Math.PI * 2);
      ctx.fillStyle = sauceColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(center.x, center.y, radiusPx * 0.89, 0, Math.PI * 2);
      ctx.fillStyle = cheeseColor;
      ctx.fill();

      state.pizza.toppings.forEach((top) => {
        const scale = radiusPx / Math.max(1, activeRadius);
        const p = {
          x: center.x + top.x * scale,
          y: center.y - top.y * scale,
        };
        ctx.beginPath();
        ctx.arc(p.x, p.y, top.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = top.c;
        ctx.globalAlpha = 0.84;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    ctx.restore();

    const theta = degreesToRadians(activeThetaDeg);
    const startAngle = -Math.PI / 2;
    const midAngle = startAngle + theta / 2;
    const explode = radiusPx * 0.035;
    const sliceRadius = radiusPx * 0.985;
    const cx = center.x + Math.cos(midAngle) * explode;
    const cy = center.y + Math.sin(midAngle) * explode;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, sliceRadius, startAngle, startAngle + theta);
    ctx.closePath();
    ctx.fillStyle = sliceColor;
    ctx.globalAlpha = 0.32;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = sliceColor;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    const r1x = cx + Math.cos(startAngle) * sliceRadius;
    const r1y = cy + Math.sin(startAngle) * sliceRadius;
    const r2x = cx + Math.cos(startAngle + theta) * sliceRadius;
    const r2y = cy + Math.sin(startAngle + theta) * sliceRadius;
    ctx.strokeStyle = theme.axis;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(r1x, r1y);
    ctx.moveTo(cx, cy);
    ctx.lineTo(r2x, r2y);
    ctx.stroke();

    if (activeThetaDeg > 4) {
      ctx.strokeStyle = theme.tick;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, sliceRadius, startAngle, startAngle + theta);
      ctx.stroke();
    }

    ctx.fillStyle = theme.legendText;
    ctx.font = "12px 'Avenir Next', 'Trebuchet MS', sans-serif";
    const arcLabelAngle = startAngle + theta * 0.65;
    const arcLabelX = cx + Math.cos(arcLabelAngle) * sliceRadius * 1.03;
    const arcLabelY = cy + Math.sin(arcLabelAngle) * sliceRadius * 1.03;
    ctx.fillText(TEXT.pizzaArcLabel, arcLabelX - 18, arcLabelY);

    const radiusLabelX = cx + Math.cos(startAngle + theta) * sliceRadius * 0.52;
    const radiusLabelY = cy + Math.sin(startAngle + theta) * sliceRadius * 0.52;
    ctx.fillText(TEXT.pizzaRadiusLabel, radiusLabelX - 18, radiusLabelY - 4);

    const thetaText = "theta = " + fixed(activeThetaDeg, 1) + "°";
    ctx.fillStyle = theme.legendBg;
    ctx.fillRect(14, 14, 160, 26);
    ctx.fillStyle = theme.legendText;
    ctx.fillText(thetaText, 22, 31);

    if (state.pizza.flashUntil > 0) {
      const now = performance.now();
      if (now < state.pizza.flashUntil) {
        const t = (state.pizza.flashUntil - now) / 420;
        ctx.strokeStyle = isColorBlindMode() ? "#005eb8" : "#22c55e";
        ctx.globalAlpha = Math.max(0, Math.min(1, t));
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radiusPx + 16 * (1 - t), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusPx, 0, Math.PI * 2);
    ctx.strokeStyle = pizzaTexture.ready ? "rgba(180, 83, 9, 0.55)" : crustColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  function drawLegend(theme) {
    const width = state.mode === "challenge" ? 250 : 140;
    ctx.save();
    ctx.fillStyle = theme.legendBg;
    ctx.fillRect(14, 14, width, 46);

    ctx.strokeStyle = theme.player;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(24, 28);
    ctx.lineTo(42, 28);
    ctx.stroke();

    ctx.fillStyle = theme.legendText;
    ctx.font = "13px 'Avenir Next', 'Trebuchet MS', sans-serif";
    ctx.fillText(TEXT.legendPlayer, 50, 32);

    if (state.mode === "challenge") {
      ctx.strokeStyle = theme.target;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(24, 45);
      ctx.lineTo(42, 45);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText(TEXT.legendTarget, 50, 49);
    }

    ctx.restore();
  }

  function render() {
    const theme = palette();

    if (state.mode === "pizza") {
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.fillStyle = isDarkThemeMode() ? "#101827" : isEyeThemeMode() ? "#f6f2e7" : "#f6f1e7";
      ctx.fillRect(0, 0, state.width, state.height);
      drawPizzaScene(theme);
      return;
    }

    drawGrid(theme);

    if (state.mode === "challenge" && state.target) {
      const targetGeo = getGeometry(state.target);
      drawGoose(targetGeo, {
        stroke: theme.target,
        width: 2.05,
        dash: [8, 5],
        fill: null,
      });
    }

    const playerGeo = getGeometry(state.player);
    drawGoose(playerGeo, {
      stroke: theme.player,
      width: 2.35,
      dash: [],
      fill: theme.playerFill,
      fillAlpha: 0.1,
    });

    drawLegend(theme);
  }

  function panelButtonText() {
    return state.panelCollapsed ? TEXT.showPanel : TEXT.hidePanel;
  }

  function initSliderRanges() {
    PARAMS.forEach((meta) => {
      const input = document.getElementById("param-" + meta.key);
      if (!input) return;
      input.min = String(meta.min);
      input.max = String(meta.max);
      input.step = String(meta.step);
    });
  }

  function updateSliderUI() {
    PARAMS.forEach((meta) => {
      const input = document.getElementById("param-" + meta.key);
      const output = document.getElementById("value-" + meta.key);
      if (!input || !output) return;
      input.value = String(state.player[meta.key]);
      output.textContent = fixed(state.player[meta.key], meta.digits);
    });
  }

  function buildTargetGrid() {
    if (!els.targetGrid) return;
    const rows = PARAMS.map((meta) => {
      return (
        "<div class=\"target-row\">" +
        `<span class="col-param">${meta.symbol}</span>` +
        `<span class="col-target" id="target-${meta.key}">--</span>` +
        `<span class="col-delta" id="delta-${meta.key}">--</span>` +
        "</div>"
      );
    }).join("");

    els.targetGrid.innerHTML =
      "<div class=\"target-row header\">" +
      `<span id="th-param">${TEXT.tableParam}</span>` +
      `<span id="th-target">${TEXT.tableTarget}</span>` +
      `<span id="th-delta">${TEXT.tableDelta}</span>` +
      "</div>" +
      rows;
  }

  function parameterDeltaClass(norm) {
    if (norm < 0.03) return "delta-good";
    if (norm < 0.09) return "delta-mid";
    return "delta-bad";
  }

  function updateTargetGrid() {
    if (!state.target) return;

    PARAMS.forEach((meta) => {
      const targetEl = document.getElementById("target-" + meta.key);
      const deltaEl = document.getElementById("delta-" + meta.key);
      if (!targetEl || !deltaEl) return;

      const target = state.target[meta.key];
      const delta = Math.abs(state.player[meta.key] - target);
      const norm = delta / (meta.max - meta.min);

      targetEl.textContent = fixed(target, meta.digits);
      deltaEl.textContent = fixed(delta, meta.digits);
      deltaEl.classList.remove("delta-good", "delta-mid", "delta-bad");
      deltaEl.classList.add(parameterDeltaClass(norm));
    });

    const thParam = document.getElementById("th-param");
    const thTarget = document.getElementById("th-target");
    const thDelta = document.getElementById("th-delta");
    if (thParam) thParam.textContent = TEXT.tableParam;
    if (thTarget) thTarget.textContent = TEXT.tableTarget;
    if (thDelta) thDelta.textContent = TEXT.tableDelta;
  }

  function updateEquationConsole() {
    const p = state.player;
    const b1 = getBFromAE(p.a1, p.e1);
    const b2 = getBFromAE(p.a2, p.e2);
    const b3 = getBFromAE(p.a3, p.e3);
    const g = getGeometry(p);

    if (els.eqE1) {
      els.eqE1.textContent =
        "(u1^2/" +
        fixed(p.a1, 2) +
        "^2)+(v1^2/" +
        fixed(b1, 2) +
        "^2)=1; center=(" +
        fixed(p.x1, 2) +
        "," +
        fixed(p.y1, 2) +
        "), phi1=" +
        fixed(p.phi1, 2);
    }

    if (els.eqE2) {
      els.eqE2.textContent =
        "(u2^2/" +
        fixed(p.a2, 2) +
        "^2)+(v2^2/" +
        fixed(b2, 2) +
        "^2)=1; center=(" +
        fixed(p.x2, 2) +
        "," +
        fixed(p.y2, 2) +
        "), phi2=" +
        fixed(p.phi2, 2);
    }

    if (els.eqNeck) {
      els.eqNeck.textContent =
        "P0(" +
        fixed(g.neck.p0.x) +
        "," +
        fixed(g.neck.p0.y) +
        "), P1(" +
        fixed(g.neck.p1.x) +
        "," +
        fixed(g.neck.p1.y) +
        "), P2(" +
        fixed(g.neck.p2.x) +
        "," +
        fixed(g.neck.p2.y) +
        "), P3(" +
        fixed(g.neck.p3.x) +
        "," +
        fixed(g.neck.p3.y) +
        ")";
    }

    if (els.eqWing) {
      els.eqWing.textContent =
        "P0(" +
        fixed(g.wing1.p0.x) +
        "," +
        fixed(g.wing1.p0.y) +
        "), P1(" +
        fixed(g.wing1.p1.x) +
        "," +
        fixed(g.wing1.p1.y) +
        "), P2(" +
        fixed(g.wing1.p2.x) +
        "," +
        fixed(g.wing1.p2.y) +
        "), P3(" +
        fixed(g.wing1.p3.x) +
        "," +
        fixed(g.wing1.p3.y) +
        ")";
    }

    if (els.eqEye) {
      els.eqEye.textContent =
        "a3=" +
        fixed(p.a3, 2) +
        ", b3=a3*sqrt(1-e3^2)=" +
        fixed(b3, 2) +
        ", D=" +
        fixed(p.d, 2);
    }
  }

  function similarityPercent() {
    if (!state.target) return null;
    let sum = 0;
    PARAMS.forEach((meta) => {
      const delta = Math.abs(state.player[meta.key] - state.target[meta.key]);
      sum += delta / (meta.max - meta.min);
    });
    const averageError = sum / PARAMS.length;
    return Number(Math.max(0, (1 - averageError) * 100).toFixed(2));
  }

  function updatePizzaUI() {
    if (els.pizzaSubmodeSliceBtn) {
      els.pizzaSubmodeSliceBtn.textContent = TEXT.pizzaSubmodeSlice;
      els.pizzaSubmodeSliceBtn.classList.toggle("is-active", state.pizza.subMode === "slice");
    }
    if (els.pizzaSubmodeCalcBtn) {
      els.pizzaSubmodeCalcBtn.textContent = TEXT.pizzaSubmodeCalc;
      els.pizzaSubmodeCalcBtn.classList.toggle("is-active", state.pizza.subMode === "calc");
    }
    if (els.pizzaSliceSection) {
      els.pizzaSliceSection.classList.toggle("is-hidden", state.pizza.subMode !== "slice");
    }
    if (els.pizzaCalcSection) {
      els.pizzaCalcSection.classList.toggle("is-hidden", state.pizza.subMode !== "calc");
    }

    if (els.pizzaOrderText) {
      els.pizzaOrderText.textContent = normalizePiText(state.pizza.orderText || "");
    }
    if (els.pizzaRadiusText) {
      els.pizzaRadiusText.textContent = interpolate(TEXT.pizzaRadius, { radius: state.pizza.radius });
    }
    if (els.pizzaScoreValue) {
      els.pizzaScoreValue.textContent = String(state.pizza.score);
    }
    if (els.pizzaAngleSlider) {
      els.pizzaAngleSlider.value = String(state.pizza.thetaDeg);
      els.pizzaAngleSlider.disabled = state.mode !== "pizza" || state.pizza.subMode !== "slice";
    }
    if (els.pizzaAngleValue) {
      els.pizzaAngleValue.textContent = fixed(state.pizza.thetaDeg, 1) + "°";
    }
    if (els.pizzaSubmitBtn) {
      els.pizzaSubmitBtn.disabled = state.mode !== "pizza" || state.pizza.subMode !== "slice";
    }
    if (els.pizzaCalcOrderText) {
      els.pizzaCalcOrderText.textContent = normalizePiText(state.pizza.calcOrderText || "");
    }
    if (els.pizzaCalcHintText) {
      els.pizzaCalcHintText.textContent = normalizePiText(TEXT.pizzaCalcHint);
    }
    if (els.pizzaAreaAnswerInput) {
      if (!state.pizza.calcAnswerRaw) {
        els.pizzaAreaAnswerInput.value = "";
      } else if (els.pizzaAreaAnswerInput.value !== state.pizza.calcAnswerRaw) {
        els.pizzaAreaAnswerInput.value = state.pizza.calcAnswerRaw;
      }
      els.pizzaAreaAnswerInput.disabled = state.mode !== "pizza" || state.pizza.subMode !== "calc";
    }
    if (els.pizzaAreaSubmitBtn) {
      els.pizzaAreaSubmitBtn.disabled = state.mode !== "pizza" || state.pizza.subMode !== "calc";
    }
  }

  function updateMetrics() {
    if (els.attemptsValue) {
      els.attemptsValue.textContent = String(state.attempts);
    }
    if (els.similarityValue) {
      els.similarityValue.textContent = state.similarity == null ? "--" : fixed(state.similarity, 2) + "%";
    }
    updatePizzaUI();
  }

  function runPizzaFlash() {
    if (state.mode !== "pizza") {
      state.pizza.flashRaf = 0;
      return;
    }
    if (performance.now() < state.pizza.flashUntil) {
      render();
      state.pizza.flashRaf = requestAnimationFrame(runPizzaFlash);
    } else {
      state.pizza.flashRaf = 0;
      render();
    }
  }

  function stopPizzaFlash() {
    if (state.pizza.flashRaf) {
      cancelAnimationFrame(state.pizza.flashRaf);
      state.pizza.flashRaf = 0;
    }
    state.pizza.flashUntil = 0;
  }

  function submitPizzaSlice() {
    if (state.mode !== "pizza" || state.pizza.subMode !== "slice") return;
    const measured = currentPizzaMeasurement();
    const error = Math.abs(measured - state.pizza.targetValue);
    const tolerance = Math.max(0.08, Math.abs(state.pizza.targetValue) * 0.012);

    if (error <= tolerance) {
      state.pizza.score += 1;
      state.pizza.level += 1;
      state.pizza.flashUntil = performance.now() + 420;
      if (state.pizza.flashRaf) {
        cancelAnimationFrame(state.pizza.flashRaf);
      }
      state.pizza.flashRaf = requestAnimationFrame(runPizzaFlash);
      setStatus("pizzaGood", { score: state.pizza.score });
      generatePizzaOrder();
    } else {
      setStatus("pizzaKeep", { error: fixed(error, 3) });
    }

    updateMetrics();
    render();
    saveState();
  }

  function submitPizzaAreaAnswer() {
    if (state.mode !== "pizza" || state.pizza.subMode !== "calc") return;
    if (!els.pizzaAreaAnswerInput) return;

    const raw = String(els.pizzaAreaAnswerInput.value || "").trim();
    state.pizza.calcAnswerRaw = raw;
    state.pizza.calcAnswerCoeff = parsePizzaAreaAnswerCoeff(raw);
    if (state.pizza.calcAnswerCoeff == null) {
      setStatus("pizzaCalcKeep", { error: "invalid" });
      updateMetrics();
      saveState();
      return;
    }

    const error = Math.abs(state.pizza.calcAnswerCoeff - state.pizza.calcTargetCoeff);
    const tolerance = Math.max(0.04, Math.abs(state.pizza.calcTargetCoeff) * 0.015);
    if (error <= tolerance) {
      state.pizza.score += 1;
      state.pizza.level += 1;
      state.pizza.flashUntil = performance.now() + 420;
      if (state.pizza.flashRaf) {
        cancelAnimationFrame(state.pizza.flashRaf);
      }
      state.pizza.flashRaf = requestAnimationFrame(runPizzaFlash);
      setStatus("pizzaCalcGood", { score: state.pizza.score });
      generatePizzaCalcOrder();
    } else {
      setStatus("pizzaCalcKeep", { error: fixed(error, 3) });
    }

    updateMetrics();
    render();
    saveState();
  }

  function setStatus(statusKey, vars = {}) {
    state.statusKey = statusKey;
    state.statusVars = vars;
    if (els.statusText) {
      const template = STATUS_TEMPLATES[statusKey] || "";
      els.statusText.textContent = interpolate(template, vars);
    }
  }

  function updateModeUI() {
    root.classList.toggle("is-pizza-mode", state.mode === "pizza");

    if (els.modeSandboxBtn) {
      els.modeSandboxBtn.classList.toggle("is-active", state.mode === "sandbox");
    }
    if (els.modeChallengeBtn) {
      els.modeChallengeBtn.classList.toggle("is-active", state.mode === "challenge");
    }
    if (els.modePizzaBtn) {
      els.modePizzaBtn.classList.toggle("is-active", state.mode === "pizza");
    }
    if (els.challengeCard) {
      els.challengeCard.classList.toggle("is-hidden", state.mode !== "challenge");
    }
    if (els.pizzaCard) {
      els.pizzaCard.classList.toggle("is-hidden", state.mode !== "pizza");
    }
    if (els.modeDescription) {
      if (state.mode === "sandbox") {
        els.modeDescription.textContent = TEXT.modeSandbox;
      } else if (state.mode === "challenge") {
        els.modeDescription.textContent = TEXT.modeChallenge;
      } else {
        els.modeDescription.textContent = TEXT.modePizza;
      }
    }
    updatePizzaUI();
  }

  function saveState() {
    safeSet(STORAGE.mode, state.mode);
    safeSet(STORAGE.panel, state.panelCollapsed ? "collapsed" : "open");
    safeSet(STORAGE.player, JSON.stringify(state.player));
    safeSet(STORAGE.target, JSON.stringify(state.target));
    safeSet(STORAGE.attempts, String(state.attempts));
    safeSet(STORAGE.similarity, state.similarity == null ? "" : String(state.similarity));
    safeSet(
      STORAGE.pizza,
      JSON.stringify({
        subMode: state.pizza.subMode,
        radius: state.pizza.radius,
        thetaDeg: state.pizza.thetaDeg,
        targetType: state.pizza.targetType,
        targetValue: state.pizza.targetValue,
        targetCoeff: state.pizza.targetCoeff,
        targetThetaDeg: state.pizza.targetThetaDeg,
        orderText: state.pizza.orderText,
        calcRadius: state.pizza.calcRadius,
        calcThetaDeg: state.pizza.calcThetaDeg,
        calcArcCoeff: state.pizza.calcArcCoeff,
        calcQuestionType: state.pizza.calcQuestionType,
        calcTargetCoeff: state.pizza.calcTargetCoeff,
        calcOrderText: state.pizza.calcOrderText,
        calcAnswerRaw: state.pizza.calcAnswerRaw,
        calcAnswerCoeff: state.pizza.calcAnswerCoeff,
        score: state.pizza.score,
        level: state.pizza.level,
        toppings: state.pizza.toppings,
      })
    );
  }

  function loadState() {
    const mode = safeGet(STORAGE.mode);
    state.mode = mode === "challenge" || mode === "pizza" ? mode : "sandbox";

    state.panelCollapsed = safeGet(STORAGE.panel) === "collapsed";

    const player = safeParse(safeGet(STORAGE.player), null);
    if (player) {
      state.player = sanitizePlayer(player);
    }

    const target = safeParse(safeGet(STORAGE.target), null);
    if (target) {
      state.target = sanitizePlayer(target);
    }

    const attemptsRaw = Number(safeGet(STORAGE.attempts));
    state.attempts = Number.isFinite(attemptsRaw) ? Math.max(0, Math.floor(attemptsRaw)) : 0;

    const similarityRaw = Number(safeGet(STORAGE.similarity));
    state.similarity = Number.isFinite(similarityRaw) ? similarityRaw : null;

    const pizzaRaw = safeParse(safeGet(STORAGE.pizza), null);
    if (pizzaRaw && typeof pizzaRaw === "object") {
      state.pizza.subMode = pizzaRaw.subMode === "calc" ? "calc" : "slice";
      state.pizza.radius = [8, 9, 10, 11, 12].includes(Number(pizzaRaw.radius)) ? Number(pizzaRaw.radius) : 10;
      const thetaRaw = Number(pizzaRaw.thetaDeg);
      state.pizza.thetaDeg = Number.isFinite(thetaRaw) ? clamp(thetaRaw, 0, 360) : 90;
      state.pizza.targetType = pizzaRaw.targetType === "area" ? "area" : "arc";
      state.pizza.targetValue = Number.isFinite(Number(pizzaRaw.targetValue)) ? Number(pizzaRaw.targetValue) : 0;
      state.pizza.targetCoeff = Number.isFinite(Number(pizzaRaw.targetCoeff)) ? Number(pizzaRaw.targetCoeff) : 0;
      const targetThetaRaw = Number(pizzaRaw.targetThetaDeg);
      state.pizza.targetThetaDeg = Number.isFinite(targetThetaRaw) ? clamp(targetThetaRaw, 0, 360) : 90;
      state.pizza.orderText = normalizePiText(typeof pizzaRaw.orderText === "string" ? pizzaRaw.orderText : "");
      state.pizza.calcRadius = [8, 9, 10, 11, 12].includes(Number(pizzaRaw.calcRadius)) ? Number(pizzaRaw.calcRadius) : 10;
      const calcThetaRaw = Number(pizzaRaw.calcThetaDeg);
      state.pizza.calcThetaDeg = Number.isFinite(calcThetaRaw) ? clamp(calcThetaRaw, 0, 360) : 90;
      state.pizza.calcArcCoeff = Number.isFinite(Number(pizzaRaw.calcArcCoeff))
        ? Number(pizzaRaw.calcArcCoeff)
        : (state.pizza.calcThetaDeg * state.pizza.calcRadius) / 180;
      state.pizza.calcQuestionType =
        pizzaRaw.calcQuestionType === "lr" || pizzaRaw.calcQuestionType === "lt" ? pizzaRaw.calcQuestionType : "rt";
      state.pizza.calcTargetCoeff = Number.isFinite(Number(pizzaRaw.calcTargetCoeff))
        ? Number(pizzaRaw.calcTargetCoeff)
        : 0;
      state.pizza.calcOrderText = normalizePiText(typeof pizzaRaw.calcOrderText === "string" ? pizzaRaw.calcOrderText : "");
      state.pizza.calcAnswerRaw = typeof pizzaRaw.calcAnswerRaw === "string" ? normalizePiText(pizzaRaw.calcAnswerRaw) : "";
      state.pizza.calcAnswerCoeff = Number.isFinite(Number(pizzaRaw.calcAnswerCoeff))
        ? Number(pizzaRaw.calcAnswerCoeff)
        : null;
      state.pizza.score = Number.isFinite(Number(pizzaRaw.score)) ? Math.max(0, Math.floor(Number(pizzaRaw.score))) : 0;
      state.pizza.level = Number.isFinite(Number(pizzaRaw.level)) ? Math.max(1, Math.floor(Number(pizzaRaw.level))) : 1;
      state.pizza.toppings = Array.isArray(pizzaRaw.toppings)
        ? pizzaRaw.toppings
            .filter((item) => item && Number.isFinite(Number(item.x)) && Number.isFinite(Number(item.y)))
            .map((item) => ({
              x: Number(item.x),
              y: Number(item.y),
              r: Number.isFinite(Number(item.r)) ? clamp(Number(item.r), 0.08, 1.2) : 0.3,
              c: typeof item.c === "string" ? item.c : "#ef4444",
            }))
        : [];
    }
  }

  function setPanelCollapsed(collapsed) {
    state.panelCollapsed = Boolean(collapsed);
    root.classList.toggle("panel-collapsed", state.panelCollapsed);
    if (els.panelReopenBtn) {
      els.panelReopenBtn.classList.toggle("is-hidden", !state.panelCollapsed);
    }
    if (els.panelToggleBtn) {
      els.panelToggleBtn.textContent = panelButtonText();
    }
    saveState();
    resizeCanvas();
    render();
  }

  function resetPlayer() {
    state.player = { ...DEFAULT_PLAYER };
    state.attempts = 0;
    state.similarity = null;
    updateSliderUI();
    updateEquationConsole();
    updateTargetGrid();
    updateMetrics();
    render();
    saveState();

    if (state.mode === "sandbox") {
      setStatus("readySandbox");
    } else if (state.mode === "pizza") {
      setStatus("readyPizza");
    } else {
      setStatus("readyChallenge");
    }
  }

  function enterSandbox() {
    stopPizzaFlash();
    state.mode = "sandbox";
    state.attempts = 0;
    state.similarity = null;
    setStatus("readySandbox");

    updateModeUI();
    updateMetrics();
    updateTargetGrid();
    render();
    saveState();
  }

  function ensurePizzaOrder() {
    if (state.pizza.subMode === "calc") {
      if (!state.pizza.calcOrderText || !Number.isFinite(state.pizza.calcTargetCoeff) || state.pizza.calcTargetCoeff <= 0) {
        generatePizzaCalcOrder();
      }
      return;
    }
    if (!state.pizza.orderText || !Number.isFinite(state.pizza.targetValue) || state.pizza.targetValue <= 0) {
      generatePizzaOrder();
    }
  }

  function setPizzaSubMode(mode) {
    const next = mode === "calc" ? "calc" : "slice";
    if (state.pizza.subMode === next) return;
    state.pizza.subMode = next;
    ensurePizzaOrder();
    setStatus("readyPizza");
    updateMetrics();
    render();
    saveState();
  }

  function enterPizzaMode() {
    stopPizzaFlash();
    loadPizzaTexture(true);
    state.mode = "pizza";
    ensurePizzaOrder();
    setStatus("readyPizza");

    updateModeUI();
    updateMetrics();
    render();
    saveState();
  }

  function enterChallengeWithNewTarget() {
    stopPizzaFlash();
    state.mode = "challenge";
    state.target = randomTarget();
    state.player = { ...DEFAULT_PLAYER };
    state.attempts = 0;
    state.similarity = null;
    setStatus("newTarget");

    updateModeUI();
    updateSliderUI();
    updateEquationConsole();
    updateTargetGrid();
    updateMetrics();
    render();
    saveState();
  }

  function ensureChallengeState() {
    stopPizzaFlash();
    if (!state.target) {
      state.target = randomTarget();
    }
    state.mode = "challenge";
    if (state.similarity == null) {
      setStatus("readyChallenge");
    } else {
      setStatus("matchKeep", { score: fixed(state.similarity, 2) });
    }

    updateModeUI();
    updateTargetGrid();
    updateMetrics();
    render();
    saveState();
  }

  function evaluateMatch() {
    if (state.mode !== "challenge") return;
    state.attempts += 1;
    state.similarity = similarityPercent();

    if (state.similarity != null && state.similarity >= 96.5) {
      setStatus("matchGood", { score: fixed(state.similarity, 2) });
    } else {
      setStatus("matchKeep", { score: fixed(state.similarity, 2) });
    }

    updateMetrics();
    updateTargetGrid();
    saveState();
  }

  function autoUpdateSimilarityInChallenge() {
    if (state.mode !== "challenge") return;
    state.similarity = similarityPercent();
    updateMetrics();
  }

  function bindSliders() {
    PARAMS.forEach((meta) => {
      const input = document.getElementById("param-" + meta.key);
      if (!input) return;

      input.addEventListener("input", () => {
        state.player[meta.key] = clamp(Number(input.value), meta.min, meta.max);
        updateSliderUI();
        updateEquationConsole();
        updateTargetGrid();
        autoUpdateSimilarityInChallenge();
        render();
        saveState();
      });
    });
  }

  function bindPizzaControls() {
    if (els.pizzaAngleSlider) {
      els.pizzaAngleSlider.addEventListener("input", () => {
        state.pizza.thetaDeg = clamp(Number(els.pizzaAngleSlider.value), 0, 360);
        updatePizzaUI();
        if (state.mode === "pizza") {
          render();
          saveState();
        }
      });
    }

    if (els.pizzaSubmodeSliceBtn) {
      els.pizzaSubmodeSliceBtn.addEventListener("click", () => setPizzaSubMode("slice"));
    }
    if (els.pizzaSubmodeCalcBtn) {
      els.pizzaSubmodeCalcBtn.addEventListener("click", () => setPizzaSubMode("calc"));
    }
    if (els.pizzaAreaAnswerInput) {
      els.pizzaAreaAnswerInput.addEventListener("input", () => {
        const raw = String(els.pizzaAreaAnswerInput.value || "");
        state.pizza.calcAnswerRaw = raw;
        state.pizza.calcAnswerCoeff = parsePizzaAreaAnswerCoeff(raw);
        saveState();
      });
      els.pizzaAreaAnswerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          submitPizzaAreaAnswer();
        }
      });
    }
  }

  function bindButtons() {
    if (els.modeSandboxBtn) {
      els.modeSandboxBtn.addEventListener("click", enterSandbox);
    }
    if (els.modeChallengeBtn) {
      els.modeChallengeBtn.addEventListener("click", enterChallengeWithNewTarget);
    }
    if (els.modePizzaBtn) {
      els.modePizzaBtn.addEventListener("click", enterPizzaMode);
    }
    if (els.newTargetBtn) {
      els.newTargetBtn.addEventListener("click", enterChallengeWithNewTarget);
    }
    if (els.checkMatchBtn) {
      els.checkMatchBtn.addEventListener("click", evaluateMatch);
    }
    if (els.pizzaSubmitBtn) {
      els.pizzaSubmitBtn.addEventListener("click", submitPizzaSlice);
    }
    if (els.pizzaAreaSubmitBtn) {
      els.pizzaAreaSubmitBtn.addEventListener("click", submitPizzaAreaAnswer);
    }
    if (els.resetPlayerBtn) {
      els.resetPlayerBtn.addEventListener("click", resetPlayer);
    }

    if (els.panelToggleBtn) {
      els.panelToggleBtn.addEventListener("click", () => setPanelCollapsed(!state.panelCollapsed));
    }
    if (els.panelReopenBtn) {
      els.panelReopenBtn.addEventListener("click", () => setPanelCollapsed(false));
    }
  }

  function observeVisualMode() {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "attributes" &&
          (m.attributeName === "data-contrast" || m.attributeName === "data-theme")
        ) {
          render();
          break;
        }
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["data-contrast", "data-theme"] });
  }

  function init() {
    loadState();
    initSliderRanges();
    buildTargetGrid();
    bindSliders();
    bindPizzaControls();
    bindButtons();
    observeVisualMode();
    loadPizzaTexture();

    window.addEventListener("resize", () => {
      resizeCanvas();
      render();
    });

    resizeCanvas();
    updateSliderUI();
    updateEquationConsole();

    if (!state.target) {
      state.target = randomTarget();
    }

    if (state.mode === "challenge") {
      ensureChallengeState();
    } else if (state.mode === "pizza") {
      enterPizzaMode();
    } else {
      setStatus("readySandbox");
      updateModeUI();
      updateTargetGrid();
      updateMetrics();
    }

    if (els.panelToggleBtn) {
      els.panelToggleBtn.textContent = panelButtonText();
    }
    if (els.panelReopenBtn) {
      els.panelReopenBtn.textContent = TEXT.showPanel;
    }

    setPanelCollapsed(state.panelCollapsed);
    render();
    saveState();
  }

  init();
})();
