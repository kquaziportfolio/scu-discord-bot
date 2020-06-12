const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality

module.exports = {
	name: 'roles',
    description: 'roles!',
		execute(message, args) {
                const rolesEmbed1 = new Discord.MessageEmbed()
                .setTitle("Server Roles")
                .setDescription(`
            **⟪1 - Undergraduate Majors⟫**\n
            ‌‌ Bioengineering
            ‌‌ Computer Science and Engineering
            ‌‌ Civil Engineering
            ‌‌ Electrical Engineering
            ‌‌ Electrical and Computer Engineering
            ‌‌ General Engineering
            ‌‌ Mechanical Engineering
            ‌‌ Web Design and Engineering
            ‌‌ Accounting
            ‌‌ Accounting & Information Systems
            ‌‌ Finance
            ‌‌ Individual Studies
            ‌‌ Management Information Systems
            ‌‌ Marketing
            ‌‌ Anthropology
            ‌‌ Art History
            ‌‌ Biochemistry
            ‌‌ Biology
            ‌‌ Chemistry
            ‌‌ Child Studies
            Classical Studies
            ‌‌ Communication
            ‌‌ Computer Science (CAS)
            ‌‌ Economics (CAS)
            ‌‌ Engineering Physics
            ‌‌ English
            ‌‌ Environmental Science
            ‌‌ Environmental Studies
            ‌‌ Ethnic Studies
            ‌‌ Greek Language and Literature
            ‌‌ History
            ‌‌ Individual Studies (CAS)
            ‌‌ Latin and Greek
            ‌‌ Latin Language and Literature
            ‌‌ Mathematics
            ‌‌ Military Science
            ‌‌ MLAL - Arabic
            ‌‌ MLAL - Chinese
            ‌‌ MLAL - French
            ‌‌ MLAL - German
            ‌‌ MLAL - Italian
            ‌‌ MLAL - Japanese
            ‌‌ Music
            ‌‌ Neuroscience
            ‌‌ Philosophy
            ‌‌ Physics
            Political Science
            ‌‌ Psychology
            ‌‌ Religious Studies
            ‌‌ Sociology
            ‌‌ Studio Art
            ‌‌ Theatre and Dance
            ‌‌ Women's and Gender Studies
            Undeclared - Arts and Sciences
            Undeclared - Business
            Undeclared - Engineering
                `)
                .setColor(10231598)
            message.channel.send(rolesEmbed1);
                const rolesEmbed2 = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTimestamp()
                .setDescription(`
            **⟪2 - User Status⟫**\n
            Alumni
            ‌‌Grad Student
            ‌‌Guest
            ‌‌2020
            2021
            2022
            2023
            2024

            **⟪3 - Clubs/Organizations⟫**\n
            ‌‌ Club Member
            ‌‌ Business Club Member
            ‌‌ Engineering Club Member

            **⟪4 - Student Living Situation⟫**\n
            ‌‌ Commuter
            ‌‌ Residential

            **⟪5 - Fun⟫**\n
            ‌‌ Gamer
                `)
                .setFooter("Brought to you by the creators of this Discord server.", 'https://jasonanhvu.github.io/scu-discord-bot/')
            message.channel.send(rolesEmbed2)
        }
}