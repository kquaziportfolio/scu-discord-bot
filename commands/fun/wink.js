const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const { prefix } = require('../config.json');

module.exports = { 
    name: 'wink',
    description: 'Get pictures of characters winking here!',
    usage: `${prefix}wink`,
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/animu/wink")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let winkEmbed = new Discord.MessageEmbed()
        .setTitle(`Wink!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: winkEmbed});
    }
}