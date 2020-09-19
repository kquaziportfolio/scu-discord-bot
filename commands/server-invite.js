const config = require('../config.json');

module.exports = {
    name: 'server-invite', //forked from Raptor SA
    description: `Generate temporary server invite for the channel you're in!`,  
    usage: `${config.prefix}server-invite`,
    guildOnly: false,
		async execute (message, args) {
            message.delete();

            const ChannelID = message.content.split(' ');

            let auditLogs = message.guild.channels.find(channel => channel.id === config.channels.auditlogs);

            try {
                message.guild.channels.cache.get(ChannelID[1]).createInvite().then(invite =>
                    message.channel.send({ embed: { title: "__**SCU Discord Network Invite Created!**__", description: `Join the [Santa Clara University Discord Network](https://invite.gg/gobroncos) for fun, games, academic discussion and much more! Remember to embody Jesuit values of our school and have a great time! Go Broncos!`, color: config.school_color}})
                );

                auditLogs.send({ embed: { description: `<@${message.author.id}> created an invite in ${ChannelID[1]}`}})
            }
        
            catch(error){
                auditLogs.send({ embed: { description: `I could not create the invite for the channel: ${error}`}});
                message.channel.send({ embed: { description: `You have to paste a correct channel ID!`}});
            }
    }
}