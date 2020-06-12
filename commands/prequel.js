const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const memes = require(`random-puppy`); //for memes

module.exports = { 
    name: 'meirl',
	description: 'meirl',
	async execute( message, args) {
        let reddit = ["prequelmemes", "exiledprequelmemers"];
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
                            text: "Brought to you by the creators of this Discord server.",
                            url: 'https://jasonanhvu.github.io/scu-discord-bot/'
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
                    .setFooter("Use `>` before each command!")
                    console.log(err);
                });
            }, 1000);
    }
}