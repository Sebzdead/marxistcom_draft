# Theory & History Hub — Merged Magazine-Style Landing Page

**Date:** 2026-06-19
**Files:** `theory.jsx`, `theory.html` (new hub) · `theory-curriculum.jsx`, `theory-curriculum.html` (parked) · `build.js`
**Status:** Approved by user (grilled design session, 2026-06-19)

## Goal

Merge the separate Theory and History pages into a single **magazine-style hub**
at `theory.html`, following the new style conventions of the homepage
(`index.html` / `app.jsx`) and the layout in the approved wireframe ("Theory +
History"). The hub showcases the best of both subjects as a curated front-of-
section; it does **not** reproduce the full Three-Pillars curriculum or the
14-era timeline. Those become future "category page" destinations and are
preserved/kept alive in the meantime.

## Decisions (from grilling session)

1. **Role:** Magazine-style hub, not an everything-page. Deep curriculum/timeline
   are demoted to destinations reached via category links / "Explore More".
2. **Fate of deep content:** Parked. The history timeline stays live at
   `history.html`. The theory curriculum is preserved as a live (unlinked) page
   `theory-curriculum.html`. No category/search destinations are rebuilt in this
   task.
3. **Build approach:** Fork `app.jsx` + `index.html` (newest chrome, tokens,
   section components) as the base for the new `theory.jsx` / `theory.html`.
   Component duplication between `app.jsx` and `theory.jsx` is accepted (existing
   repo pattern — every page is a standalone sibling).
4. **Article-feed sourcing:** Use whatever the two source pages contain,
   including the "Coming soon" stubs, but carry the existing honest tag
   treatment ("From the archive" red / "Coming soon" muted) so dead links are
   labelled.
5. **Content architecture:** One **unified tagged pool**. Every theory topic,
   era article and thread carries `tag: "Theory" | "History"`, a real-vs-stub
   flag, and an optional `featured` pin. Hero, Latest rail and category panel all
   slice from this single pool.
6. **In Focus:** Fixed, config-driven editorial spotlight (one `IN_FOCUS`
   object), defaulting to the French Revolution, reusing the homepage `Trump2`
   feature-plus-3-links layout. Static per build (no runtime rotation).
7. **IDOM block:** Include it, sourced from a copy of `IDOM_PAGE.latest` (#53,
   "Latin America: An Unfinished Revolution"). "Get Your Copy" → `magazine.html`.
   WellRed does **not** handle the journal.
8. **Category panel:** Two **blended** Theory/History columns (not split by
   discipline). Theory items link to their real marxist.com URLs; history items
   link to `history.html#era-anchor`. "Explore More →" links to a `search.html`
   placeholder (404 today) with a code TODO for the future pre-filtered search.
9. **WellRed banner:** "Dynamic" = rotates a featured book on each page load from
   a curated `WELLRED_BOOKS` set (copied from `classics.jsx`). Each book links to
   its real `buyUrl`; the banner header links to `https://wellredbooks.co.uk/`.
10. **Section inventory & order** (Marxist University moved above IDOM):
    1. Hero (lead + 2 secondaries)
    2. Latest rail (Theory/History tagged)
    3. In Focus: French Revolution
    4. Marxist University (Lenin quote + course grid, reused from `app.jsx`)
    5. In Defence of Marxism #53
    6. Category panel (blended columns + Explore More)
    7. WellRed Books banner (dynamic)
    8. JoinBanner (site-wide closing CTA)

    Dropped as off-topic for Theory & History: `CampaignBanner`,
    `AgainstTheStream`, `WorldSchoolBanner`, `Reports`, `Trump2`-as-news.
11. **Identity:** Opens straight into the Hero (no separate title band, matching
    the wireframe). Nav active tab = "Theory & History"; `<title>` =
    "Theory & History — marxist.com".

## Content sources

- **Theory** (`theory.jsx`): `THEORY_TOPICS` (~18 topics, each with image + real
  marxist.com URL + desc); `PILLARS` reading lists; `START_HERE`.
- **History** (`history.jsx`): `ERAS` (14, each with 2–3 article cards: a few
  real `source:"archive"`, most `source:"stub"` → `#`); `THREADS` (4 cross-era).
- **IDOM** (`magazine.jsx`): `window.IDOM_PAGE.latest` (#53).
- **WellRed** (`classics.jsx`): `CLASSIC_BOOKS` (title, author, desc, coverType,
  `buyUrl`).

## Data shapes (new, in `theory.jsx`)

```js
// Unified, tagged pool — every entry from theory + history folded together.
const POOL = [
  { tag: "Theory"|"History", kicker, title, dek, image, url,
    real: true|false, featured?: "lead"|"sec"|null }
];

const IN_FOCUS = {
  title: "In Focus: French Revolution",
  feature: { title, image, url, dek },
  links: [ { title, byline, url }, ... ] // 3
};

const LATEST_ISSUE = { /* copied subset of IDOM_PAGE.latest #53 */ };

const CATEGORY_LINKS = [ { label, url, tag } ];  // blended, ~12–16

const WELLRED_BOOKS = [ { title, author, desc, cover, buyUrl } ];
```

## Implementation notes

- Fork chrome (`Masthead`, `Nav`, drawer, `Footer`, design-token CSS) verbatim
  from `app.jsx` / `index.html`; set nav active = "Theory & History".
- Reuse / adapt homepage section components: `Hero`, `LatestScroller`,
  `Trump2` (→ In Focus), `MarxistUniversity`, `JoinBanner`, plus shared
  `components.jsx` (`PrintButton`, `SectionHead`, etc.). New components:
  `IdomBlock`, `CategoryPanel`, `WellRedBanner`.
- `build.js`: add `theory-curriculum.jsx` to the JSX compile list and
  `theory-curriculum.html` to the HTML list; `theory.jsx` / `theory.html` stay
  in the lists.
- Preserve the curriculum: copy current `theory.jsx` → `theory-curriculum.jsx`
  and `theory.html` → `theory-curriculum.html` (update its internal script
  `src` from `theory.jsx` to `theory-curriculum.jsx`) **before** overwriting
  `theory.*`.
- `history.html` left untouched.
- Dark mode: every new component styled via `body[data-mode="dark"]` keyed off
  existing variables.
- Verify with preview screenshots (light + dark, desktop), run `npm run build`,
  commit directly to main per repo convention.
```
