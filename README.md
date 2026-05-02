# ISTE HIT SC — Annual Convention

Official website for the **Annual Convention** by **ISTE Student Chapter, Haldia Institute of Technology, Haldia** — showcasing events like Hack the Hacker, expert lectures, workshops, and community engagement.

---

## Overview

A Next.js 15 + React 19 application built for the ISTE HIT SC Annual Convention. Features smooth GSAP animations, scroll-driven interactions, custom cursors, and a dynamic gallery powered by Cloudinary.

---

## 🌐 Live Site

[ac.istehitsc.com](https://ac.istehitsc.com)

---

## Key Features

### Animations & Interactions

- **GSAP InertiaPlugin Fling** — Motion cards track mouse velocity with physics-based inertia
- **Page Transition Scribble** — Full-screen GSAP scribble mask on logo click
- **Elastic Service Cards** — Cards spread apart on hover with elastic physics
- **Scroll-Triggered SVG Draws** — Hand-drawn underlines animate via `stroke-dasharray`
- **Footer Sticker Proximity Push** — Stickers react to fast cursor swipes
- **Wiggle System** — Configurable per-element rotation on hover
- **Custom Cursor Bubble** — GSAP-tracked blob with context-aware text
- **Double Marquee** — Infinite scrolling brand logos with no adjacent duplicates
- **Lenis Smooth Scroll** — Buttery-smooth inertia scrolling
- **Horizontal Scroll & Letter Bounce** — Pinned section with elastic letter animations
- **Tab Title Change** — Dynamic title when tab loses focus
- **Dome Gallery** — 3D-like photo gallery with drag navigation

### Architecture

- **React Component Architecture** — Clean, isolated components per section
- **Modular CSS** — Partial stylesheets imported via `globals.css`
- **External SVG Assets** — Organized SVG folders for clean components
- **Centralized Data** — Static data exported from `lib/data.js`
- **Cloudinary Gallery** — Dynamic image fetching with optimized delivery

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | App Router, file-based routing |
| **React 19** | Component-based UI |
| **Vanilla CSS** | Design system via CSS Variables |
| **GSAP + ScrollTrigger + InertiaPlugin** | Animations & physics |
| **Lenis** | Smooth scrolling |
| **Cloudinary** | Gallery image hosting |
| **react-icons** | Icon library |
| **@use-gesture/react** | Drag/swipe gestures |

---

## SVG Assets Used

All SVGs are stored in `public/assets/` and organized by section:

| Folder | Contents |
|---|---|
| `Brand Logos SVG/` | Marquee brand logos (oxxio, hema, kfc, swapfiets, anwb, netflix, ace-tate, getir) |
| `Card-Sticker SVG/` | Stickers for service cards (camera, phone, smiley, heart) |
| `Cursor SVG/` | Custom cursor states (default, text, clickable) |
| `Footer-Sticker SVG/` | Decorative footer stickers |
| `HorizontalWords SVG/` | Stickers and decorative elements for horizontal scroll section |
| `Marquee-blob SVG/` | Blob and hand shapes for marquee section |
| `MotionCard SVG/` | Blob and underline for motion cards |
| `Navbar SVG/` | Blob and work icon for navbar |
| `VimeoHero SVG/` | Smiley, star, oval underline, mute blob |
| `About SVG/` | About page decorative elements |
| `iste-Word.svg` | ISTE wordmark |

### Inline SVG Symbols

Defined once in `SvgSymbols.jsx`, reused via `<use>`:
- `bullet-icon` — Service card list bullets
- `card-divider` — Wavy divider inside service cards

---

## Project Structure

```text
annual-convention/
├── app/
│   ├── about/
│   │   └── page.jsx                 # About page
│   ├── api/gallery/
│   │   └── route.js                 # Cloudinary gallery API
│   ├── contact/
│   │   └── page.jsx                 # Contact page
│   ├── gallery/
│   │   └── page.jsx                 # Gallery page
│   ├── schedules/
│   │   └── page.jsx                 # Event schedules page
│   ├── styles/
│   │   ├── about.css                # About page styles
│   │   ├── base.css                 # Fonts, variables, reset
│   │   ├── cards.css                # Service cards & stickers
│   │   ├── ContactPage.css          # Contact page styles
│   │   ├── cursor.css               # Custom cursor bubble
│   │   ├── footer.css               # Footer layout & stickers
│   │   ├── hero.css                 # Hero title & underline
│   │   ├── horizontal-words.css     # Horizontal scroll section
│   │   ├── marquee.css              # Double marquee styles
│   │   ├── motion-cards.css         # Motion cards & labels
│   │   ├── navbar.css               # Navbar & header hero
│   │   ├── responsive.css           # Tablet + mobile breakpoints
│   │   ├── showreel.css             # Showreel section styles
│   │   └── vimeo-hero.css           # Video hero player
│   ├── globals.css                  # Entry point — imports all partials
│   ├── layout.jsx                   # Root layout & metadata
│   └── page.jsx                     # Home page
│
├── components/
│   ├── CursorBubble.jsx             # Custom cursor with GSAP tracking
│   ├── DomeGallery.jsx              # 3D-like drag gallery
│   ├── DoubleMarquee.jsx            # Brand logo marquee
│   ├── Footer.jsx                   # Footer, socials, stickers
│   ├── HorizontalWords.jsx          # Horizontal scroll + letter bounce
│   ├── Magnetic.jsx                 # Magnetic hover effect wrapper
│   ├── MotionCards.jsx              # Draggable cards with inertia
│   ├── Navbar.jsx                   # Fixed navbar with scroll logic
│   ├── ServiceCards.jsx             # Service cards with hover fan-out
│   ├── Showreel.jsx                 # Showreel section
│   ├── SmoothScroll.jsx             # Lenis init + GSAP ticker sync
│   ├── SvgSymbols.jsx               # Hidden SVG <symbol> definitions
│   ├── TextRevealHover.jsx          # Text reveal on hover
│   ├── TransitionScribble.jsx       # Scribble page transition
│   └── VimeoHero.jsx                # Video hero with mute controls
│
├── lib/
│   ├── animations.js                # GSAP animation utilities
│   └── data.js                      # Static data exports
│
├── public/
│   ├── assets/                      # All SVG assets (see SVG table above)
│   └── fonts/
│       ├── DMSans-VariableFont_opsz,wght.ttf
│       └── Epilogue-VariableFont_wght.ttf
│
├── .gitignore
├── jsconfig.json                    # @/ alias configuration
├── next.config.mjs
├── package.json
└── README.md
```

---

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd annual-convention
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   ```
   http://localhost:3000
   ```

---

## Built By

[**Nayab Gauhar**](https://github.com/Nayab-Gauhar), [**Abhi Aditya**](https://github.com/AbhiAditya02) & [**Somya Keshri**](https://github.com/Somya-keshri)

Made for ISTE Student Chapter, Haldia Institute of Technology, Haldia.
