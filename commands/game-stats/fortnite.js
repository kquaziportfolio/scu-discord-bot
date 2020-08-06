const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'fortnite',
    description: 'Get your Fortnite statistics!',
    usage: `${prefix}fortnite [username]`,
    async execute(message, args) {
        const fortniteInstructions = new Discord.MessageEmbed()
            .setColor(10231598)
            .addField(`Here's an example: ${prefix}fortnite | JAVA9620`)
            .setTimestamp();

            const prompt = args.join(' ').split(' | ');

            let member = message.author.id;
            
            if (!prompt[0]) return message.channel.send(fortniteInstructions);
          
            message.channel.send({embed: {title: `__**Here's your Fortnite stats!**__`, description: `<@${member}>'s [Fortnite](https://fortnitetracker.com/profile/all/${prompt[0]}/) Stats`, color: 10231598}})
            .catch(err => console.log(`Error: ${err}`))
    }
}