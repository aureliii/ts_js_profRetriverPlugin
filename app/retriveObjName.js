var jsforce = require('jsforce');
var fs = require('fs');
var path = require('path');
let objects = [];



async function getObjsName(conn) {
    
	
	try {
     //   await conn.login();

        let soql = "SELECT SobjectType From ObjectPermissions Group By sObjectType";
		
		metadata = await conn.query(soql)
        .on("record", (record) => {
            objects.push(record.SobjectType);
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
        console.log('ciao retrice objname',objects);
    	return objects;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getObjsName };