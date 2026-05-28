// Marxist.com — Analysis page
// Standalone sibling to app.jsx (index.html) and join.jsx (join.html).
// Loaded by analysis.html.
// Reuses PrintButton, Eyebrow, SectionRule, ArticleCard from components.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by host bundler) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage) ───────────────────────────────────────
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

// ── Articles data (source: ANALYSIS ARTICLES.pdf, in publication order) ─────
// `image` is a path under assets/ when an existing asset matches the subject;
// null falls back to a slab placeholder (see SlabFill component).
const ARTICLES = [
  {
    slug: "1926-general-strike",
    kicker: "Britain · Podcast",
    title: "[Podcast] The 1926 General Strike: Britain's revolution betrayed",
    author: "Spectre of Communism",
    date: "26 May 2026",
    dek: "A stereotype holds that British workers have always been conservative and averse to radical class struggle. But a century ago, they waged a general strike that reached revolutionary proportions, threatening the very foundations of capitalist society.",
    image: "assets/sections-britain-rcp.jpg",
  },
  {
    slug: "figaro-french-revolution",
    kicker: "Art · History",
    title: "Figaro and the French Revolution",
    author: "Alan Woods",
    date: "22 May 2026",
    dek: "Mozart's opera 'The Marriage of Figaro' caused a storm when it was first performed in 1786. Alan Woods explains the subversive nature of the opera, and how it gave expression to the growing ferment in society which culminated in the French Revolution.",
    image: null,
  },
  {
    slug: "romania-austerity",
    kicker: "Europe · Romania",
    title: "Romanian government collapses after ten months of austerity – but Europe demands more!",
    author: "Jonathan Hinckley",
    date: "22 May 2026",
    dek: "In the 2025 Romanian elections, the establishment, backed by the EU politicians and intelligence services, pulled out all the stops to prevent the insurgent anti-EU populist Călin Georgescu from getting in.",
    image: null,
  },
  {
    slug: "raul-castro-indictment",
    kicker: "Cuba · Americas",
    title: "US indictment of Raúl Castro – we say: US imperialism, hands off Cuba!",
    author: "Revolutionary Communist International",
    date: "21 May 2026",
    dek: "A Florida federal prosecutor has indicted the Cuban Revolution leader Raúl Castro with charges of conspiracy. This is a very dangerous escalation of the Trump-Rubio campaign to smash the Cuban Revolution and must be strongly repudiated by the working-class movement internationally.",
    image: null,
  },
  {
    slug: "capitalism-ungovernable",
    kicker: "Britain · Podcast",
    title: "[Podcast] Capitalism is ungovernable.",
    author: "Against the Stream",
    date: "21 May 2026",
    dek: "Six prime ministers in ten years. Labour just lost fifteen hundred council seats. Has Britain become ungovernable?",
    image: null,
  },
  {
    slug: "british-imperialism-nakba",
    kicker: "Middle East · History",
    title: "How British imperialism paved the way for the Nakba",
    author: "Khaled Malachi",
    date: "20 May 2026",
    dek: "15 May marked 78 years since the Nakba, the brutal terror campaign waged by Zionist forces against Palestinians to found the state of Israel. British imperialism — having subjected the region to decades of domination, plunder, and division — was central to this catastrophe.",
    image: "assets/topic-palestine-1948.webp",
  },
  {
    slug: "italian-pcr-second-congress",
    kicker: "Italy · Party",
    title: "Second Congress of the Italian PCR – communists advance amidst tumultuous events",
    author: "Francesco Salmeri",
    date: "20 May 2026",
    dek: "From 15 to 17 May, the Second Congress of the Partito Comunista Rivoluzionario (PCR) was held in Cervia, attended by 229 communist activists from across Italy. The congress was a resounding success and provided a vivid illustration of the extraordinary progress the party has made.",
    image: null,
  },
  {
    slug: "xi-trump-summit",
    kicker: "China · World",
    title: "China sets the agenda at the Xi-Trump summit",
    author: "Daniel Morley",
    date: "19 May 2026",
    dek: "\"The unipolar hegemony of a major power is becoming increasingly unsustainable. At home, its democracy is mutating, its economy decaying, and its society fracturing.\" — Chen Yixin, China's Minister of State Security.",
    image: "assets/econ-china.jpg",
  },
  {
    slug: "alex-saab-handover",
    kicker: "Venezuela · Americas",
    title: "Venezuela: former Minister and close Maduro ally Alex Saab handed over to US imperialism",
    author: "Jorge Martín",
    date: "19 May 2026",
    dek: "Late on 16 May, a brief statement from SAIME in Venezuela announced the handover of Alex Saab — who until January had been a minister in the Venezuelan government — to agents of the US Drug Enforcement Administration.",
    image: null,
  },
  {
    slug: "cuban-drones-axios",
    kicker: "Cuba · Americas",
    title: "Cuban drones threaten Florida? Axios fabricates pretext for US imperialist attack",
    author: "Jorge Martín",
    date: "18 May 2026",
    dek: "On 17 May, the US media outlet Axios published an article with the headline 'Exclusive: U.S. eyes attack-drone threat from Cuba'. This scandalous piece of disinformation would be laughable if it weren't so dangerous.",
    image: null,
  },
  {
    slug: "cia-havana-visit",
    kicker: "Cuba · Americas",
    title: "CIA director visits Havana as US imperialism ramps up blackmail against Cuban Revolution",
    author: "Jorge Martín",
    date: "15 May 2026",
    dek: "If anyone thought that US imperialism's embarrassment in Iran would deter it from its escalating campaign of aggression against the Cuban Revolution, they were very mistaken. Since the 29 January executive order imposing an oil blockade on the island, Washington has continued to increase the pressure.",
    image: null,
  },
  {
    slug: "hondurasgate",
    kicker: "Honduras · Americas",
    title: "'Hondurasgate': the henchmen of the Donroe Doctrine",
    author: "Sylvia Léo",
    date: "15 May 2026",
    dek: "TV channel Canal Red released audio recordings of conversations between Honduran government officials, revealing a network of corruption and coercion involving Trump, Javier Milei, and even Benjamin Netanyahu.",
    image: null,
  },
  {
    slug: "indian-cp-defeat",
    kicker: "India · Asia",
    title: "Indian communist parties suffer historic defeat: how did we get here?",
    author: "Joe Attard",
    date: "14 May 2026",
    dek: "The April-May state elections were an historic turning point in Indian politics. Prime Minister Narendra Modi's Hindu nationalist BJP conquered West Bengal, while the Left Democratic Front (LDF) lost control of Kerala. For the first time since 1977, not a single Indian state will be led by a communist party.",
    image: null,
  },
  {
    slug: "trump-china-trip",
    kicker: "China · Podcast",
    title: "[Podcast] The meaning of Trump's trip to China",
    author: "Against the Stream",
    date: "14 May 2026",
    dek: "Trump is in Beijing. He thinks he has gone to negotiate from a position of strength, but in reality, he is negotiating from a position of weakness. That is the story of American imperialism in 2026.",
    image: "assets/topic-trump-iran.jpg",
  },
  {
    slug: "right-populist-international",
    kicker: "World · Politics",
    title: "The right-populist 'international' splinters as Trump presides over chaos",
    author: "Jack Tye Wilson",
    date: "13 May 2026",
    dek: "When Donald Trump returned to the Presidency of the United States back in January 2025, Europe's right-populist leaders and politicians were jubilant.",
    image: null,
  },
];

// ── Continents (placeholder feature card per continent) ─────────────────────
const CONTINENTS = [
  { id: "africa",      name: "Africa",       featuredTitle: "Featured analysis from across Africa", featuredDek: "Reports and perspectives from comrades organising on the continent. Featured article placeholder.", image: null },
  { id: "americas",    name: "Americas",     featuredTitle: "Featured analysis from the Americas", featuredDek: "From Canada to Argentina — class struggle and the fight against US imperialism. Featured article placeholder.", image: "assets/card-war-on-iran.png" },
  { id: "asia",        name: "Asia",         featuredTitle: "Featured analysis from Asia",        featuredDek: "From China to India — the inter-imperialist rivalry and the awakening of Asia's working class. Featured article placeholder.", image: "assets/econ-china.jpg" },
  { id: "europe",      name: "Europe",       featuredTitle: "Featured analysis from Europe",      featuredDek: "From Britain to the Balkans — austerity, war, and the rise of the working class. Featured article placeholder.", image: "assets/sections-britain-rcp.jpg" },
  { id: "middle-east", name: "Middle East",  featuredTitle: "Featured analysis from the Middle East", featuredDek: "War, occupation, and the Palestinian struggle. Featured article placeholder.", image: "assets/topic-iran-war.jpg" },
  { id: "oceania",     name: "Oceania",      featuredTitle: "Featured analysis from Oceania",     featuredDek: "Australia, New Zealand, and the Pacific. Featured article placeholder.", image: null },
];

// ── Topics (placeholder feature card per topic) ─────────────────────────────
const TOPICS = [
  { id: "art",         name: "Art",                  featuredTitle: "Marxism and the arts",                featuredDek: "From Mozart to Mayakovsky — culture as a battleground in the class struggle. Featured article placeholder.", image: null },
  { id: "economy",     name: "Economy",              featuredTitle: "The crisis of the world economy",    featuredDek: "Inflation, debt, recession — Marxist analysis of capitalism's contradictions. Featured article placeholder.", image: "assets/econ-shadow-banking.jpg" },
  { id: "environment", name: "Environment",          featuredTitle: "Capitalism and the climate crisis",  featuredDek: "Why only the overthrow of capitalism can save the planet. Featured article placeholder.", image: null },
  { id: "sci-tech",    name: "Science & Technology", featuredTitle: "AI, science, and the working class", featuredDek: "Who controls the technology shapes the future. A Marxist perspective. Featured article placeholder.", image: "assets/econ-ai.jpg" },
  { id: "world",       name: "World Perspectives",   featuredTitle: "2026: war, revolution, reaction",    featuredDek: "An assessment of the world situation by the International Secretariat. Featured article placeholder.", image: "assets/hero-imperialist-war.png" },
];

// ── Masthead (copied verbatim from app.jsx) ─────────────────────────────────
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
          <a href="#" aria-label="YouTube" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="Twitter / X" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="Telegram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.34 18.7 19.7c-.24 1.08-.88 1.34-1.78.84l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96L17.8 6.5c.4-.36-.08-.55-.62-.2L7.6 12.4l-4.92-1.54c-1.07-.34-1.1-1.07.22-1.58l19.27-7.43c.9-.34 1.68.2 1.38 1.58z"/></svg>
          </a>
        </div>
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
      </div>
    </header>
  );
}

// ── Nav (2.5D pressable tabs — copied from app.jsx) ─────────────────────────
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
              href={tab.href}
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

// ── Footer (copied verbatim from app.jsx) ───────────────────────────────────
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
            <a href="analysis.html">Analysis</a>
            <a href="#">Theory & History</a>
            <a href="#">Podcasts</a>
            <a href="#">In Defence of Marxism</a>
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

// ── Slab placeholder used when an article has no image ──────────────────────
function SlabFill({ label }) {
  return (
    <div className="slab-fill">
      <span style={{ position: "relative", zIndex: 2, textWrap: "balance" }}>{label}</span>
    </div>
  );
}

// ── Latest Analysis: featured 2-up + 3-column grid ──────────────────────────
function LatestAnalysis() {
  const featured = ARTICLES.slice(0, 2);
  const rest = ARTICLES.slice(2);

  return (
    <section className="analysis-section">
      <header className="analysis-section-head">
        <h2 className="analysis-section-h2">Latest Analysis</h2>
        <div className="analysis-section-meta">{ARTICLES.length} articles · in publication order</div>
      </header>

      <div className="analysis-feature-grid">
        {featured.map((a) => (
          <a key={a.slug} href="article.html" className="analysis-feature-card">
            <div className="analysis-feature-img">
              {a.image ? <img src={a.image} alt="" /> : <SlabFill label={a.title} />}
            </div>
            <div className="analysis-card-kicker">{a.kicker}</div>
            <h3 className="analysis-feature-title">{a.title}</h3>
            <p className="analysis-feature-dek">{a.dek}</p>
            <div className="analysis-feature-byline">{a.author} · {a.date}</div>
          </a>
        ))}
      </div>

      <div className="analysis-grid">
        {rest.map((a) => (
          <a key={a.slug} href="article.html" className="analysis-card">
            <div className="analysis-card-img">
              {a.image ? <img src={a.image} alt="" /> : <SlabFill label={a.title} />}
            </div>
            <div className="analysis-card-kicker">{a.kicker}</div>
            <h3 className="analysis-card-title">{a.title}</h3>
            <p className="analysis-card-dek">{a.dek}</p>
            <div className="analysis-card-byline">{a.author} · {a.date}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Continents section ──────────────────────────────────────────────────────
function ContinentsBlock() {
  return (
    <section className="analysis-section">
      <header className="analysis-section-head">
        <h2 className="analysis-section-h2">Continents</h2>
        <div className="analysis-section-meta">{CONTINENTS.length} regions</div>
      </header>
      <div className="cat-grid">
        {CONTINENTS.map((c) => (
          <a key={c.id} href="#" className="analysis-card">
            <div className="analysis-card-img">
              {c.image ? <img src={c.image} alt="" /> : <SlabFill label={c.name} />}
            </div>
            <div className="analysis-card-kicker">{c.name}</div>
            <h3 className="analysis-card-title">{c.featuredTitle}</h3>
            <p className="analysis-card-dek">{c.featuredDek}</p>
            <div className="analysis-card-byline">Placeholder · See all →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Topics section ──────────────────────────────────────────────────────────
function TopicsBlock() {
  return (
    <section className="analysis-section">
      <header className="analysis-section-head">
        <h2 className="analysis-section-h2">Topics</h2>
        <div className="analysis-section-meta">{TOPICS.length} topics</div>
      </header>
      <div className="cat-grid">
        {TOPICS.map((t) => (
          <a key={t.id} href="#" className="analysis-card">
            <div className="analysis-card-img">
              {t.image ? <img src={t.image} alt="" /> : <SlabFill label={t.name} />}
            </div>
            <div className="analysis-card-kicker">{t.name}</div>
            <h3 className="analysis-card-title">{t.featuredTitle}</h3>
            <p className="analysis-card-dek">{t.featuredDek}</p>
            <div className="analysis-card-byline">Placeholder · See all →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  return (
    <div className="site">
      <Masthead />
      <Nav active="Analysis" />
      <main>
        <LatestAnalysis />
        <ContinentsBlock />
        <TopicsBlock />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
