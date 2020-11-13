// ASSIGN VARIABLES
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], autoConnect: true } );
const Enmap = require("enmap");
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = require(`./config.json`);

client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on("error", console.error);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap(); 

const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    for (const subdirectory of subdirectories) { 
      const command = require(`./commands/${subdirectories}/${file}`);
      client.commands.set(command.name, command);
    }
}

// BOT TOKEN
client.login(client.config.token);
