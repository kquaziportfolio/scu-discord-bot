const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const got = require(`got`);

module.exports = {
	name: 'jojo',
    description: 'jojo!',
		execute(message, args) {   
            got(`https://www.reddit.com/r/StardustCrusaders/random/.json`).then(response => {
                let content = JSON.parse(response.body);
                const jojo_title = content[0].data.children[0].data.title;
                const jojo_image = content[0].data.children[0].data.url;
                const jojo_selftext = content[0].data.children[0].data.selftext;
                const jojo_author = content[0].data.children[0].data.author;
                const jojo_url = content[0].data.children[0].data.url;
                const jojo_subreddit_name = content[0].data.children[0].data.subreddit_name_prefixed;
                const jojo_ups = content[0].data.children[0].data.ups;
                const jojo_downs = content[0].data.children[0].data.downs;
                const jojo_num_comments = content[0].data.children[0].data.num_comments;
                const jojo_embed = new MessageEmbed()
                    .setTitle(`${jojo_title}`)
                    .setAuthor(`${jojo_subreddit_name} | u/${jojo_author}`)
                    .setURL(`${jojo_url}`)
                    .setImage(`${jojo_image}`)
                    .setColor(10231598)	
                    .setDescription(`${jojo_selftext}`)
                    .setFooter(`${emojiCharacters.up} ${jojo_ups} | ${emojiCharacters.down} ${jojo_downs} | ${emojiCharacters.comment} ${jojo_num_comments}`)
                message.channel.send(jojo_embed)
                .then(sent => console.log(`\n`))
                }).catch(console.error);	
        }
}