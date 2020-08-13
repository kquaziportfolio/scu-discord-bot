const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports  = {
    name: 'dm',
    description: 'direct message!',   
    guildOnly: true,
    async execute(message, args) {
        message.delete();
        
        const dmInstructions = new MessageEmbed()
        .setColor(config.school_color)
        .setTitle("Single Direct Message Command")
        .addField("Description:", `Single direct messaging`, true)
        .addField("Usage:", "`&dm [single user mention] | [message]`", true)
        .addField("Example:", "&dm @DiHydrogenMonoxide | [message]!")
        .setTimestamp()

        const mentionedUser = message.mentions.members.first();
        const messageUser = args.slice(1).join(" ").split("|");
        if(!mentionedUser) return message.channel.send(dmInstructions).then(msg => msg.delete({timeout: 10000}))
        if(!messageUser) return message.channel.send(dmInstructions).then(msg => msg.delete({timeout: 10000}))
        mentionedUser.send(`${messageUser}`)
        .then(console.log(`Message sent to ${mentionedUser}`))
        .catch(err => `Error: ${err}`)
    
        if ((!message.member.roles.cache.has(config.server_roles.admin, config.server_roles.mod))) {
            const permission_embed = new MessageEmbed()
            .setColor(config.school_color)
            .setTitle(`Oops, an error happened...`)
            .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
            .setImage(`https://media1.tenor.com/images/9277c9be9e3d7a953bb19bfacf8c1abf/tenor.gif?itemid=12620128`)
            .setTimestamp()
            message.channel.send(permission_embed)
            .then(msg => {
                msg.delete({ timeout: 2000 })
            })
            .catch(err => console.log(`Error: ${err}`));
        } 
    }
};