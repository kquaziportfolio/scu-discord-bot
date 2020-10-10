const { MessageEmbed } = require(`discord.js`); //for embed functionality

module.exports = {
	name: 'unmute',
    description: 'To unmute members!',
    args: true,
    usage: `[@user mention] [reason]`, 
    category: 'Admin',  
        async execute(client, message, args) {  

            let sendMessage = require(`../../modules/sendMessage.js`);
            let isAdmin = require(`../../modules/isAdmin.js`);

            if(isAdmin(message, false)) {
                let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                let Reason = args.slice(1).join(" ")

                let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
                if(!muterole) return message.channel.send({embed:{ description: "Couldn't find the **Muted** role.", color: client.config.school_color}});

                if (!user.roles.cache.find(x => x.name === "Muted")) return message.channel.send({embed: { description: "The user is not muted.", color: client.config.school_color}})

                await user.roles.remove(muterole.id).catch(err => console.log(`Error ${err}`));
                await clearTimeout(client.mute.get(message.author.id));

                user.roles.remove(muterole);
                const Embed = new MessageEmbed()
                .setTitle(`You have unmuted the user ${user.user.username}!`)
                .setDescription(`Reason: ${Reason}`)

                sendMessage(client, client.config.channels.auditlogs, Embed)
            } 
        }
}   