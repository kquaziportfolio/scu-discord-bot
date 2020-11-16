const { MessageEmbed } = require(`discord.js`); //for embed functionality
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = {
    name: 'banner',
    description: 'Create a cool embed banner with images in my folder!',
    args: true,
    usage: `[file name and extension]`, 
    category: 'Admin',  
    async execute (client, message, args) {
        if(isAdmin(client, message, true)) {

            try {
                const input = args[0];

                if (".." in input) {
                    message.channel.send({ embed: { description: `Lol! Only look in the \`assets\` directory`, color: client.config.school_color}});
                    return;
                }

                const imageEmbed = new MessageEmbed()
                .attachFiles([`./assets/${input}`])
                .setImage(`attachment://${input}`)
                .setColor(client.config.school_color)

                message.channel.send(imageEmbed);
            } catch (err) {
                if (err) throw error;
            }
        }
    }
}
