const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	usage: `[command name] **OR** ${config.prefix}help`,
	category: 'Utility',
	async execute(message, args) {
		message.delete();
		
		const { commands } = message.client;

		if (args[0]) {
			const name = args[0];
			const command = commands.get(name);

			if (!command) {
				return message.channel.send({ embed: { description: `<@${message.author.id}>, that\'s not a valid command!`, color: config.school_color}});
			}
			
			return message.channel.send(
				{ embed: { 
					title: `${command.name.toUpperCase()} Command`, 
					fields: [
						{ name: `**❯ Category:**`, value: `${command.category}`},
						{ name: `**❯ Description:**`, value: `${command.description}`},
						{ name: `**❯ Usage:**`, value: `${config.prefix}${command.name} ${command.usage || ''}`},
						{ name: `**❯ Cooldown:**`, value: `${command.cooldown || 3} seconds`}
					],
					color: config.school_color,
					thumbnail: { url: `https://jasonanhvu.github.io/assets/img/logo-pic.png`},
					footer: { text: `Use ${config.prefix}help [command name] to get specific commmand info!`}
				}
			});
		}

		const helpEmbed = new MessageEmbed()
			.setTitle(`Here\'s all my commands:`)
			.setDescription(`You can view all my commands in my [GitHub](https://github.com/jasonanhvu/scu-discord-bot/tree/master/commands) or use \`${config.prefix}help [command name]\` to get specific command info!`)
			.setFooter(`Brought to you by the server lords!`)
			.setColor(config.school_color)
			.attachFiles([`./assets/logo-pic.png`])
			.setThumbnail(`attachment://logo-pic.png`)

		message.author.send(helpEmbed)
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.channel.send({ embed: { description: `<@${message.author.id}>, I've sent you a DM with all my commands!`, color: config.school_color}});
			})
			.catch(error => {
				sendMessage(client, config.channels.auditlogs, { embed: { description: `<@${message.author.id}, it seems like I can't DM you! Do you have your DMs disabled! Or it could be an error: ${error}`, color: config.school_color}});
			});
	},
};