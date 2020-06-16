const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'suggest',
    description: 'suggestions!',   
    async execute(message, args) {
        const suggestionInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle("Suggestions Command")
            .addField("Description:", `Public suggestions`, true)
            .addField("Usage:", "`>suggest [title] / [description]`", true)
            .addField("Example:", "`>announce Hi! / Can there be more Wumpus?`")
            .setTimestamp();

            const prompt = args.join(' ').split('/');

            const suggestion_embed = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle(`${prompt[0]}`)
            .setDescription(`${prompt[1]}`)
            .setFooter('Brought to you by the creators of this Discord server.')
            
            if (!prompt[0] && !prompt[1]) {
                
                message.channel.send(suggestionInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0] && !prompt[1]) {
                message.channel.send({ embed: {
                    description: `You must enter all arguments to display the embed!`,
                    color: 10231598
                    }
                }).then(msg => msg.delete({timeout: 2000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (!prompt[0] && prompt[1]) {
                message.channel.send({ embed: {
                    description: `You must enter all arguments to display the embed!`,
                    color: 10231598
                    }
                }).then(msg => msg.delete({timeout: 2000}))
                .catch(error => console.log(`Error: ${error}`))
            }
            else {
                const channel = message.guild.channels.cache.find(channel => channel.name === "suggestions")
                channel.send(suggestion_embed);
            }
    }
}