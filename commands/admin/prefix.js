const { MessageEmbed } = require(`discord.js`);
const isAdmin = require(`../../modules/isAdmin.js`);
const fs = require(`fs`);

module.exports = {
    name: 'prefix',
    description: 'Change the prefix!',
    category: 'Admin',
    args: true,
    usage: `<new prefix>`,  
    async execute (client, message, args) {
        if(isAdmin(client, message, false)) {
            let prefixes = JSON.parse(fs.readFileSync(`./../../../prefix.json`, `utf-8`));

            prefixes[message.guild.id] = {
                prefixes: args[0]
            };

            fs.writeFile(`../../prefix.json`, JSON.stringify(prefixes), (err) => {
                if (err) {
                    console.log(err)
                }
            });

            let newPrefix = new MessageEmbed() 
            .setColor(client.config.school_color)
            .setTitle(`**NEW PREFIX SET**`)
            .setDescription(`Set to \`${args[0]}\``)

            message.channel.send(newPrefix);
        }
    }
}
