// 1. Edit code and save (CTRL+S)!
// 2. Run "cmd" -> Type "cd Documents\SCU_BOT\ ->  Type "node ."
// 3. Bot is hosted on Discord for free!

const Discord = require('discord.js'); //requires Discord.js integration package
const { prefix, token } = require('./config.json'); //retrieves data from config.json file 
const client = new Discord.Client();

client.on('ready', () =>{
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("Santa Clara University", { type: "WATCHING"}).catch(console.error);
});
    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})

client.on('guildMemberAdd', (member) => {
	const channel = member.guild.channels.find(channel => channel.name === "user-landing");
	if(!channel) return;
	
	member.reply("Welcome to our server," + `$(member)` + ", please read the " + `#rules` + " channel!");
	//will output message: "Welcome to our server, $(member), please read the #rules channel!"
});

client.on("message", (message) => {	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}ping`)) { // >ping
		const ping_time = new Date().getTime() - message.createdTimestamp + " ms";
		message.reply("Your Pong! time was: " + ping_time);
	} else if (message.content.startsWith(`${prefix}foo`)) {
		message.reply("Bar!");
    }
	else if (message.content.startsWith(`${prefix}motto`)) { // >motto
		message.reply("Ad Majorem Dei Gloriam - For the Greater Glory of God");
	} else if (message.content.startsWith(`${prefix}mission`)) { // >mission
		message.reply("The University pursues its vision by creating an academic community that" + 
		" educates the whole person within the Jesuit, Catholic tradition, making student learning" +  
		" our central focus, continuously improving our curriculum and co-curriculum, strengthening" + 
		" our scholarship and creative work, and serving the communities of which we are a part in" +
		" Silicon Valley and world.");
	} else if (message.content.startsWith(`${prefix}vision`)) { // >vision
		message.reply("Santa Clara University will educate citizens and leaders of competence, conscience, " + 
		"and compassion and cultivate knowledge and faith to build a more humane, just, and sustainable world.");
	} else if (message.content.startsWith(`${prefix}values`)) { // >values
		message.reply("We serve academic excellence, engaged learning, commitment to students, service to others, " +
		"community and diversity, and Jesuit distinctiveness all year round!");
	} else if (message.content.startsWith(`${prefix}commands`) || (message.content.startsWith(`{prefix}help`))) { // >commands || >help
		message.reply("Here are the following commmands:" + " \n>ping " + "\n>foo" + "\n>motto" + "\n>mission" + 
		"\n>vision" + "\n>values" + "\n>social-media" + "\n>server" + "\n>user-info" + "\n>avatar");
	} else if (message.content.startsWith(`${prefix}social-media`)) { //will display social media sites in unordered list order
		message.reply("Here are SCU's media platforms:" + "\n- Official Website: https://www.scu.edu/" + "\n- FaceBook: https://www.facebook.com/SantaClaraUniversity/" + "\n- Twitter: https://twitter.com/SantaClaraUniv/" +
		"\n- Instagram: https://www.instagram.com/santaclarauniversity/" + "\n- Reddit: https://www.reddit.com/r/SCU/" + "\n- LinkedIn: https://www.linkedin.com/school/santa-clara-university/");
	} else if (message.content.startsWith(`${prefix}server`)) { //will display server name and amount of current members
		message.reply(`Here is the server information: \nServer Name: ${message.guild.name}\nServer Region: ${message.guild.region}\nUser Count: ${message.guild.memberCount}\nVerification Level: ${message.guild.verificationLevel}`);
	} else if (message.content.startsWith(`${prefix}user-info`)) { //will display the following user info: username and ID
		message.reply(`Here is your information: \nYour Username: ${message.author.username}\nYour Tag: ${message.author.tag}\nYour ID: ${message.author.id}\nBot? (true/false): ${message.author.bot}`);
	} else if (message.content.startsWith(`${prefix}kick`)) {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (message.content.startsWith(`${prefix}avatar`)) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	}
});

client.login(token); // Replace XXXXX with your bot token
//bot token is found here: https://discord.com/developers/applications/709168573003857940/bot