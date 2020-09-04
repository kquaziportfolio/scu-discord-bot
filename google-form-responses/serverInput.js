const config = require(`../config.json`);
const OBS = require(`../events/obs.json`);
const OBS_list = OBS.obs;

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
    //define guild from ID in config
    const guild = client.guilds.cache.get(config.verification.guildID);
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    //This will start on port 2000, if this collides with another service you may change it
    const inputMSG = {
      title: "✅ SCU DISCORD NETWORK EXPRESS.JS INPUT SERVER",
      description: `Input server listening at port 2000 [here](${config.verification.inputURL})! ✅`,
      color: "GREEN", 
      timestamp: new Date()
    }
    app.listen(2000, () => {
      console.log(inputMSG.description);
      sendMessage(client, config.channels.auditlogs, { embed: inputMSG});
    });
    app.all("/", (req, res) => {
      res.status(200).send(`${inputMSG.title} was deployed on ${inputMSG.timestamp}`);
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
        if (member != null) {
          sendMessage(client, config.channels.auditlogs, { embed: { title: `__**:white_check_mark: New Input Alert!**__`, description: `Verification: New data from **${req.body.discord}**`, color: config.school_color, timestamp: new Date()}}); //will display new verification message if member tag matches input in Google form
    
          for (let i = 0; i < OBS_list.length; i++) {   
            if (req.body.input.includes(OBS_list[i].toLowerCase())) {
                let muteRole = "Muted";
                member.roles.add(guild.roles.cache.find((role) => role.name == muteRole));
                member.roles.remove(guild.roles.cache.find((role) => role.id == config.serverRoles.verifiedStudent));
                //send them a confirmation
                member.send({
                        embed: {
                        title: `__**Mute Notification**__`,
                        description: `You have violated the server rules. You'll be muted for one day.`,
                        color: config.school_color,
                        footer: {
                            text: "SCU Discord Network Input Violations",
                        },
                        image: {
                            url: guild.splashURL(),
                        },
                        timestamp: new Date(),
                        fields: [
                            {
                            name: "Discord User",
                            value: req.body.discord,
                            },
                            {
                            name: "Obscene Input",
                            value: `||${req.body.input}||`,
                            },
                        ],
                        },
                    });
                    sendMessage(client, config.channels.auditlogs, { embed: { title: `Obscene Input!`, title: `**USER MUTED**`, description: `- **${req.body.discord}** said ||${req.body.input}||`, color: config.school_color}});
                    setTimeout(() => {member.roles.remove(muteRole);}, 3600 * 1000).then(m => m.send('User has been unmuted.')) // <- sets a timeout to unmute the user.
            } else { 
                return sendMessage(client, config.channels.input, { embed: { title: `Questions/Suggestions?`, description: "```" + `${req.body.input}` + "```", thumbnail: { url: "https://jasonanhvu.github.io/assets/img/logo-pic.png"}, footer: { text: "Brought to you from Google forms!"}, timestamp: new Date(), color: config.school_color}});
            }
          } 
        } else {
            sendMessage(client, config.channels.auditlogs, { embed: { title: `__**❌ SCU Discord Network Bronco-Input**__`, description: `> **${req.body.discord}** returned **${member}**\n> Please contact them to fix it!`, color: config.school_color, timestamp: new Date()}});
        }
      } else {
        //if no body.. return this
        res.status(401).send({ error: "No data found" });
      }
    });
  };
