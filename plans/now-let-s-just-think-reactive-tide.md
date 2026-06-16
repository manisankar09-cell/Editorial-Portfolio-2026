# Phase 3 Plan: Focus Mode, Three Projects, Card Redesign, Themes, Gallery

> Phase 2 plan preserved below the second divider.

---

## Context

Six distinct requests in one session:

1. Rename `"simple"` → `"focus"` throughout the codebase
2. Add two new projects (ContextualAI Workflows, Time Tracking Agent) alongside CXP
3. Design focus-mode project presentation as a brutalist fact-sheet
4. Make the Experience card on the home page more interesting
5. Redesign bento card grouping for mobile and plan primary/secondary hierarchy
6. Make the Parchment theme radically different from Slate; add photography showcase
7. Plan bento layouts for project detail pages and the About section

---

## 1. Rename "simple" → "focus"

**Files to change:**
- `src/app/context/PreferenceContext.tsx` — `LayoutMode = "bento" | "classic" | "focus"` and `a11y = layout === "focus"`
- `src/app/components/SiteNav.tsx` — mode labels in desktop controls and mobile overlay
- `src/app/pages/HomePage.tsx` — conditional `layout === "focus"`
- `src/styles/theme.css` — comment on `.a11y-mode` (already derived, no value change needed)

One-line change in each file. No behaviour change.

---

## 2. Three Projects — Data Model & Routes

### Project data (to be shared across all views)

```ts
// src/app/data/projects.ts  (new file)
export const PROJECTS = [
  {
    slug: "cxp-design-system",
    index: "01",
    title: "CXP Design System",
    shortTitle: "CXP Design System",
    tags: ["Design System", "AI UX", "Enterprise"],
    tagline: "Unifying fragmented toolkits into a scalable, AI-ready enterprise system.",
    role: "Senior Product Designer — System Architect",
    period: "2020 — Present",
    context: "Microsoft CXP · Enterprise Platform",
    contributions: [
      "Consolidated 6+ fragmented design libraries into a single Fluent-aligned source of truth",
      "Defined Adaptive Card schemas and Copilot interaction patterns used across 6 product teams",
      "Established governance, behavior standards, and implementation contracts with engineering",
    ],
    impact: [
      { stat: "400+", label: "designers on shared system" },
      { stat: "6",    label: "product teams aligned" },
      { stat: "3×",   label: "faster design-to-dev" },
    ],
    available: true,
  },
  {
    slug: "contextual-ai-workflows",
    index: "02",
    title: "ContextualAI Workflows",
    shortTitle: "Contextual AI",
    tags: ["AI UX", "Agentic Workflows", "Copilot"],
    tagline: "Designing how Copilot and agents integrate into real enterprise workflows.",
    role: "Senior Product Designer — AI Experience Lead",
    period: "2022 — Present",
    context: "Microsoft CXP · Sales & Customer Success",
    contributions: [
      "Designed Contextual AI (CAI) experiences that restructured fragmented seller journeys into cohesive systems",
      "Defined trust and explainability patterns for AI UX — cards, disclosure, reasoning, action affordances",
      "Drove vibe-coding workflows across design org to shorten iteration loops",
    ],
    impact: [
      { stat: "10K+", label: "users impacted" },
      { stat: "↑",    label: "seller focus & decision-making" },
      { stat: "WCAG", label: "2.2 AA compliance" },
    ],
    available: false, // will be true once case study is built
  },
  {
    slug: "time-tracking-agent",
    index: "03",
    title: "Time Tracking Agent",
    shortTitle: "Time Tracker",
    tags: ["Agentic UX", "AI Agent", "Productivity"],
    tagline: "An autonomous agent that eliminates manual time-entry overhead for enterprise users.",
    role: "Product Designer — Sole Designer",
    period: "2023 — 2024",
    context: "Microsoft · Internal Tool",
    contributions: [
      "Designed end-to-end agent experience from ambient data capture to approval workflows",
      "— Details to be filled in once project brief is provided —",
    ],
    impact: [
      { stat: "TBD", label: "time saved per week" },
      { stat: "TBD", label: "users" },
    ],
    available: false,
  },
];
```

**The `contributions` and `impact` arrays for projects 2 and 3 are placeholders** — they will be filled with real content once the user provides details.

**Route additions in `src/app/routes.ts`:**
```ts
{ path: "contextual-ai-workflows",  Component: ContextualAIPage },
{ path: "time-tracking-agent",      Component: TimeTrackingPage },
```

Both pages use the same `CaseStudyPage` template; they can be stub pages initially (`ComingSoonPage` component) that redirect to the full case study once content is ready.

### Update these files to reference `PROJECTS` array:
- `src/app/components/CaseStudyNav.tsx` → `allProjects` derived from `PROJECTS`
- `src/app/pages/BentoLandingPage.tsx` → CardCXP, CardAIWork → replace with `PROJECTS.map(...)` pattern or per-card
- `src/app/pages/FocusLandingPage.tsx` → projects list from `PROJECTS`
- `src/app/pages/HomePage.tsx` → pass to focus view

---

## 3. Focus Mode — Brutalist Fact-Sheet for Projects

**Rename `FocusLandingPage.tsx` → keeps the same file, just updated content and rename mode.**

**Project presentation in Focus mode — no navigation, only facts:**

```
MSC                                    [← BACK]

SENIOR PRODUCT DESIGNER · MICROSOFT

────────────────────────────────────────────

01  CXP DESIGN SYSTEM
    Design System · AI UX · Enterprise · 2020–Present

    ROLE
    Senior Product Designer — System Architect

    CONTRIBUTION
    — Consolidated 6+ fragmented libraries into single source of truth
    — Defined Adaptive Card schemas across 6 product teams
    — Established governance and engineering contracts

    IMPACT
    400+ designers  ·  6 product teams  ·  3× faster delivery

────────────────────────────────────────────

02  CONTEXTUAL AI WORKFLOWS
    AI UX · Agentic · 2022–Present

    ROLE
    Senior Product Designer — AI Experience Lead

    ...

────────────────────────────────────────────

03  TIME TRACKING AGENT
    Agentic UX · 2023–2024
    [COMING SOON]

────────────────────────────────────────────

mani@example.com  ·  linkedin  ·  about
```

**Design rules:**
- Max-width 560px, centered column
- Full-width horizontal rules between projects (`<hr>`)
- Typeset in DM Mono only (not Inter) — signals "terminal/raw data"
- Zero decorative elements, zero hover effects, zero animation
- Contribution bullets use `—` dash prefix
- Impact stats inline on one line, separated by `·`
- "COMING SOON" projects shown but greyed/dimmed — still present, just not linked
- Contact row at bottom, no section headings
- Auto-enables a11y mode (since `focus` = `a11y`)

**Implementation:** Update `FocusLandingPage.tsx` to import `PROJECTS` and render this layout.

---

## 4. Experience Card (Home Page) — Career Timeline Mini

**Current state:** `CardStat` shows "12+" with a count-up. On hover: count re-animates + reveals "Since 2012, Chennai".

**New design: Merge `CardStat` + `CardAbout` into an `CardExperience` card** (or expand `CardStat` significantly):

**At rest (collapsed):**
```
12+          ●  Senior Product Designer
years        ●  Senior Information Designer
             ●  UI/UX Intern
             ●  …4 more
```
Left side: big "12+" number. Right side: a vertical timeline strip — 7 small dots connected by a line, labeled only at top and bottom.

**On hover (animated reveal):**
Each dot expands in sequence (staggered, 80ms apart) to show:
```
●  Microsoft            Mar 2020 — Present
●  Publicis Sapient     2018 — 2020
●  Microsoft Intern     2017
●  Acellere             2016
●  Persistent           2015 — 2016
●  Affinity             2014
●  Tech Mahindra        2013 — 2014
```
The expansion animates left-to-right: dot → company name → period.

**Grid placement:** Keep `bento-card-stat` position (row 2, col 4) but increase to 2 columns on tablet. The additional info takes more space so the card needs `minHeight: 260`.

**Files to modify:** `BentoLandingPage.tsx` — rewrite `CardStat()` → `CardExperience()`.

---

## 5. Bento Card Hierarchy — Primary / Secondary / Mobile Grouping

### Information priority tiers:

**Tier 1 (Identity & CTA — always show first on mobile):**
- CardHeadline — who I am + tagline
- CardRole — name, company, availability

**Tier 2 (Work — show next):**
- CardCXP — featured project
- CardAIWork — project 2 (was AI Workflow, now ContextualAI)
- CardTimeTracker — project 3 (new card)

**Tier 3 (Credibility):**
- CardExperience — 12+ years mini timeline
- CardAbout — bio + availability

**Tier 4 (Depth):**
- CardPrinciples — 2×2 work principles

**Tier 5 (Personality & Fun):**
- CardGallery — photography/painting (replaces CardOutside)
- CardClock — live clock

**Tier 6 (CTA):**
- CardContact — dark spotlight card

### Desktop grid (4 cols) — revised layout:

```
ROW 1: [Headline 3 cols] [Role 1 col]
ROW 2: [CXP 2 cols] [ContextualAI 1 col] [Experience 1 col]
ROW 3: [About 1 col] [Principles 2 cols] [Clock 1 col]
ROW 4: [Contact 2 cols] [Gallery 2 cols]
```

The Time Tracking Agent card replaces `CardAIWork` (which moves to row 2 col 3) — no, actually: we have 3 projects + stat + about + principles + clock + contact + gallery = 10 cards still. Let me rethink:

```
ROW 1: [Headline 3 cols] [Role 1 col]
ROW 2: [CXP 2 cols] [ContextualAI 1 col] [Experience/Stat 1 col]
ROW 3: [About 1 col] [TimeTracker 2 cols] [Clock 1 col]
ROW 4: [Contact 2 cols] [Gallery 2 cols]
```

Principles card gets merged or moved inside the About card as hover reveal.

### Tablet (2 cols) — pairing by tier:

```
[Headline full width]
[Role full width]
[CXP full width]
[ContextualAI] [TimeTracker]
[Experience] [About]
[Contact full width]
[Gallery] [Clock]
```

### Mobile (1 col) — priority order:

```
Headline → Role → CXP → ContextualAI → TimeTracker → Experience → About → Contact → Gallery → Clock
```

**Principles card is absorbed into CardAbout as a hover reveal on mobile** (to reduce card count). This keeps mobile scroll manageable.

### CSS class updates needed in `globals.css`:
```css
.bento-card-timetracker { grid-column: 2 / 4; grid-row: 3; }
/* Principles moved inside About card */
/* Tablet: ContextualAI + TimeTracker side-by-side */
```

---

## 6. Theme Redesign — "Paper" Replaces Parchment

**Decision:** Rename and completely redesign the default theme from `"parchment"` to `"paper"`.

Parchment `#f5f4f0` background + `#2d2b5e` purple accent is too similar to Slate's `#f0f2f5` + teal. Both are light grays.

**"Paper" theme — warm, saturated, editorial:**

```css
/* replaces :root default — parchment renamed to paper */
[data-theme="paper"] {  /* or keep as :root */
  --background:        #f2e6d4;   /* deep warm cream — NOT gray */
  --foreground:        #1a1208;   /* near-black with warm brown undertone */
  --card:              #f9f2e6;   /* slightly lighter warm cream */
  --secondary:         #e8d5bb;   /* warm sand */
  --muted:             #dfc9a8;   /* toasted */
  --muted-foreground:  #7a6040;   /* brown sienna */
  --accent:            #c4481e;   /* brick / vermilion red — completely different from purple */
  --accent-foreground: #f9f2e6;
  --border:            rgba(26, 18, 8, 0.12);
  --primary:           #1a1208;
  --primary-foreground: #f2e6d4;
}
```

**Visual character:** Like a warm editorial magazine or a physical design portfolio printed on uncoated paper. The `#c4481e` brick-red accent is warm and bold — completely different from Slate's cool teal.

**Three-theme swatch appearance:**
- Paper: `#f2e6d4` bg (visibly warm cream) + `#c4481e` red inner dot
- Slate: `#f0f2f5` bg (cool gray) + `#1a5c4a` teal inner dot
- Dusk: `#1a1714` bg (dark) + `#c97d2a` amber inner dot

**Files to update:**
- `src/styles/theme.css` — replace `:root` background/accent or add `[data-theme="paper"]`
- `src/app/context/PreferenceContext.tsx` — `ColorTheme = "paper" | "slate" | "dusk"` (rename from "parchment")
- `src/app/components/SiteNav.tsx` — update THEMES array bg/accent for "paper"

---

## 7. Photography & Painting Showcase — "Studio Wall" Card

Replace `CardOutside` with `CardGallery`.

**At rest (bento grid):**
- Background: secondary
- Shows a "pinboard" grid: 6 small image tiles (2 rows × 3 cols), each slightly rotated by ±2-4° (random but seeded so they don't shift on re-render)
- Images: placeholder colored rectangles now, real photos later (imported via `figma:asset` or regular `import`)
- Below tiles: "Photography · Painting" label in DM Mono

**On hover:**
- Tiles become fully opaque (they're slightly transparent at rest)
- A subtle "VIEW GALLERY →" overlay fades in
- Individual tiles straighten slightly (rotation reduces toward 0)

**On click:**
- Opens a full-screen `GalleryModal` component (new file: `src/app/components/GalleryModal.tsx`)
- Modal shows a masonry-style grid of photos/paintings
- Two tabs: "Photography" | "Painting"
- Dismiss with Escape or click outside

**For the prototype:** Use colored placeholder rectangles. When user provides real images, replace with `import img from "figma:asset/..."` and `<ImageWithFallback>` component (already exists at `src/app/components/figma/ImageWithFallback.tsx`).

**Files to create/modify:**
- `src/app/components/GalleryModal.tsx` — new modal component
- `src/app/pages/BentoLandingPage.tsx` — replace `CardOutside` with `CardGallery`
- `src/app/pages/AboutPage.tsx` — update PersonalBlock to link to gallery

---

## 8. Bento Layout for Project Detail Pages

**New concept: "Project Bento Header"**

Each case study page gets a bento-grid overview header (above the existing long-scroll content) that serves as a visual ToC and scannable summary.

```
[Project title + tagline — 2 cols]  [Quick facts — 1 col]  [Role card — 1 col]
[Main visual/artifact — 2 cols]     [Impact stats — 2 cols]
```

This header bento is rendered in a `ProjectBentoHeader` component:
- **Title card** (col 1-3): title, tagline, tags, period
- **Quick facts** (col 4): context, index "01/03"
- **Role card** (col 4, row 1 alt): role + contribution summary (3 bullets)
- **Visual card** (col 1-3, row 2): the main project visual (HeroVisual for CXP)
- **Impact card** (col 3-5, row 2): 3 impact stats as big numbers

The existing long-scroll sections follow below with a rule separator.

**New file:** `src/app/components/ProjectBentoHeader.tsx`

Takes props: `project: typeof PROJECTS[0]` — renders consistently from the shared data.

**The existing 10-section CXP page layout stays.** The bento header is prepended before Section 01.

---

## 9. About Page — Bento View Option

Currently About is always the classic long-scroll layout. In `bento` mode, show a bento-style overview at the top that collapses the sections into cards.

**AboutBentoHeader** component (new, prepended in AboutPage when `layout === "bento"`):

```
Row 1: [Hero bio 3 cols] [Currently available 1 col]
Row 2: [Experience mini timeline 4 cols full-width]
Row 3: [Principles 2 cols] [Selected Work 2 cols]
Row 4: [Gallery 1 col] [Achievements 1 col] [Contact 2 cols]
```

Each card in the about bento is a summary — on click it smooth-scrolls to the full section below.

**File:** Create `src/app/components/AboutBentoHeader.tsx`; import in `AboutPage.tsx` and render when `layout === "bento"`.

---

## Implementation Order

1. **`src/app/data/projects.ts`** — create shared project data file
2. **`src/app/context/PreferenceContext.tsx`** — rename `"simple"` → `"focus"`, `"parchment"` → `"paper"`
3. **`src/styles/theme.css`** — redesign Paper theme (replace parchment :root values)
4. **`src/app/components/SiteNav.tsx`** — update THEMES array + mode labels
5. **`src/app/pages/FocusLandingPage.tsx`** — brutalist fact-sheet layout using PROJECTS
6. **`src/app/pages/BentoLandingPage.tsx`** — add `CardExperience` (mini timeline), add `CardTimeTracker`, replace `CardOutside` with `CardGallery`, update grid classes
7. **`src/styles/globals.css`** — update bento-card-* grid classes for new card arrangement
8. **`src/app/components/GalleryModal.tsx`** — new gallery modal
9. **`src/app/components/CaseStudyNav.tsx`** — `allProjects` from PROJECTS
10. **`src/app/routes.ts`** — add routes for new project pages
11. **`src/app/pages/ComingSoonPage.tsx`** — stub for projects 2 & 3 (optional)
12. **`src/app/components/ProjectBentoHeader.tsx`** — bento header for case study pages
13. **`src/app/pages/CXPCaseStudyPage.tsx`** — prepend ProjectBentoHeader
14. **`src/app/components/AboutBentoHeader.tsx`** — bento overview for About
15. **`src/app/pages/AboutPage.tsx`** — conditionally show AboutBentoHeader in bento mode
16. **`src/app/pages/HomePage.tsx`** — update `simple` → `focus` conditional

---

## Open Items Awaiting User Input

- **ContextualAI Workflows**: Need role, contributions, impact data, and case study content
- **Time Tracking Agent**: Need same; will be placeholder until provided
- **Gallery images**: Will use placeholders until photography/painting assets are provided via Figma import or direct upload

---

## Verification

- Switch to Focus mode: verify brutalist text-only fact-sheet appears, all 3 projects shown, a11y mode active
- Switch to Paper theme: verify background is warm cream `#f2e6d4`, accent is brick red, clearly different from Slate
- On home page: hover CardExperience to see timeline dots animate and reveal company names
- Resize to mobile: verify cards appear in priority order (Identity → Projects → Credibility → CTA)
- Click CardGallery: verify modal opens with placeholder tiles in masonry layout
- Visit /cxp-design-system: verify ProjectBentoHeader renders above existing sections

---

# Phase 2 Plan (archived)

> Previous plan (ideas phase) preserved below the divider.

---

## Context

The portfolio currently has:
- A bento landing page (`BentoLandingPage.tsx`) with a fixed 4-column desktop-only CSS grid — no mobile responsiveness
- Four separate navigation implementations (BentoLandingPage, LandingPage, AboutPage, CXPCaseStudyPage) — all different, none mobile-ready
- A `PreferenceBar` with Bento / Classic / Focus + A11y toggle — user questions whether Focus + A11y should be separate
- Dummy experience data in `AboutPage.tsx` (Microsoft 2019, Salesforce, Barnes & Noble, IBM) — needs replacing with 7 real entries from images
- No colour theme system (only one palette)
- The CXP case study page has no layout-mode awareness and no mobile responsiveness

**Goals:**
1. Full-width, 100% responsive layout across all breakpoints (mobile-first)
2. Unified navigation across all pages — desktop & mobile (hamburger drawer)
3. Reconsider PreferenceBar — merge Focus + A11y into "Simple", add 3-palette colour switcher
4. Add colour palette themes: Parchment / Slate / Dusk
5. Replace dummy experience data with real 7-entry data; add accordion reveal interaction
6. Plan (but defer implementation) CXP case study layout restructure

---

## 1. Responsive Grid — BentoLandingPage

**Breakpoints:**
| Breakpoint | Columns | Notes |
|---|---|---|
| `≥1024px` (desktop) | 4 columns | current layout |
| `768–1023px` (tablet) | 2 columns | Headline spans 2, Role full, cards pair naturally |
| `<768px` (mobile) | 1 column | All cards full-width, stacked vertically |

**Implementation:**
- Replace hardcoded `gridTemplateColumns: "repeat(4, 1fr)"` with a CSS custom property or Tailwind responsive class
- Each card's `gridColumn` / `gridRow` overrides reset on smaller viewports via a responsive wrapper class
- Use a `<style>` block in the component or a dedicated `.bento-grid` CSS class in `globals.css` with `@media` queries:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
@media (max-width: 1023px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-card-headline { grid-column: 1 / 3; }
  .bento-card-role     { grid-column: 1 / 3; }
  .bento-card-cxp      { grid-column: 1 / 3; }
  /* etc. */
}
@media (max-width: 767px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-grid > * { grid-column: 1 / 2 !important; grid-row: auto !important; }
}
```

**All pages** (`LandingPage`, `AboutPage`, `CXPCaseStudyPage`) also need:
- `maxWidth: 1200px; width: 100%; padding: 0 20px` → on mobile `padding: 0 16px`
- All 12-column grids become single-column on mobile with a media-query-driven class

**Approach:** Add a `useBreakpoint()` hook OR lean on pure CSS (preferred — no JS reflow). Add CSS to `src/styles/globals.css`.

---

## 2. Unified Navigation Component

**New file:** `src/app/components/SiteNav.tsx`

Replace all 4 separate navs with this single component. It receives a `variant` prop:
- `"home"` — shows logo + Work / About / Contact links
- `"casestudy"` — shows ← Back + project title
- `"page"` — shows logo + nav links (used by About page)

**Desktop layout (≥768px):**
```
[ MSC ]   [ Work   About   Contact ]   [ ●●● theme swatches ]
```
- Sticky, `position: sticky; top: 0; z-index: 50`
- Thin 1px bottom border
- Height: 52px

**Mobile layout (<768px):**
```
[ MSC ]                              [ ☰ ]
```
- Hamburger (`☰`) opens a full-screen slide-down overlay (not a side drawer — cleaner on portrait mobile)
- Overlay: dark background (`var(--foreground)`), cream links in large DM Mono type, animated stagger in
- Close button top-right
- Links: Work, About, Contact + layout mode switcher inside overlay

**Remove** the floating `PreferenceBar` from `Root.tsx` — integrate its functionality into:
1. Nav (desktop) — compact row of icons, right side
2. Mobile menu overlay — full labels

**Files to modify:**
- `src/app/Root.tsx` — remove `<PreferenceBar />`
- `src/app/pages/BentoLandingPage.tsx` — replace inline `Nav` with `<SiteNav variant="home" />`
- `src/app/pages/LandingPage.tsx` — replace inline `Nav` with `<SiteNav variant="home" />`
- `src/app/pages/AboutPage.tsx` — replace `SiteNav` component with new `<SiteNav variant="page" />`
- `src/app/pages/CXPCaseStudyPage.tsx` — replace `CaseStudyNav` with `<SiteNav variant="casestudy" title="CXP Design System" />`

---

## 3. Preference System Redesign — Merge Focus + A11y → "Simple"

**Decision: Yes, merge Focus + A11y into one "Simple" mode.**

Rationale:
- "Focus" (minimal layout) and "A11y" (no motion, high contrast, accessible) share the same *intent* — reduce cognitive load and distraction
- Having them separate creates unnecessary complexity in the UI
- "Simple" mode = Focus layout *plus* all a11y guarantees: no animation, boosted contrast, skip links, visible focus rings, grain off

**New 3-mode system:**
| Mode | Icon | What it does |
|---|---|---|
| **Bento** | 2×2 grid | Current bento grid, colour reveals, tilt, spotlight |
| **Classic** | 3-line stack | Scroll-narrative layout, minimal interaction |
| **Simple** | Single line (focus) | Ultra-minimal layout + full a11y (no motion, high contrast, focus rings, screen-reader safe) |

**A11y mode** is no longer a separate toggle — it is the "Simple" mode. The `a11y` boolean in `PreferenceContext` is set to `true` whenever `layout === "simple"` and `false` otherwise. The context still exposes `a11y` for backward compat with card components.

**Update `PreferenceContext.tsx`:**
- Remove standalone `a11y` state
- Derive: `const a11y = layout === "simple"`

**Color theme picker** (3 swatches) replaces the old A11y toggle slot:
```
[ BENTO | CLASSIC | SIMPLE ]  [ ■ ■ ■ ]
                                 ↑ ↑ ↑
                           parchment slate dusk
```

---

## 4. Colour Palette Themes

**New theme: `colorTheme`** in `PreferenceContext` — `"parchment" | "slate" | "dusk"`, stored in `localStorage` as `msc-theme`.

**Applied as `data-theme` on `<html>`** via a `useEffect` in `PreferenceProvider`.

**Palette definitions** to add to `src/styles/theme.css`:

```css
/* ── Slate theme ── */
[data-theme="slate"] {
  --background: #f0f2f5;
  --foreground: #1a1f2e;
  --card: #f7f8fb;
  --secondary: #e2e6ed;
  --muted: #d8dde6;
  --muted-foreground: #5a6478;
  --accent: #1a5c4a;      /* teal */
  --accent-foreground: #f0f5f3;
  --border: rgba(26, 31, 46, 0.11);
}

/* ── Dusk theme (dark) ── */
[data-theme="dusk"] {
  --background: #1a1714;
  --foreground: #f0ece6;
  --card: #221f1b;
  --secondary: #2a2622;
  --muted: #302c28;
  --muted-foreground: #8a8078;
  --accent: #c97d2a;      /* amber */
  --accent-foreground: #1a1714;
  --border: rgba(240, 236, 230, 0.1);
}
```

**Parchment** = existing `:root` defaults (no `data-theme` needed).

**Swatch UI in SiteNav** (desktop) and mobile menu: three small dots/squares, labelled on hover.

**Files:**
- `src/styles/theme.css` — add theme variable blocks
- `src/app/context/PreferenceContext.tsx` — add `colorTheme`, `setColorTheme`, derive `a11y` from layout
- `src/app/components/SiteNav.tsx` — include theme swatches

---

## 5. Real Work Experience Data + Accordion Interaction

### Extracted data from images (7 entries):

```ts
const EXPERIENCE = [
  {
    company: "Microsoft",
    role: "Senior Product Designer",
    period: "Mar 2020 — Present",
    location: "Bangalore, India",
    bullets: [
      "Lead system-level design for AI-powered, agentic experiences across Sales, Customer Success, and Delivery — shaping how Copilot and agents integrate into real enterprise workflows.",
      "Designed and shipped Contextual AI (CAI) experiences that improved seller focus, decision-making, and adoption by restructuring fragmented journeys into cohesive systems.",
      "Defined trust and explainability patterns for AI UX (cards, disclosure, reasoning, action affordances), enabling confident action on AI-generated recommendations.",
      "Core steward of the CXP Design System — consolidated fragmented libraries into a single source of truth, establishing reusable components, behavior standards, and governance.",
      "Raised design-to-engineering fidelity via implementation-ready artifacts (component specs, adaptive card schemas, interaction contracts), reducing ambiguity and rework.",
      "Drove org-wide adoption of VS Code-first 'vibe coding' workflows, enabling designers to prototype closer to production and shorten iteration loops.",
      "Partnered with PM, Engineering, and Data Science to align UX with telemetry, accessibility (WCAG 2.2 AA), and long-term platform health.",
    ],
    tags: ["Agentic AI UX", "Copilot", "Design systems", "Trust & explainability", "Systems thinking", "Accessibility (WCAG 2.2 AA)"],
    current: true,
  },
  {
    company: "Publicis Sapient",
    role: "Senior Information Designer",
    period: "July 2018 — March 2020",
    location: "Bangalore, India",
    bullets: [
      "Owned end-to-end UX for Verizon, Barnes & Noble and Bartleby (large-scale consumer & B2B platforms), translating ambiguity into scalable architectures and interaction models.",
      "Led design of the Activity Tracker App — from ideation and wireframes through usability testing and refinement for internal employee engagement.",
    ],
    tags: ["Information architecture", "Consumer & B2B platforms", "Usability testing", "Interaction design"],
  },
  {
    company: "Microsoft",
    role: "UI/UX Designer (Intern)",
    period: "May 2017 — July 2017",
    location: "Hyderabad, India",
    bullets: [
      "Simplified complex, data-dense workflows in Azure Network Performance Monitor for enterprise network engineers.",
    ],
    tags: ["Enterprise UX", "Data-dense workflows", "Azure"],
  },
  {
    company: "Acellere Software Pvt. Ltd.",
    role: "UI/UX Designer (Team Lead)",
    period: "April 2016 — June 2016",
    location: "Pune, India",
    bullets: [
      "Led client-facing design engagements for Trnear (fitness app) and Gamma (project analytics tool) — owned research, personas, workflow definition, prototyping, and team mentoring.",
    ],
    tags: ["Team leadership", "Client engagements", "Research & personas", "Prototyping"],
  },
  {
    company: "Persistent Systems",
    role: "UI/UX & Graphic Designer",
    period: "May 2015 — March 2016",
    location: "Pune, India",
    bullets: [
      "Embedded with Persistent Systems' product teams on-site via Studioworks 360, a design vendor partner.",
      "Delivered UI/UX from concept to launch across enterprise products including Salesforce Financial Cloud, collaborating closely with creative, engineering, and accounts teams.",
    ],
    tags: ["Enterprise UX", "Graphic design", "Cross-functional collaboration"],
  },
  {
    company: "Affinity Express",
    role: "Creative Graphic Designer",
    period: "Jul 2014 — Nov 2014",
    location: "Pune, India",
    bullets: [
      "Designed newspaper ads, corporate flyers, and brochures for a range of client brands.",
      "Partnered directly with clients to understand brand value and product positioning, gathering feedback and turning it into polished, on-brand creative within tight delivery windows.",
    ],
    tags: ["Print design", "Brand communication", "Client collaboration"],
  },
  {
    company: "Tech Mahindra",
    role: "Associate — Technical Support",
    period: "January 2013 — April 2014",
    location: "Pune, India",
    bullets: [
      "Telecom service / incident management and network assurance for business voice and high-speed internet.",
      "Troubleshot connectivity issues through testing and programming, taking end-to-end ownership of incidents — triaging by severity, managing tickets, and partnering with onshore teams to resolve errors.",
    ],
    tags: ["Incident management", "Network troubleshooting", "Customer support"],
  },
];
```

### Interaction Pattern: Expand-on-Interest Accordion

**Default (collapsed):** Each entry shows only:
```
● Microsoft — Senior Product Designer          Mar 2020 — Present    [+]
```

**On click (expanded):** Smooth height animation reveals:
- Location badge (terracotta/orange text, monospace)
- Bullet list with `—` dash prefix
- Tag row

**Design rules:**
- Only one entry open at a time (accordion behavior) — OR allow multiple (more scannable)
- Recommend: **allow multiple open** — portfolio viewers may want to read non-linearly
- Animation: `motion/react` `AnimatePresence` with `height: "auto"` and `opacity` transition
- The `[+]` rotates to `[−]` when open (or use a circle with `−` as in the reference images)
- First entry (Microsoft) **pre-expanded** by default since it's most relevant

**File to modify:** `src/app/pages/AboutPage.tsx` — replace the `ExperienceBlock` function with new accordion version using the `EXPERIENCE` data array above.

---

## 6. CXP Case Study — Deferred Plan

The CXP case study page needs:
- Mobile responsiveness (12-column grids → single column on mobile)
- Potential bento-card overview section at the top for Bento mode
- A "Simple" mode text-only version

**Decision: Implement mobile responsiveness now, defer bento/simple mode variants to a later sprint.** The case study is long and nuanced — rushing a bento restructure risks breaking the narrative.

Immediate work: ensure the 12-column grids in CXP page collapse properly on mobile (add responsive CSS classes).

---

## Implementation Order

1. **`src/styles/globals.css`** — Add `.bento-grid` responsive CSS, `.responsive-container`, `.responsive-grid-12`
2. **`src/styles/theme.css`** — Add `[data-theme="slate"]` and `[data-theme="dusk"]` variable blocks
3. **`src/app/context/PreferenceContext.tsx`** — Add `colorTheme` / `setColorTheme`; derive `a11y` from `layout === "simple"`
4. **`src/app/components/SiteNav.tsx`** (new) — Unified nav with mobile hamburger, layout switcher, theme swatches
5. **`src/app/pages/BentoLandingPage.tsx`** — Replace inline Nav; add bento-grid classes for responsiveness; add `simple` mode support (FocusLandingPage content)
6. **`src/app/pages/LandingPage.tsx`** — Replace inline Nav; add responsive classes
7. **`src/app/pages/AboutPage.tsx`** — Replace SiteNav; replace ExperienceBlock with real accordion data
8. **`src/app/pages/CXPCaseStudyPage.tsx`** — Replace CaseStudyNav; add mobile responsive classes to section grids
9. **`src/app/pages/FocusLandingPage.tsx`** — Replace inline Nav (now part of Simple mode via HomePage)
10. **`src/app/pages/HomePage.tsx`** — Update `simple` → `FocusLandingPage` mapping
11. **`src/app/Root.tsx`** — Remove `<PreferenceBar />` (now integrated into SiteNav)

---

## Verification

- Resize window from 1280px → 768px → 375px; verify bento cards stack vertically, text remains readable
- Toggle Bento / Classic / Simple; verify layout transitions and that Simple sets a11y=true
- Switch colour themes (Parchment / Slate / Dusk); verify CSS variables cascade across all pages
- Navigate to About page; open/close each experience accordion entry; verify animation and data accuracy
- On CXP case study: verify 12-column grids collapse on mobile
- Tab through nav on desktop and mobile; verify focus rings visible in Simple mode
- Check Dusk theme has sufficient contrast (target 4.5:1 for body text)

---

# Previous Plan (Ideas Phase)

## Context
The current bento landing page (`src/app/pages/BentoLandingPage.tsx`) is a 4-column grid of 10 cards — mostly monochrome (off-white `#f5f4f0` background, near-black `#111110` foreground, a single deep blue-purple accent `#2d2b5e`). The interactions are subtle — a blinking cursor, a 3D tilt card, a cursor-tracking spotlight, and a live clock. The user wants to explore creative directions to:

1. Add colour meaningfully (per-card hover colour, contextual reveals)
2. Add an accessibility switch (or broader preference system)
3. Possibly add a layout-switcher (bento ↔ classic ↔ minimal)
4. Make the portfolio stand out while staying refined

---

## Creative Directions — Ranked by Effort vs. Impact

---

### IDEA 1 — "Signature Colour Per Card" (Hover Chromatic Reveal)
**The Concept:** Each card has a unique semantic colour assigned to it. At rest, all cards are the same warm off-white (current state). On hover, the card's background shifts to its signature colour with a smooth flood-fill transition, and *contextual content* appears or transforms.

**Per-card colour + reveal behaviour:**
| Card | Colour on Hover | Contextual Reveal |
|---|---|---|
| Headline | Deep indigo `#2d2b5e` (inverted, dark bg) | Headline text inverts to cream; Bauhaus shapes animate outward |
| Role (tilt) | Warm amber `#c97d2a` at 8% opacity | A small "open to work" availability dot pulses green |
| CXP Case Study | Blueprint blue `#1a3a5c` at 10% | The grid background lines brighten and a "preview" mini-frame slides up |
| AI Workflow | Teal `#1a5c4a` at 8% | The abstract bars animate to "progress loading" left-to-right |
| 12+ Stat | Terracotta `#8b3a2a` at 8% | The number counts up again from zero on every hover |
| About | Sage green `#3a5c3a` at 8% | Text fades and a 1-sentence "currently" status replaces it |
| Principles 2×2 | Each quadrant gets its own accent on hover | The active principle expands slightly |
| Clock | Midnight navy `#0d1f3c` (inverted) | Clock goes dark + digits glow soft white |
| Contact | Already dark — brightens spotlight intensity | CTA buttons slide apart to reveal a "copy email" micro action |
| Outside Work | Warm sienna `#7a4a2a` at 10% | The Bauhaus shapes morph into a camera/brush outline SVG |

**Implementation:** CSS custom property `--card-hover-bg` + `transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1)` per card; reveal content with `opacity/transform` driven by `motion.div` `whileHover`.

**Effort:** Medium  
**Impact:** High — gives the page a living, expressive quality without abandoning the minimal aesthetic at rest

---

### IDEA 2 — "Three-Mode Preference Switch"
**The Concept:** A small, persistent toggle in the nav (or a floating pill) lets users switch between three modes:

| Mode | Description | Layout | Colour |
|---|---|---|---|
| **Bento** (default) | Current grid, expressive hover colours | 4-col bento grid | Colour-on-hover |
| **Classic** | The existing `LandingPage.tsx` scroll-narrative style | Single-column sections, full-width | Monochrome only |
| **Focus** | Ultra-minimal — just name, role, 3 project links, one CTA | Single centred column, max-width 480px | Pure B&W, 0 decoration |

**How it works:** A `useLayoutPreference()` context/hook stored in `localStorage` renders the right component. The switcher is 3 labelled squares (like a layout picker), not a generic toggle.

**"Focus" mode sketch:**
```
MSC

Senior Product Designer, Microsoft

→ CXP Design System
→ AI Workflow Experience  
→ Enterprise Platform

mani@example.com
```
Zero noise. Just signal. This *itself* is a design statement.

**Effort:** Medium-High (need to build Focus mode from scratch, wire context)  
**Impact:** Very high — rare for a portfolio to offer this; immediately communicates design literacy

---

### IDEA 3 — "Accessibility Mode" Switch (WCAG AA+)
**The Concept:** A dedicated accessibility toggle (not just dark mode) that activates across the whole page:

**What it changes:**
- All decorative hover colour shifts **disabled** (respects `prefers-reduced-motion`)
- Minimum 4.5:1 text contrast enforced (muted-foreground shifts from `#6b6960` to `#4a4845`)
- All interactive elements get visible `focus-visible` rings (2px solid `#2d2b5e`)
- The tilt card's 3D transform **disabled** (motion-sensitive)
- The blinking cursor **disabled** (WCAG 2.1 SC 2.2.2 — no blinking > 3 flashes/sec)
- All grain overlays removed (can cause issues for photosensitive users)
- Card hover reveals still work but use **shape + underline** cues instead of colour alone
- ARIA labels added to all decorative SVG/shape elements (`aria-hidden="true"`)
- Skip-to-content link appears at top

**The toggle itself:** A small `♿ ACCESSIBLE` / `◎ DEFAULT` pill in the nav. State stored in `localStorage`. Implemented as a CSS class on `<body>` (`.a11y-mode`) and a React context for motion/JS-driven effects.

**Effort:** Medium  
**Impact:** Very high signal — a designer caring about accessibility on their *own* portfolio is rare and memorable

---

### IDEA 4 — "Ink Reveal" on Hover (Visual Quirk)
**The Concept:** Instead of a flat colour shift, each card's hover colour floods in from a specific corner or edge — like ink spreading through paper. Uses a CSS `clip-path` animation or SVG mask that expands from a seed point.

Examples:
- Contact card: flood from bottom-left corner
- Headline card: flood from the blinking cursor position
- Principles: each quadrant floods from its number label inward

**Implementation:** `motion.div` with `clipPath` spring animation or SVG `<mask>` with animated `r` on a `<circle>`.

**Effort:** Medium-High (SVG mask approach is the cleanest cross-browser)  
**Impact:** High — feels like a signature visual trick without being gimmicky

---

### IDEA 5 — "Micro-Narrative" Cards (Contextual Content Reveals)
**The Concept:** On hover, each card shows a *second layer* of content — the "why behind the what":

| Card | Primary (rest) | Revealed on hover |
|---|---|---|
| CXP | Title + brief desc | "Impact: 400+ designers, 6 product teams" with a mini sparkline |
| AI Workflow | Title + "coming soon" | Teaser: "Redesigned how 10k+ users interact with Copilot" |
| 12+ Stat | Number | "Started in 2012 as a graphic designer in Chennai" |
| About | Short bio | Current status: "Available for senior IC or staff roles in AI product" |
| Principles | Labels | Each principle flips to show a 1-sentence definition on hover |
| Outside Work | Description | A 3×3 grid of tiny monochrome photography thumbnails fades in |

**Implementation:** Each card has two `div` layers — `data-layer="primary"` and `data-layer="reveal"` — toggled with `motion.div` `AnimatePresence` crossfade.

**Effort:** Low-Medium (mostly content work + motion)  
**Impact:** Medium-High — adds depth and personality, makes the portfolio feel alive

---

### IDEA 6 — "Colour Theme Switcher" (Palette Themes, Not Just Dark/Light)
**The Concept:** Beyond dark/light, offer 3 colour personalities:

| Theme | Vibe | Background | Accent | Card surface |
|---|---|---|---|---|
| **Parchment** (default) | Warm editorial | `#f5f4f0` | `#2d2b5e` indigo | `#faf9f6` |
| **Slate** | Cool, technical | `#f0f2f5` | `#1a5c4a` teal | `#f7f8fa` |
| **Dusk** | Warm dark | `#1a1714` | `#c97d2a` amber | `#221f1b` |

Three small swatches in the nav. State in `localStorage`. Implemented by swapping a `data-theme` attribute on `<html>` and extending `theme.css` with `[data-theme="slate"]` and `[data-theme="dusk"]` variable blocks.

**Effort:** Low-Medium  
**Impact:** Medium — adds expression, lets the user show they think in design systems

---

## Recommended Combination (My Pick for "Stand Out")

These three work well together and reinforce each other:

1. **IDEA 1** — Per-card hover colours + contextual reveals (the signature experience)
2. **IDEA 2** — Three-mode layout switcher (Bento / Classic / Focus) — shows range
3. **IDEA 3** — Accessibility switch — shows values, not just craft

**Why this combination:**
- The colour reveals make it feel alive and expressive
- The layout switcher is rare and immediately signals "this person thinks in systems"
- The accessibility switch is the most meaningful signal — a senior designer at Microsoft caring about a11y on their personal portfolio is memorable

---

## Files to Modify

| File | Change |
|---|---|
| `src/app/pages/BentoLandingPage.tsx` | Per-card hover colours, reveal animations, a11y mode card behaviour |
| `src/app/pages/LandingPage.tsx` | Already exists — just import via switcher |
| `src/app/pages/FocusLandingPage.tsx` | New file — ultra-minimal mode |
| `src/styles/theme.css` | Add `[data-theme]` variants, `.a11y-mode` overrides, focus-visible rules |
| `src/app/Root.tsx` | Wrap with `LayoutPreferenceProvider`, add `data-theme` to `<html>` |
| `src/app/components/PreferenceBar.tsx` | New — 3-mode switcher + a11y toggle UI component |

---

## Verification

- Hover each card and confirm colour transition + reveal
- Toggle all three layout modes and verify routing/rendering
- Enable a11y mode → run Lighthouse accessibility audit (target 95+)
- Check `prefers-reduced-motion` in OS settings → confirm animations disable
- Test keyboard navigation (Tab through all interactive cards, check focus rings)
- Test with a screen reader (VoiceOver/NVDA) in a11y mode
