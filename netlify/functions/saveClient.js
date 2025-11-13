const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const airtableRes = await fetch("https://api.airtable.com/v0/appYqnWJGdsWnzEup/tblrV5CJ8EQw9tc71", {
      method: "POST",
      headers: {
        Authorization: "Bearer patPc6YkRigJ1uJCM.43dc644e54a7f9b4ffb561882b73f4aabd0b7fcd914d2117765d0c0521609705",
        "Content-Type": "application/json",
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

    const result = await airtableRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
