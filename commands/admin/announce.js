const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'announce',
    description: 'Announce to server members!',
    usage: `${prefix} announce [channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`,   
    guildOnly: true,
    async execute(message, args) {
        if ((message.member.roles.cache.has('710593727864897646', '709118762707845211'))) {
            const announceInstructions = new MessageEmbed()
                .setColor(10231598)
                .addField(`Here's an example: ${prefix} announce  726585970799149149 ~ <@Role1> <@User1> ~ Hi! ~ Welcome to the server! ~ https://jasonanhvu.github.io/assets/img/logo-pic.png`)
                .setTimestamp();

                const prompt = args.join(' ').split(' ~ ');
                
                if(!prompt[4]) return message.channel.send(announceInstructions);

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: 10231598, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        } else {
                const permission_embed = new MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, an error happened...`)
                .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
                .setImage(`attachments://no_perm.gif`)
                .attachFiles(`./assets/no_perm.gif`)
                .setTimestamp()
                message.channel.send(permission_embed)
                .then(msg => {
                    msg.delete({ timeout: 2000 })
                })
                .catch(err => console.log(`Error: ${err}`));
        } 
    }
}