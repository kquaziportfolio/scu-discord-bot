const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
const JOKES = require(`./jokes.json`); //for jokes
const jokes_list = JOKES.jokes;

module.exports = {
    name: 'joke',
    description: 'Get a random joke here!',
    usage: `${config.prefix}joke`,
    async execute(message, args) { 
        message.delete();

        function randomJoke() {
            return jokes_list[Math.floor(Math.random() * jokes_list.length)];
        }
        
        const embed = new MessageEmbed()
            .setTitle("Joke!")
            .setColor(config.school_color)
            .setDescription(randomJoke())
            .setTimestamp()
            .setFooter("Created by the server lords!")
        message.channel.send(embed)
    }
}