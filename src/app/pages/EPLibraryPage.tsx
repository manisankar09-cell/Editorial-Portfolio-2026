import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { Button } from "../components/ui/button";
import {
  EP_LIBRARY_BUTTON_SPECS,
  EP_LIBRARY_COMPONENT_RULES,
  EP_LIBRARY_GRID_SYSTEM,
  EP_LIBRARY_LAYOUT_PATTERNS,
  EP_LIBRARY_PAGE_RULES,
  EP_LIBRARY_TAG_SPECS,
  EP_LIBRARY_THEME_TOKENS,
  EP_LIBRARY_TYPOGRAPHY,
} from "../data/epLibrary";

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const PANEL: React.CSSProperties = {
  background: "color-mix(in srgb, var(--card) 88%, white 12%)",
  border: "1px solid color-mix(in srgb, var(--border) 92%, transparent)",
  borderRadius: 8,
  backdropFilter: "blur(8px)",
};

const BUTTON_THEMES = [
  { id: "paper", label: "PAPER" },
  { id: "slate", label: "SLATE" },
  { id: "dusk", label: "DUSK" },
] as const;

function RuleList({ title, rules }: { title: string; rules: { title: string; body: string }[] }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
        {title}
      </p>
      <div style={{ ...PANEL, padding: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {rules.map((rule) => (
          <div key={rule.title} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, ...SANS }}>
              {rule.title}
            </p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", ...SANS }}>
              {rule.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PatternList() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
        LAYOUT PATTERNS
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {EP_LIBRARY_LAYOUT_PATTERNS.map((pattern) => (
          <article key={pattern.name} style={{ ...PANEL, padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted-foreground)", ...MONO }}>{pattern.name}</p>
              <p style={{ fontSize: 16, lineHeight: 1.2, letterSpacing: "-0.02em", fontWeight: 600, ...SANS }}>{pattern.intent}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted-foreground)", ...MONO }}>ANATOMY</p>
                <div style={{ ...PANEL, padding: 10, display: "grid", gap: 8 }}>
                  {pattern.structure.map((item, index) => (
                    <div key={`${pattern.name}-structure-${index}`} style={{ display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", gap: 8, alignItems: "start" }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>{String(index + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 12, lineHeight: 1.55, color: "var(--foreground)", ...SANS }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted-foreground)", ...MONO }}>RULES OF USE</p>
                <div style={{ ...PANEL, padding: 10, display: "grid", gap: 8 }}>
                  {pattern.behaviors.map((item, index) => (
                    <div key={`${pattern.name}-behavior-${index}`} style={{ display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", gap: 8, alignItems: "start" }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>{String(index + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 12, lineHeight: 1.55, color: "var(--foreground)", ...SANS }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ButtonSystemSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
        BUTTON SYSTEM
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {BUTTON_THEMES.map((theme) => (
          <article
            key={theme.id}
            data-theme={theme.id}
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted-foreground)", ...MONO }}>
              {theme.label}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <Button variant="tertiary">Tertiary action</Button>
              <Button variant="hyperlink">Hyperlink action</Button>
              <Button variant="primary" disabled>
                Disabled action
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ ...PANEL, padding: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {EP_LIBRARY_BUTTON_SPECS.map((spec) => (
          <article key={spec.name} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "grid", gap: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em", ...SANS }}>{spec.name}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", ...SANS }}>{spec.role}</p>
            <div style={{ display: "grid", gap: 6 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>DEFAULT · {spec.defaultState}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>HOVER · {spec.hoverState}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>FOCUS · {spec.focusState}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>DISABLED · {spec.disabledState}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TagSystemSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
        TAG SYSTEM
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {BUTTON_THEMES.map((theme) => (
          <article
            key={`tag-${theme.id}`}
            data-theme={theme.id}
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted-foreground)", ...MONO }}>
              {theme.label}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="ep-tag">AI UX</span>
                <span className="ep-tag">Design System</span>
                <span className="ep-tag ep-tag-subtle">+2</span>
              </div>
              <Button variant="tertiary" size="sm">View case study</Button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ ...PANEL, padding: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {EP_LIBRARY_TAG_SPECS.map((spec) => (
          <article key={spec.name} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "grid", gap: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em", ...SANS }}>{spec.name}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", ...SANS }}>{spec.role}</p>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>DEFAULT · {spec.defaultState}</p>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>DISTINCTION · {spec.distinction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EPLibraryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS, display: "flex", flexDirection: "column" }}>
      <SiteNav variant="page" />

      <main style={{ flex: 1 }}>
        <section style={{ padding: "64px 0 96px" }}>
          <div className="site-container" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO }}>
                EDITORIAL PORTFOLIO DESIGN LIBRARY
              </p>
              <h1 style={{ fontSize: "clamp(40px, 4.8vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.06em", fontWeight: 700 }}>
                EP Library
              </h1>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", maxWidth: 560 }}>
                Canonical tokens, typography, and page rules for the portfolio system. Every new page should start here and map back to these foundations before new styling is introduced.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button asChild variant="tertiary">
                  <Link to="/work">View work library</Link>
                </Button>
                <span className="ep-button ep-button-secondary ep-button-sm" style={{ cursor: "default" }}>
                  Tokens live in src/styles/theme.css
                </span>
              </div>
            </div>

            <ButtonSystemSection />

            <TagSystemSection />

            <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
                COLOR MODES
              </p>
              <div style={{ ...PANEL, padding: 12, display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "240px repeat(3, minmax(0, 1fr))", gap: 12, padding: "0 4px" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted-foreground)", ...MONO }}>TOKEN</p>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted-foreground)", ...MONO }}>PAPER</p>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted-foreground)", ...MONO }}>SLATE</p>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted-foreground)", ...MONO }}>DUSK</p>
                </div>
                {EP_LIBRARY_THEME_TOKENS.map((token) => (
                  <div key={token.name} style={{ ...PANEL, padding: 12, display: "grid", gridTemplateColumns: "240px repeat(3, minmax(0, 1fr))", gap: 12 }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>{token.name}</p>
                    {[token.paper, token.slate, token.dusk].map((value, index) => (
                      <div key={`${token.name}-${index}`} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <span style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--border)", background: value }} />
                        <span style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", wordBreak: "break-word", ...SANS }}>{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
                  TYPOGRAPHY SCALE
                </p>
                <div style={{ ...PANEL, padding: 16, display: "grid", gap: 12 }}>
                  {EP_LIBRARY_TYPOGRAPHY.map((item) => (
                    <div key={item.label} style={{ display: "grid", gridTemplateColumns: "160px minmax(0, 1fr)", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                      <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>{item.label}</p>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", ...SANS }}>{item.token}</p>
                    </div>
                  ))}
                </div>

                <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
                    GLOBAL GRID SYSTEM
                  </p>
                  <div style={{ ...PANEL, padding: 16, display: "grid", gap: 12 }}>
                    {EP_LIBRARY_GRID_SYSTEM.map((item) => (
                      <div key={item.label} style={{ display: "grid", gridTemplateColumns: "160px minmax(0, 1fr)", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--foreground)", ...MONO }}>{item.label}</p>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", ...SANS }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <RuleList title="PAGE RULES" rules={EP_LIBRARY_PAGE_RULES} />
                <RuleList title="COMPONENT RULES" rules={EP_LIBRARY_COMPONENT_RULES} />
              </div>
            </section>

            <PatternList />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}