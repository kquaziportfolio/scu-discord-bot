const config = require('../config.json');

module.exports  = {
    name: 'dm-all',
    description: 'direct message!',   
    usage: `${config.prefix}dm-all`,
    guildOnly: true,
    async execute(message, args) {
        message.delete();

        let note = args.join(" ").split("|");
        if (!note[2] || note.length < 3) return message.channel.send("```Here's an example: &dm-all Title | Description```")
        
        // Async context (within async function), 'message' being the command message.

        const members = message.guild.members.cache.filter(m => !m.user.bot).array(); // Filter out bots.

        let undelivered = 0;

        for (let i = 0; i < members.length; i++) {  // Using an array and a for loop rather than
            const member = members[i];                // Collection.forEach() due to the fact that
            await member.send(`${member}`, { embed: { title: note[1], description: note[2], color: config.school_color}})         // the latter will move onto the proceeding
            .catch(() => undelivered++);            // code before waiting for the promises to
        }                                           // fulfill. https://stackoverflow.com/a/37576787
    
        message.reply({ embed: { description: `Messages have been sent, yet ${undelivered} members couldn't receive it due to probably turning their DMs off.`, color: config.school_color}})
        .catch(console.error);    
      
        /*if ((!message.member.roles.cache.has(config.serverRoles.admin, config.serverRoles.mod))) {
            const permission_embed = new MessageEmbed()
            .setColor(config.school_color)
            .setTitle(`Oops, an error happened...`)
            .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
            .setImage(`https://media1.tenor.com/images/9277c9be9e3d7a953bb19bfacf8c1abf/tenor.gif?itemid=12620128`)
            .setTimestamp()
            message.channel.send(permission_embed)
            .then(msg => {
                msg.delete({ timeout: 2000 })
            })
            .catch(err => console.log(`Error: ${err}`));
        } */
    }
};
