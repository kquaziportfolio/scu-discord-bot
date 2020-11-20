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
          let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
          if(!prefixes[message.guild.id]) {  //If there is no string that is startwith prefixes[message.guild.id]
            prefixes[message.guild.id] = { //Let prefixes[message.guild.id] be
              prefix: config.prefix //Prefix = Default Prefix Which is on config.json
            }
          }

         let prefix = prefixes[message.guild.id].prefix; //Let prefix be prefixes[message.guild.id].prefix
             
          if (args[1] || args[0].length > 1) {
            return message.channel.send({ embed: { description: `:x: You can't set a double-argument prefix or one that's greater than one character!`, color: `RED`}});
          } else if (args[0] == prefixes[message.guild.id].prefix) { //detects if input resembles the default value in the config.json
            return message.channel.send({ embed: { description: `:x: You can't set the prefix equal to its default value!`, color: `RED`}});
          } else if (args[0].match(/^[a-zA-Z]+$/)) { //detects if character is from alphabet, in either lowercase/uppercase form, will return nothing
            return message.channel.send({ embed: { description: `:x: You can't use any letters in the alphabet!`, color: `RED`}});
          }

          prefixes[message.guild.id] = { //Let the file be read
            prefix: args[0] //Let prefix = argument 1
          }
            
          fs.writeFile("./prefix.json", JSON.stringify(prefixes), (err) => { //Write File
            if(err) console.log(err); //If error log error to the console
          })

          message.channel.send({ embed: { description: `Set the bot prefix to \`${args[0]}\`!`, color: client.config.school_color}});
        
        }
    }
}
