var fs = require('fs');
// var js2xmlparser = require("js2xmlparser");
var dirname='../force-app/main/default/profiles/';
// var format = require('xml-formatter');
let objects = [];
var jsonTemplate;



async function fix(orgMeta){
    // console.log('profile struct   ',orgMeta);
    for(const k of orgMeta.keys()){
    //    console.log(' profile name nel ciclo  '+k);
        let profile = orgMeta.get(k);
        if(profile.custom === 'false' && profile.hasOwnProperty('userPermissions') && typeof profile.userPermissions !== 'undefined'){
            profile.userPermissions = [];
            orgMeta.set(k, profile);
        }
        //  objectNames.push(permObject.object);
/*
        profile["@"]={"xmlns":"http://soap.sforce.com/2006/04/metadata"};
        var options = {
          declaration: {
              "encoding": "UTF-8"
          }
        };
        var xml=js2xmlparser.parse("Profile", profile, options);
       
        fs.writeFile(dirname + profile.fullName+'.profile-meta.xml', format(xml, {collapseContent: true}), function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
           console.log('profili updated!');
          }
        });
        */
    }

    /*orgMeta.forEach(function(metadataProfile){
        console.log(metadataProfile.fullName + (metadataProfile.custom === 'true' ? ' is custom' : ' is standard'));
        if(metadataProfile.custom === 'false'){
            if ( metadataProfile.hasOwnProperty('userPermissions') &&  typeof metadataProfile.userPermissions !== 'undefined') {
                //       console.log('  objectPermission length  '+metadataProfile.userPermissions.length);
                //       console.log('  instance off   ',Array.isArray(metadataProfile.userPermissions));
                       
                       metadataProfile.userPermissions = [];
               //        M_ProfName_OBJPerm[metadataProfile.fullName] = M_ProfName_OBJPerm[metadataProfile.fullName] || {};
                 //      M_ProfName_OBJPerm[metadataProfile.fullName].push(metadataProfile);
                  //     console.log('profile struct after delete   ',metadataProfile);
                  mapafter.set(metadataProfile.fullName,metadataProfile);
    
            }
        }
         
    });*/
    
    // console.log(' mapafter ',mapafter); 
    //console.log('struct di admin ', mapafter.get('Admin'));
    return orgMeta;
    
}

module.exports = { fix };

