module.exports.run = async (client) => { 
  const { MessageEmbed } = require(`discord.js`);
  const request = require(`request`);
  const entities = require(`entities`);
  const validUrl = require(`valid-url`);
  const sendMessage = require(`../modules/sendMessage.js`);
  const botReady = true; 

  setInterval(() => {
    if (botReady) {
      request({
        url: client.config.api.subreddit,
        json: true,
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          for (const post of body.data.children.reverse()) {
            const lastTimestamp = post.data.created_utc;
            if (lastTimestamp <= post.data.created_utc) {
              const scuRedditEmbed = new MessageEmbed()
              .setColor(client.config.school_color)
              .setTitle(`${post.data.link_flair_text ? `[${post.data.link_flair_text}] ` : ''}${entities.decodeHTML(post.data.title)}`)
              .setURL(`https://redd.it/${post.data.id}`)
              .setAuthor(`${post.data.subreddit_name_prefixed}`, client.user.displayAvatarURL())
              .setDescription(post.data.selftext)
              .setThumbnail(validUrl.isUri(post.data.thumbnail) ? entities.decodeHTML(post.data.thumbnail) : null)
              .setFooter(`${post.data.is_self ? 'Self Post' : 'Link Post'} by u/${post.data.author}`)
              .setTimestamp(new Date(post.data.created_utc * 1000))

              sendMessage(client, client.config.channels.reddit, scuRedditEmbed);
            }
          }
        } else {
          sendMessage(client, client.config.channels.auditlogs, 'Request failed - reddit could be down or subreddit doesn\'t exist. Will continue.');
          botReady = false;
        }
      });
    }
  }, 3000 * 1000); // get new posts every half-hour
}
