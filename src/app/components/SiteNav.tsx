import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { usePreference, type LayoutMode, type ColorTheme } from "../context/PreferenceContext";

const HOME_LOGO_REVEAL_KEY = "ep-home-logo-revealed";
const PREVIOUS_PATH_KEY = "ep-previous-path";

// ── Theme palette colours ─────────────────────────────────────────────────

const THEMES: { id: ColorTheme; bg: string; accent: string; label: string }[] = [
  { id: "paper", bg: "#f4f1ec", accent: "#c4481e", label: "Paper" },
  { id: "slate", bg: "#f0f2f5", accent: "#1a5c4a", label: "Slate" },
  { id: "dusk",  bg: "#1a1714", accent: "#c97d2a", label: "Dusk"  },
];

const PRIMARY_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
] as const;

function isWorkPath(pathname: string) {
  return pathname === "/work"
    || pathname.startsWith("/work/")
    || pathname === "/cxp-design-system"
    || pathname === "/time-tracking-agent"
    || pathname === "/contextual-ai-workflows";
}

function isNavLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/about") return pathname === "/about";
  if (href === "/work") return isWorkPath(pathname);
  return pathname === href;
}

function getSectionForPath(pathname: string | null) {
  if (pathname === "/") return { href: "/", label: "Home" };
  if (pathname === "/about") return { href: "/about", label: "About" };
  if (pathname && isWorkPath(pathname)) return { href: "/work", label: "Work" };
  return { href: "/work", label: "Work" };
}

function WordmarkSvg() {
  return (
    <svg width="131" height="22" viewBox="0 0 131 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%", height: "auto" }}>
      <path d="M15.552 15.632H12.852L22.68 5.48H27.18V17H22.68V9.152L24.03 9.71L16.92 17H11.52L4.392 9.728L5.76 9.17V17H1.26V5.48H5.76L15.552 15.632ZM35.5854 17.252C34.2894 17.252 33.1374 17.072 32.1294 16.712C31.1214 16.34 30.3234 15.806 29.7354 15.11C29.1594 14.414 28.8714 13.574 28.8714 12.59C28.8714 11.558 29.1594 10.694 29.7354 9.998C30.3234 9.302 31.1214 8.78 32.1294 8.432C33.1374 8.084 34.2894 7.91 35.5854 7.91C37.0254 7.91 38.2674 8.108 39.3114 8.504C40.3674 8.888 41.1774 9.434 41.7414 10.142C42.3174 10.838 42.6054 11.654 42.6054 12.59C42.6054 13.286 42.4434 13.922 42.1194 14.498C41.7954 15.062 41.3274 15.554 40.7154 15.974C40.1034 16.382 39.3654 16.7 38.5014 16.928C37.6374 17.144 36.6654 17.252 35.5854 17.252ZM37.2054 14.516C38.1174 14.516 38.9514 14.462 39.7074 14.354C40.4754 14.234 41.0874 14.036 41.5434 13.76C42.0114 13.484 42.2454 13.094 42.2454 12.59C42.2454 12.074 42.0114 11.678 41.5434 11.402C41.0874 11.126 40.4754 10.934 39.7074 10.826C38.9514 10.718 38.1174 10.664 37.2054 10.664C35.9814 10.664 35.0334 10.826 34.3614 11.15C33.6894 11.462 33.3534 11.942 33.3534 12.59C33.3534 13.01 33.5034 13.364 33.8034 13.652C34.1034 13.94 34.5414 14.156 35.1174 14.3C35.6934 14.444 36.3894 14.516 37.2054 14.516ZM42.2454 8.18H46.5654V17H42.4974C42.4974 17 42.4734 16.862 42.4254 16.586C42.3894 16.31 42.3474 15.914 42.2994 15.398C42.2634 14.882 42.2454 14.276 42.2454 13.58V8.18ZM47.994 8.18H52.314V17H47.994V8.18ZM58.794 7.91C59.502 7.91 60.186 7.988 60.846 8.144C61.506 8.288 62.094 8.54 62.61 8.9C63.138 9.26 63.558 9.752 63.87 10.376C64.182 11 64.338 11.786 64.338 12.734V17H60.018V13.274C60.018 12.374 59.784 11.738 59.316 11.366C58.848 10.982 58.002 10.79 56.778 10.79C56.13 10.79 55.5 10.862 54.888 11.006C54.288 11.15 53.748 11.324 53.268 11.528C52.788 11.72 52.41 11.912 52.134 12.104L52.098 11.42C52.146 11.204 52.308 10.904 52.584 10.52C52.872 10.124 53.286 9.728 53.826 9.332C54.366 8.936 55.044 8.6 55.86 8.324C56.688 8.048 57.666 7.91 58.794 7.91ZM70.5108 3.554V6.254H65.9388V3.554H70.5108ZM66.0648 8.18H70.3848V17H66.0648V8.18Z" fill="currentColor" />
      <path d="M72.63 13.166H74.286C74.322 13.634 74.478 14.06 74.754 14.444C75.042 14.816 75.426 15.11 75.906 15.326C76.398 15.542 76.968 15.65 77.616 15.65C78.18 15.65 78.648 15.572 79.02 15.416C79.392 15.26 79.668 15.05 79.848 14.786C80.04 14.51 80.136 14.186 80.136 13.814C80.136 13.442 80.034 13.148 79.83 12.932C79.626 12.704 79.32 12.518 78.912 12.374C78.504 12.218 78 12.068 77.4 11.924C76.872 11.792 76.35 11.636 75.834 11.456C75.33 11.264 74.862 11.03 74.43 10.754C74.01 10.478 73.668 10.148 73.404 9.764C73.152 9.368 73.026 8.894 73.026 8.342C73.026 7.754 73.188 7.22 73.512 6.74C73.836 6.248 74.31 5.858 74.934 5.57C75.57 5.27 76.338 5.12 77.238 5.12C78.63 5.12 79.68 5.468 80.388 6.164C81.108 6.86 81.456 7.79 81.432 8.954H79.812C79.776 8.138 79.518 7.556 79.038 7.208C78.558 6.848 77.934 6.668 77.166 6.668C76.506 6.668 75.942 6.806 75.474 7.082C75.006 7.346 74.772 7.766 74.772 8.342C74.772 8.594 74.826 8.816 74.934 9.008C75.042 9.188 75.222 9.356 75.474 9.512C75.726 9.668 76.062 9.818 76.482 9.962C76.914 10.106 77.448 10.262 78.084 10.43C78.564 10.538 79.026 10.676 79.47 10.844C79.926 11.012 80.334 11.222 80.694 11.474C81.054 11.726 81.336 12.05 81.54 12.446C81.756 12.842 81.864 13.328 81.864 13.904C81.864 14.516 81.714 15.074 81.414 15.578C81.114 16.07 80.646 16.466 80.01 16.766C79.386 17.054 78.576 17.198 77.58 17.198C76.788 17.198 76.098 17.096 75.51 16.892C74.934 16.688 74.448 16.424 74.052 16.1C73.668 15.776 73.362 15.428 73.134 15.056C72.918 14.684 72.768 14.33 72.684 13.994C72.612 13.658 72.594 13.382 72.63 13.166ZM87.224 17.18C86.456 17.18 85.754 16.982 85.118 16.586C84.482 16.19 83.978 15.644 83.606 14.948C83.234 14.24 83.048 13.43 83.048 12.518C83.048 11.606 83.234 10.802 83.606 10.106C83.99 9.398 84.512 8.846 85.172 8.45C85.832 8.042 86.57 7.838 87.386 7.838C88.286 7.838 88.982 8.048 89.474 8.468C89.978 8.888 90.326 9.452 90.518 10.16C90.722 10.868 90.824 11.654 90.824 12.518C90.824 12.998 90.764 13.508 90.644 14.048C90.524 14.588 90.332 15.098 90.068 15.578C89.804 16.058 89.438 16.448 88.97 16.748C88.502 17.036 87.92 17.18 87.224 17.18ZM87.71 15.686C88.346 15.686 88.88 15.548 89.312 15.272C89.756 14.984 90.086 14.6 90.302 14.12C90.518 13.64 90.626 13.106 90.626 12.518C90.626 11.882 90.512 11.324 90.284 10.844C90.068 10.364 89.738 9.992 89.294 9.728C88.862 9.464 88.334 9.332 87.71 9.332C86.774 9.332 86.048 9.632 85.532 10.232C85.028 10.832 84.776 11.594 84.776 12.518C84.776 13.142 84.902 13.694 85.154 14.174C85.406 14.642 85.748 15.014 86.18 15.29C86.624 15.554 87.134 15.686 87.71 15.686ZM90.626 8.018H92.354V17H90.77C90.77 17 90.758 16.892 90.734 16.676C90.71 16.448 90.686 16.178 90.662 15.866C90.638 15.554 90.626 15.278 90.626 15.038V8.018ZM94.4078 8.018H96.1358V17H94.4078V8.018ZM99.5558 7.838C100.06 7.838 100.516 7.91 100.924 8.054C101.332 8.198 101.68 8.414 101.968 8.702C102.256 8.978 102.478 9.326 102.634 9.746C102.802 10.154 102.886 10.622 102.886 11.15V17H101.176V11.528C101.176 10.82 101.002 10.292 100.654 9.944C100.318 9.584 99.8018 9.404 99.1058 9.404C98.5658 9.404 98.0738 9.53 97.6298 9.782C97.1858 10.034 96.8198 10.37 96.5318 10.79C96.2558 11.198 96.0878 11.66 96.0278 12.176L96.0098 11.186C96.0698 10.706 96.1958 10.262 96.3878 9.854C96.5918 9.446 96.8438 9.092 97.1438 8.792C97.4558 8.48 97.8158 8.246 98.2238 8.09C98.6318 7.922 99.0758 7.838 99.5558 7.838ZM105.164 4.418H106.874V17H105.164V4.418ZM113.354 8.018L108.602 12.536L108.638 11.456L113.696 17H111.518L106.91 11.978L110.96 8.018H113.354ZM118.089 17.18C117.321 17.18 116.619 16.982 115.983 16.586C115.347 16.19 114.843 15.644 114.471 14.948C114.099 14.24 113.913 13.43 113.913 12.518C113.913 11.606 114.099 10.802 114.471 10.106C114.855 9.398 115.377 8.846 116.037 8.45C116.697 8.042 117.435 7.838 118.251 7.838C119.151 7.838 119.847 8.048 120.339 8.468C120.843 8.888 121.191 9.452 121.383 10.16C121.587 10.868 121.689 11.654 121.689 12.518C121.689 12.998 121.629 13.508 121.509 14.048C121.389 14.588 121.197 15.098 120.933 15.578C120.669 16.058 120.303 16.448 119.835 16.748C119.367 17.036 118.785 17.18 118.089 17.18ZM118.575 15.686C119.211 15.686 119.745 15.548 120.177 15.272C120.621 14.984 120.951 14.6 121.167 14.12C121.383 13.64 121.491 13.106 121.491 12.518C121.491 11.882 121.377 11.324 121.149 10.844C120.933 10.364 120.603 9.992 120.159 9.728C119.727 9.464 119.199 9.332 118.575 9.332C117.639 9.332 116.913 9.632 116.397 10.232C115.893 10.832 115.641 11.594 115.641 12.518C115.641 13.142 115.767 13.694 116.019 14.174C116.271 14.642 116.613 15.014 117.045 15.29C117.489 15.554 117.999 15.686 118.575 15.686ZM121.491 8.018H123.219V17H121.635C121.635 17 121.623 16.892 121.599 16.676C121.575 16.448 121.551 16.178 121.527 15.866C121.503 15.554 121.491 15.278 121.491 15.038V8.018ZM125.273 8.018H127.001V17H125.273V8.018ZM130.043 9.548C129.419 9.548 128.885 9.692 128.441 9.98C128.009 10.268 127.661 10.622 127.397 11.042C127.145 11.462 126.977 11.864 126.893 12.248L126.875 11.222C126.887 11.102 126.917 10.916 126.965 10.664C127.025 10.4 127.127 10.106 127.271 9.782C127.415 9.458 127.607 9.152 127.847 8.864C128.087 8.564 128.387 8.318 128.747 8.126C129.107 7.934 129.539 7.838 130.043 7.838V9.548Z" fill="currentColor" />
    </svg>
  );
}

function HomeWordmark({ animateOnce = false }: { animateOnce?: boolean }) {
  return (
    <div style={{ width: "clamp(72px, 18vw, 131px)", maxWidth: "100%", lineHeight: 0 }}>
      <motion.div
        initial={animateOnce ? { clipPath: "inset(0 100% 0 0)", opacity: 0.78, x: -4 } : false}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, x: 0 }}
        transition={animateOnce ? {
          clipPath: { duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
          opacity: { duration: 0.32, ease: "easeOut", delay: 0.08 },
          x: { type: "spring", stiffness: 180, damping: 24, mass: 0.8, delay: 0.08 },
        } : { duration: 0 }}
        style={{ display: "block", overflow: "hidden" }}
      >
        <WordmarkSvg />
      </motion.div>
    </div>
  );
}

// ── Layout mode icons ─────────────────────────────────────────────────────

function LayoutIcon({ id }: { id: LayoutMode }) {
  if (id === "bento") return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="4.5" height="4.5" rx="0.4" fill="currentColor" />
      <rect x="7.5" y="1" width="4.5" height="4.5" rx="0.4" fill="currentColor" />
      <rect x="1" y="7.5" width="4.5" height="4.5" rx="0.4" fill="currentColor" />
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="0.4" fill="currentColor" />
    </svg>
  );
  if (id === "classic") return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="11" height="1.8" rx="0.4" fill="currentColor" />
      <rect x="1" y="5.6" width="11" height="1.8" rx="0.4" fill="currentColor" />
      <rect x="1" y="9.2" width="7" height="1.8" rx="0.4" fill="currentColor" />
    </svg>
  );
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="8" height="1.5" rx="0.4" fill="currentColor" />
      <rect x="2.5" y="5.75" width="6" height="1.5" rx="0.4" fill="currentColor" />
      <rect x="2.5" y="9" width="4" height="1.5" rx="0.4" fill="currentColor" />
    </svg>
  );
}

// ── Desktop controls ──────────────────────────────────────────────────────

function DesktopControls() {
  const { layout, setLayout, colorTheme, setColorTheme } = usePreference();
  const [hoverTheme, setHoverTheme] = useState<ColorTheme | null>(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Theme swatches — tooltip is absolute so it never shifts layout */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 5 }} role="group" aria-label="Colour theme">
        {THEMES.map(t => (
          <button
            key={t.id}
            onClick={() => setColorTheme(t.id)}
            aria-label={t.label + " theme"}
            aria-pressed={colorTheme === t.id}
            onMouseEnter={() => setHoverTheme(t.id)}
            onMouseLeave={() => setHoverTheme(null)}
            style={{
              width: 14, height: 14, borderRadius: "50%", border: "none",
              cursor: "pointer", background: t.bg, padding: 0, flexShrink: 0,
              boxShadow: colorTheme === t.id
                ? "0 0 0 2px var(--foreground), inset 0 0 0 3px " + t.accent
                : "0 0 0 1px var(--border)",
              transition: "box-shadow 0.15s",
            }}
          />
        ))}
        {/* Tooltip — absolutely positioned, never shifts layout */}
        <AnimatePresence>
          {hoverTheme && (
            <motion.div
              key={hoverTheme}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--foreground)",
                color: "var(--primary-foreground)",
                fontSize: 8, letterSpacing: "0.1em",
                padding: "3px 7px",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                zIndex: 100,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {THEMES.find(t => t.id === hoverTheme)?.label.toUpperCase()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 16, background: "var(--border)" }} aria-hidden="true" />

      {/* Layout mode buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 1 }} role="group" aria-label="Layout mode">
        {(["bento", "classic", "focus"] as LayoutMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setLayout(mode)}
            aria-pressed={layout === mode}
            aria-label={mode + " layout"}
            title={mode.charAt(0).toUpperCase() + mode.slice(1)}
            className="ep-button ep-button-tertiary ep-button-sm"
            style={{
              display: "flex", alignItems: "center", gap: 5,
              cursor: "pointer",
              background: layout === mode ? "var(--button-primary-bg)" : undefined,
              color: layout === mode ? "var(--button-primary-fg)" : undefined,
              borderColor: layout === mode ? "var(--button-primary-border)" : undefined,
            }}
          >
            <LayoutIcon id={mode} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Mobile overlay menu ───────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { layout, setLayout, colorTheme, setColorTheme } = usePreference();
  const navigate = useNavigate();
  const location = useLocation();
  const overlayBackground = "var(--card)";
  const overlayMuted = "color-mix(in srgb, var(--muted-foreground) 82%, var(--foreground) 18%)";
  const overlaySubtle = "color-mix(in srgb, var(--muted-foreground) 54%, transparent)";
  const overlayRule = "color-mix(in srgb, var(--border) 88%, transparent)";
  const overlayStrong = "color-mix(in srgb, var(--foreground) 92%, transparent)";

  function handleLink(href: string) {
    onClose();
    navigate(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu-overlay"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22 }}
          style={{
            background: overlayBackground,
            height: "100dvh",
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "auto minmax(0, 1fr) auto",
            paddingBottom: "max(20px, env(safe-area-inset-bottom))",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <Link
              to="/"
              onClick={onClose}
              aria-label="Go to home page"
              style={{ color: overlayMuted, textDecoration: "none", display: "inline-flex", alignItems: "center", maxWidth: "min(42vw, 131px)" }}
            >
              <HomeWordmark />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{ background: "none", border: "none", cursor: "pointer", color: overlayMuted, padding: 8 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" style={{ minHeight: 0, overflowY: "auto" }}>
            {PRIMARY_NAV_LINKS.map((link, i) => {
              const active = isNavLinkActive(location.pathname, link.to);

              return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + i * 0.06 }}
              >
                <button
                  onClick={() => handleLink(link.to)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "clamp(26px, 8vw, 44px)", fontWeight: 600,
                    letterSpacing: "-0.02em", lineHeight: 1.15,
                    color: active ? "var(--accent)" : overlayStrong,
                    fontFamily: "'Inter', sans-serif",
                    padding: "10px 0",
                    borderBottom: `1px solid ${overlayRule}`,
                  }}
                >
                  {link.label}
                </button>
              </motion.div>
              );
            })}
          </nav>

          {/* Layout + theme controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            style={{
              marginTop: 20,
              paddingTop: 14,
              borderTop: `1px solid ${overlayRule}`,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {/* Layout switcher */}
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.18em", color: overlaySubtle, fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>LAYOUT</p>
              <div style={{ display: "flex", gap: 6 }}>
                {(["bento", "classic", "focus"] as LayoutMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => { setLayout(mode); onClose(); }}
                    aria-pressed={layout === mode}
                    className={`ep-button ${layout === mode ? "ep-button-primary" : "ep-button-tertiary"} ep-button-sm`}
                    style={{ cursor: "pointer" }}
                  >
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme switcher */}
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.18em", color: overlaySubtle, fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>THEME</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setColorTheme(t.id)}
                    aria-label={t.label}
                    aria-pressed={colorTheme === t.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "none", border: "none", cursor: "pointer",
                      color: colorTheme === t.id ? "var(--foreground)" : overlayMuted,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9, letterSpacing: "0.1em",
                      padding: 0, transition: "color 0.15s",
                    }}
                  >
                    <span style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: t.bg, flexShrink: 0, display: "inline-block",
                      boxShadow: colorTheme === t.id
                        ? "0 0 0 2px color-mix(in srgb, var(--foreground) 55%, transparent), inset 0 0 0 2px " + t.accent
                        : "0 0 0 1px color-mix(in srgb, var(--foreground) 18%, transparent)",
                    }} />
                    {t.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main SiteNav ──────────────────────────────────────────────────────────

export type SiteNavVariant = "home" | "page" | "casestudy";

interface SiteNavProps {
  variant?: SiteNavVariant;
  title?: string;
}

function getHeaderHomeHref() {
  return "/";
}

export function SiteNav({ variant = "home", title }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateHomeWordmark, setAnimateHomeWordmark] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const location = useLocation();
  const homeHref = getHeaderHomeHref();
  const showCaseStudyBackLink = variant === "casestudy";
  const previousSection = getSectionForPath(previousPath);

  useEffect(() => {
    if (location.pathname !== "/") {
      setAnimateHomeWordmark(false);
      return;
    }

    try {
      const hasRevealed = window.sessionStorage.getItem(HOME_LOGO_REVEAL_KEY) === "1";
      if (!hasRevealed) {
        setAnimateHomeWordmark(true);
        window.sessionStorage.setItem(HOME_LOGO_REVEAL_KEY, "1");
        return;
      }
    } catch {
      setAnimateHomeWordmark(true);
      return;
    }

    setAnimateHomeWordmark(false);
  }, [location.pathname]);

  useEffect(() => {
    try {
      const storedPath = window.sessionStorage.getItem(PREVIOUS_PATH_KEY);
      setPreviousPath(storedPath && storedPath !== location.pathname ? storedPath : null);
      window.sessionStorage.setItem(PREVIOUS_PATH_KEY, location.pathname);
    } catch {
      setPreviousPath(null);
    }
  }, [location.pathname]);

  return (
    <>
      <header
        className="border-b border-border sticky top-0 z-50"
        style={{ background: "var(--background)", height: 52 }}
      >
        <div
          className="site-container site-nav-grid"
          style={{ height: "100%", display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)", alignItems: "center", gap: 16 }}
        >
          {/* Left */}
          <div className="site-nav-left" style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0, justifySelf: "start", alignSelf: "stretch" }}>
            <Link
              to={homeHref}
              aria-label="Go to home page"
              className="hover:text-foreground transition-colors"
              style={{ color: "var(--muted-foreground)", textDecoration: "none", flexShrink: 1, display: "inline-flex", alignItems: "center", maxWidth: "min(100%, 131px)" }}
            >
              <HomeWordmark animateOnce={animateHomeWordmark} />
            </Link>
            {showCaseStudyBackLink ? (
              <>
                <span
                  aria-hidden="true"
                  className="hidden-mobile"
                  style={{ width: 1, height: "100%", background: "var(--border)", flexShrink: 0 }}
                />
                <Link
                  to={previousSection.href}
                  className="hidden-mobile hover:text-foreground transition-colors"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    color: "var(--foreground)",
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  ← {previousSection.label}
                </Link>
              </>
            ) : null}
          </div>

          {/* Centre — desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden-mobile"
            style={{ display: "flex", alignItems: "center", gap: 28, justifySelf: "center" }}
          >
            {PRIMARY_NAV_LINKS.map((link) => {
              const active = isNavLinkActive(location.pathname, link.to);

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className="hover:text-foreground transition-colors"
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontSize: 12,
                    color: active ? "var(--accent)" : "var(--muted-foreground)",
                    fontWeight: active ? 600 : 400,
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="site-nav-right" style={{ display: "flex", alignItems: "center", gap: 12, justifySelf: "end" }}>
            <div className="hidden-mobile">
              <DesktopControls />
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="show-mobile"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--foreground)", padding: 6, display: "none",
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path d="M0 1h18M0 7h18M0 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
