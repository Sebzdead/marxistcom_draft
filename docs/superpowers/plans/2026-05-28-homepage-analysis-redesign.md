# Homepage / Analysis Fold-In Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fold the standalone Analysis page into the homepage, rename the "Home" nav tab to "Analysis", and rebuild the hero into an Atlantic-style three-column layout (other-featured left · featured-daily center · four set cards right) followed by a 4×3 "LATEST ANALYSIS" placeholder grid — making the homepage considerably longer and analysis-led.

**Architecture:** Static React site compiled by Babel. In dev, HTML pages load `*.jsx` via `@babel/standalone` (in-browser compile); in prod, `node build.js` transpiles JSX → JS into `dist/`. Each page is a self-contained `*.jsx` with its own `NAV_TABS`, `Masthead`, `Nav`, `Footer`; shared widgets live in `components.jsx` (exported onto `window`). CSS is a per-page `<style>` block plus shared tokens in `ds/colors_and_type.css`. This plan touches only the homepage (`app.jsx` + `index.html`), the nav arrays on sibling pages, and `build.js`; it deletes `analysis.jsx`/`analysis.html`.

**Tech Stack:** React 18 (UMD globals, no JSX modules), Babel (`@babel/preset-react`), hand-written CSS with CSS custom properties. No bundler, no test framework.

---

## Testing note (read first)

**This project has no unit-test harness.** "Verification" in every task below means:

1. **Compile gate:** `npm run build` must finish with `Build completed successfully!` and no `Error compiling` lines. This catches all JSX/JS syntax errors.
2. **Visual gate (final task only):** serve the repo root and load the dev page in a browser, because dev HTML compiles JSX in-browser via Babel standalone.

Do **not** invent a test runner. Follow the compile + visual gates exactly as written.

---

## File Structure

| File | Responsibility | Change |
|------|----------------|--------|
| `app.jsx` | Homepage React app (now the "Analysis" page) | Modify: NAV_TABS, delete `RECENT_ANALYSIS`, rewrite `Hero`, add `LATEST_ANALYSIS` + `LatestAnalysisGrid`, wire into `App`, set active tab |
| `index.html` | Homepage shell + `<style>` block | Modify: hero grid columns, replace left-feed CSS with new hero column classes, add LATEST ANALYSIS grid CSS, responsive tweaks |
| `join.jsx`, `article.jsx`, `media.jsx` | Sibling pages, each with own `NAV_TABS` | Modify: rename Home→Analysis, drop the `analysis.html` tab; fix `media.jsx` footer link + comment |
| `build.js` | Build script (lists jsx + html files) | Modify: drop `analysis.jsx` / `analysis.html` from the arrays and the analysis script-replace line |
| `analysis.jsx`, `analysis.html` | Old standalone Analysis page | **Delete** |

No new files are created. The homepage gains content (12-card grid) sourced from the article data that previously lived in `analysis.jsx`.

### Hero layout: before → after

```
BEFORE (.hero-grid: 340px 1fr 240px)
┌─────────────┬───────────────────┬───────────┐
│ hero-right  │ hero-center       │ hero-left │
│ "Latest     │ BIG editorial     │ 3 stacked │
│  analysis"  │ "2026 kicks off…" │ side      │
│ live-feed   │ (centrepiece)     │ cards     │
│ (list)      │                   │           │
└─────────────┴───────────────────┴───────────┘

AFTER (.hero-grid: 320px 1fr 260px)
┌─────────────┬───────────────────┬───────────┐
│ hero-       │ hero-center       │ hero-left │
│ featured    │ BIG featured      │ 4 stacked │
│ 2 "other    │ DAILY article     │ set cards │
│  featured"  │ (China summit)    │ (editorial│
│ cards       │                   │  +3 prog) │
└─────────────┴───────────────────┴───────────┘
```

The editorial that was the centrepiece becomes the **first** of the four right-column cards. The live-feed list is removed; the left column becomes two "other featured" cards.

### Known placeholder editorial/image choices (user can swap later)

- **Center featured daily:** "China sets the agenda at the Xi-Trump summit" — Daniel Morley — `IMG.china` (`assets/econ-china.jpg`).
- **Left other-featured:** "How British imperialism paved the way for the Nakba" (`IMG.palestine48`) and "Trump's defeat in Iran and its worldwide consequences" (`IMG.trumpHead`).
- **Right four set cards (in order):** editorial `IMG.hero`, manifesto `IMG.manifesto`, war-on-Iran `IMG.warOnIran`, communists-coming `IMG.communistsComing`.
- Center/left images are reused from `assets/` and intentionally repeat in `TopicSplit`/`EconomyBlock` lower down (approved tradeoff — limited asset library).
- **LATEST ANALYSIS grid:** 12 placeholder cards, slab placeholders (no images), sourced from the old `analysis.jsx` article list.

---

## Task 1: Rename nav to "Analysis" and delete the standalone Analysis page

**Files:**
- Modify: `app.jsx:107-116` (NAV_TABS)
- Modify: `join.jsx:11-19` (NAV_TABS)
- Modify: `article.jsx:16-24` (NAV_TABS)
- Modify: `media.jsx:12-20` (NAV_TABS), `media.jsx:2` (comment), `media.jsx:269` (footer link)
- Modify: `build.js:37` (jsxFiles), `build.js:56` (htmlFiles), `build.js:72` (analysis script-replace line)
- Delete: `analysis.jsx`, `analysis.html`

- [ ] **Step 1: Update `app.jsx` NAV_TABS**

In `app.jsx`, replace these three lines (the start of the `NAV_TABS` array):

```jsx
  { label: "Home", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "analysis.html" },
```

with (Home renamed to Analysis → `index.html`; the old `analysis.html` tab removed):

```jsx
  { label: "Analysis", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
```

- [ ] **Step 2: Apply the identical NAV_TABS change to the three sibling pages**

In **each** of `join.jsx`, `article.jsx`, `media.jsx`, find the same three lines:

```jsx
  { label: "Home", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "analysis.html" },
```

and replace with:

```jsx
  { label: "Analysis", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
```

- [ ] **Step 3: Fix the `media.jsx` footer link and stale comment**

In `media.jsx`, change the footer link (line ~269):

```jsx
            <a href="analysis.html">Analysis</a>
```

to:

```jsx
            <a href="index.html">Analysis</a>
```

And update the header comment on line 2:

```jsx
// Standalone sibling to app.jsx (index.html), join.jsx (join.html), and analysis.jsx (analysis.html).
```

to:

```jsx
// Standalone sibling to app.jsx (index.html) and join.jsx (join.html).
```

- [ ] **Step 4: Remove analysis from `build.js`**

In `build.js`, change the jsxFiles array (line ~37) from:

```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx', 'analysis.jsx', 'media.jsx'];
```

to:

```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx', 'media.jsx'];
```

Change the htmlFiles array (line ~56) from:

```js
const htmlFiles = ['index.html', 'join.html', 'article.html', 'analysis.html', 'media.html'];
```

to:

```js
const htmlFiles = ['index.html', 'join.html', 'article.html', 'media.html'];
```

Delete the now-dead analysis script-replace line (line ~72):

```js
  html = html.replace(/<script type="text\/babel" src="analysis\.jsx"><\/script>/g, '<script src="analysis.js"></script>');
```

- [ ] **Step 5: Delete the standalone page files**

```bash
rm analysis.jsx analysis.html
```

- [ ] **Step 6: Verify no dangling references remain**

Run:

```bash
grep -rn "analysis.html\|analysis.jsx" app.jsx join.jsx article.jsx media.jsx components.jsx build.js index.html
```

Expected: **no output** (empty). If anything prints, repoint it to `index.html` / remove it.

- [ ] **Step 7: Compile gate**

Run: `npm run build`
Expected: ends with `Build completed successfully!`, no `Error compiling`, and the log no longer mentions `analysis.jsx` / `analysis.html`.

- [ ] **Step 8: Commit**

```bash
git add app.jsx join.jsx article.jsx media.jsx build.js
git rm analysis.jsx analysis.html
git commit -m "refactor: rename Home nav tab to Analysis and remove standalone analysis page"
```

---

## Task 2: Add homepage CSS for the new hero columns and the LATEST ANALYSIS grid

**Files:**
- Modify: `index.html` (the `<style>` block, lines ~196–1301)

All edits are inside the single `<style>` block in `index.html`.

- [ ] **Step 1: Widen/retune the hero grid**

Replace:

```css
  .hero-grid {
    display: grid;
    grid-template-columns: 340px 1fr 240px;
    gap: 32px;
  }
```

with:

```css
  .hero-grid {
    display: grid;
    grid-template-columns: 320px 1fr 260px;
    gap: 32px;
    align-items: start;
  }
```

- [ ] **Step 2: Add the new hero column classes**

Find this rule (it is the last line of the hero "center" group, around line 316):

```css
  .hero-actions { display: flex; gap: 12px; margin-top: 4px; }
```

Insert the following **immediately after** it:

```css

  /* LEFT column — "other featured" article cards (Atlantic-style) */
  .hero-featured {
    display: flex;
    flex-direction: column;
    gap: 26px;
    border-right: 1px solid var(--rule-soft);
    padding-right: 22px;
  }
  .hero-feat-card { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; }
  .hero-feat-img {
    position: relative;
    width: 100%;
    aspect-ratio: 3/2;
    overflow: hidden;
    border: 2px solid var(--rule);
    box-shadow: 4px 4px 0 var(--rule);
    background: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .hero-feat-card:hover .hero-feat-img { transform: translate(-1px, -1px); box-shadow: 6px 6px 0 var(--rule); }
  .hero-feat-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
  .hero-feat-meta { display: flex; flex-direction: column; gap: 4px; padding: 0 2px; }
  .hero-feat-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 21px;
    line-height: 1.08;
    text-transform: uppercase;
    letter-spacing: 0.005em;
    color: var(--fg, var(--rci-ink));
    margin: 2px 0 0;
  }
  .hero-feat-card:hover .hero-feat-title { color: var(--rci-red); }
  .hero-feat-byline {
    font-family: var(--font-condensed);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }

  /* RIGHT column side cards now carry a headline line as well */
  .hero-side-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 15px;
    line-height: 1.12;
    text-transform: uppercase;
    letter-spacing: 0.005em;
    color: var(--fg, var(--rci-ink));
    margin: 0;
  }
  .hero-side-card:hover .hero-side-title { color: var(--rci-red); }
```

- [ ] **Step 3: Delete the now-unused left-feed CSS**

First read the current line numbers to anchor the delete:

```bash
grep -n "Latest analysis sidebar\|\.popular-foot" index.html
```

Then delete the **entire contiguous block** that starts at the comment line:

```css
  /* Latest analysis sidebar (left column) */
```

and ends at (inclusive):

```css
  .popular-foot { padding-top: 14px; }
```

This removes `.hero-right`, `.hero-right::before`, `.popular-head`, `.popular-sub`, `.popular-list`, `.popular-item`, `.popular-item:last-of-type`, `.popular-text`, `.popular-num`, `.popular-title`, `.popular-title:hover`, and `.popular-foot` — all orphaned once the live-feed markup is removed in Task 3. (Reduce the hero column gap if desired; `.hero-left` keeps its existing `gap: 28px`.)

- [ ] **Step 4: Add the LATEST ANALYSIS grid CSS**

Find the FOUR-UP grid rule:

```css
  .four-up-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 26px;
  }
```

Insert the following **immediately after** it:

```css

  /* ─── LATEST ANALYSIS GRID (4×3) ──────────────────────────── */
  .latest { padding: 8px 0 36px; }
  .latest-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px 26px;
  }
  .latest-card { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; }
  .latest-card-img {
    position: relative;
    width: 100%;
    aspect-ratio: 3/2;
    overflow: hidden;
    border: 1.5px solid var(--rule);
    box-shadow: 4px 4px 0 var(--rule);
    background: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .latest-card:hover .latest-card-img { transform: translate(-1px, -1px); box-shadow: 6px 6px 0 var(--rule); }
  .latest-card-kicker {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rci-red);
  }
  .latest-card-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 18px;
    line-height: 1.12;
    text-transform: uppercase;
    letter-spacing: 0.005em;
    color: var(--fg, var(--rci-ink));
    margin: 0;
  }
  .latest-card:hover .latest-card-title { color: var(--rci-red); }
  .latest-card-foot { display: flex; gap: 10px; align-items: baseline; margin-top: 2px; flex-wrap: wrap; }
  .latest-card-byline {
    font-family: var(--font-condensed);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }
  .latest-card-date {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--rci-red);
    white-space: nowrap;
  }
```

- [ ] **Step 5: Update responsive rules — 1100px breakpoint**

Replace:

```css
  @media (max-width: 1100px) {
    .hero-grid { grid-template-columns: 260px 1fr 200px; gap: 24px; }
    .four-up-grid { gap: 20px; }
    .hero-h1 { font-size: 44px; }
    .hero-h1--serif { font-size: 38px; }
  }
```

with:

```css
  @media (max-width: 1100px) {
    .hero-grid { grid-template-columns: 280px 1fr 240px; gap: 24px; }
    .four-up-grid { gap: 20px; }
    .latest-grid { gap: 24px 22px; }
    .hero-h1 { font-size: 44px; }
    .hero-h1--serif { font-size: 38px; }
  }
```

- [ ] **Step 6: Update responsive rules — 900px breakpoint**

Replace:

```css
  @media (max-width: 900px) {
    .site { padding: 0 20px 48px; }
    .hero-grid { grid-template-columns: 1fr; }
    .four-up-grid { grid-template-columns: repeat(2, 1fr); }
```

with (adds grid collapse + strips the stacked-column borders so they don't float mid-page):

```css
  @media (max-width: 900px) {
    .site { padding: 0 20px 48px; }
    .hero-grid { grid-template-columns: 1fr; }
    .hero-featured { border-right: 0; padding-right: 0; }
    .hero-left { border-left: 0; padding-left: 0; }
    .four-up-grid { grid-template-columns: repeat(2, 1fr); }
    .latest-grid { grid-template-columns: repeat(2, 1fr); }
```

(Leave the rest of the 900px block unchanged.)

- [ ] **Step 7: Update responsive rules — 560px breakpoint**

Replace:

```css
  @media (max-width: 560px) {
    .four-up-grid { grid-template-columns: 1fr; }
    .foot-cols { grid-template-columns: 1fr; }
    .mast-tag { display: none; }
    .wm-title { font-size: 32px; }
    .hero-h1 { font-size: 36px; }
  }
```

with:

```css
  @media (max-width: 560px) {
    .four-up-grid { grid-template-columns: 1fr; }
    .latest-grid { grid-template-columns: 1fr; }
    .foot-cols { grid-template-columns: 1fr; }
    .mast-tag { display: none; }
    .wm-title { font-size: 32px; }
    .hero-h1 { font-size: 36px; }
  }
```

- [ ] **Step 8: Compile gate**

Run: `npm run build`
Expected: `Build completed successfully!` (CSS lives in HTML, so this just confirms the HTML copied cleanly; the real CSS check is the visual gate in Task 5).

- [ ] **Step 9: Commit**

```bash
git add index.html
git commit -m "feat: add hero column + LATEST ANALYSIS grid styles to homepage"
```

---

## Task 3: Rebuild the homepage Hero (Atlantic-style 3-column)

**Files:**
- Modify: `app.jsx` — delete `RECENT_ANALYSIS` (lines ~118–129) and replace the `Hero` function (lines ~242–328)

- [ ] **Step 1: Delete the now-unused `RECENT_ANALYSIS` constant**

Remove this entire block from `app.jsx` (it fed only the old live-feed):

```jsx
const RECENT_ANALYSIS = [
  { stamp: "2h", kicker: "Economy", title: "The economic consequences of the war in Iran", href: "article.html" },
  { stamp: "4h", kicker: "Ireland", title: "Ireland: fuel protests show the way" },
  { stamp: "6h", kicker: "Britain", title: "A very British catastrophe" },
  { stamp: "9h", kicker: "History", title: "James Connolly and the Easter Rising" },
  { stamp: "12h", kicker: "Bangladesh", title: "Iran War deals devastating collateral damage to Bangladesh" },
  { stamp: "15h", kicker: "Comment", title: "The hypocrisy of the 'no to war' stance at the Global Progressive Mobilisation" },
  { stamp: "18h", kicker: "Britain", title: "Mandelson, May elections, and the markets — pressures pile up for Starmer" },
  { stamp: "22h", kicker: "United States", title: "\"All you had to do was pay us enough to live\"" },
  { stamp: "1d", kicker: "Theory", title: "In defence of dialectics — a critique of Mao's 'On Contradiction'" },
  { stamp: "1d", kicker: "Economy", title: "Shadow banking: a ticking time bomb under the US economy" },
];
```

- [ ] **Step 2: Replace the `Hero` function in full**

Replace the entire existing `function Hero({ tweaks }) { ... }` (the comment line `// ── Hero — 3 column ───…` through its closing `}`) with:

```jsx
// ── Hero — Atlantic-style: other-featured left | featured daily center | 4 set cards right
function Hero({ tweaks }) {
  const titleFont = tweaks.headlineFont === "serif" ? "serif" : "sans";

  // LEFT: other featured stories
  const featured = [
    { kicker: "Middle East · History", title: "How British imperialism paved the way for the Nakba", byline: "Khaled Malachi", image: IMG.palestine48, href: "#" },
    { kicker: "Iran War · Analysis", title: "Trump's defeat in Iran and its worldwide consequences", byline: "Jorge Martín", image: IMG.trumpHead, href: "#" },
  ];

  // RIGHT: four "set" cards — the editorial moved from the centre, plus three programme cards
  const sideCards = [
    { kicker: "Editorial · World perspectives", title: "2026 kicks off to the sound of imperialist war drums and class struggle", byline: "Jorge Martín", image: IMG.hero, href: "#" },
    { kicker: "Manifesto · Programme", title: "Manifesto of the Revolutionary Communist International", byline: "The RCI", image: IMG.manifesto, href: "#" },
    { kicker: "Iran War · Editorial", title: "The war on Iran: where do communists stand?", byline: "Alan Woods", image: IMG.warOnIran, href: "#" },
    { kicker: "Media", title: "The Communists Are Coming: a visual manifesto", byline: "RCI Media", image: IMG.communistsComing, href: "#" },
  ];

  return (
    <section className="hero">
      <div className="hero-grid">
        {/* LEFT: other featured articles */}
        <div className="hero-featured">
          {featured.map((it, i) => (
            <a key={i} href={it.href} className="hero-feat-card">
              <div className="hero-feat-img">
                <img src={it.image} alt={it.title} />
              </div>
              <div className="hero-feat-meta">
                <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>{it.kicker}</Eyebrow>
                <h3 className="hero-feat-title">{it.title}</h3>
                <div className="hero-feat-byline">By {it.byline}</div>
              </div>
            </a>
          ))}
        </div>

        {/* CENTER: featured daily article */}
        <div className="hero-center">
          <div className="hero-feature">
            <div className="hero-feature-img">
              <img src={IMG.china} alt="China sets the agenda at the Xi-Trump summit" className="hero-feature-img-poster" />
            </div>
            <div className="hero-feature-body">
              <Eyebrow style={{ fontSize: 13, letterSpacing: "0.24em" }}>Daily feature · World</Eyebrow>
              {titleFont === "serif" ? (
                <h1 className="hero-h1 hero-h1--serif">China sets the agenda at the Xi-Trump summit</h1>
              ) : (
                <h1 className="hero-h1">China sets the agenda at the Xi-Trump summit</h1>
              )}
              <div className="hero-byline">By Daniel Morley · 19 May 2026</div>
              <p className="hero-dek">
                “The unipolar hegemony of a major power is becoming increasingly unsustainable. At home, its democracy is mutating, its economy decaying, and its society fracturing.” — <b>Chen Yixin, China's Minister of State Security.</b> Trump went to Beijing believing he negotiated from strength; in reality, he negotiated from weakness.
              </p>
              <div className="hero-actions">
                <PrintButton variant="red" size="md" href="article.html">Read the analysis →</PrintButton>
                <PrintButton variant="paper" size="md">Share</PrintButton>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: four set cards */}
        <div className="hero-left">
          {sideCards.map((it, i) => (
            <a key={i} href={it.href} className="hero-side-card">
              <div className="hero-side-img">
                <img src={it.image} alt={it.title} />
              </div>
              <div className="hero-side-meta">
                <Eyebrow style={{ fontSize: 11, letterSpacing: "0.2em" }}>{it.kicker}</Eyebrow>
                <h3 className="hero-side-title">{it.title}</h3>
                <div className="hero-side-byline">By {it.byline}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

> Note: the right column reuses the existing `.hero-left` / `.hero-side-card` / `.hero-side-img` / `.hero-side-meta` / `.hero-side-byline` CSS and adds the new `.hero-side-title` line (defined in Task 2). DOM order is now left → center → right, matching the grid columns.

- [ ] **Step 3: Compile gate**

Run: `npm run build`
Expected: `Build completed successfully!`, no `Error compiling app.jsx`.

- [ ] **Step 4: Commit**

```bash
git add app.jsx
git commit -m "feat: rebuild homepage hero into Atlantic-style three-column layout"
```

---

## Task 4: Add the LATEST ANALYSIS 4×3 grid and wire it into the page

**Files:**
- Modify: `app.jsx` — add `LATEST_ANALYSIS` data + `LatestAnalysisGrid` component (after the `Hero` function), set `App` active tab, render the grid after the hero

- [ ] **Step 1: Add the article data + grid component**

In `app.jsx`, immediately **after** the closing `}` of the `Hero` function (and before `// ── 4-up secondary articles ──` / `function CampaignBanner`), insert:

```jsx
// ── Latest Analysis data (placeholder cards — no images) ─────────────────────
const LATEST_ANALYSIS = [
  { kicker: "Britain · Podcast",   title: "[Podcast] The 1926 General Strike: Britain's revolution betrayed", author: "Spectre of Communism", date: "26 May 2026" },
  { kicker: "Art · History",       title: "Figaro and the French Revolution",                                  author: "Alan Woods",            date: "22 May 2026" },
  { kicker: "Europe · Romania",    title: "Romanian government collapses after ten months of austerity",       author: "Jonathan Hinckley",     date: "22 May 2026" },
  { kicker: "Cuba · Americas",     title: "US indictment of Raúl Castro: hands off Cuba!",                      author: "Revolutionary Communist International", date: "21 May 2026" },
  { kicker: "Britain · Podcast",   title: "[Podcast] Capitalism is ungovernable",                              author: "Against the Stream",    date: "21 May 2026" },
  { kicker: "Middle East · History", title: "How British imperialism paved the way for the Nakba",             author: "Khaled Malachi",        date: "20 May 2026" },
  { kicker: "Italy · Party",       title: "Second Congress of the Italian PCR — communists advance",           author: "Francesco Salmeri",     date: "20 May 2026" },
  { kicker: "China · World",       title: "China sets the agenda at the Xi-Trump summit",                      author: "Daniel Morley",         date: "19 May 2026" },
  { kicker: "Venezuela · Americas", title: "Alex Saab handed over to US imperialism",                          author: "Jorge Martín",          date: "19 May 2026" },
  { kicker: "Cuba · Americas",     title: "Cuban drones threaten Florida? Axios fabricates a pretext",         author: "Jorge Martín",          date: "18 May 2026" },
  { kicker: "Cuba · Americas",     title: "CIA director visits Havana as US imperialism ramps up blackmail",   author: "Jorge Martín",          date: "15 May 2026" },
  { kicker: "Honduras · Americas", title: "'Hondurasgate': the henchmen of the Donroe Doctrine",               author: "Sylvia Léo",            date: "15 May 2026" },
];

// ── LATEST ANALYSIS — 4-wide × 3-tall grid of placeholder cards ──────────────
function LatestAnalysisGrid({ tweaks }) {
  return (
    <section className="latest">
      <SectionHead label="Latest analysis" divider={tweaks.divider} extra="Updated hourly" />
      <div className="latest-grid">
        {LATEST_ANALYSIS.map((a, i) => (
          <a key={i} href="article.html" className="latest-card">
            <div className="latest-card-img">
              <PhotoOrSlab image={undefined} label={a.kicker} aspect="3/2" style={{ position: "absolute", inset: 0 }} />
            </div>
            <div className="latest-card-kicker">{a.kicker}</div>
            <h3 className="latest-card-title">{a.title}</h3>
            <div className="latest-card-foot">
              <span className="latest-card-byline">{a.author}</span>
              <span className="latest-card-date">{a.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

> `PhotoOrSlab` (already defined near the top of `app.jsx`) renders the inked slab placeholder with the kicker stamped on it when `image` is `undefined`. `SectionHead`, `Eyebrow`, `PrintButton` are window globals from `components.jsx`. The slab fills `.latest-card-img` via `position:absolute; inset:0`, so its own `aspect` is overridden by the card's `3/2` ratio.

- [ ] **Step 2: Set the homepage active tab to "Analysis"**

In the `App` function, change:

```jsx
  const [activeTab, setActiveTab] = useState("Home");
```

to:

```jsx
  const [activeTab, setActiveTab] = useState("Analysis");
```

- [ ] **Step 3: Render the grid directly below the hero**

In `App`'s returned JSX, change:

```jsx
      <main className="site-main">
        <Hero tweaks={t} />
        <CampaignBanner tweaks={t} />
```

to:

```jsx
      <main className="site-main">
        <Hero tweaks={t} />
        <LatestAnalysisGrid tweaks={t} />
        <CampaignBanner tweaks={t} />
```

(Leave `IDOMBlock`, `TopicSplit`, `EconomyBlock`, `ManifestoBanner`, `JoinBanner` exactly as they are — per the decision to keep all existing sections.)

- [ ] **Step 4: Compile gate**

Run: `npm run build`
Expected: `Build completed successfully!`, no `Error compiling app.jsx`.

- [ ] **Step 5: Commit**

```bash
git add app.jsx
git commit -m "feat: add LATEST ANALYSIS placeholder grid below the homepage hero"
```

---

## Task 5: Visual verification in a browser

**Files:** none (verification only)

- [ ] **Step 1: Serve the repo root**

From the repository root, start a static server (dev HTML compiles JSX in-browser via Babel standalone):

```bash
python3 -m http.server 8000
```

(If `python3` is unavailable, use `npx serve -l 8000 .`)

- [ ] **Step 2: Load the homepage and confirm the hero**

Open `http://localhost:8000/index.html`. Verify:
- The nav shows **ANALYSIS** as the first tab (highlighted/active), and there is **no separate "Home" or duplicate "Analysis"** tab.
- Hero is three columns: **left** = two "other featured" image cards (Nakba, Trump's defeat); **center** = the big "China sets the agenda…" featured daily with large image, eyebrow, headline, byline, dek, and the red "Read the analysis →" button; **right** = four stacked set cards (editorial first, then Manifesto, War on Iran, Communists Coming), each with image + kicker + headline + byline.
- No leftover "Latest analysis" live-feed list in the hero.

- [ ] **Step 3: Confirm the LATEST ANALYSIS grid**

Directly below the hero:
- A section headed **LATEST ANALYSIS** (red eyebrow + slab rule, "Updated hourly" at right).
- A **4-column × 3-row** grid = 12 cards. Each card shows an inked **slab placeholder** (kicker stamped on it, no photo), the kicker line, an uppercase title, and an author + red date on the footer row.

- [ ] **Step 4: Confirm the rest of the page is intact**

Scroll down: Campaign banner, In Defence of Marxism, Topic split, Economy, National Sections, and Join banner all still render in order. The page is now noticeably longer than before.

- [ ] **Step 5: Check responsive behavior**

Narrow the window:
- ~1100px: hero columns shrink but stay three-up.
- ≤900px: hero stacks to one column (no stray vertical border lines between the stacked columns); LATEST ANALYSIS grid becomes 2 columns.
- ≤560px: LATEST ANALYSIS grid becomes 1 column; masthead tagline hides.

- [ ] **Step 6: Sanity-check sibling pages still navigate**

Open `http://localhost:8000/join.html`, `/article.html`, `/media.html`. Each nav shows the **ANALYSIS** tab pointing to `index.html`; clicking it returns to the homepage. Loading `/analysis.html` now 404s (file deleted) — expected.

- [ ] **Step 7: Stop the server**

Press `Ctrl-C` in the server terminal.

- [ ] **Step 8: Final build + commit (if any tweaks were made during review)**

```bash
npm run build
git add -A
git commit -m "chore: homepage/analysis redesign visual polish"
```

(Skip the commit if Steps 2–6 passed with no changes.)

---

## Self-Review

**1. Spec coverage:**

| Spec requirement | Task |
|---|---|
| Fold Analysis page into the Homepage | Task 1 (delete standalone, fold article data into Task 4 grid) |
| Rename Homepage's tab to "ANALYSIS" | Task 1 Steps 1–2; Task 4 Step 2 (active state) |
| Homepage has much more recent analysis + considerably longer | Task 4 (12-card grid) + keep all existing sections (Task 4 Step 3) |
| Hero like The Atlantic: featured daily front and center | Task 3 (center `hero-feature`) |
| Other featured articles to the left | Task 3 (`hero-featured` left column, 2 cards) |
| Move centrepiece editorial to the right → four set cards in a column | Task 3 (`sideCards` array, editorial first of four) |
| 4-wide × 3-tall grid under heading "LATEST ANALYSIS" with title, author, image, date | Task 2 (`.latest-grid` repeat(4)) + Task 4 (`LatestAnalysisGrid`, 12 items) |
| Placeholder article cards, no images | Task 4 (`PhotoOrSlab image={undefined}`) |

**2. Placeholder scan:** No "TBD/TODO" left. Every code step shows complete code. The only intentional "placeholders" are the slab cards in the LATEST ANALYSIS grid (explicitly required) and the documented editorial/image choices (user-swappable copy).

**3. Type/identifier consistency:** CSS classes defined in Task 2 (`.hero-featured`, `.hero-feat-card`, `.hero-feat-img`, `.hero-feat-meta`, `.hero-feat-title`, `.hero-feat-byline`, `.hero-side-title`, `.latest`, `.latest-grid`, `.latest-card`, `.latest-card-img`, `.latest-card-kicker`, `.latest-card-title`, `.latest-card-foot`, `.latest-card-byline`, `.latest-card-date`) exactly match the `className`s used in Tasks 3–4. Reused existing classes (`.hero-grid`, `.hero-center`, `.hero-feature*`, `.hero-h1`, `.hero-byline`, `.hero-dek`, `.hero-actions`, `.hero-left`, `.hero-side-card`, `.hero-side-img`, `.hero-side-meta`, `.hero-side-byline`) are confirmed present in `index.html`. `IMG.palestine48`, `IMG.trumpHead`, `IMG.china`, `IMG.hero`, `IMG.manifesto`, `IMG.warOnIran`, `IMG.communistsComing` all exist in the `IMG` map in `app.jsx`. `PhotoOrSlab`, `SectionHead`, `Eyebrow`, `PrintButton` are all in scope.

**4. Ordering risk:** Task 2 (CSS) lands before Task 3/4 (markup), so the markup renders styled on first preview. The `.hero-side-title` and `.hero-feat-*` classes are added in Task 2 Step 2 even though they are consumed in Task 3 — intentional.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-28-homepage-analysis-redesign.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
