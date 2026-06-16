import { usePreference } from "../context/PreferenceContext";
import { BentoLandingPage } from "./BentoLandingPage";
import { LandingPage } from "./LandingPage";
import { FocusLandingPage } from "./FocusLandingPage";

export function HomePage() {
  const { layout } = usePreference();

  if (layout === "classic") return <LandingPage />;
  if (layout === "focus")   return <FocusLandingPage />;
  return <BentoLandingPage />;
}
