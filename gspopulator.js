const {GoogleSpreadsheet} = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

exports.authorizeAndInsertRow = async function authorizeAndInsertRow(spreadsheetId, sheetName, values) {
  let credentials = {}
  try{
    credentials = JSON.parse(fs.readFileSync('service-account-key.json'));  
  }catch(e){
    credentials = {}
  }

  try{

    const serviceAccountAuth = new JWT({
      email: credentials['client_email'],
      key: credentials['private_key'],
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    
    //console.log(serviceAccountAuth)

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle[sheetName];

    await sheet.addRow({name:"yom"});
  }catch(e){
    console.log(e.message);
  }
}
