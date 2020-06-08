const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = (message) => {  
    const embed = new MessageEmbed()
    .setColor(10231598)
    .setTitle(`SCU Motto`)
    .setDescription(`Ad Majorem Dei Gloriam - For the Greater Glory of God`)
    .setImage(`https://www.scu.edu/media/offices/umc/Mission-Exterior-01-1160x652.png`)
    message.channel.send(embed);
}