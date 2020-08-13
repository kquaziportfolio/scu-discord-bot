const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬',
    '                  ┬─┬◡ﾉ(° -°ﾉ)',
];
const config = require('../config.json');

module.exports = {
	name: 'table-flip',
    description: 'For flipping tables!',
    usage: `${config.prefix}table-flip`,
    async execute(message, args) { 
        message.delete();
        
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 4000);
            await msg.edit(frame);
        }
        return message;
    }
}