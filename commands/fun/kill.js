const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require(`node-fetch`);
const { prefix } = require('../config.json');

module.exports = {
    name: 'kill', //forked from Raptor SA
    description: `'Kill' a pall here!`, //here is a change in the file
    usage: `${prefix} [user id]`,
        async execute (message, args) {
            args = message.content.split(" ");
            if (args[0]) {
                channel.send({embed: { description: `<@${args[1]}> was killed!` }});
            } else {
                message.channel.send({embed: { description: "Please enter a proper user id!"}});
            }
        }
}