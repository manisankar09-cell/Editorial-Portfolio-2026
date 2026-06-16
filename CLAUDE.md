# Editorial Portfolio Case Study: Figma MCP Integration Rules

This document is the working ruleset for integrating Figma designs into this codebase via MCP.

It combines:
- concrete repository analysis
- implementation patterns already present in the app
- guardrails for translating Figma designs into code without drifting from the existing system

## Figma Target

- Primary Figma library/design URL: `https://www.figma.com/design/AhEbYVDs3T1juPycNJJx8j/Project-Infinity?node-id=7-2&t=YKf7GneaQRjk7AOr-1`
- Figma file key: `AhEbYVDs3T1juPycNJJx8j`
- Initial node id: `7:2`

### Current MCP connection status

- Figma MCP authentication is available for `machoudh@microsoft.com` under the `Microsoft` enterprise org.
- The file is readable through MCP.
- Current library status from MCP:
  - `libraries_added_to_file`: none
  - `libraries_available_to_add`: includes community libraries such as `Material 3 Design Kit`, `Simple Design System`, and Apple platform kits
  - organization libraries visible in paging include `E360 Platform` and `DfM Tabs`

Implication:
- Use this file key as the target library reference.
- Do not assume this file is already wired to a subscribed design system library.
- Before doing automated code-connect or component reuse work, either:
  - subscribe the intended Figma library to this file, or
  - explicitly scope MCP searches to a known library key.

### Figma library inventory observed via MCP

Subscribed libraries:
- none

Available organization libraries seen during paging:
- `E360 Platform`
- `DfM Tabs`

Available community libraries seen during paging:
- `Material 3 Design Kit`
- `Simple Design System`
- `iOS 18 and iPadOS 18`
- `iOS and iPadOS 26`
- `watchOS 26`
- `visionOS 26`
- `macOS 26`

Integration implication:
- The provided Figma file behaves more like a standalone design file right now than a file already connected to a shared subscribed library.
- If `Project Infinity` is supposed to depend on a Microsoft internal design system, that library is not currently attached to the file according to MCP.

## 1. Design System Structure

### EP Library as canonical source

Canonical in-repo EP library references:
- `src/app/pages/EPLibraryPage.tsx`
- `src/app/data/epLibrary.ts`
- `src/styles/theme.css`

Non-negotiable rule for future page design:
1. Every new page or major layout refresh must start from the EP Library vocabulary before bespoke styling is added.
2. New page work must first reuse or extend:
  - semantic color tokens in `src/styles/theme.css`
  - typography scales documented in `src/app/data/epLibrary.ts`
  - page and component rules documented in `src/app/data/epLibrary.ts`
3. Do not introduce page-local hex values, ad hoc spacing systems, or one-off type scales unless those changes are first promoted into the EP Library source.
4. If a new visual pattern is required, update the EP Library data/page so it becomes part of the reusable system for future pages.

Default EP layout patterns for new page work:
- `Hero`
- `Archive Row`
- `Case Study Section`
- `Footer`

When starting a new page, choose from these four patterns first and only create an additional pattern if the page requirement cannot be expressed by composing them.

### Token Definitions

Primary token source:
- `src/styles/theme.css`

Imported through:
- `src/styles/index.css`

Fallback/generated theme reference:
- `default_shadcn_theme.css`

Token format:
- CSS custom properties under `:root`, `.dark`, and `[data-theme="..."]`
- Tailwind v4 token bridging through `@theme inline`

Main token categories already defined:
- color tokens: `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--ring`
- semantic chart/sidebar tokens
- radius token: `--radius`
- font-weight tokens: `--font-weight-normal`, `--font-weight-medium`
- theme-specific hover tokens such as `--hover-identity`, `--hover-project1`, `--hover-contact`

Example pattern from `src/styles/theme.css`:

```css
:root {
  --background: #f2e6d4;
  --foreground: #1a1208;
  --accent: #c4481e;
  --border: rgba(26, 18, 8, 0.14);
  --radius: 0.125rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --radius-lg: var(--radius);
}
```

Theme variants in code:
- `paper` via default `:root`
- `slate` via `[data-theme="slate"]`
- `dusk` via `[data-theme="dusk"]`

Theme selection logic:
- `src/app/context/PreferenceContext.tsx`
- `src/app/components/SiteNav.tsx`

Token transformation system:
- There is no separate token build/export pipeline like Style Dictionary.
- The transformation layer is manual and local:
  - CSS variables define the source of truth.
  - Tailwind v4 `@theme inline` maps those tokens into utility classes.
  - React components consume both Tailwind utilities and inline styles referencing CSS variables.

Rules for Figma-to-code token mapping:
1. Map Figma color styles or variables into existing CSS custom properties in `src/styles/theme.css`.
2. Extend the current semantic token set before inventing component-local hex values.
3. If Figma introduces a new theme-level token, add it to:
   - `:root`
   - any applicable `[data-theme="..."]` overrides
   - the `@theme inline` block if it should be accessible from Tailwind utilities
4. Do not create a parallel JSON token file unless the repo explicitly adopts a token build pipeline.

## 2. Component Library

### Component locations

Application-specific components:
- `src/app/components/`

Shared UI primitives:
- `src/app/components/ui/`

Figma-specific helper component:
- `src/app/components/figma/ImageWithFallback.tsx`

Page-level composition:
- `src/app/pages/`

### Component architecture

The UI layer is a hybrid of:
- shadcn-style wrappers
- Radix primitives
- Tailwind utility classes
- occasional inline style objects for precise editorial layout control

Common pattern:

```tsx
function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

Supporting utilities:
- `src/app/components/ui/utils.ts` provides `cn()` using `clsx` + `tailwind-merge`
- `src/app/components/ui/button.tsx` uses `class-variance-authority`

Architecture characteristics:
- Radix primitives are wrapped rather than used raw.
- Many shared primitives use `data-slot` attributes for structure and targeting.
- Page components are composed from sections, not heavy monoliths, though some page files are still large.
- Layout-specific interactions often live inside page components rather than a global design-system package.

Representative UI stack files:
- `src/app/components/ui/button.tsx`
- `src/app/components/ui/card.tsx`
- `src/app/components/ui/dialog.tsx`
- `src/app/components/ui/sidebar.tsx`
- `src/app/components/ui/chart.tsx`

### Documentation or Storybook

Current state:
- no Storybook configuration found
- no `*.stories.*` files found
- no MDX component documentation layer found

Existing documentation inputs instead:
- `README.md`
- `guidelines/Guidelines.md`
- `src/imports/pasted_text/cxp-design-system.md`

Rules for Figma-driven component implementation:
1. Reuse `src/app/components/ui/*` before creating new primitives.
2. If Figma introduces a new UI pattern, first decide whether it is:
   - a variant of an existing primitive
   - a section-level composition
   - a genuinely new reusable primitive
3. Prefer CVA variants for reusable visual states.
4. Preserve `data-slot` conventions for new reusable primitives.

## 3. Frameworks & Libraries

### Core framework

- React 18.3.1
- React DOM 18.3.1
- React Router 7.17.0

Entry points:
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/Root.tsx`
- `src/app/routes.ts`

### Styling libraries and UI dependencies

Primary styling stack:
- Tailwind CSS v4
- CSS custom properties
- custom CSS files under `src/styles/`

UI and interaction libraries:
- Radix UI packages under `@radix-ui/react-*`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `motion` for animation
- `sonner` for toasts
- `lucide-react` for most icons
- `@mui/material` and `@mui/icons-material` are installed, but MUI is not the dominant architectural layer in the app code reviewed

Other notable libraries:
- `recharts`
- `react-hook-form`
- `embla-carousel-react`
- `react-responsive-masonry`
- `react-resizable-panels`
- `react-dnd`

### Build system and bundler

- Vite 8.0.16
- `@vitejs/plugin-react`
- `@tailwindcss/vite`

Build config:
- `vite.config.ts`

Key Vite customization:

```ts
function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}
```

Rules for Figma integration:
1. Assume Vite is the target runtime and asset pipeline.
2. Prefer code patterns compatible with client-side React + React Router.
3. If translating a Figma design, target Tailwind classes plus CSS variables first, not Emotion or MUI styling APIs.

## 4. Asset Management

### Storage and references

Configured asset destination:
- `src/assets/`

Important current state:
- `src/assets/` is referenced by Vite but is not currently present in the workspace.

Asset resolver path:
- `figma:asset/<filename>` resolves to `src/assets/<filename>`

Figma image helper:
- `src/app/components/figma/ImageWithFallback.tsx`

Example usage pattern to prefer when wiring Figma-exported images:

```tsx
import heroImage from "figma:asset/hero.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

<ImageWithFallback src={heroImage} alt="Hero visual" />
```

### Optimization techniques

Current repo state:
- no custom image optimization pipeline found
- no CDN config found
- no Next.js image layer or asset hashing strategy beyond Vite defaults
- SVG and CSV are explicitly supported through `assetsInclude`

### CDN configuration

- none found in codebase

Rules for Figma asset import:
1. Export Figma raster assets into `src/assets/`.
2. Reference those files via `figma:asset/...` to stay aligned with the existing Vite resolver.
3. Use `ImageWithFallback` for non-critical or generated Figma assets where missing files should fail gracefully.
4. Prefer inline SVG or componentized SVG for icons and simple geometry instead of raster exports.

## 5. Icon System

### Icon sources

Primary icon package:
- `lucide-react`

Examples:
- `src/app/components/ui/carousel.tsx`
- `src/app/components/ui/breadcrumb.tsx`
- `src/app/components/ui/dialog.tsx`
- `src/app/components/ui/sidebar.tsx`

Secondary installed icon package:
- `@mui/icons-material`

Custom inline SVG usage:
- `src/app/components/SiteNav.tsx`
- `src/app/pages/BentoLandingPage.tsx`
- other section/page components for bespoke editorial visuals

### Import and usage pattern

Library icon example:

```tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
```

Custom inline SVG example pattern:

```tsx
<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
  <rect x="1" y="1" width="4.5" height="4.5" rx="0.4" fill="currentColor" />
</svg>
```

### Naming convention

- package icons use PascalCase imports
- custom inline icons are usually local component functions like `LayoutIcon`
- decorative SVGs should use `aria-hidden="true"`

Rules for Figma icon translation:
1. If a Figma icon already exists in Lucide, use Lucide instead of exporting raw SVG.
2. If the icon is brand-specific or highly custom, keep it inline as a React SVG component.
3. Use `currentColor` wherever possible so icons inherit theme tokens.
4. Avoid image-based icons.

## 6. Styling Approach

### CSS methodology

This codebase uses a layered styling approach:
- Tailwind utilities for baseline styling
- CSS custom properties for theming
- global CSS classes for layout systems
- inline `style` props for editorial precision and motion-driven values

Global style entrypoint:
- `src/styles/index.css`

Imported style files:
- `src/styles/fonts.css`
- `src/styles/tailwind.css`
- `src/styles/theme.css`
- `src/styles/globals.css`

### Global styles

Global layout and helper classes live in:
- `src/styles/globals.css`

Important globals:
- `.site-container`
- `.bento-grid`
- `.responsive-grid-12`
- `.responsive-grid-2`
- `.section-pad`
- `.hidden-mobile`
- `.show-mobile`
- `.mobile-menu-overlay`

Responsive bento pattern:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media (max-width: 1023px) and (min-width: 768px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
```

### Responsive design implementation

Breakpoints observed:
- mobile: `max-width: 767px`
- tablet: `768px` to `1023px`
- desktop: `1024px+`
- a smaller card-stack breakpoint also appears around `600px`

Responsive techniques used:
- CSS Grid reflow
- Flexbox
- `clamp()` for fluid spacing and type
- mobile overlay navigation
- JS device/media checks in `use-mobile.ts` and `PreferenceContext.tsx`

Typography source:
- `src/styles/fonts.css` imports Google Fonts for `Inter` and `DM Mono`

Rules for Figma-to-code styling:
1. Match Figma layout using existing grid systems before adding ad hoc wrappers.
2. For editorial screens, prefer a combination of:
   - Tailwind for base box model and state
   - inline styles for exact typography, spacing, and motion tuning
   - global helper classes for repeated layout systems
3. Keep responsive behavior aligned to current breakpoints unless a new design requires a repo-wide standard change.
4. When translating Figma spacing, normalize values into the established layout rhythm instead of mirroring every raw pixel literally.

## 7. Project Structure

Top-level structure:

```text
src/
  app/
    App.tsx
    Root.tsx
    routes.ts
    components/
      figma/
      ui/
    context/
    data/
    pages/
  imports/
    pasted_text/
  styles/
  main.tsx
```

Routing structure:
- `src/app/routes.ts`
- route-level lazy loading is already used for page bundles
- canonical routes include both top-level slugs and `/work/...` aliases

Example route pattern:

```ts
{
  path: "cxp-design-system",
  lazy: lazyCXPCaseStudyPage,
}
```

Feature organization pattern:
- `pages/` own route-level experiences
- `components/` holds reusable sections and site chrome
- `components/ui/` holds low-level primitives
- `context/` holds user preference state
- `data/` holds structured page data like project metadata
- `imports/pasted_text/` contains design/content source material

Current layout mode system:
- `bento`
- `classic`
- `focus`

State source:
- `src/app/context/PreferenceContext.tsx`

Persistence keys:
- `msc-layout`
- `msc-theme`

Rules for new Figma-driven work:
1. New screens should usually land in `src/app/pages/`.
2. Reusable page slices should be extracted into `src/app/components/`.
3. Reusable primitives belong in `src/app/components/ui/` only if they are generic across screens.
4. New visual variants should integrate with the existing `layout` and `colorTheme` model when applicable.

## Figma MCP Integration Guidance

### Recommended workflow for this repo

1. Read the target Figma node or page.
2. Reuse existing code structure instead of generating from scratch.
3. Map Figma colors and typography into `src/styles/theme.css` and existing inline typography patterns.
4. Build layouts with:
   - `.bento-grid`
   - `.responsive-grid-12`
   - `.responsive-grid-2`
   - `site-container`
5. Reuse existing UI primitives in `src/app/components/ui/`.
6. Put exported image assets under `src/assets/` and import with `figma:asset/...`.
7. Preserve lazy routes and current URL patterns when adding case-study pages.

### Figma-to-code mapping priorities

When integrating a Figma design, prefer this order:

1. existing layout modes and page structure
2. existing theme tokens in `src/styles/theme.css`
3. existing shadcn/Radix primitives in `src/app/components/ui/`
4. existing editorial section patterns in `src/app/components/`
5. custom code only where the design is genuinely new

### Explicit non-goals

Do not:
- introduce a parallel token system unrelated to `theme.css`
- hardcode many one-off hex values in components when semantic tokens are appropriate
- build new pages directly around MUI unless the repo architecture shifts
- assume Storybook or a component-doc site exists
- assume `src/assets/` already exists; create/populate it intentionally when importing Figma exports

### Suggested MCP checklist before future Figma sync work

- confirm Figma file access for `AhEbYVDs3T1juPycNJJx8j`
- confirm which library should actually back the file, because no libraries are currently subscribed
- if the intended design system is `E360 Platform` or `DfM Tabs`, subscribe or explicitly target that library key in MCP flows
- create `src/assets/` if the design import needs exported imagery
- check whether the screen belongs in `bento`, `classic`, or `focus`
- map any new tokens into `src/styles/theme.css`
- reuse or extend existing primitives rather than recreating them

## Fast Reference

Most important files for design integration:
- `src/styles/theme.css`
- `src/styles/globals.css`
- `src/styles/index.css`
- `src/app/context/PreferenceContext.tsx`
- `src/app/components/SiteNav.tsx`
- `src/app/components/ui/`
- `src/app/pages/BentoLandingPage.tsx`
- `src/app/pages/LandingPage.tsx`
- `src/app/pages/FocusLandingPage.tsx`
- `src/app/routes.ts`
- `vite.config.ts`

If a Figma design needs to feel native to this repo, the implementation should usually look like:
- semantic CSS variables from `theme.css`
- Tailwind v4 utilities for shared styling
- inline style objects for high-fidelity editorial tuning
- reusable shadcn/Radix primitives where interaction patterns already exist
- grid/flex layouts matching the patterns in `globals.css`