export function NavBar() {
  return (
    <header
      className="border-b border-border sticky top-0 z-50"
      style={{ background: "var(--background)" }}
    >
      <div
        className="mx-auto px-8 flex items-center justify-between"
        style={{ maxWidth: 1280, height: 56 }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            fontFamily: "'DM Mono', monospace",
            color: "var(--muted-foreground)",
          }}
        >
          CASE STUDY
        </span>
        <nav className="flex items-center gap-8">
          {["Overview", "Problem", "Process", "Outcome"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              style={{
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            fontFamily: "'DM Mono', monospace",
            color: "var(--muted-foreground)",
          }}
        >
          2024
        </span>
      </div>
    </header>
  );
}
