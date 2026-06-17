// Marxist.com homepage — main App
// Uses PrintButton, ArticleCard, Eyebrow, SectionRule, SectionHead from components.jsx
// Uses TweaksPanel + useTweaks + Tweak* from tweaks-panel.jsx

const { useState, useEffect, useMemo } = React;

// Design-system look is fixed: warm paper, serif headlines, clean cards,
// thick-slab dividers. (Dark mode + tweak switches removed.)
const T = { headlineFont: "serif", cardTreatment: "clean", divider: "thick-slab" };

// Image URLs — verified-loading Unsplash photos. Undefined entries fall back
// to printed slab placeholders (matches user's "mix of real photos + slabs" pref).
const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
// R(): prefer bundled blob URL (set by super_inline_html) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const IMG = {
  // hero — user-provided artwork
  hero: R("imgHero", "assets/hero-imperialist-war.png"),
  // hero left cards — user-provided artwork
  manifesto: R("imgManifesto", "assets/card-manifesto.jpg"),
  warOnIran: R("imgWarOnIran", "assets/card-war-on-iran.png"),
  communistsComing: R("imgCommunistsComing", "assets/card-communists-coming.png"),
  // Everything below: slab placeholders (no stock photos)
  art: undefined,
  japan: undefined,
  unitedStates: undefined,
  britain: undefined,
  bangladesh: undefined,
  satire: undefined,
  flagCrowd: undefined,
  mao: undefined,
  comintern: undefined,
  cartoon: undefined,
  // topic split — Iran War + Palestine
  iranNight: R("imgLatestEconomicConsequences", "assets/Economic Consequences.jpg"),
  trumpHead: R("imgTrumpIran", "assets/topic-trump-iran.jpg"),
  twoState: R("imgTwoState", "assets/topic-two-state.jpg"),
  palestine48: R("imgLatestNakba", "assets/How British imperialism paved the way for the Nakba.jpg"),
  // manifesto banner — RCI flag SVG, no photo needed
  redFlag: null,
  // economy
  marx: R("imgAdamSmith", "assets/econ-adam-smith.jpg"),
  banks: R("imgShadowBanking", "assets/econ-shadow-banking.jpg"),
  china: R("imgLatestXiTrump", "assets/China sets the agenda at the Xi-Trump summit.jpg"),
  ai: R("imgAi", "assets/econ-ai.jpg"),
};

// Small helper: photo block with grain, or slab fallback
function PhotoOrSlab({ image, label, aspect = "4/3", style }) {
  if (image) {
    return (
      <div style={{ position: "relative", aspectRatio: aspect, ...style }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center", filter: "contrast(1.05) saturate(0.95)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${R("texGrain", "ds/textures/film-grain.jpg")}")`, backgroundSize: "500px", mixBlendMode: "multiply", opacity: 0.14, pointerEvents: "none" }} />
      </div>
    );
  }
  // Slab placeholder — solid inked block with stamped label
  return (
    <div style={{
      position: "relative",
      aspectRatio: aspect,
      background: "#222222",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      overflow: "hidden",
      ...style,
    }}>
      {/* texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("${R("texSpecks", "ds/textures/grunge-light-specks.jpg")}")`,
        backgroundSize: "cover",
        opacity: 0.18,
        pointerEvents: "none",
      }} />
      {/* red corner wash */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(218,13,16,0.28), rgba(0,0,0,0) 45%)",
        pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: "var(--font-display)",
        color: "#f6efef",
        fontSize: 15,
        lineHeight: 1.0,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        textAlign: "center",
        textWrap: "balance",
        position: "relative",
        zIndex: 2,
      }}>{label}</div>
      <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(246,239,239,0.22)", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellredbooks.co.uk/" },
];


// ── Masthead ────────────────────────────────────────────────────────────────
function Masthead({ menuOpen, setMenuOpen }) {
  const [searchValue, setSearchValue] = React.useState("");
  const searchRef = React.useRef(null);

  React.useEffect(() => {
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
      <a href="index.html" className="mast-brand">
        <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" className="mast-logo" />
        <span className="mast-brand-name">Revolutionary<br/>Communist<br/>International</span>
      </a>
      <div className="mast-right">
        <button type="button" className="mast-lang" aria-label="Choose language">&#9662; Language</button>
        <PrintButton variant="red" size="md" href="join.html">Join Us</PrintButton>
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
                      <div className="drawer-sidebar-item-desc">In-depth Marxist analysis of current world events</div>
                    </div>
                  </a>

                  <a href="media.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    <div className="drawer-sidebar-item-content">
                      <div className="drawer-sidebar-item-title">Media + Podcasts</div>
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
                      <div className="drawer-sidebar-item-title">WellRed Books</div>
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

// ── Nav (2.5D pressable tabs) ────────────────────────────────────────────────
function Nav({ active, onSelect, onOpenMenu }) {
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
              onClick={tab.href ? undefined : () => onSelect(tab.label)}
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

// ── Hero — big story + two secondaries ─────────────────────────────────────
function Hero({ tweaks }) {
  const secondaries = [
    { kicker: "Economy · Iran War", title: "The economic consequences of the war in Iran", byline: "Niklas Albin Svensson", image: IMG.iranNight, href: "article.html" },
    { kicker: "History · Palestine", title: "How British imperialism paved the way for the Nakba", byline: "Khaled Malachi", image: IMG.palestine48, href: "#" },
  ];
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* BIG STORY */}
        <a href="article.html" className="hero-lead">
          <span className="rci-kicker">Analysis · China</span>
          <h1 className="hero-h1 hero-h1--serif">China sets the agenda at the Xi–Trump summit</h1>
          <p className="hero-dek">
            Trump went to Beijing believing he negotiated from strength; in reality, he
            negotiated from weakness. The unipolar hegemony of US imperialism is unravelling
            before our eyes.
          </p>
          <div className="hero-byline">By Daniel Morley · 19 May 2026</div>
          <div className="hero-lead-img">
            <img src={IMG.china} alt="China sets the agenda at the Xi-Trump summit" />
          </div>
        </a>

        {/* TWO SECONDARIES */}
        <div className="hero-secondary">
          {secondaries.map((s, i) => (
            <a key={i} href={s.href} className="hero-sec-card">
              <div className="hero-sec-img"><img src={s.image} alt={s.title} /></div>
              <span className="rci-kicker">{s.kicker}</span>
              <h3 className="hero-sec-title">{s.title}</h3>
              <div className="hero-sec-byline">By {s.byline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Latest Analysis data (placeholder cards — no images) ─────────────────────
const LATEST_ANALYSIS = [
  { kicker: "PODCAST - Britain",   title: "[Podcast] The 1926 General Strike: Britain's revolution betrayed", author: "Spectre of Communism", date: "26 May 2026", image: R("imgLatestGeneralStrike", "assets/Podcast 1926 general_strike.jpg") },
  { kicker: "HISTORY - Art",       title: "Figaro and the French Revolution",                                  author: "Alan Woods",            date: "22 May 2026", image: R("imgLatestFigaro", "assets/Figaro.jpg") },
  { kicker: "ANALYSIS - Romania",  title: "Romanian government collapses after ten months of austerity",       author: "Jonathan Hinckley",     date: "22 May 2026", image: R("imgLatestRomania", "assets/Romanian Government.jpg") },
  { kicker: "ANALYSIS - Cuba",     title: "US indictment of Raúl Castro: hands off Cuba!",                      author: "Revolutionary Communist International", date: "21 May 2026", image: R("imgLatestRaulCastro", "assets/US Indictment of Raul Castro.jpg") },
  { kicker: "PODCAST - Britain",   title: "[Podcast] Capitalism is ungovernable",                              author: "Against the Stream",    date: "21 May 2026", image: R("imgLatestCapitalismUngovernable", "assets/Podcast Capitalism is Ungovernable.jpg") },
  { kicker: "HISTORY - Palestine", title: "How British imperialism paved the way for the Nakba",             author: "Khaled Malachi",        date: "20 May 2026", image: R("imgLatestNakba", "assets/How British imperialism paved the way for the Nakba.jpg") },
  { kicker: "ANALYSIS - Italy",    title: "Second Congress of the Italian PCR — communists advance",           author: "Francesco Salmeri",     date: "20 May 2026", image: R("imgLatestItalianPCR", "assets/Second Congress of the Italian PCR.jpg") },
  { kicker: "ANALYSIS - China",    title: "China sets the agenda at the Xi-Trump summit",                      author: "Daniel Morley",         date: "19 May 2026", image: R("imgLatestXiTrump", "assets/China sets the agenda at the Xi-Trump summit.jpg") },
  { kicker: "ANALYSIS - Venezuela", title: "Alex Saab handed over to US imperialism",                          author: "Jorge Martín",          date: "19 May 2026", image: R("imgLatestAlexSaab", "assets/Venezuela- former Minister.jpg") },
  { kicker: "ANALYSIS - Cuba",     title: "Cuban drones threaten Florida? Axios fabricates a pretext",         author: "Jorge Martín",          date: "18 May 2026", image: R("imgLatestCubanDrones", "assets/Cuban drones threaten Florida%3F Axios fabricates pretext.jpg") },
  { kicker: "ANALYSIS - Cuba",     title: "CIA director visits Havana as US imperialism ramps up blackmail",   author: "Jorge Martín",          date: "15 May 2026", image: R("imgLatestCiaHavana", "assets/CIA director visits Havana.jpg") },
  { kicker: "ANALYSIS - Honduras", title: "'Hondurasgate': the henchmen of the Donroe Doctrine",               author: "Sylvia Léo",            date: "15 May 2026", image: R("imgLatestHondurasgate", "assets/‘Hondurasgate’- the henchmen of the Donroe Doctrine.jpg") },
];

// Section-ink rotation for the Latest rail kickers (one ink each, red leads)
const LATEST_INKS = ["", "blue", "ochre", "green"];

function LatestScroller() {
  const items = LATEST_ANALYSIS.slice(0, 10);
  return (
    <section className="latest">
      <div className="rci-section-head">
        <h2>Latest</h2>
        <a href="index.html">10 most recent &rarr;</a>
      </div>
      <div className="latest-scroller">
        {items.map((a, i) => (
          <a key={i} href="article.html" className="latest-scard">
            <div className="latest-scard-img">
              <PhotoOrSlab image={a.image} label={a.kicker} aspect="16/10" style={{ position: "absolute", inset: 0 }} />
            </div>
            <span className={"rci-kicker " + LATEST_INKS[i % LATEST_INKS.length]}>{a.kicker}</span>
            <h3 className="latest-scard-title">{a.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function Trump2() {
  const links = [
    { title: "Tariffs and the unravelling of the world order", byline: "John Peterson", href: "#" },
    { title: "ICE raids and the radicalisation of a generation", byline: "Antonio Balmer", href: "#" },
    { title: "Why the Democrats cannot stop Trump", byline: "Tom Trottier", href: "#" },
  ];
  return (
    <section className="trump2">
      <div className="rci-section-head">
        <h2>Trump 2.0</h2>
        <a href="index.html">All coverage &rarr;</a>
      </div>
      <div className="trump2-grid">
        <a href="article.html" className="trump2-feature">
          <div className="trump2-img"><img src={IMG.trumpHead} alt="Donald Trump" /></div>
          <h3 className="trump2-title">Orange Man Bad</h3>
        </a>
        <div className="trump2-links">
          {links.map((l, i) => (
            <a key={i} href={l.href} className="trump2-link">
              <h4 className="trump2-link-title">{l.title}</h4>
              <div className="trump2-link-byline">By {l.byline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4-up secondary articles ─────────────────────────────────────────────────
function CampaignBanner({ tweaks }) {
  return (
    <section className="campaign">
      <SectionHead label="Campaign" divider={tweaks.divider} extra="Take action →" />
      <div className="campaign-card">
        <div className="campaign-photo">
          <img src={R("imgCampaign", "assets/campaign-ehsan-ali.webp")} alt="Free Ehsan Ali campaign rally" />
        </div>
        <div className="campaign-body">
          <Eyebrow style={{ fontSize: 12, letterSpacing: "0.22em" }}>Pakistan · Gilgit Baltistan</Eyebrow>
          <h2 className="campaign-h2">Free Ehsan Ali — Hands off the AAC!</h2>
          <div className="campaign-meta">An urgent appeal from the RCI · Updated today</div>
          <p className="campaign-body-p">
            Ehsan Ali and other leading members of the <b>Awami Action Committee</b> in the Pakistan-administered region of Gilgit Baltistan have been arrested once again — an action condemned by both <b>Genocide Watch</b> and <b>Amnesty International</b>.
          </p>
          <p className="campaign-body-p">
            The AAC-GB has fought tirelessly on behalf of ordinary people for over a decade, campaigning for democratic rights, for the maintenance of subsidies on essential goods like wheat flour, and for the provision of basic health and education facilities for the people of the region.
          </p>
          <p className="campaign-pullquote">
            "Help us fight for their release. Free Ehsan Ali! Hands off the AAC!"
          </p>
          <div className="campaign-actions">
            <PrintButton variant="red" size="lg">Sign the petition →</PrintButton>
            <PrintButton variant="paper" size="lg">Read full statement</PrintButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgainstTheStream() {
  const platforms = ["YouTube", "Spotify", "Apple", "RSS"];
  return (
    <section className="ats rci-slab">
      <div className="ats-inner">
        <div className="ats-side">
          <img src={R("imgATS", "assets/ATS.webp")} alt="Against the Stream" className="ats-logo" />
          <div className="ats-eyebrow">Latest episode</div>
          <h2 className="ats-title">Capitalism is ungovernable</h2>
          <div className="ats-platforms">
            {platforms.map((p) => (
              <a key={p} href="media.html" className="ats-platform">{p}</a>
            ))}
          </div>
        </div>
        <a href="media.html" className="ats-video" aria-label="Watch the latest episode">
          <span className="ats-play">&#9654;</span>
        </a>
      </div>
    </section>
  );
}

function FourUp({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  const items = [
    { kicker: "ANALYSIS - United States", title: "\"All you had to do was pay us enough to live\"", byline: "RCI United States", image: IMG.unitedStates },
    { kicker: "ANALYSIS - Britain", title: "A very British catastrophe", byline: "Rob Sewell", image: IMG.britain },
    { kicker: "ANALYSIS - Bangladesh", title: "Iran War deals devastating collateral damage to Bangladesh", byline: "Nijat Mahruz Nirjhor", image: IMG.bangladesh },
    { kicker: "ANALYSIS - Markets", title: "Prediction markets profit from US imperialism", byline: "Nick Brancaccio", image: IMG.satire },
  ];
  return (
    <section className="four-up">
      <SectionHead label="Latest analysis" divider={tweaks.divider} extra="Updated hourly" />
      <div className="four-up-grid">
        {items.map((it, i) => (
          <ArticleCard key={i} {...it} size="md" treatment={tweaks.cardTreatment} titleFont={titleFont} />
        ))}
      </div>
    </section>
  );
}

// ── Join CTA banner — split black + photo ───────────────────────────────────
function JoinBanner() {
  return (
    <section className="join-banner">
      <div className="join-left">
        <Eyebrow style={{ color: "var(--rci-red-hot)", fontSize: 13, letterSpacing: "0.24em" }}>Join the fight</Eyebrow>
        <h2 className="join-h2">
          The Revolutionary Communist International<br/>organises in over <span className="join-num">70</span> countries across the world.
        </h2>
        <p className="join-body">
          From mass strikes to student occupations, from anti-war mobilisations to the fight against fascism — comrades on every continent are building the party we need.
        </p>
        <div className="join-actions">
          <PrintButton variant="red" size="lg" href="join.html">Join the fight</PrintButton>
        </div>
      </div>
      <div className="join-right">
        <div className="join-photo" style={{
          background: "var(--rci-offwhite)",
          overflow: "hidden",
        }}>
          <iframe
            src={R("globeLoader", "assets/globe-loader.html")}
            title="Animated globe"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              display: "block",
              background: "var(--rci-offwhite)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── In Defence of Marxism magazine block ────────────────────────────────────
function IDOMBlock({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  const features = [
    { num: "01", eyebrow: "Editorial", title: "Latin America — an unfinished revolution", featured: true },
    { num: "02", eyebrow: "Venezuela", title: "A balance sheet of the Venezuelan Revolution" },
    { num: "03", eyebrow: "Art & culture", title: "Mexican Muralism: Art born of revolution" },
    { num: "04", eyebrow: "Classics", title: "Trotsky: Excerpts on Latin America" },
    { num: "05", eyebrow: "Economy", title: "Why did the Wall Street Crash happen?" },
  ];
  return (
    <section className="idom">
      <div className="idom-cover">
        <div className="idom-cover-issue-tag">Latest issue</div>
        <div className="idom-cover-art">
          <img src={R("imgIdomCover", "assets/idom-53-cover.jpg")} alt="In Defence of Marxism — Issue 53, Spring 2026" />
        </div>
        <div className="idom-cover-meta">
          <div className="idom-cover-issuenum">Issue 53 · Spring 2026</div>
          <PrintButton variant="red" size="sm" href="magazine.html#latest">Order this issue →</PrintButton>
        </div>
      </div>
      <div className="idom-toc">
        <div className="idom-toc-head">
          <div className="idom-toc-eyebrow">In defence of</div>
          <div className="idom-toc-wordmark">MARXISM</div>
          <div className="idom-toc-tagline">The theoretical journal of the RCI · Inside this issue</div>
        </div>
        <ol className="idom-toc-list">
          {features.map((f, i) => (
            <li key={i} className={"idom-toc-item" + (f.featured ? " idom-toc-item--featured" : "")}>
              <span className="idom-toc-num">{f.num}</span>
              <div className="idom-toc-text">
                <Eyebrow style={{ fontSize: 10, letterSpacing: "0.2em" }}>{f.eyebrow}</Eyebrow>
                <a href="magazine.html#latest" className={"idom-toc-title" + (titleFont === "serif" ? " idom-toc-title--serif" : "")}>{f.title}</a>
              </div>
            </li>
          ))}
        </ol>
        <div className="idom-toc-foot">
          <PrintButton variant="paper" size="sm" href="magazine.html#subscribe">Subscribe to the magazine →</PrintButton>
          <PrintButton variant="paper" size="sm" href="magazine.html#archive">Read past issues</PrintButton>
        </div>
      </div>
    </section>
  );
}

// ── Topic split: Iran War | Palestine ───────────────────────────────────────
function TopicSplit({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  const cols = [
    {
      label: "Iran War",
      items: [
        { title: "The war on Iran: where do communists stand?", byline: "Alan Woods", image: IMG.iranNight },
        { title: "Trump's defeat in Iran and its worldwide consequences", byline: "Jorge Martín", image: IMG.trumpHead },
      ],
    },
    {
      label: "Palestine",
      items: [
        { title: "The failure of the two-state solution and the communist alternative", byline: "Josh Holroyd", image: IMG.twoState },
        { title: "Palestine before 1948: How imperialism created Israel", byline: "Francesco Merli", image: IMG.palestine48 },
      ],
    },
  ];
  return (
    <section className="topic-split">
      {cols.map((col, ci) => (
        <div key={ci} className="topic-col">
          <div className="topic-col-head">
            <SectionRule divider={tweaks.divider} style={{ marginBottom: 8 }} />
            <Eyebrow style={{ fontSize: 14, letterSpacing: "0.22em" }}>{col.label}</Eyebrow>
          </div>
          {col.items.map((it, i) => (
            <a key={i} href="#" className="topic-row">
              <div className="topic-row-text">
                <h4 className={"topic-title" + (titleFont === "serif" ? " topic-title--serif" : "")}>{it.title}</h4>
                <div className="topic-byline">{it.byline}</div>
              </div>
              <div className="topic-row-img" style={{ position: "relative", overflow: "hidden" }}>
                <PhotoOrSlab image={it.image} label={it.title} aspect="4/3" style={{ position: "absolute", inset: 0 }} />
              </div>
            </a>
          ))}
          <div className="topic-col-foot">
            <a href="#" className="topic-more">More on {col.label} →</a>
          </div>
        </div>
      ))}
    </section>
  );
}

// ── National Sections updates card ──────────────────────────────────────────
function ManifestoBanner({ tweaks }) {
  const titleFont = tweaks && tweaks.headlineFont === "serif" ? "serif" : "sans";
  const updates = [
    { num: "01", flag: "CA", country: "DISPATCH - Canada", title: "Third RCP Congress — a party up to the task" },
    { num: "02", flag: "CO", country: "DISPATCH - Colombia", title: "The founding congress of the Revolutionary Communists of Colombia" },
    { num: "03", flag: "UK", country: "DISPATCH - Britain", title: "Third Congress of the RCP — \u201cWith our burning fury, we will shake the world awake!\u201d" },
  ];
  return (
    <section className="sections-card">
      <div className="sections-photo">
        <img src={R("imgSectionsHeader", "assets/sections-britain-rcp.jpg")} alt="RCP Britain Third Congress" />
        <div className="sections-photo-overlay">
          <Eyebrow style={{ fontSize: 13, letterSpacing: "0.26em", color: "var(--rci-offwhite)" }}>Dispatches · From the front</Eyebrow>
          <h2 className="sections-h2">Updates from the National Sections</h2>
          <div className="sections-meta">70+ sections worldwide · Filed this week</div>
        </div>
      </div>
      <ol className="sections-list">
        {updates.map((u, i) => (
          <li key={i} className="sections-item">
            <span className="sections-num">{u.num}</span>
            <div className="sections-text">
              <Eyebrow style={{ fontSize: 12.5, letterSpacing: "0.16em" }}>{u.country}</Eyebrow>
              <a href="#" className={"sections-title" + (titleFont === "serif" ? " sections-title--serif" : "")}>{u.title}</a>
            </div>
            <span className="sections-arrow">→</span>
          </li>
        ))}
      </ol>
      <div className="sections-foot">
        <PrintButton variant="paper" size="sm" href="join.html">Find your local section →</PrintButton>
        <PrintButton variant="paper" size="sm">All dispatches</PrintButton>
      </div>
    </section>
  );
}

// ── Economy section (4-up) ──────────────────────────────────────────────────
function EconomyBlock({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  const items = [
    { kicker: "ECONOMY - Classics", title: "From Adam Smith to Karl Marx: The Wealth of Nations and Das Kapital", byline: "Adam Booth", image: IMG.marx },
    { kicker: "ECONOMY - Finance", title: "Shadow banking: a ticking time bomb under the US economy", byline: "Francesco Merli", image: IMG.banks },
    { kicker: "ECONOMY - China", title: "The meaning of the rise of China", byline: "Kenny Wallace", image: IMG.china },
    { kicker: "ECONOMY - Technology", title: "The anarchic AI race: boom, bubble, and bust", byline: "Adam Booth", image: IMG.ai },
  ];
  return (
    <section className="four-up">
      <SectionHead label="Economy" divider={tweaks.divider} extra="Capital & crisis" />
      <div className="four-up-grid">
        {items.map((it, i) => (
          <ArticleCard key={i} {...it} size="md" treatment={tweaks.cardTreatment} titleFont={titleFont} />
        ))}
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
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
            <a href="#">Join the RCI</a>
            <a href="#">Find your section</a>
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
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active={activeTab} onSelect={setActiveTab} onOpenMenu={() => setMenuOpen(true)} />

      <main className="site-main">
        <Hero tweaks={T} />
        <LatestScroller />
        <Trump2 />
        <CampaignBanner tweaks={T} />
        <AgainstTheStream />
        <IDOMBlock tweaks={T} />
        <TopicSplit tweaks={T} />
        <EconomyBlock tweaks={T} />
        <ManifestoBanner tweaks={T} />
        <JoinBanner />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
