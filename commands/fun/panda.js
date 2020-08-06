const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'panda',
    description: 'Get cute panda pictures!',
    usage: `${prefix}panda`,
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/img/panda")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let pandaEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some pandas!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: pandaEmbed});
    }
}