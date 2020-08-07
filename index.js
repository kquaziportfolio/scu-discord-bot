// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed, MessageAttachment } = require("discord.js"); //for embed functionality
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const config = require(`./config.json`);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

const roles = require(`./events/roles-list.json`);
const years = roles.years;
const situation = roles.situation;

const emojiCharacters = require(`./emoji-characters`);

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.id == config.messageID) roleAssigner.grantRole(reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
  if (reaction.message.id == config.messageID) roleAssigner.removeRole(reaction, user);
});

const ReactionRole = require("reaction-role");
const reactionRole = new ReactionRole(`${config.token}`);
let option1 = reactionRole.createOption("callofduty:729181764949639178", "729182361387794452");
let option2 = reactionRole.createOption("csgo:728724579727573033", "728726891355176970");
let option3 = reactionRole.createOption("dota:728725741344391169", "728726771247087674");
let option4 = reactionRole.createOption("dbd:728725743017656360", "728726771247087674");
let option5 = reactionRole.createOption("fortnite:728724908225331250", "728726981235179550");
let option6 = reactionRole.createOption("gta:728725741520552046", "728726721364361296");
let option7 = reactionRole.createOption("io:728844181090598993", "728726721364361296");
let option8 = reactionRole.createOption("jackbox:728844182407610468", "728726721364361296");
let option9 = reactionRole.createOption("League:726658053818023937", "726657281986527303");
let option10 = reactionRole.createOption("minecraft:728724580251729930", "728727522631483402");
let option11 = reactionRole.createOption("Overwatch:726658055831552049", "726657109361688607");
let option12 = reactionRole.createOption("rss:728724775068893225", "728726931817889802");
let option13 = reactionRole.createOption("roblox:729181764630740992", "729182464953548820");
let option14 = reactionRole.createOption("rocketleague:728726211882385409", "728726681241780274");
let option15 = reactionRole.createOption("smash:728842766657912882", "728726681241780274");
let option16 = reactionRole.createOption("supercell:729181764446060555", "729182534872858708");
let option17 = reactionRole.createOption("tf2:729181764211310664", "729182586899005472");
let option18 = reactionRole.createOption("Valorant:726658055684620349", "726657024703725578");
reactionRole.createMessage("729183638486515712", "725015718449643611", true, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18);
reactionRole.init();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
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
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.once("ready", () => {
  require("./verificationServer.js").run(client, config);
  console.log("Started Verification System");
});

client.on(`messageReactionAdd`, async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== `${config.identification}`) return; // Use this if your bot was only for one server/private server.

  if (reaction.message.channel.id === "722494512420618370") {
    // This is a #role-menu channel.

    if (reaction.emoji.name === "🚙") {
      await reaction.message.guild.members.cache.get(user.id).roles.add(situation[0].Commuter);
      return user.send({ embed: { description: `<@${user.id}>, ` + "`Commuter` role was added!", timestamp: new Date(), footer: { text: "Go Broncos!" }, color: 10231598 } }).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏡") {
      await reaction.message.guild.members.cache.get(user.id).roles.add(situation[1].Residential);
      return user.send({ embed: { description: `<@${user.id}>, ` + "`Residential` role was added!", timestamp: new Date(), footer: { text: "Go Broncos!" }, color: 10231598 } }).catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
});

client.on(`messageReactionRemove`, async (reaction, user) => {
  // We're gonna make a trigger, if the user removes the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== `${config.identification}`) return;

    if (reaction.emoji.name === "🚙") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[0].Commuter);
      return user.send({ embed: { description: `<@${user.id}>, ` + "`Commuter` role was removed!", timestamp: new Date(), footer: { text: "Go Broncos!" }, color: 10231598 } }).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[1].Residential);
      return user.send({ embed: { description: `<@${user.id}>, ` + "`Residential` role was removed!", timestamp: new Date(), footer: { text: "Go Broncos!" }, color: 10231598 } }).catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
});

client.login(config.token); // Replace XXXXX with your bot token
