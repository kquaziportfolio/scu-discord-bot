let sendMessage = require(`../modules/sendMessage.js`);
const fetch = require(`node-fetch`);

module.exports = async (client) => {
	try {
		require("../modules/serverVerification.js").run(client); //start server verification file in ready event

		const guild = client.guilds.cache.get(client.config.verification.guildID);
		const verifyMSG = {
			title: "HURRAY!",
			description: "All commands and events work! ✅",
			color: "GREEN",
			timestamp: new Date()
		};
		console.log(verifyMSG.description);
		sendMessage(client, client.config.channels.auditlogs, { embed: verifyMSG});

		let memberCount = guild.members.cache.filter(member => !member.user.bot).size;	
		let liveCount = guild.channels.cache.find(channel => channel.id === client.config.channels.memberCount);
		liveCount.setName(`👥 ${memberCount} Members`);

		client.user.setPresence({activity: { name: `${client.config.prefix}help || DM the bot for mod support! 📩` }, status: 'online'});

		/* DISCORD STATUS CHECKER */
		const url = client.config.verification.status;
		const response = await fetch(url);
		const body = await response.json();

		if (!response.ok) {
			throw Error("Error: DISCORD_STATUS_REQUEST. Please tell the bot author.");
		}

		if (body.status.description == "All Systems Operational") {
			sendMessage(client, client.config.channels.auditlogs, { embed: { title: `${body.status.description}`, description: "Check the status [here](https://discordstatus.com/)! :white_check_mark:", color: "GREEN", timestamp: new Date()}});
		} else {
			sendMessage(client, client.config.channels.auditlogs, { embed: { title: `:x: ${body.status.description}`, description: "There seems to be an error with some of the Discord servers. Double check [here](https://status.discordapp.com/)! :x:", color: "RED", timestamp: new Date()}});
                }
	} catch (err) {
		console.log(err);
	}
}
