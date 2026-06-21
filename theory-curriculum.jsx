// Marxist.com — Theory Portal page
// Standalone sibling to app.jsx / magazine.jsx / media.jsx. Loaded by theory.html.
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (Theory is active here) ─────────────────────────────────
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

// ── The Three Pillars of Marxism ─────────────────────────────────────────────
// Each pillar branches into three tiers of readings: essential / deeper / further.
// Classic texts link to the marxists.org archive; guides link to marxist.com.
const PILLARS = [
  {
    id: "pillar-dialectical-materialism",
    numeral: "I",
    title: "Dialectical Materialism",
    tagline: "The Method",
    intro: "Dialectical materialism is the philosophy and method of Marxism. Nature, society and thought are not fixed things but processes — full of contradiction, motion and sudden leaps. Before we can change the world, we must learn to understand it.",
    quote: { text: "The philosophers have only interpreted the world, in various ways; the point is to change it.", source: "Marx, Theses on Feuerbach" },
    archiveUrl: "https://marxist.com/theory-dialectical-materialism.htm",
    essential: [
      {
        title: "Socialism: Utopian and Scientific",
        author: "Friedrich Engels",
        desc: "Engels traces socialism from the utopian dreamers to a science, and gives the clearest short account of the dialectical method ever written. The classic starting point.",
        url: "https://www.marxists.org/archive/marx/works/1880/soc-utop/index.htm"
      },
      {
        title: "The ABC of Materialist Dialectics",
        author: "Leon Trotsky",
        desc: "Written in the struggle against Trotsky's middle-class critics, this short text distils the dialectic to its sharpest essentials in a dozen pages.",
        url: "https://www.marxists.org/archive/trotsky/1939/12/abc.htm"
      },
      {
        title: "What Is Dialectical Materialism?",
        author: "Rob Sewell",
        desc: "A modern introduction to the ideas of dialectical materialism, with examples drawn from science, nature and the class struggle.",
        url: "https://marxist.com/what-is-dialectical-materialism.htm"
      }
    ],
    deeper: [
      { title: "Ludwig Feuerbach and the End of Classical German Philosophy", author: "Friedrich Engels", note: "Where Marx and Engels settle accounts with Hegel and Feuerbach.", url: "https://www.marxists.org/archive/marx/works/1886/ludwig-feuerbach/index.htm" },
      { title: "Anti-Dühring", author: "Friedrich Engels", note: "The encyclopaedia of Marxism: philosophy, natural science, history and economics.", url: "https://www.marxists.org/archive/marx/works/1877/anti-duhring/index.htm" },
      { title: "Theses on Feuerbach", author: "Karl Marx", note: "Eleven theses that founded a new philosophy — ending with the most famous of all.", url: "https://www.marxists.org/archive/marx/works/1845/theses/index.htm" },
      { title: "Reason in Revolt", author: "Alan Woods & Ted Grant", note: "Marxist philosophy confronts modern science, chaos theory and cosmology.", url: "https://wellredbooks.co.uk/products/reason-in-revolt" }
    ],
    further: [
      { title: "Dialectics of Nature", author: "Friedrich Engels", url: "https://www.marxists.org/archive/marx/works/1883/don/index.htm" },
      { title: "Materialism and Empirio-Criticism", author: "V.I. Lenin", url: "https://www.marxists.org/archive/lenin/works/1908/mec/index.htm" },
      { title: "Philosophical Notebooks", author: "V.I. Lenin", url: "https://www.marxists.org/archive/lenin/works/cw/volume38.htm" },
      { title: "The History of Philosophy: A Marxist Perspective", author: "Alan Woods", url: "https://wellredbooks.co.uk/products/the-history-of-philosophy" }
    ]
  },
  {
    id: "pillar-historical-materialism",
    numeral: "II",
    title: "Historical Materialism",
    tagline: "The Theory of History",
    intro: "Historical materialism applies the dialectical method to society. History is not a series of accidents: each social system develops according to inherent laws that drive it forward — and eventually spell its undoing. The motor of that development is the class struggle.",
    quote: { text: "The history of all hitherto existing society is the history of class struggles.", source: "Marx & Engels, The Communist Manifesto" },
    archiveUrl: "https://marxist.com/theory-historical-materialism.htm",
    essential: [
      {
        title: "The Communist Manifesto",
        author: "Karl Marx & Friedrich Engels",
        desc: "The founding document of our movement: the materialist conception of history set out at full gallop, as fresh today as in 1848.",
        url: "https://www.marxists.org/archive/marx/works/1848/communist-manifesto/index.htm"
      },
      {
        title: "The Origin of the Family, Private Property and the State",
        author: "Friedrich Engels",
        desc: "How the family, private property and the state arose out of the development of class society — and why none of them are eternal.",
        url: "https://www.marxists.org/archive/marx/works/1884/origin-family/index.htm"
      },
      {
        title: "Preface to A Contribution to the Critique of Political Economy",
        author: "Karl Marx",
        desc: "In two pages, Marx sets out the materialist conception of history in its most concentrated form. Worth a hundred volumes of academic sociology.",
        url: "https://www.marxists.org/archive/marx/works/1859/critique-pol-economy/preface.htm"
      }
    ],
    deeper: [
      { title: "The German Ideology", author: "Karl Marx & Friedrich Engels", note: "The first full statement of the materialist conception of history.", url: "https://www.marxists.org/archive/marx/works/1845/german-ideology/index.htm" },
      { title: "The Eighteenth Brumaire of Louis Bonaparte", author: "Karl Marx", note: "Class struggle as living history: how Bonaparte rose on the ruins of 1848.", url: "https://www.marxists.org/archive/marx/works/1852/18th-brumaire/index.htm" },
      { title: "The State and Revolution", author: "V.I. Lenin", note: "What the state is, whose interests it serves, and why it must be replaced.", url: "https://www.marxists.org/archive/lenin/works/1917/staterev/index.htm" },
      { title: "What Is Historical Materialism?", author: "Alan Woods", note: "A modern introduction to the Marxist view of history.", url: "https://marxist.com/what-is-historical-materialism.htm" }
    ],
    further: [
      { title: "The Civil War in France", author: "Karl Marx", url: "https://www.marxists.org/archive/marx/works/1871/civil-war-france/index.htm" },
      { title: "The Peasant War in Germany", author: "Friedrich Engels", url: "https://www.marxists.org/archive/marx/works/1850/peasant-war-germany/index.htm" },
      { title: "The Role of the Individual in History", author: "Georgi Plekhanov", url: "https://www.marxists.org/archive/plekhanov/1898/xx/individual.html" },
      { title: "The Part Played by Labour in the Transition from Ape to Man", author: "Friedrich Engels", url: "https://www.marxists.org/archive/marx/works/1876/part-played-labour/index.htm" },
      { title: "History of the Russian Revolution", author: "Leon Trotsky", url: "https://www.marxists.org/archive/trotsky/1930/hrr/index.htm" }
    ]
  },
  {
    id: "pillar-marxist-economics",
    numeral: "III",
    title: "Marxist Economics",
    tagline: "The Laws of Motion of Capital",
    intro: "Marxist economics lays bare the laws of motion of capitalist production: where profit really comes from, how labour is exploited, and why the system is condemned to periodic crisis. It is the anatomy of the world we are fighting to overthrow.",
    quote: { text: "Capital comes dripping from head to foot, from every pore, with blood and dirt.", source: "Marx, Capital, Volume I" },
    archiveUrl: "https://marxist.com/theory-marxist-economics.htm",
    essential: [
      {
        title: "Wage-Labour and Capital",
        author: "Karl Marx",
        desc: "Marx's clearest popular explanation of wages, profit and exploitation, written for workers' study circles. Begin your study of economics here.",
        url: "https://www.marxists.org/archive/marx/works/1847/wage-labour/index.htm"
      },
      {
        title: "Value, Price and Profit",
        author: "Karl Marx",
        desc: "Delivered as a speech to the First International: surplus value explained — and the case against those who say fighting for higher wages is futile.",
        url: "https://www.marxists.org/archive/marx/works/1865/value-price-profit/index.htm"
      }
    ],
    deeper: [
      { title: "Capital, Volume I", author: "Karl Marx", note: "The foundation stone: the commodity, value, surplus value and accumulation.", url: "https://www.marxists.org/archive/marx/works/1867-c1/index.htm" },
      { title: "Imperialism: The Highest Stage of Capitalism", author: "V.I. Lenin", note: "Monopoly, finance capital and war: capitalism's highest stage.", url: "https://www.marxists.org/archive/lenin/works/1916/imp-hsc/index.htm" },
      { title: "Understanding Marx's Capital: A Reader's Guide", author: "Adam Booth & Rob Sewell", note: "A chapter-by-chapter companion for tackling Volume I.", url: "https://marxist.com/understanding-marx-s-capital-a-reader-s-guide.htm" }
    ],
    further: [
      { title: "Critique of the Gotha Programme", author: "Karl Marx", url: "https://www.marxists.org/archive/marx/works/1875/gotha/index.htm" },
      { title: "Grundrisse", author: "Karl Marx", url: "https://www.marxists.org/archive/marx/works/1857/grundrisse/index.htm" },
      { title: "Theories of Surplus Value", author: "Karl Marx", url: "https://www.marxists.org/archive/marx/works/1863/theories-surplus-value/index.htm" },
      { title: "Capital, Volumes II & III", author: "Karl Marx", url: "https://www.marxists.org/archive/marx/works/1885-c2/index.htm" },
      { title: "Will There Be a Slump?", author: "Ted Grant", url: "https://www.marxists.org/archive/grant/1960/03/slump.htm" }
    ]
  }
];

// Newcomers' on-ramp shown beneath the pillar triptych
const START_HERE = [
  { title: "The Three Sources and Three Component Parts of Marxism", author: "V.I. Lenin", url: "https://www.marxists.org/archive/lenin/works/1913/mar/x01.htm" },
  { title: "Fundamentals of Marxism: a reading guide", author: "marxist.com", url: "https://marxist.com/fundamentals-of-marxism.htm" }
];

// ── Applied theory & further topics (everything beyond the three pillars) ────
const THEORY_TOPICS = [
  {
    title: "Marxism and the State",
    kicker: "Theory",
    image: "assets/theory/state640.jpg",
    url: "https://marxist.com/theory-the-state.htm",
    desc: "The state is an instrument of class rule. We must understand the state’s role by analysing it scientifically, from its first emergence out of class society, to the present day."
  },
  {
    title: "Bolshevism",
    kicker: "Strategy",
    image: "assets/theory/Beat_the_Whites_with_the_Red_Wedge_by_El_Lissitzky_-_Public_Domain.jpg",
    url: "https://marxist.com/russian-revolution/",
    desc: "The Russian Revolution of 1917 is the greatest event in world history. For the first time working people took power into their own hands and began the gigantic task of the socialist reconstruction of society."
  },
  {
    title: "Stalinism",
    kicker: "History",
    image: "assets/theory/stalinhead.jpg",
    url: "https://marxist.com/theory-stalinism.htm",
    desc: "The Russian Revolution was betrayed and degenerated under a counter-revolutionary bureaucracy, led by Stalin. Understanding why this happened is critical for Marxists."
  },
  {
    title: "The National Question",
    kicker: "Theory",
    image: "assets/theory/Catalan_demo_hero_WikimediaCommons.png",
    url: "https://marxist.com/theory-the-national-question.htm",
    desc: "Marxists are internationalists, who fight for world revolution. We also stand for the liberation of oppressed nationalities as part of this struggle."
  },
  {
    title: "Anarchism",
    kicker: "Theory",
    image: "assets/theory/Anarchist_flag_commons.wikimedia.org--wiki--FileCOLONAnarchist--flag_with_A_symbol.svg.png",
    url: "https://marxist.com/theory-marxism-and-anarchism.htm",
    desc: "Marxists share anarchists’ objective of overthrowing the bourgeois state. But the anarchist understanding of power and the state is abstract, rather than scientific - and therefore limited."
  },
  {
    title: "Imperialism and War",
    kicker: "Economics",
    image: "assets/theory/war-imperialism800.jpg",
    url: "https://marxist.com/theory-imperialism-war.htm",
    desc: "Imperialism is the highest stage of capitalism, and war is the extreme expression of capitalism's contradictions and rapacious hunt for profit."
  },
  {
    title: "Identity and Oppression",
    kicker: "Theory",
    image: "assets/theory/marxism_poster_women_1_Image_public_domain.jpg",
    url: "https://marxist.com/theory-identity-oppression.htm",
    desc: "Marxists are irreconcilably opposed to oppression and fight determinedly for the liberation of marginalised groups, which can only be achieved through class struggle."
  },
  {
    title: "Fascism",
    kicker: "Theory",
    image: "assets/theory/fascism.jpg",
    url: "https://marxist.com/theory-fascism.htm",
    desc: "The madness of fascism in the 1930s expressed the historic crisis and dead-end of capitalism, and could have been averted through revolution. But is fascism a major threat today? And how can it be combatted?"
  },
  {
    title: "Religion",
    kicker: "Philosophy",
    image: "assets/theory/religion640.jpg",
    url: "https://marxist.com/theory-marxism-and-religion.htm",
    desc: "Marxism rejects superstition, but religion cannot be overcome by recourse to argument alone; we must instead attack its social foundation: the class system itself."
  },
  {
    title: "Environment",
    kicker: "Science",
    image: "assets/theory/climatechange360.jpg",
    url: "https://marxist.com/theory-environment.htm",
    desc: "The capitalists and their political representatives are completely incapable of saving the planet from environmental disaster. System change, not climate change!"
  },
  {
    title: "Art",
    kicker: "Culture",
    image: "assets/theory/goya.jpg",
    url: "https://marxist.com/theory-art.htm",
    desc: "Art under capitalism is shackled to the profit motive, and the majority of people are denied the opportunity to experience and develop culture to its fullest. Only socialism can liberate the arts."
  },
  {
    title: "Science and Technology",
    kicker: "Science",
    image: "assets/theory/Automation640.jpg",
    url: "https://marxist.com/theory-science-technology.htm",
    desc: "Capitalism is supposed to drive innovation, technological sophistication and scientific advancement. But in fact, it has become a brake on progress."
  },
  {
    title: "Workers' control",
    kicker: "Strategy",
    image: "assets/theory/workers-control2.jpg",
    url: "https://marxist.com/theory-workers-control.htm",
    desc: "Under capitalism, a minority runs production for their narrow interests. We advocate workers seizing control of their workplaces, and running them for the common good."
  },
  {
    title: "In Defence of Genuine Marxism",
    kicker: "Theory",
    image: "assets/theory/marx-engels-1000.jpg",
    url: "https://marxist.com/theory-marxism-vs-revisionism.htm",
    desc: "There have been countless attacks, falsifications and distortions levelled against Marxism over the years. It is our duty as Marxists to set the record straight."
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

// ── Theory Card Component ───────────────────────────────────────────────────
function TheoryCard({ topic }) {
  return (
    <a href={topic.url} className="theory-card" target="_blank" rel="noopener noreferrer">
      <div className="theory-card-img-wrap">
        <img src={topic.image} alt={topic.title} className="theory-card-img" />
        <div className="theory-card-img-grain" />
      </div>
      <div className="theory-card-body">
        <div className="theory-card-eyebrow">{topic.kicker}</div>
        <h3 className="theory-card-title">{topic.title}</h3>
        <p className="theory-card-desc">{topic.desc}</p>
      </div>
    </a>
  );
}

// ── Pillar Triptych: architrave + three columns, anchor-links to chapters ────
function PillarTriptych() {
  const onColClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="triptych" aria-label="The three pillars of Marxism">
      <div className="triptych-architrave">
        <span className="triptych-architrave-word">Marxism</span>
      </div>
      <div className="triptych-cols">
        {PILLARS.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="triptych-col" onClick={(e) => onColClick(e, p.id)}>
            <div className="t-capital" />
            <div className="t-capital t-capital--lower" />
            <div className="t-shaft" />
            <div className="t-base t-base--upper" />
            <div className="t-base" />
            <div className="t-label">
              <span className="t-label-numeral">{p.numeral}</span>
              <span className="t-label-title">{p.title}</span>
              <span className="t-label-tag">{p.tagline}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Start Here strip ─────────────────────────────────────────────────────────
function StartHere() {
  return (
    <aside className="start-here">
      <span className="start-here-label">New to Marxism? Start here</span>
      <div className="start-here-links">
        {START_HERE.map((item) => (
          <a key={item.title} href={item.url} className="start-here-link" target="_blank" rel="noopener noreferrer">
            <span className="start-here-link-title">{item.title}</span>
            <span className="start-here-link-author">{item.author}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

// ── Pillar chapter: tiered readings ──────────────────────────────────────────
function TheorySlab({ title, author }) {
  return (
    <div className="theory-slab">
      <div className="theory-slab-texture" />
      <div className="theory-slab-author">{author}</div>
      <div className="theory-slab-title">{title}</div>
      <div className="theory-slab-foot">RCI Theory</div>
    </div>
  );
}

function EssentialCard({ reading }) {
  return (
    <a href={reading.url} className="essential-card" target="_blank" rel="noopener noreferrer">
      <div className="essential-cover">
        <TheorySlab title={reading.title} author={reading.author} />
      </div>
      <div className="essential-body">
        <div className="essential-author">{reading.author}</div>
        <h4 className="essential-title">{reading.title}</h4>
        <p className="essential-desc">{reading.desc}</p>
        <span className="essential-go">Read the text →</span>
      </div>
    </a>
  );
}

function TierHead({ level, label }) {
  return (
    <div className={`tier-head tier-head--${level}`}>
      <span className="tier-head-label">{label}</span>
    </div>
  );
}

function PillarChapter({ pillar, searching }) {
  const hasEssential = pillar.essential.length > 0;
  const hasDeeper = pillar.deeper.length > 0;
  const hasFurther = pillar.further.length > 0;
  const hasAny = hasEssential || hasDeeper || hasFurther;
  return (
    <section className="pillar-chapter" id={pillar.id}>
      <div className="chapter-head">
        <div className="chapter-numeral">{pillar.numeral}</div>
        <div className="chapter-head-main">
          <div className="chapter-eyebrow">Pillar {pillar.numeral} · {pillar.tagline}</div>
          <h2 className="chapter-title">{pillar.title}</h2>
          <p className="chapter-intro">{pillar.intro}</p>
          <blockquote className="chapter-quote">
            “{pillar.quote.text}” <cite>— {pillar.quote.source}</cite>
          </blockquote>
          <div className="chapter-archive">
            <PrintButton variant="ink" size="sm" href={pillar.archiveUrl} target="_blank" rel="noopener noreferrer">
              Explore the full archive →
            </PrintButton>
          </div>
        </div>
      </div>

      {searching && !hasAny && (
        <p className="chapter-no-match">No readings in this pillar match your search.</p>
      )}

      {hasEssential && (
        <div className="chapter-tier">
          <TierHead level="essential" label="Essential Reading" />
          <div className="essential-grid">
            {pillar.essential.map((r) => <EssentialCard key={r.title} reading={r} />)}
          </div>
        </div>
      )}

      {hasDeeper && (
        <div className="chapter-tier">
          <TierHead level="deeper" label="Going Deeper" />
          <div className="deeper-grid">
            {pillar.deeper.map((r) => (
              <a key={r.title} href={r.url} className="deeper-card" target="_blank" rel="noopener noreferrer">
                <div className="deeper-author">{r.author}</div>
                <div className="deeper-title">{r.title}</div>
                <p className="deeper-note">{r.note}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {hasFurther && (
        <div className="chapter-tier">
          <TierHead level="further" label="Further Study" />
          <div className="further-list">
            {pillar.further.map((r) => (
              <a key={r.title} href={r.url} className="further-row" target="_blank" rel="noopener noreferrer">
                <span className="further-title">{r.title}</span>
                <span className="further-author">{r.author}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Filter pillar readings and applied topics against the query
  const filteredPillars = useMemo(() => {
    if (!searching) return PILLARS;
    const hit = (r) =>
      r.title.toLowerCase().includes(q) ||
      r.author.toLowerCase().includes(q) ||
      (r.desc || r.note || "").toLowerCase().includes(q);
    return PILLARS.map((p) => ({
      ...p,
      essential: p.essential.filter(hit),
      deeper: p.deeper.filter(hit),
      further: p.further.filter(hit),
    }));
  }, [q, searching]);

  const filteredTheory = useMemo(() => {
    if (!searching) return THEORY_TOPICS;
    return THEORY_TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.desc.toLowerCase().includes(q) ||
        topic.kicker.toLowerCase().includes(q)
    );
  }, [q, searching]);

  const pillarHasResults = filteredPillars.some(
    (p) => p.essential.length + p.deeper.length + p.further.length > 0
  );
  const hasAnyResults = !searching || pillarHasResults || filteredTheory.length > 0;

  return (
    <div className="site">
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active="Theory" onOpenMenu={() => setMenuOpen(true)} />

      <main className="site-main">
        {/* Theory Hero Section */}
        <section className="theory-hero">
          <div className="theory-hero-content">
            <span className="theory-hero-eyebrow">Revolutionary Theory</span>
            <h1 className="theory-hero-h1">The Three Pillars of Marxism</h1>
            <p className="theory-hero-p">
              “Without revolutionary theory there can be no revolutionary movement.” — <b>V.I. Lenin.</b> Marxism rests on three great pillars: a philosophy, a theory of history, and a critique of political economy. Master all three, and you hold the tools to change the world.
            </p>
          </div>
        </section>

        {/* Pillar triptych + newcomers' on-ramp (hidden while searching) */}
        {!searching && (
          <React.Fragment>
            <PillarTriptych />
            <StartHere />
          </React.Fragment>
        )}

        {/* Section Search Bar */}
        <section className="theory-controls">
          <div className="theory-search-bar" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5l-4-4" />
            </svg>
            <input
              type="text"
              className="theory-search-input"
              placeholder="Search readings and topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        {!hasAnyResults ? (
          <div className="theory-empty">
            Nothing matches your search query: "{query}"
          </div>
        ) : (
          <React.Fragment>
            {/* The three pillar chapters */}
            {filteredPillars.map((pillar) => (
              <PillarChapter key={pillar.id} pillar={pillar} searching={searching} />
            ))}

            {/* Applied theory & further topics */}
            {filteredTheory.length > 0 && (
              <div className="theory-grid-section">
                <SectionHead label="Applied Theory & Further Topics" divider="thick-slab" />
                <div className="theory-grid theory-grid--compact">
                  {filteredTheory.map((topic, index) => (
                    <TheoryCard key={index} topic={topic} />
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
