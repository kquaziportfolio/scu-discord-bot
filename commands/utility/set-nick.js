const config = require('../../config.json');

module.exports = { 
    name: 'set-nick',
    description: 'Set nickname!',
    args: true,
    usage: `[@user mention] ~ [new nickname]`, 
    category: 'Utility',
	async execute(message, args) {
        message.delete();

        try {

            const prompt = args.join(" ").trim().split(" ~ ");
            let member = message.mentions.members.first();
            
            member = await member.setNickname(`${prompt[1]}`);

            const nicknameEmbed = { 
                title: `__**Nickname Changed!**__`,
                description: `${member.displayName} is <@${member.user.id}>'s new nickname!`, 
                color: config.school_color
            };

            message.channel.send({ embed: nicknameEmbed});
        } catch (err) {
            console.log(err);
        }
    }
}