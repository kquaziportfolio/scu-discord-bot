const fetch = require(`node-fetch`);
const { MessageEmbed } = require(`discord.js`);
const config = require('../config.json');
let sendMessage = require(`../modules/sendMessage.js`);

module.exports = {
    name: "github",
    description: "Get someone's GitHub profile information!",
    args: true,
    usage: `[username]`,
    async execute (message, args) {
        message.delete();

        try {
            const username = args[0].toLowerCase().split(" ");
            let response = await fetch(`https://api.github.com/users/${username}`);
            let data = await response.json();

            const profileEmbed = new MessageEmbed()
                profileEmbed.setTitle(`__**${data.name}'s GitHub Profile**__`)
                profileEmbed.setDescription(`${data.bio}`)
                profileEmbed.setThumbnail(`https://avatars3.githubusercontent.com/u/${data.id}?v=4`)
                profileEmbed.addField(`Username`, data.login, true)
                profileEmbed.addField(`Company`, data.company || 'none', true)
                profileEmbed.addField(`Blog`, `[${data.name}](${data.blog})` || 'none', true)
                profileEmbed.addField(`Location`, data.location|| 'none', true)
                profileEmbed.addField(`Public Repos`, data.public_repos|| 'none', true)
                profileEmbed.addField(`Public Gists`, data.public_gists|| 'none', true)
                profileEmbed.addField(`Followers`, data.followers|| 'none', true)
                profileEmbed.addField(`Following`, data.following|| 'none', true)
                profileEmbed.addField(`\u200B`, `\u200B`, true)
                profileEmbed.setColor(config.school_color)
                profileEmbed.setURL(data.html_url)

            message.channel.send(profileEmbed);
        } catch(err) {
            sendMessage(client, config.channels.auditlogs, {embed: {description: `The following user - ${username} - does not exist.`, color: config.school_color}})
			.catch(err => `Error: ${err}`)
        }
    }
}