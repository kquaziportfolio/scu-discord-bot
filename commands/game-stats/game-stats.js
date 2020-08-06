const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'game-stats',
    description: 'Get game statistics from different games!',   
    async execute(message, args) {
        const game_stats = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle(`Game Stats Commands`)
        .setDescription("`&fortnite`, `&league`, `&overwatch`, `&rocket-league`")
        .setFooter("Use `&` before each command!")
        message.channel.send(game_stats)
        .catch(err => console.log(`Error: ${err}`))
    }
}