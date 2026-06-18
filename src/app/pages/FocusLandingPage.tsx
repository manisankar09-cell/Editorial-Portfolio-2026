import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { getProjectCardRole, PROJECTS, type Project } from "../data/projects";
import resumePdf from "../../imports/Mani_Sankar_Choudhury_Product_Designer.pdf";

const MONO = { fontFamily: "'DM Mono', monospace" } as const;
const SANS = { fontFamily: "'Inter', sans-serif" } as const;
const ACCENT_META = "color-mix(in srgb, var(--accent) 72%, var(--foreground) 28%)";
const BODY_L: React.CSSProperties = { fontSize: 16, lineHeight: 1.82, color: "var(--foreground)", ...SANS };
const BODY_M: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: "var(--foreground)", ...SANS };
const BODY_S: React.CSSProperties = { fontSize: 13, lineHeight: 1.75, color: "var(--muted-foreground)", ...SANS };
const META_LABEL: React.CSSProperties = { fontSize: 10.5, letterSpacing: "0.18em", color: ACCENT_META, ...MONO };

const FOCUS_THINKING_POINTS = [
  "I work where interaction design, design systems, and emerging AI meet.",
  "I translate messy ambiguity into patterns that scale across systems and teams.",
  "I care most about the seams between people, products, and AI decisions.",
];

const FOCUS_WORK_POINTS = [
  "System-first: start with structure, tokens, and repeatable logic.",
  "Pattern-driven: design the durable shape, not just the screen.",
  "Engineering-aligned: define decisions with the teams that build them.",
];

const FOCUS_RECOGNITION = [
  "Microsoft Hackathon '20 — Winner",
  "OzChi '17 — First Place",
];

function SectionLabel({ index, text }: { index?: string; text: string }) {
  return (
    <p className="text-muted-foreground" style={{ ...META_LABEL, marginBottom: 16 }}>
      {text}
    </p>
  );
}

function SectionDivider({ marginTop = 40, marginBottom = 40 }: { marginTop?: number; marginBottom?: number }) {
  return <hr style={{ border: "none", borderTop: "1px solid color-mix(in srgb, var(--border) 88%, transparent)", margin: `${marginTop}px 0 ${marginBottom}px` }} />;
}

function AboutAccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ ...META_LABEL, color: "var(--foreground)" }}>{title}</span>
        <span style={{ fontSize: 14, color: open ? "var(--foreground)" : "var(--muted-foreground)", ...MONO }}>{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 0 18px" }}>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ProjectAccordionItem({ project, defaultOpen = false }: { project: Project; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const detailHref = project.detailHref ?? `/${project.slug}`;
  const hasDetails = Boolean(project.detailHref);
  const panelId = `${project.slug}-panel`;
  const titleId = `${project.slug}-title`;

  return (
    <div style={{ position: "relative", padding: "0 16px", marginBottom: 12 }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          width: 16,
          borderTop: "1px solid color-mix(in srgb, var(--border) 92%, transparent)",
        }}
      />
      <div style={{ border: "1px solid var(--border)", background: open ? "color-mix(in srgb, var(--card) 82%, transparent)" : "transparent", transition: "background-color 0.2s ease" }}>
        <button
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 20,
            padding: "20px 16px 18px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ ...META_LABEL }}>{project.index}</span>
              <span style={{ ...META_LABEL }}>{project.period}</span>
            </div>
            <span id={titleId} style={{ display: "block", fontSize: 18, fontWeight: 600, letterSpacing: "-0.024em", color: "var(--foreground)", ...SANS, marginBottom: 10 }}>
              {project.title}
            </span>
            <p style={{ ...BODY_S, marginBottom: 12, maxWidth: 520 }}>
              {project.tagline}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="ep-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <span style={{ fontSize: 14, color: open ? "var(--foreground)" : "var(--muted-foreground)", ...MONO }}>{open ? "−" : "+"}</span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div id={panelId} role="region" aria-labelledby={titleId} style={{ padding: "0 16px 28px" }}>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(80px, 92px) minmax(0, 1fr)", columnGap: 16, alignItems: "start" }}>
                    <span style={{ ...META_LABEL, paddingTop: 2 }}>ROLE</span>
                    <p style={{ ...BODY_M }}>{getProjectCardRole(project.role)}</p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "minmax(80px, 92px) minmax(0, 1fr)", columnGap: 16, alignItems: "start" }}>
                    <span style={{ ...META_LABEL, paddingTop: 2 }}>CONTRIBUTION</span>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {project.contributions.map((item) => (
                        <li key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }}>—</span>
                          <span style={{ ...BODY_M }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "minmax(80px, 92px) minmax(0, 1fr)", columnGap: 16, alignItems: "start" }}>
                    <span style={{ ...META_LABEL, paddingTop: 2 }}>IMPACT</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {project.impact.map((item) => (
                        <div key={`${item.stat}-${item.label}`} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }}>—</span>
                          <p style={{ ...BODY_M }}>{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginTop: 22, paddingLeft: 0 }}>
                  <Link to={detailHref} className="ep-button ep-button-hyperlink">
                    view details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FocusLandingPage() {
  const mutedMetaColor = ACCENT_META;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ display: "flex", flexDirection: "column" }}>
      <SiteNav variant="home" />

      <main style={{ flex: 1, width: "100%", maxWidth: 688, margin: "0 auto", padding: "clamp(40px, 7vw, 72px) clamp(20px, 4vw, 32px) 120px" }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ ...META_LABEL, marginBottom: 14 }}>
            PORTFOLIO
          </p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 42px)", lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.035em", color: "var(--foreground)", ...SANS, marginBottom: 14, maxWidth: 540 }}>
            MANI SANKAR CHOUDHURY
          </h1>
          <p style={{ fontSize: 11.5, color: mutedMetaColor, ...MONO, letterSpacing: "0.14em" }}>
            SENIOR PRODUCT DESIGNER · MICROSOFT
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 22 }}>
            <a href={resumePdf} download="Mani_Sankar_Choudhury_Product_Designer.pdf" className="ep-button ep-button-secondary ep-button-sm">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M3.75 5.75L6 8L8.25 5.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 10H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              resume pdf
            </a>
          </div>
        </div>

        <SectionDivider marginTop={0} marginBottom={48} />

        <section style={{ marginBottom: 56 }}>
          <SectionLabel text="ABOUT" />
          <p style={{ ...BODY_L, fontSize: "clamp(17px, 2.2vw, 19px)", lineHeight: 1.78, marginBottom: 16, maxWidth: 620 }}>
            12+ years building enterprise and platform-scale products. I lead AI-first, agentic workflow design at Microsoft and turn fragmented ecosystems into cohesive, scalable systems.
          </p>
          <p style={{ ...BODY_S, fontSize: 15, lineHeight: 1.82, maxWidth: 560 }}>
            My focus is on reusable UX patterns, trust in AI interactions, and close design-to-engineering alignment.
          </p>
          <div style={{ marginTop: 26 }}>
            <AboutAccordionItem title="HOW I THINK">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {FOCUS_THINKING_POINTS.map((point, index) => (
                  <li key={point} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0, marginTop: 4 }}>—</span>
                    <span style={index < 2 ? { ...BODY_M, fontSize: 15 } : { ...BODY_S, fontSize: 15 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </AboutAccordionItem>

            <AboutAccordionItem title="HOW I WORK">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                {FOCUS_WORK_POINTS.map((point, index) => (
                  <div key={point} style={{ border: "1px solid var(--border)", background: "color-mix(in srgb, var(--card) 88%, transparent)", padding: "16px 16px 18px" }}>
                    <span style={{ ...META_LABEL, color: "color-mix(in srgb, var(--foreground) 70%, var(--background))", marginBottom: 10, display: "block" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p style={{ ...BODY_M }}>{point}</p>
                  </div>
                ))}
              </div>
            </AboutAccordionItem>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", marginTop: 18 }}>
            <Link to="/about" className="ep-button ep-button-hyperlink">
              full profile →
            </Link>
          </div>
        </section>

        <div style={{ marginBottom: 56, display: "grid", gap: 22 }}>
          <section style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <SectionLabel index="04" text="EXPERIENCE" />
            <p style={{ ...BODY_M, fontSize: 15, maxWidth: 620 }}>
              Currently Senior Product Designer at Microsoft, shaping agentic workflows, trust patterns, and system-level UX for enterprise products.
            </p>
            <p style={{ ...BODY_S, marginTop: 10, maxWidth: 620 }}>
              Earlier work spans Publicis Sapient, Microsoft, Acellere, Persistent, Affinity Express, and Tech Mahindra.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", marginTop: 18 }}>
              <Link to="/about#experience" className="ep-button ep-button-hyperlink">
                experience details →
              </Link>
            </div>
          </section>

          <section style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <SectionLabel index="05" text="RECOGNITION" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FOCUS_RECOGNITION.map((item) => (
                <p key={item} style={{ ...BODY_M }}>
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <SectionLabel index="06" text="OUTSIDE WORK" />
            <p style={{ ...BODY_M, maxWidth: 560 }}>
              I sketch, paint, and practice street photography, which keeps observation, composition, and craft sharp.
            </p>
          </section>
        </div>

        <SectionDivider marginTop={0} marginBottom={48} />

        <section>
          <SectionLabel index="07" text="SELECTED WORK" />
          <p style={{ ...BODY_S, fontSize: 15, marginBottom: 22, maxWidth: 620 }}>
            A compressed view of the same work: role, contribution, impact, and direct paths into each project detail.
          </p>
          <div
            style={{
              marginLeft: "clamp(12px, 2vw, 24px)",
              borderLeft: "1px solid color-mix(in srgb, var(--border) 92%, transparent)",
            }}
          >
            {PROJECTS.map((project, index) => (
              <ProjectAccordionItem key={project.slug} project={project} defaultOpen={index === 0} />
            ))}
          </div>
        </section>

        <SectionDivider marginTop={48} marginBottom={28} />

        <section>
          <SectionLabel index="08" text="GET IN TOUCH" />
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
            <a href="mailto:manisankar09@gmail.com"
              className="ep-button ep-button-hyperlink">
              manisankar09@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/mani-sankar/" target="_blank" rel="noopener noreferrer"
              className="ep-button ep-button-hyperlink">
              linkedin →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
