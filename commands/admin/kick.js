const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
    description: 'Kick a member!',
    guildOnly: true,
    usage: `${prefix}kick [user mention] [reason]`,
	async execute(message, args) {   
        if(message.member.hasPermission("KICK_MEMBERS")) {
            // the kick code here

            const kickInstructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .addField("Here's an example:", "&kick <@401542675423035392> Being Admin")
                .setTimestamp()

            const member = message.mentions.members.first();
            if(!member) return message.channel.send(kickInstructions)
            .then(msg => msg.delete({timeout: 10000}))
            .catch(err => console.log(`Error: ${err}`))

            if(!member.kickable) return message.channel.send({embed: {
                description: "I can't kick this user!",
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))
            
            if(member.user.id === "401542675423035392" || member.user.id === "403377362730876928") 
                return message.channel.send({embed: {
                    description: "I can't kick my owner!",
                    color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't kick yourself!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            const reason = args.slice(1).join(" ");

            if(!reason) {
                message.channel.send(`You must provide a reason to kick the user!`)
                .then(msg => msg.delete({timeout: 2000}))
            } else {
                reason_card = reason;
            }

            await member.kick(reason)
            .catch(err => console.log(`Error: ${err}`))

            const kick_card = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Kick | ${member.user.tag}`)
                .addField("User", member, true)
                .addField("Moderator", message.author, true)
                .addField("Reason", reason_card)
                .setTimestamp()

            message.channel.send(kick_card);
        } else {
            return message.channel.send({embed: {
                description: `You must have the following permission(s): ` + "`KICK MEMBERS`",
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
            .catch(err => console.log(`Error: ${err}`))
        }
    }
}