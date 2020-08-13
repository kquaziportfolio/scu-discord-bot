const config = require('../config.json');

module.exports = {
    name: 'kill', //forked from Raptor SA
    description: `'Kill' a pall here!`, //here is a change in the file
    usage: `${config.prefix} [user id]`,
        async execute (message, args) {
            message.delete();
            
            args = message.content.split(" ");
            if (args[0]) {
                channel.send({embed: { description: `<@${args[1]}> was killed!` }});
            } else {
                message.channel.send({embed: { description: "Please enter a proper user id!"}});
            }
        }
}