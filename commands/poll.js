const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require(`../config.json`)
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = {
	name: 'poll',
    description: 'Make a poll with results!',
    usage: `${config.prefix}poll [question] | [choice1] | [choice2]`,
    guildOnly: true,
		async execute(message, args) { 

            message.delete();

            let isAdmin = require(`../modules/isAdmin.js`);
            
            if(isAdmin(message, false)) {
                message.delete();

                const prompt = args.join(' ').split(' ~ ');

                if(!prompt[1]) return message.channel.send({embed: {description: "Make a poll with two options!", color: config.school_color}});
                if(!message.content.includes("?")) return message.channel.send({embed: {description: "Include a `?` in your vote question!", color: config.school_color}})

                const embed = new MessageEmbed()
                .setColor(config.school_color)
                .setFooter('React to vote!')
                .setTitle(`📋 ${prompt[0]}`) 
                .setDescription(`- ${emojiCharacters.one} ${prompt[1]}\n- ${emojiCharacters.two} ${prompt[2]}`)
                
                const msg = await message.channel.send(embed).catch(err => `Error: ${err}`)

                await msg.react(`${emojiCharacters.one}`); //here is a change in the file
                await msg.react(`${emojiCharacters.two}`);

                message.delete({timeout: 1000});
            }
        }
}