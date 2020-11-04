let isAdmin = require(`../../modules/isAdmin.js`);
let sendMessage = require(`../../modules/sendMessage.js`);
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
	name: 'reload',
	description: 'Reloads a command!',
	usage: `[command name]`, 
	category: 'Admin',  
	async execute(client, message, args) {

		if(isAdmin(client, message, true)) {
			if (!args.length) return message.reply({ embed: { description: `❌ You didn't pass any command to reload!`}});
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName);

			if (!command) return message.reply({ embed: { description: `❌ There is no command with name or alias \`${commandName}\`!`}});

			readdirSync(join(__dirname, "..")).forEach(f => {
				const files = readdirSync(join(__dirname, "..", f));
				if (files.includes(`${commandName}.js`)) {
					const file = `../${f}/${commandName}.js`;
					try {
						delete require.cache[require.resolve(file)];
						message.client.commands.delete(commandName);
						const pull = require(file);
						message.client.commands.set(commandName, pull);
						
						sendMessage(client, client.config.channels.auditlogs, { embed: { description: `Command \`${commandName}\` was reloaded! ✅`, color: client.config.school_color}});
					}
					catch (err) {
						sendMessage(client, client.config.channels.auditlogs, { embed: { description: `Could not reload: \`${args[0].toUpperCase()}\`, color: client.config.school_color`}});
						return console.log(err.stack || err);
					}
				}
			});

			
		} 
	}
}
