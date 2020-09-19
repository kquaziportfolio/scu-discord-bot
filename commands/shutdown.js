const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require('../config.json');

module.exports =  {  
	name: 'shutdown',
    description: 'Shut down the bot!',
    usage: `${config.prefix}shutdown`,
    guildOnly: false,
        async execute(message, args) {
            message.delete();

            let isAdmin = require(`../modules/isAdmin.js`);
            
            if (isAdmin(message, false)) {
                try {
                    const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];

                    if(!config.serverRoles.owner) return message.channel.send("You don't have permissions!");

                    const msg = await message.channel.send(`Shutting down the bot...`);
                    
                    for (const frame of frames) {
                        setTimeout(() => {}, 4000);
                        await msg.edit({ embed: { description: frame, color: config.school_color}});
                    }

                    return message;

                } catch (err) {
                    console.log(err.message);
                } finally {
                    client.destroy(err => {
                        console.log("====================");
                        console.log("Command: [!@shutdown] run by " + message.author.username);
                        console.log("====================");
                        console.log(err);
                    });
                }
            }
        }
}