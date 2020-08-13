const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../config.json');

module.exports = { 
    name: 'dog',
    description: 'Get dog pictures here!',
    usage: `${config.prefix}dog`,
	async execute (message, args) {
        message.delete();
        
        let {body} = await superagent 
        .get("https://dog.ceo/api/breeds/image/random")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let dogEmbed = new MessageEmbed()
        .setTitle(`Here are some dogs!`)
        .setColor(config.school_color)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: dogEmbed});
    }
}