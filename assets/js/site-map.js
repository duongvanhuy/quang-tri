/**
 * Site map and path helpers for the Quang Tri static site.
 * Paths are root-relative from the site root (index.html).
 */
(function (global) {
  const PAGES = {
    home: "index.html",
    intro: "pages/gioi-thieu.html",
    travel: "pages/kham-pha.html",
    map: "pages/ban-do.html",
    itinerary: "pages/lich-trinh.html",
    search: "pages/tim-kiem.html",
    "thanh-co": "pages/diem-den/thanh-co.html",
    "phong-nha": "pages/diem-den/phong-nha.html",
    "nhat-le": "pages/diem-den/nhat-le.html",
    "vo-nguyen-giap": "pages/diem-den/vo-nguyen-giap.html",
    food: "pages/am-thuc.html",
    culture: "pages/van-hoa.html",
    timeline: "pages/dong-thoi-gian.html",
    chronicles: "pages/bien-nien.html",
    events: "pages/su-kien.html",
    "event-detail": "pages/le-hoi-thong-nhat.html",
    news: "pages/tin-tuc.html",
    "news-detail": "pages/tin-nang-luong.html",
    community: "pages/cong-dong.html",
    about: "pages/ve-chung-toi.html",
    "admin-units": "pages/hanh-chinh.html",
    legal: "pages/chinh-sach.html",
    auth: "pages/dang-nhap.html",
    notfound: "404.html",
  };

  const NAV = [
    { id: "home", label: "Trang chủ", page: "home" },
    { id: "travel", label: "Khám phá", page: "travel" },
    { id: "culture", label: "Văn hóa", page: "culture" },
    { id: "events", label: "Sự kiện", page: "events" },
    { id: "food", label: "Ẩm thực", page: "food" },
    { id: "news", label: "Tin tức", page: "news" },
    { id: "community", label: "Cộng đồng", page: "community" },
  ];

  const ACTIVE_GROUP = {
    home: "home",
    intro: "home",
    travel: "travel",
    map: "travel",
    itinerary: "travel",
    search: "travel",
    "thanh-co": "travel",
    "phong-nha": "travel",
    "nhat-le": "travel",
    "vo-nguyen-giap": "travel",
    food: "food",
    culture: "culture",
    timeline: "culture",
    chronicles: "culture",
    events: "events",
    "event-detail": "events",
    news: "news",
    "news-detail": "news",
    community: "community",
    "admin-units": "home",
    about: "",
    legal: "",
    auth: "",
    notfound: "",
  };

  function scriptDir() {
    const scripts = document.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].src || "";
      if (src.indexOf("site-map.js") !== -1 || src.indexOf("layout.js") !== -1) {
        return src.replace(/\/[^/]+$/, "");
      }
    }
    return "";
  }

  function siteRoot() {
    return scriptDir().replace(/\/assets\/js$/, "");
  }

  function href(pageId, hash) {
    const rel = PAGES[pageId] || PAGES.home;
    const url = siteRoot() + "/" + rel;
    return hash ? url + hash : url;
  }

  global.QTSite = {
    PAGES,
    NAV,
    ACTIVE_GROUP,
    href,
    siteRoot,
  };
})(window);
