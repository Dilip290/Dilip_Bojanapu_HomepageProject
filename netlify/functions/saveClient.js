exports.handler = async (event) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
    }

    // Parse the incoming data
    const data = JSON.parse(event.body);

    // Read environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    if (!apiKey || !baseId || !tableName) {
      console.error("Missing environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server missing configuration" })
      };
    }

    // Use built-in fetch (Netlify Node 18+)
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const airtableResponse = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
      })
    });

    const result = await airtableResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, airtable: result })
    };

  } catch (err) {
    console.error("Function Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
