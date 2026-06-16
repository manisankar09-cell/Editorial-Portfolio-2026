import { useLocation } from "react-router";
import { ProjectPagination } from "../components/CaseStudyNav";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { getProjectCardRole, PROJECTS } from "../data/projects";

const MONO = { fontFamily: "'DM Mono', monospace" } as const;

export function ComingSoonPage() {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean).at(-1) ?? "";
  const project = PROJECTS.find((p) => p.slug === slug);
  const projectSlug = project?.slug ?? slug;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}
    >
      <SiteNav variant="casestudy" title={project?.title ?? "Case Study"} />
      <main style={{ flex: 1, width: "100%" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 96px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted-foreground)", ...MONO, marginBottom: 24 }}>
            {project?.index} — CASE STUDY
          </p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            {project?.title ?? "Case Study Coming Soon"}
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted-foreground)", marginBottom: 40 }}>
            {project?.tagline ?? "A detailed case study for this project is in progress and will be published soon."}
          </p>

          {/* Role + contributions preview */}
          {project && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO, marginBottom: 8 }}>ROLE</p>
                <p style={{ fontSize: 14 }}>{getProjectCardRole(project.role)}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO, marginBottom: 8 }}>CONTEXT</p>
                <p style={{ fontSize: 14 }}>{project.context} · {project.period}</p>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, marginTop: 12 }}>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", ...MONO, letterSpacing: "0.14em" }}>
                  FULL CASE STUDY COMING SOON
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      {project ? (
        <nav aria-label="Project pagination">
          <ProjectPagination projectSlug={projectSlug} />
        </nav>
      ) : null}
      <SiteFooter />
    </div>
  );
}
