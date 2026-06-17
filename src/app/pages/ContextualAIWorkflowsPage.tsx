import { ProjectPagination } from "../components/CaseStudyNav";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import caiHomeImage from "../../imports/CAI Home.png";
import caiListDetailImage from "../../imports/slide-05.png";
import caiFilteringImage from "../../imports/slide-06.png";
import caiGridLayoutImage from "../../imports/Grid layout.png";
import caiExistingImage from "../../imports/Existing.png";
import caiDesignGuidelineImage from "../../imports/Design Guideline.png";
import "../../styles/contextual-ai-case-study.css";

const ROLE_COMPARISON = [
  {
    role: "ATU — Account Team Unit",
    points: [
      "Owns broad customer relationship",
      "Works across accounts and solution areas",
      "Needs flexible filters and account-level visibility",
    ],
  },
  {
    role: "STU — Specialist Team Unit",
    points: [
      "Deep solution-area specialist",
      "Focuses on specific solution opportunities",
      "Needs targeted, pre-filtered recommendations",
    ],
  },
];

const PROBLEMS = [
  {
    index: "Problem 01",
    title: "Limited visibility",
    body: "Carousel surfaced only a few cards, while most opportunities stayed hidden behind extra clicks.",
  },
  {
    index: "Problem 02",
    title: "Unbalanced prioritization",
    body: "Revenue-first ordering repeatedly pushed the same solution areas forward and buried others.",
  },
  {
    index: "Problem 03",
    title: "Poor discoverability",
    body: "Missing filters and sorting made it difficult to narrow recommendations by role and account context.",
  },
  {
    index: "Problem 04",
    title: "Weak decision support",
    body: "Reasons to Believe and Next Best Action were present, but easy to miss in deeper states.",
  },
];

const FILTERS = ["Solution Area", "Solution Play", "TPID", "Revenue"];
const SORTS = ["Estimated revenue", "Account", "Opportunity priority"];

const IMPACT = [
  {
    metric: "+200%",
    title: "increase in recommendation actions",
    body: "Users moved from browsing recommendations to taking action.",
  },
  {
    metric: "+400%",
    title: "improvement in workflow visibility",
    body: "Critical opportunities became easier to discover.",
  },
  {
    metric: "33%",
    title: "adoption in early rollout",
    body: "Validated the need for AI-guided opportunity discovery.",
  },
  {
    metric: "~5x",
    title: "increase in partner co-sell conversion potential",
    body: "Better surfaced recommendations contributed to higher-value seller engagement.",
  },
];

const FILTER_FEATURES = [
  {
    title: "Comprehensive filtering",
    body: "New filters allow sellers to narrow recommendations by solution area, sales scenario, and customer accounts for more precise targeting.",
  },
  {
    title: "Enhanced sorting",
    body: "Sorting by estimated revenue helps prioritize opportunities quickly, with room to expand toward account and date-based views as the system grows.",
  },
  {
    title: "Improved user efficiency",
    body: "Role-aware views reduce search time and increase action on recommendations by aligning the experience to how sellers already work.",
  },
];

const ROLE_CARDS = [
  {
    n: "01",
    title: "Interaction Model Design",
    desc: "Defined the end-to-end recommendation workflow by shifting carousel browsing into a scalable list-detail model for decision-first selling.",
  },
  {
    n: "02",
    title: "Decision Support Patterns",
    desc: "Designed filtering, sorting, Reasons to Believe, and Next Best Action patterns to make AI recommendations easier to evaluate and act on.",
  },
  {
    n: "03",
    title: "Cross-functional Delivery",
    desc: "Aligned product, design, and engineering stakeholders through structured artifacts and prototype flows to support rollout and adoption.",
  },
];

function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="cai-section-heading">
      <p className="cai-section-heading__index">{index}</p>
      <h2 className="cai-section-heading__title">{title}</h2>
      {subtitle ? <p className="cai-section-heading__subtitle">{subtitle}</p> : null}
    </header>
  );
}

export function ContextualAIWorkflowsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground cai-page">
      <SiteNav variant="casestudy" title="ContextualAI Workflows" />

      <main className="cai-page__main">
        <div className="cai-page__container">
          <section className="cai-hero" id="top">
            <div className="cai-grid cai-hero__grid">
              <article className="cai-hero__content">
                <p className="cai-kicker">02 - Contextual AI Workflows</p>
                <p className="cai-hero__subtitle">
                  Designing decision systems for AI-driven opportunity discovery
                </p>
                <p className="cai-hero__description">
                  I redesigned the CAI Homepage cross-sell and upsell recommendation experience to help sellers discover,
                  prioritize, and act on AI-generated opportunities with more clarity and confidence.
                </p>

                <div className="cai-hero__tags" aria-label="Project tags">
                  <span className="ep-tag">Copilot</span>
                  <span className="ep-tag">AI UX</span>
                  <span className="ep-tag">Agentic Workflow</span>
                </div>

              </article>

              <aside className="cai-hero__visual" aria-label="CAI homepage low-fidelity wireframe">
                <div className="cai-mock-home cai-mock-home--lofi">
                  <div className="cai-wireframe-window">
                    <div className="cai-wireframe-window__chrome" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <p>LOFI CAI HOME</p>
                    </div>

                    <div className="cai-wireframe-window__body">
                      <aside className="cai-wireframe-nav" aria-hidden="true">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                      </aside>

                      <section className="cai-wireframe-main">
                        <header className="cai-wireframe-topbar" aria-hidden="true">
                          <span className="cai-wireframe-dot" />
                          <span className="cai-wireframe-line cai-wireframe-line--md" />
                          <span className="cai-wireframe-line cai-wireframe-line--lg" />
                        </header>

                        <article className="cai-wireframe-panel" aria-hidden="true">
                          <div className="cai-wireframe-panel__head">
                            <svg
                              className="cai-wireframe-panel__copilot"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.6692 1.98972C11.4685 1.39807 10.9132 1 10.2885 1L9.38797 1C8.68687 1 8.08506 1.49905 7.95529 2.18803L7.02399 7.13282L7.48701 5.54883C7.66871 4.92722 8.23869 4.5 8.88631 4.5L11.7651 4.5L13.0096 6.12858L14.1176 4.5L13.5654 4.5C12.9406 4.5 12.3853 4.10193 12.1847 3.51027L11.6692 1.98972Z"
                                fill="url(#paint0_radial_copilot_icon)"
                              />
                              <path
                                d="M4.50315 14.0036C4.70173 14.5987 5.25872 15 5.88604 15H7.35227C8.14805 15 8.7968 14.3619 8.80993 13.5662L8.88307 9.13477L8.49774 10.4516C8.3159 11.073 7.74601 11.5 7.09855 11.5L4.20863 11.5L2.97828 10.4147L2.07037 11.5H2.61725C3.24457 11.5 3.80155 11.9013 4.00014 12.4964L4.50315 14.0036Z"
                                fill="url(#paint1_radial_copilot_icon)"
                              />
                              <path
                                d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
                                fill="url(#paint2_radial_copilot_icon)"
                              />
                              <path
                                d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
                                fill="url(#paint3_linear_copilot_icon)"
                              />
                              <path
                                d="M5.99957 14.9999H11.8325C13.499 14.9999 14.4989 12.7978 15.1655 10.5957C15.9553 7.98677 16.9887 4.49756 13.999 4.49756H11.3097C10.658 4.49756 10.086 4.92836 9.90692 5.55496C9.47868 7.05365 8.67692 9.8477 8.05205 11.9562C7.74573 12.9899 7.49057 13.8776 7.09897 14.4304C6.87943 14.7404 6.51352 14.9999 5.99957 14.9999Z"
                                fill="url(#paint4_radial_copilot_icon)"
                              />
                              <path
                                d="M5.99957 14.9999H11.8325C13.499 14.9999 14.4989 12.7978 15.1655 10.5957C15.9553 7.98677 16.9887 4.49756 13.999 4.49756H11.3097C10.658 4.49756 10.086 4.92836 9.90692 5.55496C9.47868 7.05365 8.67692 9.8477 8.05205 11.9562C7.74573 12.9899 7.49057 13.8776 7.09897 14.4304C6.87943 14.7404 6.51352 14.9999 5.99957 14.9999Z"
                                fill="url(#paint5_linear_copilot_icon)"
                              />
                              <defs>
                                <radialGradient
                                  id="paint0_radial_copilot_icon"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientTransform="matrix(-4.01994 -5.00476 -4.34022 4.19783 13.0847 7.1729)"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.0955758" stopColor="#00AEFF" />
                                  <stop offset="0.773185" stopColor="#2253CE" />
                                  <stop offset="1" stopColor="#0736C4" />
                                </radialGradient>
                                <radialGradient
                                  id="paint1_radial_copilot_icon"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientTransform="matrix(3.56222 4.42321 4.20512 -3.61031 3.30634 11.0661)"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#FFB657" />
                                  <stop offset="0.633728" stopColor="#FF5F3D" />
                                  <stop offset="0.923392" stopColor="#C02B3C" />
                                </radialGradient>
                                <radialGradient
                                  id="paint2_radial_copilot_icon"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientTransform="matrix(-0.528444 -9.30665 52.2779 -2.96789 4.023 11.4998)"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.03" stopColor="#FFC800" />
                                  <stop offset="0.31" stopColor="#98BD42" />
                                  <stop offset="0.49" stopColor="#52B471" />
                                  <stop offset="0.843838" stopColor="#0D91E1" />
                                </radialGradient>
                                <linearGradient
                                  id="paint3_linear_copilot_icon"
                                  x1="4.54577"
                                  y1="1"
                                  x2="5.00014"
                                  y2="11.5035"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#3DCBFF" />
                                  <stop offset="0.246674" stopColor="#0588F7" stopOpacity="0" />
                                </linearGradient>
                                <radialGradient
                                  id="paint4_radial_copilot_icon"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientTransform="matrix(-4.60802 13.1726 -15.6828 -5.81373 14.2986 3.4693)"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.0661714" stopColor="#8C48FF" />
                                  <stop offset="0.5" stopColor="#F2598A" />
                                  <stop offset="0.895833" stopColor="#FFB152" />
                                </radialGradient>
                                <linearGradient
                                  id="paint5_linear_copilot_icon"
                                  x1="14.7594"
                                  y1="3.85637"
                                  x2="14.7534"
                                  y2="6.71683"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.0581535" stopColor="#F8ADFA" />
                                  <stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="cai-wireframe-panel__title">For Your Immediate Action (6)</span>
                            <span className="cai-wireframe-line cai-wireframe-line--xs" />
                            <span className="cai-wireframe-line cai-wireframe-line--xs" />
                            <span className="cai-wireframe-panel__dot" />
                          </div>

                          <div className="cai-wireframe-grid">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <article key={index} className="cai-wireframe-tile">
                                <span className="cai-wireframe-chip" />
                                <span className="cai-wireframe-line cai-wireframe-line--tile" />
                              </article>
                            ))}
                          </div>
                        </article>
                      </section>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section id="overview" className="cai-section cai-section--summary">
            <SectionHeading index="CONTEXT & OVERVIEW" title="Project overview" />
            <p className="cai-section-text" style={{ maxWidth: 980 }}>
              <strong>Contextual AI Workflows</strong> reimagined how sellers discover and act on AI-driven
              opportunities. By redesigning the CAI Homepage, recommendation architecture, and Cross-sell/Upsell
              workflows, the experience transformed fragmented signals into clear next-best actions—improving
              discoverability, increasing recommendation engagement, and creating a more scalable decision-support
              system for enterprise sales teams.
            </p>
            <ul className="cai-structured-list" style={{ maxWidth: 980, marginTop: 16 }}>
              <li>
                <strong>Upsell:</strong> Encourages customers to expand or upgrade products they already use.
              </li>
              <li>
                <strong>Cross-sell:</strong> Surfaces related products or services that complement the customer&apos;s
                current footprint.
              </li>
            </ul>
          </section>

          <section className="cai-section">
            <SectionHeading index="ROLE & CONTRIBUTION" title="My Role & Contribution" />
            <div className="cai-role-contrib-grid">
              {ROLE_CARDS.map((card) => (
                <article key={card.n} className="cai-role-contrib-card">
                  <span className="cai-role-contrib-card__n">{card.n}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="PROBLEM & NEED"
              title="Why this mattered"
              subtitle="Information existed. Action did not."
            />
            <div className="cai-editorial-split">
              <article>
                <p>
                  Cross-sell and upsell opportunities were already being generated, but sellers needed a better way to
                  find, understand, and act on them. The experience needed to move from passive recommendation display
                  to active decision support.
                </p>
                <p className="cai-key-point">
                  The core design problem was not generating more recommendations. It was making the right
                  recommendation easier to discover, trust, and act on.
                </p>
              </article>
              <div className="cai-before-after" aria-label="before and after recommendation flow">
                <div>
                  <h3>Before</h3>
                  <p>Recommendations exist</p>
                  <p>→ hidden in experience</p>
                  <p>→ seller misses action</p>
                </div>
                <div>
                  <h3>After</h3>
                  <p>Recommendations surfaced</p>
                  <p>→ explained</p>
                  <p>→ seller acts</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="USERS & ROLES"
              title="Users and roles"
              subtitle="Designing for two seller mindsets"
            />
            <div className="cai-persona-grid">
              {ROLE_COMPARISON.map((item) => (
                <article key={item.role} className="cai-card cai-card--persona">
                  <h3>{item.role}</h3>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="cai-insight-line">
              The same recommendation system needed to support both broad account strategy and specialist execution.
            </p>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="CHALLENGES & GAPS"
              title="Existing experience challenges"
              subtitle="Recommendations were hidden in plain sight."
            />
            <div className="cai-problem-layout">
              <article className="cai-structured-panel cai-structured-panel--clean">
                <p className="cai-structured-lead">
                  The original recommendation carousel introduced AI opportunities, but made it hard for sellers to
                  compare options, prioritize quickly, and act confidently.
                </p>
                <p className="cai-structured-label">Key challenges</p>
                <ul className="cai-structured-list">
                  {PROBLEMS.map((problem) => (
                    <li key={problem.title}>
                      <strong>{problem.title}:</strong> {problem.body}
                    </li>
                  ))}
                </ul>
                <blockquote className="cai-structured-quote">
                  The issue was not recommendation quality. The issue was decision visibility.
                </blockquote>
              </article>

              <div className="cai-annotated-mock" aria-label="existing carousel experience annotated">
                <div className="cai-annotated-mock__screen">
                  <p className="cai-annotated-mock__before-tag">Before design version</p>
                  <img
                    className="cai-annotated-mock__image"
                    src={caiExistingImage}
                    alt="Before design version showing carousel-based recommendation feed"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="cai-section cai-section--pre-hypothesis">
            <SectionHeading
              index="PROACTIVE AI SURFACE"
              title="Contextual AI Homepage design"
              subtitle="A proactive CopilotHome drawer for contextual, action-ready assistance"
            />
            <div className="cai-homepage-spotlight__meta">
              <p className="cai-section-text cai-homepage-spotlight__intro">
                The Contextual AI Homepage is an AI-powered insights drawer that surfaces recommendations, actions, and
                upcoming events tied to the user&apos;s current work context. It centralizes Copilot-driven assistance so
                users can quickly see what needs attention, what changed, and what&apos;s next without leaving their workflow.
              </p>
              <ul className="cai-homepage-spotlight__points">
                <li>Centralized entry point for AI guidance</li>
                <li>Live context from current account and workflow state</li>
                <li>Recommendations linked to immediate next actions</li>
              </ul>
              <div className="cai-homepage-spotlight__chips" aria-label="homepage design characteristics">
                <span className="ep-tag">Proactive</span>
                <span className="ep-tag">Contextual</span>
                <span className="ep-tag">Action-ready</span>
                <span className="ep-tag ep-tag-subtle">CopilotHome Pattern</span>
              </div>
            </div>
            <div className="cai-homepage-spotlight" aria-label="contextual ai homepage design">
              <img
                className="cai-homepage-spotlight__image"
                src={caiHomeImage}
                alt="Contextual AI Homepage drawer showing recommendations, actions, and upcoming events"
              />
            </div>
          </section>

          <section className="cai-section cai-section--hypothesis">
            <div className="cai-highlight-panel">
              <SectionHeading index="HYPOTHESIS & SHIFT" title="Design hypothesis" />
              <p className="cai-highlight-eyebrow">Pivot moment</p>
              <p className="cai-highlight-quote">
                What if recommendations behaved more like a work queue than a carousel?
              </p>
              <p className="cai-highlight-statement">
                A seller should be able to scan, filter, compare, and act on recommendations the same way they work
                through high-priority tasks.
              </p>
            </div>
          </section>

          <section className="cai-section cai-section--hypothesis-extension">
            <SectionHeading
              index="MODEL & WORKFLOW"
              title="List-detail interaction model"
              subtitle="From browsing cards to working through decisions"
            />
            <p className="cai-section-text">
              The redesign uses a list-detail model with a prioritized recommendation list on the left and a selected
              decision panel on the right, so sellers can scan quickly while still getting the context needed to act.
            </p>
            <div className="cai-list-detail-mock" aria-label="list detail architecture">
              <img
                className="cai-list-detail-mock__image"
                src={caiListDetailImage}
                alt="List-detail recommendation workflow showing prioritized recommendation list, decision context, and action area"
              />
              <div className="cai-list-detail-mock__shift" aria-label="before and after workflow comparison">
                <div className="cai-shift-grid">
                  <article className="cai-shift-card cai-shift-card--before">
                    <h3>Before</h3>
                    <ul>
                      <li>Carousel</li>
                      <li>Hidden cards</li>
                      <li>Low scanability</li>
                      <li>Limited control</li>
                    </ul>
                  </article>
                  <article className="cai-shift-card cai-shift-card--after">
                    <h3>After</h3>
                    <ul>
                      <li>List-detail view</li>
                      <li>Visible queue</li>
                      <li>Filters and sorting</li>
                      <li>Clear action path</li>
                    </ul>
                  </article>
                </div>
                <p className="cai-shift-note">From passive recommendation display to active decision workflow.</p>
              </div>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="FILTERS & SORTING"
              title="Filtering and sorting"
              subtitle="Helping sellers find the right opportunity faster"
            />
            <div className="cai-walkthrough-grid">
              <article className="cai-structured-panel cai-structured-panel--clean">
                <p className="cai-structured-lead">
                  Filtering gave sellers a way to narrow opportunity discovery based on role, account context, and
                  selling motion.
                </p>
                <p className="cai-structured-label">Key capabilities</p>
                <ul className="cai-structured-list">
                  {FILTER_FEATURES.map((feature) => (
                    <li key={feature.title}>
                      <strong>{feature.title}:</strong> {feature.body}
                    </li>
                  ))}
                </ul>
              </article>
              <div className="cai-product-mock">
                <img
                  className="cai-product-mock__image cai-product-mock__image--short"
                  src={caiFilteringImage}
                  alt="Filtering and sorting experience showing chip-based controls and refined recommendation discovery"
                />
              </div>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="TRUST & DECISION"
              title="Designing for decision confidence"
              subtitle="Helping sellers act, not just browse"
            />
            <div className="cai-confidence-grid">
              <article className="cai-card">
                <h3>Reasons to Believe</h3>
                <p>
                  Evidence-forward modules clarified why a recommendation was relevant through account signals,
                  relationship context, and opportunity rationale.
                </p>
                <div className="cai-confidence-points">
                  <span>Recent product adoption trend</span>
                  <span>Partner engagement signal</span>
                  <span>Account plan alignment</span>
                </div>
              </article>
              <article className="cai-card">
                <h3>Next Best Action</h3>
                <p>
                  Action guidance translated recommendation insight into concrete seller steps, reducing hesitation and
                  improving follow-through.
                </p>
                <div className="cai-confidence-points">
                  <span>Suggested outreach owner</span>
                  <span>Recommended sequence and timing</span>
                  <span>Linked follow-up artifact</span>
                </div>
              </article>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading index="RESPONSIVE & LAYOUT" title="Responsive layout strategy" />
            <div className="cai-responsive-layout">
              <div className="cai-responsive-layout__stack">
                <article className="cai-card">
                  <h3>Desktop</h3>
                  <p>12-column layout with list-detail split, annotation sidecars, and dense decision context.</p>
                </article>
                <article className="cai-card">
                  <h3>Tablet</h3>
                  <p>Stacked decision panels with persistent filter row and reduced chrome for focus.</p>
                </article>
              </div>
              <div className="cai-product-mock cai-responsive-layout__visual">
                <img
                  className="cai-product-mock__image cai-product-mock__image--short"
                  src={caiGridLayoutImage}
                  alt="Responsive grid layout showing desktop and tablet behavior"
                />
              </div>
            </div>
          </section>

          <section className="cai-section cai-section--guideline-break">
            <SectionHeading index="SYSTEM THINKING" title="Scaling Beyond the Feature" />
            <div className="cai-guideline-break">
              <article className="cai-guideline-break__copy">
                <p className="cai-structured-lead">
                  To scale CAI, I created a simple design guideline system.
                </p>
                <ul className="cai-structured-list">
                  <li>Standard recommendation pattern</li>
                  <li>Decision confidence framework</li>
                  <li>Reusable interaction models</li>
                  <li>Shared playbook for design and PM</li>
                </ul>
                <div className="cai-guideline-global" aria-label="global component scope">
                  <span>Global Component</span>
                  <span>Multi-tool</span>
                  <span>Multi-workflow</span>
                </div>
              </article>
              <div className="cai-guideline-break__visual">
                <img
                  className="cai-guideline-break__image"
                  src={caiDesignGuidelineImage}
                  alt="Design Guideline reference showing reusable CAI interaction and content patterns"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="cai-impact" id="impact">
          <div className="cai-page__container">
            <SectionHeading
              index="IMPACT & OUTCOMES"
              title="Impact and outcomes"
              subtitle="Turning recommendation visibility into seller action"
            />
            <div className="cai-impact__grid">
              {IMPACT.map((item) => (
                <article key={`${item.metric}-${item.title}`} className="cai-impact__card">
                  <p className="cai-impact__metric">{item.metric}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="cai-page__container">
          <section id="reflection" className="cai-section" style={{ paddingTop: 96, paddingBottom: 96 }}>
            <div className="mx-auto" style={{ maxWidth: 760 }}>
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 20,
                }}
              >
                WHAT I LEARNED
              </p>
              <h2
                style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 32,
                }}
              >
                Reflection
              </h2>
              <div style={{ width: 40, height: 2, background: "var(--accent)", opacity: 0.4, marginBottom: 32 }} />
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  fontFamily: "'Inter', sans-serif",
                  color: "var(--foreground)",
                  marginBottom: 24,
                }}
              >
                This project reinforced that design systems are not just libraries of components — they are operating
                models for scale. By connecting foundations, patterns, AI surfaces, and engineering workflows, the
                system helped teams move faster while maintaining consistency, accessibility, and product quality.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  fontFamily: "'Inter', sans-serif",
                  color: "var(--muted-foreground)",
                }}
              >
                It also shaped my perspective on designing for AI: the future is not just smarter interfaces, but
                adaptable systems that understand context and drive meaningful action.
              </p>
            </div>
          </section>

        </div>
      </main>

      <ProjectPagination currentSlug="contextual-ai-workflows" />
      <SiteFooter />
    </div>
  );
}
