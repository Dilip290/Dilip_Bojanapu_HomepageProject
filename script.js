document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const box = document.getElementById("formMessage");

    box.innerText = "Submitting...";
    box.style.color = "blue";

    try {
        const response = await fetch("/.netlify/functions/saveClient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobile }),
        });

        const result = await response.json();

        if (result.success) {
            box.innerText = "Submitted successfully! We will contact you soon.";
            box.style.color = "green";
            document.getElementById("contactForm").reset();
        } else {
            box.innerText = "Error submitting details.";
            box.style.color = "red";
        }

    } catch (err) {
        box.innerText = "Network error. Try again.";
        box.style.color = "red";
    }
});
