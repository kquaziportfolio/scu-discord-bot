const Discord = require(`discord.js`); //requires Discord.js integration package
const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: '8ball',
    description: 'Please enter a full question with 3 or more words to get an 8-ball answer!',
    usage: `${config.prefix}8ball [question]?`,
		async execute(message, args) { 
            message.delete();
        
            const prompt = args.join(' ');

            if(!prompt[3] || !(prompt.includes("?"))) 
                return message.reply({embed: {
                        description: "Please enter a full question with 3 or more words!",
                        color: config.school_color,
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

            const ballEmbed = new MessageEmbed()
            .setTitle(`__**Your 8-ball results!**__`)
            .setColor(config.school_color)
            .setDescription(`**Question:** ${prompt}\n**Answer:** ${replies[result]}`)
            .setFooter(`Created by the server lords!`)
            .setTimestamp()
            message.channel.send(ballEmbed);
        }
    }