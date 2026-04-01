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
    panelToggleBtn: document.getElementById("panel-toggle-btn"),
    panelReopenBtn: document.getElementById("panel-reopen-btn"),
    modeDescription: document.getElementById("mode-description"),
    statusText: document.getElementById("status-text"),
    challengeCard: document.getElementById("challenge-card"),
    targetGrid: document.getElementById("target-grid"),
    newTargetBtn: document.getElementById("new-target-btn"),
    checkMatchBtn: document.getElementById("check-match-btn"),
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
  };

  const TEXT = {
    modeSandbox:
      root.dataset.textModeSandbox ||
      "Pure math sandbox: drag all sliders and inspect continuous geometric deformation in real time.",
    modeChallenge:
      root.dataset.textModeChallenge ||
      "Challenge mode: a random target goose is generated; tune your parameter vector to maximize overlap.",
    statusReadySandbox: root.dataset.textStatusReadySandbox || "Sandbox ready.",
    statusReadyChallenge: root.dataset.textStatusReadyChallenge || "Challenge ready.",
    statusNewTarget: root.dataset.textStatusNewTarget || "New random target generated.",
    statusMatchGood: root.dataset.textStatusMatchGood || "Excellent overlap. Similarity = {score}%.",
    statusMatchKeep: root.dataset.textStatusMatchKeep || "Current similarity = {score}%. Keep tuning.",
    tableParam: root.dataset.textTableParam || "parameter",
    tableTarget: root.dataset.textTableTarget || "target",
    tableDelta: root.dataset.textTableDelta || "abs error",
    legendPlayer: root.dataset.textLegendPlayer || "player",
    legendTarget: root.dataset.textLegendTarget || "target",
    showPanel: root.dataset.textShowPanel || "Show Panel",
    hidePanel: root.dataset.textHidePanel || "Hide Panel",
  };

  const STATUS_TEMPLATES = {
    readySandbox: TEXT.statusReadySandbox,
    readyChallenge: TEXT.statusReadyChallenge,
    newTarget: TEXT.statusNewTarget,
    matchGood: TEXT.statusMatchGood,
    matchKeep: TEXT.statusMatchKeep,
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
    canvasBg: "#070b12",
    axis: "#b89b3f",
    major: "#6e612f",
    minor: "#3f3a22",
    tick: "#fef9c3",
    legendBg: "rgba(7,11,18,0.88)",
    legendText: "#fef9c3",
    player: "#60a5fa",
    playerFill: "rgba(96,165,250,0.13)",
    target: "#fb923c",
  };

  const state = {
    mode: "sandbox",
    panelCollapsed: false,
    player: { ...DEFAULT_PLAYER },
    target: null,
    attempts: 0,
    similarity: null,
    statusKey: "readySandbox",
    statusVars: {},
    width: 1,
    height: 1,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
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

  function interpolate(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : ""));
  }

  function isColorBlindMode() {
    return document.body.getAttribute("data-contrast") === "cb";
  }

  function isDarkThemeMode() {
    return document.body.getAttribute("data-theme") === "dark";
  }

  function palette() {
    if (isDarkThemeMode() && isColorBlindMode()) return PALETTE_CB_DARK;
    if (isColorBlindMode()) return PALETTE_CB;
    if (isDarkThemeMode()) return PALETTE_DARK;
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

  function updateMetrics() {
    if (els.attemptsValue) {
      els.attemptsValue.textContent = String(state.attempts);
    }
    if (els.similarityValue) {
      els.similarityValue.textContent = state.similarity == null ? "--" : fixed(state.similarity, 2) + "%";
    }
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
    if (els.modeSandboxBtn) {
      els.modeSandboxBtn.classList.toggle("is-active", state.mode === "sandbox");
    }
    if (els.modeChallengeBtn) {
      els.modeChallengeBtn.classList.toggle("is-active", state.mode === "challenge");
    }
    if (els.challengeCard) {
      els.challengeCard.classList.toggle("is-hidden", state.mode !== "challenge");
    }
    if (els.modeDescription) {
      els.modeDescription.textContent = state.mode === "sandbox" ? TEXT.modeSandbox : TEXT.modeChallenge;
    }
  }

  function saveState() {
    safeSet(STORAGE.mode, state.mode);
    safeSet(STORAGE.panel, state.panelCollapsed ? "collapsed" : "open");
    safeSet(STORAGE.player, JSON.stringify(state.player));
    safeSet(STORAGE.target, JSON.stringify(state.target));
    safeSet(STORAGE.attempts, String(state.attempts));
    safeSet(STORAGE.similarity, state.similarity == null ? "" : String(state.similarity));
  }

  function loadState() {
    const mode = safeGet(STORAGE.mode);
    state.mode = mode === "challenge" ? "challenge" : "sandbox";

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
    } else {
      setStatus("readyChallenge");
    }
  }

  function enterSandbox() {
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

  function enterChallengeWithNewTarget() {
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

  function bindButtons() {
    if (els.modeSandboxBtn) {
      els.modeSandboxBtn.addEventListener("click", enterSandbox);
    }
    if (els.modeChallengeBtn) {
      els.modeChallengeBtn.addEventListener("click", enterChallengeWithNewTarget);
    }
    if (els.newTargetBtn) {
      els.newTargetBtn.addEventListener("click", enterChallengeWithNewTarget);
    }
    if (els.checkMatchBtn) {
      els.checkMatchBtn.addEventListener("click", evaluateMatch);
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
    bindButtons();
    observeVisualMode();

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
