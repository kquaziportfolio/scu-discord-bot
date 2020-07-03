const Discord = require(`discord.js`); //requires Discord.js integration package
const { MessageEmbed } = require(`discord.js`); //for embed functionality
const client = new Discord.Client();
const config = require(`../config.json`);
const overwatch = require(`overwatch-api`);
const {stripIndents} = require(`common-tags`);

module.exports = { 
    name: 'overwatch',
    description: 'overwatch!',   
    async execute( message, args) {
        args = args.join(" ").split(" | ");

        if(!args[0]) return message.channel.send({embed: {
            title: `Overwatch Command`, 
            description: "Please supply a username!", 
            color: 10231598,
            timestamp: new Date(),
            footer: `Brought to you by the server lords!`
        }});

        if(!args[1] || (args[1] && !["pc", "xb1", "psn"].includes(args[1]))) return message.channel.send({embed: {
            title: `Overwatch Command`,
            description: "Please supply a platform to check: `pc`, `xb1`, or `psn`", 
            color: 10231598, 
            timestamp: new Date(),
            footer: `Brought to you by the server lords!`
        }});

        if(args[0].includes("#")) args[0] = args[0].replace(/#/g, "-");

            overwatch.getProfile(args[1], "global", args[0], (err, json) => {
                if(err) return message.channel.send({embed: {title: `Overwatch Command`, description: "Unable to find a player with that username!", color: 10231598, timestamp: new Date()}})
                message.channel.send(`Generating user stats...`).then(msg => msg.delete({timeout: 2000}).catch(err => `ERROR: ${err}`))
                const { games, level, portrait, username, playtime: {competitive, quickplay }, private } = json;
                const { sportsmanship, shotcaller, teammate } = json.endorsement;
                const { won, draw, played, lost, win_rate } = json.games.competitive;
            
            if(private) return message.channel.send({embd: {
                title: `Overwatch Command`, 
                description: "The user's stats and can't be obtained via this command.", 
                color: 10231598, 
                timestamp: new Date(),
                footer: `Brought to you by the server lords!`
            }}).catch(err => `Error: ${err}`)

            const embed = new Discord.MessageEmbed() 
            .setColor(10231598)
            .setAuthor(`Overwatch | ${username}`, portrait)
            .setThumbnail(portrait)
            .addField("General:", stripIndents` 
            **Level:** ${shotcaller.rate || 0} / 100
            **Sportsmanship:** ${sportsmanship.rate || 0} / 100
            **Teammate:** ${teammate.rate || 0} / 100`, true)
            .addField("Competitive", stripIndents`
            **Played:** ${played || 0}
            **Won:** ${won || 0}
            **Draw:** ${draw || 0}
            **Lost:** ${lost || 0}
            **Win Rate:** ${win_rate || 0}
            **Playtime:** ${games.quickplay.played || "N/A"}
            **Won:** ${games.quickplay.won || 0}
            **Playtime:** ${quickplay || 0}`, true)
            .setFooter(`Brought to you by the server lords!`)
            .setTimestamp()

            message.channel.send(embed);
        })
    }
}