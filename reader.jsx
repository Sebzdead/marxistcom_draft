// Marxist.com — Standalone Interactive EPUB Reader page script
// Loaded by reader.html. Reuses components from components.jsx.

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

// ── Site chrome: Masthead / Nav / Footer (verbatim from classics.jsx) ────────
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

              <form className="menu-drawer-search" role="search" onSubmit={(e) => e.preventDefault()}>
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

// ── Interactive EPUB Reader Component ───────────────────────────────────────
const ReaderView = ({ bookPath, bookTitle, onBack }) => {
  const containerRef = useRef(null);
  const renditionRef = useRef(null);
  const bookRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);
  const [tocOpen, setTocOpen] = useState(true);
  const [currentChapter, setCurrentChapter] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(100);

  // Apply theme to the container wrapper to create a seamless border frame
  useEffect(() => {
    const el = document.querySelector(".reader-view");
    if (el) {
      if (theme === "dark") {
        el.style.setProperty("--paper", "#222222");
        el.style.setProperty("--paper-soft", "#1a1612");
        el.style.setProperty("--rule", "#f6efef");
        el.style.setProperty("--fg", "#f6efef");
      } else if (theme === "sepia") {
        el.style.setProperty("--paper", "#f4ebd0");
        el.style.setProperty("--paper-soft", "#e4d9bc");
        el.style.setProperty("--rule", "#5c4033");
        el.style.setProperty("--fg", "#5c4033");
      } else { // light
        el.style.setProperty("--paper", "#f6efef");
        el.style.setProperty("--paper-soft", "#ece4e4");
        el.style.setProperty("--rule", "#222222");
        el.style.setProperty("--fg", "#222222");
      }
    }
    
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme);
    }
  }, [theme]);

  // Apply font size
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(fontSize + "%");
    }
  }, [fontSize]);

  // Initialize EpubJS
  useEffect(() => {
    if (!containerRef.current) return;

    // Load book pointing to unpacked OPF structure
    const book = ePub(bookPath, { openAs: 'directory' });
    bookRef.current = book;

    const rendition = book.renderTo(containerRef.current, {
      width: "100%",
      height: "100%",
      flow: "paginated",
      allowScriptedContent: true
    });
    renditionRef.current = rendition;

    // Define themes injected into the EPUB iframe doc
    rendition.themes.register("light", {
      body: { background: "#f6efef", color: "#222222", "font-family": "Cormorant Garamond, Georgia, serif" },
      p: { "font-size": "1.08em", "line-height": "1.55" },
      h1: { color: "#da0d10" },
      h2: { color: "#da0d10" },
      a: { color: "#da0d10" }
    });
    rendition.themes.register("sepia", {
      body: { background: "#f4ebd0", color: "#5c4033", "font-family": "Cormorant Garamond, Georgia, serif" },
      p: { "font-size": "1.08em", "line-height": "1.55" },
      h1: { color: "#8a0608" },
      h2: { color: "#8a0608" },
      a: { color: "#8a0608" }
    });
    rendition.themes.register("dark", {
      body: { background: "#222222", color: "#f6efef", "font-family": "Cormorant Garamond, Georgia, serif" },
      p: { "font-size": "1.08em", "line-height": "1.55" },
      h1: { color: "#da0d10" },
      h2: { color: "#da0d10" },
      a: { color: "#da0d10" }
    });

    rendition.themes.select(theme);
    rendition.themes.fontSize(fontSize + "%");

    rendition.display().then(() => {
      setLoading(false);
    });

    // Load Navigation / TOC
    book.loaded.navigation.then((nav) => {
      setToc(nav.toc || []);
    });

    // Relocated events for page numbering and tracking
    rendition.on("relocated", (location) => {
      if (location.start) {
        if (location.start.percentage) {
          setProgress(location.start.percentage * 100);
        }
        
        // Match current chapter name
        if (book.navigation && book.navigation.toc) {
          const matchingItem = book.navigation.toc.find(item => 
            item.href && rendition.epubcfi.compare(location.start.cfi, item.href) >= 0
          );
          if (matchingItem) {
            setCurrentChapter(matchingItem.label);
          } else {
            const index = location.start.index;
            if (book.navigation.toc[index]) {
              setCurrentChapter(book.navigation.toc[index].label);
            }
          }
        }
        
        if (location.start.displayed) {
          const page = location.start.displayed.page;
          const total = location.start.displayed.total;
          if (page && total) {
            setCurrentPage(`Page ${page} of ${total}`);
          }
        }
      }
    });

    // Keyboard controls (Left / Right Arrow)
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        rendition.next();
      } else if (e.key === "ArrowLeft") {
        rendition.prev();
      }
    };
    
    // Bind to parent window and iframe content
    window.addEventListener("keydown", handleKeyDown);
    rendition.on("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      book.destroy();
    };
  }, [bookPath]);

  // Re-trigger lucide icons when loading or drawer updates
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [loading, tocOpen, toc]);

  const handleTocLinkClick = (e, href) => {
    e.preventDefault();
    if (renditionRef.current) {
      renditionRef.current.display(href);
    }
  };

  const handleNextPage = () => {
    if (renditionRef.current) renditionRef.current.next();
  };

  const handlePrevPage = () => {
    if (renditionRef.current) renditionRef.current.prev();
  };

  const increaseFont = () => {
    setFontSize(prev => Math.min(180, prev + 10));
  };

  const decreaseFont = () => {
    setFontSize(prev => Math.max(70, prev - 10));
  };

  return (
    <div className="reader-view" data-theme={theme}>
      {/* Loading Overlay */}
      {loading && (
        <div className="reader-loading-overlay">
          <div className="reader-loading-spinner" />
          <div className="reader-loading-text">Loading: {bookTitle}</div>
        </div>
      )}

      {/* Toolbar */}
      <div className="reader-toolbar">
        <div className="reader-toolbar-group">
          <button className="reader-control-btn" onClick={onBack} title="Back to library">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Library</span>
          </button>
          
          <button className="reader-control-btn" onClick={() => setTocOpen(!tocOpen)} title="Table of Contents">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span>Contents</span>
          </button>
        </div>

        {currentChapter && (
          <div className="current-chapter-label" title={currentChapter}>
            {currentChapter}
          </div>
        )}

        <div className="reader-toolbar-group">
          {currentPage && <div className="current-page-label">{currentPage}</div>}

          {/* Font Resizing */}
          <div className="reader-toolbar-group" style={{ gap: 4 }}>
            <button className="reader-control-btn" onClick={decreaseFont} title="Decrease font size" style={{ padding: "0 8px", minWidth: 32 }}>
              A-
            </button>
            <button className="reader-control-btn" onClick={increaseFont} title="Increase font size" style={{ padding: "0 8px", minWidth: 32 }}>
              A+
            </button>
          </div>

          {/* Themes */}
          <div className="theme-swatch-group">
            <button className={`theme-swatch light ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")} title="Paper Theme" />
            <button className={`theme-swatch sepia ${theme === "sepia" ? "active" : ""}`} onClick={() => setTheme("sepia")} title="Sepia Theme" />
            <button className={`theme-swatch dark ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")} title="Dark Theme" />
          </div>
        </div>
      </div>

      {/* Reader Workspace */}
      <div className="reader-workspace">
        {/* Table of Contents Drawer */}
        <div className="reader-toc-sidebar" data-collapsed={!tocOpen}>
          <div className="reader-toc-sidebar-content">
            <h3 className="toc-title">Table of Contents</h3>
            <ul className="toc-list">
              {toc.map((item, idx) => (
                <li key={idx} className="toc-item">
                  <a 
                    href={item.href} 
                    className={`toc-link ${currentChapter === item.label ? "active" : ""}`}
                    onClick={(e) => handleTocLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Viewer Pane */}
        <div className="reader-main">
          {/* Nav Click Zones */}
          <button className="reader-nav-overlay prev" onClick={handlePrevPage} aria-label="Previous Page">
            <div className="nav-arrow-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </button>

          <button className="reader-nav-overlay next" onClick={handleNextPage} aria-label="Next Page">
            <div className="nav-arrow-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>

          {/* Viewer Target Container */}
          <div className="epub-container">
            <div ref={containerRef} className="epub-viewer-element" />
          </div>

          {/* Progress Bar */}
          <div className="reader-progress-wrap">
            <div className="reader-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";

    // Extract book slug from query parameter
    const params = new URLSearchParams(window.location.search);
    const bookSlug = params.get("book");
    if (bookSlug) {
      const matched = CLASSIC_BOOKS.find(b => b.slug === bookSlug);
      if (matched && matched.readUrl) {
        setBook(matched);
      } else {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, []);

  const handleBackToLibrary = () => {
    window.location.href = "classics.html";
  };

  if (notFound) {
    return (
      <div className="site">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />
        <main className="site-main" style={{ padding: "64px 20px", textAlign: "center" }}>
          <div className="classics-empty" style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-headline)", textTransform: "uppercase", marginBottom: 16 }}>Book Not Found</h2>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, marginBottom: 24 }}>
              The requested book could not be found or is not currently available for online reading.
            </p>
            <PrintButton variant="red" size="md" onClick={handleBackToLibrary}>
              Back to Classics Library
            </PrintButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="site">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />
        <main className="site-main" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <div className="reader-loading-spinner" />
        </main>
      </div>
    );
  }

  return (
    <div className="site" style={{ padding: "0 28px 20px" }}>
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active="Classics" onOpenMenu={() => setMenuOpen(true)} />
      <main className="site-main">
        <ReaderView 
          bookPath={book.readUrl} 
          bookTitle={book.title}
          onBack={handleBackToLibrary} 
        />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
