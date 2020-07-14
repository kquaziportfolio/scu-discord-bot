const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed, Collection } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const config = require(`../config.json`)

module.exports = {
	name: 'report',
    description: 'report users!',
		async execute(message, args) { 
            let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            let reason = args.slice(1).join(' ');
            let audit_logs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

            if (!target) return message.channel.send({embed: {description: 'Please specify a member to report!', color: 10231598}});
            if (!reason) return message.channel.send({embed: {description: 'Please specify a reason for this report!', color: 10231598}});
            if (!audit_logs) return message.reply({embed: {description: "Please create a channel called `audit-logs` to log the reports!", color: 10231598}});

            let embed = new Discord.MessageEmbed()
                .setColor(10231598)
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