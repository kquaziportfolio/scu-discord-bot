const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'user-info',
	description: 'user-info!',
		execute(message, args) { 
            let user = message.mentions.users.first() || message.author;
            const get_avatar = user.displayAvatarURL();
            const embed = new Discord.MessageEmbed()
                .setTitle('User Information')
                .setColor(10231598)
                .setThumbnail(`${get_avatar}`)
                .setDescription(`\n• **Created At:** ${user.createdAt}\n• **Your Username:** <@${user.id}>\n• **Your Tag:** ${user.tag}` +
                `\n• **Your Locale:** ${user.locale}\n• **Your Status:** ${user.show_activity}\n• **Bot? (true/false)**: ${user.bot}\n• **Verification:** ${user.verified}`);
                message.channel.send(embed);
        }
}