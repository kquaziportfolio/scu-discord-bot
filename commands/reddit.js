const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const got = require(`got`);

module.exports = {
	name: 'reddit',
    description: 'Get hot Reddit posts from any subreddit!',
    usage: `${config.prefix}reddit [name of subreddit]`,
		async execute(message, args) {  
            message.delete();

            const subreddit = message.content.split(' ')[0];

            if (subreddit.length < 1) return message.channel.send({ embed: { description: `Here's an example ${config.prefix}reddit SCU`}});
            
            got(`https://www.reddit.com/r/${subreddit}/hotzz`).then(response => {
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
                const embed = new MessageEmbed()
                    .setTitle(`${title}`)
                    .setURL(`${url}`)
                    .setAuthor(`${subreddit_name} | u/${author}`)
                    .setImage(`${image}`)
                    .setColor(config.school_color)	
                    .setDescription(`${selftext}`)
                    .setFooter(`${emojiCharacters.up} ${ups} | ${emojiCharacters.down} ${downs} | ${emojiCharacters.comment} ${num_comments}`)
                message.channel.send(embed)
                .then(sent => console.log(`\n`))
                }).catch(console.error);
            }
}