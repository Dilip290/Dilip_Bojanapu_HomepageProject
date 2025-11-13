document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const messageBox = document.getElementById("formMessage");

    messageBox.style.color = "black";
    messageBox.innerText = "Submitting...";

    try {
        const response = await fetch("/.netlify/functions/saveClient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobile })
        });

        const result = await response.json();

        if (result.success) {
            messageBox.style.color = "green";
            messageBox.innerText = "Submitted successfully!";
            document.getElementById("contactForm").reset();
        } else {
            throw new Error(result.error || "Unknown error");
        }

    } catch (error) {
        messageBox.style.color = "red";
        messageBox.innerText = "Error! Could not submit. Try again.";
    }
});
