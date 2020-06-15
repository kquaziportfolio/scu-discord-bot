const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'unban',
	description: 'unban!',
	async execute(message, args) {   
        if(message.member.hasPermission("BAN_MEMBERS")) {
            // the ban code here

            const unban_Instructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle("Unban Command")
                .addField("Description:", `Unban a member`, true)
                .addField("Usage:", "`>unban [user mention]`", true)
                .addField("Example:", "`>unban <@401542675423035392>`")
                .setTimestamp()
            
            const member = message.mentions.members.first();
            if(!member) return message.channel.send(unban_Instructions)
                .then(msg => msg.delete({timeout: 10000}))
                .catch(err => console.log(`Error: ${err}`))

            const unban_card = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Unbanned | ${member.user.tag}`)
                .addField("User", member, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()

                message.guild.fetchBans().then(bans => {
                    bans.forEach(user => {
                        user.send({embed: {
                            title: "You've been unbanned.",
                            description: `You've been unbanned. Here's the [invite](https://discord.gg/YusWdfu)`
                        }});
                        message.guild.unban(user);
                        message.channel.send(unban_card);
                    });
                }).catch(err => `Error: ${err}`)
        } else {
            return message.channel.send({embed: {
                description: "You do not have sufficient permissions to run this command!",
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))
        }
    }
}