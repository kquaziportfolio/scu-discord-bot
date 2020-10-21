const { MessageEmbed } = require(`discord.js`);
const emojiCharacters = require(`../../modules/emoji-characters.js`);

module.exports = {
	name: 'poll',
    description: 'Make a poll with results!',
    args: true,
    usage: `[question] ~ [choice1] ~ [choice2]`, 
    category: 'Admin',  
		async execute(client, message, args) { 
            let isAdmin = require(`../../modules/isAdmin.js`);
            
            if(isAdmin(client, message, false)) {
                message.delete();

                const prompt = args.join(' ').split(' ~ ');

                const pollEmbed = new MessageEmbed()
                .setAuthor(`Server Poll`)
                .setTitle(prompt[0])
                .setDescription(`- ${prompt[1]}\n- ${prompt[2]}`)
                .setColor(client.config.school_color)
                .setFooter(`Poll created by the server lords!`)

                if(!message.content.includes("?")) return message.channel.send({embed: {description: "Include a `?` in your vote question!", color: client.config.school_color}})

                const msg = await message.channel.send(pollEmbed).catch(err => `Error: ${err}`)

                await msg.react(`${emojiCharacters.one}`); //here is a change in the file
                await msg.react(`${emojiCharacters.two}`);

            }
        }
}