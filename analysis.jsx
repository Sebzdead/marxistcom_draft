// Marxist.com — Analysis page
// Standalone sibling to app.jsx (index.html) and join.jsx (join.html).
// Loaded by analysis.html.
// Reuses PrintButton, Eyebrow, SectionRule, ArticleCard from components.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by host bundler) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage) ───────────────────────────────────────
const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "analysis.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media" },
  { label: "Magazine" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];

// ── Masthead (copied verbatim from app.jsx) ─────────────────────────────────
function Masthead() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef(null);
  const toggleSearch = () => {
    setSearchOpen((o) => {
      const next = !o;
      if (next) {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      } else {
        setSearchValue("");
      }
      return next;
    });
  };
  const onKeyDown = (e) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); }
  };
  const onBlur = (e) => {
    if (!e.currentTarget.value) setSearchOpen(false);
  };
  return (
    <header className="masthead">
      <div className="mast-left">
        <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" className="mast-logo" />
        <div className="mast-wordmark">
          <div className="wm-title">Marxist<span className="wm-dot">.</span>com</div>
        </div>
        <div className="mast-slash">/</div>
        <div className="mast-tag">
          <div>Home of the Revolutionary</div>
          <div>Communist International</div>
        </div>
      </div>
      <div className="mast-right">
        <div className="mast-socials">
          <a href="#" aria-label="YouTube" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="Twitter / X" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="Telegram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.34 18.7 19.7c-.24 1.08-.88 1.34-1.78.84l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96L17.8 6.5c.4-.36-.08-.55-.62-.2L7.6 12.4l-4.92-1.54c-1.07-.34-1.1-1.07.22-1.58l19.27-7.43c.9-.34 1.68.2 1.38 1.58z"/></svg>
          </a>
        </div>
        <div className="mast-search" data-open={searchOpen}>
          <input
            ref={inputRef}
            type="search"
            className="mast-search-input"
            placeholder="Search marxist.com…"
            aria-label="Search marxist.com"
            tabIndex={searchOpen ? 0 : -1}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
          <button
            className="mast-search-btn"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
            type="button"
          >
            {searchOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Nav (2.5D pressable tabs — copied from app.jsx) ─────────────────────────
function Nav({ active }) {
  return (
    <nav className="primary-nav">
      <div className="nav-inner">
        {NAV_TABS.map((tab) => {
          const isActive = tab.label === active;
          const isExternal = tab.href && /^https?:\/\//.test(tab.href);
          return (
            <PrintButton
              key={tab.label}
              active={isActive}
              variant={isActive ? "ink" : "paper"}
              size="md"
              href={tab.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ flex: "0 0 auto" }}
            >
              {tab.label}
            </PrintButton>
          );
        })}
      </div>
    </nav>
  );
}

// ── Footer (copied verbatim from app.jsx) ───────────────────────────────────
function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-top">
        <div className="foot-brand">
          <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" />
          <div>
            <div className="foot-brand-wm">Marxist.com</div>
            <div className="foot-brand-tag">Home of the Revolutionary Communist International</div>
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <div className="foot-col-h">Sections</div>
            <a href="analysis.html">Analysis</a>
            <a href="#">Theory & History</a>
            <a href="#">Podcasts</a>
            <a href="#">In Defence of Marxism</a>
            <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer">Bookstore</a>
          </div>
          <div className="foot-col">
            <div className="foot-col-h">Get involved</div>
            <a href="join.html">Join the RCI</a>
            <a href="join.html">Find your section</a>
            <a href="#">Donate</a>
            <a href="#">Distribute the paper</a>
          </div>
          <div className="foot-col">
            <div className="foot-col-h">Languages</div>
            <a href="#">Español</a>
            <a href="#">Français</a>
            <a href="#">Deutsch</a>
            <a href="#">Italiano</a>
            <a href="#">中文</a>
          </div>
        </div>
      </div>
      <div className="foot-rule" />
      <div className="foot-bot">
        <span>© 2026 Revolutionary Communist International · marxist.com</span>
        <span>Workers of the world, unite!</span>
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  return (
    <div className="site">
      <Masthead />
      <Nav active="Analysis" />
      <main>
        <section style={{ padding: "40px 0 20px" }}>
          <h1 className="hero-h1">Analysis</h1>
        </section>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
