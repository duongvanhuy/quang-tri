/**
 * Injects shared header + footer and highlights the current section.
 */
(function () {
  const site = window.QTSite;
  if (!site) return;

  const pageId = document.body.getAttribute("data-page") || "home";
  const active = site.ACTIVE_GROUP[pageId] || "";

  function navLinks(mobile) {
    return site.NAV.map(function (item) {
      const isActive = item.id === active;
      const base = mobile
        ? "font-label-caps text-label-caps"
        : "font-label-caps text-label-caps hover:text-secondary-fixed-dim transition-colors duration-300 nav-link";
      const activeCls = isActive ? " is-active text-primary font-bold" : " text-on-surface-variant";
      return (
        '<a class="' +
        base +
        activeCls +
        '" href="' +
        site.href(item.page) +
        '">' +
        item.label +
        "</a>"
      );
    }).join("");
  }

  const headerHtml =
    '<nav class="bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">' +
    '<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto h-20">' +
    '<a class="font-display-heritage text-title-modern text-primary-container" href="' +
    site.href("home") +
    '">Quảng Trị</a>' +
    '<div class="hidden md:flex gap-6 items-center site-nav-desktop">' +
    navLinks(false) +
    "</div>" +
    '<div class="flex items-center gap-3">' +
    '<a class="material-symbols-outlined text-primary hover:text-secondary-fixed-dim" href="' +
    site.href("search") +
    '" aria-label="Tìm kiếm">search</a>' +
    '<a class="hidden sm:inline-flex font-label-caps text-label-caps text-primary border border-primary px-4 py-2 rounded-full whitespace-nowrap hover:bg-primary hover:text-on-primary transition-colors" href="' +
    site.href("auth") +
    '">Đăng nhập</a>' +
    '<button type="button" id="site-menu-toggle" class="md:hidden material-symbols-outlined text-primary p-2 -mr-1" aria-label="Mở menu" aria-expanded="false" aria-controls="site-mobile-menu">menu</button>' +
    "</div></div>" +
    '<div id="site-mobile-menu" class="md:hidden">' +
    navLinks(true) +
    '<a class="font-label-caps text-label-caps text-primary" href="' +
    site.href("auth") +
    '">Đăng nhập</a>' +
    '<a class="font-label-caps text-label-caps text-on-surface-variant" href="' +
    site.href("about") +
    '">Về chúng tôi</a>' +
    "</div></nav>";

  const footerHtml =
    '<footer class="bg-inverse-surface text-inverse-on-surface w-full pt-16 pb-8 px-margin-mobile md:px-margin-desktop border-t border-outline">' +
    '<div class="max-w-container-max mx-auto">' +
    '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">' +
    '<div><a class="font-display-heritage text-headline-lg text-primary mb-4 inline-block" href="' +
    site.href("home") +
    '">Quảng Trị</a>' +
    '<p class="font-body-md text-sm text-on-surface-variant mb-4">Tỉnh Quảng Trị — địa bàn Quảng Trị và Quảng Bình cũ. Cổng thông tin du lịch và văn hóa.</p></div>' +
    '<div><h4 class="font-label-caps text-on-surface font-bold mb-4">Khám phá</h4>' +
    '<ul class="space-y-2 font-body-md text-sm text-on-surface-variant">' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("travel") +
    '">Điểm đến</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("map") +
    '">Bản đồ số</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("admin-units") +
    '">78 xã, phường</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("itinerary") +
    '">Lịch trình</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("thanh-co") +
    '">Thành Cổ Quảng Trị</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("phong-nha") +
    '">Phong Nha – Kẻ Bàng</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("food") +
    '">Ẩm thực</a></li></ul></div>' +
    '<div><h4 class="font-label-caps text-on-surface font-bold mb-4">Câu chuyện</h4>' +
    '<ul class="space-y-2 font-body-md text-sm text-on-surface-variant">' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("culture") +
    '">Văn hóa &amp; lịch sử</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("timeline") +
    '">Dòng thời gian</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("events") +
    '">Sự kiện &amp; lễ hội</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("news") +
    '">Tin tức</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("community") +
    '">Cộng đồng</a></li></ul></div>' +
    '<div><h4 class="font-label-caps text-on-surface font-bold mb-4">Hỗ trợ</h4>' +
    '<ul class="space-y-2 font-body-md text-sm text-on-surface-variant">' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("about") +
    '">Về chúng tôi</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("about") +
    '#lien-he">Liên hệ</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("legal") +
    '">Chính sách &amp; điều khoản</a></li>' +
    '<li><a class="hover:text-primary transition-colors" href="' +
    site.href("auth") +
    '">Đăng nhập</a></li></ul></div>' +
    "</div>" +
    '<div class="border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">' +
    '<div class="font-body-md text-sm text-on-surface-variant opacity-70">© 2024 Quảng Trị — Ký ức và khát vọng</div>' +
    '<a class="font-label-caps text-xs text-on-surface-variant hover:text-primary" href="' +
    site.href("intro") +
    '">Nơi lịch sử gặp tương lai</a>' +
    "</div></div></footer>";

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = headerHtml;
  if (footerMount && pageId !== "map" && pageId !== "auth") {
    footerMount.innerHTML = footerHtml;
  }

  const toggle = document.getElementById("site-menu-toggle");
  const menu = document.getElementById("site-mobile-menu");
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("qt-menu-open", open);
    toggle.textContent = open ? "close" : "menu";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) setMenu(false);
    });
  }

  if (!document.querySelector('script[src*="motion.js"]')) {
    var motion = document.createElement("script");
    motion.src = site.siteRoot() + "/assets/js/motion.js";
    document.body.appendChild(motion);
  }
})();
