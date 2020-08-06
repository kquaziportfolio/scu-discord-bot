const Discord = require("discord.js");
const bot = new Discord.Client();
const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬',
    '                  ┬─┬◡ﾉ(° -°ﾉ)',
];
const { prefix } = require('../config.json');

module.exports = {
	name: 'table-flip',
    description: 'For flipping tables!',
    usage: `${prefix}table-flip`,
    async execute(message, args) { 
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 4000);
            await msg.edit(frame);
        }
        return message;
    }
}