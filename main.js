import { setYear, setupMobileMenu, setupActiveNav } from "./nav.js";
import { setupCursorGlow, setupGridParallax } from "./effects.js";
import { setupReveal } from "./reveal.js";
import { renderProjects, setupProjectFiltering, setupProjectModal } from "./projects.js";

setYear();
setupMobileMenu();
setupActiveNav();

setupCursorGlow();
setupGridParallax();
setupReveal();

renderProjects();
setupProjectFiltering();
setupProjectModal();
