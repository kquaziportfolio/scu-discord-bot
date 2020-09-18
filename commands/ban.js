const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
let sendMessage = require(`../modules/sendMessage.js`);

module.exports = {
	name: 'ban',
    description: 'Ban a member!',
    args: true,
    usage: `[@user mention] [reason]`,
    guildOnly: true,
	async execute(message, args) {   
        message.delete();

        let isAdmin = require(`../modules/isAdmin.js`);
        
        if(isAdmin(message, false)) {
            // the ban code here

            const member = message.mentions.members.first();

            if(!member.bannable) return message.channel.send({embed: {
                description: "I can't ban this user!",
                color: config.school_color
                }
            }).then(msg => msg.delete(2000))

            if(member.user.id === "401542675423035392" || member.user.id === "403377362730876928") 
                return message.channel.send({embed: {
                    description: "I can't ban my owner!",
                    color: config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000}))

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't ban yourself!`,
                color: config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000}))

            const reason = args.slice(1).join(" ");

            if(!reason) {
                message.channel.send(`You must provide a reason to ban the user!`)
                .then(msg => msg.delete({timeout: 2000}))
            } else {
               await member.ban(reason)
               .catch(err => console.log(`Error: ${err}`))
   
               const ban_card = new MessageEmbed()
                   .setColor(config.school_color)
                   .setTitle(`Ban | ${member.user.tag}`)
                   .addField("User", member, true)
                   .addField("Moderator", message.author, true)
                   .addField("Reason", reason)
                   .setTimestamp()
   
               sendMessage(client, config.channels.auditlogs, ban_card);
            }
        } 
    }
}