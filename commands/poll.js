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
            if ((!message.member.roles.cache.has(config.server_roles.admin, config.server_roles.mod))) {
                const permission_embed = new MessageEmbed()
                .setColor(config.school_color)
                .setTitle(`Oops, an error happened...`)
                .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
                .attachFiles([`./assets/no_perm.gif`])
                .setImage(`attachment://no_perm.gif`)
                message.channel.send(permission_embed)
                .then(msg => {
                    msg.delete({ timeout: 2000 })
                })
                .catch(err => console.log(`Error: ${err}`));
            } 

            const prompt = args.join(' ').split(' | ');

            if(!prompt[1]) return message.channel.send({embed: {description: "Make a poll with two options!", color: config.school_color}});
            if(!message.content.includes("?")) return message.channel.send({embed: {description: "Include a `?` in your vote question!", color: config.school_color}})

            const embed = new MessageEmbed()
            .setColor(config.school_color)
            .setFooter('React to vote!')
            .setTitle(`📋 ${prompt[1]}`) 
            .setDescription(`- ${emojiCharacters.one} ${prompt[2]}\n- ${emojiCharacters.two} ${prompt[3]}`)
            
            const msg = await message.channel.send(embed).catch(err => `Error: ${err}`)

            await msg.react(`${emojiCharacters.one}`); //here is a change in the file
            await msg.react(`${emojiCharacters.two}`);

            message.delete({timeout: 1000});
        }
}