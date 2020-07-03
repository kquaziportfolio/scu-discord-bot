const Discord = require(`discord.js`); //requires Discord.js integration package
const config = require(`../config.json`);

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(`${config.identification}`);
	let memberCount = 0;
	guild.members.cache.forEach(member => {  //counts total human members at that point in time
		if(!member.user.bot) memberCount++;
		return memberCount;
	});
	const memberTag = member.user.id; 
	const sicon = guild.iconURL();

	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.MessageEmbed()
		.setTitle(`We're sorry to hear that you're leaving...`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has left **${guild.name}** which now has ${memberCount} members! So sorry to hear that you're leaving! You'll be missed so much. Good luck for the future and try to stay in touch somehow!`) //Setting embed description
		.setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.attachFiles([`./assets/scu-background.png`])
		.setImage(`attachment://scu-background.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);
}