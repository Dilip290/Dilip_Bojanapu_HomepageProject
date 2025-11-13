document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    const messageBox = document.getElementById("formMessage");
    messageBox.innerText = "Submitting...";

    // Airtable API details
    const AIRTABLE_TOKEN = "patPc6YkRigJ1uJCM.43dc644e54a7f9b4ffb561882b73f4aabd0b7fcd914d2117765d0c0521609705";
    const BASE_ID = "appYqnWJGdsWnzEup";
    const TABLE_ID = "tblrV5CJ8EQw9tc71";

    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AIRTABLE_TOKEN}`
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

        const data = await response.json();
        console.log(data); // Debug

        if (!response.ok) {
            throw new Error("Airtable Error");
        }

        messageBox.style.color = "green";
        messageBox.innerText = "Submitted successfully! We will contact you soon.";
        document.getElementById("contactForm").reset();

    } catch (err) {
        messageBox.style.color = "red";
        messageBox.innerText = "Error! Could not submit. Try again.";
    }
});
