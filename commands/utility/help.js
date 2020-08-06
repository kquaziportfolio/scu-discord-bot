const { prefix  } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	usage: `${prefix}[command name]`,
	async execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			const commandMap = commands.map(command => command.name).join(', ');
			const helpEmbed = new MessageEmbed()
				.setTitle(`Here\'s a list of all my commands:\n`)
				.setDescription(commandMap)
				.setFooter(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
				.setColor(10231598)
				.setThumbnail(`https://jasonanhvu.github.io/assets/img/logo-pic.png`)

            message.author.send(helpEmbed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.channel.send({ embed: { description: `I've sent you a DM with all my commands!`, color: 10231598}});
                })
                .catch(error => {
                    console.error(`Could not send help DM to <@${message.author.id}>.\n`, error);
                    message.channel.send({ embed: { description: `<@${message.author.id}, it seems like I can't DM you! Do you have your DMs disabled!`, color: 10231598}});
                });
        } else {
			const name = args[0];
			const command = commands.get(name);

			if (!command) {
				return message.channel.send({ embed: { description: `<@${message.author.id}>, that\'s not a valid command!`, color: 10231598}});
			}
			
			message.channel.send({embed: { title: `${command.name} Command`, description: `- Description: ${command.description}\n- **Usage:** ${command.usage}\n**- Cooldown:** ${command.cooldown || 3} second(s)`, color: 10231598}});
			
			if (command.aliases) message.channel.send({ embed: { description: `- **Aliases:** ${command.aliases.join(', ')}`, color: 10231598}});
		}
	},
};