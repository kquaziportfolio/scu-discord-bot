module.exports.run = (client, config) => {
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  var app = express();
  function sendMessage(client, channel, content) {
    client.guilds.cache.map((g) => {
      try {
        g.channels.cache.find((ch) => ch.id == channel || ch.name == channel).send(content);
      } catch (e) {
        return;
      }
    });
  }
  /* ADD THIS OBJECT TO YOUR CONFIG FILE (or move the properties somewhere else)
    {
        verification: {
            "guildID": "string of guild enabled in",
            "key": "string for basically a password to authenticate requests", //get sa string of some sort?
            ""
        }
    }
    INCOMING OBJECT FROM GOOGLE FORMS
    {
        "name": "First/Last name",
        "email": "Student's email for backup"
        "major": "Current Major",
        "status": "Member Status",
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
    title: "It works!",
    description: "Verification listening at port 5354! ✅",
    color: "GREEN", 
    timestamp: new Date()
  }
  app.listen(5354, () => {
    console.log(verifyMSG.description);
    sendMessage(client, "audit-logs", { embed: verifyMSG});
  });
  app.all("/", (req, res) => {
    res.status(200).send(verifyMSG.description);
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
        sendMessage(client, "audit-logs", { embed: { title: `__**❌ SCU Discord Network Verification**__`, description: `> **${req.body.discord}** returned **${member}**\n> Please contact them to fix it!`, color: config.school_color, timestamp: new Date()}});
      } else if (member.roles.cache.has(guild.roles.cache.find((role) => role.name === "Student ✅"))) {
        //if the member already has the join role that means they are already verified so.. tell them that someone is about to hack them!!
          member.send({
            embed: {
              description: `❌ Someone tried to verify their Discord account as you! If this was you, you may ignore this message. If this was not you, please immediately inform an **ADMIN** or **MOD** immediately!`,
              color: config.school_color,
              footer: {
                text: "SCU Discord Network Verification",
              },
              author: {
                name: "Verification Notice",
                icon_url: client.user.avatarURL(),
              },
              timestamp: new Date()
            },
          });
      } else {
        sendMessage(client, "audit-logs", { embed: { title: `__**✅ Verification Alert!**__`, description: `Verification: New data from **${req.body.discord}** (**${req.body.name}**)`, color: config.school_color, timestamp: new Date()}}); //will display new verification message if member tag matches input in Google form
        if (req.body.status === "SCU Faculty" && req.body.major === "undefined") {
          //changes nickname but skip onwards to grant status role and remove Unverified role
          member.setNickname(req.body.name);
        } else {
          //give student member the verified role
          member.roles.add(guild.roles.cache.find((role) => role.id == config.serverRoles.verifiedStudent)); //the Student role
          //give student member their major role
          member.roles.add(guild.roles.cache.find((role) => role.name == req.body.major));
        }

        //set their nickname like this: [First Name] || [Major]
        //also, if nickname is over 32 characters, DM user about their invalid nickname and catch error and log it in #audit-logs 
        try {
            let nickname = `${req.body.name} [${req.body.major}]`;
            member.setNickname(`${nickname}`);
        } catch (err) {
            const nicknameError = { 
                title: `__**❌ <@${member.user.id}>, your nickname is over 32 characters!**__`, 
                description: `> **${req.body.discord}** returned **${nickname}**\n> Here is the error: ${err}!`, 
                color: config.school_color, 
                timestamp: new Date(),
                author: {
                  name: "Nickname Notice",
                  icon_url: client.user.avatarURL(),
                },
                footer: {
                  text: "SCU Discord Network",
                },
            }
            member.send(nicknameError);
            sendMessage(client, "audit-logs", { embed: nicknameError});
        }
 
        //give member their status role
        member.roles.add(guild.roles.cache.find((role) => role.name == req.body.status));
        //remove Unverified role from member
        member.roles.remove(guild.roles.cache.find((role) => role.id == config.serverRoles.unverifiedStudent));
        //send them a confirmation
        member.send({
          embed: {
            title: `__**Successful Verification**__`,
            description: `✅ You have been verified successfully in the **${guild.name}** server! Here is your information for confirmation. If anything is inputted incorrectly, please tell contact **ADMIN** or **MOD** to quickly adjust your roles! Remember to read <#${config.infoChannelID}> for more information!`,
            color: config.school_color,
            footer: {
              text: "SCU Discord Network Verification",
            },
            author: {
              name: "Verification Confirmation",
              icon_url: client.user.avatarURL(),
            },
            image: {
              url: guild.splashURL(),
            },
            timestamp: new Date(),
            fields: [
              {
                name: "First Name",
                value: req.body.name,
              },
              {
                name: "Current Major",
                value: req.body.major,
              },
              {
                name: "Member Status",
                value: req.body.status,
              },
              {
                name: "Discord Tag <-- (DiscordName#0000)",
                value: req.body.discord,
              },
            ],
          },
        });
        guild.channels.cache.get(config.channels.welcome).send({ embed: { title: `__**✅ NEW VERIFIED MEMBER!**__`, description: `**<@${member.user.id}>** is now verified, everyone please welcome **${req.body.name}** to the server!`, color: config.school_color, timestamp: new Date()}}).then(m => m.react('👋'));
        let verificationChannel = guild.channels.cache.find(channel => channel.id === config.channels.verificationlogs);
        verificationChannel.send({ embed: { description: `**__✅ New Verified User! __**\n**First Name:** ${req.body.name}\n**Major:** ${req.body.major}\n**Member Status:** ${req.body.status}\n**Discord Tag:** ${member}`, thumbnail: { url: `https://jasonanhvu.github.io/assets/img/logo-pic.png` }, color: config.school_color, timestamp: new Date()}}).then(m => m.react('👍'));
      }
    } else {
      //if no body.. return this
      res.status(401).send({ error: "No data found" });
    }
  });
};
