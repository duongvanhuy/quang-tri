# PAGE-AUDIT — Quảng Trị live

Quét: 2026-08-25. P0 đã siết cùng ngày. Chỉ file live (không Stitch archive).

Nguồn map: `assets/js/site-map.js`.

## Hàng đợi

| P | `data-page` | File | Trạng thái | Việc chính |
|---|-------------|------|------------|------------|
| — | `home` | `index.html` | **đã siết** | Redesign Taste + giảm gap. Giữ. |
| — | `community` | `pages/cong-dong.html` | **đã siết** | Nội dung thực + layout. Giữ. |
| — | `map` | `pages/ban-do.html` | **đã siết 2026-08-25 (lần 3)** | Tab Điểm đến / 78 xã phường (NQ 1680); không ghim 78 tâm giả. |
| — | `admin-units` | `pages/hanh-chinh.html` | **mới 2026-08-25** | Danh mục 69 xã + 8 phường + 1 đặc khu; nguồn NQ 1680. |
| P0 | `search` | `pages/tim-kiem.html` | **đã siết 2026-08-25 (lần 2)** | Bỏ pill/card trắng; ô tìm gạch chân; featured overlay + list editorial. |
| P0 | `itinerary` | `pages/lich-trinh.html` | **đã siết 2026-08-25 (lần 2)** | Hai tuyến thật `#nam` / `#bac` (vĩ tuyến 17 · hang động–Nhật Lệ). Bỏ planner kéo-thả Stitch; footer hiện. |
| P0 | `about` | `pages/ve-chung-toi.html` | **đã siết 2026-08-25** | Copy VI; SĐT/email Sở thật; bỏ MXH `#`. |
| P0 | `event-detail` | `pages/le-hoi-thong-nhat.html` | **đã siết 2026-08-25** | Copy VI; lịch “thường gặp”; SĐT Sở; related lệch cột. |
| P0 | `chronicles` | `pages/bien-nien.html` | **đã siết 2026-08-25** | Bỏ SideNav EN; TOC ngang; card VI. |
| P0 | `culture` | `pages/van-hoa.html` | **đã siết 2026-08-25 (lần 2)** | Hero kiểu kham-pha; 1954/1972 lệch cột; bản làng → cộng đồng; bỏ timeline card generic. |
| P1 | `intro` | `pages/gioi-thieu.html` | **đã siết 2026-08-25 (lần 2)** | Hero `min-h-[52dvh]` ảnh; hai cột nam/bắc; bỏ shader + 4 icon card. |
| P1 | `events` | `pages/su-kien.html` | **đã siết 2026-08-25 (lần 2)** | Tab editorial Nam/Bắc/Tất cả; bỏ pill + nút chết. |
| — | `food` | `pages/am-thuc.html` | **đã siết 2026-08-25** | Hero + 3 món nguồn (cháo bột, bánh ướt, rượu Kim Long); món khác; ăn theo vùng; bỏ quán bịa. |
| P1 | `thanh-co` | `pages/diem-den/thanh-co.html` | **đã siết 2026-08-25 (lần 2)** | Breadcrumb VI; `flex-col`; bỏ nút chết / map giả; liên kết nam–bắc. |
| — | `phong-nha` | `pages/diem-den/phong-nha.html` | **mới 2026-08-25** | Trang con UNESCO; mật độ Thành Cổ. |
| — | `nhat-le` | `pages/diem-den/nhat-le.html` | **mới 2026-08-25** | Trang con biển Đồng Hới. |
| — | `vo-nguyen-giap` | `pages/diem-den/vo-nguyen-giap.html` | **mới 2026-08-25** | Nhà lưu niệm Lộc Thủy; ảnh không nhận là nhà. |
| P2 | `travel` | `pages/kham-pha.html` | **đã siết 2026-08-25 (lần 2)** | Card trỏ trang con; hai lịch 2 ngày lệch cột. |
| P2 | `news` | `pages/tin-tuc.html` | **xem lại** | Lưới 3 cột tin — chấp nhận được nếu copy VI. |
| P2 | `news-detail` | `pages/tin-nang-luong.html` | **xem lại** | Thiếu `flex-col` trên `body`. |
| P2 | `timeline` | `pages/dong-thoi-gian.html` | **xem lại** | Thiếu `flex-col`; kiểm tra EN còn sót. |
| P2 | `legal` | `pages/chinh-sach.html` | **xem lại** | Chrome OK. |
| P2 | `auth` | `pages/dang-nhap.html` | **xem lại** | Dark split; `href="#"` quên mật khẩu; footer ẩn. |
| P2 | `notfound` | `404.html` | **ổn** | Footer ẩn; copy VI. |

## Mobile (2026-08-25)

Chrome chung: lề 20px + safe-area; menu overlay (không đẩy nội dung); chữ display/headline `clamp`; tắt lift card trên touch. Header 72px mobile.

## Phát hiện chung

1. **Nav Stitch còn sống** cạnh `#site-header`: `tim-kiem`, `van-hoa`, `bien-nien`, `lich-trinh`.
2. **Copy EN trên UI**: Search Results, Travel / Culture / Food, Travel Planner, All Ages Welcome, Explore Archive, John Doe.
3. **`body` thiếu `flex flex-col`**: dễ footer chồng — `event-detail`, `news-detail`, `culture`, `thanh-co`, `itinerary`, `search`, `intro`, `timeline`, `chronicles`, `food`.
4. **Lưới 3–4 card đối xứng**: `gioi-thieu`, `su-kien`, `am-thuc`, `le-hoi-thong-nhat` (related).
5. **`h-screen`**: `gioi-thieu` hero, `lich-trinh`, `ban-do` (map được phép).
6. **Nút chết**: `ve-chung-toi` MXH `#`; `dang-nhap` quên mật khẩu `#`.
7. **Không đụng:** `stitch_qu_ng_tr_k_c_kh_t_v_ng/`, shader.

## Mẫu chuẩn (đã làm)

- Trang chủ: hero lệch trái, số liệu có nguồn, 1+2 card, lịch 3 mục thật, CTA text.
- Cộng đồng: SĐT / nghĩa trang / homestay đã đối chiếu.
- Map: shell full-viewport, không footer.

Khi sửa trang khác: bắt chước mật độ và copy, không copy nguyên block trang chủ.
