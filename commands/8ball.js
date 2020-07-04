const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: '8ball',
	description: '8ball!',
		async execute(message, args) { 
            const prompt = args.join(' ');

            if(!prompt[3] || !(prompt.includes("?"))) 
                return message.reply({embed: {
                        title: "8Ball Command",
                        description: "**Description:**\nPlease enter a full question with 3 or more words!",
                        fields: [
                            { name: "Usage:", value: "`8ball [question]`", inline: true },
                            { name: "Example:", value: "`>8ball Will I be admin someday?`", inline: true}
                        ],
                        color: 10231598,
                        timestamp: new Date(),
                        footer: "Created by the server lords"
                    }
                }).then(msg => msg.delete({timeout: 10000}))
                .catch(err => console.log(`Error: ${err}`))
            
            const replies = ["It is certain.", "It is decidedly so.", "Without a doubt", "Yes-definitely.",
            "You may rely on it", "As I see it, yes.", "Most likely.", "Outlook good", "Yes", "Signs point to yes",
            "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", 
            "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", 
            "Outlook not so good.", "Very doubtful."];

            const result = Math.floor((Math.random() * replies.length));

            const ballEmbed = new Discord.MessageEmbed()
            .setTitle(`__**Your 8-ball results!**__`)
            .setColor(10231598)
            .setDescription(`**Question:** ${prompt}\n**Answer:** ${replies[result]}`)
            .setFooter(`Created by the server lords!`)
            .setTimestamp()
            message.channel.send(ballEmbed);
        }
    }