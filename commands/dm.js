const config = require('../config.json');
let isAdmin = require("../modules/isAdmin.js");
let sendMessage = require(`../google-form-functions/sendMessage.js`);

module.exports  = {
    name: 'dm',
    description: 'direct message!',   
    guildOnly: true,
    async execute(message, args) {
        message.delete();

        
        if (isAdmin(message.author, message)) {
                
            let title = message.content.split("|")[1];
            let description = message.content.split("|")[2];

            if (!title || !description) return message.reply(`Enter something like this: \`${config.prefix}dm | [title] | [description] |\` `);

            let undelivered = 0;

            const memberList = message.guild.members.cache.filter(m => !m.user.bot).array(); // Filter out bots.

            memberList.forEach(member => {
                member.send(`${member}`, { embed: { title: title, description: description, color: config.school_color}})
                .catch(() => undelivered++)
            });

            sendMessage(client, config.channels.auditlogs, { embed: { description: `Messages have been sent, yet ${undelivered} members couldn't receive it due to probably turning their DMs off.`, color: config.school_color}})
            .catch(console.error); 
        }  
    }
}