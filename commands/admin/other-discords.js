const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'other-discords',
    description: 'For outputting other Discord server embeds!',  
    usage: `${prefix}other-discords [title] | [description] | [image url]`,
    guildOnly: true, 
    async execute(message, args) {
        if ((message.member.roles.cache.some(role => role.name == ['Admin', 'Mod', 'admins']))) {
            const discordInstructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .addField("Here's an example:", "&other-discords General SCU Server | [Join!](https://discord.gg/YusWdfu) | https://jasonanhvu.github.io/assets/img/logo-pic.png")
                .setTimestamp();

            const prompt = args.join(' ').split('|');
            if(!prompt[2]) return message.channel.send(discordInstructions);
                  
            const channel = message.guild.channels.cache.find(channel => channel.name === "discord-promos")
            channel.send({embed : {color: 10231598, title: `${prompt[0]}`, description: `${prompt[1]}`, thumbnail: {url: `${prompt[2]}`}}});
        } else {
        const permission_embed = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle(`Oops, an error happened...`)
        .setDescription("You must have the following roles: " + "`Admin`, `Mod`, or `admins`")
        .setThumbnail(`attachments://no_perm.gif`)
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