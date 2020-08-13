const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'league',
    description: 'Get League of Legends statistics here!',
    usage: `${config.prefix}league [username]`,
    async execute(message, args) {
        message.delete();
        
        const lolInstructions = new MessageEmbed()
            .setColor(config.school_color)
            .addField("Here's an example:", ">league JAVA9620", true)
            .setTimestamp();

            const prompt = args.join(' ').split(' ');

            let member = message.author.id;
            
            if (!prompt[0]) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length <= 1) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0].length >= 16) {    
                message.channel.send(lolInstructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(error => console.log(`Error: ${error}`))
            } else if (prompt[0]) {
                message.channel.send({embed: {title: `__**Here's your LOL stats!**__`, description: `<@${member}>'s [LOL](https://na.op.gg/summoner/userName=${prompt[0]}/)`, color: config.school_color}})
                .catch(err => console.log(`Error: ${err}`))
            }
    }
}