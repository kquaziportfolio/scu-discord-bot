const config = require(`../config.json`);
let isAdmin = require(`../modules/isAdmin.js`);
let sendMessage = require(`../google-form-functions/sendMessage.js`);

module.exports = {
	name: 'reload',
	description: 'Reloads a command!',
	usage: `${config.prefix}reload [command name]`,
	async execute(message, args) {
		message.delete();

		if(isAdmin(message.author, message)) {
			if (!args.length) return auditLogs.send({ embed: { description: `❌ You didn't pass any command to reload, <@${message.author.id}>!`}});
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName);

			if (!command) return auditLogs.send({ embed: { description: `❌ There is no command with name or alias \`${commandName}\`, ${message.author}!`}});
			
			delete require.cache[require.resolve(`./${command.name}.js`)];

			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			sendMessage(client, config.channels.auditlogs, { embed: { description: `Command \`${command.name}\` was reloaded! ✅`, color: config.school_color}});
		} 
	}
}