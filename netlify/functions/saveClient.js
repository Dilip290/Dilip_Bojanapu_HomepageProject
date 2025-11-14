const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Only allow POST method
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Read environment variables
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

  // Debug check
  if (!API_KEY || !BASE_ID || !TABLE_NAME) {
    console.error("❌ Missing environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  // Read submitted data
  let formData = JSON.parse(event.body);

  const airtableURL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  const bodyData = {
    records: [
      {
        fields: {
          "Full Name": formData.name,
          "E-Mail": formData.email,
          "Mobile": formData.mobile,
          "Submitted At": new Date().toISOString(),
        },
      },
    ],
  };

  try {
    const response = await fetch(airtableURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();

    // Success
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, airtableResponse: result }),
    };
  } catch (error) {
    console.error("❌ Error saving to Airtable:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
