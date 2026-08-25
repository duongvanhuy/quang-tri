---
name: heritage-web-taste
description: >-
  Taste + token di sản cho site Quảng Trị (ký ức và khát vọng). Dùng khi
  thiết kế/sửa trang HTML trong Client/Quang-Tri, redesign layout, hero,
  typography, motion, hoặc làm UI mới trên token laterite/parchment.
---

# Heritage web + Taste

Site tĩnh Quảng Trị. Token đã chốt trong `assets/design/DESIGN.md`, `assets/js/theme.js`, `assets/css/base.css`.

## Bắt buộc đọc

Skill cá nhân (Cursor discover): `taste-design`, rồi **một** skill con.

1. `taste-design` — bảng chọn skill
2. Trang **đã có** → `redesign-existing-projects`
3. Trang **mới** (landing/section) → `design-taste-frontend`
4. Có file Stitch / DESIGN.md → `stitch-design-taste` — **không ghi đè** palette site

File gốc: `~/.cursor/skills/<name>/SKILL.md`

## Design Read mặc định (site này)

Reading this as: **editorial heritage tourism** cho khách Việt, vibe **đất lửa / tri ân / bản làng**, lean **laterite + parchment + Merriweather / Be Vietnam Pro**.

| Núm | Giá trị |
|-----|---------|
| `DESIGN_VARIANCE` | 6 |
| `MOTION_INTENSITY` | 4 (dùng `assets/css/motion.css` + `motion.js`, tôn trọng `prefers-reduced-motion`) |
| `VISUAL_DENSITY` | 5 |

## Token — không thay trừ khi user yêu cầu

| Vai | Giá trị |
|-----|---------|
| Primary | Laterite `#6B2218` |
| Gold | `#9A7428` / `#D4A84B` |
| Surface | Parchment `#F4EFE6` |
| Ink | `#2C221A` |
| Footer | Stone `#2A2118` |
| Sea | `#2A4560` (accent, không làm màu chủ) |
| Display | Merriweather |
| UI/body | Be Vietnam Pro |

Không spa-blue, không mint chủ đạo, không Inter mặc định.

## Copy & sự thật

Tiếng Việt đủ dấu. Số liệu / địa danh / giá / SĐT phải khớp nguồn — không bịa contest, like, quote.

## Chrome dùng chung

Header/footer inject từ `layout.js` + `site-map.js`. Sửa trang: `#site-header` / `#site-footer`, `body` `flex flex-col`. Không chạy lại `tools/restructure.mjs` trừ khi user bảo.

## Quét / sửa nhiều trang live

Đọc và chạy `agent-heritage-pages` (cùng thư mục `.cursor/skills/`). Inventory: `PAGE-AUDIT.md`.
