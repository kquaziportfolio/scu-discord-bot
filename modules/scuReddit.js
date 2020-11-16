module.exports.run = async (client) => {

const { MessageEmbed } = require(`discord.js`);
const request = require('request');
const entities = require('entities');
const validUrl = require('valid-url');
const sendMessage = require(`../modules/sendMessage.js`);
const botReady = true;
const subredditUrl = `https://www.reddit.com/r/scu/new.json?limit=10`;

setInterval(() => {
  if (botReady) {
    request({
      url: subredditUrl,
      json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        for (const post of body.data.children.reverse()) {
          if (lastTimestamp <= post.data.created_utc) {
            lastTimestamp = post.data.created_utc;

            const scuRedditEmbed = new MessageEmbed()
            .setColor(client.config.school_color)
            .setTitle(`${post.data.link_flair_text ? `[${post.data.link_flair_text}] ` : ''}${entities.decodeHTML(post.data.title)}`)
            .setURL(`https://redd.it/${post.data.id}`)
            .setDescription(`${post.data.is_self ? entities.decodeHTML(post.data.selftext.length > 253 ? post.data.selftext.slice(0, 253).concat('...') : post.data.selftext) : ''}`)
            .setThumbnail(validUrl.isUri(post.data.thumbnail) ? entities.decodeHTML(post.data.thumbnail) : null)
            .setFooter(`${post.data.is_self ? 'self post' : 'link post'} by ${post.data.author}`)
            .setTimestamp(new Date(post.data.created_utc * 1000))

            sendMessage(client, client.config.channels.updates, scuRedditEmbed);
          }
        }
        ++lastTimestamp;
      } else {
        sendMessage(client, client.config.channels.auditlogs, 'Request failed - reddit could be down or subreddit doesn\'t exist. Will continue.');
      }
    });
  }
}, 60 * 1000); // get new posts every 60 seconds
}
