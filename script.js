document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      
      console.log("Form submission started...");
      
      // Get form data
      const data = {
        name: document.getElementById("fullname").value.trim(),
        email: document.getElementById("email").value.trim(),
        mobile: document.getElementById("mobile").value.trim()
      };
      
      console.log("Form data:", data);
      
      // Validate data
      if (!data.name || !data.email || !data.mobile) {
        showMessage("Please fill in all fields.", "red");
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showMessage("Please enter a valid email address.", "red");
        return;
      }
      
      const msg = document.getElementById("formMessage");
      msg.style.color = "blue";
      msg.innerText = "Submitting...";
      
      try {
        console.log("Sending request to Netlify function...");
        
        const response = await fetch("/.netlify/functions/saveClient", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(data)
        });
        
        console.log("Response status:", response.status);
        const result = await response.json();
        console.log("Response data:", result);
        
        if (response.ok && result.success) {
          showMessage("Submitted successfully! We'll contact you soon.", "green");
          contactForm.reset();
        } else {
          throw new Error(result.error || result.details || "Submission failed");
        }
      } catch (err) {
        console.error("Submission error:", err);
        showMessage(`Error: ${err.message}`, "red");
      }
    });
  }
  
  function showMessage(text, color) {
    const msg = document.getElementById("formMessage");
    msg.style.color = color;
    msg.innerText = text;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
