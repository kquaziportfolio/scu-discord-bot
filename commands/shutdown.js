const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require('../config.json');
let isAdmin = require(`../modules/isAdmin.js`);

module.exports =  {  
	name: 'shutdown',
    description: 'Shut down the bot!',
    usage: `${config.prefix}restart`,
        async execute(message, args) {
            if (isAdmin(message.author, message)) {
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
                    client.destroy();
                }
            }
        }
}