const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'user-stats',
	description: 'user-stats!',
		execute(message, args) { 
            let user = message.mentions.users.first() || message.author;
            const get_avatar = user.displayAvatarURL();
            const embed = new MessageEmbed()
                .setTitle('User Information')
                .setColor(10231598)
                .setImage(`${get_avatar}`)
                .setDescription(`\nCreated At: ${user.createdAt}\nYour Username: ${user.username}\nYour Tag: ${user.tag}` +
                `\nYour Presence: ${user.presence.status}\nBot? (true/false): ${user.bot}\nYour Avatar:`);
                message.channel.send(embed);
        }
}