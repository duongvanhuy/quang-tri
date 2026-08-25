/**
 * Site-wide heritage motion: reveal, ken burns, header, counters.
 * Respects prefers-reduced-motion.
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("qt-motion");

  function enhanceHero() {
    const hero = document.querySelector("header.relative, section.relative.h-\\[80vh\\], section.relative.h-screen");
    if (!hero) return;
    const img = hero.querySelector("img, .parallax-bg");
    if (!img) return;

    if (img.tagName === "IMG" && !img.closest(".qt-hero-media")) {
      const wrap = document.createElement("div");
      wrap.className = "qt-hero-media";
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      img.classList.add("qt-kenburns");
    } else if (img.classList.contains("parallax-bg")) {
      img.classList.add("qt-kenburns");
    }

    const copy = hero.querySelector(".z-20, .z-10.text-center, .relative.z-10");
    if (copy) copy.classList.add("qt-hero-copy");

    const bounce = hero.querySelector(".animate-bounce");
    if (bounce) {
      bounce.classList.remove("animate-bounce");
      bounce.classList.add("qt-scroll-cue");
    }

    if (reduce) return;

    const media = hero.querySelector(".qt-hero-media") || img;
    let ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          const y = window.scrollY;
          if (y < window.innerHeight * 1.2) {
            media.style.transform = "translate3d(0," + y * 0.22 + "px,0)";
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function autoReveal() {
    document.querySelectorAll("article, .qt-card").forEach(function (el, i) {
      if (el.closest("#site-header") || el.closest("#site-footer")) return;
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", (i % 6) * 80 + "ms");
      }
    });

    document.querySelectorAll(".inline-flex.items-center.gap-2 .w-8, .inline-flex.items-center.gap-2 .h-\\[2px\\]").forEach(function (el) {
      if (el.classList.contains("bg-secondary") || el.classList.contains("bg-primary")) {
        el.classList.add("qt-gold-rule");
      }
    });
  }

  function observeReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (reduce) {
      nodes.forEach(function (n) {
        n.classList.add("active");
      });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("active");
      });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "40px 0px -40px 0px" }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function headerCompact() {
    const header = document.getElementById("site-header");
    if (!header) return;
    function sync() {
      header.classList.toggle("is-compact", window.scrollY > 24);
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  function runCounters() {
    const counters = document.querySelectorAll(".counter[data-target]");
    if (!counters.length) return;

    function animate(el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const target = parseInt(el.getAttribute("data-target"), 10) || 0;
      if (reduce) {
        el.textContent = target.toLocaleString("vi-VN");
        return;
      }
      const start = performance.now();
      const duration = 1400;
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("vi-VN");
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (c) {
      io.observe(c);
    });
  }

  function memorial() {
    document.querySelectorAll(".material-symbols-outlined").forEach(function (el) {
      const name = (el.textContent || "").trim();
      if (name === "candle" || name === "local_fire_department") {
        el.classList.add("qt-candle");
      }
      if (name === "location_on" && el.closest(".group, .relative")) {
        el.classList.remove("animate-bounce");
        el.classList.add("qt-map-pin");
      }
    });
  }

  enhanceHero();
  autoReveal();
  observeReveal();
  headerCompact();
  runCounters();
  memorial();
})();
