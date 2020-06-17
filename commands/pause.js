const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'pause',
	description: 'Pause all songs in the queue!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send({embed: {description: 'You have to be in a voice channel to pause the music!', color: 10231598}});
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};