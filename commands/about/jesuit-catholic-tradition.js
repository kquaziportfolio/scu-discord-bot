const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'jesuit-catholic-tradition',
	description: 'jesuit catholic tradition!',
		execute(message, args) { 
			const embed = new MessageEmbed()
				.setColor(10231598)
				.setTitle(`__**SCU's Jesuit Catholic Tradition**__`)
				.setDescription(`
                A Jesuit education is a complete education.\n
                The Jesuit tradition is about educating the whole person—mind, body, and soul—and preparing students to create a more just, humane, and sustainable world.\n
                What does that mean? It means you’ll be challenged to move out of the classroom and contribute to your community. It means you’ll be expected to understand the moral and ethical implications of your academic work and to bring your creativity to bear on the solving of real-world problems.
                It’s easy to talk about working to make the world a better place—but the Jesuits have been doing that work, every day, for almost 500 years.\n
                __**Everyone is welcome**__\n
                Although the Jesuit tradition comes from the Catholic Church, it resonates across campus with students, staff, and faculty of all backgrounds. Even students who aren’t religious appreciate SCU’s commitment to social justice and community engagement.`)
			const embed2 = new Discord.MessageEmbed()
				.setColor(10231598)
				.setDescription(`          
                __**We live it and breathe it**__\n
                Nearly every program on campus incorporates some aspect of Jesuit values, from our core curriculum and [cultural immersion programs](https://www.scu.edu/ic/programs/immersions/) to [interfaith dinner discussions](https://www.scu.edu/cm/religious-diversity/interfaith-dialogue/) and ethics workshops for local teachers.\n
                And while of course it’s not mandatory, many students, staff, and faculty—including non-Catholics—attend [weekly Mass](https://www.scu.edu/missionchurch/mass-schedule/) as a way to reconnect, re-energize, and remind each other that we, as a community, are stronger together.\n
                Above all else, a Jesuit education is an invitation to fully develop every dimension of your humanity. We welcome people of every faith and background to join the SCU family, which continues to grow and evolve in ways that enrich us all.`)
				.attachFiles([`./assets/jesuit-tradition.jpg`])
				.setImage(`attachment://jesuit-tradition.jpg`)
			message.channel.send(embed);
			message.channel.send(embed2);
		}
}