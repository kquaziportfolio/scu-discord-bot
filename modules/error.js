module.exports = function errorEvent(type, message) {
	message.channel.send({ embed: { title: `:x: Missing Permissions!`, description: `:no_entry_sign: | ${type}`}});
	message.channel.stopTyping(true);
};