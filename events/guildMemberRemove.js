const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(`${config.verification.guildID}`);
	
	let memberCount = guild.members.cache.filter(member => !member.user.bot).size;
	
	let auditLogs = member.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs);

	let leaveEmbed = new MessageEmbed() // Creating instance of Discord.MessageEmbed()
		.setDescription(`<@${member.user.id}> has left **${guild.name}** which now has ${memberCount} members!`) //Setting embed description
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setColor(config.school_color)
	
	if(!member.user.bot) return;
	
	auditLogs.send(leaveEmbed);

	process.exit();
}