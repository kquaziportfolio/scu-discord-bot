const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'apostles-creed',
	description: 'apostles-creed!',
		execute(message, args) { 
    const embed = new MessageEmbed()
        .setTitle(`Apostles' Creed`)
        .setColor(10231598)
        .setImage(`https://www.drivethruhistory.com/wp-content/uploads/2016/07/Twelve-Apostles-of-Jesus.png`)
        .setDescription('I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ,' +
                        ' His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary,' + 
                        ' suffered under Pontius Pilate, was crucified, died, and was buried. He descended into Hell;' +
                        ' On the third day He rose again from the dead; He ascended into Heaven, and sitteth at the' +
                        ' right hand of God, the Father almighty; from thence He shall come to judge the living and' +
                        ' the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints,' +
                        ' the forgiveness of sins, the resurrection of the body and life everlasting.')
        message.channel.send(embed);
    }
}