const Discord = require(`discord.js`); //requires Discord.js integration package
const {
    Client,
    MessageEmbed
} = require(`discord.js`); //for embed functionality
const {
    prefix,
    identification,
    token
} = require(`../config.json`); //special config.json file
const roles = require(`./roles.json`); 
const soe_majors = roles.soe_majors; 
const lsb_majors = roles.lsb_majors;
const cas_majors = roles.cas_majors
const years = roles.years; 
const situation = roles.situation;

module.exports = {
    name: 'role-select',
    description: 'select roles!',
    execute(message, args) {
        const prompt = message.content.slice(prefix.length).split(' | ');
        const guild = message.guild; //My secret server id
        const sicon = guild.iconURL();
        const memberTag = message.author.id;

        const roleInstructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Role Select Command!")
        .addField("Description:", `To get roles! Look at <#722494512420618370> to help choose roles!`, true)
        .addField("Usage:", "`>role-select | [first role group] | [second role group] | [third role group]`", true)
        .addField("Example:", "role-select | Bioengineering | 2024 | Commuter", true)
        .setTimestamp();


        if (prompt[0] && !prompt[3]) {
            message.channel.send(roleInstructions)
        }
        
        if (prompt[1] === "Bioengineering") {
            message.member.roles.add(soe_majors[0].Bioengineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Computer Science and Engineering (SOE)") {
            message.member.roles.add(soe_majors[1].Computer_Science_and_Engineering_SOE)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Civil Engineering") {
            message.member.roles.add(soe_majors[2].Civil_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Electrical Engineering") {
            message.member.roles.add(soe_majors[3].Electrical_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Electrical and Computer Engineering") {
            message.member.roles.add(soe_majors[4].Electrical_and_Computer_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "General Engineering") {
            message.member.roles.add(soe_majors[5].General_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Mechanical Engineering") {
            message.member.roles.add(soe_majors[6].Mechanical_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Web Design and Engineering") {
            message.member.roles.add(soe_majors[7].Web_Design_and_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Undeclared Engineering") {
            message.member.roles.add(soe_majors[8].Undeclared_Engineering)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Accounting") {
            message.member.roles.add(lsb_majors[0].Accounting)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Accounting and Information Systems") {
            message.member.roles.add(lsb_majors[1].Accounting_and_Information_Systems)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Economics (LSB)") {
            message.member.roles.add(lsb_majors[2].Economics_LSB)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Finance") {
            message.member.roles.add(lsb_majors[3].Finance)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Individual Studies (LSB)") {
            message.member.roles.add(lsb_majors[4].Individual_Studies_LSB)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Management Information Systems") {
            message.member.roles.add(lsb_majors[5].Management_Information_Systems)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Marketing") {
            message.member.roles.add(lsb_majors[6].Marketing)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Undeclared - Business") {
            message.member.roles.add(lsb_majors[7].Undeclared_Business)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Anthropology") {
            message.member.roles.add(cas_majors[0].Anthropology)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Art History") {
            message.member.roles.add(cas_majors[1].Art_History)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Biochemistry") {
            message.member.roles.add(cas_majors[2].Biochemistry)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Biology") {
            message.member.roles.add(cas_majors[3].Biology)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Chemistry") {
            message.member.roles.add(cas_majors[4].Chemistry)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Child Studies") {
            message.member.roles.add(cas_majors[5].Child_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Classical Studies") {
            message.member.roles.add(cas_majors[6].Classical_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Communication ") {
            message.member.roles.add(cas_majors[7].Communication)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Computer Science (CAS)") {
            message.member.roles.add(cas_majors[8].Computer_Science_CAS)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Economics (CAS)") {
            message.member.roles.add(cas_majors[9].Economics_CAS)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Engineering Physics") {
            message.member.roles.add(cas_majors[10].Engineering_Physics)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "English") {
            message.member.roles.add(cas_majors[11].English)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Environmental Science") {
            message.member.roles.add(cas_majors[12].Environmental_Science)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Environmental Studies") {
            message.member.roles.add(cas_majors[13].Environmental_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Ethnic Studies") {
            message.member.roles.add(cas_majors[14].Ethnic_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Greek Language and Literature") {
            message.member.roles.add(cas_majors[15].Greek_Language_and_Literature)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "History") {
            message.member.roles.add(cas_majors[16].History)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Individual Studies (CAS)") {
            message.member.roles.add(cas_majors[17].Individual_Studies_CAS)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Latin and Greek") {
            message.member.roles.add(cas_majors[18].Latin_and_Greek)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Latin Language and Literature") {
            message.member.roles.add(cas_majors[19].Latin_Language_and_Literature)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Mathematics") {
            message.member.roles.add(cas_majors[20].Mathematics)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Military Science") {
            message.member.roles.add(cas_majors[21].Military_Science)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - Arabic") {
            message.member.roles.add(cas_majors[22].MLAL_Arabic)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - Chinese") {
            message.member.roles.add(cas_majors[23].MLAL_Chinese)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - French") {
            message.member.roles.add(cas_majors[24].MLAL_French)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - German") {
            message.member.roles.add(cas_majors[25].MLAL_German)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - Italian") {
            message.member.roles.add(cas_majors[26].MLAL_Italian)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - Japanese") {
            message.member.roles.add(cas_majors[27].MLAL_Japanese)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "MLAL - Spanish") {
            message.member.roles.add(cas_majors[28].MLAL_Spanish)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Music") {
            message.member.roles.add(cas_majors[29].Music)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Neuroscience") {
            message.member.roles.add(cas_majors[30].Neuroscience)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Philosophy") {
            message.member.roles.add(cas_majors[31].Philosophy)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Physics") {
            message.member.roles.add(cas_majors[32].Physics)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Political Science") {
            message.member.roles.add(cas_majors[33].Political_Science)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Psychology") {
            message.member.roles.add(cas_majors[34].Psychology)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Religious Studies") {
            message.member.roles.add(cas_majors[35].Religious_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Sociology") {
            message.member.roles.add(cas_majors[36].Sociology)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Studio Art") {
            message.member.roles.add(cas_majors[37].Studio_Art)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Theatre and Dance") {
            message.member.roles.add(cas_majors[38].Theatre_and_Dance)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Women's and Gender Studies") {
            message.member.roles.add(cas_majors[39].Womens_and_Gender_Studies)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[1] === "Undeclared - Arts and Sciences") {
            message.member.roles.add(cas_majors[40].Undeclared_Arts_and_Sciences)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[1]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } 

        if (prompt[2] === "Alumni") {
            message.member.roles.add(years[0].Alumni)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "Grad Student") {
            message.member.roles.add(years[1].Grad_Student)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "2020") {
            message.member.roles.add(years[2].twenty)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "2021") {0
            message.member.roles.add(years[3].twenty_one)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "2022") {
            message.member.roles.add(years[4].twenty_two)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "2023") {
            message.member.roles.add(years[5].twenty_three)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[2] === "2024") {
            message.member.roles.add(years[6].twenty_four)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[2]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } 

        if (prompt[3] === "Commuter") {
            message.member.roles.add(situation[0].Commuter)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[3]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } else if (prompt[3] === "Residential") {
            message.member.roles.add(situation[1].Residential)
            .then(msg => msg.send({embed: { description: `<@${memberTag}>, You've added the **${prompt[3]}** role in the ${guild.name} server!`, color: 10231598, timestamp: new Date(), footer: { text: 'Go Broncoss!', icon_url: `${sicon}`, },}}))
        } 
    }
}