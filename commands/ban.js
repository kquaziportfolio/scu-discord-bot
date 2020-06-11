const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'ban',
	description: 'ban!',
	async execute(message, args) {   
        if(message.member.hasPermission("BAN_MEMBERS")) {
            // the mute code here
            return message.channel.send({embed: {
                description: "You have permission to ban. Abuse away!",
                color: 10231598
            }
            }).then(msg => msg.delete({timeout: 2000}))
        } else {
            return message.channel.send({embed: {
                description: "You do not have sufficient permissions to run this command!",
                color: 10231598
            }
            }).then(msg => msg.delete({timeout: 2000}))
        }
    }
}