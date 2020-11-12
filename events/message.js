const { MessageEmbed } = require(`discord.js`); //requires Discord.js integration package
const db = require(`quick.db`);
let isAdmin = require(`../modules/isAdmin.js`);
let sendMessage = require(`../modules/sendMessage.js`);

module.exports = async (client, message) => {
  // Checks if the Author is a Bot, or the message isn't from the guild, ignore it.
  if (!message.content.startsWith(client.config.prefix) && message.channel.type != "dm" || message.author.bot) return;
  
  //Check if message is in a direct message
  if (message.guild == null) {
      let active = await db.fetch(`support_${message.author.id}`);
      let guild = client.guilds.cache.get(client.config.verification.guildID);
      let channel, found = true;

      try { 
        if (active) client.channels.cache.get(active.channelID).guild;
      } catch (e) {
        found = false;
      }
    
      const messageReception = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .attachFiles([`./assets/verified.gif`])
      .setThumbnail(`attachment://verified.gif`)

      if (!active || !found) {
        //create support channel for new respondee
        active = {};
        channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`);     
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
        active.targetID =  message.author.id;
      }
 
    channel = client.channels.cache.get(active.channelID);
    
    messageReception //fires for newly created and exisiting tickets 
    .setDescription(`Your new content has been sent!`)
    .setFooter(`ModMail Ticket Received -- ${message.author.tag}`)
    await message.author.send(`<@${message.author.id}>`, { embed: messageReception });

    messageReception.setDescription(`**${message.content}**`) //appends `.setDescription()` method to the embed that will be sent to admins
    await channel.send(`<@${message.author.id}>`, { embed: messageReception });

    db.set(`support_${message.author.id}`, active);
    db.set(`supportChannel_${channel.id}`, message.author.id);
    return;
  }
    
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.cache.get(support.targetID);
        if (!supportUser) return message.channel.delete();
      
        const ticketStatus = new MessageEmbed()
        .setColor(client.config.school_color)
        .setAuthor(supportUser.tag, supportUser.displayAvatarURL())
        .attachFiles([`./assets/verified.gif`])
        .setThumbnail(`attachment://verified.gif`)
        
        if(isAdmin(client, message, true)) {
          if (message.content == `${client.config.prefix}close-ticket`) {
            ticketStatus
              .setTitle(`ModMail Ticket Resolved`)
              .setDescription(`*Your ModMail has been marked as **Complete**. If you wish to create a new one, please send a message to the bot.*`)
              .setFooter(`ModMail Ticket Closed -- ${supportUser.tag}`)
            supportUser.send(`<@${supportUser.id}>`, { embed: ticketStatus });

            message.channel.delete();
            return db.delete(`support_${support.targetID}`);
            
            message.guild.channels.cache.get(client.config.channels.auditlogs).send(ticketStatus);
          }
       }
    }

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  // If that command doesn't exist, return nothing
  if (!client.commands.has(`${commandName}`)) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, <@${message.author.id}>!`;
    
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
    }
    
    return message.channel.send({embed: { title: "Uh-oh :x:", description: reply, color: client.config.school_color}});
  }
  
  const talkedRecently = new Set();

  if (talkedRecently.has(message.author.id)) return;

  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 2500);

  try {
  // Run the command as long as it has these two parameters
    command.execute(client, message, args);
  } catch(err) {
      sendMessage(client, client.config.channels.auditlogs, { embed: { description: `There was an error trying to run ${command.name} due the error: ${err.message}`}});
      return console.log(err.stack || err);
  }
}
