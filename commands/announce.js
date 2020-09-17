const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'announce',
    description: 'Announce to server members!',
    usage: `${config.prefix}announce [channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`,   
    guildOnly: true,
    async execute(message, args) {
        let sendMessage = require(`../modules/sendMessage.js`);
        message.delete();

		let isAdmin = require(`../modules/isAdmin.js`);
        
        if(isAdmin(message, false)) {
            const announceInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .setTitle(`Here's an example:`)
                .setDescription(`${config.prefix}announce 726585970799149149 ~ <@Role1> <@User1> ~ Hi! ~ Welcome to the server! ~ https://jasonanhvu.github.io/assets/img/logo-pic.png`)
                .setTimestamp();

                const prompt = args.join(' ').split(' ~ ');
                
                if(!prompt[4]) return message.channel.send(announceInstructions);

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: config.school_color, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        
               sendMessage(client, config.channels.auditlogs, { embed: { title: `__**Server Announcement Made!**__`, description: `<@${message.author.id}> just made a Discord server announcement!`}})
        }
    }
}