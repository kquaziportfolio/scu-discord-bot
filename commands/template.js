const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const memes = require(`random-puppy`); //for memes

module.exports = {
	name: 'template',
	description: 'template!',
		execute(message, args) { 
            let reddit = ["memetemplatesofficial", "templatememes"]
            let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

            message.channel.startTyping();

            message.channel.send({embed: {
                color: 10231598,
                description: `**Generating template...**`
                } 
            }).then(msg => msg.delete({timeout: 1000}))
            
            setTimeout(() => {
                // Removes the user from the set after a minute
                    memes(subreddit).then (async url => {
                        await message.channel.send({embed: {
                            color: 10231598,
                            description: `**Here's your template!**`,
                            footer: {
                                text: "Created by the server lords!"
                            },
                            image: {
                                url: "attachment://template.jpg"
                            },
                            timestamp: new Date()
                        },
                        files: [{ attachment: url, name: 'template.jpg' }]  
                        }).then(() => message.channel.stopTyping(true));
                    }).catch(err => {
                        const embed = new MessageEmbed()
                        .setColor(10231598)
                        .setTitle(`Oops, wait 5 seconds...`)
                        .setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
                        message.channel.send(embed);
                        console.log(err);
                    });
            }, 1000);
        }
}