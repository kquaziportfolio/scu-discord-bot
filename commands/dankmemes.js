const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const memes = require(`random-puppy`); //for memes

module.exports = { 
    name: 'dankmemes',
    description: 'Get dank memes from subreddits!',
    usage: `${config.prefix}dankmemes`,
	async execute(message, args) {
        message.delete();
        
        let reddit = ["meme", "memes", "dankmemes", "dankchristianmemes", "funny", "pewdiepiesubmissions"];
        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

        message.channel.startTyping();

        await message.channel.send({embed: {
            color: config.school_color,
            description: `**Generating meme...**`
            } 
        }).then(msg => msg.delete({timeout: 1000}))

        setTimeout(() => {
            // Removes the user from the set after a minute
                memes(subreddit).then (async url => {
                    await message.channel.send({embed: {
                        color: config.school_color,
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
                    .setColor(config.school_color)
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