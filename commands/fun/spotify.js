const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'spotify',
    description: 'spotify!',
		async execute(message, args) { 
            let user = message.mentions.users.first() || message.author;

            if (user.presence.activity != null && user.presence.activity.type === "LISTENING" && user.presence.activity.name === "Spotify" &&
            user.presence.activity.assets != null) {
                let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`;
                let trackName = user.presence.activity.details;
                let trackAuthor = user.presence.activity.state;
                let trackAlbum = user.presence.activity.assets.largeText;

                const embed = new Discord.MessageEmbed()
                .setAuthor(`Spotify Track Info`, `https://cdn.discordapp.com/emojis/408668371039682560.png`)
                .setColor(10231598)
                .setThumbnail(trackIMG)
                .addField('Song Name', trackName, true)
                .addField('Album', trackAlbum, true)
                .addField('Author', trackAuthor, false)
                .addField(`Listen to Track`, `[\`${trackURL}\`](trackURL)`, false)

                message.channel.send(embed);
            } else {
                message.channel.send({embed: {title: `User's Spotify Status`, description: `**<@${user.id}> isn't listening to Spotify!**`, color: 10231598, timestamp: new Date()}})
            }
        }
}