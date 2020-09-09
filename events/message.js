const Discord = require(`discord.js`); //requires Discord.js integration package
const config = require(`../config.json`);
const OBS = require(`./obs.json`);
const OBS_list = OBS.obs;

module.exports = (client, message) => {
  // Checks if we're on DMs, or the Author is a Bot, or the Author is our Bot, or the message isn't from the guild, ignore it.
  if (message.author.bot || !message.guild || message.channel.type == "dm"|| message.author === bot.user) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(config.prefix)) return;
  
  const guild = client.guilds.cache.get(`${config.verification.guildID}`);
  const sicon = guild.iconURL();
  const memberTag = message.author.id;

  let word = message.content.toLowerCase().split(" "); //doesn't scan for substrings but rather normal words with one space
  let auditLogs = message.guild.channels.cache.find(channel => channel.id === config.channels.auditlogs); //basically sends a log to the #audit-logs channel to know who said what

  //obscenities filter which I need to improve on. Need to add function to remove or add certain words from the obs.json list via bot commands
  try {
    for (let i = 0; i < OBS_list.length; i++) {
      if (word.includes(OBS_list[i])) {
        message.author.send(`<@${memberTag}>`, {embed: { //sends message author who said the word a warning -- might make them temporarily muted for 10 minutes 
          author: {
            name: `**Blacklisted Word Detected**`, 
            icon_url: `${sicon}`,
          },		
          description: `This is the Santa Clara University Discord Network! Please refrain from such speech immediately! You've been warned!`,
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

        auditLogs.send({ embed: { title: `__**Blacklisted Word Detected!**__`, description: `<@${memberTag}> said the following word - ||${OBS_list[i]}|| - in ${message.channel}`, timestamp: new Date(), color: config.school_color}});
        //the word has a spoiler and viewer discretion is advised
        
        return message.delete(); //instantly deletes user's message without hesistation or question as long as there is "one" obscenity in their text
      }
    }
  } catch (e) {
      console.log(err);
  }

  if (message.channel.id === config.channels.updates) { //Sends reaction every time something is manually written in #server-updates
    message.react("👍");
  } 

  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  /*Some commands are meant to be used only inside servers and won't work whatsoever in DMs. 
  A prime example of this would be a kick command. You can add a property to the necessary 
  commands to determine whether or not it should be only available outside of servers.*/

  if (message.channel.type !== 'text') 
    return message.channel.send({ embed: { description: `<@${message.author.id}>, I can't execute that command inside DMs!` }});

  // If that command doesn't exist, say that's not a command 
  if (!client.commands.has(`${commandName}`)) return message.channel.send(`<@${message.author.id}>`, { embed: { description: `That's not a command!`, color: config.school_color}});

  const cooldowns = new Discord.Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000; //make cooldown default to 3 if there are no presets for cooldown in the command
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply({ embed: { description: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, color: config.school_color}});
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
  // Run the command as long as it has these two parameters
    command.execute(message, args);
  } catch(err) {
    console.log(`There was an error trying to run ${command.name} due the error: ${err.message}`);
  }
}
