const fetch = require('node-fetch');

exports.handler = async (event) => {
  console.log("Function started...");
  console.log("HTTP Method:", event.httpMethod);

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    console.log("Handling CORS preflight");
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    console.log("Method not allowed:", event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse and validate request body
    let data;
    try {
      data = JSON.parse(event.body);
      console.log("Parsed data:", data);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { name, email, mobile } = data;

    // Validate required fields
    if (!name || !email || !mobile) {
      console.error("Missing fields:", { name, email, mobile });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: name, email, mobile' })
      };
    }

    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    console.log("Environment variables check:", {
      hasApiKey: !!apiKey,
      hasBaseId: !!baseId,
      hasTableName: !!tableName
    });

    if (!apiKey || !baseId || !tableName) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error - check environment variables' })
      };
    }

    // Airtable API URL
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    console.log("Airtable URL:", airtableUrl);

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

    console.log("Sending to Airtable:", JSON.stringify(payload, null, 2));

    // Send request to Airtable
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    
    console.log("Airtable response status:", response.status);
    console.log("Airtable response data:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error("Airtable API error:", responseData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to save to Airtable',
          details: responseData.error || responseData 
        })
      };
    }

    console.log("Successfully saved to Airtable");
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Data saved successfully'
      })
    };

  } catch (error) {
    console.error('Server error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
