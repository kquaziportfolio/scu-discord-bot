const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`);
const superagent = require(`superagent`);

module.exports = { 
    name: 'meme-api',
	description: 'meme-api!',
	async execute (message, args) {
        let {body} = await superagent .get("https://some-random-api.ml/meme")

        if(!{body}) return nmessage.channel.send("I broke! Try again!")

        let memeEmbed = new Discord.MessageEmbed()
        .setTitle(`Here are some memes from the api!`)
        .setColor(10231598)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(`Created by the server lords!`)

        message.channel.send({embed: memeEmbed});
    }
}