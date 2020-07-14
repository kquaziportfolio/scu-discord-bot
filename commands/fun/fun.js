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
        .setDescription(
        "- Animals: `>bird`, `>cat`, `>dog`, `>fox`,  `>koala`, `>panda`, `>pikachu`\n" +
        "- Cute: `>hug`, `>pat`, `>wink`\n" +
        "- Cool: `>8ball`, `>die-roll`, `>joke`, `>foo`, `>meme-api`, `>pokedex`, `>ping`, `>quote`\n" +
        "- Extra: `>report`, `>schedule`, `>set-nick`, `>suggest`")
        .setFooter("Use `>` before each command!")
        message.channel.send(embed);
    }
}