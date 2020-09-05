const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'purge',
    description: 'Delete recent messages using this command!',
    usage: `${config.prefix}purge [number of messages]`,
    guildOnly: true,
    async execute(message, args) {   
        message.delete();

        const purgeInstructions = new MessageEmbed()
        .setColor(config.school_color)
        .addField("Here's an example:", "`&purge 10`")
        .setTimestamp()

        const deleteCount = parseInt(args[0], 10);

        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            // the mute code here
            if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
                return message.channel.send(purgeInstructions).then(msg => msg.delete({timeout: 10000}));
            }            
            await message.channel.bulkDelete(deleteCount + 1)
        } else {
                return message.channel.send({embed: {
                    description: `You must have the following permission(s): ` + "`MANAGE MANAGES`",
                    color: config.school_color,
                    image: {
                        url: `attachment://no_perm.gif`,
                    },
                    files: [{
                        attachment: `./assets/no_perm.gif`,
                        name: `no_perm.gif`
                    }],
                }
            }).then(msg => msg.delete({timeout: 5000}))
        }
    }
}