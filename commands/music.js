const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'music',
    description: 'music!',   
    async execute(message, args) {
        const music_embed = new MessageEmbed()
        .setColor(10231598)
        .setTitle(`Music Commands`)
        .setDescription("now-playing`, `play`, `pause`, `skip`")
        .setFooter("Use `>` before each command!")
        message.channel.send(music_embed);
    }
}