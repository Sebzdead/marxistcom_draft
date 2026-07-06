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

        {/* mega menu */}
        <div className="rci-megamenu" id="megamenu">
          <div className="rci-wrap">
            <span className="rci-mm-close" onClick={() => setMenuOpen(false)}>&#10005; Close</span>
            <div className="rci-mm-grid">
              <div className="rci-mm-primary">
                <a href="index.html"><span className="ic"></span><span><span className="t">Latest Analysis</span><span className="d">World news &amp; comment</span></span></a>
                <a href="media.html"><span className="ic"></span><span><span className="t">Media &amp; Podcasts</span><span className="d">Watch &amp; listen</span></span></a>
                <a href="magazine.html"><span className="ic"></span><span><span className="t">In Defence of Marxism</span><span className="d">The magazine</span></span></a>
                <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer"><span className="ic"></span><span><span className="t">WellRed Books</span><span className="d">The bookshop</span></span></a>
                <a href="join.html"><span className="ic"></span><span><span className="t">Join the RCI</span><span className="d">Get organised</span></span></a>
              </div>
              <div className="rci-mm-secondary">
                <div className="rci-mm-search">
                  <span style={{ color: "var(--rci-ash)", fontFamily: "var(--rci-font-mono)" }}>&#9906;</span>
                  <input 
                    placeholder="Search marxist.com" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = 'search.html?q=' + encodeURIComponent(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="rci-mm-cols">
                  <div>
                    <h5>Continents</h5>
                    <ul>
                      <li><a href="sections.html?category=Africa">Africa</a></li>
                      <li><a href="sections.html?category=Americas">Americas</a></li>
                      <li><a href="sections.html?category=Asia">Asia</a></li>
                      <li><a href="sections.html?category=Europe">Europe</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5>Current Topics</h5>
                    <ul>
                      <li><a href="topic.html?topic=Imperialism">Imperialism</a></li>
                      <li><a href="topic.html?topic=Economy">Economy</a></li>
                      <li><a href="topic.html?topic=Labour">Labour</a></li>
                      <li><a href="topic.html?topic=Oppression">Oppression</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5>Marxist Theory</h5>
                    <ul>
                      <li><a href="theory.html#marx-engels">Marx &amp; Engels</a></li>
                      <li><a href="theory.html#lenin">Lenin</a></li>
                      <li><a href="theory.html#trotsky">Trotsky</a></li>
                      <li><a href="theory.html#classics">The classics</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5>The RCI</h5>
                    <ul>
                      <li><a href="join.html">Who we are</a></li>
                      <li><a href="join.html#sections">Our sections</a></li>
                      <li><a href="join.html#statements">Statements</a></li>
                      <li><a href="join.html#contact">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="rci-backdrop" onClick={() => setMenuOpen(false)}></div>
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
