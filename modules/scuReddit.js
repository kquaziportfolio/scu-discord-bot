/*
======================================================
   _____ ________  __   ____           __    ___ __ 
  / ___// ____/ / / /  / __ \___  ____/ /___/ (_) /_
  \__ \/ /   / / / /  / /_/ / _ \/ __  / __  / / __/
 ___/ / /___/ /_/ /  / _, _/  __/ /_/ / /_/ / / /_  
/____/\____/\____/  /_/ |_|\___/\__,_/\__,_/_/\__/ 
======================================================
*/

module.exports.run = async (client) => { 
  const { MessageEmbed } = require(`discord.js`);
  const request = require(`request`);
  const entities = require(`entities`);
  const validUrl = require(`valid-url`);
  const sendMessage = require(`../modules/sendMessage.js`);
  const botReady = true; 
  
  const feedMSG = {
    title: "r/SCU Feed Ready!",
    description: `[r/SCU](https://reddit.com/r/SCU) feed works! ✅`,
    color: "GREEN", 
    timestamp: new Date()
  }
  
  console.log(feedMSG.title);
  sendMessage(client, client.config.channels.auditlogs, { embed: feedMSG});

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
        }
      })
    }
  }, 18000 * 1000); // get 10 new posts every 5 hours!
}
