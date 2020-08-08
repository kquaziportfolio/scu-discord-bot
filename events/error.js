module.exports = async (error, message) => {
    let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

    auditLogs.send({ embed: { description: `Unhandled promise rejection: ${error}`}});
    
    // Only log the error if it is not an Unknown Message error
	if (error.code === 10008) {
		auditLogs.send({ embed: { description: `Failed to delete the message: ${error}`}});
	} else if (error.code === 50034) {
        auditLogs.send({ embed: { description: `A message provided was too old to bulk delete: ${error}` }});
    } else if (error.code === 50035) {
		auditLogs.send({ embed: { description: `Invalid form body (returned for both application/json and multipart/form-data bodies), or invalid Content-Type provided: ${error}`}});
	} else {
		auditLogs.send({ embed: { description: `General error (such as a malformed request body, amongst other things): ${error}`}});
	}
}