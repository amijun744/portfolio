
"use strict";

// Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationLinks = document.querySelectorAll("#nav-links a");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after a navigation link is clicked
navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when the user presses Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Automatically update the footer year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}
