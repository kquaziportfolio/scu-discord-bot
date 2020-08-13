const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = { 
    name: 'fortnite',
    description: 'Get your Fortnite statistics!',
    usage: `${config.prefix}fortnite [username]`,
    async execute(message, args) {
        message.delete();

        const fortniteInstructions = new MessageEmbed()
            .setColor(config.school_color)
            .addField(`Here's an example: ${prefix}fortnite | JAVA9620`)
            .setTimestamp();

            const prompt = args.join(' ').split(' | ');

            let member = message.author.id;
            
            if (!prompt[0]) return message.channel.send(fortniteInstructions);
          
            message.channel.send({embed: {title: `__**Here's your Fortnite stats!**__`, description: `<@${member}>'s [Fortnite](https://fortnitetracker.com/profile/all/${prompt[0]}/) Stats`, color: config.school_color}})
            .catch(err => console.log(`Error: ${err}`))
    }
}