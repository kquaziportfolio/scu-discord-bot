let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
    name: 'server-invite', //forked from Raptor SA
    description: `Generate temporary server invite for the channel you're in!`,
    category: 'Utility',
		async execute (client, message, args) {

            const ChannelID = message.content.split(' ');

            try {
                message.guild.channels.cache.get(ChannelID[1]).createInvite().then(invite =>
                    message.channel.send({ embed: { title: "__**SCU Discord Network Invite Created!**__", description: `Join the [Santa Clara University Discord Network](${client.config.serverRoles.inviteLink}) for fun, games, academic discussion and much more! Remember to embody Jesuit values of our school and have a great time! Go Broncos!`, color: config.school_color}})
                );
            }
        
            catch(error){
                sendMessage(client, client.config.channels.auditlogs, `<@${message.author.id}`, { embed: { description: `I could not create the invite for the channel: ${error}`}});
                message.channel.send({ embed: { description: `You have to paste a correct channel ID!`}});
            }
    }
}