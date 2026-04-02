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
