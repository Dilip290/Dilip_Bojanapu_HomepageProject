document.addEventListener("DOMContentLoaded", () => {
  // ===== LOAD SERVICES FROM XML =====
  const serviceList = document.getElementById("service-list");
  if (serviceList) {
    fetch("services.xml")
      .then(res => res.text())
      .then(data => {
        const xml = new DOMParser().parseFromString(data, "application/xml");
        const services = xml.querySelectorAll("service");
        let html = "";
        services.forEach(s => {
          html += `<div class="card">
                     <h3>${s.querySelector("name").textContent}</h3>
                     <p>${s.querySelector("description").textContent}</p>
                   </div>`;
        });
        serviceList.innerHTML = html;
      })
      .catch(() => serviceList.innerHTML = "<p>Unable to load services.</p>");
  }

  // ===== LOAD TESTIMONIALS FROM XML =====
  const testimonialSlider = document.getElementById("testimonial-slider");
  if (testimonialSlider) {
    fetch("testimonials.xml")
      .then(res => res.text())
      .then(data => {
        const xml = new DOMParser().parseFromString(data, "application/xml");
        const testimonials = xml.querySelectorAll("testimonial");
        let html = "";
        testimonials.forEach(t => {
          html += `<div class="slide"><p>${t.querySelector("name").textContent}</p>
                   <cite>- ${t.querySelector("author").textContent}</cite></div>`;
        });
        testimonialSlider.innerHTML = html;
      })
      .catch(() => testimonialSlider.innerHTML = "<p>Unable to load testimonials.</p>");
  }

  // ===== SCROLL / THEME / MENU =====
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.3 });
  fadeEls.forEach(el => observer.observe(el));

  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  if (scrollBtn) scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) menuToggle.addEventListener("click", () =>
    navLinks.classList.toggle("active")
  );

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      themeToggle.textContent = dark ? "☀️" : "🌙";
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }
});
