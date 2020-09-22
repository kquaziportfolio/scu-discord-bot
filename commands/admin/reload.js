const config = require(`../../config.json`);
let isAdmin = require(`../../modules/isAdmin.js`);
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
	name: 'reload',
	description: 'Reloads a command!',
	usage: `[command name]`, 
	category: 'Admin',  
	async execute(message, args) {
		message.delete();

		if(isAdmin(message, false)) {
			let auditLogs = message.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs);

			if (!args.length) return auditLogs.send({ embed: { description: `❌ You didn't pass any command to reload, <@${message.author.id}>!`}});
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName);

			if (!command) return auditLogs.send({ embed: { description: `❌ There is no command with name or alias \`${commandName}\`, ${message.author}!`}});

			readdirSync(join(__dirname, "..")).forEach(f => {
				const files = readdirSync(join(__dirname, "..", f));
				if (files.includes(`${commandName}.js`)) {
					const file = `../${f}/${commandName}.js`;
					try {
						delete require.cache[require.resolve(file)];
						message.client.commands.delete(commandName);
						const pull = require(file);
						message.client.commands.set(commandName, pull);
					}
					catch (err) {
						message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
						return console.log(err.stack || err);
					}
				}
			});

			auditLogs.send({ embed: { description: `Command \`${commandName}\` was reloaded! ✅`, color: config.school_color}});
		} 
	}
}