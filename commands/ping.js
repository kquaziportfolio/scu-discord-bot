const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports =  { // >ping
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit({embed: {description: "Ping:" + (Date.now() - msg.createdTimestamp) + " ms", color : 10231598}}) // Edits message with current timestamp minus timestamp of message
            })
    }
} 