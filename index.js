// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const CONFIG = require(`./config.json`); //retrieves data from config.json file 
const prefix = CONFIG.prefix;
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const got = require(`got`);
const emojiCharacters = require(`./emoji-characters`);

client.on(`ready`, () => {
	//specific guild
	const guild = client.guilds.cache.get(`709118412542050364`);
	const bot_activity = `Preaching to over ${guild.members.cache.size} members in the ${guild.name} server...`
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

client.on("guildMemberRemove", (member) => {
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
	const commands = require(`./commands/commands.js`); 
	const foo = require(`./commands/foo.js`);
	const joke = require(`./commands/joke.js`);
	const ping = require(`./commands/ping.js`);
	const random = require(`./commands/random.js`)

	if (!message.content.toLowerCase().startsWith(`${prefix}`) || message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;

	if ((message.content.toLowerCase() == `${prefix}cmds`) || (message.content.toLowerCase() == `${prefix}help`)) { // >commands 
		commands(message);
	} else if (message.content.toLowerCase() == (`${prefix}foo`)) { // >foo
		foo(message);
	} else if (message.content.toLowerCase() == (`${prefix}joke`)) {
		joke(message);
	} else if (message.content.toLowerCase() == (`${prefix}ping`)) { // >ping
		ping(message);
	} else if (message.content.toLowerCase() == (`${prefix}random`)) {
		random(message);
	} 

});

client.on(`message`, async (message) => {
	const about = require(`./commands/about.js`);
	const mission = require(`./commands/mission.js`);
	const values = require(`./commands/values.js`);
	const motto = require(`./commands/motto.js`);
	const vision = require(`./commands/vision.js`);

	if (!message.content.toLowerCase().startsWith(`${prefix}`) || message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;

	if (message.content.toLowerCase() == (`${prefix}about`)) {
		about(message);
	} else if (message.content.toLowerCase() == (`${prefix}motto`)) { // >motto
		motto(message);
	} else if (message.content.toLowerCase() == (`${prefix}mission`)) { // >mission
		mission(message);
	} else if (message.content.toLowerCase() == (`${prefix}vision`)) { // >vision
		vision(message);
	} else if (message.content.toLowerCase() == (`${prefix}values`)) { // >values
		values(message);
	} 
})

client.on(`message`, async (message) => {
	const stats = require(`./commands/stats.js`);
	const server_stats = require(`./commands/server-stats.js`);
	const user_stats = require(`./commands/user-stats.js`);

	if (!message.content.toLowerCase().startsWith(`${prefix}`) || message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;

	if (message.content.toLowerCase() == (`${prefix}stats`)) {
		stats(message);
	} else if (message.content.toLowerCase() == (`${prefix}server-stats`)) {  
		server_stats(message);
	} else if (message.content.toLowerCase() == (`${prefix}user-stats`)) { // >user-stats
		user_stats(message);
	}
});

client.on(`message`, async (message) => {
	const reddit = require(`./commands/reddit.js`);
	const quote = require(`./commands/quote.js`);
	const meme = require(`./commands/meme.js`);
	const template = require(`./commands/template.js`);
	const jojo = require(`./commands/jojo-reddit.js`);
	const scu = require(`./commands/scu-reddit.js`);

	if (!message.content.toLowerCase().startsWith(`${prefix}`) || message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;
	
	if (message.content.toLowerCase() == (`${prefix}reddit`)) {
		reddit(message);
	} else if (message.content.toLowerCase() == (`${prefix}quote`)) {
		quote(message);
	} else if (message.content.toLowerCase() == (`${prefix}meme`)) {
		meme(message);
	} else if (message.content.toLowerCase() == (`${prefix}template`)) {
		template(message);
	} else if (message.content.toLowerCase() == (`${prefix}jojo`)) {
		jojo(message);
	} else if (message.content.toLowerCase() == (`${prefix}scu`)) {
		scu(message);	
	}
});

client.on('message', async (message) => { // >prayer commands from the Great Fr. O'Brien
	const prayers = require(`./commands/prayers.js`);
	const our_father = require(`./commands/our-father.js`);
	const hail_mary = require(`./commands/hail-mary.js`);
	const glory_be = require(`./commands/glory-be.js`);
	const act_of_contrition = require(`./commands/act-of-contrition.js`);
	const apostles_creed = require(`./commands/apostles-creed.js`);
	const nicene_creed = require(`./commands/nicene-creed.js`);

	if (!message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;

	if ((message.content.toLowerCase() == (`${prefix}prayers`))) { // >commands 
		prayers(message)
	} else if (message.content.toLowerCase() == (`${prefix}our-father`)) { // >our-father
		our_father(message);
	} else if (message.content.toLowerCase() == (`${prefix}hail-mary`)) { // >hail-mary
		hail_mary(message);
	} else if (message.content.toLowerCase() == (`${prefix}glory-be`)) { // >glory-be
		glory_be(message)
	} else if (message.content.toLowerCase() == (`${prefix}act-of-contrition`)) { // >act-of-contrition
		act_of_contrition(message);
	} else if (message.content.toLowerCase() == (`${prefix}apostles-creed`)) { // >apostles-creed
		apostles_creed(message);
	} else if (message.content.toLowerCase() == (`${prefix}nicene-creed`)) { // >nicene-creed
		nicene_creed(message);
	}
});

client.on('message', async (message) => { // >kick command
	const admin = require(`./commands/admin.js`);
	const ban = require(`./commands/ban.js`);
	const kick = require(`./commands/kick.js`);
	const rules = require(`./commands/rules.js`);
	const server_info = require(`./commands/server-info.js`);
	
	if (!message.content.toLowerCase().startsWith(`${prefix}`) || message.content.toLowerCase() == (`${prefix}`) || message.author.bot) return;

	if (message.content.toLowerCase() == (`${prefix}admin`)) {
		admin(message);
	} else if(message.content.toLowerCase() == (`${prefix}ban`)) {
		ban(message);
	}  else if (message.content.toLowerCase() == (`${prefix}kick`)) {
		kick(message);
	} else if (message.content.toLowerCase() == (`${prefix}rules`)) {
		rules(message);
	} else if (message.content.toLowerCase() == (`${prefix}server-info`)) {
		server_info(message);
	} 
});

client.login(CONFIG.token) // Replace XXXXX with your bot token