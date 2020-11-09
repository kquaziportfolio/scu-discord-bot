const { MessageEmbed, Collection } = require(`discord.js`); //requires Discord.js integration package
const db = require(`quick.db`);
const active = new Map();

module.exports = async (client, message) => {
  // Checks if the Author is a Bot, or the message isn't from the guild, ignore it.
  if (!message.content.startsWith(client.config.prefix) && message.channel.type != "dm" || message.author.bot) return;
  
  //Check if message is in a direct message
  if (message.guild == null) {
    if (message.content.startsWith(`<@${client.config.serverRoles.bot}>`) {
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
          channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`);     
          channel.setParent(client.config.channels.supportTicketsCategory); //sync text channel to category permissions
          channel.setTopic(`Use **${client.config.prefix}complete** to close the Ticket | ModMail for <@${message.author.id}>`);
          channel.overwritePermissions([ 
            {
              id: client.config.serverRoles.mod,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS']
            },
            {
              id: message.author.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY']
            },
            {
              id: client.config.serverRoles.everyone,
              deny: ['VIEW_CHANNEL']
            }
          ]);

          // Update Active Data
          active.channelID = channel.id;
          active.targetID =  message.author.id;
        }

      channel = client.channels.cache.get(active.channelID);

      const newTicket = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle(`ModMail Ticket Created`)
      .setDescription(`<@${message.author.id}>, hello! I have opened up a new ticket for you. One of our staff members ` +
      `will respond back to you shortly. If you need to add anything else to your ticket, you can send it here!`)
      .setFooter(`ModMail Ticket Created -- ${message.author.tag}`)
      await message.author.send(newTicket);

      const messageReception = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle(`ModMail Ticket Received`)
      .setDescription(`**${message.content}**`)
      .setFooter(`ModMail Ticket Received -- ${message.author.tag}`)
      await channel.send(messageReception);

      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    }
  }
    
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.cache.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        
        // <@SCU#6441> complete command
        if (message.content == `<@${client.config.serverRoles.bot}> close-ticket`) {
            const completeTicket = new MessageEmbed()
              .setColor(client.config.school_color)
              .setTitle(`ModMail Ticket Resolved`)
              .setAuthor(supportUser.tag, supportUser.displayAvatarURL())
              .setDescription(`Support for <@${supportUser.id}> has been closed. *Your ModMail has been marked as **Complete**. If you wish to create a new one, please send a message to the bot.*`)
              .setFooter(`ModMail Ticket Closed -- ${supportUser.tag}`)
            
            supportUser.send(completeTicket);
            message.guild.channels.cache.get(client.config.channels.auditlogs).send(completeTicket);
            message.channel.delete();
            return db.delete(`support_${support.targetID}`);
        }
    }

  // Our standard argument/command name definition.
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

  const cooldowns = new Collection();

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

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
  // Run the command as long as it has these two parameters
    command.execute(client, message, args);
  } catch(err) {
      sendMessage(client, client.config.channels.auditlogs, { embed: { description: `There was an error trying to run ${command.name} due the error: ${err.message}`}});
      return console.log(err.stack || err);
  }
}
