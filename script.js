document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
        AIRTABBLE CONFIG
     =========================== */
  const AIRTABLE_TOKEN = "patPc6YkRigJ1uJCM.43dc644e54a7f9b4ffb561**************d914d2117765d0c0521609705";
  const BASE_ID = "appYqnWJGdsWnzEup";
  const TABLE_ID = "tblrV5CJ8EQw9tc71";

  const form = document.getElementById("airtable-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Submitting...";

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Full Name": fullName,
            "E-Mail": email,
            "Mobile": mobile,
          },
        }),
      });

      if (response.ok) {
        status.textContent = "Thank you! Your details were submitted successfully.";
        form.reset();
      } else {
        status.textContent = "Error: Could not submit. Try again.";
      }
    } catch (err) {
      console.error(err);
      status.textContent = "Network error. Please try later.";
    }
  });


  /* ===== Dynamic Services ===== */
  const services = [
    { name: "AI & Data Analytics", desc: "Build insights using AI, ML, and smart dashboards." },
    { name: "Cloud Solutions", desc: "Secure and scalable cloud architecture for your business." },
    { name: "Web Development", desc: "Modern websites with professional UI/UX and full responsiveness." }
  ];
  document.getElementById("service-list").innerHTML =
    services.map(s => `<div class="card"><h3>${s.name}</h3><p>${s.desc}</p></div>`).join("");

  /* ===== Dynamic Testimonials ===== */
  const testimonials = [
    { quote: "A top-notch company that delivers beyond expectations!", author: "Sarah Johnson, InnovateX CEO" },
    { quote: "Their AI and Cloud expertise transformed our workflow.", author: "Rajesh Nair, DataGrow CTO" },
    { quote: "Reliable, creative, and professional — highly recommended.", author: "Michael Smith, Cloudify Solutions" }
  ];
  document.getElementById("testimonial-slider").innerHTML =
    testimonials.map(t => `<div class="slide"><p>"${t.quote}"</p><cite>- ${t.author}</cite></div>`).join("");

  /* ===== fade-in animation ===== */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.3 });
  fadeEls.forEach(el => observer.observe(el));

  /* ===== mobile menu ===== */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

});
