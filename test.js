// Import the function from gspopulator.js
const gspopulator = require("./gspopulator.js");

// Set environment variables
process.env['client_email'] = '1';
process.env['private_key'] = '1';

// Replace with your own values
const spreadsheetId = 'id';
const sheetName = 'Sheet1'; // Adjust based on where you want to insert the row
const values = ["dtrh","uil","vghj"] // Adjust the values to be inserted

// Execute the function using a traditional promise chain instead of async/await
gspopulator.authorizeAndInsertRow(spreadsheetId, sheetName, values)
  .then(() => {
    console.log('Row inserted successfully');
  })
  .catch((err) => {
    console.error('Error inserting row:', err);
  });