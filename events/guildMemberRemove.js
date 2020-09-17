/*

  _____       _ _     _   __  __                _                 _____                                 ______               _   
 / ____|     (_) |   | | |  \/  |              | |               |  __ \                               |  ____|             | |  
| |  __ _   _ _| | __| | | \  / | ___ _ __ ___ | |__   ___ _ __  | |__) |___ _ __ ___   _____   _____  | |____   _____ _ __ | |_ 
| | |_ | | | | | |/ _` | | |\/| |/ _ \ '_ ` _ \| '_ \ / _ \ '__| |  _  // _ \ '_ ` _ \ / _ \ \ / / _ \ |  __\ \ / / _ \ '_ \| __|
| |__| | |_| | | | (_| | | |  | |  __/ | | | | | |_) |  __/ |    | | \ \  __/ | | | | | (_) \ V /  __/ | |___\ V /  __/ | | | |_ 
 \_____|\__,_|_|_|\__,_| |_|  |_|\___|_| |_| |_|_.__/ \___|_|    |_|  \_\___|_| |_| |_|\___/ \_/ \___| |______\_/ \___|_| |_|\__|
*/                                                                                                                                                                                                                                                                
																
const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);

let sendMessage = require(`../modules/sendMessage.js`);

module.exports = async (client, member) => {
	if(member.user.bot) return; //ignore members who are bot users
	
    const guild = client.guilds.cache.get(`${config.verification.guildID}`);
	
	let memberCount = guild.members.cache.filter(member => !member.user.bot).size;	
	let verifiedCount = guild.members.cache.filter(member => member.roles.cache.find(role => role.id === config.serverRoles.verifiedStudent)).size

	let studentCount = guild.channels.cache.find(channel => channel.id === config.channels.memberCount);
	studentCount.setName(`👥 ${memberCount} Members`);

	let liveCount = guild.channels.cache.find(channel => channel.id === config.channels.verifiedCount);
	liveCount.setName(`🐎 ${verifiedCount} Bucking Broncos`);
	
	let leaveEmbed = new MessageEmbed() // Creating instance of Discord.MessageEmbed()
	.setDescription(`<@${member.user.id}> has left **${guild.name}** which now has ${memberCount} members!`) //Setting embed description
	.setTimestamp() // Sets a timestamp at the end of the embed
	.setColor(config.school_color)

	sendMessage(client, config.channels.auditLogs, leaveEmbed);
}
