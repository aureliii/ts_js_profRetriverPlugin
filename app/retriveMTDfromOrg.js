const jsforce = require('jsforce');
const fs = require('fs');
const path = require('path');
const { profileEnd } = require('console');

const mapafter = new Map();

const metaProf = [];

const profileSet = new Set();


async function run(conn) {

	  var listProfile = [];

  	//******************* get all profiles from org START   *************** */
	try {
  //      await conn.login(creds.username, creds.password);

        var types = [{type: 'Profile', folder: null}];
		
		await conn.metadata.list(types, '50.0', function(err, metadata) {
            if (err) { return console.error('err', err); }
			
			//console.log("metadata list size: " + metadata.length);
			
            metadata.forEach(function(profile){
				listProfile.push(profile.fullName);
				profileSet.add(profile.fullName);
				//console.log("Profile added: " + profile.fullName);
				//console.log("Profile added: " + JSON.stringify(profile));
			});
			//console.log("Profile list size: " + listProfile.length);
			//console.log("Profile set size: " + profileSet.size);
			//console.log("listProfile dalla org " + listProfile);   
        })
    
		var i, j, tempArray, chunk = 10;
		listProfile = Array.from(profileSet);
		
        for (i=0, j=listProfile.length; i<j; i += chunk) {
			tempArray = listProfile.slice(i,i+chunk);
			listProfile.length
    
          	await conn.metadata.readSync('Profile', tempArray, function(err, retrievedMetadata) {
				if (err) { console.error(err); }
				//console.log("Metadata size: " + retrievedMetadata.length);
				retrievedMetadata.forEach(function(metadataProfile){
					//console.log("Metadata: " + JSON.stringify(metadataProfile));
					//metaProf.push(metadataProfile);
					if(metadataProfile.fullName == 'ReadOnly' && metadataProfile.custom == 'false'){
						return console.error('profile sbagliato');
					}
					mapafter.set(metadataProfile.fullName, metadataProfile);          
				});
				//console.log("metaProf size: "+ metaProf.length);
          	});    
		}
		
        return mapafter;
    }catch (err) {
        console.error(err);
    }
    //******************* get all profiles from org END   *************** */
}


module.exports = { run };