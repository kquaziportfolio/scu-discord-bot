const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'bird',
    description: 'Get bird pictures from an API!',
    usage: `${prefix}bird`,
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/img/birb")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let birdEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some birds!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send(`Fetching from the api...`).then(msg => { message.channel.send(birdEmbed)});
    }
}