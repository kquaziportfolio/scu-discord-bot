const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'rocket-league',
    description: 'Get Rocket League statistics!',
    usage: `${config.prefix}rocket-league [username]`   ,
    async execute(message, args) {
        const rocketLeagueInstructions = new MessageEmbed()
            .setColor(config.school_color)
            .setDescription(`Here's an example: ${config.prefix}rocket-league JAVA9620`)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if(!prompt[0]) return message.channel.send(rocketLeagueInstructions);
            message.channel.send({embed: {title: `__**Here's your Rocket League stats!**__`, description: `<@${member}&'s [Rocket League](https://rocketleague.tracker.network/profile/steam/${prompt[0]}/ Stats`}, color: config.school_color})
            .catch(err => console.log(`Error: ${err}`))
    }
}