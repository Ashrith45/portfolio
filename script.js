const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button, .project, .portrait-wrap").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "#d8ff4f";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "34px";
      ring.style.height = "34px";
      ring.style.borderColor = "#777";
    });
  });
}

const portrait = document.querySelector(".portrait-wrap");
const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
  heroVisual.addEventListener("pointermove", (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });
  heroVisual.addEventListener("pointerleave", () => {
    portrait.style.transform = "";
  });
}

const tabs = document.querySelectorAll(".work-tab");
const projects = document.querySelectorAll(".project");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.category;
    projects.forEach((project) => {
      const show = category === "all" || project.dataset.type === category;
      project.style.display = show ? "" : "none";
    });
  });
});

const menu = document.querySelector(".mobile-menu");
const menuButton = document.querySelector(".menu-btn");
const closeButton = document.querySelector(".close-menu");

menuButton?.addEventListener("click", () => menu.classList.add("open"));
closeButton?.addEventListener("click", () => menu.classList.remove("open"));
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".section, .hero-copy, .hero-visual");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(22px)";
  item.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(item);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = ".in-view{opacity:1!important;transform:none!important}";
document.head.appendChild(revealStyle);
