import { useState } from "react";

type SiteFooterProps = {
  fixed?: boolean;
};

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

export function SiteFooter({ fixed = false }: SiteFooterProps) {
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null);

  const getFooterLinkStyle = (linkName: string): React.CSSProperties => ({
    color: activeFooterLink === linkName ? "var(--button-link-fg)" : "var(--muted-foreground)",
    textDecorationColor: activeFooterLink === linkName ? "currentColor" : "var(--border)",
  });

  const getFooterLinkHandlers = (linkName: string) => ({
    onPointerEnter: () => setActiveFooterLink(linkName),
    onPointerMove: () => setActiveFooterLink(linkName),
    onPointerLeave: () => setActiveFooterLink((current) => (current === linkName ? null : current)),
    onMouseOver: () => setActiveFooterLink(linkName),
    onMouseMove: () => setActiveFooterLink(linkName),
    onMouseOut: () => setActiveFooterLink((current) => (current === linkName ? null : current)),
    onFocus: () => setActiveFooterLink(linkName),
    onBlur: () => setActiveFooterLink((current) => (current === linkName ? null : current)),
  });

  return (
    <footer
      className="border-t border-border"
      style={fixed ? {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 45,
        background: "color-mix(in srgb, var(--background) 94%, transparent)",
        backdropFilter: "blur(10px)",
      } : {
        background: "color-mix(in srgb, var(--background) 94%, transparent)",
        backdropFilter: "blur(10px)",
        marginTop: "auto",
      }}
    >
      <div
        className="site-container flex items-center justify-between"
        style={{ paddingTop: 16, paddingBottom: 12, gap: 16, flexWrap: "wrap" }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted-foreground)", ...MONO }}>
          ©2026 Mani Sankar Choudhury
        </span>
        <div className="flex items-center gap-4" style={{ flexWrap: "wrap" }}>
          <a
            href="mailto:manisankar09@gmail.com"
            className="ep-footer-link"
            {...getFooterLinkHandlers("email")}
            style={getFooterLinkStyle("email")}
          >
            E-MAIL
          </a>
          <a
            href="https://www.linkedin.com/in/mani-sankar/"
            target="_blank"
            rel="noopener noreferrer"
            className="ep-footer-link"
            {...getFooterLinkHandlers("linkedin")}
            style={getFooterLinkStyle("linkedin")}
          >
            LINKEDIN
          </a>
          <a
            href="https://www.behance.net/manisankar"
            target="_blank"
            rel="noopener noreferrer"
            className="ep-footer-link"
            {...getFooterLinkHandlers("behance")}
            style={getFooterLinkStyle("behance")}
          >
            BEHANCE
          </a>
        </div>
      </div>
    </footer>
  );
}