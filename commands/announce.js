const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
let isAdmin = require(`../modules/isAdmin.js`);
let sendMessage = require(`../google-form-functions/sendMessage.js`);

module.exports = { 
    name: 'announce',
    description: 'Announce to server members!',
    usage: `${config.prefix}announce [channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`,   
    guildOnly: true,
    async execute(message, args) {
        message.delete();
        
        if (isAdmin(message.author, message)) {
            const announceInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .addField(`Here's an example: ${prefix} announce  726585970799149149 ~ <@Role1> <@User1> ~ Hi! ~ Welcome to the server! ~ https://jasonanhvu.github.io/assets/img/logo-pic.png`)
                .setTimestamp();

                const prompt = args.join(' ').split(' ~ ');
                
                if(!prompt[4]) return message.channel.send(announceInstructions);

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: config.school_color, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        
                sendMessage(client, config.channels.updates, { embed: { title: `__**Server Announcement Made!**__`, description: `<@${message.author.id}> just made a Discord server announcement!`}})
        }
    }
}