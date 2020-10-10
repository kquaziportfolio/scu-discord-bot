const { MessageEmbed } = require(`discord.js`); //for embed functionality
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
	name: 'ban',
    description: 'Ban a member!',
    args: true,
    usage: `[@user mention] [reason]`, 
    category: 'Admin',  
	async execute(client, message, args) {   

        let isAdmin = require(`../../modules/isAdmin.js`);
        
        if(isAdmin(client, message, false)) {
            // the ban code here

            const member = message.mentions.members.first();

            if(!member.bannable) return message.channel.send({embed: {
                description: "I can't ban this user!",
                color: client.config.school_color
                }
            }).then(msg => msg.delete(2000))

            if(member.user.id === client.config.serverRoles.owner) 
                return message.channel.send({embed: {
                    description: "I can't ban my owner!",
                    color: client.config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000}))

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't ban yourself!`,
                color: client.config.school_color
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
                   .setColor(client.config.school_color)
                   .setTitle(`Ban | ${member.user.tag}`)
                   .addField("User", member, true)
                   .addField("Moderator", message.author, true)
                   .addField("Reason", reason)
                   .setTimestamp()
   
               sendMessage(client, client.config.channels.auditlogs, ban_card);
            }
        } 
    }
}