const layers = [
  {
    label: "FOUNDATIONS",
    desc: "Grid, spacing, typography, accessibility",
    shade: "rgba(17,17,16,0.03)",
  },
  {
    label: "COMPONENTS",
    desc: "Reusable Fluent-based UI elements",
    shade: "rgba(17,17,16,0.06)",
  },
  {
    label: "PATTERNS",
    desc: "Reusable interaction and workflow solutions",
    shade: "rgba(17,17,16,0.09)",
  },
  {
    label: "TEMPLATES",
    desc: "Pre-built screens for common use cases",
    shade: "rgba(17,17,16,0.12)",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        {/* Section label */}
        <p
          className="text-muted-foreground mb-4"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          04 — SYSTEM ARCHITECTURE
        </p>

        {/* Centered content */}
        <div
          className="mx-auto"
          style={{ maxWidth: 680 }}
        >
          <h2
            className="text-foreground mb-16"
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Designing a Scalable System Architecture
          </h2>

          {/* Layer diagram */}
          <div className="flex flex-col gap-0">
            {layers.map((layer, i) => (
              <div key={layer.label}>
                <div
                  className="border border-border flex items-center justify-between px-8 py-6"
                  style={{ background: layer.shade }}
                >
                  <span
                    className="text-foreground"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {layer.label}
                  </span>
                  <span
                    className="text-muted-foreground"
                    style={{
                      fontSize: 13,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {layer.desc}
                  </span>
                </div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-3">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <path
                        d="M7 0v14M1 9l6 7 6-7"
                        stroke="var(--foreground)"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.2}
                      />
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
