const { MessageEmbed, Collection } = require(`discord.js`);  
let isAdmin = require(`../modules/isAdmin.js`);
const fs = require(`fs`);
const db = require(`quick.db`);
let sendMessage = require(`../modules/sendMessage.js`);
const cooldowns = new Collection()  

module.exports = async (client, message) => {     
  let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8")); //Read File
  if(!prefixes[message.guild.id]) {  //If there is no string that is startwith prefixes[msg.message.id]
    prefixes[message.guild.id] = { //Let prefixes[message.guild.id] be
      prefix: client.config.prefix //Prefix = Default Prefix Which is on config.json
    }
  }

  let otherPrefix = prefixes[message.guild.id].prefix; //Let prefix be prefixes[message.guild.id].prefix
	 
  // Checks if the Author is a Bot, the prefix isn't right, or the message isn't from the guild, ignore it.
  if (!message.content.startsWith(otherPrefix) ||  message.author.bot) return;
       
/*
==================================================================================
  __  __                                  _    _                 _ _           
 |  \/  |                                | |  | |               | | |          
 | \  / | ___  ___ ___  __ _  __ _  ___  | |__| | __ _ _ __   __| | | ___ _ __ 
 | |\/| |/ _ \/ __/ __|/ _` |/ _` |/ _ \ |  __  |/ _` | '_ \ / _` | |/ _ \ '__|
 | |  | |  __/\__ \__ \ (_| | (_| |  __/ | |  | | (_| | | | | (_| | |  __/ |   
 |_|  |_|\___||___/___/\__,_|\__, |\___| |_|  |_|\__,_|_| |_|\__,_|_|\___|_|   
                              __/ |                                            
                             |___/                                             
==================================================================================
*/

  // Our standard argument/command name definition. 
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g) || message.content.slice(otherPrefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  // If that command doesn't exist, return nothing
  if (!command) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, <@${message.author.id}>!`;
    
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
    }
    
    return message.channel.send({embed: { title: "Uh-oh :x:", description: reply, color: client.config.school_color}});
  }
	
/*
===============================================   
 |  \/  |         | |               (_) | 
 | \  / | ___   __| |_ __ ___   __ _ _| | 
 | |\/| |/ _ \ / _` | '_ ` _ \ / _` | | | 
 | |  | | (_) | (_| | | | | | | (_| | | | 
 |_|  |_|\___/ \__,_|_| |_| |_|\__,_|_|_| 
=============================================== 
*/

  const messageReception = new MessageEmbed()
  .setColor(client.config.school_color)
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .attachFiles([`./assets/verified.gif`])
  .setThumbnail(`attachment://verified.gif`)  

  //Check if message is in a direct message and mentions bot
  if (message.channel.type === "dm" && message.mentions.has(client.user)) { 
    let userTicketContent = message.content.split(' ').slice(1).join(' ');

    if (userTicketContent.length > 1) {
      let active = await db.fetch(`support_${message.author.id}`);
      let guild = client.guilds.cache.get(client.config.verification.guildID);
      let channel, found = true;

      try { 
        if (active) client.channels.cache.get(active.channelID).guild;
      } catch (e) {
        found = false;
      }

      if (!active || !found) {
        //create support channel for new respondee
        active = {};
        const nickname = client.guilds.cache.get(client.config.verification.guildID).member(message.author).displayName;
        channel = await guild.channels.create(`${nickname}-${message.author.discriminator}`);     
        channel.setParent(client.config.channels.supportTicketsCategory); //sync text channel to category permissions
        channel.setTopic(`Use **${client.config.prefix}close-ticket** to close the Ticket | ModMail for <@${message.author.id}>`);
        channel.overwritePermissions([ 
          {
            id: client.config.serverRoles.mod,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS']
          },
          {
            id: message.author.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS']
          },
          {
            id: client.config.serverRoles.everyone,
            deny: ['VIEW_CHANNEL']
          }
        ]);
        
        messageReception
        .setTitle(`ModMail Ticket Created`)
        .setDescription(`Hello, I've opened up a new ticket for you! Our staff members ` +
        `will respond shortly. If you need to add to your ticket, plug away again!`)
        .setFooter(`ModMail Ticket Created -- ${message.author.tag}`)
        
        await message.author.send(`<@${message.author.id}>`, { embed: messageReception });
        
        // Update Active Data
        active.channelID = channel.id;
        active.targetID = message.author.id;
      }

      channel = client.channels.cache.get(active.channelID);

      messageReception //fires for newly created and existing tickets 
      .setTitle(`Modmail Ticket Sent!`)
      .setDescription(`Your new content has been sent!`)
      .setFooter(`ModMail Ticket Received -- ${message.author.tag}`)
      await message.author.send(`<@${message.author.id}>`, { embed: messageReception });

      messageReception.setDescription(`**${userTicketContent}**`) //appends `.setDescription()` method to the embed that will be sent to admins
      await channel.send(`<@${message.author.id}>`, { embed: messageReception });

      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    } 
  } else if (message.channel.type === "dm" && !message.mentions.has(client.user)) {
      return message.reply({ embed: { description: `To open a ticket, mention <@${client.user.id}> and type your message!`, color: client.config.school_color}});
  }
  
  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
    support = await db.fetch(`support_${support}`);
    let supportUser = client.users.cache.get(support.targetID);
    if (!supportUser) return message.channel.delete(); 
    
    if(isAdmin(client, message)) {
      if (message.content === `${client.config.prefix}close-ticket`) {
        messageReception 
          .setTitle(`ModMail Ticket Resolved`)
          .setAuthor(supportUser.tag, supportUser.displayAvatarURL())
          .setDescription(`*Your ModMail has been marked as **Complete**. If you wish to create a new one, please send a message to the bot.*`)
          .setFooter(`ModMail Ticket Closed -- ${supportUser.tag}`)
        supportUser.send(`<@${supportUser.id}>`, { embed: messageReception });

        message.guild.channels.cache.get(client.config.channels.auditlogs).send(messageReception);
        message.channel.delete();
        return db.delete(`support_${support.targetID}`);
      } 
    }
  }  
	
/*
=======================================================
  / ____|          | |   | |                        
 | |     ___   ___ | | __| | _____      ___ __  ___ 
 | |    / _ \ / _ \| |/ _` |/ _ \ \ /\ / / '_ \/ __|
 | |___| (_) | (_) | | (_| | (_) \ V  V /| | | \__ \
  \_____\___/ \___/|_|\__,_|\___/ \_/\_/ |_| |_|___/
=======================================================
*/                                                    
                                                     
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000; //make cooldown default to 3 if there are no presets for cooldown in the command
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply({ embed: { description: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, color: client.config.school_color}});
    }
  }
  
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  try {
  // Run the command as long as it has these three parameters
    command.execute(client, message, args);
  } catch(err) {
      sendMessage(client, client.config.channels.auditlogs, { embed: { description: `There was an error trying to run ${command.name} due the error: ${err.message}`}});
      return console.log(err.stack || err);
  }
}
