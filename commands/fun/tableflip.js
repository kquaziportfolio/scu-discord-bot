const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
    '(╯°□°)╯           ┬─┬',
];

module.exports = {
	name: 'tableflip',
    description: 'For flipping tables!',
    category: 'Fun',
    async execute(message, args) { 
        message.delete();
        
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 5000);
            await msg.edit(frame);
        }
    }
}