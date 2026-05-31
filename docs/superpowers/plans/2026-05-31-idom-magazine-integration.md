# IDOM Magazine Page Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the standalone `IDOM Site Page Marxist/` folder into a real `magazine.html` page of the marxist.com draft site, with the site's dark-themed header/nav/footer replacing the placeholders, reachable from every MAGAZINE entry point.

**Architecture:** One consolidated `magazine.jsx` + `magazine.html` following the existing per-page convention (mirrors `media.jsx`/`media.html`). The site `Masthead`/`Nav`/`Footer` render outside a `.idom-app` wrapper that holds the preserved IDOM body; `<body data-mode="dark">` forces the dark chrome. The two CSS token systems are kept from colliding by scoping the IDOM `:root` tokens to `.idom-app` (brand `:root` stays authoritative for the chrome).

**Tech Stack:** Vanilla React 18 UMD + Babel (compiled by `build.js`), plain CSS with custom-property design tokens, lucide icons (CDN) for the IDOM body. No test framework — verification is `node build.js` + browser preview.

**Spec:** `docs/superpowers/specs/2026-05-31-idom-magazine-integration-design.md`

**Git:** Commit each task **directly on `main`** (project preference — no feature branches).

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `ds/magazine-base.css` | IDOM design tokens + `@font-face` + base type rules (was IDOM `colors_and_type.css`) | Create (move + edit) |
| `ds/magazine.css` | IDOM page layout/components (was IDOM `idom-styles.css`) | Create (move + edit) |
| `ds/fonts/CodecCold-*.otf`, `Vollkorn-*.ttf`, `BebasNeue-Regular.otf`, `Anton.ttf` | IDOM font files | Create (move) |
| `uploads/*` (28 IDOM files) | Magazine cover + hero images | Create (move/merge) |
| `magazine.jsx` | The page module: site chrome (`Masthead`/`Nav`/`Footer`) + IDOM body (`IdNav`/`Hero`/`Latest`/`Archive`/`Subscribe`) + data + `App` | Create |
| `magazine.html` | Page shell: brand CSS + chrome `<style>` + IDOM CSS + React/Babel/lucide + scripts; `<body data-mode="dark">` | Create |
| `build.js` | Add `magazine.jsx`/`magazine.html` to the build | Modify |
| `app.jsx`, `join.jsx`, `media.jsx`, `article.jsx` | Wire MAGAZINE entry points (nav tab, drawer, footer; card buttons in `app.jsx`) | Modify |
| `IDOM Site Page Marxist/` | Original folder | Delete (final cleanup) |

---

## Task 1: Move IDOM assets into the repo

**Files:**
- Move: `IDOM Site Page Marxist/uploads/*` → `uploads/`
- Move: `IDOM Site Page Marxist/fonts/*` → `ds/fonts/`
- Move: `IDOM Site Page Marxist/colors_and_type.css` → `ds/magazine-base.css`
- Move: `IDOM Site Page Marxist/idom-styles.css` → `ds/magazine.css`

> Verified beforehand: there are **no filename collisions** between `uploads/` and the IDOM uploads. The IDOM `.jsx`/`.html`/`idom-data.js` stay in place for now (Task 3 reads them); they are removed in Task 8.

- [ ] **Step 1: Move the image uploads (merge), fonts, and the two CSS files**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
SRC="IDOM Site Page Marxist"
# images (filenames may contain spaces — the glob handles them)
mv "$SRC"/uploads/* uploads/
# fonts
mv "$SRC"/fonts/* ds/fonts/
# CSS, renamed to avoid confusion with the shared ds/colors_and_type.css
mv "$SRC/colors_and_type.css" ds/magazine-base.css
mv "$SRC/idom-styles.css"     ds/magazine.css
```

- [ ] **Step 2: Verify the moves landed**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
ls ds/magazine-base.css ds/magazine.css
ls ds/fonts/CodecCold-Bold.otf ds/fonts/Vollkorn-VariableFont_wght.ttf ds/fonts/BebasNeue-Regular.otf ds/fonts/Anton.ttf
ls "uploads/IDOM_53.jpg" "uploads/1.jpeg" "uploads/2.png" "uploads/magazines spread.png"
```
Expected: every path lists without error.

- [ ] **Step 3: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add ds/magazine-base.css ds/magazine.css ds/fonts/ uploads/
git commit -m "feat(magazine): move IDOM assets (css, fonts, uploads) into repo

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Scope IDOM CSS so it can't clobber the chrome

The IDOM token system collides with the brand system on `--font-display`, `--font-serif`, `--font-condensed`, `--bg`, `--paper`, `--accent`, `--border`. Scoping the IDOM `:root` block to `.idom-app` confines all IDOM tokens to the magazine body. The only global rule that references IDOM-only tokens (`--black`, `--fg-1`) is `body{}` in `ds/magazine.css`; it gets split so the chrome (outside `.idom-app`) is unaffected.

**Files:**
- Modify: `ds/magazine-base.css` (the `:root` token block — first line is `:root{` near the top of the token section)
- Modify: `ds/magazine.css:4-8` (the `body{}` rule)

- [ ] **Step 1: Scope the IDOM token block to `.idom-app`**

In `ds/magazine-base.css`, change the token block opener. Replace:

```css
:root{
  /* ---------- TYPE FAMILIES ---------- */
```
with:
```css
.idom-app{
  /* ---------- TYPE FAMILIES ---------- */
```

(Leave the global `h1,h2,h3,p` element rules below it untouched — the chrome uses no bare `h1/h2/h3/p`, and inside `.idom-app` those rules resolve the now-scoped tokens correctly.)

- [ ] **Step 2: Split the global `body{}` rule in `ds/magazine.css`**

Replace lines 4-8:

```css
body{
  margin:0;background:var(--black);color:var(--fg-1);
  font-family:var(--font-serif);
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
```
with:
```css
body{
  margin:0;background:#000;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
body[data-mode="dark"]{ background:#000; }
.idom-app{
  background:var(--black);color:var(--fg-1);
  font-family:var(--font-serif);
}
.mag-chrome{ max-width:1320px; margin:0 auto; padding:0 28px; }
```

(`--black`/`--fg-1`/`--font-serif` resolve on `.idom-app` because the tokens are now defined there. `body[data-mode="dark"]{background:#000}` overrides the chrome's dark page-bg for a continuous black. `.mag-chrome` is the centered wrapper for the site chrome — used in Task 3.)

- [ ] **Step 3: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add ds/magazine-base.css ds/magazine.css
git commit -m "feat(magazine): scope IDOM tokens to .idom-app, add chrome wrapper

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Create `magazine.jsx` (consolidated page module)

Assemble one file from new glue code + verbatim copies of existing, working components. **Copy the referenced line ranges exactly as-is** — do not rewrite them.

**Files:**
- Create: `magazine.jsx`
- Read (sources, copy-from): `media.jsx`, `IDOM Site Page Marxist/Nav.jsx`, `IDOM Site Page Marxist/Hero.jsx`, `IDOM Site Page Marxist/Sections.jsx`, `IDOM Site Page Marxist/idom-data.js`

- [ ] **Step 1: Create `magazine.jsx` with the header glue**

Start the file with the helpers, nav tabs (Magazine self-link), and the inlined IDOM data:

```jsx
// Marxist.com — In Defence of Marxism (Magazine) page
// Standalone sibling to app.jsx / media.jsx. Loaded by magazine.html.
// Site chrome (Masthead/Nav/Footer) wraps the preserved IDOM body (.idom-app).
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (mirror homepage; Magazine is this page) ─────────────────
const NAV_TABS = [
  { label: "Analysis", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine", href: "magazine.html" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];
```

- [ ] **Step 2: Inline the IDOM page data**

Copy the entire object literal from `IDOM Site Page Marxist/idom-data.js` lines **2-102** (the `window.IDOM_PAGE = { … };` assignment) and paste it next in `magazine.jsx`, unchanged. The IDOM components read `window.IDOM_PAGE`, so keeping the `window.` assignment means their bodies need no edits.

- [ ] **Step 3: Copy the site chrome components from `media.jsx`**

Append, verbatim:
- `Masthead` — `media.jsx` lines **146-388**
- `Nav` — `media.jsx` lines **389-416** (signature is `function Nav({ active })`, marks the active tab)
- `Footer` — `media.jsx` lines **417-463**

- [ ] **Step 4: Point the drawer's "In Defence of Marxism" item at this page**

Inside the just-copied `Masthead`, the menu-drawer sidebar item for IDOM still has `href="#"`. Replace:

```jsx
<a href="#" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
```
with:
```jsx
<a href="magazine.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
```
(There is exactly one `drawer-sidebar-item` with `href="#"` — the IDOM one — so this match is unique.)

- [ ] **Step 5: Copy the IDOM body components**

Append, verbatim (these reference `window.IDOM_PAGE`, lucide `<i data-lucide>`, and `React.*` hooks — all available):
- `IdNav` — `IDOM Site Page Marxist/Nav.jsx` lines **22-75** (the `IdNav` function only — **do not** copy `GBar` at lines 2-20, nor the `window.GBar/window.IdNav` exports at 77-78)
- `Hero` — `IDOM Site Page Marxist/Hero.jsx` lines **5-101** (the `Hero` function only; skip the `window.Hero` export at 102)
- `Latest`, `Archive`, `Subscribe` — `IDOM Site Page Marxist/Sections.jsx` lines **2-150** (these three functions only — **do not** copy `PageFooter` at 152-179 nor the `window.*` exports at 181-184)

- [ ] **Step 6: Add the `App` and render**

Append the new app shell. The site chrome sits in centered `.mag-chrome` wrappers; the IDOM body is full-bleed inside `.idom-app`; lucide icons are (re)rendered via the effect:

```jsx
// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  // Force dark theme for the chrome
  useEffect(() => { document.body.dataset.mode = "dark"; }, []);

  // Render lucide icons in the IDOM body, and re-render as the DOM changes
  useEffect(() => {
    const render = () => window.lucide && window.lucide.createIcons();
    render();
    const obs = new MutationObserver(render);
    obs.observe(document.getElementById("root"), { childList: true, subtree: true });
    return () => obs.disconnect();
  });

  return (
    <React.Fragment>
      <div className="mag-chrome">
        <Masthead />
        <Nav active="Magazine" />
      </div>
      <div className="idom-app">
        <IdNav />
        <Hero />
        <Latest />
        <Archive />
        <Subscribe />
      </div>
      <div className="mag-chrome">
        <Footer />
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- [ ] **Step 7: Sanity-check the file compiles**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
node -e "require('@babel/core').transformFileSync('magazine.jsx',{presets:['@babel/preset-react']}); console.log('magazine.jsx OK')"
```
Expected: `magazine.jsx OK` (no Babel syntax error).

- [ ] **Step 8: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add magazine.jsx
git commit -m "feat(magazine): add consolidated magazine.jsx (site chrome + IDOM body)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Create `magazine.html`

Mirror `media.html`, but add the IDOM stylesheets + lucide, force dark mode, and load `magazine.jsx`.

**Files:**
- Create: `magazine.html`
- Read (source): `media.html`

- [ ] **Step 1: Copy `media.html` to `magazine.html`**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
cp media.html magazine.html
```

This brings along the inline `<style>` chrome rules (masthead / nav / footer / hamburger / drawer, including all `body[data-mode="dark"]` rules) for free. The media-specific rules (`.podcast*`, `.episode*`, `.video*`) come too but are harmless dead CSS on this page.

> **Viewport:** `media.html` (like the whole site) uses `<meta name="viewport" content="width=1280">`. Keep it — this is intentional and site-consistent. The IDOM fluid body renders correctly at a 1280 viewport, and the chrome is designed for 1280. (Task 7 confirms the layout; only if the IDOM body looks wrong at 1280 would you switch this page to `width=device-width`.)

- [ ] **Step 2: Set the title**

Replace the `<title>…</title>` line with:

```html
<title>In Defence of Marxism — Marxist.com</title>
```

- [ ] **Step 3: Add the IDOM stylesheets at the end of `<head>` (after the inline chrome `<style>`)**

The IDOM stylesheets must load **after** the inline chrome `<style>` block (which runs to just before `</head>`) so `ds/magazine.css` wins where the two overlap — notably `body[data-mode="dark"]{background:#000}` for a pure-black page. Insert the two links immediately **before** `</head>`:

```html
<link rel="stylesheet" href="ds/magazine-base.css">
<link rel="stylesheet" href="ds/magazine.css">
</head>
```

Resulting `<head>` cascade (first → last): `ds/colors_and_type.css` (brand `:root`, authoritative for the chrome) → inline chrome `<style>` → `ds/magazine-base.css` (IDOM tokens, scoped to `.idom-app`, so no `:root` collision) → `ds/magazine.css` (IDOM layout; its `body[data-mode="dark"]`, `.idom-app`, and `.mag-chrome` rules take effect).

- [ ] **Step 4: Force dark mode on `<body>`**

Replace `<body data-mode="light">` with:

```html
<body data-mode="dark">
```

- [ ] **Step 5: Add the lucide script and swap the page module**

In the script block near the end, the IDOM body needs lucide. After the `@babel/standalone` script line, add:

```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
```

Then replace the page-module script:

```html
<script type="text/babel" src="media.jsx"></script>
```
with:
```html
<script type="text/babel" src="magazine.jsx"></script>
```

(Keep `tweaks-panel.jsx` and `components.jsx` exactly as they are.)

- [ ] **Step 6: Verify the references resolve**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
grep -nE 'magazine\.jsx|magazine-base\.css|ds/magazine\.css|data-mode="dark"|lucide' magazine.html
```
Expected: one line each for `magazine.jsx`, `ds/magazine-base.css`, `ds/magazine.css`, `data-mode="dark"`, and the lucide script.

- [ ] **Step 7: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add magazine.html
git commit -m "feat(magazine): add magazine.html shell (dark chrome + IDOM body + lucide)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Wire `magazine` into `build.js`

**Files:**
- Modify: `build.js:37` (jsxFiles), `build.js:56` (htmlFiles), `build.js:71-72` (script-tag swaps)

- [ ] **Step 1: Add `magazine.jsx` to the compile list**

Replace:
```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx', 'media.jsx'];
```
with:
```js
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx', 'article.jsx', 'media.jsx', 'magazine.jsx'];
```

- [ ] **Step 2: Add `magazine.html` to the HTML list**

Replace:
```js
const htmlFiles = ['index.html', 'join.html', 'article.html', 'media.html'];
```
with:
```js
const htmlFiles = ['index.html', 'join.html', 'article.html', 'media.html', 'magazine.html'];
```

- [ ] **Step 3: Add the script-tag swap for `magazine.jsx`**

After the line that swaps `media.jsx` (build.js:72):
```js
  html = html.replace(/<script type="text\/babel" src="media\.jsx"><\/script>/g, '<script src="media.js"></script>');
```
add:
```js
  html = html.replace(/<script type="text\/babel" src="magazine\.jsx"><\/script>/g, '<script src="magazine.js"></script>');
```
(The lucide CDN `<script>` is left untouched — `build.js` only strips the `@babel/standalone` tag, not lucide.)

- [ ] **Step 4: Run the build**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
node build.js
```
Expected: ends with `Build completed successfully!`, including a `Compiling magazine.jsx to magazine.js...` and `Processing magazine.html for production...` line.

- [ ] **Step 5: Verify the build output**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
ls dist/magazine.html dist/magazine.js dist/ds/magazine-base.css dist/ds/magazine.css dist/uploads/IDOM_53.jpg
grep -c 'magazine.js' dist/magazine.html        # expect 1 (babel jsx tag was swapped)
grep -c 'text/babel'  dist/magazine.html         # expect 2 (tweaks-panel + components still babel)
grep -c 'lucide'      dist/magazine.html         # expect >=1 (lucide kept)
```
Expected: files exist; counts as annotated.

- [ ] **Step 6: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add build.js
git commit -m "build: compile magazine.jsx and process magazine.html

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Wire the MAGAZINE entry points

Point every MAGAZINE link at `magazine.html`. The nav/drawer/footer are duplicated per page, so apply the shared edits in all four.

**Files:**
- Modify: `app.jsx`, `join.jsx`, `media.jsx`, `article.jsx` (nav tab + drawer item + footer link)
- Modify: `app.jsx` (homepage `IDOMBlock` card buttons + TOC links)

- [ ] **Step 1: Nav tab — make "Magazine" link to the page (all four files)**

In each of `app.jsx`, `join.jsx`, `media.jsx`, `article.jsx`, replace:
```jsx
  { label: "Magazine" },
```
with:
```jsx
  { label: "Magazine", href: "magazine.html" },
```

- [ ] **Step 2: Drawer item — point "In Defence of Marxism" at the page (all four files)**

In each file, the drawer sidebar item for IDOM has `href="#"`. Replace:
```jsx
<a href="#" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
```
with:
```jsx
<a href="magazine.html" className="drawer-sidebar-item" onClick={() => setMenuOpen(false)}>
```
(Exactly one `drawer-sidebar-item` per file uses `href="#"`.)

- [ ] **Step 3: Footer link — point "In Defence of Marxism" at the page (all four files)**

In each file, replace:
```jsx
<a href="#">In Defence of Marxism</a>
```
with:
```jsx
<a href="magazine.html">In Defence of Marxism</a>
```

- [ ] **Step 4: Homepage IDOM card — wire the three buttons (`app.jsx`)**

In `app.jsx` `IDOMBlock`, replace:
```jsx
          <PrintButton variant="red" size="sm">Order this issue →</PrintButton>
```
with:
```jsx
          <PrintButton variant="red" size="sm" href="magazine.html#latest">Order this issue →</PrintButton>
```

Replace:
```jsx
          <PrintButton variant="paper" size="sm">Subscribe to the magazine →</PrintButton>
          <PrintButton variant="paper" size="sm">Read past issues</PrintButton>
```
with:
```jsx
          <PrintButton variant="paper" size="sm" href="magazine.html#subscribe">Subscribe to the magazine →</PrintButton>
          <PrintButton variant="paper" size="sm" href="magazine.html#archive">Read past issues</PrintButton>
```

- [ ] **Step 5: Homepage IDOM card — make the TOC titles link to the page (`app.jsx`)**

In `app.jsx` `IDOMBlock`, replace:
```jsx
                <a href="#" className={"idom-toc-title" + (titleFont === "serif" ? " idom-toc-title--serif" : "")}>{f.title}</a>
```
with:
```jsx
                <a href="magazine.html#latest" className={"idom-toc-title" + (titleFont === "serif" ? " idom-toc-title--serif" : "")}>{f.title}</a>
```

- [ ] **Step 6: Rebuild and verify the links**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
node build.js >/dev/null && echo BUILD_OK
grep -c 'magazine.html' dist/app.js     # expect >=6 (nav + drawer + footer + 3 card buttons + toc)
grep -c 'magazine.html' dist/media.js   # expect >=3 (nav + drawer + footer)
grep -c 'magazine.html' dist/join.js dist/article.js
```
Expected: `BUILD_OK`; `app.js` has many; `media.js`/`join.js`/`article.js` each ≥3.

- [ ] **Step 7: Commit**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add app.jsx join.jsx media.jsx article.jsx
git commit -m "feat(magazine): wire MAGAZINE nav/drawer/footer/card links to magazine.html

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Verify in the browser and tune the chrome/hero seam

**Files:**
- Possibly modify: `ds/magazine.css` (IdNav sticky offset / `.hero` top margin) — only if the visual check requires it.

- [ ] **Step 1: Serve the repo and open the page**

Start a static server from the repo root (the source `magazine.html` runs via babel-standalone, no build needed to view):
```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
python3 -m http.server 8000
```
Open `http://localhost:8000/magazine.html`. (When executing this plan inside Claude Code, use the `preview_*` tools instead of opening a browser manually.)

- [ ] **Step 2: Walk the verification checklist**

Confirm each:
1. The **dark site masthead + nav** render at the top (centered, max-width) on a black field; the **Magazine** tab shows active (ink variant).
2. The **search** toggles and the **hamburger drawer** opens/closes; the drawer's "In Defence of Marxism" item links to `magazine.html`.
3. The **IdNav** ("In defence of Marxism" lockup + section links + Subscribe) sits below the site nav; scroll-spy highlights as you scroll; clicking a section jumps to it.
4. The **Wanderer hero** scroll choreography runs (painting pans, white flash → black, particles, spread + intro), with no clipping behind the chrome.
5. **lucide icons** render (cart, book-open, arrow-right, check, globe, search, menu, chevron-down).
6. **Latest / Archive / Subscribe** sections render with correct fonts (Codec Cold display, Vollkorn serif) and the IDOM red.
7. The **site footer** (dark) renders at the bottom — no leftover IDOM `PageFooter`.
8. No console errors (other than any pre-existing `__resources` fallback notices).

Use `preview_console_logs` / `preview_snapshot` / `preview_screenshot` for evidence.

- [ ] **Step 3: Tune the seam only if needed**

If the hero's first frame is clipped or there's an awkward gap where the site nav meets the IdNav, adjust in `ds/magazine.css`:
- `.hero{ … margin-top:-71px }` — the `-71px` assumed `IdNav` was the topmost bar. If the hero top is hidden, set it to `margin-top:0`. If a gap appears, keep the negative value or tune it.
- `.idnav{ position:sticky; top:0 … }` — leave `top:0` so the section nav sticks once the masthead scrolls past. Only change if the sticky overlaps wrongly.

Re-check Step 2 after any change.

- [ ] **Step 4: Capture proof + commit any fixes**

Save a screenshot of the integrated page. If Step 3 changed `ds/magazine.css`:
```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
git add ds/magazine.css
git commit -m "fix(magazine): tune hero/IdNav offset under site chrome

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Remove the original IDOM folder

All needed files have been moved (Task 1) or consolidated (Task 3). Remove the leftover source folder (its `shots/`, `.thumbnail`, `.DS_Store`, the original `.jsx`/`.html`/`idom-data.js`, and now-empty `uploads/`/`fonts/`).

**Files:**
- Delete: `IDOM Site Page Marxist/`

- [ ] **Step 1: Confirm nothing in the repo still references the folder**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
grep -rn "IDOM Site Page Marxist" --include="*.js" --include="*.jsx" --include="*.html" --include="*.css" . | grep -v node_modules | grep -v dist/
```
Expected: no output.

- [ ] **Step 2: Confirm the originals carried no unique uploads still referenced**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
ls "IDOM Site Page Marxist/uploads" 2>/dev/null && echo "still has files" || echo "uploads already emptied"
```
Expected: `uploads already emptied` (Task 1 moved them all).

- [ ] **Step 3: Delete the folder**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
rm -rf "IDOM Site Page Marxist"
ls -d "IDOM Site Page Marxist" 2>/dev/null || echo "removed"
```
Expected: `removed`. (The folder is untracked, so no commit is required for its deletion. The moved files were already committed in Tasks 1–3.)

- [ ] **Step 4: Final build sanity check**

```bash
cd /Users/sebastian/Documents/GitHub/marxistcom_draft
node build.js >/dev/null && echo BUILD_OK && ls dist/magazine.html
git status --short
```
Expected: `BUILD_OK`, `dist/magazine.html` present, and a clean (or only `dist/`-related, if untracked) `git status`.

---

## Self-Review

**Spec coverage:**
- Move files / integrate into build → Tasks 1, 5, 8 ✔
- Consolidate into `magazine.jsx` + `magazine.html` (per convention) → Tasks 3, 4 ✔
- Replace placeholder header (`GBar`) + footer (`PageFooter`) with site `Masthead`/`Nav`/`Footer` → Task 3 (GBar/PageFooter not copied; site chrome added) ✔
- Force dark/black theme on the chrome → `data-mode="dark"` in `magazine.html` (Task 4) + `App` effect + `body[data-mode="dark"]{background:#000}` (Tasks 2/3) ✔
- Keep IDOM body design as-is → verbatim component copies (Task 3) ✔
- Keep IdNav as in-page section nav → copied + Task 7 tuning ✔
- CSS token isolation (no clobbering) → Task 2 (`:root`→`.idom-app`, body split) ✔
- Wire all entry points (nav, drawer, card buttons, footer) → Task 6 ✔
- Build wiring → Task 5 ✔
- Verification (build + browser, screenshot) → Tasks 5, 6, 7 ✔
- Risks: uploads collisions (checked: none), font paths (`ds/` relative `url("fonts/…")` resolves to `ds/fonts/`), hero offset (Task 7), lucide in prod (Task 5 Step 5) ✔

**Placeholder scan:** No "TBD"/"handle edge cases"/"similar to Task N". Verbatim copies use exact file + line ranges. New code is shown in full.

**Type/name consistency:** `Masthead`/`Nav`/`Footer`/`IdNav`/`Hero`/`Latest`/`Archive`/`Subscribe`/`App` names match across Tasks 3–6; `Nav` is invoked as `<Nav active="Magazine" />` matching `media.jsx`'s `function Nav({ active })`; `.idom-app` and `.mag-chrome` are defined in Task 2 and consumed in Task 3; `window.IDOM_PAGE` (Task 3 Step 2) matches the `window.IDOM_PAGE` reads in the copied components.
