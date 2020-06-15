const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'glory-be',
	description: 'glory-be!',
		execute(message, args) { 
            const embed = new MessageEmbed()
                .setTitle(`Glory Be`)
                .setColor(10231598)
                .attachFiles(`./assets/glory-be.png`)
                .setImage(`attachment://glory-be.png`)
                .setDescription('Glory be to the Father, and to the Son, and to the Holy Spirit, as it' +
                                ' was in the beginning, is now, and ever shall be, world without end. Amen.')
                message.channel.send(embed);
        }
}