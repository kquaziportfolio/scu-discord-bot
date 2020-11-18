let isAdmin = require(`../../modules/isAdmin.js`);
let sendMessage = require(`../../modules/sendMessage`);
const child_proc = require('child_process');


module.exports = {
    name:"git-pull",
    description: "Git pulls from my repo!",
    cooldown: 20,
    category: "Admin",
    async execute(client,message,args) {
        if (isAdmin(client, message)) {
            try {
                await message.channel.send("Pulling from the repo...");
                const msg=child_proc.exec("git pull");
                const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];
                
                for (const frame of frames) {
                    setTimeout(() => {}, 4000);
                    await msg.edit({ embed: { description: frame, color: client.config.school_color}});
		}
            } catch (err) {
                console.log(err.message);
            }
        }
    }
}
