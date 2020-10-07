module.exports = { 
    name: 'other-discords',
    description: 'For outputting other Discord server embeds!',  
    args: true,
    usage: `[title] | [description] | [image url]`, 
    category: 'Admin',  
    async execute(client, message, args) {
        message.delete();
       
        let isAdmin = require("../../modules/isAdmin.js");
        let sendMessage = require("../../modules/sendMessage.js");

        if(isAdmin(client, message, false)) {
            const prompt = args.join(' ').split('|');
                    
            sendMessage(client, client.config.channels.discordPromos, {embed : {color: client.config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`, thumbnail: {url: `${prompt[2]}`}}});

            sendMessage(client, client.config.channels.auditlog, { embed: { title: `__**Discord Promo Created!**__`, description: `<@${message.author.id}> just created a Discord server promo!`}})
        }
    }
}