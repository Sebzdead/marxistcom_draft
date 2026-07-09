/* ──────────────────────────────────────────────────────────────────────────
   Background tone tuner — a floating slider that shifts the page background
   across 11 warm/cool steps. Self-contained: injects its own markup + styles,
   drives the canonical --rci-paper (and --page-bg) tokens, and remembers the
   team's chosen tone in localStorage so it persists across pages and reloads.

   Include once per page, near the end of <body>:
     <script src="ds/bg-tuner.js"></script>
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var STEPS = [
    "#f4f4f3", "#f5f4f2", "#f6f4f1", "#f7f4f0", "#f8f5ef", "#f9f5ee",
    "#faf5ed", "#fbf5ec", "#fcf5eb", "#fdf6ea", "#fef6e9"
  ];
  var KEY = "rci-bg-tone";
  var root = document.documentElement;

  function clampIdx(n) {
    n = parseInt(n, 10);
    return (n >= 0 && n <= STEPS.length - 1) ? n : 0;
  }

  function savedIdx() {
    try { return clampIdx(localStorage.getItem(KEY)); } catch (e) { return 0; }
  }

  function apply(i) {
    var c = STEPS[i];
    root.style.setProperty("--page-bg", c);
    root.style.setProperty("--rci-paper", c);
    return c;
  }

  // Apply the stored tone as early as this script runs (end of <body>, before
  // paint) so navigating between pages doesn't flash the default background.
  apply(savedIdx());

  function injectStyles() {
    if (document.getElementById("bg-tuner-styles")) return;
    var css =
      '#bg-tuner{position:fixed;bottom:16px;right:16px;z-index:9999;width:220px;' +
      'padding:12px 14px;box-sizing:border-box;background:rgba(255,255,255,0.92);' +
      '-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);' +
      'border:1px solid rgba(0,0,0,0.12);border-radius:10px;' +
      'box-shadow:0 6px 24px rgba(0,0,0,0.16);' +
      'font-family:var(--rci-font-condensed,"Trade Gothic Next LT Pro Condensed",sans-serif);}' +
      '#bg-tuner .bg-tuner-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;}' +
      '#bg-tuner .bg-tuner-label{font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#555;}' +
      '#bg-tuner .bg-tuner-value{font-size:12px;font-variant-numeric:tabular-nums;color:#111;font-weight:600;}' +
      '#bg-tuner input[type="range"]{width:100%;margin:0;accent-color:var(--rci-red,#c8102e);}' +
      '#bg-tuner .bg-tuner-scale{display:flex;justify-content:space-between;font-size:10px;' +
      'letter-spacing:0.06em;text-transform:uppercase;color:#888;margin-top:4px;}' +
      '@media print{#bg-tuner{display:none;}}';
    var style = document.createElement("style");
    style.id = "bg-tuner-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    if (document.getElementById("bg-tuner")) return;
    injectStyles();

    var idx = savedIdx();
    var wrap = document.createElement("div");
    wrap.id = "bg-tuner";
    wrap.setAttribute("aria-label", "Background color tuner");
    wrap.innerHTML =
      '<div class="bg-tuner-row">' +
        '<span class="bg-tuner-label">Background</span>' +
        '<span class="bg-tuner-value" id="bg-tuner-hex"></span>' +
      '</div>' +
      '<input id="bg-tuner-slider" type="range" min="0" max="' + (STEPS.length - 1) + '" ' +
        'step="1" aria-label="Background warmth" />' +
      '<div class="bg-tuner-scale"><span>cool</span><span>warm</span></div>';
    document.body.appendChild(wrap);

    var slider = wrap.querySelector("#bg-tuner-slider");
    var hex = wrap.querySelector("#bg-tuner-hex");
    slider.value = idx;
    hex.textContent = STEPS[idx];

    slider.addEventListener("input", function () {
      var i = clampIdx(slider.value);
      hex.textContent = apply(i);
      try { localStorage.setItem(KEY, i); } catch (e) { /* ignore */ }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
