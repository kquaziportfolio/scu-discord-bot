const {MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'roles',
    description: 'Get a list of all the roles!',
    usage: `${config.prefix}roles`,
		async execute (message, args) {
      message.delete();

      const rolesEmbed1 = new MessageEmbed()
      .setTitle("__**Server Roles List**__")
      .setColor(config.school_color)
      .setDescription(
      `**⟪Main Roles Form⟫**\n` +
      `Please fill out this [form](https://docs.google.com/forms/d/e/1FAIpQLSeQpuFY1CB2dLkThqP0nN9FK5r_YLOHlK7hupiHyAjKx-cqUw/viewform?usp=pp_url&entry.196182759=DiscordTag%230000) to get the __**Student**__, graduating year, and major/program of study roles! NOTE: Use your SCU email to fill out the form! \n\n` +
      `**⟪Student Living Situation⟫**\n` + 
      `:blue_car: Commuter\n` + 
      `🏡 Residential\n` + 
      `🚪 Domestic\n` + 
      `✈️ International\n\n` + 
      `**⟪Academic Programs⟫**\n` + 
      `🥇 Honors College\n` + 
      `👪 LEAD Scholars\n\n` + 
      `**⟪Hobbies⟫**\n` + 
      `🎨 Art\n` +
      `🏎️ Cars\n` +
      `:person_lifting_weights: Fitness and Sports\n` +
      `🎮 Gamer\n` +
      `:musical_note: Music\n` + 
      `:dog: Pets\n` + 
      `:desktop: Tech`
      )

      message.channel.send(rolesEmbed1);
        }
}