const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const quotes = require(`inspirational-quotes`); //for quotes

module.exports = (message) => { 
    const embed = new MessageEmbed()
		.setTitle(`Here's your quote!`)
		.setColor(10231598)	
		.setImage(`https://s3.envato.com/files/232193117/1026_Preview_Image_v002.png`)
		.setDescription(quotes.getRandomQuote())
        message.channel.send(embed);
}