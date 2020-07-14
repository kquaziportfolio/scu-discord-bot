const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'cmds',
    description: 'cmds!',   
    async execute(message, args) {
        const cmds_embed = new Discord.MessageEmbed()
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
                    name: `${emojiCharacters.three} ${emojiCharacters.gear} Fun`,
                    value: "`>Fun`",
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
        message.channel.send(cmds_embed)
        .catch(err => console.log(`Error: ${err}`))
    }
}