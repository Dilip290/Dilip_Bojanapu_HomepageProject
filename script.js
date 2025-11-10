// Load Services and Testimonials from XML dynamically
document.addEventListener("DOMContentLoaded", () => {
  loadXMLData("services.xml", "service", "service-list");
  loadXMLData("testimonials.xml", "testimonial", "testimonial-list");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Thank you! Your message has been sent.";
    form.reset();
  });
});

function loadXMLData(file, tagName, containerId) {
  fetch(file)
    .then((res) => res.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((xml) => {
      const items = xml.getElementsByTagName(tagName);
      let output = "";
      for (let i = 0; i < items.length; i++) {
        const name = items[i].getElementsByTagName("name")[0].textContent;
        const desc = items[i].getElementsByTagName("description")[0]?.textContent;
        const author = items[i].getElementsByTagName("author")[0]?.textContent;
        const content = desc
          ? `<li><strong>${name}</strong><br>${desc}</li>`
          : `<div class="testimonial"><p>${name}</p><cite>- ${author}</cite></div>`;
        output += content;
      }
      document.getElementById(containerId).innerHTML = output;
    })
    .catch(() => {
      document.getElementById(containerId).innerHTML =
        "<p>Failed to load content.</p>";
    });
}
