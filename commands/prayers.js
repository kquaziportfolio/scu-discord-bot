const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'prayers',
	description: 'prayers!',
		execute(message, args) { 
            const prayer_embed = {
                "title": "Prayer Commands List",
                "color": 10231598,
                "description": "`our-father`, `hail-mary`, `glory-be`, `act-of-contrition`, `apostles-creed`, `nicene-creed`",
                "footer": {
                    "text": "For all your Catholic needs!"
                },
            }
            message.channel.send({embed: prayer_embed});
        }
}