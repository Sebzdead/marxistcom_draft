// Shared components for Marxist.com homepage (RCI v2 Design System)
// All exported to window at the end of the file.



// ─── PrintButton / Button ───────────────────────────────────────────────────
// Flat pressable button — no offset ink shadow, conforms to .rci-btn design tokens.
function PrintButton({ children, size = "md", variant = "red", onClick, style, className = "", href, ...rest }) {
  const classes = ["rci-btn"];
  if (variant === "ghost") classes.push("ghost");
  if (variant === "ink") classes.push("ink");
  if (variant === "light") classes.push("light");
  if (size === "lg") classes.push("lg");
  
  const classStr = classes.join(" ") + " " + className;

  if (href) {
    return (
      <a href={href} className={classStr} style={style} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classStr} style={style} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

// ─── Eyebrow ────────────────────────────────────────────────────────────────
function Eyebrow({ children, style, className = "" }) {
  return (
    <span className={`rci-kicker ${className}`} style={style}>{children}</span>
  );
}

// ─── SectionRule ────────────────────────────────────────────────────────────
function SectionRule({ style, divider = "hairline" }) {
  if (divider === "red-rule") {
    return <div style={{ height: 2, background: "var(--rci-red)", margin: "0", ...style }} />;
  }
  if (divider === "thick-slab") {
    return <div className="rci-rule" style={style} />;
  }
  if (divider === "torn") {
    return <div className="rci-torn" style={style} />;
  }
  // hairline default — 1px rule
  return <div className="rci-rule hair" style={style} />;
}

// ─── ArticleCard ────────────────────────────────────────────────────────────
// Replaces v1 treatments with v2 design layout (.rci-card / .rci-card.bold)
function ArticleCard({ kicker, title, byline, image, dek, date, readTime, isBold = false, isRed = false, ruled = false, className = "", href = "#", style }) {
  if (isBold) {
    return (
      <article className={`rci-card bold ${isRed ? "red" : ""} ${className}`} style={style}>
        <a href={href} className="inner" style={{ textDecoration: "none", color: "inherit" }}>
          {kicker && <span className="rci-kicker">{kicker}</span>}
          <h3>{title}</h3>
          {dek && <p className="dek">{dek}</p>}
          {(date || readTime) && (
            <div className="rci-meta">
              {date && <span>{date}</span>}
              {date && readTime && <span className="dot">·</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          )}
        </a>
      </article>
    );
  }

  return (
    <article className={`rci-card ${ruled ? "ruled" : ""} ${className}`} style={style}>
      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
        {image && (
          <div className="rci-img rci-ar-4-3">
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("${image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(1.05) saturate(0.95)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: 'url("ds/textures/au-fg-1.jpg")',
              backgroundSize: "cover",
              mixBlendMode: "multiply",
              opacity: 0.09,
              pointerEvents: "none",
            }} />
          </div>
        )}
        {kicker && <span className="rci-kicker">{kicker}</span>}
        <h3>{title}</h3>
        {dek && <p className="dek">{dek}</p>}
        {byline && (
          <div style={{
            fontFamily: "var(--rci-font-condensed)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "var(--rci-ash)",
            textTransform: "uppercase",
            marginTop: "2px",
            marginBottom: "8px",
          }}>{byline}</div>
        )}
        {(date || readTime) && (
          <div className="rci-meta">
            {date && <span>{date}</span>}
            {date && readTime && <span className="dot">·</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </a>
    </article>
  );
}

// ─── SectionHead ────────────────────────────────────────────────────────────
// A heading row with label + see all link
function SectionHead({ label, extra, href = "#" }) {
  return (
    <div className="rci-section-head">
      <h2>{label}</h2>
      {extra && <a href={href}>{extra}</a>}
    </div>
  );
}

// ─── Navigation Tabs Constant ────────────────────────────────────────────────
const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellredbooks.co.uk/", external: true },
];

// ─── Header (Sticky header, navigation, and interactive mega-menu) ───────────
function Header({ activeTab }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <React.Fragment>
      <header className="rci-header" data-screen-label="Header">
        <div className="rci-wrap">
          <div className="rci-topbar">
            <a className="rci-brand" href="index.html">
              <img src="ds/logos/rci-square.svg" alt="RCI" />
              <span className="name">
                <em className="brand-tagline">Home of the</em>
                <span className="brand-org">Revolutionary Communist International</span>
              </span>
            </a>
            <div className="right">
              <span className="rci-lang">Language &#9662;</span>
              <a className="rci-btn" href="join.html">Join us</a>
            </div>
          </div>
          <nav className="rci-nav">
            <button id="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="rci-ham"><i></i><i></i><i></i></span> Menu
            </button>
            {NAV_TABS.map((tab) => {
              const isActive = tab.label === activeTab;
              return (
                <a
                  key={tab.label}
                  href={tab.href}
                  className={isActive ? "active" : ""}
                  target={tab.external ? "_blank" : undefined}
                  rel={tab.external ? "noopener noreferrer" : undefined}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>

      </header>

      {/* Full-width drawer menu — icons + expansive category index */}
      {menuOpen && (
        <div className="menu-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-drawer-inner">
              <div className="menu-drawer-header">
                <div className="menu-drawer-brand">
                  <img src="assets/rci-social-round.svg" alt="RCI" />
                  <span className="menu-drawer-wm">Revolutionary Communist International</span>
                </div>
                <button className="menu-drawer-close" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <form className="menu-drawer-search" role="search" onSubmit={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5l-4-4" /></svg>
                <input
                  type="search"
                  className="menu-drawer-search-input"
                  placeholder="Search marxist.com…"
                  aria-label="Search marxist.com"
                  onKeyDown={(e) => { if (e.key === 'Enter') { window.location.href = 'search.html?q=' + encodeURIComponent(e.target.value); } }}
                />
              </form>

              <div className="menu-drawer-layout">
                <div className="menu-drawer-sidebar">
                  <a href="index.html" className="drawer-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /></svg>
                    <div className="drawer-sidebar-item-content"><div className="drawer-sidebar-item-title">Latest Analysis</div></div>
                  </a>
                  <a href="media.html" className="drawer-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
                    <div className="drawer-sidebar-item-content"><div className="drawer-sidebar-item-title">Media &amp; Podcasts</div></div>
                  </a>
                  <a href="magazine.html" className="drawer-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <div className="drawer-sidebar-item-content"><div className="drawer-sidebar-item-title">In Defence of Marxism</div></div>
                  </a>
                  <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer" className="drawer-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" /></svg>
                    <div className="drawer-sidebar-item-content"><div className="drawer-sidebar-item-title">WellRed Books</div></div>
                  </a>
                  <a href="join.html" className="drawer-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    <div className="drawer-sidebar-item-content"><div className="drawer-sidebar-item-title">Join the RCI</div></div>
                  </a>
                </div>

                <div className="menu-drawer-categories">
                  <div className="drawer-category">
                    <div className="drawer-category-title">Continents</div>
                    <div className="drawer-category-links">
                      <a href="sections.html?category=Africa" className="drawer-category-link">Africa</a>
                      <a href="sections.html?category=Americas" className="drawer-category-link">Americas</a>
                      <a href="sections.html?category=Asia" className="drawer-category-link">Asia</a>
                      <a href="sections.html?category=Europe" className="drawer-category-link">Europe</a>
                      <a href="sections.html?category=Middle East" className="drawer-category-link">Middle East</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Current Topics</div>
                    <div className="drawer-category-links">
                      <a href="topic.html?topic=Iran War" className="drawer-category-link">Iran War</a>
                      <a href="topic.html?topic=Trump 2.0" className="drawer-category-link">Trump 2.0</a>
                      <a href="topic.html?topic=Artificial Intelligence" className="drawer-category-link">Artificial Intelligence</a>
                      <a href="topic.html?topic=Gen Z Revolutions" className="drawer-category-link">Gen Z Revolutions</a>
                      <a href="topic.html?topic=World Economy" className="drawer-category-link">World Economy</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Marxist Theory</div>
                    <div className="drawer-category-links">
                      <a href="theory.html#marx-engels" className="drawer-category-link">Karl Marx &amp; Engels</a>
                      <a href="theory.html#lenin" className="drawer-category-link">Vladimir Lenin</a>
                      <a href="theory.html#trotsky" className="drawer-category-link">Leon Trotsky</a>
                      <a href="theory.html#classics" className="drawer-category-link">The Classics</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">The RCI</div>
                    <div className="drawer-category-links">
                      <a href="join.html" className="drawer-category-link">Who we are</a>
                      <a href="join.html#sections" className="drawer-category-link">Our sections</a>
                      <a href="join.html#statements" className="drawer-category-link">Statements</a>
                      <a href="join.html#contact" className="drawer-category-link">Contact</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Theory &amp; History</div>
                    <div className="drawer-category-links">
                      <a href="theory.html" className="drawer-category-link">Theory hub</a>
                      <a href="history.html" className="drawer-category-link">Revolutionary history</a>
                      <a href="theory-curriculum.html" className="drawer-category-link">Curriculum</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Media</div>
                    <div className="drawer-category-links">
                      <a href="media.html" className="drawer-category-link">Against the Stream</a>
                      <a href="media.html" className="drawer-category-link">Spectre of Communism</a>
                      <a href="media.html" className="drawer-category-link">Documentaries</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-foot" data-screen-label="Footer">
      <div className="foot-main">
        <div className="foot-brand">
          <img src="assets/rci-social-round.svg" alt="RCI" />
          <div className="foot-brand-wm">Revolutionary Communist International</div>
        </div>
        <a href="join.html" className="foot-manifesto-card">
          <div className="foot-manifesto-img">
            <img src="assets/card-manifesto.jpg" alt="The Revolutionary Manifesto of the RCI" />
          </div>
        </a>
        <div className="foot-right">
          <a href="#" className="foot-link">World Perspectives</a>
          <a href="#" className="foot-link">RCI Documentary</a>
          <a href="#" className="foot-link">World School of Communism</a>
        </div>
      </div>
    </footer>
  );
}

// Export to window so other JSX files can use them
Object.assign(window, { 
  PrintButton, 
  Eyebrow, 
  SectionRule, 
  ArticleCard, 
  SectionHead, 
  NAV_TABS, 
  Header, 
  Footer 
});
