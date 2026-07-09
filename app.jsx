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
  // hero side columns
  aac: R("imgAacPakistan", "assets/AAC_Pakistan.jpg"),
  france: R("imgFrancePopularFront", "assets/france_popular_front.jpg"),
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
        fontFamily: "var(--rci-font-display)",
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

;


// ── Masthead ────────────────────────────────────────────────────────────────


// ── Nav (2.5D pressable tabs) ────────────────────────────────────────────────


// ── Hero — big story + two secondaries ─────────────────────────────────────
function Hero({ tweaks }) {
  const leftCol = [
    { kicker: "Analysis · Pakistan", title: "Mass movement of AAC in Pakistan-administered Kashmir defies brutal state repression", byline: "Inqalabi Communist Party", image: IMG.aac, href: "#" },
    { kicker: "Economy · Iran War", title: "The economic consequences of the war in Iran", byline: "By Niklas Albin Svensson", image: IMG.iranNight, href: "article.html" },
  ];
  const rightCol = [
    { kicker: "History · France", title: "France: the Popular Front and the general strike of May–June 1936", byline: "By Jérôme Métellus", image: IMG.france, href: "#" },
    { kicker: "History · Palestine", title: "How British imperialism paved the way for the Nakba", byline: "By Khaled Malachi", image: IMG.palestine48, href: "#" },
  ];
  const SideCard = (s, i) => (
    <a key={i} href={s.href} className="hero-sec-card">
      <div className="hero-sec-img"><img src={s.image} alt={s.title} /></div>
      {s.kicker && <span className="rci-kicker">{s.kicker}</span>}
      <h3 className="hero-sec-title">{s.title}</h3>
      <div className="hero-sec-byline">{s.byline}</div>
    </a>
  );
  return (
    <section className="hero">
      <div className="hero-grid-3col">
        {/* LEFT COLUMN — two stacked stories */}
        <div className="hero-col hero-col--left">
          {leftCol.map(SideCard)}
        </div>

        {/* CENTER — BIG STORY (unchanged) */}
        <div className="hero-mid">
          <a href="article.html" className="hero-lead">
            <div className="hero-lead-img">
              <img src={IMG.china} alt="China sets the agenda at the Xi-Trump summit" />
            </div>
            <span className="rci-kicker">Analysis · China</span>
            <h1 className="hero-h1 hero-h1--serif">China sets the agenda at the Xi–Trump summit</h1>
            <p className="hero-dek">
              Trump went to Beijing believing he negotiated from strength; in reality, he
              negotiated from weakness. The unipolar hegemony of US imperialism is unravelling
              before our eyes.
            </p>
            <div className="hero-byline">By Daniel Morley · 19 May 2026</div>
          </a>
        </div>

        {/* RIGHT COLUMN — two stacked stories */}
        <div className="hero-col hero-col--right">
          {rightCol.map(SideCard)}
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
        <a href="index.html">see all latest &rarr;</a>
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
    { title: "Does Israel control the United States?", byline: "Ben Curry", href: "#" },
    { title: "The right-populist ‘international’ splinters as Trump presides over chaos", byline: "Jack Tye Wilson", href: "#" },
    { title: "The FIFA 2026 World Cup: sportwashing the crimes of western imperialism", byline: "Josh Cole-Hossain", href: "#" },
    { title: "China sets the agenda at the Xi-Trump summit", byline: "Daniel Morley", href: "#" },
    { title: "“A lot of people feel betrayed”: Iran War drives millions out of the MAGA camp", byline: "The Communist", href: "#" },
  ];
  return (
    <section className="trump2">
      <div className="rci-section-head">
        <h2>Donald Trump and the decline of US Imperialism</h2>
        <a href="index.html">All coverage &rarr;</a>
      </div>
      <div className="trump2-grid">
        <a href="article.html" className="feat-card trump2-feature">
          <div className="feat-bg" style={{ backgroundImage: `url("${IMG.trumpHead}")` }} />
          <div className="feat-body">
            <span className="rci-kicker" style={{ color: "#ff8a6e" }}>Analysis</span>
            <h3 className="feat-title">Trump’s defeat in Iran and its worldwide consequences</h3>
          </div>
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

// ── Join CTA banner — red copy on paper, framing the rotating globe ──────────
function JoinBanner() {
  return (
    <section className="join-banner">
      <iframe
        className="join-globe"
        src={R("globeLoader", "assets/globe-loader.html")}
        title="Animated globe"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="join-content">
        <Eyebrow className="join-eyebrow" style={{ fontSize: 13, letterSpacing: "0.24em" }}>Get organised</Eyebrow>
        <h2 className="join-h2">Join the fight</h2>
        <p className="join-body">
          The Revolutionary Communist International organises in over 70 countries. From mass
          strikes to student occupations, comrades on every continent are building the party we need.
          History is being made — be part of it.
        </p>
      </div>
      <div className="join-aside">
        <a href="join.html" className="foot-manifesto-card">
          <div className="foot-manifesto-img">
            <img src="assets/card-manifesto.jpg" alt="The Revolutionary Manifesto of the RCI" />
          </div>
        </a>
        <PrintButton variant="red" size="lg" href="join.html" className="join-rci-btn">Join the RCI</PrintButton>
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
    { title: "Marxist Economics", blurb: "Value, exploitation and capitalist crisis." },
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
          Without revolutionary theory there can be no revolutionary movement.
        </p>
        <p className="muni-quote-cite">
          <span className="muni-quote-name">V.I. Lenin</span>
          <span className="muni-quote-dot">&middot;</span>
          <span className="muni-quote-src">What Is To Be Done? (1902)</span>
        </p>
      </a>
      <div className="muni-grid">
        {courses.map((c, i) => (
          <a key={i} href="#" className="muni-card">
            <h3 className="muni-card-title">{c.title}</h3>
            <p className="muni-card-blurb">{c.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Reports: one card, carousel of the 3 latest dispatches + shared buttons ──
function Reports() {
  const slides = [
    {
      country: "Britain",
      title: "“With our burning fury, we will shake the world awake!”",
      image: R("imgBritainRcp", "assets/sections-britain-rcp.jpg"),
      href: "#"
    },
    {
      country: "Canada",
      title: "Third RCP Congress — a party up to the task",
      image: R("imgCanadaRcp", "assets/third_RCP_congress.jpg"),
      href: "#"
    },
    {
      country: "Colombia",
      title: "The founding congress of the Revolutionary Communists of Colombia",
      image: R("imgColombiaRcp", "assets/Colombia_congress.jpg"),
      href: "#"
    },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = (n) => setActive((n + count) % count);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="reports">
      <div className="rci-section-head"><h2>Reports</h2><a href="#">All reports &rarr;</a></div>
      <div
        className="reports-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="reports-carousel">
          {slides.map((s, i) => (
            <a
              key={i}
              href={s.href}
              className={"reports-slide" + (i === active ? " is-active" : "")}
              aria-hidden={i !== active}
              tabIndex={i === active ? 0 : -1}
            >
              <img src={s.image} alt={s.title} className="reports-slide-img" />
              <div className="reports-slide-overlay">
                <span className="rci-kicker">{s.country}</span>
                <h3 className="reports-slide-title">{s.title}</h3>
              </div>
            </a>
          ))}
          <button
            type="button"
            className="reports-nav prev"
            aria-label="Previous report"
            onClick={() => go(active - 1)}
          >&larr;</button>
          <button
            type="button"
            className="reports-nav next"
            aria-label="Next report"
            onClick={() => go(active + 1)}
          >&rarr;</button>
        </div>
        <div className="reports-dots" role="tablist" aria-label="Reports carousel">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.country + " report"}
              className={"reports-dot" + (i === active ? " is-active" : "")}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <div className="reports-foot">
          <PrintButton variant="paper" size="md" href="join.html">Find your local section &rarr;</PrintButton>
          <PrintButton variant="paper" size="md" href="#">All reports &rarr;</PrintButton>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────


// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      <Header activeTab={activeTab} />

      <main className="site-main">
        <Hero tweaks={T} />
        <LatestScroller />
        <Trump2 />
        <CampaignBanner tweaks={T} />
        <AgainstTheStream />
        <FeaturePair />
        <TopicGrid />
        <WorldSchoolBanner />
        <MarxistUniversity />
        <Reports />
        <JoinBanner />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
