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

module.exports = {
	name: 'table-flip',
	description: 'tableflip!',
    async execute(message, args) { 
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 4000);
            await msg.edit(frame);
        }
        return message;
    }
}