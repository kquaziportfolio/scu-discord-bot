const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'purge',
	description: 'purge!',
    async execute(message, args) {   

        const purgeInstructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Purge Command")
        .addField("Description:", `Please provide a number between 1 and 100 for the number of messages to delete`, true)
        .addField("Usage:", "`>purge [number of messages]`", true)
        .addField("Example:", "`>purge 10`")
        .setTimestamp()

        const deleteCount = parseInt(args[0], 10);

        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            // the mute code here
            if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
                return message.channel.send(purgeInstructions).then(msg => msg.delete({timeout: 10000}))
            }            
            await message.channel.bulkDelete(deleteCount + 1).catch(error => console.log(`Couldn't delete messages because of: ${error}`));
        } else {
                return message.channel.send({embed: {
                    description: `You must have the following permission(s): ` + "`MANAGE MANAGES`",
                    color: 10231598,
                    image: {
                        url: `attachment://no_perm.gif`,
                    },
                    files: [{
                        attachment: `./assets/no_perm.gif`,
                        name: `no_perm.gif`
                    }],
                }
            }).then(msg => msg.delete({timeout: 2000}))
        }
    }
}