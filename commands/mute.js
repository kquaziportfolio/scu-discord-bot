const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const ms = require('ms');
let sendMessage = require(`../modules/sendMessage.js`);

module.exports = {
	name: 'mute',
    description: 'Mute members!',
    usage: `${config.prefix}mute <@user> | [insert reason]`,
    guildOnly: true,
    async execute(message, args) {   
        message.delete();

        let isAdmin = require(`../modules/isAdmin.js`);

        if(isAdmin(message, false)) {
            // the mute code here
            let auditLogs = message.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs);

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!user) return message.channel.send({embed: { 
                color: 10231598,
                title: "Mute Command",
                description: `Here's an example: ${config.prefix}mute <@DiHydrogenMonoxide | Being Admin`,
                timestamp: new Date(),
            }});
    
            let Time = args.slice(1).join(" ")
            if (!Time) Reason = "No time given!"
    
            let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
            if(!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#514f48",
                        permissions: []
                    }
                    })
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.updateOverwrite(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false
                        });
                      });
                } catch(e) {
                    sendMessage(client, config.channels.auditlogs, e.stack);
                }
            }
            
            let time = args[1];
            if(!time) {
                if (user.roles.cache.has(muterole.id)) return message.channel.send({embed: { description: "The user id still muted.", color: 10231598}})
                await (user.roles.add(muterole.id).catch(err => console.log(`Error: ${err}`)))
                //return message.channel.send(`${user.user.tag} is now muted.`);
                const muteEmbed = new MessageEmbed()
                .setTitle(`You have muted the user ${user.user.username}!`)
                endMessage(client, config.channels.auditlogs, muteEmbed);
    
            } else {
                if (user.roles.cache.has(muterole.id)) return message.channel.send({embed: {description: `${user.user.username} still muted.`, color: 10231598}})
                await (user.roles.add(muterole.id).catch(err => console.log(`Error: ${err}`)))
    
                let timer = setTimeout(function() {
                    user.roles.remove(muterole.id).catch(err => console.log(`Error: ${err}`));
                    const unmuteEmbed = new MessageEmbed()
                    .setTitle(`${user.user.username} is now unmuted!`)
                    endMessage(client, config.channels.auditlogs, unmuteEmbed);
                }, ms(time))
    
                client.mute.set(message.author.id, timer);
                const auditEmbed = new MessageEmbed()
                .setTitle(`You have muted the user ${user.user.username}!`)
                .setDescription(`Time: ${ms(ms(time), {long: true})}`)
                sendMessage(client, config.channels.auditlogs, auditEmbed);   
            }
  
            /*mutee.roles.add(muterole).then(()=> {
                //message.delete()
                const Embed = new MessageEmbed()
                .setTitle(`You have muted the user ${mutee.user.username}!`)
                .setDescription(`Reason: ${Reason} \nTime: ${Time}`)
                message.channel.send(Embed)
            })*/
        }
    }
}