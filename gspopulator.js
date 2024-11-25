const axios = require('axios');
const { google } = require('googleapis');

if(!process.env['GOOGLE_CLIENT_EMAIL']){
  throw new Error("env var missing: GOOGLE_CLIENT_EMAIL");
}

if(!process.env['GOOGLE_PRIVATE_KEY']){
  throw new Error("env var missing: GOOGLE_PRIVATE_KEY");
}

exports.authorizeAndInsertRow = async function authorizeAndInsertRow(spreadsheetId, sheetName, values) {
  const credentials = {
    client_email: process.env['GOOGLE_CLIENT_EMAIL'],
    private_key: process.env['GOOGLE_PRIVATE_KEY'].replace(/_/g, ' ').replace(/\\n/g, '\n')
  };

  try {
    // Authenticate and get an OAuth2 token
    const authClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    await authClient.authorize();
    
    // Prepare the request
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW`;

    const response = await axios.post(apiUrl, {
      range: sheetName,
      majorDimension: "ROWS",
      values: [values],
    }, {
      headers: {
        Authorization: `Bearer ${authClient.credentials.access_token}`,
      }
    });

    console.log('Row inserted:', response.data);
  } catch (e) {
    console.error('Error interacting with Google Sheets:', e);
  }
}

