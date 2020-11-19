/*
=====================================================
     __     __  _____       _ _                  
    / /    / / /  __ \     | | |                 
   / / __ / /  | /  \/ ___ | | | ___  __ _  ___  
  / / '__/ /   | |    / _ \| | |/ _ \/ _` |/ _ \ 
 / /| | / /    | \__/\ (_) | | |  __/ (_| |  __/ 
/_/ |_|/_/      \____/\___/|_|_|\___|\__, |\___| 
                                      __/ |      
                                     |___/       
=====================================================
*/

module.exports.run = async (client) => {
  const { MessageEmbed } = require(`discord.js`);
  const request = require('request');
  const entities = require('entities');
  const validUrl = require('valid-url');
  const sendMessage = require(`../modules/sendMessage.js`);
  const botReady = true; 
  
  const feedMSG = {
    title: "/r/College Feed Ready!",
    description: `[/r/College](https://reddit.com/r/College) feed works! ✅`,
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
              const redditPost = new MessageEmbed()
              .setColor(client.config.school_color)
              .setAuthor(`/${post.data.subreddit_name_prefixed}`, client.user.displayAvatarURL())
              .setTitle(`${post.data.link_flair_text ? `[${post.data.link_flair_text}] ` : ''}${entities.decodeHTML(post.data.title)}`)
              .setURL(`https://redd.it/${post.data.id}`)
              .setDescription(post.data.selftext)
              .setThumbnail(validUrl.isUri(post.data.thumbnail) ? entities.decodeHTML(post.data.thumbnail) : null)
              .setFooter(`${post.data.is_self ? 'self post' : 'link post'} by /u/${post.data.author}`)
              .setTimestamp(new Date(post.data.created_utc * 1000))
              
              if (post.data.selftext.length > 2048) { //if reddit post exceeds 2048 characters, split the message into two embeds to render the content :)
                redditPost.setDescription(post.data.selftext.substring(0, 2047));
                sendMessage(client, client.channels.auditlogs, { embed: { description: post.data.selftext.substring(2048, post.data.selftext.length)}});
              }

              sendMessage(client, client.config.channels.reddit, redditPost);
            }
          }
        } else {
          sendMessage(client, client.config.channels.auditlogs, { embed: { description: `Request failed - Reddit could be down or the subreddit doesn't exist. Will continue.`, color: client.config.school_color}});
        }
      });
    }
  }, 1800 * 1000); // get 5 new posts every 30 minutes!
}