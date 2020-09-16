const config = require(`../config.json`);
let sendMessage = require(`../google-form-functions/sendMessage.js`);
const fetch = require(`node-fetch`);

module.exports = async (client) => {

	require("../google-form-functions/serverVerification.js").run(client, config); //start server verification file in ready event
	require("../google-form-functions/classCoop.js").run(client, config); // start class co-op server 

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

	let statuses = [
		`Hanging out with ${memberCount} members in the ${guild.name} server!`, 
		`Reflecting in silence with ${verifiedCount} students in the ${guild.name} server!`,
		`Welcome to Santa Clara University in heart of the Silicon Valley — the world’s most innovative and entrepreneurial region!`,
		`A Catholic and Jesuit university is a place of encounter: where the university encounters the world.`,
		`I'm the mascot of Santa Clara University!`,
		`It is a great privilege to share in the dream of Santa Clara University.`,
		`I am deeply humbled to be asked to take the helm of Santa Clara University and to build upon what others have accomplished over the last decade.`,
		`Invent the life you want to lead at Santa Clara University.`,
		`📸 Follow our Instagram: @scudiscordnetwork`,
		`🔥 Go forth and set the world on fire!`,
		`94% First-year retention rate | 11:1 Student-to-faculty ratio | 85% Four-year graduation rate | 300+ days of sunshine`,
		`At Santa Clara University, we are committed to creating a community of generous encounter, a place where all feel respected, welcomed, and safe.`,
		`The path to transformation begins in the human heart.`,
		`I urge you to listen and learn, and then add your voice.`,
		`Violence in any form has no place in the beloved community we want to build. Nor does silence in the face of injustice.`,
		`Education brings light. Faith brings light. Community brings light. These are our strengths as a Jesuit university.`,
		`Through the efforts of Santa Clara students, staff, faculty, and alumni over the years, we have become a better university. But there is more work to do.`,
		`Let us pray for strength and wisdom for our journey ahead.`,
		`People of all backgrounds flourish here. One thing they have in common? They want to make a difference. Santa Clara students are driven to build a better, kinder, more humane, more sustainable planet. `
	];
	setInterval(function() {
		let status = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.setPresence({activity: { name: status }, status: 'online'})
	}, 5000);
	
	/* DISCORD STATUS CHECKER */
	const url = "https://srhpyqt94yxb.statuspage.io/api/v2/status.json/";

	const response = await fetch(url);

	const body = await response.json();

	if (!response.ok) {
		throw Error("Error: DISCORD_STATUS_REQUEST. Please tell the bot author.");
	}

	if (body.status.description == "All Systems Operational") {
		sendMessage(client, config.channels.auditlogs, { embed: { title: ":white_check_mark: ALL DISCORD SYSTEMS UP!", description: "Check the status [here](https://discordstatus.com/)! :white_check_mark:", color: "GREEN"}});
	} else {
		sendMessage(client, config.channels.auditlogs, { embed: { title: ":x: DISCORD SYSTEMS DOWN!", description: "There seems to be an error with some of the Discord servers. Double check [here](https://status.discordapp.com/)! :x:", color: "RED"}});
	}
}
