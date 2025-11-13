document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    const messageBox = document.getElementById("formMessage");
    messageBox.innerText = "Submitting...";

    try {
        const response = await fetch("https://airtable.com/appYqnWJGdsWnzEup/tblrV5CJ8EQw9tc71/viwmwkUerrnPh5tkM", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_AIRTABLE_TOKEN_HERE"
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: {
                            "Full Name": name,
                            "E-Mail": email,
                            "Mobile": mobile,
                            "Submitted At": new Date().toISOString()
                        }
                    }
                ]
            })
        });

        if (!response.ok) throw new Error("Airtable Error");

        messageBox.style.color = "green";
        messageBox.innerText = "Submitted successfully! We will contact you soon.";

        document.getElementById("contactForm").reset();

    } catch (err) {
        messageBox.style.color = "red";
        messageBox.innerText = "Error! Could not submit. Try again.";
    }
});
