const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'server-stats',
    description: 'Get general server statistics!',
    usage: `${config.prefix}server-stats`,
		async execute(message, args) {
            message.delete();

            if ((!message.member.roles.cache.has(config.serverRoles.admin, config.serverRoles.mod))) { 
                const embed = new MessageEmbed()
                .setColor(config.school_color)
                .setTitle(`Oops, an error happened...`)
                .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
                .attachFiles([`./assets/no_perm.gif`])
                .setImage(`attachment://no_perm.gif`)
                .setTimestamp()
                message.channel.send(embed)
                .then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            
            message.delete();

            let auditLogs = message.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs);

            function checkBots(guild) {
                let botCount = 0;
                guild.members.cache.forEach(member => {
                    if(member.user.bot) botCount++;
                });
                return botCount;
            }

            function checkMembers(guild) {
                let memberCount = 0;
                guild.members.cache.forEach(member => {
                    if(!member.user.bot) memberCount++;
                });
                return memberCount;
            }

            let sicon = message.guild.iconURL();
            let serverembed = new MessageEmbed()
                .setDescription(`__**${message.guild.name} - Statistics**__`)
                .setColor(config.school_color)
                .addField('Server Owners', `<@709550577553768468>\n<@403377362730876928>`, true)
                .addField('Server Region', message.guild.region, true)
                .setThumbnail(sicon, true)
                .addField("Server Name", message.guild.name, true)
                .addField('Verification level', message.guild.verificationLevel, true)
                .addField('Channel Count', message.guild.channels.cache.size, true)
                .addField('Total Member Count', message.guild.memberCount, true)
                .addField('Humans', checkMembers(message.guild), true)
                .addField('Bots', checkBots(message.guild), true)
                .addField('Guild Created At:', message.guild.createdAt, true)
                .setTimestamp()

            auditLogs.send(serverembed);
        } 
}