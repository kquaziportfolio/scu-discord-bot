const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);
const config = require('../../config.json');

module.exports = { 
    name: 'meme-api',
    description: 'Get memes from an API!',
    category: 'Fun',
	async execute (message, args) {
        message.delete();
        
        let {body} = await superagent .get("https://some-random-api.ml/meme")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let memeEmbed = new MessageEmbed()
        .setTitle(`Here are some memes from the api!`)
        .setColor(config.school_color)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send(`<@${message.author.id}>`, {embed: memeEmbed});
    }
}