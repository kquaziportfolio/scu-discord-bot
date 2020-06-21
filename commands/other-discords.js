const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'other-discords',
    description: 'for outputting other discord server embeds',   
    async execute(message, args) {
        if ((message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod']))) {
            const discordInstructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle("Other Discords Command")
                .addField("Description:", `For spitting out other Discord embeds`, true)
                .addField("Usage:", "`>other-discords [title] | [description]`", true)
                .addField("Example:", ">other-discord General SCU Server | [Join!](https://discord.gg/YusWdfu) | https://jasonanhvu.github.io/assets/img/logo-pic.png")
                .setTimestamp();

                const prompt = args.join(' ').split('|');
                
                if (!prompt[0] && !prompt[1] && !prompt[2]) {    
                    message.channel.send(announceInstructions)
                    .then(msg => msg.delete({timeout: 10000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (prompt[0] && !prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the description and image!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && prompt[1] && prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the title!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (prompt[0] && prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the image!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the title and image!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else {
                    const channel = message.guild.channels.cache.find(channel => channel.name === "other-discords")
                    channel.send({embed : {color: 10231598, title: `${prompt[0]}`, description: `${prompt[1]}`, thumbnail       : {url: `${prompt[2]}`}}});
                }
            } else {
                const permission_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, an error happened...`)
                .setDescription(`You don't have permission to perform this command!`)
                .setThumbnail(`attachments://no_perm.gif`)
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