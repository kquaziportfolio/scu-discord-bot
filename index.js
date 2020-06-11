// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const {prefix, token} = require(`./config.json`);
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require(`./emoji-characters`);
const fs = require(`fs`);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on(`ready`, () => {
	//specific guild
	const guild = client.guilds.cache.get(`709118412542050364`);
	const bot_activity = `Preaching to ${guild.members.cache.size} members in the ${guild.name} server...`
	client.user.setActivity(bot_activity)
		.then(console.log(bot_activity))
		.catch(err => console.log(err))
	// Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example: client.user.setActivity(`TV`, {type: `WATCHING`})
});

client.on(`guildMemberAdd`, (member) => { // Check out previous chapter for information about this event
	let guild = member.guild; 
	let memberTag = member.user.id; 
		
	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed to send public message on 'welcome' channel
		.setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has joined **${guild.name}** which has ${member.guild.memberCount} ` + 
		`members! Be sure to follow instructions in the DM! Go Broncos!`) //Setting embed description
		.setThumbnail(`https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setImage(`https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);

	const welcome_Embed = new Discord.MessageEmbed()
		.setTitle(`Invent the life you want to lead at Santa Clara University.`)
		.setDescription(
		`${emojiCharacters.one} Message in the <#710561799199785111> channel your proof of enrollment (e.g. acceptance letter, school email, and/or ECampus screenshot) at SCU! \n\n` +
		`${emojiCharacters.two} Read the <#709118412542050368> channel and introduce yourself in the <#709119648368427018> channel! \n\n` +
		`${emojiCharacters.three} Look at the <#710990323412631654> and enter **<i.am role>** in <#709173444096294993> for your roles! \n\n` +
		`Thank you for your cooperation and Go Broncos! :racehorse:`)
		.setThumbnail(`https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)

	member.send(welcome_Embed); //send private DM to new user
});

client.on(`guildMemberRemove`, (member) => {
	let guild = member.guild; 
	let memberTag = member.user.id; 

	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed
		.setTitle(`We're sorry to hear that you're leaving...`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has left **${guild.name}**! So sorry to hear that you're leaving! You'll be missed so much. Good luck for the future and try to stay in touch somehow!`) //Setting embed description
		.setThumbnail(`https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setImage(`https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)
	);

	const bye_Embed = new Discord.MessageEmbed()
		.setTitle(`We're sorry to hear that you're leaving...`) // Calling method setTitle on constructor. 
		.setDescription(`<@${memberTag}> has left **${guild.name}**! So sorry to hear that you're leaving! You'll be missed so much. In case you want to rejoin here is the link: https://discord.gg/YusWdfu`) //Setting embed description
		.setThumbnail(`https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png`) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setImage(`https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png`)
		.setColor(10231598)
		.setFooter(`Brought to you by the creators of this Discord server.`)

	member.send(bye_Embed);
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
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token) // Replace XXXXX with your bot token