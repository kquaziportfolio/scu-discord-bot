const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = (message) => { // >ping
    const ping_time = new Date().getTime() - message.createdTimestamp + ` ms!`;
    const embed = new MessageEmbed()
        .setColor(10231598)
        .setTitle(`Ping`)
        .setDescription(emojiCharacters.pong + `Pong! My ping time is  ` + ping_time)
        .setImage(`https://images-na.ssl-images-amazon.com/images/I/61c34u91qcL._AC_SX466_.jpg`)
        message.channel.send(embed);
} 