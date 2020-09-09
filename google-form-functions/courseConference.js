/*

░██╗░░░░░░░██╗██╗██████╗░  ░█████╗░██╗░░░░░░█████╗░░██████╗░██████╗
░██║░░██╗░░██║██║██╔══██╗  ██╔══██╗██║░░░░░██╔══██╗██╔════╝██╔════╝
░╚██╗████╗██╔╝██║██████╔╝  ██║░░╚═╝██║░░░░░███████║╚█████╗░╚█████╗░
░░████╔═████║░██║██╔═══╝░  ██║░░██╗██║░░░░░██╔══██║░╚═══██╗░╚═══██╗
░░╚██╔╝░╚██╔╝░██║██║░░░░░  ╚█████╔╝███████╗██║░░██║██████╔╝██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░░░░  ░╚════╝░╚══════╝╚═╝░░╚═╝╚═════╝░╚═════╝░

░█████╗░░█████╗░███╗░░██╗███████╗███████╗██████╗░███████╗███╗░░██╗░█████╗░███████╗
██╔══██╗██╔══██╗████╗░██║██╔════╝██╔════╝██╔══██╗██╔════╝████╗░██║██╔══██╗██╔════╝
██║░░╚═╝██║░░██║██╔██╗██║█████╗░░█████╗░░██████╔╝█████╗░░██╔██╗██║██║░░╚═╝█████╗░░
██║░░██╗██║░░██║██║╚████║██╔══╝░░██╔══╝░░██╔══██╗██╔══╝░░██║╚████║██║░░██╗██╔══╝░░
╚█████╔╝╚█████╔╝██║░╚███║██║░░░░░███████╗██║░░██║███████╗██║░╚███║╚█████╔╝███████╗
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚══════╝╚═╝░░╚══╝░╚════╝░╚══════╝

░██████╗██╗░░░██╗░██████╗████████╗███████╗███╗░░░███╗
██╔════╝╚██╗░██╔╝██╔════╝╚══██╔══╝██╔════╝████╗░████║
╚█████╗░░╚████╔╝░╚█████╗░░░░██║░░░█████╗░░██╔████╔██║
░╚═══██╗░░╚██╔╝░░░╚═══██╗░░░██║░░░██╔══╝░░██║╚██╔╝██║
██████╔╝░░░██║░░░██████╔╝░░░██║░░░███████╗██║░╚═╝░██║
╚═════╝░░░░╚═╝░░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░░░░╚═╝ */


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
              "key": "string for basically a password to authenticate requests", //get a random string of some sort?
              ""
          }
      }
      INCOMING OBJECT FROM GOOGLE FORMS
      {
          "name": "First/Last name",
          "course": "List of courses",
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
      title: "✅ SCU DISCORD NETWORK EXPRESS.JS COURSE CONFERENCE SERVER",
      description: `Verification listening at port 3000 [here](${config.verification.verifyURL})! ✅`,
      color: "GREEN", 
      timestamp: new Date()
    }
    app.listen(3000, () => {
      console.log(verifyMSG.description);
      sendMessage(client, config.channels.auditlogs, { embed: verifyMSG});
    });
    app.all("/", (req, res) => {
      res.status(200).send(`${verifyMSG.title} was deployed on ${verifyMSG.timestamp}`);
    });
    app.post("/getCourse", (req, res) => {
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
          sendMessage(client, config.channels.auditlogs, { embed: { title: `__**❌ SCU Discord Network Course Conference**__`, description: `> **${req.body.discord}** returned **${member}**\n> Please contact them to fix it!`, color: config.school_color, timestamp: new Date()}});
        } else {
          sendMessage(client, config.channels.auditlogs, { embed: { title: `__**✅ New Course Conference Alert!**__`, description: `Course Conference: New data from **${req.body.discord}** (**${req.body.name}**)`, color: config.school_color, timestamp: new Date()}}); //will display new verification message if member tag matches input in Google form
          //when user fills in the checkbox options, it will give them roles for their selected courses

          //give member their base Class Conference role
          member.roles.add(guild.roles.cache.find((role) => role.id === config.serverRoles.classConference));

          //give member their specific course role
          member.roles.add(guild.roles.cache.find((role) => role.name == req.body.courses));

          const random_hex_color_code = () => { //random hex generator to keep role colors interested
            let n = (Math.random() * 0xfffff * 1000000).toString(16);
            return '#' + n.slice(0, 6);
          };

          if (req.body.courses != null) { //if user makes another option , therefore not null, create new role that opens up a text/voice channel beneath the Classes category
            guild.roles.create({
                data: {
                    name: req.body.courses, 
                    color: random_hex_color_code(), //generates random hex color for roles
                    permissions: ['ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES',
                    'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_VAD', 'CHANGE_NICKNAME']
                }
            })

            guild.channels.create(req.body.courses, { // name text channel after name of course
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.guild.id, //@everyone can't view channel
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: config.serverRoles.classConference,
                        allow: ['ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'STREAM',
                        'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'CONNECT', 'SPEAK', 'USE_VAD', 'CHANGE_NICKNAME'],
                        deny: ['CREATE_INSTANT_INVITE', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE PERMISSIONS', 'SEND_TTS_MESSAGES']
                    }
                ],
            }).then(m => {
                m.setParent(config.category.classes); //sync text channel to category permissions
            });

            guild.channels.create(req.body.courses, { // name voice channel after name of course
                type: 'voice',
                permissionOverwrites: [
                    {
                        id: message.guild.id, //@everyone can't view channel
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: config.serverRoles.classConference,
                        allow: ['CONNECT', 'SPEAK', 'VIDEO'],
                    }
                ],
            }).then(m => {
                m.setParent(config.category.classes); //sync voice channel to category permissions
            });
          }

          //send them a confirmation
          const courseConfirmation = {
            title: `__**Successful Courses Added**__`,
            description: `✅ You have filled out the course conference form successfully in the **${guild.name}** server! Here is your information for confirmation. If anything is inputted incorrectly, please tell contact **ADMIN** or **MOD** to quickly adjust your roles! Remember to read <#${config.channels.info}> for more information!`,
            color: config.school_color,
            footer: {
              text: "SCU Discord Network Course Conference Confirmation",
            },
            author: {
              name: "Course Conference Confirmation",
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
                name: "Courses",
                value: req.body.courses,
              },
              {
                name: "Discord Tag <-- (DiscordName#0000)",
                value: req.body.discord,
              },
            ],
          };
          member.send(`**<@${member.user.id}>**`, { embed: courseConfirmation});

          let verificationChannel = guild.channels.cache.get(config.channels.verificationlogs);
          verificationChannel.send(`**<@${member.user.id}>**`, { embed: courseConfirmation}).then(m => m.react('👍'));
        }
      } else {
        //if no body.. return this
        res.status(401).send({ error: "No data found" });
      }
    });
};