import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion, useSpring, AnimatePresence } from "motion/react";
import { usePreference } from "../context/PreferenceContext";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { useIsMobile } from "../components/ui/use-mobile";
import { PROJECTS } from "../data/projects";
import profilePhoto from "../../imports/profile-photo.png";

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const ACCENT_CARD_WASH = "var(--home-card-surface)";
const ACCENT_SECONDARY_WASH = "var(--home-secondary-surface)";
const ACCENT_BORDER = "color-mix(in srgb, var(--accent) 42%, var(--border))";
const ACCENT_MUTED = "color-mix(in srgb, var(--accent) 82%, var(--foreground) 18%)";

// ─── Count-up ──────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1600, trigger = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, trigger]);
  return count;
}

// ─── Live clock ────────────────────────────────────────────────────────────

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Grain ─────────────────────────────────────────────────────────────────

function Grain({ id }: { id: string }) {
  return (
    <>
      <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" result="n" />
            <feColorMatrix type="saturate" values="0" in="n" result="g" />
            <feBlend in="SourceGraphic" in2="g" mode="overlay" />
            <feComponentTransfer><feFuncA type="linear" slope="0.04" /></feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div aria-hidden="true" className="bento-grain" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        filter: `url(#${id})`, mixBlendMode: "overlay", background: "white",
      }} />
    </>
  );
}

// ─── Cursor-tracking spotlight ─────────────────────────────────────────────

function SpotlightCard({ children, style, className }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 30, y: 80 });
  const { a11y } = usePreference();

  const onMove = useCallback((e: React.MouseEvent) => {
    if (a11y) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, [a11y]);

  return (
    <div ref={ref}
      className={`relative overflow-hidden border border-border ${className ?? ""}`}
      style={{ background: "var(--foreground)", ...style }}
      onMouseMove={onMove}
    >
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(245,244,240,0.11) 0%, transparent 55%)`,
        transition: a11y ? "none" : "background 0.06s linear",
        zIndex: 1,
      }} />
      {!a11y && <Grain id="grain-contact" />}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

// ─── Tilt card ─────────────────────────────────────────────────────────────

function TiltCard({ children, className, style, restRotate = -2.5 }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  restRotate?: number;
}) {
  const { a11y } = usePreference();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 22 });
  const rotate  = useSpring(a11y ? 0 : restRotate, { stiffness: 220, damping: 18 });

  useEffect(() => { rotate.set(a11y ? 0 : restRotate); }, [a11y, restRotate, rotate]);

  function onMove(e: React.MouseEvent) {
    if (a11y) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    rotateX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 6);
    rotateY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6);
    rotate.set(0);
  }
  function onLeave() {
    rotateX.set(0); rotateY.set(0); rotate.set(a11y ? 0 : restRotate);
  }

  return (
    <motion.div ref={ref} className={className}
      style={{ rotateX, rotateY, rotate, transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}


// ─── useReveal — handles both hover (desktop) and tap (mobile) ────────────

function useReveal() {
  const [active, setActive] = useState(false);
  const { a11y } = usePreference();

  // Detect touch-primary device once on mount
  const [isTouch] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
  );

  if (a11y) return { active: false, handlers: {} as React.HTMLAttributes<HTMLElement>, isTouch };

  const handlers: React.HTMLAttributes<HTMLElement> = isTouch
    ? { onClick: () => setActive(v => !v) }
    : {
        onMouseEnter: () => setActive(true),
        onMouseLeave: () => setActive(false),
      };

  return { active, handlers, isTouch };
}

// ─── CARD A — Headline + blinking cursor ───────────────────────────────────

function CardHeadline() {
  const { a11y } = usePreference();
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (a11y) { setShowCursor(false); return; }
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, [a11y]);

  return (
    <div
      className="border border-border relative overflow-hidden"
      style={{
        background: hovered ? "var(--hover-identity)" : ACCENT_CARD_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: "28px 28px 24px",
        display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: isMobile ? "auto" : 264,
        cursor: "default",
      }}
      {...handlers}
    >
      {/* Dot-grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(17,17,16,0.07) 1px, transparent 1px)",
        backgroundSize: "24px 24px", opacity: hovered ? 0.9 : 0.58,
        transition: "opacity 0.35s",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", gap: isMobile ? 18 : 0 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT_MUTED, ...MONO }}>
          PORTFOLIO
        </p>

        <h1 style={{
          fontSize: "clamp(26px, 2.8vw, 44px)", fontWeight: 700,
          letterSpacing: "-0.035em", lineHeight: 1.02,
          color: hovered ? "var(--accent)" : "var(--foreground)",
          transition: "color 0.35s",
          ...SANS, maxWidth: isMobile ? "100%" : "84%",
        }}>
          Designing AI-powered systems that scale across enterprise products
          {!a11y && (
            <span aria-hidden="true" style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.05s", marginLeft: 3 }}>_</span>
          )}
        </h1>

        <div className="flex items-center gap-2 flex-wrap" style={{ rowGap: isMobile ? 10 : undefined, marginTop: isMobile ? 2 : 0 }}>
          {["Enterprise Platform", "Design Systems", "AI UX", "Agentic Workflows"].map((tag) => (
            <span key={tag} className="ep-tag" style={{ color: ACCENT_MUTED, borderColor: ACCENT_BORDER }}>
              {tag}
            </span>
          ))}
          <div aria-hidden="true" style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <motion.div animate={{ scale: hovered ? 1.3 : 1 }} transition={{ duration: 0.25 }}
              style={{ width: 9, height: 9, background: "var(--accent)", opacity: 0.55 }} />
            <div style={{ width: 9, height: 9, border: "1px solid var(--border)" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid var(--border)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARD B — Role (tilted) ────────────────────────────────────────────────

function CardRole() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const isHovered = isMobile ? true : hovered;

  return (
    <div style={{ height: "100%", minHeight: 0, position: "relative", zIndex: 2 }} {...handlers}>
      <motion.div
        animate={{ rotate: isMobile ? 0 : hovered ? 0 : -2.5, y: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ height: isMobile ? "auto" : "100%", transformOrigin: "center center", borderColor: isHovered ? ACCENT_BORDER : "var(--border)" }}
        className="border border-border overflow-hidden"
      >
        <div
          style={{
            background: isHovered ? "var(--hover-identity)" : ACCENT_SECONDARY_WASH,
            transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
            padding: isMobile ? "22px 22px 20px" : "20px 20px 18px", height: isMobile ? "auto" : "100%",
            display: "flex", flexDirection: "column", gap: 18,
          }}
        >
        <div style={{ display: "flex", alignItems: isHovered ? "flex-end" : "flex-start", gap: 14, minHeight: isMobile ? "auto" : 88 }}>
          <motion.div
            animate={{ width: 96, height: 96 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "relative", flexShrink: 0 }}
          >
            <motion.div
              animate={hovered ? { borderRadius: 0, scale: 1 } : { borderRadius: 999, scale: 56 / 96 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid var(--border)",
                overflow: "hidden",
                zIndex: 2,
                transformOrigin: "top left",
                boxShadow: hovered ? "0 10px 24px rgba(26, 18, 8, 0.14)" : "none",
              }}
            >
              <img
                src={profilePhoto}
                alt="Mani Sankar Choudhury"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10, paddingTop: 2, paddingRight: 64, position: "relative" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, ...SANS }}>
                Mani Sankar Choudhury
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, flexShrink: 0, minWidth: 58, position: "absolute", top: 0, right: 0 }}>
                <motion.div
                  animate={isHovered ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }}
                />
                <motion.span
                  animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", ...MONO }}
                >
                  OPEN
                </motion.span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
                SENIOR PRODUCT DESIGNER
              </p>
              <p style={{ fontSize: 11, letterSpacing: "0.14em", color: ACCENT_MUTED, ...MONO, marginTop: 4 }}>
                MICROSOFT
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ flex: isMobile ? "0 0 auto" : 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
          <div style={{ minHeight: 0, display: "grid", rowGap: 8 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "color-mix(in srgb, var(--accent) 76%, var(--foreground) 24%)", opacity: 0.82, ...MONO }}>
              PROFILE
            </p>
            <div style={{ minHeight: isMobile ? "auto" : 60 }}>
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.p
                    key="profile-hover"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 11, lineHeight: 1.7, color: "var(--foreground)", ...SANS }}
                  >
                    I build AI-powered systems, decision flows, and design languages that help enterprise teams move from fragmented workflows to confident action.
                  </motion.p>
                ) : (
                  <motion.p
                    key="profile-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 11, lineHeight: 1.7, color: "var(--foreground)", ...SANS }}
                  >
                    Designing AI-powered systems, design languages, and decision workflows that turn ambiguity into reusable product patterns.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div style={{ minHeight: isMobile ? "auto" : 24, display: "flex", alignItems: "flex-start", marginTop: isMobile ? 0 : 4 }}>
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.div
                  key="profile-link"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/about"
                    className="ep-button ep-button-hyperlink"
                    style={{ display: "inline-flex" }}
                  >
                    FULL PROFILE →
                  </Link>
                </motion.div>
              ) : !isMobile ? (
                <motion.p key="hint-rest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontSize: 11, color: "color-mix(in srgb, var(--accent) 72%, var(--foreground) 28%)", opacity: 0.55, ...MONO, letterSpacing: "0.1em" }}>
                  TAP OR HOVER
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── CARD C — CXP case study ───────────────────────────────────────────────

function CardCXP() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const p = PROJECTS[0];

  return (
    <Link to={p.detailHref ?? `/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        className="border border-border relative overflow-hidden"
        style={{
            background: hovered ? "var(--hover-project1)" : ACCENT_CARD_WASH,
            borderColor: hovered ? ACCENT_BORDER : "var(--border)",
          transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
          padding: 22, height: "100%", minHeight: isMobile ? "auto" : 224, cursor: "pointer",
        }}
        {...handlers}
      >
        {/* Grid bg */}
        <div aria-hidden="true" className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
          backgroundSize: "20px 20px", pointerEvents: "none",
          opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.35s",
        }} />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 0, minHeight: isMobile ? "auto" : "100%", justifyContent: isMobile ? "flex-start" : "space-between" }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--accent)", opacity: 0.82, ...MONO, marginBottom: 8 }}>
                  SELECTED WORK
                </p>
                <div className="flex items-start justify-between" style={{ gap: 8 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.12em", color: ACCENT_MUTED, ...MONO }}>{p.index} PROJECT</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="ep-tag"
                        style={{ padding: "2px 8px", letterSpacing: "0.08em", ...MONO }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h2 style={{ fontSize: "clamp(19px, 1.45vw, 22px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12, ...SANS, marginBottom: 10 }}>
                {p.title}
              </h2>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted-foreground)", ...SANS, maxWidth: 360 }}>
                {p.tagline}
              </p>
            </div>

            {/* Fixed-height bottom — no layout shift */}
            <div style={{ position: "relative", height: 40 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}
              >
                <span className="ep-button ep-button-hyperlink" style={{ pointerEvents: "none" }}>
                  VIEW CASE STUDY →
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── CARD D — ContextualAI project card ────────────────────────────────────

function CardAIWork() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const p = PROJECTS[1];

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-project2)" : ACCENT_CARD_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: 24, minHeight: isMobile ? "auto" : 224,
        display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 16 : 0,
      }}
      {...handlers}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 0, marginBottom: 10 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", ...MONO }}>{p.index} PROJECT</span>
          {isMobile ? (
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {p.tags.map((tag) => (
                <span key={tag} className="ep-tag" style={{ ...MONO }}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, ...SANS, marginTop: 10, marginBottom: 8 }}>
          {p.title}
        </h2>
        <p style={{ fontSize: 11, lineHeight: 1.55, color: "var(--muted-foreground)", ...SANS }}>{p.tagline}</p>
      </div>
      <div style={{ minHeight: 24, display: "flex", alignItems: "flex-start", marginTop: isMobile ? 0 : 8 }}>
        <Link
          to={p.detailHref ?? `/${p.slug}`}
          className="ep-button ep-button-hyperlink"
          style={{ display: "inline-flex" }}
        >
          View case study →
        </Link>
      </div>
    </div>
  );
}

// ─── CARD E — Career experience mini-timeline ──────────────────────────────

const CAREER = [
  { company: "Microsoft",       period: "2020–Now",   current: true },
  { company: "Publicis Sapient",period: "2018–2020" },
  { company: "Microsoft",       period: "2017" },
  { company: "Acellere",        period: "2016" },
  { company: "Persistent Sys.", period: "2015–2016" },
  { company: "Affinity Express",period: "2014" },
  { company: "Tech Mahindra",   period: "2013–2014" },
];

function CardExperience() {
  const { active: hovered, handlers, isTouch } = useReveal();
  const isMobile = useIsMobile();
  const count = useCountUp(12, 1200);
  const metaColor = "color-mix(in srgb, var(--foreground) 72%, var(--background))";

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-stats)" : ACCENT_SECONDARY_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: 24, minHeight: isMobile ? "auto" : 236,
        display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 16 : 0,
      }}
      {...handlers}
    >
      <p style={{ fontSize: 11, letterSpacing: "0.16em", color: ACCENT_MUTED, ...MONO }}>EXPERIENCE</p>

      {/* Fixed-size middle area — both states live in same space */}
      <div style={{ position: "relative", flex: isMobile ? "0 0 auto" : 1, minHeight: isMobile ? 72 : 136, overflow: "hidden" }}>
        <AnimatePresence>
          {!hovered ? (
            <motion.div key="rest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 12 }}>
              <span style={{ fontSize: "clamp(36px, 3.2vw, 48px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, ...SANS }}>
                {count}<span style={{ fontSize: "0.4em", fontWeight: 400, opacity: 0.4 }}>+</span>
              </span>
              <div style={{ marginBottom: 6, display: "flex", flexDirection: "column", gap: 3 }}>
                {CAREER.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: c.current ? 6 : 4, height: c.current ? 6 : 4, borderRadius: "50%", background: c.current ? "var(--accent)" : "var(--border)" }} />
                    {i === 0 && <span style={{ fontSize: 11, color: metaColor, ...MONO }}>Microsoft</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              className="thin-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              role="group"
              aria-label="Career timeline"
              tabIndex={0}
              style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden", paddingRight: 2 }}>
              {CAREER.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < CAREER.length - 1 ? "1px solid var(--border)" : "none", minWidth: 0 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: c.current ? "var(--accent)" : "var(--border)" }} />
                  <span style={{ fontSize: 11, fontWeight: c.current ? 600 : 400, ...SANS, color: "var(--foreground)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.company}</span>
                  <span style={{ fontSize: 11, color: metaColor, ...MONO, flexShrink: 0 }}>{c.period}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p style={{ fontSize: 11, color: metaColor, ...SANS, lineHeight: 1.4 }}>
        {hovered ? "12+ years. 3 fortune 500 companies" : "years. 3 fortune 500 companies"}
        {isTouch ? " · tap" : ""}
      </p>
    </div>
  );
}

// ─── CARD F-2 — Time Tracking Agent ───────────────────────────────────────

function CardTimeTracker() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const p = PROJECTS[2];

  return (
    <Link to="/time-tracking-agent" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        className="border border-border"
        style={{
          background: hovered ? "var(--hover-project3)" : ACCENT_CARD_WASH,
          borderColor: hovered ? ACCENT_BORDER : "var(--border)",
          transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
          padding: 24, minHeight: isMobile ? "auto" : 224,
          display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 16 : 0,
          cursor: "pointer", height: "100%",
        }}
        {...handlers}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 0, marginBottom: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", ...MONO }}>{p.index} PROJECT</span>
            {isMobile ? (
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="ep-tag" style={{ ...MONO }}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, ...SANS, marginTop: 10, marginBottom: 8 }}>
            {p.title}
          </h2>
          <p style={{ fontSize: 11, lineHeight: 1.55, color: "var(--muted-foreground)", ...SANS }}>{p.tagline}</p>
        </div>

        {/* Fixed-height bottom — keep CTA visible in both states */}
        <div style={{ position: "relative", height: 40 }}>
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}
          >
            <span className="ep-button ep-button-hyperlink" style={{ pointerEvents: "none" }}>
              VIEW CASE STUDY →
            </span>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}

// ─── CARD F — About ────────────────────────────────────────────────────────

function CardWhatIDesign() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const principles = [
    "Signals → Actions",
    "Reduce cognitive load",
    "Scalable patterns",
    "AI-driven outcomes",
  ];

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-project1)" : ACCENT_CARD_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: 22,
        minHeight: isMobile ? "auto" : 236,
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "space-between",
        gap: isMobile ? 16 : 0,
      }}
      {...handlers}
    >
      <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT_MUTED, ...MONO }}>
        WHAT I DESIGN
      </p>

      <div>
        <p
          style={{
            fontSize: "clamp(18px, 1.6vw, 24px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            marginBottom: 16,
            ...SANS,
          }}
        >
          Designing systems that turn complexity into action.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {principles.map((principle) => (
            <span
              key={principle}
              className="ep-tag"
              style={{
                color: hovered ? ACCENT_MUTED : "var(--muted-foreground)",
                letterSpacing: "0.08em",
                ...MONO,
                transition: "color 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {principle}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CARD H — Current focus ───────────────────────────────────────────────

function CardClock() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const eyebrowColor = hovered
    ? "var(--hover-clock-muted-fg)"
    : "var(--muted-foreground)";
  const titleColor = hovered ? "var(--hover-clock-fg)" : "var(--foreground)";
  const bodyColor = hovered
    ? "var(--hover-clock-muted-fg)"
    : "var(--muted-foreground)";

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-clock-bg)" : ACCENT_CARD_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.4s cubic-bezier(0.4,0,0.2,1)",
        padding: 24,
        minHeight: isMobile ? "auto" : 236,
        display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 16 : 0,
      }}
      {...handlers}
    >
      <p style={{ fontSize: 11, letterSpacing: "0.18em", color: hovered ? eyebrowColor : ACCENT_MUTED, transition: "color 0.4s", ...MONO }}>CURRENT FOCUS</p>
      <div>
        <p style={{
          fontSize: "clamp(20px, 2vw, 30px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          ...SANS,
          color: titleColor,
          transition: "color 0.4s",
          marginBottom: 18,
        }}>
          Decision UX for AI products that need trust, judgment, and velocity.
        </p>
        <p style={{ fontSize: 11, lineHeight: 1.6, color: bodyColor, transition: "color 0.4s", ...SANS }}>
          I design for moments where recommendations need explanation, actions need confidence, and systems need to scale across teams.
        </p>
      </div>
    </div>
  );
}

function CardCredentials() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();
  const metaColor = "color-mix(in srgb, var(--foreground) 72%, var(--background))";
  const credentials = [
    {
      eyebrow: "EDUCATION",
      value: "IIT, Guwahati",
      detail: "Masters of design",
      valueSize: "clamp(16px, 1.4vw, 21px)",
    },
    {
      eyebrow: "RECOGNITION",
      value: "2x",
      detail: "international award winner",
      valueSize: "clamp(20px, 1.8vw, 26px)",
    },
  ];

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-about)" : ACCENT_CARD_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: 22,
        minHeight: isMobile ? "auto" : 192,
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "space-between",
        gap: isMobile ? 14 : 0,
      }}
      {...handlers}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {credentials.map((credential, index) => (
          <div
            key={credential.eyebrow}
            style={{
              borderTop: index === 0 ? "none" : "1px solid var(--border)",
              paddingTop: index === 0 ? 0 : 12,
            }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.14em", color: metaColor, ...MONO }}>
              {credential.eyebrow}
            </p>
            <p
              style={{
                fontSize: credential.valueSize,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
                marginTop: 8,
                ...SANS,
              }}
            >
              {credential.value}
            </p>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: "var(--muted-foreground)", marginTop: 4, ...SANS }}>
              {credential.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CARD I — Contact (spotlight + copy) ──────────────────────────────────

function CardContact() {
  const isMobile = useIsMobile();
  const surfaceColor = "var(--home-contact-surface)";
  const cardBorderColor = "color-mix(in srgb, var(--accent) 20%, var(--border))";
  const eyebrowColor = "var(--muted-foreground)";
  const bodyColor = "var(--foreground)";

  return (
    <SpotlightCard
      style={{ background: surfaceColor, borderColor: cardBorderColor, padding: 32, display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 18 : 0, minHeight: isMobile ? "auto" : 192 }}
    >
      <div>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: eyebrowColor, ...MONO }}>GET IN TOUCH</p>
        <p style={{ fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: bodyColor, ...SANS, marginTop: 14 }}>
          Let's build what's next.
        </p>
      </div>
      <div className="flex gap-3 items-center flex-wrap" style={{ marginTop: 28 }}>
        <a href="mailto:manisankar09@gmail.com"
          className="ep-button ep-button-tertiary ep-button-lg"
          style={{ textDecoration: "none" }}
        >EMAIL →</a>
          <a href="https://www.linkedin.com/in/mani-sankar/" target="_blank" rel="noopener noreferrer"
          className="ep-button ep-button-tertiary ep-button-lg"
          style={{ textDecoration: "none" }}
        >LINKEDIN →</a>
      </div>
    </SpotlightCard>
  );
}

// ─── CARD J — Outside work ─────────────────────────────────────────────────

function CardGallery() {
  const { active: hovered, handlers } = useReveal();
  const isMobile = useIsMobile();

  const shapes = [
    { w: 36, h: 36, r: "50%", delay: 0 },
    { w: 22, h: 22, r: 0,     delay: 0.06 },
    { w: 14, h: 52, r: 0,     delay: 0.09 },
    { w: 52, h: 14, r: 0,     delay: 0.12 },
    { w: 10, h: 10, r: "50%", delay: 0.15 },
    { w: 28, h: 28, r: 2,     delay: 0.04 },
  ];

  return (
    <div
      className="border border-border"
      style={{
        background: hovered ? "var(--hover-gallery)" : ACCENT_SECONDARY_WASH,
        borderColor: hovered ? ACCENT_BORDER : "var(--border)",
        transition: "background 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: 24, minHeight: isMobile ? "auto" : 192,
        display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "space-between", gap: isMobile ? 16 : 0,
      }}
      {...handlers}
    >
      <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT_MUTED, ...MONO }}>OUTSIDE WORK</p>

      <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 320, ...SANS }}>
        Sketching, painting, and street photography — sharpening observation and craft.
      </p>

      {/* Abstract composition shapes */}
      <div aria-hidden="true" style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 52 }}>
        {shapes.map((s, i) => (
          <motion.div
            key={i}
            animate={hovered
              ? { background: `var(--accent)`, opacity: 0.25 + i * 0.1, scale: 1.08 }
              : { background: "var(--border)", opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.3, delay: s.delay }}
            style={{ width: s.w, height: s.h, borderRadius: s.r, border: "1px solid var(--border)", flexShrink: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export function BentoLandingPage() {
  const { a11y, colorTheme } = usePreference();
  const isMobile = useIsMobile();

  // Apply paper texture class to body
  useEffect(() => {
    document.body.classList.toggle("theme-paper", colorTheme === "paper");
    return () => document.body.classList.remove("theme-paper");
  }, [colorTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ ...SANS, perspective: "1400px" }}>
      <SiteNav variant="home" />
      <main
        id="bento-main"
        style={{ width: "100%", padding: "12px 0 16px" }}
      >
        <div className="site-container">
          <div className="bento-grid">
            <div className="bento-card-headline"><CardHeadline /></div>
            <div className="bento-card-role"><CardRole /></div>
            <div className="bento-card-what-i-design"><CardWhatIDesign /></div>
            <div className="bento-card-experience"><CardExperience /></div>
            <div className="bento-card-cxp"><CardCXP /></div>
            <div className="bento-card-ai"><CardAIWork /></div>
            <div className="bento-card-timetracker"><CardTimeTracker /></div>
            <div className="bento-card-clock"><CardClock /></div>
            <div className="bento-card-credentials"><CardCredentials /></div>
            <div className="bento-card-gallery"><CardGallery /></div>
            <div className="bento-card-contact"><CardContact /></div>
          </div>
        </div>
      </main>

      <SiteFooter fixed={!a11y && !isMobile} />
    </div>
  );
}
