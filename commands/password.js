const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = {
	name: 'password',
	description: 'password!',
    async execute(message, args) { 
        const pw_Instructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Passwords Command")
        .addField("Description:", `Input number length to generate a random\npassword that's between 8 and 12 characters!`, true)
        .addField("Usage:", "`>password [number length between 8-12]`", true)
        .addField("Example:", "`>password`", true)
        .setTimestamp();

        const prompt = args.join(' ');

        let pass_char = ['0', '1', '2', '3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
                    'P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
                    'p','q','r','s','t','u','v','w','x','y','z', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

        let password = "";

        if(!prompt) return message.channel.send(pw_Instructions);

        if(prompt[0] === 8) {
            for (d = 0; d < 8; d++) {
                password += pass_char[Math.floor(Math.random() * pass_char.length)];
            }
        } else if(prompt[0] === 9) {
            for (d = 0; d < 9; d++) {
                password += pass_char[Math.floor(Math.random() * pass_char.length)];
            }
        } else if(prompt[0] === 10) {
            for (d = 0; d < 10; d++) {
                password += pass_char[Math.floor(Math.random() * pass_char.length)];
            }
        } else if(prompt[0] === 11) {
            for (d = 0; d < 11; d++) {
                password += pass_char[Math.floor(Math.random() * pass_char.length)];
            }
        } else if(prompt[0] === 12) {
            for (d = 0; d < 12; d++) {
                password += pass_char[Math.floor(Math.random() * pass_char.length)];
            }
        } 

        message.channel.send({embed: {
            title: "__**Here's your random password!**__",
            description: `${password}`,
            color: 10231598
        }}).catch((err) => console.error("[ ERROR ] ", err))
    }
}