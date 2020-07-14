const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'meme',
    description: 'meme-reddit!',
	async execute(message, args) {
        const embed = new MessageEmbed()
        .setColor(10231598)
        .setTitle(`Meme Reddit Commands`)
        .setDescription("`4chan`, `blacktwitter`, `dankmemes`, `meirl`, `prequel`, `template`, `wholesome`")
        .setFooter("Use `>` before each command!")
        message.channel.send(embed)
    }
}