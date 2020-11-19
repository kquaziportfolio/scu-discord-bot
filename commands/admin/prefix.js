let isAdmin = require(`../../modules/isAdmin.js`);
let fs = require(`fs`);
const { prefix } = require(`../../config.json`);

module.exports = { 
    name: 'prefix',
    description: 'Change the bot\'s prefix!',
    args: true,
    usage: `[enter prefix]`,
    category: 'Admin',  
    async execute(client, message, args) {
        if(isAdmin(client, message)) {
          let prefixes = JSON.parse(fs.readFileSync(`../../config.json`, "utf8"));

          prefixes[message.guild.id] = {
            prefixes: args[0]
          };

          fs.writeFile(`../../config.json`, JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
          });

          if(args[1] || args[0].length > 1) {
            return await message.channel.send({ embed: { description: `You can't set a double-argument prefix or one that's over 1 character!`, color: client.config.school_color}});
          }

          await message.channel.send({ embed: { description: `Set the bot prefix to ${args[0]}!`, color: client.config.school_color}});
        }
    }
}
