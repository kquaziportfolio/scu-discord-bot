const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'reddit',
	description: 'reddit!',
	async execute(message, args) {  
            const embed = new MessageEmbed()
            .setTitle(`Reddit Commands`)
            .setColor(10231593)
            .setDescription("`jojo`, `memereddit`, `scu`")
            .setFooter("Use `>` before each command!")
            message.channel.send(embed);
        }
}