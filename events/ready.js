const config = require(`../config.json`);
let sendMessage = require(`../modules/sendMessage.js`);
const fetch = require(`node-fetch`);
let status = require(`../modules/status.js`);

module.exports = async (client) => {

	require("../modules/serverVerification.js").run(client, config); //start server verification file in ready event
	require("../modules/classCoop.js").run(client, config); // start class co-op server 

	const guild = client.guilds.cache.get(config.verification.guildID);
	const verifyMSG = {
		title: "HURRAY!",
		description: "All commands and events work! ✅",
		color: "GREEN",
		timestamp: new Date()
	};
	console.log(verifyMSG.description);
	sendMessage(client, config.channels.auditlogs, { embed: verifyMSG});

	let inviteDisplay = guild.channels.cache.find(channel => channel.id === config.channels.invite);
	inviteDisplay.setName(`🔗 ${config.verification.inviteLink}`);	
	
	let memberCount = guild.members.cache.filter(member => !member.user.bot).size;	
	let verifiedCount = guild.members.cache.filter(member => member.roles.cache.find(role => role.id === config.serverRoles.verifiedStudent)).size

	let liveCount = guild.channels.cache.find(channel => channel.id === config.channels.memberCount);
	liveCount.setName(`👥 ${memberCount} Members`);

	let studentCount = guild.channels.cache.find(channel => channel.id === config.channels.verifiedCount);
	studentCount.setName(`🐎 ${verifiedCount} Bucking Broncos`);

	setInterval(function() {
		client.user.setPresence({activity: { name: status.getStatus() }, status: 'online'})
	}, 20000); //change status every 20 seconds to avoid API abuse :)
	
	/* DISCORD STATUS CHECKER */
	const url = "https://srhpyqt94yxb.statuspage.io/api/v2/status.json/";
	const response = await fetch(url);
	const body = await response.json();

	if (!response.ok) {
		throw Error("Error: DISCORD_STATUS_REQUEST. Please tell the bot author.");
	}

	if (body.status.description == "All Systems Operational") {
		sendMessage(client, config.channels.auditlogs, { embed: { title: `:white_check_mark: ${body.status.description}`, description: "Check the status [here](https://discordstatus.com/)! :white_check_mark:", color: "GREEN", timestamp: new Date()}});
	} else {
		sendMessage(client, config.channels.auditlogs, { embed: { title: `:x: ${body.status.description}`, description: "There seems to be an error with some of the Discord servers. Double check [here](https://status.discordapp.com/)! :x:", color: "RED", timestamp: new Date()}});
	}
}
