const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require(`../config.json`);

module.exports = { 
    name: 'suggest',
    description: 'Public suggestions to ping server admins!',
    usage: `${prefix}suggest [insert title] | [insert description]`,
    guildOnly: true,   
    async execute(message, args) {
        const announceInstructions = new MessageEmbed()
        .setColor(10231598)
        .setDescription(`Here's an example: ${prefix}suggest Hi! | Can I have more Wumpus?`)
        .setTimestamp();

        const prompt = args.join(' ').split(' | ');
        if(!prompt[1]) return message.channel.send(announceInstructions);

        let channel = message.guild.channels.cache.find(channel => channel.name === "suggestions");
        
        channel.send(`<@&709118762707845211> <@&710593727864897646>`,{embed : {color: 10231598, title: `${prompt[0]}`, description: `${prompt[1]}`}});
    }          
}