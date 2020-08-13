const Discord = require(`discord.js`); //requires Discord.js integration package
const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'cat',
    description: 'Get cat pictures from an API!',
    usage: `${config.prefix}cat`,
	async execute (message, args) {
        message.delete();
        
        let {body} = await superagent.get("https://some-random-api.ml/img/cat")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let catEmbed = new MessageEmbed()
        .setTitle(`Here are some cats!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: catEmbed});
    }
}