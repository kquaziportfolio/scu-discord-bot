const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'fox',
    description: 'Get fox pictures!',
    usage: `${config.prefix}fox`,
	async execute (message, args) {
        let {body} = await superagent 
        .get("https://randomfox.ca/floof/?ref=apilist.fun")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let foxEmbed = new MessageEmbed()
        .setTitle(`Here are some foxes!`)
        .setColor(config.school_color)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: foxEmbed});
    }
}