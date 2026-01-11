function setYear() {
  var el = document.getElementById("year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

function setupMobileMenu() {
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    var isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("show");
    menu.setAttribute("aria-hidden", String(isOpen));
  });

  // Close menu when a link is clicked
  var links = menu.querySelectorAll("a");
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("show");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

setYear();
setupMobileMenu();

