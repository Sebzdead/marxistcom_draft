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
        color: "#ffffff",
        fontSize: 15,
        lineHeight: 1.0,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        textAlign: "center",
        textWrap: "balance",
        position: "relative",
        zIndex: 2,
      }}>{label}</div>
      <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Podcasts & Media", href: "media.html" },
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
                      <a href="book.html?book=state-and-revolution" className="drawer-category-link" onClick={() => setMenuOpen(false)}>The Classics</a>
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

// ════════════════════════════════════════════════════════════════════════════
//  THEORY & HISTORY HUB — merged magazine-style landing page.
//  Theory curriculum + history timeline folded into one unified, tag-coded
//  pool. See docs/superpowers/specs/2026-06-19-theory-history-hub-design.md.
// ════════════════════════════════════════════════════════════════════════════

// Open external links in a new tab; in-site links (incl. #anchors) stay put.
const linkAttrs = (url) =>
  /^https?:\/\//.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};

// Unified pool — every item tagged Theory|History. `real` = has a live
// destination ("Coming soon" stubs are labelled). `featured`: "lead" pins the
// hero big-story; "sec" pins a hero secondary.
const POOL = [
  { tag: "History", kicker: "History · Russia", title: "Bolshevism: the party that shook the world",
    dek: "1917 was the greatest event in world history — the first time working people took power into their own hands and began the socialist reconstruction of society.",
    image: "assets/theory/Beat_the_Whites_with_the_Red_Wedge_by_El_Lissitzky_-_Public_Domain.jpg",
    url: "https://marxist.com/russian-revolution/", real: true, featured: "lead" },

  { tag: "History", kicker: "History · France", title: "Paris Commune: the first workers' government",
    dek: "For seventy-two days in 1871, the workers of Paris began the task of replacing the capitalist state with the dictatorship of the proletariat.",
    image: "assets/theory/commune.jpg",
    url: "https://marxist.com/theory-paris-commune.htm", real: true, featured: "sec" },

  { tag: "Theory", kicker: "Theory · The State", title: "Marxism and the State",
    dek: "The state is an instrument of class rule. We must understand its role scientifically, from its emergence out of class society to the present day.",
    image: "assets/theory/state640.jpg",
    url: "https://marxist.com/theory-the-state.htm", real: true, featured: "sec" },

  { tag: "Theory", kicker: "Theory · Imperialism", title: "Imperialism and War",
    dek: "Imperialism is the highest stage of capitalism, and war the extreme expression of its contradictions and rapacious hunt for profit.",
    image: "assets/theory/war-imperialism800.jpg",
    url: "https://marxist.com/theory-imperialism-war.htm", real: true },

  { tag: "Theory", kicker: "Theory · Stalinism", title: "Stalinism and the betrayed revolution",
    dek: "The Russian Revolution degenerated under a counter-revolutionary bureaucracy led by Stalin. Understanding why is critical for Marxists.",
    image: "assets/theory/stalinhead.jpg",
    url: "https://marxist.com/theory-stalinism.htm", real: true },

  { tag: "History", kicker: "History · Cuba", title: "The Cuban Revolution",
    dek: "On 1 January 1959, Batista fell to the guerrillas of Castro and Guevara. Within three years, capitalism had been abolished on the island.",
    image: "assets/theory/che-fidel720.jpg",
    url: "https://marxist.com/theory-cuban-revolution.htm", real: true },

  { tag: "History", kicker: "History · Spain", title: "The Spanish Revolution",
    dek: "The Spanish masses strove towards socialist revolution in the 1930s, but were strangled by the class collaboration of their leadership.",
    image: "assets/theory/poum.jpg",
    url: "https://marxist.com/theory-spanish-revolution.htm", real: true },

  { tag: "Theory", kicker: "Theory · Fascism", title: "What is fascism — and can it return?",
    dek: "Fascism in the 1930s expressed the historic dead-end of capitalism. Is it a major threat today, and how can it be combatted?",
    image: "assets/theory/fascism.jpg",
    url: "https://marxist.com/theory-fascism.htm", real: true },

  { tag: "History", kicker: "History · Germany", title: "The German Revolution",
    dek: "After 1917 the German proletariat entered the scene of history and ended the World War — but their revolution was tragically defeated.",
    image: "assets/theory/germany.jpg",
    url: "https://marxist.com/theory-german-revolution.htm", real: true },

  { tag: "History", kicker: "History · Russia", title: "1917: Ten Days That Shook the World",
    dek: "How the Bolsheviks led the first victorious workers' revolution.",
    image: "assets/theory/communist-third-international-360.jpg",
    url: "#", real: false },

  { tag: "Theory", kicker: "Theory · Art", title: "Marxism and Art",
    dek: "Art under capitalism is shackled to the profit motive. Only socialism can liberate culture for all.",
    image: "assets/theory/goya.jpg",
    url: "https://marxist.com/theory-art.htm", real: true },

  { tag: "History", kicker: "History · Reformation", title: "The Reformation: religion as the banner of class war",
    dek: "Luther, Müntzer and the social struggles behind the wars of religion.",
    image: "assets/theory/oliver-cromwell.jpg",
    url: "#", real: false },
];

const HERO_LEAD = POOL.find((p) => p.featured === "lead");
const HERO_SECS = POOL.filter((p) => p.featured === "sec");
const LATEST = POOL.filter((p) => p.featured !== "lead").slice(0, 10);

// In Focus — fixed, config-driven editorial spotlight (French Revolution).
const IN_FOCUS = {
  title: "In Focus: The French Revolution",
  feature: {
    title: "French Revolution",
    dek: "In 1789 the revolutionary bourgeoisie and the popular masses overthrew the decrepit Ancien Régime, creating an earthquake that shook the world.",
    image: "assets/theory/640px-Prise_de_la_Bastille.jpg",
    url: "https://marxist.com/theory-french-revolution.htm",
  },
  links: [
    { title: "The English Revolution", byline: "marxist.com archive", url: "https://marxist.com/theory-english-revolution.htm" },
    { title: "The American Revolution: a war of two worlds", byline: "Coming soon", url: "#" },
    { title: "1848: the year the bourgeoisie lost its nerve", byline: "Coming soon", url: "#" },
  ],
};

// In Defence of Marxism — latest issue (#53), summarised from the magazine.
const LATEST_ISSUE = {
  no: "53",
  season: "Spring 2026",
  theme: "Latin America",
  subtitle: "An Unfinished Revolution",
  cover: "assets/IDOM_53_cover.jpg",
  blurb: "From the wars of independence to the Bolivarian present, Latin America has been a continent of permanent upheaval — and of revolutions left half-finished.",
  contents: [
    { k: "Editorial", t: "Latin America – an unfinished revolution", a: "" },
    { k: "Venezuela", t: "A balance sheet of the Venezuelan Revolution", a: "Jorge Martín" },
    { k: "Art", t: "Mexican Muralism: Art born of revolution", a: "Carlos Márquez" },
    { k: "History", t: "Excerpts on Latin America", a: "Leon Trotsky" },
    { k: "Economics", t: "Why did the Wall Street Crash happen?", a: "James Kilby" },
  ],
  href: "magazine.html",
};

// Category links — blended Theory & History. Theory → marxist.com topic pages;
// History → the timeline that still lives at history.html#era-anchor.
const CATEGORY_LINKS = [
  { label: "Marxist Economics", tag: "Theory", url: "topic.html" },
  { label: "The State and Revolution", tag: "Theory", url: "book.html?book=state-and-revolution" },
  { label: "Marxism and the State", tag: "Theory", url: "https://marxist.com/theory-the-state.htm" },
  { label: "The French Revolution", tag: "History", url: "history.html#era-bourgeois-revolutions" },
  { label: "Imperialism and War", tag: "Theory", url: "https://marxist.com/theory-imperialism-war.htm" },
  { label: "The Paris Commune", tag: "History", url: "history.html#era-age-of-imperialism" },
  { label: "Stalinism", tag: "Theory", url: "https://marxist.com/theory-stalinism.htm" },
  { label: "The Russian Revolution", tag: "History", url: "history.html#era-proletarian-revolution" },
  { label: "The National Question", tag: "Theory", url: "https://marxist.com/theory-the-national-question.htm" },
  { label: "The Fourth International", tag: "History", url: "history.html#era-proletarian-revolution" },
  { label: "Anarchism", tag: "Theory", url: "https://marxist.com/theory-marxism-and-anarchism.htm" },
  { label: "The Chinese Revolution", tag: "History", url: "history.html#era-colonial-revolution" },
  { label: "Fascism", tag: "Theory", url: "https://marxist.com/theory-fascism.htm" },
  { label: "The Arab Revolution", tag: "History", url: "history.html#era-21st-century" },
  { label: "Ireland & Republicanism", tag: "History", url: "https://marxist.com/theory-ireland-republicanism.htm" },
  { label: "In Defence of Genuine Marxism", tag: "Theory", url: "https://marxist.com/theory-marxism-vs-revisionism.htm" },
];

// WellRed Books — the banner rotates a featured title on each page load.
const WELLRED_BOOKS = [
  { title: "The Communist Manifesto", author: "Marx & Engels", desc: "The founding document of scientific socialism — the class struggle and the inevitable fall of capitalism.", buyUrl: "https://wellredbooks.co.uk/product/manifesto-of-the-communist-party/" },
  { title: "The State and Revolution", author: "V.I. Lenin", desc: "Lenin's classic on the state as an instrument of class rule, and the tasks of the working class in revolution.", buyUrl: "https://wellredbooks.co.uk/product/state-and-revolution-lenin/" },
  { title: "The Revolution Betrayed", author: "Leon Trotsky", desc: "A brilliant analysis of the bureaucratic degeneration of the USSR under Stalin, and the need for political revolution.", buyUrl: "https://wellredbooks.co.uk/product/the-revolution-betrayed-leon-trotsky/" },
  { title: "Reason in Revolt", author: "Ted Grant & Alan Woods", desc: "A masterly defence of dialectical materialism in the light of the latest discoveries of modern science.", buyUrl: "https://wellredbooks.co.uk/product/reason-in-revolt-alan-woods-ted-grant/" },
  { title: "History of the Russian Revolution", author: "Leon Trotsky", desc: "A monumental, eyewitness account of 1917 and the creative force of the revolutionary masses.", buyUrl: "https://wellredbooks.co.uk/product/history-of-the-russian-revolution-trotsky/" },
  { title: "Bolshevism: The Road to Revolution", author: "Alan Woods", desc: "A monumental history of the Bolshevik Party and the struggles that forged the party of 1917.", buyUrl: "https://wellredbooks.co.uk/product/bolshevism-the-road-to-revolution-alan-woods/" },
];

// ── Hero — big story + two secondaries (pinned from POOL) ───────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* BIG STORY */}
        <a href={HERO_LEAD.url} {...linkAttrs(HERO_LEAD.url)} className="hero-lead">
          <div className="hero-lead-img">
            <img src={HERO_LEAD.image} alt={HERO_LEAD.title} />
          </div>
          <span className="rci-kicker">{HERO_LEAD.kicker}</span>
          <h1 className="hero-h1 hero-h1--serif">{HERO_LEAD.title}</h1>
          <p className="hero-dek">{HERO_LEAD.dek}</p>
          <div className="hero-byline">{HERO_LEAD.tag} · marxist.com archive</div>
        </a>

        {/* TWO SECONDARIES */}
        <div className="hero-secondary">
          {HERO_SECS.map((s, i) => (
            <a key={i} href={s.url} {...linkAttrs(s.url)} className="hero-sec-card">
              <div className="hero-sec-img"><img src={s.image} alt={s.title} /></div>
              <span className="rci-kicker">{s.kicker}</span>
              <h3 className="hero-sec-title">{s.title}</h3>
              <div className="hero-sec-byline">{s.tag}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── In Focus — editorial spotlight (reuses the Trump2 feature+links layout) ──
function InFocus() {
  return (
    <section className="trump2">
      <div className="rci-section-head">
        <h2>{IN_FOCUS.title}</h2>
        <a href="history.html#era-bourgeois-revolutions">The bourgeois revolutions &rarr;</a>
      </div>
      <div className="trump2-grid">
        <a href={IN_FOCUS.feature.url} {...linkAttrs(IN_FOCUS.feature.url)} className="trump2-feature">
          <div className="trump2-img"><img src={IN_FOCUS.feature.image} alt={IN_FOCUS.feature.title} /></div>
          <h3 className="trump2-title">{IN_FOCUS.feature.title}</h3>
        </a>
        <div className="trump2-links">
          {IN_FOCUS.links.map((l, i) => (
            <a key={i} href={l.url} {...linkAttrs(l.url)} className="trump2-link">
              <h4 className="trump2-link-title">{l.title}</h4>
              <div className="trump2-link-byline">{l.byline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── In Defence of Marxism — latest issue block ──────────────────────────────
function IdomBlock() {
  const d = LATEST_ISSUE;
  return (
    <section className="th-idom">
      <div className="rci-section-head">
        <h2>In Defence of Marxism</h2>
        <a href="magazine.html">All issues &rarr;</a>
      </div>
      <div className="th-idom-card">
        <a href={d.href} className="th-idom-cover">
          <img src={d.cover} alt={"In Defence of Marxism issue " + d.no} />
        </a>
        <div className="th-idom-body">
          <span className="rci-kicker">Issue {d.no} · {d.season}</span>
          <h3 className="th-idom-title">{d.theme}: {d.subtitle}</h3>
          <p className="th-idom-blurb">{d.blurb}</p>
          <ul className="th-idom-contents">
            {d.contents.map((c, i) => (
              <li key={i}>
                <span className="th-idom-kick">{c.k}</span>
                <span className="th-idom-art">{c.t}</span>
                <span className="th-idom-auth">{c.a}</span>
              </li>
            ))}
          </ul>
          <PrintButton variant="red" size="lg" href={d.href}>Get your copy &rarr;</PrintButton>
        </div>
      </div>
    </section>
  );
}

// ── Category panel — blended Theory & History links ─────────────────────────
function CategoryPanel() {
  const mid = Math.ceil(CATEGORY_LINKS.length / 2);
  const cols = [CATEGORY_LINKS.slice(0, mid), CATEGORY_LINKS.slice(mid)];
  return (
    <section className="th-cats">
      <div className="rci-section-head"><h2>Browse Theory &amp; History</h2></div>
      <div className="th-cats-panel">
        {cols.map((col, ci) => (
          <ul key={ci} className="th-cats-col">
            {col.map((c, i) => (
              <li key={i}>
                <a href={c.url} {...linkAttrs(c.url)} className="th-cats-link">
                  <span className={"th-cats-dot " + (c.tag === "Theory" ? "is-theory" : "is-history")} aria-hidden="true" />
                  <span className="th-cats-label">{c.label}</span>
                  <span className="th-cats-tag">{c.tag}</span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* TODO: point at the real pre-filtered Theory+History search once it exists. */}
      <a className="th-cats-more" href="search.html">Explore more &rsaquo;</a>
    </section>
  );
}

// ── WellRed Books — dynamic banner, rotates the featured title each load ────
function WellRedBanner() {
  const [book] = useState(() => WELLRED_BOOKS[Math.floor(Math.random() * WELLRED_BOOKS.length)]);
  return (
    <section className="th-wellred">
      <div className="th-wellred-brand">
        <img className="th-wellred-logo" src={R("rciSquare", "assets/rci-social-round.svg")} alt="" aria-hidden="true" />
        <div>
          <a href="https://wellredbooks.co.uk/" target="_blank" rel="noopener noreferrer" className="th-wellred-name">WellRed Books</a>
          <p className="th-wellred-tag">The publishing house of the Revolutionary Communist International — the classics of Marxism, in print and in your hands.</p>
        </div>
      </div>
      <a className="th-wellred-book" href={book.buyUrl} target="_blank" rel="noopener noreferrer">
        <div className="th-wellred-cover">
          <PhotoOrSlab label={book.title} aspect="3/4" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div className="th-wellred-book-body">
          <span className="rci-kicker">{book.author}</span>
          <h3 className="th-wellred-book-title">{book.title}</h3>
          <p className="th-wellred-book-desc">{book.desc}</p>
          <span className="th-wellred-buy">Get the book &rarr;</span>
        </div>
      </a>
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
  return (
    <section className="latest">
      <div className="rci-section-head">
        <h2>Latest</h2>
        <a href="search.html">see all &rarr;</a>
      </div>
      <div className="latest-scroller">
        {LATEST.map((a, i) => (
          <a key={i} href={a.url} {...linkAttrs(a.url)} className="latest-scard">
            <div className="latest-scard-img">
              <PhotoOrSlab image={a.image} label={a.tag} aspect="16/10" style={{ position: "absolute", inset: 0 }} />
            </div>
            <span className={"rci-kicker " + (a.tag === "Theory" ? "blue" : "")}>{a.tag}</span>
            <h3 className="latest-scard-title">{a.title}</h3>
            {!a.real && <span className="th-soon">Coming soon</span>}
          </a>
        ))}
      </div>
    </section>
  );
}

function Trump2() {
  const links = [
    { title: "Does Israel control the United States?", byline: "Ben Curry", href: "#" },
    { title: "The right-populist ‘international’ splinters as Trump presides over chaos", byline: "Jack Tye Wilson", href: "#" },
    { title: "The FIFA 2026 World Cup: sportwashing the crimes of western imperialism", byline: "Josh Cole-Hossain", href: "#" },
    { title: "China sets the agenda at the Xi-Trump summit", byline: "Daniel Morley", href: "#" },
    { title: "“A lot of people feel betrayed”: Iran War drives millions out of the MAGA camp", byline: "The Communist", href: "#" },
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
          <h3 className="trump2-title">Trump’s defeat in Iran and its worldwide consequences</h3>
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
          <h2 className="ats-title">Iran Deal: the Biggest Defeat in US History</h2>
          <div className="ats-platforms">
            {platforms.map((p) => (
              <a key={p} href="media.html" className="ats-platform">{p}</a>
            ))}
          </div>
        </div>
        <iframe
          className="ats-video"
          src="https://www.youtube.com/embed/PQiV0xqrbY8?start=12"
          title="Against the Stream - Iran Deal: the Biggest Defeat in US History"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: "100%" }}
        />
      </div>
    </section>
  );
}

function FeaturePair() {
  const feats = [
    { kicker: "Theory", title: "From Adam Smith to Karl Marx: The Wealth of Nations and Das Kapital", image: IMG.marx, href: "theory.html" },
    { kicker: "History", title: "Figaro and the French Revolution", image: R("imgLatestFigaro", "assets/Figaro.jpg"), href: "article.html" },
  ];
  return (
    <section className="feat-pair-sec">
      <div className="feat-pair">
        {feats.map((f, i) => (
          <a key={i} href={f.href} className="feat-card">
            <div className="feat-bg" style={{ backgroundImage: `url("${f.image}")` }} />
            <div className="feat-body">
              <span className="rci-kicker" style={{ color: "#ff8a6e" }}>{f.kicker}</span>
              <h3 className="feat-title">{f.title}</h3>
            </div>
          </a>
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
        <Eyebrow style={{ color: "var(--rci-red-hot)", fontSize: 13, letterSpacing: "0.24em" }}>Get organised</Eyebrow>
        <h2 className="join-h2">Join the fight</h2>
        <p className="join-body">
          The Revolutionary Communist International organises in over 70 countries. From mass
          strikes to student occupations, comrades on every continent are building the party we need.
          History is being made — be part of it.
        </p>
        <div className="join-actions">
          <PrintButton variant="red" size="lg" href="join.html">Join</PrintButton>
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

function TopicGrid() {
  const cols = [
    {
      label: "Iran War", ink: "",
      image: IMG.iranNight,
      lead: "The war on Iran: where do communists stand?",
      more: ["Trump's defeat in Iran and its worldwide consequences", "Iran War deals collateral damage to Bangladesh"],
    },
    {
      label: "Gen Z Revolutions", ink: "ochre",
      image: R("imgLatestRomania", "assets/Romanian Government.jpg"),
      lead: "From Nepal to Serbia: a generation rises",
      more: ["The student movement and the fight against capitalism", "Why Gen Z is turning to communism"],
    },
    {
      label: "Artificial Intelligence", ink: "blue",
      image: IMG.ai,
      lead: "The anarchic AI race: boom, bubble, and bust",
      more: ["Can capitalism survive automation?", "AI, alienation, and the working class"],
    },
    {
      label: "World Economy", ink: "green",
      image: IMG.banks,
      lead: "Shadow banking: a ticking time bomb",
      more: ["Who really pays for the tariff war?", "The meaning of the rise of China"],
    },
  ];
  return (
    <section className="topic-grid-sec">
      <div className="rci-section-head"><h2>Topics</h2><a href="index.html">All topics &rarr;</a></div>
      <div className="topic-grid">
        {cols.map((c, i) => (
          <div key={i} className="topic-gcol">
            <span className={"rci-kicker " + c.ink}>{c.label}</span>
            <a href="article.html" className="topic-glead">
              <div className="topic-gimg"><PhotoOrSlab image={c.image} label={c.label} aspect="4/3" style={{ position: "absolute", inset: 0 }} /></div>
              <h3 className="topic-glead-title">{c.lead}</h3>
            </a>
            <div className="topic-gmore">
              {c.more.map((m, j) => (
                <a key={j} href="article.html" className="topic-gmore-link">{m}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── World School of Communism banner ────────────────────────────────────────
function WorldSchoolBanner() {
  const target = useMemo(() => new Date("2026-08-02T00:00:00").getTime(), []);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const totalSec = Math.floor(diff / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  const units = [
    { v: pad(Math.floor(totalSec / 86400)), l: "Days" },
    { v: pad(Math.floor((totalSec % 86400) / 3600)), l: "Hrs" },
    { v: pad(Math.floor((totalSec % 3600) / 60)), l: "Mins" },
    { v: pad(totalSec % 60), l: "Secs" },
  ];

  return (
    <section className="wsc-section">
      <div className="wsc">
        <img className="wsc-globe" src="assets/globe-red.png" alt="" aria-hidden="true" />
        <div className="wsc-inner">
          <img
            className="wsc-logo"
            src="assets/whitelogo-scaled-1.webp"
            alt="Revolutionary Communist International"
          />
          <h2 className="wsc-title">World School of<br />Communism 2026</h2>
          <div className="wsc-pill">Online &nbsp;•&nbsp; 2 — 7 August</div>
          <div className="wsc-countdown" role="timer" aria-label="Countdown to the World School of Communism 2026">
            {units.map((u, i) => (
              <React.Fragment key={u.l}>
                {i > 0 && <span className="wsc-cd-colon">:</span>}
                <div className="wsc-cd-unit">
                  <span className="wsc-cd-num">{u.v}</span>
                  <span className="wsc-cd-label">{u.l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="wsc-actions">
            <a className="wsc-btn" href="media.html">Talks</a>
            <a className="wsc-btn" href="join.html">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarxistUniversity() {
  const courses = [
    { title: "Marxism 101", blurb: "Start here: the foundations of revolutionary theory." },
    { title: "Dialectical Materialism", blurb: "The Marxist method for understanding change." },
    { title: "Fighting Oppression", blurb: "Class, race, gender and the road to liberation." },
    { title: "Marxist Economics", blurb: "Value, exploitation and capitalist crisis.", href: "topic.html" },
    { title: "Marxism vs Anarchism", blurb: "State, revolution and the question of power." },
    { title: "The Fourth International", blurb: "Trotsky and the fight against Stalinism." },
    { title: "Deformed Workers' States", blurb: "The USSR, China and bureaucratic degeneration." },
    { title: "The History of Philosophy", blurb: "From Hegel to Marx: a materialist account." },
  ];
  return (
    <section className="muni">
      <div className="rci-section-head"><h2>Marxist University</h2><a href="#">All courses &rarr;</a></div>
      <a href="book.html?book=state-and-revolution" className="muni-quote">
        <p className="muni-quote-text">
          &ldquo;Without revolutionary theory there can be no revolutionary movement.&rdquo;
        </p>
        <p className="muni-quote-cite">&mdash; V.I. Lenin, <em>What Is To Be Done?</em> (1902)</p>
      </a>
      <div className="muni-grid">
        {courses.map((c, i) => (
          <a key={i} href={c.href || "#"} className="muni-card">
            <h3 className="muni-card-title">{c.title}</h3>
            <p className="muni-card-blurb">{c.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Reports: featured line + dispatch list ──────────────────────────────────
function Reports() {
  const featured = {
    country: "Britain",
    title: "“With our burning fury, we will shake the world awake!”",
    image: R("imgBritainRcp", "assets/sections-britain-rcp.jpg"),
    href: "#"
  };
  const rows = [
    { country: "Canada", title: "Third RCP Congress — a party up to the task", href: "#" },
    { country: "Colombia", title: "The founding congress of the Revolutionary Communists of Colombia", href: "#" },
  ];
  return (
    <section className="reports">
      <div className="rci-section-head"><h2>Reports</h2><a href="#">All reports &rarr;</a></div>
      <a href={featured.href} className="reports-featured">
        {featured.image && (
          <div className="reports-featured-img-wrap">
            <img src={featured.image} alt={featured.title} className="reports-featured-img" />
          </div>
        )}
        <div className="reports-featured-overlay">
          <span className="rci-kicker">{featured.country}</span>
          <h3 className="reports-featured-title">{featured.title}</h3>
        </div>
      </a>
      <ol className="reports-list">
        {rows.map((r, i) => (
          <li key={i}>
            <a href={r.href} className="reports-row">
              <div className="reports-row-text">
                <span className="rci-kicker no-tick">{r.country}</span>
                <span className="reports-row-title">{r.title}</span>
              </div>
              <span className="reports-arrow">&rarr;</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="reports-foot">
        <PrintButton variant="paper" size="md" href="join.html">Find your local section &rarr;</PrintButton>
        <PrintButton variant="paper" size="md" href="#">All reports &rarr;</PrintButton>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
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
            <img src={IMG.manifesto} alt="The Revolutionary Manifesto of the RCI" />
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
  const [activeTab, setActiveTab] = useState("Theory & History");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      <div className="site-header">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav active={activeTab} onSelect={setActiveTab} onOpenMenu={() => setMenuOpen(true)} />
      </div>

      <main className="site-main">
        <Hero />
        <LatestScroller />
        <InFocus />
        <MarxistUniversity />
        <IdomBlock />
        <CategoryPanel />
        <WellRedBanner />
        <JoinBanner />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
