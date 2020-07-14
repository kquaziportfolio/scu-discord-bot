const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");

module.exports = {
	name: 'advice',
	description: 'advice!',
    async execute(message, args) { 
        try {
            const { body } = await snekfetch.get('http://api.adviceslip.com/advice');
            message.channel.send({embed: {title: `Here's your advice`, description: JSON.parse(body.toString()).slip.advice, color: 10231598}});
        } catch (err) {
            message.channel.send(`An error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}