const config = require(`../config.json`);
const { MessageEmbed } = require(`discord.js`);

let questions = [
    {
        title: 'What is the best game?',
        options: ['League', 'Overwatch', 'Fortnite'],
        correct: 0
    },
    {
        title: 'What is the best programming language?',
        options: ['JavaScript', 'Python', 'Java'],
        correct: 0
    },
];

module.exports = {
    name: 'quiz',
    usage: `${config.prefix}quiz`,
    description: `cool quiz`,
    async execute (message, args) {
        message.delete();
        
        let question = questions[Math.floor(Math.random() * (questions.length))];
        let i = 0;
        const embed = new MessageEmbed() 
        .setTitle(question.title)
        .setDescription(question.options.map(opt => {
            i++;
            return `${i} - ${opt}\n`
        }))
        .setColor('RED')
        message.channel.send(embed);
        try {
            let msgs = await message.channel.awaitMessage(u2 => u2.author.id === message.author.id, { time: 15000 });
            if (parseInt(msgs.first().content) === question.correct) {
                return message.channel.send(`You got it correct!`);
            } else {
                return message.channel.send(`You got it incorrect!`);
            }
        } catch (e) {
            return message.channel.send(`You didn't answer!`);
        }
    }
}