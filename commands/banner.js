const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
    name: 'banner',
    description: 'Create a cool embed banner with images in my folder!',
    usage: `${config.prefix}banner`,
    guildOnly: false,
    async execute (message, args) {

        let isAdmin = require(`../modules/isAdmin.js`);
        
        if(isAdmin(message, false)) {
            message.delete();

            try {
                const input = args[0];

                if (!input) return message.channel.send({embed: { description: "Please enter a file name like this: `wumpus.jpeg`"}});

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
}