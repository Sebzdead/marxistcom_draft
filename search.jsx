// Marxist.com — Search / "The Archive"
// Reuses Masthead, Nav, Footer (shared chrome, spliced from app.jsx by build)
// and PrintButton (components.jsx). Live client-side filtering — no page reload.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by super_inline_html) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const IMG = {
  manifesto: R("imgManifesto", "assets/card-manifesto.jpg"),
};

const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellredbooks.co.uk/" },
];

// ── Shared chrome (Masthead / Nav / Footer), spliced from app.jsx ──────────
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

// ── Section ink (drives duotone slab fallbacks + accents) ───────────────────
const SECTION_INK = {
  "Analysis": "red",
  "Theory & History": "blue",
  "Books": "ochre",
  "Reports": "green",
  "RCI": "red",
};
const INK_HEX = {
  red: "var(--rci-red)", blue: "var(--rci-blue)", ochre: "var(--rci-ochre)", green: "var(--rci-green)",
};

// ── The dispatch archive (real marxist.com titles, authors + assets) ─────────
const DATA = [
  { section: "Analysis", region: "China", category: "Imperialism & War", title: "China sets the agenda at the Xi–Trump summit", synopsis: "Trump went to Beijing believing he negotiated from strength; in reality, he negotiated from weakness. The unipolar hegemony of US imperialism is unravelling before our eyes.", author: "Daniel Morley", date: "2026-05-19", lang: "EN", tags: ["Imperialism", "China", "World Relations"], image: "assets/China sets the agenda at the Xi-Trump summit.jpg" },
  { section: "Analysis", region: "Middle East", category: "Imperialism & War", title: "The economic consequences of the war in Iran", synopsis: "The bombs have stopped falling, but the economic shockwaves are only beginning. We assess the cost of imperialist adventurism for workers across the region and the world.", author: "Niklas Albin Svensson", date: "2026-05-24", lang: "EN", tags: ["Iran War", "World Economy", "Imperialism"], image: "assets/Economic Consequences.jpg" },
  { section: "Analysis", region: "Romania", category: "Europe", title: "Romanian government collapses after ten months of austerity", synopsis: "Ten months of cuts have detonated under the ruling coalition. The Romanian crisis is a warning of the convulsions coming to the whole of Europe.", author: "Jonathan Hinckley", date: "2026-05-22", lang: "EN", tags: ["Europe", "Austerity", "Crisis"], image: "assets/Romanian Government.jpg" },
  { section: "Analysis", region: "Cuba", category: "Latin America", title: "US indictment of Raúl Castro: hands off Cuba!", synopsis: "Washington's latest legal aggression is a transparent pretext for tightening the blockade. Communists must answer the imperialist offensive with class solidarity.", author: "Revolutionary Communist International", date: "2026-05-21", lang: "EN", tags: ["Cuba", "Imperialism", "Latin America"], image: "assets/US Indictment of Raul Castro.jpg" },
  { section: "Analysis", region: "Cuba", category: "Latin America", title: "Cuban drones threaten Florida? Axios fabricates a pretext", synopsis: "The propaganda machine manufactures another phantom menace. Behind the scare headlines lies a renewed drive to strangle the Cuban Revolution.", author: "Jorge Martín", date: "2026-05-18", lang: "EN", tags: ["Cuba", "Media", "Imperialism"], image: "assets/Cuban drones threaten Florida? Axios fabricates pretext.jpg" },
  { section: "Analysis", region: "Venezuela", category: "Latin America", title: "Alex Saab handed over to US imperialism", synopsis: "The extradition marks a new low in the capitulation to Washington. We trace the class forces behind the betrayal and the road forward for Venezuelan workers.", author: "Jorge Martín", date: "2026-05-19", lang: "ES", tags: ["Venezuela", "Imperialism", "Latin America"], image: "assets/Venezuela- former Minister.jpg" },
  { section: "Analysis", region: "Honduras", category: "Latin America", title: "'Hondurasgate': the henchmen of the Donroe Doctrine", synopsis: "Corruption, intervention and the long shadow of the Monroe Doctrine. The Honduran scandal exposes how imperialism still governs the Americas.", author: "Sylvia Léo", date: "2026-05-15", lang: "ES", tags: ["Latin America", "Imperialism"], image: "assets/‘Hondurasgate’- the henchmen of the Donroe Doctrine.jpg" },
  { section: "Analysis", region: "Italy", category: "Party & Congress", title: "Second Congress of the Italian PCR — communists advance", synopsis: "Hundreds of delegates, a sharpened programme and a party rooted in struggle. The Italian communists take a decisive step forward.", author: "Francesco Salmeri", date: "2026-05-20", lang: "EN", tags: ["Party", "Europe", "Congress"], image: "assets/Second Congress of the Italian PCR.jpg" },
  { section: "Analysis", region: "United States", category: "Imperialism & War", title: "Trump's defeat in Iran and its worldwide consequences", synopsis: "The Iran debacle has cracked the MAGA coalition and emboldened America's rivals. The crisis of US imperialism enters a new and more dangerous phase.", author: "Hamid Alizadeh", date: "2026-05-14", lang: "EN", tags: ["Trump 2.0", "Iran War", "Imperialism"], image: "assets/topic-trump-iran.jpg" },
  { section: "Analysis", region: "Palestine", category: "Imperialism & War", title: "Palestine: the failure of the two-state solution", synopsis: "Decades of 'peace process' have delivered only dispossession. Only the revolutionary overthrow of the regional ruling classes can free Palestine.", author: "Ben Curry", date: "2026-05-11", lang: "EN", tags: ["Palestine", "Imperialism", "Middle East"], image: "assets/topic-two-state.jpg" },
  { section: "Analysis", region: "Britain", category: "World Economy", title: "[Podcast] Capitalism is ungovernable", synopsis: "From bond-market panic to political paralysis, the system has slipped the leash of its own masters. Against the Stream dissects a world out of control.", author: "Against the Stream", date: "2026-05-21", lang: "EN", tags: ["World Economy", "Podcast", "Crisis"], image: "assets/Podcast Capitalism is Ungovernable.jpg" },
  { section: "Analysis", region: "Cuba", category: "Latin America", title: "CIA director visits Havana as US imperialism ramps up blackmail", synopsis: "A rare high-level visit cloaks a hardening of the blockade. We expose the manoeuvres behind the diplomatic theatre.", author: "Jorge Martín", date: "2026-05-15", lang: "EN", tags: ["Cuba", "Imperialism"], image: "assets/CIA director visits Havana.jpg" },

  { section: "Theory & History", region: "Art", category: "Culture", title: "Figaro and the French Revolution", synopsis: "Beaumarchais' barber lit a fuse under the ancien régime. Alan Woods reads the comedy that Napoleon called 'the revolution already in action'.", author: "Alan Woods", date: "2026-05-22", lang: "EN", tags: ["Culture", "Revolution", "History"], image: "assets/Figaro.jpg" },
  { section: "Theory & History", region: "Palestine", category: "History", title: "How British imperialism paved the way for the Nakba", synopsis: "From the Balfour Declaration to the catastrophe of 1948, British policy engineered the dispossession of the Palestinian people. A history the rulers would rather forget.", author: "Khaled Malachi", date: "2026-05-20", lang: "EN", tags: ["Palestine", "History", "Imperialism"], image: "assets/How British imperialism paved the way for the Nakba.jpg" },
  { section: "Theory & History", region: "Britain", category: "History", title: "[Podcast] The 1926 General Strike: Britain's revolution betrayed", synopsis: "Nine days that shook the British ruling class — and the trade union leaders who threw victory away. The lessons of 1926 ring out a century on.", author: "Spectre of Communism", date: "2026-05-26", lang: "EN", tags: ["Britain", "Podcast", "History"], image: "assets/Podcast 1926 general_strike.jpg" },
  { section: "Theory & History", region: "Russia", category: "Marxist Theory", title: "Lenin and the art of insurrection", synopsis: "Insurrection, Lenin insisted, is an art. We return to October 1917 to draw out the strategic genius that made the workers' seizure of power possible.", author: "Alan Woods", date: "2026-04-02", lang: "EN", tags: ["Lenin", "Russia", "Revolution"], image: null },
  { section: "Theory & History", region: "Germany", category: "Marxist Theory", title: "Rosa Luxemburg and the mass strike", synopsis: "Against the bureaucratic caution of her day, Luxemburg grasped the explosive creativity of the masses. Her writings on the mass strike remain indispensable.", author: "Marie Frederiksen", date: "2026-03-28", lang: "EN", tags: ["Luxemburg", "History", "Strikes"], image: null },

  { section: "Reports", region: "Britain", category: "Party & Congress", title: "“With our burning fury, we will shake the world awake!”", synopsis: "Delegates from across Britain gathered to forge the Revolutionary Communist Party. A dispatch from a congress charged with revolutionary optimism.", author: "RCP Britain", date: "2026-05-12", lang: "EN", tags: ["Britain", "Congress", "Party"], image: "assets/sections-britain-rcp.jpg" },
  { section: "Reports", region: "Canada", category: "Party & Congress", title: "Third RCP Congress — a party up to the task", synopsis: "The Canadian communists take stock of a year of rapid growth and set ambitious perspectives for the struggles ahead.", author: "RCP Canada", date: "2026-05-10", lang: "EN", tags: ["Congress", "Party", "Americas"], image: null },
  { section: "Reports", region: "Colombia", category: "Latin America", title: "The founding congress of the Revolutionary Communists of Colombia", synopsis: "A new section is born. From the mountains to the cities, Colombian revolutionaries plant the banner of the RCI.", author: "Revolutionary Communist International", date: "2026-05-08", lang: "ES", tags: ["Latin America", "Congress", "Party"], image: null },

  { section: "Books", region: "Economics", category: "Marxist Theory", title: "The Adam Smith problem and the roots of political economy", synopsis: "Before Marx there was Smith. WellRed Books traces the contradictions of classical political economy that Marxism alone could resolve.", author: "WellRed Books", date: "2026-04-30", lang: "EN", tags: ["Economics", "Classics", "Theory"], image: "assets/econ-adam-smith.jpg" },
  { section: "Books", region: "Philosophy", category: "Marxist Theory", title: "The revolutionary philosophy of Marxism", synopsis: "Dialectical materialism is not an academic abstraction but a guide to action. A landmark anthology of the Marxist method.", author: "Alan Woods", date: "2026-04-18", lang: "EN", tags: ["Philosophy", "Theory", "Classics"], image: "assets/card-manifesto.jpg" },
  { section: "Books", region: "History", category: "History", title: "In Defence of October: the meaning of the Russian Revolution", synopsis: "What was the October Revolution and why does it still terrify the ruling class? A spirited defence of the greatest event in human history.", author: "John Reed Press", date: "2026-01-15", lang: "EN", tags: ["Russia", "History", "Classics"], image: null },

  { section: "RCI", region: "International", category: "Party & Congress", title: "Who we are: the programme of the Revolutionary Communist International", synopsis: "One world party, one revolutionary programme. An introduction to the politics, methods and aims of the RCI.", author: "Revolutionary Communist International", date: "2026-03-14", lang: "EN", tags: ["Programme", "Party"], image: "assets/globe-red.png" },
  { section: "RCI", region: "International", category: "Party & Congress", title: "Join the communists: build the revolutionary party", synopsis: "Capitalism offers a future of crisis, war and barbarism. We offer the struggle for socialism. Here is how to throw in your lot with the communists.", author: "Revolutionary Communist International", date: "2026-02-20", lang: "EN", tags: ["Programme", "Recruitment", "Party"], image: "assets/card-communists-coming.png" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
function uniqueSorted(arr) { return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b)); }
function escapeRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function highlight(text, q) {
  const term = q.trim();
  if (!term) return text;
  const rx = new RegExp("(" + escapeRx(term) + ")", "ig");
  const parts = text.split(rx);
  return parts.map((p, i) => (rx.test(p) && p.toLowerCase() === term.toLowerCase())
    ? <mark key={i}>{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>);
}

const SECTIONS = ["Analysis", "Theory & History", "Books", "Reports", "RCI"];
const LANGS = [{ code: "EN", label: "English" }, { code: "ES", label: "Spanish" }];
const ALL_CATEGORIES = uniqueSorted(DATA.map(d => d.category));
const ALL_AUTHORS = uniqueSorted(DATA.map(d => d.author));
const ALL_TAGS = uniqueSorted(DATA.flatMap(d => d.tags));
const PAGE_SIZE = 6;

function matchesQuery(item, q) {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  const hay = (item.title + " " + item.synopsis + " " + item.author + " " + item.region + " " + item.section + " " + item.tags.join(" ")).toLowerCase();
  return t.split(/\s+/).every(tok => hay.includes(tok));
}

// ── Icons ───────────────────────────────────────────────────────────────────
const IcoSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square"><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5l-4.3-4.3" /></svg>
);
const IcoCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12.5l4.5 4.5L19 6.5" /></svg>
);
const IcoX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
);

// ── Result row ──────────────────────────────────────────────────────────────
function ResultRow({ item, index, query }) {
  const ink = SECTION_INK[item.section] || "red";
  return (
    <a href="article.html" className="result">
      <div className="result-thumb">
        <span className="result-index">{String(index).padStart(2, "0")}</span>
        {item.image ? (
          <React.Fragment>
            <img className="result-thumb-img" src={item.image} alt={item.title} loading="lazy" />
            <div className="result-thumb-grain" style={{ backgroundImage: `url("${R("texGrain", "ds/textures/film-grain.jpg")}")` }} />
          </React.Fragment>
        ) : (
          <div className="result-slab" style={{ background: `linear-gradient(140deg, ${INK_HEX[ink]}, var(--rci-ink) 78%)` }}>
            <span>{item.region}</span>
          </div>
        )}
      </div>
      <div className="result-body">
        <span className="result-kicker">{item.section}<span className="sep">&bull;</span>{item.region}</span>
        <h3 className="result-title">{highlight(item.title, query)}</h3>
        <p className="result-synopsis">{highlight(item.synopsis, query)}</p>
        <div className="result-foot">
          <span className="result-author">{item.author}</span>
          <span className="result-dot">&bull;</span>
          <span className="result-date">{fmtDate(item.date)}</span>
          <span className="result-lang">{item.lang}</span>
        </div>
      </div>
    </a>
  );
}

// ── Pagination windowing ────────────────────────────────────────────────────
function pageWindow(total, current) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

// ── Search page ─────────────────────────────────────────────────────────────
function SearchPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    const p = new URLSearchParams(window.location.search).get("q");
    return p ? p : "";
  });
  const [sections, setSections] = useState(() => new Set());
  const [langs, setLangs] = useState(() => new Set());
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const toggleSet = (setter) => (value) => setter(prev => {
    const next = new Set(prev);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  });
  const toggleSection = toggleSet(setSections);
  const toggleLang = toggleSet(setLangs);

  // Base filter shared by everything except the section facet (for live counts)
  const baseNoSection = useMemo(() => DATA.filter(d =>
    matchesQuery(d, query) &&
    (langs.size === 0 || langs.has(d.lang)) &&
    (!category || d.category === category) &&
    (!author || d.author === author) &&
    (!tag || d.tags.includes(tag))
  ), [query, langs, category, author, tag]);

  const sectionCounts = useMemo(() => {
    const m = {}; SECTIONS.forEach(s => m[s] = 0);
    baseNoSection.forEach(d => { m[d.section] = (m[d.section] || 0) + 1; });
    return m;
  }, [baseNoSection]);

  const filtered = useMemo(() => {
    let res = baseNoSection.filter(d => sections.size === 0 || sections.has(d.section));
    res = res.slice().sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date); // latest
    });
    return res;
  }, [baseNoSection, sections, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { setPage(1); }, [query, sections, langs, category, author, tag, sort]);
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filtered.length);

  const activeCount = sections.size + langs.size + (category ? 1 : 0) + (author ? 1 : 0) + (tag ? 1 : 0) + (query.trim() ? 1 : 0);
  const clearAll = () => { setQuery(""); setSections(new Set()); setLangs(new Set()); setCategory(""); setAuthor(""); setTag(""); };

  // Active chips
  const chips = [];
  if (query.trim()) chips.push({ key: "q", kind: "ink", label: <span><span className="chip-tag">Search </span>{query.trim()}</span>, remove: () => setQuery("") });
  Array.from(sections).forEach(s => chips.push({ key: "s-" + s, label: s, remove: () => toggleSection(s) }));
  Array.from(langs).forEach(l => chips.push({ key: "l-" + l, kind: "ink", label: LANGS.find(x => x.code === l).label, remove: () => toggleLang(l) }));
  if (category) chips.push({ key: "c", label: category, remove: () => setCategory("") });
  if (author) chips.push({ key: "a", kind: "ink", label: author, remove: () => setAuthor("") });
  if (tag) chips.push({ key: "t", label: "#" + tag, remove: () => setTag("") });

  return (
    <section className="archive">

      {/* Big search bar */}
      <div className="searchbar-wrap">
        <div className="searchbar">
          <div className="searchbar-icon"><IcoSearch /></div>
          <input
            className="searchbar-input"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search marxist.com…"
            aria-label="Search marxist.com"
            autoComplete="off"
            spellCheck="false"
          />
          {query
            ? <button className="searchbar-clear" onClick={() => setQuery("")} aria-label="Clear search" type="button"><IcoX /></button>
            : <span className="searchbar-kbd">Type to filter</span>}
        </div>
        <div className="arch-live-note"><span className="arch-live-dot" />Results update live — no page reload</div>
      </div>

      <div className="arch-grid">
        {/* ── Filter rail ── */}
        <aside className="arch-rail" aria-label="Filters">
          <div className="arch-rail-head">
            <span className="arch-rail-title">Refine</span>
            <button className="fclear" onClick={clearAll} disabled={activeCount === 0} type="button">
              Clear all{activeCount ? " (" + activeCount + ")" : ""}
            </button>
          </div>

          <div className="fgroup">
            <div className="fgroup-head">Section</div>
            {SECTIONS.map(s => (
              <label className="fcheck" key={s}>
                <input type="checkbox" checked={sections.has(s)} onChange={() => toggleSection(s)} />
                <span className="fcheck-box"><IcoCheck /></span>
                <span className="fcheck-label">{s}</span>
                <span className="fcheck-num">{sectionCounts[s]}</span>
              </label>
            ))}
          </div>

          <div className="fgroup">
            <div className="fgroup-head">Language</div>
            {LANGS.map(l => (
              <label className="fcheck sm" key={l.code}>
                <input type="checkbox" checked={langs.has(l.code)} onChange={() => toggleLang(l.code)} />
                <span className="fcheck-box"><IcoCheck /></span>
                <span className="fcheck-label">{l.label}</span>
              </label>
            ))}
          </div>

          <div className="fgroup">
            <div className="fgroup-head display">Categories</div>
            <div className="fselect-wrap">
              <select className="fselect" data-active={category ? "true" : "false"} value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">
                <option value="">All categories</option>
                {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="fgroup">
            <div className="fgroup-head display">Authors</div>
            <div className="fselect-wrap">
              <select className="fselect" data-active={author ? "true" : "false"} value={author} onChange={e => setAuthor(e.target.value)} aria-label="Filter by author">
                <option value="">All authors</option>
                {ALL_AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="fgroup">
            <div className="fgroup-head display">Tags</div>
            <div className="fselect-wrap">
              <select className="fselect" data-active={tag ? "true" : "false"} value={tag} onChange={e => setTag(e.target.value)} aria-label="Filter by tag">
                <option value="">All tags</option>
                {ALL_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="arch-results">
          <div className="results-bar">
            <div className="results-count">
              {filtered.length > 0
                ? <React.Fragment><b>{filtered.length}</b> {filtered.length === 1 ? "dispatch" : "dispatches"}{query.trim() ? <React.Fragment> for <span className="q">{query.trim()}</span></React.Fragment> : null}</React.Fragment>
                : <React.Fragment>No dispatches found</React.Fragment>}
            </div>
            <div className="sortbar">
              <span className="sortbar-label">Sort</span>
              <div className="fselect-wrap">
                <select className="fselect" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort results">
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="chips">
              {chips.map(c => (
                <span className={"chip" + (c.kind === "ink" ? " chip-ink" : "")} key={c.key}>
                  {c.label}
                  <button className="chip-x" onClick={c.remove} aria-label="Remove filter" type="button"><IcoX /></button>
                </span>
              ))}
            </div>
          )}

          {pageItems.length > 0 ? (
            <div className="result-list">
              {pageItems.map((item, i) => (
                <ResultRow key={item.title} item={item} index={from + i} query={query} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <div className="empty-stamp">No matches</div>
              <p className="empty-msg">No dispatches answer this query. Broaden your search or clear a filter to bring the archive back into view.</p>
              <PrintButton variant="red" size="md" onClick={clearAll}>Clear all filters</PrintButton>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav className="pager" aria-label="Pagination">
              <button className="pager-btn arrow" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Previous page" type="button">&lsaquo;</button>
              {pageWindow(totalPages, safePage).map((p, i) => p === "…"
                ? <span className="pager-ellipsis" key={"e" + i}>‥</span>
                : <button className={"pager-btn" + (p === safePage ? " is-active" : "")} key={p} onClick={() => setPage(p)} aria-current={p === safePage ? "page" : undefined} type="button">{p}</button>)}
              <button className="pager-btn arrow" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Next page" type="button">&rsaquo;</button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site">
      <div className="site-header">
        <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Nav active="Search" onSelect={() => {}} onOpenMenu={() => setMenuOpen(true)} />
      </div>
      <main className="site-main">
        <SearchPage />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
