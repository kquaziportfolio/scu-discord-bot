const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../../config.json');

module.exports = {
	name: 'server-roles',
    description: 'Get the server-roles embed!',
    usage: `${config.prefix}server-roles`, 
		async execute (message, args) {
      message.delete();

      let isAdmin = require(`../../modules/isAdmin.js`);

      if(isAdmin(message, false)) {
        const serverRolesEmbed = new MessageEmbed()
        .setTitle("__**SERVER ROLES!**__")
        .setColor(config.school_color)
        .setDescription(
        `\n**⟪Main Roles Form⟫**\n` +
        `Please fill out this super-duper quick little [**form**](https://docs.google.com/forms/d/e/1FAIpQLSeQpuFY1CB2dLkThqP0nN9FK5r_YLOHlK7hupiHyAjKx-cqUw/viewform?usp=pp_url&entry.196182759=DISCORD_NAME_HERE%230000) with your SCU email to instantly get the __**Student**__, graduating year, and major/program of study roles! All data is anonymous!\n\n` +
        `**NOTE**: If you are a <@&${config.serverRoles.guest}> or <@&${config.serverRoles.prospectiveStudent}>, please contact <@&${config.serverRoles.admin}> or <@&${config.serverRoles.mod}> to give you roles as the form is for SCU domain users! Thank you for your cooperation! 😊`
        )
        .attachFiles([`./assets/bronco_statue.jpg`])
        .setImage(`attachment://bronco_statue.jpg`)

        message.channel.send(serverRolesEmbed);
      }
    }   
}