const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('../config.json');

module.exports = {
    name: 'server-invite', //forked from Raptor SA
    description: `Generate temporary server invite for the channel you're in!`,  
    usage: `${prefix}server-invite`,
		async execute (message, args) {
            const ChannelID = message.content.split(' ');

            try {
                message.guild.channels.cache.get(ChannelID[1]).createInvite().then(invite =>
                    message.channel.send({ embed: { title: "__**Channel Invite Created!**__", description: `[SCU 🐎💨 | #BroncoUp](${invite.url})`, color: 10231598}})
                );
            }
        
            catch(error){
                console.error(`I could not create the invite for the channel: ${error}`);
                message.channel.send(`You have to paste a correct channel ID!`);
            }
    }
}