module.exports =  {  
	name: 'shutdown',
    description: 'Shut down the bot!',
    category: 'Admin',  
        async execute(client, message, args) {

            let isAdmin = require(`../../modules/isAdmin.js`);
            
            if (isAdmin(message, false)) {
                try {
                    const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];

                    if(!client.config.serverRoles.owner) return message.channel.send("You don't have permissions!");

                    const msg = await message.channel.send(`Shutting down the bot...`);
                    
                    for (const frame of frames) {
                        setTimeout(() => {}, 4000);
                        await msg.edit({ embed: { description: frame, color: client.config.school_color}});
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