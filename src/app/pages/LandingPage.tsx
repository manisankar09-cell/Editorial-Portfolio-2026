import { useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { PROJECTS } from "../data/projects";

const ACCENT_META = "color-mix(in srgb, var(--accent) 72%, var(--foreground) 28%)";
const DIAGRAM_GRID = "color-mix(in srgb, var(--foreground) 10%, transparent)";
const DIAGRAM_DARK_SURFACE = "color-mix(in srgb, #171924 84%, var(--background) 16%)";
const DIAGRAM_DARK_STROKE = "color-mix(in srgb, white 26%, transparent)";
const DIAGRAM_DARK_STROKE_SOFT = "color-mix(in srgb, white 16%, transparent)";
const DIAGRAM_DARK_TEXT = "color-mix(in srgb, white 68%, transparent)";

// ─── Magnetic CTA Button ───────────────────────────────────────────────────

function MagneticButton({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
      rawX.set(dx * 0.18);
      rawY.set(dy * 0.18);
    }
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

// ─── Film grain overlay ────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <>
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="grain-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          filter: "url(#grain-filter)",
          mixBlendMode: "multiply",
          background: "var(--foreground)",
        }}
      />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────

const signals = [
  { stat: "12+", label: "years in product design" },
  { stat: "3", label: "Fortune 500 companies" },
  { stat: "IIT, Guwahati", label: "Masters of design", statSize: "clamp(22px, 2.4vw, 32px)" },
  { stat: "2x", label: "international award winner" },
];

// ─── System visual for CXP card ───────────────────────────────────────────

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
            `linear-gradient(${DIAGRAM_GRID} 1px, transparent 1px), linear-gradient(90deg, ${DIAGRAM_GRID} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
        {["FOUNDATIONS", "COMPONENTS", "PATTERNS", "TEMPLATES"].map((layer, i) => (
          <div
            key={layer}
            className="border border-border flex items-center px-3 py-1.5"
            style={{
              background: `color-mix(in srgb, var(--card) ${84 - i * 6}%, var(--accent) ${16 + i * 6}%)`,
              borderColor: "color-mix(in srgb, var(--accent) 16%, var(--border))",
            }}
          >
            <span
              style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: ACCENT_META }}
            >
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
      style={{ width: 280, flexShrink: 0, minHeight: 200, background: DIAGRAM_DARK_SURFACE }}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-6">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full"
            style={{ width: 14, height: 14, background: "var(--accent)", opacity: 0.8, flexShrink: 0 }}
          />
          <div style={{ height: 1, flex: 1, background: DIAGRAM_DARK_STROKE }} />
        </div>
        {[80, 64, 48].map((w, i) => (
          <div
            key={i}
            style={{ width: `${w}%`, height: 8, background: i === 0 ? DIAGRAM_DARK_STROKE : i === 1 ? "color-mix(in srgb, white 20%, transparent)" : DIAGRAM_DARK_STROKE_SOFT }}
          />
        ))}
        <div className="flex gap-2 mt-1">
          {["Action", "Dismiss"].map((a, i) => (
            <div
              key={a}
              style={{
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                padding: "3px 10px",
                border: `1px solid ${i === 0 ? DIAGRAM_DARK_STROKE : DIAGRAM_DARK_STROKE_SOFT}`,
                color: i === 0 ? DIAGRAM_DARK_TEXT : "color-mix(in srgb, white 44%, transparent)",
                background: i === 0 ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
              }}
            >
              {a}
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
            `linear-gradient(${DIAGRAM_GRID} 1px, transparent 1px), linear-gradient(90deg, ${DIAGRAM_GRID} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
        <div className="flex gap-2 mb-1">
          {[40, 56, 32].map((w, i) => (
            <div
              key={i}
              className="border"
              style={{
                width: w,
                height: 20,
                borderColor: "color-mix(in srgb, var(--foreground) 14%, var(--border))",
                background: "color-mix(in srgb, var(--card) 88%, var(--background) 12%)",
              }}
            />
          ))}
        </div>
        <div
          className="border"
          style={{
            height: 48,
            borderColor: "color-mix(in srgb, var(--foreground) 14%, var(--border))",
            background: "color-mix(in srgb, var(--card) 82%, var(--secondary) 18%)",
          }}
        />
        <div className="flex gap-2">
          {[60, 40].map((w, i) => (
            <div
              key={i}
              className="border"
              style={{
                flex: w,
                height: 28,
                borderColor: "color-mix(in srgb, var(--foreground) 14%, var(--border))",
                background: i === 0
                  ? "color-mix(in srgb, var(--card) 78%, var(--secondary) 22%)"
                  : "color-mix(in srgb, var(--card) 72%, var(--secondary) 28%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  "cxp-design-system": <SystemVisual />,
  "contextual-ai-workflows": <AgentVisual />,
  "time-tracking-agent": <PlatformVisual />,
};

// ─── Nav ──────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header
      className="border-b border-border sticky top-0 z-50"
      style={{ background: "var(--background)" }}
    >
      <div
        className="site-container flex items-center justify-between"
        style={{ height: 56 }}
      >
        <span
          style={{ fontSize: 12, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
        >
          MSC
        </span>
        <nav className="flex items-center gap-8">
          {[
            { label: "Work", href: "#work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "#contact" },
          ].map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <a
          href="mailto:manisankar09@gmail.com"
          className="ep-button ep-button-tertiary ep-button-sm"
          style={{
            textDecoration: "none",
          }}
        >
          CONTACT
        </a>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ paddingTop: 128, paddingBottom: 104 }}>
      <div className="site-container">
        <div className="editorial-grid">
          {/* Label */}
          <div style={{ gridColumn: "1 / 13" }} className="mb-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground"
              style={{ fontSize: 12, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", color: ACCENT_META }}
            >
              PORTFOLIO
            </motion.p>
          </div>

          {/* Headline */}
          <div style={{ gridColumn: "1 / 10" }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-foreground"
              style={{
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Designing AI-powered systems that scale across enterprise products
            </motion.h1>
          </div>

          {/* Supporting + CTAs */}
          <div style={{ gridColumn: "1 / 7" }} className="mt-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-muted-foreground mb-10"
              style={{ fontSize: 16, lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}
            >
              12+ years building AI-driven workflows, design systems, and enterprise
              platforms. I specialize in turning fragmented ecosystems into scalable,
              cohesive systems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex gap-3"
            >
              <MagneticButton
                href="#work"
                className="ep-button ep-button-primary ep-button-lg"
                style={{
                  textDecoration: "none",
                }}
              >
                VIEW WORK →
              </MagneticButton>
              <a
                href="#contact"
                className="ep-button ep-button-tertiary ep-button-lg"
                style={{
                  textDecoration: "none",
                }}
              >
                CONTACT
              </a>
            </motion.div>
          </div>

          {/* Right — Bauhaus geometric */}
          <div
            style={{ gridColumn: "10 / 13" }}
            className="flex items-end justify-end pb-4"
          >
            <div className="relative" style={{ width: 140, height: 140 }}>
              {/* Outer square */}
              <div className="absolute inset-0 border border-border" />
              {/* Horizontal divider */}
              <div className="absolute bg-border" style={{ height: 1, left: 0, right: 0, top: "50%" }} />
              {/* Vertical divider */}
              <div className="absolute bg-border" style={{ width: 1, top: 0, bottom: 0, left: "50%" }} />
              {/* Accent fill — top-left quadrant */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  background: "var(--foreground)",
                  opacity: 0.06,
                }}
              />
              {/* Circle in bottom-right */}
              <div
                className="absolute rounded-full border border-border"
                style={{ width: 56, height: 56, bottom: 14, right: 14 }}
              />
              {/* Small accent square */}
              <div
                style={{
                  position: "absolute",
                  width: 14,
                  height: 14,
                  background: "var(--accent)",
                  opacity: 0.55,
                  top: 14,
                  right: 14,
                }}
              />
            </div>
          </div>
        </div>

        {/* Baseline rule */}
        <div className="mt-20 border-t border-border" />
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────

const cardColors: Record<string, string> = {
  "01": "rgba(59,78,130,0.06)",
  "02": "rgba(88,90,100,0.05)",
  "03": "rgba(76,95,80,0.05)",
};

function SelectedWork() {
  return (
    <section id="work" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="flex items-baseline justify-between mb-12">
          <p
            className="text-muted-foreground"
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              fontFamily: "'DM Mono', monospace",
              color: ACCENT_META,
            }}
          >
            SELECTED WORK
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: 11, letterSpacing: "0.14em", fontFamily: "'DM Mono', monospace" }}
          >
            2020 — PRESENT
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: 16 }}>
          {PROJECTS.map((project, i) => {
            const href = project.detailHref ?? `/work/${project.slug}`;
            const ctaLabel = project.available ? "VIEW CASE STUDY" : "OPEN PROJECT";
            const inner = (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                whileHover={{
                  backgroundColor: cardColors[project.index],
                  transition: { duration: 0.2 },
                }}
                className="border border-border group overflow-hidden"
                style={{
                  display: "flex",
                  cursor: "pointer",
                  minHeight: 200,
                  backgroundColor: "rgba(0,0,0,0)",
                }}
              >
                {/* Text block */}
                <div className="flex flex-col justify-between p-8 flex-1">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: ACCENT_META }}
                      >
                        {project.index}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border text-muted-foreground"
                            style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", padding: "2px 8px", color: ACCENT_META, borderColor: "color-mix(in srgb, var(--accent) 28%, var(--border))" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3
                      className="text-foreground mb-4"
                      style={{
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: 520,
                      }}
                    >
                      {project.tagline}
                    </p>
                  </div>
                  <span
                    className="text-foreground mt-6 self-start"
                    style={{
                      fontSize: 12,
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                      color: ACCENT_META,
                      borderBottom: "1px solid color-mix(in srgb, var(--accent) 55%, transparent)",
                      paddingBottom: 2,
                    }}
                  >
                    {ctaLabel} →
                  </span>
                </div>

                {/* Right — mini visual */}
                {visuals[project.slug]}
              </motion.div>
            );

            return (
              <Link key={project.slug} to={href} style={{ textDecoration: "none", display: "block" }}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────

function AboutShort() {
  return (
    <section className="border-t border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="editorial-grid items-start">
          <div style={{ gridColumn: "1 / 4" }}>
            <p
              className="text-muted-foreground"
              style={{ fontSize: 12, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", color: ACCENT_META }}
            >
              ABOUT
            </p>
          </div>
          <div style={{ gridColumn: "4 / 10" }}>
            <p
              className="text-foreground mb-5"
              style={{ fontSize: 17, lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}
            >
              I work at the intersection of interaction design, design systems, and
              emerging AI — translating ambiguity into patterns that scale.
            </p>
            <p
              className="text-muted-foreground mb-8"
              style={{ fontSize: 15, lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}
            >
              My focus is on designing agentic workflows, building reusable systems,
              and aligning design closely with engineering.
            </p>
            <Link
              to="/about"
              className="ep-button ep-button-hyperlink"
            >
              FULL PROFILE →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Signals ──────────────────────────────────────────────────────────────

function Signals() {
  return (
    <section className="border-t border-border" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <div className="site-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {signals.map((s, i) => (
            <div
              key={s.stat}
              className="flex flex-col gap-2 px-8 py-6"
              style={{ borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}
            >
              <span
                className="text-foreground"
                style={{
                  fontSize: s.statSize ?? "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1,
                  minHeight: "clamp(28px, 3vw, 40px)",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                {s.stat}
              </span>
              <span
                className="text-muted-foreground"
                style={{ fontSize: 12, lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Personal ─────────────────────────────────────────────────────────────

function Personal() {
  return (
    <section className="border-t border-border" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="site-container">
        <div className="editorial-grid items-center">
          <div style={{ gridColumn: "1 / 4" }}>
            <p
              className="text-muted-foreground"
              style={{ fontSize: 12, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", color: ACCENT_META }}
            >
              OUTSIDE WORK
            </p>
          </div>
          <div style={{ gridColumn: "4 / 9" }}>
            <p
              className="text-foreground"
              style={{ fontSize: 15, lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}
            >
              Outside of work, I sketch, paint, and practice street photography —
              sharpening observation, composition, and craft.
            </p>
          </div>
          {/* Minimal visual mark */}
          <div
            style={{ gridColumn: "11 / 13" }}
            className="flex justify-end"
          >
            <div className="relative" style={{ width: 80, height: 80 }}>
              <div className="absolute inset-0 border border-border rounded-full" />
              <div
                className="absolute border border-border"
                style={{ inset: 14 }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  background: "var(--accent)",
                  opacity: 0.5,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border"
      style={{ paddingTop: 112, paddingBottom: 112 }}
    >
      <div className="site-container">
        <div className="flex flex-col items-center text-center">
          <p
            className="text-muted-foreground mb-6"
            style={{ fontSize: 12, letterSpacing: "0.18em", fontFamily: "'DM Mono', monospace", color: ACCENT_META }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="text-foreground mb-10"
            style={{
              fontSize: "clamp(28px, 3.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              fontFamily: "'Inter', sans-serif",
              maxWidth: 680,
            }}
          >
            Let's build the next generation of AI-powered experiences.
          </h2>
          <div className="flex gap-3">
            <a
              href="mailto:manisankar09@gmail.com"
              className="ep-button ep-button-primary ep-button-lg"
              style={{
                textDecoration: "none",
              }}
            >
              EMAIL →
            </a>
            <a
              href="https://linkedin.com/in/manisankar"
              target="_blank"
              rel="noopener noreferrer"
              className="ep-button ep-button-tertiary ep-button-lg"
              style={{
                textDecoration: "none",
              }}
            >
              LINKEDIN →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}
    >
      <GrainOverlay />
      <SiteNav variant="home" />
      <main style={{ flex: 1 }}>
        <Hero />
        <SelectedWork />
        <AboutShort />
        <Signals />
        <Personal />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
