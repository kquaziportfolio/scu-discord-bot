const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	usage: `[command name] **OR** &help`,
	category: 'Utility',
	async execute(client, message, args) {
		
		const { commands } = message.client;

		if (args[0]) {
			const name = args[0];
			const command = commands.get(name);

			if (!command) {
				message.reply({ embed: { description: `That\'s not a valid command!`, color: client.config.school_color}});
			}
			
			message.channel.send(
				{ embed: { 
					title: `${command.name.toUpperCase()} Command`, 
					fields: [
						{ name: `**❯ Category:**`, value: `${command.category}`},
						{ name: `**❯ Description:**`, value: `${command.description}`},
						{ name: `**❯ Usage:**`, value: `${client.config.prefix}${command.name} ${command.usage || ''}`},
						{ name: `**❯ Cooldown:**`, value: `${command.cooldown || 3} seconds`}
					],
					color: client.config.school_color,
					thumbnail: { url: client.config.verification.thumbnailLink},
					footer: { text: `Use ${client.config.prefix}help [command name] to get specific commmand info!`}
				}
			})
		}

		const helpEmbed = new MessageEmbed()
			.setTitle(`**SCU BOT COMMANDS**`)
			.setDescription(`<@${client.user.id}> is the **SCU Discord Network**'s very own bot! Say hi! :robot:\n\n` +
			 `**Commands**\nA full list of commands is available [here](${client.config.verification.githubLink}tree/master/commands) or use \`${client.config.prefix}help [command name]\` to get specific command info!\n\n` +
			 `**Support**\n[Click here](${client.config.verification.githubLink}pulls) to talk to our support team and/or suggest new ideas!`)
			.setFooter(`Brought to you by the server lords!`)
			.setColor(client.config.school_color)
			.attachFiles([`./assets/logo-pic.png`])
			.setThumbnail(`attachment://logo-pic.png`)
		        .setURL(`${client.config.verification.githubLink}tree/master/commands)
			.setTimestamp()

		message.channel.send(helpEmbed);
	}
}
