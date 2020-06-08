// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const { prefix, token } = require(`./config.json`); //retrieves data from config.json file 
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require('./emoji-characters'); //for emojis
const quotes = require(`inspirational-quotes`);
const memes = require(`random-puppy`);
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
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if ((message.content.startsWith(`${prefix}commands`)) || (message.content.startsWith(`${prefix}help`))) { // >commands 
		const cmds_embed = {
			"title": "Father O'Brien Commands List",
			"description": "Give us feedback on our bot!",
			"image": {
				"url": "https://www.scu.edu/media/offices/umc/Palm-Drive-01-1160x652.png",
			},
			"author": {
				name: `${message.author.username}`,
				icon_url: 'https://media.discordapp.net/attachments/709464766472781895/711781960460271616/Discord_3_1.png',
				url: 'https://jasonanhvu.github.io/',
			},
			"color": 10231598,
			"fields": [
			  {
				"name": `${emojiCharacters.pong} Ping`,
				"value": "`>ping`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.bar} Foo`,
				"value": "`>foo`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.speech} About`,
				"value": "`>about`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.info} Info`,
				"value": "`>info`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Prayers`,
				"value": "`>prayers`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.reddit} Reddit`,
				"value": "`>reddit`",
				"inline": true
			  },
			],
			"timestamp": new Date(),
			"footer": {
				text: "Brought to you by the creators of this Discord server.",
				url: 'https://jasonanhvu.github.io/scu-discord-bot/',
			},
		  }
		message.channel.send({embed: cmds_embed});
	} 
});

client.on(`message`, async message => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}ping`)) { // >ping
		const ping_time = new Date().getTime() - message.createdTimestamp + ` ms!`;
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`Ping`)
			.setDescription(emojiCharacters.pong + `Pong! My ping time is  ` + ping_time)
			.setImage(`https://images-na.ssl-images-amazon.com/images/I/61c34u91qcL._AC_SX466_.jpg`)
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}foo`)) { // >foo
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`Foo`)
			.setDescription(emojiCharacters.bar + ` Bar!`)
			.setImage(`https://4f39zz3w9kga2mxwan2t1zsc-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/D6h5AFjWAAAsDK2-1024x512.jpg`)
			message.channel.send(embed);
	}
});

client.on(`message`, async message => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}about`)) {
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`About Commands`)
			.setDescription("`mission`, `values`, `motto`, `vision`")
			.setFooter("Use `>` before each command!")
			message.channel.send(embed)
	}
	else if (message.content.startsWith(`${prefix}motto`)) { // >motto
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`SCU Motto`)
			.setDescription(`Ad Majorem Dei Gloriam - For the Greater Glory of God`)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}mission`)) { // >mission
		const embed = new MessageEmbed()
			.setColor(10231598)	
			.setDescription(`The University pursues its vision by creating an academic community that educates the whole person within the Jesuit, Catholic tradition, ` + 
			`making student learning our central focus, continuously improving our curriculum and co-curriculum, strengthening our scholarship and creative work, and serving the communities of which we are a part in Silicon Valley and world.`)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}vision`)) { // >vision
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`SCU's Vision`)
			.setDescription(`Santa Clara University will educate citizens and leaders of competence, conscience, ` + 
			`and compassion and cultivate knowledge and faith to build a more humane, just, and sustainable world.`)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}values`)) { // >values
		const embed = new MessageEmbed()
			.setColor(10231598)
			.setTitle(`SCU's Values`)
			.setDescription(`We serve academic excellence, engaged learning, commitment to students, service to others, ` +
			`community and diversity, and Jesuit distinctiveness all year round!`)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			message.channel.send(embed);
	} 
})

client.on(`message`, async message => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if (message.content.startsWith(`${prefix}info`)) {
		const embed = new MessageEmbed()
			.setTitle(`Info Commands`)
			.setColor(10231593)
			.setDescription("`server-info`, `user-info`")
			.setFooter("Use `>` before each command!")
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}server-info`)) {  
		const embed = new MessageEmbed()
			.setTitle('Server Information')
			.setColor(10231598)
			.setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
			.setDescription(`\nServer Name: ${message.guild.name}\nServer Region: ${message.guild.region}` +
			`\nUser Count: ${message.guild.memberCount}\nVerification Level: ${message.guild.verificationLevel}`);
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}user-info`)) { // >user-info
		let user = message.mentions.users.first() || message.author;
		const get_avatar = user.displayAvatarURL();
		const embed = new MessageEmbed()
			.setTitle('User Information')
			.setColor(10231598)
			.setImage(`${get_avatar}`)
			.setDescription(`\nCreated At: ${user.createdAt}\nYour Username: ${user.username}\nYour Tag: ${user.tag}` +
			`\nYour Presence: ${user.presence.status}\nBot? (true/false): ${user.bot}\nYour Avatar:`);
			message.channel.send(embed);
	}
});

client.on(`message`, async message => {
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
	
	if (message.content.startsWith(`${prefix}reddit`)) {
		const embed = new MessageEmbed()
		.setTitle(`Reddit Commands`)
		.setColor(10231593)
		.setDescription("`jojo`, `meme`, `scu`, `template`, `quote`")
		.setFooter("Use `>` before each command!")
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}quote`)) {
		const embed = new MessageEmbed()
		.setTitle(`Here's your quote!`)
		.setColor(10231598)	
		.setImage(`https://s3.envato.com/files/232193117/1026_Preview_Image_v002.png`)
		.setDescription(quotes.getRandomQuote())
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}meme`)) {
		let reddit = ["meme", "animemes", "me_irl", "2meirl4meirl", "dankmemes", "prequelmemes", "historymemes",
		"collegememes", "dankchristianmemes", "memes", "wholesomememes", "raimimemes", "comedyheaven"];

		let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

		message.channel.startTyping();

			setTimeout(() => {
			// Removes the user from the set after a minute
				memes(subreddit).then (async url => {
					await message.channel.send({
						files: [{
							attachment: url,
							name: 'meme.jpg'
						}]
					}).then(() => message.channel.stopTyping(true));
				}).catch(err => {
					const embed = new MessageEmbed()
					.setColor(10231598)
					.setTitle(`Oops, wait 5 seconds...`)
					.setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
					message.channel.send(embed);
					console.log(err);
				});
			}, 5000);
	} else if (message.content.startsWith(`${prefix}template`)) {
		let reddit = ["memetemplatesofficial", "templatememes"]
		let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

		message.channel.startTyping();
		setTimeout(() => {
			// Removes the user from the set after a minute
				memes(subreddit).then (async url => {
					await message.channel.send({
						files: [{
							attachment: url,
							name: 'meme-template.jpg'
						}]
					}).then(() => message.channel.stopTyping(true));
				}).catch(err => {
					const embed = new MessageEmbed()
					.setColor(10231598)
					.setTitle(`Oops, wait 5 seconds...`)
					.setImage(`https://pics.me.me/thumb_you-wanna-have-a-bad-time-memegenerator-net-you-wanna-have-a-53294110.png`)
					message.channel.send(embed);
					console.log(err);
				});
			}, 5000);
	} else if (message.content.startsWith(`${prefix}jojo`)) {
		got(`https://www.reddit.com/r/StardustCrusaders/random/.json`).then(response => {
			let content = JSON.parse(response.body);
			const jojo_title = content[0].data.children[0].data.title;
			const jojo_image = content[0].data.children[0].data.url;
			const jojo_selftext = content[0].data.children[0].data.selftext;
			const jojo_author = content[0].data.children[0].data.author;
			const jojo_url = content[0].data.children[0].data.permalink;
			const jojo_subreddit_name = content[0].data.children[0].data.subreddit_name_prefixed;
			const jojo_ups = content[0].data.children[0].data.ups;
			const jojo_num_comments = content[0].data.children[0].data.num_comments;
			const jojo_embed = new MessageEmbed()
				.setTitle(`${jojo_title}`)
				.setURL(`${jojo_url}`)
				.setAuthor(`${jojo_subreddit_name}`)
				.setImage(`${jojo_image}`)
				.setColor(10231598)	
				.setDescription(`${jojo_selftext}`)
				.setFooter(`${emojiCharacters.up} ${jojo_ups} | ${emojiCharacters.comment} ${jojo_num_comments}`)
			message.channel.send(jojo_embed)
				.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
				}).catch(console.error);	
	} else if (message.content.startsWith(`${prefix}scu`)) {
		got(`https://www.reddit.com/r/SCU/random/.json`).then(response => {
			let content = JSON.parse(response.body);
			const scu_title = content[0].data.children[0].data.title;
			const scu_selftext = content[0].data.children[0].data.selftext;
			const scu_url = content[0].data.children[0].data.url;
			const scu_subreddit_name = content[0].data.children[0].data.subreddit_name_prefixed;
			const scu_ups = content[0].data.children[0].data.ups;
			const scu_num_comments = content[0].data.children[0].data.num_comments;
			const scu_embed = new MessageEmbed()
				.setTitle(`${scu_title}`)
				.setURL(`${scu_url}`)
				.setAuthor(`${scu_subreddit_name}`)
				.setColor(10231598)	
				.setDescription(`${scu_selftext}`)
				.setFooter(`${emojiCharacters.up} ${scu_ups} | ${emojiCharacters.comment} ${scu_num_comments}`)
			message.channel.send(scu_embed)
			.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
			}).catch(console.error);	
	}
});

client.on('message', async message => { // >prayer commands from the Great Fr. O'Brien
	if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

	if ((message.content.startsWith(`${prefix}prayers`))) { // >commands 
		const prayer_embed = {
			"title": "Prayer Commands List",
			"color": 10231598,
			"footer": {
				"text": "For all your Catholic needs!"
			},
			"fields": [
			  {
				"name": `${emojiCharacters.prayer} Our Father`,
				"value": "`>our-father`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Hail Mary`,
				"value": "`>hail-mary`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Glory Be`,
				"value": "`>glory-be`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Act of Contrition`,
				"value": "`>act-of-contrition`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Apostles' Creed`,
				"value": "`>apostles-creed`",
				"inline": true
			  },
			  {
				"name": `${emojiCharacters.prayer} Nicene Creed`,
				"value": "`>nicene-creed`",
				"inline": true
			  },
			]
		  }
		message.channel.send({embed: prayer_embed});
	} else if (message.content.startsWith(`${prefix}our-father`)) { // >our-father
		const embed = new MessageEmbed()
			.setTitle(`Our Father`)
			.setColor(10231598)
			.setImage(`https://www.acatholic.org/wp-content/uploads/god-500x389.jpg`)
			.setDescription('Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily' +
			' bread; and forgive  us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.') 
			message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}hail-mary`)) { // >hail-mary
		const embed = new MessageEmbed()
		.setTitle(`Hail Mary`)
		.setColor(10231598)
		.setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWzwkOQah1oOzjuSIORXP4sQQ8RiFV6clVBmEGvWleLFTsbWrF&usqp=CAU`)
		.setDescription('Hail Mary, full of grace. The Lord is with thee. Blessed art thou among women, and' +
						' blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God,' +
						' pray for us sinners, now and at the hour of our death. Amen.')
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}glory-be`)) { // >glory-be
		const embed = new MessageEmbed()
		.setTitle(`Glory Be`)
		.setColor(10231598)
		.setImage(`https://media.swncdn.com/cms/CCOM/68488-cross-sunset-light.1200w.tn.jpg`)
		.setDescription('Glory be to the Father, and to the Son, and to the Holy Spirit, as it' +
						' was in the beginning, is now, and ever shall be, world without end. Amen.')
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}act-of-contrition`)) { // >act-of-contrition
		const embed = new MessageEmbed()
		.setTitle(`Act of Contrition`)
		.setColor(10231598)
		.setImage(`https://i.ytimg.com/vi/ynn_4COXciU/maxresdefault.jpg`)
		.setDescription('O my God, I am heartily sorry for having offended You. I detest all my sins because of your just punishments, but most of all because they offend you, My ' +
						'God, who are all good and worthy of all my love. I firmly resolve, with the help of Your grace, to sin no more and to avoid the near occasions of sin. Amen.')
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}apostles-creed`)) { // >apostles-creed
		const embed = new MessageEmbed()
		.setTitle(`Apostles' Creed`)
		.setColor(10231598)
		.setImage(`https://www.drivethruhistory.com/wp-content/uploads/2016/07/Twelve-Apostles-of-Jesus.png`)
		.setDescription('I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ,' +
						' His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary,' + 
						' suffered under Pontius Pilate, was crucified, died, and was buried. He descended into Hell;' +
						' On the third day He rose again from the dead; He ascended into Heaven, and sitteth at the' +
						' right hand of God, the Father almighty; from thence He shall come to judge the living and' +
						' the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints,' +
						' the forgiveness of sins, the resurrection of the body and life everlasting.')
		message.channel.send(embed);
	} else if (message.content.startsWith(`${prefix}nicene-creed`)) { // >nicene-creed
		const embed = new MessageEmbed()
		.setTitle(`Nicene Creed`)
		.setColor(10231598)
		.setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZs7N11VSkjrLIOOrJgS6UYZKlajuc9YwS4z2jui3wD947iYDt&usqp=CAU`)
		.setDescription('I believe in one God, the Father almighty, Maker of heaven and earth, and of all things visible and invisible' +
		' And in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages. God of God; Light of Light; true God of true God;' +
		' begotten not made; consubstantial with the Father, by whom all things were made. Who for us men, and for our salvation, came down from heaven, and' +
		' was incarnate by the Holy Ghost of the Virgin Mary: and was made man. He was crucified also for us, suffered under Pontius Pilate, and was buried.' +
		' The third day he rose again according to the Scriptures; and ascended into heaven, and sitteth at the right hand of the Father: and he shall come' +
		' again with glory to judge both the living and the dead: of whose kingdom there shall be no end. And I believe in the Holy Ghost, the Lord and life-giver,' + 
		' who proceedeth from the Father and the Son: who together with the Father and the Son is adored and glorified; who spake by the prophets. And one holy' +
		' Catholic and Apostolic Church. I confess one baptism for the remission of sins. And I look for the resurrection of the dead, and the life of the world to come. Amen')
		message.channel.send(embed);
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