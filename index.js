// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const config = require(`./config.json`);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

const roles = require(`./events/roles.json`); 
const situation = roles.situation;
const programs = roles.programs;
const hobbies = roles.hobbies;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName} ✅`);
    client.commands.set(commandName, props);
  });
});

client.on(`messageReactionAdd`, async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
	// You should account for any errors while fetching, it could return API errors if the resource is missing.
	if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return; // If the user was a bot, return.
	if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
	if (reaction.message.guild.id !== `${config.verification.guildID}`) return; // Use this if your bot was only for one server/private server.

  if (reaction.message.channel.id === config.roleChannelID) {
		if (reaction.emoji.name === "🚙") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(situation[0].Commuter); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Commuter` role was added!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏡") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(situation[1].Residential); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Residential` role was added!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🚪") {
      await reaction.message.guild.members.cache.get(user.id).roles.add(situation[2].Domestic); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Domestic` role was added!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "✈️") {
      await reaction.message.guild.members.cache.get(user.id).roles.add(situation[3].International); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`International` role was added!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
	  } else {
	  	return;
    }
  }
});

client.on(`messageReactionRemove`, async (reaction, user) => {
  // We're gonna make a trigger, if the user removes the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== `${config.verification.guildID}`) return;

  if (reaction.message.channel.id === config.roleChannelID) {
    if (reaction.emoji.name === "🚙") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[0].Commuter); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Commuter` role was removed!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: config.school_color}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[1].Residential); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Residential` role was removed!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: config.school_color}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🚪") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[2].Domestic); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Domestic` role was removed!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: config.school_color}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "✈️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[3].International); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`International` role was removed!", timestamp: new Date(), footer: { text: 'Go Sharks!'}, color: config.school_color}}).catch(() => console.log("Failed to send DM."));
    } else {
      return;
    }
  }
});

client.login(config.token) // Replace XXXXX with your bot token
