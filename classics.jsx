// Marxist.com — Marxist Classics Library Portal page
// Standalone sibling to app.jsx / magazine.jsx / media.jsx. Loaded by classics.html.
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (Classics is active here) ─────────────────────────────────
const NAV_TABS = [
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory", href: "theory.html" },
  { label: "History", href: "history.html" },
  { label: "Classics", href: "classics.html" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
];

const CLASSIC_BOOKS = [
  {
    slug: "communist-manifesto",
    author: "Karl Marx & Friedrich Engels",
    title: "The Communist Manifesto",
    desc: "A founding document of scientific socialism, outlining the class struggle and the inevitable fall of capitalist relations.",
    buyUrl: "https://wellredbooks.co.uk/product/manifesto-of-the-communist-party/",
    coverType: "slab",
    category: "Marx & Engels"
  },
  {
    slug: "das-kapital",
    author: "Karl Marx",
    title: "Das Kapital (Volume 1)",
    desc: "Marx's crowning economic work, analyzing the commodity, surplus value, and the inner mechanics of capitalist exploitation.",
    buyUrl: "https://wellredbooks.co.uk/product/capital-volume-1-karl-marx/",
    coverType: "slab",
    category: "Marx & Engels"
  },
  {
    slug: "socialism-utopian-scientific",
    author: "Friedrich Engels",
    title: "Socialism: Utopian and Scientific",
    desc: "A brilliant explanation of the development of socialism from idealist utopian visions to a scientific analysis of history and society.",
    buyUrl: "https://wellredbooks.co.uk/product/socialism-utopian-and-scientific/",
    coverType: "slab",
    category: "Marx & Engels"
  },
  {
    slug: "state-and-revolution",
    author: "V.I. Lenin",
    title: "The State and Revolution",
    desc: "Lenin's classic work analyzing the state as an instrument of class rule, and the tasks of the working class during revolution.",
    buyUrl: "https://wellredbooks.co.uk/product/state-and-revolution-lenin/",
    coverType: "slab",
    category: "Lenin"
  },
  {
    slug: "imperialism-highest-stage",
    author: "V.I. Lenin",
    title: "Imperialism: The Highest Stage of Capitalism",
    desc: "A scientific analysis of how capitalism developed into monopoly capitalism, leading to the domination of finance and imperialist war.",
    buyUrl: "https://wellredbooks.co.uk/product/imperialism-highest-stage-capitalism-lenin/",
    coverType: "slab",
    category: "Lenin"
  },
  {
    slug: "what-is-to-be-done",
    author: "V.I. Lenin",
    title: "What Is To Be Done?",
    desc: "Lenin's seminal work on the role, structure, and methods of the revolutionary party as the vanguard of the working class.",
    buyUrl: "https://wellredbooks.co.uk/product/what-is-to-be-done-lenin/",
    coverType: "slab",
    category: "Lenin"
  },
  {
    slug: "revolution-betrayed",
    author: "Leon Trotsky",
    title: "The Revolution Betrayed",
    desc: "Trotsky's brilliant analysis of the bureaucratic degeneration of the Soviet Union under Stalin, and the need for political revolution.",
    buyUrl: "https://wellredbooks.co.uk/product/the-revolution-betrayed-leon-trotsky/",
    coverType: "slab",
    category: "Trotsky"
  },
  {
    slug: "history-russian-revolution",
    author: "Leon Trotsky",
    title: "History of the Russian Revolution",
    desc: "A monumental, eyewitness account of the events of 1917, detailing the creative force and consciousness of the revolutionary masses.",
    buyUrl: "https://wellredbooks.co.uk/product/history-of-the-russian-revolution-trotsky/",
    coverType: "slab",
    category: "Trotsky"
  },
  {
    slug: "history-british-trotskyism",
    author: "Ted Grant",
    title: "History of British Trotskyism",
    desc: "An essential chronicle of the struggle to build a genuine Marxist tendency in Britain from the 1930s to the post-war period.",
    buyUrl: "https://wellredbooks.co.uk/product/history-of-british-trotskyism-ted-grant/",
    coverType: "slab",
    category: "Ted Grant"
  },
  {
    slug: "reason-in-revolt",
    author: "Ted Grant & Alan Woods",
    title: "Reason in Revolt",
    desc: "A masterly defense of dialectical materialism, demonstrating its validity in relation to the latest discoveries in modern science.",
    buyUrl: "https://wellredbooks.co.uk/product/reason-in-revolt-alan-woods-ted-grant/",
    coverType: "slab",
    category: "Ted Grant"
  },
  {
    slug: "history-philosophy",
    author: "Alan Woods",
    title: "The History of Philosophy: A Marxist Perspective",
    desc: "A sweeping overview of the history of rational thought, from the ancient Greeks through Hegel to the triumph of dialectical materialism.",
    buyUrl: "https://wellredbooks.co.uk/product/the-history-of-philosophy-a-marxist-perspective/",
    readUrl: "uploads/The History of Philosophy: A Marxist Perspective.epub/",
    coverType: "image",
    coverImage: "uploads/The History of Philosophy: A Marxist Perspective.epub/OEBPS/image/cover.jpg",
    category: "Alan Woods"
  },
  {
    slug: "bolshevism-road-revolution",
    author: "Alan Woods",
    title: "Bolshevism: The Road to Revolution",
    desc: "A monumental history of the Bolshevik Party, examining the tactical debates and struggles that forged the party of 1917.",
    buyUrl: "https://wellredbooks.co.uk/product/bolshevism-the-road-to-revolution-alan-woods/",
    coverType: "slab",
    category: "Alan Woods"
  }
];

// ── Site chrome: Masthead / Nav / Footer (verbatim from sibling pages) ────────
function Masthead({ menuOpen, setMenuOpen }) {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => searchRef.current && searchRef.current.focus(), 80);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="masthead">
      <div className="mast-left">
        <a href="index.html" className="mast-logo-link" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
          <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" className="mast-logo" />
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
      </div>

      {menuOpen && (
        <div className="menu-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-drawer-inner">
              <div className="menu-drawer-header">
                <div className="menu-drawer-brand">
                  <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" />
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

              <form
                className="menu-drawer-search"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = searchValue.trim();
                  window.location.href = "search.html" + (q ? "?q=" + encodeURIComponent(q) : "");
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg>
                <input
                  ref={searchRef}
                  type="search"
                  className="menu-drawer-search-input"
                  placeholder="Search marxist.com…"
                  aria-label="Search marxist.com"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>

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
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
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

function Nav({ active, onOpenMenu }) {
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
        <button
          className="nav-menu-btn"
          aria-label="Open menu and search"
          onClick={onOpenMenu}
          type="button"
        >
          <svg className="nav-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
            <line x1="2" y1="6" x2="21" y2="6" />
            <line x1="2" y1="11" x2="13" y2="11" />
            <line x1="2" y1="16" x2="10" y2="16" />
            <circle cx="16" cy="15" r="4" />
            <line x1="19.2" y1="18.2" x2="22" y2="21" />
          </svg>
          <span className="nav-menu-label">Menu</span>
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-top">
        <div className="foot-brand">
          <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" />
          <div>
            <div className="foot-brand-wm">MARXIST.COM</div>
            <div className="foot-brand-tag">Home of the Revolutionary Communist International</div>
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <div className="foot-col-h">Sections</div>
            <a href="index.html">Analysis</a>
            <a href="theory.html">Theory</a>
            <a href="history.html">History</a>
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

// ── SlabCover Component ──────────────────────────────────────────────────────
function SlabCover({ title, author }) {
  return (
    <div className="slab-cover">
      <div className="slab-cover-texture" />
      <div className="slab-cover-border-art" />
      <div className="slab-cover-author">{author}</div>
      <div className="slab-cover-title">{title}</div>
      <div className="slab-cover-foot">
        <span>RCI Classics</span>
        <span className="slab-cover-star">★</span>
      </div>
    </div>
  );
}

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  // Filter books list
  const filteredBooks = useMemo(() => {
    return CLASSIC_BOOKS.filter(book => {
      // Author filter
      if (selectedAuthor !== "All" && book.category !== selectedAuthor) {
        return false;
      }
      // Query filter
      if (query.trim()) {
        const lowerQ = query.toLowerCase();
        return (
          book.title.toLowerCase().includes(lowerQ) ||
          book.author.toLowerCase().includes(lowerQ) ||
          book.desc.toLowerCase().includes(lowerQ)
        );
      }
      return true;
    });
  }, [query, selectedAuthor]);

  const authorsList = ["All", "Marx & Engels", "Lenin", "Trotsky", "Ted Grant", "Alan Woods"];

  return (
    <div className="site">
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />

      <main className="site-main">
        {/* Classics Hero Banner */}
        <section className="theory-hero">
          <div className="theory-hero-content">
            <span className="theory-hero-eyebrow">RCI Classics</span>
            <h1 className="theory-hero-h1">Marxist Classics</h1>
            <p className="theory-hero-p">
              Explore the fundamental texts of revolutionary theory. Arm yourself with the ideas of <b>Karl Marx, Friedrich Engels, V.I. Lenin, Leon Trotsky, Ted Grant</b> and <b>Alan Woods</b>. Read directly inside our custom interactive viewer or order printed copies.
            </p>
          </div>
        </section>

        {/* Filter Controls & Search */}
        <section className="theory-controls">
          <div className="author-filter-tabs">
            {authorsList.map((author) => (
              <PrintButton
                key={author}
                active={selectedAuthor === author}
                size="sm"
                variant={selectedAuthor === author ? "ink" : "paper"}
                onClick={() => setSelectedAuthor(author)}
              >
                {author}
              </PrintButton>
            ))}
          </div>

          <div className="theory-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5l-4-4" />
            </svg>
            <input
              type="text"
              className="theory-search-input"
              placeholder="Search classics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Grid List */}
        {filteredBooks.length === 0 ? (
          <div className="classics-empty">
            No classics match your search criteria.
          </div>
        ) : (
          <div className="classics-grid-section">
            <SectionHead label="Fundamental Library of Marxist Classics" divider="thick-slab" />
            <div className="classics-grid">
              {filteredBooks.map((book) => (
                <div key={book.slug} className="classics-card">
                  <div className="classics-card-cover-container">
                    {book.coverType === "image" ? (
                      <div className="slab-cover" style={{ padding: 0 }}>
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                        <div className="slab-cover-texture" />
                      </div>
                    ) : (
                      <SlabCover title={book.title} author={book.author} />
                    )}
                  </div>
                  <div className="classics-card-info">
                    <span className="classics-card-author">{book.author}</span>
                    <h3 className="classics-card-title">{book.title}</h3>
                    <p className="classics-card-desc">{book.desc}</p>
                    <div className="classics-card-actions">
                      {book.readUrl ? (
                        <PrintButton 
                          variant="red" 
                          size="sm" 
                          href={`reader.html?book=${book.slug}`}
                          style={{ flexGrow: 1 }}
                        >
                          Read Online
                        </PrintButton>
                      ) : (
                        <PrintButton 
                          variant="paper" 
                          size="sm" 
                          style={{ flexGrow: 1, opacity: 0.5, cursor: "not-allowed" }}
                          disabled
                        >
                          Online Coming Soon
                        </PrintButton>
                      )}
                      <PrintButton 
                        variant="paper" 
                        size="sm" 
                        href={book.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flexGrow: 1 }}
                      >
                        Buy Book
                      </PrintButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
