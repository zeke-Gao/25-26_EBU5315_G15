# 🎮 CircleSense: Game Module Development Journey

This module is an interactive geometry experimental sandbox built entirely with vanilla front-end technologies (HTML5 Canvas + Vanilla JS + CSS3). Through multiple iterations, it has evolved from a basic graphics renderer into a comprehensive game module featuring various puzzle modes and perfect accessibility (A11y) adaptation.

## 🚀 Phase 1: Parametric Graphics Engine & Sandbox
* **Vanilla Rendering Engine**: Built the underlying rendering logic from scratch using the HTML5 Canvas API with zero third-party dependencies.
* **Advanced Geometric Modeling**: Utilized mathematical models of analytic geometry, such as rotating ellipse equations and cubic Bézier curves, to define 16 degrees of freedom. This constructed a highly complex, interconnected "Goose" skeletal and surface model.
* **Sandbox Mode**: Implemented two-way data binding between the left UI panel and the right Canvas state machine, allowing players to drag sliders in real-time and observe the impact of multi-dimensional parameters on geometric shapes.

## 🎯 Phase 2: Challenge System & State Machine Refactoring
* **Target Matching Mechanism**: Introduced "Challenge Mode", where the system randomly generates a hidden goose shape, requiring players to adjust their parameters to match the target.
* **Similarity Algorithm**: Developed a spatial distance evaluation algorithm in JS based on extreme point coordinates and bounding boxes, providing real-time, precise similarity feedback from 0% to 100%.
* **State Machine Management**: Refactored the underlying state machine to ensure precise control over the suspension and destruction of the game loop (`requestAnimationFrame`) when switching between modes, completely preventing memory leaks.

## 🍕 Phase 3: Mathematical Puzzle Expansion (Pizza Slicer)
* **Applied Geometry**: Shifted from pure shape combination to practical geometric calculation scenarios with the new "Pizza Slicer" mode.
* **Core Gameplay**: Cleverly packaged mathematical formula derivations (central angles, sector areas, arc lengths) into a mini-game of fulfilling tricky "customer orders" by slicing pizzas.
* **Visual Upgrade**: Utilized Canvas `ctx.clip()` and `ctx.drawImage()` methods to achieve dynamic masking and edge highlighting of real pizza images, significantly enhancing gameplay immersion.

## ♿ Phase 4: Extreme Accessibility (A11y) & Theming
* **Global Theme Responsiveness**: Adopted CSS Variables combined with JS `MutationObserver` to achieve pixel-perfect responsiveness to Dark Mode and Eye-care Theme.
* **Colorblind (CB) Safe Refactoring**: Specifically rewrote high-contrast CSS overriding rules for extreme edge cases (e.g., when both "Dark Mode" and "Colorblind Mode" are active simultaneously).
* **Dynamic Canvas Palettes**: Completely resolved the issue where native Canvas primitives couldn't directly respond to external CSS variables. Built multiple underlying color palettes (like `PALETTE_DARK_CB`) directly into JS, ensuring clear visual feedback for all players regardless of their visual mode.

## 📂 Phase 5: Engineering Standards & Git Collaboration
* **Directory Isolation**: Strictly adhered to team coding standards by encapsulating module-specific code (`game.js`, `game.css`, bilingual HTML) within an independent `game` folder.
* **Zero-Conflict Merging**: Stripped out public dependencies (`style.css`, `script.js`) to ensure absolutely zero conflicts when submitting Pull Requests (PRs) to the `main` branch.
* **Design Asset Synchronization**: Synchronously committed the responsive web wireframe source file (`game-wireframe.svg`) designed in Figma, achieving dual delivery of "Code + Design Assets".
