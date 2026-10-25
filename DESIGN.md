---
version: alpha
name: Muji Personal Site
description: Personal portfolio and blog with a Muji-inspired aesthetic — warm minimalism, natural materials, purposeful emptiness.
colors:
  # Light mode — "Paper & Ink" (sumi-e / rice paper)
  primary: '#b23a2f' # cinnabar seal red (印章) accent
  secondary: '#d3cec3' # paper edge / dry brush borders
  tertiary: '#8a857b' # muted earth tone
  neutral: '#f7f5f1' # rice-paper ground (background)
  surface: '#efece6' # paper sheet (panels, cards, nav)
  on-surface: '#33312c' # sumi ink text
  error: '#b23a2f'
  # Dark mode — Catppuccin Mocha
  dark-primary: '#cba6f7' # mauve accent
  dark-secondary: '#45475a' # surface1 borders
  dark-neutral: '#1e1e2e' # base background
  dark-surface: '#181825' # mantle panels
  dark-on-surface: '#cdd6f4' # text
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.02em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.01em
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 350
    lineHeight: 1.7
    letterSpacing: 0.01em
  body-small:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 350
    lineHeight: 1.6
    letterSpacing: 0.01em
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.05em
  code:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 96px
components:
  nav-pill:
    backgroundColor: '{colors.surface}'
    borderColor: '{colors.secondary}'
    rounded: '{rounded.lg}'
    padding: 8px
  nav-item:
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    padding: 8px
  nav-item-hover:
    borderColor: '{colors.primary}'
  card:
    backgroundColor: '{colors.surface}'
    borderColor: '{colors.secondary}'
    rounded: '{rounded.lg}'
    padding: 16px
  card-hover:
    borderColor: '{colors.primary}'
  button-outline:
    backgroundColor: transparent
    borderColor: '{colors.secondary}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: 8px 16px
    fontSize: 12px
    letterSpacing: 0.05em
  button-outline-hover:
    borderColor: '{colors.primary}'
  code-block:
    backgroundColor: '{colors.surface}'
    borderColor: '{colors.secondary}'
    rounded: '{rounded.md}'
    padding: 16px
  tag:
    backgroundColor: transparent
    borderColor: '{colors.secondary}'
    textColor: '{colors.tertiary}'
    rounded: '{rounded.full}'
    padding: 2px 10px
    fontSize: 11px
    letterSpacing: 0.03em
  tooltip:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.neutral}'
    rounded: '{rounded.md}'
    padding: 6px 12px
    fontSize: 12px
---

## Overview

A Muji-inspired personal website — warm minimalism meets functional design. Muji (Mujirushi Ryohin / "No Brand Quality Goods") is a Japanese design philosophy of extreme simplicity, natural materials, and purposeful emptiness.

The UI evokes unbleached paper, warm wood, and soft textiles. Every element serves a purpose; decorative flourishes are absent. The design whispers rather than shouts — a quiet, confident minimalism.

## Colors & Themes

The site has two distinct seasonal moods sharing one token set (`--background`, `--foreground`, `--border`, `--text`, `--accent` in `src/app.css`).

### Light — "Paper & Ink" (sumi-e)

Bright mode evokes an ink painting on rice paper: warm washi tones, sumi-ink text, and a single cinnabar seal-red accent. A fixed CSS overlay adds atmosphere:

- **Grain:** fine fractal-noise fibres multiplied over the page — the texture of unbleached paper.
- **Ink washes:** faint indigo-grey wash from the upper left, sepia from the lower right, and a distant-mountain band along the bottom edge — like diluted ink bleeding into wet paper.
- **Vignette:** soft darkening at the edges, as if the paper has aged.

- **Background (#F7F5F1):** neutral rice-paper ground — warm but not yellow.
- **Foreground/Surface (#EFECE6):** paper sheet for panels, cards, nav.
- **Border (#D3CEC3):** paper edge; dry-brush structural lines.
- **Text (#33312C):** sumi ink — warm, never pure black.
- **Accent (#B23A2F):** cinnabar seal red, used sparingly like a stamp on a finished painting.

### Dark — Catppuccin Mocha

Dark mode adopts the Catppuccin Mocha palette verbatim — clean, flat, no texture overlay.

- **Background (#1E1E2E):** Mocha `base`.
- **Foreground/Surface (#181825):** Mocha `mantle` for panels and elevated containers.
- **Border (#45475A):** Mocha `surface1` for subtle structural lines.
- **Text (#CDD6F4):** Mocha `text`.
- **Accent (#CBA6F7):** Mocha `mauve`, echoing the light mode's single-accent restraint.

## Typography

Inter is the sole typeface — clean, geometric, highly readable. The limited weight range (350 Regular, 400 Medium) maintains the restrained character.

- **Headings:** Inter 400 (Regular). Lowercase, generous letter-spacing. No bold weights.
- **Body:** Inter 350 (Regular, slightly lighter than standard). Comfortable reading at 15px with 1.7 line height.
- **Labels & metadata:** Inter 400. Compact with wide tracking for structure.
- **Code:** System monospace stack. Functional, unobtrusive.

No font size exceeds 32px. Hierarchy is communicated through weight, spacing, and position rather than size extremes.

## Layout & Spacing

A fluid-centered layout with generous whitespace. Content is constrained to a comfortable reading width (max ~1200px on desktop). The 8px grid provides rhythm.

- **Section spacing:** 96px (xl) — abundant vertical breathing room between major content blocks.
- **Card grids:** 1 column mobile, 2 tablet, 3 desktop — clean proportional grids.
- **Margins:** 32px on desktop, 16px on mobile.
- **Whitespace is a feature.** Empty areas are not gaps to fill — they are intentional pauses.

## Elevation & Depth

No shadows. No z-axis depth. Hierarchy is communicated through:

- **Tonal layering** — surface color vs. background color
- **Borders** — thin (1px), warm beige lines
- **Typography weight** — lighter weight for less important content

Depth through subtlety: cards are distinguished from the background by their cream surface, not by dropshadows.

## Shapes

Architectural restraint. Corners are minimal — just enough softness to feel approachable.

- **Cards:** 12px radius — soft but structured.
- **Buttons:** 4px radius — precise and minimal.
- **Tags:** Full pill shape (9999px).
- **Nav pill:** 12px radius — integrated, not floating.

No element uses a radius larger than 12px unless it's a pill shape.

## Components

- **Navigation:** A single bottom-center pill containing icon links. No labels visible by default; aria-labels provide accessibility. Tooltips appear on hover. Border-only states communicate interaction.
- **Buttons (outline):** Minimal outline style. On hover, the border shifts from secondary (beige) to primary (charcoal), providing clear but quiet feedback. On click, the border briefly flashes to a thicker/higher-contrast state before returning.
- **Cards:** Flat containers with a cream surface and warm beige border. No shadow, no tilt, no lift on hover. Border shifts to charcoal on hover for interactive cards. Image fills top portion. Title and description below.
- **Tags:** Minimal pill with muted earth-tone text and beige border. No background fill.
- **Code blocks:** Cream surface, beige border, compact monospace text. Language label in subtle letter-spaced uppercase. Copy button in top-right.
- **Tooltips:** Charcoal background with warm off-white text. Appear above navigation items on hover. Simple and functional.
- **Blog cards:** Flat bordered containers. On hover, border transitions from beige to charcoal. No shadow, no transform.

## Do's and Don'ts

- Do use generous whitespace — it is the primary design tool
- Do use the secondary (beige) for all borders by default; reserve primary (charcoal) for hover/active states
- Do use lighter font weights (350) for body text to create a delicate, airy feel
- Do keep all interactive feedback limited to border changes — no scaling, no shadows, no color fills
- Don't use shadows or elevation — flat is fundamental to the aesthetic
- Don't use pure black (#000) or pure white (#fff) — always add warmth
- Don't use decorative elements (emojis, gradients, background patterns, cursor effects)
- Don't use scale transforms or bounce animations — motion should be minimal
- Don't use more than one typeface — Inter is sufficient
- Don't use capitalized text unless it's a label — lowercase feels more natural and restrained
- Don't mix corner radii — cards use lg (12px), buttons use sm (4px)

## List Pages

The project and blog indexes share one visual language with the project detail pages (see `src/routes/projects/krkr-rs`). They are composed from four shared components in `src/lib/components/list/` — a shell, a header, a hairline row and a footer — so a list page can never drift from its siblings.

- **Shell** (`PageShell.svelte`) — the page wrapper: `min-h-screen w-full bg-bg text-text`, a `mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28` content column, and the krkr-rs typeface override (`Helvetica Neue, Helvetica, Arial, Inter, system-ui, sans-serif`) together with its `#d76b3f` / `#f8f6f0` selection colours.
- **Header** (`PageHeader.svelte`) — the round back button (`size-9 rounded-full bg-text text-bg`, `hover:opacity-80`) and the title alone (`text-2xl md:text-3xl font-light tracking-wider`), closed by the hairline divider (`h-px w-full bg-border/60`). No kicker, no subtitle, no count: the list explains itself, the page only names itself.
- **Row** (`EntryRow.svelte`) — one row component for both lists, a hairline table row and never a card: `group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8`. The clay index (`text-[11px] tracking-[0.18em] tabular-nums`) leads, the title carries the clay hover (`group-hover:text-[var(--accent-clay)]`), the description is clamped to two lines (`line-clamp-2 text-xs leading-relaxed text-text/60`) and the tags are pills (`rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] tracking-widest text-text/40`). The date is micro meta on the right.
- **Footer** (`PageFooter.svelte`) — `border-t border-border/40 pt-8 pb-16 md:pt-12 md:pb-0` with a `flex flex-col gap-4 md:flex-row md:items-center md:justify-between` inner row: the "built with" line on the left (`text-xs font-light tracking-wide text-text/50`) and a short notice on the right (`text-[11px] leading-relaxed text-text/40`). It sits inside the centred column, so title, list and footer read as one block.

- **Return button** (`src/lib/components/ReturnButton.svelte`) — one component for every "back" affordance on the site (list pages, the krkr-rs hero, the blog post header). It is a 36px inverted circle (`rounded-full bg-text text-bg`) that on hover extends to the right into a pill: the border takes the text colour (`hover:border-text`), the background falls back to the page default (`hover:bg-bg`) and the word "return" slides out (`opacity-0 group-hover:opacity-100`). The width animates through `max-w-9 → hover:max-w-28`, so nothing jumps.
- **Placeholder** (`EmptyState.svelte`) — an empty list is never a bare sentence. It is a krkr-rs card (`rounded-lg border border-border bg-fg`) over the same swiss grid the hero uses, with an icon badge, a clay kicker, one line of copy and a clay hairline.

**Rules**

- The page is one vertically centred block: the shell wraps title, list and footer in a `my-auto` column inside a `min-h-screen` flex page, so the title always sits on the optical centre of the screen — never pinned to the top, never pushed down by the footer. Auto margins (not `justify-center`) are used so a long list can never clip its own head.
- A list is a hairline table — `mt-12 border-t border-text/25 md:mt-16` with `border-b border-border/50` rows — never a stack of bordered cards.
- Accent clay is reserved for the row index and hover text; the accent segment that opens the table is a single 1px line (`bg-[var(--accent-clay)]`).
- Hover feedback stays border and colour only — no `transition-all duration-300`, no scale, no shadow.
- A list page never leaves the `max-w-6xl` column: no `w-screen`, no `md:w-[70vw]` escape hatches.
- A list page carries exactly one piece of text in its header — the title. No eyebrow, no tagline, no count; the rows speak for themselves.
- Below 640px the row stacks (title / date / description / pills) inside the 12-column grid and every tap target stays at least 40px tall.
- The floating bottom navigation sits 48px above the viewport edge — the footer keeps an extra bottom padding on small screens so the navigation never covers the notice.
