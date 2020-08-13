const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const memes = require(`random-puppy`); //for memes

module.exports = { 
    name: 'prequel',
    description: 'Get your prequel memes from subreddits here!',
    usage: `${config.prefix}prequel`,
	async execute( message, args) {
        message.delete(); 
        
        let reddit = ["prequelmemes", "exiledprequelmemers"];
        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

        message.channel.startTyping();

        message.channel.send({embed: {
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
                    .setColor(config.school_color)
                    .setTitle(`Oops, wait 5 seconds...`)
                    .setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
                    .setTimestamp()
                    .setFooter("Use `>` before each command!")
                    console.log(err);
                });
            }, 1000);
    }
}