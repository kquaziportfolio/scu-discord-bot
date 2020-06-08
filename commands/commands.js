const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = (message) => {    
    const cmds_embed = {
        "title": "Father O'Brien Commands List",
        "description": "Give us feedback on our bot!",
        "image": {
            "url": "https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png",
        },
        "author": {
            name: `${message.author.username}`,
            icon_url: 'https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png',
            url: 'https://jasonanhvu.github.io/',
        },
        "color": 10231598,
        "fields": [
        {
            "name": `${emojiCharacters.pong} Ping`,
            "value": "`>ping`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.bar} Foo`,
            "value": "`>foo`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.speech} About`,
            "value": "`>about`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.info} Info`,
            "value": "`>info`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Prayers`,
            "value": "`>prayers`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.reddit} Reddit`,
            "value": "`>reddit`",
            "inline": true
        },
        ],
        "timestamp": new Date(),
        "footer": {
            text: "Brought to you by the creators of this Discord server.",
            url: 'https://jasonanhvu.github.io/scu-discord-bot/',
        },
    }
    message.channel.send({embed: cmds_embed});
}