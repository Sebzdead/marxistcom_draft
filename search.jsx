// Marxist.com — Search / "The Archive"
// Reuses Masthead, Nav, Footer (shared chrome, spliced from app.jsx by build)
// and PrintButton (components.jsx). Live client-side filtering — no page reload.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL (set by super_inline_html) but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const IMG = {
  manifesto: R("imgManifesto", "assets/card-manifesto.jpg"),
};

;

// ── Shared chrome (Masthead / Nav / Footer), spliced from app.jsx ──────────
// ── Masthead ────────────────────────────────────────────────────────────────

// ── Nav (2.5D pressable tabs) ────────────────────────────────────────────────

// ── Footer ──────────────────────────────────────────────────────────────────


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
      <Header activeTab="" />
      <main className="site-main">
        <SearchPage />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
