const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'outreach',
	description: 'outreach!',
		execute(message, args) { 
			const embed = new MessageEmbed()
				.setColor(10231598)
				.setTitle(`__**SCU's Community Outreach**__`)
				.setDescription(`
                We are in and of the community.\n
                A deep engagement with the surrounding communities in Silicon Valley and beyond is central to [our mission](https://www.scu.edu/aboutscu/mission-vision-values/).\n
                Our communities influence how SCU students learn and what they choose to do on weekends and breaks. They inspire the [work of our faculty](https://www.scu.edu/academics/research/faculty-research/) and shape the lives of [our alumni](https://www.scu.edu/alumni/).\n
                Community programs, activities, and initiatives help strengthen the connection between Santa Clara, our neighbors, and our world, while creating opportunities for all of SCU to learn, serve, and grow.\n
                This engagement works in both directions. We welcome our neighbors to experience Santa Clara’s campus culture through public events and enrichment programs. Activities throughout the year might include [exhibits](https://www.scu.edu/desaisset/), [performances](http://www.scupresents.org/), [athletics](https://www.scu.edu/athletics/), and public forums featuring some of [Silicon Valley’s most notable visionaries](https://www.scu.edu/alumni/about/notable/)—often our own alumni.\n`)
			message.channel.send(embed).catch(err => `Error: ${err}`)
		}
}