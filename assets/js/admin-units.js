/**
 * Danh mục 78 ĐVHC cấp xã — NQ 1680/NQ-UBTVQH15.
 * Không gán tọa độ giả. Chỉ tra cứu tên + đơn vị cũ.
 */
(function (global) {
  function fold(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  }

  function haystack(u) {
    return fold([u.fullName, u.name, u.type, (u.from || []).join(" "), u.unchanged ? "tan thanh minh hoa khong sap xep" : ""].join(" "));
  }

  function filterUnits(catalog, opts) {
    const units = (catalog && catalog.units) || [];
    const q = fold((opts && opts.query) || "").trim();
    const type = (opts && opts.type) || "all";
    const region = (opts && opts.region) || "all";
    return units.filter(function (u) {
      if (type !== "all" && u.type !== type) return false;
      if (region !== "all" && u.region !== region) return false;
      if (q && haystack(u).indexOf(q) === -1) return false;
      return true;
    });
  }

  function load() {
    const root = (global.QTSite && global.QTSite.siteRoot()) || "";
    return fetch(root + "/assets/data/don-vi-hanh-chinh.json")
      .then(function (res) {
        if (!res.ok) throw new Error("catalog " + res.status);
        return res.json();
      });
  }

  global.QTAdmin = {
    load: load,
    fold: fold,
    filter: filterUnits,
  };
})(window);
