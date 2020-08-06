const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = { 
    name: 'set-nick',
    description: 'set nickname!',
    usage: `${prefix}set-nick [user mention]`,
	async execute(message, args) {
        try {
            if (!args.length) return message.channel.send({embed: { description: `Enter a nickname!`, color: 10231598}})
            const prompt = args.join(" ").trim().split("~");
            let member = message.mentions.members.first();
            if (!member) return message.channel.send({embed: { description: `Mention a user like this: <@${message.author.id}>`, color: 10231598}});
            member = await member.setNickname(`${prompt[1]}`);
            message.channel.send({embed: { description: `${member.displayName} is <@${member.user.id}>'s new nickname!`, color: 10231598}});
       } catch (e) {
          console.error(e); // It's always useful to log your errors.
          return message.channel.send("Something went wrong when running this command!");
       }
    }
}