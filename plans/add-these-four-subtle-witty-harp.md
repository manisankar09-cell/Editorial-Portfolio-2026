# Plan: Four Subtle UI Effects — Landing Page

## Context
The landing page (`LandingPage.tsx`) is functional but static. This plan adds four subtle, non-disruptive interaction and visual effects that elevate the editorial feel without adding visual clutter: a magnetic CTA button, a marquee text ticker, a film-grain hero overlay, and a per-card hover color wash.

---

## Files to modify

1. `src/app/pages/LandingPage.tsx` — all four effect implementations
2. `src/styles/theme.css` — one `@keyframes` + utility class for the marquee

No new files. No new npm packages. All effects use `motion/react` (already at v12.23.24) and CSS.

---

## Effect 1 — Magnetic CTA Button

**What:** Primary hero CTA ("VIEW WORK →") subtly follows the cursor within a ~60px radius, spring-snaps back on mouse leave. Secondary CTA is unchanged.

**How:**
- Add `useMotionValue, useSpring` to the existing `motion/react` import
- Add `import { useRef } from "react"`
- Create a `MagneticButton` local function component above `Hero`:
  - `useRef` on the `motion.a` to get bounding rect
  - `useMotionValue(0)` for rawX / rawY; `useSpring(rawX, { stiffness: 300, damping: 25 })` for x / y
  - `onMouseMove`: compute dx/dy from element center, only apply if `dist < 60`, scale by `0.18` (max ~10px deflection)
  - `onMouseLeave`: reset rawX/rawY to 0
  - Apply `style={{ x, y, ...passedStyle }}` to the `motion.a`
- In `Hero`, swap the first `<a href="#work" …>` with `<MagneticButton href="#work" className="…" style={…}>VIEW WORK →</MagneticButton>`

---

## Effect 2 — Marquee Ticker

**What:** A slow (35s loop) horizontal text strip between the hero baseline rule and the Selected Work section. Content: `Enterprise Design · AI Systems · Platform Design · Microsoft · 2024 ·` repeated, in small-caps DM Mono at 60% opacity muted-foreground.

**How:**

In `theme.css`, inside the existing `@layer utilities { }` block, append:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 35s linear infinite;
}
```

Create a `Marquee` local function component:
- Outer div: `height: 36`, `overflow: hidden`, `borderTop/Bottom: 1px solid var(--border)`, flex + align-center
- Inner div: `.animate-marquee`, `whiteSpace: nowrap`, `willChange: "transform"`
- Single `<span>` with the text string repeated 8× twice (classic 50%-scroll duplicate pattern)
- Font: DM Mono, 10px, `letterSpacing: "0.12em"`, uppercase, `color: var(--muted-foreground)`, `opacity: 0.6`

Wire: in `LandingPage` export, insert `<Marquee />` between `<Hero />` and `<SelectedWork />`.

The existing `<div className="mt-20 border-t border-border" />` at the bottom of `Hero` already acts as a separator — keep it; the Marquee's own top-border will visually stack cleanly.

---

## Effect 3 — Hero Grain Texture Overlay

**What:** Fixed-position film grain overlay across the full viewport at ~3.5% opacity. Uses an SVG `feTurbulence` filter — real stochastic noise, not a tiled image.

**How:**

Create a `GrainOverlay` local function component:
```tsx
// Hidden SVG filter definition (zero visual footprint: width/height 0)
<svg aria-hidden style={{ position:"absolute", width:0, height:0, overflow:"hidden" }}>
  <defs>
    <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.65"
                    numOctaves="3" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
      <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.035" />
      </feComponentTransfer>
    </filter>
  </defs>
</svg>

// Covering overlay div
<div aria-hidden style={{
  position: "fixed", inset: 0, zIndex: 1,
  pointerEvents: "none",
  filter: "url(#grain-filter)",
  mixBlendMode: "multiply",
  background: "var(--foreground)",
}} />
```

Wire: place `<GrainOverlay />` as the **first child** of the outermost `<div>` in `LandingPage` (before `<Nav />`). The Nav already has Tailwind `z-50`, so zIndex 1 on the overlay ensures it stays below the nav.

---

## Effect 4 — Card Color Reveal on Hover

**What:** On hover, each project card fades in a faint tinted background wash (200ms). Card 01 → muted blue; card 02 → warm slate; card 03 → sage. Nothing else changes.

**How:**

Add a constant above `SelectedWork`:
```ts
const cardColors: Record<string, string> = {
  "01": "rgba(59,78,130,0.06)",
  "02": "rgba(88,90,100,0.05)",
  "03": "rgba(76,95,80,0.05)",
};
```

Update the `motion.div` for each card:
- Remove `transition: "border-color 0.2s"` from inline `style` (it conflicts with Motion's transition system)
- Add `backgroundColor: "transparent"` to `style` (explicit initial value for smooth interpolation)
- Change the `animate` prop to inline-scope the mount delay: `animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}`
- Add `whileHover={{ backgroundColor: cardColors[project.index], transition: { duration: 0.2 } }}`

---

## Implementation order

1. `theme.css` — add `@keyframes marquee` + `.animate-marquee` (prerequisite for Marquee render)
2. `LandingPage.tsx` — add `useRef` import; add `useMotionValue, useSpring` to motion import
3. Add `MagneticButton` component; swap primary CTA in `Hero`
4. Add `cardColors` constant; update `motion.div` in `SelectedWork`
5. Add `Marquee` component; insert between `<Hero />` and `<SelectedWork />`
6. Add `GrainOverlay` component; insert as first child of root `<div>`

---

## Verification

- **Magnetic button**: hover over "VIEW WORK →" — button should drift toward cursor (max ~10px), snap back cleanly on leave
- **Marquee**: a slow-scrolling text strip appears between hero and work section; loop is seamless (no jump)
- **Grain**: subtle film-grain texture visible on the page background; does not scroll; does not block any interactions; opacity barely noticeable
- **Card hover**: hovering CXP card shows a faint blue wash; AI Workflow card shows slate; Enterprise Platform shows sage; transition is ~200ms
