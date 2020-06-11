const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const quotes = require(`inspirational-quotes`); //for quotes

module.exports = {
	name: 'quote',
	description: 'quotes!',
		execute(message, args) {
			const embed = new MessageEmbed()
				.setTitle(`Here's your quote!`)
				.setColor(10231598)	
				.setDescription(quotes.getRandomQuote())
				.setTimestamp()
				.setFooter("Created by the server lords!")
			message.channel.send(embed);
		}
	}