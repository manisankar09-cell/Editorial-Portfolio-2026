export interface EPLibraryThemeToken {
  name: string;
  paper: string;
  slate: string;
  dusk: string;
}

export interface EPLibraryRule {
  title: string;
  body: string;
}

export interface EPLibraryGridToken {
  label: string;
  value: string;
}

export interface EPLibraryPattern {
  name: string;
  intent: string;
  structure: string[];
  behaviors: string[];
}

export interface EPLibraryButtonSpec {
  name: string;
  role: string;
  defaultState: string;
  hoverState: string;
  focusState: string;
  disabledState: string;
}

export interface EPLibraryTagSpec {
  name: string;
  role: string;
  defaultState: string;
  distinction: string;
}

export const EP_LIBRARY_THEME_TOKENS: EPLibraryThemeToken[] = [
  {
    name: "color-accent-brand",
    paper: "#c4481e",
    slate: "#1a5c4a",
    dusk: "#c97d2a",
  },
  {
    name: "color-accent-foreground",
    paper: "#f9f3e8",
    slate: "#f0f5f3",
    dusk: "#1a1714",
  },
  {
    name: "color-action-primary",
    paper: "#1a1208",
    slate: "#1a1f2e",
    dusk: "#f0ece6",
  },
  {
    name: "color-action-secondary",
    paper: "#eadfce",
    slate: "#e2e6ed",
    dusk: "#2a2622",
  },
  {
    name: "color-action-link",
    paper: "#c4481e",
    slate: "#1a5c4a",
    dusk: "#c97d2a",
  },
  {
    name: "color-meta-tag",
    paper: "rgba(26, 18, 8, 0.04)",
    slate: "rgba(26, 31, 46, 0.045)",
    dusk: "rgba(240, 236, 230, 0.06)",
  },
  {
    name: "color-bg-canvas",
    paper: "#f4f1ec",
    slate: "#f0f2f5",
    dusk: "#1a1714",
  },
  {
    name: "color-surface-card",
    paper: "#f6efe4",
    slate: "#f7f8fb",
    dusk: "#221f1b",
  },
  {
    name: "color-surface-secondary",
    paper: "#eadfce",
    slate: "#e2e6ed",
    dusk: "#2a2622",
  },
  {
    name: "color-surface-muted",
    paper: "#e2d8ca",
    slate: "#d8dde6",
    dusk: "#302c28",
  },
  {
    name: "color-border-subtle",
    paper: "rgba(26, 18, 8, 0.12)",
    slate: "rgba(26, 31, 46, 0.11)",
    dusk: "rgba(240, 236, 230, 0.12)",
  },
  {
    name: "color-text-muted",
    paper: "#4f463f",
    slate: "#38495e",
    dusk: "#b0a492",
  },
  {
    name: "color-control-switch",
    paper: "#bda38a",
    slate: "#c4a882",
    dusk: "#c4a882",
  },
];

export const EP_LIBRARY_TYPOGRAPHY = [
  { label: "Eyebrow", token: "DM Mono / 10 / 1.4 / 0.18em" },
  { label: "Hero XL", token: "Inter Bold / 44 / 1.02 / -0.035em" },
  { label: "Body M", token: "Inter Regular / 13 / 1.65" },
  { label: "Mono M", token: "DM Mono / 9 / 1.4 / 0.12em" },
  { label: "Body S", token: "Inter Regular / 12 / 1.6" },
  { label: "Numeric Display", token: "Inter Bold / 48 / 1 / -0.05em" },
  { label: "Card L", token: "Inter Bold / 24 / 1.1 / -0.035em" },
  { label: "Card M", token: "Inter Semibold / 15 / 1.2 / -0.015em" },
  { label: "Mono S", token: "DM Mono / 8 / 1.4 / 0.18em" },
  { label: "Identity", token: "Inter Semibold / 15 / 1.2 / -0.02em" },
];

export const EP_LIBRARY_GRID_SYSTEM: EPLibraryGridToken[] = [
  { label: "Container width", value: "1280px" },
  { label: "Container max", value: "1440px" },
  { label: "Columns", value: "12" },
  { label: "Column width", value: "Flexible (1fr)" },
  { label: "Gutter", value: "16px" },
  { label: "Outer margin", value: "32px" },
  { label: "Row gap", value: "16px" },
];

export const EP_LIBRARY_PAGE_RULES: EPLibraryRule[] = [
  {
    title: "Tokens first",
    body: "New pages must use semantic variables from src/styles/theme.css before introducing any new color, surface, border, or hover treatment.",
  },
  {
    title: "Theme-aware accessibility",
    body: "Focus and accessibility overrides must preserve each theme's contrast logic. Never apply a paper-only muted text fallback to Slate or Dusk surfaces.",
  },
  {
    title: "Global grid first",
    body: "Desktop layouts should start from the 12-column global grid: 1280px container width, 16px gutters, 32px outer margins, and 16px row rhythm before any component-specific spans are introduced.",
  },
  {
    title: "Editorial structure",
    body: "Pages should read like editorial systems: restrained labels, strong hierarchy, generous spacing, and panels that feel archival rather than app-dashboard noisy.",
  },
  {
    title: "Three-theme parity",
    body: "Every new visual pattern must work in Paper, Slate, and Dusk without requiring page-specific exceptions.",
  },
  {
    title: "Pattern over one-off",
    body: "If a page needs a new card or panel treatment, define the pattern once in the EP library vocabulary and reuse it instead of styling it ad hoc.",
  },
  {
    title: "Motion stays stable",
    body: "Hover and reveal behaviors can change color, content, or emphasis, but they must not change card height or break grid rhythm.",
  },
];

export const EP_LIBRARY_COMPONENT_RULES: EPLibraryRule[] = [
  {
    title: "Use shared primitives",
    body: "Start from src/app/components/ui and existing site sections before creating a new primitive.",
  },
  {
    title: "Mono for metadata",
    body: "Navigation labels, status chips, indices, captions, and token names use the DM Mono scale.",
  },
  {
    title: "Inter for content",
    body: "Primary reading surfaces, titles, and explanatory copy stay in Inter with the EP typography scale.",
  },
  {
    title: "Panels stay quiet",
    body: "Use subtle borders, low-contrast surfaces, and sparse labels; do not over-stack badges, dividers, and headings in the same card.",
  },
  {
    title: "Four action tiers only",
    body: "Real actions should map to one of four button families only: primary, secondary, tertiary, or hyperlink. Do not invent page-specific CTA treatments.",
  },
  {
    title: "Tags are metadata",
    body: "Tags, chips, and taxonomy labels are never buttons. They use quiet outlined editorial chips and must stay visually lighter than even tertiary actions.",
  },
];

export const EP_LIBRARY_BUTTON_SPECS: EPLibraryButtonSpec[] = [
  {
    name: "Primary",
    role: "The single dominant action on a surface, section, or hero.",
    defaultState: "Solid fill using the theme's primary action token with high-contrast foreground.",
    hoverState: "Darkens or lightens the fill within the same theme family while preserving contrast.",
    focusState: "Shows a 3px focus ring using the shared interactive ring token.",
    disabledState: "Drops to 48% opacity and removes pointer interaction without changing layout.",
  },
  {
    name: "Secondary",
    role: "A supporting action that remains visible but quieter than the primary CTA.",
    defaultState: "Uses the theme's secondary surface fill with a subtle interactive border.",
    hoverState: "Tightens contrast through a slightly stronger fill and border.",
    focusState: "Uses the same shared 3px focus ring for parity with all other action types.",
    disabledState: "Fades consistently with the global disabled treatment.",
  },
  {
    name: "Tertiary",
    role: "A low-noise outline action for cards, utilities, and contextual controls.",
    defaultState: "Transparent background with quiet border and foreground text.",
    hoverState: "Adds a faint theme-tinted fill and stronger border without changing size.",
    focusState: "Uses the shared focus ring and preserves the outline silhouette.",
    disabledState: "Keeps its border shape but fades and becomes non-interactive.",
  },
  {
    name: "Hyperlink",
    role: "Inline or editorial navigation where a button container would add unnecessary weight.",
    defaultState: "DM Mono action text with an underlined accent color tied to the active theme.",
    hoverState: "Strengthens the link color and underline emphasis instead of adding a box.",
    focusState: "Uses the same visible focus ring so text links remain keyboard legible.",
    disabledState: "Rarely used; if disabled, it inherits the same opacity and pointer lock rules.",
  },
];

export const EP_LIBRARY_TAG_SPECS: EPLibraryTagSpec[] = [
  {
    name: "Metadata tag",
    role: "Categorize projects, systems, and themes without implying clickability or prompting action.",
    defaultState: "Small mono chip with a transparent fill, quiet border, and subdued foreground.",
    distinction: "Tags stay smaller and lighter than actions. They can share the editorial outline language, but never the larger scale or interactive hover behavior of buttons.",
  },
  {
    name: "Overflow tag",
    role: "Collapse excess taxonomy into a lightweight +n summary token when space is limited.",
    defaultState: "Uses the same outlined anatomy with a more faded border and text so it reads as secondary metadata.",
    distinction: "It should recede further than standard tags and must never resemble a compact utility button.",
  },
];

export const EP_LIBRARY_LAYOUT_PATTERNS: EPLibraryPattern[] = [
  {
    name: "Hero",
    intent: "Introduce a page with one dominant statement, one short framing paragraph, and a restrained action row.",
    structure: [
      "Mono eyebrow for system/category naming",
      "Large Inter headline with tight tracking",
      "Single explanatory paragraph under 2 lines on desktop",
      "Compact action row using quiet outlined pills",
    ],
    behaviors: [
      "Keep the headline block visually heavier than any secondary metadata",
      "Do not stack more than two actions in the hero",
      "Allow breathing room before the next section; do not collapse into card-grid density immediately",
    ],
  },
  {
    name: "Archive Row",
    intent: "List project entries as editorial records with a left meta rail, a central narrative block, and a right action/context block.",
    structure: [
      "Left rail for index and period in mono",
      "Middle rail for title, tagline, and limited taxonomy tags",
      "Impact strip below narrative using 2 to 4 editorial metrics",
      "Right rail for status, role/context, and open action",
    ],
    behaviors: [
      "Each row should read as one continuous panel, not three separate cards",
      "Cap visible tags to avoid clutter and overflow the rest into a +n token",
      "Impacts should be short statements, not long paragraphs or dashboard charts",
    ],
  },
  {
    name: "Case Study Section",
    intent: "Break detailed work into calm, readable chapters that pair explanation with one supporting evidence block.",
    structure: [
      "Section eyebrow and chapter title",
      "Lead paragraph defining the design move or system decision",
      "Supporting panel for evidence: framework, outcomes, artifact, or callout",
      "Optional secondary note for constraint, tradeoff, or implementation signal",
    ],
    behaviors: [
      "Keep each section focused on one decision or one outcome cluster",
      "Use consistent top and bottom spacing across chapters to preserve rhythm",
      "When using panels, keep surface contrast subtle so the narrative stays primary",
    ],
  },
  {
    name: "Footer",
    intent: "Close the page with stable navigation and contact signals that feel anchored rather than promotional.",
    structure: [
      "Single horizontal band or grounded block at the page base",
      "Primary identity/contact statement",
      "Secondary nav or utility links in mono",
      "Optional availability/status note",
    ],
    behaviors: [
      "Footer position should remain visually grounded and not jump during scroll interactions",
      "Do not turn the footer into another content-heavy card grid",
      "Use the same quiet border and surface logic as the rest of the library",
    ],
  },
];