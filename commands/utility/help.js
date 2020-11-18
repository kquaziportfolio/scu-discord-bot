const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	aliases: ['cmds', 'commands'],
	usage: `[command name] **OR** &help`,
	category: 'Utility',
	async execute(client, message, args) {
		
		const { commands } = message.client;

		if (args[0]) {
			const name = args[0];
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name)); //includes aliases of commnad

			if (!command) {
				return message.reply({ embed: { description: `That\'s not a valid command!`, color: client.config.school_color}});
			}
			
			const secHelpEmbed = new MessageEmbed()
			.setTitle(`${command.name.toUpperCase()} Command`)
			.addFields(
				{ name: `**❯ Category:**`, value: `${command.category}`},
				{ name: `**❯ Description:**`, value: `${command.description}`},
				{ name: `**❯ Usage:**`, value: `${client.config.prefix}${command.name} ${command.usage || ''}`},
				{ name: `**❯ Cooldown:**`, value: `${command.cooldown || 0} seconds`},
			)
			.setColor(client.config.school_color)
			.setThumbnail(client.config.verification.thumbnailLink)
			.setFooter(`Use ${client.config.prefix}help [command name] to get specific commmand info!`) 
			
			if (command.aliases) secHelpEmbed.addField({ name: `**❯ Aliases:**`, value: `${command.aliases.join(', ')}`);
			
			return message.channel.send(secHelpEmbed);
		}

		const mainHelpEmbed = new MessageEmbed()
			.setTitle(`**SCU BOT COMMANDS**`)
			.setDescription(`<@${client.user.id}> is the **SCU Discord Network**'s very own bot! :robot:\n\n` +
			 `**Commands**\nA full list of commands is available [here](${client.config.verification.githubLink}tree/master/commands) or use \`${client.config.prefix}help [command name]\` to get specific command info!\n\n` +
			 `**Support**\n[Click here](${client.config.verification.githubLink}pulls) to talk to our support team and/or suggest new ideas!`)
			.setFooter(`Brought to you by the server lords!`)
			.setColor(client.config.school_color)
			.attachFiles([`./assets/logo-pic.png`])
			.setThumbnail(`attachment://logo-pic.png`)
		        .setURL(`${client.config.verification.githubLink}tree/master/commands`)
			.setTimestamp()

		message.channel.send(mainHelpEmbed);
	}
}
