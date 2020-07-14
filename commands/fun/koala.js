const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);

module.exports = { 
    name: 'koala',
	description: 'koala!',
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/img/koala")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let koalaEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some koalas!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: koalaEmbed});
    }
}