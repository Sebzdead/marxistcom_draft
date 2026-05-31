# IDOM Magazine Page Integration — Design

- **Date:** 2026-05-31
- **Status:** Approved (ready for implementation plan)
- **Author:** Sebastian W (with Claude)

## Context

The `IDOM Site Page Marxist/` folder contains a finished, self-contained landing
page for *In Defence of Marxism* (IDOM) — the theoretical quarterly of the RCI. It
needs to become a real page of the marxist.com draft site, reachable from the
**MAGAZINE** nav tab, the homepage IDOM card, the menu drawer, and the footer.

The page ships with **placeholder chrome** — a fake "Marxist.com" global bar
(`GBar`) and a placeholder footer (`PageFooter`) — that must be replaced with the
real site header (menu bar) and footer, forced into the site's **dark/black** theme.

### How the main site is built

- `build.js` cleans `dist/`, recursively copies `ds/`, `assets/`, `uploads/`, then
  Babel-compiles a **fixed list** of root `.jsx` files
  (`tweaks-panel`, `components`, `app`, `join`, `article`, `media`) to `.js`, and
  processes a **fixed list** of `.html` files (`index`, `join`, `article`, `media`),
  swapping `text/babel` jsx `<script>` tags for compiled `.js` and stripping the
  Babel-standalone CDN tag.
- Each page HTML loads `ds/colors_and_type.css` (brand design tokens `--rci-*` +
  brand `@font-face` + brand `--font-*`), then a large **inline `<style>`** block
  (masthead / nav / footer / drawer styling is duplicated per page), then React +
  Babel UMD + the page's `.jsx` + `components.jsx` + `tweaks-panel.jsx`.
- `Masthead`, `Nav`, `Footer` are **redefined in every page jsx** (`app.jsx`,
  `join.jsx`, `media.jsx`, `article.jsx`) — they are *not* shared. Only
  `PrintButton`, `Eyebrow`, `SectionRule`, `ArticleCard`, `SectionHead` are shared
  via `components.jsx` (window globals).
- Dark theme is built-in: `<body data-mode="dark">` activates `body[data-mode="dark"]`
  CSS rules that re-map tokens (`--paper`, `--fg`, …). `media.html`'s inline style
  already contains complete dark-mode rules for masthead, nav, footer, hamburger and
  drawer.

### How the IDOM page is built

- `In Defence of Marxism.html` loads React + Babel + **lucide** (CDN) + `idom-data.js`
  + `Nav.jsx` + `Hero.jsx` + `Sections.jsx` + an inline `App` that renders
  `GBar → IdNav → Hero → Latest → Archive → Subscribe → PageFooter`, all wrapped in
  `<div className="idom-app">`.
- The page is **already fully dark** (`body { background: var(--black) }`, white text).
- It has its **own token system** in `colors_and_type.css` (`--bg`, `--fg-1..4`,
  `--red`/`--red-bright`, `--ink-700..900`, fonts **Codec Cold** / **Vollkorn** /
  **Bebas Neue** / Anton) plus layout in `idom-styles.css`.
- Icons use lucide (`<i data-lucide="…">`), re-rendered via a `MutationObserver` in `App`.
- Hero uses `uploads/1.jpeg`, `uploads/2.png`, `uploads/magazines spread.png`;
  covers use `uploads/IDOM_*.jpg`.

### The collision

Both `ds/colors_and_type.css` and the IDOM `colors_and_type.css` define some of the
**same variable names with different values**: `--font-display`, `--font-serif`,
`--font-condensed`, `--bg`, `--accent`, `--border`, `--paper`. Loading both globally
would clobber one side. The chrome needs the **brand** values; the IDOM body needs the
**IDOM** values.

## Decisions (locked)

1. **Body styling — keep the IDOM design as-is.** Preserve the magazine's existing
   dark art direction, hero choreography, and typography untouched. Only the chrome
   changes. (No reskin to brand fonts.)
2. **Section nav — keep it.** Replace only the fake global bar (`GBar`) with the site
   menu. Retain the sticky `IdNav` ("In defence of Marxism" lockup + scroll-spy
   section links + Subscribe CTA) as an in-page section nav, restyled to sit below
   the site menu.

## Goals

- A real `magazine.html` page wired into `build.js`, reachable from every MAGAZINE
  entry point.
- Site `Masthead` + `Nav` + `Footer` replace the IDOM placeholders, forced dark.
- IDOM body design preserved exactly; the two CSS token systems coexist without
  clobbering each other.

## Non-goals

- Restyling the IDOM body to brand fonts/colors.
- Refactoring the duplicated `Masthead`/`Nav`/`Footer` into a shared module (out of
  scope; the site already duplicates them per page and we follow that convention).
- Making the magazine subscribe/buy buttons functional (they remain `#`/demo as in
  the original).

## Design

### 1. File moves

Move into the repo (exclude throwaway artifacts: `shots/`, `.thumbnail`, `.DS_Store`,
the `<template id="__bundler_thumbnail">`):

| From (`IDOM Site Page Marxist/`)        | To                          | Notes |
|------------------------------------------|-----------------------------|-------|
| `Hero.jsx`, `Sections.jsx`, `Nav.jsx` (IdNav only), inline `App`, `idom-data.js` | **`magazine.jsx`** (repo root) | Consolidated into one page module; IDOM data inlined as a `const`. `GBar`/`PageFooter` dropped. |
| `colors_and_type.css`                    | **`ds/magazine-base.css`**  | IDOM tokens + `@font-face` + base type. Colliding tokens & base `body/h1/h2/p` rules scoped under `.idom-app`. |
| `idom-styles.css`                        | **`ds/magazine.css`**       | IDOM layout. |
| `fonts/*` (Codec Cold, Vollkorn, Bebas Neue, Anton) | **`ds/fonts/`**  | `ds/colors_and_type.css` already uses `url("fonts/…")` (resolved relative to itself → `ds/fonts/`). Since `magazine-base.css` also lives in `ds/`, its `@font-face src: url("fonts/…")` resolves to `ds/fonts/` with **no path edit** beyond moving the files. |
| `uploads/*`                              | **`uploads/`** (merge)      | Check for filename collisions with existing root `uploads/` before copying. |

`ds/` and `uploads/` are already copied wholesale by `build.js`, so the moved CSS,
fonts, and images need no new copy logic.

### 2. `magazine.html` (new, mirrors `media.html`)

```
<head>
  ds/colors_and_type.css            <-- brand tokens + brand fonts (authoritative :root)
  inline <style> chrome block       <-- masthead/nav/footer/drawer (incl. dark rules), copied from media.html
  ds/magazine-base.css              <-- IDOM tokens/fonts (scoped) + base type
  ds/magazine.css                   <-- IDOM layout
  React + ReactDOM + Babel (UMD)
  lucide (CDN)                      <-- required by IDOM body
<body data-mode="dark">             <-- forces dark chrome
  #root
  tweaks-panel.jsx, components.jsx, magazine.jsx
```

Page background set to the IDOM black so chrome (dark mode) and body sit on one
continuous black surface.

### 3. `magazine.jsx` (new, mirrors `media.jsx`)

Contents, top to bottom:
- `const { useState, useEffect, useRef } = React;` + `R()` helper (as in `media.jsx`).
- `NAV_TABS` (same array as other pages, with `Magazine` → `href: "magazine.html"`).
- Inlined `IDOM_PAGE` data (from `idom-data.js`).
- `Masthead`, `Nav`, `Footer` copied from `media.jsx` (the cleanest secondary page).
- `IdNav` (from IDOM `Nav.jsx`), `Hero`, `Latest`, `Archive`, `Subscribe` (from
  IDOM `Hero.jsx` / `Sections.jsx`), unchanged in design.
- `App`:
  ```jsx
  <>
    <Masthead />
    <Nav active="Magazine" />
    <div className="idom-app">
      <IdNav />
      <Hero /> <Latest /> <Archive /> <Subscribe />
    </div>
    <Footer />
  </>
  ```
  plus the lucide `createIcons()` effect + `MutationObserver` from the original App.

The site chrome (`Masthead`/`Nav`/`Footer`) renders **outside** `.idom-app`; the IDOM
content renders **inside** it. This boundary is what makes CSS isolation work.

### 4. Chrome integration (the header/footer task)

- `GBar` and `PageFooter` deleted.
- Site `Masthead` + `Nav` + `Footer` used instead; `Nav` rendered with
  `active="Magazine"` so the tab reads as current (matching how `media.html` marks
  "Podcasts & Media").
- Dark/black forced via `<body data-mode="dark">`; the copied chrome `<style>`
  already carries the `body[data-mode="dark"]` rules for masthead, nav buttons
  (`.pbtn`), search, hamburger, drawer, and footer.

### 5. CSS isolation mechanism

- `ds/colors_and_type.css` loads first and remains the authoritative `:root` for the
  brand tokens the chrome depends on (`--rci-*`, `--font-article-title`,
  `--font-condensed`, …). The chrome's `--page-bg`/`--paper` and their dark-mode
  remaps come from the copied chrome inline `<style>` block, not from
  `ds/colors_and_type.css`.
- **Load order matters:** `ds/magazine-base.css` is loaded *after* the chrome
  `<style>` block, so any IDOM `:root` redefinition would win. That is exactly why the
  colliding IDOM tokens are scoped to `.idom-app` (below) and kept out of `:root`.
- In `ds/magazine-base.css`, the IDOM token declarations that **collide**
  (`--font-display`, `--font-serif`, `--font-condensed`, `--bg`, `--accent`,
  `--border`, `--paper`, …) move from `:root { … }` into **`.idom-app { … }`**, so
  they cascade only to the magazine body, never the chrome. Non-colliding IDOM tokens
  (`--red`, `--ink-700`, `--fg-1`, …) can stay at `:root` harmlessly or move too.
- IDOM base element rules (`body{…}`, `h1/h2/p{…}`) are scoped to `.idom-app …` so
  they don't restyle the chrome's text.
- IDOM `@font-face` (Codec Cold / Vollkorn / Bebas Neue / Anton) stay global (font
  faces don't collide; only the `--font-*` *aliases* did).

### 6. In-page section nav (`IdNav`)

- Kept and restyled to sit **below** the site `Nav` rather than at viewport top.
- Retune `.idnav { position: sticky }` offset and the hero's `margin-top: -71px`
  (which assumed `IdNav` was the topmost 71px bar) so the hero starts cleanly under
  the site chrome. Exact offsets verified in the browser preview.
- Scroll-spy, the "In defence of Marxism" lockup, and the Subscribe CTA are retained.

### 7. Entry-point wiring

Point every MAGAZINE entry at `magazine.html`. Because `NAV_TABS`, the drawer, and
the footer are duplicated per page, update each page that has them:

- **`NAV_TABS` "Magazine"** → `href: "magazine.html"` in `app.jsx`, `join.jsx`,
  `media.jsx`, `article.jsx`.
- **Menu drawer "In Defence of Marxism"** item (`href="#"`) → `magazine.html`
  (in each page whose drawer lists it).
- **Homepage `IDOMBlock`** (`app.jsx`): "Order this issue →", "Subscribe to the
  magazine →", "Read past issues" buttons, the cover, and the TOC title links →
  `magazine.html` (use `#subscribe` / `#archive` anchors where apt).
- **Footer "In Defence of Marxism"** link → `magazine.html` (each page's footer).

### 8. Build wiring

- Add `'magazine.jsx'` to the `jsxFiles` array in `build.js`.
- Add `'magazine.html'` to the `htmlFiles` array, and add the
  `magazine.jsx → magazine.js` script-tag swap (mirroring the existing per-file
  replacements). The lucide CDN tag is left untouched (only the Babel-standalone tag
  is stripped).

## Risks / edge cases

- **`uploads/` filename collisions** between the existing root `uploads/` and the
  IDOM `uploads/` — enumerate and resolve before merging.
- **Font path correctness** — confirm `@font-face src` resolves after moving fonts to
  `ds/fonts/` (match the path style `ds/colors_and_type.css` already uses).
- **Hero offset** — the negative `margin-top` and sticky offsets must be retuned to
  the new chrome height; verify visually that the hero's first frame isn't clipped.
- **lucide in production** — ensure the lucide CDN tag survives `build.js` (it should;
  only the Babel tag is stripped) and icons render in `dist/magazine.html`.
- **Chrome `<style>` extraction** — copy only the masthead/nav/footer/hamburger/drawer
  rules from `media.html`, not its podcast/episode/video-specific rules.

## Verification

Run the dev server and load `magazine.html`:
1. Dark site chrome renders (masthead, nav, footer) on continuous black.
2. "Magazine" nav tab shows active; hamburger drawer opens/closes; search toggles.
3. Wanderer hero scroll choreography runs; lucide icons appear.
4. `IdNav` sits below the site nav; scroll-spy + Subscribe CTA work.
5. Site footer (dark) renders at the bottom; no IDOM `PageFooter` remains.
6. From `index.html`: the MAGAZINE tab, the IDOM card buttons, the drawer item, and
   the footer link all navigate to `magazine.html`.
7. `node build.js` succeeds and `dist/magazine.html` works the same as the source.

Capture a screenshot of the integrated page as proof.
