const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'purge',
	description: 'purge!',
    async execute(message, args) {   

        const deleteCount = parseInt(args[0], 10);

        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            // the mute code here
            if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
                return message.channel.send({embed: {
                    description: "Please provide a number between 1 and 100 for the number of messages to delete",
                    color: 10231598
                }}).then(msg => msg.delete({timeout: 2000}))
            }            
            await message.channel.bulkDelete(deleteCount).catch(error => message.channel.send({embed: {description: `Couldn't delete messages because of: ${error}`}}));
        } else {
                return message.channel.send({embed: {
                    description: "You do not have sufficient permissions to run this command!",
                    color: 10231598
            }
            }).then(msg => msg.delete({timeout: 2000}))
        }
    }
}