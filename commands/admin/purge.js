module.exports = {
	name: 'purge',
    description: 'Delete recent messages using this command!',
    args: true,
    usage: `[# of messages]`, 
    category: 'Admin',  
    async execute(client, message, args) {   
        message.delete();

        let isAdmin = require(`../../modules/isAdmin.js`);

        if(isAdmin(message, false)) {
            try {
                const deleteCount = parseInt(args[0], 10);
       
                await message.channel.bulkDelete(deleteCount + 1)
            } catch(e) {
                console.log(e);
            }
        } 
    }
}