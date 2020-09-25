const snekfetch = require("snekfetch");
const config = require('../../config.json');

module.exports = {
	name: 'advice',
    description: 'Get advice here!',
    category: 'Fun',
    async execute(message, args) { 
        message.delete();
        
        try {
            const { body } = await snekfetch.get('http://api.adviceslip.com/advice');
            message.channel.send(`<@${message.author.id}>`, {embed: {title: `Here's your advice`, description: JSON.parse(body.toString()).slip.advice, color: config.school_color}});
        } catch (err) {
            message.channel.send(`An error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}