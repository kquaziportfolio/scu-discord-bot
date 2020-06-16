const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'suggest',
    description: 'suggestions!',   
    async execute(message, args) {
        const announceInstructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Suggestions Command")
        .addField("Description:", `Public suggestions`, true)
        .addField("Usage:", "`>suggest [user ids]| [title] | [description]`", true)
        .addField("Example:", ">suggest <@Role1> <@User1>| Hi! | Can I have more Wumpus?`")
        .setTimestamp();

        const prompt = args.join(' ').split('|');
        
        if (!prompt[0] && !prompt[1] && !prompt[2]) {    
            message.channel.send(announceInstructions)
            .then(msg => msg.delete({timeout: 10000}))
            .catch(error => console.log(`Error: ${error}`))
        } else if (prompt[0] && !prompt[1] && !prompt[2]) {
            message.channel.send({ embed: {
                description: `You must enter the user mentions/roles!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(error => console.log(`Error: ${error}`))
        } else if (!prompt[0] && prompt[1] && prompt[2]) {
            message.channel.send({ embed: {
                description: `You must enter the title and description!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(error => console.log(`Error: ${error}`))
        } else if (prompt[0] && prompt[1] && !prompt[2]) {
            message.channel.send({ embed: {
                description: `You must enter the description!!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(error => console.log(`Error: ${error}`))
        } else if (!prompt[0] && prompt[1] && !prompt[2]) {
            message.channel.send({ embed: {
                description: `You must enter the title!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(error => console.log(`Error: ${error}`))
        } else if (!prompt[0] && !prompt[1] && !prompt[2]) {
            message.channel.send({ embed: {
                description: `You must enter the user mentions/roles and title!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(error => console.log(`Error: ${error}`))
        }
        else {
            const channel = message.guild.channels.cache.find(channel => channel.name === "suggestions")
            channel.send(`${prompt[0]}`,{embed : {color: 10231598, title: `${prompt[1]}`, description: `${prompt[2]}`}});
        }
    }          
}