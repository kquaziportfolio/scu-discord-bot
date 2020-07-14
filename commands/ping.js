const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports =  { // >ping
	name: 'ping',
	description: 'Ping!',
	async execute(message, args) {
		const msg = await message.channel.send(`Pinging...`)
		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is it ok, I can\'t look!', 'I hope it isn\'t bad!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit({embed: {description: `**Response:** ${response}\n**Ping Latency:** ${latency}ms`, color: 10231598}})
    }
} 