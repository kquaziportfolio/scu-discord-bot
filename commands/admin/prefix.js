let isAdmin = require(`../../modules/isAdmin.js`);
let fs = require(`fs`);  

module.exports = { 
    name: 'prefix',
    description: 'Change the bot\'s prefix!',
    args: true,
    usage: `[enter prefix]`,
    category: 'Admin',  
    cooldown: 10,
    async execute(client, message, args) {
      try {
        if(isAdmin(client, message)) {  
          const defaultPrefix = JSON.parse(fs.readFileSync('./config.json')); 
          
          defaultPrefix.prefix = args[0];
          fs.writeFileSync('./config.json', JSON.stringify(defaultPrefix), 'utf-8');

          if (args[1] || args[0].length > 1) {
            return message.channel.send({ embed: { description: `:x: You can't set a double-argument prefix or one that's greater than one character!`, color: `RED`}});
          } else if (args[0] == client.config.prefix) { //detects if input resembles the current default value in the config.json
            return message.channel.send({ embed: { description: `:x: You can't set the prefix equal to its default value!`, color: `RED`}});
          } else if (args[0].match(/^[a-zA-Z]+$/)) { //detects if character is from alphabet, in either lowercase/uppercase form, will return nothing
            return message.channel.send({ embed: { description: `:x: You can't use any letters in the alphabet!`, color: `RED`}});
          } else { 
              let msg = await message.channel.send({ embed: { description: `Set the bot prefix to \`${args[0]}\`!`, color: client.config.school_color}});
              await msg.edit({embed: { description: `Wait a bit while I readjust!`, color: client.config.school_color}})
              
              process.exit();
          }
        }
      } catch(err) {
          console.log(err);
      }
    }
}
