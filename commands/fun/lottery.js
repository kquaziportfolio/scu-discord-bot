const Discord = require(`discord.js`); //requires Discord.js integration package
const { prefix } = require('../config.json');

module.exports = {
	name: 'lottery',
    description: 'Get lottery results!', //here is a change in the file
    usage: `${prefix}lottery`,
    async execute (message, args) {
        const lottery = Math.floor(Math.random() * 100) + 1;
        if (lottery === 1) return message.channel.send({embed: { color: 10231598, title: `Lottery Results!`, description: `Wow! You actually won! Great job!`}});
        message.channel.send({embed: { color: 10231598, title: `Lottery Results!`, description: `Nope, sorry, you lost.`}});
    }
}