const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality

module.exports = {
	name: 'about',
	description: 'about!',
		execute(message, args) { 
            const embed = new MessageEmbed()
            .setColor(10231598)
            .setTitle(`About Commands`)
            .setDescription("`>diversity`, `>jesuit-catholic-tradition`, `>history`, `>mission`, `>motto`, `>values`, `>vision`")
            .setFooter("Use `>` before each command!")
            message.channel.send(embed)
        }
}