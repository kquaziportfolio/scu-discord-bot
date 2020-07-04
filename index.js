// 1. Edit code and save (CTRL+S)!
// 2. Run `cmd` -> Type `cd Documents/GitHub_Repos/scu-discord-bot/ ->  Type `pm2 start index.js / `pm2 restart index.js`
// 3. Bot is hosted 24/7 on Raspberry Pi 4 for free!

const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed, MessageAttachment } = require('discord.js'); //for embed functionality
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require(`./config.json`);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

const roles = require(`./events/roles-list.json`); 
const soe_majors = roles.soe_majors; 
const lsb_majors = roles.lsb_majors;
const cas_majors = roles.cas_majors;
const years = roles.years; 
const situation = roles.situation;

const OBS = require(`./events/obs.json`);
const OBS_list = OBS.obs;

const emojiCharacters = require(`./emoji-characters`);

const ReactionRole = require("reaction-role");
const reactionRole = new ReactionRole(`${config.token}`);
let option1 = reactionRole.createOption("csgo:728724579727573033", "728726891355176970");
let option2 = reactionRole.createOption("dota:728725741344391169", "728726771247087674");
let option3 = reactionRole.createOption("dbd:728725743017656360", "728726771247087674");
let option4 = reactionRole.createOption("fortnite:728724908225331250", "728726981235179550");
let option5 = reactionRole.createOption("gta:728725741520552046", "728726721364361296");
let option6 = reactionRole.createOption("io:728844181090598993", "728726721364361296");
let option7 = reactionRole.createOption("jackbox:728844182407610468", "728726721364361296");
let option8 = reactionRole.createOption("League:726658053818023937", "726657281986527303");
let option9 = reactionRole.createOption("minecraft:728724580251729930", "728727522631483402");
let option10 = reactionRole.createOption("Overwatch:726658055831552049", "726657109361688607");
let option11 = reactionRole.createOption("rss:728724775068893225", "728726931817889802");
let option12 = reactionRole.createOption("rocketleague:728726211882385409", "728726681241780274");
let option13 = reactionRole.createOption(":smash:728842766657912882", "728726681241780274")
let option14 = reactionRole.createOption("Valorant:726658055684620349", "726657024703725578");
reactionRole.createMessage("728845041090428948", "725015718449643611", true, option1, option2, option3, 
option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14);
reactionRole.init();

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
    console.log(`Attempting to load command ${commandName}`);
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
	if (reaction.message.guild.id !== `${config.identification}`) return; // Use this if your bot was only for one server/private server.
	
	if (reaction.message.channel.id === "722494512420618370") { // This is a #role-menu channel.
		if (reaction.emoji.name === "☣️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[0].Bioengineering) 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Bioengineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💻") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[1].Computer_Science_and_Engineering_SOE); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Computer Science and Engineering (SOE)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏗️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[2].Civil_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Civil Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🔌") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[3].Electrical_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Electric Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "👨‍💻") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[4].Electrical_and_Computer_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Electrical and Computer Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🛠️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[5].General_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`General Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "⚙️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[6].Mechanical_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Mechanical Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🕸️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[7].Web_Design_and_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Web Design and Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🤷") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(soe_majors[8].Undeclared_Engineering); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Engineering` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🤑") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[0].Accounting); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Accounting` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "ℹ️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[1].Accounting_and_Information_Systems); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Accounting and Information Systems` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💱") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[2].Economics_LSB); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Economics (LSB)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💹") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[3].Finance); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Finance` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🧗") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[4].Individual_Studies_LSB); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Individual Studies (LSB)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💼") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[5].Management); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Management` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🎰") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[6].Management_and_Entrepreneurship); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Management and Entrepreneurship` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💰") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[7].Management_Information_Systems); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Management Information Systems` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💸") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[8].Marketing); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Marketing` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "❓") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(lsb_majors[9].Undeclared_Business); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Business` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💀") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[0].Anthropology); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Anthropology` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🎨") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[1].Art_History); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Art History` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🔬") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[2].Biochemistry); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Biochemistry` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🦠") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[3].Biology); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Biology` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🧫") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[4].Chemistry); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Chemistry` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🚼") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[5].Child_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared -Business` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "📚") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[6].Classical_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Classical Studies` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🗣️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[7].Communication); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Communication` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🖥️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[8].Computer_Science_CAS); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Computer Science (CAS)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💵") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[9].Economics_CAS); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Economics (CAS)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🍎") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[10].Engineering_Physics); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Engineering Physics` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏴󠁧󠁢󠁥󠁮󠁧󠁿") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[11].English); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`English` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🌲") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[12].Environmental_Science); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Environmental Science` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🍃") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[13].Environmental_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Environmental Studies` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "❤️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[14].Ethnic_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Ethnic Studies` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇬:regional_indicator_r:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[15].Greek_Language_and_Literature); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Greek Language and Literature` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🗽") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[16].History); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`History` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "😞") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[17].Individual_Studies_CAS); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Individual Studies (CAS)` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🔡") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[18].Latin_and_Greek); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Latin and Greek` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "✝️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[19].Latin_Language_and_Literature); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Latin Language and Literature` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🔢") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[20].Mathematics); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Mathematics` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🎖️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[21].Military_Science); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Military Science` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇸:regional_indicator_a:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[22].MLAL_Arabic); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Arabic` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇨:regional_indicator_n:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[23].MLAL_Chinese); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Chinese` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇫:regional_indicator_r:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[24].MLAL_French); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - French` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇩:regional_indicator_e:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[25].MLAL_German); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - German` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇮:regional_indicator_t:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[26].MLAL_Italian); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Italian` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏯") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[27].MLAL_Japanese); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Japanese` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🇪:regional_indicator_g:") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[28].MLAL_Spanish); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Spanish` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🎵") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[29].Music); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Music` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🧠") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[30].Neuroscience); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Neuroscience` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🤔") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[31].Philosophy); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Philosophy` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏋️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[32].Physics); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Physics` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏛️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[33].Political_Science); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Political Science` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "📡") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[34].Psychology); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Psychology` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🙏") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[35].Religious_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Religious Studies` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "😋") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[36].Sociology); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Sociology` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🎭") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[37].Studio_Art); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Studio Art` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🕺") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[38].Theatre_and_Dance); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Theatre and Dance` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "👩") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[39].Womens_and_Gender_Studies); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Women's and Gender Studies` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🤷‍♂️") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(cas_majors[40].Undeclared_Arts_and_Sciences); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Arts and Sciences` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} 

		if (reaction.emoji.name === "🎓") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[0].Alumni); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Alumni` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🤓") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[1].Grad_Student); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Grad Student` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "0️⃣") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[2].twenty); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`2020` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "1️⃣") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[3].twenty_one); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`2021` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "2️⃣") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[4].twenty_two); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`2022` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "3️⃣") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[5].twenty_three); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`2023` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "4️⃣") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(years[6].twenty_four); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`2024` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} 

		if (reaction.emoji.name === "🚙") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(situation[0].Commuter); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Commuter` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🏡") {
			await reaction.message.guild.members.cache.get(user.id).roles.add(situation[1].Residential); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Residential` role was added!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
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

  if (reaction.message.channel.id === "722494512420618370") {
    if (reaction.emoji.name === "☣️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[0].Bioengineering) 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Bioengineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💻") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[1].Computer_Science_and_Engineering_SOE); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Computer Science and Engineering (SOE)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏗️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[2].Civil_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Civil Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🔌") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[3].Electrical_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Electric Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "👨‍💻") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[4].Electrical_and_Computer_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Electrical and Computer Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🛠️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[5].General_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`General Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "⚙️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[6].Mechanical_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Mechanical Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🕸️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[7].Web_Design_and_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Web Design and Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🤷") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(soe_majors[8].Undeclared_Engineering); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Engineering` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🤑") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[0].Accounting); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Accounting` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "ℹ️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[1].Accounting_and_Information_Systems); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Accounting and Information Systems` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💱") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[2].Economics_LSB); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Economics (LSB)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💹") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[3].Finance); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Finance` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🧗") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[4].Individual_Studies_LSB); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Individual Studies (LSB)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💼") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[5].Management); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Management` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🎰") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[6].Management_and_Entrepreneurship); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Management and Entrepreneurship` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💰") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[7].Management_Information_Systems); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Management Information Systems` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💸") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[8].Marketing); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Marketing` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "❓") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[9].Undeclared_Business); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Business` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💀") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[0].Anthropology); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Anthropology` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🎨") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[1].Art_History); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Art History` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🔬") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[2].Biochemistry); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Biochemistry` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🦠") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[3].Biology); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Biology` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🧫") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[4].Chemistry); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Chemistry` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🚼") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[5].Child_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared -Business` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "📚") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[6].Classical_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Classical Studies` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🗣️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[7].Communication); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Communication` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🖥️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[8].Computer_Science_CAS); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Computer Science (CAS)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "💵") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[9].Economics_CAS); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Economics (CAS)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🍎") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[10].Engineering_Physics); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Engineering Physics` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏴󠁧󠁢󠁥󠁮󠁧󠁿") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[11].English); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`English` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🌲") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[12].Environmental_Science); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Environmental Science` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🍃") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[13].Environmental_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Environmental Studies` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "❤️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[14].Ethnic_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Ethnic Studies` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇬:regional_indicator_r:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[15].Greek_Language_and_Literature); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Greek Language and Literature` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🗽") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[16].History); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`History` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "😞") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[17].Individual_Studies_CAS); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Individual Studies (CAS)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🔡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[18].Latin_and_Greek); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Latin and Greek` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "✝️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[19].Latin_Language_and_Literature); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Latin Language and Literature` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🔢") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[20].Mathematics); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Mathematics` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🎖️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[21].Military_Science); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Military Science` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇸:regional_indicator_a:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[22].MLAL_Arabic); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Arabic` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇨:regional_indicator_n:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[23].MLAL_Chinese); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Chinese` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇫:regional_indicator_r:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[24].MLAL_French); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - French` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇩:regional_indicator_e:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[25].MLAL_German); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - German` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇮:regional_indicator_t:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[26].MLAL_Italian); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Italian` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏯") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[27].MLAL_Japanese); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Japanese` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🇪:regional_indicator_g:") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[28].MLAL_Spanish); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`MLAL - Spanish` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🎵") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[29].Music); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Music` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🧠") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[30].Neuroscience); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Neuroscience` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🤔") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[31].Philosophy); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Philosophy` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏋️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[32].Physics); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Physics` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏛️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[33].Political_Science); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Political Science` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "📡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[34].Psychology); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Psychology` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🙏") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[35].Religious_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Religious Studies` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "😋") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[36].Sociology); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Sociology` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🎭") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[37].Studio_Art); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Studio Art` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🕺") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[38].Theatre_and_Dance); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Theatre and Dance` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "👩") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[39].Womens_and_Gender_Studies); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Women's and Gender Studies` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🤷‍♂️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cas_majors[40].Undeclared_Arts_and_Sciences); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Undeclared - Arts and Sciences` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } 

    if (reaction.emoji.name === "🎓") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[0].Alumni); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Alumni` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🤓") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[1].Grad_Student); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Grad Student` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "0️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[2].twenty); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`2020` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[3].twenty_one); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`2021` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[4].twenty_two); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`2022` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "3️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[5].twenty_three); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`2023` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "4️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(years[6].twenty_four); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`2024` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } 

    if (reaction.emoji.name === "🚙") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[0].Commuter); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Commuter` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } else if (reaction.emoji.name === "🏡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(situation[1].Residential); 
      return user.send({embed: { description: `<@${user.id}>, ` + "`Residential` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
    } 
  } else {
      return;
  }
});

client.on(`message`, async (message) => {    
    const guild = client.guilds.cache.get(`${config.identification}`);
    const sicon = guild.iconURL();
    const memberTag = message.author.id;

    for (let i = 0; i < OBS_list.length; i++) {
      if (message.content.toLowerCase().includes(OBS_list[i]) || message.content.toLowerCase().startsWith(OBS_list[i])) {
        message.channel.send({embed: {
          author: {
            name: `**Blacklisted Word Detected**`, 
            icon_url: `${sicon}`,
          },		
          description: `If you think this is an infringement on your speech, please contact <@&709118762707845211>/<@&710593727864897646> right away.` +
          ` Otherwise, rephrase your speech so the bot doesn't think you're using the word!`,
          color: 10231598,
          thumbnail: {
            "url": "attachment://ohno.jpg",
          },
          fields: [
            {
              name: `User`,
              value: `<@${memberTag}>`,
              inline: true
            },
            {
              name: `Blacklisted Word (Please view at your discretion)`,
              value: "||" + OBS_list[i] + "||",
              inline: true
            },
          ],
          files: [{
            attachment:'./assets/ohno.jpg',
            name:'ohno.jpg'
          }],
          timestamp: new Date()
        }}) .catch(err => console.log(`Error: ${err}`))
      
        return message.delete().catch(err => console.log(`Error: ${err}`))
      }
    }
});

client.login(config.token) // Replace XXXXX with your bot token