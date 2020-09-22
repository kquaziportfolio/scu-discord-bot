const config = require('../../config.json');

module.exports =  { 
	name: 'ping',
	description: 'Get the bot\'s ping latency and response!',
	cooldown: 5,
	category: 'Utility',
	async execute(message, args) {
		message.delete();
		
		const msg = await message.channel.send(`Pinging...`)
		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is it ok, I can\'t look!', 'I hope it isn\'t bad!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit({embed: {description: `**Response:** ${response}\n**Ping Latency:** ${latency}ms`, color: config.school_color}})
    }
} 