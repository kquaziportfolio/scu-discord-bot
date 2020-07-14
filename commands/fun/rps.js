const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports =  { // >ping
	name: 'ping',
	description: 'Ping!',
	async execute(message, args) {
        let choices = ["rock", "paper", "scissors"];
        const USER_PLAYER = `**${message.author}** wins this round!`;
        const COMPUTER_PLAYER = `**COMPUTER** wins this round!`;
        const TIE = `It's a tie!`;
        if (!args[0]) return message.channel.send({ embed: {description: "Choose a move: \`\`\`rock, paper, or scissors \`\`\`", color: 10231598}});
        if (choices.indexOf(args[0]) == -1) {
        return message.channel.send({embed: {description: "Choose a move: \`\`\`rock, paper, or scissors \`\`\`", color: 10231598}});
        }
        let computer = choices[Math.floor(Math.random() * 3 + 1) - 1];
        let user = args[0];
        function calculate(user, computer) {
            if (user == "rock" && computer == "scissors" || user == "paper" && computer == "rock" || user == "scissors" && computer == "paper") {
                return USER_PLAYER;
            } else if (computer == "rock" && user == "scissors" || computer == "paper" && user == "rock" || computer == "scissors" && user == "paper") {
                return COMPUTER_PLAYER;
            } else {
                return TIE;
            }
        }
        const embed = {
            description: calculate(user, computer),
            title: `__**Your Results**__`,
            fields: [
                {
                name: "User Choice",
                value: user,
                },
                {
                name: "Computer Choice",
                value: computer,
                },
            ],
            color: 10231598
        };
        message.channel.send({ embed });
    }
}