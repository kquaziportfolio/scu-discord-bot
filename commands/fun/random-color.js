const Discord = require('discord.js');
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const client = new Discord.Client();

module.exports = {
    name: 'random-color', //forked from Raptor SA
    description: 'random color generator!', //here is a change in the file
        async execute (message, args) {
            const randomNumber = Math.floor(Math.random()*16777215).toString(16);

            function hexToDec(randomNumber){
                return parseInt(randomNumber, 16);
            }

            const randomNumberEmbed = new Discord.MessageEmbed()
            .setColor(randomNumber)
            .setTitle(`Here's your random color!`)
            .setDescription(`- Hexadecimal Value: #${randomNumber}\n` + "- Decimal Value: " + hexToDec(randomNumber))
            .setFooter(`Brought to you by the server lords!`)
            .setTimestamp()

            await message.channel.send(randomNumberEmbed).catch(err => `Error: ${err}`)
        }
}