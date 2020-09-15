const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);

let sendMessage = require(`../google-form-functions/sendMessage.js`);

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(`${config.verification.guildID}`);
	
	let memberCount = guild.members.cache.filter(member => !member.user.bot).size;

	if(member.user.bot) return; //ignore members who are bot users
	
	let liveCount = guild.channels.cache.find(channel => channel.id === config.channels.liveCount);
	liveCount.setName(`👥 Members: ${memberCount}`);
	
	let leaveEmbed = new MessageEmbed() // Creating instance of Discord.MessageEmbed()
	.setDescription(`<@${member.user.id}> has left **${guild.name}** which now has ${memberCount} members!`) //Setting embed description
	.setTimestamp() // Sets a timestamp at the end of the embed
	.setColor(config.school_color)

	sendMessage(client, config.channels.auditLogs, leaveEmbed);
}