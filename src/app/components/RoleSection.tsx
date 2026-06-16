const cards = [
  {
    index: "01",
    title: "System Architecture",
    description:
      "Defined the structure of the design system including foundations, components, patterns, and templates.",
  },
  {
    index: "02",
    title: "AI Experience Design",
    description:
      "Designed AI-first interfaces including Adaptive Cards and Copilot interaction surfaces for enterprise workflows.",
  },
  {
    index: "03",
    title: "Cross-functional Collaboration",
    description:
      "Worked closely with product managers, engineers, and researchers to align design decisions and drive adoption.",
  },
];

export function RoleSection() {
  return (
    <section id="role" className="border-b border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-muted-foreground mb-4"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            03 — ROLE &amp; CONTRIBUTION
          </p>
          <h2
            className="text-foreground"
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            My Role &amp; Contribution
          </h2>
        </div>

        {/* 3-col cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.index}
              className="border border-border p-8 flex flex-col gap-4"
            >
              <span
                className="text-muted-foreground"
                style={{
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.12em",
                }}
              >
                {card.index}
              </span>
              <h3
                className="text-foreground"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
