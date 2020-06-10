const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = async (message) => {
    const embed = new MessageEmbed()
			.setTitle(`Our Father`)
			.setColor(10231598)
			.setImage(`https://www.acatholic.org/wp-content/uploads/god-500x389.jpg`)
			.setDescription('Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily' +
			' bread; and forgive  us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.') 
            message.channel.send(embed);
}