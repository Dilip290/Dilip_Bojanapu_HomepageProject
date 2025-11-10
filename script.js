document.addEventListener("DOMContentLoaded", () => {
  // --- Embedded XML content ---
  const servicesXML = `
    <services>
      <service>
        <name>AI & Data Analytics</name>
        <description>Turn your data into insights using AI, ML, and visualization dashboards.</description>
      </service>
      <service>
        <name>Cloud Solutions</name>
        <description>Secure and scalable cloud architecture built for modern businesses.</description>
      </service>
      <service>
        <name>Web Development</name>
        <description>Responsive, user-friendly websites crafted with modern web frameworks.</description>
      </service>
    </services>`;

  const testimonialsXML = `
    <testimonials>
      <testimonial>
        <name>“A top-notch company that delivers beyond expectations!”</name>
        <author>Sarah Johnson, InnovateX CEO</author>
      </testimonial>
      <testimonial>
        <name>“Their AI and Cloud expertise completely transformed our workflow.”</name>
        <author>Rajesh Nair, DataGrow CTO</author>
      </testimonial>
      <testimonial>
        <name>“Reliable, creative, and professional — highly recommended.”</name>
        <author>Michael Smith, Cloudify Solutions</author>
      </testimonial>
    </testimonials>`;

  renderXML(servicesXML, "service", "service-list");
  renderXML(testimonialsXML, "testimonial", "testimonial-slider");

  // --- Contact form confirmation ---
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "✅ Message sent successfully!";
    form.reset();
  });

  // --- Fade-in animations ---
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

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// --- Helper: Parse & render XML data ---
function renderXML(xmlString, tag, containerId) {
  const xml = new DOMParser().parseFromString(xmlString, "text/xml");
  const items = xml.getElementsByTagName(tag);
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
}
