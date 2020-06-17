const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'overwatch',
    description: 'overwatch!',   
    async execute(message, args) {
        const overwatchInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle("Overwatch Statistics Command")
            .addField("Description:", `Get Overwatch stats with username between 5-12 characters`, true)
            .addField("Usage:", "`>overwatch [username]`", true)
            .addField("Example:", ">overwatch JAVA9620", true)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if (!prompt[0]) {    
                message.channel.send(overwatchInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length < 5) {    
                message.channel.send(overwatchInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length > 12) {    
                message.channel.send(overwatchInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0]) {
                message.channel.send({embed: {title: `__**Here's your Overwatch stats!**__`, description: `<@${member}>'s [Overwatch](https://www.overbuff.com/players/pc/${prompt[0]}/) Stats`, color: 10231598}})
                .catch(err => console.log(`Error: ${err}`))
            }
    }
}