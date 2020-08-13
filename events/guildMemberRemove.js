const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(`${config.verification.guildID}`);
	let memberCount = 0;
	guild.members.cache.forEach(member => {  //counts total human members at that point in time
		if(!member.user.bot) memberCount++;
		return memberCount;
	});
	const memberTag = member.user.id; 

	let auditLogs = member.guild.channels.cache.find(channel => channel.name === "audit-logs");

	let leaveEmbed = new MessageEmbed() // Creating instance of Discord.MessageEmbed()
		.setDescription(`<@${memberTag}> has left **${guild.name}** which now has ${memberCount} members!`) //Setting embed description
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setColor(config.school_color)
	
	auditLogs.send(leaveEmbed);
}