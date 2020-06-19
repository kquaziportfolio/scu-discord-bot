// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const {prefix, identification, token} = require(`./config.json`); //special config.json file
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require(`./emoji-characters`);
const OBS = require(`./commands/obs.json`); //no-no list
const OBS_list = OBS.obs; //no-no list
const fs = require(`fs`);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`)); //will retrieve all .js files in command directory
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on(`ready`, async () => { //will trigger when bot is up
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
});

client.on(`guildMemberAdd`, async (member) => { // will trigger when new member joins the server
	const guild = client.guilds.cache.get(`${identification}`);
	const role = member.guild.roles.cache.find(role => role.name === 'Unverified ❌'); //gives new user unverified role
	member.roles.add(role); //adds unverified role
	let memberCount = 0;
	guild.members.cache.forEach(member => {  //will only count human members not bots
		if(!member.user.bot) memberCount++; 
		return memberCount;
	});
	const memberTag = member.user.id; 
	const sicon = guild.iconURL();
		
	guild.systemChannel.send(new Discord.MessageEmbed() // triggers when new users joins to specific channel in server
		.setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has joined **${guild.name}** which currently has ${memberCount} ` + 
		`members! Be sure to follow instructions in the DM! Go Broncos!`) //Setting embed description
		.setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.attachFiles([`./assets/scu-background.png`])
		.setImage(`attachment://scu-background.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);

	const welcome_Embed = new Discord.MessageEmbed() //personal message to new user
		.setTitle(`Invent the life you want to lead at Santa Clara University.`)
		.setDescription(
		`${emojiCharacters.one}Fill out the Google Form [here](https://forms.gle/vqmrDx9LRVexdwLk6) to verify yourself in the SCU server! Note: If you're a guest or alumni, you are exempted from this requirement \n\n` +
		`${emojiCharacters.two} Read the <#709118412542050368> channel and introduce yourself in the <#709119648368427018> channel! \n\n` +
		`${emojiCharacters.three} Look at the <#722494512420618370> and enter **<i.am role>** in <#709173444096294993> for your roles! \n\n` +
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

client.on(`guildMemberRemove`, async (member) => { //triggers embed when user leaves the server
	const guild = client.guilds.cache.get(`${identification}`);
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
  });

client.on('message', async (message) => { //obscenities filter
	const memberTag = message.author.id;

	for (let i = 0; i < OBS_list.length; i++) {
		if (message.content.toLowerCase().includes(OBS_list[i]) || message.content.toLowerCase().startsWith(OBS_list[i])) {
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