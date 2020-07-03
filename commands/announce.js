const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'announce',
    description: 'announce!',   
    async execute(message, args) {
        if ((message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod']))) {
            const announceInstructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle("Announcements Command")
                .addField("Description:", `Public announcements`)
                .addField("Usage:", "`>announce [channel id] ~ [mentions] ~ [title] ~ [description] ~ [image url]`")
                .addField("Example:", ">announce  726585970799149149 ~ <@Role1> <@User1> ~ Hi! ~ Welcome to the server! ~ https://jasonanhvu.github.io/assets/img/logo-pic.png")
                .setTimestamp();

                const prompt = args.join(' ').split(' ~ ');
                
                if(!prompt[4]) return message.channel.send(announceInstructions);

                let channelID = `${prompt[0]}`;
                let targetChannel = message.guild.channels.cache.get(channelID);
                if(targetChannel) targetChannel.send(`${prompt[1]}`,{embed : {color: 10231598, title: `${prompt[2]}`, description: `${prompt[3]}`, image: { url: `${prompt[4]}`}}});
        } else {
                const permission_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, an error happened...`)
                .setDescription(`You don't have permission to perform this command!`)
                .setImage(`attachments://no_perm.gif`)
                .attachFiles(`./assets/no_perm.gif`)
                .setTimestamp()
                message.channel.send(permission_embed)
                .then(msg => {
                    msg.delete({ timeout: 2000 })
                })
                .catch(err => console.log(`Error: ${err}`));
        } 
    }
}