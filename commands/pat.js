const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'pat',
    description: 'Get cute pictures of characters getting pats on the head!',
    usage: `${config.prefix}pat`,
	async execute (message, args) {
        message.delete();

        let {body} = await superagent .get("https://some-random-api.ml/animu/pat")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let patEmbed = new MessageEmbed()
        .setTitle(`Pat!`)
        .setColor(config.school_color)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: patEmbed});
    }
}