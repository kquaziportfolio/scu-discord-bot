const Discord = require(`discord.js`); //requires Discord.js integration package
const config = require(`../config.json`);
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = async (client, member) => { 
    let role = member.guild.roles.cache.find(role => role.name === "Unverified");
    await(member.roles.add(role)).catch(err => console.log(err => `Error: ${err}`))
    console.log(`The **Unverified** role has been given to **${member.user.tag}** by **${client.user.tag}**!`)
    const guild = client.guilds.cache.get(`${config.identification}`);
    let memberCount = 0;
    guild.members.cache.forEach(member => {  //will only count human members not bots
        if(!member.user.bot) memberCount++; 
        return memberCount;
    });
    const memberTag = member.user.id; 
    const sicon = guild.iconURL();
        
    guild.systemChannel.send(new Discord.MessageEmbed() // triggers when new users joins to specific channel in server
        .setTitle(`Welcome to the **${guild.name}**!`) // Calling method setTitle on constructor. 
        .setDescription(`<@${memberTag}> has joined **${guild.name}** which currently has ${memberCount} ` + 
        `members! Be sure to follow instructions in the DM! Go Broncos!`) //Setting embed description
        .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
        .setTimestamp() // Sets a timestamp at the end of the embed
        .attachFiles([`./assets/scu-background.png`])
        .setImage(`attachment://scu-background.png`)
        .setColor(10231598)
        .setFooter(`Brought to you by the creators of this Discord server.`)
    );

    const welcome_Embed = new Discord.MessageEmbed() //personal message to new user
        .setTitle(`Invent the life you want to lead at Santa Clara University.`)
        .setDescription(
        `${emojiCharacters.one}Fill out the Google Form [here](https://forms.gle/vqmrDx9LRVexdwLk6) to verify yourself in the SCU server! Note: If you're a guest or alumni, you are exempted from this requirement \n\n` +
        `${emojiCharacters.two} Read the <#709118412542050368> channel and introduce yourself in the <#709119648368427018> channel! \n\n` +
        `${emojiCharacters.three} Look at the <#722494512420618370> and react to the emojis for your specific roles! ` +
        `Thank you for your cooperation and Go Broncos! :racehorse:`)
        .setThumbnail(`${sicon}`) // The image on the top right; method requires an url, not a path to file!
        .setTimestamp() // Sets a timestamp at the end of the embed
        .setTimestamp() // Sets a timestamp at the end of the embed
        .attachFiles([`./assets/scu-background.png`])
        .setImage(`attachment://scu-background.png`)
        .setColor(10231598)
        .setFooter(`Brought to you by the creators of this Discord server.`)

    member.send(welcome_Embed); //send private DM to new user
}