export function setYear() {
  var el = document.getElementById("year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

export function setupMobileMenu() {
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    var isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("show");
    menu.setAttribute("aria-hidden", String(isOpen));
  });

  var links = menu.querySelectorAll(".mobileLink");
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("show");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

export function setupActiveNav() {
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".navlink"));
  if (!navLinks.length) return;

  var sectionIds = navLinks
    .map(function (a) {
      var href = a.getAttribute("href") || "";
      return href.startsWith("#") ? href.slice(1) : null;
    })
    .filter(Boolean);

  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function clearActive() {
    navLinks.forEach(function (a) { a.classList.remove("active"); });
  }

  var obs = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

    if (!visible) return;

    clearActive();
    var id = visible.target.id;
    navLinks.forEach(function (a) {
      if ((a.getAttribute("href") || "") === "#" + id) a.classList.add("active");
    });
  }, { root: null, threshold: [0.2, 0.35, 0.5, 0.65] });

  sections.forEach(function (s) { obs.observe(s); });

  // Default active
  clearActive();
  navLinks[0].classList.add("active");
}

