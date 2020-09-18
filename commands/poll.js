const config = require(`../config.json`)
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = {
	name: 'poll',
    description: 'Make a poll with results!',
    args: true,
    usage: `[question] | [choice1] | [choice2]`,
    guildOnly: true,
		async execute(message, args) { 

            message.delete();

            let isAdmin = require(`../modules/isAdmin.js`);
            
            if(isAdmin(message, false)) {
                message.delete();

                const prompt = args.join(' ').split(' ~ ');

                if(!message.content.includes("?")) return message.channel.send({embed: {description: "Include a `?` in your vote question!", color: config.school_color}})

                const msg = await message.channel.send(embed).catch(err => `Error: ${err}`)

                await msg.react(`${emojiCharacters.one}`); //here is a change in the file
                await msg.react(`${emojiCharacters.two}`);

                message.delete({timeout: 1000});
            }
        }
}