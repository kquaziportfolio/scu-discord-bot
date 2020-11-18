let isAdmin = require(`../../modules/isAdmin.js`);
let sendMessage = require(`../../modules/sendMessage`);
var exec = require('child_process').exec, child;

child = exec('git pull',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
module.exports = {
    name:"git-reload",
    description: "Git pulls from my repo and restarts the bot from Discord!",
    cooldown: 20,
    category: "Admin",
    async execute(client,message,args) {
        if (isAdmin(client, message)) {
            try {
                await message.channel.send("Pulling from the repo...");
                child();
                const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];

                const msg = await message.channel.send(`Restarting the bot...`);
                
                for (const frame of frames) {
                    setTimeout(() => {}, 4000);
                    await msg.edit({ embed: { description: frame, color: client.config.school_color}});
		        }
            } catch (err) {
                console.log(err.message);
            } finally {
                process.exit();
            }
        }
    }
}
