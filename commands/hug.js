const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'hug',
    description: 'Get hug pictures here!',
    usage: `${config.prefix}hug`,
	async execute (message, args) {
        message.delete();

        let {body} = await superagent .get("https://some-random-api.ml/animu/hug")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let hugEmbed = new MessageEmbed()
        .setTitle(`Hug!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: hugEmbed});
    }
}