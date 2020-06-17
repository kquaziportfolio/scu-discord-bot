const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'values',
	description: 'values!',
		execute(message, args) { 
			const embed = new MessageEmbed()
				.setColor(10231598)
				.setTitle(`__**SCU's Values**__`)
				.setDescription(`
					The University is committed to these core values, which guide us in carrying out our mission and realizing our vision:\n
					__**Academic Excellence**__\n
					We seek an uncompromising standard of excellence in teaching, learning, creativity, and scholarship within and across disciplines.\n
					__**Search for Truth, Goodness, and Beauty**__\n
					We prize scholarship and creative work that advance human understanding, improve teaching and learning, and add to the betterment of society by illuminating the most significant problems of the day and exploring the enduring mysteries of life. In this search, our commitment to academic freedom is unwavering.\n
					__**Engaged Learning**__\n
					We strive to integrate academic reflection and [direct experience in the classroom and the community](https://www.scu.edu/academics/undergraduate-programs/learn-from-experience/), especially to understand and improve the lives of those with the least education, power, and wealth.\n
					__**Commitment to Students**__\n
					As teachers and scholars, mentors and facilitators, we endeavor to educate the whole person. We nurture and challenge students—intellectually, spiritually, aesthetically, morally, socially, and physically—preparing them for leadership and service to the common good in their professional, civic, and personal lives.\n
				`)
			const embed2 = new Discord.MessageEmbed()
				.setColor(10231598)
				.setDescription(`
					__**Service to Others**__\n	
					We promote throughout the University a culture of service—service not only to those who study and work at Santa Clara but also to society in general and to its most disadvantaged members as we work with and for others to build a more humane, just, faith-filled, and sustainable world.\n
					__**Community and Diversity**__\n
					We cherish our [diverse and inclusive community of students](https://www.scu.edu/aboutscu/diversity/), faculty, staff, administrators, and alumni, a community that is enriched by people of different backgrounds, respectful of the dignity of all its members, enlivened by open communication, and caring and just toward others.\n
					__**Jesuit Distinctiveness**__\n
					We treasure our Jesuit heritage and tradition, which incorporates all of these core values. This tradition gives expression to our [Jesuit educational mission and Catholic identity](https://www.scu.edu/aboutscu/jesuit-catholic-tradition/) while also welcoming and respecting other religious and philosophical traditions, promoting the dialogue between faith and culture, and valuing opportunities to deepen religious beliefs.
				`)
				.attachFiles([`./assets/scu-mission.png`])
				.setImage(`attachment://scu-mission.png`)
			message.channel.send(embed);
			message.channel.send(embed2);
		}
}