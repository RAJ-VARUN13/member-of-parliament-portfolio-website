# Dr. Pradip Kumar Varma — Member of Parliament Portfolio

[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6)-orange?style=for-the-badge)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![SEO Optimized](https://img.shields.io/badge/SEO-JSON--LD%20%26%20Semantic-green?style=for-the-badge)](https://schema.org/)
[![Security Grade](https://img.shields.io/badge/Security-Client--Side%20Hardened-red?style=for-the-badge)](#security-hardening-module)

A state-of-the-art, high-performance, responsive portfolio website built for **Dr. Pradip Kumar Varma**, Member of Parliament (Rajya Sabha, Jharkhand). 

Refactored from traditional bloated templates into a zero-dependency, vanilla codebase matching modern enterprise-grade optimization standards. The design prioritizes local Jharkhand aesthetics (incorporating Sohrai art motifs as subtle watermarks) alongside highly structured political branding.

---

## 🚀 Key Architectural Features

### ⚡ Zero-Dependency Performance & Animations
* **Replaced Heavy Runtimes**: Removed external GSAP and ScrollTrigger CDN scripts. Refactored layout animations to use the browser's native **`IntersectionObserver` API** combined with hardware-accelerated CSS transforms.
* **Fluid 60FPS Transitions**: Entrance fades and stagger timings are controlled via CSS custom properties (`will-change: transform, opacity`), avoiding layout shifts and main-thread blockages.
* **Custom Counters**: Metric numbers animate seamlessly on scroll using a pure JS count-up implementation powered by **`requestAnimationFrame`** and a custom quadratic easing algorithm (`easeOutQuad`).
* **Passive Event Listeners**: Video overlay scroll-parallax runs throttled event loops with `{ passive: true }` to keep scrolling fast and responsive.

### 🛡️ Cyber-Hardening & Anti-Tampering Module
Equipped with a client-side defensive suite (`initSecurityHardening()`) designed to protect the integrity and reputation of public figures:
1. **Clickjacking Prevention (Frame-Busting)**: Detects nested context (`window.self !== window.top`) and instantly breaks out to protect against overlay attacks.
2. **Context Menu Blocker**: Intercepts `contextmenu` events to disable right-click interactions.
3. **Developer Tools & View-Source Locks**: Prevents keyboard shortcuts for inspecting code or downloading assets:
   * `F12` (Developer Console)
   * `Ctrl+Shift+I` (DevTools Layout Inspector)
   * `Ctrl+Shift+J` (Console Window)
   * `Ctrl+Shift+C` (Inspector Selector)
   * `Ctrl+U` (Raw View Source)
   * `Ctrl+S` (Asset Serialization & Scraping Lock)
4. **Active Debughalt**: Routinely runs automated debugger triggers inside background thread loops (`setInterval`). If the developer console is open, the execution loop will immediately trigger a breakpoint halt, freezing the inspector environment.

### 📱 Responsive Glassmorphic Mobile Sidebar
* Padded header bar with a scaled `48px` profile circle, keeping elements vertically aligned.
* Desktop navigation collapses into a premium mobile sidebar menu utilizing `backdrop-filter: blur(10px)` and soft box shadow arrays.
* Layout position fixed to `100vh` and width bounded to `80%` on screens under `768px`, with a background body scroll-lock (`menu-open`) that locks document scrolling while navigation is active.

### 🔍 Search Engine Optimization (SEO) & Schema Markup
* **Semantic HTML5 Markup**: Formatted using strict `<header>`, `<main>`, `<section>`, and `<footer>` hierarchies.
* **JSON-LD Entity Graphing**: Employs an embedded Google Search Person Schema in each page:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "DR. PRADIP KUMAR VARMA",
  "jobTitle": "Member of Parliament, Rajya Sabha",
  "memberOf": [
    {
      "@type": "Organization",
      "name": "Parliament of India"
    }
  ]
}
```
* **Geotargeting SEO**: Configured with geographic coordinates and region parameters targeted at Ranchi, Latehar, and Jharkhand (`IN-JH`).
* **Cache-Busting Integration**: File imports are mapped with query variables (`?v=1.2`) to force immediate delivery of updated files to clients.

---

## 📁 Repository Directory Structure

```text
├── assets/
│   ├── images/
│   │   ├── gallery/          # Grid and media assets
│   │   ├── journey/          # Timeline progression elements
│   │   ├── Socials/          # Press clipping files
│   │   ├── DrPKV.png         # Main circular header logo
│   │   └── drpkvSir.jpg      # Profile card resource
│   └── videos/               # Rajya Sabha speech recordings
├── index.html                # Homepage with comprehensive profile flow
├── biography.html            # Public service timeline and education details
├── vision.html               # Ideological agenda and developmental scope
├── achievements.html         # Parliamentary records and athletic patronages
├── parliament.html           # Assembly speeches video directory
├── gallery.html              # Filterable photographic updates
├── events.html               # Schedule of grassroots drives and map integration
├── contact.html              # Unified grievances and representation form
├── data.js                   # JSON-formatted portfolio content configurations
├── script.js                 # Central controller, security, and animation routines
└── styles.css                # Fluid CSS layout grid and responsive typography
```

---

## 🛠️ Installation & Local Development

This is a pure static frontend workspace. No compilation steps or node dependencies are required.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RAJ-VARUN13/member-of-parliament-portfolio-website.git
   ```
2. **Serve the project**:
   - Double-click `index.html` to run locally, or
   - Spin up a local server using Visual Studio Code's **Live Server** extension, or run via python:
     ```bash
     python -m http.server 8000
     ```
3. Open `http://localhost:8000` in your web browser.

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 👨‍💻 Development & Engineering

This project was architected to demonstrate expertise in:
- High-performance, zero-dependency vanilla web development.
- Secure client-side architecture (anti-tampering, DOM-hardening).
- Responsive UI/UX with modern layout systems and micro-interactions.
- Semantic HTML and robust SEO integration (JSON-LD Schema).

*If you are reviewing this repository for a technical engineering role, please explore the `script.js` and `styles.css` files for examples of advanced, production-ready frontend optimizations.*
