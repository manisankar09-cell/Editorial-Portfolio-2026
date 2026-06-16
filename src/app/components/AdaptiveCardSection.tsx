const sidebarItems = [
  {
    label: "Challenge",
    body: "Adaptive cards were inconsistent across scenarios and lacked reusable structure, leading to fragmented user experiences across enterprise surfaces.",
  },
  {
    label: "Approach",
    body: "Audited existing implementations across five product areas and defined reusable patterns for consistency and scalability.",
  },
  {
    label: "Outcome",
    body: "Created a standardized, reusable card system that supports dynamic AI-driven workflows and reduced design variance by 70%.",
  },
];

const cardExamples = [
  {
    tag: "TASK UPDATE",
    title: "Sprint Review — Q3 Roadmap",
    body: "3 items require your attention before the design review on Friday.",
    actions: ["Review Items", "Snooze"],
    dark: false,
  },
  {
    tag: "AI SUGGESTION",
    title: "Copilot detected a conflict",
    body: "Two overlapping deadlines found in Project Atlas. Suggested resolution available.",
    actions: ["Resolve", "Dismiss"],
    dark: true,
  },
  {
    tag: "APPROVAL REQUEST",
    title: "Design token update ready",
    body: "CXP v2.4 token changes are staged and awaiting sign-off from the platform team.",
    actions: ["Approve", "Request Changes"],
    dark: false,
  },
];

export function AdaptiveCardSection() {
  return (
    <section id="adaptive-cards" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "0 32px" }}
        >
          {/* LEFT — text */}
          <div style={{ gridColumn: "1 / 6" }}>
            <p
              className="text-muted-foreground mb-4"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              05 — DEEP DIVE
            </p>
            <h2
              className="text-foreground mb-12"
              style={{
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Adaptive Cards System
            </h2>

            <div className="flex flex-col gap-8">
              {sidebarItems.map((item, i) => (
                <div key={item.label} className="flex gap-6">
                  {/* Index line */}
                  <div className="flex flex-col items-center gap-1 pt-0.5" style={{ flexShrink: 0 }}>
                    <span
                      className="text-muted-foreground"
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < sidebarItems.length - 1 && (
                      <div
                        className="bg-border"
                        style={{ width: 1, height: 48, marginTop: 6 }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className="text-foreground mb-2"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {item.label.toUpperCase()}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — cards */}
          <div
            style={{ gridColumn: "7 / 13" }}
            className="flex flex-col gap-4 pt-16"
          >
            {cardExamples.map((card) => (
              <div
                key={card.title}
                className="border border-border p-5 flex flex-col gap-3"
                style={{
                  background: card.dark ? "var(--foreground)" : "var(--card)",
                  color: card.dark ? "var(--primary-foreground)" : "var(--foreground)",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    fontFamily: "'DM Mono', monospace",
                    color: card.dark ? "rgba(245,244,240,0.45)" : "var(--muted-foreground)",
                  }}
                >
                  {card.tag}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    fontFamily: "'Inter', sans-serif",
                    color: card.dark ? "rgba(245,244,240,0.6)" : "var(--muted-foreground)",
                  }}
                >
                  {card.body}
                </p>
                <div className="flex gap-2 pt-1">
                  {card.actions.map((action, ai) => (
                    <button
                      key={action}
                      className="border"
                      style={{
                        fontSize: 11,
                        padding: "4px 12px",
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        background: "transparent",
                        borderColor: card.dark
                          ? ai === 0
                            ? "rgba(245,244,240,0.5)"
                            : "rgba(245,244,240,0.15)"
                          : ai === 0
                          ? "var(--foreground)"
                          : "var(--border)",
                        color: card.dark
                          ? ai === 0
                            ? "rgba(245,244,240,0.9)"
                            : "rgba(245,244,240,0.4)"
                          : ai === 0
                          ? "var(--foreground)"
                          : "var(--muted-foreground)",
                      }}
                    >
                      {action}
                    </button>
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
