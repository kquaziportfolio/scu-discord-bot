const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'bird',
    description: 'Get bird pictures from an API!',
    usage: `${config.prefix}bird`,
	async execute (message, args) {
        message.delete();
        
        let {body} = await superagent .get("https://some-random-api.ml/img/birb")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let birdEmbed = new MessageEmbed()
        .setTitle(`Here are some birds!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send(`Fetching from the api...`).then(msg => { message.channel.send(birdEmbed)});
    }
}