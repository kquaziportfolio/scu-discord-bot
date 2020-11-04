let isAdmin = require(`../../modules/isAdmin.js`);

module.exports  = {
    name: 'dm',
    description: 'Direct message!',   
    args: true,
    usage: `[@user] [message content]`, 
    category: 'Admin',  
    async execute(client, message, args) {
        
        if(isAdmin(client, message, false)) {
            if (!args[0].startsWith(`@`)) {
                return message.channel.send({ embed: { description: `You must mention a user!`, color: client.config.school_color}});
              } else {
                try {
                    let member = message.guild.member(message.mentions.users.first());
                    let msgSender = args.join(" ").replace(`${member}`, "\n");
                    member.send(msgSender);
                    message.channel.stopTyping(true);
                } catch (e) {
                    console.log("There was an error sending that DM", e);
                }
            }
        }  
    }
}
