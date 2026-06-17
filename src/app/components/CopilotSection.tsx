const suggestions = [
  "Summarize open tasks from last sprint",
  "Identify blockers in the current workflow",
  "Generate a design review checklist",
];

export function CopilotSection() {
  return (
    <section id="copilot" className="border-b border-border" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        {/* Centered header */}
        <div className="mx-auto mb-16" style={{ maxWidth: 680 }}>
          <p
            className="text-muted-foreground mb-4"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            06 — DEEP DIVE
          </p>
          <h2
            className="text-foreground mb-5"
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Designing for AI: Copilot Integration
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Traditional UI patterns did not support AI-driven workflows. A new
            surface was designed to integrate AI insights contextually within
            user workflows.
          </p>
        </div>

        {/* Copilot panel visual — centered, prominent */}
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <div
            className="border border-border"
            style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
          >
            {/* Panel header */}
            <div
              className="border-b flex items-center justify-between px-6 py-4"
              style={{ borderColor: "color-mix(in srgb, var(--primary-foreground) 10%, transparent)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 18,
                    background: "var(--accent)",
                    fontSize: 10,
                    color: "var(--accent-foreground)",
                  }}
                >
                  ✦
                </div>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    fontFamily: "'DM Mono', monospace",
                    color: "color-mix(in srgb, var(--primary-foreground) 62%, transparent)",
                  }}
                >
                  COPILOT
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "'DM Mono', monospace",
                  color: "color-mix(in srgb, var(--primary-foreground) 36%, transparent)",
                  letterSpacing: "0.1em",
                }}
              >
                ENTERPRISE SURFACE
              </span>
            </div>

            {/* Panel body */}
            <div className="px-8 py-8 flex flex-col gap-6">
              {/* AI response block */}
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    fontFamily: "'DM Mono', monospace",
                    color: "color-mix(in srgb, var(--primary-foreground) 38%, transparent)",
                    marginBottom: 12,
                  }}
                >
                  ANALYSIS
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { w: "100%", opacity: 0.55 },
                    { w: "88%", opacity: 0.45 },
                    { w: "72%", opacity: 0.35 },
                  ].map((line, i) => (
                    <div
                      key={i}
                      style={{
                        width: line.w,
                        height: 10,
                        background: `color-mix(in srgb, var(--primary-foreground) ${Math.round(line.opacity * 100)}%, transparent)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "color-mix(in srgb, var(--primary-foreground) 8%, transparent)" }} />

              {/* Suggestions */}
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    fontFamily: "'DM Mono', monospace",
                    color: "color-mix(in srgb, var(--primary-foreground) 38%, transparent)",
                    marginBottom: 10,
                  }}
                >
                  SUGGESTED ACTIONS
                </p>
                <div className="flex flex-col gap-2">
                  {suggestions.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-3"
                      style={{
                        border: "1px solid color-mix(in srgb, var(--primary-foreground) 10%, transparent)",
                        padding: "8px 14px",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: "var(--accent)",
                          display: "inline-block",
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "'Inter', sans-serif",
                          color: "color-mix(in srgb, var(--primary-foreground) 66%, transparent)",
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "color-mix(in srgb, var(--primary-foreground) 8%, transparent)" }} />

              {/* Input row */}
              <div
                className="flex items-center gap-3"
                style={{ border: "1px solid color-mix(in srgb, var(--primary-foreground) 15%, transparent)", padding: "10px 14px" }}
              >
                <span
                  style={{
                    flex: 1,
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    color: "color-mix(in srgb, var(--primary-foreground) 34%, transparent)",
                  }}
                >
                  Ask Copilot something…
                </span>
                <button
                  style={{
                    fontSize: 11,
                    fontFamily: "'DM Mono', monospace",
                    color: "color-mix(in srgb, var(--primary-foreground) 54%, transparent)",
                    background: "transparent",
                    border: "1px solid color-mix(in srgb, var(--primary-foreground) 20%, transparent)",
                    padding: "4px 12px",
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                  }}
                >
                  SEND →
                </button>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p
            className="text-center mt-8 text-muted-foreground"
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
            }}
          >
            "A reusable pattern enabling scalable AI experiences across enterprise applications."
          </p>
        </div>
      </div>
    </section>
  );
}
