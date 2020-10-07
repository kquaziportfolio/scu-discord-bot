const { MessageEmbed } = require(`discord.js`);
const fetch = require(`node-fetch`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'express', //here is a change in the file
    description: 'Check status of a server via an endpoint!',
    category: 'Admin',
    async execute(client, message, args) {
        message.delete();

        if(isAdmin(client, message, false)) {
            const url = client.config.verification.verifyURL;
            const status = await fetch(url)
            const getStatus = await status.text();

            const statusEmbed = new MessageEmbed()
            .setTitle(` VERIFICATION SERVER`)
            .setDescription(`${getStatus} - Check the status [here](${url})! :white_check_mark:`)
            .setColor(client.config.school_color)

            message.channel.send(statusEmbed);
        }
    }
}