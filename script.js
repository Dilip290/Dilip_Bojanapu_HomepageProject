document.addEventListener("DOMContentLoaded", () => {

  // DYNAMIC DATA
  const services = [
    { name: "AI & Data Analytics", desc: "Turn your data into insights using AI, ML, and automation." },
    { name: "Cloud Engineering", desc: "Secure, scalable cloud architecture for business growth." },
    { name: "Web & App Development", desc: "Full-stack modern applications with responsive UI/UX." }
  ];

  const testimonials = [
    { quote: "Exceptional service and great communication!", author: "Sarah Johnson" },
    { quote: "Highly professional and extremely skilled team.", author: "Rajesh Kumar" },
    { quote: "They transformed our digital workflow completely.", author: "Michael Smith" }
  ];

  document.getElementById("service-list").innerHTML =
    services.map(s => `<div class="card"><h3>${s.name}</h3><p>${s.desc}</p></div>`).join("");

  document.getElementById("testimonial-slider").innerHTML =
    testimonials.map(t => `<div class="slide"><p>"${t.quote}"</p><cite>- ${t.author}</cite></div>`).join("");

  // MOBILE MENU
  document.getElementById("menu-toggle").addEventListener("click", () =>
    document.querySelector(".nav-links").classList.toggle("active")
  );

  // DARK MODE
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // ======= AIRTABLE BACKEND FORM SUBMISSION =======
  const AIRTABLE_API_KEY = "YOUR_API_KEY";
  const BASE_ID = "YOUR_BASE_ID";
  const TABLE_NAME = "Clients";

  document.getElementById("clientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      records: [
        {
          fields: {
            Name: document.getElementById("name").value,
            Email: document.getElementById("email").value,
            Phone: document.getElementById("phone").value,
            Message: document.getElementById("message").value,
            CreatedAt: new Date().toISOString()
          }
        }
      ]
    };

    document.getElementById("status").textContent = "⏳ Submitting...";

    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      document.getElementById("status").textContent = "✔ Thank you! We will contact you soon.";
      document.getElementById("clientForm").reset();
    } else {
      document.getElementById("status").textContent = "❌ Something went wrong. Try again.";
    }
  });

});
