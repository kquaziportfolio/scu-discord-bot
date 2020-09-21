const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
	name: 'help',
	description: 'List of all of my commands or info about a specific command.',
	usage: `${config.prefix}[command name]`,
	async execute(message, args) {
		message.delete();
		
		const { commands } = message.client;

		if (!args.length) {
			const commandMap = commands.map(command => command.name).join(', ');
			const helpEmbed = new MessageEmbed()
				.setTitle(`Here\'s a list of all my commands:\n`)
				.setDescription(commandMap)
				.setFooter(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`)
				.setColor(config.school_color)
				.setThumbnail(`https://jasonanhvu.github.io/assets/img/logo-pic.png`)

            message.author.send(helpEmbed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.channel.send({ embed: { description: `<@${message.author.id}>, I've sent you a DM with all my commands!`, color: config.school_color}});
                })
                .catch(error => {
                    sendMessage(client, config.channels.auditlogs, { embed: { description: `<@${message.author.id}, it seems like I can't DM you! Do you have your DMs disabled!`, color: config.school_color}});
                });
        } else {
			const name = args[0];
			const command = commands.get(name);

			if (!command) {
				return message.channel.send({ embed: { description: `<@${message.author.id}>, that\'s not a valid command!`, color: config.school_color}});
			}
			
			message.channel.send({embed: { title: `${command.name.toUpperCase()} Command`, description: `- **Description**: ${command.description}\n- **Usage:** ${command.usage}\n**- Cooldown:** ${command.cooldown || 3} second(s)`, color: config.school_color}});
			
			if (command.aliases) message.channel.send({ embed: { description: `- **Aliases:** ${command.aliases.join(', ')}`, color: config.school_color}});
		}
	},
};