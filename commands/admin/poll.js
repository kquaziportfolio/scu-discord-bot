const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed, MessageReaction, Collection } = require(`discord.js`); //for embed functionality
const config = require(`../config.json`)
const { prefix } = require('../config.json');
const emojiCharacters = require(`../emoji-characters.js`);

module.exports = {
	name: 'poll',
    description: 'Make a poll with results!',
    usage: `${prefix}poll [question] | [choice1] | [choice2]`,
    guildOnly: true,
		async execute(message, args) { 
            if ((!message.member.roles.cache.has('710593727864897646', '709118762707845211'))) {
                const permission_embed = new Discord.MessageEmbed()
                .setColor(10231598)
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

            if(!prompt[1]) return message.channel.send({embed: {description: "Make a poll with two options!", color: 10231598}});
            if(!message.content.includes("?")) return message.channel.send({embed: {description: "Include a `?` in your vote question!", color: 10231598}})

            const embed = new Discord.MessageEmbed()
            .setColor(10231598)
            .setFooter('React to vote!')
            .setTitle(`📋 ${prompt[1]}`) 
            .setDescription(`- ${emojiCharacters.one} ${prompt[2]}\n- ${emojiCharacters.two} ${prompt[3]}`)
            
            const msg = await message.channel.send(embed).catch(err => `Error: ${err}`)

            await msg.react(`${emojiCharacters.one}`); //here is a change in the file
            await msg.react(`${emojiCharacters.two}`);

            message.delete({timeout: 1000});
        }
}