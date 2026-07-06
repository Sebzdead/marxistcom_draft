# RCI Website Design System

The visual design language for the marxist.com / RCI website — an elevated,
literary "Reading Room" (v2) redesign: warm printed paper, editorial serif
reading voice, Built Titling reserved as agitational spice.

## Language

**Reading Room (v2)**:
The canonical design language, defined by `ds/rci-web.css` + `ds/rci-fonts.css`
from the handoff. Warm paper surfaces, quiet serif headlines, texture-grounded
surfaces, no drop shadows.
_Avoid_: v1, "the old style"

**Peach cream**:
The page background, `--rci-paper: #f6ecdd` — warm laid newsprint. The single
correct page ground. Pure white (`#ffffff`) is a defect to be removed wherever
it appears.
_Avoid_: off-white, warm white, blank paper

**Ink-stamp shadow**:
The offset hard `box-shadow: Npx Npx 0 <ink>` treatment on cards/buttons/panels.
Removed entirely in v2 — grounding is done by texture + key-lines instead.
_Avoid_: drop shadow, offset, stamped, taped

**v2 grounding**:
How a surface reads once the ink-stamp is gone: a 1–2px printed hairline
key-line plus a low-opacity laid-paper/grain texture overlay. This is what
"integrate textures into cards and UI" means concretely.

**Punchy card**:
An agitprop card that is *allowed* the bold ALL-CAPS voice — Campaigns and
Join Us being the canonical examples. The only place, besides the masthead
wordmark and section-head labels, where Built Titling appears.
_Avoid_: agitprop card, bold card (use "punchy card")

**Serif-forward**:
The default typographic posture: headlines and card titles in Cormorant
Garamond, body in Cheltenham. Built Titling is the exception, not the default.

**Bridge token**:
A legacy CSS variable (`--fg`, `--paper`, `--page-bg`, `--font-body`, …) kept
in each page's inline `:root` that maps onto a canonical `--rci-*` token. We
retain these deliberately (see ADR-0001) so existing page layouts keep working.
_Avoid_: legacy variable (if it maps to an --rci-* token, it's a bridge token)

**Canonical token**:
An `--rci-*` variable defined once in `ds/rci-web.css`. The single source of
truth for colour, type and texture. Per-page `:root` blocks must not redefine
these — only bridge onto them.
