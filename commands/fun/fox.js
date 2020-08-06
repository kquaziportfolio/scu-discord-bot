const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'fox',
    description: 'Get fox pictures!',
    usage: `${prefix}fox`,
	async execute (message, args) {
        let {body} = await superagent 
        .get("https://randomfox.ca/floof/?ref=apilist.fun")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let foxEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some foxes!`)
        .setColor(10231598)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: foxEmbed});
    }
}