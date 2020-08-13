const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'wink',
    description: 'Get pictures of characters winking here!',
    usage: `${config.prefix}wink`,
	async execute (message, args) {
        message.delete(); 

        let {body} = await superagent .get("https://some-random-api.ml/animu/wink")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let winkEmbed = new MessageEmbed()
        .setTitle(`Wink!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: winkEmbed});
    }
}