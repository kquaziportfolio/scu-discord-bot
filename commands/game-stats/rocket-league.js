const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'rocket-league',
    description: 'Get Rocket League statistics!',
    usage: `${prefix}rocket-league [username]`   ,
    async execute(message, args) {
        const rocketLeagueInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .setDescription(`Here's an example: ${prefix}rocket-league JAVA9620`)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if(!prompt[0]) return message.channel.send(rocketLeagueInstructions);
            message.channel.send({embed: {title: `__**Here's your Rocket League stats!**__`, description: `<@${member}&'s [Rocket League](https://rocketleague.tracker.network/profile/steam/${prompt[0]}/ Stats`}, color: 10231598})
            .catch(err => console.log(`Error: ${err}`))
    }
}