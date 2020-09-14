const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require('../config.json');

module.exports =  {  
	name: 'shutdown',
    description: 'Shut down the bot!',
    usage: `${config.prefix}restart`,
	async execute(message, args) {
        message.delete();

        if(!config.serverRoles.owner) return message.channel.send("You don't have permissions!");

        message.channel.send(`Shutting down the bot...`)
        .then(m => m.delete({timeout: 5000}))
        .then(client.destroy());
    }
}