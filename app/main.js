
 const retriveMTDfromOrg = require("./retriveMTDfromOrg");
const retriveObjName = require("./retriveObjName");
const objectPermissionsFix = require("./objectPermissionsFix");
const retrieveStandardProfile = require("./retrieveStandardProfiles");
const fixUserPermission = require("./userPermissionFix");
const removeFromTemplate = require("./removeFromTemplate");
const writeProfile = require("./writeProfile");


console.log('ciao main');

async function start(conn){
 // console.log('ciao con',conn);
  const objsName = await retriveObjName.getObjsName(conn);

  
  	const standardProfiles = await retrieveStandardProfile.getStandardProfile(conn);

    var orgMeta = await retriveMTDfromOrg.run(conn);
   orgMeta = await fixUserPermission.fix(orgMeta);
    orgMeta = await removeFromTemplate.fix(orgMeta);
    orgMeta = await objectPermissionsFix.fix(orgMeta, objsName);
    
    await writeProfile.write(orgMeta);
    
   console.log('this is Spartaa',orgMeta);
};


module.exports = { start };