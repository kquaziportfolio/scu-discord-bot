const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'koala',
    description: 'Get cute koala pictures here!',
    usage: `${config.prefix}koala`,
	async execute (message, args) {
        message.delete();

        let {body} = await superagent .get("https://some-random-api.ml/img/koala")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let koalaEmbed = new MessageEmbed()
        .setTitle(`Here are some koalas!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: koalaEmbed});
    }
}