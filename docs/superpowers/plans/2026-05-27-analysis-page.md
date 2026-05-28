# Analysis Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Analysis page (`analysis.html` + `analysis.jsx`) featuring a Latest Analysis section (15 articles from `ANALYSIS ARTICLES.pdf` in publication order, each with image + headline + dek), followed by placeholder sections for 6 continents (Africa, Americas, Asia, Europe, Middle East, Oceania) and 5 topics (Art, Economy, Environment, Science & Technology, World Perspectives).

**Architecture:** Sibling page to `app.jsx` (index.html) and `join.jsx` (join.html) — standalone HTML with embedded `<style>`, page-specific JSX loaded via Babel-standalone in dev or compiled JS in prod through `build.js`. Reuses `PrintButton`, `Eyebrow`, `SectionRule`, `ArticleCard` from `components.jsx` (window globals) and design tokens in `ds/colors_and_type.css`. No new dependencies. The project has no test framework — verification is `npm run build` + visual check in a browser.

**Tech Stack:** React 18 (CDN in dev, Babel preset-react compile in prod), plain JSX, CSS-in-HTML.

---

## Design Decisions (interpretive — flag during execution if wrong)

- **"Scrollable list" = the page itself scrolls.** No contained scroller, no horizontal carousel. Latest Analysis renders as **2 large featured cards on top + 3-column grid below** of the remaining 13 articles. Uses maximum horizontal space; mirrors the magazine-grid aesthetic of `index.html`.
- **Continents / Topics layout:** 3-column grids of placeholder `ArticleCard`s, one card per category, each labelled "Featured" with a placeholder title and dek. 6 continents = 2 rows × 3. 5 topics = 1 row × 3 + 1 row × 2.
- **No sticky in-page nav.** Keeps page chrome minimal, mirroring `index.html`. (Join page has one because its section list is very long; the analysis page is shorter.)
- **CSS approach:** copy `index.html`'s entire `<style>` block verbatim into `analysis.html`, then append analysis-specific rules at the end. Homepage-only classes (`.campaign`, `.idom`, `.manifesto`, `.sections-card`, `.topic-split`, `.four-up`, `.join-banner`) will be unused but harmless — matches the project's "duplicate-and-tweak" pattern between `index.html` and `join.html`.
- **Image assignment:** map the few articles whose subject matches an existing asset under `assets/`; everything else uses a slab placeholder (the project's existing fallback pattern).

---

## File Structure

- **Create:** `analysis.html` — copy of `index.html`, title updated, `analysis.jsx` script tag swapped in, analysis-specific CSS appended.
- **Create:** `analysis.jsx` — `NAV_TABS`, `ARTICLES`, `CONTINENTS`, `TOPICS` data; `Masthead`, `Nav`, `LatestAnalysis`, `ContinentsBlock`, `TopicsBlock`, `Footer`, `App` components.
- **Modify:** `build.js` — add `'analysis.jsx'` to `jsxFiles`, `'analysis.html'` to `htmlFiles`, and one new `html.replace(...)` line for the analysis script tag.
- **Modify:** `article.jsx:19` — change Analysis nav href from `"index.html"` to `"analysis.html"` (currently a placeholder stub).

---

### Task 1: Scaffold analysis page shell + wire up build + fix article.jsx nav

**Files:**
- Create: `analysis.html` (copied from `index.html`)
- Create: `analysis.jsx`
- Modify: `build.js`
- Modify: `article.jsx:19`

- [ ] **Step 1: Create `analysis.html` from `index.html`**

```bash
cp index.html analysis.html
```

- [ ] **Step 2: Edit `analysis.html` — update title**

Find the `<title>` line and replace it. Use Edit:

`<title>Marxist.com — Home of the Revolutionary Communist International</title>` → `<title>Analysis — Marxist.com</title>`

- [ ] **Step 3: Edit `analysis.html` — swap the script tag**

`<script type="text/babel" src="app.jsx"></script>` → `<script type="text/babel" src="analysis.jsx"></script>`

(Keep the other two script tags — `tweaks-panel.jsx` and `components.jsx` — unchanged.)

- [ ] **Step 4: Create `analysis.jsx` with shell scaffolding**

Write this exact content to `analysis.jsx`:

```jsx
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
        <section style={{ padding: "40px 0 20px" }}>
          <h1 className="hero-h1">Analysis</h1>
        </section>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- [ ] **Step 5: Update `build.js` — add analysis to compile + processing**

In `build.js`, change line 36 from:

```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx'];
```

to:

```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx', 'analysis.jsx'];
```

Change the `htmlFiles` line (currently `const htmlFiles = ['index.html', 'join.html', 'article.html'];`) to:

```js
const htmlFiles = ['index.html', 'join.html', 'article.html', 'analysis.html'];
```

Then add this line after the existing `article.jsx` replace rule (the block of `html.replace(...)` calls):

```js
  html = html.replace(/<script type="text\/babel" src="analysis\.jsx"><\/script>/g, '<script src="analysis.js"></script>');
```

- [ ] **Step 6: Update `article.jsx` — fix Analysis nav href**

In `article.jsx`, change line 19 from:

```jsx
  { label: "Analysis", href: "index.html" }, // Redirect to index for analysis
```

to:

```jsx
  { label: "Analysis", href: "analysis.html" },
```

- [ ] **Step 7: Build and verify**

Run: `npm run build`

Expected output: includes the lines `Compiling analysis.jsx to analysis.js...` and `Processing analysis.html for production...`, ends with `Build completed successfully!`.

Verify these files exist:

```bash
ls -la dist/analysis.html dist/analysis.js
```

Expected: both files present.

- [ ] **Step 8: Visual spot-check**

Open `analysis.html` in the browser (source file — uses Babel standalone in dev). Expected: masthead with logo and wordmark, primary nav with "Analysis" highlighted (ink variant), large `ANALYSIS` h1, footer.

- [ ] **Step 9: Commit**

```bash
git add analysis.html analysis.jsx build.js article.jsx
git commit -m "feat: scaffold analysis page with masthead, nav, footer"
```

---

### Task 2: Add ARTICLES data (15 articles from ANALYSIS ARTICLES.pdf)

**Files:**
- Modify: `analysis.jsx` — insert `ARTICLES` constant after `NAV_TABS`

- [ ] **Step 1: Add `ARTICLES` constant to `analysis.jsx`**

Insert this block immediately after the `NAV_TABS` constant (before the `Masthead` function):

```jsx
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
```

- [ ] **Step 2: Build to verify no syntax errors**

Run: `npm run build`

Expected: build completes successfully, no JSX/JS errors reported for `analysis.jsx`.

- [ ] **Step 3: Commit**

```bash
git add analysis.jsx
git commit -m "feat: add Latest Analysis article data (15 articles from PDF)"
```

---

### Task 3: Render Latest Analysis section (featured 2-up + 3-column grid)

**Files:**
- Modify: `analysis.jsx` — add `SlabFill`, `LatestAnalysis` components; wire into `App`
- Modify: `analysis.html` — append analysis-specific CSS to the `<style>` block

- [ ] **Step 1: Add analysis-specific CSS to `analysis.html`**

Open `analysis.html` and find the final closing `}` of the existing `<style>` block (right before `</style>`). Insert the following CSS block immediately before `</style>`:

```css

  /* ─── ANALYSIS PAGE — section blocks ──────────────────────── */
  .analysis-section { padding: 32px 0 12px; }
  .analysis-section-head {
    border-bottom: 4px solid var(--rule);
    padding: 18px 0 14px;
    margin-bottom: 26px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .analysis-section-h2 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 48px;
    line-height: 0.92;
    text-transform: uppercase;
    margin: 0;
    color: var(--rci-ink);
    letter-spacing: -0.005em;
  }
  .analysis-section-meta {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }

  /* Featured row — first 2 articles, large */
  .analysis-feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }
  .analysis-feature-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-decoration: none;
    color: inherit;
  }
  .analysis-feature-img {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    border: 2px solid var(--rule);
    box-shadow: 6px 6px 0 var(--rule);
    background: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .analysis-feature-card:hover .analysis-feature-img {
    transform: translate(-1px, -1px);
    box-shadow: 8px 8px 0 var(--rule);
  }
  .analysis-feature-img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: contrast(1.05) saturate(0.95);
  }
  .analysis-feature-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 36px;
    line-height: 0.95;
    text-transform: uppercase;
    margin: 4px 0 4px;
    letter-spacing: -0.005em;
    color: var(--rci-ink);
  }
  .analysis-feature-card:hover .analysis-feature-title { color: var(--rci-red); }
  .analysis-feature-dek {
    font-family: var(--font-serif);
    font-size: 16px;
    line-height: 1.5;
    color: var(--rci-ink-soft);
    margin: 0;
    max-width: 60ch;
  }
  .analysis-feature-byline {
    font-family: var(--font-condensed);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }

  /* 3-column article grid */
  .analysis-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 26px;
  }
  .analysis-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-decoration: none;
    color: inherit;
  }
  .analysis-card-img {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    border: 1.5px solid var(--rule);
    box-shadow: 4px 4px 0 var(--rule);
    background: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .analysis-card:hover .analysis-card-img {
    transform: translate(-1px, -1px);
    box-shadow: 6px 6px 0 var(--rule);
  }
  .analysis-card-img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: contrast(1.05) saturate(0.95);
  }
  .analysis-card-kicker {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rci-red);
  }
  .analysis-card-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 19px;
    line-height: 1.15;
    text-transform: uppercase;
    margin: 4px 0 6px;
    color: var(--rci-ink);
    letter-spacing: 0.005em;
  }
  .analysis-card:hover .analysis-card-title { color: var(--rci-red); }
  .analysis-card-dek {
    font-family: var(--font-serif);
    font-size: 14px;
    line-height: 1.45;
    color: var(--rci-ink-soft);
    margin: 0 0 6px;
  }
  .analysis-card-byline {
    font-family: var(--font-condensed);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }

  /* Slab placeholder for missing images */
  .slab-fill {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--rci-ink);
    color: var(--rci-offwhite);
    font-family: var(--font-display);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    text-align: center;
    padding: 16px;
    line-height: 1;
  }
  .slab-fill::before {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(218,13,16,0.28), rgba(0,0,0,0) 45%);
    pointer-events: none;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .analysis-feature-title { font-size: 30px; }
    .analysis-section-h2 { font-size: 40px; }
  }
  @media (max-width: 900px) {
    .analysis-feature-grid { grid-template-columns: 1fr; }
    .analysis-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .analysis-grid { grid-template-columns: 1fr; }
    .analysis-section-h2 { font-size: 32px; }
    .analysis-feature-title { font-size: 26px; }
  }
```

- [ ] **Step 2: Add `SlabFill` helper + `LatestAnalysis` component to `analysis.jsx`**

Insert these two function definitions immediately after the `Footer` function (just before the `App` function):

```jsx
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
```

- [ ] **Step 3: Wire `LatestAnalysis` into `App`**

Replace the existing `<main>` block in the `App` function with:

```jsx
      <main>
        <LatestAnalysis />
      </main>
```

(Remove the placeholder `<section style={{ padding: "40px 0 20px" }}><h1 className="hero-h1">Analysis</h1></section>` from Task 1.)

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: completes successfully.

- [ ] **Step 5: Visual verification**

Open `analysis.html` in the browser. Verify:
- Section heading "Latest Analysis" appears with a 4px ink rule underneath and "15 articles · in publication order" on the right.
- First two articles render large side-by-side: "[Podcast] The 1926 General Strike" (with Britain image) and "Figaro and the French Revolution" (slab placeholder showing the title).
- Below, 13 article cards render in a 3-column grid in publication order, latest first.
- Cards with no image show black slab with title text; cards with assigned images (article 6 Palestine, article 8 China, article 14 Trump/China) show real photos.
- Hover on any card shifts the image and pops the box-shadow.

- [ ] **Step 6: Commit**

```bash
git add analysis.jsx analysis.html
git commit -m "feat: render Latest Analysis section on analysis page"
```

---

### Task 4: Add Continents section with placeholders

**Files:**
- Modify: `analysis.jsx` — add `CONTINENTS` constant + `ContinentsBlock` component; wire into `App`
- Modify: `analysis.html` — append `.cat-grid` CSS (reuses `.analysis-card-*` styles)

- [ ] **Step 1: Add `CONTINENTS` constant**

In `analysis.jsx`, insert immediately after the `ARTICLES` constant:

```jsx
// ── Continents (placeholder feature card per continent) ─────────────────────
const CONTINENTS = [
  { id: "africa",      name: "Africa",       featuredTitle: "Featured analysis from across Africa", featuredDek: "Reports and perspectives from comrades organising on the continent. Featured article placeholder.", image: null },
  { id: "americas",    name: "Americas",     featuredTitle: "Featured analysis from the Americas", featuredDek: "From Canada to Argentina — class struggle and the fight against US imperialism. Featured article placeholder.", image: "assets/card-war-on-iran.png" },
  { id: "asia",        name: "Asia",         featuredTitle: "Featured analysis from Asia",        featuredDek: "From China to India — the inter-imperialist rivalry and the awakening of Asia's working class. Featured article placeholder.", image: "assets/econ-china.jpg" },
  { id: "europe",      name: "Europe",       featuredTitle: "Featured analysis from Europe",      featuredDek: "From Britain to the Balkans — austerity, war, and the rise of the working class. Featured article placeholder.", image: "assets/sections-britain-rcp.jpg" },
  { id: "middle-east", name: "Middle East",  featuredTitle: "Featured analysis from the Middle East", featuredDek: "War, occupation, and the Palestinian struggle. Featured article placeholder.", image: "assets/topic-iran-war.jpg" },
  { id: "oceania",     name: "Oceania",      featuredTitle: "Featured analysis from Oceania",     featuredDek: "Australia, New Zealand, and the Pacific. Featured article placeholder.", image: null },
];
```

- [ ] **Step 2: Add `.cat-grid` CSS to `analysis.html`**

Insert this rule inside the appended analysis CSS block, just before the `/* Responsive */` comment:

```css
  /* Continents / Topics — 3-column card grid (reuses .analysis-card-* styles) */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 26px;
    margin-bottom: 16px;
  }
```

Add this responsive rule inside the existing `@media (max-width: 900px)` block:

```css
    .cat-grid { grid-template-columns: repeat(2, 1fr); }
```

And inside `@media (max-width: 560px)`:

```css
    .cat-grid { grid-template-columns: 1fr; }
```

- [ ] **Step 3: Add `ContinentsBlock` component**

Insert immediately after the `LatestAnalysis` function:

```jsx
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
```

- [ ] **Step 4: Wire into `App`**

Add `<ContinentsBlock />` inside `<main>` after `<LatestAnalysis />`:

```jsx
      <main>
        <LatestAnalysis />
        <ContinentsBlock />
      </main>
```

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: completes successfully.

- [ ] **Step 6: Visual verification**

Reload `analysis.html`. Verify:
- "Continents" section heading appears below Latest Analysis with 4px rule.
- 6 cards render: Africa (slab), Americas (war-on-iran image), Asia (china image), Europe (britain image), Middle East (iran war image), Oceania (slab) — in 2 rows of 3 at desktop width.
- Each card has continent name as kicker, "Featured analysis from..." as title, placeholder dek, and "Placeholder · See all →" byline.

- [ ] **Step 7: Commit**

```bash
git add analysis.jsx analysis.html
git commit -m "feat: add Continents section to analysis page"
```

---

### Task 5: Add Topics section with placeholders

**Files:**
- Modify: `analysis.jsx` — add `TOPICS` constant + `TopicsBlock` component; wire into `App`

- [ ] **Step 1: Add `TOPICS` constant**

Insert in `analysis.jsx` immediately after the `CONTINENTS` constant:

```jsx
// ── Topics (placeholder feature card per topic) ─────────────────────────────
const TOPICS = [
  { id: "art",           name: "Art",                    featuredTitle: "Marxism and the arts",                featuredDek: "From Mozart to Mayakovsky — culture as a battleground in the class struggle. Featured article placeholder.", image: null },
  { id: "economy",       name: "Economy",                featuredTitle: "The crisis of the world economy",    featuredDek: "Inflation, debt, recession — Marxist analysis of capitalism's contradictions. Featured article placeholder.", image: "assets/econ-shadow-banking.jpg" },
  { id: "environment",   name: "Environment",            featuredTitle: "Capitalism and the climate crisis",  featuredDek: "Why only the overthrow of capitalism can save the planet. Featured article placeholder.", image: null },
  { id: "sci-tech",      name: "Science & Technology",   featuredTitle: "AI, science, and the working class", featuredDek: "Who controls the technology shapes the future. A Marxist perspective. Featured article placeholder.", image: "assets/econ-ai.jpg" },
  { id: "world",         name: "World Perspectives",     featuredTitle: "2026: war, revolution, reaction",    featuredDek: "An assessment of the world situation by the International Secretariat. Featured article placeholder.", image: "assets/hero-imperialist-war.png" },
];
```

- [ ] **Step 2: Add `TopicsBlock` component**

Insert immediately after the `ContinentsBlock` function:

```jsx
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
```

- [ ] **Step 3: Wire into `App`**

Add `<TopicsBlock />` inside `<main>` after `<ContinentsBlock />`:

```jsx
      <main>
        <LatestAnalysis />
        <ContinentsBlock />
        <TopicsBlock />
      </main>
```

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: completes successfully.

- [ ] **Step 5: Visual verification**

Reload `analysis.html`. Verify:
- "Topics" section heading appears below Continents.
- 5 cards: Art (slab), Economy (shadow-banking image), Environment (slab), Science & Technology (AI image), World Perspectives (imperialist-war image).
- First row has 3 cards; second row has 2 cards (the grid stays left-aligned at desktop width — that's fine, matches the 3-column rhythm).

- [ ] **Step 6: Commit**

```bash
git add analysis.jsx
git commit -m "feat: add Topics section to analysis page"
```

---

### Task 6: Page-level intro band + final polish + cross-page nav verification

**Files:**
- Modify: `analysis.jsx` — add a small `PageIntro` band above Latest Analysis
- Modify: `analysis.html` — add `.analysis-intro` CSS

- [ ] **Step 1: Add `.analysis-intro` CSS to `analysis.html`**

Inside the appended analysis CSS, just after the `.analysis-section-meta` rule, add:

```css
  .analysis-intro {
    padding: 40px 0 18px;
    border-bottom: 8px solid var(--rule);
    margin-bottom: 12px;
  }
  .analysis-intro-eyebrow {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--rci-red);
    margin-bottom: 12px;
  }
  .analysis-intro-h1 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 88px;
    line-height: 0.9;
    text-transform: uppercase;
    margin: 0 0 14px;
    letter-spacing: -0.01em;
    color: var(--rci-ink);
  }
  .analysis-intro-dek {
    font-family: var(--font-serif);
    font-size: 19px;
    line-height: 1.5;
    color: var(--rci-ink-soft);
    max-width: 64ch;
    margin: 0;
  }
  @media (max-width: 1100px) { .analysis-intro-h1 { font-size: 64px; } }
  @media (max-width: 560px)  { .analysis-intro-h1 { font-size: 44px; } }
```

- [ ] **Step 2: Add `PageIntro` component**

Insert in `analysis.jsx` immediately before the `LatestAnalysis` function:

```jsx
// ── Page intro band ─────────────────────────────────────────────────────────
function PageIntro() {
  return (
    <section className="analysis-intro">
      <div className="analysis-intro-eyebrow">Analysis · Marxist.com</div>
      <h1 className="analysis-intro-h1">Analysis</h1>
      <p className="analysis-intro-dek">
        Marxist analysis of world events — the daily output of the Revolutionary Communist International and its sections. Browse the latest articles in publication order, or jump to a continent or topic.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Wire `PageIntro` as first child of `<main>`**

```jsx
      <main>
        <PageIntro />
        <LatestAnalysis />
        <ContinentsBlock />
        <TopicsBlock />
      </main>
```

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: completes successfully.

- [ ] **Step 5: Cross-page navigation verification**

Open each of these pages and click the "Analysis" nav button. Verify each lands on `analysis.html`:
- `index.html` → Analysis button
- `join.html` → Analysis button
- `article.html` → Analysis button (this is the one fixed in Task 1; confirm it now goes to analysis.html, not index.html)

From `analysis.html`, click each of: Home → `index.html`, Join the RCI → `join.html`, Bookstore → opens wellredbooks.co.uk in a new tab.

- [ ] **Step 6: Final visual check at multiple widths**

Resize the browser to 1280px (desktop), 900px (tablet), 560px (mobile). Verify:
- Desktop: feature-grid is 2 cols, analysis-grid and cat-grid are 3 cols.
- Tablet (≤900px): feature-grid collapses to 1 col, grids drop to 2 cols.
- Mobile (≤560px): all grids drop to 1 col, intro h1 scales down.

- [ ] **Step 7: Commit**

```bash
git add analysis.jsx analysis.html
git commit -m "feat: add page intro band and finalize Analysis page polish"
```

---

## Summary of changes (when plan is complete)

- **New files:** `analysis.html`, `analysis.jsx`
- **Modified files:** `build.js` (added analysis.jsx + analysis.html), `article.jsx` (fixed Analysis nav stub)
- **6 commits** on the development branch — one per task
- **Reused without modification:** `components.jsx`, `tweaks-panel.jsx`, `ds/colors_and_type.css`, `app.jsx`, `join.jsx`, `index.html`, `join.html`, `article.html`

Verification at the end:
1. `npm run build` succeeds
2. `dist/analysis.html` renders all four sections (intro, Latest Analysis, Continents, Topics) at 1280/900/560px
3. All 15 articles appear in publication order (newest first: 26 May → 13 May)
4. All cross-page Analysis nav links land on `analysis.html`
