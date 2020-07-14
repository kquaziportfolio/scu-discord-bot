const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'diversity',
	description: 'diversity!',
		execute(message, args) { 
			const embed = new MessageEmbed()
				.setColor(10231598)
				.setTitle(`__**SCU's Diversity**__`)
				.setDescription(`
                The diversity of the SCU community is its greatest strength.\n
                We seek out students, staff, and faculty with a wide range of backgrounds, beliefs, and viewpoints, so that we might continue to learn and grow as an institution.\n
                __**Student organizations**__\n
                From MEChA-El Frente (supporting our Chicano/Latino community) and Igwebuike (our Black Student Union) to the Chinese Student Association and Ka Mana’o O Hawai’i, we have a number of organizations on campus where students can connect with one another and celebrate diverse cultures and communities. Of course, [LEAD Scholars](https://www.scu.edu/csi/organizations/) are inclusive and maintain our school-wide commitment to mutual respect and open dialogue.\n
                __**First-generation students**__\n
                Are you the first in your family to attend college? We are proud to support first- generation college students in many ways, most importantly through our [LEAD Scholars](https://www.scu.edu/csi/organizations/) program. The LEAD (Leadership Excellence and Academic Development) program provides academic and advising support, peer mentoring, and community building to first-generation students, primarily during their freshman year.\n
                `)
			const embed2 = new Discord.MessageEmbed()
				.setColor(10231598)
				.setDescription(`          
                __**Diversity in the curriculum**__\n   
                Undergraduates who want to explore multicultural issues and the ideas underlying diversity as part of their education can major in programs such as [Ethnic Studies](https://www.scu.edu/cas/ethnic-studies/) or [Women’s & Gender Studies](https://www.scu.edu/cas/wgst/).\n
                The offices of [Diversity and Inclusion](https://www.scu.edu/diversity/) and [Multicultural Learning](https://www.scu.edu/oml/) lead a number of diversity initiatives on campus, but we also believe we are all responsible for ensuring that Santa Clara remains a safe and open space, where all voices are heard and feel welcome.\n
                __**Resources**__\n
                - [Office for Diversity and Inclusion](https://www.scu.edu/diversity/)
                - [Office of Multicultural Learning](https://www.scu.edu/oml/)
                - [Council on Inclusive Excellence](https://www.scu.edu/diversity/council-on-inclusive-excellence/)
                - [Global Engagement](https://www.scu.edu/globalengagement/)
                - [International Students](https://www.scu.edu/globalengagement/international-students/)
                - [Office of Disabilities Resources](https://www.scu.edu/oae/)
                `)
				.attachFiles([`./assets/scu-mission.png`])
				.setImage(`attachment://scu-mission.png`)
			message.channel.send(embed);
			message.channel.send(embed2);
		}
}