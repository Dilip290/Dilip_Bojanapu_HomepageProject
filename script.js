document.addEventListener("DOMContentLoaded", () => {
  // Embedded service & testimonial data
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

  // Render services
  const serviceList = document.getElementById("service-list");
  serviceList.innerHTML = services
    .map(s => `<div class="card"><h3>${s.name}</h3><p>${s.desc}</p></div>`)
    .join("");

  // Render testimonials
  const testimonialSlider = document.getElementById("testimonial-slider");
  testimonialSlider.innerHTML = testimonials
    .map(t => `<div class="slide"><p>"${t.quote}"</p><cite>- ${t.author}</cite></div>`)
    .join("");

  // Contact form confirmation
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "✅ Message sent successfully!";
    form.reset();
  });

  // Fade-in animations
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.3 });
  fadeEls.forEach(el => observer.observe(el));

  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

  // Scroll-to-top button
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
