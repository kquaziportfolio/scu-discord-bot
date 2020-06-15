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

            let sicon = message.guild.iconURL();
            let owner = message.guild.owner;
            let serverembed = new Discord.MessageEmbed()
                .setDescription(`__**${message.guild.name} - Statistics**__`)
                .setColor(10231598)
                .addField('Server Owners', `${owner}\n<@403377362730876928>`, true)
                .addField('Server Region', message.guild.region, true)
                .setThumbnail(sicon, true)
                .addField("Server Name", message.guild.name, true)
                .addField('Verification level', message.guild.verificationLevel, true)
                .addField('Channel Count', message.guild.channels.cache.size, true)
                .addField('Total Member Count', message.guild.memberCount, true)
                .addField('Humans', checkMembers(message.guild), true)
                .addField('Bots', checkBots(message.guild), true)
                .addField('Online', checkOnlineUsers(message.guild), true)
                .addField('Guild Created At:', message.guild.createdAt, true)
                .setTimestamp()

            return message.channel.send(serverembed);
        }
}