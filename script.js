document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      
      // Get form data
      const data = {
        name: document.getElementById("fullname").value.trim(),
        email: document.getElementById("email").value.trim(),
        mobile: document.getElementById("mobile").value.trim()
      };
      
      // Validate data
      if (!data.name || !data.email || !data.mobile) {
        showMessage("Please fill in all fields.", "red");
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showMessage("Please enter a valid email address.", "red");
        return;
      }
      
      if (!isValidMobile(data.mobile)) {
        showMessage("Please enter a valid mobile number.", "red");
        return;
      }
      
      const msg = document.getElementById("formMessage");
      msg.style.color = "blue";
      msg.innerText = "Submitting...";
      
      try {
        const response = await fetch("/.netlify/functions/saveClient", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          showMessage("Submitted successfully! We'll contact you soon.", "green");
          contactForm.reset();
        } else {
          throw new Error(result.error || "Submission failed");
        }
      } catch (err) {
        console.error("Submission error:", err);
        showMessage("Error submitting form. Please try again or contact us directly.", "red");
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
  
  function isValidMobile(mobile) {
    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ''));
  }
});
