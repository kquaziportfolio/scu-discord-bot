let isAdmin = require(`../../modules/isAdmin.js`);
let sendMessage = require(`../../modules/sendMessage`);

module.exports = {
    name:"git-reload",
    description: "Git pulls from my repo and restarts the bot from Discord!",
    cooldown: 20,
    category: "Admin",
    async execute(client,message,args) {
        if (isAdmin(client, message)) {
            //execute code here
            
            //AUDIT LOGGER!!
            /*
            sendMessage(client, client.config.channels.auditlog, /*insert message embed or regular text here for content*/);
            */
        }
    }
}
