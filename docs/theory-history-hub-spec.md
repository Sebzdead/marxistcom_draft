# Theory & History Hub — Product Spec

Status: pre-design, decisions locked via interview on 2026-07-01
Supersedes: `theory.html`, `history.html` (both retired once this ships; UI pieces may be reused)

## 1. Purpose

A single page that acts as the entry point for all theoretical and historical
content on marxist.com. It must do two jobs at once:

1. **Let a first-time visitor be guided** — arrive with no specific question,
   get oriented, and be channeled toward editorially-important content.
2. **Let a depth-seeker go as deep as they want** — the real corpus (~14,500
   articles) must stay honestly reachable, not hidden behind curation.

The page is designed for the **mature content end-state**, not today's thin
mockup content — layouts should hold up with full-scale real content, even
though most of it doesn't exist yet.

## 2. Primary persona

Design for **"the browser"** first: no specific query, wants to be taught,
needs a clear "start here." The **searcher** (knows exactly what they want)
must never be more than one interaction away, but doesn't drive the dominant
layout.

## 3. Content taxonomy (source: `references/Article count/*.csv`)

Real tagging data across ~14,500 articles, four namespaces:

| Namespace | Entries | Notes |
|---|---|---|
| Theories | 157 | Densest, smallest namespace. Imperialism (1,830), Permanent Revolution, Marxism, Socialism... Few near-empty entries. |
| Events | 313 | Brutal long tail — 60% have <10 articles. Russian Revolution (1,038) down to obscure 3-article events. |
| Figures | 445 | Bimodal — a handful of titans (Trotsky 1,213, Lenin 1,127, Marx 1,024) then many minor names. |
| Topics | 663 | Largest, most consistently populated (all entries have real volume). Austerity, Class Struggle, Strikes... |

**Spine model:**
- **Theory** = its own primary axis, built from the `theories` namespace.
- **History** = the broader "concrete/particular" axis, encompassing Events,
  Figures, and Topics together (not three separate co-equal tabs).

**Curation overrides popularity.** Article count is a scale reference only —
it does not decide what gets featured. Editorial relevance/political
judgment decides (e.g. "Iraq War" has 455 articles but may not be featured
if it's no longer current). The CSVs exist to size the design problem, not
to script the page.

Featured cards are **tag-type-ambivalent**: a card can anchor on an Event, a
Figure, or a Topic — the template doesn't care which, because the whole set
is hand-curated by editors, not derived from the taxonomy automatically.

## 4. Page structure (top to bottom)

1. **Hero** — reuses existing masthead chrome; establishes this as the
   Theory & History hub.
2. **Theory section** — rotating lead carousel + inline expansion (see §5, §7).
3. **History section** — rotating lead carousel + inline expansion, cards
   ambivalent between Event/Figure/Topic anchors (see §5, §7).
4. **Search prompt module** — a real, visible search field placed roughly
   midway down the page: the explicit "didn't find what you were scanning
   for? search here" moment for a visitor who's scrolled past both
   carousels without hitting their topic. Submits into the existing
   `search.html?q=...`.
5. **"Start Here" module** — small, compact section linking out to the
   existing `theory-curriculum.html` (Three Pillars / Marxist University
   ladder). Not restructured into the hub; just a doorway.
6. **From the Archives** — hand-picked evergreen classics (not date-sorted),
   presented as a lighter article list with a one-line "why it still
   matters" blurb per item — no video/podcast/book bundle here.
7. **Magazine cross-promo** — kept as its own section (as in current
   `theory.html`), linking to `magazine.html`.

Dropped from the current page: the standalone **WellRed Books featured
titles block**. Book recommendations now only appear inside the
Theory/History bundles themselves (§5) — a standalone books block is
redundant with that.

## 5. The multimedia bundle (Theory & History card format)

Each featured Theory/History item is a bundle: **one article (required)**
plus up to three optional media slots — **video, podcast, book**.

- **Article is the only mandatory slot.** A bundle with just an article is a
  complete, intentional card — not a degraded state.
- **Missing slots collapse**, they never render as empty placeholders.
  `[Article][Video][Podcast][Book]` → `[Article][Video]` → `[Article]`, and
  each variant should look deliberate at every level.
- Editors only need to guarantee "one good article" per featured item; richer
  bundles happen organically as matching video/podcast/book content exists.

## 6. Lead carousels (Theory section, History section)

- Each section (Theory, History) has its own **rotating lead carousel**,
  independent of the other.
- **3-5 lead bundles** in rotation per section.
- **Auto-advances**, pauses on hover/focus/interaction. Must respect
  `prefers-reduced-motion` (auto-advance disabled entirely for users with
  that OS-level preference set — user-driven arrows/dots still available).
- Below the carousel, a row of **lighter secondary cards** (article + at most
  one media slot) — not full 4-slot bundles — filling out the section.

## 7. Inline "show more" expansion

Each section (Theory, History) has a "Show more →" control that expands
**inline on the same page** — not a navigation to a new page.

- Reveals the **next tier of curated entries** (roughly 20-30 more
  meaningful topics/events per namespace — still real volume, not
  near-empty tail entries) plus a basic text filter control.
- This is *not* the full raw taxonomy (1,578 entries across all four CSVs).
  True exhaustive access (down to 3-article tail entries) is what the real
  `search.html` is for — the inline expansion is "a lot more," not
  "literally everything."

## 8. Destination page (click-through from a bundle)

Clicking into any featured Theory or History item lands on an **extended
`topic.html`**, not a new template:

- Multimedia bundle at the top (same article/video/podcast/book format).
- Filter chips for the cross-cutting facets (by Figure / by Topic / by Era)
  where relevant to that item.
- Full filterable grid of all related articles/books beneath.

One shared template serves both Theory concepts and History
events/figures/topics — no fourth bespoke page type.

## 9. Visual design

Open to revisiting the visual system, not just the page structure — the
design phase may explore departures from the current ink-shadow/2.5D card,
thick-rule, red/ink/offwhite aesthetic (`ds/rci-web.css`,
`ds/colors_and_type.css`), not just a new layout on top of the old skin.

## 10. Explicitly out of scope / deferred

- Rebuilding `search.html` itself.
- A CMS or structured curation data file — for now, curation continues to be
  hand-authored (as the current site already does in JSX); whether that
  needs to become data-driven is a build-phase question, not a layout one.
- Automating "From the Archives" by date — it's fully hand-picked.
- Mobile-specific interaction specs (swipe behavior for carousels, expansion
  behavior at narrow widths) — to be resolved during the design/build phase,
  verified with a live preview per project convention (see `CLAUDE.md`).

## 11. Open risks to watch in the design phase

- **Auto-advancing carousel** was chosen over the initially-recommended
  user-driven-only pattern; needs real attention to pause-on-interaction and
  `prefers-reduced-motion` so it doesn't undermine the "browser" persona by
  yanking content away mid-read.
- **Tag-ambivalent History cards** mean the destination template (`topic.html`
  extended) must gracefully handle an anchor that's an Event, a Figure, or a
  Topic without the layout assuming one type.
- **Editorial burden**: every bundle, every archive pick, and the two
  carousels' rotating membership are all hand-curated with no CMS — worth
  flagging early if that becomes a maintenance bottleneck once real content
  volume arrives.
