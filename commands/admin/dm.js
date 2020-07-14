const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports  = {
    name: 'dm',
    description: 'direct message!',   
    async execute(message, args) {
        const dmInstructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Single Direct Message Command")
        .addField("Description:", `Single direct messaging`, true)
        .addField("Usage:", "`>dm [single user mention] | [message]`", true)
        .addField("Example:", ">dm @DiHydrogenMonoxide | [message]!")
        .setTimestamp()

        const mentionedUser = message.mentions.members.first();
        const messageUser = args.slice(1).join(" ").split("|");
        if(!mentionedUser) return message.channel.send(dmInstructions).then(msg => msg.delete({timeout: 10000}))
        if(!messageUser) return message.channel.send(dmInstructions).then(msg => msg.delete({timeout: 10000}))
        mentionedUser.send(`${messageUser}`)
        .then(console.log(`Message sent to ${mentionedUser}`))
        .catch(err => `Error: ${err}`)
    
        if (!(message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod']))) {
            const permission_embed = new Discord.MessageEmbed()
            .setColor(10231598)
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