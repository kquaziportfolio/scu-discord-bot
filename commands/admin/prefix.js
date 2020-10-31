const { MessageEmbed } = require(`discord.js`);
const isAdmin = require(`../../modules/isAdmin.js`);
const error = require(`../../modules/error.js`);
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
            if (client.config.prefix !== prefixConf.prefix) {
                let finalConf = client.config;
                finalConf.prefix = prefixConf.prefix;
                fs.writeFile(`../../config.json`, JSON.stringify(finalConf, null, 3), (err) => {
                    if (err) throw err;
                    message.channel.send(`Successfully updated prefix to \`${prefixConf.prefix}\``);
                });
            } else {
                message.channel.send("That already is the current prefix!");   
            }

            let newPrefix = new MessageEmbed() 
            .setColor(client.config.school_color)
            .setTitle(`**NEW PREFIX SET**`)
            .setDescription(`Set to \`${args[0]}\``)

            message.channel.send(newPrefix);
        }
    }
}
