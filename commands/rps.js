const config = require('../config.json');

module.exports =  {  
	name: 'rps',
    description: 'Play rock, paper, scissors!',
    args: true,
    usage: `[Choose rock, paper, or scissors]`,
	async execute(message, args) {
        message.delete();
        
        let choices = ["rock", "paper", "scissors"];
        const USER_PLAYER = `**${message.author}** wins this round!`;
        const COMPUTER_PLAYER = `**COMPUTER** wins this round!`;
        const TIE = `It's a tie!`;
        if (!args[0]) return message.channel.send({ embed: {description: "Choose a move: \`\`\`rock, paper, or scissors \`\`\`", color: config.school_color}});
        if (choices.indexOf(args[0]) == -1) {
            return message.channel.send({embed: {description: "Choose a move: \`\`\`rock, paper, or scissors \`\`\`", color: config.school_color}});
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
        const rpsEmbed = {
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
            color: config.school_color
        };
        message.channel.send({ embed: rpsEmbed });
    }
}