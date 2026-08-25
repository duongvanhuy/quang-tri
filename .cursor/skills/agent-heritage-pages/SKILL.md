---
name: agent-heritage-pages
description: >-
  Agent trang live site Quảng Trị (Ký ức và khát vọng). Quét / chỉnh HTML
  theo Taste + heritage-web-taste: tiếng Việt, token laterite, chống UI AI
  generic, chrome chung. Dùng khi user bảo quét page, redesign trang,
  chỉnh theo skill mới, hoặc @agent-heritage-pages.
---

# Agent Heritage Pages

Agent **thực thi** (không chỉ spec) cho site tĩnh `Client/Quang-Tri`. Gói skill:

| Thứ tự | Skill | Việc |
|--------|-------|------|
| 1 | `heritage-web-taste` | Token laterite / parchment, dials, chrome |
| 2 | `taste-design` | Chọn skill con, Design Read, cấm slop |
| 3 | `redesign-existing-projects` | Audit rồi sửa — **không** viết lại cả site |

Trang **mới** (chưa có file): thay bước 3 bằng `design-taste-frontend`.

Bảng trạng thái: [PAGE-AUDIT.md](PAGE-AUDIT.md). Cập nhật sau mỗi trang xong.

## Design Read (cố định)

Reading this as: **editorial heritage tourism** cho khách Việt, vibe **đất lửa / tri ân / bản làng**, lean **laterite + parchment + Merriweather / Be Vietnam Pro**.

| Núm | Giá trị |
|-----|---------|
| `DESIGN_VARIANCE` | 6 |
| `MOTION_INTENSITY` | 4 (`assets/css/motion.css` + `motion.js`, tôn trọng `prefers-reduced-motion`) |
| `VISUAL_DENSITY` | 5 |

Không đổi palette / font trừ khi user yêu cầu.

## Phạm vi

**Trong:** `index.html`, `404.html`, `pages/**/*.html`, CSS/JS dùng chung nếu trang cần (`base.css`, `motion.js`).

**Ngoài:** thư mục `stitch_qu_ng_tr_k_c_kh_t_v_ng/` (archive Stitch), `assets/shaders/`, chạy `tools/restructure.mjs`.

## Workflow một trang

1. Mở [PAGE-AUDIT.md](PAGE-AUDIT.md) — lấy hàng trang, ưu tiên P0 → P1 → P2.
2. Đọc HTML + `layout.js` / `site-map.js` nếu đụng nav.
3. Sửa theo checklist dưới. Giữ `#site-header` / `#site-footer`, `data-page`, `lang="vi"`.
4. Không bịa số liệu, SĐT, giá, sự kiện. Nguồn không chắc → bỏ hoặc ghi “theo [cơ quan]”.
5. Cập nhật cột Trạng thái trong PAGE-AUDIT.
6. Verify: mở URL local, scroll, click CTA, kiểm tra header/footer không chồng.

User nói “chạy hết” / “quét rồi chỉnh”: làm tuần tự P0 rồi P1, báo tiến độ từng trang. Không nhảy P2 khi P0 còn mở.

## Checklist sửa (mỗi trang)

### Copy

- Mọi chữ **hiển thị** tiếng Việt đủ dấu (nav, nút, placeholder, breadcrumb, tab).
- Comment HTML tiếng Anh được phép.
- Xóa “John Doe”, “Travel Co.”, “All Ages Welcome”, “Search Results”, “Explore Archive”.
- Input `value` không chứa HTML thô.

### Chrome

- Một header: `#site-header`. Xóa TopNav / SideNav Stitch trùng (Travel / Culture / Overview…).
- `body` có `flex flex-col` + `min-h-screen` trừ trang app (`map`, `itinerary`) — những trang đó ẩn footer trong `base.css` nếu đã quy ước.
- Footer: `#site-footer`. Không footer cứng song song.

### Layout (Taste)

- Không 3–4 card icon bằng nhau làm “feature row”. Lệch cột, 1 lớn + 2 nhỏ, hoặc danh sách editorial.
- `h-screen` hero / shell → `min-h-[70dvh]` hoặc `min-h-dvh` (trừ map/planner cố ý full viewport).
- Khoảng trống: mật độ 5 — đừng `py-section-gap` kép + `min-h` lớn. Trang chủ đã siết trong `base.css`.
- Nút `href="#"`: trỏ trang thật hoặc bỏ / `aria-disabled`.

### Token

- Primary laterite, surface parchment, display Merriweather. Không Inter, mint chủ, purple mesh.

## Lệnh gọi

```
@agent-heritage-pages Quét lại toàn bộ page, cập nhật PAGE-AUDIT
@agent-heritage-pages Chỉnh P0 theo skill mới
@agent-heritage-pages Redesign pages/tim-kiem.html
```

## Handoff

Sau đợt sửa: liệt kê file + URL. QA: `agent-tester-qa` (Back, header, footer). Không cần PRD Gia Phả.
