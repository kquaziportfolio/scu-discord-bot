const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);

module.exports = { 
    name: 'cat',
	description: 'cat!',
	async execute (message, args) {
        let {body} = await superagent .get("https://aws.random.cat/meow")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let catEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some cats!`)
        .setColor(10231598)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: catEmbed});
    }
}