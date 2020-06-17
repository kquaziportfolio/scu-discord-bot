const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'random',
	description: 'random!',
	async execute(message, args) {
        const embed = new MessageEmbed()
        .setColor(10231598)
        .setTitle(`Random Commands`)
        .setDescription("`>8ball`, `>bird`, `>cat`, `>die-roll`, `>dog`, `>foo`, `>fox`, `>hug`, `>joke`, `>koala`," +
        " `>meme-api`, `>panda`, `>pat`, `>pikachu`, `>pokedex`, `>ping`, `>quote`, `>suggest`, `>wink`")
        .setFooter("Use `>` before each command!")
        message.channel.send(embed);
    }
}