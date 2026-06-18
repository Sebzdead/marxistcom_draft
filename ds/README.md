# RCI Web Design System

The warm-paper website system for the Revolutionary Communist International.
A self-contained CSS kit: link one stylesheet, copy the markup patterns, build pages.

---

## What's in this folder

```
web-system/
├── rci-web.css        ← the system: tokens + base + all components (link THIS)
├── rci-fonts.css      ← @font-face declarations (imported automatically)
├── starter-page.html  ← a working page using every component — copy from it
├── README.md          ← this guide
├── textures/          ← the 4 textures the system uses
└── assets/            ← logo lockups (square + horizontal)
```

The brand font files live once in the repo-root `/fonts` directory; `rci-fonts.css`
references them via `../fonts` so there is a single canonical copy of every face
across the design system (no duplicates).

## Quick start

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="rci-web.css">
</head>
<body>
  <!-- copy the header / sections you need from starter-page.html -->
</body>
</html>
```

`rci-web.css` `@import`s `rci-fonts.css`, which loads the brand faces from the
repo-root `/fonts` directory (`../fonts`). Inside this project everything resolves
with relative paths — no build step, no CDN, works offline.

**Deploying the kit on its own server?** Copy the repo-root `/fonts` files into a
`web-system/fonts/` folder and change `../fonts` → `fonts` in `rci-fonts.css` to
make the folder fully self-contained.

Every class is prefixed `.rci-` so it never collides with other CSS.

---

## The idea in one paragraph

A serious newspaper that still feels **printed by hand**. The page is warm
peach-cream newsprint (`#fff1e5`) with a faint film-grain wash. Stories read in
an **editorial serif** (Cormorant headlines, Cheltenham body) the way *The
Atlantic* reads — calm, sentence-case, grown-up. The **revolutionary** moments —
the masthead voice, manifesto bands, breaking-news cards — punch in **Built
Titling** ALL-CAPS. Red leads; three muted spot inks add section colour. Edges
are hard, shadows are solid ink "stamps," nothing is rounded or glassy.

---

## Colour

| Token | Hex | Use |
|---|---|---|
| `--rci-paper` | `#fff1e5` | the page — peach-cream newsprint |
| `--rci-paper-deep` | `#f4e4d3` | sunk panels (footer, wells) |
| `--rci-paper-card` | `#fffaf3` | lifted cards, the mega-menu |
| `--rci-ink` | `#221c17` | warm near-black — text & all hard edges |
| `--rci-ink-soft` | `#4a4039` | secondary text |
| `--rci-ash` | `#8a7d70` | metadata |
| `--rci-hairline` / `-2` | `#e4d0bb` / `#d3bca3` | dividers |
| `--rci-red` | `#d4140f` | **dominant accent** — links, buttons, kickers |
| `--rci-red-hot` | `#e6002b` | live / alarm only |
| `--rci-red-dark` | `#8a0608` | hover / pressed |
| `--rci-blue` `--rci-ochre` `--rci-green` | `#1d3a6b` `#bd7a17` `#2c5e3f` | **spot inks** — section colour |

**Spot-ink rule:** the three inks are muted on purpose — they read as a second
and third *printing plate*, not as bright web colour. Use **one ink per section**,
applied to that section's kickers (`.rci-kicker.blue` etc.). Never scatter all
three across a single view — that's how it turns into rainbow slop. Red always
stays the loudest colour on the page.

---

## Type — how to balance the two voices

Five families do all the work. The whole system is a dialogue between **two
voices**; getting the ratio right is the single most important thing.

| Token | Family | Voice |
|---|---|---|
| `--rci-font-serif-display` | Cormorant Garamond | **Editorial headlines, standfirsts, pull-quotes** |
| `--rci-font-serif` | Cheltenham BT | **Body / reading text, deks** |
| `--rci-font-display` | Built Titling | **Bold ALL-CAPS — the revolutionary punch** |
| `--rci-font-condensed` | Trade Gothic Cond. | Kickers, nav, metadata, buttons |
| `--rci-font-mono` | IBM Plex Mono | Placeholder labels, technical metadata |

### The balance

- **Serif is the default. Caps are the exception.** ~80% of the words on a page
  should be sentence-case serif (Cormorant headlines, Cheltenham body). Built
  Titling is a spice, not a staple — use it where you want audacity: the
  masthead lockup, a manifesto band, a "BREAKING" card, a recruitment call.
- **Never two Built Titling blocks side by side competing.** One bold moment per
  viewport. If everything shouts, nothing does.
- **Pair them deliberately in the same grid.** The card grid is the showcase:
  serif `.rci-card`s carry the calm reporting; a single `.rci-card.bold` (Built
  Titling) sits among them as the agitational counterpoint. That contrast — quiet
  serif vs. loud caps — *is* the brand.
- **Cormorant is high-contrast** — give it size and air. Great from ~22px up; it
  gets thin and fragile below ~18px, so dense small text should be Cheltenham.
- **Caps want tracking.** Built Titling and condensed labels always carry
  letter-spacing (the classes already set it); never set caps tight.
- **Sentence case for serif headlines**, not Title Case — that's the Atlantic
  register and it reads as journalism, not marketing.

### Type classes

```html
<p class="rci-display">Better fewer, but better.</p>   <!-- Built Titling caps -->
<h1 class="rci-headline">A sentence-case Cormorant headline</h1>
<h3 class="rci-title">A smaller card title</h3>
<p class="rci-standfirst">An italic Cormorant standfirst.</p>
<div class="rci-body"><p>Cheltenham reading text…</p></div>
<span class="rci-kicker blue">Theory</span>           <!-- section kicker -->
<span class="rci-meta">27 May <span class="dot">·</span> 6 min</span>
```

---

## Textures — how they're used

Texture makes the system feel hand-printed instead of corporate. The rule is
**where**, not whether.

- **The page** carries one grain sheet: `textures/au-fg-1.jpg`, applied as a
  *fixed, non-tiling* `body::before` at `multiply` ~0.14. Because it covers the
  viewport as a single image (not a repeating tile) it never seams.
- **Dark slabs** (`.rci-slab`) get `textures/paper-356.jpg` *screened* on at ~0.12 —
  faint scratches catching the light on the ink ground.
- **Red slabs** (`.rci-slab.red`) get `textures/halftone-mesh.jpg` + `grunge-peeled-paint.jpg`
  *multiplied* on — the loudest, most printed surface, for manifesto/agitation.

### Two hard rules (learned the hard way)

1. **The page background and photos carry NO tiling texture.** A small texture
   tiled across a large area seams into a faint rectangular "calendar / polaroid"
   grid. Photos are real photos (or flat duotone placeholders); the page is flat
   warm colour + the single fixed grain sheet. Nothing else.
2. **Texture only ever lives as a low-opacity blend overlay on designed chrome**
   (dark/red slabs) — never as a tiled fill. The texture tokens (`--rci-tx-*`) are
   there to compose into `::before`/`::after` overlays, not to drop onto a `div`.

Adjust the page grain by editing the `body::before` opacity in `rci-web.css`
(0.14 is the current setting; 0.06 is barely-there, 0.20 is heavy).

---

## The menu bar & mega-menu — how it works

The header is `position: sticky` and meant to be **copied verbatim onto every
page**. It has two rows: a top bar (logo lockup · language · Join button) and the
`.rci-nav` bar below it.

The **mega-menu** is pure CSS state — no framework. It shows when the class
`menu-open` is on `<body>`:

```html
<button onclick="document.body.classList.toggle('menu-open')">
  <span class="rci-ham"><i></i><i></i><i></i></span> Menu
</button>
```

- `.rci-megamenu` is absolutely positioned under the header and fades/slides in.
- `.rci-backdrop` is a fixed, **blurred** scrim behind it (`backdrop-filter: blur`)
  that dims the page; clicking it closes the menu (`classList.remove('menu-open')`).
- One line of JS closes it on `Escape` (see the bottom of `starter-page.html`).

Inside, `.rci-mm-primary` is the left rail of headline destinations (icon + serif
title + condensed sub-label); `.rci-mm-cols` is the right grid of link columns
under condensed red headings, with a `.rci-mm-search` field on top.

**Nav states:** `.rci-nav a.active` gets a thick red underline; hover flips any
nav item to a solid red block with paper text — the same "stamp" interaction as
the buttons.

---

## Buttons

```html
<a class="rci-btn" href="#">Join</a>            <!-- red, primary -->
<a class="rci-btn ghost" href="#">All reports</a> <!-- outline on paper -->
<a class="rci-btn ink" href="#">Subscribe</a>     <!-- ink ground -->
<a class="rci-btn light" href="#">Manifesto</a>   <!-- paper on a dark/red slab -->
<a class="rci-btn lg" href="#">Join the fight</a> <!-- larger -->
```

Every button is a hard-edged block with a **solid ink stamp shadow**
(`4px 4px 0`). On `:active` the shadow collapses and the button translates into
it — it physically presses like a stamp. No gradients, no rounding, no soft
blur. This press interaction is the tactile signature shared with the nav.

---

## Components reference

| Class | What it is |
|---|---|
| `.rci-header` `.rci-nav` `.rci-megamenu` `.rci-backdrop` | sticky header + mega-menu (copy to every page) |
| `.rci-wrap` | centered `1180px` content column |
| `.rci-rule` | thick ink section divider |
| `.rci-grid` `.cols-2/3/4` | responsive grid |
| `.rci-section-head` | Built Titling section label over a thick rule + "see all" link |
| `.rci-kicker` `.blue/.ochre/.green` | section eyebrow in spot ink |
| `.rci-meta` | date / read-time / byline |
| `.rci-img` `.duo` `.dark` + `.rci-ar-*` | flat image placeholder (duotone optional) |
| `.rci-card` | editorial **serif** card |
| `.rci-card.bold` / `.bold.red` | **Built Titling** slab card (the punch) |
| `.rci-feature` | text overlaid on a duotone image block |
| `.rci-banner` | bordered call-out with stamp shadow |
| `.rci-slab` / `.slab.red` | full-width dark / red textured band |
| `.rci-scroller` | horizontal snap-scroll rail (the "Latest" row) |
| `.rci-btn` + variants | buttons |
| `.rci-footer` | structured footer + mono colophon |

Open **`starter-page.html`** in a browser to see all of them assembled, and copy
the markup straight out of it.

---

## Replacing placeholders with real content

Image placeholders are `.rci-img` blocks. Drop a real photo in and it fills:

```html
<div class="rci-img rci-ar-16-9"><img src="path/to/photo.jpg" alt="…"></div>
```

Keep the `2px` ink border — it's part of the look. For sections that aren't
photo-led yet, the flat `.rci-img` (or `.duo` tinted) block is the intended
spare placeholder; the mono label tells an editor what belongs there.
