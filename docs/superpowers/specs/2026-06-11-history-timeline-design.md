# History Page Redesign — A Revolutionary History of the World

**Date:** 2026-06-11
**Files:** `history.jsx`, `history.html`
**Status:** Approved by user (design + mockup reviewed in session)

## Goal

Replace the flat 24-card topic grid on the history page with a single long,
navigable timeline running from the birth of class society to the present.
Users can jump between eras via a sticky rail and filter everything with
search. Existing topics fold into their eras as real links; invented
placeholder articles fill the gaps. Print-materiality design language and
dark mode are preserved. All changes confined to `history.jsx` and
`history.html`.

## Page structure (top to bottom)

1. **Hero** — existing dark ink hero, retitled: eyebrow "Marxist University",
   H1 "A Revolutionary History of the World", epigraph: "The history of all
   hitherto existing society is the history of class struggles."
2. **Sticky era rail** — a slim strip (`position: sticky; top: 0`) containing:
   - 14 era ticks on a continuous top rule: short label per era, click
     smooth-scrolls to the era, current era highlighted red via scrollspy
     (scroll listener, rAF-throttled, last era whose top ≤ ~140px).
   - A compact search input at the right end of the rail.
   - During search, ticks for eras with no matches are dimmed and inert.
3. **Timeline** — one continuous ink spine down the left. Each era chapter:
   numbered node (roman numeral) on the spine, red date-range eyebrow,
   display-type era title, 2–3 serif sentences of intro, optional era image
   plate (existing assets, grain treatment), then article cards in a
   responsive 2-up grid.
4. **Threads Through History** — after the timeline, the four cross-era
   topics (Ireland & Republicanism, British Labour Movement, Class Struggle
   in the USA, Black Struggle) as a compact card grid, since they span many
   eras rather than belonging to one.

## The 14 eras

| # | Era | Dates | Folded-in existing topics | Image |
|---|-----|-------|---------------------------|-------|
| I | The Birth of Class Society | c. 10,000–800 BC | — | — |
| II | Antiquity: Greece & Rome | c. 800 BC–476 AD | Ancient history | Spartacus |
| III | The Middle Ages | 476–1450 | — | — |
| IV | The Enlightenment | c. 1500–1789 | — | — |
| V | The Birth of Capitalism | c. 1500–1800 | — | — |
| VI | The Bourgeois Revolutions | 1642–1848 | English Revolution, French Revolution | Bastille |
| VII | The Age of Imperialism | 1848–1914 | Paris Commune, First International, Second International | Commune |
| VIII | The First World War | 1914–1918 | World War I | WW1 |
| IX | The Age of Proletarian Revolution | 1917–1939 | German Revolution, Third International, Spanish Revolution, Fourth International | Comintern |
| X | The Second World War | 1939–1945 | World War II | Reichstag flag |
| XI | The Post-War Boom | 1945–1974 | Deformed Workers' States, Revolutionary 1968 | Mai 68 |
| XII | The Colonial Revolution | 1945–1979 | Chinese Revolution, Cuban Revolution, Colonial Revolution | Che & Fidel |
| XIII | Crisis & Restoration | 1974–2008 | — | Berlin Wall |
| XIV | The 21st Century | 2008–present | Arab Revolution, Venezuelan Revolution, Perspectives | Arab revolution |

Each era additionally gets 1–3 invented placeholder articles (plausible
titles + one-line deks) so no era is empty. Article cards carry a tag:
**"From the archive"** (red, real marxist.com link) or **"Coming soon"**
(muted, links to `#`).

## Search behaviour

The rail search input filters article entries (title + dek + tag) across all
eras. Eras with no matching articles collapse away entirely; the era intro/
plate is hidden while searching so results stay compact. A global empty
state shows when nothing matches. Clearing the query restores the full
timeline.

## Implementation notes

- New data shape: `ERAS = [{ id, numeral, name, shortLabel, dates, intro,
  image?, articles: [{ title, dek, url, source: "archive" | "stub" }] }]`.
  Threads stay in the existing topic-card shape (`THREADS`).
- Reuse `.theory-hero` and `.theory-card` styles already present in
  history.html; add new CSS for `.era-rail`, `.timeline`, `.era-chapter`,
  `.era-node`, `.era-plate`, `.article-card` with `body[data-mode="dark"]`
  variants keyed off the existing `--rule`/`--paper` variables.
- Scrollspy + smooth scroll via `scrollIntoView({ behavior: "smooth" })`;
  era sections get `scroll-margin-top` clearing the sticky rail height.
- Verify with preview screenshots (light + dark, desktop width), run
  `npm run build`, commit directly to main.
