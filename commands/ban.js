const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'ban',
	description: 'ban!',
	async execute(message, args) {   
        if(message.member.hasPermission("BAN_MEMBERS")) {
            // the ban code here

            let ban_Instructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle("Ban Command")
                .addField("Description:", `Ban a member`, true)
                .addField("Usage:", `>ban [user] [reason]`, true)
                .addField("Example:", `>ban <@401542675423035392> Being Admin`)

            let member = message.mentions.members.first();
            if(!member) return message.channel.send(ban_Instructions)
            .then(msg => msg.delete({timeout: 10000}))
            .catch(err => console.log(`Error: ${err}`))

            if(!member.bannable) return message.channel.send({embed: {
                description: "I can't ban this user!",
                color: 10231598
                }
            }).then(msg => msg.delete(2000))
            .catch(err => console.log(`Error: ${err}`))

            if(member.user.id === "401542675423035392" || member.user.id === "403377362730876928") return message.channel.send({embed: {
                description: "I can't ban my owner!",
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't ban yourself!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            let reason = args.slice(1).join(" ");

            if(!reason) {
                message.channel.send(`You must provide a reason to ban the user!`);
            } else {
                reason_card = reason;
            }

            await member.ban(reason)
            .catch(err => console.log(`Error: ${err}`))

            let ban_card = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Ban | ${member.user.tag}`)
                .addField("User", member, true)
                .addField("Moderator", message.author, true)
                .addField("Reason", reason_card)
                .setTimestamp()

            message.channel.send(ban_card);
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