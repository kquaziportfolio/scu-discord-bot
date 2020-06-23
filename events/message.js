const Discord = require(`discord.js`); //requires Discord.js integration package
const client = new Discord.Client();
const { prefix } = require(`../config.json`)

module.exports = async (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        await message.channel.send({embed: {
            description: "There was an error trying to execute that command!", 
            color: 10231598
            }
        }).then(msg => { msg.delete({ timeout: 5000 })
        }).catch(err => console.log(`Error: ${err}`));
    }
};