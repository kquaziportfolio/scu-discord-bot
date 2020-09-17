const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'unmute',
    description: 'To unmute members!',
    usage: `${config.prefix}unmute [user mention]`,
    guildOnly: true,
    async execute(message, args) {  
        message.delete();

        let sendMessage = require(`../modules/sendMessage.js`);
        let isAdmin = require(`../modules/isAdmin.js`);

        if(isAdmin(message, false)) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!user) return message.channel.send({embed: {description: "Please mention someone to unmute", color: config.school_color}})

            let Reason = args.slice(1).join(" ")
            if (!Reason) Reason = "No reason given!"

            let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
            if(!muterole) return message.channel.send({embed:{ description: "Couldn't find the **Muted** role.", color: config.school_color}});

            if (!user.roles.cache.find(x => x.name === "Muted")) return message.channel.send({embed: { description: "The user is not muted.", color: config.school_color}})

            await user.roles.remove(muterole.id).catch(err => console.log(`Error ${err}`));
            await clearTimeout(client.mute.get(message.author.id));

            user.roles.remove(muterole);
            const Embed = new MessageEmbed()
            .setTitle(`You have unmuted the user ${user.user.username}!`)
            .setDescription(`Reason: ${Reason}`)

            sendMessage(client, config.channels.auditlogs, Embed)
        } 
    }
}   