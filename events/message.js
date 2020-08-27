const Discord = require(`discord.js`); //requires Discord.js integration package
const config = require(`../config.json`);
const OBS = require(`./obs.json`);
const OBS_list = OBS.obs;

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  //const guild = client.guilds.cache.get(config.verification.guildID);
  //const sicon = guild.iconURL();
  const memberTag = message.author.id;

  let word = message.content.toLowerCase().split(" ");
  //let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

  try {
    for (let i = 0; i < OBS_list.length; i++) {
      if (word.includes(OBS_list[i])) {
        message.author.send({embed: {
          author: {
            name: `**Blacklisted Word Detected**`, 
            icon_url: `${sicon}`,
          },		
          description: `<@${memberTag}> , this is the Official Santa Clara University Discord Network! Please refrain from such speech immediately! You've been warned!`,
          color: config.school_color,
          thumbnail: {
            "url": "attachment://ohno.jpg",
          },
          files: [{
            attachment:'./assets/ohno.jpg',
            name:'ohno.jpg'
          }],
          timestamp: new Date()
        }});

        message.channel.send({ embed: { title: `__**Blacklisted Word Detected!**__`, description: `<@${memberTag}> said the following word - ||${OBS_list[i]}|| - in ${message.channel}`, timestamp: new Date(), color: 10231598}});

        return message.delete();
      }
    }
  } catch (e) {
      console.log(err);
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

    /*Some commands are meant to be used only inside servers and won't work whatsoever in DMs. 
  A prime example of this would be a kick command. You can add a property to the necessary 
  commands to determine whether or not it should be only available outside of servers.*/

  if (command.guildOnly != false && message.channel.type !== 'text') {
    return message.channel.send({ embed: { description: `<@${message.author.id}>, I can't execute that command inside DMs!` }});
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}`;
    }

    return message.channel.send({embed: { description: reply }});
  }

  // If that command doesn't exist, silently exit and do nothing
  if (!client.commands.has(`${commandName}`)) return message.channel.send("That's not a command!");

  const cooldowns = new Discord.Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
  // Run the command
    command.execute(message, args);
  } catch(err) {
    auditLogs.send({embed: { description: `There was an error trying to execute \`${command.name}\`:\n\`${err.message}\``}});
  }
}