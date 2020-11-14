const { MessageEmbed } = require(`discord.js`);
const request = require(`request`);
const cheerio = require(`cheerio`); 
  
module.exports = {
    name: 'covid19',  
    description: 'Get daily and instant COVID-19 data at SCU here...', //here is a change in the file
    category: 'Utility',
    async execute (client, message, args) {  
        request("https://www.scu.edu/preparedscu/covid-19/confirmed-cases/", function (err, resp, body) {
            if (!err && resp.statusCode == 200) { 
                const scuEmbed = new MessageEmbed()
                .setColor(client.config.school_color)
                .setAuthor("SCU On-Campus Testing Dashboard", client.user.avatarURL()) 
                .setDescription(" Test Date | Number of Tests | *Number of Positive Tests | Positivity Rate")
                .setTitle(`The following information reflects results from tests conducted each week on SCU's campus. Find more details on the Testing Protocol website.`)
                .setURL(`https://www.scu.edu/preparedscu/health-and-safety/testing-protocol/`)
                .setFooter(`*Includes students, faculty, and staff. Includes some individuals tested multiple times.`, client.user.avatarURL()) 

                const $ = cheerio.load(body);

                $('table[class="fixed_header"] > tbody > tr').each(function() {
                    let stats = $(this).text(); 
                    console.log(stats); 
                    scuEmbed.addField(`\u200B`, stats, true);
                });  
                
                message.channel.send(scuEmbed);
            }
        }); 
    }
}
