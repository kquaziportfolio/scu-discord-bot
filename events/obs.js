const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const OBS = require(`./obs.json`); //no-no list
const OBS_list = OBS.obs; //no-no list

module.exports = (client, message) => { //obscenities filter
	const guild = client.guilds.cache.get(`${identification}`);
	const sicon = guild.iconURL();
	const memberTag = message.author.id;

	for (let i = 0; i < OBS_list.length; i++) {
		if (message.content.toLowerCase().includes(OBS_list[i]) || message.content.toLowerCase().startsWith(OBS_list[i])) {
			message.channel.send({embed: {
				author: {
					name: `**Blacklisted Word Detected**`, 
					icon_url: `${sicon}`,
				},		
				description: `If you think this is an infringement on your speech, please contact <@&709118762707845211>/<@&710593727864897646> right away.` +
				` Otherwise, rephrase your speech so the bot doesn't think you're using the word!`,
				color: 10231598,
				thumbnail: {
					"url": "attachment://ohno.jpg",
				},
				fields: [
					{
						name: `User`,
						value: `<@${memberTag}>`,
						inline: true
					},
					{
						name: `Blacklisted Word (Please view at your discretion)`,
						value: "||" + OBS_list[i] + "||",
						inline: true
					},
				],
				files: [{
					attachment:'./assets/ohno.jpg',
					name:'ohno.jpg'
				}],
				timestamp: new Date()
			}}) .catch(err => console.log(`Error: ${err}`))
		
			return message.delete().catch(err => console.log(`Error: ${err}`))
		}
	}
}