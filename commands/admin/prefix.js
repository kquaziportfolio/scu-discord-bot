let isAdmin = require(`../../modules/isAdmin.js`);
let fs = require(`fs`); 

module.exports = { 
    name: 'prefix',
    description: 'Change the bot\'s prefix!',
    args: true,
    usage: `[enter prefix]`,
    category: 'Admin',  
    async execute(client, message, args) {
        if(isAdmin(client, message)) {
          let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8")); //Read File
            
          prefixes[message.guild.id] = { //Let The config be
            prefix: args[0] //Let prefix = arguement 1
          }

          fs.writeFile("./prefix.json", JSON.stringify(prefixes), (err) => { //Write File
            if(err) console.log(err); //If error log error to the console
          })
            
          if (args[1] || args[0].length > 1) {
            return await message.channel.send({ embed: { description: `You can't set a double-argument prefix or one that's over 1 character!`, color: client.config.school_color}});
          } 

          await message.channel.send({ embed: { description: `Set the bot prefix to ${args[0]}!`, color: client.config.school_color}});
        }
    }
}
