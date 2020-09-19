const config = require(`../config.json`);
let isAdmin = require(`../modules/isAdmin.js`);

module.exports = {
	name: 'reload',
	description: 'Reloads a command!',
	usage: `[command name]`,
	guildOnly: false,
	async execute(message, args) {
		message.delete();

		if(isAdmin(message, false)) {
			let auditLogs = message.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs);

			if (!args.length) return auditLogs.send({ embed: { description: `❌ You didn't pass any command to reload, <@${message.author.id}>!`}});
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName);

			if (!command) return auditLogs.send({ embed: { description: `❌ There is no command with name or alias \`${commandName}\`, ${message.author}!`}});
			
			delete require.cache[require.resolve(`./${command.name}.js`)];

			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			auditLogs.send({ embed: { description: `Command \`${command.name}\` was reloaded! ✅`, color: config.school_color}});
		} 
	}
}