import { motion } from "motion/react";

const beforeItems = [
  "Scattered toolkits",
  "Inconsistent patterns",
  "Duplicate design work",
  "No AI-ready UI models",
];

const afterItems = [
  "One UX standard",
  "Fluent-aligned components",
  "Reusable patterns",
  "Adaptive AI-ready cards",
  "Structured design-to-dev workflow",
];

const scatteredCards = ["Forms", "Cards", "Grid", "Panel", "Kit A", "Kit B", "AI?"];

const offsets: [number, number, number][] = [
  [0, 0, -6],
  [55, 20, 4],
  [20, 55, -3],
  [75, 50, 7],
  [10, 90, -5],
  [55, 80, 3],
  [85, 10, -8],
];

const layers = [
  { label: "Foundations", sub: "Grid · Spacing · Color · Type" },
  { label: "Components", sub: "Buttons · Inputs · Cards · Nav" },
  { label: "Patterns", sub: "Forms · Tables · Panels · AI Cards" },
  { label: "Templates", sub: "Dashboards · Workflows · Reports" },
];

export function TransformationSection() {
  return (
    <section id="problem" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        {/* Section label */}
        <p
          className="text-muted-foreground mb-16"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          02 — PROBLEM TO TRANSFORMATION
        </p>

        {/* 12-col grid: 5 + 2 + 5 */}
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "0 32px" }}
        >
          {/* LEFT — Before */}
          <div style={{ gridColumn: "1 / 6" }}>
            <div className="border border-border p-8">
              <p
                className="text-muted-foreground mb-1"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                BEFORE
              </p>
              <h2
                className="text-foreground mb-3"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Fragmented ecosystem
              </h2>
              <p
                className="text-muted-foreground mb-6"
                style={{ fontSize: 14, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}
              >
                Multiple teams working independently, resulting in inconsistent
                UI and duplicated effort.
              </p>
              <ul className="mb-8 flex flex-col gap-2">
                {beforeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-foreground/70"
                    style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}
                  >
                    <span
                      className="border border-foreground/20"
                      style={{ width: 6, height: 6, display: "inline-block", flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Scattered cards visual */}
              <div
                className="border border-border bg-secondary/30 relative overflow-hidden"
                style={{ height: 160 }}
              >
                {scatteredCards.map((label, i) => {
                  const [left, top, rotate] = offsets[i];
                  return (
                    <div
                      key={label}
                      className="absolute border border-border bg-card text-foreground/60"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        transform: `rotate(${rotate}deg)`,
                        padding: "3px 8px",
                        fontSize: 10,
                        fontFamily: "'DM Mono', monospace",
                        whiteSpace: "nowrap",
                        ...(label === "AI?" && { borderColor: "var(--accent)", color: "var(--accent)", opacity: 0.7 }),
                      }}
                    >
                      {label}
                    </div>
                  );
                })}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(17,17,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.04) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* CENTER — Arrow */}
          <div
            style={{ gridColumn: "6 / 8" }}
            className="flex flex-col items-center justify-center pt-24 gap-3"
          >
            {["Fragmentation", "Standardization", "Scale"].map((step, i, arr) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <p
                  className="text-accent"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    fontFamily: "'DM Mono', monospace",
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                    opacity: 1 - i * 0.15,
                  }}
                >
                  {step}
                </p>
                {i < arr.length - 1 && (
                  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path d="M5 0v10M1 7l4 5 4-5" stroke="var(--accent)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — After */}
          <div style={{ gridColumn: "8 / 13" }}>
            <div className="border border-border p-8" style={{ borderColor: "var(--accent)", borderOpacity: 0.4 }}>
              <p
                className="mb-1"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  fontFamily: "'DM Mono', monospace",
                  color: "var(--accent)",
                  opacity: 0.8,
                }}
              >
                AFTER
              </p>
              <h2
                className="text-foreground mb-3"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Unified system foundation
              </h2>
              <p
                className="text-muted-foreground mb-6"
                style={{ fontSize: 14, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}
              >
                A shared design system enabling scalable, consistent and
                AI-ready product experiences.
              </p>
              <ul className="mb-8 flex flex-col gap-2">
                {afterItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-foreground/80"
                    style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}
                  >
                    <span
                      className="bg-accent"
                      style={{ width: 6, height: 6, display: "inline-block", flexShrink: 0, opacity: 0.7 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Layer stack visual */}
              <div className="flex flex-col gap-1.5">
                {layers.map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-border bg-card flex items-center justify-between px-3 py-2"
                    style={{
                      ...(i === 0 && { borderColor: "rgba(45,43,94,0.3)", background: "rgba(45,43,94,0.04)" }),
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {layer.label}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: 10, fontFamily: "'DM Mono', monospace" }}
                    >
                      {layer.sub}
                    </span>
                  </motion.div>
                ))}
                <div
                  className="flex items-center justify-center py-1"
                  style={{ fontSize: 10, color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}
                >
                  Foundations → Components → Patterns → Templates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
