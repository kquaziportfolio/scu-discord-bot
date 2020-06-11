const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'ban',
	description: 'ban!',
		execute(message, args) {   
            if (message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod'])) {
                // the ban code here
                message.channel.send("You have permission to ban. Abuse away!")
                .then(msg => msg.delete({timeout: 5000}))
            } else {
                message.channel.send("You do not have sufficient permissions to run this command!")
                .then(msg => msg.delete({timeout: 5000}))
            }
        }
}