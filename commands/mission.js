const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'mission',
	description: 'mission!',
		execute(message, args) {  
			const embed = new MessageEmbed()
					.setColor(10231598)	
					.setDescription(`The University pursues its vision by creating an academic community that educates the whole person within the Jesuit, Catholic tradition, ` + 
					`making student learning our central focus, continuously improving our curriculum and co-curriculum, strengthening our scholarship and creative work, and serving the communities of which we are a part in Silicon Valley and world.`)
					.attachFiles([`./assets/scu-mission.png`])
					.setImage(`attachment://scu-mission.png`)
					message.channel.send(embed);
		}
}