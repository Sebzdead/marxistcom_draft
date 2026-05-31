// Marxist.com — In Defence of Marxism (Magazine) page
// Standalone sibling to app.jsx / media.jsx. Loaded by magazine.html.
// Site chrome (Masthead/Nav/Footer) wraps the preserved IDOM body (.idom-app).
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage; Magazine is this page) ─────────────────
const NAV_TABS = [
  { label: "Analysis", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];

// ── IDOM page content data ───────────────────────────────────────────────────
window.IDOM_PAGE = {
  topnav: ["News", "Magazine", "Theory", "Books", "Events", "Donate"],
  sectionNav: [
    { id: "intro", label: "Introduction" },
    { id: "latest", label: "Latest Issue" },
    { id: "archive", label: "Archive" },
    { id: "subscribe", label: "Subscribe" },
  ],
  languages: ["English","Español","Deutsch","Français","Italiano","Português","Ελληνικά","Türkçe","العربية"],

  intro: {
    pre: "In defence of",
    mark: "Marxism",
    standfirst: "Theoretical quarterly of the Revolutionary Communist International",
    body: "A journal of ideas for those who wish to change the world. Each issue takes up a single great question — of history, science, art or revolution — and confronts it with the methods of Marxism. Published four times a year, in nine languages, on every continent.",
  },

  // Latest issue — #53
  latest: {
    no: "53",
    season: "Spring 2026",
    theme: "Latin America",
    subtitle: "An Unfinished Revolution",
    cover: "uploads/IDOM_53.jpg",
    blurb: "From the wars of independence to the Bolivarian present, Latin America has been a continent of permanent upheaval — and of revolutions left half-finished. This issue traces the unbroken thread from Bolívar to Zapata, from Cuba to Chile, and asks what it will take to complete the task.",
    price: "£5 · €6 · $7",
    contents: [
      { p: "02", k: "Editorial", t: "Latin America: an unfinished revolution", a: "Alan Woods" },
      { p: "08", k: "History", t: "Bolívar and the bourgeois revolution that never was", a: "Jorge Martín" },
      { p: "18", k: "Mexico", t: "Zapata, Villa and the betrayed peasant revolution", a: "Josh Holroyd" },
      { p: "28", k: "Cuba", t: "The Cuban Revolution: conquests and contradictions", a: "John Peterson" },
      { p: "38", k: "Chile", t: "1973: the tragedy of Popular Unity", a: "Rob Sewell" },
      { p: "48", k: "Theory", t: "Permanent revolution and the colonial world", a: "Hamid Alizadeh" },
      { p: "58", k: "Today", t: "Bolivarianism and the impasse of reformism", a: "Jorge Martín" },
    ],
  },

  // Archive — newest first
  archive: [
    { no: "53", title: "Latin America: An Unfinished Revolution", season: "Spring 2026", img: "uploads/IDOM_53.jpg" },
    { no: "52", title: "Sudan: From Revolution to Barbarism", season: "Winter 2025", img: "uploads/IDOM_52_website.jpg" },
    { no: "51", title: "The Permanent Revolution", season: "Autumn 2025", img: "uploads/_IDOM_51_cover.jpg" },
    { no: "50", title: "Reform or Revolution", season: "Summer 2025", img: "uploads/_IDOM_50_cover.jpg" },
    { no: "49", title: "1945: Liberation, Revolution & Betrayal", season: "Spring 2025", img: "uploads/_IDOM_49_cover.jpg" },
    { no: "48", title: "Science: Progress, Crisis and Revolution", season: "Winter 2025", img: "uploads/IDOM_48_thumb.jpg" },
    { no: "47", title: "The Struggle for World Revolution", season: "Autumn 2024", img: "uploads/IDOM_47_thumb.jpg" },
    { no: "46", title: "The Necessity of Art", season: "Summer 2024", img: "uploads/_IDOM_46_thumb.jpg" },
    { no: "45", title: "The African Revolution", season: "Spring 2024", img: "uploads/_IDOM_45_cover_website.jpg" },
    { no: "44", title: "Lenin: 100 Years On", season: "Winter 2024", img: "uploads/_IDOM_44_small.jpg" },
    { no: "43", title: "The Struggle for Communism", season: "Autumn 2023", img: "uploads/_IDOM_43_cover_small.jpg" },
    { no: "42", title: "The State", season: "Summer 2023", img: "uploads/IDOM_42_cover_small.jpg" },
    { no: "41", title: "The Fall of Woman", season: "Spring 2023", img: "uploads/_IDOM_41_cover.jpg" },
    { no: "40", title: "Blood and Gold", season: "Winter 2023", img: "uploads/_IDOM_40_small.jpg" },
    { no: "39", title: "The Struggle for Rational Thought", season: "Autumn 2022", img: "uploads/_IDOM_39_small.jpg" },
    { no: "38", title: "The Civil War: America's Second Revolution", season: "Summer 2022", img: "uploads/_IDOM_38_small.jpg" },
    { no: "37", title: "The Need for Revolutionary Leadership", season: "Spring 2022", img: "uploads/_IDOM_37_cover_small.jpg" },
    { no: "36", title: "Marxism vs. Libertarianism", season: "Winter 2022", img: "uploads/_IDOM_36_cover.jpg" },
    { no: "35", title: "Barbarism, Civilisation & the Marxist View of History", season: "Autumn 2021", img: "uploads/_IDOM_35_cover.jpg" },
    { no: "34", title: "Marxism versus Postmodernism", season: "Summer 2021", img: "uploads/_IDOM_34_cover.jpg" },
  ],

  subscribe: {
    plans: {
      digital: {
        key: "digital", name: "Digital", tag: "Read anywhere",
        annual: 20, quarter: 6, currency: "£",
        features: [
          "Every new issue in PDF & EPUB",
          "Full access to the digital archive (issues 1–53)",
          "Searchable, on any device",
          "Delivered the day each issue ships",
        ],
      },
      print: {
        key: "print", name: "Print", tag: "The journal in your hands",
        annual: 35, quarter: 10, currency: "£",
        features: [
          "Four issues posted worldwide",
          "Heavy art-paper, perfect-bound",
          "Collector's editions, archival quality",
          "Postage included to any country",
        ],
      },
      both: {
        key: "both", name: "Print + Digital", tag: "The complete edition", best: true,
        annual: 45, quarter: 13, currency: "£",
        features: [
          "Everything in Print and Digital",
          "Read instantly, then receive the printed copy",
          "Full archive access included",
          "Best value — save over a third",
        ],
      },
    },
  },

  footerLinks: {
    Magazine: ["Latest issue", "All issues", "By topic", "Editorial board", "Write for us"],
    "Get involved": ["Subscribe", "Donate", "Join the RCI", "Bookshop", "Contact"],
  },
};

// ── Site chrome: Masthead / Nav / Footer (verbatim from media.jsx) ──────────
function Masthead() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen((o) => {
      const next = !o;
      if (next) setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      else setSearchValue("");
      return next;
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); }
  };
  const onBlur = (e) => { if (!e.currentTarget.value) setSearchOpen(false); };

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="masthead">
      <div className="mast-left">
        <a href="index.html" className="mast-logo-link" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
          <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" className="mast-logo" />
          <div className="mast-wordmark">
            <div className="wm-title">MARXIST<span className="wm-dot">.</span>COM</div>
          </div>
          <div className="mast-slash">/</div>
          <div className="mast-tag">
            <div>Home of the Revolutionary</div>
            <div>Communist International</div>
          </div>
        </a>
      </div>
      <div className="mast-right">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5l-4-4" /></svg>
            )}
          </button>
        </div>
        <div className="mast-socials">
          <a href="https://www.youtube.com/@revcomintern" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>
          </a>
          <a href="https://www.instagram.com/revcomintern/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="https://x.com/revcomintern" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://t.me/marxistcom" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.34 18.7 19.7c-.24 1.08-.88 1.34-1.78.84l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96L17.8 6.5c.4-.36-.08-.55-.62-.2L7.6 12.4l-4.92-1.54c-1.07-.34-1.1-1.07.22-1.58l19.27-7.43c.9-.34 1.68.2 1.38 1.58z" /></svg>
          </a>
        </div>
        <button
          className="mast-hamburger"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="menu-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-drawer-inner">
              <div className="menu-drawer-header">
                <div className="menu-drawer-brand">
                  <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" />
                  <span className="menu-drawer-wm">MARXIST.COM</span>
                </div>
                <button
                  className="menu-drawer-close"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>



              <div className="menu-drawer-layout">
                <div className="menu-drawer-sidebar">
                  <a href="index.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="8" y1="14" x2="16" y2="14" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Latest Analysis</div>
                      <div className="drawer-sidebar-item-desc">In-depth Marxist analysis of current world events</div>
                    </div>
                  </a>

                  <a href="media.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 1 2 2h1a2 2 0 0 1 2-2v-3a2 2 0 0 1-2-2H3z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Podcasts & Media</div>
                      <div className="drawer-sidebar-item-desc">Arm yourself with our weekly shows and documentaries</div>
                    </div>
                  </a>

                  <a href="magazine.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">In Defence of Marxism</div>
                      <div className="drawer-sidebar-item-desc">Read our theoretical quarterly international journal</div>
                    </div>
                  </a>

                  <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Bookstore</div>
                      <div className="drawer-sidebar-item-desc">Browse Marxist literature, newspapers, and classics</div>
                    </div>
                  </a>

                  <a href="join.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Join the RCI</div>
                      <div className="drawer-sidebar-item-desc">Become a member of the Revolutionary Communist International</div>
                    </div>
                  </a>
                </div>

                <div className="menu-drawer-categories">
                  <div className="drawer-category">
                    <div className="drawer-category-title">Continents</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Africa</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Americas</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Asia</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Europe</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Middle East</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Oceania</a>
                    </div>
                  </div>

                  <div className="drawer-category">
                    <div className="drawer-category-title">Current Topics</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Ukraine War</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Iran War</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Artificial Intelligence</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Rise of China</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Climate Change</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>World Economy</a>
                    </div>
                  </div>

                  <div className="drawer-category">
                    <div className="drawer-category-title">Perspectives & Activity</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Editorial Perspectives</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Revolutionary Activity</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Building the Party</a>
                      <a href="join.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Find Your Local Section</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>RCI Manifesto</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Our History & Cadres</a>
                    </div>
                  </div>

                  <div className="drawer-category">
                    <div className="drawer-category-title">Marxist Theory</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>What is Marxism?</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Karl Marx & Engels</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Vladimir Lenin</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Leon Trotsky</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Historical Materialism</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Marxist Economics</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Nav Component ───────────────────────────────────────────────────────────
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
              href={tab.href || "#"}
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

// ── Footer Component ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-top">
        <div className="foot-brand">
          <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" />
          <div>
            <div className="foot-brand-wm">MARXIST.COM</div>
            <div className="foot-brand-tag">Home of the Revolutionary Communist International</div>
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <div className="foot-col-h">Sections</div>
            <a href="index.html">Analysis</a>
            <a href="#">Theory & History</a>
            <a href="media.html">Podcasts</a>
            <a href="magazine.html">In Defence of Marxism</a>
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

// ── Podcast Card Component ──────────────────────────────────────────────────

// ── IDOM section nav (verbatim from IDOM Nav.jsx) ───────────────────────────
function IdNav() {
  const D = window.IDOM_PAGE;
  const [solid, setSolid] = React.useState(false);
  const [active, setActive] = React.useState("intro");

  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = D.sectionNav.map(s => s.id);
    const onScroll = () => {
      const mark = window.innerHeight * 0.4;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <header className={"idnav" + (solid ? " solid" : "")}>
      <div className="idnav-inner">
        <a className="idnav-lock" href="#intro" onClick={(e) => jump(e, "intro")}>
          <span className="pre">In defence of</span>
          <span className="mk">Marxism</span>
        </a>
        <nav className="idnav-links">
          {D.sectionNav.map(s => (
            <a key={s.id} href={"#" + s.id}
               className={active === s.id ? "active" : ""}
               onClick={(e) => jump(e, s.id)}>{s.label}</a>
          ))}
        </nav>
        <a className="idnav-cta" href="#subscribe" onClick={(e) => jump(e, "subscribe")}>Subscribe</a>
        <button className="idnav-menubtn" aria-label="Menu"><i data-lucide="menu"></i></button>
      </div>
    </header>
  );
}

// ── IDOM hero (verbatim from IDOM Hero.jsx) ─────────────────────────────────
// Hero — scroll DOWN the full length of Caspar David Friedrich's "Wanderer".
// On reaching the foot of the painting, the field fades white → black into the
// particle-track image; the magazine spread and the short intro paragraph live
// inside that transition (spread just above the paragraph).
function Hero() {
  const D = window.IDOM_PAGE.intro;
  const secRef = React.useRef(null);
  const bg1Ref = React.useRef(null);   // Wanderer (pans)
  const bg2Ref = React.useRef(null);   // particles
  const veilRef = React.useRef(null);  // white flash
  const titleRef = React.useRef(null); // lockup, top
  const fadeRef = React.useRef(null);  // spread + intro paragraph
  const cueRef = React.useRef(null);

  React.useEffect(() => {
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const ramp = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / total, 0, 1);

      // Phase 1 — pan down the entire painting (p 0 → 0.52)
      const pan = ramp(p, 0, 0.52) * 100;
      if (bg1Ref.current) {
        bg1Ref.current.style.objectPosition = "50% " + pan + "%";
        // painting recedes as the white flash takes over, gone before black
        bg1Ref.current.style.opacity = 1 - ramp(p, 0.56, 0.66);
      }
      // Phase 2 — white flash, then fades to PURE BLACK (no particles yet)
      const up = ramp(p, 0.52, 0.62);
      const down = ramp(p, 0.64, 0.73);
      if (veilRef.current) veilRef.current.style.opacity = up * (1 - down);

      // Phase 3 — particle field fades in over the black, holds, then (Phase 5)
      // fades back out to black to hand off to the Latest Issue section
      if (bg2Ref.current) {
        bg2Ref.current.style.opacity = ramp(p, 0.72, 0.82) * (1 - ramp(p, 0.95, 1.0));
      }

      // Title lockup: present over the top of the painting, gone before the flash
      if (titleRef.current) {
        titleRef.current.style.opacity = 1 - ramp(p, 0.14, 0.36);
        titleRef.current.style.transform = "translateY(" + (-ramp(p, 0, 0.36) * 70) + "px)";
      }
      // Phase 4 — spread + intro float in over the particle field and HOLD a good
      // while, then fade back out late as the field darkens to black (Phase 5)
      const fadeIn = ramp(p, 0.76, 0.86);
      const fadeOut = ramp(p, 0.95, 1.0);
      if (fadeRef.current) {
        fadeRef.current.style.opacity = fadeIn * (1 - fadeOut);
        fadeRef.current.style.transform = "translateY(" + ((1 - fadeIn) * 40 + fadeOut * -24) + "px)";
      }
      if (cueRef.current) cueRef.current.style.opacity = 1 - ramp(p, 0.0, 0.07);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="intro">
      <div className="hero" ref={secRef}>
        <div className="hero-stage">
          <img className="hero-bg hero-bg1" ref={bg1Ref} src="uploads/1.jpeg" alt="Caspar David Friedrich, Wanderer above the Sea of Fog" />
          <img className="hero-bg hero-bg2" ref={bg2Ref} src="uploads/2.png" alt="" />
          <div className="hero-veil" ref={veilRef}></div>
          <div className="hero-vignette"></div>

          <div className="hero-title" ref={titleRef}>
            <div className="hero-eyebrow">Revolutionary Communist International</div>
            <div className="hero-pre">{D.pre}</div>
            <h1 className="hero-mark">{D.mark}</h1>
            <div className="hero-rule"></div>
            <p className="hero-stand">{D.standfirst}</p>
          </div>

          <div className="hero-fade" ref={fadeRef}>
            <img className="hero-spread" src="uploads/magazines spread.png" alt="Three issues of In Defence of Marxism" />
            <p className="hero-introtext">{D.body}</p>
          </div>

          <div className="hero-cue" ref={cueRef}>
            <span>Scroll</span>
            <i data-lucide="chevron-down"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IDOM sections: Latest / Archive / Subscribe (verbatim from Sections.jsx) ─
function Latest() {
  const L = window.IDOM_PAGE.latest;
  return (
    <section id="latest" className="latest sec">
      <div className="wrap">
        <p className="sec-kicker">The current issue · Out now</p>
        <div className="sec-head">
          <h2 className="sec-title">Latest Issue</h2>
          <span className="sec-aside">Published quarterly · {L.season}</span>
        </div>
        <div className="latest-grid">
          <div className="latest-coverwrap">
            <div className="latest-cover">
              <img src={L.cover} alt={"In Defence of Marxism, issue " + L.no} />
            </div>
            <div className="latest-buy">
              <a className="btn btn-red" href="#"><i data-lucide="shopping-cart"></i>Buy · {L.price.split(" · ")[0]}</a>
              <a className="btn btn-ghost" href="#subscribe"><i data-lucide="book-open"></i>Subscribe</a>
            </div>
          </div>
          <div className="latest-body">
            <div className="latest-meta">
              <span className="latest-no">Issue {L.no}</span>
              <span className="latest-season">{L.season}</span>
            </div>
            <h3 className="latest-title">{L.theme}</h3>
            <p className="latest-sub">{L.subtitle}</p>
            <p className="latest-blurb">{L.blurb}</p>
            <p className="latest-cont-h">In this issue</p>
            <ul className="contents">
              {L.contents.map((c, i) => (
                <li key={i}>
                  <a href="#">
                    <span className="contents-p">{c.p}</span>
                    <span className="contents-main">
                      <span className="contents-k">{c.k}</span>
                      <span className="contents-t">{c.t}</span>
                      <span className="contents-a">{c.a}</span>
                    </span>
                    <i data-lucide="arrow-right"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  const A = window.IDOM_PAGE.archive;
  return (
    <section id="archive" className="archive sec">
      <div className="wrap">
        <p className="sec-kicker">Every issue · 2021 — today</p>
        <div className="sec-head">
          <h2 className="sec-title">The Archive</h2>
          <span className="sec-aside">Twenty issues · order back numbers below</span>
        </div>
        <div className="arch-grid">
          {A.map(it => (
            <div className="arch-item" key={it.no}>
              <a className="arch-cover" href="#" aria-label={"Issue " + it.no}>
                <img src={it.img} alt={it.title} />
                <span className="arch-no">No. {it.no}</span>
              </a>
              <div className="arch-meta">
                <div className="arch-season">{it.season}</div>
                <div className="arch-title">{it.title}</div>
                <a className="arch-buy" href="#"><i data-lucide="shopping-cart"></i>Buy this issue</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subscribe() {
  const S = window.IDOM_PAGE.subscribe;
  const order = ["digital", "print", "both"];
  const [term, setTerm] = React.useState("annual");
  const A = window.IDOM_PAGE.archive;
  // a few covers floated in the background as a gallery wash
  const bg = [
    { src: A[0].img, top: "-4%", left: "-3%", w: 280, rot: -6 },
    { src: A[5].img, top: "44%", left: "8%", w: 240, rot: 5 },
    { src: A[12].img, top: "8%", right: "-2%", w: 300, rot: 7 },
    { src: A[9].img, bottom: "-6%", right: "12%", w: 250, rot: -4 },
  ];
  return (
    <section id="subscribe" className="subscribe sec">
      <div className="sub-art" aria-hidden="true">
        {bg.map((b, i) => (
          <img key={i} src={b.src} alt=""
            style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom,
                     width: b.w, transform: "rotate(" + b.rot + "deg)" }} />
        ))}
      </div>
      <div className="wrap sub-inner">
        <div className="sub-head">
          <p className="sec-kicker">Read every issue</p>
          <h2 className="sub-h2">Subscribe</h2>
          <p className="sub-lead">Join thousands of readers across nine languages. Have the journal of revolutionary ideas delivered to your door, your inbox, or both — and support the work of the International.</p>
        </div>

        <div className="sub-toggle">
          <div className="sub-toggle-inner">
            <button className={term === "annual" ? "on" : ""} onClick={() => setTerm("annual")}>Annual</button>
            <button className={term === "quarter" ? "on" : ""} onClick={() => setTerm("quarter")}>Per issue</button>
          </div>
        </div>

        <div className="sub-plans">
          {order.map(key => {
            const p = S.plans[key];
            const amt = term === "annual" ? p.annual : p.quarter;
            const per = term === "annual" ? "per year · 4 issues" : "per issue";
            return (
              <div className={"plan" + (p.best ? " best" : "")} key={key}>
                {p.best && <span className="plan-flag">Best value</span>}
                <h3 className="plan-name">{p.name}</h3>
                <p className="plan-tag">{p.tag}</p>
                <div className="plan-price">
                  <span className="plan-cur">{p.currency}</span>
                  <span className="plan-amt">{amt}</span>
                </div>
                <div className="plan-per">{per}</div>
                <ul className="plan-feats">
                  {p.features.map((f, i) => (
                    <li key={i}><i data-lucide="check"></i><span>{f}</span></li>
                  ))}
                </ul>
                <a className={"btn " + (p.best ? "plan-best-btn" : "btn-red")} href="#">
                  Choose {p.name}<i data-lucide="arrow-right"></i>
                </a>
              </div>
            );
          })}
        </div>

        <p className="sub-foot">Already a subscriber? <a href="#">Sign in</a> &nbsp;·&nbsp; Institutions &amp; libraries, <a href="#">enquire here</a>.</p>
      </div>
    </section>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  // Render lucide icons once after mount — the IDOM body's icons are static.
  // The rAF + timeout retries cover lucide loading slightly after mount.
  // NOTE: deliberately NO MutationObserver here. Re-running createIcons on
  // every DOM mutation (e.g. opening the menu drawer) re-scans the whole
  // document and, on this long image-heavy page, froze the tab.
  useEffect(() => {
    const draw = () => { if (window.lucide) window.lucide.createIcons(); };
    draw();
    const raf = requestAnimationFrame(draw);
    const t = setTimeout(draw, 300);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);

  return (
    <React.Fragment>
      <header className="mag-head">
        <div className="mag-head-inner">
          <Masthead />
          <Nav active="Magazine" />
        </div>
      </header>
      <div className="idom-app">
        <IdNav />
        <Hero />
        <Latest />
        <Archive />
        <Subscribe />
      </div>
      <div className="mag-chrome mag-foot" data-mode="dark">
        <Footer />
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
