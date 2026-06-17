import { Link } from "react-router";
import { ProjectPagination } from "../components/CaseStudyNav";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import caiHomeImage from "../../imports/CAI Home.png";
import caiListDetailImage from "../../imports/slide-05.png";
import caiFilteringImage from "../../imports/slide-06.png";
import caiGridLayoutImage from "../../imports/Grid layout.png";
import caiExistingImage from "../../imports/Existing.png";
import "../../styles/contextual-ai-case-study.css";

const WHY_CARDS = [
  {
    title: "What changed",
    body: "From recommendation carousel to scalable list-detail discovery.",
  },
  {
    title: "Who it served",
    body: "ATU sellers needing account-wide visibility and STU sellers needing focused solution-area recommendations.",
  },
  {
    title: "Why it mattered",
    body: "Better discovery, prioritization, and actionability for cross-sell and upsell opportunities.",
  },
];

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
    title: "Improved discoverability",
    body: "Recommendations became easier to browse and filter.",
  },
  {
    title: "Faster prioritization",
    body: "Sellers could identify relevant opportunities more quickly.",
  },
  {
    title: "Better actionability",
    body: "Reasons to Believe and Next Best Action made recommendations more useful.",
  },
  {
    title: "Balanced visibility",
    body: "The redesigned structure reduced over-reliance on a few visible carousel cards.",
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

const RESPONSIBILITIES = [
  "Defined the recommendation discovery experience",
  "Reframed carousel browsing into a scalable list-detail model",
  "Designed filtering and sorting interactions",
  "Created decision-support patterns for Reasons to Believe and Next Best Action",
  "Aligned the experience to ATU and STU seller needs",
  "Produced design artifacts and prototype flows for stakeholder review",
];

const SYSTEMS = [
  "CAI Homepage",
  "Recommendation cards",
  "Filtering model",
  "Detail view architecture",
  "Responsive layout behavior",
];

const REFLECTION_POINTS = [
  "AI output needs explanation",
  "Sellers need flexible control",
  "Familiar patterns reduce cognitive load",
  "Decision support matters more than information density",
  "Homepage experiences should trigger action, not just awareness",
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

                <dl className="cai-hero__meta">
                  <div>
                    <dt>Role</dt>
                    <dd>Lead Product Designer</dd>
                  </div>
                  <div>
                    <dt>Product area</dt>
                    <dd>CAI Homepage</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>Cross-sell / Upsell Recommendations</dd>
                  </div>
                  <div>
                    <dt>System type</dt>
                    <dd>AI-driven seller workflow</dd>
                  </div>
                </dl>

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
                            <span className="cai-wireframe-panel__chevron">⌄</span>
                            <span className="cai-wireframe-line cai-wireframe-line--sm" />
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
            <SectionHeading index="01 — CONTEXT & OVERVIEW" title="Project overview" />
            <div className="cai-summary-grid">
              {WHY_CARDS.map((card) => (
                <article key={card.title} className="cai-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="02 — PROBLEM & NEED"
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
              index="03 — DOMAIN & FOUNDATIONS"
              title="Understanding the domain"
              subtitle="Understanding cross-sell and upsell"
            />
            <div className="cai-domain-grid">
              <article className="cai-card">
                <h3>Upsell</h3>
                <p>Encourages customers to expand or upgrade products they already use.</p>
              </article>
              <article className="cai-card">
                <h3>Cross-sell</h3>
                <p>Surfaces related products or services that complement the customer’s current footprint.</p>
              </article>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="04 — USERS & ROLES"
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
              index="05 — CHALLENGES & GAPS"
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

          <section className="cai-section">
            <SectionHeading
              index="06 — REDESIGN & DISCOVERY"
              title="Homepage redesign"
              subtitle="Reframing the homepage around opportunity discovery"
            />
            <div className="cai-walkthrough-grid">
              <article className="cai-structured-panel cai-structured-panel--clean">
                <p className="cai-structured-lead">
                  The homepage became the entry point for AI-generated sales recommendations, organized to help sellers
                  quickly understand where to focus.
                </p>
                <p className="cai-structured-label">Key improvements</p>
                <ul className="cai-structured-list">
                  <li>Solution-area organization</li>
                  <li>Clear recommendation categories</li>
                  <li>Stronger entry points</li>
                  <li>Reduced clutter</li>
                  <li>More direct path into details</li>
                </ul>
              </article>
              <div className="cai-product-mock" aria-label="homepage redesign annotated mock">
                <img
                  className="cai-product-mock__image"
                  src={caiHomeImage}
                  alt="CAI Homepage showing AI-generated opportunity recommendations and grouped discovery modules"
                />
                <p className="cai-product-mock__caption">
                  Opportunity groups, role-aware entry points, and clearer priority cues reframe the homepage around action.
                </p>
              </div>
            </div>
          </section>

          <section className="cai-section cai-section--highlight">
            <div className="cai-highlight-panel">
              <SectionHeading index="07 — HYPOTHESIS & SHIFT" title="Design hypothesis" />
              <p className="cai-highlight-eyebrow">Pivot moment</p>
              <p className="cai-highlight-quote">
                What if recommendations behaved more like a work queue than a carousel?
              </p>
              <p className="cai-highlight-statement">
                A seller should be able to scan, filter, compare, and act on recommendations the same way they work
                through high-priority tasks.
              </p>
            </div>
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
          </section>

          <section className="cai-section">
            <SectionHeading
              index="08 — MODEL & WORKFLOW"
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
              <p className="cai-list-detail-mock__caption">
                The list-detail model turns recommendation browsing into a clearer decision workflow with persistent
                context, stronger explanation, and a more direct path to action.
              </p>
            </div>
          </section>

          <section className="cai-section">
            <SectionHeading
              index="09 — FILTERS & SORTING"
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
              index="10 — TRUST & DECISION"
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
            <SectionHeading index="11 — RESPONSIVE & LAYOUT" title="Responsive layout strategy" />
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
        </div>

        <section className="cai-impact" id="impact">
          <div className="cai-page__container">
            <SectionHeading
              index="12 — IMPACT & OUTCOMES"
              title="Impact and outcomes"
              subtitle="Turning recommendation visibility into seller action"
            />
            <div className="cai-impact__grid">
              {IMPACT.map((item) => (
                <article key={item.title} className="cai-impact__card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <p className="cai-impact__metrics-label">Optional metrics when available</p>
            <ul className="cai-impact__metrics">
              <li>Increased recommendation actions (placeholder)</li>
              <li>Improved workflow visibility (placeholder)</li>
              <li>Early adoption signals (placeholder)</li>
            </ul>
          </div>
        </section>

        <div className="cai-page__container">
          <section className="cai-section">
            <SectionHeading index="13 — ROLE & CONTRIBUTION" title="My role" />
            <p className="cai-section-text">
              As lead product designer, I shaped the end-to-end interaction model for surfacing cross-sell and upsell
              recommendations through the CAI Homepage.
            </p>
            <div className="cai-role-grid">
              <article className="cai-card">
                <h3>Responsibilities</h3>
                <ul>
                  {RESPONSIBILITIES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="cai-card">
                <h3>Systems influenced</h3>
                <ul>
                  {SYSTEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="cai-section cai-section--reflection">
            <SectionHeading index="14 — REFLECTION & LEARNINGS" title="Reflection" subtitle="What I learned" />
            <blockquote className="cai-reflection-quote">Designing AI workflows means designing confidence.</blockquote>
            <p className="cai-section-text">
              A recommendation is only useful when the user can understand why it matters and what to do with it. This
              project shifted my thinking from displaying AI output to designing the decision system around it.
            </p>
            <ul className="cai-reflection-list">
              {REFLECTION_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="cai-section">
            <SectionHeading index="15 — RELATED & CONTEXT" title="Related projects" />
            <div className="cai-related-grid">
              <Link to="/cxp-design-system" className="cai-related-card">
                <p>01 · CXP Design System</p>
                <h3>Scaling a unified UX standard for enterprise products</h3>
                <span>View case study →</span>
              </Link>
              <Link to="/time-tracking-agent" className="cai-related-card">
                <p>03 · Time Tracking Agent</p>
                <h3>Agent-assisted workflows for daily enterprise execution</h3>
                <span>View case study →</span>
              </Link>
            </div>
          </section>

          <section className="cai-section cai-section--cta" id="cta">
            <SectionHeading index="16 — NEXT & CONTACT" title="CTA" />
            <h2 className="cai-cta-title">Designing AI systems that help people act with confidence.</h2>
            <p className="cai-section-text">
              If you are building AI-native enterprise workflows and need a decision-first product strategy, I would be
              happy to collaborate.
            </p>
            <div className="cai-cta-actions">
              <a className="ep-button ep-button-tertiary ep-button-lg" href="mailto:manisankar09@gmail.com">
                Email
              </a>
              <a
                className="ep-button ep-button-tertiary ep-button-lg"
                href="https://www.linkedin.com/in/mani-sankar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>

      <ProjectPagination currentSlug="contextual-ai-workflows" />
      <SiteFooter />
    </div>
  );
}
