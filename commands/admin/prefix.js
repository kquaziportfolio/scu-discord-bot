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
            prefixConf[message.guild.id].prefix = args[0];
            if (!prefixConf[message.guild.id].prefix) {
                prefixConf[message.guild.id].prefix = client.config.prefix; // If you didn't specify a Prefix, set the Prefix to the Default Prefix
            }
             fs.writeFile('./prefix.json', JSON.stringify(prefixConf, null, 2), (err) => {
                if (err) console.log(err)
            })

            let newPrefix = new MessageEmbed() 
            .setColor(client.config.school_color)
            .setTitle(`**NEW PREFIX SET**`)
            .setDescription(`Set to \`${args[0]}\``)

            message.channel.send(newPrefix);
        }
    }
}
