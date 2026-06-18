# Homepage Redesign — RCI Design System + Wireframe Layout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the Marxist.com homepage to the new RCI warm-paper design system (`ds/rci-web.css`) and restructure the homepage layout to match the attached wireframe.

**Architecture:** The homepage is a Babel-standalone React app: `index.html` (shell + ~1700 lines of bespoke inline CSS) renders `app.jsx`, which uses shared components from `components.jsx`. We keep this architecture (decision: **re-skin**, not re-platform). We rewire the design tokens in `index.html`'s `:root` to the design-system's warm palette / fonts / textures, drop dark-mode + the tweaks system, and rebuild `app.jsx` section-by-section to match the wireframe order. Existing real article data is reused; only genuinely new sections (Trump 2.0, Against the Stream, Marxist University, World School, Reports) get new realistic placeholder copy.

**Tech Stack:** Static HTML + React 18 (UMD) + Babel-standalone (in-browser JSX), no bundler. Build is `node build.js` (compiles `.jsx`→`.js`, copies `ds/`+`assets/`+`uploads/` into `dist/`). Verification is visual via the `preview_*` tools (per `CLAUDE.md`: rebuild + screenshot before declaring done). There is **no unit-test runner** — "tests" in this plan are build success + preview-screenshot checks.

**Source of truth for the look:** `ds/rci-web.css`, `ds/README.md`, `ds/starter-page.html`. **Wireframe:** the attached PNG (header, mega-menu, home column).

---

## Pre-flight: known integration blockers (fix before any visual work)

These were confirmed during research and **must** be resolved or the design system loads broken:

1. `ds/rci-fonts.css` loads faces from `../fonts` → resolves to a **non-existent repo-root `/fonts`**. The fonts actually live in `ds/fonts`. It also references `Cormorant_Garamond_Medium.ttf` and `IBMPlexMono-Regular.ttf`, **neither of which exists** (actual: `CormorantGaramond-Regular.ttf`; no IBM Plex face at all).
2. `ds/rci-web.css` references two textures that **do not exist**: `textures/paper-356.jpg` (dark-slab scratch) and `textures/grunge-peeled-paint.jpg` (red-slab peel).
3. `ds/colors_and_type.css` (already linked by `index.html`) **already** registers `@font-face` for Built Titling, Trade Gothic Next LT Pro (+ Condensed), Cheltenham BT, and Cormorant Garamond — loaded correctly from `ds/fonts`. The DS family names match exactly. So the brand fonts are already available to the page today.

**Consequence for our approach:** We will link `ds/rci-web.css` *after* `ds/colors_and_type.css` so the warm palette, the fixed page grain, and the Cheltenham body default win, while reusing the already-working `@font-face` declarations from `colors_and_type.css`. Tasks 1–2 fix the broken DS references so `rci-web.css` is internally consistent and usable.

---

## File Structure

Files created or modified by this plan:

- **`ds/rci-fonts.css`** *(modify)* — fix font paths (`../fonts` → `fonts`), fix Cormorant filenames, remove the missing IBM Plex face. Responsibility: make the DS font kit load in this repo layout.
- **`ds/rci-web.css`** *(modify, minimal)* — substitute the two missing texture filenames with textures that exist in `ds/textures`. Responsibility: keep the DS stylesheet free of 404s.
- **`index.html`** *(modify)* — link `rci-web.css`; replace the `:root` token block with the warm-paper DS palette + DS font remap + legacy-token bridge; add the fixed page-grain `body::before`; delete the dark-mode CSS block. Responsibility: the global design surface.
- **`components.jsx`** *(modify)* — add a `Kicker` (spot-ink eyebrow) helper and a `MediaSlab`/`Feature` primitive if reused; lock `ArticleCard` to sentence-case serif (drop the sans branch). Responsibility: shared building blocks for the re-skinned sections.
- **`app.jsx`** *(modify, large)* — remove dark-mode/tweaks wiring; rebuild `Masthead` (brand text + Language + Join Us + mega-menu) and the section sequence to the wireframe (`Hero`, `LatestScroller`, `Trump2`, `CampaignBanner`, `AgainstTheStream`, `FeaturePair`, `TopicGrid`, `WorldSchoolBanner`, `MarxistUniversity`, `Reports`, `JoinTheFight`, `Footer`). Responsibility: the homepage layout + content.

No new `.jsx`/`.html` files are needed — the homepage stays a single React tree.

---

## Phases (each ends in a working, committable, screenshot-verified state)

- **Phase A — Foundation** (Tasks 1–4): fix DS assets, wire warm tokens + grain, drop dark mode, baseline screenshot.
- **Phase B — Chrome** (Task 5): header / nav / mega-menu to wireframe.
- **Phase C — Top of page** (Tasks 6–7): Hero + Latest scroller.
- **Phase D — Mid page** (Tasks 8–11): Trump 2.0, Campaign, Against the Stream, Feature pair.
- **Phase E — Topics & education** (Tasks 12–14): Topic grid, World School banner, Marxist University.
- **Phase F — Bottom** (Tasks 15–17): Reports, Join the Fight, Footer.
- **Phase G — Polish** (Task 18): spot-ink discipline, responsive, final verification.

A subagent/engineer may stop after any phase and have a coherent page.

---

## Conventions used throughout

- **Verification command:** `npm run build` (must print `Build completed successfully!` and exit 0).
- **Preview:** use `preview_start` once (serving the repo root), then after each change `preview_eval` `window.location.reload()` (or rely on it), then `preview_screenshot` at viewport width 1280 (the page declares `<meta viewport width=1280>`). Capture a full-page screenshot and confirm the section looks as described.
- **Commit** after each task with the message shown. Commit directly to `main` (per `CLAUDE.md` / memory `git-commit-on-main`).
- **Spot-ink rule (from README):** one accent ink per section, applied to the kicker only; red stays the loudest colour. Section→ink assignments are fixed in Task 18.
- **Headlines are sentence-case Cormorant.** Built Titling (ALL CAPS) is reserved for: the wordmark-style display moments, the Campaign H2, Marxist University quote band, Join-the-Fight H2, and the Reports featured line. Never two Built Titling blocks competing in one viewport.

---

### Task 1: Fix the design-system font kit (`ds/rci-fonts.css`)

**Files:**
- Modify: `ds/rci-fonts.css`

- [ ] **Step 1: Repoint all font paths from `../fonts` to `fonts`**

`rci-fonts.css` lives in `ds/`, and the fonts live in `ds/fonts`. Replace every `url("../fonts/` with `url("fonts/`. There are 12 occurrences. Exact replacement (apply to each `src:` line):

```
src: url("../fonts/built_titling_rg.otf")   →  src: url("fonts/built_titling_rg.otf")
src: url("../fonts/built_titling_sb.otf")   →  src: url("fonts/built_titling_sb.otf")
src: url("../fonts/built_titling_bd.otf")   →  src: url("fonts/built_titling_bd.otf")
src: url("../fonts/TradeGothicNextLTPro-Rg.otf")   →  src: url("fonts/TradeGothicNextLTPro-Rg.otf")
src: url("../fonts/TradeGothicNextLTPro-Bd.otf")   →  src: url("fonts/TradeGothicNextLTPro-Bd.otf")
src: url("../fonts/TradeGothicNextLTPro-Cn.otf")   →  src: url("fonts/TradeGothicNextLTPro-Cn.otf")
src: url("../fonts/TradeGothicNextLTPro-BdCn.otf") →  src: url("fonts/TradeGothicNextLTPro-BdCn.otf")
src: url("../fonts/CheltenhamBT.ttf")           →  src: url("fonts/CheltenhamBT.ttf")
src: url("../fonts/CheltenhamItalicBT.ttf")     →  src: url("fonts/CheltenhamItalicBT.ttf")
src: url("../fonts/CheltenhamBoldBT.ttf")       →  src: url("fonts/CheltenhamBoldBT.ttf")
src: url("../fonts/CheltenhamBoldItalicBT.ttf") →  src: url("fonts/CheltenhamBoldItalicBT.ttf")
```

- [ ] **Step 2: Fix the Cormorant Garamond filenames**

The referenced `Cormorant_Garamond_Medium.ttf` / `Cormorant_Garamond_Bold.ttf` do not exist. Replace the Cormorant block (lines ~74–84) with the real filenames in `ds/fonts`:

```css
/* Cormorant Garamond — display serif (headlines, standfirsts, pull-quotes) */
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Regular.ttf") format("truetype");
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Bold.ttf") format("truetype");
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Italic.ttf") format("truetype");
  font-weight: 500; font-style: italic; font-display: swap;
}
```

- [ ] **Step 3: Remove the missing IBM Plex Mono face**

`ds/fonts` has no IBM Plex Mono. Delete the entire `@font-face` block for `"IBM Plex Mono"` (lines ~86–91). The `--rci-font-mono` token already falls back to `ui-monospace, Menlo, monospace`, which is fine for the tiny placeholder labels that are the only mono usage.

- [ ] **Step 4: Verify no remaining broken references**

Run:
```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
grep -n "\.\./fonts" ds/rci-fonts.css; echo "exit:$?"
for f in $(grep -oE 'fonts/[A-Za-z0-9_.-]+' ds/rci-fonts.css | sort -u); do [ -f "ds/$f" ] && echo "OK ds/$f" || echo "MISS ds/$f"; done
```
Expected: the `grep` prints nothing (exit 1 — no `../fonts` left), and every listed font is `OK`.

- [ ] **Step 5: Commit**

```bash
git add ds/rci-fonts.css
git commit -m "fix(ds): repoint rci-fonts to ds/fonts and correct Cormorant/IBM Plex faces

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Fix the missing texture references in `ds/rci-web.css`

**Files:**
- Modify: `ds/rci-web.css:69-71` (texture tokens)

`ds/textures` contains: `au-fg-1.jpg`, `film-grain.jpg`, `grunge-light-specks.jpg`, `halftone-mesh.jpg`, `paper-129.jpg`, `paper-217.jpg`, `paper-274.jpg`, `paper-gray.jpg`, `red-paper-alt.jpg`. Substitute the two missing files with existing ones that serve the same role.

- [ ] **Step 1: Repoint `--rci-tx-scratch` and `--rci-tx-peel`**

Replace these two token lines:

```css
  --rci-tx-scratch: url("textures/paper-356.jpg");      /* @kind other — on dark slabs, screen ~0.12 */
  --rci-tx-peel:    url("textures/grunge-peeled-paint.jpg"); /* @kind other — on red slabs, multiply ~0.18 */
```

with:

```css
  --rci-tx-scratch: url("textures/paper-gray.jpg");     /* dark-slab scratch (substitute) — screen ~0.12 */
  --rci-tx-peel:    url("textures/red-paper-alt.jpg");  /* red-slab peel (substitute) — multiply ~0.18 */
```

- [ ] **Step 2: Verify every texture URL in rci-web.css resolves**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
for f in $(grep -oE 'textures/[A-Za-z0-9_.-]+' ds/rci-web.css | sort -u); do [ -f "ds/$f" ] && echo "OK ds/$f" || echo "MISS ds/$f"; done
```
Expected: all four (`au-fg-1.jpg`, `paper-gray.jpg`, `red-paper-alt.jpg`, `halftone-mesh.jpg`) print `OK`.

- [ ] **Step 3: Commit**

```bash
git add ds/rci-web.css
git commit -m "fix(ds): substitute missing slab textures with existing files

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Wire the warm-paper tokens, grain, and font direction into `index.html`

**Files:**
- Modify: `index.html:8` (stylesheet links)
- Modify: `index.html:10-58` (`:root` token block + base body)
- Modify: `index.html:39-49` (delete dark-mode block)
- Modify: `index.html:1726` (`<body data-mode="light">` → `<body>`)

This is the heart of the re-skin. We override `colors_and_type.css`'s cool palette with the DS warm palette, bridge the legacy token names the inline CSS + components rely on, and add the single fixed page grain.

- [ ] **Step 1: Link `rci-web.css` after `colors_and_type.css`**

Replace line 8:

```html
<link rel="stylesheet" href="ds/colors_and_type.css">
```

with:

```html
<link rel="stylesheet" href="ds/colors_and_type.css">
<link rel="stylesheet" href="ds/rci-web.css">
```

(Order matters: `rci-web.css` last so its warm palette and `body` defaults win. Its `body::before` grain provides the page texture; we will *not* duplicate it.)

- [ ] **Step 2: Replace the `:root` block + base body with the warm DS tokens + bridge**

Replace the entire block from `:root {` (line 15) through the end of the dark-mode rule (line 49) — i.e. lines 15–49 — with:

```css
  /* ── Design-system warm palette (overrides colors_and_type.css cool values) ── */
  :root {
    --rci-paper:      #fff1e5;
    --rci-paper-deep: #f4e4d3;
    --rci-paper-card: #fffaf3;
    --rci-ink:        #221c17;
    --rci-ink-soft:   #4a4039;
    --rci-ash:        #8a7d70;
    --rci-hairline:   #e4d0bb;
    --rci-hairline-2: #d3bca3;
    --rci-red:        #d4140f;
    --rci-red-hot:    #e6002b;
    --rci-red-dark:   #8a0608;
    --rci-blue:       #1d3a6b;
    --rci-ochre:      #bd7a17;
    --rci-green:      #2c5e3f;

    /* Bridge: legacy token names used by the inline CSS + components.jsx,
       remapped onto warm surfaces so nothing reads cool/grey. */
    --rci-offwhite:   #fffaf3;            /* was #f6efef — now warm paper-card */
    --rci-fog:        var(--rci-hairline-2);
    --page-bg:        var(--rci-paper);
    --page-bg-dark:   var(--rci-paper);   /* dark mode removed; keep var defined */
    --paper:          var(--rci-paper-card);
    --paper-soft:     var(--rci-paper-deep);
    --rule:           var(--rci-ink);
    --rule-soft:      var(--rci-hairline-2);
    --fg:             var(--rci-ink);
    --fg-soft:        var(--rci-ink-soft);

    /* Font direction (DS): reading = Cheltenham, headlines = Cormorant,
       Built Titling reserved for display, Trade Gothic Cond for chrome. */
    --font-body:          "Cheltenham BT", "Georgia", "Times New Roman", serif;
    --font-serif:         "Cormorant Garamond", "Cheltenham BT", "Georgia", serif;
    --font-serif-body:    "Cheltenham BT", "Georgia", "Times New Roman", serif;
    --font-article-title: "Cormorant Garamond", "Cheltenham BT", "Georgia", serif;
    --font-headline:      "Cormorant Garamond", "Cheltenham BT", "Georgia", serif;
    --font-display:       "Built Titling", "Trade Gothic Next LT Pro", "Arial Narrow", sans-serif;
    --font-condensed:     "Trade Gothic Next LT Pro Condensed", "Arial Narrow", sans-serif;
  }

  html, body { margin: 0; padding: 0; }
  html { background: var(--page-bg); }
  body {
    background: var(--page-bg);
    color: var(--rci-ink);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.5;
    min-height: 100vh;
    position: relative;
  }
```

Notes:
- This deletes the `body[data-mode="dark"]` rule entirely (dark mode is dropped).
- `rci-web.css` already paints `body::before` with `au-fg-1.jpg` grain at multiply 0.14, so we add no grain here.
- `--font-article-title` and `--font-headline` now point at Cormorant; the existing `*--serif` headline class variants and the (already-default) serif rendering in `app.jsx` keep titles sentence-case. Remaining hard-coded `text-transform: uppercase` on title classes is handled in Step 3.

- [ ] **Step 3: Neutralize stray uppercase on serif title/headline classes**

Several inline classes still force `text-transform: uppercase` on what are now Cormorant headlines, which the DS forbids (caps are Built-Titling-only). Append this override block at the very end of the `<style>` (just before `</style>` at line 1724) so it wins by source order:

```css
  /* ── DS font-direction overrides: serif headlines are sentence case ── */
  .idom-title, .topic-title, .sections-title {
    font-family: var(--font-serif);
    font-weight: 700;
    text-transform: none;
    letter-spacing: -0.005em;
  }
  /* Built Titling stays caps ONLY on these display moments */
  .campaign-h2, .join-h2, .sections-h2, .manifesto-h2,
  .idom-toc-wordmark {
    font-family: var(--font-display);
    text-transform: uppercase;
  }
```

- [ ] **Step 4: Drop `data-mode` from `<body>`**

Replace line 1726 `<body data-mode="light">` with `<body>`.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: `Build completed successfully!`, exit 0.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(home): adopt RCI warm-paper tokens, page grain, and serif font direction

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Remove dark-mode + tweaks wiring from `app.jsx`; baseline screenshot

**Files:**
- Modify: `app.jsx:7-13` (TWEAK_DEFAULTS), `app.jsx:768-798` (App), and `tweaks`-prop call sites.

We keep the data and section components for now; we only sever the dark-mode/tweaks machinery so the page commits to the single warm look. Section reordering happens in later tasks.

- [ ] **Step 1: Replace `TWEAK_DEFAULTS` with frozen constants**

Replace lines 7–13:

```jsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "texture": "none",
  "headlineFont": "serif",
  "mode": "light",
  "cardTreatment": "clean",
  "divider": "thick-slab"
}/*EDITMODE-END*/;
```

with:

```jsx
// Design-system look is fixed: warm paper, serif headlines, clean cards,
// thick-slab dividers. (Dark mode + tweak switches removed.)
const T = { headlineFont: "serif", cardTreatment: "clean", divider: "thick-slab" };
```

- [ ] **Step 2: Simplify `App` (remove mode/texture effect; pass `T`)**

Replace the `App` function (lines 768–798) with:

```jsx
function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      <Masthead menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav active={activeTab} onSelect={setActiveTab} onOpenMenu={() => setMenuOpen(true)} />

      <main className="site-main">
        <Hero tweaks={T} />
        <LatestAnalysisGrid tweaks={T} />
        <CampaignBanner tweaks={T} />
        <IDOMBlock tweaks={T} />
        <TopicSplit tweaks={T} />
        <EconomyBlock tweaks={T} />
        <ManifestoBanner tweaks={T} />
        <JoinBanner />
      </main>

      <Footer />
    </div>
  );
}
```

(The section list still references the *old* sections — that is intentional; Tasks 6–17 swap them. This step only proves the page renders with tweaks removed.)

- [ ] **Step 3: Replace remaining `tweaks={t}` references**

Search `app.jsx` for `tweaks={t}` and `const t = TWEAK_DEFAULTS;`. Delete the `const t = TWEAK_DEFAULTS;` line inside `App` (already gone via Step 2). No other file references `TWEAK_DEFAULTS`. Run:
```bash
grep -n "TWEAK_DEFAULTS\|data-mode\|dataset.mode\|dataset.texture" app.jsx; echo "exit:$?"
```
Expected: prints nothing (exit 1).

- [ ] **Step 4: Build + baseline screenshot**

```bash
npm run build
```
Expected: `Build completed successfully!`

Then: `preview_start` (serve repo root), open `index.html`, `preview_screenshot` full page at width 1280.
Expected: page renders on warm `#fff1e5` paper with faint grain; headlines in Cormorant serif; no grey/cool surfaces; no console errors (`preview_console_logs`). Layout is still the *old* section order — that is expected at this checkpoint.

- [ ] **Step 5: Commit**

```bash
git add app.jsx
git commit -m "refactor(home): remove dark-mode and tweaks machinery; freeze DS look

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Rebuild header / nav / mega-menu to the wireframe

**Files:**
- Modify: `app.jsx` — `Masthead` (lines 119–316), `Nav` (lines 319–360), `NAV_TABS` (lines 107–115).
- Modify: `index.html` `<style>` — masthead/nav/drawer rules as needed for the new top-bar (brand text block, Language, Join Us).

Wireframe header (every page): **logo + "Revolutionary / Communist / International"** on the left; **"˅ Language"** and a **"JOIN US"** button on the right. Nav row below: **🔍 Menu · Home · Analysis · Theory & History · Magazine · Bookshop** (Analysis shown active/italic in the wireframe). Clicking **Menu** opens the mega-menu: a **Close** affordance, a left rail of primary destinations (Latest Analysis, Media + Podcasts, In Defence of Marxism, WellRed Books, Join the RCI), and on the right a **search field** over four link columns (**Continents, Current Topics, Marxist Theory, RCI**) plus two more groups (**Marxist University**: All Courses / Course One / Course Two; **Media**: Against the Stream / Spectre of Communism / Documentaries). A blurred backdrop sits behind.

- [ ] **Step 1: Update `NAV_TABS`**

Replace lines 107–115 with the wireframe's nav set:

```jsx
const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Analysis", href: "index.html" },
  { label: "Theory & History", href: "theory.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookshop", href: "https://wellredbooks.co.uk/" },
];
```

- [ ] **Step 2: Replace the top-bar markup in `Masthead`**

Replace the `mast-left` / `mast-right` blocks (lines 134–163, i.e. everything from `<header className="masthead">` through the closing `</div>` of `mast-right`, but *not* the `menuOpen && (...)` drawer) with:

```jsx
<header className="masthead">
  <a href="index.html" className="mast-brand">
    <img src={R("rciSquare", "assets/rci-social-round.svg")} alt="RCI" className="mast-logo" />
    <span className="mast-brand-name">Revolutionary<br/>Communist<br/>International</span>
  </a>
  <div className="mast-right">
    <button type="button" className="mast-lang" aria-label="Choose language">&#9662; Language</button>
    <PrintButton variant="red" size="md" href="join.html">Join Us</PrintButton>
  </div>
```

(The `mast-socials` row is removed from the top bar per the wireframe; social links live in the footer.)

- [ ] **Step 3: Add top-bar CSS**

In `index.html` `<style>`, replace the `.masthead` rule (lines 61–68) and add the brand/lang rules. Use:

```css
  .masthead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 14px;
    border-bottom: 4px solid var(--rule);
    gap: 24px;
  }
  .mast-brand { display: flex; align-items: center; gap: 13px; text-decoration: none; color: inherit; }
  .mast-logo { width: 46px; height: 46px; display: block; box-shadow: 3px 3px 0 var(--rci-ink); }
  .mast-brand-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 17px;
    line-height: 1.0;
    color: var(--rci-ink);
  }
  .mast-right { display: flex; align-items: center; gap: 18px; }
  .mast-lang {
    font-family: var(--font-condensed);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 12px;
    color: var(--rci-ink-soft);
    background: none; border: 0; cursor: pointer;
  }
  .mast-lang:hover { color: var(--rci-red); }
```

Leave the existing `.wm-*`, `.mast-slash`, `.mast-tag`, `.mast-search*`, `.mast-social*` rules in place (now unused — they will be removed in Task 18's cleanup). Do not delete them yet to keep this diff focused.

- [ ] **Step 4: Restructure the drawer into a two-region mega-menu**

The existing drawer (`menu-drawer-*`) already provides the slide-down + sidebar + categories. Update its **content** to the wireframe groups. In the `menu-drawer-categories` block (lines 260–308), set the four primary columns to **Continents / Current Topics / Marxist Theory / RCI**, and append two more `drawer-category` blocks for **Marxist University** and **Media**:

```jsx
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
      <a href="classics.html" className="drawer-category-link" onClick={() => setMenuOpen(false)}>The Classics</a>
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
```

Update the left rail (`menu-drawer-sidebar`, lines 201–258) item titles to: **Latest Analysis, Media + Podcasts, In Defence of Marxism, WellRed Books, Join the RCI** (the existing five sidebar items already match four of these — rename "Bookstore" → "WellRed Books" and "Podcasts & Media" → "Media + Podcasts"). Update the drawer brand wordmark (line 172) from `MARXIST.COM` to `Revolutionary Communist International` styled with `.mast-brand-name`.

Allow the `drawer-category` grid to wrap to 6 cells — change `.menu-drawer-categories` `grid-template-columns: repeat(4, 1fr)` to `repeat(3, 1fr)` so 6 groups sit 3×2 (index.html line ~1602).

- [ ] **Step 5: Confirm `Nav` Menu button + active state**

In `Nav` (lines 319–360), the Menu button already opens the menu. Ensure the active tab uses the DS active underline rather than the ink fill: set `variant={isActive ? "paper" : "paper"}` (always paper) and add `active` only for the red underline. Simpler: keep `PrintButton` as-is; it already presses. No code change required beyond the new `NAV_TABS`. Verify the Menu button label reads "Menu" and the search-in-menu still focuses on open.

- [ ] **Step 6: Build + verify the header and open menu**

```bash
npm run build
```
Then reload preview. `preview_screenshot` the header closed. Then `preview_click` the Menu button and `preview_screenshot` again.
Expected: top bar shows logo + three-line "Revolutionary Communist International", "˅ Language", red "JOIN US"; nav row shows Menu + Home/Analysis/Theory & History/Magazine/Bookshop; clicking Menu reveals the blurred-backdrop mega-menu with the left rail + six labelled link groups + search. No console errors.

- [ ] **Step 7: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): rebuild header, nav, and mega-menu to wireframe

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Hero — big story + two stacked secondaries

**Files:**
- Modify: `app.jsx` — `Hero` (lines 363–431).
- Modify: `index.html` `<style>` — `.hero-grid` and add `.hero-secondary*` rules.

Wireframe hero: a large **"This is the big story"** feature occupying the left ~2/3 (kicker + big Cormorant headline + dek + lead image), and on the right a narrower column with **two** smaller stacked stories ("This also happened I guess", "and this…"). The word **"Latest"** is the section label that begins the next section.

- [ ] **Step 1: Replace the `Hero` component body**

Replace `Hero` (lines 363–431) with:

```jsx
function Hero({ tweaks }) {
  const secondaries = [
    { kicker: "Economy · Iran War", title: "The economic consequences of the war in Iran", byline: "Niklas Albin Svensson", image: IMG.iranNight, href: "article.html" },
    { kicker: "History · Palestine", title: "How British imperialism paved the way for the Nakba", byline: "Khaled Malachi", image: IMG.palestine48, href: "#" },
  ];
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* BIG STORY */}
        <a href="article.html" className="hero-lead">
          <span className="rci-kicker">Analysis · China</span>
          <h1 className="hero-h1 hero-h1--serif">China sets the agenda at the Xi–Trump summit</h1>
          <p className="hero-dek">
            Trump went to Beijing believing he negotiated from strength; in reality, he
            negotiated from weakness. The unipolar hegemony of US imperialism is unravelling
            before our eyes.
          </p>
          <div className="hero-byline">By Daniel Morley · 19 May 2026</div>
          <div className="hero-lead-img">
            <img src={IMG.china} alt="China sets the agenda at the Xi-Trump summit" />
          </div>
        </a>

        {/* TWO SECONDARIES */}
        <div className="hero-secondary">
          {secondaries.map((s, i) => (
            <a key={i} href={s.href} className="hero-sec-card">
              <div className="hero-sec-img"><img src={s.image} alt={s.title} /></div>
              <span className="rci-kicker">{s.kicker}</span>
              <h3 className="hero-sec-title">{s.title}</h3>
              <div className="hero-sec-byline">By {s.byline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace the hero CSS**

Replace the `.hero-grid` rule (lines 224–229) and add the new sub-rules. Drop the old three-column `.hero-left/.hero-center/.hero-featured/.most-read*/.hero-side*/.hero-feat*` rules (they are now unused; remove lines 230–452 of the old hero CSS block). Add:

```css
  .hero { padding: 28px 0 36px; }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.65fr 1fr;
    gap: 36px;
    align-items: start;
  }
  .hero-lead { display: flex; flex-direction: column; gap: 14px; text-decoration: none; color: inherit; }
  .hero-lead .rci-kicker { color: var(--rci-red); }
  .hero-h1--serif {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 52px;
    line-height: 1.0;
    letter-spacing: -0.01em;
    text-transform: none;
    margin: 0;
    color: var(--rci-ink);
    text-wrap: balance;
  }
  .hero-lead:hover .hero-h1--serif { color: var(--rci-red); }
  .hero-dek {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 20px;
    line-height: 1.4;
    color: var(--rci-ink-soft);
    margin: 0;
    max-width: 56ch;
  }
  .hero-byline {
    font-family: var(--font-condensed);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }
  .hero-lead-img {
    width: 100%;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    border: 2px solid var(--rule);
    box-shadow: 6px 6px 0 var(--rule);
    background: var(--rci-ink);
    margin-top: 4px;
  }
  .hero-lead-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .hero-secondary {
    display: flex;
    flex-direction: column;
    gap: 26px;
    border-left: 1px solid var(--rule-soft);
    padding-left: 28px;
  }
  .hero-sec-card { display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; }
  .hero-sec-img {
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border: 2px solid var(--rule);
    box-shadow: 4px 4px 0 var(--rule);
    background: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .hero-sec-card:hover .hero-sec-img { transform: translate(-1px,-1px); box-shadow: 6px 6px 0 var(--rule); }
  .hero-sec-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hero-sec-title {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 22px;
    line-height: 1.12;
    letter-spacing: -0.005em;
    margin: 2px 0 0;
    color: var(--rci-ink);
  }
  .hero-sec-card:hover .hero-sec-title { color: var(--rci-red); }
  .hero-sec-byline {
    font-family: var(--font-condensed);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--rci-ash);
  }
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero-secondary { border-left: 0; padding-left: 0; }
  }
```

- [ ] **Step 3: Build + verify**

```bash
npm run build
```
Reload preview, `preview_screenshot`.
Expected: big Cormorant headline + italic dek + 3:2 lead image on the left with an ink stamp shadow; two stacked secondary cards on the right behind a hairline divider. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): hero as big story + two secondaries

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: "Latest" — horizontal snap-scroller of the 10 most recent

**Files:**
- Modify: `app.jsx` — replace `LatestAnalysisGrid` (lines 450–471) with a `LatestScroller`; rename the call site in `App`.
- Modify: `index.html` `<style>` — add `.latest-scroller*` rules; keep `.latest-card*` for reuse.

Wireframe: a row labelled **"Latest"** that is **horizontally scrollable** and shows the **10 most recent** pieces of analysis/theory as small cards (image + coloured kicker + headline). "Underlined = clickable."

- [ ] **Step 1: Replace `LatestAnalysisGrid` with `LatestScroller`**

```jsx
// Section-ink rotation for the Latest rail kickers (one ink each, red leads)
const LATEST_INKS = ["", "blue", "ochre", "green"];

function LatestScroller() {
  const items = LATEST_ANALYSIS.slice(0, 10);
  return (
    <section className="latest">
      <div className="rci-section-head">
        <h2>Latest</h2>
        <a href="index.html">10 most recent &rarr;</a>
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
```

- [ ] **Step 2: Add scroller CSS**

```css
  .latest { padding: 8px 0 28px; }
  .latest-scroller {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 248px;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 14px;
    scroll-snap-type: x mandatory;
  }
  .latest-scroller > * { scroll-snap-align: start; }
  .latest-scroller::-webkit-scrollbar { height: 8px; }
  .latest-scroller::-webkit-scrollbar-thumb { background: var(--rci-hairline-2); }
  .latest-scard { display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; }
  .latest-scard-img {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    border: 1.5px solid var(--rule);
    background: var(--rci-ink);
  }
  .latest-scard-title {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 18px;
    line-height: 1.16;
    letter-spacing: -0.005em;
    margin: 0;
    color: var(--rci-ink);
    text-decoration: underline;
    text-decoration-color: var(--rci-hairline-2);
    text-underline-offset: 3px;
  }
  .latest-scard:hover .latest-scard-title { color: var(--rci-red); text-decoration-color: var(--rci-red); }
```

- [ ] **Step 3: Swap the call site in `App`**

In `App`, replace `<LatestAnalysisGrid tweaks={T} />` with `<LatestScroller />`. (The 4×3 grid is retired; `LATEST_ANALYSIS` data is kept and reused here and in Task 12.)

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`. Then `preview_eval` a horizontal scroll on `.latest-scroller` (`document.querySelector('.latest-scroller').scrollLeft = 600`) and screenshot again.
Expected: a "Latest" section head over a thick ink rule; a single row of 10 cards that scrolls horizontally; kickers cycle red→blue→ochre→green; titles underlined. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): Latest horizontal scroller of 10 most recent

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: "Trump 2.0 / Orange Man Bad" feature block

**Files:**
- Create component in `app.jsx` — `Trump2`.
- Add `.trump2*` CSS in `index.html`.
- Insert `<Trump2 />` in `App` after `<LatestScroller />`.

Wireframe: a titled **"Trump 2.0"** block — left: a feature image with the big display title **"Orange Man Bad"**; right: three stacked article links ("Article blah blah" ×3).

- [ ] **Step 1: Add the `Trump2` component**

```jsx
function Trump2() {
  const links = [
    { title: "Tariffs and the unravelling of the world order", byline: "John Peterson", href: "#" },
    { title: "ICE raids and the radicalisation of a generation", byline: "Antonio Balmer", href: "#" },
    { title: "Why the Democrats cannot stop Trump", byline: "Tom Trottier", href: "#" },
  ];
  return (
    <section className="trump2">
      <div className="rci-section-head">
        <h2>Trump 2.0</h2>
        <a href="index.html">All coverage &rarr;</a>
      </div>
      <div className="trump2-grid">
        <a href="article.html" className="trump2-feature">
          <div className="trump2-img"><img src={IMG.trumpHead} alt="Donald Trump" /></div>
          <h3 className="trump2-title">Orange Man Bad</h3>
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
```

- [ ] **Step 2: Add `.trump2*` CSS**

```css
  .trump2 { padding: 14px 0 28px; }
  .trump2-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 36px; align-items: start; }
  .trump2-feature { display: block; text-decoration: none; color: inherit; position: relative; }
  .trump2-img {
    width: 100%; aspect-ratio: 16/10; overflow: hidden;
    border: 2px solid var(--rule); box-shadow: 6px 6px 0 var(--rule); background: var(--rci-ink);
  }
  .trump2-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
  .trump2-title {
    font-family: var(--font-display);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 56px;
    line-height: 0.92;
    letter-spacing: 0.01em;
    margin: 16px 0 0;
    color: var(--rci-ink);
  }
  .trump2-feature:hover .trump2-title { color: var(--rci-red); }
  .trump2-links { display: flex; flex-direction: column; }
  .trump2-link {
    display: flex; flex-direction: column; gap: 5px;
    padding: 16px 0; border-top: 1px solid var(--rule-soft);
    text-decoration: none; color: inherit;
  }
  .trump2-link:first-child { border-top: 0; padding-top: 0; }
  .trump2-link-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 21px;
    line-height: 1.15; letter-spacing: -0.005em; margin: 0; color: var(--rci-ink);
  }
  .trump2-link:hover .trump2-link-title { color: var(--rci-red); }
  .trump2-link-byline {
    font-family: var(--font-condensed); font-size: 12px; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--rci-ash);
  }
  @media (max-width: 900px) { .trump2-grid { grid-template-columns: 1fr; } .trump2-title { font-size: 42px; } }
```

- [ ] **Step 3: Insert in `App`**

After `<LatestScroller />` add `<Trump2 />`.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: "Trump 2.0" section head; left feature image with "ORANGE MAN BAD" in Built Titling caps; three serif article links on the right separated by hairlines. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): add Trump 2.0 feature block

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Re-skin the Ehsan Ali Campaign Banner

**Files:**
- Modify: `index.html` `<style>` — `.campaign*` rules already exist; verify they read warm. No structural change.
- Modify: `app.jsx` — `CampaignBanner` keep; ensure `SectionHead` label reads "Campaign".

The existing `CampaignBanner` already renders the Ehsan Ali card (image + Built Titling H2 + body + pull-quote + buttons). It maps cleanly to the wireframe's "Ehsan Ali Campaign Banner".

- [ ] **Step 1: Confirm warm rendering**

`CampaignBanner` uses `SectionHead`, `.campaign-card`, `.campaign-h2` (Built Titling — correct display moment). Tokens now resolve warm. No code change required beyond confirming `SectionHead label="Campaign"` (it currently says "Campaigns" — change to "Campaign" to match the wireframe singular, optional).

- [ ] **Step 2: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot` the campaign section.
Expected: bordered ink-shadow card, photo left, Built Titling headline + serif body + red pull-quote + red/paper buttons, all on warm paper. No console errors.

- [ ] **Step 3: Commit (only if changed)**

```bash
git add app.jsx
git commit -m "chore(home): campaign banner label tweak

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 10: "Against the Stream" dark media slab with YouTube embed

**Files:**
- Create component in `app.jsx` — `AgainstTheStream`.
- Add `.ats*` CSS in `index.html`.
- Insert in `App` after `<CampaignBanner />`.

Wireframe: a dark slab with the **"AGAINST THE STREAM"** logo, **"Latest Episode: …"** label, a large **YouTube embed**, and a row of **streaming-platform** buttons.

- [ ] **Step 1: Add the `AgainstTheStream` component**

```jsx
function AgainstTheStream() {
  const platforms = ["YouTube", "Spotify", "Apple", "RSS"];
  return (
    <section className="ats rci-slab">
      <div className="ats-inner">
        <div className="ats-side">
          <img src={R("imgATS", "assets/ATS.webp")} alt="Against the Stream" className="ats-logo" />
          <div className="ats-eyebrow">Latest episode</div>
          <h2 className="ats-title">Capitalism is ungovernable</h2>
          <div className="ats-platforms">
            {platforms.map((p) => (
              <a key={p} href="media.html" className="ats-platform">{p}</a>
            ))}
          </div>
        </div>
        <a href="media.html" className="ats-video" aria-label="Watch the latest episode">
          <span className="ats-play">&#9654;</span>
        </a>
      </div>
    </section>
  );
}
```

(We use a click-through poster rather than a live `<iframe>` to keep the offline preview clean; swap in a real `<iframe src="https://www.youtube.com/embed/…">` inside `.ats-video` when a video id is available.)

- [ ] **Step 2: Add `.ats*` CSS**

```css
  .ats { margin: 36px 0; }
  .ats-inner {
    max-width: 1320px; margin: 0 auto; padding: 30px 28px;
    display: grid; grid-template-columns: 340px 1fr; gap: 32px; align-items: center;
  }
  .ats-logo { width: 200px; height: auto; display: block; margin-bottom: 16px; }
  .ats-eyebrow {
    font-family: var(--font-condensed); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.18em; font-size: 12px; color: var(--rci-red-hot);
  }
  .ats-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 30px; line-height: 1.05;
    color: var(--rci-paper); margin: 8px 0 18px;
  }
  .ats-platforms { display: flex; gap: 10px; flex-wrap: wrap; }
  .ats-platform {
    font-family: var(--font-condensed); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 11px; padding: 8px 12px;
    border: 2px solid var(--rci-red); color: var(--rci-paper); text-decoration: none;
  }
  .ats-platform:hover { background: var(--rci-red); }
  .ats-video {
    aspect-ratio: 16/9; border: 2px solid var(--rci-red); background: #16120f;
    display: grid; place-items: center; text-decoration: none;
  }
  .ats-play {
    width: 64px; height: 64px; background: rgba(212,20,15,.92);
    border: 2px solid var(--rci-paper); display: grid; place-items: center;
    color: #fff; font-size: 24px;
  }
  @media (max-width: 900px) { .ats-inner { grid-template-columns: 1fr; } }
```

(`.rci-slab` from `rci-web.css` supplies the ink ground + screened scratch texture and forces children above it via `> * { z-index: 2 }`.)

- [ ] **Step 3: Add the `imgATS` entry to `IMG`**

In the `IMG` map (lines 21–51), add: `ats: R("imgATS", "assets/ATS.webp"),` (or reference directly as written in Step 1; keep consistent — use the inline `R(...)` shown).

- [ ] **Step 4: Insert in `App`**

After `<CampaignBanner tweaks={T} />` add `<AgainstTheStream />`.

- [ ] **Step 5: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: a full-bleed dark slab with faint scratch texture; ATS logo + red "Latest episode" eyebrow + serif title + four red-outline platform chips on the left; a 16:9 video panel with a red play button on the right. No console errors.

- [ ] **Step 6: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): Against the Stream media slab

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 11: Feature pair (two highlighted articles, gradient-for-legibility)

**Files:**
- Create component in `app.jsx` — `FeaturePair`.
- Add `.feat-pair*` CSS in `index.html`.
- Insert in `App` after `<AgainstTheStream />`.

Wireframe: two side-by-side feature blocks, each an image with a **black gradient at the bottom** so overlaid white text stays legible ("Some article we want to highlight", "Another article we want to highlight").

- [ ] **Step 1: Add the `FeaturePair` component**

```jsx
function FeaturePair() {
  const feats = [
    { kicker: "Theory", title: "Why Marxism is more relevant than ever", image: IMG.marx, href: "theory.html" },
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
```

- [ ] **Step 2: Add `.feat*` CSS**

```css
  .feat-pair-sec { padding: 8px 0 30px; }
  .feat-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
  .feat-card {
    position: relative; aspect-ratio: 5/4; overflow: hidden;
    border: 2px solid var(--rule); box-shadow: 4px 4px 0 var(--rule);
    display: flex; flex-direction: column; justify-content: flex-end;
    text-decoration: none;
  }
  .feat-bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    filter: contrast(1.05) saturate(0.95);
  }
  .feat-card::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(20,16,13,0.88));
  }
  .feat-body { position: relative; z-index: 2; padding: 26px; }
  .feat-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 30px; line-height: 1.04;
    color: #fff; margin: 8px 0 0;
  }
  @media (max-width: 760px) { .feat-pair { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Insert in `App`**

After `<AgainstTheStream />` add `<FeaturePair />`.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: two 5:4 image cards; each has a bottom-anchored gradient with a coral kicker + white serif headline that remains legible over the photo. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): highlighted feature pair with legibility gradient

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 12: Four-column topic grid

**Files:**
- Modify: `app.jsx` — replace `TopicSplit` (2-col, lines 614–658) with `TopicGrid` (4-col); also retire `EconomyBlock` from `App` (its data folds into the grid).
- Add `.topic-grid*` CSS in `index.html` (can replace the old `.topic-split*` rules).
- Update call sites in `App`.

Wireframe: four columns — **Iran War, Gen Z Revolutions, Artificial Intelligence, Artificial Intelligence** — each a small image + a lead article + two more article links beneath.

- [ ] **Step 1: Add the `TopicGrid` component**

```jsx
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
```

- [ ] **Step 2: Add `.topic-grid*` CSS**

```css
  .topic-grid-sec { padding: 14px 0 30px; }
  .topic-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
  .topic-gcol { display: flex; flex-direction: column; gap: 10px; }
  .topic-glead { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; }
  .topic-gimg {
    position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden;
    border: 1.5px solid var(--rule); background: var(--rci-ink);
  }
  .topic-glead-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 20px; line-height: 1.12;
    letter-spacing: -0.005em; margin: 0; color: var(--rci-ink);
  }
  .topic-glead:hover .topic-glead-title { color: var(--rci-red); }
  .topic-gmore { display: flex; flex-direction: column; }
  .topic-gmore-link {
    font-family: var(--font-serif); font-size: 15px; line-height: 1.25; color: var(--rci-ink-soft);
    padding: 9px 0; border-top: 1px dashed var(--rule-soft); text-decoration: none;
  }
  .topic-gmore-link:hover { color: var(--rci-red); }
  @media (max-width: 980px) { .topic-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .topic-grid { grid-template-columns: 1fr; } }
```

(You may delete the old `.topic-split`, `.topic-col*`, `.topic-row*`, `.topic-title*`, `.topic-byline`, `.topic-more` rules — lines ~1004–1093 — since `TopicSplit` is retired.)

- [ ] **Step 3: Update `App` call sites**

Replace `<TopicSplit tweaks={T} />` with `<TopicGrid />`, and remove `<EconomyBlock tweaks={T} />` (its content is folded into the grid's fourth column). `EconomyBlock` and `TopicSplit` function definitions may be deleted.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: four equal columns; each has a section-ink kicker (red / ochre / blue / green — one per column), a 4:3 lead image + serif lead title, and two dashed-separated follow-on links. No console errors. Confirm only one ink per column (spot-ink rule).

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): four-column topic grid (replaces topic-split + economy)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 13: "World School" banner

**Files:**
- Create component in `app.jsx` — `WorldSchoolBanner`.
- Reuse `.rci-banner` (from `rci-web.css`) — no new CSS needed.
- Insert in `App` after `<TopicGrid />`.

Wireframe: a single full-width bordered banner reading **"World School Banner"** (a promo call-out for the RCI World School event).

- [ ] **Step 1: Add the component**

```jsx
function WorldSchoolBanner() {
  return (
    <section style={{ margin: "32px 0" }}>
      <a className="rci-banner" href="join.html">
        <p className="t">RCI World School 2026 — Build the revolutionary party</p>
        <p className="s">One week of theory, debate &amp; struggle · Register now</p>
      </a>
    </section>
  );
}
```

(`.rci-banner` already gives the bordered, ink-stamp-shadow call-out with a serif title `.t` and condensed sub-label `.s`.)

- [ ] **Step 2: Insert in `App`**

After `<TopicGrid />` add `<WorldSchoolBanner />`.

- [ ] **Step 3: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: a centered bordered banner on warm `--rci-paper-card` with a 6px ink stamp shadow, serif headline + condensed caps sub-label. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app.jsx
git commit -m "feat(home): World School banner

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 14: "Marxist University" — Lenin quote band + course-card grid

**Files:**
- Create component in `app.jsx` — `MarxistUniversity`.
- Add `.muni*` CSS in `index.html`.
- Insert in `App` after `<WorldSchoolBanner />`.

Wireframe: a **"Marxist University"** section opening with a Lenin pull-quote ("Without revolutionary theory, there can be no revolutionary movement" — *What Is To Be Done*, 1902) that **links to the book**, followed by a grid of **8 course cards** (Marxism 101, Dialectical Materialism, Fighting Oppression, Science, Marxism vs Anarchism, Fourth International, Deformed Workers' States, …) each with a short blurb.

- [ ] **Step 1: Add the `MarxistUniversity` component**

```jsx
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
      <a href="classics.html" className="muni-quote">
        <p className="muni-quote-text">
          &ldquo;Without revolutionary theory there can be no revolutionary movement.&rdquo;
        </p>
        <p className="muni-quote-cite">— V.I. Lenin, <em>What Is To Be Done?</em> (1902)</p>
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
```

- [ ] **Step 2: Add `.muni*` CSS**

```css
  .muni { padding: 16px 0 30px; }
  .muni-quote {
    display: block; text-align: center; text-decoration: none; color: inherit;
    max-width: 760px; margin: 8px auto 30px;
  }
  .muni-quote-text {
    font-family: var(--font-serif); font-style: italic; font-weight: 500;
    font-size: 30px; line-height: 1.25; color: var(--rci-ink); margin: 0;
  }
  .muni-quote:hover .muni-quote-text { color: var(--rci-red); }
  .muni-quote-cite {
    font-family: var(--font-condensed); text-transform: uppercase; letter-spacing: 0.12em;
    font-size: 12px; color: var(--rci-ash); margin: 12px 0 0;
  }
  .muni-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .muni-card {
    display: flex; flex-direction: column; gap: 8px; padding: 20px 18px;
    background: var(--rci-paper-card); border: 2px solid var(--rule); box-shadow: 4px 4px 0 var(--rule);
    text-decoration: none; color: inherit;
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms;
  }
  .muni-card:hover { transform: translate(-1px,-1px); box-shadow: 6px 6px 0 var(--rule); }
  .muni-card-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 21px; line-height: 1.1;
    letter-spacing: -0.005em; margin: 0; color: var(--rci-ink);
  }
  .muni-card:hover .muni-card-title { color: var(--rci-red); }
  .muni-card-blurb { font-family: var(--font-serif); font-size: 14.5px; line-height: 1.4; color: var(--rci-ink-soft); margin: 0; }
  @media (max-width: 980px) { .muni-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .muni-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Insert in `App`**

After `<WorldSchoolBanner />` add `<MarxistUniversity />`.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: section head "Marxist University"; centered italic Cormorant Lenin quote with citation (clickable); a 4×2 grid of 8 bordered course cards with ink stamp shadows that lift on hover. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): Marxist University quote band + course grid

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 15: "Reports" — featured line + dispatch list

**Files:**
- Modify: `app.jsx` — replace `ManifestoBanner` (the national-sections card, lines 661–696) with `Reports`.
- Add `.reports*` CSS in `index.html` (may reuse/retire `.sections-*`).
- Update call site in `App`.

Wireframe: a **"Reports"** section with a bold featured line **"Belgium grows to 10 million comrades!"**, then a list of dispatch rows (kicker country + "We did something" + arrow), closing with two buttons **"Find your local section →"** and **"All reports →"**.

- [ ] **Step 1: Add the `Reports` component**

```jsx
function Reports() {
  const featured = { country: "Belgium", title: "Belgium grows to 10 million comrades!", href: "#" };
  const rows = [
    { country: "Canada", title: "Third RCP Congress — a party up to the task", href: "#" },
    { country: "Colombia", title: "The founding congress of the Revolutionary Communists of Colombia", href: "#" },
    { country: "Britain", title: "“With our burning fury, we will shake the world awake!”", href: "#" },
  ];
  return (
    <section className="reports">
      <div className="rci-section-head"><h2>Reports</h2><a href="join.html">All reports &rarr;</a></div>
      <a href={featured.href} className="reports-featured">
        <span className="rci-kicker">{featured.country}</span>
        <h3 className="reports-featured-title">{featured.title}</h3>
      </a>
      <ol className="reports-list">
        {rows.map((r, i) => (
          <li key={i}>
            <a href={r.href} className="reports-row">
              <div className="reports-row-text">
                <span className="rci-kicker no-tick">{r.country}</span>
                <span className="reports-row-title">{r.title}</span>
              </div>
              <span className="reports-arrow">&rarr;</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="reports-foot">
        <PrintButton variant="paper" size="md" href="join.html">Find your local section &rarr;</PrintButton>
        <PrintButton variant="paper" size="md" href="#">All reports &rarr;</PrintButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `.reports*` CSS**

```css
  .reports { margin: 36px 0; padding: 22px 0; border-top: 4px solid var(--rule); border-bottom: 4px solid var(--rule); }
  .reports-featured { display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; padding-bottom: 18px; border-bottom: 1px solid var(--rule-soft); margin-bottom: 6px; }
  .reports-featured-title {
    font-family: var(--font-display); font-weight: 700; text-transform: uppercase;
    font-size: 34px; line-height: 0.96; letter-spacing: 0.01em; margin: 0; color: var(--rci-ink);
  }
  .reports-featured:hover .reports-featured-title { color: var(--rci-red); }
  .reports-list { list-style: none; margin: 0; padding: 0; }
  .reports-row {
    display: flex; align-items: center; justify-content: space-between; gap: 18px;
    padding: 18px 0; border-bottom: 1px dashed var(--rule-soft); text-decoration: none; color: inherit;
  }
  .reports-row-text { display: flex; flex-direction: column; gap: 5px; }
  .reports-row-title {
    font-family: var(--font-serif); font-weight: 700; font-size: 21px; line-height: 1.15;
    letter-spacing: -0.005em; color: var(--rci-ink);
  }
  .reports-row:hover .reports-row-title { color: var(--rci-red); }
  .reports-arrow {
    font-family: var(--font-display); font-size: 26px; color: var(--rci-ink);
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), color 90ms;
  }
  .reports-row:hover .reports-arrow { color: var(--rci-red); transform: translateX(4px); }
  .reports-foot { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 18px; }
```

(You may delete the old `.sections-*` rules — lines ~1095–1219 — once `ManifestoBanner` is removed.)

- [ ] **Step 3: Update `App`**

Replace `<ManifestoBanner tweaks={T} />` with `<Reports />`. The `ManifestoBanner` function may be deleted.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: "Reports" head; the Belgium line in Built Titling caps as the featured item; three dispatch rows with red country kickers, serif titles, and arrows that slide on hover; two paper buttons in the footer. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): Reports featured line + dispatch list

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 16: "Join the Fight" agitational band

**Files:**
- Modify: `app.jsx` — `JoinBanner` → restyle/rename to match wireframe (Built Titling "JOIN THE FIGHT", agitational media on the side, JOIN button).
- Modify: `index.html` `<style>` — `.join-*` rules (reuse, adjust heading to display caps).

Wireframe: a band titled **"JOIN THE FIGHT"** with body copy and a **JOIN** button, beside an **agitational video/gif with a black gradient** on the side.

- [ ] **Step 1: Update `JoinBanner` copy + button**

In `JoinBanner` (lines 526–563), set the heading to the wireframe text and the button label to "Join":

```jsx
<h2 className="join-h2">Join the fight</h2>
<p className="join-body">
  The Revolutionary Communist International organises in over 70 countries. From mass
  strikes to student occupations, comrades on every continent are building the party we need.
  History is being made — be part of it.
</p>
<div className="join-actions">
  <PrintButton variant="red" size="lg" href="join.html">Join</PrintButton>
</div>
```

(`.join-h2` is in the Built-Titling display set from Task 3 Step 3, so it renders ALL CAPS — matching "JOIN THE FIGHT".)

- [ ] **Step 2: Add a black gradient over the media side**

The `.join-right` already hosts the globe iframe. Add a left-edge gradient so the join copy stays legible against it. Append to `index.html` `<style>`:

```css
  .join-right::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(90deg, rgba(20,16,13,0.55) 0%, rgba(20,16,13,0) 30%);
    z-index: 2;
  }
```

- [ ] **Step 3: Insert/keep in `App`**

`<JoinBanner />` stays after `<Reports />` (it is already last before `<Footer />` once `ManifestoBanner` is replaced). Confirm order: `… <Reports /> <JoinTheFightOrJoinBanner /> </main>`.

- [ ] **Step 4: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot`.
Expected: ink panel left with "JOIN THE FIGHT" in Built Titling, serif body, red "JOIN" button; the globe/agitational media on the right with a subtle left-edge black gradient. No console errors.

- [ ] **Step 5: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): Join the Fight agitational band

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 17: Footer — manifesto + congress/document tiles

**Files:**
- Modify: `app.jsx` — `Footer` (lines 720–765).
- Add `.foot-docs*` CSS in `index.html`.

Wireframe footer: brand line **"Revolutionary Communist International"**, a large **"Manifesto"** link, and a stack of document tiles (**Congress Report, IdPol Document, Something else**), alongside the existing link columns + colophon.

- [ ] **Step 1: Add a documents block to `Footer`**

Inside `Footer`, after the `foot-cols` block (before `foot-rule`), insert:

```jsx
<div className="foot-docs">
  <a href="#" className="foot-manifesto">Manifesto</a>
  <div className="foot-doc-tiles">
    <a href="#" className="foot-doc-tile">Congress Report</a>
    <a href="#" className="foot-doc-tile">IdPol Document</a>
    <a href="#" className="foot-doc-tile">Something else</a>
  </div>
</div>
```

Update `foot-brand-wm` text from `MARXIST.COM` to `Revolutionary Communist International` and the `foot-brand-tag` to `Workers of the world, unite!`.

- [ ] **Step 2: Add `.foot-docs*` CSS**

```css
  .foot-docs { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; align-items: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--rule); }
  .foot-manifesto {
    font-family: var(--font-display); font-weight: 700; text-transform: uppercase;
    font-size: 48px; line-height: 0.9; color: var(--rci-ink); text-decoration: none;
  }
  .foot-manifesto:hover { color: var(--rci-red); }
  .foot-doc-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .foot-doc-tile {
    font-family: var(--font-condensed); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.1em; font-size: 12px; padding: 18px 14px; text-align: center;
    border: 2px solid var(--rule); box-shadow: 3px 3px 0 var(--rule); background: var(--rci-paper-card);
    color: var(--rci-ink); text-decoration: none;
    transition: transform 90ms cubic-bezier(0.2,0.7,0.1,1), box-shadow 90ms, background 90ms;
  }
  .foot-doc-tile:hover { background: var(--rci-red); color: var(--rci-paper); border-color: var(--rci-red); box-shadow: 3px 3px 0 var(--rci-red); }
  @media (max-width: 760px) { .foot-docs { grid-template-columns: 1fr; } .foot-manifesto { font-size: 38px; } }
```

- [ ] **Step 3: Build + verify**

```bash
npm run build
```
Reload, `preview_screenshot` the footer.
Expected: link columns above; a row with "MANIFESTO" in Built Titling caps beside three pressable document tiles; warm `--rci-paper-deep` footer ground; colophon row at the bottom. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app.jsx index.html
git commit -m "feat(home): footer manifesto + document tiles

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 18: Polish — spot-ink discipline, dead-CSS cleanup, responsive, full-page verification

**Files:**
- Modify: `index.html` `<style>` — delete now-unused rule blocks; final responsive pass.
- Modify: `components.jsx` — lock `ArticleCard` to serif (if still referenced).

- [ ] **Step 1: Enforce one ink per section (spot-ink rule)**

Review each section's kicker ink and ensure no view shows all three spot inks at once and red stays dominant. Target mapping:
- Hero / Latest: red (Latest rail may cycle red→blue→ochre→green across its 10 cards — acceptable as a "contact sheet", but if it reads rainbow, restrict to red + one ink).
- Trump 2.0: red. Campaign: red. Against the Stream: red-hot. Feature pair: coral (over photo). Topic grid: one ink **per column** (red / ochre / blue / green) — this is the intended showcase. Marxist University: red. Reports: red. Join: red-hot.

Confirm via screenshots; adjust any kicker class that violates the rule.

- [ ] **Step 2: Delete dead CSS**

Remove rule blocks for retired components so the stylesheet stays maintainable:
- old hero: `.most-read*`, `.hero-feat*`, `.hero-side*`, `.hero-featured`, `.hero-left`, `.hero-center` (any not reused by Task 6).
- `.idom*` (the IDOM block was dropped from `App`; if `IDOMBlock` is no longer rendered, delete its CSS and the component) — **verify**: `grep -n "IDOMBlock\|four-up\|EconomyBlock\|TopicSplit\|ManifestoBanner\|sections-card\|topic-split" app.jsx`. Delete CSS only for components no longer referenced in `App`.
- `.mast-search*`, `.mast-social*`, `.wm-*`, `.mast-slash`, `.mast-tag` (top bar no longer uses them).

Run after each deletion: `npm run build` (must still succeed) and reload preview to confirm nothing visually broke.

- [ ] **Step 3: Lock `ArticleCard` to serif**

If any section still renders `ArticleCard`, delete the `isSerif`/sans branch in `components.jsx` (lines 98–119) and always use the serif `titleStyle`. If `ArticleCard` is no longer used anywhere (`grep -n "ArticleCard" app.jsx`), leave it as-is (harmless) or remove it. Do not break `components.jsx`'s `Object.assign(window, …)` export list.

- [ ] **Step 4: Responsive pass**

`preview_resize` to 768 and 390 width; `preview_screenshot` at each. Confirm: hero stacks; topic grid → 2-col then 1-col; Marxist University grid → 2 then 1; Against the Stream stacks; footer docs stack; mega-menu categories wrap. Fix any overflow (the page declares a fixed `width=1280` viewport, so mobile is best-effort — ensure no horizontal scrollbars at ≥768).

- [ ] **Step 5: Full-page verification screenshot**

`preview_eval` `window.scrollTo(0,0)`, then capture a full-page `preview_screenshot` at width 1280. Walk the section order top→bottom and confirm it matches the wireframe: Header → Hero → Latest → Trump 2.0 → Campaign → Against the Stream → Feature pair → Topic grid → World School → Marxist University → Reports → Join the Fight → Footer. Check `preview_console_logs` and `preview_network` for any failed font/texture/image requests (expect zero 404s).

- [ ] **Step 6: Final commit**

```bash
git add index.html components.jsx app.jsx
git commit -m "polish(home): spot-ink discipline, dead-CSS cleanup, responsive pass

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**1. Spec coverage (wireframe → task):**
- Header (brand, Language, Join Us, nav) → Task 5 ✓
- Mega-menu (close, left rail, search, columns incl. Marxist University + Media) → Task 5 ✓
- Hero big story + 2 secondaries → Task 6 ✓
- Latest horizontal scroller (10 recent) → Task 7 ✓
- Trump 2.0 / Orange Man Bad + 3 links → Task 8 ✓
- Ehsan Ali Campaign Banner → Task 9 ✓
- Against the Stream (embed + platforms) → Task 10 ✓
- Feature pair (gradient) → Task 11 ✓
- 4-col topic grid → Task 12 ✓
- World School banner → Task 13 ✓
- Marxist University (Lenin quote + courses) → Task 14 ✓
- Reports (Belgium + dispatches + buttons) → Task 15 ✓
- Join the Fight → Task 16 ✓
- Footer (Manifesto + Congress/IdPol/Something else) → Task 17 ✓
- Design-system look (warm paper, grain, Cormorant/Cheltenham/Built Titling, ink shadows, spot inks) → Tasks 1–4 + 18 ✓

**2. Placeholder scan:** No "TBD/implement later". Every code step contains complete JSX/CSS. New-content copy is concrete (decision: reuse real data + realistic placeholder). The YouTube embed is intentionally a poster click-through with a documented swap-in point — not a placeholder gap.

**3. Type/name consistency:** Component names used in `App` match their definitions (`Hero`, `LatestScroller`, `Trump2`, `CampaignBanner`, `AgainstTheStream`, `FeaturePair`, `TopicGrid`, `WorldSchoolBanner`, `MarxistUniversity`, `Reports`, `JoinBanner`, `Footer`). Token names introduced in Task 3 (`--font-serif`, `--font-display`, `--font-condensed`, `--rci-*`) are the ones referenced by every later CSS block. `rci-section-head`, `rci-kicker`, `rci-banner`, `rci-slab` come from `rci-web.css` (linked in Task 3). `PhotoOrSlab`, `PrintButton`, `IMG`, `LATEST_ANALYSIS`, `R(...)` already exist in `app.jsx`/`components.jsx` and are reused.

**Open risk to watch during execution:** linking `rci-web.css` after `colors_and_type.css` means `rci-web.css`'s `body` font/background and `body::before` grain win — verify at Task 4 that the grain (z-index 9999, pointer-events none) does not visually wash out content; if too strong, lower the `body::before` opacity in `rci-web.css` (README says 0.06–0.20 range).
