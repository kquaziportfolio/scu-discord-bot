const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = (message) => { 
    const embed = new MessageEmbed()
                .setColor(10231598)
                .setTitle(`Foo`)
                .setDescription(emojiCharacters.bar + ` Bar!`)
                .setImage(`https://4f39zz3w9kga2mxwan2t1zsc-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/D6h5AFjWAAAsDK2-1024x512.jpg`)
                message.channel.send(embed);
}