const { MessageEmbed } = require(`discord.js`);
const fetch = require(`node-fetch`);
let isAdmin = require(`../../modules/isAdmin.js`);
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = { 
    name: 'express', //here is a change in the file
    description: 'Check status of the verification server via an endpoint!',
    category: 'Admin',
    async execute(client, message, args) {

        if(isAdmin(client, message, true)) {
            const url = client.config.verification.verifyURL;
            const status = await fetch(url);
            const getStatus = await status.text();
            
            if (!status.ok) {
                sendMessage(client, client.channels.auditlogs, { embed: { title: `Error :x:`, description: `Go to [https://pitunnel.com](PiTunnel) and reset using the following commands: \`${client.config.verification.mappingRule}\``, color: client.config.school_color}});
            }
            
            const statusEmbed = new MessageEmbed()
            .setTitle(` VERIFICATION SERVER`)
            .setDescription(`${getStatus} - Check the status [here](${url})!`)
            .setColor(client.config.school_color)

            message.channel.send(statusEmbed);
        }
    }
}
