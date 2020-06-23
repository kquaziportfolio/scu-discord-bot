// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const {prefix, identification, token} = require(`./config.json`)
const { Client, MessageEmbed, MessageAttachment } = require('discord.js'); //for embed functionality
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
let db = JSON.parse(fs.readFileSync(`./events/level.json`, `utf8`))

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`------------------------------------------`)
    console.log(`| Loading event: | ${eventName} | ✅  |`);
    console.log(`------------------------------------------`);
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`------------------------------------------`)
    console.log(`| Loading command: | ${commandName} | ✅  |`);
    console.log(`------------------------------------------`);
    client.commands.set(commandName, props);
  });
});

client.on("message", async (message) => {
	const guild = client.guilds.cache.get(`${identification}`);
	const sicon = guild.iconURL();
	if (message.author.bot) return; // ignore bots
    // if the user is not on db add the user and change his values to 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
	};
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.channel.send({embed: {description: `Congratulations, <@${message.author.id}>, you leveled up!`, color: 10231598}})
    }
    if(message.content.toLowerCase() === `${prefix}level`) {
		let memberTag = message.author;
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.MessageEmbed()
		.setColor(10231598)
		.setAuthor(`${guild.name}`, `${sicon}`)
		.setTitle(`__**Your Current Level!**__`)
        .addField("**Level**", userInfo.level, true)
		.addField("**XP**", userInfo.xp+"/100", true)
		.setThumbnail(`${memberTag.avatarURL({ format: "jpg"})}`)
		.setFooter(`Your stats provided by the server lords!`)
		.setTimestamp()

		if(!member) return message.channel.send(embed)
		.catch(err => `Error: ${err}`)

        let memberInfo = db[member.id];
        let embed2 = new Discord.MessageEmbed()
		.setColor(10231598)
		.setAuthor(`${guild.name}`, `${sicon}`)
		.setTitle(`__**Your Current Level!**__`)
        .addField("**Level**", memberInfo.level)
		.addField("**XP**", memberInfo.xp+"/100")
		.setThumbnail(`${memberTag.avatarURL({ format: "jpg" })}`)
		.setFooter(`<Your stats provided by the server lords!`)
		.setTimestamp()
		message.channel.send(embed2)
		.catch(err => `Error: ${err}`)
    }
    fs.writeFile("./commands/level.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
	});
});

client.login(token) // Replace XXXXX with your bot token