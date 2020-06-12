const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'die-roll',
	description: 'die-roll!',
    async execute(message, args) {  
        const dice = [1, 2, 3, 4, 5, 6];

        const embed = new Discord.MessageEmbed()
            .setTitle(`Here's your roll!`)
            .setColor(10231598)
            .addField("__**First dice**__", dice[Math.floor(Math.random()*dice.length)], true)
            .addField("__**Second dice**__", dice[Math.floor(Math.random()*dice.length)], true)
            .setTimestamp()
            .setFooter(`Created by the server lords!`)

        return message.channel.send(embed);   
    }
}