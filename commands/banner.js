const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
    name: 'banner',
    description: 'Create a cool embed banner with images in my folder!',
    usage: `${config.prefix}banner`,
    guildOnly: false,
		async execute (message, args) {
            message.delete();

            try {
                const input = args[0];

                if (!input) return;

                const imageEmbed = new MessageEmbed()
                .attachFiles([`./assets/${input}`])
                .setImage(`attachment://${input}`)
                .setColor(config.school_color)

                message.channel.send(imageEmbed);
            } catch (err) {
                console.log(err);
            }
        }
}