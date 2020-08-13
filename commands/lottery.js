const config = require('../config.json');

module.exports = {
	name: 'lottery',
    description: 'Get lottery results!', //here is a change in the file
    usage: `${config.prefix}lottery`,
    async execute (message, args) {
        message.delete();
        
        const lottery = Math.floor(Math.random() * 100) + 1;
        if (lottery === 1) return message.channel.send({embed: { color: config.school_color, title: `Lottery Results!`, description: `Wow! You actually won! Great job!`}});
        message.channel.send({embed: { color: 10231598, title: `Lottery Results!`, description: `Nope, sorry, you lost.`}});
    }
}