const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);

module.exports = { 
    name: 'pat',
	description: 'pat!',
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/animu/pat")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let patEmbed = new Discord.MessageEmbed()
        .setTitle(`Pat!`)
        .setColor(10231598)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: patEmbed});
    }
}