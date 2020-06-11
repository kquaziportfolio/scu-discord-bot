const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'hail-mary',
	description: 'hail-mary!',
		execute(message, args) { 
    const embed = new MessageEmbed()
        .setTitle(`Hail Mary`)
        .setColor(10231598)
        .setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWzwkOQah1oOzjuSIORXP4sQQ8RiFV6clVBmEGvWleLFTsbWrF&usqp=CAU`)
        .setDescription('Hail Mary, full of grace. The Lord is with thee. Blessed art thou among women, and' +
                        ' blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God,' +
                        ' pray for us sinners, now and at the hour of our death. Amen.')
        message.channel.send(embed);
    }
}