// Marxist.com — Join the RCI
// Standalone sibling to app.jsx. Loaded by join.html.
// Reuses PrintButton, Eyebrow from components.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by host bundler) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage) ───────────────────────────────────────
const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellredbooks.co.uk/" },
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
      <div className="mast-inner">
        <a href="index.html" className="mast-brand">
          <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" className="mast-logo" />
          <div className="mast-brand-text">
            <span className="mast-brand-pre">Home of the</span>
            <span className="mast-brand-name">Revolutionary Communist International</span>
          </div>
        </a>
        <div className="mast-right">
          <button type="button" className="mast-lang" aria-label="Choose language">&#9662; Language</button>
          <PrintButton variant="red" size="sm" href="join.html">Join Us</PrintButton>
        </div>
      </div>

      {menuOpen && (
        <div className="menu-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-drawer-inner">
              <div className="menu-drawer-header">
                <div className="menu-drawer-brand">
                  <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" />
                  <span className="mast-brand-name">Revolutionary Communist International</span>
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
                    </div>
                  </a>

                  <a href="media.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Media + Podcasts</div>
                    </div>
                  </a>

                  <a href="magazine.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">In Defence of Marxism</div>
                    </div>
                  </a>

                  <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">WellRed Books</div>
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
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Current Topics</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Iran War</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Trump 2.0</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Artificial Intelligence</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Gen Z Revolutions</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>World Economy</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Marxist Theory</div>
                    <div className="drawer-category-links">
                      <a href="theory.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Karl Marx &amp; Engels</a>
                      <a href="theory.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Vladimir Lenin</a>
                      <a href="theory.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Leon Trotsky</a>
                      <a href="classics.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>The Classics</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">RCI</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Who we are</a>
                      <a href="join.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Our sections</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Contact</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Marxist University</div>
                    <div className="drawer-category-links">
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>All Courses</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Marxism 101</a>
                      <a href="#" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Dialectical Materialism</a>
                    </div>
                  </div>
                  <div className="drawer-category">
                    <div className="drawer-category-title">Media</div>
                    <div className="drawer-category-links">
                      <a href="media.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Against the Stream</a>
                      <a href="media.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Spectre of Communism</a>
                      <a href="media.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>Documentaries</a>
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
function Nav({ active, onSelect, onOpenMenu }) {
  return (
    <nav className="primary-nav">
      <div className="nav-inner">
        <button
          className="nav-menu-btn"
          aria-label="Open menu and search"
          onClick={onOpenMenu}
          type="button"
        >
          <svg className="nav-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="nav-menu-label">Menu</span>
        </button>
        {NAV_TABS.map((tab) => {
          const isActive = tab.label === active;
          const isExternal = tab.href && /^https?:\/\//.test(tab.href);
          return (
            <a
              key={tab.label}
              className={"nav-link" + (isActive ? " is-active" : "")}
              href={tab.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-current={isActive ? "page" : undefined}
              onClick={tab.href ? undefined : () => onSelect(tab.label)}
            >
              {tab.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ── VideoHero (Background video fold at the top) ──────────────────────────
function VideoHero() {
  const onArrowClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("join-intro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="video-hero" aria-label="Are you a Communist?">
      <iframe
        src="https://www.youtube.com/embed/8yB2z14k88w?autoplay=1&mute=1&loop=1&playlist=8yB2z14k88w&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="Background Video"
      />
      <div className="video-hero-scrim" />
      <div className="video-hero-overlay">
        <div className="video-hero-content">
          <a href="#join-intro" className="video-hero-arrow-btn" onClick={onArrowClick} aria-label="Scroll down">
            <svg viewBox="0 0 24 24" strokeLinecap="square">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <h1 className="video-hero-text">
            Are You A Communist?<br/>
            <span>Then get organised.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

// ── Intro / pull-quotes (Simplified) ────────────────────────────────────────
function Intro() {
  return (
    <section className="intro" id="join-intro">
      <p className="intro-p intro-p--lede">
        Millions can see that the world is on fire and that revolutionary upheavals are being prepared on a world scale. In the midst of this crisis of the global capitalist system, the only force capable of transforming society is the organised and mobilised working class. <b>But in order for our class to fight and win, we need to build an international organisation to coordinate this struggle.</b>
      </p>
      <p className="intro-p">
        We are building revolutionary communist groups around the world. Fill out the form below to join the Revolutionary Communist International, or visit our dedicated <a href="sections.html" style={{ color: "var(--rci-red)", fontWeight: "bold", textDecoration: "underline" }}>national sections directory</a> to find contact details and latest updates from your country.
      </p>
    </section>
  );
}

// ── Join form (centerpiece) ─────────────────────────────────────────────────
function JoinForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    if (countryParam) {
      // Find matching case or default
      const matched = COUNTRY_OPTIONS.find(c => c.toLowerCase() === countryParam.toLowerCase());
      if (matched) {
        setForm(f => ({ ...f, country: matched }));
      }
    }
  }, []);

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

// ── Footer (mirror homepage) ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-main">
        <div className="foot-brand">
          <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" />
          <div className="foot-brand-wm">Revolutionary Communist International</div>
        </div>
        <a href="#" className="foot-manifesto-card">
          <div className="foot-manifesto-img">
            <img src={R("imgManifesto", "assets/card-manifesto.jpg")} alt="The Revolutionary Manifesto of the RCI" />
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

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      <div className="site-header">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav onOpenMenu={() => setMenuOpen(true)} />
      </div>
      <main className="site-main">
        <VideoHero />
        <Intro />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
