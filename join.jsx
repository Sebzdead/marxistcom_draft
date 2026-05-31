// Marxist.com — Join the RCI
// Standalone sibling to app.jsx. Loaded by join.html.
// Reuses PrintButton, Eyebrow from components.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by host bundler) but fall back to live path
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

// ── National sections data ──────────────────────────────────────────────────
// Source: National Sections of the RCI brief. Each section is either a single
// org (country + org + url) or a multi-language country with `langs[]`.
const REGIONS = [
  {
    id: "africa",
    name: "Africa",
    sections: [
      { country: "Nigeria", org: "Marxist Alternative", url: "https://marxistalternative.org/" },
      { country: "South Africa", org: "Revolutionary Communists of South Africa", url: "https://marxist.co.za/" },
    ],
  },
  {
    id: "asia",
    name: "Asia",
    sections: [
      { country: "India", org: "Revolutionary Communists of India", url: "https://communiststruggle.com/" },
      { country: "Malaysia", org: "Ombak Revolusi", url: "https://ombakrevolusi.com/" },
      { country: "Japan", org: "Class Struggle (階級闘争)", url: "https://communist.jp/" },
      { country: "Pakistan", org: "Inqalabi Communist Party", url: "https://communist.pk/" },
      { country: "Taiwan", org: "Revolutionary Communist Party of Taiwan (台灣革命共產黨)", url: "https://marxist.tw/" },
    ],
  },
  {
    id: "australasia",
    name: "Australasia",
    sections: [
      { country: "Australia", org: "RCI Australia", url: "https://communist.org.au/" },
      { country: "New Zealand", org: "Revolutionary Communists", url: "https://communist.nz/" },
    ],
  },
  {
    id: "latin-america",
    name: "Latin America",
    sections: [
      { country: "Argentina", org: "Revolución", url: "https://argentinamilitante.org/" },
      { country: "Brazil", org: "Internacional Comunista Revolucionária (Brasil)", url: "https://marxista.org/" },
      { country: "Chile", org: "Comunistas Revolucionarios", url: "https://marxista.cl/" },
      { country: "Colombia", org: "Colombia Marxista", url: "https://colombiamarxista.com/" },
      { country: "El Salvador", org: "Revolución Comunista", url: "https://elcomunista.org/" },
      { country: "Mexico", org: "Organización Comunista Revolucionaria", url: "https://marxismo.mx/" },
      { country: "Puerto Rico", org: "Rumbo Alterno", url: "https://rumboalterno.net/" },
      { country: "Venezuela", org: "Lucha de Clases", url: "https://luchadeclases.com/" },
    ],
  },
  {
    id: "north-america",
    name: "North America",
    sections: [
      { country: "Canada", org: "Communist Revolution", url: "https://www.marxist.ca/" },
      { country: "Québec", org: "Révolution Communiste", url: "https://www.marxiste.qc.ca/" },
      { country: "USA", org: "Revolutionary Communists of America", url: "https://communistusa.org/" },
    ],
  },
  {
    id: "middle-east",
    name: "Middle East / West Asia",
    sections: [
      { country: "Arabic", org: "Marxy.com", url: "https://www.marxy.com/" },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    sections: [
      { country: "Austria", org: "Revolutionäre Kommunistische Partei", url: "https://www.derfunke.at/" },
      { country: "Belgium", langs: [
        { lang: "Flemish", org: "Revolutionaire Communistische Organisatie", url: "https://www.vonk.org/" },
        { lang: "French", org: "Organisation Communiste Révolutionnaire", url: "https://marxiste.be/" },
      ] },
      { country: "Britain", org: "Revolutionary Communist Party", url: "https://communist.red/" },
      { country: "Czechia and Slovakia", org: "Avantgarda", url: "https://komunisticka-avantgarda.com/" },
      { country: "Denmark", org: "Revolutionært Kommunistisk Parti", url: "https://marxist.dk/" },
      { country: "France", org: "Parti Communiste Révolutionnaire", url: "https://www.marxiste.org/" },
      { country: "Finland", org: "Vallankumous", url: "https://marxisti.com/" },
      { country: "Germany", org: "Revolutionäre Kommunistische Partei", url: "https://derkommunist.de/" },
      { country: "Greece", org: "Κομμουνιστική Επανάσταση", url: "https://www.marxismos.com/" },
      { country: "Ireland", org: "Revolutionary Communists of Ireland", url: "https://communism.ie/" },
      { country: "Italy", org: "Partito Comunista Rivoluzionario", url: "https://rivoluzione.red/" },
      { country: "Netherlands", org: "Revolutionaire Communisten", url: "https://marxisten.nl/" },
      { country: "Norway", org: "Revolusjon", url: "https://marxister.no/" },
      { country: "Poland", org: "Czerwony Front", url: "https://czerwonyfront.org/" },
      { country: "Portugal", org: "Coletivo Comunista Revolucionário", url: "https://www.comunistasrevolucionarios.pt/" },
      { country: "Spain", org: "Organización Comunista Revolucionaria", url: "https://www.comunistasrevolucionarios.org/" },
      { country: "Catalonia", org: "Organització Comunista Revolucionària", url: "https://www.marxista.cat/" },
      { country: "Sweden", org: "Revolutionära Kommunistiska Partiet", url: "https://www.marxist.se/" },
      { country: "Switzerland", langs: [
        { lang: "German", org: "Revolutionäre Kommunistische Partei", url: "https://kommunismus.ch/" },
        { lang: "French", org: "Parti communiste révolutionnaire", url: "https://communisme.ch/" },
      ] },
      { country: "Ukraine", org: "Комуна", url: "https://marxistua.com/" },
      { country: "Yugoslavia", langs: [
        { lang: "Serbo-Croatian", org: "Crvena Kritika", url: "https://www.crvenakritika.org/" },
        { lang: "Macedonian", org: "novaiskra.mk", url: "https://novaiskra.mk/" },
      ] },
    ],
  },
];

// All country names from REGIONS — used to seed the form's country dropdown.
const COUNTRY_OPTIONS = (() => {
  const list = [];
  REGIONS.forEach((r) => r.sections.forEach((s) => list.push(s.country)));
  return list.sort((a, b) => a.localeCompare(b));
})();

// ── Placeholder article generator ───────────────────────────────────────────
// Two activity dispatches per section. Deterministic so re-renders are stable.
const ARTICLE_TEMPLATES = [
  (c) => `${c}: workers and youth take to the streets`,
  (c) => `Building the revolutionary party in ${c}`,
  (c) => `Why the future belongs to the communists in ${c}`,
  (c) => `Class struggle sharpens across ${c}`,
  (c) => `${c}: against the bosses, for socialism`,
  (c) => `From protest to power — the road ahead in ${c}`,
  (c) => `${c}: building roots in the working class`,
  (c) => `${c} congress: forging the cadres of revolution`,
];
const ARTICLE_STAMPS = ["2 DAYS AGO", "4 DAYS AGO", "1 WEEK AGO", "2 WEEKS AGO", "3 WEEKS AGO"];

function getArticles(country, idx) {
  return [
    {
      kicker: country.toUpperCase(),
      title: ARTICLE_TEMPLATES[idx % ARTICLE_TEMPLATES.length](country),
      stamp: ARTICLE_STAMPS[idx % ARTICLE_STAMPS.length],
    },
    {
      kicker: country.toUpperCase(),
      title: ARTICLE_TEMPLATES[(idx + 3) % ARTICLE_TEMPLATES.length](country),
      stamp: ARTICLE_STAMPS[(idx + 2) % ARTICLE_STAMPS.length],
    },
  ];
}

// ── Masthead ────────────────────────────────────────────────────────────────
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg>
            )}
          </button>
        </div>
        <div className="mast-socials">
          <a href="https://www.youtube.com/@revcomintern" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          </a>
          <a href="https://www.instagram.com/revcomintern/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://x.com/revcomintern" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://t.me/marxistcom" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.34 18.7 19.7c-.24 1.08-.88 1.34-1.78.84l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96L17.8 6.5c.4-.36-.08-.55-.62-.2L7.6 12.4l-4.92-1.54c-1.07-.34-1.1-1.07.22-1.58l19.27-7.43c.9-.34 1.68.2 1.38 1.58z"/></svg>
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

// ── Primary nav ─────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="primary-nav">
      <div className="nav-inner">
        {NAV_TABS.map((tab) => {
          const isActive = tab.label === "Join the RCI";
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

// ── Banner ──────────────────────────────────────────────────────────────────
function Banner() {
  return (
    <section className="banner" aria-label="Are you ready to fight?">
      <div className="banner-img">
        <img src={R("imgBanner", "assets/globe-red.png")} alt="Globe — Workers of the world" />
      </div>
      <div className="banner-grain" aria-hidden="true" />
      <div className="banner-scrim" aria-hidden="true" />
      <div className="banner-stamp" aria-hidden="true">
        <span>Image</span><span>Placeholder</span>
      </div>
      <div className="banner-overlay">
        <div className="banner-text">
          <h1 className="banner-h1">Are you ready<br/>to fight?</h1>
          <div className="banner-tag">
            <span className="banner-tag-flag">★</span>
            Join the Revolutionary Communist International
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Intro / pull-quotes ─────────────────────────────────────────────────────
function Intro() {
  return (
    <section className="intro">
      <p className="intro-p intro-p--lede">
        Millions can see that the world is on fire and that revolutionary upheavals are being prepared on a world scale. In the midst of this crisis of the global capitalist system, the only force capable of transforming society is the organised and mobilised working class. <b>But in order for our class to fight and win, we need to build an international organisation to coordinate this struggle.</b>
      </p>

      <figure className="pullquote pullquote--left">
        <div className="pullquote-mark" aria-hidden="true">“</div>
        <blockquote className="pullquote-text">
          The world political situation as a whole is chiefly characterized by a historical crisis of the leadership of the proletariat.
        </blockquote>
        <figcaption className="pullquote-attr">— Leon Trotsky</figcaption>
      </figure>

      <p className="intro-p">
        The Revolutionary Communist International has made outstanding progress in the recent period, growing by leaps and bounds. However, the pace of history is accelerating and we urgently need to expand our forces.
      </p>

      <figure className="pullquote pullquote--right">
        <div className="pullquote-mark" aria-hidden="true">“</div>
        <blockquote className="pullquote-text">
          Without revolutionary theory there can be no revolutionary movement.
        </blockquote>
        <figcaption className="pullquote-attr">— V. I. Lenin</figcaption>
      </figure>

      <p className="intro-p">
        The building of revolutionary organisations around the world is the burning question of our time — not in the remote future, but <b>now</b>. We are determined to carry out this historic task. But in order to achieve it, <b>we need you</b>. The list below shows some of our national sections, but there are also groups of comrades building in many more countries. If you do not see your country listed, please reach out to us via the form.
      </p>
    </section>
  );
}

// ── Join form (centerpiece) ─────────────────────────────────────────────────
function JoinForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("join-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", country: "", message: "" });
  };

  if (submitted) {
    return (
      <section className="join-form-wrap join-form-wrap--success" id="join-form">
        <div className="join-form-head">
          <Eyebrow style={{ color: "var(--rci-red-hot)", fontSize: 14, letterSpacing: "0.26em" }}>
            ✓ Message received
          </Eyebrow>
          <h2 className="join-form-h2">Workers of the world, unite.</h2>
        </div>
        <div className="join-form-body" style={{ padding: "40px 40px 48px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.5, color: "var(--rci-ink)", maxWidth: "52ch", margin: "0 0 22px" }}>
            Thank you, comrade <b>{form.name || "—"}</b>. We’ll be in touch at <b>{form.email}</b> within 48 hours to put you in contact with your nearest section.
          </p>
          <PrintButton variant="paper" size="md" onClick={reset}>Send another message</PrintButton>
        </div>
      </section>
    );
  }

  return (
    <section className="join-form-wrap" id="join-form">
      <form onSubmit={onSubmit} noValidate>
        <div className="join-form-head">
          <Eyebrow style={{ color: "var(--rci-red-hot)", fontSize: 14, letterSpacing: "0.26em" }}>
            Sign up · We need you
          </Eyebrow>
          <h2 className="join-form-h2">
            Join the Revolutionary<br/>Communist International
          </h2>
          <p className="join-form-dek">
            Fill in the form below. A comrade from your nearest section will reach out within 48 hours.
          </p>
        </div>
        <div className="join-form-body">
          <div className="join-form-grid">
            <div className="join-form-field full">
              <label htmlFor="msg" className="join-form-label">Why do you want to join us?</label>
              <textarea
                id="msg"
                className="join-form-input join-form-textarea"
                rows={5}
                required
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your politics, your situation, your reasons..."
              />
            </div>
            <div className="join-form-field">
              <label htmlFor="name" className="join-form-label">Full name</label>
              <input
                id="name"
                className="join-form-input"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="First and last"
                autoComplete="name"
              />
            </div>
            <div className="join-form-field">
              <label htmlFor="email" className="join-form-label">Email</label>
              <input
                id="email"
                className="join-form-input"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="join-form-field">
              <label htmlFor="phone" className="join-form-label">Phone <span className="join-form-optional">(optional)</span></label>
              <input
                id="phone"
                className="join-form-input"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="Include country code"
                autoComplete="tel"
              />
            </div>
            <div className="join-form-field">
              <label htmlFor="country" className="join-form-label">Country</label>
              <select
                id="country"
                className="join-form-input join-form-select"
                required
                value={form.country}
                onChange={update("country")}
              >
                <option value="">Select your country…</option>
                {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                <option value="other">Other / not listed</option>
              </select>
            </div>
          </div>
          <div className="join-form-actions">
            <div className="join-form-note">
              By submitting you agree to be contacted by the RCI.
            </div>
            <PrintButton variant="red" size="lg" type="submit">Join us →</PrintButton>
          </div>
        </div>
      </form>
    </section>
  );
}

// ── Sticky region nav (continent jump) ──────────────────────────────────────
function StickyRegionNav({ regions, active, onJump }) {
  return (
    <div className="region-sticky" role="navigation" aria-label="Jump to continent">
      <div className="region-sticky-inner">
        <span className="region-sticky-label">By continent</span>
        <div className="region-sticky-tabs">
          {regions.map((r) => (
            <PrintButton
              key={r.id}
              active={r.id === active}
              variant={r.id === active ? "ink" : "paper"}
              size="sm"
              onClick={() => onJump(r.id)}
              style={{ flex: "0 0 auto" }}
            >
              {r.name}
            </PrintButton>
          ))}
        </div>
        <PrintButton variant="red" size="sm" href="#join-form" className="region-sticky-cta">Join form ↑</PrintButton>
      </div>
    </div>
  );
}

// ── Small article card (placeholder) ────────────────────────────────────────
function ArticleCardSmall({ kicker, title, stamp }) {
  return (
    <a href="#" className="article-card">
      <div className="article-card-thumb">
        <div className="article-card-thumb-wash" aria-hidden="true" />
        <div className="article-card-thumb-label">{title}</div>
        <div className="article-card-thumb-frame" aria-hidden="true" />
      </div>
      <div className="article-card-meta">
        <div className="article-card-eyebrow">{kicker}</div>
        <div className="article-card-title">{title}</div>
        <div className="article-card-stamp">{stamp}</div>
      </div>
    </a>
  );
}

// ── Single section row (one country / one org or multi-language) ───────────
function SectionRow({ section, articleIdx }) {
  const [a1, a2] = getArticles(section.country, articleIdx);
  return (
    <div className="region-section">
      <div className="region-section-meta">
        <div className="region-section-country">{section.country}</div>
        {section.langs ? (
          <div className="region-section-langs">
            {section.langs.map((l, i) => (
              <div key={i} className="region-section-lang">
                <span className="region-section-lang-label">{l.lang}</span>
                <a
                  className="region-section-org"
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.org}
                  <span className="region-section-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <a
            className="region-section-org region-section-org--solo"
            href={section.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {section.org}
            <span className="region-section-arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <div className="region-section-articles">
        <ArticleCardSmall {...a1} />
        <ArticleCardSmall {...a2} />
      </div>
    </div>
  );
}

// ── Region accordion ────────────────────────────────────────────────────────
function Region({ region, open, onToggle, articleIdxStart }) {
  return (
    <section className="region" id={region.id}>
      <button
        className="region-head"
        onClick={() => onToggle(region.id)}
        aria-expanded={open}
        aria-controls={`${region.id}-body`}
        type="button"
      >
        <div className="region-head-left">
          <span className="region-head-name">{region.name}</span>
        </div>
        <div className="region-head-right">
          <span className="region-head-action">
            {open ? "Collapse" : "Expand"}
          </span>
          <span className="region-chevron" aria-hidden="true">▾</span>
        </div>
      </button>
      <div
        className="region-body"
        id={`${region.id}-body`}
        data-open={open ? "true" : "false"}
        role="region"
        aria-label={region.name}
      >
        {region.sections.map((s, i) => (
          <SectionRow key={s.country} section={s} articleIdx={articleIdxStart + i} />
        ))}
      </div>
    </section>
  );
}

// ── Regions header / expand controls ────────────────────────────────────────
function RegionsHeader({ allOpen, onExpandAll, onCollapseAll }) {
  return (
    <div className="regions-header">
      <div className="regions-header-left">
        <Eyebrow style={{ fontSize: 14, letterSpacing: "0.22em" }}>The international</Eyebrow>
        <h2 className="regions-title">National sections of the RCI</h2>
        <p className="regions-dek">
          Building the party of the working class on every continent. Open a continent to see local organisations and their latest dispatches.
        </p>
      </div>
      <div className="regions-header-actions">
        <PrintButton variant="paper" size="sm" onClick={allOpen ? onCollapseAll : onExpandAll}>
          {allOpen ? "Collapse all" : "Expand all"}
        </PrintButton>
      </div>
    </div>
  );
}

// ── Footer (mirror homepage) ────────────────────────────────────────────────
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
            <a href="#">Podcasts</a>
            <a href="magazine.html">In Defence of Marxism</a>
            <a href="#">Bookstore</a>
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
  const [openRegions, setOpenRegions] = useState({});
  const [active, setActive] = useState(null);

  const onToggle = (id) => setOpenRegions((prev) => ({ ...prev, [id]: !prev[id] }));

  const onJump = (id) => {
    setOpenRegions((prev) => ({ ...prev, [id]: true }));
    setActive(id);
    // Wait for the body to render its content before scrolling, so the
    // browser computes the right offset and lands on the heading, not above.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const expandAll = () => {
    const all = {};
    REGIONS.forEach((r) => { all[r.id] = true; });
    setOpenRegions(all);
  };
  const collapseAll = () => setOpenRegions({});

  const allOpen = REGIONS.every((r) => !!openRegions[r.id]);
  const regionArticleStarts = useMemo(() => {
    let n = 0;
    const m = {};
    REGIONS.forEach((r) => { m[r.id] = n; n += r.sections.length; });
    return m;
  }, []);

  // Scroll spy: highlight the continent whose region heading is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0 }
    );
    REGIONS.forEach((r) => {
      const el = document.getElementById(r.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <Masthead />
      <Nav />
      <StickyRegionNav regions={REGIONS} active={active} onJump={onJump} />
      <main className="site-main">
        <Banner />
        <Intro />
        <JoinForm />
        <RegionsHeader
          allOpen={allOpen}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
        />
        <div className="regions">
          {REGIONS.map((r) => (
            <Region
              key={r.id}
              region={r}
              open={!!openRegions[r.id]}
              onToggle={onToggle}
              articleIdxStart={regionArticleStarts[r.id]}
            />
          ))}
        </div>
        <section className="not-listed">
          <Eyebrow style={{ fontSize: 13, letterSpacing: "0.24em" }}>Don’t see your country?</Eyebrow>
          <h2 className="not-listed-h2">Build the section where you are.</h2>
          <p className="not-listed-p">
            Comrades are organising in many more countries than the list above. Send us a message through the form and we’ll put you in touch with the nearest group — or help you start one.
          </p>
          <PrintButton variant="red" size="lg" href="#join-form">Go to the form ↑</PrintButton>
        </section>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
