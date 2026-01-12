export function setupCursorGlow() {
  var glow = document.getElementById("cursorGlow");
  if (!glow) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    glow.style.opacity = "0";
    return;
  }

  var lastX = -9999;
  var lastY = -9999;

  window.addEventListener("mousemove", function (e) {
    lastX = e.clientX;
    lastY = e.clientY;
    glow.style.transform = "translate(" + (lastX - 210) + "px," + (lastY - 210) + "px)";
    glow.style.opacity = "0.85";
  });

  window.addEventListener("mouseout", function () {
    glow.style.opacity = "0.0";
  });
}

export function setupGridParallax() {
  var grid = document.querySelector(".bg-grid");
  if (!grid) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  window.addEventListener("scroll", function () {
    var y = window.scrollY || 0;
    // tiny drift to make the background feel alive
    grid.style.transform = "translateY(" + (y * 0.02) + "px)";
  });
}

