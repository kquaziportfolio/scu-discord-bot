const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require(`../config.json`)

module.exports = {
	name: 'report',
    description: 'Report naughty users!',
    usage: `${config.prefix}report [user mention]`,
		async execute(message, args) { 
            message.delete();
            
            let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            let reason = args.slice(1).join(' ');
            let audit_logs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

            if (!target) return message.channel.send({embed: {description: 'Please specify a member to report!', color: config.school_color}});
            if (!reason) return message.channel.send({embed: {description: 'Please specify a reason for this report!', color: config.school_color}});
            if (!audit_logs) return message.reply({embed: {description: "Please create a channel called `audit-logs` to log the reports!", color: config.school_color}});

            let embed = new MessageEmbed()
                .setColor(config.school_color)
                .setThumbnail(target.user.avatarURL())
                .setTitle(`__**User Reported!**__`)
                .addField('Reported Member', `<@${target.user.id}>`)
                .addField('Reported By', `<@${message.author.id}>`)
                .addField('Reported Time', message.createdAt)
                .addField('Reported In', message.channel)
                .addField('Reported Reason', "```" + `${reason}` + "```")
                .setFooter('Reported User Information', target.user.displayAvatarURL());

            audit_logs.send(embed);
        }
}