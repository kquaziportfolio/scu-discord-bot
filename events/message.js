const { MessageEmbed, Collection } = require(`discord.js`); //requires Discord.js integration package
const db = require(`quick.db`);
const fs = require(`fs`);
const cooldowns = new Collection(); 
let isAdmin = require(`../modules/isAdmin.js`);
let sendMessage = require(`../modules/sendMessage.js`); 
const jsdom = require(`jsdom`);
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = async (client, message) => { 
  // Checks if the Author is a Bot, or the message isn`t from the guild, ignore it.
  if (!message.content.startsWith(client.config.prefix) && message.channel.type != "dm" || message.author.bot) return; 

/*
===============================================   
 |  \/  |         | |               (_) | 
 | \  / | ___   __| |_ __ ___   __ _ _| | 
 | |\/| |/ _ \ / _` | `_ ` _ \ / _` | | | 
 | |  | | (_) | (_| | | | | | | (_| | | | 
 |_|  |_|\___/ \__,_|_| |_| |_|\__,_|_|_| 
=============================================== 
*/

  const messageReception = new MessageEmbed()
  .setColor(client.config.school_color)
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  
  const nickname = client.guilds.cache.get(client.config.verification.guildID).member(message.author).displayName; 

  //Check if message is in a direct message and mentions bot
  if (message.channel.type === "dm" && message.mentions.has(client.user)) {   
    const userTicketContent = message.content.split(` `).slice(1).join(` `); 
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
        channel = await guild.channels.create(`${nickname}-${message.author.discriminator}`);     
        channel.setParent(client.config.channels.supportTicketsCategory); //sync text channel to category permissions
        channel.setTopic(`Use **${client.config.prefix}cmds** to utilize the Ticket | ModMail commands on behalf of <@${message.author.id}>`);
        channel.overwritePermissions([ 
          {
            id: client.config.serverRoles.mod,
            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ADD_REACTIONS`, `READ_MESSAGE_HISTORY`, `MANAGE_CHANNELS`, `MANAGE_MESSAGES`, `ADD_REACTIONS`, `USE_EXTERNAL_EMOJIS`]
          },
          {
            id: message.author.id,
            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ADD_REACTIONS`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `ATTACH_FILES`, `USE_EXTERNAL_EMOJIS`]
          },
          {
            id: client.config.serverRoles.everyone,
            deny: [`VIEW_CHANNEL`]
          }
        ]);
        
        messageReception
        .setTitle(`ModMail Ticket Created`)
        .setDescription(`Hello, I've opened up a new ticket for you! Our staff members ` +
        `will respond shortly. If you need to add to your ticket, plug away again!`)
        .setFooter(`ModMail Ticket Created -- ${message.author.tag}`) 
        .attachFiles([`./assets/verified.gif`])
        .setThumbnail(`attachment://verified.gif`)  
        
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

      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      
      return await channel.send(messageReception.setDescription(`> ${userTicketContent}`).setImage(message.attachments.first() ? message.attachments.first().url : ""));
   
    } 
  } else if (message.channel.type === "dm" && !message.mentions.has(client.user)) { 
      await message.react("❌");
      await message.reply({ embed: { description: `To open a ticket, mention <@${client.user.id}> and type your message!`, color: client.config.school_color}});
  }
  
  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
    support = await db.fetch(`support_${support}`);
    const supportUser = client.users.cache.get(support.targetID);
    if (!supportUser) return message.channel.delete(); 
    
    function modmailCommands() {
      const commands = [ 
        { cmd: "block", desc: "🙅‍♂️ Block this user!" },
        { cmd: "complete", desc: "✅ Close a ticket channel and logs the support channel`s content!" },   
        { cmd: "continue", desc: "▶️ Continue the modmail session!"},  
        { cmd: "reply", desc: "💬 DM the user who sent the modmail ticket!"},
        { cmd: "pause", desc: "⏸️ Pause the modmail session!" },
        { cmd: "unblock", desc: "🙋‍♂️ Unblock this user!" }
      ];
      let str = "```\n";
      for (let i in commands) {
        str += `${client.config.prefix}${commands[i].cmd} - ${commands[i].desc}\n`;
      }
      return str + "\n```";
    }
    
    messageReception.setAuthor(supportUser.tag, supportUser.displayAvatarURL()).setTimestamp()
 
    const isPause = await db.get(`suspended${support.targetID}`);
    const modmailArgs = message.content.split(" ").slice(1); 

    if(isAdmin(client, message)) {  
      let isBlock = await db.get(`isBlocked${support.targetID}`); 
      switch (message.content.split(" ")[0].slice(1).toLowerCase()) { //if message content in the support user channel is a modmail command, execute the results...
        case "cmds": //on default, give list of modmail sub-commands :)
          message.channel.send({ embed: { title: `**📩  MODMAIL COMMANDS!**`, description: modmailCommands(), color: client.config.school_color}});
          break; 

        case "block": // block a user
          let reason = modmailArgs.join(" ");
          if(!reason) return message.channel.send({ embed: { description: `Please enter a reason for blocking the support ticket user!`, color: client.config.school_color}});
    
          messageReception.setColor("RED").setTitle("User blocked").addField("Channel", `<#${message.channel.id}>`, true).addField("Reason", reason, true)
          .setFooter(`ModMail User Blocked -- ${supportUser.tag}`).attachFiles([`./assets/blocked.gif`]).setThumbnail(`attachment://blocked.gif`)
 
          if(isBlock === true) return message.channel.send({ embed: { description: "The user is already blocked.", color: client.config.school_color}});
          await db.set(`isBlocked${support.targetID}`, true); 
        
          messageReception.setDescription(`🙅‍♂️ You cannot use the modmail anymore and have been blocked.`)
        
          await supportUser.send({embed: messageReception});
          sendMessage(client, client.config.channels.auditlogs, { embed: messageReception});
          break;

        case "complete": //close the user`s ticket after they`re done and log it!
          messageReception.setTitle(`ModMail Ticket Resolved`).setFooter(`ModMail Ticket Closed -- ${supportUser.tag}`)
          .setDescription(`✅ *Your ModMail has been marked as **complete** and has been logged by the admins/mods. If you wish to create a new one, please send a message to the bot.*`) 
          
          await supportUser.send(`<@${supportUser.id}>`, { embed: messageReception });;

          let messageCollection = new Collection();
          let channelMessages = await message.channel.messages.fetch({ limit: 100 }).catch(err => console.log(err));

          messageCollection = messageCollection.concat(channelMessages);

          while(channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if(channelMessages) {
              messageCollection = messageCollection.concat(channelMessages);
            }
          }

          let msgs = messageCollection.array().reverse();
          await fs.readFile(`./events/modmailLogs/template/template.html`, `utf8`, function(err, data) {
            const filePath = `./events/modmailLogs/index_${supportUser.tag}.html`;
            fs.writeFile(filePath, data, function (err, data) {
              if(err) console.log(`error`, err);
              let guildElement = document.createElement(`div`); 
              let guildBannerImg = document.createElement(`img`);
              guildBannerImg.setAttribute(`src`, `https://raw.githubusercontent.com/jasonanhvu/scu-discord-bot/master/assets/scu_banner.png`);
              guildBannerImg.setAttribute(`width`, `500`);
              guildElement.appendChild(guildBannerImg);
              let guildTicketImg = document.createElement(`img`);
              guildTicketImg.setAttribute(`src`, `https://i.ibb.co/zbL8P57/scu-modmail-ticket.png`);
              guildTicketImg.setAttribute(`width`, `500`); 
              guildElement.appendChild(guildTicketImg); 

              fs.appendFile(filePath, guildElement.outerHTML, function (err) {
                if (err) console.log(`error`, err);
              });

              msgs.forEach(async msg => {
                let parentContainer = document.createElement("div");
                parentContainer.className = "parent-container";

                let avatarDiv = document.createElement("div");
                avatarDiv.className = "avatar-container";
                let img = document.createElement(`img`);
                img.setAttribute(`src`, msg.author.displayAvatarURL());
                img.setAttribute(`style`, `margin: 30px`);
                img.className = "avatar";
                avatarDiv.appendChild(img);

                parentContainer.appendChild(avatarDiv);

                let messageContainer = document.createElement(`div`);
                messageContainer.className = "message-container";

                const spanElement = document.createElement("span"); 
                const codeNode = document.createElement("code");
 
                let name = document.createTextNode(`\n[${msg.author.tag}] [${msg.createdAt.toDateString()}] [${msg.createdAt.toLocaleTimeString()} PST]`);
                spanElement.appendChild(name);
                messageContainer.append(spanElement);

                msg.embeds.forEach((embed) => {
                  console.log(msg); 
                  let botTxtEmbedContentsNode = document.createTextNode(`Title: ${embed.title}\nDescription: ${embed.description}\n Footer: ${embed.footer.text}`); 
                  codeNode.append(botTxtEmbedContentsNode); 
                  messageContainer.appendChild(codeNode); 
                });

                if(msg.content.startsWith("```")) {
                  let m = msg.content.replace(/```/g, "");
                  let textNode =  document.createTextNode(m);
                  codeNode.appendChild(textNode);
                  messageContainer.appendChild(codeNode);
                } else {  
                  let textNode = document.createTextNode(msg.content);
                  spanElement.append(textNode);
                  messageContainer.appendChild(spanElement);
                }
                parentContainer.appendChild(messageContainer);

                fs.appendFile(filePath, parentContainer.outerHTML, function (err) {
                  if (err) console.log(`error`, err);  
                }); 
              }); 
              messageReception.attachFiles(filePath);  
              sendMessage(client, client.config.channels.auditlogs, messageReception);
            });
          });

          await message.channel.delete();
          db.delete(`support_${support.targetID}`);

          break; 
        
        case "continue": // continue a thread
          if(isPause === null || isPause === false) return message.channel.send({ embed: { description: "This ticket was not paused.", color: client.config.school_color}});
          
          await db.delete(`suspended${support.targetID}`);
          
          messageReception.setDescription(`▶️ <@${message.author.id}>, your thread has **continued**! We're ready to continue!`).setColor("BLUE") 
          .attachFiles([`./assets/continued.gif`]).setThumbnail(`attachment://continued.gif`).setFooter(`ModMail Ticket Continued -- ${supportUser.tag}`) 
          
          await supportUser.send(messageReception);
          sendMessage(client, client.config.channels.auditlogs, {embed: messageReception});
          break;
          
        case "pause":  // pause a thread 
          if(isPause === true || isPause === "true") return message.channel.send("This ticket already paused. Unpause it to continue.")
          
          await db.set(`suspended${support.targetID}`, true);
          
          messageReception.setDescription(`⏸️ <@${message.author.id}>, your thread has been **paused**!`).setColor("YELLOW")
          .attachFiles([`./assets/paused.gif`]).setThumbnail(`attachment://paused.gif`).setFooter(`ModMail Ticket Paused -- ${supportUser.tag}`) 
    
          await supportUser.send(messageReception);
          
          messageReception.setDescription(`Admin/mod, please use \`${client.config.prefix}continue\` to cancel.`);
          sendMessage(client, client.config.channels.auditlogs, {embed: messageReception});
          break;

        case "reply": // reply to user  
          if(isPause === true) return await message.channel.send({ embed: { description: "This ticket already paused. Unpause it to continue.", color: client.config.school_color}})
          if(isBlock === true) return await message.channel.send({ embed: { description: "The user is blocked. Unblock them to continue or close the ticket.", color: client.config.school_color}})
          
          let msg = modmailArgs.join(" "); 
          if (!msg) return message.channel.send({ embed: { description: `Please enter a message for the support ticket user!`, color: client.config.school_color}});
          
          messageReception.setTitle(`**💬 Admin/mod replied to you!**`).setFooter(`ModMail Ticket Replied -- ${supportUser.tag}`)
          .setDescription(`> ${msg}`).attachFiles([`./assets/reply.gif`]).setThumbnail(`attachment://reply.gif`)
          .setImage(message.attachments.first() ? message.attachments.first().url : "") 
          
          await supportUser.send(messageReception);
          sendMessage(client, client.config.channels.auditlogs, {embed: messageReception});
          break;
 
        case "unblock":  // unblock a user  
          if(isBlock === false || !isBlock || isBlock === null) return message.channel.send({ embed: { description: "User wasn`t blocked", color: client.config.school_color}});

          await db.delete(`isBlocked${support.targetID}`);
        
          messageReception.setDescription(`🙋‍♂️ <@${supportUser.id}> has been successfully **unblocked**!`).setColor("BLUE") 
          .attachFiles([`./assets/unlocked.gif`]).setThumbnail(`attachment://unlocked.gif`).setFooter(`ModMail User Unblocked -- ${supportUser.tag}`)   
          
          await supportUser.send({embed: messageReception}); 
          sendMessage(client, client.config.channels.auditlogs, { embed: messageReception});
          break; 

        default:
          await message.react("❌");
          await message.delete({ timeout: 3000 });
          break;
        }
      }  
    }
       
/*
==================================================================================
  __  __                                  _    _                 _ _           
 |  \/  |                                | |  | |               | | |          
 | \  / | ___  ___ ___  __ _  __ _  ___  | |__| | __ _ _ __   __| | | ___ _ __ 
 | |\/| |/ _ \/ __/ __|/ _` |/ _` |/ _ \ |  __  |/ _` | `_ \ / _` | |/ _ \ `__|
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

  // If that command doesn`t exist, return nothing
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
 | |    / _ \ / _ \| |/ _` |/ _ \ \ /\ / / `_ \/ __|
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
