const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { identification } = require(`../config.json`);

module.exports = async (client) => {
	//specific guild
	const guild = client.guilds.cache.get(`${identification}`); //My secret server id
	let memberCount = 0;
	guild.members.cache.forEach(member => { //will only count human members not bots
		if(!member.user.bot) memberCount++;
		return memberCount;
	});
	const bot_activity = `Preaching to ${memberCount} members in the ${guild.name} server...`
	client.user.setActivity(bot_activity)
		.then(console.log(bot_activity))
		.catch(err => console.log(`Error: ${err}`))
	// Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example: client.user.setActivity(`TV`, {type: `WATCHING`})
}