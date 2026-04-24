# CircleSense

CircleSense is a static educational website for learning circle geometry through visual explanation, interactive play, and quiz-based practice. The project is designed for GCSE or early high-school learners and combines a homepage, an interactive game module, a quiz module, a sponsor page, and privacy pages in one lightweight browser-based experience.

## Coursework Info

- Module: `EBU5315`
- Project title: `CircleSense`
- Group number: `G15`

## Team Members

- Gao Zikun - BUPT `2024213592`, QM `241118061`, `gaozikun@bupt.edu.cn`
- Liu Xuanqiao - BUPT `2024213587`, QM `241118315`, `liuxuanqiao051208@bupt.edu.cn`
- Yang Boran - BUPT `2024213592`, QM `241118670`, `yangboran@bupt.edu.cn`

## Project Overview

CircleSense is built as a standalone front-end website using HTML, CSS, and JavaScript only. It focuses on circle theorems and related geometry concepts through three main learning paths:

- Homepage: introduces core rules, visual slides, sponsor information, privacy messaging, and GeoBot guidance
- Game: provides interactive geometry exploration and challenge-based practice
- Quiz: provides question-bank driven assessment with instant feedback and score tracking

## Key Features

- English and Chinese page variants
- Responsive layouts for desktop and smaller screens
- Theme, font-size, and color-friendly accessibility controls
- GeoBot helper with quick actions and contact form
- Privacy banner and dedicated privacy policy pages
- Sponsor page for product realism and information transparency
- Quiz question bank with mixed concept and diagram-based questions
- Interactive game modes for parameter tuning and challenge play

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage` for UI preferences and lightweight progress state

## Folder Structure

```text
CircleSense/
  HomePage_final/
    index.html
    index-zh.html
    privacy.html
    privacy-zh.html
    sponsor.html
    sponsor-zh.html
    style.css
    script.js
  Game/
    game/
      game.html
      game-zh.html
      game.css
      game.js
      style.css
      script.js
  Quiz/
    test.html
    test-zh.html
    test.css
    test.js
```

## Main Pages

### 1. Homepage

The homepage introduces CircleSense, presents the core circle rules, includes a visual slideshow, and links users into the game and quiz modules. It also contains GeoBot, sponsor content, and privacy messaging.

### 2. Game

The game module is an interactive geometry lab. Users can explore parameters, compare outcomes, and complete challenge-style tasks through direct manipulation and visual feedback.

### 3. Quiz

The quiz module presents mixed concept and diagram questions. Users receive immediate answer feedback, explanations, progress updates, and final results.

### 4. Privacy

The privacy pages explain how UI preferences and lightweight client-side data are handled. They support transparency and ethical data-use communication.

### 5. Sponsor

The sponsor pages simulate a more realistic product environment by showing partnership or commercial information while keeping it visually consistent with the learning platform.

## Accessibility and Inclusive Design

- EN/ZH language support
- Keyboard-focus styling on major controls
- Dark mode, eye-friendly mode, and standard mode
- Adjustable font sizes
- Color-friendly viewing mode
- Responsive layout behavior for smaller screens
- Clear warning and confirmation flows in GeoBot contact interactions

