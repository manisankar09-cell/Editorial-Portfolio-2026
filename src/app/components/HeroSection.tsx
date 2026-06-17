import { motion } from "motion/react";

const tags = [
  "Product Design",
  "Design Systems",
  "AI UX",
  "Enterprise Platform",
  "Fluent-aligned",
];

function SystemComposition() {
  return (
    <div className="relative w-full h-full min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Bauhaus circle — large, bottom-right */}
      <div
        className="absolute bottom-8 right-8 rounded-full border border-foreground/10"
        style={{ width: 160, height: 160 }}
      />
      <div
        className="absolute bottom-16 right-16 rounded-full border border-foreground/8"
        style={{ width: 96, height: 96 }}
      />

      {/* Vertical bar accent */}
      <div
        className="absolute left-8 top-1/4 bg-accent"
        style={{ width: 3, height: 80, opacity: 0.7 }}
      />

      {/* Floating cards */}
      <div className="relative z-10 flex flex-col gap-3 w-full max-w-xs">
        {/* Foundations card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border p-4"
        >
          <p
            className="text-muted-foreground mb-2"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace" }}
          >
            FOUNDATIONS
          </p>
          <div className="flex gap-2 items-center flex-wrap">
            <div
              className="border border-border"
              style={{
                width: 24,
                height: 24,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                padding: 2,
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="bg-foreground/15" />
              ))}
            </div>
            <div className="flex gap-1">
              {[16, 24, 32, 40].map((s, i) => (
                <div
                  key={i}
                  className="bg-foreground/20"
                  style={{ width: s / 4, height: 16 }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "'DM Mono', monospace",
                color: "var(--muted-foreground)",
              }}
            >
              Grid · Spacing · Type
            </span>
          </div>
        </motion.div>

        {/* Components card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border p-4"
        >
          <p
            className="text-muted-foreground mb-2"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace" }}
          >
            COMPONENTS
          </p>
          <div className="flex gap-2 items-center flex-wrap">
            <div
              className="border border-foreground/30 px-2 py-1"
              style={{ fontSize: 11 }}
            >
              Button
            </div>
            <div
              className="border border-border bg-secondary px-2 py-1"
              style={{ fontSize: 11 }}
            >
              Input ___
            </div>
            <div
              className="bg-foreground/10 px-2 py-1"
              style={{ fontSize: 11 }}
            >
              Badge
            </div>
          </div>
        </motion.div>

        {/* Adaptive Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border p-4"
        >
          <p
            className="text-muted-foreground mb-2"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace" }}
          >
            ADAPTIVE CARD
          </p>
          <div
            className="border border-border p-2"
            style={{ fontSize: 11 }}
          >
            <div className="bg-secondary/60 h-1.5 w-3/4 mb-1.5" />
            <div className="bg-secondary/40 h-1.5 w-1/2 mb-2" />
            <div className="flex gap-1">
              <div className="border border-foreground/25 px-2 py-0.5" style={{ fontSize: 10 }}>
                Action
              </div>
              <div className="border border-foreground/25 px-2 py-0.5" style={{ fontSize: 10 }}>
                Dismiss
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copilot / AI panel — dark */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-foreground p-4"
          style={{ color: "var(--primary-foreground)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="rounded-full bg-accent/80 flex items-center justify-center"
              style={{ width: 14, height: 14, fontSize: 8, color: "var(--accent-foreground)" }}
            >
              ✦
            </div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                fontFamily: "'DM Mono', monospace",
                color: "color-mix(in srgb, var(--primary-foreground) 52%, transparent)",
              }}
            >
              COPILOT PANEL
            </p>
          </div>
          <div className="bg-white/10 h-1.5 w-5/6 mb-1" />
          <div className="bg-white/8 h-1.5 w-3/4 mb-2" />
          <div
            className="border border-white/20 px-2 py-0.5 inline-block"
            style={{ fontSize: 10, color: "color-mix(in srgb, var(--primary-foreground) 72%, transparent)" }}
          >
            Generate response →
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="border-b border-border"
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div
        className="mx-auto px-8"
        style={{ maxWidth: 1280 }}
      >
        {/* 12-col grid */}
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "0 32px" }}
        >
          {/* Left — text — col 1–6 */}
          <div style={{ gridColumn: "1 / 7" }} className="flex flex-col justify-center">
            <p
              className="text-muted-foreground mb-8"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              CXP DESIGN SYSTEM
            </p>

            <h1
              className="text-foreground mb-6"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Scaling a unified UX standard for AI-powered enterprise experiences
            </h1>

            <p
              className="text-muted-foreground mb-10"
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 480,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Designing a system to unify fragmented toolkits, enable consistent
              experiences, and support AI-driven workflows across enterprise
              products.
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="ep-tag"
                  style={{ letterSpacing: "0.04em" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — visual — col 7–12 */}
          <div style={{ gridColumn: "7 / 13" }}>
            <SystemComposition />
          </div>
        </div>
      </div>
    </section>
  );
}
