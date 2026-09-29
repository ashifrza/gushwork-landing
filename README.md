# Gushwork — Creative Agency Landing Page

A fully responsive creative agency landing page built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no libraries, no dependencies.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-✓-brightgreen?style=flat)

---

## 🔗 Live Demo

**[https://gushwork-landing.vercel.app](https://gushwork-landing.vercel.app)**

> Deployed on Vercel — no build step required.

---

## ✨ Features

### 🔝 Sticky Header
- Hidden by default; smoothly slides in after the user scrolls past the hero fold
- Hides again when scrolling back near the top
- Built with `requestAnimationFrame` for buttery-smooth performance
- Fully accessible (`aria-hidden` toggled on state changes)

### 🎠 Image Carousel with Zoom
- Translates a card track with `translateX` — no third-party slider library
- Hover-to-zoom overlay effect using pure CSS transforms
- Dot indicators with active state
- Keyboard navigation (`←` / `→` arrow keys)
- Touch swipe and mouse drag support (with configurable drag threshold)
- Responsive: shows 3 cards → 2 → 1 depending on viewport width
- Rebuilds dots and recalculates layout on window resize

### 📱 Responsive Design
- Mobile-first media queries at `768px` and `1024px` breakpoints
- Hamburger menu with slide-down mobile nav
- Closes automatically on link click or outside tap

### 🎞 Scroll Reveal Animations
- `IntersectionObserver` triggers fade-up on key elements as they enter the viewport
- Fires once per element (no repeat jank)

### 🔢 Animated Stat Counters
- Ease-out count-up animation driven by `requestAnimationFrame`
- Triggers when the stats section scrolls into view

---

## 🗂 Project Structure

```
gushwork-landing/
├── index.html      # Semantic HTML5 markup
├── styles.css      # All styling — CSS variables, layout, animations
├── script.js       # Vanilla JS — carousel, header, reveal, counters
└── README.md       # You are here
```

---

## 🛠 Tech Stack

| Layer      | Choice                          | Why                                      |
|------------|---------------------------------|------------------------------------------|
| Markup     | HTML5 (semantic)                | Accessibility + SEO-friendly structure   |
| Styles     | CSS3 + Custom Properties        | No runtime overhead, easy theming        |
| Scripting  | Vanilla JavaScript (ES6+)       | Zero dependencies, full browser support  |
| Fonts      | Syne (display) + DM Sans (body) | Loaded via Google Fonts                  |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/gushwork-landing.git

# Open in browser (no build step needed)
open index.html
# or just double-click index.html in your file manager
```

---

## 📐 Key Implementation Details

### Sticky Header Logic
```js
```

### Carousel Offset Calculation
```js
---

## 🌐 Browser Support

| Browser       | Support |
|---------------|---------|
| Chrome 90+    | ✅      |
| Firefox 88+   | ✅      |
| Safari 14+    | ✅      |
| Edge 90+      | ✅      |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
> Built with 💛 using pure HTML, CSS & JavaScript — no frameworks harmed in the making of this project.
