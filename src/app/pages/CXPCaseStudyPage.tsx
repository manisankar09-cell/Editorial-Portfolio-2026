import { motion } from "motion/react";
import { ProjectPagination } from "../components/CaseStudyNav";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

const SLUG = "cxp-design-system";
const CASE_STUDY_SURFACE = "var(--card)";
const CASE_STUDY_SURFACE_ELEVATED = "color-mix(in srgb, #17181d 84%, var(--secondary) 16%)";

// ─── Shared primitives ────────────────────────────────────────────────────

function SectionLabel({ index, text }: { index: string; text: string }) {
  return (
    <p
      className="text-muted-foreground"
      style={{ fontSize: 11, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", marginBottom: 20 }}
    >
      {index} — {text}
    </p>
  );
}

function Rule() {
  return <div className="border-t border-border" />;
}

// ─── SECTION 1: HERO ──────────────────────────────────────────────────────

const heroTags = ["Design System", "AI UX", "Enterprise Platform", "Adaptive Cards", "Copilot Patterns"];

function HeroVisual() {
  return (
    <div className="relative w-full h-full" style={{ minHeight: 480 }}>
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Bauhaus vertical bar */}
      <div
        className="absolute bg-accent"
        style={{ width: 3, height: 72, top: "18%", left: 24, opacity: 0.5 }}
      />
      {/* Large Bauhaus circle */}
      <div
        className="absolute rounded-full border border-border"
        style={{ width: 144, height: 144, bottom: 32, right: 24 }}
      />
      <div
        className="absolute rounded-full border border-border"
        style={{ width: 80, height: 80, bottom: 64, right: 56 }}
      />

      {/* Floating UI cards */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-10">
        {/* Foundations */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border p-4"
        >
          <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", marginBottom: 8 }}>FOUNDATIONS</p>
          <div className="flex gap-2 items-center">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 20, height: 20, padding: 2 }}>
              {[0,1,2,3].map(i => <div key={i} className="bg-foreground/15" />)}
            </div>
            {[12, 18, 24, 32].map((w, i) => (
              <div key={i} className="bg-foreground/20" style={{ width: w / 3, height: 14 }} />
            ))}
            <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}>Grid · Type · Space</span>
          </div>
        </motion.div>

        {/* Components */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-card border border-border p-4"
        >
          <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", marginBottom: 8 }}>COMPONENTS</p>
          <div className="flex gap-2 flex-wrap">
            {["Button", "Input", "Badge", "Modal"].map((c, i) => (
              <span key={c} className="border" style={{
                fontSize: 10, padding: "2px 7px", fontFamily: "'DM Mono', monospace",
                borderColor: i === 0 ? "var(--foreground)" : "var(--border)",
                color: i === 0 ? "var(--foreground)" : "var(--muted-foreground)"
              }}>{c}</span>
            ))}
          </div>
        </motion.div>

        {/* Adaptive Card */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.26 }}
          className="bg-card border border-border p-4"
        >
          <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", marginBottom: 8 }}>ADAPTIVE CARD</p>
          <div className="border border-border p-2">
            <div className="bg-foreground/10 h-1.5 w-4/5 mb-1" />
            <div className="bg-foreground/7 h-1.5 w-3/5 mb-2" />
            <div className="flex gap-1">
              <span className="border border-foreground/25" style={{ fontSize: 9, padding: "2px 7px" }}>Approve</span>
              <span className="border border-border text-muted-foreground" style={{ fontSize: 9, padding: "2px 7px" }}>Dismiss</span>
            </div>
          </div>
        </motion.div>

        {/* Copilot Surface */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.34 }}
          className="p-4"
          style={{ background: CASE_STUDY_SURFACE_ELEVATED }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", opacity: 0.8 }} />
            <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.45)" }}>COPILOT SURFACE</p>
          </div>
          {[72, 58, 44].map((w, i) => (
            <div key={i} className="mb-1" style={{ width: `${w}%`, height: 7, background: `rgba(245,244,240,${0.22 - i * 0.05})` }} />
          ))}
          <div className="flex gap-2 mt-2">
            <span style={{ fontSize: 9, padding: "3px 9px", border: "1px solid rgba(245,244,240,0.3)", color: "rgba(245,244,240,0.6)", fontFamily: "'DM Mono', monospace" }}>Generate →</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="editorial-grid">
          {/* Left */}
          <div style={{ gridColumn: "1 / 7" }} className="flex flex-col justify-center">
            <p style={{ fontSize: 11, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", marginBottom: 28 }}>
              01 - CXP DESIGN SYSTEM
            </p>
            <h1
              style={{
                fontSize: "clamp(30px, 3.8vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                fontFamily: "'Inter', sans-serif",
                marginBottom: 24,
                color: "var(--foreground)",
              }}
            >
              Scaling a unified UX standard for AI-powered enterprise experiences
            </h1>
            <p
              style={{ fontSize: 15, lineHeight: 1.75, fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)", maxWidth: 460, marginBottom: 32 }}
            >
              A design system created to unify fragmented toolkits, enable consistent enterprise workflows, and support AI-driven experiences across CXP products.
            </p>
            <div className="flex flex-wrap gap-2">
              {heroTags.map(tag => (
                <span key={tag} className="ep-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ gridColumn: "7 / 13" }}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2: PROBLEM → TRANSFORMATION ─────────────────────────────────

const beforeBullets = [
  "Scattered toolkit references",
  "Inconsistent component usage",
  "Repeated design decisions",
  "Limited AI-ready patterns",
  "Higher handoff ambiguity",
];

const afterBullets = [
  "One UX standard",
  "Fluent-aligned components",
  "Reusable workflow patterns",
  "AI-ready adaptive cards",
  "Clearer design-to-dev handoff",
];

const scattered = ["Kit A", "Kit B", "Forms", "Cards", "Grid", "Panel", "AI?"];
const scatterPos: [number, number, number][] = [
  [4, 5, -5], [38, 22, 4], [68, 8, -3], [18, 55, 6],
  [55, 62, -4], [80, 42, 7], [10, 82, -6],
];

const archLayers = [
  { label: "Foundations", shade: 0.02 },
  { label: "Components", shade: 0.05 },
  { label: "Patterns", shade: 0.08 },
  { label: "Templates", shade: 0.11 },
];

function Transformation() {
  return (
    <section id="problem" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <SectionLabel index="02" text="PROBLEM → TRANSFORMATION" />
        <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 12, color: "var(--foreground)" }}>
          From fragmented toolkit usage to a shared system foundation
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", maxWidth: 640, marginBottom: 56 }}>
          CXP teams needed more than reusable components. They needed a shared operating model for designing consistent workflows, AI surfaces, templates, and implementation-ready patterns.
        </p>

        <div className="editorial-grid items-start">
          {/* Before */}
          <div className="border border-border p-7" style={{ gridColumn: "1 / 6" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.16em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", marginBottom: 12 }}>BEFORE</p>
            <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", fontFamily: "'Inter', sans-serif", marginBottom: 10 }}>Fragmented ecosystem</h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
              Multiple teams were solving similar UX problems independently, leading to duplicated effort, inconsistent patterns, and limited reuse.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {beforeBullets.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)" }}>
                  <span className="border border-foreground/20" style={{ width: 6, height: 6, display: "inline-block", flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
            {/* Scattered visual */}
            <div className="relative overflow-hidden border border-border" style={{ height: 140, background: "rgba(17,17,16,0.02)" }}>
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(17,17,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.04) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }} />
              {scattered.map((lbl, i) => {
                const [left, top, rot] = scatterPos[i];
                return (
                  <div key={lbl} className="absolute border border-border bg-card" style={{
                    left: `${left}%`, top: `${top}%`,
                    transform: `rotate(${rot}deg)`,
                    padding: "2px 7px", fontSize: 9,
                    fontFamily: "'DM Mono', monospace",
                    color: lbl === "AI?" ? "var(--accent)" : "var(--muted-foreground)",
                    borderColor: lbl === "AI?" ? "var(--accent)" : "var(--border)",
                    whiteSpace: "nowrap",
                  }}>{lbl}</div>
                );
              })}
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-3" style={{ gridColumn: "6 / 8", paddingTop: 40 }}>
            {["Fragmentation", "Standardization", "Scale"].map((step, i, arr) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <p style={{
                  fontSize: 8, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace",
                  color: "var(--accent)", writingMode: "vertical-lr",
                  transform: "rotate(180deg)", opacity: 1 - i * 0.15
                }}>{step}</p>
                {i < arr.length - 1 && (
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M4 0v8M1 6l3 4 3-4" stroke="var(--accent)" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* After */}
          <div className="border border-border p-7" style={{ gridColumn: "8 / 13", borderColor: "rgba(45,43,94,0.25)" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.16em", fontFamily: "'DM Mono', monospace", color: "var(--accent)", marginBottom: 12, opacity: 0.8 }}>AFTER</p>
            <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", fontFamily: "'Inter', sans-serif", marginBottom: 10 }}>Shared system foundation</h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
              A unified structure helped teams design from shared foundations, reusable components, scalable patterns, and product-ready templates.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {afterBullets.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontFamily: "'Inter', sans-serif", color: "var(--foreground)" }}>
                  <span className="bg-accent" style={{ width: 6, height: 6, display: "inline-block", flexShrink: 0, opacity: 0.6 }} />
                  {b}
                </li>
              ))}
            </ul>
            {/* Stacked layers visual */}
            <div className="flex flex-col gap-1">
              {archLayers.map((layer, i) => (
                <div key={layer.label} className="border border-border flex items-center px-4 py-2.5" style={{ background: `rgba(17,17,16,${layer.shade})` }}>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>{layer.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 3: ROLE & CONTRIBUTION ──────────────────────────────────────

const roleCards = [
  { n: "01", title: "System Architecture", desc: "Defined the structure of the design system across foundations, components, patterns, and templates." },
  { n: "02", title: "AI Experience Design", desc: "Designed AI-first interfaces including Adaptive Cards and Copilot interaction surfaces for enterprise workflows." },
  { n: "03", title: "Cross-functional Alignment", desc: "Worked closely with product, engineering, and research partners to align design decisions and support adoption." },
];

function Role() {
  return (
    <section id="role" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <SectionLabel index="03" text="ROLE & CONTRIBUTION" />
        <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 48 }}>
          My Role &amp; Contribution
        </h2>
        <div className="editorial-grid">
          {roleCards.map(c => (
            <div key={c.n} className="border border-border p-8 flex flex-col gap-4" style={{ gridColumn: "span 4" }}>
              <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}>{c.n}</span>
              <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em" }}>{c.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4: SYSTEM ARCHITECTURE ──────────────────────────────────────

const sysLayers = [
  { label: "FOUNDATIONS", sub: "Grid · Spacing · Typography · Accessibility", shade: 0.02 },
  { label: "COMPONENTS", sub: "Reusable Fluent-based UI elements", shade: 0.05 },
  { label: "PATTERNS", sub: "Reusable interaction and workflow solutions", shade: 0.08 },
  { label: "TEMPLATES", sub: "Pre-built screens for common enterprise use cases", shade: 0.11 },
];

function Architecture() {
  return (
    <section id="architecture" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="editorial-grid items-start">
          <div style={{ gridColumn: "1 / 5" }}>
            <SectionLabel index="04" text="SYSTEM ARCHITECTURE" />
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
              Designing a Scalable System Architecture
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
              The system was designed as a reusable foundation that helps teams move from ad-hoc design decisions to repeatable, scalable product experiences.
            </p>
          </div>
          <div style={{ gridColumn: "5 / 13" }}>
            <div className="flex flex-col gap-0">
              {sysLayers.map((layer, i) => (
                <div key={layer.label}>
                  <div
                    className="border border-border flex items-center justify-between px-7 py-5"
                    style={{ background: `rgba(17,17,16,${layer.shade})` }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>{layer.label}</span>
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>{layer.sub}</span>
                  </div>
                  {i < sysLayers.length - 1 && (
                    <div className="flex justify-center py-2">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path d="M6 0v10M2 7l4 5 4-5" stroke="var(--foreground)" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.2} />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 5: ADAPTIVE CARDS SYSTEM ────────────────────────────────────

const caseItems = [
  { label: "Challenge", body: "Adaptive card implementations were inconsistent across scenarios and lacked a reusable structure." },
  { label: "Approach", body: "Existing examples were audited, patterns were extracted, and standardized structures were created for scalable AI and agentic workflows." },
  { label: "Outcome", body: "A reusable adaptive card system enabled more consistent, implementation-ready, and dynamic workflow experiences." },
];

const adaptiveCards = [
  { tag: "RECOMMENDATION", title: "Suggested workflow change", body: "Based on recent usage, consolidating two approval stages may reduce friction.", actions: ["Apply", "Dismiss"] },
  { tag: "APPROVAL", title: "Design token update v2.4", body: "CXP token changes are staged and awaiting sign-off from the platform team.", actions: ["Approve", "Request Changes"], dark: true },
  { tag: "ACTION REQUIRED", title: "Sprint review — Q3 roadmap", body: "3 items require your attention before the design review on Friday.", actions: ["Review", "Snooze"] },
];

function AdaptiveCardsSection() {
  return (
    <section id="adaptive-cards" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="editorial-grid items-start">
          {/* Left */}
          <div style={{ gridColumn: "1 / 6" }}>
            <SectionLabel index="05" text="DEEP DIVE" />
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 40 }}>
              Adaptive Cards System
            </h2>
            <div className="flex flex-col gap-8">
              {caseItems.map((item, i) => (
                <div key={item.label} className="flex gap-6">
                  <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>{String(i + 1).padStart(2, "0")}</span>
                    {i < caseItems.length - 1 && <div className="bg-border" style={{ width: 1, height: 48, marginTop: 6 }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{item.label.toUpperCase()}</p>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — card examples */}
          <div style={{ gridColumn: "7 / 13" }} className="flex flex-col gap-3 pt-14">
            {adaptiveCards.map(card => (
              <div
                key={card.tag}
                className="border border-border p-5 flex flex-col gap-3"
                style={{ background: (card as any).dark ? CASE_STUDY_SURFACE_ELEVATED : CASE_STUDY_SURFACE }}
              >
                <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: (card as any).dark ? "rgba(245,244,240,0.4)" : "var(--muted-foreground)" }}>{card.tag}</p>
                <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", lineHeight: 1.3, color: (card as any).dark ? "rgba(245,244,240,0.9)" : "var(--foreground)" }}>{card.title}</p>
                <p style={{ fontSize: 12, lineHeight: 1.6, fontFamily: "'Inter', sans-serif", color: (card as any).dark ? "rgba(245,244,240,0.55)" : "var(--muted-foreground)" }}>{card.body}</p>
                <div className="flex gap-2 pt-1">
                  {card.actions.map((action, ai) => (
                    <button key={action} style={{
                      fontSize: 10, padding: "4px 12px", fontFamily: "'Inter', sans-serif",
                      background: "transparent", cursor: "pointer",
                      border: `1px solid ${(card as any).dark ? (ai === 0 ? "rgba(245,244,240,0.45)" : "rgba(245,244,240,0.15)") : (ai === 0 ? "var(--foreground)" : "var(--border)")}`,
                      color: (card as any).dark ? (ai === 0 ? "rgba(245,244,240,0.85)" : "rgba(245,244,240,0.35)") : (ai === 0 ? "var(--foreground)" : "var(--muted-foreground)"),
                    }}>{action}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6: COPILOT SURFACE ───────────────────────────────────────────

const copilotSuggestions = [
  "Summarize open tasks from last sprint",
  "Identify blockers in the current workflow",
  "Generate a design review checklist",
  "Highlight patterns across recent feedback",
];

function CopilotSection() {
  return (
    <section id="copilot" className="border-b border-border" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="site-container">
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <SectionLabel index="06" text="DEEP DIVE" />
          <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>
            Designing for AI: Copilot Surface
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: 48 }}>
            Traditional UI patterns were not enough for AI-driven workflows. A dedicated Copilot surface helped integrate insights, recommendations, and actions contextually within existing enterprise experiences.
          </p>
        </div>

        {/* Copilot panel — centered, prominent */}
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          <div className="border border-border" style={{ background: CASE_STUDY_SURFACE_ELEVATED, color: "rgba(240,236,230,0.92)" }}>
            {/* Header */}
            <div className="border-b flex items-center justify-between px-6 py-4" style={{ borderColor: "rgba(245,244,240,0.08)" }}>
              <div className="flex items-center gap-2.5">
                <div className="rounded-full flex items-center justify-center" style={{ width: 16, height: 16, background: "var(--accent)", opacity: 0.85, fontSize: 9, color: "#fff" }}>✦</div>
                <span style={{ fontSize: 10, letterSpacing: "0.16em", fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.5)" }}>COPILOT</span>
              </div>
              <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.25)", letterSpacing: "0.1em" }}>ENTERPRISE SURFACE</span>
            </div>

            <div className="px-8 py-8 flex flex-col gap-6">
              {/* Analysis block */}
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.3)", marginBottom: 10 }}>CONTEXTUAL INSIGHT</p>
                {[100, 84, 66].map((w, i) => (
                  <div key={i} className="mb-1.5" style={{ width: `${w}%`, height: 9, background: `rgba(245,244,240,${0.2 - i * 0.04})` }} />
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(245,244,240,0.07)" }} />

              {/* Suggestions */}
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.3)", marginBottom: 10 }}>RECOMMENDED ACTIONS</p>
                <div className="flex flex-col gap-2">
                  {copilotSuggestions.map(s => (
                    <div key={s} className="flex items-center gap-3" style={{ border: "1px solid rgba(245,244,240,0.08)", padding: "7px 12px" }}>
                      <span style={{ width: 5, height: 5, background: "var(--accent)", display: "inline-block", flexShrink: 0, opacity: 0.65 }} />
                      <span style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "rgba(245,244,240,0.6)" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: "rgba(245,244,240,0.07)" }} />

              {/* Input */}
              <div className="flex items-center gap-3" style={{ border: "1px solid rgba(245,244,240,0.12)", padding: "9px 14px" }}>
                <span style={{ flex: 1, fontSize: 12, fontFamily: "'Inter', sans-serif", color: "rgba(245,244,240,0.25)" }}>Ask Copilot something…</span>
                <button style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "rgba(245,244,240,0.45)", background: "transparent", border: "1px solid rgba(245,244,240,0.18)", padding: "4px 12px", cursor: "pointer", letterSpacing: "0.08em" }}>SEND →</button>
              </div>
            </div>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif", fontStyle: "italic", color: "var(--muted-foreground)" }}>
            "A reusable pattern for embedding AI into workflows without disrupting the primary task flow."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: AI-NATIVE PRACTICES ──────────────────────────────────────

const keyContributions = [
  "Defined reusable CAI guidelines enabling trigger-based AI workflows across surfaces",
  "Established patterns across Copilot interactions, Adaptive Cards, and agent-led workflows",
  "Introduced Vibe Coding / VS Code-first workflows to reduce design-to-engineering handoff friction",
  "Shifted experiences from static workflows to intelligent, context-aware, action-driven systems",
];

const evolutionStages = [
  { n: "01", label: "Static Workflows", sub: "Linear UI blocks, disconnected steps", tags: [] },
  { n: "02", label: "Reusable System", sub: "Components, templates, patterns", tags: [] },
  { n: "03", label: "AI-Native Layer", sub: "Copilot surface, adaptive cards, contextual triggers", tags: ["Trigger", "Context"] },
  { n: "04", label: "Agent-Driven Workflows", sub: "Action loops, recommendations, automated handoffs", tags: ["Recommendation", "Action"] },
];

function AINativePractices() {
  return (
    <section id="ai-native" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <SectionLabel index="07" text="AI-NATIVE PRACTICES" />
        <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>
          AI-Native Practices &amp; Continuous Improvement
        </h2>
        <p style={{ fontSize: 13, color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 48 }}>
          Evolving the design system into an AI-first operating model
        </p>

        <div className="editorial-grid items-start">
          {/* Left */}
          <div style={{ gridColumn: "1 / 6" }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: "'Inter', sans-serif", marginBottom: 32, color: "var(--foreground)" }}>
              Played a central role in evolving the organization toward AI-native design and development practices, shifting experiences from static workflows to dynamic, context-aware, action-driven systems.
            </p>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>KEY CONTRIBUTIONS</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {keyContributions.map((k, i) => (
                <li key={i} className="flex gap-4" style={{ fontSize: 13, lineHeight: 1.65, fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)" }}>
                  <span style={{ flexShrink: 0, marginTop: 4, width: 5, height: 5, background: "var(--accent)", display: "inline-block", opacity: 0.6 }} />
                  {k}
                </li>
              ))}
            </ul>
            {/* Impact highlight */}
            <div className="border border-border p-5" style={{ borderColor: "rgba(45,43,94,0.25)", background: "rgba(45,43,94,0.03)" }}>
              <p style={{ fontSize: 13, lineHeight: 1.7, fontFamily: "'Inter', sans-serif", color: "var(--foreground)", fontStyle: "italic" }}>
                "Enabled a transition to a scalable AI-native operating model, improving both speed and quality of delivery."
              </p>
            </div>
          </div>

          {/* Right — evolution diagram */}
          <div style={{ gridColumn: "7 / 13" }} className="flex flex-col gap-0">
            {evolutionStages.map((stage, i) => (
              <div key={stage.n}>
                <div className="border border-border p-5" style={{ background: `rgba(17,17,16,${0.02 + i * 0.025})` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>{stage.n}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{stage.label}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{stage.sub}</p>
                    </div>
                    {stage.tags.length > 0 && (
                      <div className="flex flex-col gap-1 items-end">
                        {stage.tags.map(tag => (
                          <span key={tag} className="ep-tag" style={{ minHeight: 20, padding: "0 7px", fontSize: 8, letterSpacing: "0.1em", color: "var(--foreground)", borderColor: "var(--foreground)" }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {i < evolutionStages.length - 1 && (
                  <div className="flex justify-center py-2">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M5 0v8M1.5 5.5l3.5 4.5 3.5-4.5" stroke="var(--foreground)" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.2} />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 8: SYSTEM IN ACTION ─────────────────────────────────────────

const actionTiles = [
  {
    n: "01",
    label: "Adaptive card applied across workflows",
    detail: "Dynamic card structures enabling consistent task management across enterprise surfaces.",
    visual: "card",
  },
  {
    n: "02",
    label: "Copilot surface integrated into enterprise experiences",
    detail: "Contextual AI panel surfacing insights and actions within existing workflows.",
    visual: "copilot",
  },
  {
    n: "03",
    label: "Template-driven layouts for common scenarios",
    detail: "Pre-built screen templates reducing design time for recurring enterprise use cases.",
    visual: "template",
  },
  {
    n: "04",
    label: "Reusable patterns supporting faster design-to-dev alignment",
    detail: "Standardized interaction patterns reducing ambiguity at the design-engineering boundary.",
    visual: "pattern",
  },
];

function TileVisual({ type }: { type: string }) {
  if (type === "card") return (
    <div className="border border-border bg-background p-3">
      <div className="bg-foreground/8 h-2 w-3/4 mb-1.5" />
      <div className="bg-foreground/5 h-2 w-1/2 mb-3" />
      <div className="flex gap-1">
        <div className="border border-foreground/20 px-2 py-0.5" style={{ fontSize: 9 }}>Action</div>
        <div className="border border-border px-2 py-0.5 text-muted-foreground" style={{ fontSize: 9 }}>Skip</div>
      </div>
    </div>
  );
  if (type === "copilot") return (
    <div className="p-3" style={{ background: CASE_STUDY_SURFACE_ELEVATED }}>
      <div className="flex items-center gap-1.5 mb-2">
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.7 }} />
        <div style={{ height: 6, width: 60, background: "rgba(245,244,240,0.15)" }} />
      </div>
      {[90, 70, 50].map((w, i) => <div key={i} className="mb-1" style={{ width: `${w}%`, height: 6, background: `rgba(245,244,240,${0.15 - i * 0.03})` }} />)}
    </div>
  );
  if (type === "template") return (
    <div className="border border-border bg-background p-3 flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[3, 2, 1].map((span, i) => <div key={i} className="border border-border bg-foreground/5" style={{ flex: span, height: 16 }} />)}
      </div>
      <div className="border border-border bg-foreground/4" style={{ height: 28 }} />
      <div className="flex gap-1">
        {[1, 1].map((_, i) => <div key={i} className="flex-1 border border-border bg-foreground/3" style={{ height: 18 }} />)}
      </div>
    </div>
  );
  return (
    <div className="border border-border bg-background p-3">
      <div className="flex gap-1.5 mb-1.5 flex-wrap">
        {["Input", "Select", "Toggle"].map(c => (
          <div key={c} className="border border-border" style={{ fontSize: 8, padding: "2px 5px", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}>{c}</div>
        ))}
      </div>
      <div className="bg-foreground/8 h-1.5 w-4/5 mb-1" />
      <div className="bg-foreground/5 h-1.5 w-3/5" />
    </div>
  );
}

function SystemInAction() {
  return (
    <section id="system-in-action" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <SectionLabel index="08" text="SYSTEM IN ACTION" />
        <div className="flex items-end justify-between mb-12">
          <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif" }}>
            System in Action
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", maxWidth: 380, textAlign: "right" }}>
            Reusable components, patterns, and AI-ready templates helped product teams design consistent enterprise workflows faster.
          </p>
        </div>

        <div className="editorial-grid">
          {actionTiles.map(tile => (
            <div key={tile.n} className="border border-border p-6 flex flex-col gap-4" style={{ gridColumn: "span 6" }}>
              <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>{tile.n}</span>
              <TileVisual type={tile.visual} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>{tile.label}</p>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>{tile.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9: IMPACT ────────────────────────────────────────────────────

const impacts = [
  "Unified fragmented toolkit usage into a shared system foundation",
  "Improved consistency across enterprise workflows",
  "Enabled AI-ready interaction patterns",
  "Reduced design-to-engineering handoff friction",
];

function Impact() {
  return (
    <section id="impact" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <SectionLabel index="09" text="IMPACT" />
        <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 48 }}>
          Impact
        </h2>
        <div className="editorial-grid" style={{ rowGap: 0 }}>
          {impacts.map((item, i) => (
            <div
              key={item}
              className="flex flex-col justify-between py-8 px-6"
              style={{ gridColumn: "span 3", borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}
            >
              <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: "var(--muted-foreground)", marginBottom: 16 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.55, fontFamily: "'Inter', sans-serif", color: "var(--foreground)" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-12 pt-8">
          <p style={{ fontSize: 15, lineHeight: 1.75, fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)", maxWidth: 680, fontStyle: "italic" }}>
            "Helped shift CXP from ad-hoc design execution toward a scalable, AI-native design operating model."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10: REFLECTION ───────────────────────────────────────────────

function Reflection() {
  return (
    <section id="reflection" className="border-b border-border" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="site-container">
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          <SectionLabel index="10" text="REFLECTION" />
          <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif", marginBottom: 32 }}>
            Reflection
          </h2>
          <div style={{ width: 40, height: 2, background: "var(--accent)", opacity: 0.4, marginBottom: 32 }} />
          <p style={{ fontSize: 16, lineHeight: 1.85, fontFamily: "'Inter', sans-serif", color: "var(--foreground)", marginBottom: 24 }}>
            This project reinforced that design systems are not just libraries of components — they are operating models for scale. By connecting foundations, patterns, AI surfaces, and engineering workflows, the system helped teams move faster while maintaining consistency, accessibility, and product quality.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)" }}>
            It also shaped my perspective on designing for AI: the future is not just smarter interfaces, but adaptable systems that understand context and drive meaningful action.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── CLASSIC VIEW ──────────────────────────────────────────────────────────

function ClassicView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      <SiteNav variant="casestudy" title="CXP Design System" />
      <main style={{ flex: 1 }}>
        <Hero />
        <Transformation />
        <Role />
        <Architecture />
        <AdaptiveCardsSection />
        <CopilotSection />
        <AINativePractices />
        <SystemInAction />
        <Impact />
        <Reflection />
      </main>
      <nav aria-label="Project pagination">
        <ProjectPagination projectSlug={SLUG} />
      </nav>
      <SiteFooter />
    </div>
  );
}

// ─── SHARED BENTO/FOCUS PRIMITIVES ─────────────────────────────────────────

const MONO_S = { fontFamily: "'DM Mono', monospace" } as const;
const SANS_S = { fontFamily: "'Inter', sans-serif" } as const;

const CXP_IMPACT = [
  { stat: "↓",    label: "Design inconsistency" },
  { stat: "↑",    label: "Cross-team collaboration" },
  { stat: "↓",    label: "Design rework" },
  { stat: "↑",    label: "Speed of delivery" },
];

const ARCH_LAYERS = [
  { label: "FOUNDATIONS",  sub: "Fluent tokens + UCI principles" },
  { label: "COMPONENTS",   sub: "Reusable UI component library" },
  { label: "PATTERNS",     sub: "Page layouts + interaction flows" },
  { label: "AI LAYER",     sub: "Copilot drawer + Adaptive Cards" },
  { label: "CONSUMERS",    sub: "Design · PM · Engineering" },
];

const CORE_ELEMENTS = ["Components", "Page templates", "Patterns", "Design guidelines", "Token system", "Adaptive patterns"];

function DSLibraryVisual() {
  const rows = [
    ["Button", "Input", "Dropdown", "Toggle"],
    ["Card",   "Modal", "Nav",      "Badge"],
    ["Table",  "Form",  "Sidebar",  "Drawer"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 4 }}>
          {row.map((c, ci) => (
            <div key={ci} style={{
              flex: 1, padding: "6px 8px", border: "1px solid var(--border)",
              background: ri === 0 && ci === 0 ? "var(--accent)" : "var(--card)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontSize: 8, ...MONO_S, letterSpacing: "0.06em",
                color: ri === 0 && ci === 0 ? "var(--accent-foreground)" : "var(--muted-foreground)",
              }}>{c}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function FragmentedDiagram() {
  const libs = ["Lib A", "Lib B", "Lib C", "Lib D", "Lib E", "Lib F", "Lib G", "Lib H", "Lib I"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {libs.map((l, i) => (
        <div key={l} style={{
          padding: "5px 10px", border: "1px solid var(--border)",
          background: `rgba(${[60,100,140][i%3]},${[80,60,110][i%3]},${[120,80,60][i%3]},0.08)`,
          fontSize: 9, ...MONO_S, color: "var(--muted-foreground)", letterSpacing: "0.06em",
          transform: `rotate(${[-2,-1,1,0,-1.5,2,0.5,-0.5,1.5][i]}deg)`,
        }}>{l}</div>
      ))}
    </div>
  );
}

function WorkflowFlow() {
  const steps = ["Figma", "Component System", "VS Code", "Storybook", "Product"];
  return (
    <div
      role="group"
      aria-label="Workflow flow from Figma to Product"
      tabIndex={0}
      style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", outlineOffset: 4 }}
    >
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            padding: "10px 14px", border: "1px solid var(--border)",
            background: i === 0 ? "var(--accent)" : i === steps.length - 1 ? "var(--secondary)" : "var(--card)",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontSize: 10, ...MONO_S, letterSpacing: "0.08em",
              color: i === 0 ? "var(--accent-foreground)" : "var(--foreground)",
            }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ padding: "0 6px", color: "var(--muted-foreground)", fontSize: 14 }}>→</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// BENTO VIEW
// ══════════════════════════════════════════════════════════════════════════

function BentoView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS_S }}>
      <SiteNav variant="casestudy" title="CXP Design System" />

      <main style={{ width: "100%", padding: "12px 10px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8 }}>

          {/* 1. HERO — 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            style={{ gridColumn: "1 / 9", gridRow: "1", border: "1px solid var(--border)", background: CASE_STUDY_SURFACE_ELEVATED, padding: "36px 36px 28px", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            {/* Grid bg */}
            <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,244,240,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,244,240,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(240,236,230,0.35)", ...MONO_S, marginBottom: 14 }}>01 — CXP DESIGN SYSTEM</p>
              <h1 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, color: "rgba(240,236,230,0.92)", ...SANS_S, maxWidth: 520, marginBottom: 14 }}>
                Creating a single source of truth for CXP design
              </h1>
              <p style={{ fontSize: 14, color: "rgba(240,236,230,0.48)", ...SANS_S, lineHeight: 1.6, maxWidth: 440 }}>
                From fragmented libraries to a scalable, AI-ready design system
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, marginTop: 28 }}>
              <DSLibraryVisual />
            </div>
          </motion.div>

          {/* 2. IMPACT — 4 cols (2×2 tiles) */}
          <div style={{ gridColumn: "9 / 13", gridRow: "1", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 }}>
            {CXP_IMPACT.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.06 + i * 0.05 }}
                style={{ border: "1px solid var(--border)", background: i % 2 === 0 ? "var(--secondary)" : "var(--card)", padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", ...SANS_S, color: m.stat === "↑" ? "var(--accent)" : "var(--foreground)" }}>{m.stat}</span>
                <span style={{ fontSize: 10, color: "var(--muted-foreground)", ...SANS_S, lineHeight: 1.4 }}>{m.label}</span>
              </motion.div>
            ))}
          </div>

          {/* 3. THE PROBLEM — 4 cols */}
          <div style={{ gridColumn: "1 / 5", gridRow: "2", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 12 }}>THE PROBLEM</p>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, ...SANS_S, marginBottom: 20 }}>
                9+ disconnected Figma libraries
              </p>
              {["Siloed teams, no shared language", "Duplicate components everywhere", "UX inconsistency across surfaces", "High design rework on every sprint"].map(b => (
                <div key={b} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "var(--accent)", fontSize: 10, flexShrink: 0 }}>—</span>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S }}>{b}</p>
                </div>
              ))}
            </div>
            <FragmentedDiagram />
          </div>

          {/* 4. BREAKTHROUGH — 4 cols */}
          <div style={{ gridColumn: "5 / 9", gridRow: "2", border: "1px solid var(--border)", background: "var(--secondary)", padding: 28, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 12 }}>BREAKTHROUGH</p>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, ...SANS_S, marginBottom: 14 }}>
                Scattered libraries → unified design system
              </p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, ...SANS_S }}>
                One Fluent-aligned library as the single source of truth across design, PM, and engineering.
              </p>
            </div>
            {/* Convergence diagram */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                {["Lib A","Lib B","Lib C"].map(l => (
                  <div key={l} style={{ height: 6, background: "var(--border)", borderRadius: 2 }} />
                ))}
              </div>
              <span style={{ fontSize: 16, color: "var(--accent)" }}>→</span>
              <div style={{ flex: 1, height: 20, background: CASE_STUDY_SURFACE, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, ...MONO_S, letterSpacing: "0.08em", color: "var(--foreground)" }}>CXP DS</span>
              </div>
            </div>
          </div>

          {/* 7. GOVERNANCE — 4 cols */}
          <div style={{ gridColumn: "9 / 13", gridRow: "2", border: "1px solid var(--border)", background: "var(--card)", padding: 24, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em" }}>GOVERNANCE</p>
            <div>
              {["Standardization protocols", "Component reuse mandates", "Design review gates", "Living documentation"].map((g, i) => (
                <div key={g} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: 9, ...MONO_S, color: "var(--accent)", width: 18, flexShrink: 0 }}>0{i+1}</span>
                  <span style={{ fontSize: 11, ...SANS_S }}>{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. ARCHITECTURE — 8 cols */}
          <div style={{ gridColumn: "1 / 9", gridRow: "3", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 200 }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 20 }}>SYSTEM ARCHITECTURE</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ARCH_LAYERS.map((layer, i) => (
                <div key={layer.label} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "10px 14px",
                  background: `rgba(17,17,16,${0.02 + i * 0.02})`,
                  border: "1px solid var(--border)",
                }}>
                  <span style={{ fontSize: 8, ...MONO_S, letterSpacing: "0.1em", color: "var(--accent)", width: 90, flexShrink: 0 }}>{layer.label}</span>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  <span style={{ fontSize: 10, color: "var(--muted-foreground)", ...SANS_S }}>{layer.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. CORE ELEMENTS — 4 cols */}
          <div style={{ gridColumn: "9 / 13", gridRow: "3", border: "1px solid var(--border)", background: "var(--secondary)", padding: 24, minHeight: 200 }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 16 }}>CORE ELEMENTS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CORE_ELEMENTS.map((el, i) => (
                <div key={el} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < CORE_ELEMENTS.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: 9, ...MONO_S, color: "var(--muted-foreground)", width: 18, flexShrink: 0 }}>0{i+1}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, ...SANS_S }}>{el}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 8. ENABLEMENT — 4 cols */}
          <div style={{ gridColumn: "1 / 5", gridRow: "4", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em" }}>ENABLEMENT</p>
            <div>
              {["PM training sessions", "Hands-on design workshops", "Self-serve documentation", "Figma component templates"].map((e, i) => (
                <div key={e} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ color: "var(--accent)", fontSize: 9, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 12, ...SANS_S }}>{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 9. REAL WORKFLOW — 8 cols */}
          <div style={{ gridColumn: "5 / 13", gridRow: "4", border: "1px solid var(--border)", background: "var(--secondary)", padding: 28, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 16 }}>REAL WORKFLOW</p>
            <WorkflowFlow />
            <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S, marginTop: 16 }}>
              Design-to-code pipeline shared across Design, PM, and Engineering — reducing handoff friction and enabling live component validation.
            </p>
          </div>

          {/* 10. KEY INNOVATION — 4 cols */}
          <div style={{ gridColumn: "1 / 5", gridRow: "5", border: "1px solid var(--border)", background: CASE_STUDY_SURFACE_ELEVATED, padding: 28, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "rgba(240,236,230,0.35)", letterSpacing: "0.14em" }}>KEY INNOVATION</p>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "rgba(240,236,230,0.92)", ...SANS_S, marginBottom: 14 }}>
                Bridging design to code
              </p>
              {["Living components in Storybook", "Interactive design validation", "Faster engineering handoff"].map(t => (
                <div key={t} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "rgba(240,236,230,0.5)", fontSize: 9, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 11, color: "rgba(240,236,230,0.65)", ...SANS_S }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 11. SYSTEM PREVIEW — 8 cols */}
          <div style={{ gridColumn: "5 / 13", gridRow: "5", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 200 }}>
            <p style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 16 }}>SYSTEM PREVIEW</p>
            <DSLibraryVisual />
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {["Foundations", "Components", "Patterns", "AI surfaces", "Tokens"].map(t => (
                <span key={t} style={{ fontSize: 8, padding: "3px 8px", border: "1px solid var(--border)", color: "var(--muted-foreground)", ...MONO_S, letterSpacing: "0.06em" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 12. REFLECTION — full width */}
          <div style={{ gridColumn: "1 / 13", gridRow: "6", border: "1px solid var(--border)", background: "var(--secondary)", padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
            <p style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, ...SANS_S, maxWidth: 560, fontStyle: "italic" }}>
              "Design systems are not libraries — they are alignment tools"
            </p>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <span style={{ fontSize: 9, ...MONO_S, color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>CXP DESIGN SYSTEM</span>
              <span style={{ fontSize: 9, ...MONO_S, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>MICROSOFT · 2020–PRESENT</span>
            </div>
          </div>

        </div>
      </main>

      <nav aria-label="Project pagination">
        <ProjectPagination projectSlug={SLUG} />
      </nav>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// FOCUS VIEW (Ultra-minimal, < 60 second scan)
// ══════════════════════════════════════════════════════════════════════════

function FocusView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS_S }}>
      <SiteNav variant="casestudy" title="CXP Design System" />

      <main style={{ maxWidth: 560, margin: "0 auto", padding: "72px 24px 160px" }}>

        {/* 1. HERO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 16 }}>CXP DESIGN SYSTEM</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, ...SANS_S, marginBottom: 12 }}>
            From fragmented design → unified system
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", ...SANS_S }}>Microsoft · 2020–Present · Enterprise Platform</p>
        </motion.div>

        {/* 2. CORE SHIFT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 20 }}>CORE SHIFT</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 28px 1fr", alignItems: "center", gap: 0 }}>
            <div style={{ padding: "14px 16px", background: "var(--muted)", borderRadius: 2 }}>
              <p style={{ fontSize: 10, ...MONO_S, color: "var(--muted-foreground)", marginBottom: 4 }}>BEFORE</p>
              <p style={{ fontSize: 14, fontWeight: 600, ...SANS_S }}>9 disconnected libraries</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S }}>Siloed, duplicate, inconsistent</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 14, color: "var(--accent)" }}>→</span>
            </div>
            <div style={{ padding: "14px 16px", background: "var(--secondary)", borderRadius: 2, border: "1px solid var(--accent)" }}>
              <p style={{ fontSize: 10, ...MONO_S, color: "var(--accent)", marginBottom: 4 }}>AFTER</p>
              <p style={{ fontSize: 14, fontWeight: 600, ...SANS_S }}>1 unified system</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S }}>Single source of truth</p>
            </div>
          </div>
        </motion.div>

        {/* 3. WHAT I BUILT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 20 }}>WHAT I BUILT</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {["Component library", "Page templates", "Design guidelines", "Adaptive patterns", "Copilot integrations"].map((item, i) => (
              <div key={item} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 8, ...MONO_S, color: "var(--accent)", width: 20, flexShrink: 0 }}>0{i+1}</span>
                <p style={{ fontSize: 15, fontWeight: 500, ...SANS_S }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. WHY IT MATTERS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 20 }}>WHY IT MATTERS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Reduced design rework across 6+ product teams", "Improved consistency at enterprise scale", "Faster designer and PM onboarding", "Cross-functional alignment on one shared system"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--accent)", fontSize: 10, flexShrink: 0, marginTop: 1 }}>—</span>
                <p style={{ fontSize: 13, ...SANS_S }}>{p}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. HOW IT SCALES */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 16 }}>HOW IT SCALES</p>
          <WorkflowFlow />
          <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S, marginTop: 10 }}>
            Shared system across Design, PM, Engineering
          </p>
        </motion.div>

        {/* 6. ENABLEMENT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 16 }}>ENABLEMENT</p>
          {["PM training programs", "Documentation templates", "Self-serve design workflows"].map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "var(--accent)", fontSize: 9, flexShrink: 0 }}>✓</span>
              <p style={{ fontSize: 13, ...SANS_S }}>{e}</p>
            </div>
          ))}
        </motion.div>

        {/* 7. SIGNATURE MOMENT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 12 }}>SIGNATURE MOMENT</p>
          <p style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", ...SANS_S, marginBottom: 8 }}>
            Consolidated 9 libraries into one.
          </p>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", ...SANS_S }}>
            Unlocked consistency across the entire org.
          </p>
        </motion.div>

        {/* 8. IMPACT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.30 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO_S, marginBottom: 20 }}>IMPACT</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {CXP_IMPACT.map(m => (
              <div key={m.label}>
                <p style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, letterSpacing: "-0.04em", ...SANS_S, color: m.stat === "↑" ? "var(--accent)" : "var(--foreground)", marginBottom: 4 }}>{m.stat}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS_S }}>{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 9. CLOSING LINE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }} style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 20px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.5, ...SANS_S }}>
            Systems scale impact. Screens do not.
          </p>
        </motion.div>

      </main>

      <nav aria-label="Project pagination">
        <ProjectPagination projectSlug={SLUG} />
      </nav>
    </div>
  );
}

// ─── PAGE — switches on layout mode ────────────────────────────────────────

export function CXPCaseStudyPage() {
  return <div style={{ ["--muted-foreground" as any]: "color-mix(in srgb, var(--foreground) 92%, var(--background))" }}><ClassicView /></div>;
}
