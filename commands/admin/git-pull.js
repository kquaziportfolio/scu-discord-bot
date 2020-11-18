let isAdmin = require(`../../modules/isAdmin.js`); 
const child_proc = require('child_process');
 
module.exports = {
    name:"git-pull",
    description: "Git pulls from my repo!",
    cooldown: 20,
    category: "Admin",
    async execute(client,message,args) {
        if (isAdmin(client, message)) {
            try {
                const frames = ['□', '□□□□ 25%', '□□□□□□□□ 50', '□□□□□□□□□□□□ 75%', '□□□□□□□□□□□□□□□□ 100%'];
	        const msg= await child_proc.exec("git pull origin master");
                
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
