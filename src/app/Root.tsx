import { Outlet } from "react-router";
import { PreferenceProvider } from "./context/PreferenceContext";

export function Root() {
  return (
    <PreferenceProvider>
      <Outlet />
    </PreferenceProvider>
  );
}
