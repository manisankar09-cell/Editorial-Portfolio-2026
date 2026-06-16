import { createContext, useContext, useEffect, useState } from "react";

export type LayoutMode = "bento" | "classic" | "focus";
export type ColorTheme = "paper" | "slate" | "dusk";

interface PreferenceState {
  layout: LayoutMode;
  colorTheme: ColorTheme;
  /** Derived: true when layout === "focus". Read-only. */
  a11y: boolean;
  setLayout: (l: LayoutMode) => void;
  setColorTheme: (t: ColorTheme) => void;
}

const PreferenceContext = createContext<PreferenceState>({
  layout: "bento",
  colorTheme: "paper",
  a11y: false,
  setLayout: () => {},
  setColorTheme: () => {},
});

export function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>(() => {
    try {
      const stored = localStorage.getItem("msc-layout") as LayoutMode;
      return (["bento", "classic", "focus"] as LayoutMode[]).includes(stored) ? stored : "bento";
    } catch { return "bento"; }
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    try {
      const stored = localStorage.getItem("msc-theme") as ColorTheme;
      // migrate old "parchment"/"simple" values
      if (stored === ("parchment" as string)) return "paper";
      return (["paper", "slate", "dusk"] as ColorTheme[]).includes(stored) ? stored : "paper";
    } catch { return "paper"; }
  });

  // focus mode = accessibility mode
  const a11y = layout === "focus";

  const setLayout = (l: LayoutMode) => {
    setLayoutState(l);
    try { localStorage.setItem("msc-layout", l); } catch {}
  };

  const setColorTheme = (t: ColorTheme) => {
    setColorThemeState(t);
    try { localStorage.setItem("msc-theme", t); } catch {}
  };

  // Sync a11y CSS class
  useEffect(() => {
    const html = document.documentElement;
    if (a11y) html.classList.add("a11y-mode");
    else html.classList.remove("a11y-mode");
  }, [a11y]);

  // Sync color theme via data-theme attribute
  useEffect(() => {
    const html = document.documentElement;
    if (colorTheme === "paper") html.removeAttribute("data-theme");
    else html.setAttribute("data-theme", colorTheme);
  }, [colorTheme]);

  // Respect OS prefers-reduced-motion → switch to focus
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && layout !== "focus") setLayoutState("focus");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) { setLayoutState("focus"); try { localStorage.setItem("msc-layout", "focus"); } catch {} }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PreferenceContext.Provider value={{ layout, colorTheme, a11y, setLayout, setColorTheme }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreference() {
  return useContext(PreferenceContext);
}
