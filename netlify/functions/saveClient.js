exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const { fullname, email, mobile } = JSON.parse(event.body);

    if (!fullname || !email || !mobile) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE = "Clients";

    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`;

    const body = {
      records: [
        {
          fields: {
            "Full Name": fullname,
            "E-Mail": email,
            "Mobile": mobile,
            "Submitted At": new Date().toISOString()
          }
        }
      ]
    };

    // global fetch (Node 18)
    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const airtableData = await airtableRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: airtableData }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
