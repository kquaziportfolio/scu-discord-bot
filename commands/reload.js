const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);

module.exports = {
	name: 'reload',
	description: 'Reloads a command!',
	usage: `${config.prefix}reload [command name]`,
	async execute(message, args) {
		message.delete();
		if ((message.member.roles.cache.has(config.server_roles.admin, config.server_roles.mod))) {

			let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

			if (!args.length) return auditLogs.send({ embed: { description: `❌ You didn't pass any command to reload, <@${message.author.id}>!`}});
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName);

			if (!command) return auditLogs.send({ embed: { description: `❌ There is no command with name or alias \`${commandName}\`, ${message.author}!`}});
			
			delete require.cache[require.resolve(`./${command.name}.js`)];

			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			auditLogs.send({ embed: { description: `Command \`${command.name}\` was reloaded! ✅`, color: config.school_color}});
		} else {
			const embed = new MessageEmbed()
			.setColor(config.school_color)
			.setTitle(`Oops, an error happened...`)
			.setDescription("You must have the following roles: " + "`Admin`, `Mod`")
			.attachFiles([`./assets/no_perm.gif`])
			.setImage(`attachment://no_perm.gif`)
			.setTimestamp()
			message.channel.send(embed)
			.then(msg => {
				msg.delete({ timeout: 2000 })
			})
		}
	}
}