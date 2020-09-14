const { MessageEmbed } = require(`discord.js`);
const config = require(`../config.json`);
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = async (client, member) => {
  let auditLogs = member.guild.channels.cache.find(channel => channel.id == config.channels.auditlogs);

  const guild = client.guilds.cache.get(`${config.verification.guildID}`);
  
	let memberCount = guild.members.cache.filter(member => !member.user.bot).size;

  const sicon = guild.iconURL();

    if(!member.user.bot) {

      let role = member.guild.roles.cache.find((role) => role.id == config.serverRoles.unverifiedStudent);
      await member.roles.add(role);

      auditLogs.send({ embed: { description: `The **Unverified** role has been given to **<@${member.user.id}>** by **<@${client.user.id}>**!` } });
      
      const welcome_Embed1 = new MessageEmbed() // triggers when new users joins to specific channel in server
      .setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor.
      .setDescription(`We're glad to have you here! Follow instructions in your DM's and Go Broncos!`) //Setting embed description
      .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
      .setTimestamp() // Sets a timestamp at the end of the embed
      .attachFiles([`./assets/scu_banner.png`])
      .setImage(`attachment://scu_banner.png`)
      .setColor(config.school_color)
      .setFooter(`Brought to you by the creators of this Discord server.`)
    
      guild.systemChannel.send(`<@${member.user.id}>`, { embed: welcome_Embed1 });

      const welcome_Embed2 = new MessageEmbed() //personal message to new user
        .setTitle(`Invent the life you want to lead at Santa Clara University.`)
        .setDescription(
          `${emojiCharacters.one} If you are new to Discord, this short [tutorial](https://youtu.be/rnYGrq95ezA) can help you get started! \n\n` +
          `${emojiCharacters.two} __**Please**__ fill out the Google Form :clipboard: in the <#${config.channels.roles}> to __**immediately**__ verify yourself and get roles in the SCU server! It'll only take a couple seconds! Note: If you're a **Guest** or **Prospective Student**, you are exempted from this requirement. \n\n` +
          `${emojiCharacters.three} Read the <#${config.channels.info}> channel and introduce yourself :wave: in the <#${config.channels.intros}> channel! \n\n` +
          `${emojiCharacters.four} Check out SCU updates :mega: in <#${config.channels.updates}> and keep your eyes peeled for cool servers :cool: in <#${config.channels.discordPromos}>! \n\n` +
          `${emojiCharacters.five} If you have any technical issues :computer:, feel free to contact **ADMIN** or **MOD** for quick and speedy aid!\n\n` +
          `Thank you for your cooperation and Go Broncos! :racehorse:`
        )
        .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
        .setTimestamp() // Sets a timestamp at the end of the embed
        .setColor(config.school_color)
        .setFooter(`Brought to you by the creators of this Discord server.`);

      member.send(welcome_Embed2).then(auditLogs.send({embed: { description: `:white_check_mark: Private DM has been sent to new user: <@${memberTag}>`}})); //send private DM to new user
  
      auditLogs.send({ embed: { description: `<@${member.user.id}> is the ${memberCount}th member to join ${guild.name}!`, color: config.school_color, timestamp: new Date() } });
    }
}
