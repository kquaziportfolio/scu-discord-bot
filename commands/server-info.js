const { MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const config = require('../config.json');

module.exports = {
	name: 'server-info',
    description: 'Get general server information here!',
    usage: `${config.prefix}server-info`,
		async execute(message, args) { 
            message.delete();

            if ((message.member.roles.cache.has(config.serverRoles.admin, config.serverRoles.mod))) {
            let serverIcon = message.guild.iconURL({ dynamic: true });

            const serverEmbed = new MessageEmbed()
                .setTitle("**Server Information**")
                .setThumbnail(`${serverIcon}`)
                .setDescription(`__**Discord Etiquette**__\n-To notify only the members of a specific majors use @ followed by the name` +
                ` of the major. Read Discord's Terms of Service [here](https://discord.com/terms).\n\n__**Roles**__\nTo give yourself roles,` +
                ` look at <#${config.rolesChannelID}> \n\nStudent Organizations with a sizeable` +
                ` populous within the server may request their own channel.\n\n__**Permanent Invite Link**__\n[SCU Discord Network](https://discord.gg/YusWdfu)` +
                `\n\n__**Questions / Concerns / Inquiries**__\nMessage <@&${config.serverRoles.admin}>/<@&${config.serverRoles.mod}> or ping away in <#${config.suggestionsChannelID}>\n` +
                `\n__**SCU Social Networking**__\n- [FaceBook](https://www.facebook.com/SantaClaraUniversity/)\n- [Instagram](https://instagram.com/santaclarauniversity/)\n- [LinkedIn](https://www.linkedin.com/school/santa-clara-university/)\n- [Reddit](https://reddit.com/r/SCU)\n- [Twitter](https://www.twitter.com/SantaClaraUniv/)\n- [YouTube](https://www.youtube.com/santaclarauniversity)`)
                .setColor(10231598)

            const resourcesEmbed = new MessageEmbed()
                .setTitle("**Server Information**")
                .setColor(config.school_color)
                .setDescription("__**Resources**__\n\n")
                .addFields(
                    {name: `**${emojiCharacters.key} Access Card**`, value: "[Link](https://www.scu.edu/access/)", inline: true},
                    {name: `**${emojiCharacters.book} Bookstore**`, value: "[Link](https://www.scu.edu/auxiliary-services/bookstore/)", inline: true},
                    {name: `**${emojiCharacters.money} Bursar's Office**`, value: "[Link](https://www.scu.edu/bursar/)", inline: true},
                    {name: `**${emojiCharacters.safety} Campus Safety**`, value: "[Link](https://university-operations.scu.edu//campus-safety/)", inline: true},
                    {name: `**${emojiCharacters.book} Career Center**`, value: "[Link](https://www.scu.edu/careercenter/)", inline: true},
                    {name: `**${emojiCharacters.book} CourseAvail**`, value: "[Link](https://www.scu.edu/apps/courseavail/?p=schedule)", inline: true},
                    {name: `**${emojiCharacters.money} Financial Aid**`, value: "[Link](https://www.scu.edu/financialaid/graduate-students/)", inline: true},
                    {name: `**${emojiCharacters.diversity} Office of Diversity**`, value: "[Link](https://www.scu.edu/diversity/)", inline: true},
                    {name: `**${emojiCharacters.register} Registrar's Office**`, value: "[Link](https://www.scu.edu/registrar/)", inline: true},
                    {name: `**${emojiCharacters.house} Housing**`, value: "[Link](https://www.scu.edu/living/residential-living-options/graduate/)", inline: true},
                    {name: `**${emojiCharacters.car} Transportation**`, value: "[Link](https://www.scu.edu/sustainability/operations/transportation/)", inline: true},
                    {name: `**${emojiCharacters.book} University Library**`, value: "[Link](https://www.scu.edu/library/)", inline: true},
                    {name: `**${emojiCharacters.book} Campus Recreation**`, value: "[Link](https://www.scu.edu/recreation/)", inline: true},
                    {name: `**${emojiCharacters.gym} Cowell Health Center**`, value: "[Link](https://www.scu.edu/cowell/)", inline: true},
                    {name: `**${emojiCharacters.book} Drahmann Center**`, value: "[Link](https://www.scu.edu/drahmann/)", inline: true},
                    {name: `**${emojiCharacters.student} Office of Student Life**`, value: "[Link](https://www.scu.edu/osl/)", inline: true},
                    {name: `**${emojiCharacters.money} One Stop Enrollment**`, value: "[Link](https://www.scu.edu/onestop/currentstudents/graduatestudents/)", inline: true},
                    {name: `**${emojiCharacters.safety} SCU Bronco Alert**`, value: "[Link](https://university-operations.scu.edu/campus-safety/scu-campus-alert/)", inline: true},
                    {name: `**${emojiCharacters.tech} Technology Office**`, value: "[Link](https://www.scu.edu/technology/)", inline: true},
                    {name: `**${emojiCharacters.book} Guadalupe Hall Services**`, value: "[Link](https://www.scu.edu/ecp/current-students/guadalupe-hall-resources/)", inline: true},
                    {name: `**${emojiCharacters.book} Office of Accessible Education**`, value: "[Link](https://www.scu.edu/ecp/current-students/disability-resources/)", inline: true},
                )
                .attachFiles([`./assets/scu-seal.jpg`])
                .setImage('attachment://scu-seal.jpg')
                .setTimestamp()
                .setFooter('Brought to you by the creators of this Discord server.')

            message.channel.send({embed: serverEmbed});
            message.channel.send({embed: resourcesEmbed});
        } else {
        const permission_embed = new Discord.MessageEmbed()
            .setColor(config.school_color)
            .setTitle(`Oops, an error happened...`)
            .setDescription("You must have the following roles: " + "`Admin`, `Mod`")
            .attachFiles(`./assets/no_perm.gif`)
            .setImage(`attachment://no_perm.gif`)
            .setThumbnail(`${serverIcon}`)
        message.channel.send(permission_embed)
            .then(msg => {
                msg.delete({ timeout: 2000 })
            })
            .catch(err => console.log(`Error: ${err}`));
        }
    }
}