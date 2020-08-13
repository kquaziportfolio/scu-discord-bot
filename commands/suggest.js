const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require(`../config.json`);

module.exports = { 
    name: 'suggest',
    description: 'Public suggestions to ping server admins!',
    usage: `${config.prefix}suggest [insert title] | [insert description]`,
    guildOnly: true,   
    async execute(message, args) {
        message.delete();
        
        const announceInstructions = new MessageEmbed()
        .setColor(config.school_color)
        .setDescription(`Here's an example: ${prefix}suggest Hi! | Can I have more Wumpus?`)
        .setTimestamp();

        const prompt = args.join(' ').split(' | ');
        if(!prompt[1]) return message.channel.send(announceInstructions);

        let suggestChannel = message.guild.channels.cache.find(channel => channel.name === "suggestions");
        let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");
        auditLogs.send({embed: { title: `__**SUGGESTION SENT!**__`}, description: `<@${message.author.id}> recently made a suggestion! Check it out!`})
        
        suggestChannel.send(`<@&709118762707845211> <@&710593727864897646>`,{embed : {color: config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`}});
    }          
}