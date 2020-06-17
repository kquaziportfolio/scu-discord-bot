const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'league',
    description: 'league!',   
    async execute(message, args) {
        const lolInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle("League of Legends Statistics Command")
            .addField("Description:", `Get LOL stats with username between 1-16 characters`, true)
            .addField("Usage:", "`>league [username]`", true)
            .addField("Example:", ">league JAVA9620", true)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if (!prompt[0]) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length <= 1) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length >= 16) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0]) {
                message.channel.send({embed: {title: `__**Here's your LOL stats!**__`, description: `<@${member}>'s [LOL](https://wol.gg/stats/na/${prompt[0]}/) Stats`, image: {url: `https://wol.gg/stats/na/${prompt[0]}/`}, color: 10231598}})
                .catch(err => console.log(`Error: ${err}`))
            }
        }
        }