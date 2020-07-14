// Import the discord.js-pagination package
const Discord = require(`discord.js`)
// Use either MessageEmbed or RichEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: 'schedule',
	description: 'scu schedule!',
	async execute(message, args) {
        const paginationEmbed = require('discord.js-pagination');
        const embed1 = new MessageEmbed()
        .setTitle(`SCU Undergraduate - Summer Session 2020`)
        .setColor(10231598)
        .setURL(`https://www.scu.edu/media/offices/registrar/important-forms-/14253-SCU-UG-2019-20_CLD_WEB.pdf`)
        .addFields(
            { 
                name: `__June 18__`, 
                value: `\u200B`,
                inline: true
            },
            {
                name: `Th`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Classes begin`,
                value: `\u200B`,
                inline: true
            },
            {   
                name:  `__June 22__`,
                value: `\u200B`,
                inline: true 
            },
            {   
                name: `M`,
                value: `\u200B`,
                inline: true 
            },
            {   
                name: `Last day to add a class`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__June 22__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `M`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to declare P/NP grading option`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 3*__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Independence Day observed; administrative holiday`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 3*__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to drop classes without a W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 17__`,
                value: `\u200B`,
                inline: true
            },
            { 
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to drop classes with a W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 22__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Classes end`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 23-24__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Th-F`,
                value: `\u200B`,
                inline: true            
            },
            {
                name: `Summer session 1 final examinations`,
                value: `\u200B`,
                inline: true
            },
        )
        .attachFiles([`./assets/logo-pic.png`])
        .setThumbnail(`attachment://logo-pic.png`)
        .setTimestamp()
        .setFooter(`Check out the SCU website for reference!`)

        const embed2 = new MessageEmbed()
        .setTitle(`SCU Undergraduate - Summer Session 2020`)
        .setColor(10231598)
        .setURL(`https://www.scu.edu/ecp/current-students/academiccalendar/`)
        .addFields(
            {
                name: `__July 29__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Summer session 1 grades due (faculty)`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 27__`,
                value: `\u200B`,
                inline: true
            },  
            {
                name: `M`, 
                value: `\u200B`,
                inline: true
            },
            {
                name: `Classes begin`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 29__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to add a class`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 29__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to declare P/NP grading option`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__August 7__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to drop classes without a W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__August 21__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Last day to drop classes with a W`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__August 28__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Classes End`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__Aug 31-Sep 1__`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `M-Tu`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `Summer session 2 final examinations`,
                value: `\u200B`,
                inline: true
            },   
        )
        .attachFiles([`./assets/logo-pic.png`])
        .setThumbnail(`attachment://logo-pic.png`)
        .setTimestamp()
        .setFooter(`Check out the SCU website for reference!`)

        const embed3 = new MessageEmbed()
        .setTitle(`SCU Undergraduate - Summer Session 2020`)
        .setColor(10231598)
        .setURL(`https://www.scu.edu/ecp/current-students/academiccalendar/`)
        .addFields(
            {
                name: `__Sep 7__`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `M`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `Summer session 2 grades due (faculty)`,
                value: `\u200B`,
                inline: true
            },    
            {
                name: `__Sep 7__`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `M`,
                value: `\u200B`,
                inline: true
            },   
            {
                name: `Labor Day administrative holiday`,
                value: `\u200B`,
                inline: true
            },  
            {
                name: `__June 15-July 3__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `M-F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Session 3a`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 6-July 24__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `M-F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Session 3b`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `__July 27-Aug 14__`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `M-F`,
                value: `\u200B`,
                inline: true
            },
            {
                name: `Session 3c`,
                value: `\u200B`,
                inline: true
            },
        )
        .attachFiles([`./assets/logo-pic.png`])
        .setThumbnail(`attachment://logo-pic.png`)
        .setTimestamp()
        .setFooter(`Check out the SCU website for reference!`)

        let pages = [
            embed1, embed2, embed3
        ]

        paginationEmbed(message, pages);
    }
}