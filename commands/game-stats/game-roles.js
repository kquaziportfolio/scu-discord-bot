const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = {
	name: 'game-roles',
    description: 'Lists all the game roles!', //here is a change in the file
    usage: `${prefix}game-roles`,
		async execute (message, args) {
                const rolesEmbed1 = new Discord.MessageEmbed()
                .setTitle("__**GAME ROLES MENU**__")
                .setDescription(`
            <:callofduty:729181764949639178> => Call of Duty\n
            <:csgo:728724579727573033> => CSGO\n
            <:dota:728725741344391169> => Dota 2\n
            <:dbd:728725743017656360> => Dead By Daylight\n
            <:fortnite:728724908225331250> => Fortnite\n
            <:gta:728725741520552046> => Grand Theft Auto\n
            <:io:728844181090598993> => .IO Games\n
            <:jackbox:728844182407610468> => Jackbox\n
            <:League:726658053818023937> => League of Legends\n
            <:minecraft:728724580251729930> => Minecraft\n
            <:Overwatch:726658055831552049> => Overwatch\n
            <:roblox:729181764630740992> => Roblox\n
            <:rocketleague:728726211882385409> => Rocket League\n
            <:rss:728724775068893225> => Rainbow Six Siege\n
            <:smash:728842766657912882> => Smash\n
            <:supercell:729181764446060555> => Supercell Games\n
            <:tf2:729181764211310664> => Team Fortress 2\n
            <:Valorant:726658055684620349> => Valorant
                `)
                .setColor(10231598)
                .setFooter(`React to get roles! Suggest more if you can!`)
            message.channel.send(rolesEmbed1);
        }
}