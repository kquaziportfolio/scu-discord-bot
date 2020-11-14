const fetch = require(`node-fetch`);
const { MessageEmbed } = require(`discord.js`);
let sendMessage = require(`../../modules/sendMessage.js`);

module.exports = {
    name: "course-avail",
    description: "Get CourseAvail info on classes for the upcoming quarter!",
    args: true,
    cooldown: 20,
    usage: `[department name]`,
    category: 'Utility',
    async execute (client, message, args) {

        try {
            const departmentName = args[0].toLowerCase().join(" ");
            let response = await fetch(`https://www.scu.edu/apps/ws/courseavail/search/4120/ugrad/${departmentName}`);
            let data = await response.json(); 

            const courseSummary = new MessageEmbed() 
                .setDescription(`__**Search Results for ${data.title}__`)
                .addField(`Term`, data.results[1].strm_descr, true)
                .addField(`Subject Description`, data.results[3].subject_descr, true) 
                .addField(`Class Description`, data.results[6].class_descr, true) 
                .addField(`Meeting Days`, data.results[7].mtg_days_1, true)
                .addField(`Meeting Times`, `${data.results[9].mtg_time_beg_1}-${data.results[10].mtg_time_beg_1}`, true)
                .addField(`Class Building`, data.results[12].mtg_facility_1, true)
                .addField(`Instructor`, data.results[13].instr_1, true)
                .addField(`Seats Remaining`, data.results[20].seats_remaining, true)
                .addField(`Minimum Units`, data.results[22].units_minimum, true)
                .addField(`Maximium Units`, data.results[23].units_maximum, true)
                .setColor(client.config.school_color) 

            message.channel.send(courseSummary);
        } catch(err) {
            sendMessage(client, client.config.channels.auditlogs, {embed: {description: `The following user - ${username} - does not exist.`, color: client.config.school_color}})
            console.log(err => `Error: ${err}`)
        }
    }
}
