const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'announce',
    description: 'Announce to server members!',
    args: true,
    usage: `[channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`,   
    guildOnly: true,
    async execute(message, args) {
        let sendMessage = require(`../modules/sendMessage.js`);
        message.delete();

		let isAdmin = require(`../modules/isAdmin.js`);
        
        if(isAdmin(message, false)) {
                const prompt = args.join(' ').split(' ~ ');

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: config.school_color, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        
               sendMessage(client, config.channels.auditlogs, { embed: { title: `__**Server Announcement Made!**__`, description: `<@${message.author.id}> just made a Discord server announcement!`}})
        }
    }
}