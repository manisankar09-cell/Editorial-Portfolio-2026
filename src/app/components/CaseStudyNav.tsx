import { Link } from "react-router";
import { useState, useEffect } from "react";
import { PROJECTS } from "../data/projects";

export const allProjects = PROJECTS.map(p => ({
  slug: p.slug,
  index: p.index,
  title: p.title,
  tags: p.tags.join(" · "),
  available: p.available,
}));

const sections = [
  { id: "hero", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "Role" },
  { id: "architecture", label: "Architecture" },
  { id: "adaptive-cards", label: "Adaptive Cards" },
  { id: "copilot", label: "Copilot" },
  { id: "ai-native", label: "AI-Native" },
  { id: "system-in-action", label: "In Action" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

export function CaseStudyNav({ projectSlug }: { projectSlug: string }) {
  const currentIndex = allProjects.findIndex((p) => p.slug === projectSlug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const [activeSection, setActiveSection] = useState("hero");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionEls = sections.map((s) => document.getElementById(s.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Main nav bar ── */}
      <header
        className="border-b border-border sticky top-0 z-50 transition-all"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--background) 94%, transparent)" : "var(--background)",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div
          className="mx-auto px-8 flex items-center gap-8"
          style={{ maxWidth: 1280, height: 56 }}
        >
          {/* Back to portfolio */}
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", textDecoration: "none", flexShrink: 0 }}
          >
            ← PORTFOLIO
          </Link>

          {/* Divider */}
          <div className="border-l border-border self-stretch" />

          {/* Section anchors — desktop */}
          <nav className="flex items-center gap-6 flex-1 overflow-x-auto hide-scrollbar">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="transition-colors whitespace-nowrap"
                style={{
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  color: activeSection === s.id ? "var(--foreground)" : "var(--muted-foreground)",
                  paddingBottom: 2,
                  borderBottom: activeSection === s.id ? "1px solid var(--foreground)" : "1px solid transparent",
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Project switcher trigger */}
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="ep-button ep-button-tertiary ep-button-sm"
            style={{
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {allProjects[currentIndex]?.index} / {allProjects.length}
            <span style={{ marginLeft: 4, opacity: 0.5 }}>{drawerOpen ? "↑" : "↓"}</span>
          </button>
        </div>

        {/* ── Project drawer ── */}
        {drawerOpen && (
          <div
            className="border-t border-border"
            style={{ background: "var(--background)" }}
          >
            <div className="mx-auto px-8 py-6" style={{ maxWidth: 1280 }}>
              <p
                className="text-muted-foreground mb-4"
                style={{ fontSize: 10, letterSpacing: "0.16em", fontFamily: "'DM Mono', monospace" }}
              >
                ALL CASE STUDIES
              </p>
              <div className="flex flex-col gap-1">
                {allProjects.map((p) => {
                  const isActive = p.slug === projectSlug;
                  const content = (
                    <div
                      className="flex items-center gap-5 py-3 px-4 transition-colors"
                      style={{
                        background: isActive ? "var(--secondary)" : "transparent",
                        borderLeft: isActive ? "2px solid var(--foreground)" : "2px solid transparent",
                        cursor: p.available ? "pointer" : "default",
                        opacity: p.available ? 1 : 0.45,
                      }}
                    >
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", width: 24, flexShrink: 0 }}
                      >
                        {p.index}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                          }}
                        >
                          {p.title}
                        </span>
                        <span
                          style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}
                        >
                          {p.tags}
                        </span>
                      </div>
                      {!p.available && (
                        <span
                          className="ml-auto"
                          style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", letterSpacing: "0.1em", opacity: 0.5 }}
                        >
                          COMING SOON
                        </span>
                      )}
                      {isActive && (
                        <span
                          className="ml-auto"
                          style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: "var(--foreground)", letterSpacing: "0.1em" }}
                        >
                          VIEWING
                        </span>
                      )}
                    </div>
                  );

                  return p.available && !isActive ? (
                    <Link
                      key={p.slug}
                      to={`/${p.slug}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => setDrawerOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={p.slug}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

// ── Prev / Next footer nav ────────────────────────────────────────────────

export function ProjectPagination({ projectSlug }: { projectSlug: string }) {
  const currentIndex = allProjects.findIndex((p) => p.slug === projectSlug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="border-t border-border">
      <div
        className="mx-auto px-8"
        style={{ maxWidth: 1280 }}
      >
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Prev */}
          <div className="border-r border-border py-10">
            {prev ? (
              prev.available ? (
                <Link to={`/${prev.slug}`} style={{ textDecoration: "none" }} className="group flex flex-col gap-2">
                  <span
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                    style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}
                  >
                    ← PREVIOUS
                  </span>
                  <span
                    className="text-foreground"
                    style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif', letterSpacing: '-0.01em'" }}
                  >
                    {prev.title}
                  </span>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: 11, fontFamily: "'DM Mono', monospace" }}
                  >
                    {prev.tags}
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em", color: "var(--foreground)" }}>← PREVIOUS</span>
                  <span style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{prev.title}</span>
                  <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--foreground)", letterSpacing: "0.08em" }}>COMING SOON</span>
                </div>
              )
            ) : (
              <Link to="/work" style={{ textDecoration: "none" }} className="group flex flex-col gap-2">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>← BACK</span>
                <span className="text-foreground" style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>Work</span>
              </Link>
            )}
          </div>

          {/* Next */}
          <div className="py-10 pl-8">
            {next ? (
              next.available ? (
                <Link to={`/${next.slug}`} style={{ textDecoration: "none" }} className="group flex flex-col gap-2 items-end text-right">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>NEXT →</span>
                  <span className="text-foreground" style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{next.title}</span>
                  <span className="text-muted-foreground" style={{ fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{next.tags}</span>
                </Link>
              ) : (
                <div className="flex flex-col gap-2 items-end text-right">
                  <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em", color: "var(--foreground)" }}>NEXT →</span>
                  <span style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{next.title}</span>
                  <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "var(--foreground)", letterSpacing: "0.08em" }}>COMING SOON</span>
                </div>
              )
            ) : (
              <Link to="/work" style={{ textDecoration: "none" }} className="group flex flex-col gap-2 items-end text-right">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>ALL WORK →</span>
                <span className="text-foreground" style={{ fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>Back to Work</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
