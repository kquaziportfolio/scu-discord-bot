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
            if (client.config.prefix !== prefixConf) {
                let finalConf = client.config;
                finalConf.prefix = prefixConf;
                fs.writeFile(`../../config.json`, JSON.stringify(finalConf, null, 1), (err) => {
                    if (err) throw err;
                });
            } else {
                message.channel.send("That already is the current prefix!");   
            }

            let newPrefix = new MessageEmbed() 
            .setColor(client.config.school_color)
            .setTitle(`**NEW PREFIX SET**`)
            .setDescription(`Set to \`${prefixConf}\``)

            message.channel.send(newPrefix);
        }
    }
}
