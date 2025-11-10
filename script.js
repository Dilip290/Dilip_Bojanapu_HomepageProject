document.addEventListener("DOMContentLoaded", () => {
  // Load XML data
  loadXML("services.xml", "service", "service-list");
  loadXML("testimonials.xml", "testimonial", "testimonial-slider");

  // Contact form
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "✅ Message sent successfully!";
    form.reset();
  });

  // Scroll animations
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

function loadXML(file, tag, containerId) {
  fetch(file)
    .then((res) => res.text())
    .then((str) => new DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const items = data.getElementsByTagName(tag);
      let html = "";
      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName("name")[0].textContent;
        const desc = items[i].getElementsByTagName("description")[0]?.textContent;
        const author = items[i].getElementsByTagName("author")[0]?.textContent;
        if (desc) {
          html += `<div class="card"><h3>${title}</h3><p>${desc}</p></div>`;
        } else {
          html += `<div class="slide"><p>"${title}"</p><cite>- ${author}</cite></div>`;
        }
      }
      document.getElementById(containerId).innerHTML = html;
    });
}
