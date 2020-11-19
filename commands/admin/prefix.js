let isAdmin = require(`../../modules/isAdmin.js`);
let db = require(`quick.db`);

module.exports = { 
    name: 'prefix',
    description: 'Change the bot\'s prefix!',
    args: true,
    usage: `[enter prefix]`,
    category: 'Admin',  
    async execute(client, message, args) {
        if(isAdmin(client, message)) {
          if(args.join("") === client.config.prefix) {
            db.delete(`newPrefix_${message.guild.id}`);
            return await message.channel.send({ embed: { description: "Reset the bot prefix ✅", color: client.config.school_color}});
          }
          
          if(args[1] || args[0].length > 1) {
            return await message.channel.send({ embed: { description: `You can't set a double-argument prefix or one that's over 1 character!, color: client.config.school_color}});
          }
        
          db.set(`newPrefix_${message.guild.id}`, args[0]);
          await message.channel.send({ embed: { description: `Set the bot prefix to ${args[0]}!`, color: client.config.school_color}});
        }
    }
}
