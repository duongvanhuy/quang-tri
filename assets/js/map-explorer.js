/**
 * Bản đồ số — danh sách, tìm không dấu, Leaflet + tuyến liên kết.
 */
(function () {
  const CATS = {
    heritage: { label: "Lịch sử", icon: "account_balance", color: "#9A7428" },
    nature: { label: "Thiên nhiên", icon: "waves", color: "#2A4560" },
    culture: { label: "Văn hóa", icon: "theater_comedy", color: "#6B2218" },
    growth: { label: "Phát triển", icon: "trending_up", color: "#355A78" },
  };

  const PLACES = [
    {
      id: "thanh-co",
      name: "Thành Cổ Quảng Trị",
      cat: "heritage",
      district: "Phường Quảng Trị",
      time: "1–2 giờ",
      tag: "Di tích quốc gia đặc biệt",
      desc: "Di tích bên sông Thạch Hãn. 81 ngày đêm 1972. Đi chậm, trang phục lịch sự.",
      geo: "Trung tâm phường Quảng Trị, bên Thạch Hãn. Ghim theo tọa độ Wikipedia (thành).",
      aliases: "thanh co, citadel, 81 ngay, thach han, thi xa",
      img: "../assets/images/img-e9e27cc4d7.jpg",
      href: "diem-den/thanh-co.html",
      itin: "nam",
      coordSrc: "Wikipedia (Citadel of Quảng Trị)",
      lat: 16.7539,
      lng: 107.1895,
    },
    {
      id: "hien-luong",
      name: "Cầu Hiền Lương",
      cat: "heritage",
      district: "Xã Cửa Tùng (Hiền Thành cũ)",
      time: "45 phút",
      tag: "Đôi bờ Bến Hải",
      desc: "Cầu QL1/AH1 bắc qua sông Bến Hải. Gần vĩ tuyến 17 — ranh giới quân sự 1954–1975, nay là di tích thống nhất.",
      geo: "Thôn Hiền Lương, phía trong so với cửa biển Cửa Tùng khoảng 10 km. Không trùng cửa sông.",
      aliases: "hien luong, ben hai, vi tuyen 17, vinh linh, cau",
      img: "../assets/images/img-2897a1c04d.jpg",
      href: "van-hoa.html",
      itin: "nam",
      coordSrc: "Wikipedia (Cầu Hiền Lương)",
      lat: 17.00389,
      lng: 107.05,
    },
    {
      id: "vinh-moc",
      name: "Địa đạo Vịnh Mốc",
      cat: "heritage",
      district: "Xã Cửa Tùng (ven biển Vĩnh Linh cũ)",
      time: "1 giờ",
      tag: "Di tích quốc gia đặc biệt",
      desc: "Làng hầm ven biển Vĩnh Linh. Theo báo Nhân Dân: khoảng 8 km bắc Cửa Tùng.",
      geo: "Thôn Vịnh Mốc. Ghim gần khu di tích ven biển — không phải từng cửa hầm.",
      aliases: "vinh moc, dia dao, ham, vinh linh, vinh thach",
      img: "../assets/images/img-3386e8f255.jpg",
      href: "dong-thoi-gian.html",
      itin: "nam",
      approx: true,
      coordSrc: "Đối chiếu vị trí thôn Vịnh Mốc / khoảng cách Cửa Tùng (Nhân Dân)",
      lat: 17.089,
      lng: 107.115,
    },
    {
      id: "cua-tung",
      name: "Biển Cửa Tùng",
      cat: "nature",
      district: "Xã Cửa Tùng",
      time: "Nửa ngày",
      tag: "Cửa sông Bến Hải",
      desc: "Bãi biển cửa sông Bến Hải gặp Biển Đông. Khác Nhật Lệ (Đồng Hới) và khác cầu Hiền Lương (trong đất liền).",
      geo: "Gần hải đăng Cửa Tùng. Cửa sông, không phải vị trí cầu Hiền Lương.",
      aliases: "cua tung, bien, bai bien, vinh linh",
      img: "../assets/images/img-97408f6108.jpg",
      href: "kham-pha.html",
      itin: "nam",
      coordSrc: "Hải đăng Cửa Tùng / vị trí bãi công bố",
      lat: 17.0198,
      lng: 107.1097,
    },
    {
      id: "cua-viet",
      name: "Biển Cửa Việt",
      cat: "nature",
      district: "Xã Cửa Việt",
      time: "Nửa ngày",
      tag: "Cửa sông – biển",
      desc: "Cửa sông Thạch Hãn / Cửa Việt gặp biển. Không cùng cửa với Cửa Tùng.",
      geo: "Bãi và cửa sông phía đông Gio Linh. Ghim gần cửa, không phải một bãi cụ thể.",
      aliases: "cua viet, gio linh, bien, cua song",
      img: "../assets/images/img-27c002d636.jpg",
      href: "kham-pha.html",
      itin: "nam",
      approx: true,
      coordSrc: "Cửa sông Cửa Việt (làm tròn)",
      lat: 16.9014,
      lng: 107.1919,
    },
    {
      id: "con-co",
      name: "Đảo Cồn Cỏ",
      cat: "nature",
      district: "Đặc khu Cồn Cỏ",
      time: "1 ngày",
      tag: "Huyện đảo",
      desc: "Huyện đảo ngoài khơi đông bắc Cửa Tùng. Tàu khách hỏi bến Cửa Tùng / Cửa Việt — thời gian đổi theo biển.",
      geo: "Đảo ngoài Biển Đông. Ghim gần tâm đảo.",
      aliases: "con co, dao, bien dao",
      img: "../assets/images/img-3380cbe71a.jpg",
      href: "kham-pha.html",
      itin: "nam",
      approx: true,
      coordSrc: "Vị trí huyện đảo (làm tròn)",
      lat: 17.1583,
      lng: 107.3417,
    },
    {
      id: "chenh-venh",
      name: "Bản Chênh Vênh",
      cat: "culture",
      district: "Xã Hướng Phùng",
      time: "Nửa ngày",
      tag: "Du lịch cộng đồng Bru-Vân Kiều",
      desc: "Thôn Chênh Vênh dưới chân đèo Sa Mù. Gọi tổ cộng đồng trước. Không đại diện mọi bản Vân Kiều.",
      geo: "Ghim gần đèo Sa Mù / Hướng Phùng — không phải cửa một nhà sàn.",
      aliases: "chenh venh, van kieu, bru, ban lang, huong hoa, sa mu, huong phung",
      img: "../assets/images/img-35abd19929.jpg",
      href: "cong-dong.html",
      approx: true,
      coordSrc: "Khu vực đèo Sa Mù – Hướng Phùng (làm tròn)",
      lat: 16.70,
      lng: 106.68,
    },
    {
      id: "lao-bao",
      name: "Cửa khẩu Lao Bảo",
      cat: "growth",
      district: "Xã Lao Bảo",
      time: "2 giờ",
      tag: "Cửa khẩu Việt — Lào",
      desc: "Cửa khẩu quốc tế trên hành lang Đông–Tây. Thủ tục biên giới theo quy định hiện hành.",
      geo: "Cực tây tỉnh, giáp Savannakhet (Lào). Ghim gần khu cửa khẩu.",
      aliases: "lao bao, cua khau, lao, huong hoa, dong tay",
      img: "../assets/images/img-84bdbfd779.jpg",
      href: "tin-nang-luong.html",
      approx: true,
      coordSrc: "Khu cửa khẩu Lao Bảo (làm tròn)",
      lat: 16.6265,
      lng: 106.5938,
    },
    {
      id: "phong-nha",
      name: "Động Phong Nha",
      cat: "nature",
      district: "Xã Phong Nha",
      time: "Nửa ngày – 1 ngày",
      tag: "Cửa hang · Vườn quốc gia",
      desc: "Ghim cửa động Phong Nha (thuyền sông Son). Vườn quốc gia Phong Nha – Kẻ Bàng rộng hơn nhiều; Sơn Đoòng không cùng điểm này.",
      geo: "Cửa hang theo Wikipedia: 17°34′54″B, 106°16′59″Đ. UNESCO 2003, mở rộng 2015.",
      aliases: "phong nha, ke bang, thien duong, son doong, unesco, hang dong, bo trach, quang binh",
      img: "../assets/images/img-ccddc239e7.jpg",
      href: "diem-den/phong-nha.html",
      itin: "bac",
      coordSrc: "Wikipedia (cửa động Phong Nha)",
      lat: 17.5817,
      lng: 106.283,
    },
    {
      id: "nhat-le",
      name: "Biển Nhật Lệ",
      cat: "nature",
      district: "Phường Đồng Hới",
      time: "Nửa ngày",
      tag: "Cửa sông Nhật Lệ",
      desc: "Bãi trước Đồng Hới, cửa sông Nhật Lệ. Không cùng bãi với Cửa Tùng (phía nam).",
      geo: "Bờ đông Đồng Hới. Ghim gần cửa sông — bãi dài, không một điểm vé.",
      aliases: "nhat le, bao ninh, dong hoi, bien, quang binh",
      img: "../assets/images/img-6fc5926016.jpg",
      href: "diem-den/nhat-le.html",
      itin: "bac",
      approx: true,
      coordSrc: "Cửa sông Nhật Lệ, Đồng Hới (làm tròn)",
      lat: 17.478,
      lng: 106.632,
    },
    {
      id: "dong-hoi",
      name: "Quảng Bình Quan",
      cat: "heritage",
      district: "Phường Đồng Hới",
      time: "1 giờ",
      tag: "Cổng thành Đồng Hới",
      desc: "Di tích cổng thành (Quảng Bình Quan). Đồng Hới là trung tâm hành chính tỉnh từ 1/7/2025 — không đồng nhất toàn bộ thành phố với ô thành.",
      geo: "Gần ngã ba Quang Trung, Đồng Hới. Ghim theo OpenStreetMap (cổng thành).",
      aliases: "dong hoi, quang binh quan, thanh dong hoi, thu do tinh",
      img: "../assets/images/img-8b536adcb4.jpg",
      href: "van-hoa.html#phong-nha",
      itin: "bac",
      coordSrc: "OpenStreetMap (Quảng Bình Quan)",
      lat: 17.4633,
      lng: 106.6241,
    },
    {
      id: "vo-nguyen-giap",
      name: "Khu lưu niệm Đại tướng Võ Nguyên Giáp",
      cat: "heritage",
      district: "Xã Lệ Thủy (An Xá / Lộc Thủy cũ)",
      time: "1 giờ",
      tag: "Thôn An Xá",
      desc: "Nhà lưu niệm và nhà tưởng niệm tại thôn An Xá, bên sông Kiến Giang. Đi chậm, trang phục lịch sự.",
      geo: "Ghim gần xã Lộc Thủy / An Xá (Wikipedia Lộc Thủy). Không phải tọa độ cửa nhà đo đạc.",
      aliases: "vo nguyen giap, loc thuy, le thuy, dai tuong, nha luu niem, an xa",
      img: "../assets/images/img-8b536adcb4.jpg",
      href: "diem-den/vo-nguyen-giap.html",
      itin: "bac",
      approx: true,
      coordSrc: "Wikipedia (xã Lộc Thủy / An Xá)",
      lat: 17.2375,
      lng: 106.7536,
    },
  ];

  const ROUTES = [
    {
      id: "tay-dong",
      name: "Gợi ý: Trường Sơn — biển",
      color: "#6B2218",
      ids: ["lao-bao", "chenh-venh", "thanh-co", "cua-viet"],
    },
    {
      id: "lich-nam",
      name: "Gợi ý lịch nam (Hiền Lương – Cửa Tùng – Vịnh Mốc)",
      color: "#9A7428",
      ids: ["hien-luong", "cua-tung", "vinh-moc"],
    },
    {
      id: "dao",
      name: "Gợi ý ra đảo Cồn Cỏ",
      color: "#2A4560",
      dash: "6 8",
      ids: ["cua-tung", "con-co"],
    },
    {
      id: "hang-bien",
      name: "Gợi ý lịch bắc (động Phong Nha – Đồng Hới – Nhật Lệ)",
      color: "#2A4560",
      ids: ["phong-nha", "dong-hoi", "nhat-le"],
    },
  ];

  /* Vĩ tuyến 17 là đường vĩ tuyến ~17°B — không nối Phong Nha hay Đồng Hới. */
  const PARALLEL_17 = {
    lat: 17.00389,
    west: 106.52,
    east: 107.36,
    label: "Vĩ tuyến 17 (~17°B)",
  };

  const GEO_LABELS = [
    { lat: 16.62, lng: 106.72, text: "Trường Sơn" },
    { lat: 16.78, lng: 107.05, text: "Sông Thạch Hãn" },
    { lat: 17.01, lng: 106.92, text: "Sông Bến Hải" },
    { lat: 16.95, lng: 107.3, text: "Biển Đông" },
    { lat: 17.58, lng: 106.18, text: "Phong Nha" },
    { lat: 17.49, lng: 106.7, text: "Nhật Lệ" },
    { lat: 17.02, lng: 106.62, text: "Vĩ tuyến 17" },
  ];

  const state = {
    query: "",
    cats: { heritage: true, nature: true, culture: true, growth: true },
    active: "thanh-co",
    panel: "places",
    adminType: "all",
    adminId: "",
    catalog: null,
  };

  const listEl = document.getElementById("map-list");
  const popupEl = document.getElementById("map-popup");
  const countEl = document.getElementById("map-count");
  const searchEl = document.getElementById("map-search");
  const searchForm = document.getElementById("map-search-form");
  const searchClear = document.getElementById("map-search-clear");
  const emptyEl = document.getElementById("map-empty");
  const contextEl = document.getElementById("map-context");

  const layers = { map: null, markers: {}, lines: {}, ready: false };

  function fold(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  }

  function placeById(id) {
    return PLACES.filter(function (p) {
      return p.id === id;
    })[0];
  }

  function haystack(p) {
    return fold([p.name, p.district, p.tag, p.desc, p.geo, p.aliases, CATS[p.cat].label].join(" "));
  }

  function visiblePlaces() {
    const q = fold(state.query).trim();
    return PLACES.filter(function (p) {
      if (!state.cats[p.cat]) return false;
      if (!q) return true;
      return haystack(p).indexOf(q) !== -1;
    });
  }

  function toRad(d) {
    return (d * Math.PI) / 180;
  }

  function kmBetween(a, b) {
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const s =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  function bearingLabel(from, to) {
    const y = Math.sin(toRad(to.lng - from.lng)) * Math.cos(toRad(to.lat));
    const x =
      Math.cos(toRad(from.lat)) * Math.sin(toRad(to.lat)) -
      Math.sin(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.cos(toRad(to.lng - from.lng));
    const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    const dirs = ["bắc", "đông bắc", "đông", "đông nam", "nam", "tây nam", "tây", "tây bắc"];
    return dirs[Math.round(brng / 45) % 8];
  }

  function nearestOthers(place, n) {
    return PLACES.filter(function (p) {
      return p.id !== place.id;
    })
      .map(function (p) {
        return { place: p, km: kmBetween(place, p) };
      })
      .sort(function (a, b) {
        return a.km - b.km;
      })
      .slice(0, n);
  }

  function routesFor(id) {
    return ROUTES.filter(function (r) {
      return r.ids.indexOf(id) !== -1;
    });
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function renderFilters() {
    document.querySelectorAll("[data-cat]").forEach(function (btn) {
      const cat = btn.getAttribute("data-cat");
      const on = state.cats[cat];
      const n = PLACES.filter(function (p) {
        return p.cat === cat;
      }).length;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      const badge = btn.querySelector("[data-count]");
      if (badge) badge.textContent = String(n);
    });
  }

  function unitById(id) {
    const units = (state.catalog && state.catalog.units) || [];
    return units.filter(function (u) {
      return u.id === id;
    })[0];
  }

  function unitForPlace(placeId) {
    const units = (state.catalog && state.catalog.units) || [];
    return units.filter(function (u) {
      return (u.places || []).indexOf(placeId) !== -1;
    })[0];
  }

  function visibleUnits() {
    if (!window.QTAdmin || !state.catalog) return [];
    return window.QTAdmin.filter(state.catalog, {
      query: state.query,
      type: state.adminType,
    });
  }

  function setPanel(panel) {
    state.panel = panel === "admin" ? "admin" : "places";
    const placeChips = document.getElementById("map-place-chips");
    const adminChips = document.getElementById("map-admin-chips");
    const itin = document.getElementById("map-itin-link");
    const catalogLink = document.getElementById("map-catalog-link");
    if (placeChips) placeChips.hidden = state.panel !== "places";
    if (adminChips) adminChips.hidden = state.panel !== "admin";
    if (itin) itin.hidden = state.panel !== "places";
    if (catalogLink) catalogLink.hidden = state.panel !== "admin";
    document.querySelectorAll("[data-panel]").forEach(function (btn) {
      const on = btn.getAttribute("data-panel") === state.panel;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (searchEl) {
      searchEl.placeholder =
        state.panel === "admin"
          ? "Hiền Thành, Lộc Thủy, Tân Thành…"
          : "Thành Cổ, Cửa Tùng, Phong Nha…";
    }
    const title = document.getElementById("map-heading");
    if (title) {
      title.textContent = state.panel === "admin" ? "78 xã, phường" : "Khám phá điểm đến";
    }
    refresh();
  }

  function renderAdminFilters() {
    document.querySelectorAll("[data-adm-type]").forEach(function (btn) {
      const on = btn.getAttribute("data-adm-type") === state.adminType;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function renderAdminList() {
    if (!listEl) return;
    const items = visibleUnits();
    const total = (state.catalog && state.catalog.summary && state.catalog.summary.total) || 78;
    if (countEl) countEl.textContent = items.length + " / " + total;
    const rest = document.getElementById("map-sub-rest");
    if (rest) {
      rest.innerHTML =
        ' đơn vị · NQ 1680 — <a class="text-primary hover:text-secondary" href="hanh-chinh.html">danh mục</a>';
    }
    if (emptyEl) {
      emptyEl.hidden = items.length > 0;
      emptyEl.textContent = state.catalog
        ? "Không có xã/phường khớp. Xóa từ khóa hoặc chọn Tất cả."
        : "Đang tải danh mục 78 đơn vị…";
    }
    listEl.innerHTML = items
      .map(function (u) {
        const on = u.id === state.adminId;
        const from = (u.from || []).slice(0, 3).join(" · ");
        const more = (u.from || []).length > 3 ? "…" : "";
        const pin = (u.places || []).length ? " · có điểm trên bản đồ" : "";
        return (
          '<button type="button" class="map-place' +
          (on ? " is-active" : "") +
          '" data-admin-id="' +
          u.id +
          '">' +
          '<span class="map-place-body">' +
          '<span class="map-place-tag">' +
          u.type +
          (u.unchanged ? " · không sắp xếp" : "") +
          "</span>" +
          "<strong>" +
          u.name +
          "</strong>" +
          '<span class="map-place-meta">Từ: ' +
          from +
          more +
          pin +
          "</span></span></button>"
        );
      })
      .join("");
  }

  function renderList() {
    if (!listEl) return;
    const items = visiblePlaces();
    if (countEl) countEl.textContent = String(items.length);
    const rest = document.getElementById("map-sub-rest");
    if (rest) rest.textContent = " địa danh · lịch sử, biển, bản làng";
    if (emptyEl) {
      emptyEl.hidden = items.length > 0;
      emptyEl.textContent = "Không có điểm nào khớp bộ lọc. Bật lại trụ cột hoặc xóa từ khóa.";
    }
    listEl.innerHTML = items
      .map(function (p) {
        const cat = CATS[p.cat];
        const on = p.id === state.active;
        return (
          '<button type="button" class="map-place' +
          (on ? " is-active" : "") +
          '" data-id="' +
          p.id +
          '">' +
          '<img src="' +
          p.img +
          '" alt="" width="120" height="80" decoding="async">' +
          '<span class="map-place-body">' +
          '<span class="map-place-tag">' +
          cat.label +
          "</span>" +
          "<strong>" +
          p.name +
          "</strong>" +
          '<span class="map-place-meta">' +
          p.district +
          " · " +
          p.time +
          "</span>" +
          "</span></button>"
        );
      })
      .join("");
  }

  function linkCopy(p) {
    const near = nearestOthers(p, 2);
    const bits = near.map(function (n) {
      return (
        n.place.name +
        " khoảng " +
        Math.round(n.km) +
        " km về phía " +
        bearingLabel(p, n.place)
      );
    });
    const routeNames = routesFor(p.id)
      .map(function (r) {
        return r.name;
      })
      .join(" · ");
    return { near: bits, routeNames: routeNames };
  }

  function renderContext(p) {
    if (!contextEl) return;
    if (!p) {
      contextEl.textContent =
        "Ghim tham khảo (Wikipedia / OSM, làm tròn). Tuyến màu là gợi ý đi — không phải ranh giới hành chính hay vĩ tuyến 17.";
      return;
    }
    const link = linkCopy(p);
    contextEl.innerHTML =
      "<strong>" +
      p.name +
      "</strong> · " +
      p.district +
      (link.routeNames ? " · " + link.routeNames : "");
  }

  function renderPopup() {
    if (!popupEl) return;
    const p = placeById(state.active);
    if (!p || !state.cats[p.cat] || visiblePlaces().every(function (x) { return x.id !== p.id; })) {
      popupEl.hidden = true;
      renderContext(null);
      return;
    }
    const link = linkCopy(p);
    popupEl.hidden = false;
    popupEl.innerHTML =
      '<button type="button" class="map-popup-close" id="map-popup-close" aria-label="Đóng">' +
      '<span class="material-symbols-outlined">close</span></button>' +
      '<img src="' +
      p.img +
      '" alt="' +
      p.name +
      '" width="760" height="352" decoding="async">' +
      '<div class="map-popup-body">' +
      '<span class="map-place-tag">' +
      p.tag +
      "</span>" +
      "<h2>" +
      p.name +
      "</h2>" +
      "<p>" +
      p.desc +
      "</p>" +
      '<p class="map-popup-geo">' +
      p.geo +
      (p.approx ? " Ghim gần — không thay bản đồ Nhà nước hay GPS dẫn đường." : "") +
      (p.coordSrc ? " Nguồn tọa độ: " + p.coordSrc + "." : "") +
      "</p>" +
      (link.near.length
        ? '<p class="map-popup-link">' + link.near.join(". ") + ".</p>"
        : "") +
      '<div class="map-popup-meta">' +
      "<span><span class=\"material-symbols-outlined\">location_on</span>" +
      p.district +
      "</span>" +
      "<span><span class=\"material-symbols-outlined\">schedule</span>" +
      p.time +
      "</span></div>" +
      '<div class="map-popup-actions">' +
      '<a class="map-btn-primary" href="' +
      p.href +
      '">Xem chi tiết</a>' +
      '<a class="map-btn-ghost" href="lich-trinh.html' +
      (p.itin ? "#" + p.itin : "") +
      '">Thêm lịch trình</a>' +
      "</div></div>";
    renderContext(p);
  }

  function pinHtml(p, active) {
    const cat = CATS[p.cat];
    return (
      '<span class="map-pin-dot" style="background:' +
      cat.color +
      '"><span class="material-symbols-outlined">' +
      cat.icon +
      "</span></span>" +
      '<span class="map-pin-name">' +
      p.name +
      "</span>"
    );
  }

  function pinIcon(p, active) {
    return window.L.divIcon({
      className: "map-pin-icon" + (active ? " is-active" : ""),
      html: pinHtml(p, active),
      iconSize: [168, 60],
      iconAnchor: [84, 20],
    });
  }

  function updateMarkerStates() {
    if (!layers.ready) return;
    const vis = {};
    visiblePlaces().forEach(function (p) {
      vis[p.id] = true;
    });
    PLACES.forEach(function (p) {
      const marker = layers.markers[p.id];
      if (!marker) return;
      const show = !!vis[p.id];
      if (show && !layers.map.hasLayer(marker)) marker.addTo(layers.map);
      if (!show && layers.map.hasLayer(marker)) layers.map.removeLayer(marker);
      marker.setIcon(pinIcon(p, p.id === state.active));
      marker.setZIndexOffset(p.id === state.active ? 400 : 0);
    });

    ROUTES.forEach(function (route) {
      const line = layers.lines[route.id];
      if (!line) return;
      const pts = route.ids.map(placeById).filter(Boolean);
      const allOn = pts.length >= 2 && pts.every(function (p) {
        return vis[p.id];
      });
      if (!allOn) {
        if (layers.map.hasLayer(line)) layers.map.removeLayer(line);
        return;
      }
      line.setLatLngs(
        pts.map(function (p) {
          return [p.lat, p.lng];
        })
      );
      const lit = pts.some(function (p) {
        return p.id === state.active;
      });
      line.setStyle({
        color: route.color,
        weight: lit ? 4 : 2.5,
        opacity: lit ? 0.92 : 0.55,
        dashArray: route.dash || null,
      });
      if (!layers.map.hasLayer(line)) line.addTo(layers.map);
    });
  }

  function focusPlace(p, zoomIn) {
    if (!layers.ready || !p) return;
    const zoom = p.id === "con-co" ? 11 : 12;
    const target = zoomIn ? zoom : Math.max(layers.map.getZoom(), 10);
    if (reduceMotion()) {
      layers.map.setView([p.lat, p.lng], zoomIn ? zoom : layers.map.getZoom(), { animate: false });
    } else {
      layers.map.flyTo([p.lat, p.lng], zoomIn ? zoom : target, { duration: 0.7 });
    }
  }

  function initMap() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas || !window.L) {
      const fallback = document.getElementById("map-fallback");
      if (fallback) fallback.hidden = false;
      return;
    }

    const map = window.L.map(canvas, {
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    window.L.control.zoom({ position: "topright" }).addTo(map);

    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 18,
      }
    ).addTo(map);

    layers.parallel = window.L.polyline(
      [
        [PARALLEL_17.lat, PARALLEL_17.west],
        [PARALLEL_17.lat, PARALLEL_17.east],
      ],
      {
        color: "#9A7428",
        weight: 2,
        opacity: 0.55,
        dashArray: "10 8",
        interactive: false,
      }
    ).addTo(map);

    GEO_LABELS.forEach(function (g) {
      window.L.marker([g.lat, g.lng], {
        icon: window.L.divIcon({
          className: "map-geo-label",
          html: "<span>" + g.text + "</span>",
          iconSize: [0, 0],
        }),
        interactive: false,
        keyboard: false,
      }).addTo(map);
    });

    ROUTES.forEach(function (route) {
      const pts = route.ids.map(placeById).filter(Boolean);
      layers.lines[route.id] = window.L.polyline(
        pts.map(function (p) {
          return [p.lat, p.lng];
        }),
        {
          color: route.color,
          weight: 2,
          opacity: 0.35,
          dashArray: route.dash || null,
          interactive: false,
        }
      ).addTo(map);
    });

    PLACES.forEach(function (p) {
      const marker = window.L.marker([p.lat, p.lng], {
        icon: pinIcon(p, p.id === state.active),
        title: p.name,
        keyboard: true,
      });
      marker.on("click", function () {
        select(p.id, true);
      });
      marker.addTo(map);
      layers.markers[p.id] = marker;
    });

    const bounds = window.L.latLngBounds(
      PLACES.map(function (p) {
        return [p.lat, p.lng];
      })
    );

    layers.map = map;
    layers.ready = true;

    function sizeAndFrame() {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 10 });
    }
    requestAnimationFrame(function () {
      sizeAndFrame();
      setTimeout(sizeAndFrame, 200);
    });
    window.addEventListener("resize", function () {
      map.invalidateSize();
    });
    updateMarkerStates();
  }

  function select(id, fromMap) {
    const found = placeById(id);
    if (!found) return;
    state.active = id;
    const unit = unitForPlace(id);
    if (unit) state.adminId = unit.id;
    if (state.panel === "admin") renderAdminList();
    else renderList();
    renderPopup();
    updateMarkerStates();
    const sel =
      state.panel === "admin"
        ? '[data-admin-id="' + (state.adminId || "") + '"]'
        : '[data-id="' + id + '"]';
    const row = listEl && listEl.querySelector(sel);
    if (row) row.scrollIntoView({ block: "nearest", behavior: reduceMotion() ? "auto" : "smooth" });
    if (!fromMap) focusPlace(found, true);
  }

  function selectAdmin(id) {
    const unit = unitById(id);
    if (!unit) return;
    state.adminId = id;
    renderAdminList();
    const first = (unit.places || [])[0];
    if (first && placeById(first)) {
      select(first);
      return;
    }
    if (popupEl) popupEl.hidden = true;
    if (contextEl) {
      contextEl.innerHTML =
        "<strong>" +
        unit.fullName +
        "</strong> · chưa gắn điểm du lịch. Không ghim ranh giới — chờ công bố diện tích (Điều 3 NQ 1680).";
    }
  }

  function applyHash() {
    const raw = (window.location.hash || "").replace(/^#/, "");
    const params = new URLSearchParams(window.location.search);
    const fromHash = raw.indexOf("hanh-chinh=") === 0 ? raw.slice("hanh-chinh=".length) : "";
    const unitQ = params.get("u") || fromHash;
    if (raw === "hanh-chinh" || raw.indexOf("hanh-chinh=") === 0 || unitQ) {
      setPanel("admin");
      if (unitQ && unitById(unitQ)) selectAdmin(unitQ);
      return;
    }
    if (placeById(raw)) {
      setPanel("places");
      select(raw);
    }
  }

  function refresh() {
    const items = visiblePlaces();
    if (state.panel === "places" && items.length && !items.some(function (p) { return p.id === state.active; })) {
      state.active = items[0].id;
    }
    if (searchClear) searchClear.hidden = !fold(state.query).trim();
    renderFilters();
    renderAdminFilters();
    if (state.panel === "admin") renderAdminList();
    else renderList();
    renderPopup();
    updateMarkerStates();
  }

  document.querySelectorAll("[data-panel]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPanel(btn.getAttribute("data-panel"));
    });
  });

  document.querySelectorAll("[data-adm-type]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.adminType = btn.getAttribute("data-adm-type") || "all";
      refresh();
    });
  });

  document.querySelectorAll("[data-cat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const cat = btn.getAttribute("data-cat");
      state.cats[cat] = !state.cats[cat];
      refresh();
    });
  });

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (state.panel === "admin") {
        const units = visibleUnits();
        if (units.length === 1) selectAdmin(units[0].id);
        return;
      }
      const items = visiblePlaces();
      if (items.length === 1) select(items[0].id);
      else if (items.length && layers.ready) {
        const b = window.L.latLngBounds(
          items.map(function (p) {
            return [p.lat, p.lng];
          })
        );
        layers.map.fitBounds(b, { padding: [40, 40], maxZoom: 12 });
      }
    });
  }

  if (searchEl) {
    const onQuery = function () {
      state.query = searchEl.value;
      refresh();
    };
    searchEl.addEventListener("input", onQuery);
    searchEl.addEventListener("compositionend", onQuery);
  }

  if (searchClear && searchEl) {
    searchClear.addEventListener("click", function () {
      searchEl.value = "";
      state.query = "";
      searchEl.focus();
      refresh();
    });
  }

  if (listEl) {
    listEl.addEventListener("click", function (e) {
      const adminBtn = e.target.closest("[data-admin-id]");
      if (adminBtn) {
        selectAdmin(adminBtn.getAttribute("data-admin-id"));
        return;
      }
      const btn = e.target.closest("[data-id]");
      if (btn) select(btn.getAttribute("data-id"));
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#map-popup-close")) {
      popupEl.hidden = true;
    }
  });

  refresh();
  initMap();

  if (window.QTAdmin) {
    window.QTAdmin.load()
      .then(function (data) {
        state.catalog = data;
        applyHash();
        if (state.panel === "admin") refresh();
      })
      .catch(function () {
        if (state.panel === "admin" && emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = "Không tải được danh mục. Mở trang 78 xã, phường hoặc đọc NQ 1680 trên cổng Chính phủ.";
        }
        applyHash();
      });
  } else {
    applyHash();
  }

  window.addEventListener("hashchange", applyHash);
})();
