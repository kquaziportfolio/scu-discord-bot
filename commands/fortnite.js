const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'fortnite',
    description: 'fortnite!',   
    async execute(message, args) {
        const fortniteInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle("Fortnite Statistics Command")
            .addField("Description:", `Get Fortnite stats with username between 5-32 characters`, true)
            .addField("Usage:", "`>fortnite [username]`", true)
            .addField("Example:", ">fortnite JAVA9620", true)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if (!prompt[0]) {    
                message.channel.send(fortniteInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length < 5) {    
                message.channel.send(fortniteInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length > 32) {    
                message.channel.send(fortniteInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0]) {
                message.channel.send({embed: {title: `__**Here's your Fortnite stats!**__`, description: `<@${member}>'s [Fortnite](https://fortnitetracker.com/profile/all/${prompt[0]}/) Stats`, color: 10231598}})
                .catch(err => console.log(`Error: ${err}`))
            }
    }
}