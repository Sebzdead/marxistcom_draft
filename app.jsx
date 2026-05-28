// Marxist.com homepage — main App
// Uses PrintButton, ArticleCard, Eyebrow, SectionRule, SectionHead from components.jsx
// Uses TweaksPanel + useTweaks + Tweak* from tweaks-panel.jsx

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "texture": "none",
  "headlineFont": "sans",
  "mode": "light",
  "cardTreatment": "offset",
  "divider": "thick-slab"
}/*EDITMODE-END*/;

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
  iranNight: R("imgIranWar", "assets/topic-iran-war.jpg"),
  trumpHead: R("imgTrumpIran", "assets/topic-trump-iran.jpg"),
  twoState: R("imgTwoState", "assets/topic-two-state.jpg"),
  palestine48: R("imgPalestine48", "assets/topic-palestine-1948.webp"),
  // manifesto banner — RCI flag SVG, no photo needed
  redFlag: null,
  // economy
  marx: R("imgAdamSmith", "assets/econ-adam-smith.jpg"),
  banks: R("imgShadowBanking", "assets/econ-shadow-banking.jpg"),
  china: R("imgChina", "assets/econ-china.jpg"),
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
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "analysis.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media" },
  { label: "Magazine" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];

const RECENT_ANALYSIS = [
  { stamp: "2h", kicker: "Economy", title: "The economic consequences of the war in Iran", href: "article.html" },
  { stamp: "4h", kicker: "Ireland", title: "Ireland: fuel protests show the way" },
  { stamp: "6h", kicker: "Britain", title: "A very British catastrophe" },
  { stamp: "9h", kicker: "History", title: "James Connolly and the Easter Rising" },
  { stamp: "12h", kicker: "Bangladesh", title: "Iran War deals devastating collateral damage to Bangladesh" },
  { stamp: "15h", kicker: "Comment", title: "The hypocrisy of the 'no to war' stance at the Global Progressive Mobilisation" },
  { stamp: "18h", kicker: "Britain", title: "Mandelson, May elections, and the markets — pressures pile up for Starmer" },
  { stamp: "22h", kicker: "United States", title: "\"All you had to do was pay us enough to live\"" },
  { stamp: "1d", kicker: "Theory", title: "In defence of dialectics \u2014 a critique of Mao's 'On Contradiction'" },
  { stamp: "1d", kicker: "Economy", title: "Shadow banking: a ticking time bomb under the US economy" },
];

// ── Masthead ────────────────────────────────────────────────────────────────
function Masthead() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef(null);
  const toggleSearch = () => {
    setSearchOpen((o) => {
      const next = !o;
      if (next) {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      } else {
        setSearchValue("");
      }
      return next;
    });
  };
  const onKeyDown = (e) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); }
  };
  const onBlur = (e) => {
    if (!e.currentTarget.value) setSearchOpen(false);
  };
  return (
    <header className="masthead">
      <div className="mast-left">
        <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" className="mast-logo" />
        <div className="mast-wordmark">
          <div className="wm-title">Marxist<span className="wm-dot">.</span>com</div>
        </div>
        <div className="mast-slash">/</div>
        <div className="mast-tag">
          <div>Home of the Revolutionary</div>
          <div>Communist International</div>
        </div>
      </div>
      <div className="mast-right">
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
        <div className="mast-search" data-open={searchOpen}>
          <input
            ref={inputRef}
            type="search"
            className="mast-search-input"
            placeholder="Search marxist.com\u2026"
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
      </div>
    </header>
  );
}

// ── Nav (2.5D pressable tabs) ────────────────────────────────────────────────
function Nav({ active, onSelect }) {
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
      </div>
    </nav>
  );
}

// ── Hero — 3 column ─────────────────────────────────────────────────────────
function Hero({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* LEFT: recent analysis */}
        <aside className="hero-right">
          <div className="popular-head">
            <Eyebrow style={{ fontSize: 14, letterSpacing: "0.22em" }}>Latest analysis</Eyebrow>
            <div className="popular-sub">Live feed</div>
          </div>
          <ol className="popular-list">
            {RECENT_ANALYSIS.map((item, i) => (
              <li key={i} className="popular-item">
                <span className="popular-num">{item.stamp}</span>
                <div className="popular-text">
                  <Eyebrow style={{ fontSize: 10, letterSpacing: "0.18em", display: "block", marginBottom: 3 }}>{item.kicker}</Eyebrow>
                  <a href={item.href || "#"} className="popular-title">{item.title}</a>
                </div>
              </li>
            ))}
          </ol>
          <div className="popular-foot">
            <PrintButton variant="paper" size="sm">See all →</PrintButton>
          </div>
        </aside>

        {/* CENTER: big featured */}
        <div className="hero-center">
          <div className="hero-feature">
            <div className="hero-feature-img">
              <img src={IMG.hero} alt="Imperialist war and class struggle — perspectives for 2026" className="hero-feature-img-poster" />
            </div>
            <div className="hero-feature-body">
              <Eyebrow style={{ fontSize: 13, letterSpacing: "0.24em" }}>Editorial · World perspectives</Eyebrow>
              {titleFont === "serif" ? (
                <h1 className="hero-h1 hero-h1--serif">2026 kicks off to the sound of imperialist war drums and class struggle</h1>
              ) : (
                <h1 className="hero-h1">2026 kicks off to the sound of imperialist war drums and class struggle</h1>
              )}
              <div className="hero-byline">By Jorge Martín · International Secretariat</div>
              <p className="hero-dek">
                This February, the leadership of the Revolutionary Communist International met in Italy to assess the world situation and <b>how the forces of communism are being gathered and trained around the globe</b>, and to plan ahead. Below we publish a transcript of a talk on the world situation by Jorge Martín of the International Secretariat of the RCI, assessing where the world is going in these turbulent first months of 2026.
              </p>
              <div className="hero-actions">
                <PrintButton variant="red" size="md">Read the editorial →</PrintButton>
                <PrintButton variant="paper" size="md">Share</PrintButton>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3 stacked feature cards */}
        <div className="hero-left">
          <a href="#" className="hero-side-card">
            <div className="hero-side-img">
              <img src={IMG.manifesto} alt="Manifesto of the Revolutionary Communist International" />
            </div>
            <div className="hero-side-meta">
              <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>Manifesto · Programme</Eyebrow>
              <div className="hero-side-byline">Manifesto of the RCI</div>
            </div>
          </a>
          <a href="#" className="hero-side-card">
            <div className="hero-side-img">
              <img src={IMG.warOnIran} alt="The war on Iran: where do communists stand?" />
            </div>
            <div className="hero-side-meta">
              <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>Iran War · Editorial</Eyebrow>
              <div className="hero-side-byline">By Alan Woods</div>
            </div>
          </a>
          <a href="#" className="hero-side-card">
            <div className="hero-side-img">
              <img src={IMG.communistsComing} alt="The Communists Are Coming: a Visual Manifesto" />
            </div>
            <div className="hero-side-meta">
              <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>Media</Eyebrow>
              <div className="hero-side-byline">A visual manifesto</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── 4-up secondary articles ─────────────────────────────────────────────────
function CampaignBanner({ tweaks }) {
  return (
    <section className="campaign">
      <SectionHead label="Campaigns" divider={tweaks.divider} extra="Take action →" />
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
            “Help us fight for their release. Free Ehsan Ali! Hands off the AAC!”
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

function FourUp({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";
  const items = [
    { kicker: "United States", title: "\"All you had to do was pay us enough to live\"", byline: "RCI United States", image: IMG.unitedStates },
    { kicker: "Britain", title: "A very British catastrophe", byline: "Rob Sewell", image: IMG.britain },
    { kicker: "Bangladesh", title: "Iran War deals devastating collateral damage to Bangladesh", byline: "Nijat Mahruz Nirjhor", image: IMG.bangladesh },
    { kicker: "Markets", title: "Prediction markets profit from US imperialism", byline: "Nick Brancaccio", image: IMG.satire },
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
          <PrintButton variant="red" size="sm">Order this issue →</PrintButton>
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
                <a href="#" className={"idom-toc-title" + (titleFont === "serif" ? " idom-toc-title--serif" : "")}>{f.title}</a>
              </div>
            </li>
          ))}
        </ol>
        <div className="idom-toc-foot">
          <PrintButton variant="paper" size="sm">Subscribe to the magazine →</PrintButton>
          <PrintButton variant="paper" size="sm">Read past issues</PrintButton>
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
    { num: "01", flag: "CA", country: "Canada", title: "Third RCP Congress — a party up to the task" },
    { num: "02", flag: "CO", country: "Colombia", title: "The founding congress of the Revolutionary Communists of Colombia" },
    { num: "03", flag: "UK", country: "Britain", title: "Third Congress of the RCP — \u201cWith our burning fury, we will shake the world awake!\u201d" },
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
              <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>{u.country}</Eyebrow>
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
    { kicker: "Classics", title: "From Adam Smith to Karl Marx: The Wealth of Nations and Das Kapital", byline: "Adam Booth", image: IMG.marx },
    { kicker: "Finance", title: "Shadow banking: a ticking time bomb under the US economy", byline: "Francesco Merli", image: IMG.banks },
    { kicker: "World", title: "The meaning of the rise of China", byline: "Kenny Wallace", image: IMG.china },
    { kicker: "Tech", title: "The anarchic AI race: boom, bubble, and bust", byline: "Adam Booth", image: IMG.ai },
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
          <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" />
          <div>
            <div className="foot-brand-wm">Marxist.com</div>
            <div className="foot-brand-tag">Home of the Revolutionary Communist International</div>
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <div className="foot-col-h">Sections</div>
            <a href="#">Analysis</a>
            <a href="#">Theory & History</a>
            <a href="#">Podcasts</a>
            <a href="#">In Defence of Marxism</a>
            <a href="#">Bookstore</a>
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
  const t = TWEAK_DEFAULTS;
  const [activeTab, setActiveTab] = useState("Home");

  // Apply mode (light/dark) to body
  useEffect(() => {
    document.body.dataset.mode = t.mode;
    document.body.dataset.texture = t.texture;
  }, [t.mode, t.texture]);

  return (
    <div className="site">
      <Masthead />
      <Nav active={activeTab} onSelect={setActiveTab} />

      <main className="site-main">
        <Hero tweaks={t} />
        <CampaignBanner tweaks={t} />
        <IDOMBlock tweaks={t} />
        <TopicSplit tweaks={t} />
        <EconomyBlock tweaks={t} />
        <ManifestoBanner tweaks={t} />
        <JoinBanner />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
