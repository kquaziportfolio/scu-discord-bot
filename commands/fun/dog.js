const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'dog',
    description: 'Get dog pictures here!',
    usage: `${prefix}dog`,
	async execute (message, args) {
        let {body} = await superagent 
        .get("https://dog.ceo/api/breeds/image/random")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let dogEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some dogs!`)
        .setColor(10231598)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: dogEmbed});
    }
}