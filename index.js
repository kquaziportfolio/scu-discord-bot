// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const {prefix, token} = require(`./config.json`);
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require(`./emoji-characters`);
const OBS = require(`./commands/obs.json`);
const OBS_list = OBS.obs;
const fs = require(`fs`);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on(`ready`, async () => {
	//specific guild
	const guild = client.guilds.cache.get(`709118412542050364`);
	let memberCount = 0;
	guild.members.cache.forEach(member => {
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
});

client.on(`disconnected`, async () => {
	const guild = client.guilds.cache.get(`709118412542050364`);
	let memberCount = 0;
	guild.members.cache.forEach(member => {
		if(!member.user.bot) memberCount++;
		return memberCount;
	});
	const bot_activity = `Reflecting in silence with ${memberCount} members in the ${guild.name} server...`
	client.user.setActivity(bot_activity)
		.then(console.log(bot_activity))
		.catch(err => console.log(`Error: ${err}`))
});

client.on(`guildMemberAdd`, async (member) => { // Check out previous chapter for information about this event
	const guild = member.guild; 
	const memberTag = member.user.id; 
	const sicon = guild.iconURL();
		
	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed to send public message on 'welcome' channel
		.setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has joined **${guild.name}** which currently  ${member.guild.memberCount} ` + 
		`members! Be sure to follow instructions in the DM! Go Broncos!`) //Setting embed description
		.setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.attachFiles([`./assets/scu-background.png`])
		.setImage(`attachment://scu-background.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);

	const welcome_Embed = new Discord.MessageEmbed()
		.setTitle(`Invent the life you want to lead at Santa Clara University.`)
		.setDescription(
		`${emojiCharacters.one}Fill out the Google Form [here](https://forms.gle/vqmrDx9LRVexdwLk6) to verify yourself in the SCU server! Note: If you're a guest or alumni, you are exempted from this requirement \n\n` +
		`${emojiCharacters.two} Read the <#709118412542050368> channel and introduce yourself in the <#709119648368427018> channel! \n\n` +
		`${emojiCharacters.three} Look at the <#710990323412631654> and enter **<i.am role>** in <#709173444096294993> for your roles! \n\n` +
		`Thank you for your cooperation and Go Broncos! :racehorse:`)
		.setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setTimestamp() // Sets a timestamp at the end of the embed
		.attachFiles([`./assets/scu-background.png`])
		.setImage(`attachment://scu-background.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)

	member.send(welcome_Embed); //send private DM to new user
});

client.on(`guildMemberRemove`, async (member) => {
	const guild = member.guild; 
	const memberTag = member.user.id; 
	const sicon = guild.iconURL();

	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed
		.setTitle(`We're sorry to hear that you're leaving...`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has left **${guild.name}**! So sorry to hear that you're leaving! You'll be missed so much. Good luck for the future and try to stay in touch somehow!`) //Setting embed description
		.setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.attachFiles([`./assets/scu-background.png`])
		.setImage(`attachment://scu-background.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);
  });

client.on('message', async (message) => {
	const memberTag = message.author.id;

	for (let i = 0; i < OBS_list.length; i++) {
		if (message.content.toLowerCase().includes(OBS_list[i])) {
			message.channel.send({embed: {
				description: `<@${memberTag}> used a controversial word. If you think this is unfair, please contact <@401542675423035392> right away.`,
				color: 10231598
			}}) .catch(err => console.log(`Error: ${err}`))

		return message.delete()
			.catch(err => console.log(`Error: ${err}`))
		}
	}
});

client.on(`message`, async (message) => {	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		await message.channel.send({embed: {
			description: "There was an error trying to execute that command!", 
			color: 10231598
			}
		}).then(msg => { msg.delete({ timeout: 2000 })
		}).catch(err => console.log(`Error: ${err}`));
	}
});

client.login(token) // Replace XXXXX with your bot token