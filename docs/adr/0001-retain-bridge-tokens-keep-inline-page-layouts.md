# Retain bridge tokens and keep inline per-page layouts

The v2 handoff plan called for a "clean migration": strip every page's inline
`<style>` block and delete all legacy variables so pages reference `--rci-*`
canonical tokens directly. We are deliberately **not** doing that. The per-page
layouts (which the user wants preserved) live inside those same 1,000–2,600-line
inline blocks and are styled through legacy variables (`--fg`, `--paper`,
`--font-body`, …).

Instead we correct at the token level: `ds/rci-web.css` becomes the single
source of truth (peach cream, no ink-stamp shadows, correct textures); each
page's inline `:root` is reduced to **bridge tokens only** — legacy names that
map onto canonical `--rci-*` tokens (e.g. `--paper: var(--rci-paper-card)`). The
duplicated `--rci-*` palette redefinitions that were forcing pure white are
deleted so the canonical values flow through.

We accept the cosmetic debt of the bridge layer because it lets us fix the
design language across all 11 pages without rewriting thousands of lines of
working layout CSS — trading full purity of the migration for low risk to the
layouts the user explicitly asked to keep.
