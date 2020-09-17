/*
 ______                       __  __           _       _      
|  ____|                     |  \/  |         | |     | |     
| |__   _ __ _ __ ___  _ __  | \  / | ___   __| |_   _| | ___ 
|  __| | '__| '__/ _ \| '__| | |\/| |/ _ \ / _` | | | | |/ _ \
| |____| |  | | | (_) | |    | |  | | (_) | (_| | |_| | |  __/
|______|_|  |_|  \___/|_|    |_|  |_|\___/ \__,_|\__,_|_|\___|
                                                              
*/

module.exports = function errorEvent(type, message) {
	message.channel.send({ embed: { title: `:x: Missing Permissions!`, description: `:no_entry_sign: | ${type}`}});
	message.channel.stopTyping(true);
};
