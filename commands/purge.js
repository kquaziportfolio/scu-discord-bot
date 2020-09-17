const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'purge',
    description: 'Delete recent messages using this command!',
    usage: `${config.prefix}purge [number of messages]`,
    guildOnly: true,
    async execute(message, args) {   
        message.delete();

        let isAdmin = require(`../modules/isAdmin.js`);

        if(isAdmin(message, false)) {
            try {
                const purgeInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .setDescription("Here's an example: `&purge 10`")
                .setTimestamp()
        
                const deleteCount = parseInt(args[0], 10);

                // the mute code here
                if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
                    return message.channel.send(purgeInstructions).then(msg => msg.delete({timeout: 10000}));
                }            
                await message.channel.bulkDelete(deleteCount + 1)
            } catch(e) {
                console.log(e);
            }
        } 
    }
}