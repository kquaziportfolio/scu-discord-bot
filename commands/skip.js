const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'skip',
	description: 'Skip a song!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send({embed: {description: 'You have to be in a voice channel to stop the music!', color: 10231598}});
		if (!serverQueue) return message.channel.send({embed: {description: 'There is no song that I could skip!', color: 10231598}});
		serverQueue.connection.dispatcher.end();
	},
};