// Marxist.com — Marxist University (History Portal) page
// Standalone sibling to app.jsx / magazine.jsx / media.jsx. Loaded by history.html.
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (History is active here) ─────────────────────────────────
const NAV_TABS = [
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory", href: "theory.html" },
  { label: "History", href: "history.html" },
  { label: "Classics", href: "classics.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
];

// ── Revolutionary History Topics ─────────────────────────────────────────────
const HISTORY_TOPICS = [
  {
    title: "Ancient history",
    kicker: "History",
    image: "assets/theory/Tod_des_Spartacus_by_Hermann_Vogel.jpg",
    url: "https://marxist.com/theory-ancient-history.htm",
    desc: "The history of the ancient world is ripe with lessons about the development of class society and the heroic struggle of the early oppressed classes against their masters."
  },
  {
    title: "English Revolution",
    kicker: "History",
    image: "assets/theory/oliver-cromwell.jpg",
    url: "https://marxist.com/theory-english-revolution.htm",
    desc: "The Civil War in England was a revolutionary clash by the rising bourgeois class of English merchants and bankers, led by Oliver Cromwell, against the rotten feudal regime of Charles I."
  },
  {
    title: "French Revolution",
    kicker: "History",
    image: "assets/theory/640px-Prise_de_la_Bastille.jpg",
    url: "https://marxist.com/theory-french-revolution.htm",
    desc: "In the Great French Revolution of 1789, the revolutionary bourgeoisie and popular masses overthrew the decrepit Ancien Regime, creating an earthquake that shook the world."
  },
  {
    title: "Paris Commune",
    kicker: "History",
    image: "assets/theory/commune.jpg",
    url: "https://marxist.com/theory-paris-commune.htm",
    desc: "For a tragically brief period in 1871, the workers of Paris began the tremendous task of replacing the capitalist state with the dictatorship of the proletariat."
  },
  {
    title: "First International",
    kicker: "History",
    image: "assets/theory/marx-speaking.jpg",
    url: "https://marxist.com/theory-first-international.htm",
    desc: "The first international proletarian organisation, with the participation of Marx and Engels, paved the way for the development of organised working-class struggle worldwide."
  },
  {
    title: "Second International",
    kicker: "History",
    image: "assets/theory/solidarity_of_labour.jpg",
    url: "https://marxist.com/theory-second-international.htm",
    desc: "The Second International was a formidable bastion of working-class internationalism until it descended into national chauvinism and opportunism. Its history is rich with lessons."
  },
  {
    title: "World War I",
    kicker: "History",
    image: "assets/theory/ww1.jpg",
    url: "https://marxist.com/theory-world-war-i.htm",
    desc: "To understand the causes of the great slaughter, it is necessary to lay bare the real mainspring of war in the modern epoch: the contradiction between the interests of different capitalist states."
  },
  {
    title: "German Revolution",
    kicker: "History",
    image: "assets/theory/germany.jpg",
    url: "https://marxist.com/theory-german-revolution.htm",
    desc: "After the Russian Revolution, the German proletariat entered the scene of history and brought an end to WW1 - but their revolution was sadly defeated."
  },
  {
    title: "Third International",
    kicker: "History",
    image: "assets/theory/communist-third-international-360.jpg",
    url: "https://marxist.com/theory-third-international.htm",
    desc: "The Third (Communist) International was a vital school of revolutionary ideas and strategy, which degenerated with the rise of Stalinism."
  },
  {
    title: "Fourth International",
    kicker: "History",
    image: "assets/theory/Logo_of_the_Fourth_International2.gif",
    url: "https://marxist.com/theory-fourth-international.htm",
    desc: "The history of the Fourth International was a struggle (led by Leon Trotsky) to keep the genuine traditions of Bolshevism alive, against colossal odds."
  },
  {
    title: "Spanish Revolution",
    kicker: "History",
    image: "assets/theory/poum.jpg",
    url: "https://marxist.com/theory-spanish-revolution.htm",
    desc: "The Spanish masses strived towards socialist revolution in the 1930s, but were strangled by the class collaboration of their leadership, paving the road to fascist victory."
  },
  {
    title: "World War II",
    kicker: "History",
    image: "assets/theory/Soviet_flag_on_the_Reichstag_roof_image_wikimedia_commons.jpg",
    url: "https://marxist.com/theory-world-war-ii.htm",
    desc: "Although WW2 is often portrayed in the history books as a clash between ‘democracy’ and Hitler’s Germany, the war was mostly a titanic struggle between fascism and the USSR in which the latter triumphed."
  },
  {
    title: "Chinese Revolution",
    kicker: "History",
    image: "assets/theory/chinese-revolution.jpg",
    url: "https://marxist.com/theory-chinese-revolution.htm",
    desc: "The Chinese Revolution saw the heroic masses throwing off the yoke of imperialism, although the revolution degenerated along Stalinist lines, culminating in capitalist restoration."
  },
  {
    title: "Cuban Revolution",
    kicker: "History",
    image: "assets/theory/che-fidel720.jpg",
    url: "https://marxist.com/theory-cuban-revolution.htm",
    desc: "On 1 January 1959, the brutal Cuban dictator Batista fell to the guerrillas of Fidel Castro and Che Guevara. Within three years, capitalism had been abolished on the island."
  },
  {
    title: "Colonial Revolution",
    kicker: "History",
    image: "assets/theory/colonial-revolution.jpg",
    url: "https://marxist.com/theory-colonial-revolution.htm",
    desc: "In the colonial and ex-colonial countries, the post-war period saw unprecedented upheaval, characterised by famine, social unrest, wars, revolution and counter-revolution."
  },
  {
    title: "Revolutionary 1968",
    kicker: "History",
    image: "assets/theory/mai68.jpg",
    url: "https://marxist.com/theory-revolutionary-1968.htm",
    desc: "The year 1968 saw one revolutionary eruption after another worldwide, including the greatest general strike in the post-war period in France, which almost toppled Charles de Gaulle."
  },
  {
    title: "Ireland and Republicanism",
    kicker: "History",
    image: "assets/theory/ireland-mural.jpg",
    url: "https://marxist.com/theory-ireland-republicanism.htm",
    desc: "The national struggle and the class struggle in Ireland have always been closely connected. Today, the struggle for a united Ireland is bound up with the struggle for a workers’ republic."
  },
  {
    title: "British Labour Movement",
    kicker: "History",
    image: "assets/theory/labour.jpg",
    url: "https://marxist.com/theory-british-labour-movement.htm",
    desc: "Despite its conservative reputation, Britain’s history is full of class struggle: from Chartism to the foundation of the Labour Party, to the general strike of 1926, to the Miners’ Strike of the 1980s."
  },
  {
    title: "Class Struggle in the USA",
    kicker: "History",
    image: "assets/theory/marxism-usa.jpg",
    url: "https://marxist.com/theory-class-struggle-in-the-usa.htm",
    desc: "The history of the class struggle in the United States illustrates that the ideas of Marxism, socialism and communism aren't at all alien to \"the land of opportunity.\""
  },
  {
    title: "Black Struggle",
    kicker: "History",
    image: "assets/theory/black-struggle.jpg",
    url: "https://marxist.com/theory-black-struggle.htm",
    desc: "Racism is hardwired into the capitalist system, serving as a convenient weapon of divide and rule to keep the exploited masses from uniting against their shared oppressors."
  },
  {
    title: "Deformed Workers' States",
    kicker: "History",
    image: "assets/theory/berlin-wall.jpg",
    url: "https://marxist.com/theory-deformed-workers-states.htm",
    desc: "A revolutionary wave swept Europe after the Red Army’s victory over fascism in WW2, but the new regimes established were deformed workers’ states modelled on Stalinist Russia."
  },
  {
    title: "Arab Revolution",
    kicker: "History",
    image: "assets/theory/arab-revolution.jpg",
    url: "https://marxist.com/theory-arab-revolution.htm",
    desc: "In 2011, a tremendous revolutionary tsunami swept the Arab world, bringing down multiple dictatorships. Sadly, a lack of revolutionary leadership opened the door for counter-revolution."
  },
  {
    title: "Venezuelan Revolution",
    kicker: "History",
    image: "assets/theory/venezuela.jpg",
    url: "https://marxist.com/theory-venezuelan-revolution.htm",
    desc: "The Bolivarian Revolution led by Hugo Chavez defied imperialism and carried out huge reforms for the workers and poor, but its failure to break with capitalism led to compromise and crisis."
  },
  {
    title: "Perspectives",
    kicker: "History",
    image: "assets/theory/dead-end.jpg",
    url: "https://marxist.com/world-perspectives.htm",
    desc: "The purpose of Marxist perspectives is to provide a guide to action based on scientific analysis of the main processes in society. These documents ask: where is world politics going?"
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

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  // Filter history topics based on search query
  const filteredHistory = useMemo(() => {
    if (!query.trim()) return HISTORY_TOPICS;
    const lowerQuery = query.toLowerCase();
    return HISTORY_TOPICS.filter(
      (topic) =>
          topic.title.toLowerCase().includes(lowerQuery) ||
          topic.desc.toLowerCase().includes(lowerQuery) ||
          topic.kicker.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const hasAnyResults = filteredHistory.length > 0;

  return (
    <div className="site">
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active="History" onOpenMenu={() => setMenuOpen(true)} />

      <main className="site-main">
        {/* History Hero Section */}
        <section className="theory-hero">
          <div className="theory-hero-content">
            <span className="theory-hero-eyebrow">Marxist University</span>
            <h1 className="theory-hero-h1">Revolutionary History</h1>
            <p className="theory-hero-p">
              “Revolution is the locomotive of history.” — <b>Karl Marx.</b> Discover the lessons of past struggles, revolutions, and working-class movements to prepare for the battles ahead.
            </p>
          </div>
        </section>

        {/* Search Bar (no filters needed) */}
        <section className="theory-controls">
          <div className="theory-search-bar" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5l-4-4" />
            </svg>
            <input
              type="text"
              className="theory-search-input"
              placeholder="Search history topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Grid Lists */}
        {!hasAnyResults ? (
          <div className="theory-empty">
            No topics match your search query: "{query}"
          </div>
        ) : (
          <div className="theory-grid-section">
            <SectionHead label="Revolution — the locomotive of history" divider="thick-slab" />
            <div className="theory-grid">
              {filteredHistory.map((topic, index) => (
                <TheoryCard key={index} topic={topic} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
