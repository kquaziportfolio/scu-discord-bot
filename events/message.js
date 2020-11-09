const { MessageEmbed, Collection } = require(`discord.js`); //requires Discord.js integration package
let sendMessage = require(`../modules/sendMessage.js`);
const db = require(`quick.db`);
const active = new Map();

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
    
    if (!active || !found) {
      //create support channel for new respondee
      active = {};
      
      const channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, {
        type: 'text',
        permissionOverwrites: [
          {
            id: client.config.serverRoles.everyone, //@everyone can't view channel
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS']
          },
          {
            id: [client.config.serverRoles.owner, client.config.serverRoles.admin, client.config.serverRoles.mod, client.config.serverRoles.bot],
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_CHANNELS'],
          }
        ],
      }).then(m => {
          m.setParent(client.config.channels.supportTicketsCategory); //sync text channel to category permissions
          m.setTopic(`Use **${client.config.prefix}complete** to close the Ticket | ModMail for <@${message.author.id}>`);
      });

      const newChannel = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setFooter('ModMail Ticket Created')
      .addField('User', message.author)
      .addField('ID', message.author.id)
      await channel.send(newChannel);

      const newTicket = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(`Hello, ${message.author.tag}`, message.author.displayAvatarURL())
      .setFooter('ModMail Ticket Created')
      await message.author.send(newTicket);

      // Update Active Data
      active.channelID = channel.id;
      active.targetID =  message.author.id;
      }
        
      channel = client.channels.cache.get(active.channelID);
      const dm = new MessageEmbed()
          .setColor(client.config.school_color)
          .setAuthor(`Thank you, ${message.author.tag}`, message.author.displayAvatarURL())
          .setFooter(`Your message has been sent -- A staff member will be in contact soon.`)
      await message.author.send(dm);

      const messageReception1 = new MessageEmbed()
      .setColor(client.config.school_color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(message.content)
      .setFooter(`Message Received -- ${message.author.tag}`)
      await channel.send(messageReception1);
    
      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    }
    
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.cache.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        
        // &complete command
        if (message.content.toLowerCase() == `${client.config.prefix}complete`) {
            const completeTicket = new MessageEmbed()
              .setColor(client.config.school_color)
              .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL())
              .setFooter('Ticket Closed')
              .setDescription('*Your ModMail has been marked as **Complete**. If you wish to create a new one, please send a message to the bot.*');
                
            supportUser.send(completeTicket);
            message.channel.delete()
                .then(console.log(`Support for ${supportUser.tag} has been closed.`))
                .catch(console.error);
            return db.delete(`support_${support.targetID}`);
        }
      
        const messageReception2 = new MessageEmbed()
        .setColor(client.config.school_color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(message.content)
        .setFooter(`Message Received`)
            
        client.users.cache.get(support.targetID).send(messageReception2);
        message.delete({timeout: 1000});
        messageReception2.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);
        return message.channel.send(messageReception2);
    }

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  /*Some commands are meant to be used only inside servers and won't work whatsoever in DMs. 
  A prime example of this would be a kick command. You can add a property to the necessary 
  commands to determine whether or not it should be only available outside of servers.*/

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
