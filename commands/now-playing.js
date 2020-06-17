const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
    name: 'now-playing',
    description: 'Get the song that is now playing!',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: { description: 'There is nothing playing.', color: 10231598}});
        return message.channel.send({embed: {description: `Now playing: ${serverQueue.songs[0].title}`, color: 10231598}});
    },
}