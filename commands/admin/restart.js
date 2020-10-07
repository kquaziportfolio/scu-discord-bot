module.exports =  {  
	name: 'restart',
    description: 'Restart the bot!',
    category: 'Admin',  
	async execute(client, message, args) {
        message.delete(); 

        let isAdmin = require(`../../modules/isAdmin.js`);        

        if(isAdmin(client, message, false)) {

            try {
                const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];

                const msg = await message.channel.send(`Restarting the bot...`);
                
                for (const frame of frames) {
                    setTimeout(() => {}, 4000);
                    await msg.edit({ embed: { description: frame, color: client.config.school_color}});
                }

                return message;

            } catch (err) {
                console.log(err.message);
            } finally {
                process.exit();
            }
        }
    }
}