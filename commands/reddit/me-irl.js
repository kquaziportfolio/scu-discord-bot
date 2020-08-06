const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');
const memes = require(`random-puppy`); //for memes

module.exports = { 
    name: 'me-irl',
    description: 'Get `me-irl` memes from subreddit here!',
    usage: `${prefix}me-irl`,
	async execute(message, args) {
        let reddit = ["meirl", "me_irl", "2meirl4meirl"];
        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

        message.channel.startTyping();

       message.channel.send({embed: {
            color: 10231598,
            description: `**Generating meme...**`
            } 
        }).then(msg => msg.delete({timeout: 1000}))

        setTimeout(() => {
            // Removes the user from the set after a minute
                memes(subreddit).then (async url => {
                    await message.channel.send({embed: {
                        color: 10231598,
                        description: `**Here's your meme!**`,
                        footer: {
                            text: "Created by the server lords!"
                        },
                        image: {
                            url: "attachment://meme.jpg"
                        },
                        timestamp: new Date()
                    },
                    files: [{ attachment: url, name: 'meme.jpg' }]  
                    }).then(() => message.channel.stopTyping(true));
                }).catch(err => {
                    const embed = new MessageEmbed()
                    .setColor(10231598)
                    .setTitle(`Oops, wait 5 seconds...`)
                    .setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
                    .setTimestamp()
                    .setFooter("Created by the server lords!")
                    message.channel.send(embed);
                    console.log(err);
                });
            }, 1000);
    }
}