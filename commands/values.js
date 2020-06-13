const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'values',
	description: 'values!',
		execute(message, args) { 
			const embed = new MessageEmbed()
					.setColor(10231598)
					.setTitle(`SCU's Values`)
					.setDescription(`We serve academic excellence, engaged learning, commitment to students, service to others, ` +
					`community and diversity, and Jesuit distinctiveness all year round!`)
					.attachFiles([`./assets/scu-mission.png`])
					.setImage(`attachment://scu-mission.png`)
					message.channel.send(embed);
		}
}