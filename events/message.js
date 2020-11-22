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
      await channel.send(`<@${message.author.id}>`, { embed: messageReception }); 
      
      if (message.attachments.size > 0){
        let attachment = new MessageAttachment(message.attachments.first().url)
        await channel.send(`${message.author.username} > ${userTicketContent}`, {files: [message.attachments.first().url]})
      } else {
          await channel.send(`${message.author.username} > ${userTicketContent}`);
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
        supportUser.send(`<@${supportUser.id}>`, { embed: messageReception });

        message.guild.channels.cache.get(client.config.channels.auditlogs).send(messageReception);
        message.channel.delete();
        return db.delete(`support_${support.targetID}`);
        
      } else if(message.content.startsWith(`${client.config.prefix}reply`)){ // reply (with user and role)
          let isPause = await db.get(`suspended${support.targetID}`);
          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isPause === true) return await message.channel.send("This ticket already paused. Unpause it to continue.")
          if(isBlock === true) return await message.channel.send("The user is blocked. Unblock them to continue or close the ticket.")
	        let args = message.content.split(" ").slice(1)
          let msg = args.join(" ");
          await message.react("✅");
          if(message.attachments.size > 0){
            let attachment = new MessageAttachment(message.attachments.first().url)
            return await supportUser.send(`${message.author.username} > ${msg}`, {files: [message.attachments.first().url]})
          } else {
              return await supportUser.send(`${message.author.username} > ${msg}`);
          }
        
      } else if(message.content === `${client.config.prefix}id`){ // print user ID
          return message.channel.send(`User's ID is **${support.targetID}**.`);
        
      } else if(message.content === `${client.config.prefix}pause`) { // suspend a thread
          let isPause = await db.get(`suspended${support.targetID}`);
          if(isPause === true || isPause === "true") return message.channel.send("This ticket already paused. Unpause it to continue.")
          await table.set(`suspended${support.targetID}`, true);
          let suspend = new MessageEmbed()
          .setDescription(`⏸️ This thread has been **locked** and **suspended**. Do \`${client.config.prefix}continue\` to cancel.`)
          .setTimestamp()
          .setColor("YELLOW")
          await message.channel.send({embed: suspend});
          return await supportUser.send("Your ticket has been paused. We'll send you a message when we're ready to continue.")
        
      } else if (message.content === `${client.config.prefix}continue`) { // continue a thread
          let isPause = await db.get(`suspended${support.targetID}`);
          if(isPause === null || isPause === false) return message.channel.send("This ticket was not paused.");
          await db.delete(`suspended${support.targetID}`);
          let c = new MessageEmbed()
          .setDescription("▶️ This thread has been **unlocked**.")
          .setColor("BLUE").setTimestamp()
          message.channel.send({embed: c});
          return await supportUser.send("Hi! Your ticket isn't paused anymore. We're ready to continue!");
        
      } else if (message.content.startsWith(`${client.config.prefix}block`)){ // block a user
          const args = message.content.split(" ").slice(1)
          let reason = args.join(" ");
          if(!reason) reason = `Unspecified.`
          let user = client.users.fetch(`${support.targetID}`); // djs want a string here

          const blocked = new MessageEmbed()
          .setColor("RED").setAuthor(user.tag)
          .setTitle("User blocked")
          .addField("Channel", `<#${message.channel.id}>`, true)
          .addField("Reason", reason, true)

          if(client.config.channels.auditlogs){
            sendMessage(client, client.config.channels.auditlogs, { embed: blocked});
          }

          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isBlock === true) return message.channel.send("The user is already blocked.")
          await db.set(`isBlocked${support.targetID}`, true);
          const c = new MessageEmbed()
          .setDescription("⏸️ The user can not use the modmail anymore; they have been blocked. You may now close the ticket or unblock them to continue.")
          .setColor("RED").setTimestamp()
          return await message.channel.send({embed: c});
        
      } else if(message.content.startsWith(`${client.config.prefix}unblock`)) { // unblock a user
          let isBlock = await db.get(`isBlocked${support.targetID}`);
          if(isBlock === false || !isBlock || isBlock === null) return message.channel.send("User wasn't blocked")
          let user = client.users.fetch(`${support.targetID}`); // djs want a string here
          let unBlock = MessageEmbed()
          .setColor("RED").setAuthor(user.tag).setTitle("User unblocked")

          if(client.config.channels.auditlogs) {
            sendMessage(client, client.config.channels.auditlogs, { embed: unBlock});
          }

          await table.delete(`isBlocked${support.targetID}`);
          let c = new MessageEmbed()
          .setDescription("▶️ The user has successfully been unblocked!")
          .setColor("BLUE").setTimestamp()
          return await message.channel.send({embed: c}); 
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
