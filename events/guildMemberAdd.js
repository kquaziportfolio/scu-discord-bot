const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = async (client, member, message) => {
  let auditLogs = message.guild.channels.cache.find((channel) => channel.name === "audit-logs");

  let role = member.guild.roles.cache.find((role) => role.name === "Unverified");
  await member.roles.add(role).catch((err) => console.log((err) => `Error: ${err}`));

  auditLogs.send({ embed: { description: `The **Unverified** role has been given to **${member.user.tag}** by **${client.user.tag}**!` } });
  const guild = client.guilds.cache.get(`${config.identification}`);
  let memberCount = 0;
  guild.members.cache.forEach((member) => {
    //will only count human members not bots
    if (!member.user.bot) memberCount++;
    return memberCount;
  });
  const memberTag = member.user.id;
  const sicon = guild.iconURL();

  guild.systemChannel.send(
    new MessageEmbed() // triggers when new users joins to specific channel in server
      .setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor.
      .setDescription(`<@${memberTag}> has joined **${guild.name}**! ` + `Be sure to follow instructions in the DM! Go Broncos!`) //Setting embed description
      .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
      .setTimestamp() // Sets a timestamp at the end of the embed
      .attachFiles([`./assets/scu-background.png`])
      .setImage(`attachment://scu-background.png`)
      .setColor(10231598)
      .setFooter(`Brought to you by the creators of this Discord server.`)
  );

  const welcome_Embed = new MessageEmbed() //personal message to new user
    .setTitle(`Invent the life you want to lead at Santa Clara University.`)
    .setDescription(
      `${emojiCharacters.one} If you are new to Discord, this short [tutorial](https://youtu.be/KfaLP44-ISE) can help you get started! \n\n` +
        `${emojiCharacters.two} Fill out the Google Form [here](https://docs.google.com/forms/d/e/1FAIpQLSeQpuFY1CB2dLkThqP0nN9FK5r_YLOHlK7hupiHyAjKx-cqUw/viewform?usp=pp_url&entry.196182759=${member.user.tag}) to verify yourself in the SCU server! It'll only take a couple seconds! Note: If you're a guest or alumni, you are exempted from this requirement \n\n` +
        `${emojiCharacters.three} Read the <#709118412542050368> channel and introduce yourself in the <#709119648368427018> channel! \n\n` +
        `${emojiCharacters.four} Look at the <#722494512420618370> and react to the emojis for your specific roles! ` +
        `Thank you for your cooperation and Go Broncos! :racehorse:`
    )
    .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
    .setTimestamp() // Sets a timestamp at the end of the embed
    .setTimestamp() // Sets a timestamp at the end of the embed
    .attachFiles([`./assets/scu-background.png`])
    .setImage(`attachment://scu-background.png`)
    .setColor(10231598)
    .setFooter(`Brought to you by the creators of this Discord server.`);

  member.send(welcome_Embed); //send private DM to new user

  auditLogs.send({ embed: { description: `${memberTag} is the ${memberCount}th member to join ${guild.name}!` } });
};
