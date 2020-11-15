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

module.exports = function isAdmin(client, message, statement) { 
   const userRole = message.member.roles.cache;
   const modRole = client.config.serverRoles;
   if(userRole.some(r=>["Owner", "Admin", "Mod"].includes(r.name)) || userRole.has(modRole.owner, modRole.admin, modRole.mod)) {
     return true;
   } else {
      if (statement == true) {
       message.reply({ embed: { description: `You don't have one of the following roles: \`OWNER\`, \`ADMIN\`, \`MOD\``, color: client.config.school_color}}); 
       return false;
      }
   }
}
