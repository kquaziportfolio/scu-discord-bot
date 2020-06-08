const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = (message) => {
    const prayer_embed = {
        "title": "Prayer Commands List",
        "color": 10231598,
        "footer": {
            "text": "For all your Catholic needs!"
        },
        "fields": [
        {
            "name": `${emojiCharacters.prayer} Our Father`,
            "value": "`>our-father`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Hail Mary`,
            "value": "`>hail-mary`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Glory Be`,
            "value": "`>glory-be`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Act of Contrition`,
            "value": "`>act-of-contrition`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Apostles' Creed`,
            "value": "`>apostles-creed`",
            "inline": true
        },
        {
            "name": `${emojiCharacters.prayer} Nicene Creed`,
            "value": "`>nicene-creed`",
            "inline": true
        },
        ]
    }
    message.channel.send({embed: prayer_embed});
}