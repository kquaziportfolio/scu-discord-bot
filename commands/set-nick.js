const config = require('../config.json');

module.exports = { 
    name: 'set-nick',
    description: 'set nickname!',
    usage: `${config.prefix}set-nick [user mention] ~ [new nickname]`,
	async execute(message, args) {
        message.delete();

        let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");
        try {
            if (!args.length) return message.channel.send({embed: { description: `Enter a nickname!`, color: config.school_color}})
            const prompt = args.join(" ").trim().split(" ~ ");
            let member = message.mentions.members.first();

            if (!member) return message.channel.send({embed: { description: `Mention a user like this: <@${message.author.id}>`, color: config.school_color}});
            member = await member.setNickname(`${prompt[1]}`);

            const nicknameEmbed = { 
                title: `__**Nickname Changed!**__`,
                description: `${member.displayName} is <@${member.user.id}>'s new nickname!`, 
                color: config.school_color
            };

            message.channel.send({ embed: nicknameEmbed});
            auditLogs.send({ embed: nicknameEmbed});
        } catch (e) {
            auditLogs.send(`Error: ${e}`); // It's always useful to log your errors.
       }
    }
}