// ASSIGN VARIABLES
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], autoConnect: true } );
const Enmap = require("enmap");
const fs, { readdirSync } = require("fs"); 
const path = require('path')
const ascii = require(`ascii-table`);

const table = new ascii(`Commands`);
table.setHeading(`Command`, `Load Status`);

// Need to make sure the config is attached to the CLIENT so it's accessible everywhere!
client.config = require(`./config.json`);

client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on("error", console.error);       

client.login(client.config.token)

try { 
  /*
  ====================================================================
  ______               _     _    _                 _ _           
  |  ____|             | |   | |  | |               | | |          
  | |____   _____ _ __ | |_  | |__| | __ _ _ __   __| | | ___ _ __ 
  |  __\ \ / / _ \ '_ \| __| |  __  |/ _` | '_ \ / _` | |/ _ \ '__|
  | |___\ V /  __/ | | | |_  | |  | | (_| | | | | (_| | |  __/ |   
  |______\_/ \___|_| |_|\__| |_|  |_|\__,_|_| |_|\__,_|_|\___|_|   
  ====================================================================
  */    
  
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    }) 
  });
  
  /*
  ==============================================================================================
     _____                                          _   _    _                 _ _           
    / ____|                                        | | | |  | |               | | |          
   | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| | | |__| | __ _ _ __   __| | | ___ _ __ 
   | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` | |  __  |/ _` | '_ \ / _` | |/ _ \ '__|
   | |___| (_) | | | | | | | | | | | (_| | | | | (_| | | |  | | (_| | | | | (_| | |  __/ |   
    \_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_| |_|  |_|\__,_|_| |_|\__,_|_|\___|_|   
  ==============================================================================================
  */

  /*loops and reads through my subdirectories - admin, fun, and utility - 
  and iterates thru individual command files in them*/

  client.commands = new Enmap();

  readdirSync(`./commands/`).forEach(dir => {
      const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith(`.js`));
      for (let file of commands) {
          let props = require(`../commands/${dir}/${file}`);
          if (props.name) {
              client.commands.set(props.name, props);
              table.addRow(file, `✅`);
          } else {
              table.addRow(file, `❌ > missing name or name isn't a string`);
          }
      } 
  });  
} catch (err) {
    console.log(err);
} finally { 
    console.log(table.toString());
}
