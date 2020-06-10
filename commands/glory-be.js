const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = async (message) => {
    const embed = new MessageEmbed()
        .setTitle(`Glory Be`)
        .setColor(10231598)
        .setImage(`https://media.swncdn.com/cms/CCOM/68488-cross-sunset-light.1200w.tn.jpg`)
        .setDescription('Glory be to the Father, and to the Son, and to the Holy Spirit, as it' +
                        ' was in the beginning, is now, and ever shall be, world without end. Amen.')
        message.channel.send(embed);
}