// Marxist.com — Category / Tag page ("Theory: Marxist Economics")
// Curated landing for a single subject. Reuses the shared chrome
// (Masthead / Nav / Footer) and the search-page result widget so the
// browse list at the bottom behaves like a stripped-down Archive.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by super_inline_html) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const IMG = {
  manifesto: R("imgManifesto", "assets/card-manifesto.jpg"),
};

;

// ── Shared chrome (Masthead / Nav / Footer), spliced from app.jsx ──────────






// ── Helpers ─────────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

// Photo block with a flat duotone slab fallback when no image is supplied
function PhotoOrSlab({ image, label, className = "" }) {
  if (image) {
    return (
      <React.Fragment>
        <img className="ph-img" src={image} alt={label || ""} loading="lazy" />
        <div className="ph-grain" style={{ backgroundImage: `url("${R("texGrain", "ds/textures/film-grain.jpg")}")` }} />
      </React.Fragment>
    );
  }
  return (
    <div className={"ph-slab " + className}>
      <span>{label}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  CONTENT — Marxist Economics
// ══════════════════════════════════════════════════════════════════════════

const INTRO = "The economic system we live under today is capitalism: based on competition, private ownership and production for profit. Karl Marx revolutionised our understanding of this system. With his vast collection of economic writings — including the three volumes of Capital — Marx stripped away the mysticism surrounding capitalism, uncovering its inner processes, emergent laws, and intrinsic contradictions.";

// Editor's Picks — one lead + three side links
const PICK_LEAD = {
  kicker: "World Economy",
  title: "The economic consequences of the war in Iran",
  dek: "The bombs have stopped falling, but the economic shockwaves are only beginning. We assess the cost of imperialist adventurism for workers across the region and the world.",
  author: "Niklas Albin Svensson",
  date: "2026-05-24",
  image: R("imgEconConsequences", "assets/Economic Consequences.jpg"),
};
const PICK_SIDE = [
  { kicker: "China", title: "China sets the agenda at the Xi–Trump summit", author: "Daniel Morley", image: R("imgEconChina", "assets/econ-china.jpg") },
  { kicker: "Podcast", title: "Capitalism is ungovernable", author: "Against the Stream", image: R("imgEconUngovernable", "assets/Podcast Capitalism is Ungovernable.jpg") },
  { kicker: "Finance", title: "Shadow banking: the next crash is being built in the dark", author: "Adam Booth", image: R("imgEconShadow", "assets/econ-shadow-banking.jpg") },
];

// Marxist University — a curriculum ladder for the topic
const COURSES = [
  { tag: "Beginner", title: "Economics: Beginner", blurb: "Start here. Wages, prices and profit — the foundations of how capitalism really works.", image: R("imgEconSmith", "assets/econ-adam-smith.jpg") },
  { tag: "Advanced", title: "Economics: Advanced", blurb: "The three volumes of Capital, read closely: value, accumulation and the falling rate of profit.", image: R("imgEconConsequences2", "assets/Economic Consequences.jpg") },
  { tag: "Concept", title: "What Is Value?", blurb: "The labour theory of value — the discovery that unlocks the secret of profit and exploitation.", image: R("imgEconKapital", "assets/marxist-economics.jpg") },
];

// WellRed Books recommends — two featured titles for this subject
const BOOKS = [
  { title: "Capital, Volume One", author: "Karl Marx", date: "1867", desc: "Marx's masterwork — the critique of political economy that laid bare the laws of capitalist exploitation.", buyUrl: "https://wellred-books.com/", cover: R("imgEconKapital2", "assets/marxist-economics.jpg") },
  { title: "The Roots of Political Economy", author: "WellRed Books", date: "2024", desc: "From Adam Smith to David Ricardo — the classical economists whose contradictions only Marxism could resolve.", buyUrl: "https://wellred-books.com/", cover: R("imgEconSmith2", "assets/econ-adam-smith.jpg") },
];

// Browse list — the stripped-down Archive feed, all Marxist Economics
const ARTICLES = [
  { title: "The economic consequences of the war in Iran", synopsis: "The bombs have stopped falling, but the economic shockwaves are only beginning. We assess the cost of imperialist adventurism for workers worldwide.", author: "Niklas Albin Svensson", date: "2026-05-24", topic: "Crisis", format: "Analysis", image: R("imgEconConsequences", "assets/Economic Consequences.jpg") },
  { title: "[Podcast] Capitalism is ungovernable", synopsis: "From bond-market panic to political paralysis, the system has slipped the leash of its own masters. Against the Stream dissects a world out of control.", author: "Against the Stream", date: "2026-05-21", topic: "Crisis", format: "Podcast", image: R("imgEconUngovernable", "assets/Podcast Capitalism is Ungovernable.jpg") },
  { title: "China's economy and the myth of 'market socialism'", synopsis: "Behind the headline growth figures lies a deepening contradiction. We trace the class forces tearing at the seams of the Chinese miracle.", author: "Daniel Morley", date: "2026-05-19", topic: "World Economy", format: "Analysis", image: R("imgEconChina", "assets/econ-china.jpg") },
  { title: "Shadow banking: the next crash is being built in the dark", synopsis: "Trillions in unregulated credit are piling up beyond the reach of the central banks. The anarchy of finance prepares a new convulsion.", author: "Adam Booth", date: "2026-05-12", topic: "Finance", format: "Analysis", image: R("imgEconShadow", "assets/econ-shadow-banking.jpg") },
  { title: "Adam Smith, David Ricardo and the roots of political economy", synopsis: "Before Marx there was Smith. The classical economists hit upon the idea that labour is the source of all value — and could go no further.", author: "WellRed Books", date: "2026-04-30", topic: "Classics", format: "Theory", image: R("imgEconSmith", "assets/econ-adam-smith.jpg") },
  { title: "Artificial intelligence and the falling rate of profit", synopsis: "Capital dreams of a workerless factory. But living labour is the sole source of surplus value — and automation only sharpens the system's central contradiction.", author: "Ben Curry", date: "2026-04-22", topic: "Technology", format: "Analysis", image: R("imgEconAi", "assets/econ-ai.jpg") },
  { title: "What is the labour theory of value?", synopsis: "An enigma eluded the classical economists: where does profit come from? Marx's answer — surplus value — is the cornerstone of revolutionary economics.", author: "Alan Woods", date: "2026-04-08", topic: "Theory", format: "Theory", image: null },
  { title: "The crisis of overproduction explained", synopsis: "Capitalism's crises are not crises of scarcity but of abundance. The forces of production crash against the narrow limits of the market.", author: "Hamid Alizadeh", date: "2026-03-28", topic: "Crisis", format: "Theory", image: null },
  { title: "Inflation, wages and the class struggle", synopsis: "Who really pays for rising prices? We cut through the official mystification to show how inflation is a weapon in the war between the classes.", author: "Marie Frederiksen", date: "2026-03-15", topic: "Crisis", format: "Analysis", image: null },
  { title: "Fictitious capital and the anarchy of the market", synopsis: "Stock bubbles, derivatives and debt: the speculative madness of modern finance, and why it always ends in a reckoning for the working class.", author: "Adam Booth", date: "2026-02-26", topic: "Finance", format: "Theory", image: null },
];

const TOPICS = ["World Economy", "Crisis", "Finance", "Classics", "Theory", "Technology"];
const FORMATS = ["Analysis", "Theory", "Podcast"];
const PAGE_SIZE = 6;

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

// ── Category hero ─────────────────────────────────────────────────────────
function CategoryHero() {
  return (
    <section className="cat-hero">
      <div className="cat-hero-figure">
        <img src={R("imgEconKapital3", "assets/marxist-economics.jpg")} alt="Das Kapital atop a hoard of money" />
        <span className="cat-hero-stamp">Theory</span>
      </div>
      <div className="cat-hero-body">
        <span className="cat-hero-eyebrow">Category · Marxist Theory</span>
        <h1 className="cat-hero-title">Marxist<br />Economics</h1>
        <p className="cat-hero-intro">{INTRO}</p>
        <div className="cat-hero-tags">
          <span className="cat-tag">Capital</span>
          <span className="cat-tag">Surplus Value</span>
          <span className="cat-tag">Crisis</span>
          <span className="cat-tag">Political Economy</span>
        </div>
      </div>
    </section>
  );
}

// ── Editor's Picks ─────────────────────────────────────────────────────────
function EditorsPicks() {
  return (
    <section className="picks">
      <div className="rci-section-head"><h2>Editor's Picks</h2><a href="#browse">All economics &rarr;</a></div>
      <div className="picks-grid">
        <a href="article.html" className="picks-lead">
          <div className="picks-lead-img">
            <PhotoOrSlab image={PICK_LEAD.image} label={PICK_LEAD.title} />
          </div>
          <span className="rci-kicker">{PICK_LEAD.kicker}</span>
          <h3 className="picks-lead-title">{PICK_LEAD.title}</h3>
          <p className="picks-lead-dek">{PICK_LEAD.dek}</p>
          <div className="picks-lead-byline">{PICK_LEAD.author}<span className="dot">&bull;</span>{fmtDate(PICK_LEAD.date)}</div>
        </a>
        <ol className="picks-side">
          {PICK_SIDE.map((p, i) => (
            <li key={i}>
              <a href="article.html" className="picks-side-row">
                <div className="picks-side-img">
                  <PhotoOrSlab image={p.image} label={p.kicker} />
                </div>
                <div className="picks-side-text">
                  <span className="rci-kicker no-tick">{p.kicker}</span>
                  <h4 className="picks-side-title">{p.title}</h4>
                  <span className="picks-side-author">{p.author}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Marxist University ─────────────────────────────────────────────────────
function MarxistUniversity() {
  return (
    <section className="muni">
      <div className="rci-section-head"><h2>Marxist University</h2><a href="#">All courses &rarr;</a></div>
      <div className="muni-grid">
        {COURSES.map((c, i) => (
          <a key={i} href="#" className="muni-card">
            <div className="muni-card-img">
              <PhotoOrSlab image={c.image} label={c.title} />
              <span className="muni-card-level">{c.tag}</span>
            </div>
            <h3 className="muni-card-title">{c.title}</h3>
            <p className="muni-card-blurb">{c.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── WellRed Books Recommends ───────────────────────────────────────────────
function WellRedRecommends() {
  return (
    <section className="wrr">
      <div className="rci-section-head"><h2>WellRed Books Recommends</h2><a href="https://wellred-books.com/" target="_blank" rel="noopener noreferrer">Visit the bookshop &rarr;</a></div>
      <div className="wrr-grid">
        {BOOKS.map((b, i) => (
          <a key={i} className="wrr-book" href={b.buyUrl} target="_blank" rel="noopener noreferrer">
            <div className="wrr-cover">
              <PhotoOrSlab image={b.cover} label={b.title} />
            </div>
            <div className="wrr-body">
              <h3 className="wrr-title">{b.title}</h3>
              <div className="wrr-meta">{b.author}<span className="dot">&bull;</span>{b.date}</div>
              <p className="wrr-desc">{b.desc}</p>
              <span className="wrr-buy">Get the book &rarr;</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Result row (shared with the search page) ───────────────────────────────
function ResultRow({ item, index }) {
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
          <div className="result-slab">
            <span>{item.topic}</span>
          </div>
        )}
      </div>
      <div className="result-body">
        <span className="result-kicker">Economics<span className="sep">&bull;</span>{item.topic}</span>
        <h3 className="result-title">{item.title}</h3>
        <p className="result-synopsis">{item.synopsis}</p>
        <div className="result-foot">
          <span className="result-author">{item.author}</span>
          <span className="result-dot">&bull;</span>
          <span className="result-date">{fmtDate(item.date)}</span>
          <span className="result-lang">{item.format}</span>
        </div>
      </div>
    </a>
  );
}

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

// ── Browse — stripped-down Archive widget ──────────────────────────────────
function BrowseList() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [formats, setFormats] = useState(() => new Set());
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);

  const toggleFormat = (value) => setFormats(prev => {
    const next = new Set(prev);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let res = ARTICLES.filter(a => {
      if (topic && a.topic !== topic) return false;
      if (formats.size > 0 && !formats.has(a.format)) return false;
      if (q) {
        const hay = (a.title + " " + a.synopsis + " " + a.author).toLowerCase();
        if (!q.split(/\s+/).every(tok => hay.includes(tok))) return false;
      }
      return true;
    });
    res = res.slice().sort((a, b) => {
      if (sort === "oldest") return a.date.localeCompare(b.date);
      if (sort === "latest") return b.date.localeCompare(a.date);
      return 0; // recommended = curated order
    });
    return res;
  }, [query, topic, formats, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { setPage(1); }, [query, topic, formats, sort]);
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;

  const activeCount = (topic ? 1 : 0) + formats.size + (query.trim() ? 1 : 0);
  const clearAll = () => { setQuery(""); setTopic(""); setFormats(new Set()); };

  return (
    <section className="browse" id="browse">
      <div className="browse-head">
        <div className="rci-section-head browse-section-head"><h2>All Economics</h2></div>
        <div className="sortbar">
          <span className="sortbar-label">Sort</span>
          <div className="fselect-wrap">
            <select className="fselect" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort articles">
              <option value="recommended">Recommended</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="browse-grid">
        {/* Stripped-down filter rail — shared widget with the search page */}
        <aside className="browse-rail" aria-label="Filter economics">
          <div className="searchbar mini">
            <div className="searchbar-icon"><IcoSearch /></div>
            <input
              className="searchbar-input"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter this topic…"
              aria-label="Filter economics articles"
              autoComplete="off"
              spellCheck="false"
            />
            {query
              ? <button className="searchbar-clear" onClick={() => setQuery("")} aria-label="Clear" type="button"><IcoX /></button>
              : null}
          </div>

          <div className="fgroup">
            <div className="fgroup-head">Sub-topic</div>
            <div className="fselect-wrap">
              <select className="fselect" data-active={topic ? "true" : "false"} value={topic} onChange={e => setTopic(e.target.value)} aria-label="Filter by sub-topic">
                <option value="">All sub-topics</option>
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="fgroup">
            <div className="fgroup-head">Format</div>
            {FORMATS.map(f => (
              <label className="fcheck sm" key={f}>
                <input type="checkbox" checked={formats.has(f)} onChange={() => toggleFormat(f)} />
                <span className="fcheck-box"><IcoCheck /></span>
                <span className="fcheck-label">{f}</span>
              </label>
            ))}
          </div>

          <div className="browse-rail-foot">
            <button className="fclear" onClick={clearAll} disabled={activeCount === 0} type="button">
              Clear{activeCount ? " (" + activeCount + ")" : ""}
            </button>
            <a className="browse-rail-search" href="search.html">Full archive search &rarr;</a>
          </div>
        </aside>

        {/* Results */}
        <div className="browse-results">
          {pageItems.length > 0 ? (
            <div className="result-list">
              {pageItems.map((item, i) => (
                <ResultRow key={item.title} item={item} index={from + i} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <div className="empty-stamp">No matches</div>
              <p className="empty-msg">No economics articles answer this filter. Clear it to bring the feed back into view.</p>
              <PrintButton variant="red" size="md" onClick={clearAll}>Clear filters</PrintButton>
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
      <Header activeTab="Analysis" />
      <main className="site-main">
        <CategoryHero />
        <EditorsPicks />
        <MarxistUniversity />
        <WellRedRecommends />
        <BrowseList />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
