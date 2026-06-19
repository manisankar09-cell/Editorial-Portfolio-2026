import { SiteNav } from "../components/SiteNav";
import { ProjectPagination } from "../components/CaseStudyNav";
import { SiteFooter } from "../components/SiteFooter";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { motion } from "motion/react";
import { PROJECTS } from "../data/projects";
import oldTt1 from "../../imports/Old TT 1.png";
import oldTt2 from "../../imports/Old TT 2.png";
import oldTt3 from "../../imports/Old TT 3.png";
import oldTt4 from "../../imports/Old TT 4.png";
import dailyEntryVideo from "../../imports/Adobe Express - Daily entry.mp4";
import dailyEntryPoster from "../../imports/poster image.png";

const SLUG = "time-tracking-agent";
const PROJECT = PROJECTS.find((project) => project.slug === SLUG) ?? PROJECTS[0];
const MAX = 1200;
const MONO = { fontFamily: "'DM Mono', monospace" } as const;
const SANS = { fontFamily: "'Inter', sans-serif" } as const;
const TIME_TRACKING_HERO_SURFACE = "color-mix(in srgb, #141629 86%, var(--secondary) 14%)";

// ── Shared content ────────────────────────────────────────────────────────

const IMPACT = [
  { stat: "$11M",  label: "Annualized impact" },
  { stat: "↓ 80%", label: "Manual entry effort" },
  { stat: "↑ 3×",  label: "Daily adoption rate" },
  { stat: "↑ 94%", label: "Entry accuracy" },
];

const PRINCIPLES = [
  "Daily-first, not weekly",
  "Progressive disclosure",
  "User always in control",
  "Make AI explainable",
];

const KEY_DECISIONS = [
  { label: "Killed the weekly grid", desc: "Replaced time-table with daily adaptive cards inside Teams." },
  { label: "Summary-first model",    desc: "AI shows what it already knows — user corrects, not constructs." },
  { label: "Cards over tables",      desc: "Each entry is an independent, editable, dismissable unit." },
  { label: "No auto-submit, ever",   desc: "Every entry requires a conscious approval action." },
];

const FLOW_STEPS = [
  { n: "01", label: "Notification", desc: "Daily nudge at 4 PM in Teams" },
  { n: "02", label: "Suggestion",   desc: "AI generates entries from calendar + activity" },
  { n: "03", label: "Review & Edit", desc: "User adjusts hours, categories, notes" },
  { n: "04", label: "Submit",        desc: "One tap — synced to backend" },
];

// ── Shared primitives ─────────────────────────────────────────────────────

function SectionLabel({ index, text }: { index: string; text: string }) {
  return (
    <p className="tt-section-eyebrow" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 20 }}>
      {text}
    </p>
  );
}

function Rule() {
  return <div className="border-t border-border" style={{ marginTop: 80, marginBottom: 80 }} />;
}

// ── Visual mocks ──────────────────────────────────────────────────────────

function TeamsAgentMock() {
  return (
    <div style={{
      background: "#1a1a2e", borderRadius: 10, overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.28)", maxWidth: 420,
    }}>
      {/* Teams titlebar */}
      <div style={{ background: "#201f3d", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6264a7" }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", ...MONO, letterSpacing: "0.08em" }}>
          MICROSOFT TEAMS — TIME TRACKING AGENT
        </span>
      </div>
      {/* Chat area */}
      <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Bot message */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: "#6264a7",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2" fill="white"/><path d="M3 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.2" fill="none"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.78)", ...MONO, marginBottom: 4 }}>TIME AGENT · 4:00 PM</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", ...SANS, lineHeight: 1.5, marginBottom: 8 }}>
              Hi! I've prepared your time entries for today. Please review and confirm:
            </p>
            {/* Adaptive card */}
            <div style={{ background: "#2b2b4a", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ background: "#3c3c6e", padding: "8px 12px" }}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.82)", ...MONO, letterSpacing: "0.1em" }}>SUGGESTED TIME ENTRIES · TODAY</p>
              </div>
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { proj: "CXP Design System", hrs: "3.5h", conf: 96 },
                  { proj: "Stakeholder Review", hrs: "1.0h", conf: 88 },
                  { proj: "Sprint Planning",   hrs: "0.5h", conf: 94 },
                ].map((e, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "6px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", ...SANS, fontWeight: 500 }}>{e.proj}</p>
                      <p style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", ...MONO }}>AI Confidence: {e.conf}%</p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#7fc8a9", ...MONO,
                      background: "rgba(127,200,169,0.1)", padding: "2px 7px", borderRadius: 3,
                    }}>{e.hrs}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "8px 12px", display: "flex", gap: 6, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button style={{
                  flex: 1, padding: "6px 10px", background: "#6264a7", border: "none",
                  borderRadius: 4, color: "white", fontSize: 9, ...MONO, letterSpacing: "0.08em", cursor: "pointer",
                }}>APPROVE ALL</button>
                <button style={{
                  padding: "6px 14px", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4,
                  color: "rgba(255,255,255,0.6)", fontSize: 9, ...MONO, letterSpacing: "0.08em", cursor: "pointer",
                }}>EDIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeGrid() {
  const slides = [
    { src: oldTt1, alt: "Old TT 1" },
    { src: oldTt2, alt: "Old TT 2" },
    { src: oldTt3, alt: "Old TT 3" },
    { src: oldTt4, alt: "Old TT 4" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden", opacity: 0.8 }}>
      <div style={{ background: "var(--muted)", padding: "6px 10px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 9, ...MONO, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>WEEKLY TIME ENTRY — BEFORE SCREENS</p>
      </div>
      <div
        style={{
          position: "relative",
          background: "var(--secondary)",
          minHeight: 340,
          padding: 12,
        }}
      >
        <div style={{
          border: "1px solid var(--border)",
          background: "var(--background)",
          borderRadius: 4,
          overflow: "hidden",
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <motion.div
            key={slides[activeIndex].alt}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            style={{
              width: "100%",
              padding: 8,
            }}
          >
            <ImageWithFallback
              src={slides[activeIndex].src}
              alt={slides[activeIndex].alt}
              style={{
                width: "100%",
                maxHeight: 284,
                objectFit: "contain",
              }}
            />
          </motion.div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "color-mix(in srgb, var(--background) 82%, var(--secondary) 18%)",
            color: "var(--foreground)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "color-mix(in srgb, var(--background) 82%, var(--secondary) 18%)",
            color: "var(--foreground)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          →
        </button>

        <div style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 8px",
          borderRadius: 999,
          background: "color-mix(in srgb, var(--background) 82%, var(--secondary) 18%)",
          border: "1px solid var(--border)",
        }}>
          {slides.map((slide, idx) => (
            <button
              key={slide.alt}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${slide.alt}`}
              aria-current={idx === activeIndex}
              style={{
                width: idx === activeIndex ? 14 : 8,
                height: 8,
                borderRadius: 99,
                border: "none",
                background: idx === activeIndex ? "var(--accent)" : "var(--muted-foreground)",
                opacity: idx === activeIndex ? 0.92 : 0.45,
                cursor: "pointer",
                transition: "all 140ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="tt-flow-diagram" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
      {FLOW_STEPS.map((step, i) => (
        <div key={step.n} className="tt-flow-segment" style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 0 }}>
          <div style={{
            flex: 1, padding: "20px 16px", border: "1px solid var(--border)",
            borderRight: i < FLOW_STEPS.length - 1 ? "none" : "1px solid var(--border)",
            background: i === 0 ? "var(--secondary)" : "var(--card)",
          }}>
            <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.12em", marginBottom: 8 }}>{step.n}</p>
            <p style={{ fontSize: 13, fontWeight: 600, ...SANS, marginBottom: 6 }}>{step.label}</p>
            <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS, lineHeight: 1.5 }}>{step.desc}</p>
          </div>
          {i < FLOW_STEPS.length - 1 && (
            <div className="tt-flow-arrow-wrap" style={{ display: "flex", alignItems: "center", padding: "0 4px", background: "var(--border)", opacity: 0.5 }}>
              <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CLASSIC VIEW (13-section editorial layout)
// ══════════════════════════════════════════════════════════════════════════

function ClassicView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS, display: "flex", flexDirection: "column" }}>
      <SiteNav variant="casestudy" title="Time Tracking Agent" />

      {/* 1. HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto px-8" style={{ maxWidth: MAX }}>
          <div className="tt-hero-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div className="tt-hero-copy">
              <p className="tt-section-eyebrow" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted-foreground)", ...MONO, marginBottom: 16 }}>
                  03 - CASE STUDY
              </p>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, ...SANS, marginBottom: 20 }}>
                Time Tracking Agent
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--muted-foreground)", ...SANS, marginBottom: 28 }}>
                Transforming time tracking into an AI-assisted daily workflow — reducing cognitive load and improving accuracy through agentic design.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Agentic AI UX", "Microsoft Teams", "Adaptive Cards", "Behavior Design"].map(t => (
                  <span key={t} style={{ fontSize: 9, padding: "4px 10px", border: "1px solid var(--border)", color: "var(--muted-foreground)", ...MONO, letterSpacing: "0.06em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="tt-hero-visual" style={{ display: "flex", justifyContent: "center" }}>
              <TeamsAgentMock />
            </div>
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <section style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
        <div className="mx-auto px-8" style={{ maxWidth: MAX }}>
          <div className="tt-impact-grid">
            {IMPACT.map((m, i) => (
              <div key={m.label} className="tt-impact-cell" style={{
                padding: "28px 24px",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              }}>
                <p className="tt-impact-stat" style={{ fontWeight: 700, letterSpacing: "-0.04em", ...SANS, marginBottom: 4 }}>{m.stat}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto px-8 tt-contained-sections" style={{ maxWidth: MAX }}>

        {/* 2. CONTEXT */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="02" text="CONTEXT" />
          <div className="tt-context-layout" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40 }}>
            <div className="tt-context-copy">
              <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 20 }}>What, who & why</h2>
            </div>
            <div className="tt-context-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {[
                { label: "WHAT", text: "AI-powered time tracking assistant embedded in Microsoft Teams, delivering daily suggestions via Adaptive Cards." },
                { label: "WHO",  text: "Customer Solution Architects (CSAs) at Microsoft — a high-impact role where time accuracy directly ties to revenue recognition." },
                { label: "WHY",  text: "Time data drives revenue tracking, compliance, and resource allocation. Inaccuracy creates financial exposure at enterprise scale." },
              ].map(c => (
                <div key={c.label} style={{ padding: 20, border: "1px solid var(--border)", background: "var(--card)" }}>
                  <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 10 }}>{c.label}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", ...SANS }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. MY ROLE */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="12" text="MY ROLE" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { role: "Lead UX", desc: "End-to-end product thinking — from research framing to final interaction design and delivery." },
              { role: "Eng & DS Partnership", desc: "Collaborated with engineering on adaptive card schemas and with data science on AI confidence scoring." },
              { role: "Design System Alignment", desc: "Drove alignment with CXP design system — all components reusable across the CEAI platform." },
            ].map(r => (
              <div key={r.role} style={{ padding: 24, border: "1px solid var(--border)", background: "var(--card)" }}>
                <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 10 }}>{r.role.toUpperCase()}</p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", ...SANS }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. THE PROBLEM */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="03" text="THE PROBLEM" />
          <div className="tt-problem-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div className="tt-problem-copy">
              <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 24 }}>
                Time tracking was mandatory but broken
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {[
                  { issue: "Cognitive burden", desc: "CSAs spent 5–30 minutes every Friday reconstructing an entire week from memory." },
                  { issue: "Weekly recall failure", desc: "Short-term memory is unreliable over 5 days. Entries were guesses, not records." },
                  { issue: "Low engagement", desc: "Completion rates were under 60%. Reminders were ignored. Trust in the data was low." },
                ].map(p => (
                  <div key={p.issue} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "var(--accent)", fontSize: 12, marginTop: 2, flexShrink: 0 }}>—</span>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, ...SANS, marginBottom: 3 }}>{p.issue}</p>
                      <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65, ...SANS }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pain quotes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "\"I have no idea what I worked on Tuesday. I just put something down.\"",
                  "\"It takes me longer to fill this out than it's worth.\"",
                  "\"I don't trust the numbers once I'm done.\"",
                ].map((q, i) => (
                  <blockquote key={i} style={{
                    fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", ...SANS,
                    borderLeft: "2px solid var(--accent)", paddingLeft: 12, margin: 0, fontStyle: "italic",
                  }}>{q}</blockquote>
                ))}
              </div>
            </div>
            <div className="tt-problem-visual">
              <BeforeGrid />
            </div>
          </div>
        </section>

        {/* 4. DESIGN OPPORTUNITY */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="04" text="DESIGN OPPORTUNITY" />
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 56 }}>
            <div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, ...SANS, marginBottom: 24 }}>
                Make time tracking invisible
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted-foreground)", ...SANS }}>
                The goal was never to make the grid prettier. It was to eliminate the grid entirely — and replace it with a system that works with how people already spend their time.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { frame: "Reduce effort", desc: "From 20-minute weekly task to 2-minute daily confirmation" },
                { frame: "Increase trust",  desc: "From guessed entries to AI-generated suggestions with transparent data sources" },
                { frame: "Drive daily usage", desc: "From weekly obligation to a frictionless flow embedded in Teams" },
              ].map(f => (
                <div key={f.frame} style={{ display: "flex", gap: 20, padding: "16px 20px", border: "1px solid var(--border)", background: "var(--card)" }}>
                  <div style={{ width: 2, background: "var(--accent)", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, ...SANS, marginBottom: 4 }}>{f.frame}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.55, ...SANS }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. APPROACH */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="05" text="APPROACH" />
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 8 }}>
            Reframe as an agentic AI workflow
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted-foreground)", maxWidth: 600, marginBottom: 32, ...SANS }}>
            Instead of improving data entry, we designed an agent that observes context — calendar, meeting patterns, project signals — and does the entry for you. The user's job shifts from reconstruction to review.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { concept: "Daily nudges", desc: "A Teams notification at end of day — not a weekly deadline." },
              { concept: "Contextual suggestions", desc: "AI pre-fills entries from calendar, meetings, and project signals." },
              { concept: "Embedded in Teams", desc: "No context-switch. Time entry happens where work already happens." },
            ].map(c => (
              <div key={c.concept} style={{ padding: 24, border: "1px solid var(--border)", background: "var(--card)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, ...SANS, marginBottom: 8 }}>{c.concept}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, ...SANS }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CORE EXPERIENCE */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="06" text="CORE EXPERIENCE" />
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 8 }}>
            Notification → Suggestion → Edit → Submit
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 32, ...SANS }}>
            A 4-step daily flow designed for {"<"} 2 minutes of active engagement.
          </p>
          <FlowDiagram />
        </section>

        {/* 7. KEY DESIGN DECISIONS */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="07" text="KEY DESIGN DECISIONS" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {KEY_DECISIONS.map(d => (
              <div key={d.label} style={{ padding: "24px 28px", border: "1px solid var(--border)", background: "var(--card)" }}>
                <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", ...SANS, marginBottom: 8 }}>{d.label}</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65, ...SANS }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. DESIGNING TRUST */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="08" text="DESIGNING TRUST" />
          <div className="tt-trust-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
            <div className="tt-trust-copy">
              <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 20 }}>
                Skepticism is the first design problem
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--muted-foreground)", marginBottom: 24, ...SANS }}>
                CSAs were initially resistant. "What data is it using?" was the first question. Designing for trust meant answering that question before it was asked.
              </p>
              {[
                "Transparency of data — always show what sources the AI used",
                "Editable by default — every suggestion is a starting point, never final",
                "No auto-automation — requires an explicit submit action, always",
                "Confidence indicators — surface the AI's certainty per entry",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>✓</span>
                  <p style={{ fontSize: 13, ...SANS, color: "var(--foreground)" }}>{t}</p>
                </div>
              ))}
            </div>
            {/* Trust model visual */}
            <div className="tt-trust-visual" style={{ border: "1px solid var(--border)", padding: 28, background: "var(--card)" }}>
              <p style={{ fontSize: 10, ...MONO, color: "var(--muted-foreground)", letterSpacing: "0.12em", marginBottom: 20 }}>TRUST MODEL</p>
              {[
                { stage: "Week 1", desc: "Skeptical — edits every suggestion", bar: 20 },
                { stage: "Week 2", desc: "Curious — checking accuracy", bar: 45 },
                { stage: "Week 4", desc: "Trusting — minor corrections", bar: 72 },
                { stage: "Week 8", desc: "Habitual — under 30s daily", bar: 94 },
              ].map(s => (
                <div key={s.stage} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, ...SANS }}>{s.stage}</span>
                    <span style={{ fontSize: 10, color: "var(--muted-foreground)", ...SANS }}>{s.desc}</span>
                  </div>
                  <div style={{ height: 4, background: "var(--border)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${s.bar}%`, background: "var(--accent)", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. SYSTEM & SCALE */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="09" text="SYSTEM & SCALE" />
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 24 }}>
            Beyond feature — platform capability
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { title: "Adaptive Card System", desc: "Defined card schemas reusable across CEAI platform — entry cards, summary views, edit states." },
              { title: "Notifications Framework", desc: "Consistent Teams notification patterns with escalation, cadence, and snooze logic." },
              { title: "ESXP Integration", desc: "Seamless sync to backend time system with conflict detection and reconciliation UI." },
            ].map(s => (
              <div key={s.title} style={{ padding: 24, border: "1px solid var(--border)", background: "var(--card)" }}>
                <p style={{ fontSize: 14, fontWeight: 600, ...SANS, marginBottom: 8 }}>{s.title}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, ...SANS }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FINAL SOLUTION */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="10" text="FINAL SOLUTION" />
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", ...SANS, marginBottom: 32 }}>
            AI-assisted time entry in the flow of work
          </h2>
          <div style={{ display: "flex", justifyContent: "center", background: "#0e0e1a", borderRadius: 8, overflow: "hidden" }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster={dailyEntryPoster}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 640,
                borderRadius: 0,
                border: "none",
                boxShadow: "none",
                background: "transparent",
                objectFit: "cover",
              }}
            >
              <source src={dailyEntryVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p style={{ fontSize: 12, textAlign: "center", color: "var(--muted-foreground)", marginTop: 12, ...MONO, letterSpacing: "0.06em" }}>
            DAILY ADAPTIVE CARD IN MICROSOFT TEAMS — TIME TRACKING AGENT
          </p>
        </section>

        {/* 11. IMPACT */}
        <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border)" }}>
          <SectionLabel index="11" text="IMPACT" />
          <div className="tt-impact-grid">
            {IMPACT.map((m, i) => (
              <div key={m.label} className="tt-impact-cell" style={{
                padding: "32px 24px",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              }}>
                <p className="tt-impact-stat" style={{ fontWeight: 700, letterSpacing: "-0.04em", ...SANS, marginBottom: 8 }}>{m.stat}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", ...SANS }}>{m.label}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, padding: 28, border: "1px solid var(--border)", background: "var(--secondary)" }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, ...SANS, fontStyle: "italic", color: "var(--muted-foreground)" }}>
              "Helped shift CSAs from dreading Friday entry to a lightweight daily habit — with measurably higher data quality."
            </p>
          </div>
        </section>

        {/* 13. REFLECTION */}
        <section style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div style={{ maxWidth: 680 }}>
            <SectionLabel index="13" text="REFLECTION" />
            <div style={{ width: 40, height: 2, background: "var(--accent)", opacity: 0.5, marginBottom: 28 }} />
            <p style={{ fontSize: 17, lineHeight: 1.85, ...SANS, marginBottom: 20 }}>
              This project reinforced that the hardest design challenge is behavior change — not interface optimization. The product isn't the card, the notification, or even the AI. It's the new daily habit.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted-foreground)", ...SANS, marginBottom: 16 }}>
              AI needs to earn trust before it can drive adoption. Designing for skepticism first — through transparency, editability, and visible data sources — was the unlock.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted-foreground)", ...SANS }}>
              Systems over screens. The lasting contribution wasn't the UI — it was the adaptive card schema, the notification framework, and the interaction model that teams across CEAI could extend.
            </p>
          </div>
        </section>

      </div>

      <nav aria-label="Project pagination">
        <ProjectPagination projectSlug={SLUG} />
      </nav>
      <SiteFooter />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// BENTO VIEW
// ══════════════════════════════════════════════════════════════════════════

function BentoView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS }}>
      <SiteNav variant="casestudy" title="Time Tracking Agent" />

      <main style={{ width: "100%", padding: "12px 10px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8 }}>

          {/* 1. HERO — 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ gridColumn: "1 / 9", gridRow: "1", border: "1px solid var(--border)", background: TIME_TRACKING_HERO_SURFACE, padding: 36, minHeight: 300, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(240,236,230,0.35)", ...MONO, marginBottom: 12 }}>03 — TIME TRACKING AGENT</p>
              <h1 style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: "rgba(240,236,230,0.92)", ...SANS, maxWidth: 520, marginBottom: 14 }}>
                From manual logging → AI-powered daily workflows
              </h1>
              <p style={{ fontSize: 13, color: "rgba(240,236,230,0.5)", lineHeight: 1.6, ...SANS, maxWidth: 400 }}>
                Reducing cognitive load & improving accuracy through agentic design embedded in Microsoft Teams
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Agentic AI UX", "Teams", "Adaptive Cards", "Behavior Design"].map(t => (
                <span key={t} style={{ fontSize: 8, padding: "3px 9px", border: "1px solid rgba(240,236,230,0.2)", color: "rgba(240,236,230,0.5)", ...MONO, letterSpacing: "0.06em" }}>{t}</span>
              ))}
            </div>
            {/* Abstract visual */}
            <div aria-hidden style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{ width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(240,236,230,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(240,236,230,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(98,100,167,0.6)" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. IMPACT METRICS — 4 cols */}
          <div style={{ gridColumn: "9 / 13", gridRow: "1", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 }}>
            {IMPACT.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 + i * 0.06 }}
                style={{ border: "1px solid var(--border)", background: i % 2 === 0 ? "var(--secondary)" : "var(--card)", padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 700, letterSpacing: "-0.04em", ...SANS, color: "var(--foreground)" }}>{m.stat}</p>
                <p style={{ fontSize: 9, color: "var(--muted-foreground)", ...SANS, lineHeight: 1.4 }}>{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* 3. THE PROBLEM — 4 cols */}
          <div style={{ gridColumn: "1 / 5", gridRow: "2", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 12 }}>THE PROBLEM</p>
              <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, ...SANS, marginBottom: 14 }}>
                Time tracking was mandatory but broken
              </p>
              {["Weekly recall dependency", "High cognitive load (5–30 mins)", "Manual entry, low trust in data"].map(b => (
                <div key={b} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "var(--accent)", fontSize: 10, flexShrink: 0 }}>—</span>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{b}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--muted-foreground)", fontStyle: "italic", ...SANS, lineHeight: 1.5, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              "I have no idea what I worked on Tuesday. I just put something down."
            </p>
          </div>

          {/* 4. BREAKTHROUGH IDEA — 4 cols */}
          <div style={{ gridColumn: "5 / 9", gridRow: "2", border: "1px solid var(--border)", background: "var(--secondary)", padding: 28, minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 12 }}>BREAKTHROUGH</p>
              <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, ...SANS, marginBottom: 14 }}>
                Shift from recall → recommendation
              </p>
              {["Daily nudges at end of work", "AI-generated from calendar signals", "Review instead of reconstruct"].map(b => (
                <div key={b} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "var(--accent)", fontSize: 10, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{b}</p>
                </div>
              ))}
            </div>
            {/* Simple arrow diagram */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              {["INPUT", "AI", "SUGGESTIONS", "CONFIRM"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 8, ...MONO, letterSpacing: "0.06em", color: "var(--muted-foreground)" }}>{s}</span>
                  {i < 3 && <span style={{ fontSize: 10, color: "var(--border)", margin: "0 6px" }}>→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 5. DESIGN PRINCIPLES — 4 cols (2×2) */}
          <div style={{ gridColumn: "9 / 13", gridRow: "2", border: "1px solid var(--border)", background: "var(--card)", minHeight: 240, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", height: "100%" }}>
              {PRINCIPLES.map((p, i) => (
                <div key={p} style={{
                  padding: "16px 18px",
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 8, ...MONO, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>0{i+1}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.3, ...SANS }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. CORE EXPERIENCE — 8 cols */}
          <div style={{ gridColumn: "1 / 9", gridRow: "3", border: "1px solid var(--border)", background: "var(--card)", padding: 28, minHeight: 180 }}>
            <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 16 }}>CORE EXPERIENCE</p>
            <FlowDiagram />
          </div>

          {/* 7. TRUST IN AI — 4 cols */}
          <div style={{ gridColumn: "9 / 13", gridRow: "3", border: "1px solid var(--border)", background: "var(--secondary)", padding: 24, minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: 8 }}>TRUST IN AI</p>
            <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, ...SANS, marginBottom: 12 }}>
              AI suggests. User decides.
            </p>
            {["Editable by default", "No auto-submit, ever", "Visible data sources", "Confidence indicators"].map(t => (
              <div key={t} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: "var(--accent)", fontSize: 9, flexShrink: 0 }}>✓</span>
                <p style={{ fontSize: 10, ...SANS, color: "var(--foreground)" }}>{t}</p>
              </div>
            ))}
          </div>

          {/* 8. KEY DECISIONS — 4×2 split */}
          {KEY_DECISIONS.map((d, i) => (
            <div key={d.label} style={{ gridColumn: `${1 + i * 3} / ${4 + i * 3}`, gridRow: "4", border: "1px solid var(--border)", background: "var(--card)", padding: "20px 22px", minHeight: 140 }}>
              <p style={{ fontSize: 8, ...MONO, color: "var(--muted-foreground)", letterSpacing: "0.1em", marginBottom: 10 }}>0{i+1}</p>
              <p style={{ fontSize: 12, fontWeight: 600, ...SANS, marginBottom: 6 }}>{d.label}</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.55, ...SANS }}>{d.desc}</p>
            </div>
          ))}

          {/* 10. FINAL — 8 cols */}
          <div style={{ gridColumn: "1 / 9", gridRow: "5", border: "1px solid var(--border)", background: TIME_TRACKING_HERO_SURFACE, padding: "40px 36px", minHeight: 260, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO, letterSpacing: "0.14em", color: "rgba(240,236,230,0.76)", marginBottom: 24 }}>FINAL EXPERIENCE</p>
            <TeamsAgentMock />
            <p style={{ fontSize: 9, ...MONO, color: "rgba(240,236,230,0.72)", marginTop: 12, letterSpacing: "0.08em" }}>
              AI-ASSISTED TIME ENTRY IN THE FLOW OF WORK · MICROSOFT TEAMS
            </p>
          </div>

          {/* 11. IMPACT LEARNING — 4 cols */}
          <div style={{ gridColumn: "9 / 13", gridRow: "5", border: "1px solid var(--border)", background: "var(--secondary)", padding: 24, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.14em" }}>IMPACT & LEARNING</p>
            <div>
              {IMPACT.slice(0, 3).map(m => (
                <div key={m.label} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em", ...SANS }}>{m.stat}</p>
                  <p style={{ fontSize: 10, color: "var(--muted-foreground)", ...SANS }}>{m.label}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 10, color: "var(--muted-foreground)", fontStyle: "italic", lineHeight: 1.55, ...SANS, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              {"Designing behavior change > interface optimization"}
            </p>
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
// FOCUS VIEW (Executive summary — minimal)
// ══════════════════════════════════════════════════════════════════════════

function FocusView() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS }}>
      <SiteNav variant="casestudy" title="Time Tracking Agent" />

      <main style={{ maxWidth: 560, margin: "0 auto", padding: "72px 24px 160px" }}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--muted-foreground)", ...MONO, marginBottom: 16 }}>TIME TRACKING AGENT</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, ...SANS, marginBottom: 12 }}>
            From manual logging → AI-assisted workflows
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", ...SANS }}>Microsoft Teams · Adaptive Cards · {PROJECT.period}</p>
        </motion.div>

        {/* The Shift */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 16 }}>THE SHIFT</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", gap: 0, alignItems: "center" }}>
            <div style={{ padding: "14px 16px", background: "var(--muted)", borderRadius: 2 }}>
              <p style={{ fontSize: 10, ...MONO, color: "var(--muted-foreground)", marginBottom: 4 }}>BEFORE</p>
              <p style={{ fontSize: 13, fontWeight: 500, ...SANS }}>Weekly recall</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>5–30 min / week</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 14, color: "var(--accent)" }}>→</span>
            </div>
            <div style={{ padding: "14px 16px", background: "var(--secondary)", borderRadius: 2, border: "1px solid var(--accent)", borderColor: "var(--accent)" }}>
              <p style={{ fontSize: 10, ...MONO, color: "var(--accent)", marginBottom: 4 }}>AFTER</p>
              <p style={{ fontSize: 13, fontWeight: 500, ...SANS }}>Daily AI recommendations</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{"< 2 min / day"}</p>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 20 }}>HOW IT WORKS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FLOW_STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < FLOW_STEPS.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 8, ...MONO, color: "var(--accent)", letterSpacing: "0.1em", width: 24, flexShrink: 0 }}>{s.n}</span>
                <p style={{ fontSize: 14, fontWeight: 500, ...SANS, flex: 1 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why it works */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 20 }}>WHY IT WORKS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Low cognitive load — no reconstruction, just review", "In-flow of work — embedded in Teams", "User always controls the AI — no auto-submit", "Progressive disclosure — simple first, detail on demand"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--accent)", fontSize: 10, flexShrink: 0, marginTop: 1 }}>—</span>
                <p style={{ fontSize: 13, ...SANS, color: "var(--foreground)" }}>{p}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 20 }}>IMPACT</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {IMPACT.map(m => (
              <div key={m.label}>
                <p style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.04em", ...SANS, marginBottom: 2 }}>{m.stat}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...SANS }}>{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Signature moment */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }} style={{ marginBottom: 56, borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 12 }}>SIGNATURE MOMENT</p>
          <p style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", ...SANS, marginBottom: 8 }}>
            We removed the weekly grid.
          </p>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", ...SANS }}>
            Challenging the familiar unlocked adoption.
          </p>
        </motion.div>

        {/* Closing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <p style={{ fontSize: "clamp(14px, 2.5vw, 18px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.5, ...SANS }}>
            Designing systems that change behavior,<br />not just interfaces.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE — switches on layout mode
// ══════════════════════════════════════════════════════════════════════════

export function TimeTrackingPage() {
  return <div className="tt-page"><ClassicView /></div>;
}
