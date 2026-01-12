import { openModal } from "./modal.js";
import { modalTemplate } from "./modal.js";

/**
 * Project data lives here (easy to edit).
 * Links under cards removed as requested.
 */
var PROJECTS = [
  {
    id: "drone",
    title: "Onshape Drone Platform",
    status: "In progress",
    image: "assets/drone.png",
    description:
      "CAD-designed drone frame intended for a school surveillance and monitoring concept. Mechanical assembly and integration work is ongoing.",
    tags: ["Onshape", "CAD", "Mechanical"],
    categories: ["cad", "hardware"],
    bullets: [
      "Designed a lightweight quad-frame layout with motor mount points and central electronics bay.",
      "Focused on mechanical practicality (fasteners, spacing, and assembly flow).",
      "Currently working on assembling and validating the physical build."
    ]
  },
  {
    id: "microbit",
    title: "Micro:bit Workout Phase Coach",
    status: "Prototype",
    image: null,
    description:
      "A sensor-driven workout helper built in the Micro:bit web environment. Uses a heart sensor and accelerometer to guide pacing across warmup, cardio, and cooldown using on-screen messages.",
    tags: ["Micro:bit", "Sensors", "UX"],
    categories: ["hardware"],
    bullets: [
      "Reads heart sensor values and motion (accelerometer) signals during exercise.",
      "Uses phase logic (warmup/cardio/cooldown) and feedback to tell the user to speed up or slow down.",
      "Built entirely in the Micro:bit website environment."
    ]
  },
  {
    id: "glove",
    title: "Cooling Glove for Tendonitis",
    status: "Completed",
    image: null,
    description:
      "A wearable glove prototype designed to deliver targeted cooling for tendonitis relief. Modeled with a focus on comfort and practical use.",
    tags: ["Fusion 360", "Wearable", "Prototype"],
    categories: ["cad", "hardware"],
    bullets: [
      "Designed a wearable form factor with practical placement for cooling elements.",
      "Prioritized comfort, fit, and real-world usability during design iteration."
    ]
  },
  {
    id: "emotion",
    title: "Emotion to Emoji Web App",
    status: "Completed",
    image: null,
    description:
      "A web app that uses a webcam-based classifier and speech recognition to turn emotional input into an emoji response for an interactive experience.",
    tags: ["JavaScript", "ml5.js", "Teachable Machine"],
    categories: ["web", "ml"],
    bullets: [
      "Used a webcam model to classify expressions and map them to emoji output.",
      "Integrated speech recognition for a more interactive user flow.",
      "Focused on a simple UI that responds instantly to the user."
    ]
  },
  {
    id: "solar",
    title: "Curved Solar Panel Design",
    status: "Completed",
    image: null,
    description:
      "Designed and evaluated a curved solar concept to explore form factor tradeoffs and potential performance benefits in compact layouts.",
    tags: ["Design", "Prototype", "Iteration"],
    categories: ["hardware"],
    bullets: [
      "Explored geometry tradeoffs and packaging constraints.",
      "Iterated on a design concept for practical mounting and compact use."
    ]
  }
];

var currentFilter = "all";

export function renderProjects() {
  var grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  var shown = PROJECTS.filter(function (p) {
    return currentFilter === "all" ? true : p.categories.includes(currentFilter);
  });

  shown.forEach(function (p) {
    grid.appendChild(projectCard(p));
  });
}

export function setupProjectFiltering() {
  var btns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  if (!btns.length) return;

  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      btns.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      currentFilter = b.dataset.filter || "all";
      renderProjects();
    });
  });
}

export function setupProjectModal() {
  var grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    var card = e.target.closest("[data-project-id]");
    if (!card) return;

    var id = card.getAttribute("data-project-id");
    var project = PROJECTS.find(function (p) { return p.id === id; });
    if (!project) return;

    openModal(modalTemplate(project));
  });
}

function projectCard(p) {
  var article = document.createElement("article");
  article.className = "project card reveal visible"; // projects appear after filter without re-observing
  article.setAttribute("data-project-id", p.id);

  var media = document.createElement("div");
  media.className = "project-media";

  if (p.image) {
    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.title;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    media.classList.add("placeholder");
    media.innerHTML = `
      <div class="placeholder-inner">
        <div class="placeholder-title">${escapeHtml(p.title)}</div>
        <div class="placeholder-sub">Add an image later</div>
      </div>
    `;
  }

  var body = document.createElement("div");
  body.className = "project-body";

  var titleRow = document.createElement("div");
  titleRow.className = "project-title-row";
  titleRow.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <span class="status">${escapeHtml(p.status)}</span>
  `;

  var desc = document.createElement("p");
  desc.className = "muted";
  desc.textContent = p.description;

  var tags = document.createElement("div");
  tags.className = "project-tags";
  tags.innerHTML = (p.tags || []).map(function (t) {
    return `<span class="tag">${escapeHtml(t)}</span>`;
  }).join("");

  body.appendChild(titleRow);
  body.appendChild(desc);
  body.appendChild(tags);

  article.appendChild(media);
  article.appendChild(body);

  return article;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

