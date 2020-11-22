const { MessageEmbed, MessageAttachment, Collection } = require(`discord.js`); //requires Discord.js integration package
const db = require(`quick.db`);
let isAdmin = require(`../modules/isAdmin.js`);
let sendMessage = require(`../modules/sendMessage.js`);
const cooldowns = new Collection()  

module.exports = async (client, message) => { 
  // Checks if the Author is a Bot, or the message isn't from the guild, ignore it.
  if (!message.content.startsWith(client.config.prefix) && message.channel.type != "dm" || message.author.bot) return; 
	
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
        channel.setTopic(`Use **${client.config.prefix}complete** to close the Ticket | ModMail for <@${message.author.id}>`);
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
      
      if (message.attachments.size > 0) { 
        await channel.send(messageReception.setDescription(`> ${userTicketContent}`).setImage(message.attachments.first().url));
      } else {
      	await channel.send(`<@${message.author.id}>`, message.setDescription(`> ${userTicketContent}`)); 
      }

      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    } 
  } else if (message.channel.type === "dm" && !message.mentions.has(client.user)) {
      return await message.reply({ embed: { description: `To open a ticket, mention <@${client.user.id}> and type your message!`, color: client.config.school_color}});
  }
  
  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
    support = await db.fetch(`support_${support}`);
    let supportUser = client.users.cache.get(support.targetID);
    if (!supportUser) return message.channel.delete(); 
    
    if(isAdmin(client, message)) {
      if (message.content === `${client.config.prefix}complete`) {
        messageReception 
        .setTitle(`ModMail Ticket Resolved`)
        .setAuthor(supportUser.tag, supportUser.displayAvatarURL())
        .setDescription(`*Your ModMail has been marked as **Complete**. If you wish to create a new one, please send a message to the bot.*`)
        .setFooter(`ModMail Ticket Closed -- ${supportUser.tag}`)
        await supportUser.send(`<@${supportUser.id}>`, { embed: messageReception });
        sendMessage(client, client.config.channels.auditlogs, { embed: messageReception});
        await message.channel.delete();
        return db.delete(`support_${support.targetID}`);
        
      } else if(message.content.startsWith(`${client.config.prefix}reply`)){ // reply to user
          let isPause = await db.get(`suspended${support.targetID}`);
          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isPause === true) return await message.channel.send({ embed: { description: "This ticket already paused. Unpause it to continue.", color: client.config.school_color}})
          if(isBlock === true) return await message.channel.send({ embed: { description: "The user is blocked. Unblock them to continue or close the ticket.", color: client.config.school_color}})
          let args = message.content.split(" ").slice(1); 
          let msg = args.join(" ");
          await message.react("✅");
          let replyEmbed = new MessageEmbed().setTitle(`**Admin/mod replied to you!**`).setDescription(`> ${msg}`).setColor(client.config.school_color)
	  .setFooter(`ModMail Ticket Replied -- ${supportUser.tag}`).attachFiles([`./assets/reply.gif`]).setThumbnail(`attachment://reply.gif`)
          
          if(message.attachments.size > 0) { 
            await replyEmbed.setImage(message.attachments.first().url)
          }
    
          return await supportUser.send(replyEmbed); 
        
      } else if(message.content === `${client.config.prefix}pause`) { // suspend a thread
          let isPause = await db.get(`suspended${support.targetID}`);
          if(isPause === true || isPause === "true") return message.channel.send("This ticket already paused. Unpause it to continue.")
          await db.set(`suspended${support.targetID}`, true);
          let pausedTicket = new MessageEmbed()
          .setDescription(`⏸️ <@${message.author.id}>, your thread has been **paused**.`)
          .setTimestamp().setColor("YELLOW").attachFiles([`./assets/paused.gif`]).setThumbnail(`attachment://paused.gif`).setFooter(`ModMail Ticket Paused -- ${supportUser.tag}`) 
          return await supportUser.send(pausedTicket);
	  pausedTicket.setDescription(`Admin/mod, please use \`${client.config.prefix}continue\` to cancel.`);
          sendMessage(client, client.config.channels.auditlogs, {embed: pausedTicket});
      
      } else if (message.content === `${client.config.prefix}continue`) { // continue a thread
          let isPause = await db.get(`suspended${support.targetID}`);
          if(isPause === null || isPause === false) return message.channel.send({ embed: { description: "This ticket was not paused.", color: client.config.school_color}});
          await db.delete(`suspended${support.targetID}`);
          let continuedTicket = new MessageEmbed()
          .setDescription("▶️ <@${message.author.id}>, your thread has **continued**! We're ready to continue!").setColor("BLUE").setTimestamp()
          .attachFiles([`./assets/continued.gif`]).setThumbnail(`attachment://continued.gif`).setFooter(`ModMail Ticket Continued -- ${supportUser.tag}`) 
          return await supportUser.send(continuedTicket);
          sendMessage(client, client.config.channels.auditlogs, {embed: continuedTicket});
      
      } else if (message.content.startsWith(`${client.config.prefix}block`)){ // block a user
          const args = message.content.split(" ").slice(1)
          let reason = args.join(" ");
          if(!reason) reason = `Unspecified...`;
	  
          const blockedTicket = new MessageEmbed()
          .setColor("RED").setAuthor(supportUser.tag, supportUser.displayAvatarURL()) 
          .setTitle("User blocked").addField("Channel", `<#${message.channel.id}>`, true).addField("Reason", reason, true)
	  .setFooter(`ModMail User Blocked -- ${supportUser.tag}`).attachFiles([`./assets/blocked.gif`]).setThumbnail(`attachment://blocked.gif`).setTimestamp()

          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isBlock === true) return message.channel.send({ embed: { description: "The user is already blocked.", color: client.config.school_color}});
          await db.set(`isBlocked${support.targetID}`, true); 
	      
          blockedTicket.setDescription("🙅‍♂️ You cannot use the modmail anymore and have been blocked.")
          .setColor("RED").setTimestamp()
	      
          return await supportUser.send({embed: blockedTicket});
          sendMessage(client, client.config.channels.auditlogs, { embed: blockedTicket});
      
      } else if(message.content.startsWith(`${client.config.prefix}unblock`)) { // unblock a user
          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isBlock === false || !isBlock || isBlock === null) return message.channel.send({ embed: { description: "User wasn't blocked", color: client.config.school_color}});
          
          let unblockedTicket = MessageEmbed()
          .setColor("RED").setAuthor(supportUser.tag).setTitle("User unblocked!").setTimestamp()

          await db.delete(`isBlocked${support.targetID}`);
	      
          unblockedTicket.setDescription("🙋‍♂️ You've been successfully unblocked!").setColor("BLUE").setTimestamp()
	  .attachFiles([`./assets/unlocked.gif`]).setThumbnail(`attachment://unlocked.gif`).setFooter(`ModMail User Unblocked -- ${supportUser.tag}`)   
          return await supportUser.send({embed: unblockedTicket}); 
          sendMessage(client, client.config.channels.auditlogs, { embed: unblockedTicket});
      }
    }
  }  
       
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
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
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
