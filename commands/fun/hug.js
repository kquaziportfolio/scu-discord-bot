const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'hug',
    description: 'Get hug pictures here!',
    usage: `${prefix}hug`,
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/animu/hug")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let hugEmbed = new Discord.MessageEmbed()
        .setTitle(`Hug!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: hugEmbed});
    }
}