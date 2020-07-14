const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'admin',
    description: 'admin!',   
    async execute(message, args) {
        if ((message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod']))) {
                const admin_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Admin Commands`)
                .setDescription("`>announce`, `>ban`, `>dm`, `>kick`, `>mute`, `>other-discords`, `>poll`, `>purge`, `>roles-list`, `>rules`, `>server-info`, `>server-stats`, `>unmute`")
                .setFooter("Use `>` before each command!")
                message.channel.send(admin_embed)
            } else {
                const permission_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, an error happened...`)
                .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
                .attachFiles([`./assets/no_perm.gif`])
                .setImage(`attachment://no_perm.gif`)
                message.channel.send(permission_embed)
                .then(msg => {
                    msg.delete({ timeout: 2000 })
                })
                .catch(err => console.log(`Error: ${err}`));
            } 
        }
    }