const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const got = require(`got`);

module.exports = (message) => {
    got(`https://www.reddit.com/r/SCU/random/.json`).then(response => {
        let content = JSON.parse(response.body);
        const scu_title = content[0].data.children[0].data.title;
        const scu_image = content[0].data.children[0].data.url;
        const scu_selftext = content[0].data.children[0].data.selftext;
        const scu_author = content[0].data.children[0].data.author;
        const scu_url = content[0].data.children[0].data.url;
        const scu_subreddit_name = content[0].data.children[0].data.subreddit_name_prefixed;
        const scu_ups = content[0].data.children[0].data.ups;
        const scu_downs = content[0].data.children[0].data.downs;
        const scu_num_comments = content[0].data.children[0].data.num_comments;
        const scu_embed = new MessageEmbed()
            .setTitle(`${scu_title}`)
            .setURL(`${scu_url}`)
            .setAuthor(`${scu_subreddit_name} | u/${scu_author}`)
            .setImage(`${scu_image}`)
            .setColor(10231598)	
            .setDescription(`${scu_selftext}`)
            .setFooter(`${emojiCharacters.up} ${scu_ups} | ${emojiCharacters.down} ${scu_downs} | ${emojiCharacters.comment} ${scu_num_comments}`)
        message.channel.send(scu_embed)
        .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        }).catch(console.error);
    }