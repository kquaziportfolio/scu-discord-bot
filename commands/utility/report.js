const { MessageEmbed } = require(`discord.js`); //for embed functionality
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
	name: 'report',
    description: 'Report naughty users!',
    args: true,
    usage: `[@user mention] [reason]`, 
    category: 'Utility',
		async execute(client, message, args) { 
            message.delete();
            
            let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            let reason = args.slice(1).join(' ');

            let embed = new MessageEmbed()
                .setColor(client.config.school_color)
                .setThumbnail(target.user.avatarURL())
                .setTitle(`__**User Reported!**__`)
                .addField('Reported Member', `<@${target.user.id}>`)
                .addField('Reported By', `<@${message.author.id}>`)
                .addField('Reported Time', message.createdAt)
                .addField('Reported In', message.channel)
                .addField('Reported Reason', "```" + `${reason}` + "```")
                .setFooter('Reported User Information', target.user.displayAvatarURL());

            sendMessage(client, client.config.channels.auditlogs, embed);
        }
}