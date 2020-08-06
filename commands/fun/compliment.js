const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');
const COMPLIMENTS = require(`./compliments.json`);
const compliments_list = COMPLIMENTS.compliments;

module.exports = {
	name: 'compliment',
    description: 'Complient another user in the server!',
    usage: `${prefix}compliment [user mention]`,
    async execute(message, args) { 
    let user = message.mentions.users.first();
    if (message.mentions.users === message.author.username) return message.channel.send('You can not compliment yourself');
    if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to compliment them.')
   
    const compliments = compliments_list[Math.floor(Math.random() * compliments_list.length)];

    const embed = new Discord.MessageEmbed()
        .setTitle("Here's your compliment!")
        .setColor(10231598)
        .setDescription(`<@${message.author.id}> said this:\n\n<@${user.id}>, ${compliments}`);
        
    message.channel.send(embed)
    }
}