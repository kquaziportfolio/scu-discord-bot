module.exports = async (error) => {
	console.error('Unhandled promise rejection:', error);
}

module.exports = async (error, message) => {
	// Only log the error if it is not an Unknown Message error
	if (error.code === 10008) {
		console.error('Failed to delete the message:', error);
	} else if (error.code === 50034) {
        message.channel.send(`A message provided was too old to bulk delete`, error);
    } else if (error.code === 50035) {
		message.channel.send(`Invalid form body (returned for both application/json and multipart/form-data bodies), or invalid Content-Type provided`, error);
	} else {
		message.channel.send(`General error (such as a malformed request body, amongst other things)`, error);
	}
}
