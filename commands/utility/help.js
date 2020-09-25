const { MessageEmbed } = require('discord.js');
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	usage: `[command name] **OR** &help`,
	category: 'Utility',
	async execute(client, message, args) {
		message.delete();
		
		const { commands } = message.client;

		if (args[0]) {
			const name = args[0];
			const command = commands.get(name);

			if (!command) {
				return message.channel.send({ embed: { description: `<@${message.author.id}>, that\'s not a valid command!`, color: client.config.school_color}});
			}
			
			return message.channel.send(
				{ embed: { 
					title: `${command.name.toUpperCase()} Command`, 
					fields: [
						{ name: `**❯ Category:**`, value: `${command.category}`},
						{ name: `**❯ Description:**`, value: `${command.description}`},
						{ name: `**❯ Usage:**`, value: `${client.config.prefix}${command.name} ${command.usage || ''}`},
						{ name: `**❯ Cooldown:**`, value: `${command.cooldown || 3} seconds`}
					],
					color: client.config.school_color,
					thumbnail: { url: `${client.config.verification.thumbnailLink}`},
					footer: { text: `Use ${client.config.prefix}help [command name] to get specific commmand info!`}
				}
			});
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
			.setTimestamp()

		message.author.send(helpEmbed)
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.channel.send(`<@${message.author.id}>`, { embed: { description: `I've sent you a DM with all my commands!`, color: client.config.school_color}});
			})
			.catch(error => {
				sendMessage(client, client.config.channels.auditlogs, { embed: { description: `<@${message.author.id}, it seems like I can't DM you! Do you have your DMs disabled! Or it could be an error: ${error}`, color: client.config.school_color}});
			});
	},
};