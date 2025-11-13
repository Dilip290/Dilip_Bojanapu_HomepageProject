document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("contactForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        name: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value
      };

      const msg = document.getElementById("formMessage");
      msg.style.color = "black";
      msg.innerText = "Submitting...";

      try {
        const response = await fetch("/.netlify/functions/saveClient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          msg.style.color = "green";
          msg.innerText = "Submitted successfully!";
          document.getElementById("contactForm").reset();
        } else {
          throw new Error(result.error);
        }

      } catch (err) {
        msg.style.color = "red";
        msg.innerText = "Error submitting. Try again.";
      }
  });

});
