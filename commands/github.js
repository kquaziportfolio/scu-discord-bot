const fetch = require(`node-fetch`);
const { MessageEmbed } = require(`discord.js`);
const config = require('../config.json');

module.exports = {
    name: "github",
    description: "Get someone's GitHub profile information!",
    usage: `${config.prefix}github [username]`,
    async execute (message, args) {
        message.delete();

        try {
            const username = message.content.toLowerCase().split(" ")[1];
            let response = await fetch(`https://api.github.com/users/${username}`);
            let data = await response.json();

            const profileEmbed = new MessageEmbed()
                profileEmbed.setTitle(`__**${data.name}'s GitHub Profile**__`)
                profileEmbed.setDescription(`${data.bio}`)
                profileEmbed.setThumbnail(`https://avatars3.githubusercontent.com/u/${data.id}?v=4`)
                profileEmbed.addField(`Username`, data.login, true)
                profileEmbed.addField(`Company`, data.company || 'none', true)
                profileEmbed.addField(`Blog`, `[${data.name}](${data.blog})` || 'none', true)
                profileEmbed.addField(`Location`, data.location || 'none', true)
                profileEmbed.addField(`Public Repos`, data.public_repos || 'none', true)
                profileEmbed.addField(`Public Gists`, data.public_gists || 'none', true)
                profileEmbed.addField(`Followers`, data.followers || 'none', true)
                profileEmbed.addField(`Following`, data.following || 'none', true)
                profileEmbed.addField(`\u200B`, `\u200B`, true)
                profileEmbed.setColor(config.school_color)
                profileEmbed.setURL(data.html_url)

            if(!username[1]) return message.channel.send({embed: { description: "Please enter the person's username!", color: config.school_color}});

            message.channel.send(profileEmbed);
        } catch(err) {
            message.channel.send({embed: {description: `User does not exist.`, color: config.school_color}})
			.then(msg => msg.delete({timeout: 5000}))
			.catch(err => `Error: ${err}`)
        }
    }
}
