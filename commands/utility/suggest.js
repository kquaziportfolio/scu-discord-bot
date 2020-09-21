const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require(`../../config.json`);

module.exports = { 
    name: 'suggest',
    description: 'Public suggestions to ping server admins!',
    args: true,
    usage: `[insert title] | [insert description]`, 
    category: 'Utility',
    async execute(message, args) {
        message.delete();
        
        let sendMessage = require(`../modules/sendMessage.js`);

        const prompt = args.join(' ').split(' | ');
        if(!prompt[1]) return message.channel.send(announceInstructions);

        let suggestChannel = message.guild.channels.cache.find(channel => channel.id === config.channels.suggestions);
        sendMessage(client, config.channels.auditlogs, {embed: { title: `__**SUGGESTION SENT!**__`}, description: `<@${message.author.id}> recently made a suggestion! Check it out!`})
        
        sendMessage(client, config.channels.auditlogs, `<@&709118762707845211> <@&710593727864897646>`,{ embed : { color: config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`}});
    }          
}