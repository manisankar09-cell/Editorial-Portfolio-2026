import { motion, AnimatePresence } from "motion/react";
import { usePreference, type LayoutMode } from "../context/PreferenceContext";

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

const MODES: { id: LayoutMode; label: string; icon: React.ReactNode }[] = [
  {
    id: "bento",
    label: "Bento",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="8" y="1" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="1" y="8" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="8" y="8" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "classic",
    label: "Classic",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="12" height="2" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="1" y="6" width="12" height="2" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="1" y="10" width="8" height="2" rx="0.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "focus",
    label: "Focus",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="1.5" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="3" y="6.25" width="6" height="1.5" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="3" y="9.5" width="4" height="1.5" rx="0.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
];

export function PreferenceBar() {
  const { layout, setLayout, a11y, setA11y } = usePreference();
  const panelBorder = "color-mix(in srgb, var(--primary-foreground) 8%, transparent)";
  const activeBg = "color-mix(in srgb, var(--primary-foreground) 12%, transparent)";
  const activeFg = "color-mix(in srgb, var(--primary-foreground) 92%, transparent)";
  const idleFg = "color-mix(in srgb, var(--primary-foreground) 38%, transparent)";
  const hoverFg = "color-mix(in srgb, var(--primary-foreground) 65%, transparent)";
  const focusRing = "color-mix(in srgb, var(--primary-foreground) 50%, transparent)";
  const divider = "color-mix(in srgb, var(--primary-foreground) 12%, transparent)";
  const indicator = "color-mix(in srgb, var(--primary-foreground) 70%, transparent)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      role="toolbar"
      aria-label="View preferences"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "var(--foreground)",
        border: `1px solid ${panelBorder}`,
        padding: "5px 6px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      {/* Layout mode buttons */}
      {MODES.map((mode) => {
        const active = layout === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => setLayout(mode.id)}
            aria-pressed={active}
            aria-label={`Switch to ${mode.label} layout`}
            title={mode.label}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              background: active ? activeBg : "transparent",
              color: active ? activeFg : idleFg,
              border: "none",
              cursor: "pointer",
              transition: "color 0.15s, background 0.15s",
              outline: "none",
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = hoverFg; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = idleFg; }}
            onFocus={e => { e.currentTarget.style.outline = `2px solid ${focusRing}`; e.currentTarget.style.outlineOffset = "2px"; }}
            onBlur={e => { e.currentTarget.style.outline = "none"; }}
          >
            {mode.icon}
            <span style={{ fontSize: 9, letterSpacing: "0.12em", ...MONO }}>{mode.label.toUpperCase()}</span>

            {/* Active indicator dot */}
            <AnimatePresence>
              {active && (
                <motion.span
                  layoutId="active-mode-dot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: indicator,
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: divider, margin: "0 4px" }} aria-hidden="true" />

      {/* A11y toggle */}
      <button
        onClick={() => setA11y(!a11y)}
        aria-pressed={a11y}
        aria-label={a11y ? "Disable accessibility mode" : "Enable accessibility mode"}
        title={a11y ? "Accessible mode on" : "Accessibility mode"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          background: a11y ? activeBg : "transparent",
          color: a11y ? activeFg : idleFg,
          border: "none",
          cursor: "pointer",
          transition: "color 0.15s, background 0.15s",
          outline: "none",
        }}
        onMouseEnter={e => { if (!a11y) e.currentTarget.style.color = hoverFg; }}
        onMouseLeave={e => { if (!a11y) e.currentTarget.style.color = idleFg; }}
        onFocus={e => { e.currentTarget.style.outline = `2px solid ${focusRing}`; e.currentTarget.style.outlineOffset = "2px"; }}
        onBlur={e => { e.currentTarget.style.outline = "none"; }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="2.5" r="1.5" fill="currentColor" opacity="0.9" />
          <path d="M3 5.5h7M6.5 5.5v5M4.5 10.5l2-2 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
        <span style={{ fontSize: 9, letterSpacing: "0.12em", ...MONO }}>
          {a11y ? "A11Y ON" : "A11Y"}
        </span>
      </button>
    </motion.div>
  );
}
