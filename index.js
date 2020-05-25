// 1. Edit code and save (CTRL+S)!
// 2. Run "cmd" -> Type "cd Documents\SCU_BOT\ ->  Type "node ."
// 3. Bot is hosted on Discord for free!

const Discord = require("discord.js"); //requires Discord.js integration package
const client = new Discord.Client();
const { prefix, token } = require("./config.json"); //retrieves data from config.json file 
const { Client, MessageEmbed } = require('discord.js'); //for embed functionality
const emojiCharacters = require('./emoji-characters'); //for emojis

<<<<<<< HEAD
client.on("ready", () => {x
=======
client.on("ready", () => {
>>>>>>> fd3677c... UPDATED CODE
	//specific guild
	const guild = client.guilds.cache.get("709118412542050364");
	client.user.setActivity(`over ${guild.members.cache.size} members in the ${guild.name} server...`, { type: "LISTENING"})
		.then(e => console.log(`${client.user.tag} is listening to over ${guild.members.cache.size} members in the ${guild.name} server...`));
	// Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
<<<<<<< HEAD
=======
    // For example:
	// client.user.setActivity("TV", {type: "WATCHING"})
>>>>>>> fd3677c... UPDATED CODE
    // For example: client.user.setActivity("TV", {type: "WATCHING"})
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
	} else if (message.content.startsWith(`${prefix}commands`)) { // >commands 
		const embed = new MessageEmbed()
			.setTitle('Bot Commands List')
			.setColor(10231598)
			.setAuthor("Santa Clara University")
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			.setDescription("Here are the following commmands:" + " \n>ping " + "\n>foo" + "\n>motto" + "\n>mission" + 
			"\n>vision" + "\n>values" + "\n>social-media" + "\n>server" + "\n>user-info" + "\n>avatar")
			message.reply(embed);
	} else if (message.content.startsWith(`${prefix}social-media`)) { // >social-media
		const embed = new MessageEmbed() 
			// Set the title of the field
			.setTitle("SCU's Social Media")
			// Set the author of the social media
			.setAuthor("Santa Clara University")
			// Set the color of the embed
			.setColor(10231598)
			// Set the main content of the embed
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			// Set the image url
			.setDescription("Here are SCU's media platforms:" + "\n- Official Website: https://www.scu.edu/" + "\n- FaceBook: https://www.facebook.com/SantaClaraUniversity/" + "\n- Twitter: https://twitter.com/SantaClaraUniv/" +
			"\n- Instagram: https://www.instagram.com/santaclarauniversity/" + "\n- Reddit: https://www.reddit.com/r/SCU/" + "\n- LinkedIn: https://www.linkedin.com/school/santa-clara-university/");
			// Send the embed to the same channel as the message 
			message.reply(embed);
	} else if (message.content.startsWith(`${prefix}server`) || (message.content.startsWith(`${prefix}server-info`))) {  
		const embed = new MessageEmbed()
			.setTitle('Server Information')
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			.setDescription(`Here is the server information: \nServer Name: ${message.guild.name}\nServer Region: ${message.guild.region}
			\nUser Count: ${message.guild.memberCount}\nVerification Level: ${message.guild.verificationLevel}`);
			message.reply(embed);
	} else if (message.content.startsWith(`${prefix}user-info`)) { // >user-info
		const embed = new MessageEmbed()
			.setTitle('User Information')
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
			.setDescription(`Here is your information: \nYour Username: ${message.author.username}\nYour Tag: ${message.author.tag}\nYour ID: ${message.author.id}\nBot? (true/false): ${message.author.bot}`);
			message.reply(embed);
	} else if (message.content.startsWith(`${prefix}avatar`)) { // >avatar
		if (!message.mentions.users.size) {
			const embed = new MessageEmbed()
				.setTitle('Avatar Image')
				.setAuthor("Santa Clara University")
				.setColor(10231598)
				.setImage("https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png")
				.setDescription(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
				message.reply(embed);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}"s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	} 
});

client.on('message', (message) => { // >prayer commands from the Great Fr. O'Brien
	if (message.content.startsWith(`${prefix}prayers`)) { // >prayers
		const embed = new MessageEmbed()
			.setTitle("Prayer Commands")
			.setAuthor("Santa Clara University")
			.setColor(10231598)
			.setImage("https://www.scu.edu/media/offices/st-clare-garden/images/7409198466_9070d20dba_o-800x531.jpg")
			.setDescription(`Here are the following commmands: \n>our-father + \n>hail-mary
			\n>glory-be + \n>act-of-contrition + \n>apostles-creed + \n>nicene-creed`)
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

client.login(token) // Replace XXXXX with your bot token
