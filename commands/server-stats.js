const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'server-stats',
    description: 'server-stats!',
		async execute(message, args) { 
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

            function checkOnlineUsers(guild) {
                let onlineCount = 0;
                guild.members.cache.forEach(member => {
                    if(member.user.presence.status === "online")
                        onlineCount++; 
                });
                return onlineCount;
            }

            let sicon = message.guild.iconURL;
            let serverembed = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Statistics`, message.guild.iconURL)
                .setColor("#15f153")
                .addField('Server owner', message.guild.owner, true)
                .addField('Server region', message.guild.region, true)
                .setThumbnail(sicon)
                .addField("Server Name", message.guild.name)
                .addField('Verification level', message.guild.verificationLevel, true)
                .addField('Channel count', message.guild.channels.cache.size, true)
                .addField('Total member count', message.guild.memberCount)
                .addField('Humans', checkMembers(message.guild), true)
                .addField('Bots', checkBots(message.guild), true)
                .addField('Online', checkOnlineUsers(message.guild))
                .addField('Guild created at:', message.guild.createdAt)
                .setTimestamp()

            return message.channel.send(serverembed);
        }
}