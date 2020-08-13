const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'panda',
    description: 'Get cute panda pictures!',
    usage: `${config.prefix}panda`,
	async execute (message, args) {
        message.delete();
        
        let {body} = await superagent .get("https://some-random-api.ml/img/panda")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let pandaEmbed = new MessageEmbed()
        .setTitle(`Here are some pandas!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: pandaEmbed});
    }
}