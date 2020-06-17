const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'die-roll',
	description: 'die-roll!',
    async execute(message, args) {  
        const dice = [1, 2, 3, 4, 5, 6];
        const first_die = dice[Math.floor(Math.random()*dice.length)];
        const second_die = dice[Math.floor(Math.random()*dice.length)];

        if (first_die == 1 && second_die == 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`__**SNAKE EYES**__`)
            .setColor(10231598)
            .setDescription(`YOU GOT SNAKE EYES!`)
            .attachFiles([`./assets/snakeeyes.jpg`])
            .setImage(`attachments://snakeeyes.jpg`)
            .setTimestamp()
            .setFooter(`Created by the server lords!`)

            return message.channel.send(embed)
            .catch(err => `Error: ${err}`) 

        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Here's your roll!`)
            .setColor(10231598)
            .addField("__**First Die**__", first_die, true)
            .addField("__**Second Die**__", second_die, true)
            .setTimestamp()
            .setFooter(`Created by the server lords!`)

            return message.channel.send(embed)
            .catch(err => `Error: ${err}`)  
        }
    }
}