/**
 * One-shot writer for assets/data/don-vi-hanh-chinh.json
 * Source: NQ 1680/NQ-UBTVQH15 (16/6/2025), Điều 1 — Báo Điện tử Chính phủ.
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const units = [
  ["nam-gianh", "xã", "Nam Gianh", "bac", ["Quảng Hòa", "Quảng Lộc", "Quảng Văn", "Quảng Minh"]],
  ["nam-ba-don", "xã", "Nam Ba Đồn", "bac", ["Quảng Tân", "Quảng Trung", "Quảng Tiên", "Quảng Sơn", "Quảng Thủy"]],
  ["dan-hoa", "xã", "Dân Hóa", "bac", ["Trọng Hóa", "Dân Hóa"]],
  ["kim-dien", "xã", "Kim Điền", "bac", ["Hóa Sơn", "Hóa Hợp"]],
  ["kim-phu", "xã", "Kim Phú", "bac", ["Thượng Hóa", "Trung Hóa", "Minh Hóa", "Tân Hóa"]],
  ["minh-hoa", "xã", "Minh Hóa", "bac", ["thị trấn Quy Đạt", "Xuân Hóa", "Yên Hóa", "Hồng Hóa"]],
  ["tuyen-lam", "xã", "Tuyên Lâm", "bac", ["Lâm Hóa", "Thanh Hóa"]],
  ["tuyen-son", "xã", "Tuyên Sơn", "bac", ["Thanh Thạch", "Hương Hóa"]],
  ["dong-le", "xã", "Đồng Lê", "bac", ["thị trấn Đồng Lê", "Kim Hóa", "Lê Hóa", "Thuận Hóa", "Sơn Hóa"]],
  ["tuyen-phu", "xã", "Tuyên Phú", "bac", ["Đồng Hóa", "Thạch Hóa", "Đức Hóa"]],
  ["tuyen-binh", "xã", "Tuyên Bình", "bac", ["Phong Hóa", "Ngư Hóa", "Mai Hóa"]],
  ["tuyen-hoa", "xã", "Tuyên Hóa", "bac", ["Tiến Hóa", "Châu Hóa", "Cao Quảng", "Văn Hóa"]],
  ["tan-gianh", "xã", "Tân Gianh", "bac", ["Phù Cảnh", "Liên Trường", "Quảng Thanh"]],
  ["trung-thuan", "xã", "Trung Thuần", "bac", ["Quảng Lưu", "Quảng Thạch", "Quảng Tiến"]],
  ["quang-trach", "xã", "Quảng Trạch", "bac", ["Quảng Phương", "Quảng Xuân", "Quảng Hưng"]],
  ["hoa-trach", "xã", "Hòa Trạch", "bac", ["Quảng Châu", "Quảng Tùng", "Cảnh Dương"]],
  ["phu-trach", "xã", "Phú Trạch", "bac", ["Quảng Đông", "Quảng Phú", "Quảng Kim", "Quảng Hợp"]],
  ["thuong-trach", "xã", "Thượng Trạch", "bac", ["Tân Trạch", "Thượng Trạch"]],
  ["phong-nha", "xã", "Phong Nha", "bac", ["thị trấn Phong Nha", "Lâm Trạch", "Xuân Trạch", "Phúc Trạch"], ["phong-nha"]],
  ["bac-trach", "xã", "Bắc Trạch", "bac", ["Thanh Trạch", "Hạ Mỹ", "Liên Trạch", "Bắc Trạch"]],
  ["dong-trach", "xã", "Đông Trạch", "bac", ["Hải Phú (Bố Trạch)", "Sơn Lộc", "Đức Trạch", "Đồng Trạch"]],
  ["hoan-lao", "xã", "Hoàn Lão", "bac", ["thị trấn Hoàn Lão", "Trung Trạch", "Đại Trạch", "Tây Trạch", "Hòa Trạch"]],
  ["bo-trach", "xã", "Bố Trạch", "bac", ["Hưng Trạch", "Cự Nẫm", "Vạn Trạch", "Phú Định"]],
  ["nam-trach", "xã", "Nam Trạch", "bac", ["thị trấn Nông trường Việt Trung", "Nhân Trạch", "Lý Nam"]],
  ["quang-ninh", "xã", "Quảng Ninh", "bac", ["thị trấn Quán Hàu", "Vĩnh Ninh", "Võ Ninh", "Hàm Ninh"]],
  ["ninh-chau", "xã", "Ninh Châu", "bac", ["Tân Ninh", "Gia Ninh", "Duy Ninh", "Hải Ninh"]],
  ["truong-ninh", "xã", "Trường Ninh", "bac", ["Vạn Ninh", "An Ninh", "Xuân Ninh", "Hiền Ninh"]],
  ["truong-son", "xã", "Trường Sơn", "bac", ["Trường Xuân", "Trường Sơn"]],
  ["le-thuy", "xã", "Lệ Thủy", "bac", ["thị trấn Kiến Giang", "Liên Thủy", "Xuân Thủy", "An Thủy", "Phong Thủy", "Lộc Thủy"], ["vo-nguyen-giap"]],
  ["cam-hong", "xã", "Cam Hồng", "bac", ["Cam Thủy (Lệ Thủy)", "Thanh Thủy", "Hồng Thủy", "Ngư Thủy Bắc"]],
  ["sen-ngu", "xã", "Sen Ngư", "bac", ["Hưng Thủy", "Sen Thủy", "Ngư Thủy"]],
  ["tan-my", "xã", "Tân Mỹ", "bac", ["Tân Thủy", "Dương Thủy", "Mỹ Thủy", "Thái Thủy"]],
  ["truong-phu", "xã", "Trường Phú", "bac", ["Trường Thủy", "Mai Thủy", "Phú Thủy"]],
  ["le-ninh", "xã", "Lệ Ninh", "bac", ["thị trấn Nông trường Lệ Ninh", "Sơn Thủy", "Hoa Thủy"]],
  ["kim-ngan", "xã", "Kim Ngân", "bac", ["Kim Thủy", "Ngân Thủy", "Lâm Thủy"]],
  ["vinh-linh", "xã", "Vĩnh Linh", "nam", ["thị trấn Hồ Xá", "Vĩnh Long", "Vĩnh Chấp"]],
  ["cua-tung", "xã", "Cửa Tùng", "nam", ["thị trấn Cửa Tùng", "Vĩnh Giang", "Hiền Thành", "Kim Thạch"], ["cua-tung", "hien-luong", "vinh-moc"]],
  ["vinh-hoang", "xã", "Vĩnh Hoàng", "nam", ["Vĩnh Thái", "Trung Nam", "Vĩnh Hòa", "Vĩnh Tú"]],
  ["vinh-thuy", "xã", "Vĩnh Thủy", "nam", ["Vĩnh Lâm", "Vĩnh Sơn", "Vĩnh Thủy"]],
  ["ben-quan", "xã", "Bến Quan", "nam", ["thị trấn Bến Quan", "Vĩnh Ô", "Vĩnh Hà", "Vĩnh Khê"]],
  ["con-tien", "xã", "Cồn Tiên", "nam", ["Hải Thái", "Linh Trường", "Gio An", "Gio Sơn"]],
  ["cua-viet", "xã", "Cửa Việt", "nam", ["thị trấn Cửa Việt", "Gio Mai", "Gio Hải"], ["cua-viet"]],
  ["gio-linh", "xã", "Gio Linh", "nam", ["thị trấn Gio Linh", "Gio Quang", "Gio Mỹ", "Phong Bình"]],
  ["ben-hai", "xã", "Bến Hải", "nam", ["Trung Hải", "Trung Giang", "Trung Sơn"]],
  ["cam-lo", "xã", "Cam Lộ", "nam", ["thị trấn Cam Lộ", "Cam Thành", "Cam Chính", "Cam Nghĩa"]],
  ["hieu-giang", "xã", "Hiếu Giang", "nam", ["Cam Thủy (Cam Lộ)", "Cam Hiếu", "Cam Tuyền", "Thanh An"]],
  ["la-lay", "xã", "La Lay", "nam", ["A Bung", "A Ngo"]],
  ["ta-rut", "xã", "Tà Rụt", "nam", ["A Vao", "Húc Nghì", "Tà Rụt"]],
  ["dakrong", "xã", "Đakrông", "nam", ["Ba Nang", "Tà Long", "Đakrông"]],
  ["ba-long", "xã", "Ba Lòng", "nam", ["Triệu Nguyên", "Ba Lòng"]],
  ["huong-hiep", "xã", "Hướng Hiệp", "nam", ["thị trấn Krông Klang", "Mò Ó", "Hướng Hiệp"]],
  ["huong-lap", "xã", "Hướng Lập", "nam", ["Hướng Việt", "Hướng Lập"]],
  ["huong-phung", "xã", "Hướng Phùng", "nam", ["Hướng Sơn", "Hướng Linh", "Hướng Phùng"], ["chenh-venh"]],
  ["khe-sanh", "xã", "Khe Sanh", "nam", ["thị trấn Khe Sanh", "Tân Hợp", "Húc", "Hướng Tân"]],
  ["tan-lap", "xã", "Tân Lập", "nam", ["Tân Liên", "Hướng Lộc", "Tân Lập"]],
  ["lao-bao", "xã", "Lao Bảo", "nam", ["Tân Thành (Hướng Hóa)", "Tân Long", "thị trấn Lao Bảo"], ["lao-bao"]],
  ["lia", "xã", "Lìa", "nam", ["Thanh", "Thuận", "Lìa"]],
  ["a-doi", "xã", "A Dơi", "nam", ["Ba Tầng", "Xy", "A Dơi"]],
  ["trieu-phong", "xã", "Triệu Phong", "nam", ["thị trấn Ái Tử", "Triệu Thành", "Triệu Thượng"]],
  ["ai-tu", "xã", "Ái Tử", "nam", ["Triệu Ái", "Triệu Giang", "Triệu Long"]],
  ["trieu-binh", "xã", "Triệu Bình", "nam", ["Triệu Độ", "Triệu Thuận", "Triệu Hòa", "Triệu Đại"]],
  ["trieu-co", "xã", "Triệu Cơ", "nam", ["Triệu Trung", "Triệu Tài", "Triệu Cơ"]],
  ["nam-cua-viet", "xã", "Nam Cửa Việt", "nam", ["Triệu Trạch", "Triệu Phước", "Triệu Tân"]],
  ["dien-sanh", "xã", "Diên Sanh", "nam", ["thị trấn Diên Sanh", "Hải Trường", "Hải Định"]],
  ["my-thuy", "xã", "Mỹ Thủy", "nam", ["Hải Dương", "Hải An", "Hải Khê"]],
  ["hai-lang", "xã", "Hải Lăng", "nam", ["Hải Phú (Hải Lăng)", "Hải Lâm", "Hải Thượng"]],
  ["nam-hai-lang", "xã", "Nam Hải Lăng", "nam", ["Hải Sơn", "Hải Phong", "Hải Chánh"]],
  ["vinh-dinh", "xã", "Vĩnh Định", "nam", ["Hải Quy", "Hải Hưng", "Hải Bình"]],
  ["dong-hoi", "phường", "Đồng Hới", "bac", ["Đức Ninh Đông", "Đồng Hải", "Đồng Phú", "Phú Hải", "Hải Thành", "Nam Lý", "Bảo Ninh", "Đức Ninh"], ["dong-hoi", "nhat-le"]],
  ["dong-thuan", "phường", "Đồng Thuận", "bac", ["Bắc Lý", "Lộc Ninh", "Quang Phú"]],
  ["dong-son", "phường", "Đồng Sơn", "bac", ["Bắc Nghĩa", "Đồng Sơn", "Nghĩa Ninh", "Thuận Đức"]],
  ["ba-don", "phường", "Ba Đồn", "bac", ["Quảng Phong", "Quảng Long", "Ba Đồn", "Quảng Hải"]],
  ["bac-gianh", "phường", "Bắc Gianh", "bac", ["Quảng Phúc", "Quảng Thọ", "Quảng Thuận"]],
  ["dong-ha", "phường", "Đông Hà", "nam", ["Phường 1 (Đông Hà)", "Phường 3 (Đông Hà)", "Phường 4", "Đông Giang", "Đông Thanh"]],
  ["nam-dong-ha", "phường", "Nam Đông Hà", "nam", ["Phường 2 (Đông Hà)", "Phường 5", "Đông Lễ", "Đông Lương"]],
  ["quang-tri", "phường", "Quảng Trị", "nam", ["Phường 1 (thị xã Quảng Trị)", "Phường 2 (thị xã Quảng Trị)", "Phường 3 (thị xã Quảng Trị)", "An Đôn", "Hải Lệ"], ["thanh-co"]],
  ["con-co", "đặc khu", "Cồn Cỏ", "nam", ["huyện Cồn Cỏ"], ["con-co"]],
  ["tan-thanh", "xã", "Tân Thành", "bac", ["xã Tân Thành (huyện Minh Hóa)"], [], true],
];

const article = {
  source: {
    title: "Nghị quyết số 1680/NQ-UBTVQH15",
    issuer: "Ủy ban Thường vụ Quốc hội",
    date: "2025-06-16",
    effective: "2025-07-01",
    parent: "Nghị quyết số 202/2025/QH15 ngày 12/6/2025 của Quốc hội",
    proposal: "Đề án số 365/ĐA-CP ngày 09/5/2025 của Chính phủ",
    urls: [
      "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-1680-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-tinh-quang-tri-nam-2025-119250616205443422.htm",
      "https://xaydungchinhsach.chinhphu.vn/sap-xep-dvhc-danh-sach-78-xa-phuong-dac-khu-cua-tinh-quang-tri-119250623080429221.htm",
    ],
  },
  summary: {
    total: 78,
    xa: 69,
    phuong: 8,
    dacKhu: 1,
    formedAfter: 77,
    unchanged: 1,
    unchangedNote: "Xã Tân Thành (huyện Minh Hóa cũ) không thực hiện sắp xếp.",
    note: "Chưa công bố ranh giới số / centroid chính thức. Không vẽ polygon hay ghim 78 điểm. Điều 3 NQ 1680 giao Chính phủ xác định diện tích trước 30/9/2025.",
  },
  units: units.map((row, i) => {
    const [id, type, name, region, from, places = [], unchanged = false] = row;
    return {
      id,
      n: i + 1,
      type,
      name,
      fullName: `${type} ${name}`,
      region,
      from,
      places,
      unchanged,
    };
  }),
};

if (article.units.length !== 78) {
  throw new Error("Expected 78 units, got " + article.units.length);
}

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "..", "assets", "data", "don-vi-hanh-chinh.json");
writeFileSync(out, JSON.stringify(article, null, 2), "utf8");
console.log("Wrote", out, article.units.length, "units");
