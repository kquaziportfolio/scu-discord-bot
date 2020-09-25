module.exports = { 
    name: 'suggest',
    description: 'Public suggestions to ping server admins!',
    args: true,
    usage: `[insert title] | [insert description]`, 
    category: 'Utility',
    async execute(client, message, args) {
        message.delete();
        
        let sendMessage = require(`../modules/sendMessage.js`);

        const prompt = args.join(' ').split(' | ');
        if(!prompt[1]) return message.channel.send(announceInstructions);

        let suggestChannel = message.guild.channels.cache.find(channel => channel.id === client.config.channels.suggestions);
        sendMessage(client, client.config.channels.auditlogs, {embed: { title: `__**SUGGESTION SENT!**__`}, description: `<@${message.author.id}> recently made a suggestion! Check it out!`})
        
        sendMessage(client, client.config.channels.auditlogs, `<@&${client.config.serverRoles.admin}> <@&${client.config.serverRoles.mod}>`,{ embed : { color: client.config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`}});
    }          
}