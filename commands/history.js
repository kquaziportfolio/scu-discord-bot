const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'history',
	description: 'history!',
		execute(message, args) {   
            const embed = new MessageEmbed()
                .setColor(10231598)
                .setTitle(`__**SCU's History**__`)
                .setDescription(`
                    Santa Clara University is California’s oldest operating institution of higher learning.\n
                    The University sits on the land of the Ohlone people, who inhabited areas from the San Francisco Bay to the lower Salinas Valley. Since opening our doors in 1851, SCU has evolved and grown in many ways. Through the years, however, we’ve remained faithful to the 475-year-old Jesuit tradition and to our core values.\n
                    __**The Mission**__\n
                    Established in 1777 by Father Junipero Serra, the Mission Santa Clara de Asís was the 8th of the 21 original California missions. Our campus was built around the Mission, and to this day it remains our anchor and spiritual center.\n
                    __**The College**__\n
                    Our modest school, originally named “Santa Clara College,” began as an all-boys preparatory school. John Nobili, S.J., founder and first president of Santa Clara College (1851–1856), described Santa Clara’s goals in terms typical of his era: *"To cultivate the heart, to form and cherish good habits, to prevent and eradicate evil ones.*"\n
                    Santa Clara started offering college courses in 1853, and by 1875, we enrolled more than 275 students at the preparatory and collegiate levels.\n`
                )
            const embed2 = new Discord.MessageEmbed() 
                .setColor(10231598)
                .setDescription(`
                    __**The University**__\n
                    With the addition of the law and engineering schools, the College became “The University of Santa Clara” in 1912. The Leavey School of Business opened in 1926, and within a decade it became one of the first business schools in the country to receive national accreditation.\n
                    __**Breaking the mold**__\n
                    In 1961, Santa Clara University admitted 75 female undergraduates, becoming the first Catholic coeducational university in California.\n
                    __**Who we are today**__\n
                    In 1985, the University adopted Santa Clara University as its official name, and today SCU enrolls 9,000 undergraduate and graduate students from all over the world.`)
                .attachFiles([`./assets/scu-history.jpg`])
                .setImage(`attachment://scu-history.jpg`)
            message.channel.send(embed);
            message.channel.send(embed2)
        }
}