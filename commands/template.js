const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const memes = require(`random-puppy`); //for memes

module.exports = (message) => {
    let reddit = ["memetemplatesofficial", "templatememes"]
    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();
    setTimeout(() => {
        // Removes the user from the set after a minute
            memes(subreddit).then (async url => {
                await message.channel.send({
                    files: [{
                        attachment: url,
                        name: 'meme-template.jpg'
                    }]
                }).then(() => message.channel.stopTyping(true));
            }).catch(err => {
                const embed = new MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, wait 5 seconds...`)
                .setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
                message.channel.send(embed);
                console.log(err);
            });
        }, 5000);
}