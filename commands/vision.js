const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'vision',
	description: 'vision!',
		execute(message, args) {   
			const embed = new MessageEmbed()
				.setColor(10231598)
				.setTitle(`SCU's Vision`)
				.setDescription(`Santa Clara University will educate citizens and leaders of competence, conscience, ` + 
				`and compassion and cultivate knowledge and faith to build a more humane, just, and sustainable world.`)
				.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
				message.channel.send(embed);
		}
}