import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(
  ROOT,
  "stitch_qu_ng_tr_k_c_kh_t_v_ng",
  "stitch_qu_ng_tr_k_c_kh_t_v_ng"
);

const PAGES = [
  { src: "trang_ch_qu_ng_tr_mi_n_t_c_a_k_c_v_kh_t_v_ng/code.html", dest: "index.html", id: "home", title: "Quảng Trị — Miền đất của ký ức và khát vọng" },
  { src: "trang_ch_qu_ng_tr_n_i_l_ch_s_g_p_t_ng_lai/code.html", dest: "pages/gioi-thieu.html", id: "intro", title: "Quảng Trị — Nơi lịch sử gặp tương lai" },
  { src: "kh_m_ph_qu_ng_tr_c_ng_th_ng_tin_du_l_ch/code.html", dest: "pages/kham-pha.html", id: "travel", title: "Khám phá Quảng Trị" },
  { src: "b_n_s_t_ng_t_c_kh_m_ph_qu_ng_tr/code.html", dest: "pages/ban-do.html", id: "map", title: "Bản đồ số Quảng Trị" },
  { src: "l_p_k_ho_ch_h_nh_tr_nh_qu_ng_tr_k_c_kh_t_v_ng/code.html", dest: "pages/lich-trinh.html", id: "itinerary", title: "Lịch trình hành trình Quảng Trị" },
  { src: "t_m_ki_m_th_nh_c_qu_ng_tr/code.html", dest: "pages/tim-kiem.html", id: "search", title: "Tìm kiếm — Quảng Trị" },
  { src: "chi_ti_t_i_m_n_th_nh_c_qu_ng_tr_b_n_h_ng_ca_b_t_t/code.html", dest: "pages/diem-den/thanh-co.html", id: "thanh-co", title: "Thành Cổ Quảng Trị" },
  { src: "m_th_c_c_s_n_qu_ng_tr_h_ng_v_b_n_a/code.html", dest: "pages/am-thuc.html", id: "food", title: "Ẩm thực Quảng Trị" },
  { src: "v_n_h_a_l_ch_s_qu_ng_tr_h_o_h_ng_v_s_u_l_ng/code.html", dest: "pages/van-hoa.html", id: "culture", title: "Văn hóa & lịch sử Quảng Trị" },
  { src: "d_ng_th_i_gian_l_ch_s_qu_ng_tr/code.html", dest: "pages/dong-thoi-gian.html", id: "timeline", title: "Dòng thời gian lịch sử Quảng Trị" },
  { src: "d_ng_th_i_gian_l_ch_s_qu_ng_tr_h_o_h_ng_v_kh_t_v_ng/code.html", dest: "pages/bien-nien.html", id: "chronicles", title: "Biên niên sử Quảng Trị" },
  { src: "s_ki_n_l_h_i_nh_p_p_v_n_h_a_qu_ng_tr/code.html", dest: "pages/su-kien.html", id: "events", title: "Sự kiện & lễ hội Quảng Trị" },
  { src: "chi_ti_t_s_ki_n_l_h_i_th_ng_nh_t_non_s_ng_chung_m_t_d_ng_s_ng/code.html", dest: "pages/le-hoi-thong-nhat.html", id: "event-detail", title: "Lễ hội Thống nhất non sông" },
  { src: "tin_t_c_s_ki_n_qu_ng_tr_nh_p_p_di_s_n/code.html", dest: "pages/tin-tuc.html", id: "news", title: "Tin tức & sự kiện Quảng Trị" },
  { src: "chi_ti_t_tin_t_c_qu_ng_tr_kh_t_v_ng_v_ph_t_tri_n/code.html", dest: "pages/tin-nang-luong.html", id: "news-detail", title: "Quảng Trị — Trung tâm năng lượng sạch miền Trung" },
  { src: "c_ng_ng_qu_ng_tr_k_t_n_i_v_chia_s/code.html", dest: "pages/cong-dong.html", id: "community", title: "Cộng đồng Quảng Trị" },
  { src: "v_ch_ng_t_i_li_n_h_qu_ng_tr_kh_t_v_ng_k_c/code.html", dest: "pages/ve-chung-toi.html", id: "about", title: "Về chúng tôi — Quảng Trị" },
  { src: "ch_nh_s_ch_i_u_kho_n_qu_ng_tr_digital/code.html", dest: "pages/chinh-sach.html", id: "legal", title: "Chính sách & điều khoản" },
  { src: "ng_nh_p_ng_k_qu_ng_tr_digital/code.html", dest: "pages/dang-nhap.html", id: "auth", title: "Đăng nhập | Quảng Trị Explorer", skipChrome: true },
  { src: "404_trang_kh_ng_t_m_th_y/code.html", dest: "404.html", id: "notfound", title: "Không tìm thấy trang — Quảng Trị" },
];

const DEPTH = {
  0: { assets: "assets", to: (p) => p },
  1: { assets: "../assets", to: (p) => (p.startsWith("pages/") ? p.slice(6) : "../" + p) },
  2: { assets: "../../assets", to: (p) => (p.startsWith("pages/") ? "../" + p.slice(6) : "../../" + p) },
};

function depthOf(dest) {
  return dest.split("/").length - 1;
}

function assetPrefix(dest) {
  return DEPTH[depthOf(dest)].assets;
}

function hrefFor(fromDest, toDest) {
  const d = depthOf(fromDest);
  return DEPTH[d].to(toDest);
}

const PAGE_HREF = Object.fromEntries(PAGES.map((p) => [p.id, p.dest]));

function resolvePage(fromDest, pageId) {
  return hrefFor(fromDest, PAGE_HREF[pageId]);
}

function extractTag(html, start) {
  const open = html.slice(start).match(/^<([a-zA-Z0-9-]+)/);
  if (!open) return null;
  const name = open[1].toLowerCase();
  const voidTags = new Set(["img", "input", "br", "hr", "meta", "link", "source", "area", "col", "embed", "wbr"]);
  if (voidTags.has(name)) {
    const end = html.indexOf(">", start) + 1;
    return { start, end, name, html: html.slice(start, end) };
  }
  const re = new RegExp(`</?${name}\\b`, "gi");
  re.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    const token = html.slice(m.index, html.indexOf(">", m.index) + 1);
    if (token.startsWith("</")) {
      depth -= 1;
      if (depth === 0) {
        const end = m.index + token.length;
        return { start, end, name, html: html.slice(start, end) };
      }
    } else if (!token.endsWith("/>")) {
      depth += 1;
    }
  }
  return null;
}

function isSidebarChrome(tagHtml) {
  const cls = (tagHtml.match(/class="([^"]*)"/) || [, ""])[1];
  return (
    /(flex-col|flex\s+flex-col)/.test(cls) &&
    /left-0/.test(cls) &&
    /(w-64|w-72|w-56)/.test(cls)
  );
}

function isTopChrome(tagHtml) {
  if (isSidebarChrome(tagHtml)) return false;
  if (/aria-label="Breadcrumb"/i.test(tagHtml)) return false;
  const firstLine = tagHtml.slice(0, 400);
  const cls = (firstLine.match(/class="([^"]*)"/) || [, ""])[1];
  const looksBar =
    /(sticky|fixed)/.test(cls) &&
    /(top-0|docked|full-width|z-50|h-16|h-20)/.test(cls);
  const looksHero = /h-screen|h-\[70vh\]|h-\[80vh\]/.test(cls);
  return looksBar && !looksHero;
}

function stripTopChrome(html) {
  const bodyMatch = html.match(/<body[^>]*>/i);
  if (!bodyMatch) return html;
  let cursor = bodyMatch.index + bodyMatch[0].length;
  let safety = 0;
  while (safety++ < 8) {
    const rest = html.slice(cursor);
    const skip = rest.match(/^(\s|<!--[\s\S]*?-->)*/);
    cursor += skip ? skip[0].length : 0;
    if (!html.slice(cursor).startsWith("<")) break;
    const tag = extractTag(html, cursor);
    if (!tag) break;
    if ((tag.name === "nav" || tag.name === "header" || tag.name === "aside") && isTopChrome(tag.html)) {
      html = html.slice(0, tag.start) + html.slice(tag.end);
      continue;
    }
    // Mobile-only top bars that sit after sidebar
    if ((tag.name === "header" || tag.name === "nav") && isTopChrome(tag.html)) {
      html = html.slice(0, tag.start) + html.slice(tag.end);
      continue;
    }
    break;
  }
  return html;
}

function stripFooters(html) {
  return html.replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
}

function injectShared(html, dest, page) {
  const assets = assetPrefix(dest);

  html = html.replace(
    /<script id="tailwind-config">[\s\S]*?<\/script>/i,
    "<!-- tailwind theme moved to assets/js/theme.js -->"
  );

  if (!/tailwindcss\.com/.test(html)) {
    html = html.replace(
      "</head>",
      `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>\n</head>`
    );
  }

  // Theme must load BEFORE the Tailwind CDN so tokens are available.
  html = html.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>/,
    `<link href="${assets}/css/base.css" rel="stylesheet"/>\n<script src="${assets}/js/theme.js"></script>\n$&`
  );

  if (!/fonts\.googleapis\.com\/css2\?family=EB\+Garamond/.test(html)) {
    html = html.replace(
      "</head>",
      `<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet"/>\n</head>`
    );
  }
  if (!/Material\+Symbols/.test(html)) {
    html = html.replace(
      "</head>",
      `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>\n</head>`
    );
  }

  html = html.replace(/<html([^>]*)>/i, (m, attrs) => {
    let next = attrs;
    if (!/lang=/.test(next)) next += ' lang="vi"';
    else next = next.replace(/lang="[^"]*"/, 'lang="vi"');
    return `<html${next}>`;
  });

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);

  html = html.replace(/<body([^>]*)>/i, (m, attrs) => {
    let next = attrs
      .replace(/\sdata-page="[^"]*"/, "")
      .replace(/\spt-\[[^\]]+\]/g, "")
      .replace(/\spt-16\b/g, "");
    next += ` data-page="${page.id}"`;
    return `<body${next}>\n<div id="site-header"></div>`;
  });
  html = html.replace(/<main class="flex-grow pt-\[88px\]">/g, '<main class="flex-grow">');

  const scripts = [
    `<script src="${assets}/js/site-map.js"></script>`,
    `<script src="${assets}/js/layout.js"></script>`,
  ].join("\n");

  if (html.includes("</body>")) {
    html = html.replace("</body>", `<div id="site-footer"></div>\n${scripts}\n</body>`);
  } else {
    html += `<div id="site-footer"></div>\n${scripts}`;
  }

  return html;
}

const LINK_TEXT_TO_PAGE = [
  { re: /^(travel|destinations|tourism|heritage|economy)$/i, page: "travel" },
  { re: /^(culture-history|culture|cultural archive)$/i, page: "culture" },
  { re: /^(events|latest news|public notices)$/i, page: "news" },
  { re: /^food$/i, page: "food" },
  { re: /^community$/i, page: "community" },
  { re: /^(timeline|resistance war|rebuilding)$/i, page: "timeline" },
  { re: /^(map|tourism map|tourism hub|map view)$/i, page: "map" },
  { re: /^(home|overview)$/i, page: "home" },
  { re: /^(about us|về chúng tôi|contact support|support)$/i, page: "about" },
  { re: /^(terms of service|privacy policy|heritage conservation)$/i, page: "legal" },
  { re: /^(investment|investment portal|modern vision)$/i, page: "news-detail" },
  { re: /^(năng lượng sạch|đầu tư|điện gió|kinh tế số)$/i, page: "news-detail" },
  { re: /^(di sản|văn hóa cộng đồng)$/i, page: "culture" },
  { re: /^du lịch sinh thái$/i, page: "travel" },
  { re: /^quy hoạch đô thị$/i, page: "news" },
  { re: /^(archives|tourism board|artifacts)$/i, page: "culture" },
  { re: /^historical sites$/i, page: "thanh-co" },
  { re: /^(my plan|saved|transport)$/i, page: "itinerary" },
  { re: /^(settings|đăng nhập)$/i, page: "auth" },
  { re: /^(đọc tiếp|tìm hiểu thêm|xem chi tiết|view details|chi tiết hành trình)$/i, page: null },
];

function textOfAnchor(inner) {
  return inner
    .replace(/<span[^>]*material-symbols-outlined[^>]*>[\s\S]*?<\/span>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function rewriteAnchors(html, dest) {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs, inner) => {
    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    const href = hrefMatch ? hrefMatch[1] : "";
    const text = textOfAnchor(inner);

    let pageId = null;
    if (!href || href === "#" || href === "/" || href === "/explore") {
      for (const rule of LINK_TEXT_TO_PAGE) {
        if (rule.re.test(text)) {
          pageId = rule.page;
          break;
        }
      }
    }

    // Vietnamese / content phrases
    const phrases = [
      [/đọc thêm về lịch sử/i, "timeline"],
      [/xem tất cả( sự kiện)?/i, "events"],
      [/khám phá ngay/i, "travel"],
      [/tìm hiểu thêm/i, "culture"],
      [/đọc tiếp/i, "news-detail"],
      [/xem chi tiết/i, "event-detail"],
      [/view details/i, "events"],
      [/chi tiết hành trình/i, "itinerary"],
      [/điểm đến/i, "travel"],
      [/về chúng tôi/i, "about"],
      [/liên hệ/i, "about"],
      [/bản đồ/i, "map"],
      [/tin tức/i, "news"],
      [/sự kiện/i, "events"],
      [/quy định chung|chính sách|điều khoản/i, "legal"],
      [/trở về trang chủ|trang chủ/i, "home"],
      [/khám phá điểm đến|khám phá quảng trị hiện đại/i, "travel"],
    ];
    if (!pageId && (!href || href === "#" || href.startsWith("/"))) {
      for (const [re, id] of phrases) {
        if (re.test(text)) {
          pageId = id;
          break;
        }
      }
    }

    if (!pageId) return full;
    const next = resolvePage(dest, pageId);
    if (hrefMatch) {
      return `<a${attrs.replace(/href="[^"]*"/i, `href="${next}"`)}>${inner}</a>`;
    }
    return `<a${attrs} href="${next}">${inner}</a>`;
  });
}

function pageSpecific(html, dest, page) {
  const h = (id) => resolvePage(dest, id);

  if (page.id === "home" || page.id === "intro") {
    html = html.replace(
      /<h3 class="font-title-modern text-lg font-bold text-on-surface mb-2">Lễ hội Thống nhất non sông<\/h3>/,
      `<h3 class="font-title-modern text-lg font-bold text-on-surface mb-2"><a class="hover:text-primary" href="${h("event-detail")}">Lễ hội Thống nhất non sông</a></h3>`
    );
    html = html.replace(
      /<button class="w-full py-2 border border-primary text-primary rounded-full font-label-caps hover:bg-primary hover:text-on-primary transition-colors text-sm">Xem chi tiết<\/button>/,
      `<a class="w-full py-2 border border-primary text-primary rounded-full font-label-caps hover:bg-primary hover:text-on-primary transition-colors text-sm text-center" href="${h("event-detail")}">Xem chi tiết</a>`
    );
    html = html.replace(
      /<button class="w-full py-2 border border-tertiary text-tertiary rounded-full font-label-caps hover:bg-tertiary hover:text-on-tertiary transition-colors text-sm">Xem chi tiết<\/button>/,
      `<a class="w-full py-2 border border-tertiary text-tertiary rounded-full font-label-caps hover:bg-tertiary hover:text-on-tertiary transition-colors text-sm text-center" href="${h("travel")}">Xem chi tiết</a>`
    );
  }

  if (page.id === "home") {
    html = html.replace(
      /<div class="w-full max-w-2xl mt-4 glass-panel p-2 rounded-full flex items-center shadow-lg">([\s\S]*?)<\/div>/,
      `<form action="${h("search")}" method="get" class="w-full max-w-2xl mt-4 glass-panel p-2 rounded-full flex items-center shadow-lg">$1</form>`
    );
    html = html.replace(
      /placeholder="Tìm kiếm địa điểm, sự kiện\.\.\." type="text"/,
      `name="q" placeholder="Tìm kiếm địa điểm, sự kiện..." type="search"`
    );
    html = html.replace(
      /<a class="relative h-\[300px\] rounded-xl overflow-hidden group reveal" href="#">/,
      `<a class="relative h-[300px] rounded-xl overflow-hidden group reveal" href="${h("timeline")}">`
    );
    html = html.replace(
      /<a class="relative h-\[300px\] rounded-xl overflow-hidden group reveal delay-100" href="#">/,
      `<a class="relative h-[300px] rounded-xl overflow-hidden group reveal delay-100" href="${h("travel")}">`
    );
    html = html.replace(
      /<a class="relative h-\[300px\] rounded-xl overflow-hidden group reveal delay-200" href="#">/,
      `<a class="relative h-[300px] rounded-xl overflow-hidden group reveal delay-200" href="${h("culture")}">`
    );
    html = html.replace(
      /<a class="relative h-\[300px\] rounded-xl overflow-hidden group reveal delay-300" href="#">/,
      `<a class="relative h-[300px] rounded-xl overflow-hidden group reveal delay-300" href="${h("food")}">`
    );
  }

  if (page.id === "intro") {
    html = html.replace(
      /<button class="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full[\s\S]*?<\/button>/,
      `<a class="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full shadow-lg hover:bg-secondary transition-all hover:scale-105 active:scale-95 flex items-center gap-2" href="${h("travel")}">Khám phá ngay <span class="material-symbols-outlined">arrow_forward</span></a>`
    );
    html = html.replace(
      /<div class="glass-panel p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-all duration-300 reveal group cursor-pointer border-t-4 border-primary">([\s\S]*?)<\/div>\s*<!-- Nature -->/,
      `<a class="block glass-panel p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-all duration-300 reveal group cursor-pointer border-t-4 border-primary" href="${h("timeline")}">$1</a><!-- Nature -->`
    );
  }

  if (page.id === "travel") {
    html = html.replace(/Thành Cổ Quảng Trị/g, (m, offset, str) => {
      const before = str.slice(Math.max(0, offset - 80), offset);
      if (before.includes("href=")) return m;
      return `<a class="hover:underline" href="${h("thanh-co")}">${m}</a>`;
    });
    html = html.replace(
      /<button class="px-3 py-1 text-primary hover:bg-primary\/10 flex items-center justify-center transition-colors">\s*<span class="material-symbols-outlined text-\[20px\]" data-icon="map">map<\/span>\s*<\/button>/,
      `<a class="px-3 py-1 text-primary hover:bg-primary/10 flex items-center justify-center transition-colors" href="${h("map")}" aria-label="Mở bản đồ"><span class="material-symbols-outlined text-[20px]" data-icon="map">map</span></a>`
    );
    html = html.replace(
      /<button class="hidden md:flex items-center gap-2 text-primary font-label-caps text-label-caps hover:text-surface-tint transition-colors">\s*Xem tất cả[\s\S]*?<\/button>/,
      `<a class="hidden md:flex items-center gap-2 text-primary font-label-caps text-label-caps hover:text-surface-tint transition-colors" href="${h("itinerary")}">Xem tất cả <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span></a>`
    );
    html = html.replace(
      /<span class="text-primary font-label-caps text-label-caps group-hover:underline">Chi tiết hành trình<\/span>/g,
      `<a class="text-primary font-label-caps text-label-caps group-hover:underline" href="${h("itinerary")}">Chi tiết hành trình</a>`
    );
  }

  if (page.id === "search") {
    html = html.replace(
      /Thành Cổ/g,
      `<a class="hover:text-primary" href="${h("thanh-co")}">Thành Cổ</a>`
    );
  }

  if (page.id === "map") {
    html = html.replace(
      /Thành Cổ Quảng Trị/g,
      `<a class="hover:underline" href="${h("thanh-co")}">Thành Cổ Quảng Trị</a>`
    );
  }

  if (page.id === "news") {
    html = html.replace(
      /Khởi công dự án năng lượng tái tạo lớn nhất miền Trung tại Quảng Trị/,
      `<a class="hover:text-secondary" href="${h("news-detail")}">Khởi công dự án năng lượng tái tạo lớn nhất miền Trung tại Quảng Trị</a>`
    );
    html = html.replace(/href="#"/g, `href="${h("news-detail")}"`);
  }

  if (page.id === "events") {
    html = html.replace(
      /Lễ hội Thống nhất non sông/g,
      `<a class="hover:text-primary" href="${h("event-detail")}">Lễ hội Thống nhất non sông</a>`
    );
  }

  if (page.id === "notfound") {
    html = html.replace(/href="\/"/g, `href="${h("home")}"`);
    html = html.replace(/href="\/explore"/g, `href="${h("travel")}"`);
  }

  if (page.id === "auth") {
    html = html.replace(
      /<h1 class="font-display-heritage text-display-heritage text-primary dark:text-secondary-fixed-dim">Quang Tri<\/h1>/,
      `<a href="${h("home")}" class="font-display-heritage text-display-heritage text-primary dark:text-secondary-fixed-dim">Quảng Trị</a>`
    );
  }

  if (page.id === "culture" || page.id === "chronicles") {
    html = html.replace(
      /<button class="w-full py-3 px-4 bg-primary text-on-primary rounded-lg[\s\S]*?<\/button>/,
      `<a class="w-full py-3 px-4 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2" href="${h("timeline")}">Dòng thời gian <span class="material-symbols-outlined text-sm">arrow_forward</span></a>`
    );
  }

  if (page.id === "itinerary") {
    html = html.replace(
      /Thành Cổ Quảng Trị/g,
      `<a class="hover:underline" href="${h("thanh-co")}">Thành Cổ Quảng Trị</a>`
    );
  }

  if (page.id === "about") {
    html = html.replace(
      /<section class="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop">/,
      `<section id="lien-he" class="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop">`
    );
  }

  if (page.id === "thanh-co") {
    html = html.replace(
      /<a class="hover:underline" href="#">Home<\/a>/,
      `<a class="hover:underline" href="${h("home")}">Trang chủ</a>`
    );
    html = html.replace(
      /<a class="hover:underline" href="#">Travel<\/a>/,
      `<a class="hover:underline" href="${h("travel")}">Khám phá</a>`
    );
  }

  return html;
}

function closeOrphanDivs(html, dest, page) {
  return html;
}

function process(page) {
  const srcPath = path.join(SRC, page.src);
  let html = fs.readFileSync(srcPath, "utf8");
  html = stripTopChrome(html);
  html = stripFooters(html);
  html = injectShared(html, page.dest, page);
  html = rewriteAnchors(html, page.dest);
  html = pageSpecific(html, page.dest, page);
  html = closeOrphanDivs(html, page.dest, page);
  const destPath = path.join(ROOT, page.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html, "utf8");
  console.log("wrote", page.dest);
}

function copyShaders() {
  const dest = path.join(ROOT, "assets", "shaders");
  fs.mkdirSync(dest, { recursive: true });
  for (const name of ["shader_1", "shader_2"]) {
    const from = path.join(SRC, name, "code.html");
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, path.join(dest, `${name}.html`));
    }
  }
}

function copyDesign() {
  const from = path.join(SRC, "aspiration_and_memory", "DESIGN.md");
  if (fs.existsSync(from)) {
    const dest = path.join(ROOT, "assets", "design");
    fs.mkdirSync(dest, { recursive: true });
    fs.copyFileSync(from, path.join(dest, "DESIGN.md"));
  }
}

for (const page of PAGES) process(page);
copyShaders();
copyDesign();
console.log("done");
