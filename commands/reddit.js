const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = async (message) => { 
    const embed = new MessageEmbed()
    .setTitle(`Reddit Commands`)
    .setColor(10231593)
    .setDescription("`jojo`, `meme`, `scu`, `template`")
    .setFooter("Use `>` before each command!")
    message.channel.send(embed);
}