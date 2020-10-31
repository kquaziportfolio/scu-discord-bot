const { MessageEmbed } = require(`discord.js`);
const isAdmin = require(`../../modules/isAdmin.js`);
const fs = require(`fs`);
const prefixConf = require('./prefix.json');

module.exports = {
    name: 'prefix',
    description: 'Change the prefix!',
    category: 'Admin',
    args: true,
    usage: `<new prefix>`,  
    async execute (client, message, args) {
        if(isAdmin(client, message, false)) {
            let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8")); //Read File
              prefixes[message.guild.id] = { //Let The config be
                prefix: args[0] //Let prefix = arguement 1
              }

              fs.writeFile("./prefix.json", JSON.stringify(prefixes), (err) => { //Write File
                if(err) console.log(err); //If error log error to the console
              });

            let newPrefix = new MessageEmbed() 
                .setColor(client.config.school_color)
                .setTitle(`**NEW PREFIX SET**`)
                .setDescription(`Set to \`${args[0]}\``)

            message.channel.send(newPrefix);
        }
    }
}
