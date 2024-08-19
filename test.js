const {authorizeAndInsertRow} = require("./gspopulator.js");

process.env['client_email'] = 1
process.env['private_key'] = 1

// Replace with your own values
const spreadsheetId = 'id';
const sheetName = 'Sheet1'; // Adjust the range based on where you want to insert the row
const values = ['value1', 'value2', 'value3']; // Adjust the values to be inserted

(async function () {
    await authorizeAndInsertRow(spreadsheetId, sheetName, values);
})();
