const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality

module.exports = {
	name: 'utility',
	description: 'utility!',
		execute(message, args) { 
            const embed = new MessageEmbed()
            .setColor(10231598)
            .setTitle(`Utility Commands`)
            .setDescription("`&cmd`, `&covid19`, `&ping`, `&remind`, `&report`, `&roles-list`, `&schedule`, `&server-invite`, `&set-nick`, `&suggest`, `&user-info`, `&weather`")
            .setFooter("Use `&` before each command!")
            message.channel.send(embed)
        }
}