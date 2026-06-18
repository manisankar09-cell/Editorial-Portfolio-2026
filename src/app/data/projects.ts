export interface ProjectImpact {
  stat: string;
  label: string;
}

export interface Project {
  slug: string;
  detailHref?: string;
  index: string;
  title: string;
  shortTitle: string;
  tags: string[];
  tagline: string;
  role: string;
  period: string;
  context: string;
  contributions: string[];
  impact: ProjectImpact[];
  available: boolean;
}

export function getProjectCardRole(role: string): string {
  const [, compactRole] = role.split(/\s+[—-]\s+/, 2);
  return compactRole?.trim() || role;
}

export const PROJECTS: Project[] = [
  {
    slug: "cxp-design-system",
    detailHref: "/cxp-design-system",
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
      "Defined Adaptive Card schemas and Copilot interaction patterns across 6 product teams",
      "Established governance, behavior standards, and implementation contracts with engineering",
    ],
    impact: [
      { stat: "01", label: "Unified fragmented toolkit usage into a shared system foundation" },
      { stat: "02", label: "Improved consistency across enterprise workflows" },
      { stat: "03", label: "Enabled AI-ready interaction patterns" },
      { stat: "04", label: "Reduced design-to-engineering handoff friction" },
    ],
    available: true,
  },
  {
    slug: "contextual-ai-workflows",
    detailHref: "/contextual-ai-workflows",
    index: "02",
    title: "ContextualAI Workflows",
    shortTitle: "Contextual AI",
    tags: ["AI UX", "Agentic Workflows", "Copilot"],
    tagline: "Designing how Copilot and agents integrate into real enterprise workflows.",
    role: "Senior Product Designer — AI Experience Lead",
    period: "2022 — Present",
    context: "Microsoft CXP · Sales & Customer Success",
    contributions: [
      "Designed Contextual AI (CAI) experiences restructuring fragmented seller journeys into cohesive systems",
      "Defined trust and explainability patterns — cards, disclosure, reasoning, action affordances",
      "Drove vibe-coding adoption org-wide to shorten design-to-production iteration loops",
    ],
    impact: [
      { stat: "10K+", label: "users impacted" },
      { stat: "↑",    label: "seller focus & decision speed" },
      { stat: "WCAG", label: "2.2 AA accessibility" },
    ],
    available: true,
  },
  {
    slug: "time-tracking-agent",
    detailHref: "/time-tracking-agent",
    index: "03",
    title: "Time Tracking Agent",
    shortTitle: "Time Tracker",
    tags: ["Agentic UX", "AI Agent", "Productivity"],
    tagline: "An autonomous agent eliminating manual time-entry overhead for enterprise users.",
    role: "Product Designer — Sole Designer",
    period: "Nov 2025 - Jan 2026",
    context: "Microsoft · Internal Tool",
    contributions: [
      "Led end-to-end UX from research framing through final interaction design and delivery for an AI-powered time tracking assistant in Microsoft Teams",
      "Partnered with engineering and data science on Adaptive Card schemas, AI confidence scoring, and review-first trust patterns",
      "Aligned the experience with the CXP design system so the workflow could scale as a reusable CEAI platform capability",
    ],
    impact: [
      { stat: "$11M",  label: "Delivered $11M in annualized impact" },
      { stat: "↓ 80%", label: "Decreased manual entry effort by 80%" },
      { stat: "↑ 3×",  label: "Increased daily adoption rate by 3x" },
      { stat: "↑ 94%", label: "Increased entry accuracy to 94%" },
    ],
    available: true,
  },
];
