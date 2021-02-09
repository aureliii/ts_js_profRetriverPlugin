async function fix(meta,objects){
    try {
    	const objectNames = [];
        for(const k of meta.keys()){ 
        	let metadataProfile = meta.get(k);
          	if ( metadataProfile.hasOwnProperty('objectPermissions') &&  typeof metadataProfile.objectPermissions !== 'undefined') {
            	if (!Array.isArray(metadataProfile.objectPermissions)) {
              		if (objectNames.includes(metadataProfile.objectPermissions.object)) {
                		objectNames.push(metadataProfile.objectPermissions.object);
              		}             
                	metadataProfile.objectPermissions = Object.entries(metadataProfile.objectPermissions);
            	} else {
              		for(var permObject of metadataProfile.objectPermissions){
                    	if ( permObject  !== null && permObject.object !== null  && objectNames.includes(permObject.object)) {
                      		objectNames.push(permObject.object);
                    	}
                  	}
            	}
  
              	let difference = objects.filter(x => !objectNames.includes(x));
              
              	Object.entries(difference).forEach(([key, value]) => {
                	var newObjPerm = {
                    	allowCreate: false,
                    	allowDelete: false,
                    	allowEdit: false,
                    	allowRead: false,
                    	modifyAllRecords: false,
                    	object: value,
                    	viewAllRecords: false
                	};
                	metadataProfile.objectPermissions.push(newObjPerm);               
              	});

              	metadataProfile.objectPermissions = metadataProfile.objectPermissions.sort((a, b) => (a.object > b.object) ? 1 : -1);
          	}
          	meta.set(k, metadataProfile);
                      
        };
        
   		return  meta;
	} catch (error) {
    	console.log('sono nel catch di f()!' + error.message);
    }
}

module.exports = { fix };