const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'server-info',
    description: 'server-info!',
		execute(message, args) { 
            const serverEmbed = new MessageEmbed()
                .setTitle("Server Information")
                .setDescription("__**Discord Etiquette**__\n-To notify only the members of a specific majors use @ followed by the name of the major. Read Discord's Terms of Service here: https://discord.com/terms\n\n__**Roles**__\nTo be assigned a role simply make a post in #intros and tell us your name, where you're from, any hobbies / interests you might have, and your major or what you got your degree in.\n\nStudent Organizations with a sizeable populous within the server may request their own channel.\n\n__**Permanent Invite Link**__\nhttps://discord.gg/YusWdfu\n\n__**Questions / Concerns / Inquiries**__\nMessage @benrito or  @JV | Phở Eating Intern | CSE '24 or ping away in #suggestions \n\n__**Resources**__\nHere is a list of resources that SCU currently offers, use them to your advantage! \n\nhttps://www.scu.edu/ecp/current-students/university-resources/\n")
                .setColor(10231598)
                .setImage("https://cdn.discordapp.com/attachments/709118412542050368/711778672092119080/scu-seal-redbg.png")
                .setTimestamp()
                .setFooter("Created by the server lords!")
            message.channel.send(serverEmbed);
        }
}