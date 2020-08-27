const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'announce',
    description: 'Announce to server members!',
    usage: `${config.prefix}announce [channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`,   
    guildOnly: true,
    async execute(message, args) {
        message.delete();
        
        if ((message.member.roles.cache.has(config.server_roles.admin, config.server_roles.mod))) {
            const announceInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .addField(`Here's an example: ${prefix} announce  726585970799149149 ~ <@Role1> <@User1> ~ Hi! ~ Welcome to the server! ~ https://jasonanhvu.github.io/assets/img/logo-pic.png`)
                .setTimestamp();

                const prompt = args.join(' ').split(' ~ ');
                
                if(!prompt[4]) return message.channel.send(announceInstructions);

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: config.school_color, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        
                auditLogs.send({ embed: { title: `__**Server Announcement Made!**__`, description: `<@${message.author.id}> just made a Discord server announcement!`}})
        } else {
                const permission_embed = new MessageEmbed()
                .setColor(config.school_color)
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