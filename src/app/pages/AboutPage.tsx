import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

// ─── Data ─────────────────────────────────────────────────────────────────

const workPrinciples = [
  { label: "System-first thinking", desc: "Design from structure outward — tokens, components, then surfaces." },
  { label: "Pattern-driven design", desc: "Identify the repeatable, durable shape underneath every interaction." },
  { label: "Design to engineering alignment", desc: "Decisions made in collaboration with the teams that build them." },
  { label: "AI-integrated UX", desc: "Embedding intelligence as a design material, not a feature bolt-on." },
];

const EXPERIENCE = [
  {
    company: "Microsoft",
    role: "Senior Product Designer",
    period: "Mar 2020 — Present",
    location: "Bangalore, India",
    bullets: [
      "Lead system-level design for AI-powered, agentic experiences across Sales, Customer Success, and Delivery — shaping how Copilot and agents integrate into real enterprise workflows.",
      "Designed and shipped Contextual AI (CAI) experiences that improved seller focus, decision-making, and adoption by restructuring fragmented journeys into cohesive systems.",
      "Defined trust and explainability patterns for AI UX (cards, disclosure, reasoning, action affordances), enabling confident action on AI-generated recommendations.",
      "Core steward of the CXP Design System — consolidated fragmented libraries into a single source of truth, establishing reusable components, behavior standards, and governance.",
      "Raised design-to-engineering fidelity via implementation-ready artifacts (component specs, adaptive card schemas, interaction contracts), reducing ambiguity and rework.",
      "Drove org-wide adoption of VS Code-first 'vibe coding' workflows, enabling designers to prototype closer to production and shorten iteration loops.",
      "Partnered with PM, Engineering, and Data Science to align UX with telemetry, accessibility (WCAG 2.2 AA), and long-term platform health.",
    ],
    tags: ["Agentic AI UX", "Copilot", "Design systems", "Trust & explainability", "Systems thinking", "Accessibility (WCAG 2.2 AA)"],
    current: true,
  },
  {
    company: "Publicis Sapient",
    role: "Senior Information Designer",
    period: "July 2018 — March 2020",
    location: "Bangalore, India",
    bullets: [
      "Owned end-to-end UX for Verizon, Barnes & Noble and Bartleby (large-scale consumer & B2B platforms), translating ambiguity into scalable architectures and interaction models.",
      "Led design of the Activity Tracker App — from ideation and wireframes through usability testing and refinement for internal employee engagement.",
    ],
    tags: ["Information architecture", "Consumer & B2B platforms", "Usability testing", "Interaction design"],
  },
  {
    company: "Microsoft",
    role: "UI/UX Designer (Intern)",
    period: "May 2017 — July 2017",
    location: "Hyderabad, India",
    bullets: [
      "Simplified complex, data-dense workflows in Azure Network Performance Monitor for enterprise network engineers.",
    ],
    tags: ["Enterprise UX", "Data-dense workflows", "Azure"],
  },
  {
    company: "Acellere Software Pvt. Ltd.",
    role: "UI/UX Designer (Team Lead)",
    period: "April 2016 — June 2016",
    location: "Pune, India",
    bullets: [
      "Led client-facing design engagements for Trnear (fitness app) and Gamma (project analytics tool) — owned research, personas, workflow definition, prototyping, and team mentoring.",
    ],
    tags: ["Team leadership", "Client engagements", "Research & personas", "Prototyping"],
  },
  {
    company: "Persistent Systems",
    role: "UI/UX & Graphic Designer",
    period: "May 2015 — March 2016",
    location: "Pune, India",
    bullets: [
      "Embedded with Persistent Systems' product teams on-site via Studioworks 360, a design vendor partner.",
      "Delivered UI/UX from concept to launch across enterprise products including Salesforce Financial Cloud, collaborating closely with creative, engineering, and accounts teams.",
    ],
    tags: ["Enterprise UX", "Graphic design", "Cross-functional collaboration"],
  },
  {
    company: "Affinity Express",
    role: "Creative Graphic Designer",
    period: "Jul 2014 — Nov 2014",
    location: "Pune, India",
    bullets: [
      "Designed newspaper ads, corporate flyers, and brochures for a range of client brands.",
      "Partnered directly with clients to understand brand value and product positioning, gathering feedback and turning it into polished, on-brand creative within tight delivery windows.",
    ],
    tags: ["Print design", "Brand communication", "Client collaboration"],
  },
  {
    company: "Tech Mahindra",
    role: "Associate — Technical Support",
    period: "January 2013 — April 2014",
    location: "Pune, India",
    bullets: [
      "Telecom service / incident management and network assurance for business voice and high-speed internet.",
      "Troubleshot connectivity issues through testing and programming, taking end-to-end ownership of incidents — triaging by severity, managing tickets, and partnering with onshore teams to resolve errors.",
    ],
    tags: ["Incident management", "Network troubleshooting", "Customer support"],
  },
];

const achievements = [
  { title: "Microsoft Hackathon '20", award: "Winner", detail: "AI-powered design assistant concept." },
  { title: "OzChi '17", award: "First Place", detail: "Research on adaptive enterprise interfaces." },
];

const projects = [
  {
    label: "Case Study",
    title: "CXP Design System",
    desc: "Scaling a unified UX standard for AI-powered enterprise experiences across Microsoft platforms.",
    tags: ["Design Systems", "AI UX", "Enterprise"],
    href: "/cxp-design-system",
  },
];

// ─── Shared primitives ────────────────────────────────────────────────────

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const PANEL: React.CSSProperties = {
  background: "color-mix(in srgb, var(--card) 88%, var(--background) 12%)",
  border: "1px solid color-mix(in srgb, var(--border) 92%, transparent)",
};

const META_TEXT = "color-mix(in srgb, var(--muted-foreground) 86%, var(--foreground) 14%)";
const SOFT_TEXT = "color-mix(in srgb, var(--muted-foreground) 92%, var(--foreground) 8%)";
const ACCENT_META = "color-mix(in srgb, var(--accent) 74%, var(--foreground) 26%)";
const ACCENT_RULE = "color-mix(in srgb, var(--accent) 30%, transparent)";

function SectionLabel({ index, text, marginBottom = 20 }: { index: string; text: string; marginBottom?: number }) {
  return (
    <p className="text-muted-foreground col-label"
      style={{ fontSize: 11, letterSpacing: "0.18em", ...MONO, marginBottom, color: META_TEXT }}>
      <span style={{ color: ACCENT_META }}>{index}</span> — {text}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-border" style={{ marginTop: 72, marginBottom: 72 }} />;
}

// ─── Experience accordion item ────────────────────────────────────────────

function ExperienceItem({ item, defaultOpen }: { item: typeof EXPERIENCE[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const accordionSurface = open
    ? "color-mix(in srgb, var(--card) 82%, var(--accent) 18%)"
    : "color-mix(in srgb, var(--card) 90%, var(--background) 10%)";
  const accordionBorder = open
    ? "color-mix(in srgb, var(--accent) 30%, var(--border))"
    : "color-mix(in srgb, var(--border) 92%, transparent)";

  return (
    <div
      style={{
        background: accordionSurface,
        border: `1px solid ${accordionBorder}`,
        borderRadius: 8,
        marginBottom: 10,
        boxShadow: open ? "0 0 0 1px color-mix(in srgb, var(--accent) 14%, transparent) inset" : "none",
        overflow: "hidden",
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          width: "100%", display: "flex", alignItems: "baseline", justifyContent: "space-between",
          padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: 16,
        }}
      >
        {/* Left — dot + company + role */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flex: 1, minWidth: 0 }}>
          <div
            aria-hidden="true"
            style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginBottom: 2,
              background: item.current ? "var(--accent)" : "var(--border)",
            }}
          />
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", ...SANS }}>{item.company}</span>
            <span style={{ fontSize: 14, color: "var(--muted-foreground)", ...SANS }}> — {item.role}</span>
          </div>
        </div>

        {/* Right — period + toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "var(--muted-foreground)", ...MONO, letterSpacing: "0.06em" }}>
            {item.period}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 20, height: 20, borderRadius: "50%", border: `1px solid ${accordionBorder}`,
              background: open ? "color-mix(in srgb, var(--accent) 16%, transparent)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 13, lineHeight: 1, color: "var(--muted-foreground)", marginTop: -1 }}>+</span>
          </motion.div>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden", borderTop: `1px solid ${accordionBorder}` }}
          >
            <div style={{ padding: "18px 20px 24px 37px" }}>
              {/* Location */}
                  <p style={{ fontSize: 11, letterSpacing: "0.14em", color: META_TEXT, ...MONO, marginBottom: 16 }}>
                {item.location}
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {item.bullets.map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", opacity: 0.7, flexShrink: 0, marginTop: 2, fontSize: 12 }}>—</span>
                    <span style={{ fontSize: 13, lineHeight: 1.7, color: "var(--foreground)", ...SANS }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              {item.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {item.tags.map(tag => (
                    <span key={tag} className="ep-tag ep-tag-subtle" style={{ letterSpacing: "0.06em", ...MONO }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────

function HeroBlock() {
  return (
    <section className="section-pad" style={{ paddingTop: 96 }}>
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 9" }}>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-muted-foreground" style={{ fontSize: 11, letterSpacing: "0.18em", ...MONO, marginBottom: 20, color: ACCENT_META }}>
              SENIOR PRODUCT DESIGNER · MICROSOFT
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
              className="text-foreground"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, ...SANS }}>
              Designing systems,<br />not just interfaces
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: 112,
                height: 2,
                marginTop: 18,
                background: ACCENT_RULE,
                transformOrigin: "left center",
              }}
            />
          </div>
          <div style={{ gridColumn: "1 / 7", marginTop: 32 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
              style={{ fontSize: 16, lineHeight: 1.75, ...SANS }}>
              I'm Mani Sankar Choudhury, a Senior Product Designer at Microsoft
              working on AI-first workflows and enterprise platforms.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="border-t border-border" style={{ marginTop: 56, width: "100%" }} />
    </section>
  );
}

function NarrativeBlock() {
  return (
    <section id="thinking" className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="01" text="ABOUT" />
          </div>
          <div style={{ gridColumn: "4 / 10" }} className="col-content">
            <p className="text-foreground" style={{ fontSize: 17, lineHeight: 1.8, ...SANS, marginBottom: 24 }}>
              With 12+ years building enterprise and platform-scale products, I currently
              lead AI-first, agentic workflow design at Microsoft. I specialize in
              transforming fragmented, multi-tool ecosystems into cohesive, scalable
              systems through strong systems thinking, durable UX patterns, and deep
              design-to-engineering alignment.
            </p>
            <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.8, ...SANS }}>
              My focus is on designing agentic workflows, building reusable systems,
              and aligning design closely with engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowIThinkBlock() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="02" text="HOW I THINK" />
          </div>
          <div style={{ gridColumn: "4 / 10" }} className="col-content">
            <div
              style={{
                ...PANEL,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                "I work where interaction design, design systems, and emerging AI meet.",
                "I translate messy ambiguity into patterns that scale across systems and teams.",
                "The problems I enjoy most sit at the seams — between surfaces, between humans and AI models, and between what a product is today and what it could become.",
              ].map((para, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "18px minmax(0, 1fr)",
                    gap: 12,
                    alignItems: "start",
                    paddingTop: i === 0 ? 0 : 14,
                    borderTop: i === 0 ? "none" : "1px solid color-mix(in srgb, var(--border) 88%, transparent)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--accent)",
                      opacity: 0.88,
                      fontSize: 13,
                      lineHeight: 1.6,
                      ...MONO,
                    }}
                  >
                    —
                  </span>
                  <p
                    className="text-foreground"
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      ...SANS,
                      color: "var(--foreground)",
                    }}
                  >
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowIWorkBlock() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="03" text="HOW I WORK" />
          </div>
          <div style={{ gridColumn: "4 / 13" }} className="col-content">
            <div className="responsive-grid-2">
              {workPrinciples.map((p, i) => (
                <div key={p.label} className="border border-border p-6" style={PANEL}>
                  <span className="block" style={{ fontSize: 11, ...MONO, letterSpacing: "0.1em", marginBottom: 12, color: ACCENT_META }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground" style={{ fontSize: 14, fontWeight: 600, ...SANS, marginBottom: 8 }}>{p.label}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.65, ...SANS, color: "var(--muted-foreground)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedWorkBlock() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="04" text="SELECTED WORK" />
          </div>
          <div style={{ gridColumn: "4 / 13" }} className="col-content">
            {projects.map((project) => (
              <Link key={project.title} to={project.href} style={{ textDecoration: "none", display: "block" }}>
                <div className="border border-border p-8 group transition-colors hover:border-foreground/30" style={{ ...PANEL, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, letterSpacing: "0.14em", ...MONO, marginBottom: 10, color: META_TEXT }}>{project.label}</p>
                      <h2 className="text-foreground" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", ...SANS, marginBottom: 10 }}>{project.title}</h2>
                      <p className="text-muted-foreground" style={{ fontSize: 14, lineHeight: 1.7, ...SANS, maxWidth: 480, marginBottom: 20 }}>{project.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {project.tags.map(tag => (
                          <span key={tag} className="ep-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-muted-foreground group-hover:text-accent transition-colors" style={{ fontSize: 20, flexShrink: 0, paddingTop: 4 }}>→</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceBlock() {
  return (
    <section id="experience" className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <SectionLabel index="05" text="EXPERIENCE" marginBottom={0} />
            {/* Resume download */}
            <a
              href="/resume.pdf"
              download="ManiSankar_Resume.pdf"
              className="ep-button ep-button-tertiary ep-button-sm"
              style={{
                textDecoration: "none",
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                <path d="M5 1v7M2 6l3 3 3-3M1 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              RESUME PDF
            </a>
          </div>
          <div style={{ gridColumn: "4 / 11" }} className="col-content">
            <div>
              {EXPERIENCE.map((item, i) => (
                <ExperienceItem key={item.company + item.period} item={item} defaultOpen={i === 0} />
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementsBlock() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="06" text="RECOGNITION" />
          </div>
          <div style={{ gridColumn: "4 / 9" }} className="col-content">
            <div className="flex flex-col">
              {achievements.map((a) => (
                <div key={a.title} className="flex items-baseline justify-between py-5"
                  style={{ borderTop: "1px solid var(--border)" }}>
                  <div>
                    <p className="text-foreground" style={{ fontSize: 15, fontWeight: 500, ...SANS, marginBottom: 3 }}>{a.title}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 12, ...SANS }}>{a.detail}</p>
                  </div>
                  <span style={{ fontSize: 11, ...MONO, letterSpacing: "0.12em", color: ACCENT_META, flexShrink: 0, marginLeft: 24 }}>
                    {a.award}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalBlock() {
  return (
    <section
      className="section-pad"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        backgroundImage: [
          "radial-gradient(120% 88% at 18% 20%, color-mix(in srgb, var(--foreground) 6%, transparent) 0%, transparent 70%)",
          "radial-gradient(92% 76% at 82% 74%, color-mix(in srgb, var(--foreground) 4.8%, transparent) 0%, transparent 72%)",
          "repeating-linear-gradient(12deg, color-mix(in srgb, var(--foreground) 3.1%, transparent) 0px, color-mix(in srgb, var(--foreground) 3.1%, transparent) 1px, transparent 1px, transparent 8px)",
          "repeating-linear-gradient(-16deg, color-mix(in srgb, var(--foreground) 2.4%, transparent) 0px, color-mix(in srgb, var(--foreground) 2.4%, transparent) 1px, transparent 1px, transparent 11px)",
          "linear-gradient(180deg, color-mix(in srgb, var(--secondary) 20%, transparent) 0%, transparent 42%, color-mix(in srgb, var(--secondary) 14%, transparent) 100%)",
        ].join(", "),
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
      }}
    >
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 4" }}>
            <SectionLabel index="07" text="OUTSIDE WORK" />
          </div>
          <div style={{ gridColumn: "4 / 9" }} className="col-content">
            <p className="text-foreground" style={{ fontSize: 15, lineHeight: 1.8, ...SANS, marginBottom: 16 }}>
              Outside of work, I sketch, paint, and practice street photography —
              sharpening observation, composition, and craft.
            </p>
            <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.8, ...SANS }}>
              I bring that same curiosity into exploring food, culture, and everyday details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section
      id="contact"
      className="border-t border-border section-pad"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 16% 18%, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 44%)",
          "radial-gradient(circle at 88% 84%, color-mix(in srgb, var(--accent) 9%, transparent) 0%, transparent 40%)",
          "linear-gradient(160deg, color-mix(in srgb, var(--secondary) 18%, transparent) 0%, transparent 58%)",
          "linear-gradient(color-mix(in srgb, var(--foreground) 3.5%, transparent) 1px, transparent 1px)",
          "linear-gradient(90deg, color-mix(in srgb, var(--foreground) 3.5%, transparent) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "auto, auto, auto, 28px 28px, 28px 28px",
        backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0",
      }}
    >
      <div className="site-container">
        <div className="responsive-grid-12">
          <div style={{ gridColumn: "1 / 7" }} className="col-content">
            <p className="text-muted-foreground" style={{ fontSize: 11, letterSpacing: "0.18em", ...MONO, marginBottom: 16, color: ACCENT_META }}>08 — CONTACT</p>
            <h2 className="text-foreground" style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, ...SANS, marginBottom: 32 }}>
              Always open to conversations around AI, systems, and product design.
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:manisankar09@gmail.com"
                className="ep-button ep-button-primary ep-button-lg"
                style={{ textDecoration: "none" }}>
                EMAIL →
              </a>
              <a href="https://linkedin.com/in/manisankar" target="_blank" rel="noopener noreferrer"
                className="ep-button ep-button-tertiary ep-button-lg"
                style={{ textDecoration: "none" }}>
                LINKEDIN →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ ...SANS, display: "flex", flexDirection: "column" }}
    >
      <SiteNav variant="page" />
      <main style={{ flex: 1 }}>
        <HeroBlock />
        <NarrativeBlock />
        <Divider />
        <HowIThinkBlock />
        <HowIWorkBlock />
        <Divider />
        <SelectedWorkBlock />
        <Divider />
        <ExperienceBlock />
        <AchievementsBlock />
        <PersonalBlock />
        <ContactBlock />
      </main>
      <SiteFooter />
    </div>
  );
}
