const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: '8ball',
	description: '8ball!',
		execute(message, args) { 
            const prompt = args.join(' ') 

            if(!prompt[1]) return message.reply({embed: {
                description: "Please enter a full question with 2 or more words!",
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))
            
            let replies = ["It is certain.", "It is decidedly so.", "Without a doubt", "Yes-definitely.",
            "You may rely on it", "As I see it, yes.", "Most likely.", "Outlook good", "Yes", "Signs point to yes",
            "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", 
            "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", 
            "Outlook not so good.", "Very doubtful."];

            let result = Math.floor((Math.random() * replies.length));

            let ballEmbed = new Discord.MessageEmbed()
            .setTitle(`__**Your 8-ball results!**__`)
            .setColor(10231598)
            .addField("Question", prompt)
            .addField("Answer", replies[result]);

            message.channel.send(ballEmbed);
        }
    }