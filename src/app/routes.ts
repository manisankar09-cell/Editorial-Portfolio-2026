import { createBrowserRouter } from "react-router";
import { Root } from "./Root";

const lazyHomePage = async () => {
  const { HomePage } = await import("./pages/HomePage");
  return { Component: HomePage };
};

const lazyAboutPage = async () => {
  const { AboutPage } = await import("./pages/AboutPage");
  return { Component: AboutPage };
};

const lazyEPLibraryPage = async () => {
  const { EPLibraryPage } = await import("./pages/EPLibraryPage");
  return { Component: EPLibraryPage };
};

const lazyWorkPage = async () => {
  const { WorkPage } = await import("./pages/WorkPage");
  return { Component: WorkPage };
};

const lazyCXPCaseStudyPage = async () => {
  const { CXPCaseStudyPage } = await import("./pages/CXPCaseStudyPage");
  return { Component: CXPCaseStudyPage };
};

const lazyTimeTrackingPage = async () => {
  const { TimeTrackingPage } = await import("./pages/TimeTrackingPage");
  return { Component: TimeTrackingPage };
};

const lazyComingSoonPage = async () => {
  const { ComingSoonPage } = await import("./pages/ComingSoonPage");
  return { Component: ComingSoonPage };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        lazy: lazyHomePage,
      },
      {
        path: "about",
        lazy: lazyAboutPage,
      },
      ...(import.meta.env.DEV
        ? [
            {
              path: "ep-library",
              lazy: lazyEPLibraryPage,
            },
          ]
        : []),
      {
        path: "cxp-design-system",
        lazy: lazyCXPCaseStudyPage,
      },
      {
        path: "time-tracking-agent",
        lazy: lazyTimeTrackingPage,
      },
      {
        path: "contextual-ai-workflows",
        lazy: lazyComingSoonPage,
      },
      {
        path: "work",
        children: [
          {
            index: true,
            lazy: lazyWorkPage,
          },
          {
            path: "cxp-design-system",
            lazy: lazyComingSoonPage,
          },
          {
            path: "time-tracking-agent",
            lazy: lazyComingSoonPage,
          },
          {
            path: "contextual-ai-workflows",
            lazy: lazyComingSoonPage,
          },
          {
            path: "copilot-insight-driven-workflows-cai",
            lazy: lazyComingSoonPage,
          },
        ],
      },
    ],
  },
]);
