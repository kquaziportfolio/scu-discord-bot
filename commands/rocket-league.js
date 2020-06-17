const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'rocket-league',
    description: 'rocket-league!',   
    async execute(message, args) {
        const rocketLeagueInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle("Rocket League Statistics Command")
            .addField("Description:", `Get Rocket League stats with username between 1-16 characters`, true)
            .addField("Usage:", "`>rocket-league [username]`", true)
            .addField("Example:", ">rocket-league JAVA9620", true)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if (!prompt[0]) {    
                message.channel.send(rocketLeagueInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length <= 1) {    
                message.channel.send(rocketLeagueInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length >= 16) {    
                message.channel.send(rocketLeagueInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0]) {
                message.channel.send({embed: {title: `__**Here's your Rocket League stats!**__`, description: `<@${member}>'s [Rocket League](https://rocketleague.tracker.network/profile/steam/${prompt[0]}/ Stats`}, color: 10231598})
                .catch(err => console.log(`Error: ${err}`))
            }
    }
}