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
            "key": "string for basically a password to authenticate requests", //get a string of some sort?
            ""
        }
    }
    INCOMING OBJECT FROM GOOGLE FORMS
    {
        "name": "First/Last name",
        "email": "Student's email for backup"
        "major": "Current Major",
        "class": "Graduating class year",
        "discord": "Discord Username with Tag"
    }
  */

  //define guild from ID in config
  const guild = client.guilds.cache.get(config.verification.guildID);
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  //This will start on port 2000, if this collides with another service you may change it
  app.listen(5354, () => {
    const verifyMSG = {
      title: "It works!",
      description: "Verification listening at port 5354! ✅",
      color: "GREEN"
    }
    console.log(verifyMSG.description);
    sendMessage(client, "audit-logs", { embed: verifyMSG});
  });
  app.all("/", (req, res) => {
    res.status(200).send({ error: "Invalid Path ❌" });
  });
  app.post("/verify", (req, res) => {
    //some basic auth
    if (req.headers["key"] != config.verification.key) {
      //api key checker
      res.status(401).send({ error: "Invalid API Key ❌" });
      //data in body checker
    } else if (Object.keys(req.body).length > 0) {
      res.status(200).send({ status: "Successful" });
      sendMessage(client, "audit-logs", { embed: { title: `__**Verification Alert!**__`, description: `✅ Verification: New data from **${req.body.discord}** (**${req.body.name}**)`, color: 10231598}});
      //find member in guild
      let member = guild.members.cache.find((member) => member.user.tag == req.body.discord);
      //if the member isnt in the guild return an error in console
      if (member == null) {
        member.send({ embed: { description: `__ ❌ SCU Discord Network Verification__\n> **${req.body.discord}** returned ${member}\n> Contact an **ADMIN** or **MOD** to fix`, color: 10231598}});
        return;
      }
      //if the member already has the join role that means they are already verified so.. tell them that someone is about to hacks them!!
      if (member.roles.cache.has(guild.roles.cache.find((role) => role.id == "710595826996609053").id))
        return member.send({
          embed: {
            description: "❌ Someone tried to verify their Discord account as you! If this was you, you may ignore this message. If this was not you, please immediately inform an <@&709118762707845211> or <@&710593727864897646>!",
            color: 10231598,
            footer: {
              text: "SCU Discord Network Verification",
            },
            author: {
              name: "Verification Notice",
              icon_url: client.user.avatarURL(),
            },
          },
        });
      //remove Unverified role from member
      member.roles.remove(guild.roles.cache.find((role) => role.name == "Unverified"));
      //give member the verified role
      member.roles.add(guild.roles.cache.find((role) => role.id == "710595826996609053")); //the Student role
      //give member their class role
      member.roles.add(guild.roles.cache.find((role) => role.name == req.body.class));
      //give member their major role
      member.roles.add(guild.roles.cache.find((role) => role.name == req.body.major));
      //send them a confirmation
      member.send({
        embed: {
          title: `__**Successful Verification**__`,
          description: `✅ You have been verified successfully in the **${guild.name}** Discord server! Here is your information for confirmation. If anything is inputted incorrectly, please tell contact **ADMIN** or **MOD** to quickly adjust your roles! Remember to read <#709118412542050368> for more information!`,
          color: 10231598,
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
          fields: [
            {
              name: "Full Name",
              value: req.body.name,
            },
            {
              name: "Current Major",
              value: req.body.major,
            },
            {
              name: "Graduating Class",
              value: req.body.class,
            },
            {
              name: "Discord Tag",
              value: req.body.discord,
            },
          ],
        },
      });
      guild.channels.cache.get(config.welcomeChannelID).send({ embed: { title: `__**NEW VERIFIED MEMBER!**__`, description: `✅ **<@${member.user.id}>** is now verified, everyone please welcome **${req.body.name}** to the server!`, color: 10231598}});
      sendMessage(client, "verification-logs", { embed: { description: `**__New Verified User! ✅__**\n**Name:** ${req.body.name}\n**Major:** ${req.body.major}\n**Class:** ${req.body.class}\n**Discord Tag:** ${member}`, thumbnail: { url: `https://jasonanhvu.github.io/assets/img/logo-pic.png` }, color: 10231598}});
    } else {
        //if no body.. return this
        res.status(401).send({ error: "No data found" });
    }
  });
};
