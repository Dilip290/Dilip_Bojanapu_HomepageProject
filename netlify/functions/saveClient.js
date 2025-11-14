exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
    }

    const { name, email, mobile } = JSON.parse(event.body);

    // Validate data
    if (!name || !email || !mobile) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // Environment vars
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    if (!apiKey || !baseId || !tableName) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing environment variables" })
      };
    }

    // Airtable v1 API URL
    const airtableUrl = `https://api.airtable.com/v1/bases/${baseId}/tables/${tableName}/records`;

    const payload = {
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
    };

    // Send request
    const response = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Debug log in Netlify (optional)
    console.log("Airtable response:", JSON.stringify(data));

    if (response.status !== 200) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Airtable insert failed", details: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
