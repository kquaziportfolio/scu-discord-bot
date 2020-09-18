const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const COMPLIMENTS = require(`./compliments.json`);
const compliments_list = COMPLIMENTS.compliments;

module.exports = {
	name: 'compliment',
    description: 'Complient another user in the server!',
    usage: `[@user mention]`,
    async execute(message, args) { 
        message.delete();
        
        let user = message.mentions.users.first();
        if (message.mentions.users === message.author.username) return message.channel.send('You can not compliment yourself');
        if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to compliment them.')
    
        const compliments = compliments_list[Math.floor(Math.random() * compliments_list.length)];

        const embed = new MessageEmbed()
            .setTitle("Here's your compliment!")
            .setColor(config.school_color)
            .setDescription(`<@${message.author.id}> said this:\n\n<@${user.id}>, ${compliments}`);
            
        message.channel.send(embed)
    }
}