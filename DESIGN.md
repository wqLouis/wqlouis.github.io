---
version: alpha
name: Muji Personal Site
description: Personal portfolio and blog with a Muji-inspired aesthetic — warm minimalism, natural materials, purposeful emptiness.
colors:
  primary: '#7f0019'
  secondary: '#cccccc'
  tertiary: '#999999'
  neutral: '#faf7eb'
  surface: '#f5f3eb'
  on-surface: '#666666'
  error: '#7f0019'
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

## Colors

The palette is rooted in warm, earthy neutrals and a single muted accent for interaction cues.

- **Primary (#2C2C2C):** Soft charcoal for headlines and body text. Not pure black — it has warmth.
- **Secondary (#D4CDBF):** Warm beige for borders, dividers, and subtle structural lines.
- **Tertiary (#8B7E6B):** Muted earth tone for tags, badges, and secondary interactive elements.
- **Neutral (#F7F5F0):** Unbleached paper — the foundational background. Warm, inviting, natural.
- **Surface (#EFEBE4):** Cream for card surfaces and elevated containers. Slightly darker than background.
- **Error (#8B4513):** Warm rust/brown for errors and destructive actions. No harsh reds.

Dark mode inverts the warmth:

- Background becomes **#2A2826** (warm charcoal).
- Text becomes **#E0DCD4** (warm off-white like natural linen).
- Surfaces shift to **#33312E**.
- Borders become **#4A4844** (muted dark warm).

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
