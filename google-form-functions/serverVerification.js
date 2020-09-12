/*
__      ________ _____  _____ ________     __   _______     _______ _______ ______ __  __ _ 
\ \    / /  ____|  __ \|_   _|  ____\ \   / /  / ____\ \   / / ____|__   __|  ____|  \/  | |
 \ \  / /| |__  | |__) | | | | |__   \ \_/ /  | (___  \ \_/ / (___    | |  | |__  | \  / | |
  \ \/ / |  __| |  _  /  | | |  __|   \   /    \___ \  \   / \___ \   | |  |  __| | |\/| | |
   \  /  | |____| | \ \ _| |_| |       | |     ____) |  | |  ____) |  | |  | |____| |  | |_|
    \/   |______|_|  \_\_____|_|       |_|    |_____/   |_| |_____/   |_|  |______|_|  |_(_)
*/

module.exports.run = (client, config) => {
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  var app = express();
  function sendMessage(client, channel, content) {
    client.guilds.cache.map((g) => {
      try {
        g.channels.cache.find((ch) => ch.id == channel).send(content);
      } catch (e) {
        return;
      }
    });
  }
  /* ADD THIS OBJECT TO YOUR CONFIG FILE (or move the properties somewhere else)
    {
        verification: {
            "guildID": "string of guild enabled in",
            "key": "string for basically a password to authenticate requests", //basically a string of some sort?
        }
    }
    INCOMING OBJECT FROM GOOGLE FORMS
    {
        "name": "First/Last name",
        "major": "Current Major",
        "status": "Member Status",
        "rlc": "RLC Name",
        "discord": "Discord Username with Tag"
    }
  */

  //define guild from ID in config
  const guild = client.guilds.cache.get(config.verification.guildID);
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  //This will start on port 2000, if this collides with another service you may change it
  const verifyMSG = {
    title: "✅ SCU DISCORD NETWORK EXPRESS.JS VERIFICATION SERVER",
    description: `Verification listening at port 5354 [here](${config.verification.verifyURL})! ✅`,
    color: "GREEN", 
    timestamp: new Date()
  }
  app.listen(5354, () => {
    console.log(verifyMSG.description);
    sendMessage(client, config.channels.auditlogs, { embed: verifyMSG});
  });
  app.all("/", (req, res) => {
    res.status(200).send(`${verifyMSG.title} was deployed on ${verifyMSG.timestamp}`);
  });
  app.post("/verify", (req, res) => {
    //some basic auth
    if (req.headers["key"] != config.verification.key) {
      //api key checker
      res.status(401).send({ error: "❌ Invalid API Key " });
      //data in body checker
    } else if (Object.keys(req.body).length > 0) { //if member enters something, then fire this else block
      res.status(200).send({ status: "Successful" });
      //find member in guild
      let member = guild.members.cache.find((member) => member.user.tag == req.body.discord);
      //if the member isn't in the guild return an error in console
      if (member == null) {
        sendMessage(client, config.channels.auditlogs, { embed: { title: `__**❌ SCU Discord Network Verification**__`, description: `> **${req.body.name}** returned **${req.body.discord}**, which is **${member}** in the server!\n> Please remove their response from the [form](https://docs.google.com/forms/d/1O4iazeB8sDlTPYLLgTF9IhndV0ZJv-ulvFJyqFkTMO4/edit)!`, color: config.school_color, timestamp: new Date()}});
      } else if (member.roles.cache.has(guild.roles.cache.find((role) => role.name === "Student ✅"))) {
        //if the member already has the join role that means they are already verified so.. tell them that someone is about to hack them!!
          member.send({
            embed: {
              description: `❌ Someone tried to verify their Discord account as you! If this was you, you may ignore this message. If this was not you, please immediately inform an **ADMIN** or **MOD** immediately!`,
              color: config.school_color,
              footer: { text: "SCU Discord Network Verification", },
              author: { name: "Verification Notice", icon_url: client.user.avatarURL(), },
              timestamp: new Date()
            },
          });
      } else {
        sendMessage(client, config.channels.auditlogs, { embed: { title: `__**✅ Verification Alert!**__`, description: `Verification: New data from **${req.body.discord}** (**${req.body.name}**)`, color: config.school_color, timestamp: new Date()}}); //will display new verification message if member tag matches input in Google form
        if (req.body.status === "SCU Faculty" && req.body.major === "undefined") {
          //changes nickname but skip onwards to grant status role and remove Unverified role
          member.setNickname(req.body.name);
        } else {
          //give member the verified role
          member.roles.add(guild.roles.cache.find((role) => role.id == config.serverRoles.verifiedStudent)); //the Student role
          //give member their major role
          member.roles.add(guild.roles.cache.find((role) => role.name == req.body.major));
          //give member their RLC role
          member.roles.add(guild.roles.cache.find((role) => role.name == req.body.rlc));
        }

        //set their nickname like this: [First Name] || [Major]
        //also, if nickname is over 32 characters, DM user about their invalid nickname and catch error and log it in #audit-logs so we could manually adjust it
        try {
            let nickname = `${req.body.name} || ${req.body.major}`;
            member.setNickname(`${nickname}`);
        } catch (err) {
            const nicknameError = { 
                title: `__**❌ <@${member.user.id}>'s nickname is over 32 characters!**__`, 
                description: `> **${req.body.discord}** returned **${nickname}**\n> Here is the error: ${err}!`, 
                color: config.school_color, 
                timestamp: new Date()
            }
            sendMessage(client, config.channels.auditlogs, { embed: nicknameError});
        }

        //give member their status role
        member.roles.add(guild.roles.cache.find((role) => role.name == req.body.status));
        //remove Unverified role from member
        member.roles.remove(guild.roles.cache.find((role) => role.id == config.serverRoles.unverifiedStudent));
        //send them a confirmation
        const verifyConfirmation = {
          title: `__**Successful Verification**__`,
          description: `✅ You have been verified successfully in the **${guild.name}** server! Here is your information for confirmation. If anything is inputted incorrectly, please tell contact **ADMIN** or **MOD** to quickly adjust your roles! Remember to read <#${config.channels.info}> for more information!`,
          color: config.school_color,
          footer: { text: "SCU Discord Network Verification", },
          author: { name: "Verification Confirmation", icon_url: client.user.avatarURL(), },
          image: { url: guild.splashURL(), },
          timestamp: new Date(),
          fields: [
            { name: "First Name", value: req.body.name, },
            { name: "Current Major", value: req.body.major, },
            { name: "Member Status", value: req.body.status, },
            { name: "Residential Learning Community", value: req.body.rlc },
            { name: "Discord Tag <-- (DiscordName#0000)", value: req.body.discord, },
          ],
        };
        member.send(`**<@${member.user.id}>**`, { embed: verifyConfirmation});
        const verifyEmbed = { title: `__**✅ NEW VERIFIED MEMBER!**__`, description: `You are now verified! Everyone please welcome **${req.body.name}** to the server!`, color: config.school_color, timestamp: new Date()};
        
        let verificationChannel = guild.channels.cache.get(config.channels.verificationlogs);
        verificationChannel.send(`**<@${member.user.id}>**`, { embed: verifyConfirmation}).then(m => m.react('👍'));
          
        let welcomeChannel = guild.channels.cache.get(config.channels.welcome);
        welcomeChannel.send(`**<@${member.user.id}>**`, { embed: verifyEmbed}).then(m => m.react('👋'));
      }
    } else {
      //if no body.. return this
      res.status(401).send({ error: "No data found" });
    }
  });
};
