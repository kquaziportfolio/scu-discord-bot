// 1. Edit code and save (CTRL+S)!
// 2. Run "cmd" -> Type "cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type "pm2 start index.js / "pm2 restart index.js"
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require("discord.js"); //requires Discord.js integration package
const client = new Discord.Client();
const { prefix, token } = require("./config.json"); //retrieves data from config.json file 
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require('./emoji-characters'); //for emojis

client.on("ready", () => {
	//specific guild
	const guild = client.guilds.cache.get("709118412542050364");
	const bot_activity = `Preaching to over ${guild.members.cache.size} members in the ${guild.name} server...`
	client.user.setActivity(bot_activity);
	console.log(bot_activity);
	// Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example: client.user.setActivity("TV", {type: "WATCHING"})
});

client.on("message", (message) => {	
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if ((message.content.startsWith(`${prefix}commands`)) || (message.content.startsWith(`${prefix}help`))) { // >commands 
		const embed = new MessageEmbed()
			.setTitle('Bot Commands List')
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			.setDescription(">ping " + "\n>foo" + "\n>motto" + "\n>mission" + "\n>vision" + 
			"\n>values" + "\n>social-media" + "\n>server" + "\n>user-info" + "\n>prayers");
			message.reply(embed);
	} 
});

client.on("message", (message) => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}ping`)) { // >ping
		const ping_time = new Date().getTime() - message.createdTimestamp + " ms!";
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("Ping")
			.setDescription(emojiCharacters.pong + "Pong! My ping time is  " + ping_time)
			.setImage("https://images-na.ssl-images-amazon.com/images/I/61c34u91qcL._AC_SX466_.jpg")
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}foo`)) { // >foo
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("Foo")
			.setDescription(emojiCharacters.bar + " Bar!")
			.setImage("https://4f39zz3w9kga2mxwan2t1zsc-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/D6h5AFjWAAAsDK2-1024x512.jpg")
			message.reply(embed)
    } else if (message.content.startsWith(`${prefix}motto`)) { // >motto
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("SCU Motto")
			.setDescription("Ad Majorem Dei Gloriam - For the Greater Glory of God")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}mission`)) { // >mission
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("SCU's Mission")
			.setDescription("The University pursues its vision by creating an academic community that educates the whole person within the Jesuit, Catholic tradition, " + 
			"making student learning our central focus, continuously improving our curriculum and co-curriculum, strengthening our scholarship and creative work, and serving the communities of which we are a part in Silicon Valley and world.")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			message.reply(embed)	
	} else if (message.content.startsWith(`${prefix}vision`)) { // >vision
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("SCU's Vision")
			.setDescription("Santa Clara University will educate citizens and leaders of competence, conscience, " + 
			"and compassion and cultivate knowledge and faith to build a more humane, just, and sustainable world.")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}values`)) { // >values
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("SCU's Values")
			.setDescription("We serve academic excellence, engaged learning, commitment to students, service to others, " +
			"community and diversity, and Jesuit distinctiveness all year round!")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}social-media`)) { // >social-media
		const embed = new MessageEmbed() 
			// Set the title of the field
			.setTitle("SCU's Social Media Platforms")
			// Set the author of the social media
			.setAuthor("Santa Clara University")
			// Set the color of the embed
			.setColor(10231598)
			// Set the main content of the embed
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			// Set the image url
			.setDescription("- Official Website: https://www.scu.edu/" + "\n- FaceBook: https://www.facebook.com/SantaClaraUniversity/" + "\n- Twitter: https://twitter.com/SantaClaraUniv/" +
			"\n- Instagram: https://www.instagram.com/santaclarauniversity/" + "\n- Reddit: https://www.reddit.com/r/SCU/" + "\n- LinkedIn: https://www.linkedin.com/school/santa-clara-university/");
			// Send the embed to the same channel as the message 
			message.reply(embed);
	} 
});

client.on("message", (message) => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}server`) || (message.content.startsWith(`${prefix}server-info`))) {  
		const embed = new MessageEmbed()
			.setTitle('Server Information')
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			.setDescription(`\nServer Name: ${message.guild.name}\nServer Region: ${message.guild.region}` +
			`\nUser Count: ${message.guild.memberCount}\nVerification Level: ${message.guild.verificationLevel}`);
			message.reply(embed);
	} else if (message.content.startsWith(`${prefix}user-info`)) { // >user-info
		let user = message.mentions.users.first() || message.author;
		const get_avatar = user.displayAvatarURL();
		const embed = new MessageEmbed()
			.setTitle('User Information')
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage(`${get_avatar}`)
			.setDescription(`\nCreated At: ${user.createdAt}\nYour Username: ${user.username}\nYour Tag: ${user.tag}` +
			`\nYour Presence: ${user.presence.status}\nBot? (true/false): ${user.bot}\nYour Avatar:`);
			message.reply(embed);
	}
});

client.on('message', (message) => { // >prayer commands from the Great Fr. O'Brien
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}prayers`)) { // >prayers
		const embed = new MessageEmbed()
			.setTitle("Prayer Commands")
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://www.scu.edu/media/offices/st-clare-garden/images/7409198466_9070d20dba_o-800x531.jpg")
			.setDescription(`>our-father + \n>hail-mary +\n>glory-be + \n>act-of-contrition + \n>apostles-creed + \n>nicene-creed`)
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}our-father`)) { // >our-father
		const embed = new MessageEmbed()
			.setTitle("Our Father")
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://www.acatholic.org/wp-content/uploads/god-500x389.jpg")
			.setDescription('Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily' +
			' bread; and forgive  us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.') 
			message.reply(embed)
	} else if (message.content.startsWith(`${prefix}hail-mary`)) { // >hail-mary
			const embed = new MessageEmbed()
			.setTitle("Hail Mary")
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWzwkOQah1oOzjuSIORXP4sQQ8RiFV6clVBmEGvWleLFTsbWrF&usqp=CAU")
			.setDescription('Hail Mary, full of grace. The Lord is with thee. Blessed art thou among women, and' +
							' blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God,' +
							' pray for us sinners, now and at the hour of our death. Amen.')
		message.reply(embed)
	} else if (message.content.startsWith(`${prefix}glory-be`)) { // >glory-be
		const embed = new MessageEmbed()
		.setTitle("Glory Be")
		.setAuthor("Santa Clara University")
		.setColor(10231598)
		.setImage("https://media.swncdn.com/cms/CCOM/68488-cross-sunset-light.1200w.tn.jpg")
		.setDescription('Glory be to the Father, and to the Son, and to the Holy Spirit, as it' +
						' was in the beginning, is now, and ever shall be, world without end. Amen.')
		message.reply(embed)
	} else if (message.content.startsWith(`${prefix}act-of-contrition`)) { // >act-of-contrition
		const embed = new MessageEmbed()
		.setTitle("Act of Contrition")
		.setAuthor("Santa Clara University")
		.setColor(10231598)
		.setImage("https://i.ytimg.com/vi/ynn_4COXciU/maxresdefault.jpg")
		.setDescription('O my God, I am heartily sorry for having offended You. I detest all my sins because of your just punishments, but most of all because they offend you, My ' +
						'God, who are all good and worthy of all my love. I firmly resolve, with the help of Your grace, to sin no more and to avoid the near occasions of sin. Amen.')
		message.reply(embed)
	} else if (message.content.startsWith(`${prefix}apostles-creed`)) { // >apostles-creed
		const embed = new MessageEmbed()
		.setTitle("Apostles' Creed")
		.setAuthor("Santa Clara University")
		.setColor(10231598)
		.setImage("https://www.drivethruhistory.com/wp-content/uploads/2016/07/Twelve-Apostles-of-Jesus.png")
		.setDescription('I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ,' +
						' His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary,' + 
						' suffered under Pontius Pilate, was crucified, died, and was buried. He descended into Hell;' +
						' On the third day He rose again from the dead; He ascended into Heaven, and sitteth at the' +
						' right hand of God, the Father almighty; from thence He shall come to judge the living and' +
						' the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints,' +
						' the forgiveness of sins, the resurrection of the body and life everlasting.')
		message.reply(embed)
	} else if (message.content.startsWith(`${prefix}nicene-creed`)) { // >nicene-creed
		const embed = new MessageEmbed()
		.setTitle("Nicene Creed")
		.setAuthor("Santa Clara University")
		.setColor(10231598)
		.setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZs7N11VSkjrLIOOrJgS6UYZKlajuc9YwS4z2jui3wD947iYDt&usqp=CAU")
		.setDescription('I believe in one God, the Father almighty, Maker of heaven and earth, and of all things visible and invisible' +
		' And in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages. God of God; Light of Light; true God of true God;' +
		' begotten not made; consubstantial with the Father, by whom all things were made. Who for us men, and for our salvation, came down from heaven, and' +
		' was incarnate by the Holy Ghost of the Virgin Mary: and was made man. He was crucified also for us, suffered under Pontius Pilate, and was buried.' +
		' The third day he rose again according to the Scriptures; and ascended into heaven, and sitteth at the right hand of the Father: and he shall come' +
		' again with glory to judge both the living and the dead: of whose kingdom there shall be no end. And I believe in the Holy Ghost, the Lord and life-giver,' + 
		' who proceedeth from the Father and the Son: who together with the Father and the Son is adored and glorified; who spake by the prophets. And one holy' +
		' Catholic and Apostolic Church. I confess one baptism for the remission of sins. And I look for the resurrection of the dead, and the life of the world to come. Amen')
		message.reply(embed)	
	}
});

client.on('message', (message) => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}quote`)) {

	const quotes = [ //lists of random quotes
		"The greatest glory in living lies not in never falling, but in rising every time we fall. \n-Nelson Mandela",
		"The way to get started is to quit talking and begin doing. \n-Walt Disney",
		"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. \n-Steve Jobs",
		"If life were predictable it would cease to be life, and be without flavor. \n-Eleanor Roosevelt",
		"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. \n-Oprah Winfrey",
		"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. \n-James Cameron",
		"Life is what happens when you're busy making other plans. \n-John Lennon" 
	];

	message.reply(quotes[Math.floor(Math.random()*quotes.length)]); //Replies to user with random quote
	}
});

client.on('message', message => { // >kick command
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	// Ignore messages that aren't from this guild
	if (!message.guild) return;

	if (message.content.startsWith(`${prefix}kick`)) {
		// Assuming we mention someone in the message, this will return the user
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
					.kick("Optional reason that will display in the audit logs...")
					.then(() => {
						// We let the message author know we were able to kick the person, outputted as embed
						const embed = new MessageEmbed()
						.setColor(10231598)
						.setAuthor("Santa Clara University")
						.setTitle("User Kicked...")
						.setDescription(`Successfully kicked ${user.username}...`)
						.setImage("https://media1.giphy.com/media/qiiimDJtLj4XK/giphy.gif")
						message.reply(embed)
					})
					.catch(err => {
						// An error happened
						// This is generally due to the bot not being able to kick the member,
						// either due to missing permissions or role hierarchy
						const embed = new MessageEmbed()
						.setColor(10231598)
						.setAuthor("Santa Clara University")
						.setTitle(`Oops, an error happened...`)
						.setImage("https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png")
						message.reply(embed)
						// Log the error
						console.log(err);
					})
			} else {
				//mentioned user not in guild
				const embed = new MessageEmbed()
						.setColor(10231598)
						.setAuthor("Santa Clara University")
						.setTitle("The mentioned user isn't in this guild!")
						.setImage("https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png")
						message.reply(embed)
			} 
		}
			else {
				//outputs when no user mentioned
				const embed = new MessageEmbed()
						.setColor(10231598)
						.setAuthor("Santa Clara University")
						.setTitle("You didn't mention the user to kick!")
						.setImage("https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png")
						message.reply(embed)
			}
	} else if (message.content.startsWith(`${prefix}ban`)) {
		let member = message.mentions.members.first();

		if(!member)
			return message.reply("Please mention a valid member in this server.");
		if(!member.bannable) 
			return message.reply("I cannot ban this user! Do they have a higher role?");

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided.";

		member.ban(reason) 
			.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of ${error}.`));
			const embed = new MessageEmbed()
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setTitle("User Banned...")
			.setImage("https://gulf-insider-i35ch33zpu3sxik.stackpathdns.com/wp-content/uploads/2017/07/banned.jpg")
			.setDescription(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}.`);
			message.reply(embed);
	}
});

client.login(token) // Replace XXXXX with your bot token