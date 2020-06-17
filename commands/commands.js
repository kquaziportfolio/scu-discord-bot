const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'cmds',
    description: 'commands!',   
    async execute(message, args) {
        let cmds_embed = new Discord.MessageEmbed()
            .setColor(10231598)
            .setTitle(`Bot Commands List`)
            .setDescription(`Give us feedback on our bot!`)
            .attachFiles([`./assets/scu-background.png`])
            .setImage(`attachment://scu-background.png`)
            .addFields (
                {
                    name: `${emojiCharacters.one} ${emojiCharacters.speech} About`,
                    value: "`>about`",
                    inline: true
                },
                {
                    name: `${emojiCharacters.two} ${emojiCharacters.shield} Admin`,
                    value: "`>admin`",
                    inline: true
                },
                {
                    name: `${emojiCharacters.three} ${emojiCharacters.gear} Random`,
                    value: "`>random`",
                    inline: true
                },
                {
                    name: `${emojiCharacters.four} ${emojiCharacters.game} Game Stats`,
                    value: "`>game-stats`",
                    inline: true
                },
                {
                    name: `${emojiCharacters.five} ${emojiCharacters.prayer} Prayers`,
                    value: "`>prayers`",
                    inline: true
                },
                {
                    name: `${emojiCharacters.six} ${emojiCharacters.reddit} Reddit`,
                    value: "`>reddit`",
                    inline: true
                },
            );
        message.channel.send({embed: cmds_embed})
        .catch(err => console.log(`Error: ${err}`))
    }
}