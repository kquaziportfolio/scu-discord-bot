const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'announce',
    description: 'announce!',   
    async execute(message, args) {
        if (message.member.roles.cache.some(role => role.name == ['Admin' || 'Mod'])) {
            const announceInstructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle("Announcements Command")
                .addField("Description:", `Public announcements`, true)
                .addField("Usage:", "`>announce [title] / [description]`", true)
                .addField("Example:", "`>announce Hi! / Welcome to the server!`")
                .setTimestamp();

                const prompt = args.join(' ').split('/');

                const announce_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`${prompt[0]}`)
                .setDescription(`${prompt[1]}`)
                .setFooter('Brought to you by the creators of this Discord server.')
                
                if (!prompt[0] && !prompt[1]) {
                    message.channel.send(announceInstructions)
                    .then(msg => msg.delete({timeout: 10000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (prompt[0] && !prompt[1]) {
                    message.channel.send({ embed: {
                        description: `You must enter all arguments to display the embed!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && prompt[1]) {
                    message.channel.send({ embed: {
                        description: `You must enter all arguments to display the embed!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                }
                else {
                    message.channel.send(announce_embed);
                }
            } else {
                const permission_embed = new Discord.MessageEmbed()
                .setColor(10231598)
                .setTitle(`Oops, an error happened...`)
                .setDescription(`You don't have permission to perform this command!`)
                .setImage(`https://media1.tenor.com/images/9277c9be9e3d7a953bb19bfacf8c1abf/tenor.gif?itemid=12620128`)
                .setTimestamp()
                message.channel.send(permission_embed)
                .then(msg => {
                    msg.delete({ timeout: 2000 })
                })
                .catch(err => console.log(`Error: ${err}`));
            } 
        }
    }