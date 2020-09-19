const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬',
];
const config = require('../config.json');

module.exports = {
	name: 'tableflip',
    description: 'For flipping tables!',
    usage: `${config.prefix}tableflip`,
    guildOnly: false,
    async execute(message, args) { 
        message.delete();
        
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 5000);
            await msg.edit(frame);
        }
    }
}