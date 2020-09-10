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
╚═════╝░░░░╚═╝░░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░░░░╚═╝ 
*/

/*
- Give them base class conference role
- Loop thru the courses they ticked in the form and give them those roles, otherwise create new ones if they hadn't already existed
- Every role created from the form will have the following permissions stated in lines 110-111
- For each new channel, iterate thru all of them to create text channels with the specific course names
- Set text and voice to sync with the category permissions (so basically all students with base "class conference" role will only see the channels)
- send them confirmation -> the end lol
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
    description: `Verification listening at port 2000 [here](${config.verification.inputURL})! ✅`,
    color: "GREEN", 
    timestamp: new Date()
  }
  app.listen(2000, () => {
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
      } else if (member.roles.cache.has(guild.roles.cache.find((role) => role.id === config.serverRoles.courseConference))) {
        //if the member already has the join role that means they are already verified so.. tell them that someone is about to hack them!!
          member.send({
            embed: {
              description: `❌ Someone tried to obtain a Course Conference role on their Discord account as you! If this was you, you may ignore this message. If this was not you, please immediately inform an **ADMIN** or **MOD** immediately!`,
              color: config.school_color,
              footer: {
                text: "SCU Discord Network Course Conference",
              },
              author: {
                name: "Alert Notice",
                icon_url: client.user.avatarURL(),
              },
              timestamp: new Date()
            },
          });
      } else {
        sendMessage(client, config.channels.auditlogs, { embed: { title: `__**✅ New Course Conference Alert!**__`, description: `Course Conference: New data from **${req.body.discord}** (**${req.body.name}**)`, color: config.school_color, timestamp: new Date()}}); //will display new verification message if member tag matches input in Google form
        //when user fills in the checkbox options, it will give them roles for their selected courses

        //give member their base Class Conference role
        member.roles.add(guild.roles.cache.find((role) => role.id === config.serverRoles.courseConference));

        const random_hex_color_code = () => { //random hex generator to keep role colors interesting
          let n = (Math.random() * 0xfffff * 1000000).toString(16);
          return '#' + n.slice(0, 6);
        };

        //give member their specific course role and assign it to them
        //if not, then create new role then assign it to them
        req.body.courses.forEach(course => {
          let role = guild.roles.cache.find(ch => ch.name == course);
        
          if(role) {
            member.roles.add(role.id);
          } else {
            guild.roles.create({
              data: {
                name: course, 
                color: random_hex_color_code(), //generates random hex color for roles
                permissions: ['ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', //Give them these following permissions 
                'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_VAD', 'CHANGE_NICKNAME']
              }
            }).then(r => { member.roles.add(r.id)});
          }
        
          let textChannel = guild.channels.cache.find(ch => ch.name == course);
          if(!textChannel) {
            //create category then in a promise create a text/voice channel I didn't show the full thing but you kno how to do it
            guild.channels.create(course, {
              type: 'text',
              permissionOverwrites: [
                {
                  id: config.serverRoles.everyone, //@everyone can't view channel
                  deny: ['VIEW_CHANNEL'],
                },
                {
                  id: course.id,
                  allow: ['VIEW_CHANNEL'],
                }
              ],
            }).then(m => m.setParent(config.category.classes);
          }
  
          let voiceChannel = guild.channels.cache.find(ch => ch.name == course);
          if(!voiceChannel) {
            guild.channels.create(course, { // name voice channel after name of course
              type: 'voice',
              permissionOverwrites: [
                {
                  id: config.serverRoles.everyone, //@everyone can't view channel
                  deny: ['VIEW_CHANNEL'],
                },
                {
                  id: course.id,  
                  allow: ['VIEW_CHANNEL'],
                }
              ],
            }) .then(m => m.setParent(config.category.classes);
          }
        });
        
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
