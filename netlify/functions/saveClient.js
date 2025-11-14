exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
    }

    const data = JSON.parse(event.body);

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

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const response = await fetch(airtableUrl, {
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

    const result = await response.json();

    if (result.error) {
      console.error("Airtable error:", result);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: result.error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
