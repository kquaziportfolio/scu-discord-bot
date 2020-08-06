const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require(`node-fetch`);
const { Client, MessageEmbed } = require(`discord.js`);
const { prefix } = require('../config.json');

module.exports = {
    name: "github",
    description: "Get someone's GitHub profile information!",
    usage: `${prefix}github [username]`,
    async execute (message, args) {
        try {
            const username = message.content.toLowerCase().split(" ")[1];
            let response = await fetch(`https://api.github.com/users/${username}`);
            let data = await response.json();

            const profileEmbed = new MessageEmbed()
                profileEmbed.setTitle(`__**${data.name}'s GitHub Profile**__`)
                profileEmbed.setDescription(`${data.bio}`)
                profileEmbed.setThumbnail(`https://avatars3.githubusercontent.com/u/${data.id}?v=4`)
                profileEmbed.addField(`Username`, data.login, true)
                profileEmbed.addField(`Company`, data.company, true)
                profileEmbed.addField(`Blog`, `[${data.name}](${data.blog})`, true)
                profileEmbed.addField(`Location`, data.location, true)
                profileEmbed.addField(`Public Repos`, data.public_repos, true)
                profileEmbed.addField(`Public Gists`, data.public_gists, true)
                profileEmbed.addField(`Followers`, data.followers, true)
                profileEmbed.addField(`Following`, data.following, true)
                profileEmbed.addField(`\u200B`, `\u200B`, true)
                profileEmbed.setColor(10231598)
                profileEmbed.setURL(data.html_url)

            if(!username[1]) return message.channel.send({embed: { description: "Please enter the person's username!", color: 10231598}});

            message.channel.send(profileEmbed);
        } catch(err) {
            message.channel.send({embed: {description: `User does not exist.`, color: 10231598}})
			.then(msg => msg.delete({timeout: 5000}))
			.catch(err => `Error: ${err}`)
        }
    }
}