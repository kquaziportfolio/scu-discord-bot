// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const { prefix, token } = require(`./config.json`); //retrieves data from config.json file 
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require('./emoji-characters'); //for emojis
const quotes = require(`inspirational-quotes`); //for quotes
const memes = require(`random-puppy`); //for memes
const got = require(`got`);

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

client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
	let guild = member.guild; 
	let memberTag = member.user.username; 
	guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed
		.setTitle("Invent the life you want to lead at Santa Clara University.") // Calling method setTitle on constructor. 
		.setDescription(`${memberTag} has joined ${guild} which has ${member.guild.memberCount}! Be sure to follow instructions in the Bucky Bronco DM! Go Broncos!`) //Setting embed description
		.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
		.setTimestamp() // Sets a timestamp at the end of the embed
		.setImage("https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png")
		.setColor(10231598)
		.setFooter("Brought to you by the creators of this Discord server.")
	);
});

client.on(`message`, async message => {	
	const commands = require(`./commands/commands.js`); 
	const ping = require(`./commands/ping.js`);
	const foo = require(`./commands/foo.js`);

	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if ((message.content.startsWith(`${prefix}commands`)) || (message.content.startsWith(`${prefix}help`))) { // >commands 
		commands(message);
	} else if (message.content.startsWith(`${prefix}ping`)) { // >ping
		ping(message);
	} else if (message.content.startsWith(`${prefix}foo`)) { // >foo
		foo(message);
	}
});

client.on(`message`, async message => {
	const about = require(`./commands/about.js`);
	const mission = require(`./commands/mission.js`);
	const values = require(`./commands/values.js`);
	const motto = require(`./commands/motto.js`);
	const vision = require(`./commands/vision.js`);

	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}about`)) {
		about(message);
	} else if (message.content.startsWith(`${prefix}motto`)) { // >motto
		motto(message);
	} else if (message.content.startsWith(`${prefix}mission`)) { // >mission
		mission(message);
	} else if (message.content.startsWith(`${prefix}vision`)) { // >vision
		vision(message);
	} else if (message.content.startsWith(`${prefix}values`)) { // >values
		values(message);
	} 
})

client.on(`message`, async message => {
	const info = require(`./commands/info.js`);
	const server_info = require(`./commands/server-info.js`);
	const user_info = require(`./commands/user-info.js`);

	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}info`)) {
		info(message);
	} else if (message.content.startsWith(`${prefix}server-info`)) {  
		server_info(message);
	} else if (message.content.startsWith(`${prefix}user-info`)) { // >user-info
		user_info(message);
	}
});

client.on(`message`, async message => {
	const reddit = require(`./commands/reddit.js`);
	const quote = require(`./commands/quote.js`);
	const meme = require(`./commands/meme.js`);
	const template = require(`./commands/template.js`);
	const jojo = require(`./commands/jojo.js`);
	const scu = require(`./commands/scu.js`);

	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
	
	if (message.content.startsWith(`${prefix}reddit`)) {
		reddit(message);
	} else if (message.content.startsWith(`${prefix}quote`)) {
		quote(message);
	} else if (message.content.startsWith(`${prefix}meme`)) {
		meme(message);
	} else if (message.content.startsWith(`${prefix}template`)) {
		template(message);
	} else if (message.content.startsWith(`${prefix}jojo`)) {
		jojo(message);
	} else if (message.content.startsWith(`${prefix}scu`)) {
		scu(message);	
	}
});

client.on('message', async message => { // >prayer commands from the Great Fr. O'Brien
	const prayers = require(`./commands/prayers.js`);
	const our_father = require(`./commands/our-father.js`);
	const hail_mary = require(`./commands/hail-mary.js`);
	const glory_be = require(`./commands/glory-be.js`);
	const act_of_contrition = require(`./commands/act-of-contrition.js`);
	const apostles_creed = require(`./commands/apostles-creed.js`);
	const nicene_creed = require(`./commands/nicene-creed.js`);

	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if ((message.content.startsWith(`${prefix}prayers`))) { // >commands 
		prayers(message)
	} else if (message.content.startsWith(`${prefix}our-father`)) { // >our-father
		our_father(message);
	} else if (message.content.startsWith(`${prefix}hail-mary`)) { // >hail-mary
		hail_mary(message);
	} else if (message.content.startsWith(`${prefix}glory-be`)) { // >glory-be
		glory_be(message)
	} else if (message.content.startsWith(`${prefix}act-of-contrition`)) { // >act-of-contrition
		act_of_contrition(message);
	} else if (message.content.startsWith(`${prefix}apostles-creed`)) { // >apostles-creed
		apostles_creed(message);
	} else if (message.content.startsWith(`${prefix}nicene-creed`)) { // >nicene-creed
		nicene_creed(message);
	}
});

client.on('message', async message => { // >kick command
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	// Ignore messages that aren't from this guild
	if (!message.guild) return;

	if (message.content.startsWith(`${prefix}kick`)) {
		// Assuming we mention someone in the message, this will return the user
		if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR", "MODERATOR"])) {
			const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`Oops, an error happened...`)
			.setDescription(`You don't have permission to perform this command!`)
			.setImage(`https://media1.tenor.com/images/9277c9be9e3d7a953bb19bfacf8c1abf/tenor.gif?itemid=12620128`)
			message.channel.send(embed);
		}
		const user = message.mentions.users.first();

		if (user) {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member 
					.kick(`Optional reason that will display in the audit logs...`)
					.then(() => {
						// We let the message author know we were able to kick the person, outputted as embed
						const embed = new MessageEmbed()
						.setColor(10231598)
						.setTitle(`User Kicked...`)
						.setDescription(`Successfully kicked ${user.username}...`)
						.setImage(`https://media1.giphy.com/media/qiiimDJtLj4XK/giphy.gif`)
						message.channel.send(embed);
					})
					.catch(err => {
						// An error happened
						// This is generally due to the bot not being able to kick the member,
						// either due to missing permissions or role hierarchy
						const embed = new MessageEmbed()
						.setColor(10231598)
						.setTitle(`Oops, an error happened...`)
						.setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
						message.channel.send(embed);
						// Log the error
						console.log(err);
					})
			} else {
				//mentioned user not in guild
				const embed = new MessageEmbed()
						.setColor(10231598)
						.setTitle(`The mentioned user isn't in this guild!`)
						.setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
						message.channel.send(embed);
			} 
		}
			else {
				//outputs when no user mentioned
				const embed = new MessageEmbed()
						.setColor(10231598)
						.setTitle(`You didn't mention the user to kick!`)
						.setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
						message.channel.send(embed);
			}
	} else if (message.content.startsWith(`${prefix}ban`)) {
		if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MODERATOR"])) {
			const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`Oops, an error happened...`)
			.setDescription(`You dont have permission to perform this command!`)
			.setImage(`https://media1.tenor.com/images/9277c9be9e3d7a953bb19bfacf8c1abf/tenor.gif?itemid=12620128`)
			message.channel.send(embed);
		}

		let member = message.mentions.members.first();

		if(!member)
			return message.channel.send(`The member isn't in this server!`)
		if(!member.bannable) 
			return message.channel.send(`I cannot ban this user! Do they have a higher role?`);

		let reason = args.slice(1).join(' ');
		if(!reason) reason = `No reason provided.`;

		member.ban(reason) 
			.catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of ${error}.`));
			const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`User Banned...`)
			.setImage(`https://gulf-insider-i35ch33zpu3sxik.stackpathdns.com/wp-content/uploads/2017/07/banned.jpg`)
			.setDescription(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}.`);
			message.channel.send(embed);
	} 
});

client.login(token) // Replace XXXXX with your bot token