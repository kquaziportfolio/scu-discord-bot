const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality

module.exports = {
	name: 'roles-list',
    description: 'roles!',
		async execute (message, args) {
                const rolesEmbed1 = new Discord.MessageEmbed()
                .setTitle("Server Reaction Roles List")
                .setDescription(`
            **⟪1 - Undergraduate Majors⟫**\n
            **__School of Engineering__**\n
            ‌‌ ☣️ Bioengineering\n
            ‌‌ 💻 Computer Science and Engineering (SOE)\n
            ‌‌ 🏗️ Civil Engineering\n
            ‌‌ 🔌 Electrical Engineering\n
            ‌‌ 👨‍💻 Electrical and Computer Engineering\n
            ‌‌ 🛠️ General Engineering\n
            ‌‌ ⚙️ Mechanical Engineering\n
            ‌‌ 🕸️ Web Design and Engineering\n
             🤷 Undeclared - Engineering\n
                `)
                .setColor(10231598)
            message.channel.send(rolesEmbed1);
                const rolesEmbed2 = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTimestamp()
                .setDescription(`
                **__Leavey School of Business__**\n
                ‌‌ 🤑 Accounting\n
                ‌‌   ℹ️ Accounting and Information Systems\n
                 💱 Economics (LSB)\n
                ‌‌ 💹 Finance\n
                 🧗 Individual Studies (LSB)\n
                 💼 Management\n
                 🎰 Management and Entrepreneurship\n
                ‌‌ 💰 Management Information Systems\n
                ‌‌ 💸 Marketing\n
                 ❓ Undeclared - Business\n
                `)
            message.channel.send(rolesEmbed2);
                const rolesEmbed3 = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTimestamp()
                .setDescription(`
            **__College of Arts & Sciences__**\n
            ‌‌ 💀 Anthropology\n
            ‌‌ 🎨 Art History\n
            ‌‌ 🔬 Biochemistry\n
            ‌‌ 🦠 Biology\n
            ‌‌ 🧫 Chemistry\n
            ‌‌ 🚼 Child Studies\n
             📚 Classical Studies\n
            ‌‌ 🗣️ Communication\n
            ‌‌ 🖥️ Computer Science (CAS)\n
            ‌‌ 💵 Economics (CAS)\n
            ‌‌ 🍎 Engineering Physics\n
            ‌‌ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 English\n
            ‌‌ 🌲 Environmental Science\n
            ‌‌ 🍃 Environmental Studies\n
            ‌‌ ❤️ Ethnic Studies\n
            ‌‌ :flag_gr: Greek Language and Literature\n
            ‌‌ 🗽 History\n
            ‌‌ 😞 Individual Studies (CAS)\n
            ‌‌ 🔡 Latin and Greek\n
            ‌‌ ✝️ Latin Language and Literature\n
                `)
            message.channel.send(rolesEmbed3);
            const rolesEmbed4 = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTimestamp()
            .setDescription(`
            🔢 Mathematics\n
            ‌‌ 🎖️ Military Science\n
            ‌‌:flag_sa: MLAL - Arabic\n
            ‌‌:flag_cn: MLAL - Chinese\n
            ‌‌:flag_fr: MLAL - French\n
            ‌‌:flag_de:  MLAL - German\n
            ‌‌:flag_it: MLAL - Italian\n
            ‌‌🏯 MLAL - Japanese\n
            :flag_es: MLAL - Spanish\n
            ‌‌ 🎵 Music\n
             🧠 Neuroscience\n
            ‌‌ 🤔 Philosophy\n
            ‌‌ 🏋️ Physics\n
             🏛️ Political Science\n
            ‌‌ 📡 Psychology\n
            ‌‌ 🙏 Religious Studies\n
            ‌‌ 😋 Sociology\n
            ‌‌ 🎭 Studio Art\n
            ‌‌ 🕺 Theatre and Dance\n
            ‌‌ 👩 Women's and Gender Studies\n
             🤷 Undeclared - Arts and Sciences\n
            `)
            message.channel.send(rolesEmbed4);
            const rolesEmbed5 = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTimestamp()
            .setDescription(`
            **⟪2 - Year⟫**\n
            🎓 Alumni\n
            ‌‌🤓 Grad Student\n
            ‌‌:zero: 2020\n
            :one: 2021\n
            :two: 2022\n
            :three: 2023\n
            :four: 2024\n
            **⟪3 - Student Living Situation⟫**\n
            ‌‌ 🚙 Commuter\n
            ‌‌ 🏡 Residential\n
             🚪 Domestic\n
             ✈️ International\n
            **⟪4 - Academic Programs⟫**\n
             🥇 Honors College\n
             👪 LEAD Scholars\n
            `)
            message.channel.send(rolesEmbed5);
        }
}