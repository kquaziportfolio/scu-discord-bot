const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'other-discords',
    description: 'For outputting other Discord server embeds!',  
    usage: `${config.prefix}other-discords [title] | [description] | [image url]`,
    guildOnly: true,
    async execute(message, args) {
        message.delete();

        if ((message.member.roles.cache.has(config.serverRoles.admin, config.serverRoles.mod))) {

            const discordInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .addField("Here's an example:", `${config.prefix}other-discords General SCU Server | [Join!](https://discord.gg/YusWdfu) | https://jasonanhvu.github.io/assets/img/logo-pic.png`)
                .setTimestamp();

            const prompt = args.join(' ').split('|');
            if(!prompt[2]) await message.channel.send(discordInstructions);
                  
            const channel = message.guild.channels.cache.find(channel => channel.id === config.channels.discordPromos)
            channel.send({embed : {color: config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`, thumbnail: {url: `${prompt[2]}`}}});
        
            if(prompt[2]) {
                let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");
                auditLogs.send({ embed: { title: `__**Discord Promo Created!**__`, description: `<@${message.author.id}> just created a Discord server promo!`}})
            }
        } else {
            const permission_embed = new MessageEmbed()
            .setColor(config.school_color)
            .setTitle(`Oops, an error happened...`)
            .setDescription("You must have the following roles: " + "`Admin` or `Mod`")
            .setThumbnail(`attachments://no_perm.gif`)
            .attachFiles(`./assets/no_perm.gif`)
            .setTimestamp()
            message.channel.send(permission_embed)
            .then(msg => {
                msg.delete({ timeout: 2000 })
            });
       }
    }
}