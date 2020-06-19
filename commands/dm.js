const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports  = {
    name: 'dm',
    description: 'direct message!',   
    async execute(message, args) {
            const prompt = message.content.join(" ");

            if (isNaN(prompt[1])) return message.channel.send("This is not an ID! Make sure to you the user's ID!")
            const embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
                .setDescription(Rargs)
                .setTitle("**Message**:")
                .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
            client.users.get(prompt[1]).send(embed).catch(console.log(`Message was sent to ${prompt[1]}!`))
            if (message.author.bot) return;
            message.channel.send("Your Message was Sent!").then(msg => msg.delete(3000)).catch(console.error)
            
        if(!message.member.hasPermission("MENTION_MEMBERS")) {
            const permission_embed = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle(`Oops, an error happened...`)
            .setDescription(`You don't have permission to perform this command!`)
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