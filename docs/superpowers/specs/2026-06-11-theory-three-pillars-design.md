# Theory Page Redesign — The Three Pillars of Marxism

**Date:** 2026-06-11
**Files:** `theory.jsx`, `theory.html`
**Status:** Approved by user (design + mockup reviewed in session)

## Goal

Replace the flat 18-card topic grid on the theory page with a curriculum-style page
organised around the three pillars of Marxism — dialectical materialism, historical
materialism, and Marxist economics — each branching into essential, secondary
("going deeper"), and tertiary ("further study") readings. The remaining topics stay
on the page in a compact secondary grid. The page keeps the site's print-materiality
design language (paper substrate, ink rules, zero-radius corners, hard offset
shadows, Built Titling display type) and full dark-mode support.

## Page structure (top to bottom)

1. **Hero** — existing dark ink hero, retitled: eyebrow "Marxist University",
   H1 "The Three Pillars of Marxism", Lenin epigraph ("Without revolutionary
   theory…") kept as the lede.
2. **Pillar triptych** — a pure-CSS architectural diagram in the ink-rule style:
   an architrave labelled "MARXISM" resting on three columns:
   - I. Dialectical Materialism — "the method"
   - II. Historical Materialism — "the theory of history"
   - III. Marxist Economics — "the laws of motion of capital"
   Each column is an anchor link that smooth-scrolls to its chapter.
3. **Start here strip** — single slim row under the triptych pointing newcomers at
   Lenin's *The Three Sources and Three Component Parts of Marxism* and the
   marxist.com Fundamentals of Marxism reading guide.
4. **Three chapter sections** — one per pillar. Each chapter has:
   - Header: oversized red roman numeral, display-type title, one-line serif
     tagline, short intro paragraph, "Explore the full archive →" link to the
     existing marxist.com topic page.
   - **Essential reading**: 2–3 large cards with generated print-style covers
     (SlabCover pattern from classics.jsx), author, and a one-sentence blurb.
   - **Going deeper**: 3–4 medium text-first cards (title, author, short note).
   - **Further study**: compact ruled list — title left, author right.
   All readings link out (marxist.com where the text/guide lives there,
   marxists.org for classic texts).
5. **Applied theory grid** — the remaining 15 topics (State, Bolshevism,
   Stalinism, National Question, Anarchism, Imperialism & War, Identity &
   Oppression, Fascism, Religion, Environment, Art, Science & Technology,
   Workers' Control, In Defence of Genuine Marxism — minus Fundamentals and the
   three pillar topics) under a "Applied Theory & Further Topics" SectionHead,
   reusing the existing theory-card design in a compact 4-column grid
   (responsive: 4 → 3 → 2 → 1).
6. **Search** — existing search bar kept, placed between the start-here strip and
   chapter I. It filters everything: reading items match on title/author/blurb,
   topic cards on title/desc/kicker. While a query is active, chapters render
   their header plus only matching readings (tiers with no matches are hidden);
   the topics grid filters as today; a global empty state shows if nothing
   matches anywhere.

## Curated readings

### I. Dialectical Materialism — "The Method"
- Essential: *Socialism: Utopian and Scientific* (Engels); *The ABC of
  Materialist Dialectics* (Trotsky); *What Is Dialectical Materialism?*
  (marxist.com introduction).
- Going deeper: *Ludwig Feuerbach and the End of Classical German Philosophy*
  (Engels); *Anti-Dühring* (Engels); *Theses on Feuerbach* (Marx); *Reason in
  Revolt* (Woods & Grant).
- Further study: *Dialectics of Nature* (Engels); *Materialism and
  Empirio-Criticism* (Lenin); *Philosophical Notebooks* (Lenin); *The History of
  Philosophy: A Marxist Perspective* (Woods).

### II. Historical Materialism — "The Theory of History"
- Essential: *The Communist Manifesto* (Marx & Engels); *The Origin of the
  Family, Private Property and the State* (Engels); Preface to *A Contribution
  to the Critique of Political Economy* (Marx).
- Going deeper: *The German Ideology* (Marx & Engels); *The Eighteenth Brumaire
  of Louis Bonaparte* (Marx); *The State and Revolution* (Lenin); *What Is
  Historical Materialism?* (marxist.com introduction).
- Further study: *The Civil War in France* (Marx); *The Peasant War in Germany*
  (Engels); *The Role of the Individual in History* (Plekhanov); *The Part
  Played by Labour in the Transition from Ape to Man* (Engels); *History of the
  Russian Revolution* (Trotsky).

### III. Marxist Economics — "The Laws of Motion of Capital"
- Essential: *Wage-Labour and Capital* (Marx); *Wages, Price and Profit* (Marx).
- Going deeper: *Capital*, Volume I (Marx); *Imperialism: The Highest Stage of
  Capitalism* (Lenin); *Understanding Marx's Capital: A Reader's Guide*
  (marxist.com).
- Further study: *Critique of the Gotha Programme* (Marx); *Grundrisse* (Marx);
  *Theories of Surplus Value* (Marx); *Capital*, Volumes II & III (Marx);
  *Will There Be a Slump?* (Grant).

Reading lists are a first draft for the user to correct; URLs point to
marxists.org archives for classic texts and marxist.com for guides/archives.

## Implementation notes

- All changes confined to `theory.jsx` (data + components) and `theory.html`
  (CSS). Site chrome (Masthead, Nav, drawer, Footer) untouched.
- New data shape: `PILLARS = [{ id, numeral, title, tagline, intro, archiveUrl,
  essential[], deeper[], further[] }]` where each reading is
  `{ title, author, note?, url }`. Remaining topics stay in the existing
  `THEORY_TOPICS` shape.
- Essential-reading covers are generated typographic slabs (no new image
  assets), following the classics.jsx SlabCover pattern.
- Dark mode styled for every new component via `body[data-mode="dark"]` rules.
- Verify with preview screenshots (light + dark, desktop width) before commit;
  commit directly to main per repo convention.
