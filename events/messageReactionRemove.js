const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const roles = require(`../commands/roles-list.json`); 
const soe_majors = roles.soe_majors; 
const lsb_majors = roles.lsb_majors;
const cas_majors = roles.cas_majors;
const years = roles.years; 
const situation = roles.situation;
const { identification } = require(`../config.json`);

/*
==========================================================================================
  _____   ____  _      ______   _____  ______          _____ _______ 
 |  __ \ / __ \| |    |  ____| |  __ \|  ____|   /\   / ____|__   __|
 | |__) | |  | | |    | |__    | |__) | |__     /  \ | |       | |   
 |  _  /| |  | | |    |  __|   |  _  /|  __|   / /\ \| |       | |   
 | | \ \| |__| | |____| |____  | | \ \| |____ / ____ \ |____   | |   
 |_|  \_\\____/|______|______| |_|  \_\______/_/    \_\_____|  |_|   
==========================================================================================
  */

 module.exports = async (message, reaction, user) => {
	// We're gonna make a trigger, if the user removes the reaction, the bot will take the role back.
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	if (reaction.message.guild.id !== `${identification}`) return;
	
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
		} else if (reaction.emoji.name === "💹") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[2].Finance); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Finance` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "🧗") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[3].Individual_Studies_LSB); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Individual Studies (LSB)` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💼") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[4].Management); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Management` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💰") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[5].Management_Information_Systems); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Management Information Systems` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "💸") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[6].Marketing); 
			return user.send({embed: { description: `<@${user.id}>, ` + "`Marketing` role was removed!", timestamp: new Date(), footer: { text: 'Go Broncos!'}, color: 10231598}}).catch(() => console.log("Failed to send DM."));
		} else if (reaction.emoji.name === "❓") {
			await reaction.message.guild.members.cache.get(user.id).roles.remove(lsb_majors[7].Undeclared_Business); 
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
			await reaction.message.guild.members.cache.get(user.id).roles.remove(years[32].twenty); 
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
		console.log(`Wrong channel!`);
	}
}