var jsforce = require('jsforce');
var fs = require('fs');
var path = require('path');
let objects = [];

async function getStandardProfile(conn) {

//******************* get all objects from org START   *************** */
try {
  //      await conn.login(creds.username, creds.password);

        console.log('Connected to Salesforce!');
        
        let soql = "SELECT Profile.name FROM PermissionSet WHERE isCustom = false AND IsOwnedByProfile = true";
        metadata = await conn.query(soql)
        .on("record", (record) => {
            objects.push(record.Profile.name);
        })
        .on("end", async () => {
            console.log(`Fetched objects. Total records fetched: ${objects.length}`);
        })
        .on("error", (err) => {
            console.error(err);
        })
        .run({
            autoFetch: true,
            maxFetch: 10000 //lo setto quanto vuoi (si usa max fatch se vogliamo retrivare + di 2k) 
        });
  //      console.log(metadata);
        console.log('list of objects from org '+objects);
      //  return objects;

    // now you can use conn to read/write data...
    //  await conn.logout();
    return objects;
    } catch (err) {
        console.error(err);
    }
    //******************* get all objects from org END   *************** */
}
module.exports = { getStandardProfile };