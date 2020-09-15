module.exports = function isAdmin(message, msg) {
    const config = require("../config.json");
    //for some reason, can't read property of "roles" on line 3 which is considered undefined

    let error = require("../events/error.js");
    try {
      if (message.member.roles.cache.has(config.serverRoles.admin)) {
        return true;
      } else {
        return false;
      }
    } catch {
      if (message.author.id == config.serverRoles.admin) {
        return true;
      } else {
        let role = config.serverRoles.admin;
        if (msg == true) {
          error(`You are missing the \`${role}\` permission role.`, message);
        }
      }
    }
  };