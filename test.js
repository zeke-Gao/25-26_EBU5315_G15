(function () {
  function rad(deg) {
    return (deg * Math.PI) / 180;
  }

  function chordLength(r, theta) {
    return Number((2 * r * Math.sin(rad(theta / 2))).toFixed(1));
  }

  function ringSectorArea(R, r, theta) {
    return Number((((theta / 360) * Math.PI * (R * R - r * r))).toFixed(1));
  }

  function commonChord(r1, r2, d) {
    const x = (d * d - r2 * r2 + r1 * r1) / (2 * d);
    return Number((2 * Math.sqrt(Math.max(0, r1 * r1 - x * x))).toFixed(1));
  }

  const q = [];

  [35, 40, 50, 60, 70, 80, 90, 100, 110, 120].forEach(function (a, i) {
    q.push({
      id: 'inscribed_exam_' + (i + 1),
      level: 'basic',
      topic: 'inscribed-angle',
      tags: ['circle theorem', 'inscribed angle', 'GCSE'],
      type: 'fill',
      answer: a / 2,
      tolerance: 0.2,
      data: { central: a },
      prompt: {
        zh: '在同一圆中，已知圆心角 ∠AOB=' + a + '°（对应弧 AB），求同弧圆周角 ∠ACB。',
        en: 'In the same circle, ∠AOB=' + a + '° subtends arc AB. Find inscribed angle ∠ACB.'
      },
      visual: { kind: 'angle', centralAngle: a }
    });
  });

  [18, 20, 24, 30, 35, 42, 45, 50, 55, 62].forEach(function (a, i) {
    q.push({
      id: 'central_exam_' + (i + 1),
      level: 'basic',
      topic: 'central-angle',
      tags: ['circle theorem', 'central angle', 'GCSE'],
      type: 'fill',
      answer: a * 2,
      tolerance: 0.2,
      data: { inscribed: a },
      prompt: {
        zh: '在同一圆中，已知圆周角 ∠ACB=' + a + '°（对应弧 AB），求同弧圆心角 ∠AOB。',
        en: 'In the same circle, ∠ACB=' + a + '° subtends arc AB. Find central angle ∠AOB.'
      },
      visual: { kind: 'angle', centralAngle: a * 2 }
    });
  });

  q.push({
    id: 'diameter_exam_1',
    level: 'basic',
    topic: 'diameter-theorem',
    tags: ['diameter', 'inscribed angle', 'exam'],
    type: 'mcq',
    answer: '90°',
    options: ['45°', '60°', '90°', '120°'],
    data: { theorem: 'diameter-right-angle' },
    prompt: {
      zh: '已知 AB 为直径，求圆周角 ∠ACB。',
      en: 'AB is a diameter. Find inscribed angle ∠ACB.'
    },
    visual: { kind: 'diameter' }
  });

  q.push({
    id: 'diameter_exam_2',
    level: 'basic',
    topic: 'diameter-theorem',
    tags: ['diameter', 'inscribed angle', 'exam'],
    type: 'mcq',
    answer: '90°',
    options: ['30°', '90°', '100°', '150°'],
    data: { theorem: 'diameter-right-angle' },
    prompt: {
      zh: '半圆所对圆周角是多少度？',
      en: 'What is the angle subtended by a diameter at the circumference?'
    },
    visual: { kind: 'diameter' }
  });

  q.push({
    id: 'diameter_exam_3',
    level: 'basic',
    topic: 'diameter-theorem',
    tags: ['diameter', 'inscribed angle', 'exam'],
    type: 'mcq',
    answer: '90°',
    options: ['75°', '90°', '105°', '135°'],
    data: { theorem: 'diameter-right-angle' },
    prompt: {
      zh: '若 AB 为直径，则同弧上任一点 C 满足 ∠ACB 等于多少？',
      en: 'If AB is a diameter, what is ∠ACB for any point C on the same arc?'
    },
    visual: { kind: 'diameter' }
  });

  q.push({
    id: 'diameter_exam_4',
    level: 'basic',
    topic: 'diameter-theorem',
    tags: ['diameter', 'inscribed angle', 'exam'],
    type: 'mcq',
    answer: '90°',
    options: ['30°', '60°', '90°', '180°'],
    data: { theorem: 'diameter-right-angle' },
    prompt: {
      zh: '半圆定理中，圆周角的固定值是？',
      en: 'In the semicircle theorem, the inscribed angle is always:'
    },
    visual: { kind: 'diameter' }
  });

  [
    { r: 7, t: 50 },
    { r: 8, t: 60 },
    { r: 9, t: 75 },
    { r: 10, t: 90 },
    { r: 11, t: 100 },
    { r: 12, t: 110 },
    { r: 13, t: 120 }
  ].forEach(function (item, i) {
    q.push({
      id: 'chord_exam_' + (i + 1),
      level: 'basic',
      topic: 'chord-length',
      tags: ['chord', 'trigonometry', 'exam'],
      type: 'fill',
      answer: chordLength(item.r, item.t),
      tolerance: 0.2,
      data: { r: item.r, theta: item.t },
      prompt: {
        zh: '已知半径 r=' + item.r + '，且 θ=∠DOE=' + item.t + '°，求弦 DE 长（保留1位小数）。',
        en: 'Given r=' + item.r + ' and θ=∠DOE=' + item.t + '°, find chord DE (1 d.p.).'
      },
      visual: { kind: 'chord', radius: item.r, angleDeg: item.t }
    });
  });

  [
    { R: 13, r: 8, t: 150 },
    { R: 12, r: 7, t: 210 },
    { R: 15, r: 9, t: 120 },
    { R: 14, r: 6, t: 135 },
    { R: 16, r: 10, t: 225 },
    { R: 11, r: 5, t: 180 }
  ].forEach(function (item, i) {
    q.push({
      id: 'expert_ring_sector_' + (i + 1),
      level: 'expert',
      topic: 'annular-sector',
      tags: ['composite circles', 'sector area', 'expert'],
      type: 'fill',
      answer: ringSectorArea(item.R, item.r, item.t),
      tolerance: 0.25,
      data: { R: item.R, r: item.r, theta: item.t },
      prompt: {
        zh: '同心圆环中，外半径 R=' + item.R + '，内半径 r=' + item.r + '，且 θ=∠AOB=' + item.t + '°。求环形扇形面积（保留1位小数）。',
        en: 'In a concentric ring, R=' + item.R + ', r=' + item.r + ', and θ=∠AOB=' + item.t + '°. Find annular sector area (1 d.p.).'
      },
      visual: { kind: 'ring-sector', R: item.R, r: item.r, thetaDeg: item.t }
    });
  });

  [
    { r1: 10, r2: 9, d: 11 },
    { r1: 12, r2: 8, d: 10 },
    { r1: 14, r2: 10, d: 16 },
    { r1: 13, r2: 11, d: 14 },
    { r1: 15, r2: 9, d: 12 },
    { r1: 11, r2: 10, d: 9 }
  ].forEach(function (item, i) {
    q.push({
      id: 'expert_intersect_chord_' + (i + 1),
      level: 'expert',
      topic: 'two-circles-common-chord',
      tags: ['intersecting circles', 'common chord', 'expert'],
      type: 'fill',
      answer: commonChord(item.r1, item.r2, item.d),
      tolerance: 0.2,
      data: { r1: item.r1, r2: item.r2, d: item.d },
      prompt: {
        zh: '两圆相交，圆心 O1/O2，半径 r1=' + item.r1 + '、r2=' + item.r2 + '，圆心距 d=' + item.d + '。求公共弦 PQ 长（保留1位小数）。',
        en: 'Two circles intersect with r1=' + item.r1 + ', r2=' + item.r2 + ', center distance d=' + item.d + '. Find common chord PQ (1 d.p.).'
      },
      visual: { kind: 'intersect-circles', r1: item.r1, r2: item.r2, d: item.d }
    });
  });

  [
    { inscribed: 22 },
    { inscribed: 28 },
    { inscribed: 34 },
    { inscribed: 41 },
    { inscribed: 47 },
    { inscribed: 53 }
  ].forEach(function (item, i) {
    q.push({
      id: 'tangent_chord_' + (i + 1),
      level: 'expert',
      topic: 'tangent-chord-angle',
      tags: ['tangent', 'alternate segment theorem', 'expert'],
      type: 'fill',
      answer: item.inscribed,
      tolerance: 0.2,
      data: { inscribed: item.inscribed },
      prompt: {
        zh: '切线 AT 与弦 AB 所夹角为 ∠TAB。已知同弧所对圆周角 ∠ACB=' + item.inscribed + '°，求 ∠TAB。',
        en: 'AT is tangent at A and AB is a chord. Given inscribed angle ∠ACB=' + item.inscribed + '°, find ∠TAB.'
      },
      visual: { kind: 'tangent-chord', inscribedAngle: item.inscribed }
    });
  });

  [
    { AP: 6, PB: 4, CP: 3 },
    { AP: 8, PB: 3, CP: 4 },
    { AP: 5, PB: 7, CP: 5 },
    { AP: 9, PB: 4, CP: 6 },
    { AP: 7, PB: 6, CP: 4 },
    { AP: 10, PB: 2, CP: 5 }
  ].forEach(function (item, i) {
    q.push({
      id: 'intersect_chords_' + (i + 1),
      level: 'expert',
      topic: 'intersecting-chords-theorem',
      tags: ['intersecting chords', 'power theorem', 'expert'],
      type: 'fill',
      answer: Number(((item.AP * item.PB) / item.CP).toFixed(1)),
      tolerance: 0.2,
      data: item,
      prompt: {
        zh: '圆内两弦 AB 与 CD 交于 P。已知 AP=' + item.AP + '，PB=' + item.PB + '，CP=' + item.CP + '，求 PD。',
        en: 'Chords AB and CD intersect at P. Given AP=' + item.AP + ', PB=' + item.PB + ', CP=' + item.CP + ', find PD.'
      },
      visual: { kind: 'intersect-chords', AP: item.AP, PB: item.PB, CP: item.CP }
    });
  });

  [
    { TB: 4, TC: 9 },
    { TB: 5, TC: 12 },
    { TB: 7, TC: 15 },
    { TB: 6, TC: 18 },
    { TB: 8, TC: 20 },
    { TB: 9, TC: 25 }
  ].forEach(function (item, i) {
    q.push({
      id: 'tangent_power_' + (i + 1),
      level: 'expert',
      topic: 'tangent-secant-power',
      tags: ['tangent power theorem', 'secant', 'expert'],
      type: 'fill',
      answer: Number(Math.sqrt(item.TB * item.TC).toFixed(1)),
      tolerance: 0.2,
      data: item,
      prompt: {
        zh: '点 T 在圆外，TA 为切线，TBC 为割线。已知 TB=' + item.TB + '，TC=' + item.TC + '，求 TA（保留1位小数）。',
        en: 'Point T is outside the circle. TA is tangent and TBC is secant. Given TB=' + item.TB + ', TC=' + item.TC + ', find TA (1 d.p.).'
      },
      visual: { kind: 'tangent-power', TB: item.TB, TC: item.TC }
    });
  });

  // Basic concept-only questions (no diagram).
  [
    {
      id: 'basic_concept_1',
      type: 'mcq',
      answer: '10',
      options: ['2', '5', '10', '25'],
      prompt: {
        zh: '一个圆的半径为 5，则它的直径是多少？',
        en: 'A circle has radius 5. What is its diameter?'
      },
      explain: { topic: 'radius-diameter', score: 1.5 }
    },
    {
      id: 'basic_concept_2',
      type: 'mcq',
      answer: '16π',
      options: ['8π', '16π', '32π', '64π'],
      prompt: {
        zh: '半径 r=8 的圆，周长为？',
        en: 'For radius r=8, what is the circumference?'
      },
      explain: { topic: 'circumference', score: 2.2 }
    },
    {
      id: 'basic_concept_3',
      type: 'fill',
      answer: 49,
      tolerance: 0.2,
      prompt: {
        zh: '半径 r=7，求圆面积中 r² 的数值部分。',
        en: 'If r=7, find the numeric value of r² in the area formula.'
      },
      explain: { topic: 'area-core', score: 2.4 }
    },
    {
      id: 'basic_concept_4',
      type: 'mcq',
      answer: '90°',
      options: ['45°', '60°', '90°', '120°'],
      prompt: {
        zh: '直径所对的圆周角恒等于多少？',
        en: 'An angle subtended by a diameter at the circumference is always:'
      },
      explain: { topic: 'diameter-theorem', score: 2.6 }
    },
    {
      id: 'basic_concept_5',
      type: 'fill',
      answer: 55,
      tolerance: 0.2,
      prompt: {
        zh: '同弧圆心角为 110°，对应圆周角是多少度？',
        en: 'A central angle is 110° on an arc. Find the inscribed angle on the same arc.'
      },
      explain: { topic: 'central-inscribed', score: 2.8 }
    },
    {
      id: 'basic_concept_6',
      type: 'fill',
      answer: 100,
      tolerance: 0.2,
      prompt: {
        zh: '同弧圆周角为 50°，对应圆心角是多少度？',
        en: 'An inscribed angle is 50° on an arc. Find the central angle on the same arc.'
      },
      explain: { topic: 'inscribed-central', score: 3.1 }
    },
    {
      id: 'basic_concept_7',
      type: 'fill',
      answer: 12.6,
      tolerance: 0.3,
      prompt: {
        zh: '半径 r=6，圆心角 120°，求弧长（取 π=3.14，保留1位小数）。',
        en: 'Given r=6 and central angle 120°, find arc length using π=3.14 (1 d.p.).'
      },
      explain: { topic: 'arc-length', score: 3.6 }
    },
    {
      id: 'basic_concept_8',
      type: 'fill',
      answer: 39.3,
      tolerance: 0.3,
      prompt: {
        zh: '半径 r=5，圆心角 90°，求扇形面积（取 π=3.14，保留1位小数）。',
        en: 'Given r=5 and central angle 90°, find sector area using π=3.14 (1 d.p.).'
      },
      explain: { topic: 'sector-area', score: 3.8 }
    },
    {
      id: 'basic_concept_9',
      type: 'fill',
      answer: 8.5,
      tolerance: 0.2,
      prompt: {
        zh: '弦长公式 c=2r·sin(θ/2)。已知 r=10, θ=50°，且 sin25°≈0.425，求 c。',
        en: 'Use c=2r·sin(θ/2). Given r=10, θ=50°, and sin25°≈0.425, find c.'
      },
      explain: { topic: 'chord-formula', score: 4.1 }
    },
    {
      id: 'basic_concept_10',
      type: 'fill',
      answer: 48,
      tolerance: 0.2,
      prompt: {
        zh: '在同一圆中，若同弧圆周角为 x，圆心角为 3x。求圆周角 x（单位：度）。',
        en: 'In one circle, inscribed angle is x and central angle on same arc is 3x. Find x (degrees).'
      },
      explain: { topic: 'equation-angles', score: 4.3 }
    }
  ].forEach(function (item) {
    q.push({
      id: item.id,
      level: 'basic',
      topic: item.explain.topic,
      type: item.type,
      answer: item.answer,
      options: item.options,
      tolerance: item.tolerance,
      prompt: item.prompt,
      visual: { kind: 'none' },
      difficultyScore: item.explain.score
    });
  });

  // Expert concept-only questions (no diagram, higher difficulty).
  [
    {
      id: 'expert_concept_1',
      type: 'fill',
      answer: 6,
      tolerance: 0.2,
      prompt: {
        zh: '圆内两弦相交于 P。若 AP=4, PB=9, CP=6，求 PD。',
        en: 'Two chords intersect at P. If AP=4, PB=9, CP=6, find PD.'
      },
      score: 8.1,
      topic: 'intersecting-chords-theorem'
    },
    {
      id: 'expert_concept_2',
      type: 'fill',
      answer: 10,
      tolerance: 0.2,
      prompt: {
        zh: '点 T 在圆外，TA 为切线，TBC 为割线。若 TB=8, TC=12，求 TA。',
        en: 'Point T is outside the circle. TA tangent, TBC secant. If TB=8 and TC=12, find TA.'
      },
      score: 8.3,
      topic: 'tangent-secant-power'
    },
    {
      id: 'expert_concept_3',
      type: 'fill',
      answer: 98.2,
      tolerance: 0.3,
      prompt: {
        zh: '同心圆环中 R=9, r=5，圆心角 150°。求环形扇形面积（取 π=3.14，保留1位小数）。',
        en: 'In an annulus, R=9, r=5, central angle 150°. Find annular sector area (π=3.14, 1 d.p.).'
      },
      score: 8.6,
      topic: 'annular-sector'
    },
    {
      id: 'expert_concept_4',
      type: 'fill',
      answer: 38.5,
      tolerance: 0.3,
      prompt: {
        zh: '弦长公式 c=2r·sin(θ/2)。若 r=14, θ=160°，且 sin80°≈0.985，求 c（保留1位小数）。',
        en: 'Use c=2r·sin(θ/2). If r=14, θ=160°, sin80°≈0.985, find c (1 d.p.).'
      },
      score: 8.8,
      topic: 'chord-length'
    },
    {
      id: 'expert_concept_5',
      type: 'mcq',
      answer: '80°',
      options: ['40°', '60°', '80°', '160°'],
      prompt: {
        zh: '若同弧圆周角是 40°，则同弧切线与弦所夹角应为：',
        en: 'If inscribed angle on an arc is 40°, then tangent-chord angle on same arc is:'
      },
      score: 9.0,
      topic: 'tangent-chord-angle'
    },
    {
      id: 'expert_concept_6',
      type: 'fill',
      answer: 6,
      tolerance: 0.2,
      prompt: {
        zh: '两圆半径分别 10 和 8，圆心距 6。求公共弦中点到半径 10 圆心的距离 x（保留整数）。',
        en: 'Two circles have radii 10 and 8, center distance 6. Find distance x from center of radius-10 circle to midpoint of common chord.'
      },
      score: 9.2,
      topic: 'two-circles-common-chord'
    },
    {
      id: 'expert_concept_7',
      type: 'fill',
      answer: 14.4,
      tolerance: 0.3,
      prompt: {
        zh: '设半径 12，圆心角 66°。求弧长（取 π=3.14，保留1位小数）。',
        en: 'Given radius 12 and central angle 66°, find arc length (π=3.14, 1 d.p.).'
      },
      score: 9.3,
      topic: 'arc-length'
    },
    {
      id: 'expert_concept_8',
      type: 'fill',
      answer: 11.2,
      tolerance: 0.3,
      prompt: {
        zh: '两弦 AB 与 CD 交于 P，AP:PB=7:4，CP=6.4。求 PD（保留1位小数）。',
        en: 'Chords AB and CD intersect at P. AP:PB=7:4 and CP=6.4. Find PD (1 d.p.).'
      },
      score: 9.4,
      topic: 'intersecting-chords-theorem'
    },
    {
      id: 'expert_concept_9',
      type: 'fill',
      answer: 13.4,
      tolerance: 0.3,
      prompt: {
        zh: '点 T 在圆外，TB=10，TC=18。若 TA 为切线，求 TA（保留1位小数）。',
        en: 'Point T outside circle with TB=10, TC=18. If TA is tangent, find TA (1 d.p.).'
      },
      score: 9.6,
      topic: 'tangent-secant-power'
    },
    {
      id: 'expert_concept_10',
      type: 'fill',
      answer: 10,
      tolerance: 0.2,
      prompt: {
        zh: '同弧上圆心角比圆周角大 30°。设圆周角为 x，求 x。',
        en: 'On the same arc, central angle is 30° larger than inscribed angle. Let inscribed angle be x. Find x.'
      },
      score: 9.8,
      topic: 'equation-angles'
    }
  ].forEach(function (item) {
    q.push({
      id: item.id,
      level: 'expert',
      topic: item.topic,
      type: item.type,
      answer: item.answer,
      options: item.options,
      tolerance: item.tolerance,
      prompt: item.prompt,
      visual: { kind: 'none' },
      difficultyScore: item.score
    });
  });

  window.EXAM_QUESTION_BANK = q;
})();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const homeBtn = document.getElementById('homeBtn');
const themeModeBtn = document.getElementById('themeModeBtn');
const fontModeBtn = document.getElementById('fontModeBtn');
const cbModeBtn = document.getElementById('cbModeBtn');
const langToggleBtn = document.getElementById('langToggleBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const questionProgressLabel = document.getElementById('questionProgressLabel');
const questionMixLabel = document.getElementById('questionMixLabel');
const questionNav = document.getElementById('questionNav');

const taskText = document.getElementById('taskText');
const statusText = document.getElementById('statusText');
const canvasHelp = document.getElementById('canvasHelp');

const fillInputLabel = document.getElementById('fillInputLabel');
const choiceTitle = document.getElementById('choiceTitle');
const matchTitle = document.getElementById('matchTitle');

const scoreLabel = document.getElementById('scoreLabel');
const correctLabel = document.getElementById('correctLabel');
const goalLabel = document.getElementById('goalLabel');

const difficultyBasicLabel = document.getElementById('difficultyBasicLabel');
const difficultyExpertLabel = document.getElementById('difficultyExpertLabel');

const scoreValue = document.getElementById('scoreValue');
const correctValue = document.getElementById('correctValue');
const goalValue = document.getElementById('goalValue');

const overlay = document.getElementById('levelClearOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const resultFinalScore = document.getElementById('resultFinalScore');
const resultAccuracy = document.getElementById('resultAccuracy');
const resultSuggestion = document.getElementById('resultSuggestion');
const resultCloseBtn = document.getElementById('resultCloseBtn');
const answerFeedbackOverlay = document.getElementById('answerFeedbackOverlay');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackResult = document.getElementById('feedbackResult');
const feedbackAnswer = document.getElementById('feedbackAnswer');
const feedbackAsk = document.getElementById('feedbackAsk');
const feedbackChoiceActions = document.getElementById('feedbackChoiceActions');
const feedbackSkipBtn = document.getElementById('feedbackSkipBtn');
const feedbackViewBtn = document.getElementById('feedbackViewBtn');
const feedbackExplanation = document.getElementById('feedbackExplanation');
const feedbackExplanationTitle = document.getElementById('feedbackExplanationTitle');
const feedbackExplanationText = document.getElementById('feedbackExplanationText');
const feedbackContinueBtn = document.getElementById('feedbackContinueBtn');

const fillBox = document.getElementById('fillAnswerBox');
const fillInput = document.getElementById('fillInput');
const submitFillBtn = document.getElementById('submitFillBtn');

const choiceBox = document.getElementById('choiceBox');
const choiceButtons = document.getElementById('choiceButtons');

const matchBox = document.getElementById('matchBox');
const matchRows = document.getElementById('matchRows');
const submitMatchBtn = document.getElementById('submitMatchBtn');

const PROGRESS_KEY = 'gcse_circle_quiz_progress_v1';
const UI_PREF_KEY = 'gcse_circle_ui_pref_v1';

const I18N = {
  zh: {
    langToggle: 'EN',
    home: '返回主页',
    themeLabel: '主题',
    fontLabel: '字体',
    colorLabel: '颜色',
    themeBright: '明亮',
    themeDark: '深色',
    themeEye: '护眼',
    fontStandard: '标准',
    fontLarge: '大号',
    fontXLarge: '特大',
    colorCbFriendly: '色盲友好',
    colorStandard: '标准',
    progressLabel: '第 {current} / {total} 题',
    mixLabelBasic: '基础题 5 + 图形题 5',
    mixLabelExpert: '高阶基础题 5 + 高阶图形题 5',
    noDiagramHint: '本题为基础知识题，无需读图。',
    assist: '测验模式：题目按所选难度从题库抽取，并尽量避免短时间重复。',
    startHint: '点击“开始测试”进入测验。',
    fillLabel: '填写答案',
    submitFill: '提交填空',
    choiceTitle: '选择正确答案',
    matchTitle: '定理配对',
    submitMatch: '提交配对',
    start: '开始测试',
    reset: '重置',
    basic: '基础',
    advanced: '进阶',
    expert: '专家',
    score: '分数',
    correct: '已答对',
    goal: '目标题数',
    overlayTitle: 'Results Page',
    overlayText: '你已完成本轮 10 题测试。',
    resultDone: '完成',
    suggestionHigh: '进入专家难度并尝试复合圆题（交圆公共弦、环形扇形）。',
    suggestionMid: '继续当前难度，再练习弦长与扇形面积计算。',
    suggestionLow: '先回到基础难度，重点复习圆心角/圆周角关系。',
    feedbackTitle: '作答结果',
    feedbackCorrect: '✅ 正确',
    feedbackWrong: '❌ 错误',
    feedbackAnswerPrefix: '正确答案：',
    feedbackAsk: '是否查看解析？',
    feedbackSkip: '不查看，下一题',
    feedbackView: '查看解析',
    feedbackExplanationTitle: '详细解答',
    feedbackContinue: '继续下一题',
    inputNumberHint: 'Please enter a number in degrees.',
    selectPlaceholder: '请选择',
    chooseAria: '选择',
    statusReady: '准备就绪。',
    statusStart: '测验开始，系统将按当前难度出题。',
    statusCorrect: '✅ 正确',
    statusWrong: '❌ 错误',
    statusWin: '通关成功。',
    statusEnd: '挑战结束。',
    statusDifficulty: '难度将在下一次开始时生效。',
    statusAlreadyAnswered: '该题已作答，可点击其他题号继续。',
    theorem_t1: '同弧圆心角是圆周角的 2 倍',
    theorem_t2: '直径所对圆周角是 90°',
    theorem_t3: '圆心到弦的垂线平分弦',
    diaNote: 'AB 是直径',
  },
  en: {
    langToggle: '中文',
    home: 'Back to homepage',
    themeLabel: 'Theme',
    fontLabel: 'Font',
    colorLabel: 'Color',
    themeBright: 'Bright',
    themeDark: 'Dark',
    themeEye: 'Eye care',
    fontStandard: 'Standard',
    fontLarge: 'Large',
    fontXLarge: 'X-Large',
    colorCbFriendly: 'Colorblind-friendly',
    colorStandard: 'Standard',
    progressLabel: 'Question {current} / {total}',
    mixLabelBasic: '5 basics + 5 diagram questions',
    mixLabelExpert: '5 advanced basics + 5 advanced diagrams',
    noDiagramHint: 'This is a concept-only question (no diagram needed).',
    assist: 'Quiz mode: questions are sampled by selected difficulty with repeat reduction.',
    startHint: 'Click "Start" to begin the quiz.',
    fillLabel: 'Fill answer',
    submitFill: 'Submit fill',
    choiceTitle: 'Choose the correct answer',
    matchTitle: 'Theorem matching',
    submitMatch: 'Submit match',
    start: 'Start Test',
    reset: 'Reset',
    basic: 'Basic',
    advanced: 'Advanced',
    expert: 'Expert',
    score: 'Score',
    correct: 'Correct',
    goal: 'Goal',
    overlayTitle: 'Results Page',
    overlayText: 'You have completed 10 questions.',
    resultDone: 'Done',
    suggestionHigh: 'Move to expert and focus on composite-circle problems.',
    suggestionMid: 'Stay at current level and practice chord/sector calculations.',
    suggestionLow: 'Step back to basic and review central vs inscribed angle rules.',
    feedbackTitle: 'Result',
    feedbackCorrect: '✅ Correct',
    feedbackWrong: '❌ Incorrect',
    feedbackAnswerPrefix: 'Correct answer: ',
    feedbackAsk: 'View full explanation?',
    feedbackSkip: 'Skip and continue',
    feedbackView: 'View explanation',
    feedbackExplanationTitle: 'Detailed solution',
    feedbackContinue: 'Continue',
    inputNumberHint: 'Please enter a number in degrees.',
    selectPlaceholder: 'Choose',
    chooseAria: 'Choose',
    statusReady: 'Ready.',
    statusStart: 'Quiz started. Questions follow the selected difficulty.',
    statusCorrect: '✅ Correct',
    statusWrong: '❌ Incorrect',
    statusWin: 'Level clear.',
    statusEnd: 'Challenge over.',
    statusDifficulty: 'Difficulty applies on next start.',
    statusAlreadyAnswered: 'This question is already answered. Jump to another number.',
    theorem_t1: 'Central angle is twice inscribed angle on the same arc',
    theorem_t2: 'Angle in a semicircle is 90 degrees',
    theorem_t3: 'Perpendicular from center to chord bisects the chord',
    diaNote: 'AB is diameter',
  },
};

const DIFFICULTY = {
  basic: { tol: 1.0, rounds: 8, scoreBase: 10 },
  expert: { tol: 0.4, rounds: 10, scoreBase: 15 },
};

let lang = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';

let state = {
  phase: 'idle',
  score: 0,
  solved: 0,
  answeredCount: 0,
  roundGoal: 0,
  difficulty: 'basic',
  currentQuestion: null,
  roundQuestions: [],
  roundResults: [],
  currentIndex: 0,
  waitingFeedback: false,
  statusKey: 'statusReady',
  statusVars: {},
};

let feedbackTimeout = null;

const progress = loadProgress();
const uiPrefs = loadUiPrefs();
const QUESTION_BANK = Array.isArray(window.EXAM_QUESTION_BANK) && window.EXAM_QUESTION_BANK.length > 0
  ? window.EXAM_QUESTION_BANK
  : buildQuestionBank();

function t(key, vars = {}) {
  let text = I18N[lang][key] || key;
  Object.keys(vars).forEach((name) => {
    text = text.replace('{' + name + '}', String(vars[name]));
  });
  return text;
}

function setStatus(key, vars = {}) {
  state.statusKey = key;
  state.statusVars = vars;
  statusText.textContent = t(key, vars);
}

function getSetting() {
  return DIFFICULTY[state.difficulty];
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffled(list) {
  return list.slice().sort(() => Math.random() - 0.5);
}

function drawBaseCircle(showCenterLabel = true) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = 185;

  ctx.fillStyle = '#fbfdff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1f4e8c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  if (showCenterLabel) {
    ctx.fillStyle = '#153050';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '16px "Noto Sans SC", "Trebuchet MS", sans-serif';
    ctx.fillText('O', cx + 10, cy - 8);
  }

  return { cx, cy, r };
}

function pointOnCircle(cx, cy, r, deg) {
  return {
    x: cx + Math.cos(degToRad(deg)) * r,
    y: cy + Math.sin(degToRad(deg)) * r,
  };
}

function lineIntersection(a, b, c, d) {
  const x1 = a.x, y1 = a.y;
  const x2 = b.x, y2 = b.y;
  const x3 = c.x, y3 = c.y;
  const x4 = d.x, y4 = d.y;
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(den) < 1e-8) return null;
  const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den;
  const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den;
  return { x: px, y: py };
}

function lineCircleIntersections(point, dir, center, radius) {
  const fx = point.x - center.x;
  const fy = point.y - center.y;
  const a = dir.x * dir.x + dir.y * dir.y;
  const b = 2 * (fx * dir.x + fy * dir.y);
  const c = fx * fx + fy * fy - radius * radius;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return [];
  const s = Math.sqrt(disc);
  const t1 = (-b - s) / (2 * a);
  const t2 = (-b + s) / (2 * a);
  return [
    { x: point.x + t1 * dir.x, y: point.y + t1 * dir.y, t: t1 },
    { x: point.x + t2 * dir.x, y: point.y + t2 * dir.y, t: t2 },
  ];
}

function markPoint(p, label) {
  ctx.fillStyle = '#16324f';
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px "Noto Sans SC", "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, p.x, p.y);
}

function drawAngleDiagram(centralAngle) {
  const { cx, cy, r } = drawBaseCircle();
  const a1 = degToRad(-90 - centralAngle / 2);
  const a2 = degToRad(-90 + centralAngle / 2);

  const A = { x: cx + Math.cos(a1) * r, y: cy + Math.sin(a1) * r };
  const B = { x: cx + Math.cos(a2) * r, y: cy + Math.sin(a2) * r };
  const C = { x: cx + Math.cos(degToRad(130)) * r, y: cy + Math.sin(degToRad(130)) * r };

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(A.x, A.y);
  ctx.moveTo(cx, cy);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#7b8a9a';
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();
  ctx.setLineDash([]);

  markPoint(A, 'A');
  markPoint(B, 'B');
  markPoint(C, 'C');

}

function drawDiameterDiagram() {
  const { cx, cy, r } = drawBaseCircle();
  const A = { x: cx - r, y: cy };
  const B = { x: cx + r, y: cy };
  const C = { x: cx, y: cy - r };

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  markPoint(A, 'A');
  markPoint(B, 'B');
  markPoint(C, 'C');

  ctx.fillStyle = '#1f4e8c';
  ctx.font = '16px "Noto Sans SC", "Trebuchet MS", sans-serif';
  ctx.fillText(t('diaNote'), cx - 70, cy + r + 30);
}

function drawChordDiagram(radius, angleDeg) {
  const { cx, cy, r } = drawBaseCircle();
  const a1 = degToRad(-90 - angleDeg / 2);
  const a2 = degToRad(-90 + angleDeg / 2);

  const D = { x: cx + Math.cos(a1) * r, y: cy + Math.sin(a1) * r };
  const E = { x: cx + Math.cos(a2) * r, y: cy + Math.sin(a2) * r };

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(D.x, D.y);
  ctx.lineTo(E.x, E.y);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(D.x, D.y);
  ctx.lineTo(E.x, E.y);
  ctx.stroke();

  markPoint(D, 'D');
  markPoint(E, 'E');

}

function drawIntersectingCirclesDiagram(r1, r2, d) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fbfdff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = 12;
  const R1 = r1 * scale;
  const R2 = r2 * scale;
  const D = d * scale;
  const cx1 = canvas.width * 0.38;
  const cy = canvas.height * 0.52;
  const cx2 = cx1 + D;

  // Intersection geometry for common chord PQ.
  const x = (d * d - r2 * r2 + r1 * r1) / (2 * d);
  const halfChord = Math.sqrt(Math.max(0, r1 * r1 - x * x));
  const px = cx1 + x * scale;

  const P = { x: px, y: cy - halfChord * scale };
  const Q = { x: px, y: cy + halfChord * scale };

  ctx.strokeStyle = '#1f4e8c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx1, cy, R1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx2, cy, R2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx1, cy);
  ctx.lineTo(cx2, cy);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(P.x, P.y);
  ctx.lineTo(Q.x, Q.y);
  ctx.stroke();

  markPoint({ x: cx1, y: cy }, 'O1');
  markPoint({ x: cx2, y: cy }, 'O2');
  markPoint(P, 'P');
  markPoint(Q, 'Q');

}

function drawRingSectorDiagram(R, r, thetaDeg) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fbfdff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 16;
  const scale = 11;
  const outerR = R * scale;
  const innerR = r * scale;
  const start = degToRad(-90 - thetaDeg / 2);
  const end = degToRad(-90 + thetaDeg / 2);
  const outerA = { x: cx + Math.cos(start) * outerR, y: cy + Math.sin(start) * outerR };
  const outerB = { x: cx + Math.cos(end) * outerR, y: cy + Math.sin(end) * outerR };
  const innerA = { x: cx + Math.cos(start) * innerR, y: cy + Math.sin(start) * innerR };
  const innerB = { x: cx + Math.cos(end) * innerR, y: cy + Math.sin(end) * innerR };

  ctx.strokeStyle = '#1f4e8c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, start, end);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, start, end);
  ctx.stroke();

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(innerA.x, innerA.y);
  ctx.lineTo(outerA.x, outerA.y);
  ctx.moveTo(innerB.x, innerB.y);
  ctx.lineTo(outerB.x, outerB.y);
  // Draw OA and OB to make ∠AOB explicit.
  ctx.moveTo(cx, cy);
  ctx.lineTo(outerA.x, outerA.y);
  ctx.moveTo(cx, cy);
  ctx.lineTo(outerB.x, outerB.y);
  ctx.stroke();

  markPoint({ x: cx, y: cy }, 'O');
  markPoint(outerA, 'A');
  markPoint(outerB, 'B');

}

function drawTangentChordDiagram(inscribedAngle) {
  const { cx, cy, r } = drawBaseCircle(false);
  const aA = degToRad(-150);
  const aB = degToRad(-20);
  const aC = degToRad(110);
  const A = { x: cx + Math.cos(aA) * r, y: cy + Math.sin(aA) * r };
  const B = { x: cx + Math.cos(aB) * r, y: cy + Math.sin(aB) * r };
  const C = { x: cx + Math.cos(aC) * r, y: cy + Math.sin(aC) * r };

  const tangentDir = { x: -(A.y - cy), y: A.x - cx };
  const len = Math.hypot(tangentDir.x, tangentDir.y) || 1;
  const ux = tangentDir.x / len;
  const uy = tangentDir.y / len;
  const T1 = { x: A.x - ux * 120, y: A.y - uy * 120 };
  const T2 = { x: A.x + ux * 120, y: A.y + uy * 120 };

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(T1.x, T1.y);
  ctx.lineTo(T2.x, T2.y);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  ctx.strokeStyle = '#1f4e8c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();

  markPoint(A, 'A');
  markPoint(B, 'B');
  markPoint(C, 'C');
  ctx.fillStyle = '#1f4e8c';
  ctx.font = '15px "Noto Sans SC", "Trebuchet MS", sans-serif';
  ctx.fillText('∠ACB=' + inscribedAngle + '°', C.x + 10, C.y - 10);
}

function drawIntersectChordsDiagram(AP, PB, CP) {
  const { cx, cy, r } = drawBaseCircle(false);
  const A = pointOnCircle(cx, cy, r, 200);
  const B = pointOnCircle(cx, cy, r, 20);
  const C = pointOnCircle(cx, cy, r, 105);
  const D = pointOnCircle(cx, cy, r, 285);
  const P = lineIntersection(A, B, C, D) || { x: cx, y: cy };

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.moveTo(C.x, C.y);
  ctx.lineTo(D.x, D.y);
  ctx.stroke();

  markPoint(A, 'A');
  markPoint(B, 'B');
  markPoint(C, 'C');
  markPoint(D, 'D');
  markPoint(P, 'P');

  ctx.fillStyle = '#1f4e8c';
  ctx.font = '15px "Noto Sans SC", "Trebuchet MS", sans-serif';
  ctx.fillText('AP=' + AP, (A.x + P.x) / 2 - 12, (A.y + P.y) / 2 - 8);
  ctx.fillText('PB=' + PB, (P.x + B.x) / 2 + 2, (P.y + B.y) / 2 - 8);
  ctx.fillText('CP=' + CP, (C.x + P.x) / 2 - 18, (C.y + P.y) / 2 + 8);
  ctx.fillText('PD=?', (D.x + P.x) / 2 + 4, (D.y + P.y) / 2 + 8);
}

function drawTangentPowerDiagram(TB, TC) {
  const { cx, cy, r } = drawBaseCircle(false);
  const T = { x: cx + r + 120, y: cy + 40 };
  const A = pointOnCircle(cx, cy, r, 20);
  const secantAngle = 195;
  const dir = { x: Math.cos(degToRad(secantAngle)), y: Math.sin(degToRad(secantAngle)) };
  const hits = lineCircleIntersections(T, dir, { x: cx, y: cy }, r).sort((p1, p2) => p1.t - p2.t);
  const B = hits[0] || pointOnCircle(cx, cy, r, 8);
  const C = hits[1] || pointOnCircle(cx, cy, r, 200);

  ctx.strokeStyle = '#0f6f76';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(T.x, T.y);
  ctx.lineTo(A.x, A.y);
  ctx.stroke();

  ctx.strokeStyle = '#e79a32';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(T.x, T.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.stroke();

  markPoint(T, 'T');
  markPoint(A, 'A');
  markPoint(B, 'B');
  markPoint(C, 'C');

  ctx.fillStyle = '#1f4e8c';
  ctx.font = '15px "Noto Sans SC", "Trebuchet MS", sans-serif';
  ctx.fillText('TB=' + TB, (T.x + B.x) / 2 + 4, (T.y + B.y) / 2 - 8);
  ctx.fillText('TC=' + TC, (T.x + C.x) / 2 - 24, (T.y + C.y) / 2 + 12);
  ctx.fillText('TA=?', (T.x + A.x) / 2 + 10, (T.y + A.y) / 2 - 10);
}

function drawVisual(visual) {
  if (visual && visual.kind === 'none') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fbfdff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#39506a';
    ctx.font = '600 24px "Noto Sans SC", "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t('noDiagramHint'), canvas.width / 2, canvas.height / 2);
    return;
  }
  if (!visual || visual.kind === 'base') {
    drawBaseCircle();
    return;
  }
  if (visual.kind === 'angle') drawAngleDiagram(visual.centralAngle);
  if (visual.kind === 'diameter') drawDiameterDiagram();
  if (visual.kind === 'chord') drawChordDiagram(visual.radius, visual.angleDeg);
  if (visual.kind === 'intersect-circles') drawIntersectingCirclesDiagram(visual.r1, visual.r2, visual.d);
  if (visual.kind === 'ring-sector') drawRingSectorDiagram(visual.R, visual.r, visual.thetaDeg);
  if (visual.kind === 'tangent-chord') drawTangentChordDiagram(visual.inscribedAngle);
  if (visual.kind === 'intersect-chords') drawIntersectChordsDiagram(visual.AP, visual.PB, visual.CP);
  if (visual.kind === 'tangent-power') drawTangentPowerDiagram(visual.TB, visual.TC);
}

function buildQuestionBank() {
  const bank = [];

  const centralAngles = [40, 60, 80, 100, 120, 140, 150, 170];
  centralAngles.forEach((a) => {
    bank.push({
      id: 'inscribed_' + a,
      level: a <= 120 ? 'basic' : 'advanced',
      topic: 'angles',
      type: 'fill',
      answer: a / 2,
      tolerance: 0.5,
      data: { central: a },
      prompt: {
        zh: '在同一圆中，已知圆心角 ∠AOB = ' + a + '°（对应弧 AB），求同弧圆周角 ∠ACB。',
        en: 'In the same circle, given central angle ∠AOB = ' + a + '° (subtending arc AB), find inscribed angle ∠ACB.',
      },
      visual: { kind: 'angle', centralAngle: a },
    });
  });

  const inscribedAngles = [20, 25, 30, 35, 40, 55, 65, 75];
  inscribedAngles.forEach((a) => {
    bank.push({
      id: 'central_' + a,
      level: a <= 55 ? 'basic' : 'advanced',
      topic: 'angles',
      type: 'fill',
      answer: a * 2,
      tolerance: 0.5,
      data: { inscribed: a },
      prompt: {
        zh: '在同一圆中，已知圆周角 ∠ACB = ' + a + '°（对应弧 AB），求同弧圆心角 ∠AOB。',
        en: 'In the same circle, given inscribed angle ∠ACB = ' + a + '° (subtending arc AB), find central angle ∠AOB.',
      },
      visual: { kind: 'angle', centralAngle: a * 2 },
    });
  });

  const chordCases = [
    { r: 6, t: 44 },
    { r: 7, t: 60 },
    { r: 8, t: 90 },
    { r: 9, t: 72 },
    { r: 10, t: 110 },
    { r: 12, t: 70 },
    { r: 14, t: 130 },
    { r: 16, t: 95 },
  ];
  chordCases.forEach((item, idx) => {
    bank.push({
      id: 'chord_' + idx,
      level: idx < 3 ? 'basic' : idx < 6 ? 'advanced' : 'expert',
      topic: 'chord',
      type: 'fill',
      answer: Number((2 * item.r * Math.sin(degToRad(item.t / 2))).toFixed(1)),
      tolerance: 0.2,
      data: { r: item.r, theta: item.t },
      prompt: {
        zh: '已知半径 r = ' + item.r + '，且 θ = ∠DOE = ' + item.t + '°，求对应弦 DE 长（保留 1 位小数）。',
        en: 'Given radius r = ' + item.r + ' and θ = ∠DOE = ' + item.t + '°, find chord DE (1 d.p.).',
      },
      visual: { kind: 'chord', radius: item.r, angleDeg: item.t },
    });
  });

  const sectorCases = [
    { r: 6, t: 45 },
    { r: 8, t: 90 },
    { r: 10, t: 120 },
    { r: 12, t: 150 },
    { r: 14, t: 135 },
  ];
  sectorCases.forEach((item, idx) => {
    bank.push({
      id: 'sector_' + idx,
      level: idx < 2 ? 'advanced' : 'expert',
      topic: 'area',
      type: 'fill',
      answer: Number((((item.t / 360) * Math.PI * item.r * item.r)).toFixed(1)),
      tolerance: 0.3,
      data: { r: item.r, theta: item.t },
      prompt: {
        zh: '已知半径 r = ' + item.r + '，且 θ = ∠AOB = ' + item.t + '°，求扇形 AOB 面积（保留 1 位小数）。',
        en: 'Given radius r = ' + item.r + ' and θ = ∠AOB = ' + item.t + '°, find area of sector AOB (1 d.p.).',
      },
      visual: { kind: 'angle', centralAngle: item.t },
    });
  });

  [1, 2, 3, 4].forEach((n) => {
    bank.push({
      id: 'diameter_mcq_' + n,
      level: n <= 2 ? 'basic' : 'advanced',
      topic: 'diameter',
      type: 'mcq',
      answer: '90°',
      options: ['45°', '60°', '90°', '120°'],
      data: { theorem: 'diameter-right-angle' },
      prompt: {
        zh: '已知 AB 为直径，求圆周角 ∠ACB。',
        en: 'AB is a diameter. Find inscribed angle ∠ACB.',
      },
      visual: { kind: 'diameter' },
    });
  });

  bank.push({
    id: 'match_core_1',
    level: 'advanced',
    topic: 'theorem',
    type: 'match',
    pairs: [
      { statement: { zh: '同弧圆周角与圆心角的数量关系', en: 'Relation between inscribed and central angles on one arc' }, theoremKey: 't1' },
      { statement: { zh: '直径相关的圆周角结论', en: 'Inscribed-angle conclusion with diameter' }, theoremKey: 't2' },
      { statement: { zh: '圆心到弦的垂线性质', en: 'Property of perpendicular from center to chord' }, theoremKey: 't3' },
    ],
    prompt: {
      zh: '将每条描述配对到正确定理。',
      en: 'Match each statement to the correct theorem.',
    },
    visual: { kind: 'base' },
  });

  bank.push({
    id: 'match_core_2',
    level: 'expert',
    topic: 'theorem',
    type: 'match',
    pairs: [
      { statement: { zh: '直径所对圆周角固定为直角', en: 'Angle subtended by diameter is always right angle' }, theoremKey: 't2' },
      { statement: { zh: '同弧圆心角与圆周角关系', en: 'Relation of central and inscribed angles on same arc' }, theoremKey: 't1' },
      { statement: { zh: '圆心到弦作垂线后的结果', en: 'Result after drawing perpendicular from center to chord' }, theoremKey: 't3' },
    ],
    prompt: {
      zh: '将每条描述配对到正确定理。',
      en: 'Match each statement to the correct theorem.',
    },
    visual: { kind: 'base' },
  });

  // Expert composite-circle questions (position-dependent multi-circle).
  const intersectCases = [
    { id: 'expert_intersect_chord_1', r1: 10, r2: 9, d: 11 },
    { id: 'expert_intersect_chord_2', r1: 12, r2: 8, d: 10 },
  ];
  intersectCases.forEach((item) => {
    const x = (item.d * item.d - item.r2 * item.r2 + item.r1 * item.r1) / (2 * item.d);
    const pq = Number((2 * Math.sqrt(Math.max(0, item.r1 * item.r1 - x * x))).toFixed(1));
    bank.push({
      id: item.id,
      level: 'expert',
      topic: 'composite',
      type: 'fill',
      answer: pq,
      tolerance: 0.2,
      data: { r1: item.r1, r2: item.r2, d: item.d },
      prompt: {
        zh: '两圆相交，圆心分别为 O1/O2，半径 r1=' + item.r1 + '、r2=' + item.r2 + '，且圆心距 d=|O1O2|=' + item.d + '。求公共弦 PQ 长（保留 1 位小数）。',
        en: 'Two circles intersect with centers O1/O2, radii r1=' + item.r1 + ', r2=' + item.r2 + ', and center distance d=|O1O2|=' + item.d + '. Find common chord length PQ (1 d.p.).',
      },
      visual: { kind: 'intersect-circles', r1: item.r1, r2: item.r2, d: item.d },
    });
  });

  const ringSectorCases = [
    { id: 'expert_ring_sector_1', R: 13, r: 8, t: 150 },
    { id: 'expert_ring_sector_2', R: 12, r: 7, t: 210 },
  ];
  ringSectorCases.forEach((item) => {
    bank.push({
      id: item.id,
      level: 'expert',
      topic: 'composite',
      type: 'fill',
      answer: Number((((item.t / 360) * Math.PI * (item.R * item.R - item.r * item.r))).toFixed(1)),
      tolerance: 0.35,
      data: { R: item.R, r: item.r, theta: item.t },
      prompt: {
        zh: '同心圆环中，外半径 R=' + item.R + '，内半径 r=' + item.r + '，A/B 为环形扇形边界端点，且 θ=∠AOB=' + item.t + '°。求环形扇形面积（保留 1 位小数）。',
        en: 'In the concentric ring, outer radius R=' + item.R + ', inner radius r=' + item.r + ', A/B are boundary endpoints, and θ=∠AOB=' + item.t + '°. Find annular sector area (1 d.p.).',
      },
      visual: { kind: 'ring-sector', R: item.R, r: item.r, thetaDeg: item.t },
    });
  });

  return bank;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { stats: {}, recent: [] };
    const parsed = JSON.parse(raw);
    return {
      stats: parsed.stats || {},
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
    };
  } catch (error) {
    return { stats: {}, recent: [] };
  }
}

function loadUiPrefs() {
  try {
    const raw = localStorage.getItem(UI_PREF_KEY);
    if (!raw) return { themeMode: 'bright', colorMode: 'cb', fontScale: 'standard' };
    const parsed = JSON.parse(raw);

    // Backward compatibility with previous preference schema.
    const legacyThemeMode = parsed.darkMode ? 'dark' : 'bright';
    const legacyColorMode = parsed.cbSafeMode ? 'cb' : 'standard';
    const legacyFontScale = parsed.fontSize === 'large' ? 'large' : 'standard';

    const themeMode = ['bright', 'dark', 'eye'].includes(parsed.themeMode) ? parsed.themeMode : legacyThemeMode;
    const colorMode = ['cb', 'standard'].includes(parsed.colorMode) ? parsed.colorMode : legacyColorMode;
    const fontScale = ['standard', 'large', 'xlarge'].includes(parsed.fontScale) ? parsed.fontScale : legacyFontScale;

    return {
      themeMode,
      colorMode,
      fontScale,
    };
  } catch (error) {
    return { themeMode: 'bright', colorMode: 'cb', fontScale: 'standard' };
  }
}

function saveUiPrefs() {
  localStorage.setItem(UI_PREF_KEY, JSON.stringify(uiPrefs));
}

function applyVisualPrefs() {
  document.body.classList.remove('theme-bright', 'theme-dark', 'theme-eye');
  document.body.classList.add('theme-' + uiPrefs.themeMode);
  document.body.classList.toggle('cb-safe-mode', uiPrefs.colorMode === 'cb');
  document.body.setAttribute('data-font-size', uiPrefs.fontScale);
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function questionLevelRank(level) {
  return level === 'basic' ? 1 : level === 'advanced' ? 2 : 3;
}

function getRunProgress() {
  if (!state.roundGoal) return 0;
  return clamp(state.solved / state.roundGoal, 0, 1);
}

function getDifficultyBand() {
  if (state.difficulty === 'basic') {
    return { minRank: 1, maxRank: 1 };
  }

  // Expert starts hard immediately: only expert-ranked questions.
  return { minRank: 3, maxRank: 3 };
}

function allowedQuestion(question, band) {
  const rank = questionLevelRank(question.level);
  return rank >= band.minRank && rank <= band.maxRank;
}

function getEffectiveTolerance(question) {
  const baseTolerance = question.tolerance != null ? question.tolerance : getSetting().tol;

  if (state.difficulty === 'expert') {
    // Keep expert strict from the first question.
    return baseTolerance * 0.75;
  }

  return baseTolerance;
}

function getQuestionStats(questionId) {
  if (!progress.stats[questionId]) {
    progress.stats[questionId] = {
      seen: 0,
      correct: 0,
      wrong: 0,
      mastery: 0,
      lastSeenAt: 0,
    };
  }
  return progress.stats[questionId];
}

function getQuestionWeight(question) {
  const stats = getQuestionStats(question.id);
  const now = Date.now();
  const levelRank = questionLevelRank(question.level);
  const recencyPenalty = progress.recent.includes(question.id) ? 0.08 : 1;
  const noveltyBoost = stats.seen === 0 ? 1.25 : 1;
  const difficultyBoost = state.difficulty === 'expert'
    ? (levelRank === 3 ? 1.25 : 1)
    : 1;
  const staleBoost = stats.lastSeenAt === 0 ? 1 : clamp((now - stats.lastSeenAt) / (1000 * 60 * 20), 0.4, 1.6);
  const weight = noveltyBoost * difficultyBoost * recencyPenalty * staleBoost;
  return clamp(weight, 0.01, 9);
}

function weightedPick(candidates) {
  const total = candidates.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) return candidates[randomInt(0, candidates.length - 1)].question;
  let cursor = Math.random() * total;
  for (let i = 0; i < candidates.length; i += 1) {
    cursor -= candidates[i].weight;
    if (cursor <= 0) return candidates[i].question;
  }
  return candidates[candidates.length - 1].question;
}

function isVisualQuestion(question) {
  return Boolean(question.visual && question.visual.kind && question.visual.kind !== 'none');
}

function getQuestionComplexity(question) {
  if (typeof question.difficultyScore === 'number') return question.difficultyScore;
  const topicScore = {
    'diameter-theorem': 2.5,
    'inscribed-angle': 3,
    'central-angle': 3,
    'chord-length': 4.5,
    'annular-sector': 7.5,
    'two-circles-common-chord': 8.2,
    'tangent-chord-angle': 7.2,
    'intersecting-chords-theorem': 8.4,
    'tangent-secant-power': 8.8,
  };
  const base = topicScore[question.topic] || 5;
  return question.level === 'expert' ? base + 1 : base;
}

function chooseQuestionsFromPool(pool, count, preferHard) {
  const available = pool.slice();
  const selected = [];

  while (selected.length < count && available.length > 0) {
    const scored = available.map((q) => {
      const complexity = getQuestionComplexity(q);
      const complexityBoost = preferHard
        ? (1 + complexity / 10)
        : (1 + (12 - complexity) / 12);
      return { question: q, weight: getQuestionWeight(q) * complexityBoost };
    });
    const pick = weightedPick(scored);
    selected.push(pick);
    const idx = available.findIndex((q) => q.id === pick.id);
    if (idx >= 0) available.splice(idx, 1);
  }

  return selected;
}

function buildRoundQuestions() {
  const band = getDifficultyBand();
  let eligible = QUESTION_BANK.filter((q) => allowedQuestion(q, band));

  // Safety fallback for sparse pools.
  if (eligible.length < 10) {
    const fallbackBand = state.difficulty === 'expert'
      ? { minRank: 3, maxRank: 3 }
      : { minRank: 1, maxRank: questionLevelRank(state.difficulty) };
    eligible = QUESTION_BANK.filter((q) => allowedQuestion(q, fallbackBand));
  }

  const textPool = eligible.filter((q) => !isVisualQuestion(q));
  const visualPool = eligible.filter((q) => isVisualQuestion(q));
  const preferHard = state.difficulty === 'expert';

  const selectedText = chooseQuestionsFromPool(textPool, 5, preferHard);
  const usedIds = new Set(selectedText.map((q) => q.id));
  const visualCandidates = visualPool.filter((q) => !usedIds.has(q.id));
  const selectedVisual = chooseQuestionsFromPool(visualCandidates, 5, preferHard);

  // Final fallback if any side is short.
  if (selectedText.length < 5) {
    const backup = chooseQuestionsFromPool(eligible.filter((q) => !usedIds.has(q.id)), 5 - selectedText.length, preferHard);
    backup.forEach((q) => {
      if (!usedIds.has(q.id)) {
        selectedText.push(q);
        usedIds.add(q.id);
      }
    });
  }
  if (selectedVisual.length < 5) {
    const backup = chooseQuestionsFromPool(eligible.filter((q) => !usedIds.has(q.id)), 5 - selectedVisual.length, preferHard);
    backup.forEach((q) => {
      if (!usedIds.has(q.id)) {
        selectedVisual.push(q);
        usedIds.add(q.id);
      }
    });
  }

  return selectedText.slice(0, 5).concat(selectedVisual.slice(0, 5));
}

function pickQuestion() {
  state.currentQuestion = state.roundQuestions[state.currentIndex] || null;
  renderQuestion();
}

function rememberQuestionSeen(questionId) {
  const stats = getQuestionStats(questionId);
  stats.seen += 1;
  stats.lastSeenAt = Date.now();
  progress.recent = progress.recent.filter((id) => id !== questionId);
  progress.recent.push(questionId);
  const maxRecent = 10;
  if (progress.recent.length > maxRecent) {
    progress.recent = progress.recent.slice(progress.recent.length - maxRecent);
  }
}

function recordAnswer(questionId, isCorrect) {
  const stats = getQuestionStats(questionId);
  if (isCorrect) {
    stats.correct += 1;
    stats.mastery = clamp(stats.mastery + 0.16, 0, 1);
  } else {
    stats.wrong += 1;
    stats.mastery = clamp(stats.mastery - 0.24, 0, 1);
  }
  saveProgress();
}

function hideAllAnswerBoxes() {
  fillBox.hidden = true;
  choiceBox.hidden = true;
  matchBox.hidden = true;
}

function findNextUnansweredIndex(startIndex) {
  for (let i = startIndex; i < state.roundGoal; i += 1) {
    if (state.roundResults[i] == null) return i;
  }
  return -1;
}

function goToQuestion(index) {
  if (state.phase !== 'playing' || state.waitingFeedback) return;
  if (index < 0 || index >= state.roundGoal) return;
  state.currentIndex = index;
  state.currentQuestion = state.roundQuestions[state.currentIndex] || null;
  renderQuestion(false);
}

function updateQuestionNav() {
  const total = state.roundGoal || 10;
  questionNav.innerHTML = '';

  for (let i = 0; i < total; i += 1) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'question-chip';
    chip.textContent = String(i + 1);
    chip.setAttribute('role', 'listitem');
    chip.setAttribute('aria-label', String(i + 1));
    if (state.roundResults[i] === true) chip.classList.add('correct');
    if (state.roundResults[i] === false) chip.classList.add('wrong');
    if (i < state.answeredCount && state.roundResults[i] == null) chip.classList.add('done');
    if (state.phase === 'playing' && i === state.currentIndex) chip.classList.add('current');
    chip.addEventListener('click', () => goToQuestion(i));
    questionNav.appendChild(chip);
  }

  const current = state.phase === 'playing'
    ? Math.min(state.currentIndex + 1, total)
    : Math.min(state.answeredCount, total);
  questionProgressLabel.textContent = t('progressLabel', { current, total });
  questionMixLabel.textContent = state.difficulty === 'expert' ? t('mixLabelExpert') : t('mixLabelBasic');
}

function renderQuestion(countAsSeen = true) {
  const q = state.currentQuestion;
  updateQuestionNav();
  if (!q) return;
  const answered = state.roundResults[state.currentIndex] != null;

  hideAllAnswerBoxes();
  taskText.textContent = q.prompt[lang];
  drawVisual(q.visual);
  if (countAsSeen) {
    rememberQuestionSeen(q.id);
    saveProgress();
  }

  if (q.type === 'fill') {
    fillBox.hidden = false;
    fillInput.value = answered ? String(q.answer) : '';
    fillInput.disabled = answered;
    submitFillBtn.disabled = answered;
    fillInput.focus();
  }

  if (q.type === 'mcq') {
    choiceBox.hidden = false;
    renderChoices(q.options, answered);
  }

  if (q.type === 'match') {
    matchBox.hidden = false;
    renderMatchRows(q.pairs, answered);
    submitMatchBtn.disabled = answered;
  }
}

function renderChoices(options, locked = false) {
  choiceButtons.innerHTML = '';
  shuffled(options).forEach((option) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = option;
    btn.disabled = locked;
    btn.setAttribute('aria-label', t('chooseAria') + ' ' + option);
    btn.addEventListener('click', () => evaluateAnswer(option));
    choiceButtons.appendChild(btn);
  });
}

function renderMatchRows(pairs, locked = false) {
  matchRows.innerHTML = '';
  pairs.forEach((pair, index) => {
    const row = document.createElement('div');
    row.className = 'match-row';

    const title = document.createElement('div');
    title.textContent = index + 1 + '. ' + pair.statement[lang];

    const select = document.createElement('select');
    select.disabled = locked;
    select.setAttribute('aria-label', t('chooseAria') + ' ' + (index + 1));

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = t('selectPlaceholder');
    select.appendChild(placeholder);

    shuffled(['t1', 't2', 't3']).forEach((itemKey) => {
      const op = document.createElement('option');
      op.value = itemKey;
      op.textContent = t('theorem_' + itemKey);
      select.appendChild(op);
    });

    row.appendChild(title);
    row.appendChild(select);
    matchRows.appendChild(row);
  });
}

function updateStatusPanel() {
  scoreValue.textContent = state.score;
  correctValue.textContent = state.solved;
  goalValue.textContent = state.roundGoal;
  updateQuestionNav();
}

function getSuggestedNextStep(accuracy) {
  if (accuracy >= 85) return t('suggestionHigh');
  if (accuracy >= 60) return t('suggestionMid');
  return t('suggestionLow');
}

function triggerFeedback(kind) {
  document.body.classList.remove('feedback-correct', 'feedback-wrong');
  if (feedbackTimeout) clearTimeout(feedbackTimeout);
  document.body.classList.add(kind === 'correct' ? 'feedback-correct' : 'feedback-wrong');
  feedbackTimeout = setTimeout(() => {
    document.body.classList.remove('feedback-correct', 'feedback-wrong');
  }, 420);
}

function formatAnswerText(question) {
  if (question.type === 'fill') {
    return String(question.answer);
  }
  if (question.type === 'mcq') {
    return question.answer;
  }
  if (question.type === 'match') {
    return question.pairs
      .map((pair, idx) => (idx + 1) + '. ' + pair.statement[lang] + ' -> ' + t('theorem_' + pair.theoremKey))
      .join(' | ');
  }
  return '--';
}

function getDetailedSolution(question) {
  const d = question.data || {};
  const ans = formatAnswerText(question);

  if (question.id.startsWith('inscribed_')) {
    const central = d.central;
    const inscribed = question.answer;
    if (lang === 'zh') {
      return '同弧定理：圆周角 = 圆心角 / 2\\n' +
        '已知 ∠AOB = ' + central + '°\\n' +
        '所以 ∠ACB = ' + central + ' / 2 = ' + inscribed + '°';
    }
    return 'Theorem: inscribed angle = central angle / 2 on the same arc.\\n' +
      'Given ∠AOB = ' + central + '°.\\n' +
      'So ∠ACB = ' + central + ' / 2 = ' + inscribed + '°.';
  }

  if (question.id.startsWith('central_')) {
    const inscribed = d.inscribed;
    const central = question.answer;
    if (lang === 'zh') {
      return '同弧定理：圆心角 = 2 × 圆周角\\n' +
        '已知 ∠ACB = ' + inscribed + '°\\n' +
        '所以 ∠AOB = 2 × ' + inscribed + ' = ' + central + '°';
    }
    return 'Theorem: central angle = 2 × inscribed angle on the same arc.\\n' +
      'Given ∠ACB = ' + inscribed + '°.\\n' +
      'So ∠AOB = 2 × ' + inscribed + ' = ' + central + '°.';
  }

  if (question.id.startsWith('chord_')) {
    const r = d.r;
    const theta = d.theta;
    if (lang === 'zh') {
      return '弦长公式：c = 2r sin(θ/2)\\n' +
        '代入：c = 2×' + r + '×sin(' + theta + '°/2)\\n' +
        'c = ' + ans;
    }
    return 'Chord formula: c = 2r sin(θ/2).\\n' +
      'Substitute: c = 2×' + r + '×sin(' + theta + '°/2).\\n' +
      'c = ' + ans + '.';
  }

  if (question.id.startsWith('sector_')) {
    const r = d.r;
    const theta = d.theta;
    if (lang === 'zh') {
      return '扇形面积公式：S = (θ/360)πr²\\n' +
        '代入：S = (' + theta + '/360)×π×' + r + '²\\n' +
        'S = ' + ans;
    }
    return 'Sector area formula: S = (θ/360)πr².\\n' +
      'Substitute: S = (' + theta + '/360)×π×' + r + '².\\n' +
      'S = ' + ans + '.';
  }

  if (question.id.startsWith('diameter_')) {
    if (lang === 'zh') {
      return '直径所对的圆周角恒为 90°（半圆定理），所以答案是 90°。';
    }
    return 'Angle in a semicircle is always 90 degrees, so the answer is 90°.';
  }

  if (question.id.startsWith('expert_intersect_chord_')) {
    const r1 = d.r1;
    const r2 = d.r2;
    const dist = d.d;
    const x = (dist * dist - r2 * r2 + r1 * r1) / (2 * dist);
    if (lang === 'zh') {
      return '两相交圆公共弦公式：先求 O1 到公共弦中点的距离 x\\n' +
        'x = (d² - r2² + r1²) / (2d)\\n' +
        'x = (' + dist + '² - ' + r2 + '² + ' + r1 + '²) / (2×' + dist + ') = ' + Number(x.toFixed(3)) + '\\n' +
        '半弦 = √(r1² - x²)，所以 PQ = 2√(r1² - x²)\\n' +
        'PQ = ' + ans;
    }
    return 'For intersecting circles, first compute x (distance from O1 to midpoint of common chord):\\n' +
      'x = (d² - r2² + r1²) / (2d)\\n' +
      'x = (' + dist + '² - ' + r2 + '² + ' + r1 + '²) / (2×' + dist + ') = ' + Number(x.toFixed(3)) + '\\n' +
      'Half-chord = √(r1² - x²), so PQ = 2√(r1² - x²).\\n' +
      'PQ = ' + ans + '.';
  }

  if (question.id.startsWith('expert_ring_sector_')) {
    const R = d.R;
    const r = d.r;
    const theta = d.theta;
    if (lang === 'zh') {
      return '环形扇形面积 = 外扇形面积 - 内扇形面积\\n' +
        'S = (θ/360)π(R² - r²)\\n' +
        'S = (' + theta + '/360)×π×(' + R + '² - ' + r + '²)\\n' +
        'S = ' + ans;
    }
    return 'Annular sector area = outer sector area - inner sector area.\\n' +
      'S = (θ/360)π(R² - r²)\\n' +
      'S = (' + theta + '/360)×π×(' + R + '² - ' + r + '²)\\n' +
      'S = ' + ans + '.';
  }

  if (question.id.startsWith('tangent_chord_')) {
    const inscribed = d.inscribed;
    if (lang === 'zh') {
      return '弦切角定理（交替弧定理）：切线与弦所夹角 = 对应弧所对圆周角。\\n' +
        '已知 ∠ACB=' + inscribed + '°，所以 ∠TAB=' + inscribed + '°。';
    }
    return 'Alternate segment theorem: angle between tangent and chord equals the inscribed angle in the opposite arc.\\n' +
      'Given ∠ACB=' + inscribed + '°, therefore ∠TAB=' + inscribed + '°.';
  }

  if (question.id.startsWith('intersect_chords_')) {
    const AP = d.AP;
    const PB = d.PB;
    const CP = d.CP;
    if (lang === 'zh') {
      return '相交弦定理：AP×PB = CP×PD。\\n' +
        '所以 PD = (AP×PB)/CP = (' + AP + '×' + PB + ')/' + CP + ' = ' + ans + '。';
    }
    return 'Intersecting chords theorem: AP×PB = CP×PD.\\n' +
      'So PD = (AP×PB)/CP = (' + AP + '×' + PB + ')/' + CP + ' = ' + ans + '.';
  }

  if (question.id.startsWith('tangent_power_')) {
    const TB = d.TB;
    const TC = d.TC;
    if (lang === 'zh') {
      return '切线幂定理：TA² = TB×TC。\\n' +
        'TA = √(TB×TC) = √(' + TB + '×' + TC + ') = ' + ans + '。';
    }
    return 'Tangent-secant power theorem: TA² = TB×TC.\\n' +
      'TA = √(TB×TC) = √(' + TB + '×' + TC + ') = ' + ans + '.';
  }

  if (question.type === 'match') {
    if (lang === 'zh') {
      return '配对依据：\\n' + formatAnswerText(question);
    }
    return 'Matching rationale:\\n' + formatAnswerText(question);
  }

  return lang === 'zh' ? '按定义与公式代入计算，得到答案：' + ans : 'Substitute into the relevant theorem/formula to get: ' + ans;
}

function showAnswerFeedbackPopup(correct, question) {
  feedbackTitle.textContent = t('feedbackTitle');
  feedbackResult.textContent = correct ? t('feedbackCorrect') : t('feedbackWrong');
  feedbackAnswer.textContent = t('feedbackAnswerPrefix') + formatAnswerText(question);
  feedbackAsk.textContent = t('feedbackAsk');
  feedbackSkipBtn.textContent = t('feedbackSkip');
  feedbackViewBtn.textContent = t('feedbackView');
  feedbackExplanationTitle.textContent = t('feedbackExplanationTitle');
  feedbackExplanationText.textContent = getDetailedSolution(question);
  feedbackExplanation.hidden = true;
  feedbackChoiceActions.hidden = false;
  feedbackContinueBtn.hidden = true;
  feedbackContinueBtn.textContent = t('feedbackContinue');
  answerFeedbackOverlay.classList.add('show');
  answerFeedbackOverlay.setAttribute('aria-hidden', 'false');
}

function hideAnswerFeedbackPopup() {
  answerFeedbackOverlay.classList.remove('show');
  answerFeedbackOverlay.setAttribute('aria-hidden', 'true');
}

function evaluateAnswer(rawValue) {
  if (state.phase !== 'playing' || !state.currentQuestion || state.waitingFeedback) return;
  if (state.roundResults[state.currentIndex] != null) {
    setStatus('statusAlreadyAnswered');
    return;
  }
  const q = state.currentQuestion;
  let correct = false;

  if (q.type === 'fill') {
    const user = Number(rawValue);
    if (!Number.isNaN(user)) {
      const tolerance = getEffectiveTolerance(q);
      correct = Math.abs(user - q.answer) <= tolerance;
    } else {
      setStatus('inputNumberHint');
      return;
    }
  }

  if (q.type === 'mcq') {
    correct = rawValue === q.answer;
  }

  resolveAnswer(correct);
}

function evaluateMatchAnswer() {
  if (state.phase !== 'playing' || !state.currentQuestion || state.currentQuestion.type !== 'match' || state.waitingFeedback) return;
  if (state.roundResults[state.currentIndex] != null) {
    setStatus('statusAlreadyAnswered');
    return;
  }
  const selects = Array.from(matchRows.querySelectorAll('select'));
  const chosen = selects.map((el) => el.value);
  const expected = state.currentQuestion.pairs.map((item) => item.theoremKey);
  const correct = chosen.length === expected.length && chosen.every((item, idx) => item === expected[idx]);
  resolveAnswer(correct);
}

function resolveAnswer(correct) {
  const q = state.currentQuestion;
  if (!q) return;

  recordAnswer(q.id, correct);
  state.waitingFeedback = true;
  state.roundResults[state.currentIndex] = correct;
  state.answeredCount += 1;

  if (correct) {
    state.score += getSetting().scoreBase;
    state.solved += 1;
    triggerFeedback('correct');
    setStatus('statusCorrect');
  } else {
    triggerFeedback('wrong');
    setStatus('statusWrong');
  }

  updateStatusPanel();
  showAnswerFeedbackPopup(correct, q);
}

function setRadioLabel(labelEl, text) {
  const input = labelEl.querySelector('input');
  labelEl.textContent = '';
  labelEl.appendChild(input);
  labelEl.append(' ' + text);
}

function applyLanguage() {
  document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
  langToggleBtn.textContent = t('langToggle');
  homeBtn.textContent = t('home');
  homeBtn.setAttribute('aria-label', t('home'));
  const themeKey = uiPrefs.themeMode === 'dark'
    ? 'themeDark'
    : uiPrefs.themeMode === 'eye'
      ? 'themeEye'
      : 'themeBright';
  const fontKey = uiPrefs.fontScale === 'xlarge'
    ? 'fontXLarge'
    : uiPrefs.fontScale === 'large'
      ? 'fontLarge'
      : 'fontStandard';
  const colorKey = uiPrefs.colorMode === 'cb' ? 'colorCbFriendly' : 'colorStandard';

  themeModeBtn.textContent = t('themeLabel') + ': ' + t(themeKey);
  themeModeBtn.setAttribute('aria-label', themeModeBtn.textContent);
  fontModeBtn.textContent = t('fontLabel') + ': ' + t(fontKey);
  fontModeBtn.setAttribute('aria-label', fontModeBtn.textContent);
  cbModeBtn.textContent = t('colorLabel') + ': ' + t(colorKey);
  cbModeBtn.setAttribute('aria-label', cbModeBtn.textContent);

  canvasHelp.textContent = t('assist');
  fillInputLabel.textContent = t('fillLabel');
  submitFillBtn.textContent = t('submitFill');
  choiceTitle.textContent = t('choiceTitle');
  matchTitle.textContent = t('matchTitle');
  submitMatchBtn.textContent = t('submitMatch');

  startBtn.textContent = t('start');
  resetBtn.textContent = t('reset');

  scoreLabel.textContent = t('score');
  correctLabel.textContent = t('correct');
  goalLabel.textContent = t('goal');

  setRadioLabel(difficultyBasicLabel, t('basic'));
  setRadioLabel(difficultyExpertLabel, t('expert'));

  overlayTitle.textContent = t('overlayTitle');
  overlayText.textContent = t('overlayText');
  resultCloseBtn.textContent = t('resultDone');
  feedbackTitle.textContent = t('feedbackTitle');
  feedbackAsk.textContent = t('feedbackAsk');
  feedbackSkipBtn.textContent = t('feedbackSkip');
  feedbackViewBtn.textContent = t('feedbackView');
  feedbackExplanationTitle.textContent = t('feedbackExplanationTitle');
  feedbackContinueBtn.textContent = t('feedbackContinue');

  setStatus(state.statusKey, state.statusVars);
  updateQuestionNav();

  if (state.currentQuestion) {
    renderQuestion(false);
  } else {
    taskText.textContent = t('startHint');
    drawBaseCircle();
  }
}

function startGame() {
  const chosen = document.querySelector('input[name="difficulty"]:checked');
  state.difficulty = chosen ? chosen.value : 'basic';

  state.phase = 'playing';
  state.score = 0;
  state.solved = 0;
  state.answeredCount = 0;
  state.roundGoal = 10;
  state.currentQuestion = null;
  state.roundQuestions = buildRoundQuestions();
  state.roundResults = new Array(state.roundGoal).fill(null);
  state.currentIndex = 0;
  state.waitingFeedback = false;

  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  hideAnswerFeedbackPopup();
  updateStatusPanel();
  setStatus('statusStart');
  pickQuestion();
}

function resetGame() {
  state.phase = 'idle';
  state.score = 0;
  state.solved = 0;
  state.answeredCount = 0;
  state.roundGoal = 0;
  state.currentQuestion = null;
  state.roundQuestions = [];
  state.roundResults = [];
  state.currentIndex = 0;
  state.waitingFeedback = false;
  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout);
    feedbackTimeout = null;
  }

  hideAllAnswerBoxes();
  hideAnswerFeedbackPopup();
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('feedback-correct', 'feedback-wrong');

  updateStatusPanel();
  setStatus('statusReady');
  taskText.textContent = t('startHint');
  canvasHelp.textContent = t('assist');
  drawBaseCircle();
  updateQuestionNav();
}

function finishGame() {
  state.phase = 'finished';
  state.waitingFeedback = false;
  const answered = Math.max(1, state.answeredCount);
  const accuracy = Math.round((state.solved / answered) * 100);

  resultFinalScore.textContent = String(state.score);
  resultAccuracy.textContent = accuracy + '%';
  resultSuggestion.textContent = getSuggestedNextStep(accuracy);

  setStatus('statusWin');
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
}

function onFeedbackViewExplanation() {
  feedbackExplanation.hidden = false;
  feedbackChoiceActions.hidden = true;
  feedbackContinueBtn.hidden = false;
}

function onFeedbackSkipExplanation() {
  continueAfterFeedback();
}

function continueAfterFeedback() {
  if (!state.waitingFeedback) return;
  hideAnswerFeedbackPopup();
  state.waitingFeedback = false;

  if (state.phase !== 'playing') return;

  if (state.answeredCount >= state.roundGoal) {
    finishGame();
    return;
  }

  let nextIndex = findNextUnansweredIndex(state.currentIndex + 1);
  if (nextIndex === -1) {
    nextIndex = findNextUnansweredIndex(0);
  }
  if (nextIndex === -1) {
    finishGame();
    return;
  }
  state.currentIndex = nextIndex;
  pickQuestion();
}

function toggleTheme() {
  const order = ['bright', 'dark', 'eye'];
  const idx = order.indexOf(uiPrefs.themeMode);
  uiPrefs.themeMode = order[(idx + 1) % order.length];
  applyVisualPrefs();
  saveUiPrefs();
  applyLanguage();
}

function toggleColorMode() {
  uiPrefs.colorMode = uiPrefs.colorMode === 'cb' ? 'standard' : 'cb';
  applyVisualPrefs();
  saveUiPrefs();
  applyLanguage();
}

function toggleFontMode() {
  const order = ['standard', 'large', 'xlarge'];
  const idx = order.indexOf(uiPrefs.fontScale);
  uiPrefs.fontScale = order[(idx + 1) % order.length];
  applyVisualPrefs();
  saveUiPrefs();
  applyLanguage();
}

homeBtn.addEventListener('click', () => {
  window.location.href = '#';
});

langToggleBtn.addEventListener('click', () => {
  lang = lang === 'zh' ? 'en' : 'zh';
  applyLanguage();
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
themeModeBtn.addEventListener('click', toggleTheme);
fontModeBtn.addEventListener('click', toggleFontMode);
cbModeBtn.addEventListener('click', toggleColorMode);
submitFillBtn.addEventListener('click', () => evaluateAnswer(fillInput.value));
fillInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    evaluateAnswer(fillInput.value);
  }
});
submitMatchBtn.addEventListener('click', evaluateMatchAnswer);
feedbackSkipBtn.addEventListener('click', onFeedbackSkipExplanation);
feedbackViewBtn.addEventListener('click', onFeedbackViewExplanation);
feedbackContinueBtn.addEventListener('click', continueAfterFeedback);
resultCloseBtn.addEventListener('click', resetGame);

document.querySelectorAll('input[name="difficulty"]').forEach((el) => {
  el.addEventListener('change', () => {
    if (state.phase === 'playing') {
      setStatus('statusDifficulty');
    }
  });
});

applyVisualPrefs();
applyLanguage();
resetGame();
