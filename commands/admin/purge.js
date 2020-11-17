let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = {
    name: 'purge',
    description: 'Delete recent messages using this command!',
    args: true,
    usage: `[# of messages]`, 
    category: 'Admin',  
    async execute(client, message, args) {   
        if(isAdmin(client, message)) {
            try {
                const deleteCount = parseInt(args[0], 10);
       
                await message.channel.bulkDelete(deleteCount + 1)
            } catch(e) {
                console.log(e);
            }
        } 
    }
}
