const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'game-stats',
    description: 'Get game statistics from different games!',   
    usage: `${config.prefix}[game name]`,
    async execute(message, args) {
        message.delete();
        
        const game_stats = new MessageEmbed()
        .setColor(config.school_color)
        .setTitle(`Game Stats Commands`)
        .setDescription("`&fortnite`, `&league`, `&overwatch`, `&rocket-league`")
        .setFooter("Use `&` before each command!")
        message.channel.send(game_stats)
        .catch(err => console.log(`Error: ${err}`))
    }
}