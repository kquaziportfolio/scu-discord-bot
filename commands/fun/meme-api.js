const { MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);

module.exports = { 
    name: 'meme-api',
    description: 'Get memes from an API!',
    category: 'Fun',
	async execute (client, message, args) {
        
        let {body} = await superagent .get("https://some-random-api.ml/meme")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let memeEmbed = new MessageEmbed()
        .setTitle(`Here are some memes from the api!`)
        .setColor(client.config.school_color)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send(`<@${message.author.id}>`, {embed: memeEmbed});
    }
}