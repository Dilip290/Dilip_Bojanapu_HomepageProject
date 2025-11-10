document.addEventListener("DOMContentLoaded", () => {
  // Dynamic data
  const services = [
    { name: "AI & Data Analytics", desc: "Turn your data into insights using AI, ML, and visualization dashboards." },
    { name: "Cloud Solutions", desc: "Secure and scalable cloud architecture built for modern businesses." },
    { name: "Web Development", desc: "Responsive, user-friendly websites crafted with modern web frameworks." }
  ];
  const testimonials = [
    { quote: "A top-notch company that delivers beyond expectations!", author: "Sarah Johnson, InnovateX CEO" },
    { quote: "Their AI and Cloud expertise completely transformed our workflow.", author: "Rajesh Nair, DataGrow CTO" },
    { quote: "Reliable, creative, and professional — highly recommended.", author: "Michael Smith, Cloudify Solutions" }
  ];

  // Render dynamic sections
  document.getElementById("service-list").innerHTML =
    services.map(s => `<div class="card"><h3>${s.name}</h3><p>${s.desc}</p></div>`).join("");
  document.getElementById("testimonial-slider").innerHTML =
    testimonials.map(t => `<div class="slide"><p>"${t.quote}"</p><cite>- ${t.author}</cite></div>`).join("");

  // Contact form
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "✅ Message sent successfully!";
    form.reset();
  });

  // Fade-in
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.3 });
  fadeEls.forEach(el => observer.observe(el));

  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

  // Scroll-to-top
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Dark/Light theme
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ===== POPUP FUNCTIONALITY =====
  const popup = document.getElementById("popup-overlay");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-desc");
  const popupClose = document.getElementById("popup-close");

  document.querySelectorAll("#service-list .card").forEach(card => {
    card.addEventListener("click", () => {
      popupTitle.textContent = card.querySelector("h3").textContent;
      popupDesc.textContent = card.querySelector("p").textContent;
      popup.style.display = "flex";
    });
  });

  popupClose.addEventListener("click", () => popup.style.display = "none");
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });
});
