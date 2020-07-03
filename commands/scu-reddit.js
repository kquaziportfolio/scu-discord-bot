const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const got = require(`got`);

module.exports = {
	name: 'scu',
    description: 'scu!',
		execute(message, args) {   
            got(`https://www.reddit.com/r/SCU/random/.json`).then(response => {
                let content = JSON.parse(response.body);
                const title = content[0].data.children[0].data.title;
                const image = content[0].data.children[0].data.url;
                const selftext = content[0].data.children[0].data.selftext;
                const author = content[0].data.children[0].data.author;
                const url = content[0].data.children[0].data.url;
                const subreddit_name = content[0].data.children[0].data.subreddit_name_prefixed;
                const ups = content[0].data.children[0].data.ups;
                const downs = content[0].data.children[0].data.downs;
                const num_comments = content[0].data.children[0].data.num_comments;
                const scu_embed = new MessageEmbed()
                    .setTitle(`${title}`)
                    .setURL(`${url}`)
                    .setAuthor(`${subreddit_name} | u/${author}`)
                    .setImage(`${image}`)
                    .setColor(10231598)	
                    .setDescription(`${selftext}`)
                    .setFooter(`${emojiCharacters.up} ${ups} | ${emojiCharacters.down} ${downs} | ${emojiCharacters.comment} ${num_comments}`)
                message.channel.send(scu_embed)
                .then(sent => console.log(`\n`))
                }).catch(console.error);
            }
}