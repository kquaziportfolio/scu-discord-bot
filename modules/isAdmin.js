/*
 .----------------.  .----------------.  .----------------.  .----------------.  .-----------------.                    
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |                    
| |      __      | || |  ________    | || | ____    ____ | || |     _____    | || | ____  _____  | |                    
| |     /  \     | || | |_   ___ `.  | || ||_   \  /   _|| || |    |_   _|   | || ||_   \|_   _| | |                    
| |    / /\ \    | || |   | |   `. \ | || |  |   \/   |  | || |      | |     | || |  |   \ | |   | |                    
| |   / ____ \   | || |   | |    | | | || |  | |\  /| |  | || |      | |     | || |  | |\ \| |   | |                    
| | _/ /    \ \_ | || |  _| |___.' / | || | _| |_\/_| |_ | || |     _| |_    | || | _| |_\   |_  | |                    
| ||____|  |____|| || | |________.'  | || ||_____||_____|| || |    |_____|   | || ||_____|\____| | |                    
| |              | || |              | || |              | || |              | || |              | |                    
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |                    
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'                     
 */

module.exports = async function isAdmin(client, message, statement) {
  let error = require("./missingPerms.js");
  const modRole = client.config.serverRoles;
  if (message.member.roles.cache.has(r => (r.id == modRole.owner) || (r.id == modRole.admin) || (r.id == modRole.mod))) {
   console.log(`User is either an Owner, Admin, or Mod`); 
   return true;
  } else {
     if (statement == true) {
       //error(`You don't have one of the following roles: \`OWNER\`, \`ADMIN\`, \`MOD\``, message);
      console.log(`User is not an Owner, Admin, or Mod`); 
      return false;
     }
  }
}
