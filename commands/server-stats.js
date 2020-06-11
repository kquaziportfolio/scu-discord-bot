const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'server-stats',
	description: 'server-stats!',
		execute(message, args) {  
			const embed = new MessageEmbed()
					.setTitle('Server Information')
					.setColor(10231598)
					.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
					.setDescription(`\nServer Name: ${message.guild.name}\nServer Region: ${message.guild.region}` +
					`\nUser Count: ${message.guild.memberCount}\nVerification Level: ${message.guild.verificationLevel}`);
					message.channel.send(embed);
		}
}