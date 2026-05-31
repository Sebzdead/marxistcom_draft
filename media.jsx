// Marxist.com — Podcasts & Media page
// Standalone sibling to app.jsx (index.html) and join.jsx (join.html).
// Loaded by media.html.
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage) ───────────────────────────────────────
const NAV_TABS = [
  { label: "Analysis", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];

const PODCAST_SHOWS = [
  {
    id: "spectre",
    title: "The Spectre of Communism",
    kicker: "Theory & Strategy · Weekly",
    desc: "Arming listeners with the ideas necessary to defend communist principles and understand the world from a Marxist perspective.",
    cover: "assets/spectre.png",
    spotifyEmbed: "https://open.spotify.com/embed/show/06K659w5g715qO30W1H13z?utm_source=generator&theme=0",
    spotifyUrl: "https://open.spotify.com/show/06K659w5g715qO30W1H13z",
    appleUrl: "https://podcasts.apple.com/us/podcast/spectre-of-communism/id1683838661",
    rssUrl: "https://anchor.fm/s/fb2ec680/podcast/rss",
  },
  {
    id: "stream",
    title: "Against the Stream",
    kicker: "Current Affairs · Weekly",
    desc: "Weekly current affairs podcast looking behind the mainstream headlines to analyze the real processes and class interests at play.",
    cover: "assets/ATS.webp",
    spotifyEmbed: "https://open.spotify.com/embed/show/68nGNHz5lB8UZXICGIDMva?utm_source=generator&theme=0",
    spotifyUrl: "https://open.spotify.com/show/68nGNHz5lB8UZXICGIDMva",
    appleUrl: "https://podcasts.apple.com/us/podcast/against-the-stream/id1777793987",
    rssUrl: "https://anchor.fm/s/fbf6d6b8/podcast/rss",
  }
];

const EPISODES = [
  {
    id: "ep1",
    showId: "spectre",
    showName: "The Spectre of Communism",
    title: "The 1926 General Strike: Britain's revolution betrayed",
    date: "26 May 2026",
    duration: "45 mins",
    desc: "A century ago, British workers waged a general strike that reached revolutionary proportions, threatening the very foundations of capitalist society.",
    url: "article.html?file=1926-general-strike",
    listenUrl: "https://open.spotify.com/show/06K659w5g715qO30W1H13z"
  },
  {
    id: "ep2",
    showId: "stream",
    showName: "Against the Stream",
    title: "Capitalism is ungovernable",
    date: "21 May 2026",
    duration: "38 mins",
    desc: "Six prime ministers in ten years. Has Britain become ungovernable? We discuss the systemic decay under the surface.",
    url: "article.html?file=capitalism-ungovernable",
    listenUrl: "https://open.spotify.com/show/68nGNHz5lB8UZXICGIDMva"
  },
  {
    id: "ep3",
    showId: "stream",
    showName: "Against the Stream",
    title: "The meaning of Trump's trip to China",
    date: "14 May 2026",
    duration: "41 mins",
    desc: "Trump is negotiating from a position of weakness rather than strength. A breakdown of inter-imperialist rivalries in 2026.",
    url: "article.html?file=trump-china-trip",
    listenUrl: "https://open.spotify.com/show/68nGNHz5lB8UZXICGIDMva"
  },
  {
    id: "ep4",
    showId: "spectre",
    showName: "The Spectre of Communism",
    title: "Why we need a Revolutionary Communist International",
    date: "8 May 2026",
    duration: "52 mins",
    desc: "A theoretical breakdown of the founding manifesto of the RCI. Why organization is the ultimate weapon of the working class.",
    url: "#",
    listenUrl: "https://open.spotify.com/show/06K659w5g715qO30W1H13z"
  },
  {
    id: "ep5",
    showId: "spectre",
    showName: "The Spectre of Communism",
    title: "Lenin and the struggle for the revolutionary party",
    date: "30 Apr 2026",
    duration: "49 mins",
    desc: "To mark the centenary of Lenin's death, we examine his life-long fight to build a vanguard organization of professional cadres.",
    url: "#",
    listenUrl: "https://open.spotify.com/show/06K659w5g715qO30W1H13z"
  },
  {
    id: "ep6",
    showId: "stream",
    showName: "Against the Stream",
    title: "May Day: The history of working-class struggle",
    date: "1 May 2026",
    duration: "35 mins",
    desc: "From the Chicago martyrs to the modern fight for the eight-hour day. The internationalist roots of International Workers' Day.",
    url: "#",
    listenUrl: "https://open.spotify.com/show/68nGNHz5lB8UZXICGIDMva"
  }
];

const VIDEOS = {
  featured: {
    id: "MhOCEYM8LZE",
    title: "The Communists Are Coming – A Visual Manifesto",
    kicker: "RCI Documentary",
    desc: "A bold visual declaration of our program, our ideas, and the tasks of the Revolutionary Communist International in an era of capitalist collapse.",
    date: "15 Feb 2026",
    duration: "20 mins"
  },
  others: [
    {
      id: "3gxpmBaRWZc",
      title: "Leon Trotsky – The Life of a Revolutionary",
      kicker: "Biography",
      desc: "Narrated by Alan Woods, this feature documentary charts the life of Leon Trotsky, from organizing the Red Army to his fight against Stalinism.",
      date: "20 Aug 2017",
      duration: "1 hr 38 mins"
    },
    {
      id: "w-zJq9Veusg",
      title: "Marx Walk – The Life of Karl Marx in London",
      kicker: "Historical Tour",
      desc: "Take a walk through the streets of London and discover the places where Karl Marx lived, studied, and formulated the principles of scientific socialism.",
      date: "5 May 2024",
      duration: "25 mins"
    }
  ]
};

// ── Masthead Component ──────────────────────────────────────────────────────
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
function PodcastCard({ show }) {
  return (
    <div className="podcast-card">
      <div className="podcast-card-header">
        <div className="podcast-cover-wrap">
          <img src={show.cover} alt={show.title} className="podcast-cover" />
        </div>
        <div className="podcast-info">
          <div>
            <Eyebrow style={{ fontSize: 10, letterSpacing: "0.14em", marginBottom: 4 }}>{show.kicker}</Eyebrow>
            <h3 className="podcast-title">{show.title}</h3>
          </div>
          <div className="podcast-links">
            <a href={show.spotifyUrl} className="listen-badge" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.5 9.822 1.135.296.18.387.563.205.855zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.077-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.667-1.114 8.234-.574 11.345 1.34.368.228.49.708.26 1.076zm.106-2.845C14.773 8.87 9.593 8.7 6.6 9.61c-.476.145-.98-.124-1.126-.6-.145-.476.124-.98.6-.126 3.447-1.045 9.17-.85 12.8 1.305.43.255.57.81.317 1.24-.254.43-.81.57-1.24.316z"/></svg>
              Spotify
            </a>
            <a href={show.appleUrl} className="listen-badge" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.84 10.3c-.03 1.94 1.58 2.87 1.65 2.92-1.35 1.98-3.46 2.06-4.14 2.08-1.74.1-3.2-.84-3.92-.84-.73 0-2-.8-3.32-.8 1.74-2.76 4.34-3.15 5.25-3.23 1.83-.16 3.12.87 3.96.87.82 0 1.98-.82 3.1-.82.47 0 1.79.05 2.65.92-1.32.9-1.57 2.06-1.57 3.03zM12 6.7c.8-.97 1.33-2.3 1.18-3.64-1.15.05-2.54.77-3.36 1.73-.73.83-1.37 2.2-1.2 3.5 1.28.1 2.58-.62 3.38-1.59z"/></svg>
              Apple
            </a>
            <a href={show.rssUrl} className="listen-badge" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM3 3h2.68c8.13 0 14.73 6.6 14.73 14.73v.53H17.73c0-6.66-5.4-12.05-12.05-12.05H3V3zm0 5.86h2.68c4.9 0 8.87 3.97 8.87 8.87v.53h-2.68c0-3.42-2.78-6.19-6.19-6.19H3V8.86z"/></svg>
              RSS Feed
            </a>
          </div>
        </div>
      </div>
      <div className="embed-container">
        <iframe src={show.spotifyEmbed} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      </div>
    </div>
  );
}

// ── Episodes Feed Component ─────────────────────────────────────────────────
function EpisodeFeed() {
  const [filter, setFilter] = useState("all");

  const filteredEpisodes = useMemo(() => {
    if (filter === "all") return EPISODES;
    return EPISODES.filter(ep => ep.showId === filter);
  }, [filter]);

  return (
    <div className="episode-feed">
      <div className="feed-controls">
        <Eyebrow style={{ fontSize: 13, letterSpacing: "0.22em" }}>Recent Episodes</Eyebrow>
        <div className="feed-filter-btn">
          <PrintButton
            active={filter === "all"}
            size="sm"
            variant={filter === "all" ? "ink" : "paper"}
            onClick={() => setFilter("all")}
          >
            All
          </PrintButton>
          <PrintButton
            active={filter === "stream"}
            size="sm"
            variant={filter === "stream" ? "ink" : "paper"}
            onClick={() => setFilter("stream")}
          >
            Against the Stream
          </PrintButton>
          <PrintButton
            active={filter === "spectre"}
            size="sm"
            variant={filter === "spectre" ? "ink" : "paper"}
            onClick={() => setFilter("spectre")}
          >
            Spectre of Communism
          </PrintButton>
        </div>
      </div>
      <div className="episode-list">
        {filteredEpisodes.map((ep) => (
          <a key={ep.id} href={ep.url} className="episode-row">
            <div className="episode-row-date">{ep.date}</div>
            <div className="episode-row-content">
              <span className="episode-row-kicker">{ep.showName}</span>
              <h4 className="episode-row-title episode-row-title--serif">{ep.title}</h4>
              <p className="episode-row-desc">{ep.desc}</p>
            </div>
            <div className="episode-row-duration">
              {ep.duration}
              <div style={{ marginTop: 8 }}>
                <PrintButton variant="paper" size="sm" href={ep.listenUrl} target="_blank" rel="noopener noreferrer">
                  Play ▹
                </PrintButton>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Videos Grid Component ───────────────────────────────────────────────────
function VideosSection() {
  const f = VIDEOS.featured;
  return (
    <section className="videos-section">
      <SectionHead label="Selected Videos" divider="thick-slab" />
      <div className="videos-grid">
        {/* Left: big featured video */}
        <div className="video-featured">
          <div className="video-player-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${f.id}`}
              title={f.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="video-meta">
            <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--rci-red-hot)" }}>
              ★ Featured Video · {f.duration}
            </Eyebrow>
            <h3 className="video-title">{f.title}</h3>
            <p className="video-desc">{f.desc}</p>
          </div>
        </div>

        {/* Right: small list */}
        <div className="video-list">
          {VIDEOS.others.map((v) => (
            <div key={v.id} className="video-card-small">
              <div className="video-player-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-meta">
                <Eyebrow style={{ fontSize: 10, letterSpacing: "0.18em" }}>
                  {v.kicker} · {v.duration}
                </Eyebrow>
                <h4 className="video-title video-title--small">{v.title}</h4>
                <p className="video-desc video-desc--small">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  return (
    <div className="site">
      <Masthead />
      <Nav active="Podcasts & Media" />
      
      <main className="site-main">
        {/* Podcasts Section */}
        <section className="podcasts-section">
          <SectionHead label="Official Podcasts" divider="thick-slab" />
          <div className="podcasts-grid">
            <div className="podcasts-left">
              {PODCAST_SHOWS.map(show => (
                <PodcastCard key={show.id} show={show} />
              ))}
            </div>
            <EpisodeFeed />
          </div>
        </section>

        {/* Videos Section */}
        <VideosSection />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
