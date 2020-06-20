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
                .addField("Description:", `Public announcements`, true)
                .addField("Usage:", "`>announce [user ids] | [title] | [description]`", true)
                .addField("Example:", ">announce <@Role1> <@User1> | Hi! | Welcome to the server!`")
                .setTimestamp();

                const prompt = args.join(' ').split('|');
                
                if (!prompt[0] && !prompt[1] && !prompt[2]) {    
                    message.channel.send(announceInstructions)
                    .then(msg => msg.delete({timeout: 10000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (prompt[0] && !prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the user mentions/roles!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && prompt[1] && prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the title and description!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (prompt[0] && prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the description!!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the title!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                } else if (!prompt[0] && !prompt[1] && !prompt[2]) {
                    message.channel.send({ embed: {
                        description: `You must enter the user mentions/roles and title!`,
                        color: 10231598
                        }
                    }).then(msg => msg.delete({timeout: 2000}))
                    .catch(error => console.log(`Error: ${error}`))
                }
                else {
                    const channel = message.guild.channels.cache.find(channel => channel.name === "announcements")
                    channel.send(`${prompt[0]}`,{embed : {color: 10231598, title: `${prompt[1]}`, description: `${prompt[2]}`}});
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