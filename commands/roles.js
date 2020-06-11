const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'roles',
    description: 'roles!',
		execute(message, args) {
            if (message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod'])) {
                const rolesEmbed = new MessageEmbed()
                .setTitle("Server Roles")
                .setDescription(`
            **⟪1 - Undergraduate Majors⟫**\n
            ‌‌ Bioengineering
            ‌‌ Computer Science and Engineering
            ‌‌ Civil, Environmental, and Sustainable Engineering
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
            ‌‌ Modern Languages and Literatures - Arabic
            ‌‌ Modern Languages and Literatures - Chinese
            ‌‌ Modern Languages and Literatures - French
            ‌‌ Modern Languages and Literatures - German
            ‌‌ Modern Languages and Literatures - Italian
            ‌‌ Modern Languages and Literatures - Japanese
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
                .setColor(10231598)
                .setTimestamp()
                .setFooter("Use `<i.am [role]>` to select roles!")
            message.channel.send(rolesEmbed);
            } else {
                message.channel.send("You do not have sufficient permissions to run this command!")
                    .then(msg => msg.delete({timeout: 5000}))
            }
    }
  
}