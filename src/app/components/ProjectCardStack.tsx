import { Link } from "react-router";
import { motion } from "motion/react";

type ProjectCardVisual = "system" | "agent" | "platform";

export interface ProjectCardItem {
  index: string;
  title: string;
  tags: string;
  description: string;
  href: string;
  available: boolean;
  visual: ProjectCardVisual;
}

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const cardColors: Record<string, string> = {
  "01": "rgba(59,78,130,0.06)",
  "02": "rgba(88,90,100,0.05)",
  "03": "rgba(76,95,80,0.05)",
};

function SystemVisual() {
  return (
    <div
      className="relative overflow-hidden border-l border-border"
      style={{ width: 280, flexShrink: 0, minHeight: 200, background: "var(--secondary)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
        {["FOUNDATIONS", "COMPONENTS", "PATTERNS", "TEMPLATES"].map((layer, index) => (
          <div
            key={layer}
            className="border border-border bg-card flex items-center px-3 py-1.5"
            style={{ background: `rgba(17,17,16,${0.02 + index * 0.03})` }}
          >
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted-foreground)", ...MONO }}>
              {layer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentVisual() {
  return (
    <div
      className="relative overflow-hidden border-l border-border"
      style={{ width: 280, flexShrink: 0, minHeight: 200, background: "var(--foreground)" }}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full" style={{ width: 14, height: 14, background: "var(--accent)", opacity: 0.8, flexShrink: 0 }} />
          <div style={{ height: 1, flex: 1, background: "rgba(245,244,240,0.15)" }} />
        </div>
        {[80, 64, 48].map((width, index) => (
          <div key={index} style={{ width: `${width}%`, height: 8, background: `rgba(245,244,240,${0.18 - index * 0.04})` }} />
        ))}
        <div className="flex gap-2 mt-1">
          {["Action", "Dismiss"].map((action, index) => (
            <div
              key={action}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                border: `1px solid rgba(245,244,240,${index === 0 ? 0.35 : 0.12})`,
                color: `rgba(245,244,240,${index === 0 ? 0.6 : 0.3})`,
                ...MONO,
              }}
            >
              {action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformVisual() {
  return (
    <div
      className="relative overflow-hidden border-l border-border"
      style={{ width: 280, flexShrink: 0, minHeight: 200, background: "var(--muted)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
        <div className="flex gap-2 mb-1">
          {[40, 56, 32].map((width, index) => (
            <div key={index} className="border border-border bg-card" style={{ width, height: 20, opacity: 0.8 }} />
          ))}
        </div>
        <div className="border border-border bg-card" style={{ height: 48, opacity: 0.6 }} />
        <div className="flex gap-2">
          {[60, 40].map((width, index) => (
            <div key={index} className="border border-border bg-card" style={{ flex: width, height: 28, opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals: Record<ProjectCardVisual, React.ReactNode> = {
  system: <SystemVisual />,
  agent: <AgentVisual />,
  platform: <PlatformVisual />,
};

export function ProjectCardStack({ projects }: { projects: ProjectCardItem[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      {projects.map((project, index) => {
        const inner = (
          <motion.div
            key={project.index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
            whileHover={{
              backgroundColor: cardColors[project.index] ?? "rgba(0,0,0,0.03)",
              transition: { duration: 0.2 },
            }}
            className="border border-border group overflow-hidden"
            style={{
              display: "flex",
              cursor: project.available ? "pointer" : "default",
              minHeight: 200,
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            <div className="flex flex-col justify-between p-8 flex-1">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-muted-foreground" style={{ fontSize: 12, letterSpacing: "0.1em", ...MONO }}>
                    {project.index}
                  </span>
                  <span className="ep-tag" style={{ minHeight: 24, padding: "0 8px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
                    {project.tags}
                  </span>
                  {!project.available && (
                    <span className="text-muted-foreground" style={{ fontSize: 11, letterSpacing: "0.1em", opacity: 0.5, ...MONO }}>
                      COMING SOON
                    </span>
                  )}
                </div>
                <h3 className="text-foreground mb-4" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, ...SANS }}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 520, ...SANS }}>
                  {project.description}
                </p>
              </div>
              {project.available && (
                <span className="ep-button ep-button-hyperlink" style={{ marginTop: 24, alignSelf: "flex-start", pointerEvents: "none" }}>
                  VIEW CASE STUDY →
                </span>
              )}
            </div>

            {visuals[project.visual]}
          </motion.div>
        );

        return project.available ? (
          <Link key={project.index} to={project.href} style={{ textDecoration: "none", display: "block" }}>
            {inner}
          </Link>
        ) : (
          <div key={project.index}>{inner}</div>
        );
      })}
    </div>
  );
}