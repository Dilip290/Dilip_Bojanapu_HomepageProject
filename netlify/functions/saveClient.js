const fetch = require("node-fetch");

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        // Airtable details (DON’T PUT IN FRONTEND)
        const AIRTABLE_BASE = "appYqnWJGdsWnzEup";
        const AIRTABLE_TABLE = "tblrV5CJ8EQw9tc71";
        const AIRTABLE_TOKEN = "patPc6YkRigJ1uJCM.43dc644e54a7f9b4ffb561882b73f4aabd0b7fcd914d2117765d0c0521609705";

        // Build Airtable URL
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;

        // Prepare record
        const bodyData = {
            records: [
                {
                    fields: {
                        "Full Name": data.name,
                        "E-Mail": data.email,
                        "Mobile": data.mobile,
                        "Submitted At": new Date().toISOString()
                    }
                }
            ]
        };

        // Call Airtable API
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AIRTABLE_TOKEN}`
            },
            body: JSON.stringify(bodyData)
        });

        const result = await response.json();

        // Success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                airtableResponse: result
            })
        };

    } catch (error) {
        console.error("Backend Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};

