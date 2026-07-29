import { Link } from "react-router";
import { motion } from "motion/react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { getProjectCardRole, PROJECTS } from "../data/projects";

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const LIBRARY_PANEL: React.CSSProperties = {
  background: "transparent",
};

export function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS, display: "flex", flexDirection: "column" }}>
      <SiteNav variant="page" />

      <main style={{ flex: 1 }}>
        <section style={{ padding: "64px 0 80px" }}>
          <div className="site-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 28,
                maxWidth: 620,
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", ...MONO }}
              >
                SELECTED WORK
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                style={{
                  fontSize: "clamp(40px, 4.8vw, 64px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.06em",
                  fontWeight: 700,
                }}
              >
                Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", maxWidth: 520 }}
              >
                A small selection of projects that show how I approach systems, product thinking, and AI-powered workflow design.
              </motion.p>
            </div>

            <div className="responsive-grid-12" style={{ rowGap: 16 }}>
              {PROJECTS.map((project) => {
                const href = project.detailHref ?? `/work/${project.slug}`;
                const visibleTags = project.tags.slice(0, 2);
                const hiddenTagCount = Math.max(project.tags.length - visibleTags.length, 0);
                const ctaLabel = project.available ? "View case study" : "Open project";

                return (
                  <div key={project.slug} style={{ gridColumn: "span 4" }}>
                    <Link to={href} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                      <article
                        className="group border border-border transition-colors hover:border-accent/45"
                        style={{
                          ...LIBRARY_PANEL,
                          padding: "24px 24px 22px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 18,
                          minHeight: 320,
                          height: "100%",
                          transition: "background 0.2s ease, border-color 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
                          <p
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              color: "var(--accent)",
                              ...MONO,
                            }}
                          >
                            {project.index} PROJECT
                          </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0, flex: 1 }}>
                          <div>
                            <h2
                              style={{
                                fontSize: "clamp(24px, 2.1vw, 30px)",
                                lineHeight: 1.12,
                                letterSpacing: "-0.02em",
                                fontWeight: 600,
                                marginBottom: 10,
                              }}
                            >
                              {project.title}
                            </h2>
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 340 }}>
                              {project.tagline}
                            </p>
                          </div>

                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {visibleTags.map((tag) => (
                              <span
                                key={tag}
                                className="ep-tag"
                                style={{
                                  ...MONO,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            {hiddenTagCount > 0 && (
                              <span
                                className="ep-tag ep-tag-subtle"
                                style={{
                                  ...MONO,
                                }}
                              >
                                +{hiddenTagCount}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            paddingTop: 16,
                            borderTop: "1px solid var(--border)",
                            marginTop: "auto",
                          }}
                        >
                          <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
                            {project.period}
                          </p>
                          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--foreground)", maxWidth: 240 }}>
                            {getProjectCardRole(project.role)}
                          </p>
                          <div style={{ paddingTop: 6 }}>
                            <span
                              className="ep-button ep-button-tertiary ep-button-sm transition-transform duration-200 group-hover:translate-x-1"
                            >
                              {ctaLabel.toUpperCase()}
                              <span
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                                style={{ lineHeight: 1 }}
                              >
                                →
                              </span>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
