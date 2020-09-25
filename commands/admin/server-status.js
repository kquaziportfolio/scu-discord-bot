const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config.json`);
const fetch = require(`node-fetch`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'server-status', //here is a change in the file
    description: 'Check status of a server via an endpoint!',
    category: 'Admin',
    async execute(message, args) {
        message.delete();

        if(isAdmin(message, false)) {
            const url = config.verification.verifyURL;
            const status = await fetch(url)
            const getStatus = await status.text();

            const statusEmbed = new MessageEmbed()
            .setTitle(` VERIFICATION SERVER`)
            .setDescription(`${getStatus} - Check the status [here](${url})! :white_check_mark:`)
            .setColor(config.school_color)

            message.channel.send(statusEmbed);
        }
    }
}