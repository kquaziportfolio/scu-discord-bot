const Discord = require("discord.js");
const client = new Discord.Client();
let chrono = require("chrono-node");
const moment = require('moment');
const { prefix } = require('../config.json');

module.exports = {
	name: 'remind',
    description: 'Set reminders!',
    usage: `${prefix}remind [interval]`,
    async execute (message, args) {
        let messagez = args.join(' ');
        if (messagez.length < 1) return message.channel.send({ embed: { description: 'Incorrect format. !reminder <minutes> <message>', color: 10231598}});
        return new Promise((resolve) => {
            if (!isNaN(messagez[0])) {
            const time = parseInt(messagez[0]);
            if (time > 2880 || isNaN(time)) return message.channel.send({embed: { description: 'Maximum time is 2 days (2880 minutes)', color: 10231598}});
            if (time < 1) return message.channel.send({embed: { description: 'Time must be at least 1 minute.', color: 10231598}});
            setTimeout(() => {
                message.channel.send({ embed: { description: `Remember: ${messagez.split(' ').slice(1).join(' ')}!`, color: 10231598}});
            }, time * 60000);
            const minutemessage = time === 1 ? 'minute' : 'minutes';
            return message.channel.send({embed: { description: `Reminding you in ${time} ${minutemessage}.`, color: 10231598}});
            }

            const results = chrono.parse(messagez);
            if (results.length === 0) return message.channel.send({ embed: { description: 'Error parsing date. Try using format: >remind <minutes> <message>', color: 10231598}});

            let endTime = moment(results[0].start.date());
            const currentTime = new moment();
            let duration = moment.duration(endTime.diff(currentTime));
            let minutes = Math.round(duration.asMinutes());

            if (minutes < 1) { //here is a change in the file
            if (results[0].end) {
                endTime = results[0].end.date();
                duration = moment.duration(endTime.diff(currentTime));
                minutes = duration.asMinutes();
            }
            if (minutes < 1) {
                return message.channel.send({embed: {description: 'Time must be at least 1 minute.', color: 10231598}})
            }
            }
            if (minutes > 2880) return message.channel.send({embed: { description: 'Maximum time is 2 days (2880 minutes)', color: 10231598}});

            setTimeout(() => {
            message.channel.send({embed: { description: `Remember: "${messagez}"!`, color: 10231598}});
            }, minutes * 60000);
            const minutemessage = minutes === 1 ? 'minute' : 'minutes';
            return message.channel.send({embed: { description: `Reminding you in ${minutes} ${minutemessage} for ${messagez}.`, color: 10231598}});
        });
    }
}