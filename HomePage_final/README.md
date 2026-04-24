# Project Title: CircleSence

## Members:

Gao Zikun,BUPT 2024213592,QM 241118061,gaozikun@bupt.edu.cn

Liu Xuanqiao,BUPT 2024213587,QM 241118315,liuxuanqiao051208@bupt.edu.cn

Yang Boran,BUPT 2024213592,QM 241118670,yangboran@bupt.edu.cn

## Homepage update notes (2026-04-23)

This section records the latest homepage improvements that were applied.

### 1) GeoBot close confirmation now protects all form fields
- File: `script.js`
- Change: `toggleChat(false)` now checks `formHasContent()` before closing.
- Impact: closing the chat panel now prompts when `name`, `email`, or `message` has content, so partially filled forms are not silently lost.

### 2) Unified keyboard focus-visible styling for major controls
- File: `style.css`
- Change: added shared `:focus-visible` rules for key interactive controls (`.btn`, `.carousel-btn`, `.geobot-btn`, `.geobot-chip`, `.geobot-fab`, `.geobot-close`, footer links).
- Impact: keyboard navigation focus is now consistent and easier to track.

### 3) Hero illustration accessibility semantics cleaned up
- File: `index.html` (and synced with `index-zh.html`)
- Change: removed conflicting readable-image semantics from a container marked `aria-hidden="true"`.
- Impact: screen-reader behavior is now consistent; decorative hero graphics remain decorative.

### 4) Removed unused `#lang-toggle` selector logic
- File: `script.js`
- Change: removed dead selector lookup and related click/label handling for `#lang-toggle` (homepage currently uses EN/中文 direct links, not an in-place language toggle button).
- Impact: reduced script complexity and avoided misleading maintenance expectations.

