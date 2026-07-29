import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { PreferenceProvider } from "./context/PreferenceContext";

export function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <PreferenceProvider>
      <Outlet />
    </PreferenceProvider>
  );
}
