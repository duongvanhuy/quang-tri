---
name: Aspiration and Memory
colors:
  surface: '#F4EFE6'
  surface-dim: '#E4D8C6'
  surface-bright: '#FBF7F0'
  surface-container-lowest: '#FFFCF7'
  surface-container-low: '#F7F1E6'
  surface-container: '#EFE6D6'
  surface-container-high: '#E6D9C4'
  surface-container-highest: '#DDD0B8'
  on-surface: '#2C221A'
  on-surface-variant: '#5C4A3E'
  inverse-surface: '#2A2118'
  inverse-on-surface: '#F4EFE6'
  outline: '#8B7464'
  outline-variant: '#D4C4B0'
  surface-tint: '#8A2E20'
  primary: '#6B2218'
  on-primary: '#FFF8F0'
  primary-container: '#8A2E20'
  on-primary-container: '#F3C4B4'
  inverse-primary: '#E8A090'
  secondary: '#9A7428'
  on-secondary: '#FFF8EC'
  secondary-container: '#E4C56A'
  on-secondary-container: '#5C4514'
  tertiary: '#2A4560'
  on-tertiary: '#F4EFE6'
  tertiary-container: '#355A78'
  on-tertiary-container: '#A8C8E0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#F5D6CC'
  primary-fixed-dim: '#E8A090'
  on-primary-fixed: '#3A120C'
  on-primary-fixed-variant: '#8A2E20'
  secondary-fixed: '#F3E0A8'
  secondary-fixed-dim: '#D4A84B'
  on-secondary-fixed: '#2A1F0A'
  on-secondary-fixed-variant: '#6B5018'
  tertiary-fixed: '#D4E4F2'
  tertiary-fixed-dim: '#8BB0D0'
  on-tertiary-fixed: '#122433'
  on-tertiary-fixed-variant: '#355A78'
  background: '#F4EFE6'
  on-background: '#2C221A'
  surface-variant: '#DDD0B8'
typography:
  display-heritage:
    fontFamily: Merriweather
    fontSize: 52px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: 0.015em
  headline-lg:
    fontFamily: Merriweather
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Merriweather
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 38px
  title-modern:
    fontFamily: Be Vietnam Pro
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style
The brand personality is a bridge between the solemn weight of history and the energy of future development. It is an **Immersive Storytelling** style: museum archive first, coastal tourism as a supporting layer.

The visual direction uses a dual-layer approach:
1. **Heritage Layers:** Warm parchment, laterite brick, and aged brass for memory, culture, and monuments.
2. **Sea & Nature Layers:** Deep Cửa Tùng blue only on maps, beaches, and eco sections — never as the page skin.

The design should feel authoritative yet welcoming, like a living outdoor museum rather than a spa or a generic beach portal.

## Colors
- **Primary — Laterite / gạch Thành Cổ (`#6B2218`):** Headings, brand mark, primary buttons, active nav. This is the soil and brick of Quảng Trị, not a clinical red.
- **Secondary — Đồng thau (`#9A7428` / `#D4A84B`):** Highlights, awards, festival chips, hover gold.
- **Tertiary — Biển Cửa Tùng (`#2A4560`):** Maps, coastal cards, nature icons only.
- **Surface — Giấy dó (`#F4EFE6`):** Page background and cards. Replaces the old mint cyan, which read as spa/clinic.
- **Ink — `#2C221A`:** Body text on cream for readable contrast.
- **Footer — Đá xám `#2A2118`:** Grounding, museum-dark chrome.

Do **not** use mint, cyan, or bright ocean blue as the site-wide surface. Blue as a master theme signals resort tourism (Đà Nẵng / Nha Trang), not remembrance and culture.

## Typography
- **Heritage voice — Merriweather:** Display titles, chapter headings, quotes. Wider and easier to sit with than Cormorant Garamond (tall/pinched) or Source Serif 4 at display size. Still literary, with room for Vietnamese diacritics.
- **Vietnamese UI + body — Be Vietnam Pro:** Nav, labels, buttons, and long-form copy. Designed for Vietnamese diacritics; more local and readable than Montserrat + Inter. Body tracking stays slightly open (`0.01em`) so paragraphs do not feel condensed.

## Layout & Spacing
- 12-column desktop, 4-column mobile.
- Airy `section-gap` between storytelling blocks.
- Mobile side margins `16px`; keep gutters so image cards can breathe.

## Elevation & Depth
- Heritage photos sit on cream with soft, wide shadows mixed from laterite + ink.
- Glass overlays use warm parchment tint, not mint.
- Footer is dark stone; header is translucent parchment.

## Components
- **Primary buttons:** Solid laterite, brass hover, `label-caps`.
- **Heritage cards:** Cream / parchment, subtle laterite shadow.
- **Tourism chips:** Deep sea or forest only on travel/map surfaces.
- **Inputs:** Bottom border in slate; focus laterite.
